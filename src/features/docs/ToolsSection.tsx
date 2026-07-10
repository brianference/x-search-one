import { useState } from 'react'
import { DOCS } from '../../data/docs'
import { TOOL_SCHEMA } from '../../data/schemas'

export function ToolsSection() {
  const [openTool, setOpenTool] = useState<string | null>(null)
  return (
    <>
      <h2>Tools</h2>
      <div className="grid-2">
        {DOCS.tools.map((tool) => (
          <article key={tool.name} className="card">
            <h3>
              <code>{tool.name}</code>
            </h3>
            <p>{tool.desc}</p>
            <button type="button" className="btn btn-ghost" onClick={() => setOpenTool(openTool === tool.name ? null : tool.name)}>
              {openTool === tool.name ? 'Hide schema' : 'Show schema'}
            </button>
            {openTool === tool.name ? <div className="schema">{TOOL_SCHEMA[tool.name] || 'schema TBD'}</div> : null}
          </article>
        ))}
      </div>
    </>
  )
}
