import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./FeaturedCollection.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import _debounce from "lodash/debounce"; // Import debounce

export default function FeaturedCollection({ data }) {
  const [ring1ImageChange, setRing1ImageChange] = useState(false);
  const [ring2ImageChange, setRing2ImageChange] = useState(false);
  const [ring3ImageChange, setRing3ImageChange] = useState(false);
  const [ring4ImageChange, setRing4ImageChange] = useState(false);

  // Preload the images to prevent loading issues
  const preloadImages = (urls) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  useEffect(() => {
    preloadImages([
      // Preload the images for smooth transitions
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4955?mode=t",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4955?mode=p",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4965?mode=t",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4965?mode=p",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4925?mode=t",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4925?mode=p",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4891?mode=t",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4891?mode=p",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2173?mode=t",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2173?mode=p",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-1252?mode=t",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-1252?mode=p",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-678-BM?mode=t",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-678-BM?mode=p",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-591?mode=t",
      "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-591?mode=p"
      // Add all other images here...
    ]);
  }, []);

  // Using debounce to handle hover effect
  const debouncedSetRing1ImageChange = _debounce((value) => {
    setRing1ImageChange(value);
  }, 200); // Debouncing for 200ms to avoid flicker

  const debouncedSetRing2ImageChange = _debounce((value) => {
    setRing2ImageChange(value);
  }, 200);

  const debouncedSetRing3ImageChange = _debounce((value) => {
    setRing3ImageChange(value);
  }, 200);

  const debouncedSetRing4ImageChange = _debounce((value) => {
    setRing4ImageChange(value);
  }, 200);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <div className="linkingLoveMain">
        <p className="linkingTitle">Bridal Collection</p>
        <div className="linkingLove">
          <Slider {...settings} className="sliderMain">
            <div className="linkRingLove">
              <div>
                <div className="linkLoveRing1">
                  <img
                    src={
                      !ring1ImageChange
                        ? "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4955?mode=t"
                        : "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4955?mode=p"
                    }
                    className="likingLoveImages"
                    onMouseEnter={() => debouncedSetRing1ImageChange(true)}
                    onMouseLeave={() => debouncedSetRing1ImageChange(false)}
                  />
                </div>
              </div>
              <div>
                <div className="linkLoveRing2">
                  <img
                    src={
                      !ring2ImageChange
                        ? "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4965?mode=t"
                        : "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4965?mode=p"
                    }
                    className="likingLoveImages"
                    onMouseEnter={() => debouncedSetRing2ImageChange(true)}
                    onMouseLeave={() => debouncedSetRing2ImageChange(false)}
                  />
                </div>
              </div>
            </div>

            <div className="linkRingLove">
              <div>
                <div className="linkLoveRing1">
                  <img
                    src={
                      !ring1ImageChange
                        ? "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4925?mode=t"
                        : "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4925?mode=p"
                    }
                    className="likingLoveImages"
                    onMouseEnter={() => debouncedSetRing1ImageChange(true)}
                    onMouseLeave={() => debouncedSetRing1ImageChange(false)}
                  />
                </div>
              </div>
              <div>
                <div className="linkLoveRing2">
                  <img
                    src={
                      !ring2ImageChange
                        ? "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4891?mode=t"
                        : "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4891?mode=p"
                    }
                    className="likingLoveImages"
                    onMouseEnter={() => debouncedSetRing2ImageChange(true)}
                    onMouseLeave={() => debouncedSetRing2ImageChange(false)}
                  />
                </div>
              </div>
            </div>
          </Slider>

          <div className="linkingLoveImage">
            <div className="linkRingLove">
              <div style={{ width: '100%' }}>
                <div className="linkLoveRing1" style={{ padding: '5px 2px 5px 0px' }}>
                  <img
                    src={data?.image?.[0]}
                    className="likingLoveImages"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="linkingLoveMain">
        <p className="linkingTitle">Cocktail Jewelry</p>
        <div style={{ display: "flex" }}>
          <div className="linkingLoveImage">
            <div className="linkRingLove">
              <div style={{ width: "100%" }}>
                <div className="linkLoveRing1" style={{ padding: "5px 2px 5px 0px" }}>
                  <img
                    src={data?.image?.[1]}
                    className="likingLoveImages"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="linkingLove" style={{ width: "66.66%" }}>
            <Slider {...settings} className="sliderMainSeconMain">
              <div className="linkRingLove">
                <div>
                  <div className="linkLoveRing1">
                    <img
                      src={
                        !ring3ImageChange
                          ? "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2173?mode=t"
                          : "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2173?mode=p"
                      }
                      className="likingLoveImages"
                      onMouseEnter={() => debouncedSetRing3ImageChange(true)}
                      onMouseLeave={() => debouncedSetRing3ImageChange(false)}
                    />
                  </div>
                </div>
                <div>
                  <div className="linkLoveRing2">
                    <img
                      src={
                        !ring4ImageChange
                          ? "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-1252?mode=t"
                          : "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-1252?mode=p"
                      }
                      className="likingLoveImages"
                      onMouseEnter={() => debouncedSetRing4ImageChange(true)}
                      onMouseLeave={() => debouncedSetRing4ImageChange(false)}
                    />
                  </div>
                </div>
              </div>

              <div className="linkRingLove">
                <div>
                  <div className="linkLoveRing1">
                    <img
                      src={
                        !ring3ImageChange
                          ? "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-678-BM?mode=t"
                          : "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-678-BM?mode=p"
                      }
                      className="likingLoveImages"
                      onMouseEnter={() => debouncedSetRing3ImageChange(true)}
                      onMouseLeave={() => debouncedSetRing3ImageChange(false)}
                    />
                  </div>
                </div>
                <div>
                  <div className="linkLoveRing2">
                    <img
                      src={
                        !ring4ImageChange
                          ? "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-591?mode=t"
                          : "https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-591?mode=p"
                      }
                      className="likingLoveImages"
                      onMouseEnter={() => debouncedSetRing4ImageChange(true)}
                      onMouseLeave={() => debouncedSetRing4ImageChange(false)}
                    />
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}











// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "./FeaturedCollection.scss";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function FeaturedCollection({data}) {
//   const [ring1ImageChange, setRing1ImageChange] = useState(false);
//   const [ring2ImageChange, setRing2ImageChange] = useState(false);
//   const [ring3ImageChange, setRing3ImageChange] = useState(false);
//   const [ring4ImageChange, setRing4ImageChange] = useState(false);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//   };

//   const handleMouseEnterRing1 = () => {
//     setRing1ImageChange(true);
//   };
//   const handleMouseLeaveRing1 = () => {
//     setRing1ImageChange(false);
//   };

//   const handleMouseEnterRing2 = () => {
//     setRing2ImageChange(true);
//   };
//   const handleMouseLeaveRing2 = () => {
//     setRing2ImageChange(false);
//   };

//   const handleMouseEnterRing3 = () => {
//     setRing3ImageChange(true);
//   };
//   const handleMouseLeaveRing3 = () => {
//     setRing3ImageChange(false);
//   };

//   const handleMouseEnterRing4 = () => {
//     setRing4ImageChange(true);
//   };
//   const handleMouseLeaveRing4 = () => {
//     setRing4ImageChange(false);
//   };
//   return (
//     <div>
//       <div className="linkingLoveMain">
//         <p className="linkingTitle">Bridal Collection</p>
//         <div className="linkingLove">
//           <Slider {...settings} className="sliderMain">
//             <div className="linkRingLove">
//               <div>
//                 <div className="linkLoveRing1">
//                   <img
//                     src={
//                       !ring1ImageChange
//                         ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4955?mode=t`
//                         : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4955?mode=p`
//                     }
//                     className="likingLoveImages"
//                     onMouseEnter={handleMouseEnterRing1}
//                     onMouseLeave={handleMouseLeaveRing1}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="linkLoveRing2">
//                   <img
//                     src={
//                       !ring2ImageChange
//                         ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4965?mode=t`
//                         : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4965?mode=p`
//                     }
//                     className="likingLoveImages"
//                     onMouseEnter={handleMouseEnterRing2}
//                     onMouseLeave={handleMouseLeaveRing2}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="linkRingLove">
//               <div>
//                 <div className="linkLoveRing1">
//                   <img
//                     src={
//                       !ring1ImageChange
//                         ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4925?mode=t`
//                         : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4925?mode=p`
//                     }
//                     className="likingLoveImages"
//                     onMouseEnter={handleMouseEnterRing1}
//                     onMouseLeave={handleMouseLeaveRing1}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="linkLoveRing2">
//                   <img
//                     src={
//                       !ring2ImageChange
//                         ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4891?mode=t`
//                         : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4891?mode=p`
//                     }
//                     className="likingLoveImages"
//                     onMouseEnter={handleMouseEnterRing2}
//                     onMouseLeave={handleMouseLeaveRing2}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="linkRingLove">
//               <div>
//                 <div className="linkLoveRing1">
//                   <img
//                     src={
//                       !ring1ImageChange
//                         ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4982?mode=t`
//                         : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4982?mode=p`
//                     }
//                     className="likingLoveImages"
//                     onMouseEnter={handleMouseEnterRing1}
//                     onMouseLeave={handleMouseLeaveRing1}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="linkLoveRing2">
//                   <img
//                     src={
//                       !ring2ImageChange
//                         ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4986?mode=t`
//                         : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4986?mode=p`
//                     }
//                     className="likingLoveImages"
//                     onMouseEnter={handleMouseEnterRing2}
//                     onMouseLeave={handleMouseLeaveRing2}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Slider>

//           <div className="linkingLoveImage">
//               <div className="linkRingLove">
//                 <div style={{ width: '100%' }}>
//                   <div className="linkLoveRing1" style={{ padding: '5px 2px 5px 0px' }}>
//                     <img
//                       src={data?.image?.[0]}
//                       className="likingLoveImages"
//                     />
//                   </div>
//                 </div>
//               </div>
//           </div>
//         </div>
//       </div>

//       <div className="linkingLoveMain">
//         <p className="linkingTitle">Cocktail Jewelry</p>
//         <div style={{ display: 'flex' }}>

//           <div className="linkingLoveImage">
//               <div className="linkRingLove">
//                 <div style={{ width: '100%' }}>
//                   <div className="linkLoveRing1" style={{ padding: '5px 2px 5px 0px' }}>
//                     <img
//                       src={data?.image?.[1]}
//                       className="likingLoveImages"
//                     />
//                   </div>
//                 </div>
//               </div>
//           </div>
//           <div className="linkingLove" style={{ width: '66.66%' }}>
//             <Slider {...settings} className="sliderMainSeconMain">
//               <div className="linkRingLove">
//                 <div>
//                   <div className="linkLoveRing1">
//                     <img
//                       src={
//                         !ring3ImageChange
//                           ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2173?mode=t`
//                           : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2173?mode=p`
//                       }
//                       className="likingLoveImages"
//                       onMouseEnter={handleMouseEnterRing3}
//                       onMouseLeave={handleMouseLeaveRing3}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="linkLoveRing2">
//                     <img
//                       src={
//                         !ring4ImageChange
//                           ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-1252?mode=t`
//                           : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-1252?mode=p`
//                       }
//                       className="likingLoveImages"
//                       onMouseEnter={handleMouseEnterRing4}
//                       onMouseLeave={handleMouseLeaveRing4}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="linkRingLove">
//                 <div>
//                   <div className="linkLoveRing1">
//                     <img
//                       src={
//                         !ring3ImageChange
//                           ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-678-BM?mode=t`
//                           : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-678-BM?mode=p`
//                       }
//                       className="likingLoveImages"
//                       onMouseEnter={handleMouseEnterRing3}
//                       onMouseLeave={handleMouseLeaveRing3}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="linkLoveRing2">
//                     <img
//                       src={
//                         !ring4ImageChange
//                           ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-591?mode=t`
//                           : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-591?mode=p`
//                       }
//                       className="likingLoveImages"
//                       onMouseEnter={handleMouseEnterRing4}
//                       onMouseLeave={handleMouseLeaveRing4}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="linkRingLove">
//                 <div>
//                   <div className="linkLoveRing1">
//                     <img
//                       src={
//                         !ring3ImageChange
//                           ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-468?mode=t`
//                           : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-468?mode=p`
//                       }
//                       className="likingLoveImages"
//                       onMouseEnter={handleMouseEnterRing3}
//                       onMouseLeave={handleMouseLeaveRing3}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="linkLoveRing2">
//                     <img
//                       src={
//                         !ring4ImageChange
//                           ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2088?mode=t`
//                           : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2088?mode=p`
//                       }
//                       className="likingLoveImages"
//                       onMouseEnter={handleMouseEnterRing4}
//                       onMouseLeave={handleMouseLeaveRing4}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



