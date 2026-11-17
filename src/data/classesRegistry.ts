import { ClassMeta, ClassPreset } from './commonSkills'

export const CLASS_LIST: ClassMeta[] = [
  { id: 'lethe', name: 'Lethe', branch: 'demonic' },
  { id: 'kanna', name: 'Kanna', branch: 'sengoku' },
  { id: 'lynn', name: 'Lynn', branch: 'jianghu' }
]

export const CLASS_META_MAP: Record<string, ClassMeta> = Object.fromEntries(
  CLASS_LIST.map((cls) => [cls.id, cls])
)

const presetCache: Record<string, ClassPreset> = {}

export function getLoadedClassPreset(classId: string): ClassPreset | undefined {
  return presetCache[classId]
}

export async function loadClassPreset(classId: string): Promise<ClassPreset> {
  const normalizedId = CLASS_META_MAP[classId] ? classId : 'lethe'
  if (presetCache[normalizedId]) {
    return presetCache[normalizedId]
  }

  let preset: ClassPreset
  switch (normalizedId) {
    case 'kanna':
      preset = (await import('./classes/kanna')).KANNA_CLASS
      break
    case 'lynn':
      preset = (await import('./classes/lynn')).LYNN_CLASS
      break
    case 'lethe':
    default:
      preset = (await import('./classes/lethe')).LETHE_CLASS
      break
  }

  presetCache[normalizedId] = preset
  return preset
}
