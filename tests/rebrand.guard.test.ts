import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import content from '../public/content.json'

// Rebrand guard — Faza 1: ujednolicenie displayowej nazwy marki na „Crystal Studio"
// i przełączenie domeny na crystal-studio.dev. Testy chronią przed regresją rebrandu.

// Łapie STARE warianty nazwy: „CrystalGames" (bez spacji) oraz „Crystal Games Studio".
// Celowo NIE łapie poprawnej nazwy „Crystal Studio" (brak słowa Game(s)).
const OLD_NAME = /CrystalGames|Crystal\s+Games?\s+Studio/i

// Łapie tylko DISPLAYOWĄ starą nazwę (ze spacją przed "Studio"). Celowo NIE łapie
// camelCase identyfikatorów "CrystalGamesStudio" (historyczne URL-e GitHub/npm/brew,
// handle YouTube, GITHUB_REPO_OWNER) — zostały zmigrowane w Fazach 3–5 (sekcje guard
// poniżej), ale OLD_DISPLAY celowo ich nie łapie, by nie kolidować z guardami faz.
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

    it('Homebrew tap points to CrystalPlatforms/tap (Phase 4 migration done)', () => {
      const admCli = readFile('src/pages/AdmCli.tsx')
      // Faza 4: tap zmigrowany na CrystalPlatforms/tap (repo homebrew-tap).
      // Pakiet @crystalplatforms/adm przeopublikowany, instalacja zweryfikowana.
      expect(admCli).toContain('CrystalPlatforms/tap')
      expect(admCli).not.toContain('CrystalGamesStudio/tap')
    })
  })
})

// Rebrand guard — Faza 2: pełne logo „Crystal Studio" w nagłówku (issue #23).
// Chroni przed regresją: nagłówek musi renderować pełne logo, a martwy
// pusty plik crystal-icon.svg ma zniknąć.
describe('Rebrand guard — pełne logo w nagłówku (Faza 2)', () => {
  it('header renders the full logo asset (referenced in source + file exists and is non-empty)', () => {
    const header = readFile('src/components/layout/Header.tsx')
    expect(header).toContain('/images/CrystalLogo.png')

    const stat = statSync('public/images/CrystalLogo.png')
    expect(stat.size).toBeGreaterThan(0)
  })

  it('logo <img> has non-empty alt text for screen readers', () => {
    const header = readFile('src/components/layout/Header.tsx')
    expect(header).toContain('alt="Crystal Studio"')
  })

  it('logo is static — no hover expansion and no pulse/glow animation', () => {
    const header = readFile('src/components/layout/Header.tsx')
    expect(header).not.toContain('group-hover')
    expect(header).not.toContain('glowAnimation')
  })

  it('favicon is referenced in index.html and the file exists', () => {
    const html = readFile('index.html')
    expect(html).toContain('href="/favicon.ico"')
    expect(statSync('public/favicon.ico').size).toBeGreaterThan(0)
  })

  it('dead empty placeholder crystal-icon.svg is removed from assets', () => {
    expect(existsSync('public/images/crystal-icon.svg')).toBe(false)
  })
})

// Rebrand guard — Faza 3: linki GitHub → organizacja CrystalPlatforms (issue #24).
// Uwaga: docelowo org miał się nazywać „CrystalStudio", ale ta nazwa była zajęta
// na GitHubie, więc org został przemianowany na „CrystalPlatforms". Brand strony
// („Crystal Studio") i domena (crystal-studio.dev) pozostają bez zmian — to tylko
// identyfikator orgu GitHub.
// Chroni przed regresją: wszystkie klikalne linki github.com/ wskazują nowy org
// CrystalPlatforms; stary org CrystalGamesStudio w linkach github.com/ znika.
// Uwaga: raw.githubusercontent (instalatory), npm scope i Homebrew tap zostają
// do Fazy 4 — guard używa /github\.com\/CrystalGamesStudio/, który nie łapie
// githubusercontent.com ani brew tap, więc fazy są czysto oddzielone.
describe('Rebrand guard — linki GitHub → CrystalPlatforms (Faza 3)', () => {
  describe('Header — link do profilu organizacji', () => {
    it('points to CrystalPlatforms (not the old CrystalGamesStudio org)', () => {
      const header = readFile('src/components/layout/Header.tsx')
      expect(header).toContain('github.com/CrystalPlatforms')
      expect(header).not.toContain('github.com/CrystalGamesStudio')
    })
  })

  describe('Umux — link do repozytorium produktu', () => {
    it('product page + showcase link point to CrystalPlatforms/umux', () => {
      const umux = readFile('src/pages/Umux.tsx')
      const products = readFile('src/pages/Products.tsx')
      expect(umux).toContain('github.com/CrystalPlatforms/umux')
      expect(products).toContain('github.com/CrystalPlatforms/umux')
      expect(umux).not.toContain('github.com/CrystalGamesStudio/umux')
      expect(products).not.toContain('github.com/CrystalGamesStudio/umux')
    })
  })

  describe('ADM-CLI — link do repozytorium produktu', () => {
    it('product page + showcase link point to CrystalPlatforms/ADM-CLI (not MrCrypto-star)', () => {
      const admCli = readFile('src/pages/AdmCli.tsx')
      const products = readFile('src/pages/Products.tsx')
      expect(admCli).toContain('github.com/CrystalPlatforms/ADM-CLI')
      expect(products).toContain('github.com/CrystalPlatforms/ADM-CLI')
      expect(admCli).not.toContain('github.com/MrCrypto-star/ADM-CLI')
      expect(products).not.toContain('github.com/MrCrypto-star/ADM-CLI')
    })
  })

  describe('Egrator — martwa strona usuniętego produktu', () => {
    it('GITHUB_REPO_OWNER points to CrystalPlatforms (api.github.com)', () => {
      const egrator = readFile('src/pages/Egrator.tsx')
      expect(egrator).toContain("GITHUB_REPO_OWNER = 'CrystalPlatforms'")
      expect(egrator).not.toContain("GITHUB_REPO_OWNER = 'CrystalGamesStudio'")
    })
  })

  describe('global leak guard — Faza 3', () => {
    // /github\.com\/CrystalGamesStudio/ celowo nie łapie raw.githubusercontent.com
    // (instalatory), CrystalGamesStudio/tap (Homebrew) ani @crystalgames (npm) —
    // te zostają do Fazy 4. Łapie tylko klikalne linki github.com/<org>.
    it('no clickable github.com/ link references the old CrystalGamesStudio org', () => {
      const offenders: string[] = []
      for (const file of allSourceFiles) {
        const lines = readFile(file).split('\n')
        lines.forEach((line, index) => {
          if (/github\.com\/CrystalGamesStudio/.test(line)) {
            offenders.push(`${file}:${index + 1} ${line.trim()}`)
          }
        })
      }
      expect(offenders).toEqual([])
    })

    it('no source file references the old personal ADM-CLI owner MrCrypto-star', () => {
      const offenders = allSourceFiles.filter((file) =>
        readFile(file).includes('MrCrypto-star')
      )
      expect(offenders).toEqual([])
    })
  })
})

// Sekcja products na stronie głównej — chroni układ kart produktów.
describe('Products showcase (sekcja products)', () => {
  it('ExSize is listed before the "More Coming Soon" card', () => {
    const titles = content.productsShowcase.items.map((i) => i.title)
    const exsizeIndex = titles.indexOf('ExSize')
    const comingSoonIndex = titles.indexOf('More Coming Soon')
    expect(exsizeIndex).toBeGreaterThanOrEqual(0)
    expect(comingSoonIndex).toBeGreaterThanOrEqual(0)
    expect(exsizeIndex).toBeLessThan(comingSoonIndex)
  })

  it('ExSize card links to its product page', () => {
    const exsize = content.productsShowcase.items.find((i) => i.title === 'ExSize')
    expect(exsize).toBeDefined()
    expect(exsize?.buttonLink).toBe('/products/exsize')
  })
})

// Rebrand guard — Faza 4: npm + Homebrew → @crystalplatforms / CrystalPlatforms (issue #25).
// Chroni przed regresją: komendy instalacji ADM-CLI wskazują nowe identyfikatory
// (npm scope @crystalplatforms, Homebrew tap CrystalPlatforms/tap, instalatory
// raw.githubusercontent.com/CrystalPlatforms/ADM-CLI). Stare @crystalgames/adm
// i CrystalGamesStudio/{tap,ADM-CLI} znikają ze strony produktu.
// HISTORYCZNE: w Fazie 4 stary handle YouTube (@CrystalGamesStudio-l9z) jeszcze
// zostawał — migrowany w Fazie 5 (issue #26). Guard Fazy 4 używał wzorców, których
// ten handle nie spełniał, więc fazy były czysto oddzielone.
describe('Rebrand guard — npm + Homebrew → @crystalplatforms / CrystalPlatforms (Faza 4)', () => {
  const admCli = () => readFile('src/pages/AdmCli.tsx')

  describe('npm scope', () => {
    it('uses @crystalplatforms/adm (not the old @crystalgames scope)', () => {
      expect(admCli()).toContain('@crystalplatforms/adm')
      expect(admCli()).not.toContain('@crystalgames/adm')
    })
  })

  describe('instalatory (curl + PowerShell)', () => {
    it('point to raw.githubusercontent.com/CrystalPlatforms/ADM-CLI (not CrystalGamesStudio)', () => {
      expect(admCli()).toContain('raw.githubusercontent.com/CrystalPlatforms/ADM-CLI')
      expect(admCli()).not.toContain('raw.githubusercontent.com/CrystalGamesStudio/ADM-CLI')
    })
  })

  describe('global leak guard — Faza 4', () => {
    it('no source file references the old @crystalgames npm scope', () => {
      const offenders = allSourceFiles.filter((f) => readFile(f).includes('@crystalgames'))
      expect(offenders).toEqual([])
    })

    it('no source file references the old CrystalGamesStudio install identifiers (tap / ADM-CLI)', () => {
      const offenders: string[] = []
      for (const file of allSourceFiles) {
        const lines = readFile(file).split('\n')
        lines.forEach((line, index) => {
          if (/CrystalGamesStudio\/(tap|ADM-CLI)/.test(line)) {
            offenders.push(`${file}:${index + 1} ${line.trim()}`)
          }
        })
      }
      expect(offenders).toEqual([])
    })
  })
})

// Rebrand guard — Faza 5: YouTube → nowy handle @CrystalStudio2 (issue #26).
// Chroni przed regresją: linki YouTube (stopka + strona kontaktu) wskazują nowy
// handle @CrystalStudio2; stary @CrystalGamesStudio-l9z znika ze wszystkich źródeł.
describe('Rebrand guard — YouTube → @CrystalStudio2 (Faza 5)', () => {
  describe('Contact — link do kanału YouTube', () => {
    it('points to @CrystalStudio2 (not the old @CrystalGamesStudio-l9z)', () => {
      const contact = readFile('src/pages/Contact.tsx')
      expect(contact).toContain('https://www.youtube.com/@CrystalStudio2')
      expect(contact).not.toContain('@CrystalGamesStudio-l9z')
    })
  })

  describe('footer — link do kanału YouTube (content.json)', () => {
    it('points to @CrystalStudio2 (not the old @CrystalGamesStudio-l9z)', () => {
      const youtube = content.footer.socialMedia.find((s) => s.icon === 'Youtube')
      expect(youtube).toBeDefined()
      expect(youtube?.url).toBe('https://www.youtube.com/@CrystalStudio2')
    })
  })

  describe('global leak guard — Faza 5', () => {
    it('no source file references the old YouTube handle @CrystalGamesStudio-l9z', () => {
      const offenders = allSourceFiles.filter((f) =>
        readFile(f).includes('@CrystalGamesStudio-l9z')
      )
      expect(offenders).toEqual([])
    })
  })
})

// Rebrand guard — X (Twitter) → nowy handle @CrystalStudio02 (dodatkowy wymóg
// właściciela poza zakresem issue #26; plan Fazy 5 zakładał że X zostaje, ale
// właściciel zmienił handle). Chroni przed regresją: wszystkie linki i wzmianki X
// (Contact, stopka, FAQ) wskazują @CrystalStudio02; stary @CrystalStudio64 znika.
describe('Rebrand guard — X (Twitter) → @CrystalStudio02', () => {
  describe('Contact — link do profilu X', () => {
    it('points to @CrystalStudio02 (not the old @CrystalStudio64)', () => {
      const contact = readFile('src/pages/Contact.tsx')
      expect(contact).toContain('https://x.com/CrystalStudio02')
      expect(contact).not.toContain('x.com/CrystalStudio64')
    })
  })

  describe('footer — link do profilu X (content.json)', () => {
    it('points to @CrystalStudio02 (not the old @CrystalStudio64)', () => {
      const x = content.footer.socialMedia.find((s) => s.icon === 'Twitter')
      expect(x).toBeDefined()
      expect(x?.url).toBe('https://x.com/CrystalStudio02')
    })
  })

  describe('FAQ — wzmianka o handle X (content.json)', () => {
    it('uses @CrystalStudio02 (not the old @CrystalStudio64)', () => {
      const faqTexts: string[] = []
      for (const category of content.faq.categories) {
        for (const item of category.items) {
          faqTexts.push(item.question, item.answer)
        }
      }
      const joined = faqTexts.join('\n')
      expect(joined).toContain('@CrystalStudio02')
      expect(joined).not.toContain('@CrystalStudio64')
    })
  })

  describe('global leak guard — X', () => {
    it('no source file references the old X handle x.com/CrystalStudio64', () => {
      const offenders = allSourceFiles.filter((f) => readFile(f).includes('x.com/CrystalStudio64'))
      expect(offenders).toEqual([])
    })
  })
})

// Footer — ikona GitHub w socialach + wyłączone pulsowanie ikon social.
describe('Footer — GitHub w socialach + brak pulsowania ikon', () => {
  describe('footer — link do GitHub (content.json)', () => {
    it('includes a GitHub social link pointing to CrystalPlatforms', () => {
      const github = content.footer.socialMedia.find((s) => s.icon === 'Github')
      expect(github).toBeDefined()
      expect(github?.url).toBe('https://github.com/CrystalPlatforms')
    })
  })

  describe('ikony social — bez pulsowania', () => {
    it('social icons do not use glowAnimation (no infinite glow pulse)', () => {
      const footer = readFile('src/components/layout/Footer.tsx')
      expect(footer).not.toContain('glowAnimation')
    })
  })

  describe('footer — zakres lat copyright', () => {
    it('shows "© 2023-<current year>" range (static 2023 start + dynamic current year)', () => {
      const footer = readFile('src/components/layout/Footer.tsx')
      // rok startu 2023 na sztywno + bieżący rok dynamicznie, połączone myślnikiem
      expect(footer).toContain('2023-${new Date().getFullYear()}')
    })
  })
})
