import { CalculatorKey } from './CalculatorKey'

export function BasicKeypad() {
  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
      <CalculatorKey variant="function">
        AC
      </CalculatorKey>

      <CalculatorKey variant="function">
        +/−
      </CalculatorKey>

      <CalculatorKey variant="function">
        %
      </CalculatorKey>

      <CalculatorKey variant="operator">
        ÷
      </CalculatorKey>

      <CalculatorKey>7</CalculatorKey>
      <CalculatorKey>8</CalculatorKey>
      <CalculatorKey>9</CalculatorKey>

      <CalculatorKey variant="operator">
        ×
      </CalculatorKey>

      <CalculatorKey>4</CalculatorKey>
      <CalculatorKey>5</CalculatorKey>
      <CalculatorKey>6</CalculatorKey>

      <CalculatorKey variant="operator">
        −
      </CalculatorKey>

      <CalculatorKey>1</CalculatorKey>
      <CalculatorKey>2</CalculatorKey>
      <CalculatorKey>3</CalculatorKey>

      <CalculatorKey variant="operator">
        +
      </CalculatorKey>

      <CalculatorKey >
        <span className="text-[1.5rem]">▦</span>
      </CalculatorKey>

      <CalculatorKey>0</CalculatorKey>

      <CalculatorKey>
        .
      </CalculatorKey>

      <CalculatorKey variant="operator">
        =
      </CalculatorKey>
    </div>
  )
}