import { NodeType } from '../types/hexa'

export interface LevelCost {
  level: number
  solErda: number
  fragments: number
}

// Cost to upgrade TO that level (from level - 1)
// Index 0: Level 1 (unlock)
export const ORIGIN_SKILL_COSTS: LevelCost[] = [
  { level: 1, solErda: 5, fragments: 100 },
  { level: 2, solErda: 1, fragments: 30 },
  { level: 3, solErda: 1, fragments: 35 },
  { level: 4, solErda: 1, fragments: 40 },
  { level: 5, solErda: 2, fragments: 45 },
  { level: 6, solErda: 2, fragments: 50 },
  { level: 7, solErda: 2, fragments: 55 },
  { level: 8, solErda: 3, fragments: 60 },
  { level: 9, solErda: 3, fragments: 65 },
  { level: 10, solErda: 10, fragments: 200 },
  { level: 11, solErda: 3, fragments: 75 },
  { level: 12, solErda: 3, fragments: 80 },
  { level: 13, solErda: 3, fragments: 85 },
  { level: 14, solErda: 3, fragments: 90 },
  { level: 15, solErda: 4, fragments: 95 },
  { level: 16, solErda: 4, fragments: 100 },
  { level: 17, solErda: 4, fragments: 105 },
  { level: 18, solErda: 4, fragments: 110 },
  { level: 19, solErda: 5, fragments: 115 },
  { level: 20, solErda: 15, fragments: 300 },
  { level: 21, solErda: 5, fragments: 125 },
  { level: 22, solErda: 5, fragments: 130 },
  { level: 23, solErda: 5, fragments: 135 },
  { level: 24, solErda: 5, fragments: 140 },
  { level: 25, solErda: 6, fragments: 145 },
  { level: 26, solErda: 6, fragments: 150 },
  { level: 27, solErda: 6, fragments: 155 },
  { level: 28, solErda: 7, fragments: 160 },
  { level: 29, solErda: 7, fragments: 165 },
  { level: 30, solErda: 20, fragments: 400 },
]

export const MASTERY_NODE_COSTS: LevelCost[] = [
  { level: 1, solErda: 3, fragments: 50 },
  { level: 2, solErda: 1, fragments: 15 },
  { level: 3, solErda: 1, fragments: 18 },
  { level: 4, solErda: 1, fragments: 20 },
  { level: 5, solErda: 1, fragments: 23 },
  { level: 6, solErda: 1, fragments: 25 },
  { level: 7, solErda: 1, fragments: 28 },
  { level: 8, solErda: 2, fragments: 30 },
  { level: 9, solErda: 2, fragments: 33 },
  { level: 10, solErda: 5, fragments: 100 },
  { level: 11, solErda: 2, fragments: 38 },
  { level: 12, solErda: 2, fragments: 40 },
  { level: 13, solErda: 2, fragments: 43 },
  { level: 14, solErda: 2, fragments: 45 },
  { level: 15, solErda: 2, fragments: 48 },
  { level: 16, solErda: 2, fragments: 50 },
  { level: 17, solErda: 2, fragments: 53 },
  { level: 18, solErda: 2, fragments: 55 },
  { level: 19, solErda: 3, fragments: 58 },
  { level: 20, solErda: 8, fragments: 150 },
  { level: 21, solErda: 3, fragments: 63 },
  { level: 22, solErda: 3, fragments: 65 },
  { level: 23, solErda: 3, fragments: 68 },
  { level: 24, solErda: 3, fragments: 70 },
  { level: 25, solErda: 3, fragments: 73 },
  { level: 26, solErda: 3, fragments: 75 },
  { level: 27, solErda: 4, fragments: 78 },
  { level: 28, solErda: 4, fragments: 80 },
  { level: 29, solErda: 4, fragments: 83 },
  { level: 30, solErda: 10, fragments: 200 },
]

export const BOOST_NODE_COSTS: LevelCost[] = [
  { level: 1, solErda: 4, fragments: 75 },
  { level: 2, solErda: 1, fragments: 23 },
  { level: 3, solErda: 1, fragments: 26 },
  { level: 4, solErda: 1, fragments: 30 },
  { level: 5, solErda: 1, fragments: 34 },
  { level: 6, solErda: 1, fragments: 38 },
  { level: 7, solErda: 1, fragments: 41 },
  { level: 8, solErda: 2, fragments: 45 },
  { level: 9, solErda: 2, fragments: 49 },
  { level: 10, solErda: 7, fragments: 150 },
  { level: 11, solErda: 2, fragments: 56 },
  { level: 12, solErda: 2, fragments: 60 },
  { level: 13, solErda: 2, fragments: 64 },
  { level: 14, solErda: 2, fragments: 68 },
  { level: 15, solErda: 3, fragments: 71 },
  { level: 16, solErda: 3, fragments: 75 },
  { level: 17, solErda: 3, fragments: 79 },
  { level: 18, solErda: 3, fragments: 83 },
  { level: 19, solErda: 4, fragments: 86 },
  { level: 20, solErda: 11, fragments: 225 },
  { level: 21, solErda: 4, fragments: 94 },
  { level: 22, solErda: 4, fragments: 98 },
  { level: 23, solErda: 4, fragments: 101 },
  { level: 24, solErda: 4, fragments: 105 },
  { level: 25, solErda: 5, fragments: 109 },
  { level: 26, solErda: 5, fragments: 113 },
  { level: 27, solErda: 5, fragments: 116 },
  { level: 28, solErda: 6, fragments: 120 },
  { level: 29, solErda: 6, fragments: 124 },
  { level: 30, solErda: 15, fragments: 300 },
]

export const COMMON_NODE_COSTS: LevelCost[] = [
  { level: 1, solErda: 7, fragments: 125 },
  { level: 2, solErda: 2, fragments: 38 },
  { level: 3, solErda: 2, fragments: 44 },
  { level: 4, solErda: 2, fragments: 50 },
  { level: 5, solErda: 3, fragments: 56 },
  { level: 6, solErda: 3, fragments: 63 },
  { level: 7, solErda: 3, fragments: 69 },
  { level: 8, solErda: 4, fragments: 75 },
  { level: 9, solErda: 4, fragments: 81 },
  { level: 10, solErda: 13, fragments: 250 },
  { level: 11, solErda: 4, fragments: 94 },
  { level: 12, solErda: 4, fragments: 100 },
  { level: 13, solErda: 4, fragments: 106 },
  { level: 14, solErda: 4, fragments: 113 },
  { level: 15, solErda: 5, fragments: 119 },
  { level: 16, solErda: 5, fragments: 125 },
  { level: 17, solErda: 5, fragments: 131 },
  { level: 18, solErda: 5, fragments: 138 },
  { level: 19, solErda: 6, fragments: 144 },
  { level: 20, solErda: 19, fragments: 375 },
  { level: 21, solErda: 6, fragments: 156 },
  { level: 22, solErda: 6, fragments: 163 },
  { level: 23, solErda: 6, fragments: 169 },
  { level: 24, solErda: 6, fragments: 175 },
  { level: 25, solErda: 8, fragments: 181 },
  { level: 26, solErda: 8, fragments: 188 },
  { level: 27, solErda: 8, fragments: 194 },
  { level: 28, solErda: 9, fragments: 200 },
  { level: 29, solErda: 9, fragments: 206 },
  { level: 30, solErda: 25, fragments: 500 },
]

export function getNodeCostTable(type: NodeType): LevelCost[] {
  switch (type) {
    case 'origin':
      return ORIGIN_SKILL_COSTS
    case 'mastery':
      return MASTERY_NODE_COSTS
    case 'boost':
      return BOOST_NODE_COSTS
    case 'common':
      return COMMON_NODE_COSTS
  }
}

export function calculateCostBetweenLevels(
  type: NodeType,
  fromLevel: number,
  toLevel: number
): { solErda: number; fragments: number } {
  if (fromLevel >= toLevel) return { solErda: 0, fragments: 0 }
  
  const table = getNodeCostTable(type)
  let totalErda = 0
  let totalFrags = 0

  for (let lvl = fromLevel + 1; lvl <= toLevel; lvl++) {
    const cost = table[lvl - 1]
    if (cost) {
      totalErda += cost.solErda
      totalFrags += cost.fragments
    }
  }

  return { solErda: totalErda, fragments: totalFrags }
}

export function getHexaStatFragmentCost(attemptNumber: number): number {
  if (attemptNumber <= 0) return 0
  if (attemptNumber <= 3) return 10
  if (attemptNumber <= 6) return 20
  if (attemptNumber <= 9) return 30
  if (attemptNumber <= 12) return 40
  if (attemptNumber <= 15) return 50
  return 60
}
