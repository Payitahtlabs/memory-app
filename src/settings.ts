import type { FieldSize, Player, Theme } from "./types";
import paletteIcon from "./assets/icons/palette.svg";
import chessPawnIcon from "./assets/icons/chess-pawn.svg";
import styleIcon from "./assets/icons/style.svg";
import arrowSelected from "./assets/icons/arrow-selected.svg";
import underlineHeadline from "./assets/icons/underline-headline.svg";
import smartDisplayIcon from "./assets/icons/smart-display.svg?raw";

interface SettingsOption {
  value: Theme | Player | FieldSize;
  label: string;
  checked?: boolean;
}

interface SettingsGroup {
  title: string;
  icon: string;
  name: string;
  modifier: string;
  options: SettingsOption[];
}

const THEME_OPTIONS: SettingsOption[] = [
  { value: "code-vibes", label: "Code vibes theme", checked: true },
  { value: "gaming", label: "Gaming theme" },
  { value: "da-projects", label: "DA Projects theme" },
];

const PLAYER_OPTIONS: SettingsOption[] = [
  { value: "blue", label: "Blue" },
  { value: "orange", label: "Orange" },
];

const SIZE_OPTIONS: SettingsOption[] = [
  { value: "4x4", label: "16 cards" },
  { value: "4x6", label: "24 cards" },
  { value: "6x6", label: "36 cards" },
];

const GROUPS: SettingsGroup[] = [
  { title: "Game themes", icon: paletteIcon, name: "theme", modifier: "theme", options: THEME_OPTIONS },
  { title: "Choose player", icon: chessPawnIcon, name: "player", modifier: "player", options: PLAYER_OPTIONS },
  { title: "Board size", icon: styleIcon, name: "fieldSize", modifier: "size", options: SIZE_OPTIONS },
];

const BAR_PLACEHOLDERS: string[] = ["Theme", "Player", "Board size"];

/** Returns the complete settings screen markup. */
export function renderSettings(): string {
  return `
    <section class="settings">
      <div class="settings__content">
        ${renderHeader()}
        <div class="settings__layout">
          ${renderLeftColumn()}
          ${renderRightColumn()}
        </div>
      </div>
    </section>
  `;
}

/** Returns the headline with its decorative underline. */
function renderHeader(): string {
  return `
    <header class="settings__header">
      <h1 class="settings__headline">Settings</h1>
      <img class="settings__underline" src="${underlineHeadline}" alt="" />
    </header>
  `;
}

/** Returns the column holding all three option groups. */
function renderLeftColumn(): string {
  return `
    <div class="settings__column">
      ${GROUPS.map(renderGroup).join("")}
    </div>
  `;
}

/** Returns the column holding the theme preview and the selection bar. */
function renderRightColumn(): string {
  return `
    <div class="settings__column settings__column--right">
      <div class="settings__preview"></div>
      ${renderBar()}
    </div>
  `;
}

/** Returns one option group as a fieldset with legend and radio list. */
function renderGroup(group: SettingsGroup): string {
  return `
    <fieldset class="settings__group settings__group--${group.modifier}">
      <legend class="settings__legend">
        <img class="settings__legend-icon" src="${group.icon}" alt="" />
        ${group.title}
      </legend>
      <div class="settings__options">
        ${group.options.map((option) => renderOption(group.name, option)).join("")}
      </div>
    </fieldset>
  `;
}

/** Returns one radio option with its label and selection arrow. */
function renderOption(name: string, option: SettingsOption): string {
  const preselected = option.checked ? " checked" : "";
  return `
    <label class="settings__option">
      <input class="settings__radio" type="radio" name="${name}" value="${option.value}"${preselected} />
      <span class="settings__text">${option.label}</span>
      <img class="settings__arrow" src="${arrowSelected}" alt="" />
    </label>
  `;
}

/** Returns the selection bar with placeholder values and the start button. */
function renderBar(): string {
  return `
    <div class="settings__bar">
      ${BAR_PLACEHOLDERS.map(renderBarEntry).join("")}
      ${renderStartButton()}
    </div>
  `;
}

/** Returns one bar value, preceded by a slash separator when it is not first. */
function renderBarEntry(value: string, index: number): string {
  const separator = index === 0 ? "" : `<span class="settings__slash"></span>`;
  return `${separator}<span class="settings__value">${value}</span>`;
}

/** Returns the disabled start button with its inline icon. */
function renderStartButton(): string {
  return `
    <button class="settings__start" type="button" disabled>
      <span class="settings__start-icon" aria-hidden="true">${smartDisplayIcon}</span>
      <span class="settings__start-label">Start</span>
    </button>
  `;
}

/** Wires up the settings screen interactions. */
export function initSettings(): void {
}
