import React from 'react'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import FlipIcon from '@mui/icons-material/FlipCameraAndroid'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import CheckIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/HighlightOff'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

export default function QuizSpeedDial({ onFlip, onPrev, onNext, onRandom, onCorrect, onIncorrect, onReset }) {
  const actions = [
    { icon: <FlipIcon />, name: 'Flip', onClick: onFlip },
    { icon: <NavigateBeforeIcon />, name: 'Previous', onClick: onPrev },
    { icon: <NavigateNextIcon />, name: 'Next', onClick: onNext },
    { icon: <ShuffleIcon />, name: 'Random', onClick: onRandom },
    { icon: <CheckIcon />, name: 'Correct', onClick: onCorrect },
    { icon: <CloseIcon />, name: 'Incorrect', onClick: onIncorrect },
    { icon: <RestartAltIcon />, name: 'Reset Score', onClick: onReset },
  ]

  return (
    <SpeedDial
      ariaLabel="Quiz actions"
      sx={{ position: 'fixed', bottom: 24, right: 24 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map(a => (
        <SpeedDialAction key={a.name} icon={a.icon} tooltipTitle={a.name} onClick={a.onClick} />
      ))}
    </SpeedDial>
  )
}
