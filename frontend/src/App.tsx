import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Converter } from './pages/Converter'
import { Merge } from './pages/Merge'
import { AudioExtractor } from './pages/AudioExtractor'
import { SupportedSites } from './pages/SupportedSites'
import { About } from './pages/About'
import { FAQ } from './pages/FAQ'
import { Contact } from './pages/Contact'
import { Terms } from './pages/Terms'
import { Privacy } from './pages/Privacy'
import { DMCA } from './pages/DMCA'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/merge" element={<Merge />} />
        <Route path="/audio-extractor" element={<AudioExtractor />} />
        <Route path="/sites" element={<SupportedSites />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/dmca" element={<DMCA />} />
      </Routes>
    </Layout>
  )
}

export default App
