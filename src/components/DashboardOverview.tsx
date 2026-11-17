import React from 'react'
import {
  Flame,
  Layers,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Plus,
  Minus
} from 'lucide-react'
import { Character } from '../types/hexa'
import { calculateCostBetweenLevels } from '../data/hexaCosts'

interface DashboardOverviewProps {
  character: Character
  onUpdateCharacter: (updater: (prev: Character) => Character) => void
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  character,
  onUpdateCharacter
}) => {
  // Calculate total costs for target levels
  let totalErdaNeeded = 0
  let totalFragmentsNeeded = 0

  character.nodes.forEach((node) => {
    const cost = calculateCostBetweenLevels(node.type, node.currentLevel, node.targetLevel)
    totalErdaNeeded += cost.solErda
    totalFragmentsNeeded += cost.fragments
  })

  // Current owned
  const currentErdaDecimal = character.currentSolErda + character.currentSolErdaEnergy / 1000
  const remainingErda = Math.max(0, totalErdaNeeded - currentErdaDecimal)
  const remainingFragments = Math.max(0, totalFragmentsNeeded - character.currentFragments)

  // Daily & Weekly income estimation
  // Daily quest: 12 frags + 600 energy (0.6 Sol Erda)
  // Weekly High mountain: 20 frags + 2 Sol Erda (avg ~2.85 frags/day + 0.285 erda/day)
  // Plus extra farmed fragments
  const dailyIncomeFrags =
    character.daily.dailyFragments +
    character.daily.weeklyFragments / 7 +
    (character.daily.extraDailyFarmedFragments || 0)

  const dailyIncomeErda =
    character.daily.dailySolErdaEnergy / 1000 +
    character.daily.weeklySolErda / 7

  const daysForFragments = dailyIncomeFrags > 0 ? Math.ceil(remainingFragments / dailyIncomeFrags) : 9999
  const daysForErda = dailyIncomeErda > 0 ? Math.ceil(remainingErda / dailyIncomeErda) : 9999
  const estimatedDays = Math.max(daysForFragments, daysForErda)

  // Overall completion percentage
  let maxPossibleCostFrags = 0
  let currentCostFrags = 0
  character.nodes.forEach((node) => {
    const maxCost = calculateCostBetweenLevels(node.type, 0, 30)
    const currentCost = calculateCostBetweenLevels(node.type, 0, node.currentLevel)
    maxPossibleCostFrags += maxCost.fragments
    currentCostFrags += currentCost.fragments
  })
  const progressPercent = maxPossibleCostFrags > 0
    ? Math.min(100, Math.round((currentCostFrags / maxPossibleCostFrags) * 100))
    : 0

  const adjustResource = (key: 'solErda' | 'energy' | 'fragments', delta: number) => {
    onUpdateCharacter((prev) => {
      let solErda = prev.currentSolErda
      let energy = prev.currentSolErdaEnergy
      let frags = prev.currentFragments

      if (key === 'solErda') {
        solErda = Math.max(0, Math.min(20, solErda + delta))
      } else if (key === 'energy') {
        let total = energy + delta
        while (total >= 1000 && solErda < 20) {
          total -= 1000
          solErda += 1
        }
        while (total < 0 && solErda > 0) {
          total += 1000
          solErda -= 1
        }
        energy = Math.max(0, Math.min(999, total))
      } else if (key === 'fragments') {
        frags = Math.max(0, frags + delta)
      }

      return {
        ...prev,
        currentSolErda: solErda,
        currentSolErdaEnergy: energy,
        currentFragments: frags,
        updatedAt: Date.now()
      }
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 1. Sol Erda Tracker Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 text-sm">Sol Erda Hiện Có</h3>
              <p className="text-xs text-slate-400">Tối đa 20 Sol Erda</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-sky-950 text-sky-300 border border-sky-800/60 px-2 py-0.5 rounded">
            {character.currentSolErdaEnergy} / 1000 Energy
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-extrabold text-sky-400 font-mono tracking-tight">
            {character.currentSolErda}
          </span>
          <span className="text-sm text-slate-400 font-medium">Sol Erda</span>
          <span className="text-xs text-slate-500 ml-auto font-mono">
            +{(character.currentSolErdaEnergy / 1000).toFixed(3)}
          </span>
        </div>

        {/* Progress bar of current energy */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
          <div
            className="bg-sky-500 h-full transition-all duration-300"
            style={{ width: `${(character.currentSolErdaEnergy / 1000) * 100}%` }}
          />
        </div>

        {/* Quick controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-slate-400 mr-1">Sol Erda:</span>
            <button
              onClick={() => adjustResource('solErda', -1)}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => adjustResource('solErda', 1)}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-400 mr-1">Energy:</span>
            <button
              onClick={() => adjustResource('energy', 100)}
              className="px-1.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition font-mono"
            >
              +100
            </button>
            <button
              onClick={() => adjustResource('energy', 600)}
              className="px-1.5 py-1 rounded bg-sky-900/60 hover:bg-sky-800 text-sky-200 transition font-mono"
            >
              +600
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sol Erda Fragments Tracker Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 text-sm">Mảnh Sol Erda (Fragments)</h3>
              <p className="text-xs text-slate-400">Dùng nâng cấp Skill & Stat</p>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-extrabold text-amber-400 font-mono tracking-tight">
            {character.currentFragments.toLocaleString()}
          </span>
          <span className="text-sm text-slate-400 font-medium">Mảnh</span>
        </div>

        {/* Input fragment amount directly */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            min="0"
            value={character.currentFragments}
            onChange={(e) => {
              const val = Math.max(0, parseInt(e.target.value) || 0)
              onUpdateCharacter((prev) => ({
                ...prev,
                currentFragments: val,
                updatedAt: Date.now()
              }))
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
            placeholder="Nhập số lượng..."
          />
        </div>

        {/* Quick fragment increment */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400">Tăng nhanh:</span>
          <div className="flex items-center gap-1.5 font-mono">
            <button
              onClick={() => adjustResource('fragments', 10)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              +10
            </button>
            <button
              onClick={() => adjustResource('fragments', 50)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              +50
            </button>
            <button
              onClick={() => adjustResource('fragments', 100)}
              className="px-2 py-0.5 rounded bg-amber-950/80 hover:bg-amber-900 text-amber-300 transition"
            >
              +100
            </button>
          </div>
        </div>
      </div>

      {/* 3. Target Cost & ETA Summary Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 text-sm">Tiến Độ Đến Mục Tiêu</h3>
              <p className="text-xs text-slate-400">Tổng quan tài nguyên cần</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
            {progressPercent}% Hoàn tất
          </span>
        </div>

        <div className="space-y-2 mb-3 text-xs">
          <div className="flex justify-between items-center bg-slate-950/60 px-2.5 py-1.5 rounded border border-slate-800/60">
            <span className="text-slate-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-sky-400" /> Cần thêm Sol Erda:
            </span>
            <span className="font-mono font-bold text-sky-300">
              {remainingErda <= 0 ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đủ
                </span>
              ) : (
                `${remainingErda.toFixed(1)} / ${totalErdaNeeded}`
              )}
            </span>
          </div>

          <div className="flex justify-between items-center bg-slate-950/60 px-2.5 py-1.5 rounded border border-slate-800/60">
            <span className="text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" /> Cần thêm Mảnh:
            </span>
            <span className="font-mono font-bold text-amber-300">
              {remainingFragments <= 0 ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đủ
                </span>
              ) : (
                `${remainingFragments.toLocaleString()} / ${totalFragmentsNeeded.toLocaleString()}`
              )}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Dự kiến xong sau:
          </span>
          <span className="font-mono font-semibold text-indigo-300">
            {remainingFragments <= 0 && remainingErda <= 0
              ? 'Đã đạt mục tiêu!'
              : estimatedDays >= 9999
              ? 'Chưa đủ dữ liệu'
              : `~${estimatedDays} ngày`}
          </span>
        </div>
      </div>
    </div>
  )
}
