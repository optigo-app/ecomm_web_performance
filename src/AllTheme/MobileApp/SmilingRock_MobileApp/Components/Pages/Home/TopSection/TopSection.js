import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import Slider from "react-slick";
import { smrMA_loginState } from "../../../Recoil/atom";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopSection.modul.scss";

const imagePaths = [
  "/images/HomePage/topBanner/HomepageMainBannerImage1.webp",
  "/images/HomePage/topBanner/HomepageMainBannerImage2.webp",
  "/images/HomePage/topBanner/HomepageMainBannerImage3.webp",
  "/images/HomePage/topBanner/HomepageMainBannerImage4.webp",
];

export default function TopSection({ data }) {
  const islogin = useRecoilValue(smrMA_loginState);
  const [loading, setLoading] = useState(true);
  const [isLoginStatus, setIsloginStatus] = useState();
  const [videoStarted, setVideoStarted] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
    // prevArrow: false,
    // nextArrow: false,
  };

  useEffect(() => {
    if (islogin) {
      setIsloginStatus(islogin);
    }
  }, []);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const handleVideoPlay = () => {
    setVideoStarted(true);
    setLoading(false);
  };

  return (
    <>
      <div className="smrMA_TopSectionMain">
        <Slider {...settings}>
          {/* {imagePaths.map((path, index) => ( */}
          {data?.image?.slice(0, 4).map((path, index) => (
            <div key={index} className="homePageSliderImagwMain">
              <img
                src={path}
                loading="lazy"
                className="homePageSliderImagw"
                alt={`Banner ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="smr_gradient_background">
        <p>Explore The Best !</p>
      </div>
    </>
  );
}

{
  /* onClick={() => naviagtion('/productpage')} */
}
{
  /* <div className='homePageSliderImagwMain'>
          <img src={`${storImagePath()}/images/HomePage/topBanner/HomepageMainBannerImage1.webp`} className='homePageSliderImagw' />
        </div>

        <div className='homePageSliderImagwMain'>
          <img src={`${storImagePath()}/images/HomePage/topBanner/HomepageMainBannerImage2.webp`} className='homePageSliderImagw' />
        </div>

        <div className='homePageSliderImagwMain'>
          <img src={`${storImagePath()}/images/HomePage/topBanner/HomepageMainBannerImage3.webp`} className='homePageSliderImagw' />
        </div>

        <div className='homePageSliderImagwMain'>
          <img src={`${storImagePath()}/images/HomePage/topBanner/HomepageMainBannerImage4.webp`} className='homePageSliderImagw' />
        </div> */
}

// import React, { useEffect, useRef, useState } from 'react'
// import './TopSection.modul.scss'
// import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

// const TopSection = () => {

//     const [loading, setLoading] = useState(false);
//     const [videoStarted, setVideoStarted] = useState(false);
//     const videoRef = useRef(null);

//     const [localData, setLocalData] = useState();

//     useEffect(() => {
//         let localData = JSON.parse(sessionStorage.getItem('storeInit'));
//         setLocalData(localData);
//         console.log('localDatalocalData', localData);
//     }, [])

//     const handleVideoLoad = () => {
//         setLoading(false);
//         // Unmute the video once it's loaded
//         setTimeout(() => {

//         }, 0);

//         videoRef.current.controls = false;
//     };

//     const handleVideoPlay = () => {
//         setVideoStarted(true);
//     };

//     return (
//         <div>
//             {localData?.Blockno === 1 &&
//                 <video
//                     ref={videoRef}
//                     width="500"
//                     autoPlay
//                     muted
//                     controls={!videoStarted}
//                     loop
//                     style={{ height: "auto", width: "100%" }}
//                     onLoadedData={handleVideoLoad}
//                     onPlay={handleVideoPlay}
//                 >
//                     <source src={`${storImagePath()}/images/HomePage/MainBanner/videos/HomepageMainBannerVideo.mp4`} type="video/mp4" />
//                 </video>}

//             {localData?.Blockno === 2 &&
//                 <div>
//                     <img src={`${storImagePath()}/images/HomePage/MainBanner/mainTopBanner.jpg`} style={{ width: '100%' }} />
//                 </div>

//             }
//         </div>
//     )
// }

// export default TopSection
