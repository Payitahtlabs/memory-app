import type { CardData } from "./types";

export class Card implements CardData {
  readonly id: number;
  readonly motifId: number;
  isFlipped: boolean;
  isMatched: boolean;

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
