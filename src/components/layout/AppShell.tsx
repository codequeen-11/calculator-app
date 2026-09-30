import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      {children}
    </main>
  )
}