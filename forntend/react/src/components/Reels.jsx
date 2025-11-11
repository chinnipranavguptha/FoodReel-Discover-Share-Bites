import React, { useEffect, useRef } from "react";
import "../styles/reels.css";

const FALLBACK_VIDEO =
  "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

const Reels = ({ videos = [] }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vids = container.querySelectorAll("video");

    // Intersection observer to auto-play the centered video and pause others
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.intersectionRatio > 0.6) {
            const p = video.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.25, 0.6, 0.9] }
    );

    vids.forEach((v) => {
      v.pause();
      observer.observe(v);
    });

    // ensure the first visible video plays
    const first = vids[0];
    if (first) {
      const p = first.play();
      if (p && p.catch) p.catch(() => {});
    }

    return () => {
      observer.disconnect();
      vids.forEach((v) => v.pause());
    };
  }, [videos]);

  // Toggle play/pause when clicking a reel (ignores clicks on links)
  const handleTogglePlay = (e) => {
    const anchor = e.target.closest("a");
    if (anchor) return;

    const section = e.currentTarget;
    const video = section.querySelector("video");
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
      section.classList.remove("reel-paused");
    } else {
      video.pause();
      section.classList.add("reel-paused");
    }
  };

  return (
    <div className="reels-container" ref={containerRef}>
      {videos.map((item) => (
        <section
          className="reel-item"
          key={item.id}
          onClick={handleTogglePlay}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.code === "Space" || e.key === "Spacebar") {
              e.preventDefault();
              handleTogglePlay(e);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <video
            className="reel-video"
            src={item.src}
            muted
            playsInline
            loop
            preload="metadata"
            autoPlay
            onError={(e) => {
              const vid = e.target;
              if (vid.dataset.fallbackTried === "true") {
                const itemEl = vid.closest(".reel-item");
                if (itemEl) itemEl.classList.add("reel-error");
                return;
              }
              vid.dataset.fallbackTried = "true";
              try {
                vid.src = item.fallback || FALLBACK_VIDEO;
                const p = vid.play();
                if (p && p.catch) p.catch(() => {});
              } catch (err) {
                const itemEl = vid.closest(".reel-item");
                if (itemEl) itemEl.classList.add("reel-error");
              }
            }}
            onCanPlay={(e) => {
              const p = e.target.play();
              if (p && p.catch) p.catch(() => {});
            }}
          />

          <div className="reel-overlay">
            <div className="reel-meta">
              <p className="reel-description">{item.description}</p>
              <a
                className="reel-visit"
                href={item.storeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit store
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Reels;
