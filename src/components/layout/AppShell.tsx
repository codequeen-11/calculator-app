import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[var(--color-app-background)] text-[var(--color-display)] transition-colors duration-200">
      {children}
    </main>
  )
}