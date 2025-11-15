import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function Converter() {
  const [url, setUrl] = useState('')
  const [outputFormat, setOutputFormat] = useState('mp4')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  const formats = [
    { value: 'mp4', label: 'MP4 (Video)' },
    { value: 'mp3', label: 'MP3 (Audio)' },
    { value: 'webm', label: 'WEBM (Video)' },
    { value: 'avi', label: 'AVI (Video)' },
    { value: 'mov', label: 'MOV (Video)' },
    { value: 'mkv', label: 'MKV (Video)' },
    { value: 'aac', label: 'AAC (Audio)' },
    { value: 'flac', label: 'FLAC (Audio)' },
    { value: 'wav', label: 'WAV (Audio)' },
  ]

  const startConversion = async () => {
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
        body: JSON.stringify({ url, output_format: outputFormat })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'Failed to start conversion')
      }

      const data = await response.json()
      checkConversionStatus(data.job_id)
    } catch (err: any) {
      setError(err.message || 'Failed to start conversion')
      setLoading(false)
    }
  }

  const checkConversionStatus = async (jobId: string) => {
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
          setError(data.error || 'Conversion failed')
        }
      } catch (err) {
        clearInterval(interval)
        setLoading(false)
        setError('Failed to check conversion status')
      }
    }, 1000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Video <span className="text-purple-600">Converter</span>
        </h2>
        <p className="text-xl text-gray-600">
          Convert videos to any format - MP4, MP3, WEBM, AVI, and more
        </p>
      </div>

      <Card className="max-w-3xl mx-auto mb-12">
        <CardHeader>
          <CardTitle>Convert Video</CardTitle>
          <CardDescription>Paste the video link and select output format</CardDescription>
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
                onKeyPress={(e) => e.key === 'Enter' && startConversion()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Output Format</label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
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

            <Button onClick={startConversion} disabled={loading} className="w-full" size="lg">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Converting...' : 'Start Conversion'}
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
                <span>Converting...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Supported formats: MP4, MP3, WEBM, AVI, MOV, MKV, AAC, FLAC, WAV and more
          </p>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">How to Convert Videos</h3>
        <ol className="space-y-4 text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <span>Paste the video URL from any supported platform</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <span>Select your desired output format from the dropdown</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <span>Click "Start Conversion" and wait for the process to complete</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <span>Download your converted file automatically</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
