import { useState } from 'react'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const API_URL = import.meta.env.VITE_API_URL || window.location.origin

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !message) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSuccess(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err: any) {
      setError(err.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Contact <span className="text-blue-600">Us</span>
        </h2>
        <p className="text-xl text-gray-600">
          Have questions or feedback? We'd love to hear from you
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  placeholder="Tell us what's on your mind..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full" size="lg">
                <Send className="h-4 w-4 mr-2" />
                {loading ? 'Sending...' : 'Send Message'}
              </Button>

              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">
                    Thank you for your message! We'll get back to you soon.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                For general inquiries and support:
              </p>
              <a href="mailto:support@a2zdownloader.com" className="text-blue-600 hover:underline">
                support@a2zdownloader.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Common Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Before contacting us, check our FAQ page for answers to common questions.
              </p>
              <a href="/faq" className="text-blue-600 hover:underline">
                Visit FAQ Page →
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What to include</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Detailed description of your issue or question</li>
                <li>• The URL you're trying to download (if applicable)</li>
                <li>• Your browser and operating system</li>
                <li>• Any error messages you received</li>
                <li>• Screenshots if relevant</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
