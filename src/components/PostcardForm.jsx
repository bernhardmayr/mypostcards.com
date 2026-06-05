const ANLAESSE = [
  'Urlaubsgruß',
  'Geburtstag',
  'Weihnachten',
  'Neujahr',
  'Hochzeit',
  'Genesung',
  'Dankeschön',
  'Liebesgruß',
]

const STILE = [
  'Fotorealistisch',
  'Aquarell',
  'Vintage / Retro-Postkarte',
  'Cartoon / Comic',
  'Ölgemälde',
  'Minimalistisch / modern',
  'Schwarz-Weiß',
]

export default function PostcardForm({ data, update }) {
  function onPhotoChange(e) {
    const file = e.target.files?.[0]
    if (data.photoUrl) URL.revokeObjectURL(data.photoUrl)
    update({ photoUrl: file ? URL.createObjectURL(file) : '' })
  }

  function removePhoto() {
    if (data.photoUrl) URL.revokeObjectURL(data.photoUrl)
    update({ photoUrl: '' })
  }

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <fieldset className="form__group">
        <legend>Vorderseite</legend>

        <label className="field">
          <span>Anlass</span>
          <input
            list="anlass-liste"
            value={data.anlass}
            onChange={(e) => update({ anlass: e.target.value })}
            placeholder="z. B. Urlaubsgruß"
          />
          <datalist id="anlass-liste">
            {ANLAESSE.map((a) => (
              <option key={a} value={a} />
            ))}
          </datalist>
        </label>

        <label className="field">
          <span>Motiv / Bildbeschreibung</span>
          <textarea
            rows={3}
            value={data.motiv}
            onChange={(e) => update({ motiv: e.target.value })}
            placeholder="z. B. Sonnenuntergang am Strand von Sardinien mit Palmen"
          />
        </label>

        <label className="field">
          <span>Stil</span>
          <select
            value={data.stil}
            onChange={(e) => update({ stil: e.target.value })}
          >
            {STILE.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Text auf der Vorderseite (optional)</span>
          <input
            value={data.frontText}
            onChange={(e) => update({ frontText: e.target.value })}
            placeholder='z. B. "Grüße aus Italien"'
          />
        </label>

        <label className="field">
          <span>Eigenes Foto (optional)</span>
          <input type="file" accept="image/*" onChange={onPhotoChange} />
        </label>
        {data.photoUrl && (
          <button type="button" className="link-btn" onClick={removePhoto}>
            Foto entfernen
          </button>
        )}
      </fieldset>

      <fieldset className="form__group">
        <legend>Rückseite</legend>

        <label className="field">
          <span>Grußtext / Nachricht</span>
          <textarea
            rows={4}
            value={data.nachricht}
            onChange={(e) => update({ nachricht: e.target.value })}
            placeholder="Liebe Grüße aus dem Urlaub! Wir vermissen euch …"
          />
        </label>

        <label className="field">
          <span>Empfänger</span>
          <input
            value={data.empfaenger}
            onChange={(e) => update({ empfaenger: e.target.value })}
            placeholder="Familie Müller, Hauptstraße 1, 12345 Musterstadt"
          />
        </label>

        <label className="field">
          <span>Absender</span>
          <input
            value={data.absender}
            onChange={(e) => update({ absender: e.target.value })}
            placeholder="Anna & Tom"
          />
        </label>

        <label className="field">
          <span>Datum</span>
          <input
            type="date"
            value={data.datum}
            onChange={(e) => update({ datum: e.target.value })}
          />
        </label>
      </fieldset>
    </form>
  )
}
