import { BLOCK_GRID_SIZE } from '../physics/config'

export const BLOCK_TYPES = {
  CUBE: 'cube',
  HALF: 'half',
  RAMP: 'ramp',
  SLOPE: 'slope',
  HALF_SLOPE: 'halfSlope',
  CORNER_SLOPE: 'cornerSlope',
  EDGE_FENCE: 'edgeFence',
}

export const LEVEL_BLOCKS = [
  {
    id: 'arena-floor',
    type: BLOCK_TYPES.CUBE,
    size: [BLOCK_GRID_SIZE * 10, BLOCK_GRID_SIZE, BLOCK_GRID_SIZE * 10],
    position: [0, -BLOCK_GRID_SIZE / 2, 0],
    materialId: 'ground',
  },
  {
    id: 'platform-left',
    type: BLOCK_TYPES.CUBE,
    size: [BLOCK_GRID_SIZE * 4, BLOCK_GRID_SIZE, BLOCK_GRID_SIZE * 4],
    position: [-BLOCK_GRID_SIZE * 5, 0, -BLOCK_GRID_SIZE * 3],
  },
  {
    id: 'platform-right',
    type: BLOCK_TYPES.CUBE,
    size: [BLOCK_GRID_SIZE * 3, BLOCK_GRID_SIZE, BLOCK_GRID_SIZE * 3],
    position: [BLOCK_GRID_SIZE * 5, BLOCK_GRID_SIZE, BLOCK_GRID_SIZE * 3],
    materialId: 'accent',
  },
  {
    id: 'half-block-steps-1',
    type: BLOCK_TYPES.HALF,
    size: [BLOCK_GRID_SIZE * 2, BLOCK_GRID_SIZE / 2, BLOCK_GRID_SIZE * 2],
    position: [-BLOCK_GRID_SIZE * 1, BLOCK_GRID_SIZE / 4, BLOCK_GRID_SIZE * 4],
  },
  {
    id: 'half-block-steps-2',
    type: BLOCK_TYPES.HALF,
    size: [BLOCK_GRID_SIZE * 2, BLOCK_GRID_SIZE / 2, BLOCK_GRID_SIZE * 2],
    position: [-BLOCK_GRID_SIZE * 1, BLOCK_GRID_SIZE * 0.75, BLOCK_GRID_SIZE * 6],
  },
  {
    id: 'main-ramp-up',
    type: BLOCK_TYPES.RAMP,
    size: [BLOCK_GRID_SIZE * 3, BLOCK_GRID_SIZE * 2, BLOCK_GRID_SIZE * 6],
    position: [BLOCK_GRID_SIZE * 2, 0, -BLOCK_GRID_SIZE * 5],
    rotation: [0, Math.PI, 0],
  },
  {
    id: 'slope-bridge',
    type: BLOCK_TYPES.SLOPE,
    size: [BLOCK_GRID_SIZE * 4, BLOCK_GRID_SIZE * 2, BLOCK_GRID_SIZE * 4],
    position: [-BLOCK_GRID_SIZE * 4, BLOCK_GRID_SIZE * 0.5, BLOCK_GRID_SIZE * 2],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    id: 'half-slope',
    type: BLOCK_TYPES.HALF_SLOPE,
    size: [BLOCK_GRID_SIZE * 2, BLOCK_GRID_SIZE, BLOCK_GRID_SIZE * 3],
    position: [BLOCK_GRID_SIZE * 4, 0, BLOCK_GRID_SIZE * 5],
  },
  {
    id: 'corner-slope',
    type: BLOCK_TYPES.CORNER_SLOPE,
    size: [BLOCK_GRID_SIZE * 3, BLOCK_GRID_SIZE * 2.5, BLOCK_GRID_SIZE * 3],
    position: [-BLOCK_GRID_SIZE * 4, 0, -BLOCK_GRID_SIZE * 4],
  },
  {
    id: 'edge-fence-north',
    type: BLOCK_TYPES.EDGE_FENCE,
    size: [BLOCK_GRID_SIZE * 10, BLOCK_GRID_SIZE * 1.2, BLOCK_GRID_SIZE * 0.35],
    position: [0, BLOCK_GRID_SIZE * 0.35, -BLOCK_GRID_SIZE * 5],
  },
  {
    id: 'edge-fence-south',
    type: BLOCK_TYPES.EDGE_FENCE,
    size: [BLOCK_GRID_SIZE * 10, BLOCK_GRID_SIZE * 1.2, BLOCK_GRID_SIZE * 0.35],
    position: [0, BLOCK_GRID_SIZE * 0.35, BLOCK_GRID_SIZE * 5],
  },
]
