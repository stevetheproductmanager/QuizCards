import React from 'react'
import { Box, Chip, Typography } from '@mui/material'

export default function FlipCard({ question, answer, showAnswer }) {
  return (
    <Box
      sx={{
        perspective: '1200px',
        width: 'min(1000px, 95vw)',     // ⬅️ wider
        height: 'min(680px, 78vh)',     // ⬅️ taller
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transition: 'transform 480ms ease',
          transform: showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* FRONT — big centered question; small left-aligned pill */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            boxShadow: 4,
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(135deg, rgba(25,118,210,0.05), rgba(25,118,210,0.02))',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Chip
            label="Question"
            size="small"
            color="primary"
            variant="outlined"
            sx={{ alignSelf: 'flex-start', mb: 1, borderRadius: 1 }}
          />
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant="h2"                    // ⬅️ larger
              sx={{ fontWeight: 800, lineHeight: 1.15, textAlign: 'center' }}
            >
              {question}
            </Typography>
          </Box>
        </Box>

        {/* BACK — small Q label + question; then Answer label (left), big centered answer */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            boxShadow: 4,
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(135deg, rgba(46,125,50,0.06), rgba(46,125,50,0.02))',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Chip
            label="Question"
            size="small"
            color="primary"
            variant="outlined"
            sx={{ alignSelf: 'flex-start', borderRadius: 1 }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {question}
          </Typography>

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'left', justifyContent: 'left'}}>
            <Box sx={{ width: '100%', maxWidth: '52rem' }}>
              <Chip
                label="Answer"
                size="small"
                color="success"
                variant="outlined"
                sx={{ alignSelf: 'flex-start', borderRadius: 1, mb: 1 }}
              />
              <Typography
                variant="h2"                 // ⬅️ same large size as front
                sx={{ fontWeight: 400, lineHeight: 1.2, textAlign: 'center' }}
              >
                {answer}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
