import type {
  ClassPreset,
  PriorityOrderStep,
  PriorityStep,
  SkillMeta
} from '../../types/classes'
import { COMMON_ICONS, buildPrioritySteps, getCommonNodesForBranch } from '../commonSkills'

const LYNN_SKILL_META = {
  O: {
    skillName: 'Source Flow',
    shortName: 'Source Flow',
    icons: ['./icons/lynn/source_flow.png']
  },
  ASC: {
    skillName: 'Wild Hunt',
    shortName: 'Wild Hunt',
    icons: ['./icons/lynn/wild_hunt.png']
  },
  M1: {
    skillName: 'HEXA Strike',
    shortName: 'HEXA Strike',
    icons: ['./icons/lynn/hexa_strike.png']
  },
  M2: {
    skillName: 'HEXA Sneak Attack / HEXA Raid',
    shortName: 'Sneak Attack',
    icons: ['./icons/lynn/hexa_sneak_attack.png', './icons/lynn/hexa_raid.png']
  },
  PECK: {
    skillName: 'HEXA Peck',
    shortName: 'HEXA Peck',
    icons: ['./icons/lynn/hexa_peck.png']
  },
  M4: {
    skillName: 'HEXA [Focus] Heal / HEXA [Focus] Forest Protection / HEXA Mother Nature\'s Touch',
    shortName: 'Focus Heal',
    icons: [
      './icons/lynn/hexa_focus_heal.png',
      './icons/lynn/hexa_focus_forest_protection.png',
      './icons/lynn/hexa_mother_natures_touch.png'
    ]
  },
  B1: {
    skillName: "Beast's Rage Boost",
    shortName: "Beast's Rage",
    icons: ['./icons/lynn/beasts_rage.png']
  },
  B2: {
    skillName: 'Beak Strike Boost',
    shortName: 'Beak Strike',
    icons: ['./icons/lynn/beak_strike.png']
  },
  B3: {
    skillName: '[Focus] Awaken Boost',
    shortName: 'Focus Awaken',
    icons: ['./icons/lynn/focus_awaken.png']
  },
  B4: {
    skillName: "Nature's Grace Boost",
    shortName: "Nature's Grace",
    icons: ['./icons/lynn/natures_grace.png']
  },
  HEC: {
    skillName: 'Sol Hecate',
    shortName: 'Sol Hecate',
    icons: [COMMON_ICONS.solHecate]
  },
  ROS: {
    skillName: 'HEXA Ring of Samsara',
    shortName: 'Ring of Samsara',
    icons: ['./icons/branches/jianghu/hexa_ring_of_samsara.png']
  },
  STAT1: {
    skillName: 'HEXA Stat I',
    shortName: 'HEXA Stat I',
    icons: [COMMON_ICONS.hexaStat1]
  },
  STAT2: {
    skillName: 'HEXA Stat II',
    shortName: 'HEXA Stat II',
    icons: [COMMON_ICONS.hexaStat2]
  },
  STAT3: {
    skillName: 'HEXA Stat III',
    shortName: 'HEXA Stat III',
    icons: [COMMON_ICONS.hexaStat3]
  }
} as const satisfies Record<string, SkillMeta>

type LynnSkillKey = keyof typeof LYNN_SKILL_META

const LYNN_ORDER_RAW: readonly PriorityOrderStep<LynnSkillKey>[] = [
  // Row 1
  ['ROS', 1], ['PECK', 7], ['HEC', 1], ['PECK', 9], ['M1', 1], ['M2', 1], ['B2', 1],
  ['M4', 1], ['M2', 4], ['M1', 3], ['M2', 7], ['M1', 5], ['ASC', 1],
  // Row 2
  ['STAT1', 20], ['PECK', 19], ['M2', 9], ['M1', 7], ['M1', 9], ['PECK', 23], ['STAT2', 20],
  ['M2', 14], ['M1', 12], ['M2', 15], ['M1', 13], ['PECK', 27], ['M2', 17],
  // Row 3
  ['M1', 14], ['PECK', 29], ['STAT3', 20], ['B3', 6], ['B1', 1], ['B2', 4], ['M2', 19],
  ['M1', 17], ['B2', 10], ['M1', 19], ['HEC', 3], ['ASC', 2], ['B2', 12],
  // Row 4
  ['M2', 26], ['M1', 24], ['M2', 29], ['M1', 29], ['HEC', 6], ['ASC', 5], ['O', 2],
  ['B2', 20], ['PECK', 30], ['HEC', 7], ['ASC', 7], ['O', 3], ['B3', 12],
  // Row 5
  ['B1', 4], ['HEC', 9], ['ASC', 9], ['O', 5], ['B2', 30], ['HEC', 15], ['ASC', 12],
  ['B1', 10], ['M2', 30], ['O', 7], ['B3', 18], ['M1', 30], ['HEC', 19],
  // Row 6
  ['ASC', 19], ['O', 9], ['HEC', 30], ['B1', 12], ['O', 14], ['B1', 20], ['B3', 24],
  ['ASC', 23], ['O', 17], ['B1', 30], ['O', 19], ['B3', 30], ['ASC', 29],
  // Row 7
  ['O', 30], ['ASC', 30], ['B4', 9], ['ROS', 9], ['B4', 19], ['ROS', 19], ['B4', 29],
  ['ROS', 29], ['B4', 30], ['ROS', 30], ['M4', 30]
]

export const LYNN_PRIORITY_STEPS: PriorityStep[] = buildPrioritySteps(
  LYNN_SKILL_META,
  LYNN_ORDER_RAW
)

export const LYNN_CLASS: ClassPreset = {
  id: 'lynn',
  name: 'Lynn',
  branch: 'jianghu',
  welcomeMessage: 'Welcome to the Lynn Hexa Matrix Planner for 6th Job!',
  hexaStatTypes: ['M.ATT', 'INT', 'Crit Damage'],
  priorities: [
    {
      id: 'lynn_order',
      name: 'Lynn Hexa Upgrade Order',
      steps: LYNN_PRIORITY_STEPS
    }
  ],
  nodes: {
    skills: [
      {
        id: 'lynn-origin',
        name: 'Source Flow',
        type: 'origin',
        customIcon: './icons/lynn/source_flow.png'
      },
      {
        id: 'lynn-ascent',
        name: 'Wild Hunt',
        type: 'origin',
        customIcon: './icons/lynn/wild_hunt.png'
      },
      {
        id: 'lynn-skill-3',
        name: 'Skill 3rd',
        type: 'origin',
        customIcon: COMMON_ICONS.unknownSkill
      }
    ],
    enhancement: [
      {
        id: 'lynn-enhance-1',
        name: "Beast's Rage Boost",
        type: 'boost',
        customIcon: './icons/lynn/beasts_rage.png'
      },
      {
        id: 'lynn-enhance-2',
        name: 'Beak Strike Boost',
        type: 'boost',
        customIcon: './icons/lynn/beak_strike.png'
      },
      {
        id: 'lynn-enhance-3',
        name: '[Focus] Awaken Boost',
        type: 'boost',
        customIcon: './icons/lynn/focus_awaken.png'
      },
      {
        id: 'lynn-enhance-4',
        name: "Nature's Grace Boost",
        type: 'boost',
        customIcon: './icons/lynn/natures_grace.png'
      }
    ],
    mastery: [
      {
        id: 'lynn-mastery-1',
        name: 'HEXA Strike',
        type: 'mastery',
        customIcon: './icons/lynn/hexa_strike.png'
      },
      {
        id: 'lynn-mastery-2',
        name: 'HEXA Sneak Attack / HEXA Raid',
        type: 'mastery',
        customIcon: './icons/lynn/hexa_sneak_attack.png',
        multiIcons: [
          './icons/lynn/hexa_sneak_attack.png',
          './icons/lynn/hexa_raid.png'
        ],
        subSkills: [
          { name: 'HEXA Sneak Attack', icon: './icons/lynn/hexa_sneak_attack.png' },
          { name: 'HEXA Raid', icon: './icons/lynn/hexa_raid.png' }
        ]
      },
      {
        id: 'lynn-mastery-3',
        name: 'HEXA Peck',
        type: 'mastery',
        customIcon: './icons/lynn/hexa_peck.png'
      },
      {
        id: 'lynn-mastery-4',
        name: "HEXA [Focus] Heal / HEXA [Focus] Forest Protection / HEXA Mother Nature's Touch",
        type: 'mastery',
        customIcon: './icons/lynn/hexa_focus_heal.png',
        multiIcons: [
          './icons/lynn/hexa_focus_heal.png',
          './icons/lynn/hexa_focus_forest_protection.png',
          './icons/lynn/hexa_mother_natures_touch.png'
        ],
        subSkills: [
          { name: 'HEXA [Focus] Heal', icon: './icons/lynn/hexa_focus_heal.png' },
          {
            name: 'HEXA [Focus] Forest Protection',
            icon: './icons/lynn/hexa_focus_forest_protection.png'
          },
          {
            name: "HEXA Mother Nature's Touch",
            icon: './icons/lynn/hexa_mother_natures_touch.png'
          }
        ]
      }
    ],
    common: getCommonNodesForBranch('jianghu')
  }
}
