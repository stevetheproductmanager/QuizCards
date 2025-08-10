import React, { useMemo, useState } from 'react'
import { Container, Paper, Button, Stack } from '@mui/material'
import QuizProvider, { useQuiz } from '../components/quiz/QuizProvider.jsx'
import AppHeader from '../components/layout/AppHeader.jsx'
import AppTabs from '../components/layout/AppTabs.jsx'
import QuizView from '../components/quiz/QuizView.jsx'
import CardList from '../components/manager/CardList.jsx'
import EditCardDialog from '../components/manager/EditCardDialog.jsx'
import ConfirmDeleteDialog from '../components/manager/ConfirmDeleteDialog.jsx'
import { generateId, normalizeCards } from '../data/cards.js'

function CardManager() {
  const { state, dispatch } = useQuiz()
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const rows = useMemo(()=> state.allCards, [state.allCards])

  function openAdd() { setEditing({}) }
  function openEdit(row) { setEditing(row) }
  function save(card) {
    if (card.id) {
      dispatch({ type:'UPDATE_CARD', card })
    } else {
      dispatch({ type:'ADD_CARD', card: { ...card, id: generateId(), createdAt: Date.now(), updatedAt: Date.now() } })
    }
    setEditing(null)
  }

  function onDelete(row) { setConfirm(row) }
  function confirmDelete(id) {
    dispatch({ type:'DELETE_CARD', id })
    setConfirm(null)
  }

  function exportJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.allCards, null, 2))
    const a = document.createElement('a')
    a.href = dataStr
    a.download = 'quiz-cards.json'
    a.click()
  }

  function importJson(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '[]'))
        const normalized = normalizeCards(parsed)
        normalized.forEach(c => {
          dispatch({ type:'ADD_CARD', card: c })
        })
      } catch {}
    }
    reader.readAsText(file)
  }

  return (
    <Container maxWidth="lg" sx={{ py:3 }}>
      <Paper sx={{ p:2 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button variant="contained" onClick={openAdd}>Add Card</Button>
          <Button variant="outlined" onClick={exportJson}>Export JSON</Button>
          <Button variant="outlined" component="label">
            Import JSON
            <input hidden type="file" accept="application/json" onChange={importJson} />
          </Button>
        </Stack>
        <CardList rows={rows} onEdit={openEdit} onDelete={onDelete} />
      </Paper>
      <EditCardDialog open={!!editing} initial={editing} onCancel={()=>setEditing(null)} onSave={save} />
      <ConfirmDeleteDialog open={!!confirm} item={confirm} onCancel={()=>setConfirm(null)} onConfirm={confirmDelete} />
    </Container>
  )
}

export default function QuizCardsPage({ initialCards }) {
  const [tab, setTab] = useState(0)
  const tabs = [{ label: 'Quiz Cards' }, { label: 'Questions & Answers' }]

  return (
    <QuizProvider initialCards={initialCards}>
      <AppHeader tabs={tabs} value={tab} onChange={(e, v)=>setTab(v)} />
      {tab === 0 ? <QuizView /> : <CardManager />}
    </QuizProvider>
  )
}
