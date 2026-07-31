import { describe, it, expect } from 'vitest'
import content from '../public/content.json'

// Games guard — issue #27 „Games FIX".
// Chroni przed regresją: gry osadzane przez iframe na trasach /schools-out
// i /coin-collector muszą mieć poprawne, LIVE URL-e wdrożeń (GitHub Pages
// w org CrystalPlatforms). Bez tego „Play Now" prowadzi do pustej strony
// (dokładnie ten bug opisuje issue #27). Źródłem prawdy gier są ich własne
// repo (CrystalPlatforms/schools-out, /coin-collector) — landing page je
// tylko osadza, NIE używa itch.io.

const GAMES_URLS: Record<string, string> = {
  'schools-out': 'https://crystalplatforms.github.io/schools-out/',
  'coin-collector': 'https://crystalplatforms.github.io/coin-collector/',
}

const gameItems = content.games.items
const findGame = (slug: string) => gameItems.find((g) => g.slug === slug)

describe('Games — osadzanie gier przez iframe (issue #27)', () => {
  describe('sekcja games w content.json', () => {
    it('zawiera obie gry (schools-out, coin-collector)', () => {
      expect(findGame('schools-out')).toBeDefined()
      expect(findGame('coin-collector')).toBeDefined()
    })

    it('każda gra ma poprawny LIVE URL wdrożenia (crystalplatforms.github.io)', () => {
      for (const [slug, expectedSrc] of Object.entries(GAMES_URLS)) {
        const game = findGame(slug)
        expect(game, `brak gry ${slug}`).toBeDefined()
        expect(game?.src, `zły src dla ${slug}`).toBe(expectedSrc)
        // URL-e gier zawsze wskazują wdrożenie GitHub Pages w org CrystalPlatforms
        // (nigdy itch.io ani inny zewnętrzny hosting gier).
        expect(game?.src).toMatch(/^https:\/\/crystalplatforms\.github\.io\//)
      }
    })
  })

  describe('spójność linków „Play Now" ze slugami gier', () => {
    it(`karta showcase „School's Out!" linkuje do /schools-out`, () => {
      const item = content.productsShowcase.items.find((i) => i.title === "School's Out!")
      expect(item?.buttonLink).toBe('/schools-out')
    })

    it('karta showcase „Coin Collector" linkuje do /coin-collector', () => {
      const item = content.productsShowcase.items.find((i) => i.title === 'Coin Collector')
      expect(item?.buttonLink).toBe('/coin-collector')
    })
  })
})
