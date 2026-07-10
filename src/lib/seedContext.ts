import { DOCS } from '../data/docs'

export function buildChatContext(): string {
  return JSON.stringify(DOCS, null, 0)
}
