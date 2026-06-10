import type { CalculateResponse } from '../types/api'

interface ResultsPageProps {
  result: CalculateResponse
  onBack: () => void
}

function ResultsPage({ result, onBack }: ResultsPageProps) {
  const formattedPrice = `${result.currency} ${result.price_chf.toFixed(2)}`

  return (
    <div
      style={{
        maxWidth: '420px',
        margin: '0 auto',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div
        style={{
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid var(--accent-border)',
          background: 'var(--accent-bg)',
        }}
      >
        <p style={{ margin: '0 0 4px', fontSize: '14px', color: 'var(--text)' }}>
          Estimated transfer price
        </p>
        <p
          style={{
            margin: '0 0 24px',
            fontSize: '36px',
            fontWeight: 600,
            color: 'var(--text-h)',
            letterSpacing: '-0.5px',
          }}
        >
          {formattedPrice}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr',
            gap: '10px 20px',
            fontSize: '15px',
          }}
        >
          <span style={{ color: 'var(--text)' }}>Route</span>
          <span style={{ color: 'var(--text-h)', fontWeight: 500 }}>
            {result.route_name}
          </span>

          <span style={{ color: 'var(--text)' }}>Distance</span>
          <span style={{ color: 'var(--text-h)' }}>{result.distance_km} km</span>

          <span style={{ color: 'var(--text)' }}>Passengers</span>
          <span style={{ color: 'var(--text-h)' }}>{result.passengers}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <a
          href="mailto:hello@ski-transfer.com?subject=Transfer%20Quote%20Request"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '12px 24px',
            borderRadius: '6px',
            border: 'none',
            background: 'var(--accent)',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Get a real quote
        </a>

        <button
          type="button"
          onClick={onBack}
          style={{
            padding: '10px 24px',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text)',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

export default ResultsPage
