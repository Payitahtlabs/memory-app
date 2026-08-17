export type Player = "blue" | "orange";
export type Theme = "code-vibes" | "gaming" | "da-projects";
export type FieldSize = "4x4" | "4x6" | "6x6";

export interface GameSettings {
  theme: Theme | null;
  player: Player | null;
  fieldSize: FieldSize | null;
}
