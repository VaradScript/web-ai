"use client";
import React, { useState, useEffect } from 'react';
import { db, Video } from '../../data/db';
import Link from 'next/link';
import AdSpot from '../../../components/AdSpot'; // Correct: Up 3 levels to Root -> components

import { useParams } from 'next/navigation'; // Add import

export default function WatchPage() { // Remove props
    const params = useParams(); // Use hook
    const id = params.id as string; // Get ID safely
    const [videoData, setVideoData] = useState<Video | null>(null);
    const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);

    useEffect(() => {
        if (id) {
            // Fetch Specific Video Detail from our API (supports Local files)
            fetch(`/api/videos?id=${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.video) {
                        setVideoData(data.video);

                        // Fetch Related Videos (Just grab a list)
                        fetch(`/api/videos?limit=10`)
                            .then(r => r.json())
                            .then(d => {
                                if (d.videos) {
                                    // Filter out current video
                                    setRelatedVideos(d.videos.filter((v: Video) => v.id !== id).slice(0, 10));
                                }
                            });
                    }
                })
                .catch(err => console.error("Failed to load video", err));
        }
    }, [id]);

    if (!videoData) return <div style={{ padding: '20px', color: '#fff' }}>Loading...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {/* Main Video Player Section */}
                <div style={{ flex: '1 1 800px' }}>
                    <div style={{
                        aspectRatio: '16/9',
                        background: '#000',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                    }}>
                        {/* Video Player: Supports Embeds or Direct MP4 */}
                        {videoData.embedUrl ? (
                            <iframe
                                src={videoData.embedUrl}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <video
                                controls
                                autoPlay
                                muted
                                loop
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            >
                                <source src={videoData.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>

                    <h1 style={{ fontSize: '1.5rem', marginTop: '20px', marginBottom: '10px' }}>{videoData.title}</h1>

                    {/* MONETIZATION: Leaderboard under video */}
                    <AdSpot position="header" className="my-4" />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `url('${videoData.thumbnail}') center/cover` }}></div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{videoData.author}</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>1.2M Subscribers</div>
                            </div>
                            <button style={{
                                background: '#fff',
                                color: '#000',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                marginLeft: '10px',
                                cursor: 'pointer'
                            }}>Subscribe</button>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ background: '#222', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}>👍 12K</button>
                            <button style={{ background: '#222', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}>Share</button>
                            <button style={{ background: '#e11d48', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>JOIN PREMIUM</button>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px', background: '#1a1a1a', padding: '15px', borderRadius: '8px' }}>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                            Watch this exclusive 4K footage. Join the premium club for full access to VR content and live streams.
                            <br /><br />
                            Tags: {videoData.tags.map(tag => <span key={tag} style={{ color: 'var(--primary)', marginRight: '10px', cursor: 'pointer' }}>#{tag}</span>)}
                        </p>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <h3>245 Comments</h3>
                        {/* Mock Comments */}
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#333' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '4px' }}>User {i} <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'normal' }}>2 hours ago</span></div>
                                    <p style={{ fontSize: '0.9rem', margin: 0 }}>This is amazing content! The quality is unreal.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendations Sidebar */}
                <div style={{ flex: '1 1 300px' }}>
                    <h3 style={{ marginTop: 0 }}>Up Next</h3>

                    {/* MONETIZATION: Sidebar Ad */}
                    <AdSpot position="sidebar" />

                    {relatedVideos.map((video) => (
                        <Link href={`/watch/${video.id}`} key={video.id} style={{ display: 'flex', gap: '10px', marginBottom: '15px', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ width: '160px', height: '90px', position: 'relative', flexShrink: 0 }}>
                                <video
                                    src={video.videoUrl}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.muted = false; }}
                                    onMouseLeave={(e) => { e.currentTarget.muted = true; }}
                                />
                                <span style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', fontSize: '0.7rem', padding: '1px 4px', borderRadius: '2px', color: '#fff' }}>{video.duration}</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{video.title}</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{video.author}</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{video.views} views</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div >
    );
}
