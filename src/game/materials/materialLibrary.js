export const MATERIAL_LIBRARY = {
  default: {
    color: '#a5b4fc',
    roughness: 0.7,
    metalness: 0.05,
  },
  ground: {
    color: '#3a425c',
    roughness: 0.9,
    metalness: 0,
  },
  accent: {
    color: '#5eead4',
    roughness: 0.4,
    metalness: 0.2,
  },
  fence: {
    color: '#fcd34d',
    roughness: 0.5,
    metalness: 0.3,
  },
}

export function getMaterialProps(materialId = 'default') {
  return MATERIAL_LIBRARY[materialId] ?? MATERIAL_LIBRARY.default
}
