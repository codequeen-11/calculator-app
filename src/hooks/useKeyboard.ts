import { useEffect } from 'react'
import { useCalculatorStore } from '@/stores/calculator.store'

export function useKeyboard() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) return

      const target = event.target

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return
      }

      const key = event.key
      const pressKey = useCalculatorStore.getState().pressKey

      if (/^[0-9.]$/.test(key)) {
        event.preventDefault()
        pressKey(key)
        return
      }

      const operators: Record<string, string> = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷',
        '%': '%',
        '(': '(',
        ')': ')',
        Enter: '=',
        '=': '=',
        Backspace: '⌫',
        Escape: 'AC',
      }

      const mappedKey = operators[key]

      if (mappedKey) {
        event.preventDefault()
        pressKey(mappedKey)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}