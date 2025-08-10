import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material'

const CATEGORIES = ['Concept', 'Formula']

export default function EditCardDialog({ open, initial, onCancel, onSave }) {
  const [form, setForm] = useState({ category:'Concept', question:'', answer:'' })

  useEffect(()=>{
    if (open) {
      setForm({
        category: initial?.category ?? 'Concept',
        question: initial?.question ?? '',
        answer: initial?.answer ?? ''
      })
    }
  }, [open, initial])

  function save() {
    onSave({ ...initial, ...form })
  }

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{initial?.id ? 'Edit Card' : 'Add Card'}</DialogTitle>
      <DialogContent sx={{ display:'grid', gap:2, mt:1 }}>
        <TextField
          select
          label="Category"
          value={form.category}
          onChange={(e)=>setForm(f=>({ ...f, category: e.target.value }))}
        >
          {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField
          label="Question"
          value={form.question}
          onChange={(e)=>setForm(f=>({ ...f, question: e.target.value }))}
        />
        <TextField
          label="Answer"
          multiline minRows={3}
          value={form.answer}
          onChange={(e)=>setForm(f=>({ ...f, answer: e.target.value }))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
