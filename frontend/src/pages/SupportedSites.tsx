import { Globe, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SupportedSites() {
  const popularPlatforms = [
    { name: 'YouTube', url: 'youtube.com', description: 'Videos, playlists, channels' },
    { name: 'TikTok', url: 'tiktok.com', description: 'Short videos, profiles' },
    { name: 'Instagram', url: 'instagram.com', description: 'Posts, reels, stories, IGTV' },
    { name: 'Facebook', url: 'facebook.com', description: 'Videos, watch, live streams' },
    { name: 'Twitter/X', url: 'twitter.com', description: 'Videos, GIFs' },
    { name: 'Vimeo', url: 'vimeo.com', description: 'HD videos, private videos' },
    { name: 'Dailymotion', url: 'dailymotion.com', description: 'Videos, playlists' },
    { name: 'Reddit', url: 'reddit.com', description: 'Videos, v.redd.it links' },
    { name: 'Twitch', url: 'twitch.tv', description: 'Clips, VODs, highlights' },
    { name: 'Soundcloud', url: 'soundcloud.com', description: 'Audio tracks, playlists' },
  ]

  const otherPlatforms = [
    'Bilibili', 'Bandcamp', 'Bitchute', 'Blogger', 'Buzzfeed', 'Coub', 'Crunchyroll',
    'Dropbox', 'ESPN', 'Flickr', 'Gaana', 'Gfycat', 'Imgur', 'Izlesene', 'Kickstarter',
    'Likee', 'LinkedIn', 'Mixcloud', 'Niconico', 'Ok.ru', 'Periscope', 'Pinterest',
    'Pornhub', 'Rutube', 'Snapchat', 'Spotify', 'Streamable', 'Ted', 'Tumblr',
    'Udemy', 'Vevo', 'VK', 'Wistia', 'XNXX', 'XVIDEOS', 'Yahoo', 'Yandex',
    '9GAG', 'Archive.org', 'BBC', 'Bloomberg', 'Break', 'CBS', 'CNBC', 'CNN',
    'Comedy Central', 'Discovery', 'Disney', 'ESPN', 'Fox News', 'HBO', 'History',
    'Hulu', 'IMDb', 'MTV', 'National Geographic', 'NBC', 'Netflix', 'Nickelodeon',
    'PBS', 'Showtime', 'Sky News', 'Starz', 'The Guardian', 'The New York Times',
    'Vice', 'Vine', 'Voot', 'Vudu', 'WWE', 'Youku', 'Zee5'
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Supported <span className="text-blue-600">Platforms</span>
        </h2>
        <p className="text-xl text-gray-600">
          Download videos from 1000+ websites and platforms
        </p>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Most Popular Platforms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPlatforms.map((platform) => (
            <Card key={platform.name}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    <p className="text-sm text-gray-500">{platform.url}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{platform.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-center">All Supported Platforms</h3>
        <p className="text-center text-gray-600 mb-8">
          We support over 1000 websites. Here are some of the most popular ones:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {otherPlatforms.map((platform) => (
            <div key={platform} className="flex items-center gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{platform}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-8 text-sm">
          And hundreds more! If a platform is not listed, try it anyway - we likely support it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Multiple Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Download videos in various formats including MP4, WEBM, AVI, and more. Extract audio as MP3, AAC, FLAC, and other formats.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Resolutions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Choose from available resolutions: 144p, 240p, 360p, 480p, 720p (HD), 1080p (Full HD), 1440p (2K), 2160p (4K), and even 8K when available.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>No Limitations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Download unlimited videos with no restrictions. No registration required. Completely free to use for personal purposes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
