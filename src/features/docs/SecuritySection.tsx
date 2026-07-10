export function SecuritySection() {
  return (
    <>
      <h2>Secure</h2>
      <div className="card">
        <ul className="check-list">
          <li>X bearer stays in server / MCP process env — never in client JS</li>
          <li>Rate-limit public demos per IP</li>
          <li>Least privilege: search tools only, no account mutation</li>
        </ul>
      </div>
    </>
  )
}
