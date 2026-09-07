import type { CardData, GameResult, GameView, Player, Theme } from "./types";
import { getGameView, getResult, handleCardClick, hasOpenMismatch, hideMismatch, resolveMismatch } from "./game";
import { boardTemplate, cardFacesTemplate, cardTemplate, currentPlayerTemplate, exitButtonTemplate, exitDialogTemplate, gameTemplate, headerTemplate, scoreGroupTemplate, scoreLabelTemplate, scoresTemplate, watermarkTemplate } from "./game-screen-templates";

const BACK_URL = new URL("./assets/cards/card-back-watermark.png", import.meta.url).href;

const FLIP_BACK_DELAY_MS = 1000;

export const FLIP_DURATION_MS = 400;

let mismatchTimer = 0;

export const PAWN_SVG = `<svg viewBox="5.33 2.67 21.34 26.66" fill="currentColor"><path d="M8 29.33C7.27 29.33 6.64 29.07 6.12 28.55C5.59 28.03 5.33 27.4 5.33 26.67V24.03C5.33 23.59 5.43 23.18 5.63 22.8C5.83 22.42 6.1 22.1 6.43 21.83C7.97 20.59 9.12 19.33 9.88 18.07C10.65 16.8 11.19 15.67 11.5 14.67H9.33C8.96 14.67 8.64 14.54 8.38 14.28C8.13 14.03 8 13.71 8 13.33C8 12.96 8.13 12.64 8.38 12.38C8.64 12.13 8.96 12 9.33 12H11C10.69 11.51 10.44 10.99 10.27 10.43C10.09 9.88 10 9.29 10 8.67C10 7 10.58 5.58 11.75 4.42C12.92 3.25 14.33 2.67 16 2.67C17.67 2.67 19.08 3.25 20.25 4.42C21.42 5.58 22 7 22 8.67C22 9.29 21.91 9.88 21.73 10.43C21.56 10.99 21.31 11.51 21 12H22.67C23.04 12 23.36 12.13 23.62 12.38C23.87 12.64 24 12.96 24 13.33C24 13.71 23.87 14.03 23.62 14.28C23.36 14.54 23.04 14.67 22.67 14.67H20.5C20.81 15.67 21.35 16.8 22.12 18.07C22.88 19.33 24.03 20.59 25.57 21.83C25.9 22.1 26.17 22.42 26.37 22.8C26.57 23.18 26.67 23.59 26.67 24.03V26.67C26.67 27.4 26.41 28.03 25.88 28.55C25.36 29.07 24.73 29.33 24 29.33H8ZM8 26.67H24V24C21.96 22.4 20.48 20.75 19.57 19.05C18.66 17.35 18.04 15.89 17.73 14.67H14.27C13.96 15.89 13.34 17.35 12.43 19.05C11.52 20.75 10.04 22.4 8 24V26.67ZM16 12C16.93 12 17.72 11.68 18.37 11.03C19.01 10.39 19.33 9.6 19.33 8.67C19.33 7.73 19.01 6.94 18.37 6.3C17.72 5.66 16.93 5.33 16 5.33C15.07 5.33 14.28 5.66 13.63 6.3C12.99 6.94 12.67 7.73 12.67 8.67C12.67 9.6 12.99 10.39 13.63 11.03C14.28 11.68 15.07 12 16 12Z" /></svg>`;

const EXIT_ICON_SVG = `<svg viewBox="-2.125 -3.75 30 30" fill="currentColor"><path d="M 21.44 12.5 L 7.5 12.5 C 7.15 12.5 6.85 12.38 6.61 12.14 C 6.37 11.9 6.25 11.6 6.25 11.25 C 6.25 10.9 6.37 10.6 6.61 10.36 C 6.85 10.12 7.15 10 7.5 10 L 21.44 10 L 20.38 8.94 C 20.13 8.69 20.01 8.4 20.02 8.06 C 20.03 7.73 20.15 7.44 20.38 7.19 C 20.63 6.94 20.92 6.81 21.27 6.8 C 21.61 6.79 21.91 6.91 22.16 7.16 L 25.38 10.38 C 25.63 10.63 25.75 10.92 25.75 11.25 C 25.75 11.58 25.63 11.87 25.38 12.12 L 22.16 15.34 C 21.91 15.59 21.61 15.71 21.27 15.7 C 20.92 15.69 20.63 15.56 20.38 15.31 C 20.15 15.06 20.03 14.77 20.02 14.44 C 20.01 14.1 20.13 13.81 20.38 13.56 L 21.44 12.5 Z M 15 6.25 L 15 2.5 L 2.5 2.5 L 2.5 20 L 15 20 L 15 16.25 C 15 15.9 15.12 15.6 15.36 15.36 C 15.6 15.12 15.9 15 16.25 15 C 16.6 15 16.9 15.12 17.14 15.36 C 17.38 15.6 17.5 15.9 17.5 16.25 L 17.5 20 C 17.5 20.69 17.26 21.28 16.77 21.77 C 16.28 22.26 15.69 22.5 15 22.5 L 2.5 22.5 C 1.81 22.5 1.22 22.26 0.73 21.77 C 0.24 21.28 0 20.69 0 20 L 0 2.5 C 0 1.81 0.24 1.22 0.73 0.73 C 1.22 0.24 1.81 0 2.5 0 L 15 0 C 15.69 0 16.28 0.24 16.77 0.73 C 17.26 1.22 17.5 1.81 17.5 2.5 L 17.5 6.25 C 17.5 6.6 17.38 6.9 17.14 7.14 C 16.9 7.38 16.6 7.5 16.25 7.5 C 15.9 7.5 15.6 7.38 15.36 7.14 C 15.12 6.9 15 6.6 15 6.25 Z" /></svg>`;

export const LABEL_SVG = `<svg viewBox="0 0 29 24" fill="currentColor"><path d="M 2.97 24 C 2.16 24 1.46 23.71 0.87 23.12 C 0.29 22.53 0 21.83 0 21 L 0 3 C 0 2.17 0.29 1.47 0.87 0.88 C 1.46 0.29 2.16 0 2.97 0 L 19.33 0 C 19.8 0 20.25 0.11 20.67 0.32 C 21.09 0.53 21.44 0.83 21.71 1.2 L 28.41 10.2 C 28.8 10.73 29 11.32 29 12 C 29 12.68 28.8 13.27 28.41 13.8 L 21.71 22.8 C 21.44 23.17 21.09 23.47 20.67 23.68 C 20.25 23.89 19.8 24 19.33 24 L 2.97 24 Z" /></svg>`;

export const PLAYER_LABELS: Record<Player, string> = {
  blue: "Blue",
  orange: "Orange",
};

/**
 * Returns the complete game screen markup for the given view.
 * @param view - Snapshot of the running game.
 * @returns The game screen markup.
 */
export function renderGame(view: GameView): string {
  const header = renderGameHeader(view);
  const board = renderBoard(view);
  const dialog = renderExitDialog(view.theme);
  return gameTemplate(header, board, dialog);
}

/**
 * Picks the header modifier, icon and labelling that the theme asks for.
 * @param view - Snapshot of the running game.
 * @returns The header markup.
 */
function renderGameHeader(view: GameView): string {
  const isCodeVibes = view.theme === "code-vibes";
  const modifier = isCodeVibes ? " game__header--code-vibes" : "";
  const icon = isCodeVibes ? LABEL_SVG : PAWN_SVG;
  const scores = renderScores(view, isCodeVibes);
  const currentPlayer = currentPlayerTemplate(view.currentPlayer, icon);
  return headerTemplate(modifier, scores, currentPlayer, exitButtonTemplate(EXIT_ICON_SVG));
}

/**
 * Builds both player groups for the score box, blue before orange.
 * @param view - Snapshot of the running game.
 * @param withLabel - Whether each group also names its player.
 * @returns The score box markup.
 */
function renderScores(view: GameView, withLabel: boolean): string {
  const blue = renderScoreGroup("blue", view.scoreBlue, withLabel);
  const orange = renderScoreGroup("orange", view.scoreOrange, withLabel);
  return scoresTemplate(blue, orange);
}

/**
 * Picks the icon and the optional name of one player group.
 * @param player - Player the group belongs to.
 * @param score - Points scored by this player.
 * @param withLabel - Whether the group also names its player.
 * @returns The score group markup.
 */
function renderScoreGroup(player: Player, score: number, withLabel: boolean): string {
  const icon = withLabel ? LABEL_SVG : PAWN_SVG;
  const label = withLabel ? scoreLabelTemplate(PLAYER_LABELS[player]) : "";
  return scoreGroupTemplate(player, icon, label, score);
}

/**
 * Picks the button labels the theme asks for in the exit dialog.
 * @param theme - Theme the game is played in.
 * @returns The exit dialog markup.
 */
function renderExitDialog(theme: Theme): string {
  const stayLabel = theme === "gaming" ? "No, back to game" : "Back to game";
  const quitLabel = theme === "gaming" ? "Yes, quit game" : "Exit game";
  return exitDialogTemplate(stayLabel, quitLabel);
}

/**
 * Renders every card of the view into the board.
 * @param view - Snapshot of the running game.
 * @returns The board markup.
 */
function renderBoard(view: GameView): string {
  const cards = view.cards.map((card) => renderCard(card, view.theme)).join("");
  return boardTemplate(view.fieldSize, cards);
}

/**
 * Derives the motif source and the state classes of a single card.
 * @param card - Card to render.
 * @param theme - Theme the game is played in.
 * @returns The card markup.
 */
function renderCard(card: CardData, theme: Theme): string {
  const motifNumber = String(card.motifId).padStart(2, "0");
  const motifUrl = new URL(`./assets/cards/${theme}-card-${motifNumber}.png`, import.meta.url).href;
  const flipped = card.isFlipped ? " card--flipped" : "";
  const matched = card.isMatched ? " card--matched" : "";
  const faces = renderCardFaces(motifUrl, card.motifId, theme);
  return cardTemplate(card.id, `${flipped}${matched}`, faces);
}

/**
 * Decides whether the back of a card carries a watermark; the gaming theme leaves it bare.
 * @param motifUrl - Source of the motif image.
 * @param motifId - Number of the motif, used in the alternative text.
 * @param theme - Theme the game is played in.
 * @returns The card faces markup.
 */
function renderCardFaces(motifUrl: string, motifId: number, theme: Theme): string {
  const watermark = theme === "gaming" ? "" : watermarkTemplate(BACK_URL);
  return cardFacesTemplate(motifUrl, motifId, watermark);
}

/**
 * Mirrors the flipped and matched state of every card onto its button.
 * @param cards - Cards of the running game.
 */
function syncCards(cards: readonly CardData[]): void {
  cards.forEach((card) => {
    const button = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement;
    button.classList.toggle("card--flipped", card.isFlipped);
    button.classList.toggle("card--matched", card.isMatched);
  });
}

/**
 * Writes both players' scores into the score box.
 * @param view - Snapshot of the running game.
 */
function syncScores(view: GameView): void {
  const blue = document.querySelector(".game__score--blue .game__score-value") as HTMLElement;
  const orange = document.querySelector(".game__score--orange .game__score-value") as HTMLElement;
  blue.textContent = String(view.scoreBlue);
  orange.textContent = String(view.scoreOrange);
}

/**
 * Marks the current player on the badge by swapping its modifier and label.
 * @param currentPlayer - Player whose turn it is.
 */
function syncCurrentPlayer(currentPlayer: Player): void {
  const badge = document.querySelector(".game__current-player") as HTMLElement;
  badge.classList.toggle("game__current-player--blue", currentPlayer === "blue");
  badge.classList.toggle("game__current-player--orange", currentPlayer === "orange");
  badge.setAttribute("aria-label", currentPlayer);
}

/**
 * Closes the dialog when the backdrop itself is clicked, not its content.
 * @param event - Click event on the dialog.
 */
function onDialogClick(event: MouseEvent): void {
  if (event.target !== event.currentTarget) return;
  (event.currentTarget as HTMLDialogElement).close();
}

/** Hands the turn to the other player once the cards lie face down again. */
function finishMismatch(): void {
  resolveMismatch();
  const view = getGameView();
  if (!view) return;
  syncCurrentPlayer(view.currentPlayer);
}

/** Turns the two mismatched cards back down and schedules the turn hand-over. */
function flipMismatchBack(): void {
  hideMismatch();
  const view = getGameView();
  if (!view) return;
  syncCards(view.cards);
  mismatchTimer = window.setTimeout(finishMismatch, FLIP_DURATION_MS);
}

/**
 * Resolves a click to a card id, forwards it to the game logic and syncs the screen.
 * @param event - Click event on the board.
 */
function onBoardClick(event: MouseEvent): void {
  if (!(event.target instanceof Element)) return;
  const card = event.target.closest<HTMLElement>('[data-card-id]');
  if (!card) return;
  if (hasOpenMismatch()) return;
  handleCardClick(Number(card.dataset.cardId));
  const view = getGameView();
  if (!view) return;
  syncCards(view.cards);
  syncScores(view);
  syncCurrentPlayer(view.currentPlayer);
  if (!hasOpenMismatch()) return;
  mismatchTimer = window.setTimeout(flipMismatchBack, FLIP_BACK_DELAY_MS);
}

/**
 * Wires the exit button and its dialog; leaving the game is handed to the given callback.
 * @param onExit - Called once the player confirms leaving the game.
 */
function initExitDialog(onExit: () => void): void {
  const exitButton = document.querySelector(".game__exit") as HTMLElement;
  const dialog = document.querySelector(".exit-dialog") as HTMLDialogElement;
  exitButton.addEventListener("click", () => dialog.showModal());
  dialog.addEventListener("click", onDialogClick);
  dialog.addEventListener("close", () => {
    if (dialog.returnValue !== "quit") return;
    clearTimeout(mismatchTimer);
    onExit();
  });
}

/**
 * Wires the board and the exit dialog; the first game result is handed to the callback once.
 * @param onExit - Called once the player confirms leaving the game.
 * @param onGameOver - Called once with the result when the game is over.
 */
export function initGame(onExit: () => void, onGameOver: (result: GameResult) => void): void {
  const board = document.querySelector(".board") as HTMLElement;
  const onClick = (event: MouseEvent): void => {
    onBoardClick(event);
    const result = getResult();
    if (!result) return;
    board.removeEventListener("click", onClick);
    onGameOver(result);
  };
  board.addEventListener("click", onClick);
  initExitDialog(onExit);
}
