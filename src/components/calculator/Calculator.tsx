import { useState } from 'react'
import { useCalculatorStore } from '@/stores/calculator.store'
import { useKeyboard } from '@/hooks/useKeyboard'

import { CalculatorDisplay } from './CalculatorDisplay'
import { CalculatorHeader } from './CalculatorHeader'
import { CalculatorKeypad } from './CalculatorKeypad'
import HistoryPanel from './HistoryPanel'

export function Calculator() {
  useKeyboard()

  const [showHistory, setShowHistory] = useState(false)

  const expression = useCalculatorStore(
    (state) => state.expression,
  )

  const result = useCalculatorStore(
    (state) => state.result,
  )

  const mode = useCalculatorStore(
    (state) => state.mode,
  )

  const closeHistory = () => {
    setShowHistory(false)
  }

  return (
    <main
      className="
        relative mx-auto flex min-h-screen w-full
        items-center justify-center
        px-4 py-5
        sm:px-6 sm:py-6
        lg:px-8 lg:py-6
      "
    >
      {/* Calculator */}
      <section
      //   className="
      //     w-full
      //     max-w-[var(--calculator-max-width)]
      //     transition-transform duration-300
      //   "
      // >
          className={`
      w-full
      transition-[max-width] duration-300 ease-out
      ${
        mode === 'basic'
          ? 'max-w-[430px] sm:max-w-[480px] lg:max-w-[500px]'
          : 'max-w-[900px] xl:max-w-[920px]'
      }
    `}
  >
        <CalculatorHeader
          onHistoryClick={() =>
            setShowHistory((visible) => !visible)
          }
        />

        <CalculatorDisplay
          expression={expression}
          result={result}
        />

        <CalculatorKeypad
          scientific={mode === 'scientific'}
        />
      </section>

      {/* History overlay */}
      {showHistory && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close calculation history"
            onClick={closeHistory}
            className="
              absolute inset-0
              cursor-default
              bg-black/20
              backdrop-blur-[2px]
              transition-opacity
              dark:bg-black/45
            "
          />

          {/* =========================
              MOBILE: Bottom sheet
             ========================= */}
          <aside
            className="
              absolute inset-x-0 bottom-0
              h-[min(78vh,620px)]
              w-full
              p-2
              sm:p-3

              sm:inset-y-0
              sm:left-0
              sm:right-auto
              sm:bottom-auto
              sm:h-full
              sm:w-[min(360px,88vw)]
            "
          >
            <div
              className="
                h-full
                animate-[history-sheet-in_220ms_ease-out]
                sm:animate-[history-drawer-in_220ms_ease-out]
              "
            >
              <HistoryPanel onClose={closeHistory} />
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}