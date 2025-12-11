"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { db } from '../data/db';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const results = db.search(query);

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: 'bold' }}>
                Search Results for "{query}"
            </h2>

            {results.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
                    <h3>No videos found matching your search.</h3>
                    <p>Try searching for "glamour", "red", "4k", or "yoga".</p>
                </div>
            ) : (
                <div className="video-grid">
                    {results.map((video) => (
                        <Link href={`/watch/${video.id}`} key={video.id} className="video-card">
                            <div className="thumbnail-container">
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, width: '100%', height: '100%',
                                    background: `url('${video.thumbnail}') center/cover no-repeat`,
                                    transition: 'transform 0.3s'
                                }} className="thumb-bg"></div>

                                <span className="duration-badge">{video.duration}</span>
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
                    ))}
                </div>
            )}

            <style jsx>{`
        .video-card:hover .thumb-bg {
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
}
