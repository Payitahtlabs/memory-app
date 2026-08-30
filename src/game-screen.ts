import type { CardData, GameView, Player, Theme } from "./types";

const BACK_URL = new URL("./assets/cards/card-back-watermark.png", import.meta.url).href;

/** Returns the complete game screen markup for the given view. */
export function renderGame(view: GameView): string {
  return `
    <section class="game">
      ${renderGameHeader(view)}
      ${renderBoard(view)}
    </section>
  `;
}

/** Returns the header markup, switching between the standard and the code-vibes layout. */
function renderGameHeader(view: GameView): string {
  if (view.theme === "code-vibes") {
    return renderCodeVibesHeader(view);
  }
  return renderStandardHeader(view);
}

/** Returns the header shared by the gaming and da-projects themes. */
function renderStandardHeader(view: GameView): string {
  return `
    <header class="game__header">
      <span class="game__bar" aria-hidden="true"></span>
      ${renderScoreBox("blue", view.scoreBlue, null)}
      <p class="game__current">Current player:
        <span class="game__current-player game__current-player--${view.currentPlayer}">${view.currentPlayer}</span>
      </p>
      ${renderScoreBox("orange", view.scoreOrange, null)}
      <button class="game__exit" type="button">Exit</button>
    </header>
  `;
}

/** Returns the code-vibes header with written player names and without the bar. */
function renderCodeVibesHeader(view: GameView): string {
  return `
    <header class="game__header game__header--code-vibes">
      ${renderScoreBox("blue", view.scoreBlue, "Blue")}
      <p class="game__current">Current player:
        <span class="game__current-player game__current-player--${view.currentPlayer}">${view.currentPlayer}</span>
      </p>
      ${renderScoreBox("orange", view.scoreOrange, "Orange")}
      <button class="game__exit" type="button">Exit</button>
    </header>
  `;
}

/** Returns one score box, marked either by a pawn slot or by a written label. */
function renderScoreBox(player: Player, score: number, label: string | null): string {
  const marker = label === null
    ? `<span class="game__score-pawn" aria-hidden="true"></span>`
    : `<span class="game__score-label">${label}</span>`;
  return `
    <p class="game__score game__score--${player}">
      ${marker}
      <span class="game__score-value">${score}</span>
    </p>
  `;
}

/** Returns the board container sized by the field size, filled with all cards. */
function renderBoard(view: GameView): string {
  const cards = view.cards.map((card) => renderCard(card, view.theme)).join("");
  return `
    <div class="board board--${view.fieldSize}">
      ${cards}
    </div>
  `;
}

/** Returns a single card with its motif, its watermark back and its current state. */
function renderCard(card: CardData, theme: Theme): string {
  const motifNumber = String(card.motifId).padStart(2, "0");
  const motifUrl = new URL(`./assets/cards/${theme}-card-${motifNumber}.png`, import.meta.url).href;
  const flipped = card.isFlipped ? " card--flipped" : "";
  const matched = card.isMatched ? " card--matched" : "";
  return `
    <button class="card${flipped}${matched}" type="button" data-card-id="${card.id}">
      ${renderCardFaces(motifUrl, card.motifId)}
    </button>
  `;
}

/** Returns the flippable inner faces of a card, motif in front and watermark behind. */
function renderCardFaces(motifUrl: string, motifId: number): string {
  return `
    <span class="card__inner">
      <span class="card__front">
        <img class="card__motif" src="${motifUrl}" alt="Card motif ${motifId}" />
      </span>
      <span class="card__back">
        <img class="card__watermark" src="${BACK_URL}" alt="" />
      </span>
    </span>
  `;
}
