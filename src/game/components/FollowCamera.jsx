import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { CAMERA_CONFIG, CAMERA_MODES } from '../physics/config'

function FollowCamera({ targetRef, mode }) {
  const { camera } = useThree()
  const desiredPosition = useRef(new Vector3())
  const lookTarget = useRef(new Vector3())
  const heading = useRef(new Vector3(0, 0, 1))
  const velocityVector = useRef(new Vector3())

  useFrame((_, delta) => {
    if (mode !== CAMERA_MODES.FOLLOW || !targetRef.current) return
    const target = targetRef.current.translation()
    const linvel = targetRef.current.linvel()
    velocityVector.current.set(linvel.x, 0, linvel.z)
    if (velocityVector.current.lengthSq() > 0.001) {
      velocityVector.current.normalize()
      heading.current.lerp(velocityVector.current, 0.15)
    }

    desiredPosition.current
      .set(target.x, target.y, target.z)
      .addScaledVector(heading.current, -CAMERA_CONFIG.followDistance)
    desiredPosition.current.y = target.y + CAMERA_CONFIG.heightOffset

    const smoothFactor = 1 - Math.pow(1 - CAMERA_CONFIG.smoothing, delta * 60)
    camera.position.lerp(desiredPosition.current, smoothFactor)

    lookTarget.current
      .set(target.x, target.y + 1, target.z)
      .addScaledVector(heading.current, CAMERA_CONFIG.lookAhead)
    camera.lookAt(lookTarget.current)
  })

  return (
    <OrbitControls
      enabled={mode === CAMERA_MODES.FREE}
      makeDefault={mode === CAMERA_MODES.FREE}
      maxPolarAngle={Math.PI / 2.2}
      minDistance={3}
      maxDistance={30}
      enablePan={false}
      dampingFactor={0.05}
    />
  )
}

export default FollowCamera
