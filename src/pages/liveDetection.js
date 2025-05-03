 import React, { useEffect, useState } from "react";
import "./LiveDetection.css";
import { Link } from "react-router-dom";
const LiveDetection = () => {
  const [riskLevel, setRiskLevel] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const API_URI="/auth";
  useEffect(() => {
    const fetchRiskLevel = () => {
      fetch(`${API_URI}/live-detection/risk-level`)
        .then((res) => res.json())
        .then((data) => {
          setRiskLevel(data.risk_level);

          if (data.risk_level >= 2) {
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000); // Hide after 3s
          }
        })
        .catch((error) => console.error("Error fetching risk level:", error));
    };

    const interval = setInterval(fetchRiskLevel, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-detection-container">
      <h1>🚗 Live Blind Spot Detection</h1>

      <img
        className="live-video"
        src="auth/live-detection/video_feed"
        alt="Live Stream"
      />

      <div className={`risk-indicator risk-${riskLevel}`}>
        Risk Level: {riskLevel === 2 ? "🚨 HIGH RISK" : "✅ SAFE"}
      </div>

      {alertVisible && <div className="alert-popup">⚠️ High Risk Detected! Drive Carefully!</div>}
      {riskLevel >= 2 && (
        <audio autoPlay>
          <source src="/alert.mp3" type="audio/mpeg" />
        </audio>
      )}
      <div>
      <Link to={"/pastDetections"}><button>Past Detections</button>
      </Link>
      </div>
    </div>
  );
};

export default LiveDetection;