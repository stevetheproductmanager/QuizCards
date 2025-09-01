// src/components/CardList.jsx
import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Stack } from '@mui/material'

export default function CardList({ rows, onEdit, onDelete }) {
  const columns = [
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'question', headerName: 'Question', flex: 2 },
    { field: 'answer', headerName: 'Answer', flex: 2 },
    {
      field: 'actions', headerName: 'Actions', sortable: false, filterable: false, flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={()=>onEdit(params.row)}>Edit</Button>
          <Button size="small" color="error" variant="outlined" onClick={()=>onDelete(params.row)}>Delete</Button>
        </Stack>
      )
    }
  ]

  return (
    <Box sx={{ height: '70%', width: '100%' }}>
      <DataGrid
        getRowId={(r) => r.id}
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } }
        }}
      />
    </Box>
  )
}
