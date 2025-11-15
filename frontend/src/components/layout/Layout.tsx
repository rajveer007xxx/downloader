import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Download className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">A2Z Downloader</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Downloader</Link>
              <Link to="/converter" className="text-gray-700 hover:text-blue-600">Converter</Link>
              <Link to="/merge" className="text-gray-700 hover:text-blue-600">Merge</Link>
              <Link to="/audio-extractor" className="text-gray-700 hover:text-blue-600">Audio Extractor</Link>
              <Link to="/sites" className="text-gray-700 hover:text-blue-600">Supported Sites</Link>
              <Link to="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">A2Z Downloader</h4>
              <p className="text-gray-400 text-sm">
                Free online video downloader and converter for all platforms
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white">Video Downloader</Link></li>
                <li><Link to="/converter" className="hover:text-white">Video Converter</Link></li>
                <li><Link to="/merge" className="hover:text-white">Video Merger</Link></li>
                <li><Link to="/audio-extractor" className="hover:text-white">Audio Extractor</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Information</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/sites" className="hover:text-white">Supported Sites</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/dmca" className="hover:text-white">DMCA</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 A2Z Downloader. All rights reserved.</p>
            <p className="mt-2">This website is for personal use only. Download of copyrighted material is strictly prohibited.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
