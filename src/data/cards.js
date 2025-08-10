/** @returns {string} */
export function generateId() {
  // Simple, dependency-free unique ID
  return 'c_' + Math.random().toString(36).slice(2, 11) + Date.now().toString(36)
}

/** @param {any[]} raw */
export function normalizeCards(raw) {
  const now = Date.now()
  return (raw || []).map((c, i) => ({
    id: c.id || generateId(),
    category: c.category || 'Concept',
    question: String(c.question ?? ''),
    answer: String(c.answer ?? ''),
    createdAt: Number(c.createdAt || now),
    updatedAt: Number(c.updatedAt || now),
  }))
}

const LS_KEY = 'quiz_cards_all'

/** @returns {import('../types/card').Card[]} */
export function loadCardsFromLocalStorage() {
  try {
    const s = localStorage.getItem(LS_KEY)
    if (!s) return []
    const parsed = JSON.parse(s)
    return normalizeCards(parsed)
  } catch {
    return []
  }
}

/** @param {import('../types/card').Card[]} cards */
export function saveCardsToLocalStorage(cards) {
  localStorage.setItem(LS_KEY, JSON.stringify(cards))
}

/** Starter sample cards if LS is empty */
export const STARTER_CARDS = normalizeCards([
  { category: 'Concept', question: 'What is a closure?', answer: 'A function with preserved lexical scope.' },
  { category: 'Formula', question: 'Derivative of sin(x)?', answer: 'cos(x)' },
  { category: 'Concept', question: 'Explain event loop.', answer: 'Mechanism that handles the execution of multiple chunks of your program over time.' }
])
