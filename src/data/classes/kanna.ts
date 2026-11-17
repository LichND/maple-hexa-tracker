import { COMMON_ICONS, ClassPreset, PriorityStep, getCommonNodesForBranch } from '../commonSkills'

const KANNA_SKILL_META = {
  O: {
    skillName: '[Divine Will] Advent of Crimson',
    shortName: 'Advent of Crimson',
    icons: ['./icons/kanna/advent_of_crimson.png']
  },
  ASC: {
    skillName: '[Divine Will] Final Rest',
    shortName: 'Final Rest',
    icons: ['./icons/kanna/final_rest.png']
  },
  M1: {
    skillName: 'HEXA Soul-Shatter Talisman: Dance / Heart-Wreck Talisman',
    shortName: 'Soul-Shatter Talisman',
    icons: [
      './icons/kanna/hexa_soul_shatter_talisman_dance.png',
      './icons/kanna/hexa_heart_wreck_talisman.png'
    ]
  },
  M2: {
    skillName: 'HEXA Summon Oni / [Order] Spinning Strike / [Order] Pulverizing Strike',
    shortName: 'Summon Oni',
    icons: [
      './icons/kanna/hexa_summon_oni.png',
      './icons/kanna/hexa_order_spinning_strike.png',
      './icons/kanna/hexa_order_pulverizing_strike.png'
    ]
  },
  M3: {
    skillName: 'HEXA Summon Tengu / [Order] Shade-Fletched Arrow',
    shortName: 'Summon Tengu',
    icons: [
      './icons/kanna/hexa_summon_tengu.png',
      './icons/kanna/hexa_shade_fletched_arrow.png'
    ]
  },
  M4: {
    skillName: 'HEXA Summon Orochi / [Order] Execute',
    shortName: 'Summon Orochi',
    icons: [
      './icons/kanna/hexa_summon_orochi.png',
      './icons/kanna/hexa_order_execute.png'
    ]
  },
  B1: {
    skillName: '[Spirit] Hakumenkonmou Juubi Boost',
    shortName: 'Hakumenkonmou Juubi',
    icons: ['./icons/kanna/spirit_hakumenkonmou_juubi.png']
  },
  B2: {
    skillName: '[Spirit] Unleash the Radiant Flame Boost',
    shortName: 'Radiant Flame',
    icons: ['./icons/kanna/spirit_radiant_flame.png']
  },
  B3: {
    skillName: '[Spirit] Unleash Black-Winged Destruction Boost',
    shortName: 'Black-Winged Destruction',
    icons: ['./icons/kanna/spirit_black_winged_destruction.png']
  },
  B4: {
    skillName: '[Spirit] Unleash Soul-Searing Venom Boost',
    shortName: 'Soul-Searing Venom',
    icons: ['./icons/kanna/spirit_soul_searing_venom.png']
  },
  VO: {
    skillName: 'Skill 3rd',
    shortName: 'Skill 3rd',
    icons: [COMMON_ICONS.unknownSkill]
  },
  SJ: {
    skillName: 'HEXA Twilight Bloom',
    shortName: 'Twilight Bloom',
    icons: ['./icons/branches/sengoku/hexa_twilight_bloom.png']
  },
  HEC: {
    skillName: 'Sol Hecate',
    shortName: 'Sol Hecate',
    icons: [COMMON_ICONS.solHecate]
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
} as const

type KannaSkillKey = keyof typeof KANNA_SKILL_META

const KANNA_ORDER_RAW: [KannaSkillKey, number][] = [
  // Row 1 (Hexa Stat 1 after M2 lv9)
  ['M2', 1], ['M4', 1], ['M3', 1], ['M1', 1], ['M2', 2], ['HEC', 1], ['M2', 7],
  ['M4', 2], ['M2', 9], ['STAT1', 20], ['M3', 2], ['M4', 4], ['M3', 4], ['M4', 6], ['M3', 5],
  // Row 2 (Hexa Stat 2 after M2 lv19)
  ['M4', 7], ['M3', 6], ['M4', 8], ['M2', 15], ['M3', 7], ['B4', 1], ['B1', 1],
  ['M4', 9], ['M2', 16], ['M3', 8], ['M1', 3], ['M2', 17], ['M3', 9], ['M2', 19], ['STAT2', 20],
  // Row 3 (Hexa Stat 3 after Hecate lv3)
  ['HEC', 2], ['B3', 1], ['HEC', 3], ['STAT3', 20], ['M1', 6], ['HEC', 4], ['M2', 26],
  ['M4', 14], ['M2', 27], ['M4', 15], ['M2', 28], ['HEC', 5], ['O', 2], ['M2', 29], ['M4', 16],
  // Row 4
  ['M3', 15], ['HEC', 6], ['M4', 17], ['M1', 9], ['M3', 16], ['O', 3], ['M4', 18],
  ['HEC', 7], ['M3', 17], ['M4', 19], ['HEC', 8], ['SJ', 1], ['O', 4], ['M3', 18],
  // Row 5
  ['ASC', 1], ['M3', 19], ['HEC', 9], ['O', 6], ['M4', 25], ['B4', 2], ['B1', 2],
  ['M4', 27], ['O', 7], ['M4', 28], ['M3', 26], ['M4', 29], ['O', 8], ['B4', 3],
  // Row 6
  ['M2', 30], ['B1', 3], ['M3', 27], ['M1', 15], ['M3', 28], ['O', 9], ['M3', 29],
  ['B4', 4], ['B1', 4], ['B3', 2], ['B4', 10], ['B1', 10], ['ASC', 2], ['M1', 18],
  // Row 7
  ['SJ', 7], ['O', 11], ['B3', 3], ['ASC', 3], ['HEC', 15], ['O', 12], ['B3', 4],
  ['HEC', 16], ['O', 13], ['ASC', 4], ['B3', 10], ['HEC', 17], ['O', 14], ['HEC', 18],
  // Row 8
  ['ASC', 5], ['M1', 24], ['HEC', 19], ['O', 15], ['M4', 30], ['M1', 27], ['ASC', 6],
  ['O', 16], ['M3', 30], ['B4', 11], ['B1', 11], ['ASC', 7], ['B1', 18], ['ASC', 8],
  // Row 9
  ['B4', 12], ['B1', 12], ['B2', 10], ['O', 30], ['B2', 20], ['HEC', 30], ['ASC', 9],
  ['B4', 20], ['B1', 20], ['M1', 29], ['SJ', 13], ['M1', 30], ['B3', 11], ['B4', 30],
  // Row 10
  ['B1', 30], ['B3', 20], ['SJ', 19], ['B2', 30], ['ASC', 14], ['B3', 30], ['ASC', 19],
  ['SJ', 25], ['ASC', 30], ['SJ', 30]
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
  id: 'kanna',
  name: 'Kanna',
  branch: 'sengoku',
  welcomeMessage: 'Welcome to the Kanna Hexa Matrix Planner for 6th Job!',
  hexaStatTypes: ['M.ATT', 'Crit Damage', 'INT'],
  priorities: [
    {
      id: 'kanna_2026_09',
      name: 'Kanna Hexa Upgrade Order (2026-09-09)',
      steps: KANNA_PRIORITY_STEPS
    }
  ],
  nodes: {
    skills: [
      {
        id: 'kanna-origin',
        name: '[Divine Will] Advent of Crimson',
        type: 'origin',
        customIcon: './icons/kanna/advent_of_crimson.png'
      },
      {
        id: 'kanna-ascent',
        name: '[Divine Will] Final Rest',
        type: 'origin',
        customIcon: './icons/kanna/final_rest.png'
      },
      {
        id: 'kanna-void-origin',
        name: 'Skill 3rd',
        type: 'origin',
        customIcon: COMMON_ICONS.unknownSkill
      }
    ],
    enhancement: [
      {
        id: 'kanna-enhance-1',
        name: '[Spirit] Hakumenkonmou Juubi Boost',
        type: 'boost',
        customIcon: './icons/kanna/spirit_hakumenkonmou_juubi.png'
      },
      {
        id: 'kanna-enhance-2',
        name: '[Spirit] Unleash the Radiant Flame Boost',
        type: 'boost',
        customIcon: './icons/kanna/spirit_radiant_flame.png'
      },
      {
        id: 'kanna-enhance-3',
        name: '[Spirit] Unleash Black-Winged Destruction Boost',
        type: 'boost',
        customIcon: './icons/kanna/spirit_black_winged_destruction.png'
      },
      {
        id: 'kanna-enhance-4',
        name: '[Spirit] Unleash Soul-Searing Venom Boost',
        type: 'boost',
        customIcon: './icons/kanna/spirit_soul_searing_venom.png'
      }
    ],
    mastery: [
      {
        id: 'kanna-mastery-1',
        name: 'HEXA Soul-Shatter Talisman: Dance / Heart-Wreck Talisman',
        type: 'mastery',
        customIcon: './icons/kanna/hexa_soul_shatter_talisman_dance.png',
        multiIcons: [
          './icons/kanna/hexa_soul_shatter_talisman_dance.png',
          './icons/kanna/hexa_heart_wreck_talisman.png'
        ],
        subSkills: [
          {
            name: 'Soul-Shatter Talisman: Dance',
            icon: './icons/kanna/hexa_soul_shatter_talisman_dance.png'
          },
          {
            name: 'Heart-Wreck Talisman',
            icon: './icons/kanna/hexa_heart_wreck_talisman.png'
          }
        ]
      },
      {
        id: 'kanna-mastery-2',
        name: 'HEXA Summon Oni / [Order] Spinning Strike / [Order] Pulverizing Strike',
        type: 'mastery',
        customIcon: './icons/kanna/hexa_summon_oni.png',
        multiIcons: [
          './icons/kanna/hexa_summon_oni.png',
          './icons/kanna/hexa_order_spinning_strike.png',
          './icons/kanna/hexa_order_pulverizing_strike.png'
        ],
        subSkills: [
          { name: 'Summon Oni', icon: './icons/kanna/hexa_summon_oni.png' },
          {
            name: '[Order] Spinning Strike',
            icon: './icons/kanna/hexa_order_spinning_strike.png'
          },
          {
            name: '[Order] Pulverizing Strike',
            icon: './icons/kanna/hexa_order_pulverizing_strike.png'
          }
        ]
      },
      {
        id: 'kanna-mastery-3',
        name: 'HEXA Summon Tengu / [Order] Shade-Fletched Arrow',
        type: 'mastery',
        customIcon: './icons/kanna/hexa_summon_tengu.png',
        multiIcons: [
          './icons/kanna/hexa_summon_tengu.png',
          './icons/kanna/hexa_shade_fletched_arrow.png'
        ],
        subSkills: [
          { name: 'Summon Tengu', icon: './icons/kanna/hexa_summon_tengu.png' },
          {
            name: '[Order] Shade-Fletched Arrow',
            icon: './icons/kanna/hexa_shade_fletched_arrow.png'
          }
        ]
      },
      {
        id: 'kanna-mastery-4',
        name: 'HEXA Summon Orochi / [Order] Execute',
        type: 'mastery',
        customIcon: './icons/kanna/hexa_summon_orochi.png',
        multiIcons: [
          './icons/kanna/hexa_summon_orochi.png',
          './icons/kanna/hexa_order_execute.png'
        ],
        subSkills: [
          { name: 'Summon Orochi', icon: './icons/kanna/hexa_summon_orochi.png' },
          { name: '[Order] Execute', icon: './icons/kanna/hexa_order_execute.png' }
        ]
      }
    ],
    common: getCommonNodesForBranch('sengoku')
  }
}
