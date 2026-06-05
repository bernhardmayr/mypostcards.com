// Übergabe eines Prompts an den persönlichen ChatGPT-Account des Nutzers
// per Deep-Link. ChatGPT öffnet sich mit vorausgefülltem Eingabefeld.

const CHATGPT_BASE = 'https://chatgpt.com/'

// Konservative Obergrenze für URL-Längen über alle Browser hinweg.
export const URL_LIMIT = 2000

/**
 * Baut die ChatGPT-Deep-Link-URL für einen Prompt.
 * @param {string} prompt
 * @returns {string}
 */
export function buildChatGptUrl(prompt) {
  return `${CHATGPT_BASE}?q=${encodeURIComponent(prompt)}`
}

/**
 * Öffnet ChatGPT in einem neuen Tab mit dem vorausgefüllten Prompt.
 * @param {string} prompt
 * @returns {{ ok: boolean, tooLong: boolean }} ok=false, wenn der Tab
 *   geblockt wurde; tooLong=true, wenn die URL evtl. zu lang ist.
 */
export function openInChatGPT(prompt) {
  const url = buildChatGptUrl(prompt)
  const tooLong = url.length > URL_LIMIT
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  return { ok: Boolean(win), tooLong }
}

/**
 * Kopiert den Prompt in die Zwischenablage (Fallback bei langen URLs
 * oder wenn der Nutzer den Prompt manuell einfügen möchte).
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
