# 📮 Digitale Postkarte mit ChatGPT

Eine Webseite, auf der man über ein Formular eine digitale Postkarte gestaltet.
Aus den Eingaben wird ein fertiger Prompt gebaut und **direkt an den eigenen
ChatGPT-Account** übergeben – ChatGPT (mit Bildgenerierung) erstellt daraus die
Postkarte mit **Vorder- und Rückseite**.

## Funktionsweise

1. Vorder- und Rückseite im Formular ausfüllen (Anlass, Motiv, Stil, Grußtext,
   Empfänger/Absender, Datum).
2. Optional ein **eigenes Foto** hochladen – es erscheint in der Live-Vorschau.
3. **„In ChatGPT öffnen"** öffnet `chatgpt.com` in einem neuen Tab mit
   vorausgefülltem Prompt. Alternativ **„Prompt kopieren"**.
4. Im ChatGPT-Chat das hochgeladene **Foto anhängen** und absenden.

> Hinweis: Deep-Links zu ChatGPT können keine Bilddateien übertragen. Das Foto
> bleibt lokal im Browser und wird manuell im Chat angehängt – darauf weist die
> Oberfläche hin.

## Tech-Stack

- React + Vite (statisches Build, deploybar z. B. auf GitHub Pages)
- Keine API-Keys, keine Kosten – nutzt den persönlichen ChatGPT-Account

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
    ActionBar.jsx             "In ChatGPT öffnen" / "Prompt kopieren"
  lib/
    buildPrompt.js            Formulardaten -> Prompt (Vorder- + Rückseite)
    chatgpt.js                Deep-Link-Aufbau & Clipboard-Fallback
  styles.css
```
