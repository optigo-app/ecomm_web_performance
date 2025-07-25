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

const TopSection = ({ data }) => {
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
    <div className="roop_topVideoMain" role="region" aria-labelledby="top-video-banner" onContextMenu={(e) => e.preventDefault()}>
      <div className="rp_main_slider">
        {/* for vara */}
        {/* <Slider {...settings} ref={slider}>
          {isMobile
            ? data?.image?.slice(0, 3).map((val, i) => (
              <div className="slide" key={i}>
                <LazyImage src={val} alt={`top-section-banner-${i}`}
                 draggable={true}
            onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ))
            : data?.image?.slice(0, 3).map((val, i) => (
              <div className="slide" key={i}>
                <LazyImage src={val} alt={`top-section-banner-${i}`}
                 draggable={true}
            onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ))}
        </Slider> */}


        {/* for shinjini */}
        < div className="slide">
          <img src={`${storImagePath()}/images/HomePage/TopSection/home1.jpg`} alt={"TopBanner"}
            draggable={true}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        {/* Sonasons */}
        {/* <video
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
           draggable={true}
            onContextMenu={(e) => e.preventDefault()}
            src={`${storImagePath()}/images/HomePage/TopSection/topVideo.mp4`}
            type="video/mp4"
          />
        </video> */}

        {/* {localData?.Blockno === 3 && ( */}
        {/* for sonasons, ojasvi */}
        {/* <div id="top-banner-image-rp">
          <img
            src={`${storImagePath()}/Banner/Homepagemainbanner4.png`} // Fallback image
            srcSet={`
                  ${storImagePath()}/Banner/home-image-400.webp 400w,
                  ${storImagePath()}/Banner/home-image-800.webp 800w,
                  ${storImagePath()}/Banner/home-image-1200.webp 1200w
              `}
            sizes={`
                  (max-width: 480px) 100vw,
                  (max-width: 1024px) 90vw,
                  (max-width: 1500px) 80vw,
                  70vw
              `}
               draggable={true}
            onContextMenu={(e) => e.preventDefault()}
            alt=" "
            className="top-banner-img"
            loading="lazy"
          />
        </div> */}

        {/* for pacific */}
        {/* <div id="top-banner-image-rp">
          <img
            // src={`${storImagePath()}/images/HomePage/Banner/3.jpg`}
            src={data?.image[4]}
            alt="Top banner image showcasing our latest promotions"
            style={{ width: "100%" }}
             draggable={true}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div> */}

      </div>
    </div>
  );
};

export default TopSection;




const LazyImage = ({ src, alt, className }) => {
  const imgRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing once image is in view
        }
      },
      { threshold: 0.1 } // 10% of the image needs to be in view
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={inView ? src : ''}
      alt={alt}
      className={className}
      loading="lazy"
      draggable={true}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};