import { ClassPreset, PriorityStep, getCommonNodesForBranch } from '../commonSkills'

const LETHE_SKILL_META = {
  "MAJ": {
    "skillName": "HEXA Majeure",
    "shortName": "HEXA Majeure",
    "icons": [
      "./icons/lethe/hexa_majeure.png",
      "./icons/lethe/oath_incarnate.png"
    ]
  },
  "DREAD": {
    "skillName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "shortName": "HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance",
    "icons": [
      "./icons/lethe/hexa_beckon_dread_knight.png",
      "./icons/lethe/hexa_edict_dread_advance.png"
    ]
  },
  "B_CHAINS": {
    "skillName": "Chains of Command Boost",
    "shortName": "Chains of Command Boost",
    "icons": [
      "./icons/lethe/chains_of_command.png"
    ]
  },
  "ASSIZE": {
    "skillName": "HEXA Assize / HEXA Edict: Fell Storm",
    "shortName": "HEXA Assize / HEXA Edict: Fell Storm",
    "icons": [
      "./icons/lethe/hexa_assize.png",
      "./icons/lethe/hexa_edict_fell_storm.png"
    ]
  },
  "VARGR": {
    "skillName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "shortName": "HEXA Beckon: Vargr / HEXA Edict: Rampage",
    "icons": [
      "./icons/lethe/hexa_beckon_vargr.png",
      "./icons/lethe/hexa_edict_rampage.png"
    ]
  },
  "DEMONIC": {
    "skillName": "HEXA Demonic Wrath",
    "shortName": "HEXA Demonic Wrath",
    "icons": [
      "./icons/branches/demonic/hexa_demonic_wrath.png"
    ]
  },
  "STAT1": {
    "skillName": "HEXA Stat I",
    "shortName": "HEXA Stat I",
    "icons": [
      "./icons/common/hexa_stat_1.png"
    ]
  },
  "VO": {
    "skillName": "Void Origin",
    "shortName": "Void Origin",
    "icons": [
      "./icons/lethe/void_origin.png"
    ]
  },
  "STAT2": {
    "skillName": "HEXA Stat II",
    "shortName": "HEXA Stat II",
    "icons": [
      "./icons/common/hexa_stat_2.png"
    ]
  },
  "STAT3": {
    "skillName": "HEXA Stat III",
    "shortName": "HEXA Stat III",
    "icons": [
      "./icons/common/hexa_stat_3.png"
    ]
  },
  "SOV": {
    "skillName": "Sovereign Everlasting",
    "shortName": "Sovereign Everlasting",
    "icons": [
      "./icons/lethe/sovereign_everlasting.png"
    ]
  },
  "B_DREAD": {
    "skillName": "Dominus: Dread Onslaught Boost",
    "shortName": "Dominus: Dread Onslaught Boost",
    "icons": [
      "./icons/lethe/dominus_dread_onslaught.png"
    ]
  },
  "B_AZRATH": {
    "skillName": "Dominus: Azrath Boost",
    "shortName": "Dominus: Azrath Boost",
    "icons": [
      "./icons/lethe/dominus_azrath.png"
    ]
  },
  "B_PACK": {
    "skillName": "Dominus: Pack United Boost",
    "shortName": "Dominus: Pack United Boost",
    "icons": [
      "./icons/lethe/dominus_pack_united.png"
    ]
  },
  "ORIG": {
    "skillName": "Dominus: Eye of Eternity",
    "shortName": "Dominus: Eye of Eternity",
    "icons": [
      "./icons/lethe/eye_of_eternity.png"
    ]
  },
  "HEC": {
    "skillName": "Sol Hecate",
    "shortName": "Sol Hecate",
    "icons": [
      "./icons/common/sol_hecate.png"
    ]
  }
} as const

type LetheSkillKey = keyof typeof LETHE_SKILL_META

const LETHE_ORDER_RAW: [LetheSkillKey, number][] = [
  ["MAJ", 1], ["DREAD", 4], ["B_CHAINS", 1], ["DREAD", 5], ["ASSIZE", 4], ["VARGR", 3],
  ["DREAD", 6], ["VARGR", 4], ["ASSIZE", 5], ["DREAD", 7], ["DEMONIC", 1], ["ASSIZE", 6],
  ["DREAD", 8], ["VARGR", 5], ["MAJ", 2], ["STAT1", 20], ["VO", 1], ["VARGR", 6],
  ["ASSIZE", 7], ["DREAD", 9], ["ASSIZE", 8], ["MAJ", 3], ["VARGR", 7], ["ASSIZE", 9],
  ["VARGR", 8], ["MAJ", 4], ["VARGR", 9], ["MAJ", 5], ["STAT2", 20], ["MAJ", 7],
  ["DREAD", 14], ["STAT3", 20], ["DREAD", 15], ["MAJ", 8], ["DREAD", 16], ["MAJ", 9],
  ["ASSIZE", 14], ["DREAD", 17], ["ASSIZE", 15], ["DREAD", 18], ["VARGR", 14], ["SOV", 1],
  ["VO", 3], ["ASSIZE", 16], ["VARGR", 15], ["DREAD", 19], ["ASSIZE", 17], ["B_DREAD", 1],
  ["VARGR", 16], ["ASSIZE", 18], ["VARGR", 17], ["B_AZRATH", 1], ["B_CHAINS", 6], ["ASSIZE", 19],
  ["VARGR", 18], ["B_PACK", 1], ["VARGR", 19], ["DREAD", 26], ["ORIG", 2], ["DREAD", 27],
  ["MAJ", 15], ["DREAD", 29], ["ASSIZE", 26], ["MAJ", 16], ["ORIG", 3], ["HEC", 2],
  ["ASSIZE", 27], ["VO", 9], ["SOV", 2], ["MAJ", 17], ["VARGR", 25], ["ASSIZE", 29],
  ["VARGR", 26], ["ORIG", 4], ["VARGR", 27], ["MAJ", 18], ["HEC", 3], ["SOV", 3],
  ["VARGR", 29], ["MAJ", 19], ["ORIG", 5], ["HEC", 4], ["SOV", 4], ["B_CHAINS", 12],
  ["ORIG", 6], ["HEC", 5], ["ORIG", 7], ["SOV", 5], ["MAJ", 25], ["HEC", 6],
  ["MAJ", 26], ["ORIG", 8], ["SOV", 6], ["MAJ", 27], ["ORIG", 9], ["HEC", 7],
  ["MAJ", 29], ["DREAD", 30], ["SOV", 7], ["HEC", 8], ["SOV", 8], ["DEMONIC", 2],
  ["B_DREAD", 2], ["HEC", 9], ["ASSIZE", 30], ["B_CHAINS", 18], ["SOV", 9], ["B_AZRATH", 2],
  ["B_DREAD", 3], ["VARGR", 30], ["DEMONIC", 3], ["B_PACK", 2], ["B_DREAD", 4], ["B_AZRATH", 3],
  ["VO", 18], ["DEMONIC", 4], ["B_DREAD", 10], ["B_PACK", 3], ["B_AZRATH", 4], ["B_CHAINS", 24],
  ["ORIG", 14], ["B_AZRATH", 10], ["B_PACK", 4], ["ORIG", 15], ["DEMONIC", 5], ["B_CHAINS", 30],
  ["B_PACK", 10], ["ORIG", 16], ["DEMONIC", 6], ["HEC", 15], ["MAJ", 30], ["ORIG", 17],
  ["SOV", 14], ["ORIG", 18], ["SOV", 15], ["DEMONIC", 7], ["SOV", 16], ["DEMONIC", 8],
  ["HEC", 16], ["VO", 24], ["SOV", 17], ["HEC", 30], ["DEMONIC", 9], ["SOV", 18],
  ["B_DREAD", 11], ["VO", 30], ["SOV", 19], ["B_AZRATH", 11], ["B_DREAD", 12], ["B_PACK", 11],
  ["B_DREAD", 20], ["B_AZRATH", 12], ["ORIG", 30], ["B_AZRATH", 20], ["B_PACK", 12], ["SOV", 26],
  ["B_PACK", 20], ["SOV", 27], ["B_DREAD", 30], ["SOV", 29], ["DEMONIC", 14], ["B_AZRATH", 30],
  ["DEMONIC", 16], ["B_PACK", 30], ["DEMONIC", 26], ["SOV", 30], ["DEMONIC", 30]
]

export const LETHE_PRIORITY_STEPS: PriorityStep[] = LETHE_ORDER_RAW.map(([key, targetLevel]) => {
  const meta = LETHE_SKILL_META[key]
  return {
    skillName: meta.skillName,
    shortName: meta.shortName,
    targetLevel,
    icons: [...meta.icons]
  }
})

export const LETHE_CLASS: ClassPreset = {
  id: 'lethe',
  name: 'Lethe',
  branch: 'demonic',
  welcomeMessage: 'Welcome to the Lethe Hexa Matrix Planner for 6th Job!',
  hexaStatTypes: ['M.ATT', 'INT', 'Crit Damage'],
  priorities: [
    {
      id: 'lethe_scouter',
      name: 'Lethe Hexa Upgrade Order (167 Steps)',
      steps: LETHE_PRIORITY_STEPS
    }
  ],
  nodes: {
    skills: [
      {
        id: 'lethe-origin',
        name: 'Dominus: Eye of Eternity',
        type: 'origin',
        customIcon: './icons/lethe/eye_of_eternity.png'
      },
      {
        id: 'lethe-sovereign',
        name: 'Sovereign Everlasting',
        type: 'origin',
        customIcon: './icons/lethe/sovereign_everlasting.png'
      },
      {
        id: 'lethe-void-origin',
        name: 'Void Origin',
        type: 'origin',
        customIcon: './icons/lethe/void_origin.png'
      }
    ],
    enhancement: [
      {
        id: 'lethe-enhance-1',
        name: 'Dominus: Dread Onslaught Boost',
        type: 'boost',
        customIcon: './icons/lethe/dominus_dread_onslaught.png'
      },
      {
        id: 'lethe-enhance-2',
        name: 'Dominus: Pack United Boost',
        type: 'boost',
        customIcon: './icons/lethe/dominus_pack_united.png'
      },
      {
        id: 'lethe-enhance-3',
        name: 'Dominus: Azrath Boost',
        type: 'boost',
        customIcon: './icons/lethe/dominus_azrath.png'
      },
      {
        id: 'lethe-enhance-4',
        name: 'Chains of Command Boost',
        type: 'boost',
        customIcon: './icons/lethe/chains_of_command.png'
      }
    ],
    mastery: [
      {
        id: 'lethe-mastery-combo-1',
        name: 'HEXA Assize / HEXA Edict: Fell Storm',
        type: 'mastery',
        customIcon: './icons/lethe/hexa_assize.png',
        multiIcons: [
          './icons/lethe/hexa_assize.png',
          './icons/lethe/hexa_edict_fell_storm.png'
        ],
        subSkills: [
          { name: 'HEXA Assize', icon: './icons/lethe/hexa_assize.png' },
          { name: 'HEXA Edict: Fell Storm', icon: './icons/lethe/hexa_edict_fell_storm.png' }
        ]
      },
      {
        id: 'lethe-mastery-combo-2',
        name: 'HEXA Beckon: Vargr / HEXA Edict: Rampage',
        type: 'mastery',
        customIcon: './icons/lethe/hexa_beckon_vargr.png',
        multiIcons: [
          './icons/lethe/hexa_beckon_vargr.png',
          './icons/lethe/hexa_edict_rampage.png'
        ],
        subSkills: [
          { name: 'HEXA Beckon: Vargr', icon: './icons/lethe/hexa_beckon_vargr.png' },
          { name: 'HEXA Edict: Rampage', icon: './icons/lethe/hexa_edict_rampage.png' }
        ]
      },
      {
        id: 'lethe-mastery-combo-3',
        name: 'HEXA Beckon: Dread Knight / HEXA Edict: Dread Advance',
        type: 'mastery',
        customIcon: './icons/lethe/hexa_beckon_dread_knight.png',
        multiIcons: [
          './icons/lethe/hexa_beckon_dread_knight.png',
          './icons/lethe/hexa_edict_dread_advance.png'
        ],
        subSkills: [
          { name: 'HEXA Beckon: Dread Knight', icon: './icons/lethe/hexa_beckon_dread_knight.png' },
          { name: 'HEXA Edict: Dread Advance', icon: './icons/lethe/hexa_edict_dread_advance.png' }
        ]
      },
      {
        id: 'lethe-mastery-combo-4',
        name: 'HEXA Majeure / Oath Incarnate',
        type: 'mastery',
        customIcon: './icons/lethe/hexa_majeure.png',
        multiIcons: [
          './icons/lethe/hexa_majeure.png',
          './icons/lethe/oath_incarnate.png'
        ],
        subSkills: [
          { name: 'HEXA Majeure', icon: './icons/lethe/hexa_majeure.png' },
          { name: 'Oath Incarnate', icon: './icons/lethe/oath_incarnate.png' }
        ]
      }
    ],
    common: getCommonNodesForBranch('demonic')
  }
}
