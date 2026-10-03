import { useCalculatorStore } from '@/stores/calculator.store'
import { CalculatorKey } from './CalculatorKey'

const rows = [
  ['(', ')', 'mc', 'm+', 'm−', 'mr'],
  ['2ⁿᵈ', 'x²', 'x³', '^', 'eˣ', '10ˣ'],
  ['1/x', '√x', '∛x', 'ʸ√x', 'ln', 'log₁₀'],
  ['x!', 'sin', 'cos', 'tan', 'e', 'EE'],
  ['Rand', 'sinh', 'cosh', 'tanh', 'π', 'angle'],
]

export function ScientificKeypad() {
  const pressKey = useCalculatorStore((state) => state.pressKey)
  const angleMode = useCalculatorStore((state) => state.angleMode)
  const setAngleMode = useCalculatorStore((state) => state.setAngleMode)

  const handleKey = (key: string) => {
    if (key === 'angle') {
      setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')
      return
    }

    if (key === '2ⁿᵈ') {
      return
    }

    if (key === 'ʸ√x') {
      pressKey('^')
      return
    }

    if (key === 'EE') {
      pressKey('EE')
      return
    }

    if (key === 'Rand') {
      pressKey('Rand')
      return
    }

    pressKey(key)
  }

  return (
    <div className="mb-3 grid grid-cols-6 gap-2 sm:gap-2.5">
      {rows.flat().map((key) => (
        <CalculatorKey
          key={key}
          variant="function"
          ariaLabel={
            key === 'angle'
              ? `Switch angle mode. Current mode: ${angleMode}`
              : key
          }
          onClick={() => handleKey(key)}
        >
          {key === 'angle'
            ? angleMode === 'deg' ? 'Deg' : 'Rad'
            : key}
        </CalculatorKey>
      ))}
    </div>
  )
}