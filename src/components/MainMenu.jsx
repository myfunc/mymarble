import { useState } from 'react'
import './MainMenu.css'

function MainMenu() {
  const [hoveredButton, setHoveredButton] = useState(null)

  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked`)
    // TODO: Implement navigation logic
  }

  return (
    <div className="main-menu">
      <div className="main-menu__content">
        <h1 className="main-menu__title">Ball Game</h1>
        <div className="main-menu__buttons">
          <button
            className={`main-menu__button ${hoveredButton === 'play' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredButton('play')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick('Play')}
          >
            Play
          </button>
          <button
            className={`main-menu__button ${hoveredButton === 'editor' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredButton('editor')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick('Editor')}
          >
            Editor
          </button>
          <button
            className={`main-menu__button ${hoveredButton === 'settings' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredButton('settings')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick('Settings')}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainMenu
