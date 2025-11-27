import { useEffect, useRef } from 'react'

const KEY_BINDINGS = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'backward',
  ArrowDown: 'backward',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
  Space: 'jump',
}

const INITIAL_STATE = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
}

export function useInput() {
  const inputRef = useRef({ ...INITIAL_STATE })

  useEffect(() => {
    const updateKeyState = (pressed) => (event) => {
      const binding = KEY_BINDINGS[event.code]
      if (!binding) return

      if (event.target && 'tagName' in event.target) {
        const tag = event.target.tagName
        if (tag && (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT')) {
          return
        }
      }

      event.preventDefault()
      inputRef.current[binding] = pressed
    }

    const handleKeyDown = updateKeyState(true)
    const handleKeyUp = updateKeyState(false)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return inputRef
}
