# 📮 Digitale Postkarte mit ChatGPT, Gemini & Claude

Eine Webseite, auf der man über ein Formular eine digitale Postkarte gestaltet.
Aus den Eingaben wird ein fertiger Prompt gebaut, den man **an das KI-Modell
seiner Wahl** übergeben kann – **ChatGPT**, **Gemini** oder **Claude** erstellen
daraus die Postkarte mit **Vorder- und Rückseite**.

Die Deep-Link-Integrationen der Modelle stammen aus der **PromptLib** und werden
hier für den Postkarten-Anwendungsfall wiederverwendet.

## Modelle

| Modell  | Deep-Link                   | Bilder                                   |
| ------- | --------------------------- | ---------------------------------------- |
| ChatGPT | `chatgpt.com/?q=…`          | ✅ erzeugt die Postkartenbilder direkt   |
| Gemini  | `gemini.google.com/app?q=…` | ✅ erzeugt die Postkartenbilder direkt   |
| Claude  | `claude.ai/new?q=…`         | ✍️ verfeinert Idee & Text (keine Bilder) |

## Funktionsweise

1. Vorder- und Rückseite im Formular ausfüllen (Anlass, Motiv, Stil, Grußtext,
   Empfänger/Absender, Datum).
2. Optional ein **eigenes Foto** hochladen – es erscheint in der Live-Vorschau.
3. Unter **„Postkarte erstellen mit:"** das gewünschte Modell wählen – es öffnet
   sich in einem neuen Tab mit vorausgefülltem Prompt (zusätzlich wird der Prompt
   in die Zwischenablage kopiert). Alternativ **„Prompt kopieren"**.
4. Im Chat des Modells das hochgeladene **Foto anhängen** und absenden.

> Hinweis: Deep-Links können keine Bilddateien übertragen. Das Foto bleibt lokal
> im Browser und wird manuell im Chat angehängt – darauf weist die Oberfläche
> hin.

## Tech-Stack

- React + Vite (statisches Build, deploybar z. B. auf GitHub Pages)
- Keine API-Keys, keine Kosten – nutzt den persönlichen Account beim jeweiligen Modell

## Entwicklung

```bash
npm install
npm run dev      # Entwicklungsserver
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal prüfen
```

## Projektstruktur

```
src/
  App.jsx                     zentraler Formular-State
  components/
    PostcardForm.jsx          Formularfelder + Foto-Upload
    PostcardPreview.jsx       Live-Vorschau Vorder-/Rückseite
    ActionBar.jsx             Modell-Buttons (ChatGPT/Gemini/Claude) + "Prompt kopieren"
  lib/
    buildPrompt.js            Formulardaten -> Prompt (Vorder- + Rückseite)
    models.js                 Modelle + Deep-Link-Aufbau & Clipboard-Fallback
  styles.css
```
