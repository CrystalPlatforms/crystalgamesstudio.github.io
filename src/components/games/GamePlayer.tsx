import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { Game } from '../../types/content'

/**
 * Osadza grę na PEŁNYM EKRANIE — sam iframe, bez nagłówka, stopki, ramki
 * czy jakiegokolwiek „prostokąta z grą w środku". Pod crystal-studio.dev/#/schools-out
 * widać po prostu grę, jakby otworzyć ją bezpośrednio.
 *
 * `game.src` to URL wdrożenia gry (GitHub Pages w org CrystalPlatforms) — źródłem
 * prawdy gry jest jej własne repo, landing page ją tylko osadza (bez itch.io).
 */
export function GamePlayer({ game }: { game: Game }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="fixed inset-0 bg-gray-950">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-indigo-400 animate-spin" />
        </div>
      )}
      <iframe
        src={game.src}
        title={game.title}
        onLoad={() => setLoaded(true)}
        allow="fullscreen; autoplay; gamepad; pointer-lock"
        allowFullScreen
        className="block w-full h-full border-0"
      />
    </div>
  )
}
