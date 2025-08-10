import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'

export default function AppTabs({ tabs }) {
  const [value, setValue] = useState(0)
  return (
    <Box>
      <Tabs value={value} onChange={(e, v)=>setValue(v)} aria-label="tabs">
        {tabs.map((t, i)=>(<Tab key={i} label={t.label} />))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabs[value]?.content}
      </Box>
    </Box>
  )
}
