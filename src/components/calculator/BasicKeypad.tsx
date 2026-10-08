import { Calculator as CalculatorIcon } from 'lucide-react'
import { useCalculatorStore } from '@/stores/calculator.store'
import { CalculatorKey } from './CalculatorKey'

export function BasicKeypad() {
  const pressKey = useCalculatorStore((state) => state.pressKey)
  const mode = useCalculatorStore((state) => state.mode)

  const toggleMode = () => {
    useCalculatorStore
      .getState()
      .setMode(mode === 'basic' ? 'scientific' : 'basic')
  }

  return (
    <div
      className="
        grid
        grid-cols-4
        gap-1.5

        sm:gap-2

        md:gap-2.5
      "
    >
      <CalculatorKey
        variant="function"
        onClick={() => pressKey('AC')}
      >
        AC
      </CalculatorKey>

      <CalculatorKey
        variant="function"
        onClick={() => pressKey('+/−')}
      >
        +/−
      </CalculatorKey>

      <CalculatorKey
        variant="function"
        onClick={() => pressKey('%')}
      >
        %
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => pressKey('÷')}
      >
        ÷
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('7')}>
        7
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('8')}>
        8
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('9')}>
        9
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => pressKey('×')}
      >
        ×
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('4')}>
        4
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('5')}>
        5
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('6')}>
        6
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => pressKey('−')}
      >
        −
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('1')}>
        1
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('2')}>
        2
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('3')}>
        3
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => pressKey('+')}
      >
        +
      </CalculatorKey>

      <CalculatorKey
        variant="number"
        ariaLabel="Switch calculator mode"
        onClick={toggleMode}
      >
        <CalculatorIcon
          size={22}
          strokeWidth={1.8}
        />
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('0')}>
        0
      </CalculatorKey>

      <CalculatorKey onClick={() => pressKey('.')}>
        .
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => pressKey('=')}
      >
        =
      </CalculatorKey>
    </div>
  )
}