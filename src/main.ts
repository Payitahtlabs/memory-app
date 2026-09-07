import "./styles/style.scss";
import { initPlayButton, renderHomescreen } from "./homescreen";
import { getStartSettings, initSettings, renderSettings } from "./settings";
import { getGameView, startGame } from "./game";
import { renderGame, initGame, FLIP_DURATION_MS } from "./game-screen";
import { initResult, renderGameOver, renderResult } from "./game-over-screen";
import type { GameResult } from "./types";

const CONTENT = document.getElementById("content") as HTMLElement;

const GAME_OVER_DELAY_MS = 1500;

/** Starts the app on the homescreen. */
function init(): void {
  showHome();
}

/** Replaces the current screen with the homescreen and wires it up. */
function showHome(): void {
  CONTENT.innerHTML = renderHomescreen();
  initPlayButton(showSettings);
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

/**
 * Lets the last flip finish, then shows the final score and, after a pause, the result.
 * @param result - Result of the finished game.
 */
function showGameOver(result: GameResult): void {
  setTimeout(() => {
    const view = getGameView();
    if (!view) return;
    CONTENT.innerHTML = renderGameOver(view);
    setTimeout(() => showResult(result), GAME_OVER_DELAY_MS);
  }, FLIP_DURATION_MS);
}

/**
 * Replaces the current screen with the result screen and wires it up.
 * @param result - Result of the finished game.
 */
function showResult(result: GameResult): void {
  const view = getGameView();
  if (!view) return;
  CONTENT.innerHTML = renderResult(result, view.theme);
  initResult(showHome);
}

init();
