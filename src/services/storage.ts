import { AppState, Character, HexaSkillNode, HexaStatNode, DailyTracker } from '../types/hexa'
import { CLASS_PRESETS, COMMON_ICONS, LETHE_CLASS } from '../data/classesData'

const STORAGE_KEY = 'maple_hexa_tracker_state_v4'

export function createDefaultDailyTracker(): DailyTracker {
  return {
    dailyQuestDone: false,
    dailyFragments: 12,
    dailySolErdaEnergy: 600,
    weeklyHighMountainDone: false,
    weeklyFragments: 20,
    weeklySolErda: 2,
    extraDailyFarmedFragments: 0,
    lastUpdatedDate: new Date().toISOString().split('T')[0]
  }
}

export function createDefaultHexaStats(classId = 'lethe'): HexaStatNode[] {
  const preset = CLASS_PRESETS[classId] || LETHE_CLASS
  const [statA, statB, statC] = preset.hexaStatTypes || ['M.ATT', 'INT', 'Crit Damage']

  return [
    {
      id: 'stat-1',
      name: 'HEXA Stat I',
      icon: COMMON_ICONS.hexaStat1,
      mainStatType: statA,
      subStat1Type: statB,
      subStat2Type: statC,
      mainStatLevel: 0,
      subStat1Level: 0,
      subStat2Level: 0
    },
    {
      id: 'stat-2',
      name: 'HEXA Stat II',
      icon: COMMON_ICONS.hexaStat2,
      mainStatType: statB,
      subStat1Type: statA,
      subStat2Type: statC,
      mainStatLevel: 0,
      subStat1Level: 0,
      subStat2Level: 0
    },
    {
      id: 'stat-3',
      name: 'HEXA Stat III',
      icon: COMMON_ICONS.hexaStat3,
      mainStatType: statC,
      subStat1Type: statA,
      subStat2Type: statB,
      mainStatLevel: 0,
      subStat1Level: 0,
      subStat2Level: 0
    }
  ]
}

export function createCharacterFromPreset(name: string, classId = 'lethe'): Character {
  const preset = CLASS_PRESETS[classId] || LETHE_CLASS
  const nodes: HexaSkillNode[] = [
    ...preset.nodes.skills.map((n) => ({ ...n, currentLevel: 0, targetLevel: 30 })),
    ...preset.nodes.mastery.map((n) => ({ ...n, currentLevel: 0, targetLevel: 30 })),
    ...preset.nodes.enhancement.map((n) => ({ ...n, currentLevel: 0, targetLevel: 30 })),
    ...preset.nodes.common.map((n) => ({ ...n, currentLevel: 0, targetLevel: 30 }))
  ]

  return {
    id: 'char-' + Date.now(),
    name: name.trim() || preset.name,
    job: preset.name,
    classId: preset.id,
    selectedPriorityId: preset.priorities[0]?.id || 'default',
    ignoreVoidOrigin: false,
    level: 260,
    server: 'Global / MSEA / KMS',
    currentSolErda: 0,
    currentSolErdaEnergy: 0,
    currentFragments: 0,
    nodes,
    hexaStats: createDefaultHexaStats(),
    daily: createDefaultDailyTracker(),
    updatedAt: Date.now()
  }
}

export function getDefaultAppState(): AppState {
  return {
    characters: [],
    activeCharacterId: null,
    sync: {
      enabled: false,
      syncCode: null,
      lastSyncedAt: null,
      lastModifiedAt: Date.now(),
      status: 'idle'
    },
    customNostrRelays: []
  }
}

export function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultAppState()
    const parsed = JSON.parse(raw) as AppState

    if (!parsed || !Array.isArray(parsed.characters)) {
      return getDefaultAppState()
    }

    // Refresh nodes with latest preset data and preserve levels
    const defaultNodes = [
      ...LETHE_CLASS.nodes.skills,
      ...LETHE_CLASS.nodes.mastery,
      ...LETHE_CLASS.nodes.enhancement,
      ...LETHE_CLASS.nodes.common
    ]

    parsed.characters = parsed.characters.map((char) => {
      const levelMapByName = new Map(char.nodes.map((n) => [n.name, n.currentLevel]))
      const levelMapById = new Map(char.nodes.map((n) => [n.id, n.currentLevel]))

      const updatedNodes: HexaSkillNode[] = defaultNodes.map((n) => {
        let currentLvl = levelMapByName.get(n.name) ?? levelMapById.get(n.id)
        if (currentLvl === undefined) {
          if (n.name.includes('Majeure')) {
            currentLvl = levelMapByName.get('HEXA Majeure')
          } else if (n.name.includes('Demonic')) {
            currentLvl = levelMapByName.get('HEXA Demonic Wrath') ?? levelMapByName.get('HEXA Demonic Wroth')
          } else if (n.name.includes('Janus')) {
            currentLvl = levelMapByName.get('Sol Janus')
          } else if (n.name.includes('Void Origin')) {
            currentLvl = levelMapByName.get('Void Origin')
          }
        }
        return {
          ...n,
          currentLevel: currentLvl || 0,
          targetLevel: 30
        }
      })

      const defaultStats = createDefaultHexaStats(char.classId || 'lethe')
      const existingStats = Array.isArray(char.hexaStats) ? char.hexaStats : []
      const updatedStats: HexaStatNode[] = defaultStats.map((defStat, idx) => {
        const found =
          existingStats.find((s) => s.id === defStat.id) || existingStats[idx]
        const m = found ? Math.max(0, Math.min(10, found.mainStatLevel || 0)) : 0
        const s1 = found ? Math.max(0, Math.min(10, 20 - m, found.subStat1Level || 0)) : 0
        const s2 = found ? Math.max(0, Math.min(10, 20 - m - s1, found.subStat2Level || 0)) : 0
        return {
          ...defStat,
          mainStatLevel: m,
          subStat1Level: s1,
          subStat2Level: s2
        }
      })

      const getTotalStatLvl = (s: HexaStatNode) =>
        s.mainStatLevel + s.subStat1Level + s.subStat2Level

      // Enforce sequential unlock: Stat II requires Stat I total == 20, Stat III requires Stat II total == 20
      if (getTotalStatLvl(updatedStats[0]) < 20) {
        updatedStats[1] = { ...updatedStats[1], mainStatLevel: 0, subStat1Level: 0, subStat2Level: 0 }
        updatedStats[2] = { ...updatedStats[2], mainStatLevel: 0, subStat1Level: 0, subStat2Level: 0 }
      } else if (getTotalStatLvl(updatedStats[1]) < 20) {
        updatedStats[2] = { ...updatedStats[2], mainStatLevel: 0, subStat1Level: 0, subStat2Level: 0 }
      }

      return {
        ...char,
        classId: 'lethe',
        job: 'Lethe',
        ignoreVoidOrigin: char.ignoreVoidOrigin ?? false,
        nodes: updatedNodes,
        hexaStats: updatedStats
      }
    })

    return parsed
  } catch (e) {
    console.error('Failed to load local state, using defaults', e)
    return getDefaultAppState()
  }
}

export function saveAppState(state: AppState): void {
  try {
    const stateToSave = {
      ...state,
      sync: {
        ...state.sync,
        lastModifiedAt: Date.now()
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
  } catch (e) {
    console.error('Failed to save local state', e)
  }
}

export function exportStateAsJSON(state: AppState): string {
  return JSON.stringify(state, null, 2)
}

export function importStateFromJSON(jsonString: string): AppState | null {
  try {
    const parsed = JSON.parse(jsonString)
    if (parsed && Array.isArray(parsed.characters)) {
      return parsed as AppState
    }
    return null
  } catch (e) {
    console.error('Invalid JSON provided for import', e)
    return null
  }
}
