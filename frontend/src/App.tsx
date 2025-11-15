import { useState } from 'react'
import { Download, Video, Scissors, Merge, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState<any>(null)
  const [error, setError] = useState('')
  const [downloadJobId, setDownloadJobId] = useState('')
  const [downloadProgress, setDownloadProgress] = useState(0)

  const analyzeVideo = async () => {
    if (!url) {
      setError('Please enter a video URL')
      return
    }

    setLoading(true)
    setError('')
    setVideoInfo(null)

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      if (!response.ok) {
        throw new Error('Failed to analyze video')
      }

      const data = await response.json()
      setVideoInfo(data)
    } catch (err: any) {
      setError(err.message || 'Failed to analyze video')
    } finally {
      setLoading(false)
    }
  }

  const startDownload = async (formatId?: string) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format_id: formatId })
      })

      if (!response.ok) {
        throw new Error('Failed to start download')
      }

      const data = await response.json()
      setDownloadJobId(data.job_id)
      
      checkDownloadStatus(data.job_id)
    } catch (err: any) {
      setError(err.message || 'Failed to start download')
      setLoading(false)
    }
  }

  const checkDownloadStatus = async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/api/download/${jobId}`)
        const data = await response.json()

        setDownloadProgress(data.progress || 0)

        if (data.status === 'completed') {
          clearInterval(interval)
          setLoading(false)
          window.open(`${API_URL}/api/download/${jobId}/file`, '_blank')
        } else if (data.status === 'failed') {
          clearInterval(interval)
          setLoading(false)
          setError(data.error || 'Download failed')
        }
      } catch (err) {
        clearInterval(interval)
        setLoading(false)
        setError('Failed to check download status')
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Download className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">A2Z Downloader</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600">Downloader</a>
              <a href="#converter" className="text-gray-700 hover:text-blue-600">Converter</a>
              <a href="#sites" className="text-gray-700 hover:text-blue-600">Supported Sites</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Online Video <span className="text-blue-600">Downloader</span> and <span className="text-purple-600">Converter</span>
          </h2>
          <p className="text-xl text-gray-600">
            Free online video downloader for YouTube, TikTok, Instagram, Facebook, Twitter and many other sites
          </p>
        </div>

        <Card className="max-w-3xl mx-auto mb-12">
          <CardHeader>
            <CardTitle>Download Video</CardTitle>
            <CardDescription>Paste the video link below to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Paste video URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeVideo()}
                className="flex-1"
              />
              <Button onClick={analyzeVideo} disabled={loading}>
                {loading ? 'Analyzing...' : 'Start'}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {downloadProgress > 0 && downloadProgress < 100 && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Downloading...</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {videoInfo && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  {videoInfo.thumbnail && (
                    <img
                      src={videoInfo.thumbnail}
                      alt={videoInfo.title}
                      className="w-32 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{videoInfo.title}</h3>
                    <p className="text-sm text-gray-600">{videoInfo.uploader}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Available Formats:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {videoInfo.formats?.slice(0, 10).map((format: any, index: number) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => startDownload(format.format_id)}
                        disabled={loading}
                        className="justify-start"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {format.resolution} - {format.ext}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => startDownload()}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  Download Best Quality
                </Button>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-4">
              Downloading copyrighted materials is strictly prohibited. By using this service, you agree to our Terms of Service.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Video className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Download</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Download videos from 1000+ platforms in multiple resolutions and formats</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Scissors className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Convert</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Convert videos to MP3, MP4, AAC, WEBM and many other formats</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Merge className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Merge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Merge video and audio formats to save high quality videos</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Supported Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {['YouTube', 'TikTok', 'Instagram', 'Facebook', 'Twitter', 'Vimeo', 'Dailymotion', 'Reddit', 'Twitch', 'Soundcloud'].map((platform) => (
              <div key={platform} className="flex items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <Globe className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">{platform}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-gray-600">
            And 1000+ more platforms supported
          </p>
        </div>
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
                <li><a href="#" className="hover:text-white">Video Downloader</a></li>
                <li><a href="#" className="hover:text-white">Video Converter</a></li>
                <li><a href="#" className="hover:text-white">Audio Extractor</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Information</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">DMCA</a></li>
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

export default App
