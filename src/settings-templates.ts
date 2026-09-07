import type { FieldSize, Player, Theme } from "./types";

/**
 * Builds the settings screen frame around its finished parts.
 * @param header - Finished header markup.
 * @param leftColumn - Finished markup of the option column.
 * @param rightColumn - Finished markup of the preview column.
 * @returns The complete settings screen markup.
 */
export function settingsTemplate(header: string, leftColumn: string, rightColumn: string): string {
  return `
    <section class="settings">
      <div class="settings__content">
        ${header}
        <div class="settings__layout">
          ${leftColumn}
          ${rightColumn}
        </div>
      </div>
    </section>
  `;
}

/**
 * Builds the headline with its decorative underline.
 * @param underlineUrl - Source of the underline image.
 * @returns The settings header markup.
 */
export function settingsHeaderTemplate(underlineUrl: string): string {
  return `
    <header class="settings__header">
      <h1 class="settings__headline">Settings</h1>
      <img class="settings__underline" src="${underlineUrl}" alt="" />
    </header>
  `;
}

/**
 * Builds the column around its finished option groups.
 * @param groups - Finished markup of all option groups, already joined.
 * @returns The left column markup.
 */
export function leftColumnTemplate(groups: string): string {
  return `
    <div class="settings__column">
      ${groups}
    </div>
  `;
}

/**
 * Builds the column holding the theme preview and its finished selection bar.
 * @param bar - Finished selection bar markup.
 * @returns The right column markup.
 */
export function rightColumnTemplate(bar: string): string {
  return `
    <div class="settings__column settings__column--right">
      <div class="settings__preview"></div>
      ${bar}
    </div>
  `;
}

/**
 * Builds one option group as a fieldset with legend and radio list.
 * @param modifier - Name appended to the group block class.
 * @param iconUrl - Source of the legend icon.
 * @param title - Written title of the group.
 * @param options - Finished markup of all radio options, already joined.
 * @returns The option group markup.
 */
export function groupTemplate(modifier: string, iconUrl: string, title: string, options: string): string {
  return `
    <fieldset class="settings__group settings__group--${modifier}">
      <legend class="settings__legend">
        <img class="settings__legend-icon" src="${iconUrl}" alt="" />
        ${title}
      </legend>
      <div class="settings__options">
        ${options}
      </div>
    </fieldset>
  `;
}

/**
 * Builds one radio option with its label and selection arrow.
 * @param name - Radio group the option belongs to.
 * @param value - Value the option carries.
 * @param preselected - Checked attribute of a preselected option, or an empty string.
 * @param label - Written label of the option.
 * @param arrowUrl - Source of the selection arrow image.
 * @returns The radio option markup.
 */
export function optionTemplate(name: string, value: Theme | Player | FieldSize, preselected: string, label: string, arrowUrl: string): string {
  return `
    <label class="settings__option">
      <input class="settings__radio" type="radio" name="${name}" value="${value}"${preselected} />
      <span class="settings__text">${label}</span>
      <img class="settings__arrow" src="${arrowUrl}" alt="" />
    </label>
  `;
}

/**
 * Builds the selection bar around its finished entries and start button.
 * @param entries - Finished markup of all bar segments, already joined.
 * @param startButton - Finished start button markup.
 * @returns The selection bar markup.
 */
export function barTemplate(entries: string, startButton: string): string {
  return `
    <div class="settings__bar">
      ${entries}
      ${startButton}
    </div>
  `;
}

/**
 * Builds one bar segment, carrying its width reservation.
 * @param separator - Finished slash markup, or an empty string.
 * @param reserve - Longest text the segment reserves width for.
 * @param value - Text shown in the segment.
 * @returns The bar segment markup.
 */
export function barEntryTemplate(separator: string, reserve: string, value: string): string {
  return `${separator}<span class="settings__value" data-reserve="${reserve}">${value}</span>`;
}

/**
 * Builds the slash that separates two bar segments.
 * @returns The separator markup.
 */
export function barSlashTemplate(): string {
  return `<span class="settings__slash"></span>`;
}

/**
 * Builds the disabled start button around its finished icon.
 * @param icon - Finished icon markup.
 * @returns The start button markup.
 */
export function startButtonTemplate(icon: string): string {
  return `
    <button class="settings__start" type="button" disabled>
      <span class="settings__start-icon" aria-hidden="true">${icon}</span>
      <span class="settings__start-label">Start</span>
    </button>
  `;
}
