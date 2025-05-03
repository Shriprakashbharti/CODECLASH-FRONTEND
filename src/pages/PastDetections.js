import React, { useEffect, useState } from "react";
import './pastDetection.css'

const PastDetections = () => {
  const [detections, setDetections] = useState([]);
const API_URI="/auth";
  useEffect(() => {
    fetch(`${API_URI}/live-detection/past-detections`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging output
        setDetections(Array.isArray(data.past_detections) ? data.past_detections : []);
      })
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
          {detections.length > 0 ? (
            detections.map((det, idx) => (
              <tr key={det._id || idx}>
                <td>{det.timestamp ? new Date(det.timestamp).toLocaleString() : "N/A"}</td>
                <td>{det.risk_level || "Unknown"}</td>
                <td>
                  {det.detections?.map(obj => obj.object_name).join(", ") || "No Objects"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PastDetections;