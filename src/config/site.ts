import type { SiteConfig } from './types'
export type { SiteConfig, FeatureItem, NavItem } from './types'

export const siteConfig: SiteConfig = {
  productId: 'x-search-one',
  productName: 'X Search One',
  kicker: 'X Search One · MCP for real-time X data',
  tagline: 'Production X/Twitter search for agents — MCP + HTTP.',
  lede: 'Install, inspect tools, generate Claude Desktop config, and try a safe demo playground.',
  githubUrl: 'https://github.com/brianference/x-search-one',
  footerLine: 'MCP product face ·',
  stackStrip: 'Stack: TypeScript · React · Vite · Cloudflare Pages · MCP · GitHub',
  finePrint: 'Bearer tokens never ship to the browser on this site.',
  nav: [
    { to: '/', label: 'Home', end: true },
    { to: '/app', label: 'Tools' },
    { to: '/features', label: 'Features' },
  ],
  features: [
    { title: 'Tool catalog', description: 'Documented MCP tools with inputs/outputs.' },
    { title: 'Config generator', description: 'Claude Desktop MCP JSON you can copy.' },
    { title: 'Security model', description: 'Token handling, rate limits, least privilege.' },
    { title: 'Install paths', description: 'Copy-paste install blocks.' },
    { title: 'Demo playground', description: 'Sample search results without secrets in the browser.' },
    { title: 'Modular docs UI', description: 'Install, tools, secure, and playground are separate modules.' },
  ],
  heroPoints: ['MCP tools', 'Copy config', 'Secure tokens', 'Light & dark'],
  ctaPrimary: { to: '/app', label: 'Open tools' },
  ctaSecondary: { to: '/features', label: 'Features' },
}
