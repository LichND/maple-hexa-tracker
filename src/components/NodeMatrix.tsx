import React, { useState } from 'react'
import {
  Flame,
  Layers,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Check,
  Sparkles
} from 'lucide-react'
import { Character, HexaSkillNode, NodeType } from '../types/hexa'
import { calculateCostBetweenLevels } from '../data/hexaCosts'

interface NodeMatrixProps {
  character: Character
  onUpdateCharacter: (updater: (prev: Character) => Character) => void
}

export const NodeMatrix: React.FC<NodeMatrixProps> = ({
  character,
  onUpdateCharacter
}) => {
  const [activeTab, setActiveTab] = useState<NodeType | 'all'>('all')
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  const filteredNodes = character.nodes.filter(
    (n) => activeTab === 'all' || n.type === activeTab
  )

  const updateNode = (id: string, updates: Partial<HexaSkillNode>) => {
    onUpdateCharacter((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
      updatedAt: Date.now()
    }))
  }

  const handleStartEdit = (node: HexaSkillNode) => {
    setEditingNodeId(node.id)
    setEditingName(node.name)
  }

  const handleSaveEdit = (id: string) => {
    if (editingName.trim()) {
      updateNode(id, { name: editingName.trim() })
    }
    setEditingNodeId(null)
  }

  const addNewNode = (type: NodeType) => {
    const typeNames: Record<NodeType, string> = {
      origin: 'New Origin Skill',
      mastery: 'New Mastery Core',
      boost: 'New Boost Core',
      common: 'New Common Core'
    }
    const newNode: HexaSkillNode = {
      id: `node-${Date.now()}`,
      name: typeNames[type],
      type,
      currentLevel: 0,
      targetLevel: 30
    }
    onUpdateCharacter((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
      updatedAt: Date.now()
    }))
  }

  const deleteNode = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa node này không?')) {
      onUpdateCharacter((prev) => ({
        ...prev,
        nodes: prev.nodes.filter((n) => n.id !== id),
        updatedAt: Date.now()
      }))
    }
  }

  const getNodeBadge = (type: NodeType) => {
    switch (type) {
      case 'origin':
        return {
          label: 'Origin Skill',
          color: 'bg-purple-950/80 text-purple-300 border-purple-800/80',
          dot: 'bg-purple-400'
        }
      case 'mastery':
        return {
          label: 'Mastery Core',
          color: 'bg-sky-950/80 text-sky-300 border-sky-800/80',
          dot: 'bg-sky-400'
        }
      case 'boost':
        return {
          label: 'Enhancement Core',
          color: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80',
          dot: 'bg-emerald-400'
        }
      case 'common':
        return {
          label: 'Common (Sol Janus)',
          color: 'bg-rose-950/80 text-rose-300 border-rose-800/80',
          dot: 'bg-rose-400'
        }
    }
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
      {/* Tab Filter & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Ma Trận Kỹ Năng Hexa (Hexa Matrix)
          </h2>
          <p className="text-xs text-slate-400">
            Chỉnh sửa cấp độ hiện tại và mục tiêu để tính toán chi phí
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {(
            [
              { key: 'all', label: 'Tất cả' },
              { key: 'origin', label: 'Origin' },
              { key: 'mastery', label: 'Mastery' },
              { key: 'boost', label: 'Enhancement' },
              { key: 'common', label: 'Common' }
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                activeTab === t.key
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {filteredNodes.map((node) => {
          const badge = getNodeBadge(node.type)
          const costToTarget = calculateCostBetweenLevels(
            node.type,
            node.currentLevel,
            node.targetLevel
          )
          const isMax = node.currentLevel >= 30

          return (
            <div
              key={node.id}
              className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 hover:border-slate-700 transition space-y-3"
            >
              {/* Node Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${badge.color}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {badge.label}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Lv. {node.currentLevel} / {node.targetLevel}
                    </span>
                  </div>

                  {/* Title or edit input */}
                  {editingNodeId === node.id ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-sm font-semibold text-slate-200 outline-none focus:border-sky-500 w-full"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(node.id)}
                      />
                      <button
                        onClick={() => handleSaveEdit(node.id)}
                        className="p-1 rounded bg-sky-600 hover:bg-sky-500 text-white"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <h3
                        onClick={() => handleStartEdit(node)}
                        className="font-semibold text-slate-200 text-sm hover:text-sky-300 transition"
                      >
                        {node.name}
                      </h3>
                      <button
                        onClick={() => handleStartEdit(node)}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-slate-300 transition"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Delete button */}
                <button
                  onClick={() => deleteNode(node.id)}
                  className="text-slate-600 hover:text-red-400 p-1 transition"
                  title="Xóa node này"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full transition-all duration-300"
                    style={{ width: `${(node.currentLevel / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* Level adjustment controls */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                {/* Current level control */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2">
                  <span className="text-[11px] text-slate-400 block mb-1">Hiện tại:</span>
                  <div className="flex items-center justify-between">
                    <button
                      disabled={node.currentLevel <= 0}
                      onClick={() =>
                        updateNode(node.id, {
                          currentLevel: Math.max(0, node.currentLevel - 1)
                        })
                      }
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={node.currentLevel}
                      onChange={(e) =>
                        updateNode(node.id, {
                          currentLevel: Math.min(30, Math.max(0, parseInt(e.target.value) || 0))
                        })
                      }
                      className="w-10 bg-transparent text-center font-mono font-bold text-slate-100 text-sm outline-none"
                    />
                    <button
                      disabled={node.currentLevel >= 30}
                      onClick={() =>
                        updateNode(node.id, {
                          currentLevel: Math.min(30, node.currentLevel + 1)
                        })
                      }
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Target level control */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2">
                  <span className="text-[11px] text-slate-400 block mb-1">Mục tiêu:</span>
                  <div className="flex items-center justify-between">
                    <button
                      disabled={node.targetLevel <= node.currentLevel}
                      onClick={() =>
                        updateNode(node.id, {
                          targetLevel: Math.max(node.currentLevel, node.targetLevel - 1)
                        })
                      }
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={node.currentLevel}
                      max="30"
                      value={node.targetLevel}
                      onChange={(e) =>
                        updateNode(node.id, {
                          targetLevel: Math.min(30, Math.max(0, parseInt(e.target.value) || 0))
                        })
                      }
                      className="w-10 bg-transparent text-center font-mono font-bold text-sky-400 text-sm outline-none"
                    />
                    <button
                      disabled={node.targetLevel >= 30}
                      onClick={() =>
                        updateNode(node.id, {
                          targetLevel: Math.min(30, node.targetLevel + 1)
                        })
                      }
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Cost summary for this node */}
              <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <div className="space-y-0.5">
                  <div className="text-[11px] text-slate-400">
                    Chi phí lên mục tiêu (Lv {node.targetLevel}):
                  </div>
                  <div className="flex items-center gap-3 font-mono font-semibold">
                    <span className="flex items-center gap-1 text-sky-300">
                      <Flame className="w-3.5 h-3.5 text-sky-400" />
                      {costToTarget.solErda} Erda
                    </span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      {costToTarget.fragments.toLocaleString()} Mảnh
                    </span>
                  </div>
                </div>

                {/* Quick upgrade button to next level */}
                {!isMax && (
                  <button
                    onClick={() =>
                      updateNode(node.id, {
                        currentLevel: Math.min(30, node.currentLevel + 1)
                      })
                    }
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-sky-600/30 hover:bg-sky-600/50 text-sky-300 border border-sky-500/30 font-medium transition text-[11px]"
                  >
                    <span>Lên Lv {node.currentLevel + 1}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Add Custom Node Bar */}
      <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 mr-2 flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Thêm Core:
        </span>
        <button
          onClick={() => addNewNode('mastery')}
          className="px-2.5 py-1.5 rounded-lg bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 border border-sky-800/60 transition"
        >
          + Mastery Core
        </button>
        <button
          onClick={() => addNewNode('boost')}
          className="px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition"
        >
          + Enhancement Core
        </button>
        <button
          onClick={() => addNewNode('common')}
          className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 transition"
        >
          + Common Core
        </button>
      </div>
    </div>
  )
}
