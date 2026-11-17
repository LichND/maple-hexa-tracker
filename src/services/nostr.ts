import { SimplePool, finalizeEvent, getPublicKey, Event } from 'nostr-tools'
import { Character } from '../types/hexa'

export const DEFAULT_NOSTR_RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.nostr.band',
  'wss://nostr.mom'
]

const NOSTR_APP_TAG = 'maple-hexa-tracker'
const NOSTR_KIND_APP_DATA = 30078

export const CLIENT_ID =
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'client-' + Math.random().toString(36).slice(2)

export interface SyncPayload {
  characters: Character[]
  activeCharacterId: string
  updatedAt: number
  clientId?: string
}

export function getActiveRelays(customRelays?: string[]): string[] {
  if (customRelays && customRelays.length > 0) {
    const cleaned = customRelays
      .map((r) => r.trim())
      .filter((r) => r.startsWith('wss://') || r.startsWith('ws://'))
    if (cleaned.length > 0) return cleaned
  }
  return DEFAULT_NOSTR_RELAYS
}

export function generateSyncCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  const randomGroup = (len: number) => {
    let out = ''
    const buf = crypto.getRandomValues(new Uint8Array(len))
    for (let i = 0; i < len; i++) {
      out += chars.charAt(buf[i] % chars.length)
    }
    return out
  }
  return `HEXA-${randomGroup(4)}-${randomGroup(4)}-${randomGroup(4)}`
}

async function sha256Bytes(input: string): Promise<Uint8Array> {
  const data = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return new Uint8Array(hashBuffer)
}

async function deriveNostrKeys(syncKey: string): Promise<{ sk: Uint8Array; pk: string }> {
  const normalized = syncKey.trim()
  const sk = await sha256Bytes(`maple-hexa-tracker:nostr-sk:v2:${normalized}`)
  const pk = getPublicKey(sk)
  return { sk, pk }
}

async function deriveAesKey(syncKey: string): Promise<CryptoKey> {
  const normalized = syncKey.trim()
  const rawKey = await sha256Bytes(`maple-hexa-tracker:aes-key:v2:${normalized}`)
  return crypto.subtle.importKey(
    'raw',
    rawKey as BufferSource,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  )
}

function toBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

async function encryptPayload(payload: SyncPayload, syncKey: string): Promise<string> {
  const key = await deriveAesKey(syncKey)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const plaintext = new TextEncoder().encode(JSON.stringify(payload))
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    plaintext
  )
  return `v1:${toBase64(iv)}:${toBase64(new Uint8Array(cipherBuffer))}`
}

async function decryptPayload(content: string, syncKey: string): Promise<SyncPayload> {
  if (!content.startsWith('v1:')) {
    return JSON.parse(content) as SyncPayload
  }
  const parts = content.split(':')
  if (parts.length !== 3) {
    throw new Error('Dữ liệu đồng bộ không đúng định dạng.')
  }
  const iv = fromBase64(parts[1])
  const cipher = fromBase64(parts[2])
  const key = await deriveAesKey(syncKey)
  const plainBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as BufferSource },
    key,
    cipher as BufferSource
  )
  const json = new TextDecoder().decode(plainBuffer)
  return JSON.parse(json) as SyncPayload
}

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms)
    promise
      .then((val) => {
        clearTimeout(timer)
        resolve(val)
      })
      .catch((err) => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

/**
 * Publishes encrypted character state as a NIP-78 replaceable event (kind 30078)
 * to Nostr Relays using keys derived deterministically from the single Sync Key.
 */
export async function uploadBySyncCode(
  customRelays: string[] | undefined,
  syncKey: string,
  payload: SyncPayload
): Promise<{ successCount: number; totalRelays: number }> {
  const relays = getActiveRelays(customRelays)
  const { sk } = await deriveNostrKeys(syncKey)
  const encryptedContent = await encryptPayload({ ...payload, clientId: CLIENT_ID }, syncKey)

  const eventTemplate = {
    kind: NOSTR_KIND_APP_DATA,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['d', NOSTR_APP_TAG]],
    content: encryptedContent
  }

  const signedEvent = finalizeEvent(eventTemplate, sk)
  const pool = new SimplePool()

  try {
    const publishPromises = pool.publish(relays, signedEvent).map((p) =>
      withTimeout(p, 6000, 'Relay timeout')
    )
    const results = await Promise.allSettled(publishPromises)
    const successCount = results.filter((r) => r.status === 'fulfilled').length

    if (successCount === 0) {
      throw new Error('Không thể kết nối tới Nostr Relay nào để lưu dữ liệu. Vui lòng thử lại.')
    }

    return { successCount, totalRelays: relays.length }
  } finally {
    pool.close(relays)
  }
}

/**
 * Queries Nostr Relays for the latest NIP-78 event matching the Sync Key,
 * then decrypts and returns the SyncPayload.
 */
export async function downloadBySyncCode(
  customRelays: string[] | undefined,
  syncKey: string
): Promise<SyncPayload> {
  const relays = getActiveRelays(customRelays)
  const { pk } = await deriveNostrKeys(syncKey)
  const pool = new SimplePool()

  try {
    const events: Event[] = await withTimeout(
      pool.querySync(relays, {
        kinds: [NOSTR_KIND_APP_DATA],
        authors: [pk],
        '#d': [NOSTR_APP_TAG]
      }),
      8000,
      'Quá thời gian kết nối Nostr Relay.'
    )

    if (!events || events.length === 0) {
      throw new Error('Không tìm thấy dữ liệu cho mã đồng bộ này trên Nostr Relays.')
    }

    const latest = events.sort((a, b) => b.created_at - a.created_at)[0]
    try {
      return await decryptPayload(latest.content, syncKey)
    } catch {
      throw new Error('Không thể giải mã dữ liệu — vui lòng kiểm tra lại mã đồng bộ!')
    }
  } finally {
    pool.close(relays)
  }
}

/**
 * Subscribes to Nostr Relays for real-time NIP-78 updates matching the Sync Key.
 * Ignores events published by this same tab (matching CLIENT_ID).
 */
export function subscribeBySyncCode(
  customRelays: string[] | undefined,
  syncKey: string,
  onRemoteUpdate: (payload: SyncPayload) => void
): () => void {
  const relays = getActiveRelays(customRelays)
  const pool = new SimplePool()
  let closed = false
  let sub: { close: () => void } | null = null
  let latestUpdatedAt = 0

  deriveNostrKeys(syncKey)
    .then(({ pk }) => {
      if (closed) return
      sub = pool.subscribeMany(
        relays,
        {
          kinds: [NOSTR_KIND_APP_DATA],
          authors: [pk],
          '#d': [NOSTR_APP_TAG]
        },
        {
          onevent: async (event: Event) => {
            if (closed) return
            try {
              const payload = await decryptPayload(event.content, syncKey)
              if (payload.clientId === CLIENT_ID) return
              if (payload.updatedAt <= latestUpdatedAt) return
              latestUpdatedAt = payload.updatedAt
              onRemoteUpdate(payload)
            } catch {
              // Ignore malformed or undecryptable events
            }
          }
        }
      )
    })
    .catch(() => {
      // Ignore key derivation errors
    })

  return () => {
    closed = true
    if (sub) {
      try {
        sub.close()
      } catch {
        // Ignore close errors
      }
    }
    try {
      pool.close(relays)
    } catch {
      // Ignore pool close errors
    }
  }
}
