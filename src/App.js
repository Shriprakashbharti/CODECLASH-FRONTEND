import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import LiveDetection from "./pages/liveDetection";
import PastDetections from "./pages/PastDetections";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UploadPage />} />
                <Route path="/live" element={<LiveDetection/>}/> 
                <Route path="/pastDetections" element={<PastDetections/>}/>
            </Routes>
        </Router>
    );
}
