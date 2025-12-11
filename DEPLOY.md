# How to Deploy LustraX

Since LustraX is built with **Next.js**, the easiest and best way to host it is **Vercel**.

## Option 1: Deploy to Vercel (Recommended)

1.  **Push to GitHub**:
    *   Initialize git: `git init`
    *   Add files: `git add .`
    *   Commit: `git commit -m "Initial commit"`
    *   Create a repo on GitHub and push.

2.  **Connect to Vercel**:
    *   Go to [vercel.com](https://vercel.com).
    *   Sign up/Log in.
    *   Click "Add New Project".
    *   Select your GitHub repository.
    *   Click **Deploy**.

Vercel will automatically detect Next.js and build your site. It will give you a live URL (e.g., `lustrax.vercel.app`).

## Option 2: VPS Hosting (DigitalOcean/Linode)

If you want full control (common for adult sites to avoid Terms of Service issues with some providers), use a VPS.

1.  **Get a VPS** (Ubuntu 20.04+).
2.  **Install Node.js**:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
3.  **Upload Code**: Use SFTP or Git clone.
4.  **Build**:
    ```bash
    npm install
    npm run build
    ```
5.  **Run with PM2** (Process Manager):
    ```bash
    npm install -g pm2
    pm2 start npm --name "lustrax" -- start
    ```
6.  **Setup Nginx** as a reverse proxy to port 3000.

## Important Note on Content Hosting
**Do not host the actual video files on Vercel or your VPS.**
*   Use **BunnyCDN** or **AWS S3** for video storage.
*   Update `app/data/db.ts` with the real URLs from your CDN.
