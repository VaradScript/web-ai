"use client";
import React, { useState, useEffect } from 'react';
import { videos, Video } from '../data/db'; // Import our robust data source
import Link from 'next/link';
import { Heart } from 'lucide-react'; // Assuming lucide-react is installed or use text emoji

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Get favorite IDs from localStorage (simulating user profile)
        const savedIds = JSON.parse(localStorage.getItem('lustrax_favorites') || '[]');

        // 2. Filter the global video list to find matches
        const favoriteVideos = videos.filter(v => savedIds.includes(v.id));

        setFavorites(favoriteVideos);
        setIsLoading(false);
    }, []);

    const removeFavorite = (e: React.MouseEvent, id: string) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();

        // Remove from State
        const updated = favorites.filter(v => v.id !== id);
        setFavorites(updated);

        // Remove from LocalStorage
        const currentIds = updated.map(v => v.id);
        localStorage.setItem('lustrax_favorites', JSON.stringify(currentIds));
    };

    if (isLoading) return <div className="p-8 text-white">Loading your collection...</div>;

    return (
        <div className="p-6 md:p-8 min-h-screen bg-[#0a0a0a] text-white">
            <h1 className="text-3xl font-bold mb-2 text-primary-500">My Favorites</h1>
            <p className="text-gray-400 mb-8 border-b border-gray-800 pb-4">
                {favorites.length} Videos Saved
            </p>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-[#111] rounded-xl border border-gray-800">
                    <p className="text-xl text-gray-500 mb-4">You haven't saved any videos yet.</p>
                    <Link href="/" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-full font-bold transition">
                        Browse Videos
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map((video) => (
                        <Link href={`/watch/${video.id}`} key={video.id} className="group block bg-[#151515] rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-primary-500/20">
                            {/* Thumbnail Container */}
                            <div className="relative aspect-video">
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url('${video.thumbnail}')` }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>

                                {/* Duration Badge */}
                                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs font-bold rounded">
                                    {video.duration}
                                </span>

                                {/* Remove Button (Hover only) */}
                                <button
                                    onClick={(e) => removeFavorite(e, video.id)}
                                    className="absolute top-2 right-2 p-2 bg-red-500/90 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                                    title="Remove from favorites"
                                >
                                    <span className="text-white text-xs font-bold">X</span>
                                </button>
                            </div>

                            {/* Info Area */}
                            <div className="p-4">
                                <h3 className="font-bold text-sm md:text-base line-clamp-2 leading-snug group-hover:text-primary-400 transition">
                                    {video.title}
                                </h3>

                                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                                    <span>{video.author}</span>
                                    <div className="flex items-center gap-2">
                                        <span>{video.views} views</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
