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
        // Size
        'flex h-11 w-full min-w-0',
        'items-center justify-center',
        'sm:h-16',
        'lg:h-[58px]',

        // Shape
        'rounded-full',

        // Typography
        'text-[clamp(0.95rem,3.8vw,1.35rem)]',
        'font-normal leading-none',

        // Interaction
        'select-none',
        'touch-manipulation',
        'transition-[transform,background-color]',
        'duration-100',
        'hover:scale-[1.015]',
        'active:scale-[0.96]',

        // Accessibility
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[var(--color-operator-key)]',
        'focus-visible:ring-offset-2',

        // Variant
        variantStyles[variant],

        wide ? 'col-span-2' : '',
      ].join(' ')}
    >
      <span className="max-w-full truncate px-1">
        {children}
      </span>
    </button>
  )
}