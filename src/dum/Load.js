import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css"; // Ensure you create this CSS file for styling

const Preloader = () => {
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const location = useLocation(); // Get current location

  useEffect(() => {
    // Reset the preloader state
    setLoaded(false);
    setWidth(0);
    setPercentage(0);

    // Simulate load event timing
    const perfData = window.performance.timing;
    const estimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
    const time = parseInt((estimatedTime / 1000) % 60) * 100;

    const animateLoadbar = () => {
      const interval = setInterval(() => {
        setWidth((prevWidth) => {
          if (prevWidth >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevWidth + 1;
        });
      }, time / 100);
    };

    const animatePercentage = () => {
      const range = 100;
      const stepTime = Math.abs(Math.floor(time / range));
      let current = 0;
      const interval = setInterval(() => {
        setPercentage((prevPercentage) => {
          if (prevPercentage >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevPercentage + 1;
        });
        current++;
        if (current >= range) {
          clearInterval(interval);
        }
      }, stepTime);
    };

    // Start animations
    animateLoadbar();
    animatePercentage();

    // Simulate preloader fade-out
    const fadeTimeout = setTimeout(() => {
      setLoaded(true);
    }, time);

    // Cleanup and reset preloader state on location change
    return () => {
      clearTimeout(fadeTimeout);
      setLoaded(false);
      setWidth(0);
      setPercentage(0);
    };
  }, [location]);

  return (
    <div className={`for_preloader-wrap ${loaded ? "fade-out" : "fade-in"}`}>
      <div className="for_loader">
        <div className="for_trackbar">
          <div className="for_loadbar" style={{ width: `${width}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
