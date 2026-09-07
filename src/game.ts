import { Card } from "./card";
import type { Theme, FieldSize, Player, GameState, GameView, GameResult } from "./types";
import { CARD_MOTIF_COUNTS, FIELD_SIZE_PAIRS } from "./types";

let gameState: GameState | null = null;

/**
 * Returns a new array with the items in random order.
 * @param items - The items to put in random order.
 * @returns A new array with the items in random order.
 */
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Draws a given number of random motif ids for a theme.
 * @param theme - Theme whose motif pool is drawn from.
 * @param pairCount - How many motif ids to draw.
 * @returns The drawn motif ids.
 */
function drawMotifs(theme: Theme, pairCount: number): number[] {
  const pool = Array.from({ length: CARD_MOTIF_COUNTS[theme] }, (_, index) => index + 1);
  const shuffled = shuffle(pool);
  return shuffled.slice(0, pairCount);
}

/**
 * Creates a pair of cards for each motif id.
 * @param motifIds - Motif ids to build a pair for.
 * @returns The created cards, two per motif id.
 */
function createCards(motifIds: number[]): Card[] {
  const cards: Card[] = [];
  for (let i = 0; i < motifIds.length; i++) {
    cards.push(new Card(i * 2, motifIds[i]));
    cards.push(new Card(i * 2 + 1, motifIds[i]));
  }
  return cards;
}

/**
 * Creates a fresh game state for the given settings.
 * @param theme - Chosen visual theme.
 * @param fieldSize - Chosen board size.
 * @param startPlayer - Player who takes the first turn.
 * @returns The fresh game state.
 */
export function startGame(theme: Theme, fieldSize: FieldSize, startPlayer: Player): GameState {
  const pairCount = FIELD_SIZE_PAIRS[fieldSize];
  const motifIds = drawMotifs(theme, pairCount);
  const cards = createCards(motifIds);
  const shuffledCards = shuffle(cards);

  gameState = {
    cards: shuffledCards,
    waitingCards: [],
    scores: { blue: 0, orange: 0 },
    currentPlayer: startPlayer,
    theme,
    fieldSize,
  };
  return gameState;
}

/**
 * Tells whether two mismatched cards are still lying open.
 * @returns true while a mismatch blocks the board.
 */
export function hasOpenMismatch(): boolean {
  if (!gameState) return false;
  return gameState.waitingCards.length === 2;
}

/**
 * Handles a click on the card with the given id according to the game rules.
 * @param cardId - Id of the clicked card.
 */
export function handleCardClick(cardId: number): void {
  if (!gameState || hasOpenMismatch()) return;
  const card = gameState.cards.find((c) => c.id === cardId);
  if (!card) return;
  if (card.isMatched || gameState.waitingCards.includes(card)) return;

  card.flip();
  gameState.waitingCards.push(card);
  if (gameState.waitingCards.length === 2) {
    resolveComparison();
  }
}

/** Resolves the two waiting cards as a match; a mismatch is left lying open. */
function resolveComparison(): void {
  if (!gameState) return;
  const first = gameState.waitingCards[0];
  const second = gameState.waitingCards[1];
  if (first.motifId !== second.motifId) return;

  first.markAsMatched();
  second.markAsMatched();
  gameState.scores[gameState.currentPlayer] += 1;
  gameState.waitingCards = [];
}

/** Turns the two open mismatched cards face down without lifting the block. */
export function hideMismatch(): void {
  if (!gameState || !hasOpenMismatch()) return;
  gameState.waitingCards[0].flipBack();
  gameState.waitingCards[1].flipBack();
}

/** Flips the two open cards back, hands the turn over and lifts the block. */
export function resolveMismatch(): void {
  if (!gameState || !hasOpenMismatch()) return;
  gameState.waitingCards[0].flipBack();
  gameState.waitingCards[1].flipBack();
  gameState.waitingCards = [];
  gameState.currentPlayer = gameState.currentPlayer === "blue" ? "orange" : "blue";
}

/**
 * Returns a read-only snapshot of the current game for rendering.
 * @returns The snapshot, or null while no game is running.
 */
export function getGameView(): GameView | null {
  if (!gameState) return null;
  return {
    cards: gameState.cards,
    theme: gameState.theme,
    fieldSize: gameState.fieldSize,
    currentPlayer: gameState.currentPlayer,
    scoreBlue: gameState.scores.blue,
    scoreOrange: gameState.scores.orange,
  };
}

/**
 * Tells whether every card has been matched.
 * @returns true once every card has been matched.
 */
function isGameOver(): boolean {
  if (!gameState) return false;
  return gameState.cards.every((card) => card.isMatched);
}

/**
 * Returns the winner once the game is over, "draw" on equal scores, null while it runs.
 * @returns The winning player, "draw", or null while the game runs.
 */
export function getResult(): GameResult | null {
  if (!gameState || !isGameOver()) return null;
  const { blue, orange } = gameState.scores;
  if (blue === orange) return "draw";
  return blue > orange ? "blue" : "orange";
}
