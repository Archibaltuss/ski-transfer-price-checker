import { useState, useEffect } from 'react'
import type { CalculateResponse } from './types/api'
import SearchForm from './components/SearchForm'
import ResultsPage from './components/ResultsPage'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

function App() {
  const [result, setResult] = useState<CalculateResponse | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  return (
    <main
      style={{
        padding: '48px 24px',
        maxWidth: '600px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        Ski Transfer Price Checker
      </h1>

      {result ? (
        <ResultsPage result={result} onBack={() => setResult(null)} />
      ) : (
        <SearchForm onResult={setResult} />
      )}
    </main>
  )
}

export default App
