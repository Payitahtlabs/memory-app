import controllerIcon from "./assets/icons/stadia-controller.svg?raw";
import arrowDefault from "./assets/icons/arrow-right.svg";
import arrowBold from "./assets/icons/arrow-right-bold.svg";
import { homescreenTemplate, homescreenWatermarkTemplate, playButtonTemplate } from "./homescreen-templates";

/**
 * Collects the watermark and the play button of the homescreen.
 * @returns The complete homescreen markup.
 */
export function renderHomescreen(): string {
  const watermark = renderWatermark();
  const playButton = renderPlayButton();
  return homescreenTemplate(watermark, playButton);
}

/**
 * Hands the controller icon to the watermark template.
 * @returns The watermark markup.
 */
function renderWatermark(): string {
  return homescreenWatermarkTemplate(controllerIcon);
}

/**
 * Hands the icon and both arrow images to the play button template.
 * @returns The play button markup.
 */
function renderPlayButton(): string {
  return playButtonTemplate(controllerIcon, arrowDefault, arrowBold);
}

/**
 * Attaches the click handler that leads away from the homescreen.
 * @param onPlay - Callback run when the play button is clicked.
 */
export function initPlayButton(onPlay: () => void): void {
  const button = document.querySelector(".homescreen__play");
  button?.addEventListener("click", onPlay);
}
