import "./styles/style.scss";
import { getStartSettings, initSettings, renderSettings } from "./settings";
import { getGameView, startGame } from "./game";
import { renderGame } from "./game-screen";
import controllerIcon from "./assets/icons/stadia-controller.svg?raw";
import arrowDefault from "./assets/icons/arrow-right.svg";
import arrowBold from "./assets/icons/arrow-right-bold.svg";

const CONTENT = document.getElementById("content") as HTMLElement;

/** Renders the homescreen and wires up its interactions. */
function init(): void {
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
}

init();
