import React, { useState, useEffect } from 'react';


export const Timer = ({ onComplete }) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <span className="timer">
      {seconds < 10 ? `0${seconds}` : seconds}s
    </span>
  );
};
