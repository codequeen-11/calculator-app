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

  secondFunction: boolean
  memory: number | null

  setExpression: (expression: string) => void
  setResult: (result: string) => void
  setMode: (mode: CalculatorMode) => void
  setAngleMode: (mode: AngleMode) => void
  setStatus: (status: CalculatorStatus) => void
  toggleSecondFunction: () => void
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
  secondFunction: false,
  memory: null as number | null,
}

function preview(
  expression: string,
  angleMode: AngleMode,
): string | null {
  if (!expression.trim()) return null

  try {
    return formatResult(evaluateExpression(expression, angleMode))
  } catch {
    return null
  }
}

function getCurrentValue(state: CalculatorState): number | null {
  if (state.justEvaluated && state.lastValue !== null) {
    return state.lastValue
  }

  if (state.expression.trim()) {
    try {
      return evaluateExpression(state.expression, state.angleMode)
    } catch {
      return null
    }
  }

  if (
    state.result !== 'Error' &&
    state.result.trim() !== '' &&
    Number.isFinite(Number(state.result))
  ) {
    return Number(state.result)
  }

  return null
}

const scientificFunctions: Record<string, string> = {
  sin: 'sin',
  cos: 'cos',
  tan: 'tan',
  'sin⁻¹': 'asin',
  'cos⁻¹': 'acos',
  'tan⁻¹': 'atan',
  sinh: 'sinh',
  cosh: 'cosh',
  tanh: 'tanh',
  ln: 'ln',
  'log₁₀': 'log',
  '√x': 'sqrt',
  '∛x': 'cbrt',
  '1/x': 'reciprocal',
  'x²': 'square',
  'x³': 'cube',
  'eˣ': 'exp',
  '10ˣ': 'exp10',
  'x!': 'factorial',
}

export const useCalculatorStore = create<CalculatorState>()(
  (set, get) => ({
    ...initialState,

    setExpression: (expression) => set({ expression }),
    setResult: (result) => set({ result }),
    setMode: (mode) => set({ mode }),
    setAngleMode: (angleMode) => set({ angleMode }),
    setStatus: (status) => set({ status }),

    toggleSecondFunction: () =>
      set((state) => ({
        secondFunction: !state.secondFunction,
      })),

    reset: () => {
      const memory = get().memory

      set({
        ...initialState,
        memory,
      })
    },

    pressKey: (key) => {
      const state = get()
      let { expression } = state

      // Clear current calculation but preserve memory.
      if (key === 'AC') {
        set({
          ...initialState,
          memory: state.memory,
        })
        return
      }

      // Clear the last character.
      if (key === '⌫') {
        expression = expression.slice(0, -1)

        set({
          expression,
          result: preview(expression, state.angleMode) ?? '0',
          status: 'idle',
          justEvaluated: false,
          lastValue: null,
        })
        return
      }

      // Evaluate the current expression.
      if (key === '=') {
        if (!expression.trim()) return

        try {
          const value = evaluateExpression(
            expression,
            state.angleMode,
          )

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

      // Toggle primary and secondary scientific functions.
      if (key === '2ⁿᵈ') {
        get().toggleSecondFunction()
        return
      }

      // Angle mode.
      if (key === 'Deg' || key === 'Rad') {
        set({
          angleMode: key === 'Deg' ? 'deg' : 'rad',
        })
        return
      }

      // Memory controls: MC, M+, M−, MR.
      const memoryKey = key.toLowerCase()

      if (['mc', 'm+', 'm−', 'mr'].includes(memoryKey)) {
        const currentState = get()

        if (memoryKey === 'mc') {
          set({ memory: null })
          return
        }

        if (memoryKey === 'mr') {
          if (currentState.memory === null) return

          const memoryValue = String(currentState.memory)
          let nextExpression: string

          if (
            currentState.justEvaluated ||
            !currentState.expression
          ) {
            nextExpression = memoryValue
          } else if (
            /[+\-×÷^.(]$/.test(currentState.expression)
          ) {
            nextExpression =
              currentState.expression + memoryValue
          } else {
            nextExpression =
              `${currentState.expression}×${memoryValue}`
          }

          set({
            expression: nextExpression,
            result:
              preview(nextExpression, currentState.angleMode) ??
              currentState.result,
            status: 'idle',
            justEvaluated: false,
            lastValue: null,
          })
          return
        }

        const currentValue = getCurrentValue(currentState)

        if (currentValue === null) return

        const previousMemory = currentState.memory ?? 0

        const nextMemory =
          memoryKey === 'm+'
            ? previousMemory + currentValue
            : previousMemory - currentValue

        if (!Number.isFinite(nextMemory)) return

        set({ memory: nextMemory })
        return
      }

      // Constants: pi and e.
      if (key === 'π' || key === 'e') {
        const constant = key === 'π' ? 'pi' : 'e'

        const nextExpression =
          state.justEvaluated || !expression
            ? constant
            : /[+\-×÷^.(]$/.test(expression)
              ? expression + constant
              : `${expression}×${constant}`

        set({
          expression: nextExpression,
          result:
            preview(nextExpression, state.angleMode) ??
            state.result,
          status: 'idle',
          justEvaluated: false,
          lastValue: null,
        })
        return
      }

      // Scientific functions wrap the current expression.
      const scientificFunction = scientificFunctions[key]

      if (scientificFunction) {
        const source =
          state.justEvaluated && state.lastValue !== null
            ? String(state.lastValue)
            : expression

        if (!source || /[+\-×÷^.(]$/.test(source)) {
          return
        }

        const nextExpression =
          `${scientificFunction}(${source})`

        set({
          expression: nextExpression,
          result:
            preview(nextExpression, state.angleMode) ??
            state.result,
          status: 'idle',
          justEvaluated: false,
          lastValue: null,
        })
        return
      }

      // Change the sign of the current value/expression.
      if (key === '+/−') {
        if (state.justEvaluated && state.lastValue !== null) {
          expression = String(-state.lastValue)
        } else if (!expression) {
          expression = '-'
        } else {
          expression = `-(${expression})`
        }

        set({
          expression,
          result:
            preview(expression, state.angleMode) ??
            state.result,
          status: 'idle',
          justEvaluated: false,
          lastValue: null,
        })
        return
      }

      // Random number between 0 (inclusive) and 1 (exclusive).
      if (key === 'Rand') {
        const randomValue = String(Math.random())

        const nextExpression =
          state.justEvaluated || !expression
            ? randomValue
            : /[+\-×÷^.(]$/.test(expression)
              ? expression + randomValue
              : `${expression}×${randomValue}`

        set({
          expression: nextExpression,
          result:
            preview(nextExpression, state.angleMode) ??
            state.result,
          status: 'idle',
          justEvaluated: false,
          lastValue: null,
        })
        return
      }

      // Numeric input and operators.
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
        const currentNumber =
          expression.split(/[+\-×÷^()%()]/).at(-1) ?? ''

        if (key === '.' && currentNumber.includes('.')) {
          return
        }

        if (
          key === '.' &&
          (!currentNumber || currentNumber === '-')
        ) {
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
      } else if (key === 'EE') {
        // Scientific exponent input is handled in a later step.
        return
      } else {
        return
      }

      set({
        expression,
        result: preview(expression, state.angleMode) ?? state.result,
        status: 'idle',
        justEvaluated: false,
        lastValue: null,
      })
    },
  }),
)