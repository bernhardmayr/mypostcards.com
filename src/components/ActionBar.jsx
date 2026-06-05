import { useState } from 'react'
import { openInChatGPT, copyPrompt } from '../lib/chatgpt.js'

export default function ActionBar({ prompt, hasPhoto }) {
  const [status, setStatus] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  function handleOpen() {
    const { ok, tooLong } = openInChatGPT(prompt)
    if (!ok) {
      setStatus('Popup blockiert – bitte erlaube Popups oder nutze „Prompt kopieren".')
    } else if (tooLong) {
      setStatus('ChatGPT wurde geöffnet. Falls der Prompt abgeschnitten ist, nutze „Prompt kopieren".')
    } else {
      setStatus('ChatGPT wurde in einem neuen Tab geöffnet.')
    }
  }

  async function handleCopy() {
    const ok = await copyPrompt(prompt)
    setStatus(ok ? 'Prompt in die Zwischenablage kopiert.' : 'Kopieren nicht möglich – Prompt unten manuell markieren.')
    if (!ok) setShowPrompt(true)
  }

  return (
    <div className="actions">
      {hasPhoto && (
        <p className="actions__hint">
          👉 Häng dein Foto im ChatGPT-Chat selbst an, bevor du den Prompt absendest.
        </p>
      )}

      <div className="actions__buttons">
        <button type="button" className="btn btn--primary" onClick={handleOpen}>
          In ChatGPT öffnen
        </button>
        <button type="button" className="btn" onClick={handleCopy}>
          Prompt kopieren
        </button>
        <button
          type="button"
          className="link-btn"
          onClick={() => setShowPrompt((v) => !v)}
        >
          {showPrompt ? 'Prompt ausblenden' : 'Prompt anzeigen'}
        </button>
      </div>

      {status && <p className="actions__status" role="status">{status}</p>}

      {showPrompt && (
        <textarea className="actions__prompt" readOnly rows={12} value={prompt} />
      )}
    </div>
  )
}
