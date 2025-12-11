# LustraX Local Video Storage Guide

You asked how to **store and play** your own videos. We have built a system that automatically detects your files!

## How to Add Videos (The Plan)

1.  **Locate the Folder**: Open your project folder `velvet-stream`.
2.  **Go to**: `public/videos/`.
3.  **Drop Files**: Drag and drop any `.mp4` file into this folder.
    *   *Example*: `public/videos/my_collection_1.mp4`
4.  **Refresh Site**: Go to `http://localhost:3000`.

## What Happens?

*   The website **scans** the `public/videos` folder automatically.
*   Your files will appear **at the top** of the homepage.
*   The title will be the filename (e.g. "My Collection 1").
*   Playing the video will stream **directly from your hard drive** (Instant, High Quality).

## Fallback (If no files)

If the folder is empty:
1.  We try to fetch explicit content from **XVIDAPI**.
2.  If that fails, we show **3 Verified Real Porn Embeds** (Hardcoded) so the site always has content.

## Troubleshooting

*   If your file doesn't show up, ensure it ends in `.mp4`.
*   Ensure you are refreshing the page after adding files.
