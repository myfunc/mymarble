import { Canvas } from '@react-three/fiber'
import MainMenu from './components/MainMenu'
import './App.css'

function App() {
  return (
    <div className="app">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
      <MainMenu />
    </div>
  )
}

export default App
