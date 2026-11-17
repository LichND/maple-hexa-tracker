import { HexaSkillNode } from "../types/hexa"

export const COMMON_ICONS = {
  hexaStat1: "./icons/common/hexa_stat_1.png",
  hexaStat2: "./icons/common/hexa_stat_2.png",
  hexaStat3: "./icons/common/hexa_stat_3.png",
  solJanus: "./icons/common/sol_janus.png",
  solHecate: "./icons/common/sol_hecate.png"
} as const

export type ClassBranch = "demon" | string

export const BRANCH_COMMON_SKILLS: Record<
  string,
  { id: string; name: string; icon: string }
> = {
  demon: {
    id: "branch-demon-common",
    name: "HEXA Demonic Wrath",
    icon: "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
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
      "./icons/branches/demon/hexa_demonic_wrath.png"
    ]
  }
]
export const LETHE_CLASS: ClassPreset = {
  id: "lethe",
  name: "Lethe",
  branch: "demon",
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
    common: getCommonNodesForBranch("demon")
  }
}

export const CLASS_PRESETS: Record<string, ClassPreset> = {
  lethe: LETHE_CLASS
}
