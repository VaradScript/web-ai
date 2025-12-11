"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db, Video } from '../data/db';
import Link from 'next/link';

export default function ReelsPage() {
    const [reels, setReels] = useState<Video[]>([]);
    const [page, setPage] = useState(1);
    const observer = useRef<IntersectionObserver | null>(null);
    const [playingId, setPlayingId] = useState<string | null>(null);

    // Initial Load - Fetch Shorts from API
    useEffect(() => {
        fetch('/api/videos?type=shorts')
            .then(res => res.json())
            .then(data => {
                if (data.videos && data.videos.length > 0) {
                    setReels(data.videos);
                    setPlayingId(data.videos[0].id);
                }
            })
            .catch(err => console.error("Failed to load shorts", err));
    }, []);

    // Scroll Observer for Auto-Play
    const lastReelRef = useCallback((node: HTMLDivElement) => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                    const videoId = entry.target.getAttribute('data-id');
                    if (videoId) setPlayingId(videoId);
                }
            });
        }, { threshold: 0.6 });

        document.querySelectorAll('.reel-item').forEach(el => observer.current?.observe(el));

    }, [reels]);

    return (
        <main className="reels-container" style={{
            height: '100vh',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            background: '#000',
            scrollBehavior: 'smooth'
        }}>
            {reels.map((video, index) => {
                const isLast = index === reels.length - 1;
                return (
                    <div
                        key={`${video.id}-${index}`}
                        ref={isLast ? lastReelRef : null}
                        className="reel-item"
                        data-id={video.id}
                        data-last={isLast ? "true" : undefined}
                    >
                        <ReelItem
                            video={video}
                            isPlaying={playingId === video.id}
                        />
                    </div>
                );
            })}

            {reels.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-500">
                    Loading Algorithm...
                </div>
            )}
        </main>
    );
}

function ReelItem({ video, isPlaying }: { video: Video, isPlaying: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [showPlayOverlay, setShowPlayOverlay] = useState(true);
    const [isVideoReady, setIsVideoReady] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setShowPlayOverlay(false);
                            setIsVideoReady(true);
                        })
                        .catch(error => {
                            console.log("Autoplay blocked:", error);
                            setShowPlayOverlay(true);
                            videoRef.current!.muted = true;
                        });
                }
            } else {
                videoRef.current.pause();
                setShowPlayOverlay(true);
            }
        }
    }, [isPlaying]);

    const handleManualPlay = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play();
            setShowPlayOverlay(false);
            setIsVideoReady(true);
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100%',
            scrollSnapAlign: 'start',
            position: 'relative',
            background: '#000',
            borderBottom: '1px solid #222',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            {/* 1. Video Player Layer */}
            <div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }}>
                {video.embedUrl ? (
                    <iframe
                        src={video.embedUrl}
                        style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'auto' }}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    />
                ) : (
                    <video
                        ref={videoRef}
                        src={video.videoUrl}
                        loop
                        playsInline
                        muted={true}
                        onClick={handleManualPlay}
                        onLoadedData={() => setIsVideoReady(true)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                )}
            </div>

            {/* 2. Thumbnail Layer Removed as per user request */}

            {/* 3. Play Button Overlay */}
            {!video.embedUrl && showPlayOverlay && (
                <div
                    onClick={handleManualPlay}
                    style={{
                        position: 'absolute',
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '50%',
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="none">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                </div>
            )}

            {/* 4. Gradients */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 5
            }}></div>

            {/* 5. Right Actions */}
            <div style={{
                position: 'absolute',
                bottom: '100px',
                right: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'center',
                zIndex: 20
            }}>
                <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center gap-1 group">
                    <div className={`p-3 rounded-full bg-black/40 backdrop-blur-md transition ${isLiked ? 'text-red-500' : 'text-white'}`}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </div>
                    <span className="text-xs font-bold">{isLiked ? parseInt(video.views) + 1 : video.views}</span>
                </button>

                <button className="flex flex-col items-center gap-1">
                    <div className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                    </div>
                    <span className="text-xs font-bold">Comments</span>
                </button>

                <button className="flex flex-col items-center gap-1">
                    <div className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                    </div>
                    <span className="text-xs font-bold">Share</span>
                </button>
            </div>

            {/* 6. Bottom Metadata */}
            <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '16px',
                right: '80px',
                zIndex: 20,
                textAlign: 'left'
            }}>
                <div className="flex items-center gap-2 mb-2">
                    {/* Avatar Removed */}
                    <div>
                        <h3 className="text-white font-bold text-base m-0 leading-tight">{video.author}</h3>
                        <span className="text-xs text-gray-300">Suggested for you</span>
                    </div>
                    <button className="ml-2 px-3 py-1 bg-transparent border border-white/50 rounded-full text-xs font-bold text-white hover:bg-white/10">Follow</button>
                </div>

                <Link href={`/watch/${video.id}`} className="block">
                    <p className="text-white text-sm line-clamp-2 leading-relaxed opacity-90 mb-2">
                        {video.title} <span className="text-blue-400">#viral #trending #{video.categories[0]}</span>
                    </p>
                </Link>

                <div className="flex items-center gap-2 text-xs text-white/70">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                    <span className="animate-marquee whitespace-nowrap overflow-hidden w-40">Original Audio - {video.author} • {video.title}</span>
                </div>
            </div>
        </div>
    );
}

/* 
<style>
@keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
}
.animate-marquee {
    animation: marquee 10s linear infinite;
}
</style>
*/
