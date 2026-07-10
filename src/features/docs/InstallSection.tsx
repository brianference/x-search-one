import { DOCS } from '../../data/docs'
import { CopyButton } from '../../components/CopyButton'

export function InstallSection() {
  return (
    <>
      <h2>Install</h2>
      {DOCS.install.map((line) => (
        <div key={line} className="copy-row" style={{ marginBottom: 8 }}>
          <pre className="code-block">{line}</pre>
          <CopyButton text={line} />
        </div>
      ))}
    </>
  )
}
