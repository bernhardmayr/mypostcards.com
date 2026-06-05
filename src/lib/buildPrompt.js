// Baut aus den Formulardaten einen fertigen deutschen Prompt für ChatGPT,
// der eine Postkarte mit Vorder- UND Rückseite beschreibt und ein
// individuelles, angehängtes Foto berücksichtigt.
//
// Reine Funktion ohne Seiteneffekte – dadurch leicht testbar und in der
// Live-Vorschau wiederverwendbar.

const FALLBACK = {
  anlass: 'Gruß',
  motiv: 'eine stimmungsvolle Szene passend zum Anlass',
  stil: 'fotorealistisch',
}

/**
 * @param {object} data Formulardaten
 * @returns {string} fertiger Prompt
 */
export function buildPrompt(data = {}) {
  const {
    anlass,
    motiv,
    stil,
    frontText,
    nachricht,
    empfaenger,
    absender,
    datum,
    hasPhoto,
  } = data

  const fotoZeile = hasPhoto
    ? '- Integriere das von mir angehängte Foto harmonisch als zentrales Motiv der Vorderseite.'
    : '- Gestalte das Motiv frei nach der obigen Beschreibung.'

  const front = [
    'VORDERSEITE',
    `- Anlass: ${anlass || FALLBACK.anlass}`,
    `- Motiv: ${motiv || FALLBACK.motiv}`,
    `- Stil: ${stil || FALLBACK.stil}`,
    frontText ? `- Text auf der Karte: "${frontText}"` : null,
    fotoZeile,
  ]
    .filter(Boolean)
    .join('\n')

  const back = [
    'RÜCKSEITE',
    '- Klassisches Postkarten-Layout: vertikale Trennlinie in der Mitte, links Platz für die Nachricht, rechts ein Adressfeld mit Linien, oben rechts eine gestaltete Briefmarke und ein Poststempel.',
    nachricht ? `- Nachricht (links): "${nachricht}"` : '- Nachricht (links): kurzer, herzlicher Gruß passend zum Anlass.',
    absender ? `- Absender: ${absender}` : null,
    empfaenger ? `- Empfänger (rechts ins Adressfeld): ${empfaenger}` : null,
    datum ? `- Datum: ${datum}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  return [
    'Du bist ein erfahrener Grafikdesigner für Postkarten. Erstelle eine digitale Postkarte mit Vorder- und Rückseite als ZWEI separate Bilder im Querformat (Seitenverhältnis 3:2).',
    '',
    front,
    '',
    back,
    '',
    'Gib beide Seiten als zwei hochauflösende Bilder aus.',
  ].join('\n')
}
