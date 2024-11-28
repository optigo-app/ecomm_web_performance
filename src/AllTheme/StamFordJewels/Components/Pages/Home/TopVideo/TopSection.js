import React, { useEffect, useRef, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopSection.modul.scss";

const TopSection = () => {
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);
  const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));

  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localData = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localData);
    console.log("localDatalocalData", localData);
  }, []);

  const handleVideoLoad = () => {
    setLoading(false);
    // Unmute the video once it's loaded
    setTimeout(() => { }, 0);

    videoRef.current.controls = false;
  };

  const handleVideoPlay = () => {
    setVideoStarted(true);
  };

  return (
    <div className="stam_topVideoMain" style={{ minHeight: "550px" }}>
        <video
          ref={videoRef}
          width="500"
          autoPlay
          muted
          controls={!videoStarted}
          // loop
          style={{ height: "auto", width: "100%" }}
          onLoadedData={handleVideoLoad}
          onPlay={handleVideoPlay}
        >
          <source
            src={`${storImagePath()}/images/HomePage/TopSection/topVideo.mp4`}
            type="video/mp4"
          />
        </video>

      {/* {localData?.Blockno === 3 && (
        <div>
          <img
            src={`${storImagePath()}/images/HomePage/MainBanner/mainTopBanner.jpg`}
            style={{ width: "100%" }}
          />
        </div>
      )} */}
    </div>
  );
};

export default TopSection;
