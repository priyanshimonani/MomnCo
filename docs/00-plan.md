# MOM & CO. — A greeting-card gift

## Experience
A bright, playful six-screen gift from a daughter to her Chartered Accountant mom. Keep the existing interactions and Easter eggs. Copy is warm, first-person, and no more than 10 words per line. Celebrate Mom's brilliance and effort without gender stereotypes.

Personalization lives in `src/data/config.ts`: `momNickname` defaults to `Mom`; `daughterName` defaults to empty.

## Six screens
1. **Gateway** — current report cover, smiling calculator accent, Open button, and verification loader.
2. **Highlights** — four count-up cards in distinct pastel colours, sparklines, patience gauge, winking moon, and compact Sleep row.
3. **Financial Statements** — preserve Balance Sheet / P&L / Cash Flow tabs, Net Worth glitch, hugs toggle, and waterfall.
4. **Audit** — preserve the sequential checklist and rest failure; click or tap to position and apply the approval stamp.
5. **Board Resolution / Dividend** — present Mom's dividend certificate, collect a drawn signature, submit for approval, and reveal the credited dividend.
6. **Thank You** — stage a full-screen cinematic reveal from final statement and “PRICELESS” through the dissolving accounting terms, personal birthday message, and final Replay.

## Navigation and Easter eggs
Use sequential Continue navigation and six progress dots. The top bar contains the logo, theme toggle, and profile menu. Preserve Logout (“Nice try.”), Delete account (“Requires approval from Mom.”), the dark-mode toast, 404 (“Third drawer.”), and logo ×7 reset.

## Visual direction
Use a cream `#FFFDF5` background with a 12–15% dot-grid pattern, crisp white cards, subtle `#E8E4DA` borders, and soft teal ambient shadows. Retain the exact accents: pastel blue `#C3E3FD`, warm yellow `#FDE381`, mint `#BCEAD5`, blush pink `#FBC0C7`, and deep teal `#1D7A75`. Use accents for badges, status tags, and small highlights rather than full card fills. Do not use glassmorphism or backdrop blur.

Use elegant Newsreader serif headings, IBM Plex Sans body copy and numbers, uppercase pill badges with wide letter spacing, and fully rounded teal CTAs with white text. Keep decorations deliberate and sparse, layouts tidy, and all desktop screens within `100dvh`; mobile may scroll vertically. Use 40–48px headings, 48–56px metrics, 15–16px labels, a 1100px content width, 24–32px gutters, 20px card padding, 16px gaps, and 44–48px pill buttons. Highlights have four desktop columns and 2×2 tablet cards.

Reuse the installed self-hosted fonts, lucide icons, and inline SVG charts. Add no font or other dependencies.

## Technical boundaries
Static React/Vite/TypeScript app with `HashRouter`, typed local data, reduced-motion support, and accessible keyboard interactions. No network calls, backend, photos, or personal images.
