import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'

export default function ConfirmDeleteDialog({ open, item, onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Delete card?</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this card?</Typography>
        {item ? <Typography sx={{ mt:1 }}>"{item.question}"</Typography> : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="error" variant="contained" onClick={()=>onConfirm(item?.id)}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}
