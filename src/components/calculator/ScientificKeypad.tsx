import { Calculator as CalculatorIcon } from 'lucide-react'
import { useCalculatorStore } from '@/stores/calculator.store'
import { CalculatorKey } from './CalculatorKey'

const scientificRows = [
  ['(', ')', 'mc', 'm+', 'm−', 'mr'],
  ['2ⁿᵈ', 'x²', 'x³', '^', 'eˣ', '10ˣ'],
  ['1/x', '√x', '∛x', 'ʸ√x', 'ln', 'log₁₀'],
  ['x!', 'sin', 'cos', 'tan', 'e', 'EE'],
  ['Rand', 'sinh', 'cosh', 'tanh', 'π', 'angle'],
]

const basicRows = [
  ['AC', '+/−', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['calculator', '0', '.', '='],
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
  const pressKey = useCalculatorStore(
    (state) => state.pressKey,
  )

  const angleMode = useCalculatorStore(
    (state) => state.angleMode,
  )

  const setAngleMode = useCalculatorStore(
    (state) => state.setAngleMode,
  )

  const secondFunction = useCalculatorStore(
    (state) => state.secondFunction,
  )

  const toggleSecondFunction = useCalculatorStore(
    (state) => state.toggleSecondFunction,
  )

  const memory = useCalculatorStore(
    (state) => state.memory,
  )

  const mode = useCalculatorStore(
    (state) => state.mode,
  )

  const handleScientificKey = (key: string) => {
    if (key === 'angle') {
      setAngleMode(
        angleMode === 'deg' ? 'rad' : 'deg',
      )
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

    pressKey(effectiveKey)
  }

  const handleBasicKey = (key: string) => {
    if (key === 'calculator') {
      useCalculatorStore
        .getState()
        .setMode(
          mode === 'basic'
            ? 'scientific'
            : 'basic',
        )

      return
    }

    pressKey(key)
  }



return (
  <section className="w-full">
    {/* Header */}
    <div
      className="
        mb-2
        flex
        items-center
        justify-between
        px-1
        text-[11px]
        text-muted-foreground
        sm:text-xs
      "
    >
      <span>
        {secondFunction
          ? '2ⁿᵈ functions active'
          : 'Scientific'}
      </span>

      <span aria-live="polite">
        {memory !== null
          ? 'M · Memory stored'
          : 'Memory empty'}
      </span>
    </div>

  
    {/* PHONE / COMPACT LAYOUT      */}

    <div className="block lg:hidden">
      {/* Scientific keys — 6 columns */}
      <div
        className="
          grid
          grid-cols-6
          gap-2
          sm:gap-2.5
        "
       >
        {scientificRows.flat().map((key) => {
          const label =
            key === 'angle'
              ? angleMode === 'deg'
                ? 'Deg'
                : 'Rad'
              : secondFunction &&
                  secondFunctionLabels[key]
                ? secondFunctionLabels[key]
                : key

          return (
            <CalculatorKey
              key={`phone-scientific-${key}`}
              variant="function"
              ariaLabel={
                key === 'angle'
                  ? `Angle mode: ${
                      angleMode === 'deg'
                        ? 'degrees'
                        : 'radians'
                    }. Click to switch.`
                  : key === '2ⁿᵈ'
                    ? `Second functions ${
                        secondFunction
                          ? 'active'
                          : 'inactive'
                      }`
                    : label
              }
              onClick={() =>
                handleScientificKey(key)
              }
            >
              {label}
            </CalculatorKey>
          )
        })}
      </div>

      {/* Basic keys — 4 columns */}
      <div
        className="
          mt-2
          grid
          grid-cols-4
          gap-2
          sm:gap-2.5
        "
      >
        {basicRows.flat().map((key) => {
          const isOperator = [
            '÷',
            '×',
            '−',
            '+',
            '=',
          ].includes(key)

          const isCalculatorButton =
            key === 'calculator'

          return (
            <CalculatorKey
              key={`phone-basic-${key}`}
              variant={
                isOperator
                  ? 'operator'
                  : isCalculatorButton
                    ? 'number'
                    : 'function'
              }
              ariaLabel={
                isCalculatorButton
                  ? 'Switch calculator mode'
                  : key
              }
              onClick={() =>
                handleBasicKey(key)
              }
            >
              {isCalculatorButton ? (
                <CalculatorIcon
                  size={24}
                  strokeWidth={1.8}
                />
              ) : (
                key
              )}
            </CalculatorKey>
          )
        })}
      </div>
    </div>

    {/* TABLET / DESKTOP UNIFIED LAYOUT    */}

    <div className="hidden lg:block  ">
      <div className="space-y-1.5 sm:space-y-2">
        {scientificRows.map(
          (scientificRow, rowIndex) => {
            const basicRow = basicRows[rowIndex]

            return (
              <div
                key={rowIndex}
                className="
                  grid
                  grid-cols-10
                  gap-1.5
                  sm:gap-2
                  lg:gap-2.5
                "
              >
                {/* Scientific side */}
                <div
                  className="
                    col-span-6
                    grid
                    grid-cols-6
                    gap-1.5
                    sm:gap-2
                  "
                >
                  {scientificRow.map((key) => {
                    const label =
                      key === 'angle'
                        ? angleMode === 'deg'
                          ? 'Deg'
                          : 'Rad'
                        : secondFunction &&
                            secondFunctionLabels[key]
                          ? secondFunctionLabels[key]
                          : key

                    return (
                      <CalculatorKey
                        key={`desktop-scientific-${key}`}
                        variant="function"
                        ariaLabel={
                          key === 'angle'
                            ? `Angle mode: ${
                                angleMode === 'deg'
                                  ? 'degrees'
                                  : 'radians'
                              }. Click to switch.`
                            : key === '2ⁿᵈ'
                              ? `Second functions ${
                                  secondFunction
                                    ? 'active'
                                    : 'inactive'
                                }`
                              : label
                        }
                        onClick={() =>
                          handleScientificKey(key)
                        }
                      >
                        {label}
                      </CalculatorKey>
                    )
                  })}
                </div>

                {/* Basic side */}
                <div
                  className="
                    col-span-4
                    grid
                    grid-cols-4
                    gap-1.5
                    sm:gap-2
                  "
                >
                  {basicRow.map((key) => {
                    const isOperator = [
                      '÷',
                      '×',
                      '−',
                      '+',
                      '=',
                    ].includes(key)

                    const isCalculatorButton =
                      key === 'calculator'

                    return (
                      <CalculatorKey
                        key={`desktop-basic-${key}`}
                        variant={
                          isOperator
                            ? 'operator'
                            : isCalculatorButton
                              ? 'number'
                              : 'function'
                        }
                        ariaLabel={
                          isCalculatorButton
                            ? 'Switch calculator mode'
                            : key
                        }
                        onClick={() =>
                          handleBasicKey(key)
                        }
                      >
                        {isCalculatorButton ? (
                          <CalculatorIcon
                            size={24}
                            strokeWidth={1.8}
                          />
                        ) : (
                          key
                        )}
                      </CalculatorKey>
                    )
                  })}
                </div>
              </div>
            )
          },
        )}
      </div>
    </div>
  </section>
)

}