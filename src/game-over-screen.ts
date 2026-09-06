import type { GameResult, GameView, Player, Theme } from "./types";
import { LABEL_SVG, PAWN_SVG, PLAYER_LABELS } from "./game-screen";

const GAME_OVER_WORDMARK_URL = new URL("./assets/game-over/game-over-wordmark-code-vibes.svg", import.meta.url).href;
const DRAW_WORDMARK_URL = new URL("./assets/game-over/draw-wordmark-code-vibes.svg", import.meta.url).href;
const TROPHY_URL = new URL("./assets/game-over/trophy-gaming.png", import.meta.url).href;

/** Returns the game-over screen showing the final score of both players. */
export function renderGameOver(view: GameView): string {
  return `
    <section class="game-over">
      ${renderGameOverTitle(view.theme)}
      <p class="game-over__caption">Final score</p>
      <p class="game-over__scores">
        ${renderFinalScore("blue", view.scoreBlue, view.theme)}
        ${renderFinalScore("orange", view.scoreOrange, view.theme)}
      </p>
    </section>
  `;
}

/** Returns the title, which code-vibes shows as a wordmark image instead of text. */
function renderGameOverTitle(theme: Theme): string {
  if (theme === "code-vibes") {
    return `<h1 class="game-over__title"><img class="game-over__wordmark" src="${GAME_OVER_WORDMARK_URL}" alt="Game over" /></h1>`;
  }
  return `<h1 class="game-over__title">Game over</h1>`;
}

/** Returns one player group of the final score, naming the player only for code-vibes. */
function renderFinalScore(player: Player, score: number, theme: Theme): string {
  const withLabel = theme === "code-vibes";
  const icon = withLabel ? LABEL_SVG : PAWN_SVG;
  const label = withLabel
    ? `<span class="game-over__score-label">${PLAYER_LABELS[player]}</span>`
    : "";
  return `
    <span class="game-over__score game-over__score--${player}">
      <span class="game-over__score-icon" aria-hidden="true">${icon}</span>
      ${label}
      <span class="game-over__score-value">${score}</span>
    </span>
  `;
}

/** Returns the result screen, announcing the winner or a draw. */
export function renderResult(result: GameResult, theme: Theme): string {
  const caption = result === "draw" ? "It's a" : "The winner is";
  return `
    <section class="result result--${result}">
      <p class="result__caption">${caption}</p>
      ${renderResultTitle(result, theme)}
      ${renderResultFigure(result, theme)}
      ${renderHomeButton(theme)}
    </section>
  `;
}

/** Returns the result title; code-vibes shows the draw as a wordmark image. */
function renderResultTitle(result: GameResult, theme: Theme): string {
  if (result === "draw" && theme === "code-vibes") {
    return `<h1 class="result__title"><img class="result__wordmark" src="${DRAW_WORDMARK_URL}" alt="Draw" /></h1>`;
  }
  const title = result === "draw" ? "Draw" : `${PLAYER_LABELS[result]} Player`;
  return `<h1 class="result__title">${title}</h1>`;
}

/** Returns the figure below the title: a scale for a draw, a trophy for gaming, a pawn otherwise. */
function renderResultFigure(result: GameResult, theme: Theme): string {
  if (result === "draw") {
    const scaleUrl = new URL(`./assets/game-over/scale-${theme}.svg`, import.meta.url).href;
    return `<img class="result__figure result__figure--scale" src="${scaleUrl}" alt="" />`;
  }
  if (theme === "gaming") {
    return `<img class="result__figure result__figure--trophy" src="${TROPHY_URL}" alt="" />`;
  }
  return `<span class="result__figure result__figure--pawn" aria-hidden="true">${PAWN_SVG}</span>`;
}

/** Returns the button leading back to the homescreen with the theme's label. */
function renderHomeButton(theme: Theme): string {
  const label = theme === "code-vibes" ? "Back to start" : "Home";
  return `<button class="result__home" type="button">${label}</button>`;
}

/** Attaches the click handler to the home button of the rendered result screen. */
export function initResult(onHome: () => void): void {
  const button = document.querySelector(".result__home") as HTMLElement;
  button.addEventListener("click", onHome);
}
