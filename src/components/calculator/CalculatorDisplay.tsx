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
      className="
        flex
        min-h-[145px]
        flex-col
        items-end
        justify-end
        overflow-hidden
        px-2
        pb-5
        pt-4

        sm:min-h-[165px]
        sm:pb-5
        // sm:pt-5
        lg:min-h-[160px]
        lg:pb-3
        lg:pt-2
      "
    >
      {/* Expression */}
      <div
        className="
          mb-2
          min-h-6
          max-w-full
          overflow-x-auto
          text-right
          text-sm
          text-[var(--color-muted-text)]

          sm:text-base
        "
        aria-label="Current expression"
      >
        <span className="whitespace-nowrap">
          {expression || '\u00A0'}
        </span>
      </div>

      {/* Result */}
      <div
        className="
          max-w-full
          overflow-x-auto
          text-right
        "
        aria-live="polite"
        aria-label="Current result"
      >
        <span
          className="
            whitespace-nowrap
            text-[clamp(3.25rem,10vw,4.5rem)]
            font-light
            leading-none
            tracking-[-0.04em]

            sm:text-[clamp(3.5rem,8vw,5rem)]

            lg:text-[clamp(3rem,5vw,4.25rem)]
          "
        >
          {result}
        </span>
      </div>
    </section>
  )
}