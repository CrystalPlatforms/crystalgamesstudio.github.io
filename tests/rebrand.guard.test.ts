import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import content from '../public/content.json'

// Rebrand guard — Faza 1: ujednolicenie displayowej nazwy marki na „Crystal Studio"
// i przełączenie domeny na crystal-studio.dev. Testy chronią przed regresją rebrandu.

// Łapie STARE warianty nazwy: „CrystalGames" (bez spacji) oraz „Crystal Games Studio".
// Celowo NIE łapie poprawnej nazwy „Crystal Studio" (brak słowa Game(s)).
const OLD_NAME = /CrystalGames|Crystal\s+Games?\s+Studio/i

// Łapie tylko DISPLAYOWĄ starą nazwę (ze spacją przed "Studio"). Celowo NIE łapie
// camelCase identyfikatorów "CrystalGamesStudio" (URL-e GitHub/npm/brew, handle
// YouTube, GITHUB_REPO_OWNER) — te zostają do migracji w Fazach 3–5.
const OLD_DISPLAY = /CrystalGames\s+Studio|Crystal\s+Games?\s+Studio/i

// Czyta plik jako tekst (ścieżki względem cwd = root projektu).
const readFile = (name: string) => readFileSync(name, 'utf-8')

// Rekursywnie zbiera ścieżki plików w katalogu.
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

const rootFiles = ['public/content.json', 'index.html']
const srcFiles = walk('src').filter((file) => /\.(t|j)sx?$/.test(file))
const allSourceFiles = [...rootFiles, ...srcFiles]

describe('Rebrand guard — Crystal Studio (Faza 1)', () => {
  describe('footer copyright', () => {
    it('uses the unified display name "Crystal Studio."', () => {
      expect(content.footer.copyright).toBe('Crystal Studio.')
    })
  })

  describe('display name across content.json', () => {
    it('header brand text is "Crystal Studio"', () => {
      expect(content.header.text).toBe('Crystal Studio')
    })

    it('hero headline is split into two lines: "Welcome to" / "Crystal Studio"', () => {
      expect(content.hero.headline).toBe('Welcome to')
      expect(content.hero.headlineAccent).toBe('Crystal Studio')
    })

    it('goodBuy quote uses "Crystal Studio"', () => {
      expect(content.goodBuy.quote.text).toBe(
        'Crystal Studio brings innovation and fun together in every product!'
      )
    })

    it('mentions the studio in FAQ only as "Crystal Studio" (never old variants)', () => {
      const faqTexts: string[] = []
      for (const category of content.faq.categories) {
        for (const item of category.items) {
          faqTexts.push(item.question, item.answer)
        }
      }
      const offenders = faqTexts.filter((text) => OLD_NAME.test(text))
      expect(offenders).toEqual([])
    })
  })

  describe('browser tab title (index.html)', () => {
    it('tab title is "Crystal Studio"', () => {
      expect(readFile('index.html')).toContain('<title>Crystal Studio</title>')
    })
  })

  describe('domain (CNAME + footer copyrightLink)', () => {
    it('CNAME points to crystal-studio.dev', () => {
      expect(readFile('CNAME').trim()).toBe('crystal-studio.dev')
    })

    it('footer copyrightLink points to crystal-studio.dev', () => {
      expect(content.footer.copyrightLink).toBe('https://crystal-studio.dev')
    })
  })

  describe('header brand (Header.tsx)', () => {
    it('displays "Crystal Studio" as the hardcoded brand name', () => {
      const header = readFile('src/components/layout/Header.tsx')
      // display name present
      expect(header).toContain('Crystal Studio')
      // old display variant gone (note the space: "CrystalGames Studio", not the
      // GitHub URL "CrystalGamesStudio" which intentionally stays — Phase 3)
      expect(header).not.toContain('CrystalGames Studio')
    })
  })

  describe('legal/about pages', () => {
    it('About.tsx uses "Crystal Studio" (no old display name)', () => {
      const about = readFile('src/pages/About.tsx')
      expect(about).toContain('Crystal Studio')
      expect(about).not.toMatch(OLD_NAME)
    })

    it('Terms.tsx uses "Crystal Studio" (no old display name)', () => {
      const terms = readFile('src/pages/Terms.tsx')
      expect(terms).toContain('Crystal Studio')
      expect(terms).not.toMatch(OLD_NAME)
    })
  })

  describe('global leak guard', () => {
    it('no source file contains the old DISPLAY name (space before "Studio")', () => {
      const offenders: string[] = []
      for (const file of allSourceFiles) {
        const lines = readFile(file).split('\n')
        lines.forEach((line, index) => {
          if (OLD_DISPLAY.test(line)) {
            offenders.push(`${file}:${index + 1} ${line.trim()}`)
          }
        })
      }
      expect(offenders).toEqual([])
    })

    it('external identifiers (GitHub/brew) are intentionally kept until migration', () => {
      const header = readFile('src/components/layout/Header.tsx')
      const admCli = readFile('src/pages/AdmCli.tsx')
      expect(header).toContain('github.com/CrystalGamesStudio')
      expect(admCli).toContain('CrystalGamesStudio/tap')
    })
  })
})
