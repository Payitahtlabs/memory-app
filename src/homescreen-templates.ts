/**
 * Builds the homescreen frame around its finished parts.
 * @param watermark - Finished watermark markup.
 * @param playButton - Finished play button markup.
 * @returns The complete homescreen markup.
 */
export function homescreenTemplate(watermark: string, playButton: string): string {
  return `
    <section class="homescreen">
      ${watermark}
      <div class="homescreen__intro">
        <p class="homescreen__tagline">It’s play time.</p>
        <h1 class="homescreen__headline">Ready to play?</h1>
      </div>
      ${playButton}
    </section>
  `;
}

/**
 * Builds the decorative controller watermark.
 * @param icon - Finished icon markup.
 * @returns The watermark markup.
 */
export function homescreenWatermarkTemplate(icon: string): string {
  return `
    <div class="homescreen__watermark" aria-hidden="true">${icon}</div>
  `;
}

/**
 * Builds the play button with icon, label and both arrow states.
 * @param icon - Finished icon markup.
 * @param defaultArrowUrl - Source of the arrow shown at rest.
 * @param boldArrowUrl - Source of the arrow shown on hover.
 * @returns The play button markup.
 */
export function playButtonTemplate(icon: string, defaultArrowUrl: string, boldArrowUrl: string): string {
  return `
    <button class="homescreen__play" type="button">
      <span class="homescreen__icon" aria-hidden="true">${icon}</span>
      <span class="homescreen__label">Play</span>
      <span class="homescreen__arrow-wrap" aria-hidden="true">
        <img class="homescreen__arrow homescreen__arrow--default" src="${defaultArrowUrl}" alt="" />
        <img class="homescreen__arrow homescreen__arrow--bold" src="${boldArrowUrl}" alt="" />
      </span>
    </button>
  `;
}
