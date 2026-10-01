interface CalculatorDisplayProps {
  expression: string
  result: string
}

export function CalculatorDisplay({
  expression,
  result,
}: CalculatorDisplayProps) {
  return (
    <section
      aria-label="Calculator display"
      className="flex min-h-[190px] flex-col items-end justify-end overflow-hidden px-1 pb-5 pt-8"
    >
      <div
        className="mb-2 min-h-7 max-w-full overflow-x-auto text-right text-lg text-[var(--color-muted-text)]"
        aria-label="Current expression"
      >
        <span className="whitespace-nowrap">
          {expression || '\u00A0'}
        </span>
      </div>

      <div
        className="max-w-full overflow-x-auto text-right"
        aria-live="polite"
        aria-label="Current result"
      >
        <span className="whitespace-nowrap text-[clamp(3.5rem,14vw,5.5rem)] font-light leading-none tracking-[-0.04em]">
          {result}
        </span>
      </div>
    </section>
  )
}