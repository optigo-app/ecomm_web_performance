import React, { useEffect, useRef, useState } from 'react'
import './BestSellerSection.modul.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Pako from 'pako';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { formatter, storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import Cookies from 'js-cookie';
import { smrMA_homeLoading, smrMA_loginState } from '../../../Recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import imageNotFound from "../../../Assets/image-not-found.jpg"

const BestSellerSection = () => {

    const bestSallerRef = useRef(null);
    const [imageUrl, setImageUrl] = useState();
    const [bestSellerData , setBestSellerData] = useState('')
    const[storeInit,setStoreInit]=useState({});
    const [imageUrls, setImageUrls] = useState([]);
    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const islogin = useRecoilValue(smrMA_loginState);
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const setLoadingHome = useSetRecoilState(smrMA_homeLoading);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // prevArrow: false,   
        // nextArrow: false,   
    };

  useEffect(() => {
      setLoadingHome(true);
      const observer = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                      callAllApi()
                      observer.unobserve(entry.target);
                  }
              });
          },
          {
              root: null,
              threshold: 0.5,
          }
      );

      if (bestSallerRef.current) {
          observer.observe(bestSallerRef.current);
      }
      return () => {
          if (bestSallerRef.current) {
              observer.unobserve(bestSallerRef.current);
          }
      };
  }, [])

  const callAllApi = () => {
    const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
    const { IsB2BWebsite } = storeInit;
    // console.log("IsB2BWebsite", IsB2BWebsite);
    // console.log("loginUserDetail", loginUserDetail)
    const visiterID = Cookies.get('visiterId');
    let finalID;
    if (IsB2BWebsite == 0) {
        finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
    } else {
        finalID = loginUserDetail?.id || '0';
    }
    // console.log("finalID", finalID);
    // console.log("loginUserDetail", loginUserDetail);
    // console.log("visiterID", visiterID);
    

    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeinit)

    let data = JSON.parse(sessionStorage.getItem('storeInit'))
    setImageUrl(data?.CDNDesignImageFol);

    Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller", finalID).then((response) => {
      setLoadingHome(false);
        if (response?.Data?.rd) {
            setBestSellerData(response?.Data?.rd);
        }
    }).catch((err) =>{ return err})

}


    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = Pako.deflate(uint8Array, { to: 'string' });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            // console.error('Error compressing and encoding:', error);
            return null;
        }
    };

    const handleNavigation = (designNo, autoCode, titleLine) => {
      let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        const link = `/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}` ;
        if(storeinit?.IsB2BWebsite == 1){
          if(islogin){
            navigation(link)
          }else{
            localStorage.setItem('redirectLookBook',link);
            navigation('/signin')
          }
        }else{
          navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
        }
    }

    const handleNavigate = () =>{
      let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
      const link = `/p/BestSeller/?B=${btoa('BestSeller')}` ;
      if(storeinit?.IsB2BWebsite == 1){
        if(islogin){
      navigation(link)
        }else{
            localStorage.setItem('redirectLookBook',link);
          navigation('/signin')
        }
      }else{
      navigation(link)
      }
    }


    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      }


    //   const renderSlides = () => {
    //     if (!bestSellerData?.length) return null;
    //     const slides = [];
    //     for (let i = 0; i < Math.min(bestSellerData?.length, 5); i += 2) {
    //         slides.push(
    //             <div className='linkRingLove' key={i}>
    //                 <div>
    //                     <div className='linkLoveRing1' onClick={() => handleNavigation(bestSellerData[i]?.designno, bestSellerData[i]?.autocode, bestSellerData[i]?.TitleLine)}>
    //                         <img src={imageUrls[i] || imageNotFound} className='likingLoveImages' alt='Trending Item' />
    //                     </div>
    //                     <div className='linkLoveRing1Desc'>
    //                         <p className='ring1Desc'>{bestSellerData[i]?.designno}</p>
    //                         <p className='smr_bestSellerPrice'>
    //                             <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}</span>&nbsp;
    //                             {formatter(bestSellerData[i]?.UnitCostWithMarkUp)}
    //                         </p>
    //                     </div>
    //                 </div>
    //                 {bestSellerData[i + 1] && (
    //                     <div>
    //                         <div className='linkLoveRing2' onClick={() => handleNavigation(bestSellerData[i + 1]?.designno, bestSellerData[i + 1]?.autocode, bestSellerData[i + 1]?.TitleLine)}>
    //                             <img src={imageUrls[i + 1] || imageNotFound} className='likingLoveImages' alt='Trending Item' />
    //                         </div>
    //                         <div className='linkLoveRing1Desc'>
    //                             <p className='ring1Desc'>{bestSellerData[i + 1]?.designno}</p>
    //                             <p className='smr_bestSellerPrice'>
    //                             <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}</span>&nbsp;
    //                             {formatter(bestSellerData[i]?.UnitCostWithMarkUp)}
    //                         </p>
    //                         </div>
    //                     </div>
    //                 )}
    //             </div>
    //         );
    //     }
    //     return slides;
    // };
    const [validatedData, setValidatedData] = useState([]);

      const checkImageAvailability = (url) => {
          return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => resolve(url);
              img.onerror = () => resolve(imageNotFound);
              img.src = url;
          });
      };
  
      const validateImageURLs = async () => {
          if (!bestSellerData?.length) return;
          const validatedData = await Promise.all(
              bestSellerData.map(async (item) => {
                  const imageURL = `${imageUrl}${item?.designno}~1.${item?.ImageExtension}`;
                  const validatedURL = await checkImageAvailability(imageURL);
                  return { ...item, validatedImageURL: validatedURL };
              })
          );
          setValidatedData(validatedData);
      };
  
      useEffect(() => {
          validateImageURLs();
      }, [bestSellerData]);

    const renderSlides = () => {
      if (!validatedData?.length) return null;
      const slides = [];
      for (let i = 0; i < Math.min(validatedData.length, 5); i += 2) {
          slides.push(
              <div className='linkRingLove' key={i}>
                  <div>
                      <div
                          className='linkLoveRing1'
                          onClick={() =>
                              handleNavigation(
                                  validatedData[i]?.designno,
                                  validatedData[i]?.autocode,
                                  validatedData[i]?.TitleLine
                              )
                          }
                      >
                          <img
                              src={validatedData[i]?.validatedImageURL}
                              className='likingLoveImages'
                              alt='Bestselling Items'
                          />
                      </div>
                      <div className='linkLoveRing1Desc'>
                          <p className='ring1Desc'>{validatedData[i]?.designno}</p>
                          <p className='smr_bestSellerPrice'>
                              <span className="smr_currencyFont">
                                  {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                              </span>
                              &nbsp;
                              {formatter(validatedData[i]?.UnitCostWithMarkUp)}
                          </p>
                      </div>
                  </div>
                  {validatedData[i + 1] && (
                      <div>
                          <div
                              className='linkLoveRing2'
                              onClick={() =>
                                  handleNavigation(
                                      validatedData[i + 1]?.designno,
                                      validatedData[i + 1]?.autocode,
                                      validatedData[i + 1]?.TitleLine
                                  )
                              }
                          >
                              <img
                                  src={validatedData[i + 1]?.validatedImageURL}
                                  className='likingLoveImages'
                                  alt='Bestselling Items'
                              />
                          </div>
                          <div className='linkLoveRing1Desc'>
                              <p className='ring1Desc'>{validatedData[i + 1]?.designno}</p>
                              <p className='smr_bestSellerPrice'>
                                  <span className="smr_currencyFont">
                                      {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                  </span>
                                  &nbsp;
                                  {formatter(validatedData[i + 1]?.UnitCostWithMarkUp)}
                              </p>
                          </div>
                      </div>
                  )}
              </div>
          );
      }
      return slides;
  };

    return (
    <div className='smrMA_bestSallerMain'  ref={bestSallerRef}>
      {bestSellerData?.length != 0 &&
          <div className='linkingLoveMain'>
            <div className='linkingLove'>
            <p className='linkingTitle'>Best Seller</p>
            <p className='lsmr_BestSallerViewAll'  onClick={handleNavigate}>SHOP COLLECTION</p>
            <Slider {...settings} >
              {renderSlides()}
            </Slider>
          </div>
          <div className='linkingLoveImage'>
            <img src={`${storImagePath()}/images/HomePage/BestSeller/promoSetMainBanner.webp`} className='linkingLoveImageDesign' />
          </div>
        </div>
      }
    </div>
  )
}

export default BestSellerSection;





















// import React, { useEffect, useState } from 'react'
// import './BestSellerSection.modul.scss'
// import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from 'react-slick';
// import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

// const BestSellerSection = () => {

//     const [ring1ImageChange, setRing1ImageChange] = useState(false);
//     const [ring2ImageChange, setRing2ImageChange] = useState(false);
//     const [ring3ImageChange, setRing3ImageChange] = useState(false);
//     const [ring4ImageChange, setRing4ImageChange] = useState(false);

//     const [imageUrl, setImageUrl] = useState();
//     const [bestSellerData , setBestSellerData] = useState('')

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//         // prevArrow: false, 
//         // nextArrow: false,
//     };

//     useEffect(() => {
//         let data = JSON.parse(sessionStorage.getItem('storeInit'))
//         setImageUrl(data?.DesignImageFol);

//         Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller").then((response) => {
//             if (response?.Data?.rd) {
//                 setBestSellerData(response?.Data?.rd);
//             }
//         }).catch((err) => console.log(err))
//     }, [])

//     const handleMouseEnterRing1 = () => {
//         setRing1ImageChange(true)
//     }
//     const handleMouseLeaveRing1 = () => {
//         setRing1ImageChange(false)
//     }

//     const handleMouseEnterRing2 = () => {
//         setRing2ImageChange(true)
//     }
//     const handleMouseLeaveRing2 = () => {
//         setRing2ImageChange(false)
//     }

//     const handleMouseEnterRing3 = () => {
//         setRing3ImageChange(true)
//     }
//     const handleMouseLeaveRing3 = () => {
//         setRing3ImageChange(false)
//     }

//     const handleMouseEnterRing4 = () => {
//         setRing4ImageChange(true)
//     }
//     const handleMouseLeaveRing4 = () => {
//         setRing4ImageChange(false)
//     }

//   return (
//     <div>
//     <div className='linkingLoveMain' style={{marginTop: '120px'}}>
//         <div className='linkingLove'>
//             <p className='linkingTitle'>Best Seller</p>
//             {/* <p className='linkingDesc'>Ready to share link with your loved ones!</p> */}
//             <p className='linkingShopCol'>SHOP COLLECTION</p>
//             <Slider {...settings} >
//                         <div className='linkRingLove'>
//                             <div>
//                                 <div className='linkLoveRing1'>
//                                     <img src={!ring3ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[0]?.designno}_1.${bestSellerData && bestSellerData[0]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[2]?.designno}_1.${bestSellerData && bestSellerData[2]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='smr_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className='linkLoveRing2'>
//                                     <img src={!ring4ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[1]?.designno}_1.${bestSellerData && bestSellerData[0]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[3]?.designno}_1.${bestSellerData && bestSellerData[3]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='smr_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>

//                                 </div>
//                             </div>

//                         </div>

//                         <div className='linkRingLove'>
//                             <div>
//                                 <div className='linkLoveRing1'>
//                                     <img src={!ring3ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[3]?.designno}_1.${bestSellerData && bestSellerData[3]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[0]?.designno}_1.${bestSellerData && bestSellerData[0]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='smr_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>

//                                 </div>
//                             </div>
//                             <div>
//                                 <div className='linkLoveRing2'>
//                                     <img src={!ring4ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[4]?.designno}_1.${bestSellerData && bestSellerData[4]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[1]?.designno}_1.${bestSellerData && bestSellerData[1]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='smr_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>

//                                 </div>
//                             </div>

//                         </div>

//                         <div className='linkRingLove'>
//                             <div>
//                                 <div className='linkLoveRing1'>
//                                     <img src={!ring3ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[9]?.designno}_1.${bestSellerData && bestSellerData[9]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[10]?.designno}_1.${bestSellerData && bestSellerData[10]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='smr_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>

//                                 </div>
//                             </div>
//                             <div>
//                                 <div className='linkLoveRing2'>
//                                     <img src={!ring4ImageChange ? `${imageUrl} + ${bestSellerData && bestSellerData[11]?.designno} + "_" + 1 + "." + ${bestSellerData && bestSellerData[11]?.ImageExtension}` : `${imageUrl} + ${bestSellerData && bestSellerData[12]?.designno} + "_" + 1 + "." + ${bestSellerData && bestSellerData[12]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='smr_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>
//                                 </div>
//                             </div>

//                         </div>
//                     </Slider>
                    
//         </div>
//         <div className='linkingLoveImage'>
//             <img src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetMainBanner.jpg`} className='linkingLoveImageDesign' />
//         </div>
//     </div>
    
// </div>
//   )
// }

// export default BestSellerSection;


// import React, { useState } from 'react'
// import './PromoSetSection.modul.scss'
// import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from 'react-slick';

// const PromoSetSection = () => {

//     const [ring1ImageChange, setRing1ImageChange] = useState(false);
//     const [ring2ImageChange, setRing2ImageChange] = useState(false);
//     const [ring3ImageChange, setRing3ImageChange] = useState(false);
//     const [ring4ImageChange, setRing4ImageChange] = useState(false);

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//         // prevArrow: false, 
//         // nextArrow: false,
//     };

    

//     const handleMouseEnterRing1 = () => {
//         setRing1ImageChange(true)
//     }
//     const handleMouseLeaveRing1 = () => {
//         setRing1ImageChange(false)
//     }

//     const handleMouseEnterRing2 = () => {
//         setRing2ImageChange(true)
//     }
//     const handleMouseLeaveRing2 = () => {
//         setRing2ImageChange(false)
//     }

//     const handleMouseEnterRing3 = () => {
//         setRing3ImageChange(true)
//     }
//     const handleMouseLeaveRing3 = () => {
//         setRing3ImageChange(false)
//     }

//     const handleMouseEnterRing4 = () => {
//         setRing4ImageChange(true)
//     }
//     const handleMouseLeaveRing4 = () => {
//         setRing4ImageChange(false)
//     }

//   return (
//     <div>
//     <div className='linkingLoveMain'>
//         <div className='linkingLove'>
//             <p className='linkingTitle'>LINKING LOVE</p>
//             <p className='linkingDesc'>Ready to share link with your loved ones!</p>
//             <p className='linkingShopCol'>SHOP COLLECTION</p>
//             <Slider {...settings} >
//                 <div className='linkRingLove'>
//                     <div className='linkRingLoveSubMain'>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring1ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div className='linkRingLoveSubMain'>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring2ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing2} onMouseLeave={handleMouseLeaveRing2} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='linkRingLove'>

//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring1ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring2ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing2} onMouseLeave={handleMouseLeaveRing2} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='linkRingLove'>
//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring1ImageChange ?  `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring2ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing2} onMouseLeave={handleMouseLeaveRing2} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                 </div>
//             </Slider>
//         </div>
//         <div className='linkingLoveImage'>
//             <img src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetMainBanner.jpg`} className='linkingLoveImageDesign' />
//         </div>
//     </div>


//     {/* <div className='linkingLoveMain linkingLoveMain2'>
//         <div className='linkingLoveImage'>
//             <img src={`${storImagePath()}/images/HomePage/Promo/Set/2/promoSetMainBanner2.jpg`} className='linkingLoveImageDesign' />
//         </div>
//         <div className='linkingLove'>
//             <p className='linkingTitle'>FLORA</p>
//             <p className='linkingDesc'>High end affordable luxury with sophisticated designs for your every day.</p>
//             <p className='linkingShopCol'>SHOP COLLECTION</p>
//             <Slider {...settings} >
//                 <div className='linkRingLove'>
//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring3ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring4ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>

//                 </div>

//                 <div className='linkRingLove'>
//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring3ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring4ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>

//                 </div>

//                 <div className='linkRingLove'>
//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring3ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring4ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>

//                 </div>
//             </Slider>
//         </div>
//     </div> */}

// </div>
//   )
// }

// export default PromoSetSection;


