import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import './styles.css'
import { initTheme, toggleTheme, getTheme } from './theme'
import { ChatDock } from './ChatDock'
import { seedContext } from './seedContext'
import { DOCS } from './data'

const FEATURES = [{"t": "Tool catalog", "d": "Documented MCP tools with inputs/outputs."}, {"t": "Security model", "d": "Token handling, rate limits, least privilege."}, {"t": "Install paths", "d": "pip, Docker, Railway \u2014 copy-paste ready."}, {"t": "Agent chat", "d": "Ask how to wire search into an agent; answers cite the tool list."}, {"t": "HTTP bridge", "d": "Call the same capabilities outside MCP clients."}, {"t": "Portfolio-grade docs", "d": "Architecture diagram narrative recruiters skim in 60s."}] as { t: string; d: string }[]
const INTEGRATIONS = [{"t": "Model Context Protocol", "d": "Tools for Claude, Cursor, and custom agents"}, {"t": "X API v2", "d": "Bearer-authenticated search & user lookup"}, {"t": "Railway / Docker", "d": "Deploy the Python server anywhere"}, {"t": "Supabase optional", "d": "Cache or log query metadata"}] as { t: string; d: string }[]
const RECRUITER = ["AI tooling: MCP server design for external data", "API engineering: auth, rate limits, structured tools", "Python packaging + deploy (Docker/Railway)", "Developer experience: docs site + examples"] as string[]
const QUICK = ["Interactive try-search playground with demo mode", "OpenAPI snippet generation", "Per-tool latency metrics panel", "Claude Desktop config generator"] as string[]

function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme())
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle light and dark mode"
      onClick={() => setTheme(toggleTheme())}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)
  return (
    <div className={`shell${chatOpen ? ' shell--chat' : ''}`}>
      <header className="topbar">
        <Link to="/" className="brand">X Search One</Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/app">App</NavLink>
          <NavLink to="/features">Features</NavLink>
        </nav>
        <ThemeToggle />
      </header>
      <main>{children}</main>
      <ChatDock open={chatOpen} onOpenChange={setChatOpen} context={seedContext()} product="x-search-one" />
      <footer className="footer">
        <p>
          X Search One · public portfolio product ·{' '}
          <a href="https://github.com/brianference/x-search-one" target="_blank" rel="noreferrer">GitHub</a>
        </p>
        <p className="fine">Built for real use and for hiring conversations — stack, constraints, and integrations included.</p>
      </footer>
    </div>
  )
}

function Home() {
  return (
    <Shell>
      <section className="hero">
        <p className="kicker">X Search One · MCP server for real-time X data</p>
        <h1>Production X/Twitter search for agents — MCP + HTTP.</h1>
        <p className="lede">Public product hub for the X Search MCP server: install, tools, security model, and an assistant that explains agent integrations.</p>
        <div className="cta-row">
          <Link className="btn btn-primary" to="/app">Open the app</Link>
          <Link className="btn btn-ghost" to="/features">See features</Link>
        </div>
        <ul className="hero-points">
          <li>Light & dark mode</li>
          <li>Grounded AI chat</li>
          <li>No account required</li>
          <li>Cloudflare Pages ready</li>
        </ul>
      </section>
      <section className="grid-3">
        {FEATURES.slice(0, 3).map((f) => (
          <article key={f.t} className="card">
            <h3>{f.t}</h3>
            <p>{f.d}</p>
          </article>
        ))}
      </section>
      <section className="panel">
        <h2>Integrations</h2>
        <div className="grid-2">
          {INTEGRATIONS.map((i) => (
            <div key={i.t} className="card card-slim">
              <h3>{i.t}</h3>
              <p>{i.d}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function FeaturesPage() {
  return (
    <Shell>
      <section className="panel">
        <h1>Features</h1>
        <p className="lede">Product depth first — the same signals recruiters and technical founders look for.</p>
        <div className="grid-2">
          {FEATURES.map((f) => (
            <article key={f.t} className="card">
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="panel subtle">
        <h2>Engineering signals</h2>
        <ul className="check-list">
          {RECRUITER.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>
      <section className="panel">
        <h2>Quick wins next</h2>
        <ul className="check-list">
          {QUICK.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </section>
    </Shell>
  )
}

function AppPage() {
  return (
    <Shell>
      <ProductApp />
    </Shell>
  )
}


function ProductApp() {
  return (
    <section className="panel">
      <h1>MCP tool catalog</h1>
      <p className="lede">Product hub for the Python MCP server. Source: <a href="https://github.com/brianference/x-search-mcp-server" target="_blank" rel="noreferrer">x-search-mcp-server</a></p>
      <div className="grid-2">
        {DOCS.tools.map((t) => (
          <article key={t.name} className="card">
            <h3><code>{t.name}</code></h3>
            <p>{t.desc}</p>
          </article>
        ))}
      </div>
      <h2>Install</h2>
      <pre className="code-block">{DOCS.install.join('\n')}</pre>
    </section>
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
