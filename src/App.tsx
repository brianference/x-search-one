import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import './styles.css'
import { initTheme, toggleTheme, getTheme } from './theme'
import { ChatDock } from './ChatDock'
import { seedContext } from './seedContext'
import { DOCS } from './data'

const FEATURES = [
  { t: 'Tool catalog', d: 'Documented MCP tools with inputs/outputs.' },
  { t: 'Config generator', d: 'Claude Desktop MCP JSON you can copy.' },
  { t: 'Security model', d: 'Token handling, rate limits, least privilege.' },
  { t: 'Install paths', d: 'pip / Docker-style copy blocks.' },
  { t: 'Demo playground', d: 'Sample search results without putting secrets in the browser.' },
  { t: 'Agent chat', d: 'Ask how to wire search into an agent.' },
]

const TOOL_SCHEMA: Record<string, string> = {
  x_search: 'input: { query: string, max_results?: number }\noutput: { posts: Post[] }',
  x_user_lookup: 'input: { username: string }\noutput: { user: User }',
  x_thread: 'input: { post_id: string }\noutput: { root: Post, replies: Post[] }',
}

const SAMPLE_RESULTS = [
  { q: 'cloudflare pages deploy', hits: ['Thread on wrangler pages deploy flags', 'Tip: --branch main for production', 'CSP gotchas with inline theme scripts'] },
  { q: 'mcp server tools', hits: ['How to register tools in Claude Desktop', 'Bearer tokens belong server-side', 'Rate limits per IP for public demos'] },
]

function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme())
  return (
    <button type="button" className="theme-toggle" aria-label="Toggle theme" onClick={() => setTheme(toggleTheme())}>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}

function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setOk(true)
          setTimeout(() => setOk(false), 1500)
        } catch {
          /* ignore */
        }
      }}
    >
      {ok ? 'Copied' : 'Copy'}
    </button>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)
  return (
    <div className={`shell${chatOpen ? ' shell--chat' : ''}`}>
      <header className="topbar">
        <Link to="/" className="brand">
          X Search One
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/app">Tools</NavLink>
          <NavLink to="/features">Features</NavLink>
        </nav>
        <ThemeToggle />
      </header>
      <main>{children}</main>
      <ChatDock open={chatOpen} onOpenChange={setChatOpen} context={seedContext()} product="x-search-one" />
      <footer className="footer">
        <p>
          MCP product face ·{' '}
          <a href="https://github.com/brianference/x-search-one" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
        <p className="fine">Bearer tokens never ship to the browser on this site.</p>
      </footer>
    </div>
  )
}

function Home() {
  return (
    <Shell>
      <section className="hero">
        <p className="kicker">X Search One · MCP for real-time X data</p>
        <h1>Production X/Twitter search for agents — MCP + HTTP.</h1>
        <p className="lede">Install, inspect tools, generate Claude Desktop config, and try a safe demo playground.</p>
        <div className="cta-row">
          <Link className="btn btn-primary" to="/app">
            Open tools
          </Link>
          <Link className="btn btn-ghost" to="/features">
            Features
          </Link>
        </div>
      </section>
      <section className="grid-3">
        {FEATURES.slice(0, 3).map((f) => (
          <article key={f.t} className="card">
            <h3>{f.t}</h3>
            <p>{f.d}</p>
          </article>
        ))}
      </section>
    </Shell>
  )
}

function FeaturesPage() {
  return (
    <Shell>
      <section className="panel">
        <h1>Features</h1>
        <div className="grid-2">
          {FEATURES.map((f) => (
            <article key={f.t} className="card">
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </article>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function ProductApp() {
  const [openTool, setOpenTool] = useState<string | null>(null)
  const [query, setQuery] = useState(SAMPLE_RESULTS[0].q)
  const [hits, setHits] = useState<string[] | null>(null)
  const mcpConfig = JSON.stringify(
    {
      mcpServers: {
        'x-search': {
          command: 'python',
          args: ['-m', 'x_search_mcp'],
          env: { X_BEARER_TOKEN: 'YOUR_TOKEN_SERVER_SIDE_ONLY' },
        },
      },
    },
    null,
    2,
  )

  function runDemo() {
    const found = SAMPLE_RESULTS.find((s) => s.q === query) || SAMPLE_RESULTS[0]
    setHits(found.hits)
  }

  return (
    <section className="panel">
      <h1>Install · Tools · Secure</h1>
      <p className="lede">Three-rail mental model for agent tooling. Demo playground uses sample data only.</p>

      <h2>Install</h2>
      {DOCS.install.map((line) => (
        <div key={line} className="copy-row" style={{ marginBottom: 8 }}>
          <pre className="code-block">{line}</pre>
          <CopyButton text={line} />
        </div>
      ))}

      <h2>Claude Desktop config</h2>
      <div className="copy-row">
        <pre className="code-block">{mcpConfig}</pre>
        <CopyButton text={mcpConfig} />
      </div>

      <h2>Tools</h2>
      <div className="grid-2">
        {DOCS.tools.map((t) => (
          <article key={t.name} className="card">
            <h3>
              <code>{t.name}</code>
            </h3>
            <p>{t.desc}</p>
            <button type="button" className="btn btn-ghost" onClick={() => setOpenTool(openTool === t.name ? null : t.name)}>
              {openTool === t.name ? 'Hide schema' : 'Show schema'}
            </button>
            {openTool === t.name && <div className="schema">{TOOL_SCHEMA[t.name] || 'schema TBD'}</div>}
          </article>
        ))}
      </div>

      <h2>Secure</h2>
      <div className="card">
        <ul className="check-list">
          <li>X bearer stays in server / MCP process env — never in client JS</li>
          <li>Rate-limit public demos per IP</li>
          <li>Least privilege: search tools only, no account mutation</li>
        </ul>
      </div>

      <h2>Demo playground</h2>
      <div className="filters">
        <select value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Sample query">
          {SAMPLE_RESULTS.map((s) => (
            <option key={s.q} value={s.q}>
              {s.q}
            </option>
          ))}
        </select>
        <button type="button" className="btn btn-primary" onClick={runDemo}>
          Run sample search
        </button>
      </div>
      {hits && (
        <ul className="check-list">
          {hits.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <p className="meta">Sample results only — wire live X API on the MCP server with a server-side token.</p>
    </section>
  )
}

function AppPage() {
  return (
    <Shell>
      <ProductApp />
    </Shell>
  )
}

export default function App() {
  useEffect(() => {
    initTheme()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/features" element={<FeaturesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
