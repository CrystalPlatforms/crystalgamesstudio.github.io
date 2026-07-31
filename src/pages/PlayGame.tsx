import { Link } from 'react-router'
import { Gamepad2 } from 'lucide-react'
import { useContentData } from '../hooks/useContentData'
import { getGameBySlug } from '../utils/games'
import { GamePlayer } from '../components/games/GamePlayer'
import { cn } from '../utils/helpers'

/**
 * Strona osadzająca grę. Slug przekazywany z trasy (np. /schools-out).
 *
 * Wzorzec content-driven: najpierw czeka na załadowanie content.json
 * (fetch w useContentData), potem mapuje slug → gra przez getGameBySlug.
 * Nieznany slug → stan „nie znaleziono gry".
 */
export function PlayGame({ slug }: { slug: string }) {
  const content = useContentData()

  // content.json jeszcze się ładuje (puste {} przed fetch) — nic nie renderuj.
  if (!content?.games) return null

  const game = getGameBySlug(content.games.items, slug)

  if (!game) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-24">
        <Gamepad2 className="h-16 w-16 text-indigo-400/40 mb-4" />
        <h1 className="text-2xl font-bold text-indigo-200 mb-2">Nie znaleziono gry</h1>
        <p className="text-indigo-300/70 mb-6">
          Gra o slugu <code className="text-indigo-200">{slug}</code> nie istnieje lub została przeniesiona.
        </p>
        <Link
          to="/products"
          className={cn(
            'px-5 py-2.5 rounded-lg font-medium',
            'bg-gradient-to-r from-indigo-600 to-purple-600 text-white',
            'hover:from-indigo-500 hover:to-purple-500 transition-all duration-300'
          )}
        >
          Zobacz wszystkie gry
        </Link>
      </div>
    )
  }

  return <GamePlayer game={game} />
}
