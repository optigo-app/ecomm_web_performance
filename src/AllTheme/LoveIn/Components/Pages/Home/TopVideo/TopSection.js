import React, { useEffect, useRef, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopSection.modul.scss";
import Video from "./Video";

const TopSection = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);
  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localData = JSON.parse(sessionStorage.getItem("storeInit"));
    if (localData) {
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

  let youtubeVideoUrl = "https://www.youtube.com/embed/DkVfi2ApzwQ?autoplay=1&controls=0&mute=1&loop=1&playlist=DkVfi2ApzwQ"

  return (
    <div className="smr_topVideoMain" style={{ maxHeight: "100% !important" }}>
      {/* <video
          ref={videoRef}
          autoPlay
          muted
          controls={false}
          loop
          style={{ height: "auto", width: "100%" }}
          onLoadedData={handleVideoLoad}
          onPlay={handleVideoPlay}
        >
          <source
            src={data?.video[0]}
            type="video/mp4"
          />
        </video> */}
      <Video videoUrl={youtubeVideoUrl} videoId="DkVfi2ApzwQ" width='100%' height="860px" />


    </div>
  );
};

export default TopSection;
