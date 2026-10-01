import { useCalculatorStore } from '@/stores/calculator.store'

import { CalculatorDisplay } from './CalculatorDisplay'
import { CalculatorHeader } from './CalculatorHeader'
import { CalculatorKeypad } from './CalculatorKeypad'

export function Calculator() {
  const expression = useCalculatorStore(
    (state) => state.expression,
  )

  const result = useCalculatorStore(
    (state) => state.result,
  )

  const mode = useCalculatorStore(
    (state) => state.mode,
  )

  return (
    <section className="w-full max-w-[var(--calculator-max-width)]">
      <CalculatorHeader />

      <CalculatorDisplay
        expression={expression}
        result={result}
      />

      <CalculatorKeypad
        scientific={mode === 'scientific'}
      />
    </section>
  )
}