import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// STANDARD INTERFACE for your site
interface Video {
    id: string;
    title: string;
    views: string;
    duration: string;
    author: string;
    thumbnail: string;
    videoUrl: string;
    embedUrl?: string; // Critical for API content
    categories: string[];
    tags: string[];
    uploadDate: string;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const idParam = searchParams.get('id');
    const type = searchParams.get('type') || 'videos'; // 'videos' or 'shorts'

    // 1. SCAN FOR LOCAL VIDEOS (Strict Mode - No External API)
    let localVideos: Video[] = [];
    try {
        const targetFolder = type === 'shorts' ? 'shorts' : 'videos';
        const videosDir = path.join(process.cwd(), 'public', targetFolder);

        if (fs.existsSync(videosDir)) {
            const files = fs.readdirSync(videosDir).filter(file => file.endsWith('.mp4'));

            localVideos = files.map((file, index) => {
                const titleStr = file.replace('.mp4', '').replace(/_/g, ' ');

                // Smart Categorization based on filename
                const detectedCategories: string[] = ["Local"];
                const keywords = ["Anal", "Teen", "Milf", "Public", "Lesbian", "POV", "Japanese", "Gangbang", "Booty", "Solo", "Hardcore", "Twerk", "Asian"];

                keywords.forEach(kw => {
                    if (titleStr.toLowerCase().includes(kw.toLowerCase())) {
                        detectedCategories.push(kw);
                    }
                });

                const categories = Array.from(new Set(detectedCategories));

                return {
                    id: `local-${index}`, // NOTE: Shorts might collide with Videos IDs if mixed, but they are separate pages
                    title: titleStr,
                    views: "Local Storage",
                    duration: "Full",
                    author: "You",
                    thumbnail: "/assets/placeholder_adult.svg",
                    videoUrl: `/${targetFolder}/${file}`,
                    embedUrl: "",
                    categories: categories,
                    tags: ["Uploaded", ...categories],
                    uploadDate: new Date().toISOString()
                };
            });
        }
    } catch (e) {
        console.error("Local Scan Error:", e);
    }

    // 2. HANDLE SINGLE ID REQUEST (For Watch Page)
    if (idParam) {
        const targetVideo = localVideos.find(v => v.id === idParam);
        if (targetVideo) {
            return NextResponse.json({ source: 'local', video: targetVideo });
        }
        return NextResponse.json({ source: 'error', message: 'Video not found' }, { status: 404 });
    }

    // 3. FILTER BY QUERY (For Categories)
    if (query && query !== 'All') {
        localVideos = localVideos.filter(v =>
            v.title.toLowerCase().includes(query.toLowerCase()) ||
            v.categories.some(c => c.toLowerCase().includes(query.toLowerCase()))
        );
    }

    // Return Strictly Local Videos
    return NextResponse.json({ source: 'local', videos: localVideos });
}
