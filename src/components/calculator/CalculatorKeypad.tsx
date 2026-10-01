import { BasicKeypad } from './BasicKeypad'
import { ScientificKeypad } from './ScientificKeypad'

interface CalculatorKeypadProps {
  scientific: boolean
}

export function CalculatorKeypad({
  scientific,
}: CalculatorKeypadProps) {
  return (
    <>
      {scientific && <ScientificKeypad />}

      <BasicKeypad />
    </>
  )
}