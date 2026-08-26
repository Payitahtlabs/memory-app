import { Card } from "./card";
import type { Theme, FieldSize, Player, GameState } from "./types";
import { CARD_MOTIF_COUNTS, FIELD_SIZE_PAIRS } from "./types";

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

  return {
    cards: shuffledCards,
    waitingCards: [],
    scores: { blue: 0, orange: 0 },
    currentPlayer: startPlayer,
  };
}
