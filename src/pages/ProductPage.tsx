import type { SiteConfig } from '../config/site'
import { Shell } from '../components/Shell'
import { InstallSection } from '../features/docs/InstallSection'
import { ConfigSection } from '../features/docs/ConfigSection'
import { ToolsSection } from '../features/docs/ToolsSection'
import { SecuritySection } from '../features/docs/SecuritySection'
import { PlaygroundSection } from '../features/docs/PlaygroundSection'

export type ProductPageProps = { config: SiteConfig }

/** Docs workspace composed from features/docs modules. */
export function ProductPage({ config }: ProductPageProps) {
  return (
    <Shell config={config}>
      <section className="panel">
        <h1>Install · Tools · Secure</h1>
        <p className="lede">Three-rail mental model for agent tooling. Demo playground uses sample data only.</p>
        <InstallSection />
        <ConfigSection />
        <ToolsSection />
        <SecuritySection />
        <PlaygroundSection />
      </section>
    </Shell>
  )
}
