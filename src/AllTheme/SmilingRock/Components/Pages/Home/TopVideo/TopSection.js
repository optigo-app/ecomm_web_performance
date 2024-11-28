import React, { useEffect, useRef, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopSection.modul.scss";

const TopSection = () => {
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);
  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localData = JSON.parse(sessionStorage.getItem("storeInit"));
    if(localData){
      setLocalData(localData);
    }
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
    <div className="smr_topVideoMain" style={{ minHeight: "550px" }}>
      {localData?.Blockno === 2 && (
        <div>
          <img
            src={`${storImagePath()}/images/HomePage/Banner/HomeBanner.png`}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {localData?.Blockno === 1 &&
        <video
          ref={videoRef}
          width="500"
          autoPlay
          muted
          controls={!videoStarted}
          loop
          style={{ height: "auto", width: "100%" }}
          onLoadedData={handleVideoLoad}
          onPlay={handleVideoPlay}
        >
          <source
            src={`${storImagePath()}/images/HomePage/TopSection/HomepageMainBannerVideo.mp4`}
            type="video/mp4"
          />
        </video>
      }
      {/* 
{localData?.Blockno === 1 && storeInit?.IsPLW == 1 ? (
        <div>
          <img
            src={`${storImagePath()}/images/HomePage/MainBanner/mainTopBanner2.webp`}
            style={{ width: "100%" }}
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          width="500"
          autoPlay
          muted
          controls={!videoStarted}
          loop
          style={{ height: "auto", width: "100%" }}
          onLoadedData={handleVideoLoad}
          onPlay={handleVideoPlay}
        >
          <source
            src={`${storImagePath()}/images/HomePage/TopSection/HomepageMainBannerVideo.mp4`}
            type="video/mp4"
          />
        </video>
      )} */}


    </div>
  );
};

export default TopSection;
