# LustraX / Velvet Stream - Production Implementation Guide

This document outlines the architecture required to move this prototype to a production-grade adult video platform.

## 1. Video Storage & Streaming Architecture (AWS S3 + CloudFront)

**Requirement:** Do not serve videos from the Next.js server. Use a dedicated CDN.

### Workflow:
1.  **Upload:** User uploads to a temporary bucket (e.g., `lustrax-upload-temp`).
2.  **Processing (AWS Lambda + MediaConvert):**
    *   Trigger a Lambda function on upload.
    *   Convert source video to HLS (`.m3u8`) format with multiple bitrates (360p, 720p, 1080p).
    *   Generate a thumbnail poster.
3.  **Storage:** Save processed HLS files to a public-read bucket (e.g., `lustrax-public-content`).
4.  **Delivery:** Use CloudFront (CDN) to serve the content globally.
    *   Enable Signed Cookies/URLs if "Premium" content is restricted.

### Database Update:
Update your `db.ts` or database schema to point to the CDN:

```typescript
const video = {
  id: "123",
  // OLD: "https://server.com/video.mp4"
  // NEW Production URL: 
  videoUrl: "https://cdn.lustrax.com/videos/123/master.m3u8", // HLS Stream
  thumbnail: "https://cdn.lustrax.com/videos/123/thumb.jpg"
}
```

## 2. Real-Time Feed (WebSockets)

**Requirement:** detailed "Live" user activity (likes, new uploads).

### Architecture:
1.  **WebSocket Server:** Use `Socket.io` (Node.js) or AWS API Gateway usage (WebSocket API).
2.  **Events:**
    *   `new_video`: Broadcast when a video is processed.
    *   `like_update`: Broadcast when a like count changes significantly.

### Frontend Integration (Next.js):
Install: `npm install socket.io-client`

```javascript
// components/RealTimeFeed.js
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://api.lustrax.com');

export default function RealTimeFeed() {
  useEffect(() => {
    socket.on('new_video', (data) => {
      // Show toast notification
      console.log("New video dropped:", data.title);
    });
  }, []);
  return null;
}
```

## 3. Adult Reels Algorithm

The current frontend implements a "Heat Score" based on:
`Score = (Views * 1000) + (MatchScore * 100) + RandomFactor`

**To improve this in backend:**
1.  Track `watch_time` percentage (did they finish the video?).
2.  Track `re-watch` rate.
3.  Use a Vector Database (Pinecone/Milvus) to recommend similar content based on user history embedding.

## 4. Security Checklist
*   **Age Verification:** Integration with Yoti or simplistic "I am 18" cookie gate.
*   **DMCA Compliance:** Form for reporting content.
*   **Content Moderation:** Automated AI scanning (AWS Rekognition) for banned content before publishing.
