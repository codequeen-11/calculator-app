import { CalculatorKey } from './CalculatorKey'

export function ScientificKeypad() {
  return (
    <div className="mb-3 grid grid-cols-6 gap-2 sm:gap-2.5">
      <CalculatorKey variant="function">(</CalculatorKey>
      <CalculatorKey variant="function">)</CalculatorKey>
      <CalculatorKey variant="function">mc</CalculatorKey>
      <CalculatorKey variant="function">m+</CalculatorKey>
      <CalculatorKey variant="function">m−</CalculatorKey>
      <CalculatorKey variant="function">mr</CalculatorKey>

      <CalculatorKey variant="function">2ⁿᵈ</CalculatorKey>
      <CalculatorKey variant="function">x²</CalculatorKey>
      <CalculatorKey variant="function">x³</CalculatorKey>
      <CalculatorKey variant="function">xʸ</CalculatorKey>
      <CalculatorKey variant="function">eˣ</CalculatorKey>
      <CalculatorKey variant="function">10ˣ</CalculatorKey>

      <CalculatorKey variant="function">¹⁄ₓ</CalculatorKey>
      <CalculatorKey variant="function">²√x</CalculatorKey>
      <CalculatorKey variant="function">³√x</CalculatorKey>
      <CalculatorKey variant="function">ʸ√x</CalculatorKey>
      <CalculatorKey variant="function">ln</CalculatorKey>
      <CalculatorKey variant="function">log₁₀</CalculatorKey>

      <CalculatorKey variant="function">x!</CalculatorKey>
      <CalculatorKey variant="function">sin</CalculatorKey>
      <CalculatorKey variant="function">cos</CalculatorKey>
      <CalculatorKey variant="function">tan</CalculatorKey>
      <CalculatorKey variant="function">e</CalculatorKey>
      <CalculatorKey variant="function">EE</CalculatorKey>

      <CalculatorKey variant="function">Rand</CalculatorKey>
      <CalculatorKey variant="function">sinh</CalculatorKey>
      <CalculatorKey variant="function">cosh</CalculatorKey>
      <CalculatorKey variant="function">tanh</CalculatorKey>
      <CalculatorKey variant="function">π</CalculatorKey>
      <CalculatorKey variant="function">Deg</CalculatorKey>
    </div>
  )
}