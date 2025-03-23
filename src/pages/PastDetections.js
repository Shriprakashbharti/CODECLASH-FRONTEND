import React, { useEffect, useState } from "react";
import './pastDetection.css'
const PastDetections = () => {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/live-detection/past-detections")
      .then((res) => res.json())
      .then((data) => setDetections(data))
      .catch((err) => console.error("Error fetching detections:", err));
  }, []);

  return (
    <div>
      <h2 className="text">Past Detections</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Risk Level</th>
            <th>Detections</th>
          </tr>
        </thead>
        <tbody>
          {detections.map((det, idx) => (
            <tr key={idx}>
              <td>{new Date(det.timestamp).toLocaleString()}</td>
              <td>{det.risk_level}</td>
              <td>{det.detections.length} Objects</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastDetections;
