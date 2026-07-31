import type { Game } from '../types/content'

/**
 * Zwraca grę po slugu (np. 'schools-out').
 * undefined, gdy nie znaleziono — wtedy strona gry renderuje stan "nie znaleziono".
 *
 * To jedyna logika mapowania slug → gra; komponenty i strony jej używają,
 * dzięki czemu źródło prawdy (lista gier w content.json) zostaje w jednym miejscu.
 */
export function getGameBySlug(games: Game[], slug: string): Game | undefined {
  return games.find((game) => game.slug === slug)
}
