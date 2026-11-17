export type NodeType = 'origin' | 'mastery' | 'boost' | 'common'

export interface SubSkillItem {
  name: string
  icon: string
}

export interface HexaSkillNode {
  id: string
  name: string
  type: NodeType
  currentLevel: number
  targetLevel: number
  customIcon?: string
  multiIcons?: string[]
  subSkills?: SubSkillItem[]
}

export interface HexaStatNode {
  id: string
  name: string
  icon?: string
  mainStatType: string
  subStat1Type: string
  subStat2Type: string
  mainStatLevel: number
  subStat1Level: number
  subStat2Level: number
}

export interface DailyTracker {
  dailyQuestDone: boolean
  dailyFragments: number
  dailySolErdaEnergy: number
  weeklyHighMountainDone: boolean
  weeklyFragments: number
  weeklySolErda: number
  extraDailyFarmedFragments: number
  lastUpdatedDate: string // YYYY-MM-DD
}

export interface Character {
  id: string
  name: string
  job: string
  classId?: string
  selectedPriorityId?: string
  ignoreVoidOrigin?: boolean
  level: number
  server: string
  currentSolErda: number       // full sol erda (0-20)
  currentSolErdaEnergy: number // 0 - 1000
  currentFragments: number
  nodes: HexaSkillNode[]
  hexaStats: HexaStatNode[]
  daily: DailyTracker
  updatedAt: number
}

export interface SyncState {
  enabled: boolean
  syncCode: string | null
  lastSyncedAt: number | null
  lastModifiedAt: number
  status: 'idle' | 'syncing' | 'synced' | 'error' | 'offline'
  error?: string
}

export interface AppState {
  characters: Character[]
  activeCharacterId: string | null
  sync: SyncState
  customNostrRelays?: string[]
}
