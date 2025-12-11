# LustraX Naming & Cloud Guide

You plan to upload more videos. Here is the **Best Practice** to keep everything organized and working automatically.

## 1. Naming Suggestion (CRITICAL)

To make sure your videos are **automatically categorized** (e.g. appearing in "Teen", "Milf", "Asian"), use this naming format:

**Format:** `Category_Action_Actor.mp4`

**Examples:**
*   ✅ `Asian_Japanese_Massage.mp4` (Will tag as: Asian, Massage, Japanese)
*   ✅ `Milf_Step_Mom_Kitchen.mp4` (Will tag as: Milf, Step-Mom)
*   ✅ `Ebony_Big_Booty_Twerk.mp4` (Will tag as: Ebony, Booty, Twerk)
*   ❌ `vid_123.mp4` (Bad: No categories will be detected)

**List of Auto-Detected Keywords:**
*   Anal, Teen, Milf, Public, Lesbian, POV, Japanese, Gangbang, Booty, Solo, Hardcore, Twerk, Asian, Ebony, Hentai, VR.

## 2. Moving to Cloud (Future Plan)

Right now, storing files in `public/videos` is great for **Testing**. But if you upload 100GB of videos, your computer/server will get full.

**Recommendation:**
1.  Create an account on **AWS S3** or **BunnyCDN** (Cheap video storage).
2.  Upload your properly named files there.
3.  We can update the code to **Read from the Cloud** instead of your local folder.

**Step 1:** Just keep naming files correctly here.
**Step 2:** When you are ready, we upload them all to the cloud and switch 1 line of code.
