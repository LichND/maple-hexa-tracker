import React, { useState } from 'react'
import {
  X,
  Cloud,
  Key,
  Download,
  Upload,
  Copy,
  Check,
  AlertCircle,
  Radio,
  ShieldCheck,
  RotateCcw
} from 'lucide-react'
import { AppState } from '../types/hexa'
import {
  DEFAULT_NOSTR_RELAYS,
  generateSyncCode,
  uploadBySyncCode,
  downloadBySyncCode
} from '../services/nostr'
import { exportStateAsJSON, importStateFromJSON } from '../services/storage'

interface SyncModalProps {
  isOpen: boolean
  onClose: () => void
  appState: AppState
  onUpdateAppState: (updater: (prev: AppState) => AppState) => void
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  appState,
  onUpdateAppState
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'relays' | 'backup'>('code')
  const [inputCode, setInputCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const [relaysText, setRelaysText] = useState(
    appState.customNostrRelays && appState.customNostrRelays.length > 0
      ? appState.customNostrRelays.join('\n')
      : DEFAULT_NOSTR_RELAYS.join('\n')
  )

  if (!isOpen) return null

  // 1. Generate new Sync Key & push immediately to Nostr Relays
  const handleGenerateCode = async () => {
    setIsLoading(true)
    setMessage(null)
    try {
      const code = generateSyncCode()
      const res = await uploadBySyncCode(appState.customNostrRelays, code, {
        characters: appState.characters,
        activeCharacterId: appState.activeCharacterId || '',
        updatedAt: Date.now()
      })

      onUpdateAppState((prev) => ({
        ...prev,
        sync: {
          ...prev.sync,
          enabled: true,
          syncCode: code,
          lastSyncedAt: Date.now(),
          status: 'synced',
          error: undefined
        }
      }))

      setMessage({
        type: 'success',
        text: `Đã tạo mã & đẩy lên ${res.successCount}/${res.totalRelays} Nostr Relays! Hãy sao chép và lưu lại mã này.`
      })
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'Lỗi khi tạo mã đồng bộ Nostr' })
    } finally {
      setIsLoading(false)
    }
  }

  // 2. Link existing Sync Key & pull from Nostr Relays
  const handleConnectCode = async () => {
    const cleanCode = inputCode.trim()
    if (!cleanCode) {
      setMessage({ type: 'error', text: 'Vui lòng dán hoặc nhập Mã đồng bộ.' })
      return
    }

    setIsLoading(true)
    setMessage(null)
    try {
      const payload = await downloadBySyncCode(appState.customNostrRelays, cleanCode)

      onUpdateAppState((prev) => ({
        ...prev,
        characters: payload.characters.length > 0 ? payload.characters : prev.characters,
        activeCharacterId: payload.activeCharacterId || prev.activeCharacterId,
        sync: {
          ...prev.sync,
          enabled: true,
          syncCode: cleanCode,
          lastSyncedAt: Date.now(),
          status: 'synced',
          error: undefined
        }
      }))

      setInputCode('')
      setMessage({
        type: 'success',
        text: 'Đã kết nối Nostr Relay và tải dữ liệu về thành công!'
      })
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'Lỗi khi kết nối mã đồng bộ' })
    } finally {
      setIsLoading(false)
    }
  }

  // 3. Disconnect Sync Key
  const handleDisconnectSync = () => {
    onUpdateAppState((prev) => ({
      ...prev,
      sync: {
        ...prev.sync,
        enabled: false,
        syncCode: null,
        status: 'idle',
        error: undefined
      }
    }))
    setMessage({ type: 'success', text: 'Đã ngắt kết nối đồng bộ Nostr trên thiết bị này.' })
  }

  // 4. Save Custom Nostr Relays
  const handleSaveRelays = () => {
    const parsed = relaysText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('wss://') || line.startsWith('ws://'))

    if (parsed.length === 0) {
      setMessage({
        type: 'error',
        text: 'Vui lòng nhập ít nhất 1 địa chỉ Nostr Relay hợp lệ (bắt đầu bằng wss://).'
      })
      return
    }

    onUpdateAppState((prev) => ({ ...prev, customNostrRelays: parsed }))
    setMessage({
      type: 'success',
      text: `Đã lưu ${parsed.length} Nostr Relay vào trình duyệt!`
    })
  }

  const handleResetRelays = () => {
    setRelaysText(DEFAULT_NOSTR_RELAYS.join('\n'))
    onUpdateAppState((prev) => ({ ...prev, customNostrRelays: [] }))
    setMessage({
      type: 'success',
      text: 'Đã khôi phục danh sách Nostr Relays mặc định.'
    })
  }

  // 5. JSON Backup Export/Import
  const handleExportJSON = () => {
    const jsonStr = exportStateAsJSON(appState)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `maple-hexa-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const parsed = importStateFromJSON(content)
      if (parsed) {
        onUpdateAppState(() => parsed)
        setMessage({ type: 'success', text: 'Đã nạp file dữ liệu sao lưu thành công!' })
      } else {
        setMessage({ type: 'error', text: 'File JSON không đúng định dạng của app!' })
      }
    }
    reader.readAsText(file)
  }

  const copySyncInfo = () => {
    if (appState.sync.syncCode) {
      navigator.clipboard.writeText(appState.sync.syncCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base">Đồng Bộ Qua Nostr Relays</h2>
              <p className="text-xs text-slate-400">
                Mã hóa AES-GCM từ Mã &amp; PIN • Không cần tài khoản hay server riêng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status alert message */}
        {message && (
          <div
            className={`mx-6 mt-4 p-3 rounded-lg text-xs flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                : 'bg-red-950/80 text-red-300 border border-red-800'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-800 px-6 mt-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'code'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Mã Đồng Bộ (Sync Code)</span>
          </button>
          <button
            onClick={() => setActiveTab('relays')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'relays'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Nostr Relays</span>
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'backup'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>File Backup</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* TAB 1: SYNC CODE (NOSTR) */}
          {activeTab === 'code' && (
            <div className="space-y-5">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-200 text-sm">
                      Đồng bộ phi tập trung qua Nostr Relays
                    </h3>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      Mã đồng bộ duy nhất vừa là định danh vừa là khóa mã hóa AES-GCM dữ liệu trước
                      khi gửi lên Nostr Relay. Chỉ cần copy 1 chuỗi này dán sang thiết bị khác là
                      đồng bộ được ngay.
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Code display if active */}
              {appState.sync.syncCode ? (
                <div className="bg-slate-950 border border-purple-800/60 rounded-xl p-5 text-center space-y-3">
                  <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                    Mã Đồng Bộ Của Bạn
                  </span>
                  <div className="bg-[#0d111d] border border-purple-700/50 rounded-lg px-3 py-2.5 select-all">
                    <span className="font-mono text-base sm:text-lg font-black text-purple-300 tracking-wider break-all">
                      {appState.sync.syncCode}
                    </span>
                  </div>

                  <p className="text-slate-400 text-[11px]">
                    Dữ liệu sẽ tự động đồng bộ lên Nostr Relays mỗi khi bạn thay đổi cấp độ.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <button
                      onClick={copySyncInfo}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Đã sao chép' : 'Sao chép Mã'}</span>
                    </button>
                    <button
                      onClick={handleGenerateCode}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    >
                      Tạo mã mới
                    </button>
                    <button
                      onClick={handleDisconnectSync}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900/80 text-red-300 border border-red-800/60 transition"
                    >
                      Ngắt kết nối
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
                  <p className="text-slate-400">
                    Bấm nút bên dưới để tạo Mã đồng bộ và đẩy dữ liệu lên Nostr Relays ngay.
                  </p>
                  <button
                    onClick={handleGenerateCode}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium text-xs shadow-md transition"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>{isLoading ? 'Đang kết nối Relay...' : 'Tạo Mã Đồng Bộ Mới'}</span>
                  </button>
                </div>
              )}

              {/* Form to connect from other device */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="font-semibold text-slate-200">
                  Dán mã từ thiết bị khác để tải dữ liệu về máy này:
                </h4>
                <input
                  type="text"
                  placeholder="vd: HEXA-8X4K-9M2P-7Q3W"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleConnectCode()}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono font-bold outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleConnectCode}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-medium transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Đang tải từ Relay...' : 'Kết nối & Tải dữ liệu về'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: NOSTR RELAYS CONFIG */}
          {activeTab === 'relays' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <Radio className="w-4 h-4 text-purple-400" />
                  <span>Danh sách Nostr Relays</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Mặc định app đã cấu hình sẵn các Relay công cộng ổn định. Bạn có thể giữ nguyên hoặc
                  thay bằng các Relay riêng (mỗi dòng một URL <code>wss://...</code>).
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Relay URLs (mỗi dòng 1 relay):
                </label>
                <textarea
                  rows={6}
                  value={relaysText}
                  onChange={(e) => setRelaysText(e.target.value)}
                  placeholder={DEFAULT_NOSTR_RELAYS.join('\n')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-200 outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveRelays}
                  className="flex-1 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition"
                >
                  Lưu Danh Sách Relays
                </button>
                <button
                  onClick={handleResetRelays}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Khôi phục mặc định"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Mặc định</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: BACKUP & RESTORE JSON */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="text-slate-300">
                  Bạn luôn có thể tải file dữ liệu về máy để lưu trữ hoặc gửi qua máy khác nạp vào
                  mà không cần bất kỳ dịch vụ đám mây nào.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleExportJSON}
                  className="flex flex-col items-center justify-center p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-600 transition group text-center space-y-2"
                >
                  <Download className="w-6 h-6 text-sky-400 group-hover:scale-110 transition" />
                  <span className="font-semibold text-slate-200">Xuất File Sao Lưu (.JSON)</span>
                  <span className="text-[11px] text-slate-400">
                    Tải toàn bộ nhân vật và cấp độ về máy
                  </span>
                </button>

                <label className="flex flex-col items-center justify-center p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-600 transition group text-center space-y-2 cursor-pointer">
                  <Upload className="w-6 h-6 text-amber-400 group-hover:scale-110 transition" />
                  <span className="font-semibold text-slate-200">Nhập File Sao Lưu (.JSON)</span>
                  <span className="text-[11px] text-slate-400">Khôi phục tiến độ từ file cũ</span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
