import { useContentData } from '../../hooks/useContentData'
import { ContentData } from '../../types/content'
import { useState, type ComponentType } from 'react'
import { Menu, X, Home, Package, Mail, Info, Github } from 'lucide-react'
import { cn } from '../../utils/helpers'
import { pixelBorder } from '../../utils/game-effects'
import { Link, useLocation } from 'react-router'

const navIconMap: Record<string, ComponentType<{ className?: string }>> = {
  'Home': Home,
  'Products': Package,
  'About': Info,
  'Contact': Mail,
}

export function Header() {
  const { header } = useContentData() as ContentData
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isHome = useLocation().pathname === '/'

  if (!header) return null

  return (
    <header className={cn(
      "relative z-50",
      !isHome && "bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("flex justify-between items-center", isHome ? "-mt-5" : "py-3")}>
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="sr-only">{header.text}</span>
              <img src="/images/CrystalLogo.png" alt="Crystal Studio" className={isHome ? "h-40 w-auto sm:h-60" : "h-20 w-auto sm:h-24"} />
            </Link>
          </div>

          <div className="md:hidden z-50">
            <button
              type="button"
              className={cn(
                "text-indigo-400 p-2 rounded-lg",
                pixelBorder,
                "absolute top-4 right-4 z-50"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            <div className={cn(
              "fixed inset-0 bg-gray-900/95",
              "transition-opacity duration-300",
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
              "z-40"
            )} />

            <div className={cn(
              "fixed top-0 right-0 bottom-0",
              "w-64 bg-gray-900",
              "transform transition-transform duration-300",
              "p-6 pt-32",
              "shadow-xl",
              "z-40",
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
              <div className="space-y-4">
                {header.navItems.map((item, index) => {
                  const NavIcon = navIconMap[item.text]
                  return item.link ? (
                    item.link.startsWith('/') ? (
                      <Link
                        key={index}
                        to={item.link}
                        className={cn(
                          "flex items-center gap-2",
                          "px-4 py-3",
                          "rounded-lg",
                          "text-base font-medium",
                          "text-indigo-300 hover:text-indigo-100",
                          "transition-all duration-200",
                          "hover:bg-indigo-500/10",
                          "hover:shadow-[0_0_10px_0_rgba(99,102,241,0.3)]",
                          "bg-gray-800"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {NavIcon && <NavIcon className="h-4 w-4" />}
                        {item.text}
                      </Link>
                    ) : (
                      <a
                        key={index}
                        href={item.link}
                        className={cn(
                          "flex items-center gap-2",
                          "px-4 py-3",
                          "rounded-lg",
                          "text-base font-medium",
                          "text-indigo-300 hover:text-indigo-100",
                          "transition-all duration-200",
                          "hover:bg-indigo-500/10",
                          "hover:shadow-[0_0_10px_0_rgba(99,102,241,0.3)]",
                          "bg-gray-800"
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {NavIcon && <NavIcon className="h-4 w-4" />}
                        {item.text}
                      </a>
                    )
                  ) : (
                    <span
                      key={index}
                      className="block text-base font-medium text-gray-600 cursor-not-allowed px-4 py-3"
                    >
                      {item.text}
                    </span>
                  )
                })}

                <a
                  href="https://github.com/CrystalPlatforms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2",
                    "px-4 py-3",
                    "rounded-lg",
                    "text-base font-medium",
                    "text-indigo-300 hover:text-indigo-100",
                    "transition-all duration-200",
                    "hover:bg-indigo-500/10",
                    "hover:shadow-[0_0_10px_0_rgba(99,102,241,0.3)]",
                    "bg-gray-800"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <nav className={cn(
            "hidden md:flex md:items-center md:gap-1",
            "md:bg-gray-800/80 md:backdrop-blur-sm",
            "md:rounded-full md:px-2 md:py-2",
            "md:border md:border-indigo-500/20",
            "md:shadow-lg md:shadow-indigo-500/20"
          )}>
            {header.navItems.map((item, index) => {
              const NavIcon = navIconMap[item.text]
              return item.link ? (
                item.link.startsWith('/') ? (
                  <Link
                    key={index}
                    to={item.link}
                    className={cn(
                      "flex items-center gap-1.5",
                      "px-3 py-2 rounded-lg",
                      "text-sm font-medium",
                      "text-indigo-300 hover:text-indigo-100",
                      "transition-all duration-200",
                      "hover:bg-indigo-500/10",
                      "hover:shadow-[0_0_10px_0_rgba(99,102,241,0.3)]"
                    )}
                  >
                    {NavIcon && <NavIcon className="h-4 w-4" />}
                    {item.text}
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={item.link}
                    className={cn(
                      "flex items-center gap-1.5",
                      "px-3 py-2 rounded-lg",
                      "text-sm font-medium",
                      "text-indigo-300 hover:text-indigo-100",
                      "transition-all duration-200",
                      "hover:bg-indigo-500/10",
                      "hover:shadow-[0_0_10px_0_rgba(99,102,241,0.3)]"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {NavIcon && <NavIcon className="h-4 w-4" />}
                    {item.text}
                  </a>
                )
              ) : (
                <span
                  key={index}
                  className="text-sm font-medium text-gray-600 cursor-not-allowed px-3 py-2"
                >
                  {item.text}
                </span>
              )
            })}

            <a
              href="https://github.com/CrystalPlatforms"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-indigo-400 hover:text-indigo-200",
                "transition-colors duration-200",
                "p-2"
              )}
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
