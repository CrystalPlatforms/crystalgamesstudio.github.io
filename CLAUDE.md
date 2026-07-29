# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Landing page Crystal Studio (studio gier) — aplikacja SPA w React, hostowana statycznie na GitHub Pages pod własną domeną `crystal-studio.dev` (plik `CNAME`). Strona ma konwertować: prezentuje gry i aplikacje studia oraz zachęca do gry/zakupu.

## Komendy

Menedżer pakietów: **yarn (classic 1.22.22)** — `yarn.lock` jest źródłem prawdy, CI używa yarna. `package-lock.json` został usunięty i jest w `.gitignore` (nie przywracaj go installem npm — generuje duplikaty alertów Dependabot).

- `yarn dev` — serwer deweloperski Vite (http://localhost:5173)
- `yarn build` — `tsc -b && vite build` (najpierw typecheck TypeScript, potem build). **Błędy typów przerywają build i tym samym deploy na GitHub Pages.**
- `yarn test` — Vitest w trybie jednorazowym (`vitest run`); `yarn test:watch` — tryb watch. `tests/rebrand.guard.test.ts` pilnuje spójności nazwy marki.
- `yarn lint` — ESLint (`eslint.config.js`, flat config)
- `yarn preview` — podgląd zbudowanej wersji na porcie 8080

## Architektura

### Routing — HashRouter (ważne)
`src/App.tsx` używa `HashRouter` z `react-router`. Wszystkie linki wewnętrzne działają przez `#/ścieżka`, co jest wymagane dla statycznego hostingu na GitHub Pages (brak serwerowego rewrite'u). `ScrollToTop` resetuje pozycję przy zmianie trasy. Stare ścieżki `/games` i `/apps` przekierowują (`<Navigate>`) na `/products`.

Strona główna (`/`) składa się z sekcji: `HeroSection` → `FeaturesSection` → `ProductsShowcase` → `SocialProofSection` → `GoodBuySection`. Poszczególne produkty to osobne strony w `src/pages/` (np. `Exsize`, `Wspolniak`, `AdmCli`, `Umux`).

### Treść sterowana przez JSON (content-driven)
Cała treść strony głównej żyje w `public/content.json`, a jej kształt opisują typy w `src/types/content.ts`. Hook `useContentData()` pobiera `/content.json` w czasie działania (fetch). **Edytując treść, aktualizuj jednocześnie `content.json` i `types/content.ts`** — muszą być w zgodzie. Komponenty renderują się dopiero po załadowaniu danych (wzorzec `if (!hero) return null`).

### Ikony po nazwie (Lucide)
`content.json` przechowuje ikony jako **string z nazwą**. Mapowanie nazwa → komponent robi `getIconComponent(name)` w `src/utils/helpers.ts` (korzysta z `lucide-react`). Aby dodać ikonę do treści, użyj istniejącej nazwy z Lucide.

### Stylowanie — Tailwind + estetyka "game/neon"
Tailwind v3 z bogatym zestawem własnych animacji i keyframes w `tailwind.config.js` (glow, glitch, scanline, pixelate, rainbowScroll itd.). Dwa pomocniki są kluczowe:
- `cn(...inputs)` w `src/utils/helpers.ts` — łączy `clsx` + `tailwind-merge` (używaj do kompozycji klas).
- `src/utils/game-effects.ts` — eksportuje gotowe stringi klas (np. `pulseAnimation`, `pixelBorder`, `gameButton`, `neonText`, `glowAnimation`); importuj je zamiast powielać klasy ręcznie.

### Linki wewnętrzne vs zewnętrzne
W treści `ctaLink`/`buttonLink` zaczynające się od `/` renderują się jako `<Link>` (react-router); inne jako `<a target="_blank" rel="noopener noreferrer">`. Utrzymuj ten wzorzec przy dodawaniu nowych CTA.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`): przy pushu na `main` uruchamia `yarn install` → `yarn build` → wgryza `dist/` do GitHub Pages (Node 22). Brak osobnego kroku deploy — build i publish dzieją się automatycznie po merge do maina. Vite ma ustawione `base: '/'` i `publicDir: 'public'` (stąd `content.json` i obrazy są serwowane z roota).

**Ważne:** zależności mogą wymagać konkretnej wersji Node — np. `react-router@8` ma `engines.node >=22.22.0`. Przy major bump zależności sprawdź `engines` i ewentualnie podbij `node-version` w workflow.
