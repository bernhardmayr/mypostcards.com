import { useState } from 'react'
import { MODELS, openInModel, copyPrompt } from '../lib/models.js'

export default function ActionBar({ prompt, hasPhoto }) {
  const [status, setStatus] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  function handleOpen(model) {
    // Prompt zusätzlich kopieren – falls die URL zu lang ist, kann der Nutzer
    // ihn im Modell einfach einfügen.
    copyPrompt(prompt)
    const { ok, tooLong } = openInModel(model.id, prompt)
    if (!ok) {
      setStatus(`Popup blockiert – bitte erlaube Popups oder nutze „Prompt kopieren". Der Prompt ist bereits in der Zwischenablage.`)
    } else if (tooLong) {
      setStatus(`${model.name} wurde geöffnet. Falls der Prompt abgeschnitten ist, füge ihn aus der Zwischenablage ein.`)
    } else {
      setStatus(`${model.name} wurde in einem neuen Tab geöffnet – der Prompt wurde ebenfalls kopiert.`)
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
          👉 Häng dein Foto im Chat des gewählten Modells selbst an, bevor du den Prompt absendest.
        </p>
      )}

      <p className="actions__label">Postkarte erstellen mit:</p>
      <div className="actions__models">
        {MODELS.map((model) => (
          <button
            key={model.id}
            type="button"
            className="btn-model"
            style={{ '--model-color': model.color }}
            onClick={() => handleOpen(model)}
            title={model.hinweis}
          >
            <span className="btn-model__name">{model.name}</span>
            {!model.bildfaehig && <span className="btn-model__tag">nur Text</span>}
          </button>
        ))}
      </div>

      <div className="actions__buttons">
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
