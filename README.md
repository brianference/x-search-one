# X Search One

Public product hub for the X Search MCP server: install, tools, security model, and an assistant that explains agent integrations.

**Live:** https://x-search-one.pages.dev

> Public, no-account portfolio product in the same family as [trip-one](https://trip-one.pages.dev): grounded AI chat, light/dark UI, Cloudflare Pages, secrets server-side.

## What it does

- **Tool catalog** â€” Documented MCP tools with inputs/outputs.
- **Security model** â€” Token handling, rate limits, least privilege.
- **Install paths** â€” pip, Docker, Railway â€” copy-paste ready.
- **Agent chat** â€” Ask how to wire search into an agent; answers cite the tool list.
- **HTTP bridge** â€” Call the same capabilities outside MCP clients.
- **Portfolio-grade docs** â€” Architecture diagram narrative recruiters skim in 60s.

## Integrations

- **Model Context Protocol** â€” Tools for Claude, Cursor, and custom agents
- **X API v2** â€” Bearer-authenticated search & user lookup
- **Railway / Docker** â€” Deploy the Python server anywhere
- **Supabase optional** â€” Cache or log query metadata

## Engineering signals (for recruiters)

- AI tooling: MCP server design for external data
- API engineering: auth, rate limits, structured tools
- Python packaging + deploy (Docker/Railway)
- Developer experience: docs site + examples

## Quick wins

- Interactive try-search playground with demo mode
- OpenAPI snippet generation
- Per-tool latency metrics panel
- Claude Desktop config generator

## Stack

- Vite + React 18 + TypeScript (strict)
- React Router
- Cloudflare Pages + Functions (`/api/chat`, `/api/health`)
- OpenAI `gpt-4o-mini` (optional; UI works without it)

## Develop

```bash
npm install
npm run dev
```

Copy `.env.example` to `.dev.vars` for Functions:

```
OPENAI_API_KEY=
AI_MODEL=gpt-4o-mini
```

## Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name x-search-one --branch main
```

Set `OPENAI_API_KEY` on the Pages project for live chat.

`git push` updates GitHub only â€” deploy is a separate step.

## Privacy

No accounts. Chat sends the on-page context + your message to `/api/chat` when AI is configured. No ads, no tracking pixels.

## License

MIT
