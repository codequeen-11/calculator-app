import type { ReactNode } from 'react'

type CalculatorKeyVariant =
  | 'number'
  | 'function'
  | 'operator'

interface CalculatorKeyProps {
  children: ReactNode
  variant?: CalculatorKeyVariant
  wide?: boolean
  onClick?: () => void
  ariaLabel?: string
}

const variantStyles: Record<CalculatorKeyVariant, string> = {
  number: [
    'bg-[var(--color-number-key)]',
    'text-[var(--color-key-text)]',
    'hover:bg-[var(--color-number-key-hover)]',
    'active:bg-[var(--color-number-key-active)]',
  ].join(' '),

  function: [
    'bg-[var(--color-function-key)]',
    'text-[var(--color-key-text)]',
    'hover:bg-[var(--color-function-key-hover)]',
    'active:bg-[var(--color-function-key-active)]',
  ].join(' '),

  operator: [
    'bg-[var(--color-operator-key)]',
    'text-[var(--color-operator-text)]',
    'hover:bg-[var(--color-operator-key-hover)]',
    'active:bg-[var(--color-operator-key-active)]',
  ].join(' '),
}

export function CalculatorKey({
  children,
  variant = 'number',
  wide = false,
  onClick,
  ariaLabel,
}: CalculatorKeyProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        'flex aspect-square w-full items-center justify-center',
        'rounded-full',
        'text-[clamp(1.35rem,5vw,2rem)]',
        'font-normal',
        'select-none',
        'transition-[transform,background-color]',
        'duration-100',
        'hover:scale-[1.02]',
        'active:scale-[0.94]',
        'touch-manipulation',
        variantStyles[variant],
        wide ? 'col-span-2' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}