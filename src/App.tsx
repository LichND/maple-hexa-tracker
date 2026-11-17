import { useState, useEffect, useCallback, useRef } from 'react'
import { Header } from './components/Header'
import { HexaSheetTracker } from './components/HexaSheetTracker'
import { SyncModal } from './components/SyncModal'
import { ClassSelectDropdown } from './components/ClassSelectDropdown'
import { loadAppState, saveAppState, createCharacterFromPreset } from './services/storage'
import { CLASS_PRESETS } from './data/classesData'
import { AppState, Character } from './types/hexa'
import {
  uploadBySyncCode,
  downloadBySyncCode,
  subscribeBySyncCode,
  SyncPayload
} from './services/nostr'
import { Sparkles, RefreshCw } from 'lucide-react'

export function App() {
  const AUTO_SYNC_DELAY_SECONDS = 60
  const [appState, setAppState] = useState<AppState>(() => loadAppState())
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false)
  const [syncCountdown, setSyncCountdown] = useState<number | null>(null)
  const [pendingRemotePayload, setPendingRemotePayload] = useState<SyncPayload | null>(null)

  const appStateRef = useRef(appState)
  appStateRef.current = appState
  const syncCountdownRef = useRef<number | null>(syncCountdown)
  syncCountdownRef.current = syncCountdown
  const isSyncingRef = useRef(false)
  const hasPendingChangesRef = useRef(false)

  // First time creation state if no characters
  const availableClasses = Object.values(CLASS_PRESETS)
  const [initialName, setInitialName] = useState('')
  const [initialClassId, setInitialClassId] = useState<string>(availableClasses[0]?.id || 'lethe')

  const activeCharacter: Character | null =
    appState.characters.find((c) => c.id === appState.activeCharacterId) ||
    appState.characters[0] ||
    null

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveAppState(appState)
  }, [appState])

  // Cloud upload function
  const pushToCloud = useCallback(async (stateToPush: AppState) => {
    if (!stateToPush.sync.enabled || isSyncingRef.current) return
    isSyncingRef.current = true
    hasPendingChangesRef.current = false

    try {
      setAppState((prev) => ({
        ...prev,
        sync: { ...prev.sync, status: 'syncing', error: undefined }
      }))

      if (stateToPush.sync.syncCode) {
        await uploadBySyncCode(
          stateToPush.customNostrRelays,
          stateToPush.sync.syncCode,
          {
            characters: stateToPush.characters,
            activeCharacterId: stateToPush.activeCharacterId || '',
            updatedAt: Date.now()
          }
        )
      }

      setAppState((prev) => ({
        ...prev,
        sync: {
          ...prev.sync,
          status: 'synced',
          lastSyncedAt: Date.now(),
          error: undefined
        }
      }))
    } catch (e: any) {
      console.error('Cloud auto-sync error:', e)
      setAppState((prev) => ({
        ...prev,
        sync: { ...prev.sync, status: 'error', error: e.message }
      }))
    } finally {
      isSyncingRef.current = false
    }
  }, [])

  // Real-time Nostr Relay subscription (pauses when tab is hidden)
  const relayKey = (appState.customNostrRelays || []).join(',')
  useEffect(() => {
    if (!appState.sync.enabled || !appState.sync.syncCode) return

    let unsubscribe: (() => void) | null = null

    const startSub = () => {
      if (unsubscribe || document.hidden || !appStateRef.current.sync.syncCode) return
      unsubscribe = subscribeBySyncCode(
        appStateRef.current.customNostrRelays,
        appStateRef.current.sync.syncCode,
        (remote) => {
          const current = appStateRef.current
          if (remote.updatedAt <= current.sync.lastModifiedAt) return

          if (!hasPendingChangesRef.current && syncCountdownRef.current === null) {
            setAppState((prev) => ({
              ...prev,
              characters: remote.characters.length > 0 ? remote.characters : prev.characters,
              activeCharacterId: remote.activeCharacterId || prev.activeCharacterId,
              sync: {
                ...prev.sync,
                status: 'synced',
                lastSyncedAt: Date.now(),
                lastModifiedAt: remote.updatedAt,
                error: undefined
              }
            }))
          } else {
            setPendingRemotePayload(remote)
          }
        }
      )
    }

    const stopSub = () => {
      if (unsubscribe) {
        unsubscribe()
        unsubscribe = null
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopSub()
      } else {
        startSub()
      }
    }

    startSub()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      stopSub()
    }
  }, [appState.sync.enabled, appState.sync.syncCode, relayKey])

  const handleApplyRemotePayload = () => {
    if (!pendingRemotePayload) return
    setSyncCountdown(null)
    hasPendingChangesRef.current = false
    setAppState((prev) => ({
      ...prev,
      characters:
        pendingRemotePayload.characters.length > 0
          ? pendingRemotePayload.characters
          : prev.characters,
      activeCharacterId: pendingRemotePayload.activeCharacterId || prev.activeCharacterId,
      sync: {
        ...prev.sync,
        status: 'synced',
        lastSyncedAt: Date.now(),
        lastModifiedAt: pendingRemotePayload.updatedAt,
        error: undefined
      }
    }))
    setPendingRemotePayload(null)
  }

  // Countdown timer for 60s debounced auto-sync
  useEffect(() => {
    if (syncCountdown === null) return
    if (syncCountdown <= 0) {
      setSyncCountdown(null)
      pushToCloud(appStateRef.current)
      return
    }
    const timer = window.setTimeout(() => {
      setSyncCountdown((prev) => (prev !== null ? prev - 1 : null))
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [syncCountdown, pushToCloud])

  // Auto-sync debouncer on character/state changes (60s)
  const updateAppStateWithAutoSync = useCallback(
    (updater: (prev: AppState) => AppState) => {
      setAppState((prev) => {
        const next = updater(prev)
        if (next.sync.enabled) {
          hasPendingChangesRef.current = true
          setSyncCountdown(AUTO_SYNC_DELAY_SECONDS)
          return {
            ...next,
            sync: {
              ...next.sync,
              lastModifiedAt: Date.now()
            }
          }
        }
        return next
      })
    },
    []
  )

  // Manual sync trigger (cancels countdown & syncs immediately)
  const handleManualSync = async () => {
    const current = appStateRef.current
    if (!current.sync.enabled) {
      setIsSyncModalOpen(true)
      return
    }

    if (isSyncingRef.current) return

    const hadPending = syncCountdown !== null || hasPendingChangesRef.current
    setSyncCountdown(null)

    if (hadPending) {
      await pushToCloud(current)
      return
    }

    isSyncingRef.current = true
    setAppState((prev) => ({
      ...prev,
      sync: { ...prev.sync, status: 'syncing', error: undefined }
    }))

    try {
      if (current.sync.syncCode) {
        const remote = await downloadBySyncCode(
          current.customNostrRelays,
          current.sync.syncCode
        )
        if (remote.updatedAt > current.sync.lastModifiedAt) {
          setAppState((prev) => ({
            ...prev,
            characters: remote.characters,
            activeCharacterId: remote.activeCharacterId || prev.activeCharacterId,
            sync: {
              ...prev.sync,
              status: 'synced',
              lastSyncedAt: Date.now(),
              lastModifiedAt: remote.updatedAt,
              error: undefined
            }
          }))
        } else {
          isSyncingRef.current = false
          await pushToCloud(current)
          return
        }
      }
    } catch (e: any) {
      setAppState((prev) => ({
        ...prev,
        sync: { ...prev.sync, status: 'error', error: e.message }
      }))
    } finally {
      isSyncingRef.current = false
    }
  }

  // Active character update helper
  const updateActiveCharacter = (updater: (prev: Character) => Character) => {
    updateAppStateWithAutoSync((prev) => {
      const updatedChars = prev.characters.map((c) =>
        c.id === prev.activeCharacterId ? updater(c) : c
      )
      return {
        ...prev,
        characters: updatedChars
      }
    })
  }

  // Create initial character
  const handleCreateInitialChar = () => {
    if (!initialName.trim()) return
    const char = createCharacterFromPreset(initialName.trim(), initialClassId)
    updateAppStateWithAutoSync((prev) => ({
      ...prev,
      characters: [char],
      activeCharacterId: char.id
    }))
    setInitialName('')
  }

  const handleRenameCharacter = (id: string, newName: string) => {
    if (!newName.trim()) return
    updateAppStateWithAutoSync((prev) => ({
      ...prev,
      characters: prev.characters.map((c) =>
        c.id === id ? { ...c, name: newName.trim(), updatedAt: Date.now() } : c
      )
    }))
  }

  const handleDeleteCharacter = (id: string) => {
    updateAppStateWithAutoSync((prev) => {
      const nextChars = prev.characters.filter((c) => c.id !== id)
      return {
        ...prev,
        characters: nextChars,
        activeCharacterId:
          prev.activeCharacterId === id
            ? nextChars[0]?.id || null
            : prev.activeCharacterId
      }
    })
  }

  const handleAddCharacter = (name: string, classId = 'lethe') => {
    if (!name.trim()) return
    const newChar = createCharacterFromPreset(name.trim(), classId)
    updateAppStateWithAutoSync((prev) => ({
      ...prev,
      characters: [...prev.characters, newChar],
      activeCharacterId: newChar.id
    }))
  }

  return (
    <div className="min-h-screen bg-[#111624] text-slate-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <Header
        characters={appState.characters}
        activeCharacter={activeCharacter}
        onSelectCharacter={(id) =>
          setAppState((prev) => ({ ...prev, activeCharacterId: id }))
        }
        onRenameCharacter={handleRenameCharacter}
        onDeleteCharacter={handleDeleteCharacter}
        onAddCharacter={handleAddCharacter}
        syncState={appState.sync}
        syncCountdown={syncCountdown}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onManualSync={handleManualSync}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 isolate">
        {/* Remote update conflict banner when editing locally while another device synced */}
        {pendingRemotePayload && (
          <div className="bg-amber-950/90 border border-amber-500/70 rounded-2xl p-3.5 sm:px-5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2.5 text-xs text-amber-100">
              <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Có bản cập nhật mới từ thiết bị khác trên Nostr Relay (nhưng bạn đang có thay đổi
                chưa đồng bộ).
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={handleApplyRemotePayload}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
              >
                Tải bản mới
              </button>
              <button
                onClick={() => setPendingRemotePayload(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
              >
                Giữ bản hiện tại
              </button>
            </div>
          </div>
        )}

        {/* If no characters created yet -> First time welcoming screen */}
        {!activeCharacter ? (
          <div className="max-w-md mx-auto my-12 bg-[#1e2333] border border-[#3b4463] rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 mx-auto flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-8 h-8 text-amber-300" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-100 tracking-tight">
                Tạo Nhân Vật Mới
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Chào mừng bạn đến với HEXA Matrix Tracker! Nhập tên và chọn Class để bắt đầu.
              </p>
            </div>

            <div className="space-y-4 text-left text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Tên nhân vật (IGN):
                </label>
                <input
                  type="text"
                  placeholder="vd: LetheDemon"
                  value={initialName}
                  onChange={(e) => setInitialName(e.target.value)}
                  className="w-full bg-[#151a27] border border-[#3b4463] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-medium outline-none focus:border-purple-500 transition"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateInitialChar()}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Chọn Class:
                </label>
                <ClassSelectDropdown
                  classes={availableClasses}
                  value={initialClassId}
                  onChange={setInitialClassId}
                />
              </div>

              <button
                onClick={handleCreateInitialChar}
                disabled={!initialName.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-sm transition shadow-lg shadow-purple-600/25 active:scale-98"
              >
                Bắt Đầu Theo Dõi Ngay
              </button>
            </div>
          </div>
        ) : (
          /* SHEET STYLE TRACKER */
          <HexaSheetTracker
            character={activeCharacter}
            onUpdateCharacter={updateActiveCharacter}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e2333] bg-[#0c101a] py-4 text-center text-xs text-slate-500">
        <p>MapleStory HEXA Matrix Tracker • Lethe</p>
      </footer>

      {/* Modals */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        appState={appState}
        onUpdateAppState={setAppState}
      />
    </div>
  )
}

export default App
