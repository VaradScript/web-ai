# LustraX Backend & Infrastructure Architecture

To build a fully functional "Tube" site like LustraX, you need a robust backend to handle heavy video traffic, user data, and smart recommendations. Here is the industry-standard architecture.

## 1. The Tech Stack (Recommended)

| Component | Technology | Why? |
|-----------|------------|------|
| **Framework** | **Next.js (App Router)** | You are already using this. Handles frontend & API routes. |
| **Database** | **Supabase (PostgreSQL)** | Best for user data, video metadata, comments, and likes. Includes Auth built-in. |
| **Video Storage** | **Backblaze B2** or **Wasabi** | Much cheaper than AWS S3 for massive video files. |
| **Video Streaming** | **Bunny.net (Bunny Stream)** | **Crucial**. Handles transcoding (converting to 1080p/720p) and global delivery. Adult-friendly. |
| **Thumbnails** | **Supabase Storage** or **BunnyCDN** | Fast delivery of images. |
| **AI Recommendations** | **Pinecone** (Vector DB) | Stores "embeddings" of video tags/titles to find similar content (e.g., "98% Match"). |

---

## 2. Data Flow: How it Works

### A. Uploading a Video
1.  **User/Admin** uploads a raw video file (MP4/MOV) via the Admin Panel.
2.  **Frontend** sends the file to **Bunny Stream** (Video Hosting).
3.  **Bunny Stream** processes the video:
    *   Creates a **Thumbnail** (JPG/WebP).
    *   Transcodes video into **HLS (m3u8)** for smooth streaming on mobile/desktop.
4.  **Backend** saves the *Metadata* to **Supabase**:
    *   Title, Description, Tags, Model Name.
    *   Video ID (from Bunny).
    *   Thumbnail URL.

### B. Watching a Video
1.  **User** visits `/watch/[id]`.
2.  **Next.js** fetches video metadata from **Supabase** (Title, Views, Likes).
3.  **Player** loads the video stream URL from **BunnyCDN**.
4.  **Analytics**: When video plays, update "Views" count in Supabase.

### C. Recommendations (The "AI" Part)
1.  **Tagging**: Every video has tags (e.g., "Red Lingerie", "Glamour", "4K").
2.  **Vector Search**:
    *   Convert tags into numbers (Vectors).
    *   When a user watches Video A, ask the database: *"Find videos with vectors closest to Video A"*.
    *   This gives you the "98% Match".

---

## 3. Database Schema (Supabase/SQL)

You need these tables in your database:

### `users`
*   `id` (UUID)
*   `email`
*   `username`
*   `is_premium` (Boolean)
*   `created_at`

### `videos`
*   `id` (UUID)
*   `title` (Text)
*   `description` (Text)
*   `video_url` (Text - Link to CDN)
*   `thumbnail_url` (Text)
*   `views` (Integer)
*   `duration` (Text)
*   `tags` (Array of Strings)
*   `model_id` (Foreign Key)

### `interactions`
*   `user_id`
*   `video_id`
*   `type` (like, view, save)

---

## 4. Step-by-Step Implementation Plan

### Phase 1: Database Setup
1.  Create a **Supabase** project (Free).
2.  Run the SQL script to create `users` and `videos` tables.
3.  Connect Supabase to Next.js using environment variables.

### Phase 2: Video Player Integration
1.  Sign up for **Bunny.net** (Trial available).
2.  Upload a real test video to Bunny.
3.  Replace the "Simulated" video player in `watch/[id]/page.tsx` with the real Bunny Embed code.

### Phase 3: Dynamic Content
1.  Create an API route `app/api/videos/route.ts` to fetch videos from Supabase.
2.  Update the Homepage to fetch from this API instead of using Mock Data.

### Phase 4: Recommendations
1.  Write a simple algorithm: `SELECT * FROM videos WHERE tags CONTAINS 'glamour'`.
