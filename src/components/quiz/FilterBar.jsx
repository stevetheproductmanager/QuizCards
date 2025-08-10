import React from 'react'
import { Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default function FilterBar({ category, onCategory, mode, onMode, categories }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb:2, justifyContent:'center', flexWrap:'wrap' }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select labelId="category-label" label="Category" value={category} onChange={(e)=>onCategory(e.target.value)}>
          <MenuItem value="All">All</MenuItem>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="mode-label">Mode</InputLabel>
        <Select labelId="mode-label" label="Mode" value={mode} onChange={(e)=>onMode(e.target.value)}>
          <MenuItem value="qa">Q ➜ A (flip)</MenuItem>
          <MenuItem value="answerOnly">Answer only</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}
