import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/reels.css";
import { set } from "mongoose";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food/", {
          withCredentials: true,
        });
        console.log("Fetched data:", response.data);
        setVideos(response.data.foodItems || []);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="reel-page">
      <div className="reels-container">
        {videos.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>No reels found</p>
        ) : (
          videos.map((r) => (
            <section className="reel-item" key={r._id || r.id}>
              <video
                className="reel-video"
                poster={r.video}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={r.video} type="video/mp4" />
              </video>
              {/* Right side vertical actions (likes / save / comments) */}
              <div className="reel-right-actions" aria-hidden>
                <button className="action-btn" title="Like">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21s-7.5-4.87-9-7.28C1.9 10.5 4 6 8 6c1.8 0 3.04 1.04 4 2.5C13.96 7.04 15.2 6 17 6c4 0 6.1 4.5 5 7.72C19.5 16.13 12 21 12 21z" stroke="#fff" strokeWidth="1" fill="rgba(255,255,255,0.06)"/>
                  </svg>
                  <span className="action-count">{r.likes}</span>
                </button>

                

                <button className="action-btn" title="Comments">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="1" fill="rgba(255,255,255,0.02)"/>
                  </svg>
                  <span className="action-count">{r.commentsCount}</span>
                </button>
              </div>
              {/*<img src='data:image/jpeg;base64,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'/>*/}

              <div className="reel-overlay">
                <div className="reel-info">
                  <h3 className="reel-title">{r.name}</h3>
                  <p className="reel-desc">{r.description}</p>
    
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
