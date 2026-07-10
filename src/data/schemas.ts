/** Per-tool schema blurbs for expand/collapse UI. */
export const TOOL_SCHEMA: Record<string, string> = {
  x_search: 'input: { query: string, max_results?: number }\noutput: { posts: Post[] }',
  x_user_lookup: 'input: { username: string }\noutput: { user: User }',
  x_thread: 'input: { post_id: string }\noutput: { root: Post, replies: Post[] }',
}

export const SAMPLE_RESULTS = [
  { q: 'cloudflare pages deploy', hits: ['Thread on wrangler pages deploy flags', 'Tip: --branch main for production', 'CSP gotchas with inline theme scripts'] },
  { q: 'mcp server tools', hits: ['How to register tools in Claude Desktop', 'Bearer tokens belong server-side', 'Rate limits per IP for public demos'] },
] as const
