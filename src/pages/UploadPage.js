import React, { useState , useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ObjectDetectionResults = ({ detections }) => {
    const [objectCounts, setObjectCounts] = useState({});

    useEffect(() => {
        if (detections) {
            const counts = {};
            detections.forEach(item => {
                counts[item.class] = (counts[item.class] || 0) + 1;
            });
            setObjectCounts(counts);
        }
    }, [detections]);

    return (
        <div>
            <h2>Detected Objects</h2>
            <ul>
                {Object.entries(objectCounts).map(([name, count]) => (
                    <li key={name}>
                        {name}: {count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const API_URI="/api";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
  
    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select an image");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(`${API_URI}/api/detect/upload`, formData);
            console.log("Backend Response: ",res.data);
            setResult(res.data.parseResult);
            setImageUrl(`${res.data.imageUrl}?t=${Date.now()}`);
            toast.success("Image processed successfully!");
        } catch (error) {
            toast.error("Error processing image");
        }
    };

    return (
        <div className="container">
            <h1>AI-Powered Blind Spot Detection</h1>
    
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload & Detect</button>
            
            {imageUrl && (
                <div>
                    <h2>Detected Image:</h2>
                    <img src={imageUrl} alt="Detected Output" style={{ width: "100%", maxWidth: "500px", border: "2px solid black"  }} />
                </div>
            )}

            {result && (
                <div>
                    <h2>Detected Object:</h2>
                    <ObjectDetectionResults detections={result.detections} />
                </div>
            )}
            
        </div>
        
    )}