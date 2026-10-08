import {
  Calculator as CalculatorIcon,
  History,
  Trash2,
  X,
} from 'lucide-react'

import { useCalculatorStore } from '@/stores/calculator.store'

interface HistoryPanelProps {
  onClose?: () => void
}

export default function HistoryPanel({
  onClose,
}: HistoryPanelProps) {
  const history = useCalculatorStore((state) => state.history)
  const clearHistory = useCalculatorStore(
    (state) => state.clearHistory,
  )
  const setExpression = useCalculatorStore(
    (state) => state.setExpression,
  )
  const setResult = useCalculatorStore(
    (state) => state.setResult,
  )
  const setStatus = useCalculatorStore(
    (state) => state.setStatus,
  )

  const handleSelect = (
    expression: string,
    result: string,
  ) => {
    setExpression(expression)
    setResult(result)
    setStatus('idle')

    useCalculatorStore.setState({
      justEvaluated: false,
      lastValue: null,
    })

    onClose?.()
  }

  const formatTime = (timestamp: number) => {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(timestamp)
  }

  return (
    <section
      className="
        flex h-full min-h-0 flex-col overflow-hidden
        rounded-[28px]
        border border-black/[0.06]
        bg-white/95
        shadow-[0_20px_60px_rgba(0,0,0,0.14)]
        backdrop-blur-xl
        dark:border-white/[0.08]
        dark:bg-zinc-900/95
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
      "
    >
      {/* Header */}
      <header
        className="
          flex shrink-0 items-center justify-between
          border-b border-black/[0.06]
          px-5 py-4
          dark:border-white/[0.08]
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-2xl
              bg-[var(--color-operator-key)]/10
              text-[var(--color-operator-key)]
            "
          >
            <History size={19} strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
              History
            </h2>

            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {history.length === 0
                ? 'No calculations'
                : `${history.length} ${
                    history.length === 1
                      ? 'calculation'
                      : 'calculations'
                  }`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {history.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              aria-label="Clear calculation history"
              title="Clear history"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                text-zinc-400
                transition
                hover:bg-red-500/10
                hover:text-red-500
                active:scale-95
                dark:text-zinc-500
                dark:hover:text-red-400
              "
            >
              <Trash2 size={16} />
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close history"
              title="Close"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                text-zinc-400
                transition
                hover:bg-black/5
                hover:text-zinc-700
                active:scale-95
                dark:text-zinc-500
                dark:hover:bg-white/10
                dark:hover:text-zinc-200
              "
            >
              <X size={18} />
            </button>
          )}
        </div>
      </header>

      {/* History content */}
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {history.length === 0 ? (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center px-6 text-center">
            <div
              className="
                mb-4 flex h-14 w-14 items-center justify-center
                rounded-2xl
                bg-zinc-100
                text-zinc-400
                dark:bg-zinc-800
                dark:text-zinc-500
              "
            >
              <CalculatorIcon
                size={25}
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              No calculations yet
            </h3>

            <p className="mt-1 max-w-[220px] text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              Your completed calculations will appear here.
            </p>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {history.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() =>
                    handleSelect(
                      item.expression,
                      item.result,
                    )
                  }
                  className="
                    group w-full rounded-2xl
                    border border-transparent
                    px-4 py-3
                    text-left
                    transition-all duration-150
                    hover:border-[var(--color-operator-key)]/15
                    hover:bg-[var(--color-operator-key)]/[0.05]
                    active:scale-[0.99]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--color-operator-key)]
                  "
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-[13px] text-zinc-500 dark:text-zinc-400">
                      {item.expression}
                    </span>

                    <span className="shrink-0 text-[10px] text-zinc-400 dark:text-zinc-500">
                      {formatTime(item.timestamp)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-3">
                    <span className="truncate text-[18px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {item.result}
                    </span>

                    <span
                      className="
                        shrink-0 text-[11px]
                        font-medium
                        text-[var(--color-operator-key)]
                        opacity-0
                        transition-opacity
                        group-hover:opacity-100
                      "
                    >
                      Use result
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}