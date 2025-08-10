import React from 'react'
import { Box, Stack, IconButton, Tooltip, Typography, Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/HighlightOff'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

export default function ScoreBar({
  correct,
  incorrect,
  total,
  index,
  onReset,
  onCorrect,
  onIncorrect
}) {
  const pillBase = {
    px: 1,
    py: 0.25,
    borderRadius: 999,
    fontWeight: 700,
    fontSize: '0.775rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.75,
    border: '1px solid',
    whiteSpace: 'nowrap'
  }

  const incorrectPill = {
    ...pillBase,
    color: 'error.main',
    borderColor: 'rgba(244, 67, 54, 0.25)',
    bgcolor: 'rgba(244, 67, 54, 0.06)'
  }
  const correctPill = {
    ...pillBase,
    color: 'success.main',
    borderColor: 'rgba(76, 175, 80, 0.25)',
    bgcolor: 'rgba(76, 175, 80, 0.08)'
  }
  const centerCardPill = {
    ...pillBase,
    color: 'text.secondary',
    borderColor: 'divider',
    bgcolor: 'background.paper'
  }
  const actionBtn = (kind) => ({
    textTransform: 'none',
    borderRadius: 2,
    fontWeight: 700,
    fontSize: '0.95rem',
    px: 1.5,
    py: 0.75,
    boxShadow: 1,
    border: '1px solid transparent',
    color: kind === 'success' ? 'success.dark' : 'error.dark',
    backgroundColor: kind === 'success' ? 'rgba(76, 175, 80, 0.22)' : 'rgba(244, 67, 54, 0.22)',
    '&:hover': {
      boxShadow: 3,
      backgroundColor: kind === 'success' ? 'rgba(76, 175, 80, 0.30)' : 'rgba(244, 67, 54, 0.30)'
    }
  })

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }} spacing={1}>
      {/* LEFT: Answer Incorrect */}
      <Tooltip title="Mark answer incorrect">
        <Button size="medium" onClick={onIncorrect} startIcon={<CloseIcon />} sx={actionBtn('error')}>
          Answer Incorrect
        </Button>
      </Tooltip>

      {/* CENTER: Reset | Incorrect | Card count | Correct */}
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Tooltip title="Reset score">
          <IconButton size="small" onClick={onReset} aria-label="Reset score" sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'action.hover' } }}>
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Box sx={incorrectPill}>
          <CloseIcon fontSize="small" sx={{ color: 'error.main' }} />
          <Typography variant="caption">Incorrect: {incorrect}</Typography>
        </Box>

        <Box sx={centerCardPill}>
          <Typography variant="caption">
            Card {Math.min(index + 1, total)} / {total}
          </Typography>
        </Box>

        <Box sx={correctPill}>
          <CheckIcon fontSize="small" sx={{ color: 'success.main' }} />
          <Typography variant="caption">Correct: {correct}</Typography>
        </Box>
      </Stack>

      {/* RIGHT: Answer Correct */}
      <Tooltip title="Mark answer correct">
        <Button size="medium" onClick={onCorrect} endIcon={<CheckIcon />} sx={actionBtn('success')}>
          Answer Correct
        </Button>
      </Tooltip>
    </Stack>
  )
}
