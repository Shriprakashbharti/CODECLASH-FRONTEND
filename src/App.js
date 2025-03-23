import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import LiveDetection from "./pages/liveDetection";
import PastDetections from "./pages/PastDetections";
import FrontPage from "./pages/Frontpage";

export default function App() {
    return (
       
        <Router>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/manual" element={<UploadPage />} />
                <Route path="/live" element={<LiveDetection/>}/> 
                <Route path="/pastDetections" element={<PastDetections/>}/>
            </Routes>
        </Router>
    );
}
