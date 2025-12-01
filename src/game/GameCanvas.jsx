import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useCallback, useEffect, useRef, useState } from 'react'
import Ball from './components/Ball'
import FollowCamera from './components/FollowCamera'
import GameEnvironment from './components/GameEnvironment'
import LevelBlocks from './components/LevelBlocks'
import { useInput } from './controls/useInput'
import { CAMERA_MODES, GRAVITY } from './physics/config'

function GameCanvas() {
  const inputRef = useInput()
  const ballRef = useRef(null)
  const [cameraMode, setCameraMode] = useState(CAMERA_MODES.FOLLOW)

  const toggleCameraMode = useCallback(() => {
    setCameraMode((mode) =>
      mode === CAMERA_MODES.FOLLOW ? CAMERA_MODES.FREE : CAMERA_MODES.FOLLOW,
    )
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === 'KeyC') {
        event.preventDefault()
        toggleCameraMode()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggleCameraMode])

  return (
    <div className="game-canvas">
      <Canvas
        shadows
        camera={{ position: [0, 6, 16], fov: 55 }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <Physics
          gravity={GRAVITY}
          timeStep="fixed"
          updateLoop="follow"
          interpolation={false}
        >
          <GameEnvironment />
          <LevelBlocks />
          <Ball ref={ballRef} inputRef={inputRef} />
          <FollowCamera targetRef={ballRef} mode={cameraMode} />
        </Physics>
      </Canvas>

      <div className="game-overlay">
        <button className="game-overlay__button" onClick={toggleCameraMode}>
          Камера: {cameraMode === CAMERA_MODES.FOLLOW ? 'Следовать' : 'Свободная'}
        </button>
        <div className="game-overlay__legend">
          <p>WASD / Стрелки — движение</p>
          <p>Пробел — прыжок</p>
          <p>C — переключение камеры</p>
        </div>
      </div>
    </div>
  )
}

export default GameCanvas
