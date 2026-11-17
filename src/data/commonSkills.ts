import { HexaSkillNode } from '../types/hexa'

export const COMMON_ICONS = {
  hexaStat1: './icons/common/hexa_stat_1.png',
  hexaStat2: './icons/common/hexa_stat_2.png',
  hexaStat3: './icons/common/hexa_stat_3.png',
  solJanus: './icons/common/sol_janus.png',
  solHecate: './icons/common/sol_hecate.png',
  unknownSkill: './icons/common/unknown_skill.png'
} as const

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
  | string

export const BRANCH_COMMON_SKILLS: Record<
  string,
  { id: string; name: string; icon: string }
> = {
  explorer_warrior: {
    id: 'branch-explorer-warrior-common',
    name: 'HEXA Blitz Shield',
    icon: './icons/branches/explorer_warrior/hexa_blitz_shield.png'
  },
  explorer_magician: {
    id: 'branch-explorer-magician-common',
    name: 'HEXA Arcane Overdrive',
    icon: './icons/branches/explorer_magician/hexa_arcane_overdrive.png'
  },
  explorer_bowman: {
    id: 'branch-explorer-bowman-common',
    name: 'HEXA Fury of the Wild',
    icon: './icons/branches/explorer_bowman/hexa_fury_of_the_wild.png'
  },
  explorer_thief: {
    id: 'branch-explorer-thief-common',
    name: 'HEXA Shadow Walker',
    icon: './icons/branches/explorer_thief/hexa_shadow_walker.png'
  },
  explorer_pirate: {
    id: 'branch-explorer-pirate-common',
    name: "HEXA Pirate's Banner",
    icon: './icons/branches/explorer_pirate/hexa_pirates_banner.png'
  },
  cygnus_knight: {
    id: 'branch-cygnus-knight-common',
    name: 'HEXA Phalanx Charge',
    icon: './icons/branches/cygnus_knight/hexa_phalanx_charge.png'
  },
  hero: {
    id: 'branch-hero-common',
    name: "HEXA Freud's Wisdom",
    icon: './icons/branches/hero/hexa_freuds_wisdom.png'
  },
  resistance: {
    id: 'branch-resistance-common',
    name: 'HEXA Resistance Infantry',
    icon: './icons/branches/resistance/hexa_resistance_infantry.png'
  },
  demon: {
    id: 'branch-demon-common',
    name: 'HEXA Defender of the Demon',
    icon: './icons/branches/demon/hexa_defender_of_the_demon.png'
  },
  demonic: {
    id: 'branch-demonic-common',
    name: 'HEXA Demonic Wrath',
    icon: './icons/branches/demonic/hexa_demonic_wrath.png'
  },
  nova: {
    id: 'branch-nova-common',
    name: 'HEXA Might of the Nova',
    icon: './icons/branches/nova/hexa_might_of_the_nova.png'
  },
  transcendent: {
    id: 'branch-transcendent-common',
    name: 'HEXA Transcendent',
    icon: './icons/branches/transcendent/hexa_transcendent.png'
  },
  friends_world: {
    id: 'branch-friends-world-common',
    name: 'HEXA Afterimage of the Otherworld',
    icon: './icons/branches/friends_world/hexa_afterimage_of_the_otherworld.png'
  },
  flora: {
    id: 'branch-flora-common',
    name: 'HEXA Conversion Overdrive',
    icon: './icons/branches/flora/hexa_conversion_overdrive.png'
  },
  jianghu: {
    id: 'branch-jianghu-common',
    name: 'HEXA Ring of Samsara',
    icon: './icons/branches/jianghu/hexa_ring_of_samsara.png'
  },
  sengoku: {
    id: 'branch-sengoku-common',
    name: 'HEXA Twilight Bloom',
    icon: './icons/branches/sengoku/hexa_twilight_bloom.png'
  },
  anima: {
    id: 'branch-anima-common',
    name: 'HEXA Lotus Flower',
    icon: './icons/branches/anima/hexa_lotus_flower.png'
  }
}

export function getCommonNodesForBranch(
  branch: ClassBranch
): Omit<HexaSkillNode, 'currentLevel' | 'targetLevel'>[] {
  const branchSkill = BRANCH_COMMON_SKILLS[branch]
  return [
    {
      id: 'common-sol-janus',
      name: 'Sol Janus',
      type: 'common',
      customIcon: COMMON_ICONS.solJanus
    },
    {
      id: 'common-sol-hecate',
      name: 'Sol Hecate',
      type: 'common',
      customIcon: COMMON_ICONS.solHecate
    },
    ...(branchSkill
      ? [
          {
            id: branchSkill.id,
            name: branchSkill.name,
            type: 'common' as const,
            customIcon: branchSkill.icon
          }
        ]
      : [])
  ]
}

export interface PriorityStep {
  skillName: string
  shortName: string
  targetLevel: number
  icons: string[]
}

export interface ClassMeta {
  id: string
  name: string
  branch: ClassBranch
}

export interface ClassPreset extends ClassMeta {
  welcomeMessage: string
  hexaStatTypes?: [string, string, string]
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
