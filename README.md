# MOM & CO. — A greeting-card gift

A bright, playful six-screen gift from a daughter to her Chartered Accountant mom. Accounting references are affectionate inside jokes; everything runs locally in the browser.

## Run locally

Requirements: Node.js 18 or newer and npm.

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` to a static host. The app uses `HashRouter` and relative Vite assets.

## Personalize

Edit `src/data/config.ts`:

- `momNickname`: Mom's preferred nickname; defaults to `Mom`.
- `daughterName`: Optional sign-off name; defaults to an affectionate role.
- `closingLines`: Short, first-person lines for the final screen.

Highlight values and labels live in `src/data/highlights.ts`; ledger entries in `src/data/statements.ts`; checklist copy in `src/data/controls.ts`.

Keep copy warm, playful, and no more than 10 words per line. Celebrate Mom's brilliance and effort without gender stereotypes. The compact greeting-card layout fits on one desktop screen; mobile may scroll. No photos or new dependencies.
