# A2Z Downloader

A complete video downloader and converter web application supporting 1000+ platforms including YouTube, TikTok, Instagram, Facebook, Twitter, and many more.

## Features

- Download videos from 1000+ platforms
- Multiple resolution and format options
- Video converter (MP4, MP3, WEBM, AAC, etc.)
- Video merger functionality
- Modern, responsive UI
- SEO optimized
- AdSense compliant

## Tech Stack

### Backend
- FastAPI (Python)
- yt-dlp for video downloading
- FFmpeg for video processing
- Redis for job queue

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components

## Setup

### Backend

```bash
cd backend
poetry install
poetry run fastapi dev app/main.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment

The application is deployed at https://a2zdownloader.com

## Supported Platforms

YouTube, TikTok, Instagram, Facebook, Twitter/X, Vimeo, Dailymotion, Reddit, Twitch, Soundcloud, and 1000+ more platforms.

## License

For personal use only. Downloading copyrighted material is strictly prohibited.
