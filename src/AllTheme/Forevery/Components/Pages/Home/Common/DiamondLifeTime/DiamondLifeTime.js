import React, { useEffect, useRef } from "react";
import "./DiamondLifeTime.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";

const DiamondLifeTime = () => {
  const videoRef = useRef(null);
  const Video = [
    `${storImagePath()}/Forevery/lr.mp4`,
    `${storImagePath()}/Forevery/lifetime-replacement-mb.mp4`,
  ];
  const VideoBanner = [
    `${storImagePath()}/Forevery/lr.png`,
    `${storImagePath()}/Forevery/lifetime-replacement-poster-mb.png`,
  ];
  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement?.play();
          } else {
            videoElement?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(videoElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="for_DiamondLifeTime">
      <div className="for_DiamondLifeTime_video">
        <video
          className="for_desktop"
          width="100%"
          src={Video[0]}
          ref={videoRef}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          poster={VideoBanner[0]}
        ></video>
        <video
          className="for_Mobile"
          width="100%"
          src={Video[1]}
          ref={videoRef}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          poster={VideoBanner[1]}
        ></video>
      </div>
    </div>
  );
};

export default DiamondLifeTime;
