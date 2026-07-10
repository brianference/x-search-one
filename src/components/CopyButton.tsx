import { useState } from 'react'

export type CopyButtonProps = { text: string }

/** One-click clipboard helper for install/config snippets. */
export function CopyButton({ text }: CopyButtonProps) {
  const [ok, setOk] = useState(false)
  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setOk(true)
          setTimeout(() => setOk(false), 1500)
        } catch {
          /* ignore */
        }
      }}
    >
      {ok ? 'Copied' : 'Copy'}
    </button>
  )
}
