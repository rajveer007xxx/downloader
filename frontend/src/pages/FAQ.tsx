import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FAQ() {
  const faqs = [
    {
      question: 'Is A2Z Downloader free to use?',
      answer: 'Yes, A2Z Downloader is completely free to use. There are no hidden fees, no premium tiers, and no download limits. You can download as many videos as you want without any cost.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No, you don\'t need to create an account or register. Simply paste the video URL, choose your format, and download. We value your privacy and don\'t require any personal information.'
    },
    {
      question: 'What platforms are supported?',
      answer: 'We support over 1000 platforms including YouTube, TikTok, Instagram, Facebook, Twitter, Vimeo, Dailymotion, Reddit, Twitch, Soundcloud, and many more. Check our Supported Sites page for a full list.'
    },
    {
      question: 'What video quality can I download?',
      answer: 'You can download videos in various qualities ranging from 144p to 8K, depending on what\'s available from the source. Common options include 360p, 480p, 720p (HD), 1080p (Full HD), 1440p (2K), and 2160p (4K).'
    },
    {
      question: 'What formats are supported?',
      answer: 'We support multiple video formats including MP4, WEBM, AVI, MOV, MKV, and more. For audio extraction, we support MP3, AAC, FLAC, WAV, M4A, and OGG formats.'
    },
    {
      question: 'Is it legal to download videos?',
      answer: 'Downloading videos for personal use is generally legal, but downloading copyrighted content without permission is not. You are responsible for ensuring you have the right to download and use any content. Always respect copyright laws and content creators\' rights.'
    },
    {
      question: 'Do you store my downloaded videos?',
      answer: 'No, we do not store any videos you download. Files are temporarily processed on our servers and automatically deleted after a short period. We prioritize your privacy and don\'t keep any records of your downloads.'
    },
    {
      question: 'Why is my download failing?',
      answer: 'Downloads may fail for several reasons: the video might be private or geo-restricted, the URL might be incorrect, or the platform might have changed their system. Try refreshing the page and attempting again. If the problem persists, the video might not be accessible.'
    },
    {
      question: 'Can I download private or age-restricted videos?',
      answer: 'Generally, no. We can only download publicly available videos. Private videos, age-restricted content, or videos requiring login cannot be downloaded through our service.'
    },
    {
      question: 'How long does the download process take?',
      answer: 'The time depends on the video length, quality, and your internet speed. Most videos are analyzed within seconds, and downloads typically complete within a few minutes. Larger files or higher quality videos may take longer.'
    },
    {
      question: 'Can I download playlists or channels?',
      answer: 'Currently, you need to download videos individually by pasting each video URL. Batch downloading of playlists or entire channels is not yet supported but may be added in the future.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'No, there is no file size limit. You can download videos of any length or size, though larger files will naturally take longer to process and download.'
    },
    {
      question: 'Can I use this on mobile devices?',
      answer: 'Yes, A2Z Downloader is fully responsive and works on all devices including smartphones and tablets. The interface adapts to your screen size for the best experience.'
    },
    {
      question: 'Do you have a browser extension?',
      answer: 'Currently, we don\'t offer a browser extension. However, our web-based tool is easy to use - simply copy the video URL and paste it on our website.'
    },
    {
      question: 'How can I report a problem or suggest a feature?',
      answer: 'You can contact us through our Contact page. We welcome feedback, bug reports, and feature suggestions to help improve our service.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
        <p className="text-xl text-gray-600">
          Find answers to common questions about A2Z Downloader
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
        <p className="text-gray-700 mb-6">
          If you couldn't find the answer you were looking for, feel free to contact us. We're here to help!
        </p>
        <a href="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Contact Us
        </a>
      </div>
    </div>
  )
}
