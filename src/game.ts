import { Card } from "./card";
import type { Theme, FieldSize, Player, GameState, GameView } from "./types";
import { CARD_MOTIF_COUNTS, FIELD_SIZE_PAIRS } from "./types";

let gameState: GameState | null = null;

/** Returns a new array with the items in random order. */
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Draws a given number of random motif ids for a theme. */
function drawMotifs(theme: Theme, pairCount: number): number[] {
  const pool = Array.from({ length: CARD_MOTIF_COUNTS[theme] }, (_, index) => index + 1);
  const shuffled = shuffle(pool);
  return shuffled.slice(0, pairCount);
}

/** Creates a pair of cards for each motif id. */
function createCards(motifIds: number[]): Card[] {
  const cards: Card[] = [];
  for (let i = 0; i < motifIds.length; i++) {
    cards.push(new Card(i * 2, motifIds[i]));
    cards.push(new Card(i * 2 + 1, motifIds[i]));
  }
  return cards;
}

/** Creates a fresh game state for the given settings. */
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

/** Handles a click on the card with the given id according to the game rules. */
export function handleCardClick(cardId: number): void {
  if (!gameState) return;
  const card = gameState.cards.find((c) => c.id === cardId);
  if (!card) return;

  if (card.isMatched || gameState.waitingCards.includes(card)) return;
  if (gameState.waitingCards.length === 2) {
    clearWaitingCards();
  }

  card.flip();
  gameState.waitingCards.push(card);
  if (gameState.waitingCards.length === 2) {
    resolveComparison();
  }
}

/** Resolves the comparison of the two waiting cards as a match or a player switch. */
function resolveComparison(): void {
  if (!gameState) return;
  const first = gameState.waitingCards[0];
  const second = gameState.waitingCards[1];

  if (first.motifId === second.motifId) {
    first.markAsMatched();
    second.markAsMatched();
    gameState.scores[gameState.currentPlayer] += 1;
    gameState.waitingCards = [];
  } else {
    gameState.currentPlayer = gameState.currentPlayer === "blue" ? "orange" : "blue";
  }
}

/** Flips the two waiting cards back and clears the list. */
function clearWaitingCards(): void {
  if (!gameState) return;
  gameState.waitingCards[0].flipBack();
  gameState.waitingCards[1].flipBack();
  gameState.waitingCards = [];
}

/** Returns a read-only snapshot of the current game for rendering. */
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
