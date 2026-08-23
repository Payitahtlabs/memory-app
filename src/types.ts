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
