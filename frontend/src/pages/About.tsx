import { Download, Shield, Zap, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          About <span className="text-blue-600">A2Z Downloader</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted free online video downloader and converter for all major platforms
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
        <p className="text-gray-700 mb-4">
          A2Z Downloader was created to provide a simple, fast, and reliable way to download videos from the internet. We believe that accessing online content should be easy and free for everyone, which is why we've built a tool that works with over 1000 platforms without any registration or payment required.
        </p>
        <p className="text-gray-700 mb-4">
          Our service is designed with user privacy and convenience in mind. We don't store your videos, track your downloads, or require you to create an account. Simply paste a URL, choose your format, and download - it's that easy.
        </p>
        <p className="text-gray-700">
          Whether you're downloading educational content, music videos, podcasts, or any other type of media for personal use, A2Z Downloader makes the process quick and hassle-free.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <Download className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>1000+ Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Support for all major video platforms including YouTube, TikTok, Instagram, Facebook, and many more.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-yellow-600 mb-2" />
            <CardTitle>Lightning Fast</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Our optimized servers ensure quick video analysis and fast download speeds for all file sizes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Safe & Secure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We prioritize your privacy. No data collection, no tracking, and no storage of your downloads.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Heart className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>Always Free</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Completely free to use with no hidden fees, no premium tiers, and no download limits.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h3 className="text-2xl font-bold mb-6">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-3">Video Downloader</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Download from 1000+ websites</li>
              <li>• Multiple quality options (144p to 8K)</li>
              <li>• Various format support (MP4, WEBM, AVI, etc.)</li>
              <li>• Batch download support</li>
              <li>• Playlist download capability</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Video Converter</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Convert to any format</li>
              <li>• Audio extraction (MP3, AAC, FLAC)</li>
              <li>• Quality preservation</li>
              <li>• Fast conversion speeds</li>
              <li>• No file size limits</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Legal Notice</h3>
        <p className="text-gray-700 max-w-3xl mx-auto">
          A2Z Downloader is intended for personal use only. Users are responsible for ensuring they have the right to download and use any content. We do not condone or support the downloading of copyrighted material without proper authorization. Please respect content creators and copyright laws.
        </p>
      </div>
    </div>
  )
}
