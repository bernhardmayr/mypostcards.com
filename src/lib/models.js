// Verschiedene KI-Modelle, an die der fertige Postkarten-Prompt per Deep-Link
// übergeben werden kann. Jeder Eintrag öffnet das jeweilige Modell im Browser
// mit vorausgefülltem Eingabefeld.
//
// Die Deep-Link-URLs stammen aus der PromptLib (AI_PLATFORMS) und werden hier
// für den Postkarten-Anwendungsfall wiederverwendet.

// Konservative Obergrenze für URL-Längen über alle Browser hinweg.
export const URL_LIMIT = 2000

/**
 * Liste der unterstützten Modelle. `getUrl` baut den Deep-Link aus dem Prompt.
 * `bildfaehig` markiert Modelle, die Bilder selbst erzeugen können – nur diese
 * können die Postkarte direkt als Bild ausgeben.
 */
export const MODELS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    color: '#059669',
    bildfaehig: true,
    hinweis: 'Erstellt Vorder- und Rückseite direkt als Bilder (DALL·E / GPT-4o).',
    getUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    color: '#2563eb',
    bildfaehig: true,
    hinweis: 'Erzeugt die Postkartenbilder direkt in Google Gemini.',
    getUrl: (prompt) => `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`,
  },
]

/**
 * Findet ein Modell anhand seiner ID.
 * @param {string} id
 * @returns {object | undefined}
 */
export function getModel(id) {
  return MODELS.find((m) => m.id === id)
}

/**
 * Baut die Deep-Link-URL für ein Modell und einen Prompt.
 * @param {string} modelId
 * @param {string} prompt
 * @returns {string}
 */
export function buildModelUrl(modelId, prompt) {
  const model = getModel(modelId)
  if (!model) return ''
  return model.getUrl(prompt)
}

/**
 * Öffnet das gewählte Modell in einem neuen Tab mit vorausgefülltem Prompt.
 * @param {string} modelId
 * @param {string} prompt
 * @returns {{ ok: boolean, tooLong: boolean }} ok=false, wenn der Tab
 *   geblockt wurde; tooLong=true, wenn die URL evtl. zu lang ist.
 */
export function openInModel(modelId, prompt) {
  const url = buildModelUrl(modelId, prompt)
  const tooLong = url.length > URL_LIMIT
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  return { ok: Boolean(win), tooLong }
}

/**
 * Kopiert den Prompt in die Zwischenablage (Fallback bei langen URLs oder
 * wenn der Nutzer den Prompt manuell einfügen möchte).
 * @param {string} prompt
 * @returns {Promise<boolean>}
 */
export async function copyPrompt(prompt) {
  try {
    await navigator.clipboard.writeText(prompt)
    return true
  } catch {
    return false
  }
}
