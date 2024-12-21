import React, { useEffect, useRef, useState } from "react";
import "./TopSection.modul.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MobilSliderImage, SliderItemns } from "../../../Assets/constant/data";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";


const settings = {
  dots: true,
  infinite: true, // Ensures infinite looping of slides
  speed: 300, // Slide transition speed in milliseconds
  slidesToShow: 1, // Number of slides to show at once
  slidesToScroll: 1, // Number of slides to scroll at once
  arrows: false, // Hide navigation arrows
  draggable: true, // Enable dragging for mobile users
  autoplay: true, // Enable autoplay for the slider
  autoplaySpeed: 3000,
  onMousePlay: true, // Enable autoplay on mouse hover
  pauseOnHover: false, // Pause autoplay on mouse hover
};

const TopSection = () => {
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);
  const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
  const [isMobile, setIsMobile] = useState(false);
  const slider = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localData = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localData);
    console.log("localDatalocalData", localData);
  }, []);

  const handleVideoLoad = () => {
    setLoading(false);
    setTimeout(() => { }, 0);

    videoRef.current.controls = false;
  };

  const handleVideoPlay = () => {
    setVideoStarted(true);
  };

  return (
    <div className="roop_topVideoMain" role="region" aria-labelledby="top-video-banner">
      <div className="rp_main_slider">
        {/* for vara */}
        {/* <Slider {...settings} ref={slider}>
          {isMobile
            ? MobilSliderImage.map((val, i) => (
              <div className="slide" key={i}>
                <img src={val?.url || ""} alt={val?.key} />
              </div>
            ))
            : SliderItemns.map((val, i) => (
              <div className="slide" key={i}>
                <img src={val?.url || ""} alt={val?.key} />
              </div>
            ))}
        </Slider> */}


        {/* for shinjini */}
        {/* < div className="slide">
          <img src={`${storImagePath()}/images/HomePage/TopSection/home1.jpg`} alt={"TopBanner"} />
        </div> */}

        {/* Sonasons */}
        <video
          ref={videoRef}
          width="500"
          autoPlay
          muted
          loop
          controls={!videoStarted}
          style={{ height: "auto", width: "100%" }}
          onLoadedData={handleVideoLoad}
          onPlay={handleVideoPlay}
        >
          <source
            src={`${storImagePath()}/images/HomePage/TopSection/topVideo.mp4`}
            type="video/mp4"
          />
        </video>

        {localData?.Blockno === 3 && (
          <div id="top-banner-image-rp">
            <img
              src={`${storImagePath()}/images/HomePage/Banner/3.jpg`}
              alt="Top banner image showcasing our latest promotions"
              style={{ width: "100%" }}
              loading="lazy"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default TopSection;

