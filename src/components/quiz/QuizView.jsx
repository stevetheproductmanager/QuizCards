// src/components/quiz/QuizView.jsx
import React from 'react'
import { Box, Container, Paper, Tooltip, Button } from '@mui/material'
import FlipIcon from '@mui/icons-material/FlipCameraAndroid'
import FlipCard from './FlipCard.jsx'
import ScoreBar from './ScoreBar.jsx'
import { useQuiz } from './QuizProvider.jsx'
import QuizSideNav from './QuizSideNav.jsx'

export default function QuizView() {
  const { state, dispatch, cards, current } = useQuiz()
  const total = cards.length
  const index = state.currentIndex
  const showFlipButton = state.mode !== 'answerOnly'
  const CARD_MAX_WIDTH = 'min(965px, 95vw)';

  return (
    <Container maxWidth="xl" disableGutters sx={{ pt: 0, pb: 0 }}>
      {/* Full-screen stage under the header (~72px app bar). Adjust if your AppBar differs. */}
      <Box sx={{ minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column' }}>
        {/* Tight vertical stack (ScoreBar + Card) with an exact 8px gap */}
        <Box
          sx={{
            px: { xs: 2, md: 4 },
            pt: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center'
          }}
        >
          {/* ScoreBar constrained to same width as the card */}
          <Paper
            variant="outlined"
            sx={{
              width: CARD_MAX_WIDTH,
              px: { xs: 1.5, md: 2 },
              pt: 1,
              pb: 0,
              bgcolor: 'grey.50',
              borderColor: 'divider'
            }}
          >
            <ScoreBar
              correct={state.correct}
              incorrect={state.incorrect}
              total={total}
              index={index}
              onReset={() => dispatch({ type: 'RESET_SCORE' })}
              onCorrect={() => dispatch({ type: 'MARK_CORRECT' })}
              onIncorrect={() => dispatch({ type: 'MARK_INCORRECT' })}
            />
          </Paper>

          {/* Card frame: positions arrows relative to the card's edges */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', pb: 3, width: '100%' }}>
            <Box sx={{ position: 'relative', mx: 'auto', width: 'min(1000px, 95vw)' }}>
              <Paper sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {current ? (
                    <FlipCard
                      question={current.question}
                      answer={current.answer}
                      showAnswer={state.showAnswer || state.mode === 'answerOnly'}
                    />
                  ) : null}
                </Box>

                {/* Prominent Flip button centered under the card (hidden in answerOnly mode) */}
                {showFlipButton && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Tooltip title="Flip the card">
                      <Button
                        onClick={() => dispatch({ type: 'FLIP' })}
                        size="large"
                        startIcon={<FlipIcon />}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 800,
                          fontSize: { xs: '1.05rem', sm: '1.1rem' },
                          px: 2.75,
                          py: 1.35,
                          borderRadius: 3,
                          boxShadow: 4,
                          backgroundColor: 'rgba(25,118,210,0.22)',
                          color: 'primary.dark',
                          '&:hover': { boxShadow: 8, backgroundColor: 'rgba(25,118,210,0.30)' }
                        }}
                      >
                        Flip Card
                      </Button>
                    </Tooltip>
                  </Box>
                )}
              </Paper>

              {/* Arrows tucked right against the card edges */}
              <QuizSideNav
                onPrev={() => dispatch({ type: 'PREV' })}
                onNext={() => dispatch({ type: 'NEXT' })}
                onRandom={() => dispatch({ type: 'RANDOM' })}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
