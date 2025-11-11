CHANGES: Reels & Home

Summary
- Implemented a vertical "reels" UI and fixed Home data fetching.
- Added click-to-play toggle and fallback behavior for videos.
- Created safer Home.jsx that fetches from backend and renders videos.

Files modified/added
- forntend/react/src/components/Reels.jsx
  - Added FALLBACK_VIDEO and logic to try a remote fallback when local src fails.
  - Added click-to-play toggle so users can tap a reel to start/stop playback.
  - Kept IntersectionObserver to auto-play the centered reel and pause others.

- forntend/react/src/pages/general/Home.jsx
  - Replaced previous static sample list with a fetch from `http://localhost:3000/api/food/api/food`.
  - Handles multiple possible response shapes: `response.data.foodItems`, `response.data.items`, or `response.data`.
  - Renders video `poster` (if present) and `source` using `r.video`.
  - Fixed Link path to use a proper template string: `/food-partner/${r.foodPartner}`.

- forntend/react/src/styles/reels.css
  - Overlay moved to bottom, two-line truncation for description, Visit store button style.
  - Added `.reel-item.reel-error` fallback message.

How to test
1. Add local videos (optional): place files in `forntend/react/public/videos/...` and ensure `r.video` points to `/videos/<filename>.mp4`.
2. Start the frontend dev server from `forntend/react` and open the Home route.
3. The page will attempt to fetch videos from `http://localhost:3000/api/food/api/food`.
4. Videos will autoplay (muted) if the browser allows it; tap a reel to toggle play/pause. If a video fails to load, a remote fallback will be tried once and then an error message shown.

Notes
- If your backend requires a POST or different route, update `Home.jsx` accordingly.
- If you prefer bundling videos into the app, I can update the code to import them instead of serving from `public/`.

