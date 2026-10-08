import { BasicKeypad } from './BasicKeypad'
import { ScientificKeypad } from './ScientificKeypad'

interface CalculatorKeypadProps {
  scientific: boolean
}

export function CalculatorKeypad({
  scientific,
}: CalculatorKeypadProps) {
  return (
    <div
      className="
        mx-auto
        w-full
        
        
        px-1
        sm:px-2
      "
    >
      {scientific ? (
        <ScientificKeypad />
      ) : (
        <BasicKeypad />
      )}
    </div>
  )
}