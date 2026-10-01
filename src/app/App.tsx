import { Calculator } from '@/components/calculator/Calculator'
import { AppShell } from '@/components/layout/AppShell'

function App() {
  return (
    <AppShell>
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <Calculator />
      </div>
    </AppShell>
  )
}

export default App