import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadPage from "./pages/UploadPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UploadPage />} />
            </Routes>
        </Router>
    );
}
