# Memory — Card Matching Game

A classic memory card game with selectable board sizes, themes and
two-player mode, built with TypeScript, SCSS and Vite.

> 🚧 **Work in progress** — this project is under active development
> as part of my frontend training. Features are added incrementally;
> a live demo and screenshots will follow.

## About

Memory is a solo project developed at Developer Akademie. Two players
take turns flipping cards to find matching pairs — with configurable
board sizes, player colors and visual themes.

After several projects built deliberately without any tooling, this
is my first project using a build setup. The Vite + TypeScript + SCSS
stack was configured manually instead of using a scaffolding command,
to understand what each piece of the toolchain actually does.

## Tech Stack

- **TypeScript** — typed application logic, strict mode
- **SCSS** — styling, compiled by Vite
- **Vite** — dev server with hot module replacement and production
  bundler
- No frameworks — DOM and game logic are hand-written

## Planned Features

The planned scope:

- Start screen with an animated controller icon
- Settings: player colors, board size (4x4 / 4x6 / 6x6) and a choice
  of visual themes that affect both color scheme and card motifs
- Game board with score display, current-player indicator and smooth
  3D card-flip animations
- Game-over screen announcing the winner, with the option to start a
  new round

This section will turn into a regular feature list as the features
are implemented.

## Local Development

Requires [Node.js](https://nodejs.org/) (LTS recommended).

```bash
git clone https://github.com/Payitahtlabs/memory-app.git
cd memory-app
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check (`tsc --noEmit`), then create an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally |

## Project Structure

```
memory-app/
├── index.html          # entry HTML, loads src/main.ts as a module
├── src/
│   ├── main.ts         # application entry point
│   └── styles/
│       └── style.scss  # main stylesheet, imported in main.ts
├── tsconfig.json       # TypeScript configuration (strict, noEmit)
└── package.json        # project metadata and npm scripts
```
