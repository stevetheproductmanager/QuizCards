import React from 'react'
import { Box, Tooltip, IconButton } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import ShuffleIcon from '@mui/icons-material/Shuffle'

export default function QuizSideNav({ onPrev, onNext, onRandom }) {
  const baseBtn = {
    bgcolor: 'background.paper',
    boxShadow: 3,
    borderRadius: '50%',
    transition: 'transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease',
    '&:hover': { transform: 'translateY(-2px)', boxShadow: 6, bgcolor: 'action.hover' }
  }

  return (
    <>
      {/* Left arrow — just outside the left edge of the card box */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: -20,                              // ⬅️ very close to edge
          transform: 'translate(-100%, -50%)',
          display: { xs: 'none', sm: 'block' }
        }}
      >
        <Tooltip title="Previous" placement="right">
          <IconButton size="large" sx={baseBtn} onClick={onPrev}>
            <NavigateBeforeIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Right arrow — just outside the right edge */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: -20,                             // ⬅️ very close to edge
          transform: 'translate(100%, -50%)',
          display: { xs: 'none', sm: 'block' }
        }}
      >
        <Tooltip title="Next" placement="left">
          <IconButton size="large" sx={baseBtn} onClick={onNext}>
            <NavigateNextIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Random — below the right arrow, close to the edge */}
      <Box
        sx={{
          position: 'absolute',
          top: 'calc(50% + 72px)',
          right: -20,
          transform: 'translate(100%, 0)',
          display: { xs: 'none', sm: 'block' }
        }}
      >
        <Tooltip title="Random card" placement="left">
          <IconButton size="large" sx={baseBtn} onClick={onRandom}>
            <ShuffleIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  )
}
