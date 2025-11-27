import MainMenu from './components/MainMenu'
import GameCanvas from './game/GameCanvas'
import './App.css'

function App() {
  return (
    <div className="app">
      <GameCanvas />
      <MainMenu />
    </div>
  )
}

export default App
