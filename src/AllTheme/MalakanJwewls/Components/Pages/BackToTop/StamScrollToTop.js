import React, { useState, useEffect } from 'react';
import './ScrollToTop.scss'; // Add SCSS for styling
import { IoIosArrowUp } from "react-icons/io";

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
    <div className="mala_scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop} className="scroll-icon-mal">
          <IoIosArrowUp size={32}/>
        </div>
      )}
    </div>
  );
};

export default StamScrollToTop;
