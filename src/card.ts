import type { CardData } from "./types";

export class Card implements CardData {
  readonly id: number;
  readonly motifId: number;
  isFlipped: boolean;
  isMatched: boolean;

  /**
   * Creates a card with its id and motif, face down and unmatched.
   * @param id - Unique id of the card.
   * @param motifId - Id of the motif the card shows.
   */
  constructor(id: number, motifId: number) {
    this.id = id;
    this.motifId = motifId;
    this.isFlipped = false;
    this.isMatched = false;
  }

  /** Turns the card face up. */
  flip(): void {
    this.isFlipped = true;
  }

  /** Turns the card face down. */
  flipBack(): void {
    this.isFlipped = false;
  }

  /** Marks the card as part of a found pair. */
  markAsMatched(): void {
    this.isMatched = true;
  }
}
