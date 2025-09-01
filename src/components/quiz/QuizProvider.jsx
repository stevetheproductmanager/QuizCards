import React, { createContext, useContext, useMemo, useReducer, useEffect } from 'react'
import {
  loadCardsFromLocalStorage,
  saveCardsToLocalStorage,
  STARTER_CARDS,
  normalizeCards
} from '../../data/cards'

const QuizStateCtx = createContext(null)
const QuizDispatchCtx = createContext(null)

const initialState = {
  allCards: [],
  category: 'All',
  mode: 'qa', // 'qa' or 'answerOnly'
  currentIndex: 0,
  showAnswer: false,
  correct: 0,
  incorrect: 0
}

function clampIndex(len, idx) {
  if (len === 0) return 0
  return Math.max(0, Math.min(idx, len - 1))
}

function getFiltered(state) {
  const { allCards, category } = state
  return category === 'All' ? allCards : allCards.filter(c => c.category === category)
}

function mergeDedup(existing, incoming) {
  // Merge by id; keep existing on conflict (non-overwrite mode)
  const map = new Map(existing.map(c => [c.id, c]))
  for (const c of incoming) {
    if (!map.has(c.id)) map.set(c.id, c)
  }
  return Array.from(map.values())
}

function reduce(state, action) {
  switch (action.type) {
    case 'INIT': {
      const allCards = action.payload && action.payload.length
        ? normalizeCards(action.payload)
        : STARTER_CARDS
      return {
        ...state,
        allCards,
        currentIndex: 0,
        showAnswer: state.mode === 'answerOnly'
      }
    }

    case 'SET_CATEGORY': {
      return {
        ...state,
        category: action.category,
        currentIndex: 0,
        showAnswer: state.mode === 'answerOnly'
      }
    }

    case 'SET_MODE': {
      const mode = action.mode
      return { ...state, mode, showAnswer: mode === 'answerOnly' }
    }

    case 'FLIP':
      return { ...state, showAnswer: !state.showAnswer }

    case 'NEXT':
      return {
        ...state,
        currentIndex: clampIndex(getFiltered(state).length, state.currentIndex + 1),
        showAnswer: state.mode === 'answerOnly'
      }

    case 'PREV':
      return {
        ...state,
        currentIndex: clampIndex(getFiltered(state).length, state.currentIndex - 1),
        showAnswer: state.mode === 'answerOnly'
      }

    case 'RANDOM': {
      const len = getFiltered(state).length
      if (!len) return state
      const rand = Math.floor(Math.random() * len)
      return { ...state, currentIndex: rand, showAnswer: state.mode === 'answerOnly' }
    }

    case 'MARK_CORRECT':
      return { ...state, correct: state.correct + 1, showAnswer: state.mode === 'answerOnly' }

    case 'MARK_INCORRECT':
      return { ...state, incorrect: state.incorrect + 1, showAnswer: state.mode === 'answerOnly' }

    case 'RESET_SCORE':
      return { ...state, correct: 0, incorrect: 0 }

    case 'ADD_CARD': {
      const allCards = [...state.allCards, action.card]
      saveCardsToLocalStorage(allCards)
      return { ...state, allCards }
    }

    case 'UPDATE_CARD': {
      const allCards = state.allCards.map(c =>
        c.id === action.card.id ? { ...action.card, updatedAt: Date.now() } : c
      )
      saveCardsToLocalStorage(allCards)
      return { ...state, allCards }
    }

    case 'DELETE_CARD': {
      const allCards = state.allCards.filter(c => c.id !== action.id)
      saveCardsToLocalStorage(allCards)
      const filteredLen = getFiltered({ ...state, allCards }).length
      const nextIndex = clampIndex(filteredLen, state.currentIndex)
      return { ...state, allCards, currentIndex: nextIndex }
    }

    // ---------- NEW: IMPORT & DELETE ALL ----------
    case 'IMPORT_CARDS': {
      const { cards: incomingRaw, overwrite } = action.payload || {}
      const incoming = normalizeCards(Array.isArray(incomingRaw) ? incomingRaw : [])

      const allCards = overwrite
        ? incoming
        : mergeDedup(state.allCards, incoming)

      saveCardsToLocalStorage(allCards)

      // On overwrite we reset scores; on merge we keep them.
      const resetScores = overwrite
        ? { correct: 0, incorrect: 0 }
        : { correct: state.correct, incorrect: state.incorrect }

      // Reset index and showAnswer per mode after import
      return {
        ...state,
        ...resetScores,
        allCards,
        currentIndex: 0,
        showAnswer: state.mode === 'answerOnly'
      }
    }

    case 'DELETE_ALL': {
      const allCards = []
      saveCardsToLocalStorage(allCards)
      return {
        ...state,
        allCards,
        currentIndex: 0,
        correct: 0,
        incorrect: 0,
        showAnswer: state.mode === 'answerOnly'
      }
    }

    default:
      return state
  }
}

export function useQuiz() {
  const state = useContext(QuizStateCtx)
  const dispatch = useContext(QuizDispatchCtx)
  if (!state || !dispatch) throw new Error('useQuiz must be used inside <QuizProvider>')
  const cards = useMemo(() => getFiltered(state), [state.allCards, state.category])
  const current = cards[state.currentIndex] || null
  return { state, dispatch, cards, current }
}

export default function QuizProvider({ children, initialCards }) {
  const [state, dispatch] = useReducer(reduce, initialState)

  useEffect(() => {
    const fromLS = loadCardsFromLocalStorage()
    dispatch({ type: 'INIT', payload: fromLS.length ? fromLS : initialCards })
  }, [initialCards])

  return (
    <QuizStateCtx.Provider value={state}>
      <QuizDispatchCtx.Provider value={dispatch}>
        {children}
      </QuizDispatchCtx.Provider>
    </QuizStateCtx.Provider>
  )
}
