import React, { useEffect, useRef } from "react";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopVideoSection.scss";
const TopVideoSection = () => {
  const videoRef = useRef(null);
  const Video = [
    `${storImagePath()}/Forevery/desktop-video.mov`,
    `${storImagePath()}/Forevery/mobile-vide.mp4`,
  ];
  const VideoBanner = [
    `${storImagePath()}/Forevery/videoBanner/desktop.png`,
    `${storImagePath()}/Forevery/videoBanner/mobile.png`,
  ];
  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play();
          } else {
            videoElement.pause();
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
    <div>
      <section className="forvery_main_video section-height">
        <div className="poster forvery_bg_img pos-relative">
          <video
            ref={videoRef}
            className="for_desktop"
            width="100%"
            src={Video[0]}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            poster={VideoBanner[0]}
          ></video>

          <video
            ref={videoRef}
            className="for_mobile"
            width="100%"
            poster={VideoBanner[1]}
            src={Video[1]}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
          ></video>
        </div>
      </section>
    </div>
  );
};

export default TopVideoSection;
