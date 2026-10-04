import { useCalculatorStore } from '@/stores/calculator.store'
import { CalculatorKey } from './CalculatorKey'

const rows = [
  ['(', ')', 'mc', 'm+', 'm−', 'mr'],
  ['2ⁿᵈ', 'x²', 'x³', '^', 'eˣ', '10ˣ'],
  ['1/x', '√x', '∛x', 'ʸ√x', 'ln', 'log₁₀'],
  ['x!', 'sin', 'cos', 'tan', 'e', 'EE'],
  ['Rand', 'sinh', 'cosh', 'tanh', 'π', 'angle'],
]

const secondFunctionLabels: Record<string, string> = {
  sin: 'sin⁻¹',
  cos: 'cos⁻¹',
  tan: 'tan⁻¹',
  'x²': '√x',
  'x³': '∛x',
  'eˣ': 'ln',
  '10ˣ': 'log₁₀',
}

export function ScientificKeypad() {
  const pressKey = useCalculatorStore((state) => state.pressKey)
  const angleMode = useCalculatorStore((state) => state.angleMode)
  const setAngleMode = useCalculatorStore((state) => state.setAngleMode)
  const secondFunction = useCalculatorStore(
    (state) => state.secondFunction,
  )
  const toggleSecondFunction = useCalculatorStore(
    (state) => state.toggleSecondFunction,
  )
  const memory = useCalculatorStore((state) => state.memory)

  const handleKey = (key: string) => {
    if (key === 'angle') {
      setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')
      return
    }

    if (key === '2ⁿᵈ') {
      toggleSecondFunction()
      return
    }

    const effectiveKey =
      secondFunction && secondFunctionLabels[key]
        ? secondFunctionLabels[key]
        : key

    // Do not silently treat the nth-root key as exponentiation.
    // if (effectiveKey === 'ʸ√x') {
    //   return
    // }

    pressKey(effectiveKey)
  }

  return (
    <div className="mb-3">
      <div className="mb-2 flex items-center justify-between px-1 text-xs text-muted-foreground">
        <span>
          {secondFunction ? '2ⁿᵈ functions active' : 'Scientific'}
        </span>

        <span aria-live="polite">
          {memory !== null ? 'M · Memory stored' : 'Memory empty'}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
        {rows.flat().map((key) => {
          const label =
            key === 'angle'
              ? angleMode === 'deg' ? 'Deg' : 'Rad'
              : secondFunction && secondFunctionLabels[key]
                ? secondFunctionLabels[key]
                : key

          return (
            <CalculatorKey
              key={key}
              variant="function"
              ariaLabel={
                key === 'angle'
                  ? `Angle mode: ${angleMode === 'deg' ? 'degrees' : 'radians'}. Click to switch.`
                  : key === '2ⁿᵈ'
                    ? `Second functions ${secondFunction ? 'active' : 'inactive'}`
                    : label
              }
              onClick={() => handleKey(key)}
            >
              {label}
            </CalculatorKey>
          )
        })}
      </div>
    </div>
  )
}