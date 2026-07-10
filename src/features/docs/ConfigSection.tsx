import { CopyButton } from '../../components/CopyButton'
import { buildClaudeDesktopConfig } from '../../lib/mcpConfig'

export function ConfigSection() {
  const mcpConfig = buildClaudeDesktopConfig()
  return (
    <>
      <h2>Claude Desktop config</h2>
      <div className="copy-row">
        <pre className="code-block">{mcpConfig}</pre>
        <CopyButton text={mcpConfig} />
      </div>
    </>
  )
}
