from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict, Any
import yt_dlp
import asyncio
import os
import json
import uuid
import time
from pathlib import Path
import subprocess
import shutil

app = FastAPI(title="A2Z Downloader API", version="1.0.0")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

TEMP_DIR = Path("/tmp/a2zdownloader")
TEMP_DIR.mkdir(exist_ok=True)

jobs_db: Dict[str, Dict[str, Any]] = {}

class AnalyzeRequest(BaseModel):
    url: HttpUrl

class DownloadRequest(BaseModel):
    url: HttpUrl
    format_id: Optional[str] = None
    quality: Optional[str] = "best"

class ConvertRequest(BaseModel):
    url: HttpUrl
    output_format: str
    quality: Optional[str] = "medium"

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

def cleanup_old_files():
    """Clean up files older than 1 hour"""
    try:
        current_time = time.time()
        for item in TEMP_DIR.iterdir():
            if item.is_file():
                if current_time - item.stat().st_mtime > 3600:  # 1 hour
                    item.unlink()
    except Exception as e:
        print(f"Cleanup error: {e}")

async def get_video_info(url: str) -> Dict[str, Any]:
    """Extract video information using yt-dlp"""
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            formats = []
            if 'formats' in info:
                for f in info['formats']:
                    format_info = {
                        'format_id': f.get('format_id'),
                        'ext': f.get('ext'),
                        'resolution': f.get('resolution', 'audio only'),
                        'filesize': f.get('filesize'),
                        'vcodec': f.get('vcodec'),
                        'acodec': f.get('acodec'),
                        'format_note': f.get('format_note', ''),
                    }
                    formats.append(format_info)
            
            return {
                'title': info.get('title'),
                'thumbnail': info.get('thumbnail'),
                'duration': info.get('duration'),
                'uploader': info.get('uploader'),
                'formats': formats,
                'description': info.get('description', '')[:200],
            }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to analyze video: {str(e)}")

async def download_video(job_id: str, url: str, format_id: Optional[str] = None):
    """Download video in background"""
    try:
        jobs_db[job_id]['status'] = 'downloading'
        jobs_db[job_id]['progress'] = 0
        
        output_path = TEMP_DIR / f"{job_id}.%(ext)s"
        
        def progress_hook(d):
            if d['status'] == 'downloading':
                if 'total_bytes' in d:
                    progress = (d['downloaded_bytes'] / d['total_bytes']) * 100
                    jobs_db[job_id]['progress'] = int(progress)
            elif d['status'] == 'finished':
                jobs_db[job_id]['progress'] = 100
                jobs_db[job_id]['status'] = 'completed'
                jobs_db[job_id]['file_path'] = d['filename']
        
        ydl_opts = {
            'format': format_id if format_id else 'best',
            'outtmpl': str(output_path),
            'progress_hooks': [progress_hook],
            'quiet': True,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        
    except Exception as e:
        jobs_db[job_id]['status'] = 'failed'
        jobs_db[job_id]['error'] = str(e)

async def convert_video(job_id: str, input_path: str, output_format: str):
    """Convert video using FFmpeg"""
    try:
        jobs_db[job_id]['status'] = 'converting'
        jobs_db[job_id]['progress'] = 0
        
        output_path = TEMP_DIR / f"{job_id}_converted.{output_format}"
        
        cmd = [
            'ffmpeg', '-i', input_path,
            '-c:v', 'libx264' if output_format == 'mp4' else 'copy',
            '-c:a', 'aac' if output_format == 'mp4' else 'copy',
            '-y',
            str(output_path)
        ]
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        await process.communicate()
        
        if process.returncode == 0:
            jobs_db[job_id]['status'] = 'completed'
            jobs_db[job_id]['progress'] = 100
            jobs_db[job_id]['file_path'] = str(output_path)
        else:
            jobs_db[job_id]['status'] = 'failed'
            jobs_db[job_id]['error'] = 'Conversion failed'
            
    except Exception as e:
        jobs_db[job_id]['status'] = 'failed'
        jobs_db[job_id]['error'] = str(e)

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/api/health")
async def health():
    return {"status": "healthy", "service": "A2Z Downloader API"}

@app.post("/api/analyze")
async def analyze_video(request: AnalyzeRequest):
    """Analyze video URL and return available formats"""
    cleanup_old_files()
    info = await get_video_info(str(request.url))
    return info

@app.post("/api/download")
async def start_download(request: DownloadRequest, background_tasks: BackgroundTasks):
    """Start video download job"""
    job_id = str(uuid.uuid4())
    
    jobs_db[job_id] = {
        'status': 'pending',
        'progress': 0,
        'created_at': time.time(),
        'url': str(request.url),
    }
    
    background_tasks.add_task(download_video, job_id, str(request.url), request.format_id)
    
    return {"job_id": job_id, "status": "pending"}

@app.get("/api/download/{job_id}")
async def get_download_status(job_id: str):
    """Get download job status"""
    if job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs_db[job_id]
    
    if job['status'] == 'completed' and 'file_path' in job:
        file_path = Path(job['file_path'])
        if file_path.exists():
            return {
                "status": job['status'],
                "progress": job['progress'],
                "download_url": f"/api/download/{job_id}/file",
                "filename": file_path.name,
            }
    
    return {
        "status": job['status'],
        "progress": job.get('progress', 0),
        "error": job.get('error'),
    }

@app.get("/api/download/{job_id}/file")
async def download_file(job_id: str):
    """Download the completed file"""
    if job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs_db[job_id]
    
    if job['status'] != 'completed' or 'file_path' not in job:
        raise HTTPException(status_code=400, detail="File not ready")
    
    file_path = Path(job['file_path'])
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        path=file_path,
        filename=file_path.name,
        media_type='application/octet-stream'
    )

@app.post("/api/convert")
async def start_conversion(request: ConvertRequest, background_tasks: BackgroundTasks):
    """Start video conversion job"""
    job_id = str(uuid.uuid4())
    
    download_job_id = str(uuid.uuid4())
    jobs_db[download_job_id] = {
        'status': 'pending',
        'progress': 0,
        'created_at': time.time(),
    }
    
    await download_video(download_job_id, str(request.url))
    
    if jobs_db[download_job_id]['status'] == 'completed':
        input_path = jobs_db[download_job_id]['file_path']
        
        jobs_db[job_id] = {
            'status': 'pending',
            'progress': 0,
            'created_at': time.time(),
        }
        
        background_tasks.add_task(convert_video, job_id, input_path, request.output_format)
        
        return {"job_id": job_id, "status": "pending"}
    else:
        raise HTTPException(status_code=400, detail="Failed to download video")

@app.get("/api/platforms")
async def get_platforms():
    """Get list of supported platforms"""
    platforms = [
        {"name": "YouTube", "url": "youtube.com"},
        {"name": "TikTok", "url": "tiktok.com"},
        {"name": "Instagram", "url": "instagram.com"},
        {"name": "Facebook", "url": "facebook.com"},
        {"name": "Twitter/X", "url": "twitter.com"},
        {"name": "Vimeo", "url": "vimeo.com"},
        {"name": "Dailymotion", "url": "dailymotion.com"},
        {"name": "Reddit", "url": "reddit.com"},
        {"name": "Twitch", "url": "twitch.tv"},
        {"name": "Soundcloud", "url": "soundcloud.com"},
    ]
    return {"platforms": platforms, "total": 1000}

@app.post("/api/contact")
async def submit_contact(request: ContactRequest):
    """Handle contact form submission"""
    print(f"Contact form: {request.name} - {request.email}")
    print(f"Message: {request.message}")
    return {"status": "success", "message": "Thank you for contacting us!"}

@app.on_event("startup")
async def startup_event():
    """Cleanup on startup"""
    cleanup_old_files()

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    cleanup_old_files()
