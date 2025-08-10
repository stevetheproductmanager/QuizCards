# Quiz Cards (Component-based)

A modular React app (Vite) for studying with flashcards sourced from JSON. It separates quiz flow, UI, and data management for easier maintenance.

## Quick start

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build
npm run preview
```

## Import/Export

Use the **Questions & Answers** tab to import a JSON array of cards:
```json
[
  { "category": "Concept", "question": "What is X?", "answer": "..." },
  { "category": "Formula", "question": "Compute Y", "answer": "..." }
]
```
IDs/timestamps are auto-filled on import.

## Structure

- `components/quiz`: Flip card, controls, score & filter bars, provider
- `components/manager`: List, add/edit dialog, delete dialog
- `components/layout`: Header, tabs
- `data/`: storage helpers
- `pages/`: top-level composition
- `styles/`: CSS for flip behavior
