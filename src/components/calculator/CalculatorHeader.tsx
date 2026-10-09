import { History } from 'lucide-react'

interface CalculatorHeaderProps {
onHistoryClick?: () => void
}

export function CalculatorHeader({
onHistoryClick,
}: CalculatorHeaderProps) {
return ( <header
   className="
     relative flex h-12 w-full
     items-start justify-between
     px-1
   "
 > <button
     type="button"
     onClick={onHistoryClick}
     aria-label="Open calculation history"
     title="Calculation history"
     className="
       relative z-10
       flex h-10 w-10 shrink-0
       items-center justify-center
       rounded-full
       text-[var(--color-operator-key)]
       transition-colors duration-200
       hover:bg-[var(--color-number-key)]
       active:scale-95
       focus-visible:outline-none
       focus-visible:ring-2
       focus-visible:ring-[var(--color-operator-key)]
     "
   > <History size={23} strokeWidth={2} /> </button>


  <span
    className="
      pointer-events-none
      absolute left-1/2
      -translate-x-1/2
      whitespace-nowrap
      text-sm font-medium
      tracking-tight
      text-[var(--color-muted-text)]
      sm:text-[15px]
    "
  >
    Calculator
  </span>

  <div
    className="h-10 w-10 shrink-0"
    aria-hidden="true"
  />
</header>


)
}

