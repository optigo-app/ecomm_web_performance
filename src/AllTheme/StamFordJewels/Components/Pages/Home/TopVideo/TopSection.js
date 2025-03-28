// import React, { useEffect, useRef, useState } from "react";
// import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
// import "./TopSection.modul.scss";

// const TopSection = ({data}) => {
//   const [loading, setLoading] = useState(false);
//   const [videoStarted, setVideoStarted] = useState(false);
//   const videoRef = useRef(null);
//   const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));

//   const [localData, setLocalData] = useState();

//   useEffect(() => {
//     let localData = JSON.parse(sessionStorage.getItem("storeInit"));
//     setLocalData(localData);
//     console.log("localDatalocalData", localData);
//   }, []);

//   const handleVideoLoad = () => {
//     setLoading(false);
//     // Unmute the video once it's loaded
//     setTimeout(() => { }, 0);

//     videoRef.current.controls = false;
//   };

//   const handleVideoPlay = () => {
//     setVideoStarted(true);
//   };

//   return (
//     <div className="stam_topVideoMain" style={{ minHeight: "550px" }}>
//         <video
//           ref={videoRef}
//           width="500"
//           autoPlay
//           muted
//           // controls={!videoStarted}
//           loop
//           style={{ height: "auto", width: "100%" }}
//           onLoadedData={handleVideoLoad}
//           onPlay={handleVideoPlay}
//           src={data?.video?.[0]}
//         >
//           {/* <source
//             src={`${storImagePath()}/images/HomePage/TopSection/topVideo.mp4`}
//             type="video/mp4"
//           /> */}
//         </video>

//       {/* {localData?.Blockno === 3 && (
//         <div>
//           <img
//             src={`${storImagePath()}/images/HomePage/MainBanner/mainTopBanner.jpg`}
//             style={{ width: "100%" }}
//           />
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default TopSection;



import React, { useEffect, useRef, useState } from "react";
import { storImagePath, storImagePathNew, wesbiteDomainName } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopSection.modul.scss";
import { REACT_APP_WEB } from "../../../../../../env";

const TopSection = ({ data, obj: mediaData }) => {
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);
  const [localData, setLocalData] = useState();
  const [selectedExtension, setSelectedExtension] = useState("jpg"); // Default extension
  const [mediaSrc, setMediaSrc] = useState(""); // To store the selected media source
  console.log('mediaSrc: ', mediaSrc);

  useEffect(() => {
    let localData = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localData);
    console.log("localDatalocalData", localData);
  }, []);

  useEffect(() => {
    // Find the media item that matches the selected extension
    const matchedMedia = mediaData.find((item) => item.extension === selectedExtension);

    if (matchedMedia) {
      // Construct the media path using the matched name and extension
      const mediaPath = `${storImagePathNew()}/WebSiteStaticImage/${window.location.host !== "localhost:3000" ? wesbiteDomainName : REACT_APP_WEB}/HomepageMainbanner/${matchedMedia.name}.${selectedExtension}`;
      setMediaSrc(mediaPath);
    }
  }, [selectedExtension]);

  const handleVideoLoad = () => {
    setLoading(false);
    // Unmute the video once it's loaded
    setTimeout(() => { }, 0);

    videoRef.current.controls = false;
  };

  const handleVideoPlay = () => {
    setVideoStarted(true);
  };

  const handleExtensionChange = (e) => {
    setSelectedExtension(e.target.value);
  };

  return (
    <div className="stam_topVideoMain" style={{ minHeight: "550px" }}>
      <div>
        <label htmlFor="extension-dropdown">Select Image Type: </label>
        <select
          id="extension-dropdown"
          value={selectedExtension}
          onChange={handleExtensionChange}
        >
          <option value="jpg">.jpg</option>
          <option value="gif">.gif</option>
          <option value="mp4">.mp4</option>
          <option value="webp">.webp</option>
          <option value="svg">.svg</option>
          <option value="jpeg">.jpeg</option>
          <option value="avif">.avif</option>
          <option value="mkv">.mkv</option>
          <option value="webm">.webm</option>
        </select>
      </div>

      {["mp4", "webm", "mkv"].includes(selectedExtension) ? (
        <video
          width="500"
          autoPlay
          muted
          loop
          style={{ height: "auto", width: "100%" }}
          src={mediaSrc}
        >
          <source src={mediaSrc} type={`video/${selectedExtension}`} />
        </video>
      ) : (
        <img
          src={mediaSrc}
          alt="Selected Media"
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
};

export default TopSection;
