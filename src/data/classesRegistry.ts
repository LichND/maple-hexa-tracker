import { ClassId, ClassMeta, ClassPreset } from './commonSkills'

export const CLASS_LIST: ClassMeta[] = [
  { id: 'lethe', name: 'Lethe', branch: 'demonic' },
  { id: 'kanna', name: 'Kanna', branch: 'sengoku' },
  { id: 'lynn', name: 'Lynn', branch: 'jianghu' }
]

export const CLASS_META_MAP = Object.fromEntries(
  CLASS_LIST.map((cls) => [cls.id, cls])
) as Record<ClassId, ClassMeta>

const presetCache: Partial<Record<ClassId, ClassPreset>> = {}

export function isClassId(classId: string): classId is ClassId {
  return classId in CLASS_META_MAP
}

export function normalizeClassId(classId?: string): ClassId {
  return classId && isClassId(classId) ? classId : 'lethe'
}

export function getLoadedClassPreset(classId: string): ClassPreset | undefined {
  return presetCache[normalizeClassId(classId)]
}

export async function loadClassPreset(classId: string): Promise<ClassPreset> {
  const normalizedId = normalizeClassId(classId)
  const cached = presetCache[normalizedId]
  if (cached) {
    return cached
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
      preset = (await import('./classes/lethe')).LETHE_CLASS
      break
  }

  presetCache[normalizedId] = preset
  return preset
}
