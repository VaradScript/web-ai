export interface Video {
    id: string;
    title: string;
    views: string;
    duration: string;
    author: string;
    thumbnail: string;
    videoUrl: string; // The .mp4 link
    embedUrl?: string; // NEW: For real video embeds (e.g. from api)
    categories: string[];
    tags: string[];
    uploadDate: string;
    matchScore?: number;
}

// Data Arrays for Generation (Simulating Real Adult Content Metadata)
const authors = [
    "Riley Reid", "Lana Rhoades", "Mia Khalifa", "Angela White", "Abella Danger", "Brandi Love", "Nicole Aniston",
    "Sasha Grey", "Dani Daniels", "Kimmy Granger", "Emily Willis", "Elsa Jean", "Lena Paul",
    "Adriana Chechik", "Jordi El Niño", "Johnny Sins", "Kendra Lust", "Lisa Ann", "Violet Myers", "Eva Elfie"
];

const titles = {
    prefixes: ["Hardcore", "Anal", "Deepthroat", "Rough", "Double Penetration", "Cumshot", "POV:", "Brazzers:", "Naughty", "Step-Mom", "Teen", "Uncensored"],
    subjects: ["Fucks Plumber", "Gangbang", "Creampie Surprise", "Swallows All", "Squirt Fest", "Threesome Action", "Public Sex", "Dorm Room Fun", "Casting Couch", "Massage Ending", "Step-Sister Stuck", "Anal Gape"],
    suffixes: ["Compilation", "Full HD", "Inside", "Creampie", "Facial", "Squirt", "XXX", "Pornhub Exclusive", "Squirting Orgasm", "Raw", "No Condom"]
};

// Explicitly defined categories for the UI
const CATEGORIES = ["Trending", "VR", "4K", "POV", "Hardcore", "Softcore", "Amateur", "Verified", "Milf", "Teens"];

const tagsList = ["brunette", "blonde", "redhead", "tattooed", "milf", "teen", "solo", "group", "outdoor", "indoor", "cosplay", "feet", "anal", "oral"];

const thumbnails = [
    "/assets/placeholder_adult.svg",
    "/assets/placeholder_adult.svg",
    "/assets/placeholder_adult.svg",
    "/assets/placeholder_adult.svg",
    "/assets/placeholder_adult.svg"
];

// LIST OF "GLAMOUR / MODEL" DEMO VIDEOS (Verified Direct MP4s)
const SAMPLE_VIDEOS = [
    // WORKING PLACEHOLDERS (HD Abstract/Action) - Replace with your files later!
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",

    // Uncomment these if you add local files:
    // "/videos/demo_porn_1.mp4",
    // "/videos/demo_porn_2.mp4"
];


// Helper to get random item from array
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper to generate a random video
const generateVideo = (index: number): Video => {
    const id = (100 + index).toString();
    const title = `${getRandom(titles.prefixes)} ${getRandom(titles.subjects)} ${getRandom(titles.suffixes)}`;

    // Generate realistic views (e.g., 10K - 5M)
    const viewCount = Math.floor(Math.random() * 5000000) + 10000;
    const views = viewCount > 1000000
        ? (viewCount / 1000000).toFixed(1) + "M"
        : (viewCount / 1000).toFixed(0) + "K";

    // Random Duration
    const minutes = Math.floor(Math.random() * 56) + 3;
    const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');

    // Assign Categories: Ensure some clearly fall into specific buckets
    const primaryCat = getRandom(CATEGORIES);
    const secondaryCat = getRandom(CATEGORIES);
    const categories = Array.from(new Set([primaryCat, secondaryCat, "Recommended"]));

    // Inject Real XVIDAPI Embeds for the first 3 videos to ensure "Real Porn" works immediately
    let finalEmbed = "";
    if (index === 0) finalEmbed = "https://upload18.net/play/index/xvidapi-83784679";
    if (index === 1) finalEmbed = "https://upload18.net/play/index/xvidapi-69820329";
    if (index === 2) finalEmbed = "https://upload18.net/play/index/xvidapi-69838089";

    return {
        id,
        title,
        views,
        duration: `${minutes}:${seconds}`,
        author: getRandom(authors),
        thumbnail: getRandom(thumbnails),
        // Cycle through different videos based on index
        videoUrl: SAMPLE_VIDEOS[index % SAMPLE_VIDEOS.length],
        embedUrl: finalEmbed, // Use validated real embed if set
        categories: categories,
        tags: [getRandom(tagsList), getRandom(tagsList), getRandom(tagsList)],
        uploadDate: new Date().toISOString().split('T')[0],
        matchScore: Math.floor(Math.random() * 30) + 70
    };
};

// Generate 150 Videos
export const videos: Video[] = Array.from({ length: 150 }, (_, i) => generateVideo(i));


// Simulated Database Functions
export const db = {
    getAll: () => videos,

    getById: (id: string) => videos.find(v => v.id === id),

    // Fixed Category Logic
    getByCategory: (category: string) => {
        if (!category || category === 'All') return videos;

        // Filter specifically by category string
        const filtered = videos.filter(v => v.categories.includes(category));

        // If "Trending", simulate finding high-view videos
        if (category === 'Trending' && filtered.length < 5) {
            return videos.filter(v => parseInt(v.views) > 1); // Mock high views logic
        }

        return filtered;
    },

    search: (query: string) => {
        const lowerQuery = query.toLowerCase();
        return videos.filter(v =>
            v.title.toLowerCase().includes(lowerQuery) ||
            v.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
            v.author.toLowerCase().includes(lowerQuery)
        );
    },

    getRelated: (currentId: string) => {
        const current = videos.find(v => v.id === currentId);
        if (!current) return videos.slice(0, 8);

        return videos
            .filter(v => v.id !== currentId)
            .sort(() => 0.5 - Math.random()) // Shuffle for demo
            .slice(0, 10);
    }
};
