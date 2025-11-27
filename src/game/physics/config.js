export const GRAVITY = [0, -9.81, 0]
export const FIXED_TIMESTEP = 1 / 120
export const MAX_SUBSTEPS = 2

export const CAMERA_MODES = {
  FOLLOW: 'follow',
  FREE: 'free',
}

export const CAMERA_CONFIG = {
  followDistance: 8,
  heightOffset: 3,
  lookAhead: 2.5,
  smoothing: 0.08,
}

export const BALL_TUNING = {
  radius: 0.6,
  acceleration: 42,
  airControlFactor: 0.35,
  jumpImpulse: 8.5,
  maxHorizontalSpeed: 18,
  linearDamping: 0.35,
  angularDamping: 0.4,
  restitution: 0.15,
  friction: 0.95,
  raycastLength: 0.85,
  stretch: {
    minScale: 0.78,
    maxScale: 1.3,
    response: 0.2,
  },
}

export const BLOCK_GRID_SIZE = 2
