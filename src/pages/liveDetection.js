import React, { useEffect, useState } from "react";
import "./LiveDetection.css";
import { Link } from "react-router-dom";

const LiveDetection = () => {
  const [riskLevel, setRiskLevel] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Use environment variable for backend URL
  const API_BASE_URL ='/api';

  useEffect(() => {
    const fetchRiskLevel = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/live-detection/risk-level`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        setRiskLevel(data.risk_level);
        setIsConnected(true);

        if (data.risk_level >= 2) {
          setAlertVisible(true);
          setTimeout(() => setAlertVisible(false), 3000);
        }
      } catch (error) {
        console.error("Error fetching risk level:", error);
        setIsConnected(false);
      }
    };

    const interval = setInterval(fetchRiskLevel, 1000);
    return () => clearInterval(interval);
  }, [API_BASE_URL]);

  return (
    <div className="live-detection-container">
      <h1>🚗 Live Blind Spot Detection</h1>

      {!isConnected && (
        <div className="connection-error">
          ⚠️ Connection lost to detection system. Trying to reconnect...
        </div>
      )}

      <img
        className="live-video"
        src={`${API_BASE_URL}/live-detection/video_feed`}
        alt="Live Stream"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = "/placeholder.jpg";
          setIsConnected(false);
        }}
      />

      <div className={`risk-indicator risk-${riskLevel}`}>
        {riskLevel === 0 ? "✅ SAFE" : 
         riskLevel === 1 ? "⚠️ MODERATE" : "🚨 HIGH RISK"}
      </div>

      {alertVisible && (
        <div className="alert-popup">
          ⚠️ High Risk Detected! Drive Carefully!
        </div>
      )}

      {riskLevel >= 2 && (
        <audio autoPlay loop>
          <source src="/alert.mp3" type="audio/mpeg" />
        </audio>
      )}

      <div>
        <Link to="/pastDetections">
          <button>Past Detections</button>
        </Link>
      </div>
    </div>
  );
};

export default LiveDetection;