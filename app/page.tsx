"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { db, Video } from './data/db';
import AdSpot from '../components/AdSpot'; // Import AdSpot

export default function Home() {
    const searchParams = useSearchParams();
    const [activeCategory, setActiveCategory] = useState('All');
    const [videos, setVideos] = useState<Video[]>([]);
    const [isApiLoading, setIsApiLoading] = useState(true);

    // Sync Active Category with URL & Fetch API
    useEffect(() => {
        const cat = searchParams.get('category');
        const currentCat = cat || 'All';
        setActiveCategory(currentCat);

        // API Fetch Logic
        const fetchRealContent = async () => {
            setIsApiLoading(true);
            try {
                // Call our own internal API
                const res = await fetch(`/api/videos?query=${currentCat}&limit=20`);
                const data = await res.json();

                if ((data.source === 'api' || data.source === 'local') && data.videos.length > 0) {
                    setVideos(data.videos);
                } else {
                    // No videos found - Show empty state instead of mock/abstract
                    setVideos([]);
                }
            } catch (e) {
                console.error("Failed to load API", e);
                setVideos([]);
            } finally {
                setIsApiLoading(false);
            }
        };

        fetchRealContent();

    }, [searchParams]);

    const displayedVideos = videos;
    const categories = ['All', 'Anal', 'Teen', 'Milf', 'Asian', 'Public', 'Lesbian', 'Hardcore', 'POV', 'Gangbang', 'Booty', 'Recommended', 'Trending'];

    return (
        <div style={{ padding: '20px' }}>
            {/* MONETIZATION: Top Leaderboard */}
            <AdSpot position="header" />

            {/* Categories Bar */}
            <div style={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                paddingBottom: '15px',
                marginBottom: '20px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }} className="no-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '8px 20px',
                            borderRadius: '20px',
                            border: 'none',
                            background: activeCategory === cat ? '#fff' : '#222',
                            color: activeCategory === cat ? '#000' : '#fff',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {activeCategory === 'All' ? 'Recommended For You' : activeCategory}
                {activeCategory === 'Recommended' && <span style={{ fontSize: '0.8rem', background: 'var(--primary)', padding: '2px 8px', borderRadius: '4px' }}>AI POWERED</span>}
            </h2>

            {/* Video Grid */}
            <div className="video-grid">
                {displayedVideos.map((video) => (
                    <div key={video.id} className="video-card" style={{ position: 'relative', display: 'block' }}>
                        <Link href={`/watch/${video.id}`} style={{ textDecoration: 'none' }}>
                            <div className="thumbnail-container"
                                onMouseEnter={(e) => {
                                    // On hover, we want to try and show the iframe if we have one
                                    const container = e.currentTarget;
                                    const iframe = container.querySelector('iframe');
                                    const img = container.querySelector('.thumb-bg');
                                    if (iframe) {
                                        iframe.style.opacity = '1';
                                        iframe.src = iframe.getAttribute('data-src') || '';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const container = e.currentTarget;
                                    const iframe = container.querySelector('iframe');
                                    if (iframe) {
                                        iframe.style.opacity = '0';
                                        iframe.src = ''; // Unload to save memory
                                    }
                                }}
                            >
                                {/* Static Thumbnail by default (User wants video but we need a placeholder for the iframe load) */}
                                <div
                                    className="thumb-bg"
                                    style={{
                                        position: 'absolute',
                                        top: 0, left: 0, width: '100%', height: '100%',
                                        background: `url('${video.thumbnail}') center/cover no-repeat`,
                                        zIndex: 1
                                    }}
                                ></div>

                                {/* Real Embed Iframe (Hidden until Hover) */}
                                {video.embedUrl && (
                                    <iframe
                                        data-src={video.embedUrl.includes('?') ? `${video.embedUrl}&autoplay=1&muted=1` : `${video.embedUrl}?autoplay=1&muted=1`}
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0, width: '100%', height: '100%',
                                            border: 'none',
                                            opacity: 0, // Hidden by default
                                            zIndex: 2,
                                            pointerEvents: 'none' // Click goes to Link
                                        }}
                                        allow="autoplay; encrypted-media"
                                    />
                                )}

                                {/* Fallback Loop if no embed (e.g. for local files) */}
                                {!video.embedUrl && (
                                    <video
                                        src={video.videoUrl}
                                        muted
                                        loop
                                        playsInline
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0, width: '100%', height: '100%',
                                            objectFit: 'cover',
                                            zIndex: 1
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.play()}
                                        onMouseLeave={(e) => e.currentTarget.pause()}
                                    />
                                )}

                                <span className="duration-badge" style={{ zIndex: 3 }}>{video.duration}</span>

                                {/* AI Match Badge */}
                                {(video.matchScore || 0) > 90 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '8px',
                                        left: '8px',
                                        background: 'linear-gradient(45deg, var(--primary), #ff00cc)',
                                        color: '#fff',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                                        zIndex: 3
                                    }}>
                                        {video.matchScore}% Match
                                    </span>
                                )}
                            </div>
                            <div className="video-info">
                                <div className="video-title" style={{ color: '#fff' }}>{video.title}</div>
                                <div className="video-meta">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {video.author}
                                        <span style={{ width: '12px', height: '12px', background: '#3ea6ff', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#fff' }}>✓</span>
                                    </span>
                                    <span>{video.views} views</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .video-card:hover .thumb-bg {
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
}
