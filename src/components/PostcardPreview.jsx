import { useState } from 'react'

export default function PostcardPreview({ data }) {
  const [side, setSide] = useState('front')

  return (
    <div className="preview">
      <div className="preview__tabs" role="tablist" aria-label="Kartenseite">
        <button
          type="button"
          role="tab"
          aria-selected={side === 'front'}
          className={side === 'front' ? 'tab tab--active' : 'tab'}
          onClick={() => setSide('front')}
        >
          Vorderseite
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={side === 'back'}
          className={side === 'back' ? 'tab tab--active' : 'tab'}
          onClick={() => setSide('back')}
        >
          Rückseite
        </button>
      </div>

      {side === 'front' ? (
        <div className="card card--front">
          {data.photoUrl ? (
            <img className="card__photo" src={data.photoUrl} alt="Vorschau des Motivs" />
          ) : (
            <div className="card__placeholder">
              <span>{data.motiv || 'Motiv-Vorschau'}</span>
              <small>{data.stil}</small>
            </div>
          )}
          {data.frontText && <div className="card__front-text">{data.frontText}</div>}
        </div>
      ) : (
        <div className="card card--back">
          <div className="card__message">
            {data.nachricht || 'Dein Grußtext erscheint hier …'}
            {data.absender && <div className="card__sender">— {data.absender}</div>}
          </div>
          <div className="card__divider" aria-hidden="true" />
          <div className="card__address">
            <div className="card__stamp">
              <span>📮</span>
            </div>
            <div className="card__address-lines">
              {data.empfaenger ? (
                data.empfaenger
              ) : (
                <span className="muted">Empfängeradresse</span>
              )}
            </div>
            {data.datum && <div className="card__date">{data.datum}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
