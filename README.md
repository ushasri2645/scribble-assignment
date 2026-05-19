# Scribble Starter

This repository is a scaffold for the Scribble lab.

It already provides:

- `frontend/`: Vite + React + TypeScript client
- `backend/`: Node.js + Express + TypeScript service
- starter routes and screens for Start, Create Room, Join Room, Lobby, and Game
- starter room API with in-memory state
- starter seed data:
  - words: `rocket`, `pizza`, `castle`, `guitar`, `sunflower`
  - roles: `drawer`, `guesser`

It does not implement the required room and gameplay features described in the business scenarios below.

The current UI uses Scribble branding and presentational copy, but the supported behavior is still the scaffold described in this document.

## Current Implementation

The current branch is scaffold-only.

Implemented today:

- app shell and page routing
- branded landing page and cleaned starter UI
- create room flow
- join room by code flow
- fetch room snapshot flow
- in-memory room storage on the backend
- lobby participant display from the latest fetched snapshot
- game screen placeholders for canvas, guess input, scoreboard, and results
- basic light UI styling

Not implemented yet:

- host behavior or host-only permissions
- automatic lobby polling
- start game flow
- drawer assignment
- secret word visibility rules
- drawing interaction
- clear canvas action
- guess submission and synced history
- scoring
- result state
- restart flow

## API Included In The Starter

Backend endpoints currently available:

- `GET /health`
- `POST /rooms`
- `POST /rooms/:code/join`
- `GET /rooms/:code`

The backend stores all room data in memory only. Restarting the backend clears all rooms.

## Run The Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:3001`.

## Run The Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

If needed, point the frontend at a different backend with `VITE_API_URL`.

## Quick Verification

Use this to confirm the starter works from a clean clone:

1. Start the backend and confirm `http://localhost:3001/health` returns `{ "ok": true }`.
2. Start the frontend and open `http://localhost:5173`.
3. Confirm the Start screen shows `Create Room` and `Join Room`.
4. Create a room and confirm you land on the Lobby screen.
5. Open another tab, join the same room, and use the Lobby refresh button to load the latest participant list.
6. Open the Game screen and confirm the canvas, guess input, scoreboard, and result areas are placeholders only.
7. Treat any start-page marketing copy as presentational only; use this README for actual supported scope.

## 6.2 Business Scenarios

### Scenario 1: Room Setup And Lobby

Given a player wants to host or join a drawing game, when they create or join a room via a unique code, then the creator is automatically the host; invalid or empty codes are rejected with clear feedback; rooms are fully isolated; the lobby refreshes via polling at about 2 seconds; and only the host can start the game once at least 2 players are present.

### Scenario 2: Game Start And Drawer Flow

Given a game is starting and player names are trimmed, when the first round begins, then empty or whitespace-only names are rejected with a message; the host or first player becomes the clearly identified drawer; and the secret word is deterministically selected from the starter list and visible only to the drawer.

### Scenario 3: Gameplay Interaction

Given a round is active with a drawer and guessers and all scores start at 0, when the drawer draws or clears the canvas and guessers submit their guesses, then the drawing is visible on the drawer's screen; guesses are trimmed, compared case-insensitively, and empty guesses are rejected; the guess history is synced to all players through polling; and correct guesses score 100 while incorrect guesses add 0.

### Scenario 4: Result, Restart And Final Validation

Given a round has ended, when the result state is displayed and the host restarts, then all players see the correct word, final scores, and full guess history; and on restart everyone returns to the lobby with players preserved and all round state cleared.

## Explicitly Out Of Scope

These should stay out of the implementation:

- WebSockets or live stroke broadcast
- databases or persistent storage
- authentication or accounts
- deployment, CI, or Docker work
- multiple rounds
- drawer rotation
- timers or countdowns
- speed or drawer bonus scoring
- custom or random word packs
- spectator mode
- moderation features
- room passwords or invite links

## Build Validation

Run both builds before handing off changes:

```bash
cd backend
npm run build
```

```bash
cd frontend
npm run build
```

## Troubleshooting

- If the frontend cannot reach the backend, verify the backend is running on port `3001`.
- If the backend port is already in use, run `PORT=<new-port> npm run dev`.
- If local commands are missing, rerun `npm install` in the relevant app directory.
