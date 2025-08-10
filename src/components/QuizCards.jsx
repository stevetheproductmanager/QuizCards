import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  Box,
  Tabs,
  Tab,
  IconButton,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete, Edit, Save, Add } from '@mui/icons-material';
import categorizedCards from '../data/sampleCards.json';

export default function QuizCards() {
  const [category, setCategory] = useState('All');
  const [mode, setMode] = useState('qa'); // 'qa' or 'answerOnly'

  const getAllCards = () => {
    if (category === 'All') {
      return [...categorizedCards.Concept, ...categorizedCards.Formula];
    }
    return categorizedCards[category] || [];
  };

  const [cards, setCards] = useState(getAllCards());
  const [currentCardIndex, setCurrentCardIndex] = useState(() =>
    Math.floor(Math.random() * getAllCards().length)
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    const newCards = selectedCategory === 'All'
      ? [...categorizedCards.Concept, ...categorizedCards.Formula]
      : categorizedCards[selectedCategory] || [];
    setCards(newCards);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
    setShowAnswer(event.target.value === 'answerOnly');
  };

  const handleFlip = () => setShowAnswer(true);

  const handleNext = () => {
    setShowAnswer(mode === 'answerOnly');
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(mode === 'answerOnly');
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleCorrect = () => {
    setCorrectCount((prev) => prev + 1);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setShowAnswer(mode === 'answerOnly');
  };

  const handleIncorrect = () => {
    setIncorrectCount((prev) => prev + 1);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setShowAnswer(mode === 'answerOnly');
  };

  const handleRandom = () => {
    setShowAnswer(mode === 'answerOnly');
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentCardIndex(randomIndex);
  };

  const handleReset = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    const newCards = getAllCards();
    setCards(newCards);
    setCurrentCardIndex(Math.floor(Math.random() * newCards.length));
    setShowAnswer(mode === 'answerOnly');
  };

  const handleAddClick = () => {
    setEditingIndex(null);
    setNewQuestion('');
    setNewAnswer('');
    setOpenModal(true);
  };

  const handleEditCard = (index) => {
    setEditingIndex(index);
    setNewQuestion(cards[index].question);
    setNewAnswer(cards[index].answer);
    setOpenModal(true);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedCards = [...cards];
      updatedCards[editingIndex] = { question: newQuestion, answer: newAnswer };
      setCards(updatedCards);
    } else {
      const newCard = { question: newQuestion.trim(), answer: newAnswer.trim() };
      setCards([...cards, newCard]);
    }
    setOpenModal(false);
  };

  const handleDeleteCard = (index) => {
    setConfirmDeleteIndex(index);
  };

  const confirmDelete = () => {
    const updatedCards = [...cards];
    updatedCards.splice(confirmDeleteIndex, 1);
    setCards(updatedCards);
    setConfirmDeleteIndex(null);
  };

  const handleChangeTab = (event, newValue) => setTabIndex(newValue);

  const currentCard = cards[currentCardIndex];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 2, position: 'relative' }}>
      <Box sx={{ backgroundColor: 'secondary', textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" color="#38A7AF" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
          <img src="/logo.png" alt="logo" style={{ width: '60px', height: '60px' }} />
          Quiz Cardz
        </Typography>
      </Box>

      <Tabs value={tabIndex} onChange={handleChangeTab} centered sx={{ marginBottom: 1 }}>
        <Tab label="Quiz Cards" />
        <Tab label="Questions & Answers" />
      </Tabs>


      {tabIndex === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
          {/* Centered Card */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className="flip-card">
        <Box className={`flip-card-inner ${showAnswer ? 'flipped' : ''}`}>

          {/* Front Side (Question) */}
          <Box className="flip-card-front">
            <Card
              sx={{
                width: 1000,
                height: 500,
                textAlign: 'center',
                boxShadow: 6,
                backgroundColor: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'center'
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3">
                  {currentCard.question}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Back Side (Answer) */}
          <Box className="flip-card-back">
            <Card
              sx={{
                width: 1000,
                height: 500,
                textAlign: 'center',
                boxShadow: 6,
                backgroundColor: '#e8f5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
        <CardContent sx={{ height: '100%', width: '100%', padding: 2, position: 'relative' }}>

          {/* Top Label: Answer */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 16,
              right: 16,
              mt: 4,
              backgroundColor: '#fff9c4',
              borderTop: '2px solid black',
              borderBottom: '2px solid black',
              boxShadow: 6,
              padding: 1,
              borderRadius: 1
            }}
          >
          <Typography variant="h4">
            {currentCard.question}
          </Typography>
        </Box>


      {/* Center Big Text: Question */}
            <Box sx={{
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%'
            }}>
              <Typography variant="h4">
                {currentCard.answer}
              </Typography>
            </Box>

          </CardContent>
        </Card>
      </Box>      
    </Box>
  </Box>
</Box>


          {/* Bottom Buttons and Counter */}
          <Stack
            spacing={2}
            alignItems="center"
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Stack direction="row" spacing={1}>
              {!showAnswer ? (
                <>
              <Button
                variant="contained"
                onClick={handleFlip}
                sx={{ fontSize: '1.25rem', padding: '12px 24px', minWidth: '160px' }}
              >
                Flip Card
              </Button>

                </>
              ) : (
                <>
            <Button
              variant="contained"
              color="success"
              onClick={handleCorrect}
              sx={{ fontSize: '1.25rem', padding: '12px 24px', minWidth: '160px' }}
            >
              Correct
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleIncorrect}
              sx={{ fontSize: '1.25rem', padding: '12px 24px', minWidth: '160px' }}
            >
              Incorrect
            </Button>

                </>
              )}
            </Stack>

            <Stack direction="row" spacing={3}>
            <FormControl sx={{ minWidth: 100 }}>
                <InputLabel>Category</InputLabel>
                <Select value={category} label="Category" onChange={handleCategoryChange}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Concept">Concept</MenuItem>
                  <MenuItem value="Formula">Formula</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Mode</InputLabel>
          <Select value={mode} label="Mode" onChange={handleModeChange}>
            <MenuItem value="qa">Q&A Mode</MenuItem>
            <MenuItem value="answerOnly">Answer Cards</MenuItem>
          </Select>
        </FormControl>
                <Button variant="outlined" color="success" onClick={handleRandom}>
                  Random Card
                </Button>
                <Button variant="outlined" color="error" onClick={handlePrevious}>
                  Last Card
                </Button>
                <Button variant="outlined" onClick={handleNext}>
                  Next Card
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleReset}>
                  Reset Score
                </Button>
              </Stack>

            <Typography variant="body2" color="text.secondary">
              Correct: {correctCount} | Incorrect: {incorrectCount}
            </Typography>
          </Stack>
        </Box>
      )}


      {/* Questions & Answers Tab */}
      {tabIndex === 1 && (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Manage Questions & Answers</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={handleAddClick}>Add Card</Button>
          </Stack>

          <Stack spacing={2}>
            {cards.map((card, index) => (
              <Card key={index} sx={{ padding: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1">Q: {card.question}</Typography>
                    <Typography variant="subtitle2">A: {card.answer}</Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEditCard(index)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCard(index)} color="error">
                      <Delete />
                    </IconButton>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>

          {/* Modal for Add/Edit Card */}
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box sx={{ p: 4, backgroundColor: 'white', maxWidth: 1000, mx: 'auto', mt: '10%', borderRadius: 2 }}>
              <Typography variant="h6" mb={2}>{editingIndex !== null ? 'Edit Card' : 'Add New Card'}</Typography>
              <Stack spacing={2}>
                <TextField
                  label="Question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  multiline
                  minRows={5}
                />
                <TextField
                  label="Answer"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  multiline
                  minRows={8}
                />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button onClick={() => setOpenModal(false)} color="secondary">
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSaveEdit}>
                    <Save sx={{ mr: 1 }} /> Save
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Modal>

          {/* Confirmation Dialog for Delete */}
          <Dialog open={confirmDeleteIndex !== null} onClose={() => setConfirmDeleteIndex(null)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this card?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmDeleteIndex(null)}>No</Button>
              <Button color="error" onClick={confirmDelete}>Yes</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}
