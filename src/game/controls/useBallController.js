import { useBeforePhysicsStep, useRapier } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { BALL_TUNING, FIXED_TIMESTEP } from '../physics/config'

const DOWN = new Vector3(0, -1, 0)

export function useBallController({ bodyRef, inputRef }) {
  const groundedRef = useRef(false)
  const jumpLatchRef = useRef(false)
  const moveVector = useRef(new Vector3())
  const forwardVector = useRef(new Vector3(0, 0, -1))
  const rightVector = useRef(new Vector3(1, 0, 0))
  const horizontalVelocity = useRef(new Vector3())
  const rayOrigin = useRef(new Vector3())

  const { camera } = useThree()
  const { rapier, world } = useRapier()

  useBeforePhysicsStep(() => {
    const body = bodyRef.current
    if (!body || !inputRef.current) return

    updateCameraBasis(camera, forwardVector.current, rightVector.current)
    const input = inputRef.current
    const movement = moveVector.current
    movement.set(0, 0, 0)

    if (input.forward) movement.add(forwardVector.current)
    if (input.backward) movement.addScaledVector(forwardVector.current, -1)
    if (input.right) movement.add(rightVector.current)
    if (input.left) movement.addScaledVector(rightVector.current, -1)

    const movementIsActive = movement.lengthSq() > 0
    if (movementIsActive) {
      movement.normalize()
      const accel = groundedRef.current
        ? BALL_TUNING.acceleration
        : BALL_TUNING.acceleration * BALL_TUNING.airControlFactor
      movement.multiplyScalar(accel * FIXED_TIMESTEP)
      body.applyImpulse({ x: movement.x, y: 0, z: movement.z }, true)
    }

    const linvel = body.linvel()
    const horizontal = horizontalVelocity.current
    horizontal.set(linvel.x, 0, linvel.z)

    const speed = horizontal.length()
    if (speed > BALL_TUNING.maxHorizontalSpeed) {
      horizontal.normalize().multiplyScalar(BALL_TUNING.maxHorizontalSpeed)
      body.setLinvel({ x: horizontal.x, y: linvel.y, z: horizontal.z }, true)
    } else if (groundedRef.current && !movementIsActive && speed > 0.01) {
      horizontal.multiplyScalar(0.8)
      body.setLinvel({ x: horizontal.x, y: linvel.y, z: horizontal.z }, true)
    }

    if (input.jump && groundedRef.current && !jumpLatchRef.current) {
      body.applyImpulse({ x: 0, y: BALL_TUNING.jumpImpulse, z: 0 }, true)
      jumpLatchRef.current = true
      groundedRef.current = false
    }

    if (!input.jump) {
      jumpLatchRef.current = false
    }

    const translation = body.translation()
    rayOrigin.current.set(translation.x, translation.y, translation.z)
    const ray = new rapier.Ray(rayOrigin.current, DOWN)
    const hit = world.castRay(ray, BALL_TUNING.raycastLength, true)
    groundedRef.current = Boolean(hit) && hit.toi <= BALL_TUNING.raycastLength * 0.95
  })

  return groundedRef
}

function updateCameraBasis(camera, forwardTarget, rightTarget) {
  camera.getWorldDirection(forwardTarget)
  forwardTarget.y = 0
  if (forwardTarget.lengthSq() === 0) {
    forwardTarget.set(0, 0, -1)
  }
  forwardTarget.normalize()
  rightTarget.set(forwardTarget.z, 0, -forwardTarget.x).normalize()
}
