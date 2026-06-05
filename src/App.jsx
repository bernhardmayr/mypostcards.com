import { useEffect, useMemo, useState } from 'react'
import PostcardForm from './components/PostcardForm.jsx'
import PostcardPreview from './components/PostcardPreview.jsx'
import ActionBar from './components/ActionBar.jsx'
import { buildPrompt } from './lib/buildPrompt.js'

const today = new Date().toISOString().slice(0, 10)

const INITIAL = {
  anlass: 'Urlaubsgruß',
  motiv: '',
  stil: 'Fotorealistisch',
  frontText: '',
  nachricht: '',
  empfaenger: '',
  absender: '',
  datum: today,
  photoUrl: '', // Object-URL der lokalen Vorschau
}

export default function App() {
  const [data, setData] = useState(INITIAL)

  // Foto-Object-URL beim Aufräumen freigeben, um Memory-Leaks zu vermeiden.
  useEffect(() => {
    return () => {
      if (data.photoUrl) URL.revokeObjectURL(data.photoUrl)
    }
  }, [data.photoUrl])

  const prompt = useMemo(
    () => buildPrompt({ ...data, hasPhoto: Boolean(data.photoUrl) }),
    [data],
  )

  function update(patch) {
    setData((prev) => ({ ...prev, ...patch }))
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>📮 Digitale Postkarte</h1>
        <p>
          Gestalte Vorder- und Rückseite, dann übergeben wir alles als fertigen
          Prompt an deinen eigenen ChatGPT-Account – ChatGPT erstellt daraus die
          Postkarte.
        </p>
      </header>

      <main className="layout">
        <section className="col col--form" aria-label="Postkarte gestalten">
          <PostcardForm data={data} update={update} />
        </section>

        <section className="col col--preview" aria-label="Vorschau und Aktionen">
          <PostcardPreview data={data} />
          <ActionBar prompt={prompt} hasPhoto={Boolean(data.photoUrl)} />
        </section>
      </main>

      <footer className="footer">
        <p>
          Hinweis: Die Übergabe erfolgt über einen Link zu chatgpt.com. Dein
          hochgeladenes Foto bleibt lokal in deinem Browser – häng es im
          ChatGPT-Chat selbst an.
        </p>
      </footer>
    </div>
  )
}
