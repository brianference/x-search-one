import { useState } from 'react'
import { SAMPLE_RESULTS } from '../../data/schemas'

/** Sample-only search UI — no live tokens in the browser. */
export function PlaygroundSection() {
  const [query, setQuery] = useState<string>(SAMPLE_RESULTS[0].q)
  const [hits, setHits] = useState<readonly string[] | null>(null)

  return (
    <>
      <h2>Demo playground</h2>
      <div className="filters">
        <select value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Sample query">
          {SAMPLE_RESULTS.map((sample) => (
            <option key={sample.q} value={sample.q}>
              {sample.q}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const found = SAMPLE_RESULTS.find((sample) => sample.q === query) || SAMPLE_RESULTS[0]
            setHits(found.hits)
          }}
        >
          Run sample search
        </button>
      </div>
      {hits ? (
        <ul className="check-list">
          {hits.map((hit) => (
            <li key={hit}>{hit}</li>
          ))}
        </ul>
      ) : null}
      <p className="meta">Sample results only — wire live X API on the MCP server with a server-side token.</p>
    </>
  )
}
