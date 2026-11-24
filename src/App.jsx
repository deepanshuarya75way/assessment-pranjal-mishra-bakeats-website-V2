import { CartProvider } from './context/CartContext'
import ScrollProgress from './components/layout/ScrollProgress'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BackToTop from './components/layout/BackToTop'
import WhatsAppFab from './components/layout/WhatsAppFab'
import PageLoader from './components/layout/PageLoader'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import Stats from './components/sections/Stats'
import Products from './components/sections/Products'
import Ingredients from './components/sections/Ingredients'
import BlinkitBanner from './components/sections/BlinkitBanner'
import Testimonials from './components/sections/Testimonials'
import AsSeenOn from './components/sections/AsSeenOn'
import VideoSection from './components/sections/VideoSection'
import Story from './components/sections/Story'
import ExportBanner from './components/sections/ExportBanner'
import FAQ from './components/sections/FAQ'
import CartDrawer from './components/shop/CartDrawer'
import Checkout from './components/shop/Checkout'
import TrackOrder from './components/shop/TrackOrder'

export default function App() {
  return (
    <CartProvider>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Products />
      <Ingredients />
      <BlinkitBanner />
      <Testimonials />
      <AsSeenOn />
      <VideoSection />
      <Story />
      <ExportBanner />
      <FAQ />
      <Footer />
      <WhatsAppFab />
      <BackToTop />
      <CartDrawer />
      <Checkout />
      <TrackOrder />
      <PageLoader />
    </CartProvider>
  )
}
