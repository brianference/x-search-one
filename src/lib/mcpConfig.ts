/** Generate Claude Desktop MCP JSON (token placeholder only). */
export function buildClaudeDesktopConfig(): string {
  return JSON.stringify(
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
}
