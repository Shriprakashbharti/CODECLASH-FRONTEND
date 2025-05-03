import React, { useEffect, useState } from "react";
import './pastDetection.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PastDetections = () => {
  const [detections, setDetections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use environment variable for backend URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

  useEffect(() => {
    const fetchDetections = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/live-detection/past-detections`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        
        // Ensure we always set an array, even if data is malformed
        const formattedDetections = Array.isArray(data.past_detections) 
          ? data.past_detections 
          : [];
          
        setDetections(formattedDetections);
        setError(null);
      } catch (err) {
        console.error("Error fetching detections:", err);
        setError(err.message);
        toast.error("Failed to load past detections");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetections();
  }, [API_BASE_URL]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return "Invalid Date";
    }
  };

  const formatRiskLevel = (level) => {
    if (level === undefined || level === null) return "Unknown";
    return level === 2 ? "🚨 High" : level === 1 ? "⚠️ Moderate" : "✅ Low";
  };

  return (
    <div className="past-detections-container">
      <h2 className="text">Past Detections</h2>
      
      {isLoading ? (
        <div className="loading">Loading past detections...</div>
      ) : error ? (
        <div className="error">
          Error loading data: {error}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="detections-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Risk Level</th>
                <th>Detected Objects</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {detections.length > 0 ? (
                detections.map((det, idx) => (
                  <tr key={det._id || idx}>
                    <td>{formatTimestamp(det.timestamp)}</td>
                    <td className={`risk-${det.risk_level}`}>
                      {formatRiskLevel(det.risk_level)}
                    </td>
                    <td>
                      {det.detections?.length > 0 ? (
                        <ul className="object-list">
                          {det.detections.map((obj, i) => (
                            <li key={i}>
                              {obj.object_name} ({obj.confidence?.toFixed(2) || '?'}%)
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "No Objects"
                      )}
                    </td>
                    <td>
                      {det.image_url ? (
                        <img 
                          src={`${API_BASE_URL}${det.image_url}`} 
                          alt="Detection snapshot" 
                          className="detection-image"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No detection data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PastDetections;