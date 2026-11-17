import React, { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import {
  Check,
  Plus,
  Minus,
  Sparkles,
  Flame,
  Layers,
  LayoutGrid,
  ListOrdered,
  ArrowRight,
  EyeOff,
  Eye,
  Lock
} from 'lucide-react'
import { Character, HexaSkillNode, HexaStatNode } from '../types/hexa'
import { CLASS_PRESETS, LETHE_CLASS, PriorityStep } from '../data/classesData'
import { calculateCostBetweenLevels } from '../data/hexaCosts'
import { createDefaultHexaStats } from '../services/storage'
import { MultiSkillIcon } from './MultiSkillIcon'

interface HexaSheetTrackerProps {
  character: Character
  onUpdateCharacter: (updater: (prev: Character) => Character) => void
  onChangeClass?: (classId: string) => void
}

export const HexaSheetTracker: React.FC<HexaSheetTrackerProps> = ({
  character,
  onUpdateCharacter
}) => {
  const [priorityViewMode, setPriorityViewMode] = useState<'grid' | 'list'>('grid')
  const [activeStepTooltip, setActiveStepTooltip] = useState<{
    idx: number
    rect: DOMRect
  } | null>(null)
  const [activeNodeTooltip, setActiveNodeTooltip] = useState<{
    id: string
    rect: DOMRect
  } | null>(null)

  const preset = CLASS_PRESETS[character.classId || 'lethe'] || LETHE_CLASS

  const currentPriority =
    preset.priorities.find((p) => p.id === character.selectedPriorityId) ||
    preset.priorities[0]

  // Separate nodes by category
  const skillNodes = character.nodes.filter((n) => n.type === 'origin')
  const enhancementNodes = character.nodes.filter((n) => n.type === 'boost')
  const masteryNodes = character.nodes.filter((n) => n.type === 'mastery')
  const commonNodes = character.nodes.filter((n) => n.type === 'common')

  const getStatTotalLevel = (stat?: HexaStatNode) =>
    stat ? (stat.mainStatLevel || 0) + (stat.subStat1Level || 0) + (stat.subStat2Level || 0) : 0

  // Ensure all 3 HEXA Stat nodes exist with class-specific A/B/C ordering:
  // Stat I: A, B, C | Stat II: B, A, C | Stat III: C, A, B
  const hexaStats: HexaStatNode[] = useMemo(() => {
    const defaults = createDefaultHexaStats(character.classId || 'lethe')
    const existing = character.hexaStats || []
    return defaults.map((def, idx) => {
      const found = existing.find((s) => s.id === def.id) || existing[idx]
      const m = found ? Math.max(0, Math.min(10, found.mainStatLevel || 0)) : 0
      const s1 = found ? Math.max(0, Math.min(10, 20 - m, found.subStat1Level || 0)) : 0
      const s2 = found ? Math.max(0, Math.min(10, 20 - m - s1, found.subStat2Level || 0)) : 0
      return {
        ...def,
        mainStatLevel: m,
        subStat1Level: s1,
        subStat2Level: s2
      }
    })
  }, [character.hexaStats, character.classId])

  type StatLineKey = 'mainStatLevel' | 'subStat1Level' | 'subStat2Level'

  const setHexaStatLineLevel = (statIndex: number, lineKey: StatLineKey, level: number) => {
    onUpdateCharacter((prev) => {
      const defaults = createDefaultHexaStats(prev.classId || 'lethe')
      const existing = prev.hexaStats || []
      const nextStats = defaults.map((def, idx) => {
        const found = existing.find((s) => s.id === def.id) || existing[idx]
        const m = found ? Math.max(0, Math.min(10, found.mainStatLevel || 0)) : 0
        const s1 = found ? Math.max(0, Math.min(10, 20 - m, found.subStat1Level || 0)) : 0
        const s2 = found ? Math.max(0, Math.min(10, 20 - m - s1, found.subStat2Level || 0)) : 0
        return {
          ...def,
          mainStatLevel: m,
          subStat1Level: s1,
          subStat2Level: s2
        }
      })

      // Sequential unlock check: Stat II requires Stat I total === 20; Stat III requires Stat II total === 20
      if (statIndex === 1 && getStatTotalLevel(nextStats[0]) < 20) return prev
      if (
        statIndex === 2 &&
        (getStatTotalLevel(nextStats[0]) < 20 || getStatTotalLevel(nextStats[1]) < 20)
      ) {
        return prev
      }

      const target = { ...nextStats[statIndex] }
      const otherSum =
        (lineKey === 'mainStatLevel' ? 0 : target.mainStatLevel) +
        (lineKey === 'subStat1Level' ? 0 : target.subStat1Level) +
        (lineKey === 'subStat2Level' ? 0 : target.subStat2Level)
      const maxAllowed = Math.min(10, Math.max(0, 20 - otherSum))
      target[lineKey] = Math.max(0, Math.min(maxAllowed, level))
      nextStats[statIndex] = target

      // If previous stat total drops below 20, lock and reset subsequent stats
      if (getStatTotalLevel(nextStats[0]) < 20) {
        nextStats[1] = { ...nextStats[1], mainStatLevel: 0, subStat1Level: 0, subStat2Level: 0 }
        nextStats[2] = { ...nextStats[2], mainStatLevel: 0, subStat1Level: 0, subStat2Level: 0 }
      } else if (getStatTotalLevel(nextStats[1]) < 20) {
        nextStats[2] = { ...nextStats[2], mainStatLevel: 0, subStat1Level: 0, subStat2Level: 0 }
      }

      return {
        ...prev,
        hexaStats: nextStats,
        updatedAt: Date.now()
      }
    })
  }

  const updateHexaStatLineLevel = (statIndex: number, lineKey: StatLineKey, delta: number) => {
    const current = hexaStats[statIndex]?.[lineKey] || 0
    setHexaStatLineLevel(statIndex, lineKey, current + delta)
  }

  const updateNodeLevel = (nodeId: string, delta: number) => {
    onUpdateCharacter((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => {
        if (n.id === nodeId) {
          const next = Math.max(0, Math.min(30, n.currentLevel + delta))
          return { ...n, currentLevel: next }
        }
        return n
      }),
      updatedAt: Date.now()
    }))
  }

  const setNodeLevelDirect = (nodeId: string, level: number) => {
    onUpdateCharacter((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => {
        if (n.id === nodeId) {
          return { ...n, currentLevel: Math.max(0, Math.min(30, level)) }
        }
        return n
      }),
      updatedAt: Date.now()
    }))
  }

  const ignoreSkill3 = Boolean(character.ignoreVoidOrigin)

  const toggleIgnoreSkill3 = () => {
    onUpdateCharacter((prev) => ({
      ...prev,
      ignoreVoidOrigin: !prev.ignoreVoidOrigin,
      updatedAt: Date.now()
    }))
  }

  const thirdSkillNode = skillNodes[2]

  const isThirdSkillNode = (node: HexaSkillNode) =>
    Boolean(thirdSkillNode && node.id === thirdSkillNode.id)

  const isThirdSkillStep = (step: PriorityStep) => {
    if (!thirdSkillNode) return false
    const cleanStep = step.skillName.toLowerCase()
    const cleanNode = thirdSkillNode.name.toLowerCase()
    return (
      cleanNode.includes(cleanStep) ||
      cleanStep.includes(cleanNode) ||
      Boolean(step.shortName && cleanNode.includes(step.shortName.toLowerCase()))
    )
  }

  type StepCategory = 'origin' | 'mastery' | 'boost' | 'common' | 'stat'

  const CATEGORY_THEMES: Record<StepCategory, string> = {
    origin: 'bg-orange-500/30 border border-orange-400/65',
    mastery: 'bg-violet-500/30 border border-violet-400/65',
    boost: 'bg-sky-500/30 border border-sky-400/65',
    common: 'bg-emerald-500/30 border border-emerald-400/65',
    stat: 'bg-zinc-900 border border-zinc-600/75'
  }

  const getStepCategory = (step: PriorityStep): StepCategory => {
    const cleanStep = step.skillName.toLowerCase()
    if (cleanStep.includes('stat')) return 'stat'

    const matched = character.nodes.find((n) => {
      const cleanNode = n.name.toLowerCase()
      if (cleanStep.includes('majeure') && cleanNode.includes('majeure')) return true
      if (cleanStep.includes('demonic') && cleanNode.includes('demonic')) return true
      return (
        cleanNode.includes(cleanStep) ||
        cleanStep.includes(cleanNode) ||
        (step.shortName && cleanNode.includes(step.shortName.toLowerCase())) ||
        (n.subSkills && n.subSkills.some((s) => cleanStep.includes(s.name.toLowerCase())))
      )
    })

    return matched ? matched.type : 'common'
  }

  // Calculate Priority Status & Current Active Step
  const { currentTipStep, currentTipIndex, completedStepsMap, ignoredStepsMap } = useMemo(() => {
    const completedMap: Record<number, boolean> = {}
    const ignoredMap: Record<number, boolean> = {}
    let activeStep: PriorityStep | null = null
    let activeIdx = -1

    currentPriority.steps.forEach((step, idx) => {
      if (ignoreSkill3 && isThirdSkillStep(step)) {
        ignoredMap[idx] = true
        completedMap[idx] = false
        return
      }

      let isCompleted = false
      const cleanStepName = step.skillName.toLowerCase()
      if (cleanStepName.includes('stat')) {
        let statIndex = 0
        if (cleanStepName.includes('iii') || cleanStepName.includes('3')) {
          statIndex = 2
        } else if (cleanStepName.includes('ii') || cleanStepName.includes('2')) {
          statIndex = 1
        }
        const statNode = hexaStats[statIndex]
        const currentStatLvl = getStatTotalLevel(statNode)
        isCompleted = currentStatLvl >= 20
      } else {
        const targetNode = character.nodes.find((n) => {
          const cleanStep = step.skillName.toLowerCase()
          const cleanNode = n.name.toLowerCase()

          // Match HEXA Majeure <-> HEXA Majeure / Oath Incarnate
          if (cleanStep.includes('majeure') && cleanNode.includes('majeure')) {
            return true
          }

          // Match HEXA Demonic Wrath <-> HEXA Demonic Wrath / Wroth
          if (cleanStep.includes('demonic') && cleanNode.includes('demonic')) {
            return true
          }

          return (
            cleanNode.includes(cleanStep) ||
            cleanStep.includes(cleanNode) ||
            (step.shortName && cleanNode.includes(step.shortName.toLowerCase())) ||
            (n.subSkills && n.subSkills.some((s) => cleanStep.includes(s.name.toLowerCase())))
          )
        })
        isCompleted = targetNode ? targetNode.currentLevel >= step.targetLevel : false
      }

      completedMap[idx] = isCompleted

      if (!isCompleted && !activeStep) {
        activeStep = step
        activeIdx = idx
      }
    })

    return {
      currentTipStep: activeStep as PriorityStep | null,
      currentTipIndex: activeIdx,
      completedStepsMap: completedMap,
      ignoredStepsMap: ignoredMap
    }
  }, [character.nodes, hexaStats, currentPriority, ignoreSkill3, thirdSkillNode])

  // Total Sol Erda & Fragments remaining calculation
  const totalCost = useMemo(() => {
    let erda = 0
    let frags = 0
    character.nodes.forEach((n) => {
      if (ignoreSkill3 && isThirdSkillNode(n)) return
      const c = calculateCostBetweenLevels(n.type, n.currentLevel, 30)
      erda += c.solErda
      frags += c.fragments
    })
    return { erda, frags }
  }, [character.nodes, ignoreSkill3, thirdSkillNode])

  // Check if a node card matches the active next step to upgrade
  const isNodeNextToUpgrade = (node: HexaSkillNode) => {
    if (!currentTipStep) return false
    if (ignoreSkill3 && isThirdSkillNode(node)) return false
    const cleanStep = currentTipStep.skillName.toLowerCase()
    const cleanNode = node.name.toLowerCase()

    // Match HEXA Majeure <-> HEXA Majeure / Oath Incarnate
    if (cleanStep.includes('majeure') && cleanNode.includes('majeure')) {
      return true
    }

    // Match HEXA Demonic Wrath <-> HEXA Demonic Wrath / Wroth
    if (cleanStep.includes('demonic') && cleanNode.includes('demonic')) {
      return true
    }

    return (
      cleanNode.includes(cleanStep) ||
      cleanStep.includes(cleanNode) ||
      (currentTipStep.shortName && cleanNode.includes(currentTipStep.shortName.toLowerCase())) ||
      (node.subSkills && node.subSkills.some((s) => cleanStep.includes(s.name.toLowerCase())))
    )
  }

  // Render a skill node box
  const renderNodeItem = (node: HexaSkillNode) => {
    const isComplete = node.currentLevel >= 30
    const isCombo = Boolean(node.multiIcons && node.multiIcons.length > 1)
    const isSkill3 = isThirdSkillNode(node)
    const isIgnored = isSkill3 && ignoreSkill3
    const isNext = isNodeNextToUpgrade(node)
    const showNodeTip = activeNodeTooltip?.id === node.id

    const handleOpenNodeTip = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!isNext) return
      setActiveNodeTooltip({
        id: node.id,
        rect: e.currentTarget.getBoundingClientRect()
      })
    }

    return (
      <div
        key={node.id}
        onMouseEnter={handleOpenNodeTip}
        onMouseLeave={() => isNext && setActiveNodeTooltip(null)}
        onTouchStart={handleOpenNodeTip}
        onTouchEnd={() => isNext && setActiveNodeTooltip(null)}
        onTouchCancel={() => isNext && setActiveNodeTooltip(null)}
        className={`rounded-xl p-3 flex items-center justify-between gap-3 transition relative group ${
          isNext
            ? 'bg-[#291e38] border-2 border-amber-400/90 shadow-lg shadow-amber-500/20 z-20'
            : isIgnored
            ? 'bg-[#1c2233]/70 border border-slate-700/60 opacity-65 z-10'
            : 'bg-[#242b3e] border border-[#374151] hover:border-slate-500 shadow-sm z-10'
        }`}
      >
        {/* Animated Marching Ants dashed border for next skill to upgrade */}
        {isNext && (
          <div className="absolute -inset-[3px] rounded-xl pointer-events-none z-30 overflow-hidden">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1.5"
                y="1.5"
                width="calc(100% - 3px)"
                height="calc(100% - 3px)"
                rx="12"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-marching-ants"
              />
            </svg>
          </div>
        )}

        {/* Floating tooltip portaled to document.body */}
        {isNext && showNodeTip && activeNodeTooltip && currentTipStep && typeof document !== 'undefined' &&
          createPortal(
            <div
              style={{
                position: 'fixed',
                left: Math.max(
                  12,
                  Math.min(
                    window.innerWidth - 260,
                    activeNodeTooltip.rect.left + activeNodeTooltip.rect.width / 2 - 120
                  )
                ),
                bottom: window.innerHeight - activeNodeTooltip.rect.top + 10,
                zIndex: 9999
              }}
              className="min-w-[240px] max-w-xs bg-slate-900/98 border border-amber-400 rounded-xl p-3 shadow-2xl backdrop-blur-md pointer-events-none animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider pb-1 border-b border-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Kỹ năng tiếp theo cần nâng</span>
              </div>
              <div className="pt-2 text-xs text-slate-200">
                <p className="font-semibold text-slate-100">{node.name}</p>
                <div className="mt-1 flex items-center gap-2 font-mono">
                  <span className="text-slate-400">Hiện tại: Lv {node.currentLevel}</span>
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300 font-bold text-sm">
                    Cần up tới Lv {currentTipStep.targetLevel}
                  </span>
                </div>
              </div>
              {/* Arrow pointer */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-amber-400 rotate-45" />
            </div>,
            document.body
          )}

        {/* Left: MultiSkillIcon & Name */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <MultiSkillIcon
            icons={node.multiIcons || (node.customIcon ? [node.customIcon] : [])}
            subSkills={node.subSkills}
            size={44}
            currentLevel={node.currentLevel}
          />

          {/* Name & Combo / Next badge */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`text-xs sm:text-sm font-semibold block truncate ${
                  isIgnored ? 'text-slate-400 line-through' : 'text-slate-100'
                }`}
                title={node.name}
              >
                {node.name}
              </span>
              {isCombo && (
                <span className="text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-700/80 px-1.5 py-0.2 rounded shrink-0">
                  x{node.multiIcons?.length || 2} Split
                </span>
              )}
              {isNext && (
                <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-400/80 px-1.5 py-0.2 rounded-full animate-pulse shrink-0">
                  ★ Cần Nâng Tiếp
                </span>
              )}
              {isIgnored && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-700/80 shrink-0">
                  <EyeOff className="w-3 h-3" />
                  <span>Ignored</span>
                </span>
              )}
            </div>
            {isComplete && (
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" /> Node Complete!
              </span>
            )}
          </div>
        </div>

        {/* Right: Level with QoL increment buttons */}
        <div className="flex items-center gap-1 bg-[#151a27] border border-[#374151] rounded-lg p-1 shrink-0 relative z-10">
          <button
            onClick={() => updateNodeLevel(node.id, -1)}
            disabled={node.currentLevel <= 0}
            className="w-7 h-7 rounded bg-[#2b334a] hover:bg-[#384361] disabled:opacity-30 text-slate-200 font-bold flex items-center justify-center transition active:scale-95"
            title="Giảm 1 level"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <input
            type="number"
            min="0"
            max="30"
            value={node.currentLevel}
            onChange={(e) => {
              const val = Math.max(0, Math.min(30, parseInt(e.target.value) || 0))
              setNodeLevelDirect(node.id, val)
            }}
            className={`w-10 text-center bg-transparent font-mono font-bold text-base outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              isComplete ? 'text-emerald-400' : isNext ? 'text-amber-300' : 'text-slate-100'
            }`}
          />

          <button
            onClick={() => updateNodeLevel(node.id, 1)}
            disabled={node.currentLevel >= 30}
            className="w-7 h-7 rounded bg-[#2b334a] hover:bg-[#384361] disabled:opacity-30 text-slate-200 font-bold flex items-center justify-center transition active:scale-95"
            title="Tăng 1 level"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          {node.currentLevel < 30 && (
            <button
              onClick={() => setNodeLevelDirect(node.id, 30)}
              className="text-[10px] font-bold px-1.5 py-1 rounded bg-[#3b4463] hover:bg-sky-600 text-slate-200 hover:text-white transition ml-0.5"
              title="Đặt max level (30)"
            >
              Max
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 1. COMPACT TOP HEADER */}
      <div className="bg-[#1e2333] border border-[#3b4463] rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                HEXA Matrix Tracker
              </h1>
              <span className="text-[11px] font-bold bg-purple-950 text-purple-300 border border-purple-700 px-2 py-0.5 rounded-full">
                Lethe
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ruler of Covenants • 6th Job MapleStory
            </p>
          </div>
        </div>

        {/* Quick Remaining Cost Summary & Ignore Skill 3 Toggle in Top Header */}
        <div className="flex flex-wrap items-center gap-3">
          {thirdSkillNode && (
            <button
              type="button"
              onClick={toggleIgnoreSkill3}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                ignoreSkill3
                  ? 'bg-rose-950/90 border-rose-600/80 text-rose-200 shadow-sm shadow-rose-900/40'
                  : 'bg-[#151a27] border-[#3b4463] text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
              title={`Bật/tắt bỏ qua Skill thứ 3 (${thirdSkillNode.name}) khi nâng theo thứ tự`}
            >
              {thirdSkillNode.customIcon && (
                <img
                  src={thirdSkillNode.customIcon}
                  alt={thirdSkillNode.name}
                  className={`w-4 h-4 rounded object-cover ${ignoreSkill3 ? 'grayscale opacity-60' : ''}`}
                />
              )}
              <span>Ignore Skill 3</span>
              <span
                className={`w-7 h-4 rounded-full p-0.5 transition-colors flex items-center ${
                  ignoreSkill3 ? 'bg-rose-500 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
              </span>
            </button>
          )}

          <div className="flex items-center gap-4 bg-[#151a27] border border-[#3b4463] px-3.5 py-2 rounded-xl text-xs font-mono shadow-inner">
            <span className="text-slate-400 text-[11px] font-sans font-bold uppercase tracking-wider hidden sm:inline">
              Còn thiếu:
            </span>
            <span className="flex items-center gap-1.5 text-sky-300 font-bold">
              <Flame className="w-4 h-4 text-sky-400" />
              {totalCost.erda} Erda
            </span>
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Layers className="w-4 h-4 text-amber-400" />
              {totalCost.frags.toLocaleString()} Mảnh
            </span>
          </div>
        </div>
      </div>

      {/* 2. NODE CATEGORIES MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Skill Nodes & Enhancement Nodes */}
        <div className="space-y-5">
          {/* Skill Nodes */}
          <div className="bg-[#181d2a] border border-orange-900/60 rounded-2xl relative shadow-lg">
            <div className="bg-gradient-to-r from-orange-700 to-amber-700 px-4 py-2.5 font-bold text-slate-100 text-sm tracking-wide shadow flex items-center justify-between gap-2 rounded-t-2xl">
              <span>Skill Nodes</span>
              <div className="flex items-center gap-2.5">
                {thirdSkillNode && (
                  <button
                    type="button"
                    onClick={toggleIgnoreSkill3}
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold transition ${
                      ignoreSkill3
                        ? 'bg-rose-950/90 border-rose-500/80 text-rose-200'
                        : 'bg-orange-950/60 border-orange-400/50 text-orange-100 hover:border-orange-200 hover:text-white'
                    }`}
                    title={`Bật/tắt bỏ qua Skill 3 (${thirdSkillNode.name}) khi nâng theo order`}
                  >
                    {ignoreSkill3 ? (
                      <EyeOff className="w-3 h-3 text-rose-300" />
                    ) : (
                      <Eye className="w-3 h-3 text-orange-200" />
                    )}
                    <span>Ignore Skill 3</span>
                  </button>
                )}
                <span className="text-xs font-normal text-orange-100">
                  {skillNodes.filter((n) => n.currentLevel >= 30).length} / {skillNodes.length} Max
                </span>
              </div>
            </div>
            <div className="p-3.5 space-y-2.5">
              {skillNodes.map((n) => renderNodeItem(n))}
            </div>
          </div>

          {/* Enhancement Nodes (5th Job Boosts) */}
          <div className="bg-[#181d2a] border border-sky-900/60 rounded-2xl relative shadow-lg">
            <div className="bg-gradient-to-r from-sky-700 to-blue-800 px-4 py-2.5 font-bold text-slate-100 text-sm tracking-wide shadow flex items-center justify-between rounded-t-2xl">
              <span>Enhancement Nodes (5th Job Boosts)</span>
              <span className="text-xs font-normal text-sky-100">
                {enhancementNodes.filter((n) => n.currentLevel >= 30).length} / {enhancementNodes.length} Max
              </span>
            </div>
            <div className="p-3.5 space-y-2.5">
              {enhancementNodes.map((n) => renderNodeItem(n))}
            </div>
          </div>
        </div>

        {/* Right: Mastery Nodes & Common Nodes */}
        <div className="space-y-5">
          {/* Mastery Nodes */}
          <div className="bg-[#181d2a] border border-violet-900/60 rounded-2xl relative shadow-lg">
            <div className="bg-gradient-to-r from-violet-700 to-purple-700 px-4 py-2.5 font-bold text-slate-100 text-sm tracking-wide shadow flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span>Mastery Nodes</span>
                <span className="text-[11px] font-normal text-violet-200 bg-violet-900/60 px-2 py-0.5 rounded">
                  Ghép chéo 2 skill
                </span>
              </div>
              <span className="text-xs font-normal text-violet-200">
                {masteryNodes.filter((n) => n.currentLevel >= 30).length} / {masteryNodes.length} Max
              </span>
            </div>
            <div className="p-3.5 space-y-2.5">
              {masteryNodes.map((n) => renderNodeItem(n))}
            </div>
          </div>

          {/* Common Nodes */}
          <div className="bg-[#181d2a] border border-emerald-900/60 rounded-2xl relative shadow-lg">
            <div className="bg-gradient-to-r from-emerald-700 to-teal-800 px-4 py-2.5 font-bold text-slate-100 text-sm tracking-wide shadow flex items-center justify-between rounded-t-2xl">
              <span>Common Nodes (Sol Janus, Sol Hecate, Demonic Wrath)</span>
              <span className="text-xs font-normal text-emerald-100">
                {commonNodes.filter((n) => n.currentLevel >= 30).length} / {commonNodes.length} Max
              </span>
            </div>
            <div className="p-3.5 space-y-2.5">
              {commonNodes.map((n) => renderNodeItem(n))}
            </div>
          </div>
        </div>

        {/* Full-Width: HEXA Stat Nodes (I, II, III) */}
        <div className="lg:col-span-2 bg-[#181d2a] border border-zinc-700/80 rounded-2xl relative shadow-lg">
          <div className="bg-gradient-to-r from-zinc-950 via-neutral-900 to-zinc-900 border-b border-zinc-700/80 px-4 py-2.5 font-bold text-slate-100 text-sm tracking-wide shadow flex flex-wrap items-center justify-between gap-2 rounded-t-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span>HEXA Stat Nodes (I, II, III)</span>
              <span className="text-[11px] font-normal text-zinc-300 bg-zinc-800/90 border border-zinc-600/60 px-2 py-0.5 rounded">
                Tổng 3 Stat = 20 • Mở khóa lần lượt (I → II → III)
              </span>
            </div>
            <span className="text-xs font-normal text-zinc-300">
              {hexaStats.filter((s) => getStatTotalLevel(s) >= 20).length} / {hexaStats.length} Complete
            </span>
          </div>

          <div className="p-3.5 grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {hexaStats.map((stat, idx) => {
              const stat0Total = getStatTotalLevel(hexaStats[0])
              const stat1Total = getStatTotalLevel(hexaStats[1])
              const totalLvl = getStatTotalLevel(stat)

              const isLocked =
                (idx === 1 && stat0Total < 20) ||
                (idx === 2 && (stat0Total < 20 || stat1Total < 20))
              const isComplete = !isLocked && totalLvl >= 20

              const cleanTip = currentTipStep ? currentTipStep.skillName.toLowerCase() : ''
              const isNext =
                !isLocked &&
                cleanTip.includes('stat') &&
                ((idx === 2 && (cleanTip.includes('iii') || cleanTip.includes('3'))) ||
                  (idx === 1 &&
                    !cleanTip.includes('iii') &&
                    (cleanTip.includes('ii') || cleanTip.includes('2'))) ||
                  (idx === 0 &&
                    !cleanTip.includes('ii') &&
                    !cleanTip.includes('2') &&
                    !cleanTip.includes('3')))

              const showStatTip = activeNodeTooltip?.id === stat.id
              const prevStatName = idx === 1 ? 'HEXA Stat I' : 'HEXA Stat II'

              const handleOpenStatTip = (
                e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
              ) => {
                if (!isNext) return
                setActiveNodeTooltip({
                  id: stat.id,
                  rect: e.currentTarget.getBoundingClientRect()
                })
              }

              const statLines: {
                key: StatLineKey
                roleLabel: string
                statName: string
                level: number
                isMain: boolean
              }[] = [
                {
                  key: 'mainStatLevel',
                  roleLabel: 'Main',
                  statName: stat.mainStatType,
                  level: stat.mainStatLevel,
                  isMain: true
                },
                {
                  key: 'subStat1Level',
                  roleLabel: 'Sub 1',
                  statName: stat.subStat1Type,
                  level: stat.subStat1Level,
                  isMain: false
                },
                {
                  key: 'subStat2Level',
                  roleLabel: 'Sub 2',
                  statName: stat.subStat2Type,
                  level: stat.subStat2Level,
                  isMain: false
                }
              ]

              return (
                <div
                  key={stat.id}
                  onMouseEnter={handleOpenStatTip}
                  onMouseLeave={() => isNext && setActiveNodeTooltip(null)}
                  onTouchStart={handleOpenStatTip}
                  onTouchEnd={() => isNext && setActiveNodeTooltip(null)}
                  onTouchCancel={() => isNext && setActiveNodeTooltip(null)}
                  className={`rounded-xl p-3.5 flex flex-col gap-3 transition relative group ${
                    isNext
                      ? 'bg-[#291e38] border-2 border-amber-400/90 shadow-lg shadow-amber-500/20 z-20'
                      : isLocked
                      ? 'bg-[#171c29]/80 border border-[#2a3246] opacity-60 z-10'
                      : 'bg-[#242b3e] border border-[#374151] hover:border-slate-500 shadow-sm z-10'
                  }`}
                >
                  {/* Animated Marching Ants dashed border for next stat to upgrade */}
                  {isNext && (
                    <div className="absolute -inset-[3px] rounded-xl pointer-events-none z-30 overflow-hidden">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="1.5"
                          y="1.5"
                          width="calc(100% - 3px)"
                          height="calc(100% - 3px)"
                          rx="12"
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="2.5"
                          strokeDasharray="6 4"
                          className="animate-marching-ants"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Floating tooltip portaled to document.body */}
                  {isNext && showStatTip && activeNodeTooltip && currentTipStep && typeof document !== 'undefined' &&
                    createPortal(
                      <div
                        style={{
                          position: 'fixed',
                          left: Math.max(
                            12,
                            Math.min(
                              window.innerWidth - 260,
                              activeNodeTooltip.rect.left + activeNodeTooltip.rect.width / 2 - 120
                            )
                          ),
                          bottom: window.innerHeight - activeNodeTooltip.rect.top + 10,
                          zIndex: 9999
                        }}
                        className="min-w-[240px] max-w-xs bg-slate-900/98 border border-amber-400 rounded-xl p-3 shadow-2xl backdrop-blur-md pointer-events-none animate-in fade-in zoom-in-95 duration-150"
                      >
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider pb-1 border-b border-slate-800">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>HEXA Stat tiếp theo cần nâng</span>
                        </div>
                        <div className="pt-2 text-xs text-slate-200">
                          <p className="font-semibold text-slate-100">{stat.name}</p>
                          <div className="mt-1 flex items-center gap-2 font-mono">
                            <span className="text-slate-400">Tổng hiện tại: {totalLvl}/20</span>
                            <ArrowRight className="w-3 h-3 text-amber-400" />
                            <span className="text-amber-300 font-bold text-sm">
                              Đủ 20/20 để hoàn thành
                            </span>
                          </div>
                        </div>
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-amber-400 rotate-45" />
                      </div>,
                      document.body
                    )}

                  {/* Card Header: Icon, Node Name & Total Progress */}
                  <div className="flex items-center justify-between gap-2.5 pb-2.5 border-b border-slate-700/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`relative shrink-0 ${isLocked ? 'grayscale' : ''}`}>
                        <MultiSkillIcon
                          icons={[stat.icon || `./icons/common/hexa_stat_${idx + 1}.png`]}
                          size={42}
                          showTooltip={false}
                        />
                        {isLocked && (
                          <div className="absolute inset-0 bg-black/55 rounded-lg flex items-center justify-center">
                            <Lock className="w-4 h-4 text-slate-300" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-sm font-bold block truncate ${
                              isLocked ? 'text-slate-400' : 'text-slate-100'
                            }`}
                          >
                            {stat.name}
                          </span>
                          {isNext && (
                            <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-400/80 px-1.5 py-0.2 rounded-full animate-pulse shrink-0">
                              ★ Cần Nâng Tiếp
                            </span>
                          )}
                        </div>

                        {isLocked ? (
                          <span className="text-[11px] text-amber-400/80 flex items-center gap-1 mt-0.5">
                            <Lock className="w-3 h-3 shrink-0" /> Cần hoàn thành {prevStatName} (20/20)
                          </span>
                        ) : isComplete ? (
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" /> Đã hoàn thành (20/20)
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            Còn {20 - totalLvl} cấp để hoàn thành
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Total sum badge */}
                    <div
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs font-black border shrink-0 ${
                        isComplete
                          ? 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300'
                          : isNext
                          ? 'bg-amber-950/80 border-amber-500/70 text-amber-300'
                          : 'bg-[#151a27] border-[#374151] text-slate-300'
                      }`}
                    >
                      {totalLvl} / 20
                    </div>
                  </div>

                  {/* 3 Independent Stat Lines (A, B, C / B, A, C / C, A, B), each max Lv. 10 */}
                  <div className="space-y-2 relative z-10">
                    {statLines.map((line) => {
                      const otherSum = totalLvl - line.level
                      const maxForThisLine = Math.min(10, Math.max(0, 20 - otherSum))
                      const canIncrease = !isLocked && line.level < 10 && totalLvl < 20
                      const canDecrease = !isLocked && line.level > 0

                      return (
                        <div
                          key={line.key}
                          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border ${
                            line.isMain
                              ? 'bg-[#1a2032] border-purple-500/40'
                              : 'bg-[#171c2b] border-[#2e374f]'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                                line.isMain
                                  ? 'bg-purple-900/80 text-purple-200 border border-purple-600/60'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}
                            >
                              {line.roleLabel}
                            </span>
                            <span
                              className={`text-xs font-semibold truncate ${
                                line.isMain ? 'text-purple-200' : 'text-slate-200'
                              }`}
                              title={line.statName}
                            >
                              {line.statName}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 bg-[#111521] border border-[#323c54] rounded-md p-0.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateHexaStatLineLevel(idx, line.key, -1)}
                              disabled={!canDecrease}
                              className="w-6 h-6 rounded bg-[#252d42] hover:bg-[#343f5c] disabled:opacity-30 text-slate-200 font-bold flex items-center justify-center transition active:scale-95"
                              title="Giảm 1 cấp"
                            >
                              <Minus className="w-3 h-3" />
                            </button>

                            <input
                              type="number"
                              min="0"
                              max={maxForThisLine}
                              disabled={isLocked}
                              value={line.level}
                              onChange={(e) => {
                                const val = Math.max(
                                  0,
                                  Math.min(maxForThisLine, parseInt(e.target.value) || 0)
                                )
                                setHexaStatLineLevel(idx, line.key, val)
                              }}
                              className={`w-8 text-center bg-transparent font-mono font-bold text-xs outline-none disabled:opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                                line.isMain ? 'text-purple-300' : 'text-slate-100'
                              }`}
                            />

                            <button
                              type="button"
                              onClick={() => updateHexaStatLineLevel(idx, line.key, 1)}
                              disabled={!canIncrease}
                              className="w-6 h-6 rounded bg-[#252d42] hover:bg-[#343f5c] disabled:opacity-30 text-slate-200 font-bold flex items-center justify-center transition active:scale-95"
                              title="Tăng 1 cấp"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3. VISUAL SKILL ORDER SECTION (RENDERED FROM REAL ICONS WITH LEVEL IN BOTTOM-RIGHT) */}
      <div className="bg-[#181d2a] border border-[#3b4463] rounded-2xl shadow-xl relative">
        <div className="bg-[#242b3e] px-5 py-3 border-b border-[#3b4463] flex flex-wrap items-center justify-between gap-3 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-black text-slate-100 text-base">
              Thứ Tự Nâng Cấp Kỹ Năng Lethe ({currentPriority.steps.length} Bước)
            </h2>
          </div>

          <div className="flex items-center gap-1.5 bg-[#151a27] p-1 rounded-lg border border-[#3b4463] text-xs">
            <button
              onClick={() => setPriorityViewMode('grid')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition ${
                priorityViewMode === 'grid'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Dạng Lưới Icon</span>
            </button>
            <button
              onClick={() => setPriorityViewMode('list')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition ${
                priorityViewMode === 'list'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Dạng Danh Sách</span>
            </button>
          </div>
        </div>

        {/* Priority Grid Mode (Built with REAL skill icons & target level badge at bottom-right) */}
        {priorityViewMode === 'grid' ? (
          <div className="p-4 sm:p-5 overflow-x-auto">
            <div className="min-w-[840px]">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
                  gap: '8px'
                }}
              >
                {currentPriority.steps.map((step, idx) => {
                  const isCompleted = completedStepsMap[idx]
                  const isIgnored = Boolean(ignoredStepsMap[idx])
                  const isNext = idx === currentTipIndex
                  const isTooltipOpen = activeStepTooltip?.idx === idx
                  const frameClass = CATEGORY_THEMES[getStepCategory(step)]

                  const handleOpenStepTip = (
                    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
                  ) => {
                    setActiveStepTooltip({
                      idx,
                      rect: e.currentTarget.getBoundingClientRect()
                    })
                  }

                  return (
                    <div
                      key={idx}
                      onMouseEnter={handleOpenStepTip}
                      onMouseLeave={() => setActiveStepTooltip(null)}
                      onTouchStart={handleOpenStepTip}
                      onTouchEnd={() => setActiveStepTooltip(null)}
                      onTouchCancel={() => setActiveStepTooltip(null)}
                      className={`relative mx-auto w-fit flex items-center justify-center p-[2.5px] rounded-[10px] transition-transform cursor-pointer select-none z-10 hover:scale-105 hover:z-20 ${frameClass}`}
                    >
                      {/* Icon with target level in bottom right corner */}
                      <div
                        className={`relative rounded-lg overflow-hidden transition ${
                          isIgnored
                            ? 'opacity-25 grayscale'
                            : isCompleted
                            ? 'opacity-35 grayscale-[25%]'
                            : 'hover:shadow-md'
                        }`}
                      >
                        <MultiSkillIcon
                          icons={step.icons}
                          size={46}
                          showTooltip={false}
                          cornerBadge={
                            <span className="font-mono font-black text-[10px] text-white bg-black/90 px-1 py-0 rounded-tl border-t border-l border-slate-700 leading-tight">
                              {step.targetLevel}
                            </span>
                          }
                        />

                        {/* Ignored overlay */}
                        {isIgnored && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                            <EyeOff className="w-4 h-4 text-rose-400 stroke-[2.5]" />
                          </div>
                        )}

                        {/* Completed overlay check */}
                        {!isIgnored && isCompleted && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Floating tooltip portaled to document.body */}
                      {isTooltipOpen && activeStepTooltip && typeof document !== 'undefined' &&
                        createPortal(
                          <div
                            style={{
                              position: 'fixed',
                              left: Math.max(
                                12,
                                Math.min(
                                  window.innerWidth - 230,
                                  activeStepTooltip.rect.left + activeStepTooltip.rect.width / 2 - 105
                                )
                              ),
                              bottom: window.innerHeight - activeStepTooltip.rect.top + 8,
                              zIndex: 9999
                            }}
                            className="min-w-[210px] max-w-xs bg-slate-900/98 border border-amber-400/90 rounded-xl p-2.5 shadow-2xl backdrop-blur-md pointer-events-none animate-in fade-in zoom-in-95 duration-100"
                          >
                            <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[11px] font-bold text-amber-300">
                              <span>Bước #{idx + 1}</span>
                              <span className="font-mono text-white">
                                Mục tiêu: Lv {step.targetLevel}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-slate-100 mt-1 truncate">
                              {step.skillName}
                            </p>
                            <div className="mt-1.5 pt-1 border-t border-slate-800/80 text-[10px] flex items-center justify-between">
                              <span className="text-slate-400">Trạng thái:</span>
                              <span
                                className={`font-bold ${
                                  isIgnored
                                    ? 'text-rose-400'
                                    : isCompleted
                                    ? 'text-emerald-400'
                                    : isNext
                                    ? 'text-amber-400'
                                    : 'text-slate-400'
                                }`}
                              >
                                {isIgnored
                                  ? '⊘ Đã bỏ qua (Ignored)'
                                  : isCompleted
                                  ? '✓ Đã hoàn thành'
                                  : isNext
                                  ? '★ Cần nâng tiếp theo'
                                  : 'Chưa đến lượt'}
                              </span>
                            </div>
                            {/* Arrow pointer */}
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-amber-400 rotate-45" />
                          </div>,
                          document.body
                        )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Priority List Mode */
          <div className="p-4 overflow-y-auto max-h-[560px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            {currentPriority.steps.map((step, idx) => {
              const isCompleted = completedStepsMap[idx]
              const isIgnored = Boolean(ignoredStepsMap[idx])
              const isNext = idx === currentTipIndex

              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition ${
                    isNext
                      ? 'bg-purple-950/90 border-2 border-amber-400 shadow-lg shadow-amber-400/20 text-purple-100 font-bold'
                      : isIgnored
                      ? 'bg-[#151a27]/40 border-rose-900/30 text-slate-500 line-through opacity-50'
                      : isCompleted
                      ? 'bg-[#151a27]/60 border-[#2a3045] text-slate-500 line-through'
                      : 'bg-[#1e2333] border-[#3b4463] text-slate-200 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate flex-1 min-w-0">
                    {isIgnored ? (
                      <EyeOff className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : isCompleted ? (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-slate-600 shrink-0 flex items-center justify-center text-[10px] font-mono text-slate-400">
                        {idx + 1}
                      </span>
                    )}

                    <MultiSkillIcon
                      icons={step.icons || []}
                      size={32}
                      showTooltip={false}
                    />

                    <span className="truncate" title={step.skillName}>
                      {step.skillName}
                    </span>
                  </div>

                  <span
                    className={`font-mono font-bold shrink-0 ml-2 ${
                      isNext
                        ? 'text-amber-300 text-sm'
                        : isIgnored
                        ? 'text-rose-400/70'
                        : isCompleted
                        ? 'text-slate-600'
                        : 'text-amber-400'
                    }`}
                  >
                    Lv {step.targetLevel}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
