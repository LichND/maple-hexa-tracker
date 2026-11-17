import React, { useState, useRef, useEffect } from 'react'
import {
  Cloud,
  CloudOff,
  RefreshCw,
  Settings,
  UserPlus,
  Users,
  AlertCircle,
  Sparkles,
  ChevronDown,
  Edit2,
  Trash2,
  Check,
  X
} from 'lucide-react'
import { Character, SyncState } from '../types/hexa'
import { CLASS_PRESETS } from '../data/classesData'
import { ClassSelectDropdown } from './ClassSelectDropdown'

interface HeaderProps {
  characters: Character[]
  activeCharacter: Character | null
  onSelectCharacter: (id: string) => void
  onRenameCharacter: (id: string, newName: string) => void
  onDeleteCharacter: (id: string) => void
  onAddCharacter: (name: string, classId: string) => void
  syncState: SyncState
  syncCountdown: number | null
  onOpenSyncModal: () => void
  onManualSync: () => void
}

export const Header: React.FC<HeaderProps> = ({
  characters,
  activeCharacter,
  onSelectCharacter,
  onRenameCharacter,
  onDeleteCharacter,
  onAddCharacter,
  syncState,
  syncCountdown,
  onOpenSyncModal,
  onManualSync
}) => {
  const availableClasses = Object.values(CLASS_PRESETS)
  const [isCharMenuOpen, setIsCharMenuOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [newCharName, setNewCharName] = useState('')
  const [newCharClassId, setNewCharClassId] = useState<string>(availableClasses[0]?.id || 'lethe')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const charMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (charMenuRef.current && !charMenuRef.current.contains(e.target as Node)) {
        setIsCharMenuOpen(false)
        setIsCreating(false)
        setEditingId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const submitCreate = () => {
    if (!newCharName.trim()) return
    onAddCharacter(newCharName.trim(), newCharClassId)
    setNewCharName('')
    setNewCharClassId(availableClasses[0]?.id || 'lethe')
    setIsCreating(false)
    setIsCharMenuOpen(false)
  }

  const submitRename = (id: string) => {
    if (!editName.trim()) return
    onRenameCharacter(id, editName.trim())
    setEditingId(null)
  }

  const getSyncStatusBadge = () => {
    if (!syncState.enabled) {
      return (
        <button
          onClick={onOpenSyncModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1e2333] hover:bg-[#282f45] text-slate-300 border border-[#3b4463] transition"
        >
          <CloudOff className="w-3.5 h-3.5 text-slate-400" />
          <span>Chưa đồng bộ cloud</span>
        </button>
      )
    }

    if (syncState.status === 'syncing') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-sky-950/80 text-sky-400 border border-sky-800">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
          <span>Đang đồng bộ...</span>
        </div>
      )
    }

    if (syncState.status === 'error') {
      return (
        <button
          onClick={onOpenSyncModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-950/80 hover:bg-red-900/80 text-red-400 border border-red-800 transition"
        >
          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
          <span>Lỗi sync (Bấm để xem)</span>
        </button>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSyncModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800 transition"
          title={`Nostr Sync Code: ${syncState.syncCode || ''}`}
        >
          <Cloud className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {syncState.syncCode ? `Mã: ${syncState.syncCode}` : 'Đã đồng bộ'}
          </span>
        </button>
        <button
          onClick={onManualSync}
          title={
            syncCountdown !== null
              ? `Tự động đồng bộ sau ${syncCountdown}s — Bấm để đồng bộ ngay`
              : 'Đồng bộ ngay bây giờ'
          }
          className={`flex items-center gap-1.5 rounded-full transition font-mono text-xs ${
            syncCountdown !== null
              ? 'px-2.5 py-1 bg-amber-950/90 hover:bg-amber-900 text-amber-300 border border-amber-600/70'
              : 'p-1.5 bg-[#1e2333] hover:bg-[#282f45] text-slate-300'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {syncCountdown !== null && <span>{syncCountdown}s</span>}
        </button>
      </div>
    )
  }

  return (
    <header className="border-b border-[#3b4463] bg-[#1a1f2e] sticky top-0 z-[100] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & App title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-600 via-indigo-600 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-sky-500/10 shrink-0">
            <div className="w-full h-full bg-[#111624] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg text-slate-100 tracking-tight">
                Maple Hexa Tracker
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/30 px-1.5 py-0.5 rounded">
                Sheet Style
              </span>
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Character Menu / Dropdown */}
          <div className="relative" ref={charMenuRef}>
            {activeCharacter ? (
              <button
                onClick={() => {
                  setIsCharMenuOpen(!isCharMenuOpen)
                  setIsCreating(false)
                  setEditingId(null)
                }}
                className={`flex items-center gap-2 bg-[#1c2132] hover:bg-[#252c3f] border rounded-xl px-3 py-1.5 transition text-xs sm:text-sm text-slate-100 font-bold shadow-sm ${
                  isCharMenuOpen ? 'border-purple-400 ring-2 ring-purple-500/30' : 'border-[#3b4463]'
                }`}
              >
                <Users className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate max-w-[110px] sm:max-w-[160px]">{activeCharacter.name}</span>
                <span className="text-[10px] font-normal text-slate-400 hidden sm:inline">
                  ({CLASS_PRESETS[activeCharacter.classId || 'lethe']?.name || activeCharacter.job || 'Lethe'})
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
                    isCharMenuOpen ? 'rotate-180 text-purple-300' : ''
                  }`}
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsCharMenuOpen(true)
                  setIsCreating(true)
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Tạo Nhân Vật</span>
              </button>
            )}

            {/* Character Menu Popover */}
            {isCharMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#161b29] border border-[#3b4463] rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#2a3045]">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span>Nhân Vật ({characters.length})</span>
                  </span>
                  {!isCreating && (
                    <button
                      onClick={() => {
                        setIsCreating(true)
                        setNewCharName('')
                      }}
                      className="flex items-center gap-1 text-[11px] font-bold bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/60 px-2 py-0.5 rounded-lg transition"
                    >
                      <UserPlus className="w-3 h-3" />
                      <span>Thêm Mới</span>
                    </button>
                  )}
                </div>

                {/* Inline Add Character Form */}
                {isCreating && (
                  <div className="p-2.5 rounded-xl bg-[#1e2436] border border-purple-500/80 space-y-2">
                    <div>
                      <span className="text-[11px] font-bold text-purple-300 block mb-1">
                        Tên nhân vật mới (IGN):
                      </span>
                      <input
                        type="text"
                        placeholder="vd: LetheDemon"
                        value={newCharName}
                        onChange={(e) => setNewCharName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitCreate()}
                        autoFocus
                        className="w-full bg-[#111624] border border-[#3b4463] rounded-lg px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-purple-400"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-purple-300 block mb-1">
                        Chọn Class:
                      </span>
                      <ClassSelectDropdown
                        classes={availableClasses}
                        value={newCharClassId}
                        onChange={setNewCharClassId}
                        compact
                      />
                    </div>

                    <div className="flex items-center justify-end gap-1.5 pt-1">
                      <button
                        onClick={() => setIsCreating(false)}
                        className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium transition"
                        title="Hủy"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={submitCreate}
                        disabled={!newCharName.trim()}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold transition"
                        title="Xác nhận tạo"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Tạo</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Characters List */}
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-0.5">
                  {characters.map((char) => {
                    const isActive = char.id === activeCharacter?.id
                    const isEditingThis = editingId === char.id

                    if (isEditingThis) {
                      return (
                        <div
                          key={char.id}
                          className="p-2 rounded-xl bg-[#1e2436] border border-sky-500 flex items-center gap-1.5"
                        >
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && submitRename(char.id)}
                            autoFocus
                            className="flex-1 bg-[#111624] border border-[#3b4463] rounded-lg px-2 py-1 text-xs text-slate-100 outline-none focus:border-sky-400"
                          />
                          <button
                            onClick={() => submitRename(char.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
                            title="Lưu tên"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition"
                            title="Hủy"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={char.id}
                        className={`p-2 rounded-xl border flex items-center justify-between gap-2 transition group ${
                          isActive
                            ? 'bg-purple-950/70 border-purple-500/80 text-white'
                            : 'bg-[#1e2333]/70 border-[#2a3045] hover:border-[#3b4463] text-slate-300'
                        }`}
                      >
                        <div
                          onClick={() => {
                            onSelectCharacter(char.id)
                            setIsCharMenuOpen(false)
                          }}
                          className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                        >
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isActive ? 'bg-emerald-400' : 'bg-slate-600'
                            }`}
                          />
                          <span className="font-bold text-xs truncate">{char.name}</span>
                          {isActive && (
                            <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800 shrink-0">
                              Đang chọn
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingId(char.id)
                              setEditName(char.name)
                            }}
                            className="p-1.5 rounded-lg hover:bg-[#2c354e] text-slate-400 hover:text-sky-300 transition"
                            title="Đổi tên nhân vật"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              if (confirm(`Bạn có chắc chắn muốn xóa nhân vật ${char.name}?`)) {
                                onDeleteCharacter(char.id)
                                if (characters.length <= 1) {
                                  setIsCharMenuOpen(false)
                                }
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-950/70 text-slate-400 hover:text-red-400 transition"
                            title="Xóa nhân vật"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sync status */}
          <div className="hidden sm:block">{getSyncStatusBadge()}</div>

          {/* Settings / Sync open modal */}
          <button
            onClick={onOpenSyncModal}
            className="p-2 rounded-xl bg-[#1e2333] hover:bg-[#282f45] text-slate-300 border border-[#3b4463] transition"
            title="Đồng bộ & Cài đặt"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile sync status pill bar */}
      <div className="sm:hidden px-4 py-1.5 bg-[#111624] border-t border-[#3b4463] flex justify-between items-center text-xs">
        <span className="text-slate-400">Đồng bộ:</span>
        {getSyncStatusBadge()}
      </div>
    </header>
  )
}
