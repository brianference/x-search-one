import { DOCS } from './data'
export function seedContext(): string {
  return JSON.stringify(DOCS, null, 0)
}
