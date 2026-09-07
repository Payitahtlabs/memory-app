import type { GameResult, Player } from "./types";

/**
 * Builds the game-over screen frame around its finished parts.
 * @param title - Finished title markup.
 * @param blueGroup - Finished markup of the blue player group.
 * @param orangeGroup - Finished markup of the orange player group.
 * @returns The game-over screen markup.
 */
export function gameOverTemplate(title: string, blueGroup: string, orangeGroup: string): string {
  return `
    <section class="game-over">
      ${title}
      <p class="game-over__caption">Final score</p>
      <p class="game-over__scores">
        ${blueGroup}
        ${orangeGroup}
      </p>
    </section>
  `;
}

/**
 * Builds the heading of the game-over screen around its finished content.
 * @param content - Written title or finished wordmark markup.
 * @returns The game-over title markup.
 */
export function gameOverTitleTemplate(content: string): string {
  return `<h1 class="game-over__title">${content}</h1>`;
}

/**
 * Builds the wordmark image standing in for the written game-over title.
 * @param src - Source of the wordmark image.
 * @returns The game-over wordmark markup.
 */
export function gameOverWordmarkTemplate(src: string): string {
  return `<img class="game-over__wordmark" src="${src}" alt="Game over" />`;
}

/**
 * Builds one player group of the final score.
 * @param player - Player the group belongs to.
 * @param icon - Finished icon markup.
 * @param label - Finished label markup, or an empty string.
 * @param score - Points scored by this player.
 * @returns The final score group markup.
 */
export function finalScoreTemplate(player: Player, icon: string, label: string, score: number): string {
  return `
    <span class="game-over__score game-over__score--${player}">
      <span class="game-over__score-icon" aria-hidden="true">${icon}</span>
      ${label}
      <span class="game-over__score-value">${score}</span>
    </span>
  `;
}

/**
 * Builds the written player name inside a final score group.
 * @param text - Name of the player.
 * @returns The final score label markup.
 */
export function finalScoreLabelTemplate(text: string): string {
  return `<span class="game-over__score-label">${text}</span>`;
}

/**
 * Builds the result screen frame around its finished parts.
 * @param result - Outcome the screen announces.
 * @param caption - Written line above the title.
 * @param title - Finished title markup.
 * @param figure - Finished figure markup.
 * @param homeButton - Finished home button markup.
 * @returns The result screen markup.
 */
export function resultTemplate(result: GameResult, caption: string, title: string, figure: string, homeButton: string): string {
  return `
    <section class="result result--${result}">
      <p class="result__caption">${caption}</p>
      ${title}
      ${figure}
      ${homeButton}
    </section>
  `;
}

/**
 * Builds the heading of the result screen around its finished content.
 * @param content - Written title or finished wordmark markup.
 * @returns The result title markup.
 */
export function resultTitleTemplate(content: string): string {
  return `<h1 class="result__title">${content}</h1>`;
}

/**
 * Builds the wordmark image standing in for the written draw title.
 * @param src - Source of the wordmark image.
 * @returns The draw wordmark markup.
 */
export function drawWordmarkTemplate(src: string): string {
  return `<img class="result__wordmark" src="${src}" alt="Draw" />`;
}

/**
 * Builds the scale figure shown when the game ended in a draw.
 * @param src - Source of the scale image.
 * @returns The scale figure markup.
 */
export function scaleFigureTemplate(src: string): string {
  return `<img class="result__figure result__figure--scale" src="${src}" alt="" />`;
}

/**
 * Builds the trophy figure shown to the winner.
 * @param src - Source of the trophy image.
 * @returns The trophy figure markup.
 */
export function trophyFigureTemplate(src: string): string {
  return `<img class="result__figure result__figure--trophy" src="${src}" alt="" />`;
}

/**
 * Builds the pawn figure shown to the winner.
 * @param icon - Finished icon markup.
 * @returns The pawn figure markup.
 */
export function pawnFigureTemplate(icon: string): string {
  return `<span class="result__figure result__figure--pawn" aria-hidden="true">${icon}</span>`;
}

/**
 * Builds the button leading back to the homescreen.
 * @param label - Written label of the button.
 * @returns The home button markup.
 */
export function homeButtonTemplate(label: string): string {
  return `<button class="result__home" type="button">${label}</button>`;
}
