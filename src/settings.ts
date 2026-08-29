import type { FieldSize, GameSettings, Player, Theme, StartSettings } from "./types";
import paletteIcon from "./assets/icons/palette.svg";
import chessPawnIcon from "./assets/icons/chess-pawn.svg";
import styleIcon from "./assets/icons/style.svg";
import arrowSelected from "./assets/icons/arrow-selected.svg";
import underlineHeadline from "./assets/icons/underline-headline.svg";
import smartDisplayIcon from "./assets/icons/smart-display.svg?raw";

const gameSettings: GameSettings = {
  theme: null,
  player: null,
  fieldSize: null,
};

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
const BAR_LABELS: Record<Theme | Player | FieldSize, string> = {
  "code-vibes": "Code vibes",
  "gaming": "Gaming",
  "da-projects": "DA Projects",
  "blue": "Blue Player",
  "orange": "Orange Player",
  "4x4": "Board-16 Cards",
  "4x6": "Board-24 Cards",
  "6x6": "Board-36 Cards",
};

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

/** Returns the value of the checked radio input in the given group, or null. */
function readChecked(group: string): string | null {
  const input = document.querySelector<HTMLInputElement>(`input[name="${group}"]:checked`);
  return input?.value ?? null;
}

/** Writes a changed radio value into the settings state. Returns whether the group was known. */
function applySettingValue(input: HTMLInputElement): boolean {
  switch (input.name) {
    case "theme":
      gameSettings.theme = input.value as Theme;
      return true;
    case "player":
      gameSettings.player = input.value as Player;
      return true;
    case "fieldSize":
      gameSettings.fieldSize = input.value as FieldSize;
      return true;
    default:
      return false;
  }
}

/** Updates the game settings state from a changed radio input. */
function handleSettingsChange(event: Event): void {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (applySettingValue(input)) syncSettingsUi();
}

/** Mirrors the settings state into the selection bar texts. */
function syncBarValues(): void {
  const values = [gameSettings.theme, gameSettings.player, gameSettings.fieldSize];
  const entries = document.querySelectorAll(".settings__bar .settings__value");
  values.forEach((value, index) => {
    const entry = entries[index];
    if (entry) entry.textContent = value ? BAR_LABELS[value] : BAR_PLACEHOLDERS[index];
  });
}

/** Enables the start button and diamond slashes once all settings are chosen. */
function syncBarState(): void {
  const complete = gameSettings.theme !== null
    && gameSettings.player !== null
    && gameSettings.fieldSize !== null;
  const button = document.querySelector<HTMLButtonElement>(".settings__start");
  if (button) button.disabled = !complete;
  document.querySelectorAll(".settings__slash").forEach((slash) => {
    slash.classList.toggle("settings__slash--diamond", complete);
  });
}

/** Applies the chosen theme to the document root for theme styling. */
function syncTheme(): void {
  if (gameSettings.theme) {
    document.body.dataset.theme = gameSettings.theme;
  } else {
    delete document.body.dataset.theme;
  }
}

/** Mirrors the settings state into bar, button, and document theme. */
function syncSettingsUi(): void {
  syncBarValues();
  syncBarState();
  syncTheme();
}

/** Wires up the settings screen interactions. */
export function initSettings(): void {
  gameSettings.theme = readChecked("theme") as Theme | null;
  gameSettings.player = readChecked("player") as Player | null;
  gameSettings.fieldSize = readChecked("fieldSize") as FieldSize | null;
  const screen = document.querySelector(".settings");
  screen?.addEventListener("change", handleSettingsChange);
  syncSettingsUi();
}

export function getStartSettings(): StartSettings | null {
  if (gameSettings.theme === null || gameSettings.player === null
    || gameSettings.fieldSize === null) {
    return null;
  }
  return {
    theme: gameSettings.theme,
    player: gameSettings.player,
    fieldSize: gameSettings.fieldSize,
  };
}
