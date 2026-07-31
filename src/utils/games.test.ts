import { describe, it, expect } from 'vitest'
import { getGameBySlug } from './games'
import type { Game } from '../types/content'

const games: Game[] = [
  {
    slug: 'schools-out',
    title: "School's Out!",
    src: 'https://crystalplatforms.github.io/schools-out/',
  },
  {
    slug: 'coin-collector',
    title: 'Coin Collector',
    src: 'https://crystalplatforms.github.io/coin-collector/',
  },
]

describe('getGameBySlug', () => {
  it('returns the game matching the slug', () => {
    expect(getGameBySlug(games, 'schools-out')?.title).toBe("School's Out!")
    expect(getGameBySlug(games, 'coin-collector')?.title).toBe('Coin Collector')
  })

  it('returns undefined for an unknown slug (→ "nie znaleziono gry")', () => {
    expect(getGameBySlug(games, 'does-not-exist')).toBeUndefined()
  })

  it('returns undefined when the games list is empty', () => {
    expect(getGameBySlug([], 'schools-out')).toBeUndefined()
  })
})
