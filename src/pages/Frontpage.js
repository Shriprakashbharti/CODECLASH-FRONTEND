import React, { useState } from 'react';
import './styles.css'; 
import { Link } from "react-router-dom";
const FrontPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <header>
        <h1>🚗 Live Blind Spot Detection</h1>
      </header>

      <main className='main'>
        <button className="light-mode-toggle" onClick={toggleDarkMode}>
          Toggle Dark Mode
        </button>

        <section>
          <div>
            <h2>Real Time Object Detection With Live Camera</h2>
            
                  <Link to={"/live"}><button>Live Detection</button>
                  </Link>
                  </div>
          <div>
            <h2>Upload Image to check Manual Detection for foggy and rainy condition.</h2>
            <Link to={"/manual"}><button>Manual Detection</button>
                  </Link>
          </div>
        </section>
      </main>

      <div className='footer' style={{textAlign:"center",marginBottom:"0px"}}>
      
            <p>&copy; 2025 Shri Prakash Baitha. All rights reserved.</p>
  
      </div>
    </div>
  );
};

export default FrontPage;
