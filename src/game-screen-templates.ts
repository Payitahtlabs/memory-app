import type { FieldSize, Player } from "./types";

/**
 * Builds the game screen frame around its three finished parts.
 * @param header - Finished header markup.
 * @param board - Finished board markup.
 * @param dialog - Finished exit dialog markup.
 * @returns The complete game screen markup.
 */
export function gameTemplate(header: string, board: string, dialog: string): string {
  return `
    <section class="game">
      ${header}
      ${board}
      ${dialog}
    </section>
  `;
}

/**
 * Builds the header frame around its finished parts.
 * @param modifier - Extra class names appended to the header block, or an empty string.
 * @param scores - Finished score box markup.
 * @param currentPlayer - Finished current-player markup.
 * @param exitButton - Finished exit button markup.
 * @returns The header markup.
 */
export function headerTemplate(modifier: string, scores: string, currentPlayer: string, exitButton: string): string {
  return `
    <header class="game__header${modifier}">
      ${scores}
      ${currentPlayer}
      ${exitButton}
    </header>
  `;
}

/**
 * Builds the score box holding both finished player groups.
 * @param blueGroup - Finished markup of the blue player group.
 * @param orangeGroup - Finished markup of the orange player group.
 * @returns The score box markup.
 */
export function scoresTemplate(blueGroup: string, orangeGroup: string): string {
  return `
    <p class="game__scores">
      ${blueGroup}
      ${orangeGroup}
    </p>
  `;
}

/**
 * Builds one player group inside the score box.
 * @param player - Player the group belongs to.
 * @param icon - Finished icon markup.
 * @param label - Finished label markup, or an empty string.
 * @param score - Points scored by this player.
 * @returns The score group markup.
 */
export function scoreGroupTemplate(player: Player, icon: string, label: string, score: number): string {
  return `
    <span class="game__score game__score--${player}">
      ${icon}
      ${label}
      <span class="game__score-value">${score}</span>
    </span>
  `;
}

/**
 * Builds the written player name inside a score group.
 * @param text - Name of the player.
 * @returns The score label markup.
 */
export function scoreLabelTemplate(text: string): string {
  return `<span class="game__score-label">${text}</span>`;
}

/**
 * Builds the current-player line with its coloured badge.
 * @param currentPlayer - Player whose turn it is.
 * @param icon - Finished icon markup shown inside the badge.
 * @returns The current-player markup.
 */
export function currentPlayerTemplate(currentPlayer: Player, icon: string): string {
  return `
    <p class="game__current">Current player:
      <span class="game__current-player game__current-player--${currentPlayer}" aria-label="${currentPlayer}">${icon}</span>
    </p>
  `;
}

/**
 * Builds the exit button, an icon followed by its written label.
 * @param icon - Finished icon markup.
 * @returns The exit button markup.
 */
export function exitButtonTemplate(icon: string): string {
  return `
    <button class="game__exit" type="button">
      ${icon}
      <span>Exit game</span>
    </button>
  `;
}

/**
 * Builds the confirmation dialog shown before leaving the game.
 * @param stayLabel - Written label of the button that returns to the game.
 * @param quitLabel - Written label of the button that leaves the game.
 * @returns The exit dialog markup.
 */
export function exitDialogTemplate(stayLabel: string, quitLabel: string): string {
  return `
    <dialog class="exit-dialog">
      <form class="exit-dialog__panel" method="dialog">
        <p class="exit-dialog__question">Are you sure you want to quit the game?</p>
        <div class="exit-dialog__actions">
          <button class="exit-dialog__button exit-dialog__button--stay" value="stay">${stayLabel}</button>
          <button class="exit-dialog__button exit-dialog__button--quit" value="quit">${quitLabel}</button>
        </div>
      </form>
    </dialog>
  `;
}

/**
 * Builds the board container around its finished cards.
 * @param fieldSize - Field size the board is sized by.
 * @param cards - Finished markup of all cards, already joined.
 * @returns The board markup.
 */
export function boardTemplate(fieldSize: FieldSize, cards: string): string {
  return `
    <div class="board board--${fieldSize}">
      ${cards}
    </div>
  `;
}

/**
 * Builds a single card button around its finished faces.
 * @param id - Identifier the click handler reads from the dataset.
 * @param stateClasses - Extra class names for the flipped and matched state, or an empty string.
 * @param faces - Finished markup of the card faces.
 * @returns The card markup.
 */
export function cardTemplate(id: number, stateClasses: string, faces: string): string {
  return `
    <button class="card${stateClasses}" type="button" data-card-id="${id}">
      ${faces}
    </button>
  `;
}

/**
 * Builds the flippable inner faces of a card.
 * @param motifUrl - Source of the motif image.
 * @param motifId - Number of the motif, used in the alternative text.
 * @param watermark - Finished watermark markup, or an empty string.
 * @returns The card faces markup.
 */
export function cardFacesTemplate(motifUrl: string, motifId: number, watermark: string): string {
  return `
    <span class="card__inner">
      <span class="card__front">
        <img class="card__motif" src="${motifUrl}" alt="Card motif ${motifId}" />
      </span>
      <span class="card__back">
        ${watermark}
      </span>
    </span>
  `;
}

/**
 * Builds the watermark image on the back of a card.
 * @param backUrl - Source of the watermark image.
 * @returns The watermark markup.
 */
export function watermarkTemplate(backUrl: string): string {
  return `<img class="card__watermark" src="${backUrl}" alt="" />`;
}
