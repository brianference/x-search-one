export const DOCS = {
  "tools": [
    {
      "name": "x_search",
      "desc": "Keyword / advanced search over recent X posts"
    },
    {
      "name": "x_user_lookup",
      "desc": "Resolve user profiles by handle"
    },
    {
      "name": "x_thread",
      "desc": "Fetch a post with reply context"
    }
  ],
  "install": [
    "pip install -e .  # from x-search-mcp-server",
    "export X_BEARER_TOKEN=...",
    "python -m x_search_mcp"
  ]
} as const
