import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router'
import { Header } from './components/layout/Header'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { HeroSection } from './components/home/HeroSection'
import { FeaturesSection } from './components/home/FeaturesSection'
import { ProductsShowcase } from './components/home/ProductsShowcase'
import { SocialProofSection } from './components/home/SocialProofSection'
import { Footer } from './components/layout/Footer'
import { GoodBuySection } from './components/home/GoodBuySection'
import { Products } from './pages/Products'
import { PlayGame } from './pages/PlayGame'
import { Exsize } from './pages/Exsize'
import { Wspolniak } from './pages/Wspolniak'
import { AdmCli } from './pages/AdmCli'
import { Umux } from './pages/Umux'
import { About } from './pages/About'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { GameGuide } from './pages/GameGuide'
import { FAQ } from './pages/FAQ'
import { Contact } from './pages/Contact'

function HomePage() {
  return (
    <>
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <ProductsShowcase />
        <SocialProofSection />
        <GoodBuySection />
      </main>
    </>
  )
}

// Trasy, na których renderujemy SAMĄ grę na pełnym ekranie (bez nagłówka/stopki).
const GAME_ROUTES = ['/schools-out', '/coin-collector']

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Shell />
    </HashRouter>
  )
}

// Powłoka układu. Na trasach gier chowamy nagłówek i stopkę — gracz widzi tylko grę.
function Shell() {
  const { pathname } = useLocation()
  const isGameRoute = GAME_ROUTES.includes(pathname)

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {!isGameRoute && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/schools-out" element={<PlayGame slug="schools-out" />} />
        <Route path="/coin-collector" element={<PlayGame slug="coin-collector" />} />
        <Route path="/games" element={<Navigate to="/products" replace />} />
        <Route path="/apps" element={<Navigate to="/products" replace />} />
        <Route path="/products/exsize" element={<Exsize />} />
        <Route path="/products/wspolniak" element={<Wspolniak />} />
        <Route path="/products/adm-cli" element={<AdmCli />} />
        <Route path="/products/umux" element={<Umux />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/game-guide" element={<GameGuide />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!isGameRoute && <Footer />}
    </div>
  )
}

export default App
