import { forwardRef, useImperativeHandle, useRef } from 'react'
/* eslint-disable react/no-unknown-property */
import { BallCollider, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { Quaternion, Vector3 } from 'three'
import { BALL_TUNING } from '../physics/config'
import { useBallController } from '../controls/useBallController'

const UP = new Vector3(0, 1, 0)

const Ball = forwardRef(function Ball({ inputRef, spawn = [0, 2, 0] }, externalRef) {
  const bodyRef = useRef(null)
  const visualRef = useRef(null)
  const stretchTarget = useRef(new Vector3(1, 1, 1))
  const velocityVector = useRef(new Vector3())
  const directionVector = useRef(new Vector3())
  const orientationTarget = useRef(new Quaternion())

  useImperativeHandle(externalRef, () => bodyRef.current, [])

  useBallController({ bodyRef, inputRef })

  useFrame(() => {
    const body = bodyRef.current
    const visual = visualRef.current
    if (!body || !visual) return

    const linvel = body.linvel()
    velocityVector.current.set(linvel.x, linvel.y, linvel.z)
    const speed = velocityVector.current.length()

    const stretchStrength = Math.min(speed / BALL_TUNING.maxHorizontalSpeed, 1)
    const elongatedAxis = BALL_TUNING.stretch.minScale +
      (BALL_TUNING.stretch.maxScale - BALL_TUNING.stretch.minScale) * stretchStrength

    const horizontalScale = 1 - (elongatedAxis - 1) * 0.5
    stretchTarget.current.set(horizontalScale, elongatedAxis, horizontalScale)
    visual.scale.lerp(stretchTarget.current, BALL_TUNING.stretch.response)

    if (speed > 0.2) {
      directionVector.current.copy(velocityVector.current).normalize()
      orientationTarget.current.setFromUnitVectors(UP, directionVector.current)
      visual.quaternion.slerp(orientationTarget.current, 0.18)
    } else {
      orientationTarget.current.identity()
      visual.quaternion.slerp(orientationTarget.current, 0.1)
    }
  })

  return (
    <RigidBody
      ref={bodyRef}
      canSleep={false}
      colliders={false}
      position={spawn}
      linearDamping={BALL_TUNING.linearDamping}
      angularDamping={BALL_TUNING.angularDamping}
    >
      <BallCollider args={[BALL_TUNING.radius]} friction={BALL_TUNING.friction} restitution={BALL_TUNING.restitution} />
      <group ref={visualRef}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[BALL_TUNING.radius, 48, 48]} />
          <meshStandardMaterial color="#f4b942" roughness={0.35} metalness={0.15} />
        </mesh>
      </group>
    </RigidBody>
  )
})

export default Ball
