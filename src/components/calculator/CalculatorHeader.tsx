import { History } from 'lucide-react'

interface CalculatorHeaderProps {
  onHistoryClick?: () => void
}

export function CalculatorHeader({
  onHistoryClick,
}: CalculatorHeaderProps) {
  return (
    <header className="flex items-center justify-between px-1 py-2">
      <button
        type="button"
        onClick={onHistoryClick}
        aria-label="Open calculation history"
        className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-operator-key)] transition-colors hover:bg-[var(--color-number-key)] active:scale-95"
      >
        <History size={25} strokeWidth={2} />
      </button>

      <span className="text-sm font-medium text-[var(--color-muted-text)]">
        Calculator
      </span>

      <div className="h-10 w-10" aria-hidden="true" />
    </header>
  )
}