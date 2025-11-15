import { useState } from 'react'
import { Merge as MergeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function Merge() {
  const [videoUrl, setVideoUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const startMerge = async () => {
    if (!videoUrl || !audioUrl) {
      setError('Please enter both video and audio URLs')
      return
    }

    setLoading(true)
    setError('')

    try {
      setError('Merge functionality coming soon! This feature will allow you to combine separate video and audio streams.')
      setLoading(false)
    } catch (err: any) {
      setError(err.message || 'Failed to merge files')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Video <span className="text-green-600">Merger</span>
        </h2>
        <p className="text-xl text-gray-600">
          Merge separate video and audio streams into a single high-quality file
        </p>
      </div>

      <Card className="max-w-3xl mx-auto mb-12">
        <CardHeader>
          <CardTitle>Merge Video and Audio</CardTitle>
          <CardDescription>Combine separate video and audio streams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video URL</label>
              <Input
                type="text"
                placeholder="Paste video URL here..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Audio URL</label>
              <Input
                type="text"
                placeholder="Paste audio URL here..."
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
              />
            </div>

            <Button onClick={startMerge} disabled={loading} className="w-full" size="lg">
              <MergeIcon className="h-4 w-4 mr-2" />
              {loading ? 'Merging...' : 'Merge Files'}
            </Button>
          </div>

          {error && (
            <Alert className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-gray-500 mt-4">
            This feature allows you to combine high-quality video with high-quality audio for the best results
          </p>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Why Merge Video and Audio?</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Many video platforms store video and audio as separate streams. To get the highest quality, you need to download both streams separately and merge them together.
          </p>
          <p>
            Our merger tool makes this process simple by automatically combining your video and audio files into a single high-quality output file.
          </p>
          <h4 className="font-semibold text-lg mt-6 mb-3">Common Use Cases:</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Downloading 4K or 8K videos from YouTube</li>
            <li>Getting the best audio quality with high-resolution video</li>
            <li>Combining video-only and audio-only streams</li>
            <li>Creating custom video files with specific quality settings</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
