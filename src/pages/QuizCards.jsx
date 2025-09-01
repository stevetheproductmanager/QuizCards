import React, { useMemo, useState } from 'react'
import {
  Container,
  Paper,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
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

  // NEW: overwrite + delete-all dialog
  const [overwriteExisting, setOverwriteExisting] = useState(false)
  const [confirmDeleteAllOpen, setConfirmDeleteAllOpen] = useState(false)

  const rows = useMemo(() => state.allCards, [state.allCards])

  function openAdd() { setEditing({}) }
  function openEdit(row) { setEditing(row) }
  function save(card) {
    if (card.id) {
      dispatch({ type: 'UPDATE_CARD', card })
    } else {
      dispatch({
        type: 'ADD_CARD',
        card: { ...card, id: generateId(), createdAt: Date.now(), updatedAt: Date.now() }
      })
    }
    setEditing(null)
  }

  function onDelete(row) { setConfirm(row) }
  function confirmDelete(id) {
    dispatch({ type: 'DELETE_CARD', id })
    setConfirm(null)
  }

  function exportJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.allCards, null, 2))
    const a = document.createElement('a')
    a.href = dataStr
    a.download = 'quiz-cards.json'
    a.click()
  }

  // UPDATED: import honors overwrite checkbox via IMPORT_CARDS
  function importJson(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '[]'))
        const normalized = normalizeCards(parsed)
        dispatch({
          type: 'IMPORT_CARDS',
          payload: { cards: normalized, overwrite: overwriteExisting }
        })
      } catch {
        // silently ignore parse errors to match previous behavior,
        // or you can add a snackbar/toast here.
      } finally {
        // allow selecting same file again later
        e.target.value = ''
      }
    }
    reader.readAsText(file)
  }

  // NEW: delete all
  function openDeleteAll() { setConfirmDeleteAllOpen(true) }
  function closeDeleteAll() { setConfirmDeleteAllOpen(false) }
  function doDeleteAll() {
    dispatch({ type: 'DELETE_ALL' })
    setConfirmDeleteAllOpen(false)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }} alignItems="center" flexWrap="wrap">
          <Button variant="contained" onClick={openAdd}>Add Card</Button>
          <Button variant="outlined" onClick={exportJson}>Export JSON</Button>

          <Button variant="outlined" component="label">
            Import JSON
            <input hidden type="file" accept="application/json" onChange={importJson} />
          </Button>

          {/* Overwrite checkbox inline with admin actions */}
          <FormControlLabel
            sx={{ ml: 1 }}
            control={
              <Checkbox
                checked={overwriteExisting}
                onChange={(e) => setOverwriteExisting(e.target.checked)}
              />
            }
            label="Overwrite existing on import"
          />

          {/* Delete All (with confirm) */}
          <Button variant="outlined" color="error" onClick={openDeleteAll}>
            Delete All
          </Button>
        </Stack>

        <CardList rows={rows} onEdit={openEdit} onDelete={onDelete} />
      </Paper>

      <EditCardDialog
        open={!!editing}
        initial={editing}
        onCancel={() => setEditing(null)}
        onSave={save}
      />

      <ConfirmDeleteDialog
        open={!!confirm}
        item={confirm}
        onCancel={() => setConfirm(null)}
        onConfirm={confirmDelete}
      />

      {/* Confirm Delete All dialog */}
      <Dialog open={confirmDeleteAllOpen} onClose={closeDeleteAll}>
        <DialogTitle>Delete All Cards</DialogTitle>
        <DialogContent>
          This will permanently remove all cards. This action cannot be undone. Continue?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteAll}>Cancel</Button>
          <Button onClick={doDeleteAll} color="error" variant="contained">Delete All</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default function QuizCardsPage({ initialCards }) {
  const [tab, setTab] = useState(0)
  const tabs = [{ label: 'Quiz Cards' }, { label: 'Questions & Answers' }]

  return (
    <QuizProvider initialCards={initialCards}>
      <AppHeader tabs={tabs} value={tab} onChange={(e, v) => setTab(v)} />
      {tab === 0 ? <QuizView /> : <CardManager />}
    </QuizProvider>
  )
}
