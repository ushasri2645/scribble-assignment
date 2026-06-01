export type ParticipantRole = "drawer" | "guesser";
export type RoomStatus = "lobby" | "game";
export type CanvasEventType = "stroke" | "clear";

export interface Participant {
  id: string;
  name: string;
  joinedAt: string;
}

export interface CanvasPoint {
  x: number;
  y: number;
}

export interface CanvasStroke {
  points: CanvasPoint[];
  color: string;
  lineWidth: number;
}

export interface CanvasEvent {
  id: string;
  type: CanvasEventType;
  participantId: string;
  createdAt: string;
  stroke?: CanvasStroke;
}

export interface GuessEntry {
  id: string;
  participantId: string;
  rawText: string;
  normalizedText: string;
  isCorrect: boolean;
  pointsAwarded: 0 | 100;
  createdAt: string;
}

export interface Round {
  drawerParticipantId: string;
  secretWord: string;
  startedAt: string;
  canvasEvents: CanvasEvent[];
  guessHistory: GuessEntry[];
  scores: Record<string, number>;
}

export interface Room {
  code: string;
  status: RoomStatus;
  participants: Participant[];
  round: Round | null;
  createdAt: string;
  updatedAt: string;
}

export interface RoomSnapshot {
  code: string;
  status: RoomStatus;
  participants: Participant[];
  availableWords: string[];
  roles: ParticipantRole[];
  drawerParticipantId: string | null;
  canvasEvents: CanvasEvent[];
  guessHistory: GuessEntry[];
  scores: Record<string, number>;
  secretWord?: string;
}

export interface RoomSessionResponse {
  participantId: string;
  room: RoomSnapshot;
}
