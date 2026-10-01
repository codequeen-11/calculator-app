import { create } from 'zustand'
import type {
  AngleMode,
  CalculatorMode,
  CalculatorStatus,
} from '@/types/calculator'
import {
  CalculatorError,
  evaluateExpression,
} from '@/lib/calculator/evaluator'
import { formatResult } from '@/lib/calculator/formatter'

interface CalculatorState {
  expression: string
  result: string
  mode: CalculatorMode
  angleMode: AngleMode
  status: CalculatorStatus
  justEvaluated: boolean
  lastValue: number | null

  setExpression: (expression: string) => void
  setResult: (result: string) => void
  setMode: (mode: CalculatorMode) => void
  setAngleMode: (mode: AngleMode) => void
  setStatus: (status: CalculatorStatus) => void
  pressKey: (key: string) => void
  reset: () => void
}

const initialState = {
  expression: '',
  result: '0',
  mode: 'basic' as CalculatorMode,
  angleMode: 'deg' as AngleMode,
  status: 'idle' as CalculatorStatus,
  justEvaluated: false,
  lastValue: null as number | null,
}

function preview(expression: string): string | null {
  try {
    return formatResult(evaluateExpression(expression))
  } catch {
    return null
  }
}

export const useCalculatorStore = create<CalculatorState>()((set, get) => ({
  ...initialState,

  setExpression: (expression) => set({ expression }),
  setResult: (result) => set({ result }),
  setMode: (mode) => set({ mode }),
  setAngleMode: (angleMode) => set({ angleMode }),
  setStatus: (status) => set({ status }),

  reset: () => set(initialState),

  pressKey: (key) => {
    const state = get()
    let { expression } = state

    if (key === 'AC') {
      set(initialState)
      return
    }

    if (key === '⌫') {
      expression = expression.slice(0, -1)
      set({
        expression,
        result: preview(expression) ?? state.result,
        status: 'idle',
        justEvaluated: false,
        lastValue: null,
      })
      return
    }

    if (key === '=') {
      if (!expression) return

      try {
        const value = evaluateExpression(expression)

        set({
          expression,
          result: formatResult(value),
          status: 'idle',
          justEvaluated: true,
          lastValue: value,
        })
      } catch (error) {
        set({
          result: 'Error',
          status: 'error',
          justEvaluated: false,
        })

        if (!(error instanceof CalculatorError)) {
          console.error('Unexpected calculator error', error)
        }
      }

      return
    }

    if (key === '+/−') {
      if (!expression) {
        expression = '-'
      } else if (state.justEvaluated && state.lastValue !== null) {
        expression = String(-state.lastValue)
      } else {
        expression = `-(${expression})`
      }

      set({
        expression,
        result: preview(expression) ?? state.result,
        status: 'idle',
        justEvaluated: false,
        lastValue: null,
      })
      return
    }

    const isDigit = /^[0-9]$/.test(key)
    const isOperator = ['+', '−', '-', '×', '÷', '^'].includes(key)

    if (state.justEvaluated) {
      if (isDigit || key === '.') {
        expression = ''
      } else if (isOperator && state.lastValue !== null) {
        expression = String(state.lastValue)
      } else {
        expression = ''
      }
    }

    if (isDigit || key === '.') {
      const currentNumber = expression.split(/[+\-×÷^()%()]/).at(-1) ?? ''

      if (key === '.' && currentNumber.includes('.')) return

      if (key === '.' && (!currentNumber || currentNumber === '-')) {
        expression += '0'
      }

      expression += key
    } else if (isOperator) {
      const operator = key === '−' ? '-' : key

      if (!expression) {
        if (operator !== '-') return
        expression = '-'
      } else if (/[+\-×÷^]$/.test(expression)) {
        expression = expression.slice(0, -1) + operator
      } else {
        expression += operator
      }
    } else if (key === '(' || key === ')' || key === '%') {
      expression += key
    } else {
      return
    }

    set({
      expression,
      result: preview(expression) ?? state.result,
      status: 'idle',
      justEvaluated: false,
      lastValue: null,
    })
  },
}))