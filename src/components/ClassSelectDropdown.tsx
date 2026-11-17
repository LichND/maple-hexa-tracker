import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, Check } from 'lucide-react'
import { ClassMeta } from '../data/commonSkills'

interface ClassSelectDropdownProps {
  classes: ClassMeta[]
  value: string
  onChange: (classId: string) => void
  compact?: boolean
}

export const ClassSelectDropdown: React.FC<ClassSelectDropdownProps> = ({
  classes,
  value,
  onChange,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selected = classes.find((c) => c.id === value) || classes[0]

  const filtered = classes.filter((cls) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      cls.name.toLowerCase().includes(q) ||
      cls.branch.toLowerCase().includes(q) ||
      cls.id.toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => searchInputRef.current?.focus(), 0)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 bg-[#111624] border rounded-lg transition text-left ${
          compact ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2.5 text-sm rounded-xl'
        } ${
          isOpen
            ? 'border-purple-400 ring-2 ring-purple-500/25'
            : 'border-[#3b4463] hover:border-purple-500/60'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-bold text-purple-200 truncate">
            {selected?.name || 'Chọn Class'}
          </span>
          {selected?.branch && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-700/60 shrink-0">
              {selected.branch}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-purple-300' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#151a27] border border-[#3b4463] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {/* Search box */}
          <div className="p-2 border-b border-[#2a3045] bg-[#111624]/80">
            <div className="flex items-center gap-1.5 bg-[#1a2030] border border-[#323b54] focus-within:border-purple-400 rounded-lg px-2.5 py-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsOpen(false)
                  } else if (e.key === 'Enter' && filtered.length > 0) {
                    e.preventDefault()
                    onChange(filtered[0].id)
                    setIsOpen(false)
                  }
                }}
                placeholder="Tìm class hoặc branch..."
                className="w-full bg-transparent text-xs text-slate-100 placeholder:text-slate-500 outline-none"
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-48 overflow-y-auto p-1.5 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-3 text-center text-xs text-slate-500">
                Không tìm thấy class phù hợp
              </div>
            ) : (
              filtered.map((cls) => {
                const isSelected = cls.id === value
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => {
                      onChange(cls.id)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs transition text-left ${
                      isSelected
                        ? 'bg-purple-900/70 text-white border border-purple-500/70'
                        : 'text-slate-200 hover:bg-[#1e2538] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-semibold truncate">{cls.name}</span>
                      <span className="text-[10px] font-medium uppercase px-1.5 py-0.2 rounded bg-slate-800/90 text-slate-300 border border-slate-700 shrink-0">
                        {cls.branch}
                      </span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
