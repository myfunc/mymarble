/* eslint-disable react/no-unknown-property */
import { memo, useMemo } from 'react'
import { RigidBody } from '@react-three/rapier'
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Euler,
  Quaternion,
} from 'three'
import { BLOCK_TYPES, LEVEL_BLOCKS } from '../blocks/blockDefinitions'
import { getMaterialProps } from '../materials/materialLibrary'

const geometryCache = new Map()

function getGeometry(block) {
  const key = `${block.type}-${block.size.join('x')}`
  if (geometryCache.has(key)) {
    return geometryCache.get(key)
  }

  let geometry
  switch (block.type) {
    case BLOCK_TYPES.CUBE:
    case BLOCK_TYPES.HALF:
    case BLOCK_TYPES.EDGE_FENCE:
      geometry = new BoxGeometry(...block.size)
      break
    case BLOCK_TYPES.RAMP:
    case BLOCK_TYPES.HALF_SLOPE:
      geometry = createRampGeometry(block.size)
      break
    case BLOCK_TYPES.SLOPE:
      geometry = createSideSlopeGeometry(block.size)
      break
    case BLOCK_TYPES.CORNER_SLOPE:
      geometry = createCornerSlopeGeometry(block.size)
      break
    default:
      geometry = new BoxGeometry(...block.size)
  }

  geometry.computeVertexNormals()
  geometryCache.set(key, geometry)
  return geometry
}

const LevelBlocks = memo(function LevelBlocks() {
  return (
    <>
      {LEVEL_BLOCKS.map((block) => (
        <StaticBlock key={block.id} block={block} />
      ))}
    </>
  )
})

function StaticBlock({ block }) {
  const geometry = useMemo(() => getGeometry(block), [block])
  const materialProps = getMaterialProps(block.materialId)
  const rotation = useMemo(() => toQuaternion(block.rotation), [block.rotation])

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      position={block.position}
      rotation={rotation}
      friction={1}
    >
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </RigidBody>
  )
}

function toQuaternion(rotation = [0, 0, 0]) {
  const [x, y, z] = rotation
  const quat = new Quaternion().setFromEuler(new Euler(x, y, z, 'XYZ'))
  return [quat.x, quat.y, quat.z, quat.w]
}

function createRampGeometry([width, height, depth]) {
  const hw = width / 2
  const hd = depth / 2
  const vertices = new Float32Array([
    -hw, 0, -hd,
    hw, 0, -hd,
    -hw, 0, hd,
    hw, 0, hd,
    -hw, height, hd,
    hw, height, hd,
  ])

  const indices = [
    0, 2, 1, 1, 2, 3,
    2, 4, 3, 3, 4, 5,
    0, 1, 5, 0, 5, 4,
    0, 4, 2,
    1, 3, 5,
  ]

  return bufferGeometryFrom(vertices, indices)
}

function createSideSlopeGeometry([width, height, depth]) {
  const hw = width / 2
  const hd = depth / 2
  const vertices = new Float32Array([
    -hw, 0, -hd,
    hw, 0, -hd,
    -hw, 0, hd,
    hw, 0, hd,
    hw, height, -hd,
    hw, height, hd,
  ])

  const indices = [
    0, 2, 1, 1, 2, 3,
    1, 4, 5, 1, 5, 3,
    0, 2, 5, 0, 5, 4,
    0, 4, 1,
    2, 3, 5,
  ]

  return bufferGeometryFrom(vertices, indices)
}

function createCornerSlopeGeometry([width, height, depth]) {
  const hw = width / 2
  const hd = depth / 2
  const vertices = new Float32Array([
    -hw, 0, -hd,
    hw, 0, -hd,
    -hw, 0, hd,
    hw, 0, hd,
    hw, height, hd,
  ])

  const indices = [
    0, 2, 1,
    1, 2, 3,
    2, 4, 3,
    1, 4, 3,
    0, 1, 4,
    0, 4, 2,
  ]

  return bufferGeometryFrom(vertices, indices)
}

function bufferGeometryFrom(vertices, indices) {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  return geometry
}

export default LevelBlocks
