import { useState } from 'react'
import { Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function AudioExtractor() {
  const [url, setUrl] = useState('')
  const [audioFormat, setAudioFormat] = useState('mp3')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  const formats = [
    { value: 'mp3', label: 'MP3 (128-320 kbps)' },
    { value: 'aac', label: 'AAC (High Quality)' },
    { value: 'flac', label: 'FLAC (Lossless)' },
    { value: 'wav', label: 'WAV (Uncompressed)' },
    { value: 'm4a', label: 'M4A (Apple)' },
    { value: 'ogg', label: 'OGG Vorbis' },
  ]

  const extractAudio = async () => {
    if (!url) {
      setError('Please enter a video URL')
      return
    }

    setLoading(true)
    setError('')
    setProgress(0)

    try {
      const response = await fetch(`${API_URL}/api/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, output_format: audioFormat })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'Failed to extract audio')
      }

      const data = await response.json()
      checkExtractionStatus(data.job_id)
    } catch (err: any) {
      setError(err.message || 'Failed to extract audio')
      setLoading(false)
    }
  }

  const checkExtractionStatus = async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/api/download/${jobId}`)
        const data = await response.json()

        setProgress(data.progress || 0)

        if (data.status === 'completed') {
          clearInterval(interval)
          setLoading(false)
          window.open(`${API_URL}/api/download/${jobId}/file`, '_blank')
        } else if (data.status === 'failed') {
          clearInterval(interval)
          setLoading(false)
          setError(data.error || 'Audio extraction failed')
        }
      } catch (err) {
        clearInterval(interval)
        setLoading(false)
        setError('Failed to check extraction status')
      }
    }, 1000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Audio <span className="text-pink-600">Extractor</span>
        </h2>
        <p className="text-xl text-gray-600">
          Extract audio from any video and save as MP3, AAC, FLAC, or other formats
        </p>
      </div>

      <Card className="max-w-3xl mx-auto mb-12">
        <CardHeader>
          <CardTitle>Extract Audio</CardTitle>
          <CardDescription>Convert video to audio file</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video URL</label>
              <Input
                type="text"
                placeholder="Paste video URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && extractAudio()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Audio Format</label>
              <Select value={audioFormat} onValueChange={setAudioFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={extractAudio} disabled={loading} className="w-full" size="lg">
              <Music className="h-4 w-4 mr-2" />
              {loading ? 'Extracting...' : 'Extract Audio'}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {progress > 0 && progress < 100 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Extracting audio...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-pink-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Extract high-quality audio from videos in multiple formats
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Uses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Extract music from music videos</li>
              <li>• Save podcast audio from video platforms</li>
              <li>• Create audio files from educational videos</li>
              <li>• Convert conference talks to audio</li>
              <li>• Save audio from live streams</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Format Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>MP3:</strong> Universal compatibility</li>
              <li><strong>AAC:</strong> Better quality than MP3</li>
              <li><strong>FLAC:</strong> Lossless, large files</li>
              <li><strong>WAV:</strong> Uncompressed audio</li>
              <li><strong>M4A:</strong> Apple devices</li>
              <li><strong>OGG:</strong> Open source format</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
