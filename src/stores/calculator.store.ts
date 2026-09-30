import { create } from 'zustand'

import type {
  AngleMode,
  CalculatorMode,
  CalculatorStatus,
} from '@/types/calculator'

interface CalculatorState {
  expression: string
  result: string
  mode: CalculatorMode
  angleMode: AngleMode
  status: CalculatorStatus

  setExpression: (expression: string) => void
  setResult: (result: string) => void
  setMode: (mode: CalculatorMode) => void
  setAngleMode: (angleMode: AngleMode) => void
  setStatus: (status: CalculatorStatus) => void
  reset: () => void
}

const initialState = {
  expression: '',
  result: '0',
  mode: 'basic' as CalculatorMode,
  angleMode: 'deg' as AngleMode,
  status: 'idle' as CalculatorStatus,
}

export const useCalculatorStore = create<CalculatorState>()((set) => ({
  ...initialState,

  setExpression: (expression) => set({ expression }),

  setResult: (result) => set({ result }),

  setMode: (mode) => set({ mode }),

  setAngleMode: (angleMode) => set({ angleMode }),

  setStatus: (status) => set({ status }),

  reset: () => set(initialState),
}))