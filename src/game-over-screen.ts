import type { GameResult, GameView, Player, Theme } from "./types";
import { LABEL_SVG, PAWN_SVG, PLAYER_LABELS } from "./game-screen";
import { drawWordmarkTemplate, finalScoreLabelTemplate, finalScoreTemplate, gameOverTemplate, gameOverTitleTemplate, gameOverWordmarkTemplate, homeButtonTemplate, pawnFigureTemplate, resultTemplate, resultTitleTemplate, scaleFigureTemplate, trophyFigureTemplate } from "./game-over-screen-templates";

const GAME_OVER_WORDMARK_URL = new URL("./assets/game-over/game-over-wordmark-code-vibes.svg", import.meta.url).href;
const DRAW_WORDMARK_URL = new URL("./assets/game-over/draw-wordmark-code-vibes.svg", import.meta.url).href;
const TROPHY_URL = new URL("./assets/game-over/trophy-gaming.png", import.meta.url).href;

/**
 * Collects the title and both player groups of the final score.
 * @param view - Snapshot of the finished game.
 * @returns The game-over screen markup.
 */
export function renderGameOver(view: GameView): string {
  const title = renderGameOverTitle(view.theme);
  const blueGroup = renderFinalScore("blue", view.scoreBlue, view.theme);
  const orangeGroup = renderFinalScore("orange", view.scoreOrange, view.theme);
  return gameOverTemplate(title, blueGroup, orangeGroup);
}

/**
 * Decides whether the title is written out or shown as a wordmark image.
 * @param theme - Theme the game was played in.
 * @returns The game-over title markup.
 */
function renderGameOverTitle(theme: Theme): string {
  if (theme === "code-vibes") {
    return gameOverTitleTemplate(gameOverWordmarkTemplate(GAME_OVER_WORDMARK_URL));
  }
  return gameOverTitleTemplate("Game over");
}

/**
 * Picks the icon and the optional name of one final score group.
 * @param player - Player the group belongs to.
 * @param score - Points scored by this player.
 * @param theme - Theme the game was played in.
 * @returns The final score group markup.
 */
function renderFinalScore(player: Player, score: number, theme: Theme): string {
  const withLabel = theme === "code-vibes";
  const icon = withLabel ? LABEL_SVG : PAWN_SVG;
  const label = withLabel ? finalScoreLabelTemplate(PLAYER_LABELS[player]) : "";
  return finalScoreTemplate(player, icon, label, score);
}

/**
 * Picks the caption and collects the parts announcing the winner or a draw.
 * @param result - Outcome of the finished game.
 * @param theme - Theme the game was played in.
 * @returns The result screen markup.
 */
export function renderResult(result: GameResult, theme: Theme): string {
  const caption = result === "draw" ? "It's a" : "The winner is";
  const title = renderResultTitle(result, theme);
  const figure = renderResultFigure(result, theme);
  const homeButton = renderHomeButton(theme);
  return resultTemplate(result, caption, title, figure, homeButton);
}

/**
 * Decides between the written title and the code-vibes draw wordmark.
 * @param result - Outcome of the finished game.
 * @param theme - Theme the game was played in.
 * @returns The result title markup.
 */
function renderResultTitle(result: GameResult, theme: Theme): string {
  if (result === "draw" && theme === "code-vibes") {
    return resultTitleTemplate(drawWordmarkTemplate(DRAW_WORDMARK_URL));
  }
  const title = result === "draw" ? "Draw" : `${PLAYER_LABELS[result]} Player`;
  return resultTitleTemplate(title);
}

/**
 * Chooses the figure below the title: a scale for a draw, a trophy for gaming, a pawn otherwise.
 * @param result - Outcome of the finished game.
 * @param theme - Theme the game was played in.
 * @returns The result figure markup.
 */
function renderResultFigure(result: GameResult, theme: Theme): string {
  if (result === "draw") {
    const scaleUrl = new URL(`./assets/game-over/scale-${theme}.svg`, import.meta.url).href;
    return scaleFigureTemplate(scaleUrl);
  }
  if (theme === "gaming") {
    return trophyFigureTemplate(TROPHY_URL);
  }
  return pawnFigureTemplate(PAWN_SVG);
}

/**
 * Picks the button label the theme asks for on the way back to the homescreen.
 * @param theme - Theme the game was played in.
 * @returns The home button markup.
 */
function renderHomeButton(theme: Theme): string {
  const label = theme === "code-vibes" ? "Back to start" : "Home";
  return homeButtonTemplate(label);
}

/**
 * Attaches the click handler to the home button of the rendered result screen.
 * @param onHome - Callback run when the home button is clicked.
 */
export function initResult(onHome: () => void): void {
  const button = document.querySelector(".result__home") as HTMLElement;
  button.addEventListener("click", onHome);
}
