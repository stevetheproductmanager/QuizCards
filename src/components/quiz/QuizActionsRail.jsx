import React from 'react'
import { Box, Stack, Tooltip, IconButton, Divider } from '@mui/material'
import FlipIcon from '@mui/icons-material/FlipCameraAndroid'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import CheckIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/HighlightOff'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

export default function QuizActionsRail({
  onFlip, onPrev, onNext, onRandom, onCorrect, onIncorrect, onReset
}) {
  const btnSx = {
    bgcolor: 'background.paper',
    boxShadow: 3,
    borderRadius: '50%',
    transition: 'transform 120ms ease, background-color 120ms ease, box-shadow 120ms ease',
    '&:hover': { bgcolor: 'action.hover', transform: 'translateY(-1px)', boxShadow: 6 }
  }

  return (
    <Box
      aria-label="Quiz actions"
      sx={{
        position: 'fixed',
        top: '50%',
        right: 16,
        transform: 'translateY(-50%)',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        display: { xs: 'none', sm: 'block' } // hide on very small screens
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Tooltip title="Flip" placement="left">
          <IconButton size="large" sx={btnSx} onClick={onFlip}><FlipIcon /></IconButton>
        </Tooltip>

        <Divider flexItem sx={{ my: 0.5 }} />

        <Tooltip title="Previous" placement="left">
          <IconButton size="large" sx={btnSx} onClick={onPrev}><NavigateBeforeIcon /></IconButton>
        </Tooltip>
        <Tooltip title="Next" placement="left">
          <IconButton size="large" sx={btnSx} onClick={onNext}><NavigateNextIcon /></IconButton>
        </Tooltip>
        <Tooltip title="Random" placement="left">
          <IconButton size="large" sx={btnSx} onClick={onRandom}><ShuffleIcon /></IconButton>
        </Tooltip>

        <Divider flexItem sx={{ my: 0.5 }} />

        <Tooltip title="Mark Correct" placement="left">
          <IconButton color="success" size="large" sx={btnSx} onClick={onCorrect}><CheckIcon /></IconButton>
        </Tooltip>
        <Tooltip title="Mark Incorrect" placement="left">
          <IconButton color="error" size="large" sx={btnSx} onClick={onIncorrect}><CloseIcon /></IconButton>
        </Tooltip>

        <Divider flexItem sx={{ my: 0.5 }} />

        <Tooltip title="Reset Score" placement="left">
          <IconButton size="large" sx={btnSx} onClick={onReset}><RestartAltIcon /></IconButton>
        </Tooltip>
      </Stack>
    </Box>
  )
}
