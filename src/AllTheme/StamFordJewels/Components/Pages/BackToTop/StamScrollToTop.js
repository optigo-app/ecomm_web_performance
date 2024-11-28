import React, { useState, useEffect } from 'react';
import { FaAngleUp, FaArrowUp } from 'react-icons/fa'; // Install react-icons if not already installed
import './ScrollToTop.scss'; // Add SCSS for styling

const StamScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="stam_scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop} className="scroll-icon">
          <FaAngleUp style={{height: '20px' , width: '20px'}}/>
        </div>
      )}
    </div>
  );
};

export default StamScrollToTop;
