import type { HexaSkillNode } from './hexa'

export type ClassId = 'lethe' | 'kanna' | 'lynn'

export type ClassBranch =
  | 'explorer_warrior'
  | 'explorer_magician'
  | 'explorer_bowman'
  | 'explorer_thief'
  | 'explorer_pirate'
  | 'cygnus_knight'
  | 'hero'
  | 'resistance'
  | 'demon'
  | 'demonic'
  | 'nova'
  | 'transcendent'
  | 'friends_world'
  | 'flora'
  | 'jianghu'
  | 'sengoku'
  | 'anima'

export interface BranchCommonSkill {
  id: string
  name: string
  icon: string
}

export interface SkillMeta {
  skillName: string
  shortName: string
  icons: readonly string[]
}

export type PriorityOrderStep<K extends string> = readonly [K, number]

export interface PriorityStep {
  skillName: string
  shortName: string
  targetLevel: number
  icons: string[]
}

export type HexaStatTriplet = [string, string, string]

export interface ClassMeta {
  id: ClassId
  name: string
  branch: ClassBranch
}

export interface ClassPreset extends ClassMeta {
  welcomeMessage: string
  hexaStatTypes?: HexaStatTriplet
  priorities: {
    id: string
    name: string
    steps: PriorityStep[]
  }[]
  nodes: {
    skills: Omit<HexaSkillNode, 'currentLevel' | 'targetLevel'>[]
    mastery: Omit<HexaSkillNode, 'currentLevel' | 'targetLevel'>[]
    enhancement: Omit<HexaSkillNode, 'currentLevel' | 'targetLevel'>[]
    common: Omit<HexaSkillNode, 'currentLevel' | 'targetLevel'>[]
  }
}
