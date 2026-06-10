import { useState, useEffect } from 'react'
import type { Route, CalculateResponse } from '../types/api'

interface SearchFormProps {
  onResult: (result: CalculateResponse) => void
}

const API_BASE = import.meta.env.VITE_API_URL ?? ''

function SearchForm({ onResult }: SearchFormProps) {
  const [routes, setRoutes] = useState<Route[]>([])
  const [routesLoading, setRoutesLoading] = useState(true)

  const [airport, setAirport] = useState('')
  const [resort, setResort] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState('')

  const [touched, setTouched] = useState({
    airport: false,
    resort: false,
    date: false,
    passengers: false,
  })

  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const [routesError, setRoutesError] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE}/api/routes`)
      .then((res) => res.json())
      .then((data: Route[]) => setRoutes(data))
      .catch(() => setRoutesError(true))
      .finally(() => setRoutesLoading(false))
  }, [])

  const uniqueAirports = [...new Set(routes.map((r) => r.from_airport))]
  const airportRoutes = routes.filter((r) => r.from_airport !== '')
  const airportNames: Record<string, string> = {}
  for (const r of airportRoutes) {
    airportNames[r.from_airport] = r.from_name
  }

  const filteredResorts = routes.filter((r) => r.from_airport === airport)

  const today = new Date().toISOString().split('T')[0]
  const passengersNum = parseInt(passengers, 10)
  const passengersValid =
    !isNaN(passengersNum) && passengersNum >= 1 && passengersNum <= 8

  const errors = {
    airport: touched.airport && !airport,
    resort: touched.resort && !resort,
    date: touched.date && (!date || date < today),
    passengers: touched.passengers && !passengersValid,
  }

  const allValid = Boolean(
    airport && resort && date && date >= today && passengersValid,
  )

  const touch = (field: keyof typeof touched) =>
    setTouched((t) => ({ ...t, [field]: true }))

  const handleAirportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAirport(e.target.value)
    setResort('')
    touch('airport')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ airport: true, resort: true, date: true, passengers: true })
    if (!allValid) return

    setSubmitting(true)
    setApiError('')
    try {
      const res = await fetch(`${API_BASE}/api/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_airport: airport,
          to_resort: resort,
          date,
          passengers: passengersNum,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setApiError(
          (data as { detail?: string }).detail ?? `Error ${res.status}`,
        )
        return
      }
      const result: CalculateResponse = await res.json()
      onResult(result)
    } catch {
      setApiError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (routesError) {
    return (
      <p
        role="alert"
        style={{
          color: '#ef4444',
          padding: '12px 16px',
          background: 'rgba(239,68,68,0.08)',
          borderRadius: '6px',
          border: '1px solid rgba(239,68,68,0.3)',
        }}
      >
        Failed to load routes. Please refresh the page.
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '420px',
        margin: '0 auto',
        textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="airport" style={{ fontWeight: 500, color: 'var(--text-h)' }}>
          Airport
        </label>
        <select
          id="airport"
          value={airport}
          onChange={handleAirportChange}
          onBlur={() => touch('airport')}
          disabled={routesLoading}
          style={{
            padding: '8px 10px',
            borderRadius: '6px',
            border: `1px solid ${errors.airport ? '#ef4444' : 'var(--border)'}`,
            background: 'var(--code-bg)',
            color: 'var(--text-h)',
            fontSize: '16px',
          }}
        >
          <option value="">{routesLoading ? 'Loading...' : 'Select airport'}</option>
          {uniqueAirports.map((a) => (
            <option key={a} value={a}>
              {airportNames[a] ?? a}
            </option>
          ))}
        </select>
        {errors.airport && (
          <span role="alert" style={{ color: '#ef4444', fontSize: '13px' }}>
            Please select an airport
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="resort" style={{ fontWeight: 500, color: 'var(--text-h)' }}>
          Resort
        </label>
        <select
          id="resort"
          value={resort}
          onChange={(e) => {
            setResort(e.target.value)
            touch('resort')
          }}
          onBlur={() => touch('resort')}
          disabled={routesLoading || !airport}
          style={{
            padding: '8px 10px',
            borderRadius: '6px',
            border: `1px solid ${errors.resort ? '#ef4444' : 'var(--border)'}`,
            background: 'var(--code-bg)',
            color: 'var(--text-h)',
            fontSize: '16px',
          }}
        >
          <option value="">{routesLoading ? 'Loading...' : 'Select resort'}</option>
          {filteredResorts.map((r) => (
            <option key={r.id} value={r.to_resort}>
              {r.to_name}
            </option>
          ))}
        </select>
        {errors.resort && (
          <span role="alert" style={{ color: '#ef4444', fontSize: '13px' }}>
            Please select a resort
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="date" style={{ fontWeight: 500, color: 'var(--text-h)' }}>
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          min={today}
          onChange={(e) => {
            setDate(e.target.value)
            touch('date')
          }}
          onBlur={() => touch('date')}
          style={{
            padding: '8px 10px',
            borderRadius: '6px',
            border: `1px solid ${errors.date ? '#ef4444' : 'var(--border)'}`,
            background: 'var(--code-bg)',
            color: 'var(--text-h)',
            fontSize: '16px',
          }}
        />
        {errors.date && (
          <span role="alert" style={{ color: '#ef4444', fontSize: '13px' }}>
            Please select a valid date (today or later)
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="passengers" style={{ fontWeight: 500, color: 'var(--text-h)' }}>
          Passengers
        </label>
        <input
          id="passengers"
          type="number"
          min={1}
          max={8}
          value={passengers}
          onChange={(e) => {
            setPassengers(e.target.value)
            touch('passengers')
          }}
          onBlur={() => touch('passengers')}
          style={{
            padding: '8px 10px',
            borderRadius: '6px',
            border: `1px solid ${errors.passengers ? '#ef4444' : 'var(--border)'}`,
            background: 'var(--code-bg)',
            color: 'var(--text-h)',
            fontSize: '16px',
          }}
        />
        {errors.passengers && (
          <span role="alert" style={{ color: '#ef4444', fontSize: '13px' }}>
            Enter a number between 1 and 8
          </span>
        )}
      </div>

      {apiError && (
        <p
          role="alert"
          style={{
            color: '#ef4444',
            fontSize: '14px',
            margin: 0,
            padding: '8px 12px',
            background: 'rgba(239,68,68,0.08)',
            borderRadius: '6px',
            border: '1px solid rgba(239,68,68,0.3)',
          }}
        >
          {apiError}
        </p>
      )}

      <button
        type="submit"
        disabled={!allValid || submitting}
        style={{
          padding: '10px 24px',
          borderRadius: '6px',
          border: 'none',
          background: !allValid || submitting ? 'var(--accent-bg)' : 'var(--accent)',
          color: !allValid || submitting ? 'var(--accent)' : '#fff',
          fontSize: '16px',
          fontWeight: 500,
          cursor: !allValid || submitting ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.2s',
        }}
      >
        {submitting ? 'Calculating...' : 'Calculate'}
      </button>
    </form>
  )
}

export default SearchForm
