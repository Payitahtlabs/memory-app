import type { Card } from "./card";

export type Player = "blue" | "orange";
export type Theme = "code-vibes" | "gaming" | "da-projects";
export type FieldSize = "4x4" | "4x6" | "6x6";

export interface GameSettings {
  theme: Theme | null;
  player: Player | null;
  fieldSize: FieldSize | null;
}

export const CARD_MOTIF_COUNTS: Record<Theme, number> = {
  "code-vibes": 18,
  "gaming": 18,
  "da-projects": 18,
};

export const FIELD_SIZE_PAIRS: Record<FieldSize, number> = {
  "4x4": 8,
  "4x6": 12,
  "6x6": 18,
};

export interface CardData {
  readonly id: number;
  readonly motifId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  waitingCards: Card[];
  scores: Record<Player, number>;
  currentPlayer: Player;
  theme: Theme;
  fieldSize: FieldSize;
}

export interface StartSettings {
  theme: Theme;
  player: Player;
  fieldSize: FieldSize;
}

/** Read-only snapshot of the running game for the render layer. */
export interface GameView {
  readonly cards: readonly CardData[];
  readonly theme: Theme;
  readonly fieldSize: FieldSize;
  readonly currentPlayer: Player;
  readonly scoreBlue: number;
  readonly scoreOrange: number;
}
