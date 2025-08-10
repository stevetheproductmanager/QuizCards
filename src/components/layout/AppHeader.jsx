import React, { useMemo } from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useQuiz } from '../quiz/QuizProvider.jsx'

export default function AppHeader({ tabs, value, onChange }) {
  const { state, dispatch } = useQuiz()

  const categories = useMemo(() => {
    const set = new Set()
    state.allCards.forEach(c => set.add(c.category || 'Concept'))
    return Array.from(set)
  }, [state.allCards])

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ gap: 2, minHeight: 72 }}>
        {/* Left: Logo + Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src="/logo.png" alt="Logo" sx={{ width: 50, height: 50, mr: 1 }} />
          <Typography variant="h6" component="div">Quiz Cards</Typography>
        </Box>

        {/* Center: Tabs */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={value}
            onChange={onChange}
            textColor="inherit"
            TabIndicatorProps={{ sx: { backgroundColor: 'common.white', height: 3, borderRadius: 3 } }}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.8)',
                textTransform: 'none',
                fontWeight: 500,
                minHeight: 64,
                transition: 'color 160ms ease, background-color 160ms ease, transform 120ms ease'
              },
              '& .MuiTab-root:hover': {
                color: 'common.white',
                backgroundColor: 'rgba(255,255,255,0.12)',
                borderRadius: 1,
                transform: 'translateY(-1px)'
              },
              '& .Mui-selected': { color: 'common.white' }
            }}
          >
            {tabs.map((t, i) => <Tab key={i} label={t.label} />)}
          </Tabs>
        </Box>

        {/* Right: Category + Mode */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="category-label" sx={{ color: 'common.white' }}>Category</InputLabel>
            <Select
              labelId="category-label"
              label="Category"
              value={state.category}
              onChange={(e)=>dispatch({ type:'SET_CATEGORY', category: e.target.value })}
              sx={{
                color: 'common.white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'common.white' },
                '.MuiSvgIcon-root': { color: 'common.white' }
              }}
            >
              <MenuItem value="All">All</MenuItem>
              {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 170 }}>
            <InputLabel id="mode-label" sx={{ color: 'common.white' }}>Mode</InputLabel>
            <Select
              labelId="mode-label"
              label="Mode"
              value={state.mode}
              onChange={(e)=>dispatch({ type:'SET_MODE', mode: e.target.value })}
              sx={{
                color: 'common.white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'common.white' },
                '.MuiSvgIcon-root': { color: 'common.white' }
              }}
            >
              <MenuItem value="qa">Q ➜ A (flip)</MenuItem>
              <MenuItem value="answerOnly">Answer only</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
