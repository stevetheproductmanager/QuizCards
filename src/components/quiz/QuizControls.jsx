import React from 'react'
import { Stack, Button } from '@mui/material'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import FlipIcon from '@mui/icons-material/FlipCameraAndroid'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import CheckIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/HighlightOff'

export default function QuizControls({
  onFlip, onCorrect, onIncorrect, onPrev, onNext, onRandom, onReset
}) {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap:'wrap', justifyContent:'center' }}>
      <Button variant="contained" onClick={onFlip} startIcon={<FlipIcon/>}>Flip</Button>
      <Button variant="outlined" onClick={onPrev} startIcon={<NavigateBeforeIcon/>}>Prev</Button>
      <Button variant="outlined" onClick={onNext} endIcon={<NavigateNextIcon/>}>Next</Button>
      <Button variant="outlined" onClick={onRandom} startIcon={<ShuffleIcon/>}>Random</Button>
      <Button color="success" variant="contained" onClick={onCorrect} startIcon={<CheckIcon/>}>Correct</Button>
      <Button color="error" variant="contained" onClick={onIncorrect} startIcon={<CloseIcon/>}>Incorrect</Button>
      <Button variant="text" onClick={onReset}>Reset Score</Button>
    </Stack>
  )
}
