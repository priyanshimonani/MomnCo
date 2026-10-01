# MOM & CO. — Project Instructions

## Project and voice
Create a fun, cute, colourful greeting-card gift from a daughter to her Chartered Accountant mom. Keep all six screens, routes, interactions, and Easter eggs. Copy is playful, warm, first-person, and no more than 10 words per line. Celebrate Mom's brilliance and effort without sexist or gendered stereotypes.

Names and nicknames come from `src/data/config.ts`: `momNickname` defaults to `Mom`; `daughterName` defaults to empty. Use `personalize()` or config values naturally.

## Workflow
1. Read `PROGRESS.md`, `docs/00-plan.md`, and the relevant phase document.
2. Inspect the repository before editing.
3. Preserve existing behavior and dependencies; make only requested changes.
4. Reuse installed fonts and existing helpers. Do not add dependencies.
5. Run `npm run build`; fix all errors.
6. Update `PROGRESS.md` and stop.

## Six screens
1. **Gateway** — existing cover and loader, with a tiny smiling calculator accent.
2. **Highlights** — four count-up cards in butter, mint, sky, and peach; sparklines, patience gauge, and a winking-moon Sleep row.
3. **Financial Statements** — preserve Balance Sheet / P&L / Cash Flow tabs, Net Worth glitch, hugs toggle, and waterfall.
4. **Audit** — preserve sequential controls, the rest failure, and slow-press approval stamp; use mint for PASS and coral for FAIL.
5. **Board Resolution / Dividend** — preserve DSC token, PIN, hold-to-sign, and hug reveal; style the document as a golden ticket.
6. **Thank You** — preserve configured closing lines, signature, Replay, and a single small heart/sparkle moment.

Keep Continue navigation and six progress dots. The top bar contains the logo, theme toggle, and profile menu. Preserve Logout (“Nice try.”), Delete account (“Requires approval from Mom.”), the dark-mode toast, 404 (“Third drawer.”), and logo ×7 reset.

## Colour and visual direction
Use warm cream `#FFF8EC`, cocoa text `#3A2A2E`, and six cheerful pastel tones: butter `#FFE27A`, mint `#B8EBD0`, sky `#BFE3FF`, peach `#FFC9A3`, lilac `#DCCBFF`, and coral-pink `#FFB3C1`. Pink is one accent only, never the dominant colour. Primary buttons use teal `#167C7A` or tomato `#F2545B` with white text. Cards use solid pastel fill, a 2px hue-matched outline, 20px radius, and a soft 4px offset sticker shadow. Dark mode uses plum-navy `#251B33`, dimmed card colours, and light text.

Keep layouts clean and playful, with at most two or three small, deliberate decorative details per screen. Use lucide icons in coloured round badges; avoid clutter, random rotation, washi, and scribbly decoration. Heading stacks are Fraunces-like, UI uses Nunito-like sans, and Caveat-like handwriting is limited to short sticker labels and the final signature. Reuse self-hosted Newsreader and IBM Plex files with graceful fallbacks; do not add fonts.

Use 40–48px headings, 48–56px metric values, 15–16px labels, a 1100px content width, 24–32px page padding, 20px card padding, 16px gaps, and 44–48px pill buttons. Fit every desktop screen inside `100dvh` with a compact header and bottom Continue/progress footer. Highlights use four columns on desktop and 2×2 on tablet. Statements, Audit, and Dividend should be compact and side-by-side where practical. Mobile may scroll vertically.

Animate metric cards with a brief stagger, give count-ups a gentle pop, make buttons squish, and let approval/closing sparkles appear once. Honour `prefers-reduced-motion`. Preserve semantic landmarks, keyboard access, live announcements, accessible contrast, inline SVG charts, and typed local data. No photos, mascots, backend, network calls, analytics, or new dependencies.
