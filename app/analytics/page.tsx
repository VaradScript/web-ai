"use client";
import React, { useMemo } from 'react';
import { db } from '../data/db';

export default function AnalyticsPage() {
    const videos = db.getAll();

    // 1. WORD CLOUD LOGIC
    // Extract all tags and count frequency
    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        videos.forEach(v => {
            v.tags.forEach(tag => {
                const t = tag.toLowerCase();
                counts[t] = (counts[t] || 0) + 1;
            });
        });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    }, [videos]);

    // 2. DESCRIPTIVE ANALYTICS: Views Distribution
    const viewsData = useMemo(() => {
        return videos.map(v => {
            const val = parseFloat(v.views);
            return v.views.includes('M') ? val * 1000000 : val * 1000;
        }).sort((a, b) => b - a).slice(0, 20); // Top 20 videos
    }, [videos]);

    // 3. CLUSTERING VISUALIZATION (Simplified K-Means)
    // We group videos by their primary category
    const clusters = useMemo(() => {
        const groups: Record<string, number> = {};
        videos.forEach(v => {
            const cat = v.categories[0] || "Uncategorized";
            groups[cat] = (groups[cat] || 0) + 1;
        });
        return groups;
    }, [videos]);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                LustraX Intelligence
            </h1>
            <p className="text-gray-400 mb-12">Real-time data scraping & analytics dashboard.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* WORD CLOUD SECTION */}
                <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
                    <h2 className="text-xl font-bold mb-6 text-pink-400 flex items-center gap-2">
                        <span className="text-2xl">☁️</span> Keyword Cloud
                    </h2>
                    <div className="flex flex-wrap gap-3 justify-center items-center h-64 overflow-hidden">
                        {tagCounts.map(([tag, count], i) => (
                            <span
                                key={tag}
                                style={{
                                    fontSize: `${Math.max(0.8, Math.min(2.5, count * 0.2))}rem`,
                                    opacity: Math.max(0.3, Math.min(1, count * 0.1)),
                                    color: i % 2 === 0 ? '#ec4899' : '#8b5cf6'
                                }}
                                className="font-bold cursor-pointer hover:scale-110 transition"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* DISTRIBUTION CHARTS */}
                <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
                    <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2">
                        <span className="text-2xl">📊</span> Category Clusters
                    </h2>
                    <div className="space-y-4">
                        {Object.entries(clusters).map(([cat, count]) => (
                            <div key={cat} className="flex items-center gap-4">
                                <div className="w-24 text-right text-sm text-gray-400 font-mono">{cat}</div>
                                <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                                        style={{ width: `${(count / videos.length) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="w-12 text-xs font-bold">{count}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PERFORMANCE METRICS */}
            <div className="mt-8 bg-[#111] p-6 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-bold mb-6 text-green-400 flex items-center gap-2">
                    <span className="text-2xl">📈</span> Top Performing Content
                </h2>
                <div className="flex items-end gap-1 h-40 w-full border-b border-gray-700">
                    {viewsData.map((views, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-green-500/20 hover:bg-green-500 hover:scale-y-105 transition-all origin-bottom rounded-t"
                            style={{ height: `${(views / Math.max(...viewsData)) * 100}%` }}
                            title={`${(views / 1000).toFixed(0)}K Views`}
                        ></div>
                    ))}
                </div>
                <div className="mt-2 text-center text-xs text-gray-500">Video Index (Top 20 by Views)</div>
            </div>
        </div>
    );
}
