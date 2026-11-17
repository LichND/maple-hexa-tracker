import { HexaSkillNode } from "../types/hexa"

export const COMMON_ICONS = {
  hexaStat1: "./icons/common/hexa_stat_1.png",
  hexaStat2: "./icons/common/hexa_stat_2.png",
  hexaStat3: "./icons/common/hexa_stat_3.png",
  solJanus: "./icons/common/sol_janus.png",
  solHecate: "./icons/common/sol_hecate.png",
  unknownSkill: "./icons/common/unknown_skill.png"
} as const

export type ClassBranch =
  | "explorer_warrior"
  | "explorer_magician"
  | "explorer_bowman"
  | "explorer_thief"
  | "explorer_pirate"
  | "cygnus_knight"
  | "hero"
  | "resistance"
  | "demon"
  | "demonic"
  | "nova"
  | "transcendent"
  | "friends_world"
  | "flora"
  | "jianghu"
  | "sengoku"
  | "anima"
  | string

export const BRANCH_COMMON_SKILLS: Record<
  string,
  { id: string; name: string; icon: string }
> = {
  explorer_warrior: {
    id: "branch-explorer-warrior-common",
    name: "HEXA Blitz Shield",
    icon: "./icons/branches/explorer_warrior/hexa_blitz_shield.png"
  },
  explorer_magician: {
    id: "branch-explorer-magician-common",
    name: "HEXA Arcane Overdrive",
    icon: "./icons/branches/explorer_magician/hexa_arcane_overdrive.png"
  },
  explorer_bowman: {
    id: "branch-explorer-bowman-common",
    name: "HEXA Fury of the Wild",
    icon: "./icons/branches/explorer_bowman/hexa_fury_of_the_wild.png"
  },
  explorer_thief: {
    id: "branch-explorer-thief-common",
    name: "HEXA Shadow Walker",
    icon: "./icons/branches/explorer_thief/hexa_shadow_walker.png"
  },
  explorer_pirate: {
    id: "branch-explorer-pirate-common",
    name: "HEXA Pirate's Banner",
    icon: "./icons/branches/explorer_pirate/hexa_pirates_banner.png"
  },
  cygnus_knight: {
    id: "branch-cygnus-knight-common",
    name: "HEXA Phalanx Charge",
    icon: "./icons/branches/cygnus_knight/hexa_phalanx_charge.png"
  },
  hero: {
    id: "branch-hero-common",
    name: "HEXA Freud's Wisdom",
    icon: "./icons/branches/hero/hexa_freuds_wisdom.png"
  },
  resistance: {
    id: "branch-resistance-common",
    name: "HEXA Resistance Infantry",
    icon: "./icons/branches/resistance/hexa_resistance_infantry.png"
  },
  demon: {
    id: "branch-demon-common",
    name: "HEXA Defender of the Demon",
    icon: "./icons/branches/demon/hexa_defender_of_the_demon.png"
  },
  demonic: {
    id: "branch-demonic-common",
    name: "HEXA Demonic Wrath",
    icon: "./icons/branches/demonic/hexa_demonic_wrath.png"
  },
  nova: {
    id: "branch-nova-common",
    name: "HEXA Might of the Nova",
    icon: "./icons/branches/nova/hexa_might_of_the_nova.png"
  },
  transcendent: {
    id: "branch-transcendent-common",
    name: "HEXA Transcendent",
    icon: "./icons/branches/transcendent/hexa_transcendent.png"
  },
  friends_world: {
    id: "branch-friends-world-common",
    name: "HEXA Afterimage of the Otherworld",
    icon: "./icons/branches/friends_world/hexa_afterimage_of_the_otherworld.png"
  },
  flora: {
    id: "branch-flora-common",
    name: "HEXA Conversion Overdrive",
    icon: "./icons/branches/flora/hexa_conversion_overdrive.png"
  },
  jianghu: {
    id: "branch-jianghu-common",
    name: "HEXA Ring of Samsara",
    icon: "./icons/branches/jianghu/hexa_ring_of_samsara.png"
  },
  sengoku: {
    id: "branch-sengoku-common",
    name: "HEXA Twilight Bloom",
    icon: "./icons/branches/sengoku/hexa_twilight_bloom.png"
  },
  anima: {
    id: "branch-anima-common",
    name: "HEXA Lotus Flower",
    icon: "./icons/branches/anima/hexa_lotus_flower.png"
  }
}

export function getCommonNodesForBranch(
  branch: ClassBranch
): Omit<HexaSkillNode, "currentLevel" | "targetLevel">[] {
  const branchSkill = BRANCH_COMMON_SKILLS[branch]
  return [
    {
      id: "common-sol-janus",
      name: "Sol Janus",
      type: "common",
      customIcon: COMMON_ICONS.solJanus
    },
    {
      id: "common-sol-hecate",
      name: "Sol Hecate",
      type: "common",
      customIcon: COMMON_ICONS.solHecate
    },
    ...(branchSkill
      ? [
          {
            id: branchSkill.id,
            name: branchSkill.name,
            type: "common" as const,
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

export interface ClassPreset {
  id: string
  name: string
  branch: ClassBranch
  welcomeMessage: string
  hexaStatTypes?: [string, string, string]
  priorities: {
    id: string
    name: string
    steps: PriorityStep[]
  }[]
  nodes: {
    skills: Omit<HexaSkillNode, "currentLevel" | "targetLevel">[]
    mastery: Omit<HexaSkillNode, "currentLevel" | "targetLevel">[]
    enhancement: Omit<HexaSkillNode, "currentLevel" | "targetLevel">[]
    common: Omit<HexaSkillNode, "currentLevel" | "targetLevel">[]
  }
}

export const LETHE_PRIORITY_STEPS: PriorityStep[] = [
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 1,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 4,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "Chains of Command Boost",
    "shortName": "Chains of Command Boost",
    "targetLevel": 1,
    "icons": [
      "./icons/lethe/chains_of_command.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 5,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 4,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 3,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 6,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 4,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 5,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 7,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 1,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 6,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 8,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 5,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 2,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Stat I",
    "shortName": "HEXA Stat I",
    "targetLevel": 20,
    "icons": [
      "./icons/common/hexa_stat_1.png"
    ]
  },
  {
    "skillName": "Void Origin",
    "shortName": "Void Origin",
    "targetLevel": 1,
    "icons": [
      "./icons/lethe/void_origin.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 6,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 7,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 9,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 8,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 3,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 7,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 9,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 8,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 4,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 9,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 5,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Stat II",
    "shortName": "HEXA Stat II",
    "targetLevel": 20,
    "icons": [
      "./icons/common/hexa_stat_2.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 7,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 14,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Stat III",
    "shortName": "HEXA Stat III",
    "targetLevel": 20,
    "icons": [
      "./icons/common/hexa_stat_3.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 15,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 8,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 16,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 9,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 14,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 17,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 15,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 18,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 14,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 1,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Void Origin",
    "shortName": "Void Origin",
    "targetLevel": 3,
    "icons": [
      "./icons/lethe/void_origin.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 16,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 15,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 19,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 17,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "targetLevel": 1,
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 16,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 18,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 17,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "targetLevel": 1,
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  {
    "skillName": "Chains of Command Boost",
    "shortName": "Chains of Command Boost",
    "targetLevel": 6,
    "icons": [
      "./icons/lethe/chains_of_command.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 19,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 18,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "targetLevel": 1,
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 19,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 26,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 2,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 27,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 15,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 29,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 26,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 16,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 3,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 2,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 27,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "Void Origin",
    "shortName": "Void Origin",
    "targetLevel": 9,
    "icons": [
      "./icons/lethe/void_origin.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 2,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 17,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 25,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 29,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 26,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 4,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 27,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 18,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 3,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 3,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 29,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 19,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 5,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 4,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 4,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Chains of Command Boost",
    "shortName": "Chains of Command Boost",
    "targetLevel": 12,
    "icons": [
      "./icons/lethe/chains_of_command.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 6,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 5,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 7,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 5,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 25,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 6,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 26,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 8,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 6,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 27,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 9,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 7,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 29,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 7,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 8,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 8,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 2,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "targetLevel": 2,
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 9,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  {
    "skillName": "Chains of Command Boost",
    "shortName": "Chains of Command Boost",
    "targetLevel": 18,
    "icons": [
      "./icons/lethe/chains_of_command.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 9,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "targetLevel": 2,
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "targetLevel": 3,
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 3,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "targetLevel": 2,
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "targetLevel": 4,
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "targetLevel": 3,
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  {
    "skillName": "Void Origin",
    "shortName": "Void Origin",
    "targetLevel": 18,
    "icons": [
      "./icons/lethe/void_origin.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 4,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "targetLevel": 10,
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "targetLevel": 3,
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "targetLevel": 4,
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  {
    "skillName": "Chains of Command Boost",
    "shortName": "Chains of Command Boost",
    "targetLevel": 24,
    "icons": [
      "./icons/lethe/chains_of_command.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 14,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "targetLevel": 10,
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "targetLevel": 4,
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 15,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 5,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Chains of Command Boost",
    "shortName": "Chains of Command Boost",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/chains_of_command.png"
    ]
  },
  {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "targetLevel": 10,
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 16,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 6,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 15,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 17,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 14,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 18,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 15,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 7,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 16,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 8,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 16,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "Void Origin",
    "shortName": "Void Origin",
    "targetLevel": 24,
    "icons": [
      "./icons/lethe/void_origin.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 17,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "targetLevel": 30,
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 9,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 18,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "targetLevel": 11,
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  {
    "skillName": "Void Origin",
    "shortName": "Void Origin",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/void_origin.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 19,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "targetLevel": 11,
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "targetLevel": 12,
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "targetLevel": 11,
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "targetLevel": 20,
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "targetLevel": 12,
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "targetLevel": 20,
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "targetLevel": 12,
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 26,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "targetLevel": 20,
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 27,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 29,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 14,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 16,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 26,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "targetLevel": 30,
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "targetLevel": 30,
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  }
]
export const LETHE_CLASS: ClassPreset = {
  id: "lethe",
  name: "Lethe",
  branch: "demonic",
  welcomeMessage: "Welcome to the Lethe Hexa Matrix Planner for 6th Job!",
  hexaStatTypes: ["M.ATT", "INT", "Crit Damage"],
  priorities: [
    {
      id: "lethe_scouter",
      name: "Lethe Hexa Upgrade Order (167 Steps)",
      steps: LETHE_PRIORITY_STEPS
    }
  ],
  nodes: {
    skills: [
      {
        id: "lethe-origin",
        name: "Dominus: Eye of Eternity",
        type: "origin",
        customIcon: "./icons/lethe/eye_of_eternity.png"
      },
      {
        id: "lethe-sovereign",
        name: "Sovereign Everlasting",
        type: "origin",
        customIcon: "./icons/lethe/sovereign_everlasting.png"
      },
      {
        id: "lethe-void-origin",
        name: "Void Origin",
        type: "origin",
        customIcon: "./icons/lethe/void_origin.png"
      }
    ],
    enhancement: [
      {
        id: "lethe-enhance-1",
        name: "Dominus: Dread Onslaught Boost",
        type: "boost",
        customIcon: "./icons/lethe/dominus_dread_onslaught.png"
      },
      {
        id: "lethe-enhance-2",
        name: "Dominus: Pack United Boost",
        type: "boost",
        customIcon: "./icons/lethe/dominus_pack_united.png"
      },
      {
        id: "lethe-enhance-3",
        name: "Dominus: Azrath Boost",
        type: "boost",
        customIcon: "./icons/lethe/dominus_azrath.png"
      },
      {
        id: "lethe-enhance-4",
        name: "Chains of Command Boost",
        type: "boost",
        customIcon: "./icons/lethe/chains_of_command.png"
      }
    ],
    mastery: [
      {
        id: "lethe-mastery-combo-1",
        name: "HEXA Assize / HEXA Edict: Fell Storm",
        type: "mastery",
        customIcon: "./icons/lethe/hexa_assize.png",
        multiIcons: [
          "./icons/lethe/hexa_assize.png",
          "./icons/lethe/hexa_edict_fell_storm.png"
        ],
        subSkills: [
          { name: "HEXA Assize", icon: "./icons/lethe/hexa_assize.png" },
          { name: "HEXA Edict: Fell Storm", icon: "./icons/lethe/hexa_edict_fell_storm.png" }
        ]
      },
      {
        id: "lethe-mastery-combo-2",
        name: "HEXA Beckon: Vargr / HEXA Edict: Rampage",
        type: "mastery",
        customIcon: "./icons/lethe/hexa_beckon_vargr.png",
        multiIcons: [
          "./icons/lethe/hexa_beckon_vargr.png",
          "./icons/lethe/hexa_edict_rampage.png"
        ],
        subSkills: [
          { name: "HEXA Beckon: Vargr", icon: "./icons/lethe/hexa_beckon_vargr.png" },
          { name: "HEXA Edict: Rampage", icon: "./icons/lethe/hexa_edict_rampage.png" }
        ]
      },
      {
        id: "lethe-mastery-combo-3",
        name: "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
        type: "mastery",
        customIcon: "./icons/lethe/hexa_beckon_dread_knight.png",
        multiIcons: [
          "./icons/lethe/hexa_beckon_dread_knight.png",
          "./icons/lethe/hexa_edict_dread_advance.png"
        ],
        subSkills: [
          { name: "HEXA Beckon: Dread Knight", icon: "./icons/lethe/hexa_beckon_dread_knight.png" },
          { name: "HEXA Edict: Dread Advance", icon: "./icons/lethe/hexa_edict_dread_advance.png" }
        ]
      },
      {
        id: "lethe-mastery-combo-4",
        name: "HEXA Majeure / Oath Incarnate",
        type: "mastery",
        customIcon: "./icons/lethe/hexa_majeure.png",
        multiIcons: [
          "./icons/lethe/hexa_majeure.png",
          "./icons/lethe/oath_incarnate.png"
        ],
        subSkills: [
          { name: "HEXA Majeure", icon: "./icons/lethe/hexa_majeure.png" },
          { name: "Oath Incarnate", icon: "./icons/lethe/oath_incarnate.png" }
        ]
      }
    ],
    common: getCommonNodesForBranch("demonic")
  }
}

const KANNA_SKILL_META = {
  O: {
    skillName: "[Divine Will] Advent of Crimson",
    shortName: "Advent of Crimson",
    icons: ["./icons/kanna/advent_of_crimson.png"]
  },
  ASC: {
    skillName: "[Divine Will] Final Rest",
    shortName: "Final Rest",
    icons: ["./icons/kanna/final_rest.png"]
  },
  M1: {
    skillName: "HEXA Soul-Shatter Talisman: Dance / Heart-Wreck Talisman",
    shortName: "Soul-Shatter Talisman",
    icons: [
      "./icons/kanna/hexa_soul_shatter_talisman_dance.png",
      "./icons/kanna/hexa_heart_wreck_talisman.png"
    ]
  },
  M2: {
    skillName: "HEXA Summon Oni / [Order] Spinning Strike / [Order] Pulverizing Strike",
    shortName: "Summon Oni",
    icons: [
      "./icons/kanna/hexa_summon_oni.png",
      "./icons/kanna/hexa_order_spinning_strike.png",
      "./icons/kanna/hexa_order_pulverizing_strike.png"
    ]
  },
  M3: {
    skillName: "HEXA Summon Tengu / [Order] Shade-Fletched Arrow",
    shortName: "Summon Tengu",
    icons: [
      "./icons/kanna/hexa_summon_tengu.png",
      "./icons/kanna/hexa_shade_fletched_arrow.png"
    ]
  },
  M4: {
    skillName: "HEXA Summon Orochi / [Order] Execute",
    shortName: "Summon Orochi",
    icons: [
      "./icons/kanna/hexa_summon_orochi.png",
      "./icons/kanna/hexa_order_execute.png"
    ]
  },
  B1: {
    skillName: "[Spirit] Hakumenkonmou Juubi Boost",
    shortName: "Hakumenkonmou Juubi",
    icons: ["./icons/kanna/spirit_hakumenkonmou_juubi.png"]
  },
  B2: {
    skillName: "[Spirit] Unleash the Radiant Flame Boost",
    shortName: "Radiant Flame",
    icons: ["./icons/kanna/spirit_radiant_flame.png"]
  },
  B3: {
    skillName: "[Spirit] Unleash Black-Winged Destruction Boost",
    shortName: "Black-Winged Destruction",
    icons: ["./icons/kanna/spirit_black_winged_destruction.png"]
  },
  B4: {
    skillName: "[Spirit] Unleash Soul-Searing Venom Boost",
    shortName: "Soul-Searing Venom",
    icons: ["./icons/kanna/spirit_soul_searing_venom.png"]
  },
  VO: {
    skillName: "Skill 3rd",
    shortName: "Skill 3rd",
    icons: [COMMON_ICONS.unknownSkill]
  },
  SJ: {
    skillName: "HEXA Twilight Bloom",
    shortName: "Twilight Bloom",
    icons: ["./icons/branches/sengoku/hexa_twilight_bloom.png"]
  },
  HEC: {
    skillName: "Sol Hecate",
    shortName: "Sol Hecate",
    icons: [COMMON_ICONS.solHecate]
  },
  STAT1: {
    skillName: "HEXA Stat I",
    shortName: "HEXA Stat I",
    icons: [COMMON_ICONS.hexaStat1]
  },
  STAT2: {
    skillName: "HEXA Stat II",
    shortName: "HEXA Stat II",
    icons: [COMMON_ICONS.hexaStat2]
  },
  STAT3: {
    skillName: "HEXA Stat III",
    shortName: "HEXA Stat III",
    icons: [COMMON_ICONS.hexaStat3]
  }
} as const

type KannaSkillKey = keyof typeof KANNA_SKILL_META

const KANNA_ORDER_RAW: [KannaSkillKey, number][] = [
  // Row 1 (Hexa Stat 1 after M2 lv9)
  ["M2", 1], ["M4", 1], ["M3", 1], ["M1", 1], ["M2", 2], ["HEC", 1], ["M2", 7],
  ["M4", 2], ["M2", 9], ["STAT1", 20], ["M3", 2], ["M4", 4], ["M3", 4], ["M4", 6], ["M3", 5],
  // Row 2 (Hexa Stat 2 after M2 lv19)
  ["M4", 7], ["M3", 6], ["M4", 8], ["M2", 15], ["M3", 7], ["B4", 1], ["B1", 1],
  ["M4", 9], ["M2", 16], ["M3", 8], ["M1", 3], ["M2", 17], ["M3", 9], ["M2", 19], ["STAT2", 20],
  // Row 3 (Hexa Stat 3 after Hecate lv3)
  ["HEC", 2], ["B3", 1], ["HEC", 3], ["STAT3", 20], ["M1", 6], ["HEC", 4], ["M2", 26],
  ["M4", 14], ["M2", 27], ["M4", 15], ["M2", 28], ["HEC", 5], ["O", 2], ["M2", 29], ["M4", 16],
  // Row 4
  ["M3", 15], ["HEC", 6], ["M4", 17], ["M1", 9], ["M3", 16], ["O", 3], ["M4", 18],
  ["HEC", 7], ["M3", 17], ["M4", 19], ["HEC", 8], ["SJ", 1], ["O", 4], ["M3", 18],
  // Row 5
  ["ASC", 1], ["M3", 19], ["HEC", 9], ["O", 6], ["M4", 25], ["B4", 2], ["B1", 2],
  ["M4", 27], ["O", 7], ["M4", 28], ["M3", 26], ["M4", 29], ["O", 8], ["B4", 3],
  // Row 6
  ["M2", 30], ["B1", 3], ["M3", 27], ["M1", 15], ["M3", 28], ["O", 9], ["M3", 29],
  ["B4", 4], ["B1", 4], ["B3", 2], ["B4", 10], ["B1", 10], ["ASC", 2], ["M1", 18],
  // Row 7
  ["SJ", 7], ["O", 11], ["B3", 3], ["ASC", 3], ["HEC", 15], ["O", 12], ["B3", 4],
  ["HEC", 16], ["O", 13], ["ASC", 4], ["B3", 10], ["HEC", 17], ["O", 14], ["HEC", 18],
  // Row 8
  ["ASC", 5], ["M1", 24], ["HEC", 19], ["O", 15], ["M4", 30], ["M1", 27], ["ASC", 6],
  ["O", 16], ["M3", 30], ["B4", 11], ["B1", 11], ["ASC", 7], ["B1", 18], ["ASC", 8],
  // Row 9
  ["B4", 12], ["B1", 12], ["B2", 10], ["O", 30], ["B2", 20], ["HEC", 30], ["ASC", 9],
  ["B4", 20], ["B1", 20], ["M1", 29], ["SJ", 13], ["M1", 30], ["B3", 11], ["B4", 30],
  // Row 10
  ["B1", 30], ["B3", 20], ["SJ", 19], ["B2", 30], ["ASC", 14], ["B3", 30], ["ASC", 19],
  ["SJ", 25], ["ASC", 30], ["SJ", 30]
]

export const KANNA_PRIORITY_STEPS: PriorityStep[] = KANNA_ORDER_RAW.map(([key, targetLevel]) => {
  const meta = KANNA_SKILL_META[key]
  return {
    skillName: meta.skillName,
    shortName: meta.shortName,
    targetLevel,
    icons: [...meta.icons]
  }
})

export const KANNA_CLASS: ClassPreset = {
  id: "kanna",
  name: "Kanna",
  branch: "sengoku",
  welcomeMessage: "Welcome to the Kanna Hexa Matrix Planner for 6th Job!",
  hexaStatTypes: ["M.ATT", "Crit Damage", "INT"],
  priorities: [
    {
      id: "kanna_2026_09",
      name: "Kanna Hexa Upgrade Order (2026-09-09)",
      steps: KANNA_PRIORITY_STEPS
    }
  ],
  nodes: {
    skills: [
      {
        id: "kanna-origin",
        name: "[Divine Will] Advent of Crimson",
        type: "origin",
        customIcon: "./icons/kanna/advent_of_crimson.png"
      },
      {
        id: "kanna-ascent",
        name: "[Divine Will] Final Rest",
        type: "origin",
        customIcon: "./icons/kanna/final_rest.png"
      },
      {
        id: "kanna-void-origin",
        name: "Skill 3rd",
        type: "origin",
        customIcon: COMMON_ICONS.unknownSkill
      }
    ],
    enhancement: [
      {
        id: "kanna-enhance-1",
        name: "[Spirit] Hakumenkonmou Juubi Boost",
        type: "boost",
        customIcon: "./icons/kanna/spirit_hakumenkonmou_juubi.png"
      },
      {
        id: "kanna-enhance-2",
        name: "[Spirit] Unleash the Radiant Flame Boost",
        type: "boost",
        customIcon: "./icons/kanna/spirit_radiant_flame.png"
      },
      {
        id: "kanna-enhance-3",
        name: "[Spirit] Unleash Black-Winged Destruction Boost",
        type: "boost",
        customIcon: "./icons/kanna/spirit_black_winged_destruction.png"
      },
      {
        id: "kanna-enhance-4",
        name: "[Spirit] Unleash Soul-Searing Venom Boost",
        type: "boost",
        customIcon: "./icons/kanna/spirit_soul_searing_venom.png"
      }
    ],
    mastery: [
      {
        id: "kanna-mastery-1",
        name: "HEXA Soul-Shatter Talisman: Dance / Heart-Wreck Talisman",
        type: "mastery",
        customIcon: "./icons/kanna/hexa_soul_shatter_talisman_dance.png",
        multiIcons: [
          "./icons/kanna/hexa_soul_shatter_talisman_dance.png",
          "./icons/kanna/hexa_heart_wreck_talisman.png"
        ],
        subSkills: [
          {
            name: "Soul-Shatter Talisman: Dance",
            icon: "./icons/kanna/hexa_soul_shatter_talisman_dance.png"
          },
          {
            name: "Heart-Wreck Talisman",
            icon: "./icons/kanna/hexa_heart_wreck_talisman.png"
          }
        ]
      },
      {
        id: "kanna-mastery-2",
        name: "HEXA Summon Oni / [Order] Spinning Strike / [Order] Pulverizing Strike",
        type: "mastery",
        customIcon: "./icons/kanna/hexa_summon_oni.png",
        multiIcons: [
          "./icons/kanna/hexa_summon_oni.png",
          "./icons/kanna/hexa_order_spinning_strike.png",
          "./icons/kanna/hexa_order_pulverizing_strike.png"
        ],
        subSkills: [
          { name: "Summon Oni", icon: "./icons/kanna/hexa_summon_oni.png" },
          {
            name: "[Order] Spinning Strike",
            icon: "./icons/kanna/hexa_order_spinning_strike.png"
          },
          {
            name: "[Order] Pulverizing Strike",
            icon: "./icons/kanna/hexa_order_pulverizing_strike.png"
          }
        ]
      },
      {
        id: "kanna-mastery-3",
        name: "HEXA Summon Tengu / [Order] Shade-Fletched Arrow",
        type: "mastery",
        customIcon: "./icons/kanna/hexa_summon_tengu.png",
        multiIcons: [
          "./icons/kanna/hexa_summon_tengu.png",
          "./icons/kanna/hexa_shade_fletched_arrow.png"
        ],
        subSkills: [
          { name: "Summon Tengu", icon: "./icons/kanna/hexa_summon_tengu.png" },
          {
            name: "[Order] Shade-Fletched Arrow",
            icon: "./icons/kanna/hexa_shade_fletched_arrow.png"
          }
        ]
      },
      {
        id: "kanna-mastery-4",
        name: "HEXA Summon Orochi / [Order] Execute",
        type: "mastery",
        customIcon: "./icons/kanna/hexa_summon_orochi.png",
        multiIcons: [
          "./icons/kanna/hexa_summon_orochi.png",
          "./icons/kanna/hexa_order_execute.png"
        ],
        subSkills: [
          { name: "Summon Orochi", icon: "./icons/kanna/hexa_summon_orochi.png" },
          { name: "[Order] Execute", icon: "./icons/kanna/hexa_order_execute.png" }
        ]
      }
    ],
    common: getCommonNodesForBranch("sengoku")
  }
}

const LYNN_SKILL_META = {
  O: {
    skillName: "Source Flow",
    shortName: "Source Flow",
    icons: ["./icons/lynn/source_flow.png"]
  },
  ASC: {
    skillName: "Wild Hunt",
    shortName: "Wild Hunt",
    icons: ["./icons/lynn/wild_hunt.png"]
  },
  M1: {
    skillName: "HEXA Strike",
    shortName: "HEXA Strike",
    icons: ["./icons/lynn/hexa_strike.png"]
  },
  M2: {
    skillName: "HEXA Sneak Attack / HEXA Raid",
    shortName: "Sneak Attack",
    icons: ["./icons/lynn/hexa_sneak_attack.png", "./icons/lynn/hexa_raid.png"]
  },
  PECK: {
    skillName: "HEXA Peck",
    shortName: "HEXA Peck",
    icons: ["./icons/lynn/hexa_peck.png"]
  },
  M4: {
    skillName: "HEXA [Focus] Heal / HEXA [Focus] Forest Protection / HEXA Mother Nature's Touch",
    shortName: "Focus Heal",
    icons: [
      "./icons/lynn/hexa_focus_heal.png",
      "./icons/lynn/hexa_focus_forest_protection.png",
      "./icons/lynn/hexa_mother_natures_touch.png"
    ]
  },
  B1: {
    skillName: "Beast's Rage Boost",
    shortName: "Beast's Rage",
    icons: ["./icons/lynn/beasts_rage.png"]
  },
  B2: {
    skillName: "Beak Strike Boost",
    shortName: "Beak Strike",
    icons: ["./icons/lynn/beak_strike.png"]
  },
  B3: {
    skillName: "[Focus] Awaken Boost",
    shortName: "Focus Awaken",
    icons: ["./icons/lynn/focus_awaken.png"]
  },
  B4: {
    skillName: "Nature's Grace Boost",
    shortName: "Nature's Grace",
    icons: ["./icons/lynn/natures_grace.png"]
  },
  HEC: {
    skillName: "Sol Hecate",
    shortName: "Sol Hecate",
    icons: [COMMON_ICONS.solHecate]
  },
  ROS: {
    skillName: "HEXA Ring of Samsara",
    shortName: "Ring of Samsara",
    icons: ["./icons/branches/jianghu/hexa_ring_of_samsara.png"]
  },
  STAT1: {
    skillName: "HEXA Stat I",
    shortName: "HEXA Stat I",
    icons: [COMMON_ICONS.hexaStat1]
  },
  STAT2: {
    skillName: "HEXA Stat II",
    shortName: "HEXA Stat II",
    icons: [COMMON_ICONS.hexaStat2]
  },
  STAT3: {
    skillName: "HEXA Stat III",
    shortName: "HEXA Stat III",
    icons: [COMMON_ICONS.hexaStat3]
  }
} as const

type LynnSkillKey = keyof typeof LYNN_SKILL_META

const LYNN_ORDER_RAW: [LynnSkillKey, number][] = [
  // Row 1
  ["ROS", 1], ["PECK", 7], ["HEC", 1], ["PECK", 9], ["M1", 1], ["M2", 1], ["B2", 1],
  ["M4", 1], ["M2", 4], ["M1", 3], ["M2", 7], ["M1", 5], ["ASC", 1],
  // Row 2
  ["STAT1", 20], ["PECK", 19], ["M2", 9], ["M1", 7], ["M1", 9], ["PECK", 23], ["STAT2", 20],
  ["M2", 14], ["M1", 12], ["M2", 15], ["M1", 13], ["PECK", 27], ["M2", 17],
  // Row 3
  ["M1", 14], ["PECK", 29], ["STAT3", 20], ["B3", 6], ["B1", 1], ["B2", 4], ["M2", 19],
  ["M1", 17], ["B2", 10], ["M1", 19], ["HEC", 3], ["ASC", 2], ["B2", 12],
  // Row 4
  ["M2", 26], ["M1", 24], ["M2", 29], ["M1", 29], ["HEC", 6], ["ASC", 5], ["O", 2],
  ["B2", 20], ["PECK", 30], ["HEC", 7], ["ASC", 7], ["O", 3], ["B3", 12],
  // Row 5
  ["B1", 4], ["HEC", 9], ["ASC", 9], ["O", 5], ["B2", 30], ["HEC", 15], ["ASC", 12],
  ["B1", 10], ["M2", 30], ["O", 7], ["B3", 18], ["M1", 30], ["HEC", 19],
  // Row 6
  ["ASC", 19], ["O", 9], ["HEC", 30], ["B1", 12], ["O", 14], ["B1", 20], ["B3", 24],
  ["ASC", 23], ["O", 17], ["B1", 30], ["O", 19], ["B3", 30], ["ASC", 29],
  // Row 7
  ["O", 30], ["ASC", 30], ["B4", 9], ["ROS", 9], ["B4", 19], ["ROS", 19], ["B4", 29],
  ["ROS", 29], ["B4", 30], ["ROS", 30], ["M4", 30]
]

export const LYNN_PRIORITY_STEPS: PriorityStep[] = LYNN_ORDER_RAW.map(([key, targetLevel]) => {
  const meta = LYNN_SKILL_META[key]
  return {
    skillName: meta.skillName,
    shortName: meta.shortName,
    targetLevel,
    icons: [...meta.icons]
  }
})

export const LYNN_CLASS: ClassPreset = {
  id: "lynn",
  name: "Lynn",
  branch: "jianghu",
  welcomeMessage: "Welcome to the Lynn Hexa Matrix Planner for 6th Job!",
  hexaStatTypes: ["M.ATT", "INT", "Crit Damage"],
  priorities: [
    {
      id: "lynn_order",
      name: "Lynn Hexa Upgrade Order",
      steps: LYNN_PRIORITY_STEPS
    }
  ],
  nodes: {
    skills: [
      {
        id: "lynn-origin",
        name: "Source Flow",
        type: "origin",
        customIcon: "./icons/lynn/source_flow.png"
      },
      {
        id: "lynn-ascent",
        name: "Wild Hunt",
        type: "origin",
        customIcon: "./icons/lynn/wild_hunt.png"
      },
      {
        id: "lynn-skill-3",
        name: "Skill 3rd",
        type: "origin",
        customIcon: COMMON_ICONS.unknownSkill
      }
    ],
    enhancement: [
      {
        id: "lynn-enhance-1",
        name: "Beast's Rage Boost",
        type: "boost",
        customIcon: "./icons/lynn/beasts_rage.png"
      },
      {
        id: "lynn-enhance-2",
        name: "Beak Strike Boost",
        type: "boost",
        customIcon: "./icons/lynn/beak_strike.png"
      },
      {
        id: "lynn-enhance-3",
        name: "[Focus] Awaken Boost",
        type: "boost",
        customIcon: "./icons/lynn/focus_awaken.png"
      },
      {
        id: "lynn-enhance-4",
        name: "Nature's Grace Boost",
        type: "boost",
        customIcon: "./icons/lynn/natures_grace.png"
      }
    ],
    mastery: [
      {
        id: "lynn-mastery-1",
        name: "HEXA Strike",
        type: "mastery",
        customIcon: "./icons/lynn/hexa_strike.png"
      },
      {
        id: "lynn-mastery-2",
        name: "HEXA Sneak Attack / HEXA Raid",
        type: "mastery",
        customIcon: "./icons/lynn/hexa_sneak_attack.png",
        multiIcons: [
          "./icons/lynn/hexa_sneak_attack.png",
          "./icons/lynn/hexa_raid.png"
        ],
        subSkills: [
          { name: "HEXA Sneak Attack", icon: "./icons/lynn/hexa_sneak_attack.png" },
          { name: "HEXA Raid", icon: "./icons/lynn/hexa_raid.png" }
        ]
      },
      {
        id: "lynn-mastery-3",
        name: "HEXA Peck",
        type: "mastery",
        customIcon: "./icons/lynn/hexa_peck.png"
      },
      {
        id: "lynn-mastery-4",
        name: "HEXA [Focus] Heal / HEXA [Focus] Forest Protection / HEXA Mother Nature's Touch",
        type: "mastery",
        customIcon: "./icons/lynn/hexa_focus_heal.png",
        multiIcons: [
          "./icons/lynn/hexa_focus_heal.png",
          "./icons/lynn/hexa_focus_forest_protection.png",
          "./icons/lynn/hexa_mother_natures_touch.png"
        ],
        subSkills: [
          { name: "HEXA [Focus] Heal", icon: "./icons/lynn/hexa_focus_heal.png" },
          {
            name: "HEXA [Focus] Forest Protection",
            icon: "./icons/lynn/hexa_focus_forest_protection.png"
          },
          {
            name: "HEXA Mother Nature's Touch",
            icon: "./icons/lynn/hexa_mother_natures_touch.png"
          }
        ]
      }
    ],
    common: getCommonNodesForBranch("jianghu")
  }
}

export const CLASS_PRESETS: Record<string, ClassPreset> = {
  lethe: LETHE_CLASS,
  kanna: KANNA_CLASS,
  lynn: LYNN_CLASS
}
