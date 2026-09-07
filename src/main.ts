import "./styles/style.scss";
import { getStartSettings, initSettings, renderSettings } from "./settings";
import { getGameView, startGame } from "./game";
import { renderGame, initGame, FLIP_DURATION_MS } from "./game-screen";
import { initResult, renderGameOver, renderResult } from "./game-over-screen";
import type { GameResult } from "./types";
import controllerIcon from "./assets/icons/stadia-controller.svg?raw";
import arrowDefault from "./assets/icons/arrow-right.svg";
import arrowBold from "./assets/icons/arrow-right-bold.svg";

const CONTENT = document.getElementById("content") as HTMLElement;

const GAME_OVER_DELAY_MS = 1500;

/** Starts the app on the homescreen. */
function init(): void {
  showHome();
}

/** Replaces the current screen with the homescreen and wires it up. */
function showHome(): void {
  CONTENT.innerHTML = renderHomescreen();
  initPlayButton();
}

/** Returns the complete homescreen markup. */
function renderHomescreen(): string {
  return `
    <section class="homescreen">
      ${renderWatermark()}
      <div class="homescreen__intro">
        <p class="homescreen__tagline">It’s play time.</p>
        <h1 class="homescreen__headline">Ready to play?</h1>
      </div>
      ${renderPlayButton()}
    </section>
  `;
}

/** Returns the decorative controller watermark. */
function renderWatermark(): string {
  return `
    <div class="homescreen__watermark" aria-hidden="true">${controllerIcon}</div>
  `;
}

/** Returns the play button with icon, label and both arrow states. */
function renderPlayButton(): string {
  return `
    <button class="homescreen__play" type="button">
      <span class="homescreen__icon" aria-hidden="true">${controllerIcon}</span>
      <span class="homescreen__label">Play</span>
      <span class="homescreen__arrow-wrap" aria-hidden="true">
        <img class="homescreen__arrow homescreen__arrow--default" src="${arrowDefault}" alt="" />
        <img class="homescreen__arrow homescreen__arrow--bold" src="${arrowBold}" alt="" />
      </span>
    </button>
  `;
}

/** Attaches the click handler that leads to the settings page. */
function initPlayButton(): void {
  const button = document.querySelector(".homescreen__play");
  button?.addEventListener("click", showSettings);
}

/** Replaces the current screen with the settings screen and wires it up. */
function showSettings(): void {
  CONTENT.innerHTML = renderSettings();
  initSettings(showGame);
}

/** Starts a game from the chosen settings and renders the game screen. */
function showGame(): void {
  const settings = getStartSettings();
  if (!settings) return;
  startGame(settings.theme, settings.fieldSize, settings.player);
  const view = getGameView();
  if (!view) return;
  CONTENT.innerHTML = renderGame(view);
  initGame(showSettings, showGameOver);
}

/** Lets the last flip finish, then shows the final score and, after a pause, the result. */
function showGameOver(result: GameResult): void {
  setTimeout(() => {
    const view = getGameView();
    if (!view) return;
    CONTENT.innerHTML = renderGameOver(view);
    setTimeout(() => showResult(result), GAME_OVER_DELAY_MS);
  }, FLIP_DURATION_MS);
}

/** Replaces the current screen with the result screen and wires it up. */
function showResult(result: GameResult): void {
  const view = getGameView();
  if (!view) return;
  CONTENT.innerHTML = renderResult(result, view.theme);
  initResult(showHome);
}

init();
