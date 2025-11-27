/* eslint-disable react/no-unknown-property */

function GameEnvironment() {
  return (
    <>
      <color attach="background" args={[ '#05070d' ]} />
      <fog attach="fog" args={[ '#05070d', 30, 120 ]} />
      <ambientLight intensity={0.35} />
      <hemisphereLight intensity={0.25} groundColor="#0f1024" />
      <directionalLight
        castShadow
        intensity={1.1}
        position={[-15, 25, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={80}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
    </>
  )
}

export default GameEnvironment
