import React, { useEffect, useRef, useState } from 'react'
import './TrendingView.modul.scss'
import imageNotFound from "../../../Assets/image-not-found.jpg"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import pako from "pako";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { formatRedirectTitleLine, formatter, storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import Cookies from 'js-cookie';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { smrMA_homeLoading, smrMA_loginState } from '../../../Recoil/atom';
import { Skeleton } from '@mui/material';


const TrendingView = ({ data }) => {

    const trendingRef = useRef(null);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [trandingViewData, setTrandingViewData] = useState([]);
    const navigation = useNavigate();
    const [storeInit, setStoreInit] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const islogin = useRecoilValue(smrMA_loginState);
    const [imageUrls, setImageUrls] = useState([]);
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const setLoadingHome = useSetRecoilState(smrMA_homeLoading);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // prevArrow: false, 
        // nextArrow: false,
    };


    // useEffect(() => {
    //     setLoadingHome(true);

    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 if (entry.isIntersecting) {
    //                     callAPI();
    //                     console.log("visble")
    //                     observer.unobserve(entry.target);
    //                 }
    //             });
    //         },
    //         {
    //             root: null,
    //             threshold: 0.5,
    //         }
    //     );

    //     if (trendingRef.current) {
    //         observer.observe(trendingRef.current);
    //     }
    //     return () => {
    //         if (trendingRef.current) {
    //             observer.unobserve(trendingRef.current);
    //         }
    //     };
    // }, [])


    const checkImageAvailability = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve(imageNotFound);
            img.src = url;
        });
    };

    const callAPI = () => {
        setIsLoading(true)
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)
        let storeInitData = JSON.parse(sessionStorage.getItem('storeInit'))
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }

        setLoadingHome(false);
        Get_Tren_BestS_NewAr_DesigSet_Album("GETTrending", finalID).then(async (response) => {
            if (response?.Data?.rd) {
                const data = response.Data.rd;
                const urls = await Promise.all(data?.map(async (item) => {
                    // const url = `${storeInitData?.CDNDesignImageFol}${item.designno}~1.${item.ImageExtension}`;
                    const url = `${storeInitData?.CDNDesignImageFolThumb}${item.designno}~1.jpg`;
                    // const available = await checkImageAvailability(url);
                    return { ...item, src: url }
                }));
                // setTrandingViewData(data);
                setTrandingViewData(urls);
                // setImageUrls(urls);
            }
        }).catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        callAPI();
    }, [])

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = pako.deflate(uint8Array, { to: 'string' });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error('Error compressing and encoding:', error);
            return null;
        }
    };

    const handleNavigation = (designNo, autoCode, titleLine) => {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit')) ?? "";
        const { IsB2BWebsite } = storeInit;

        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        //   const link = `/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`;
        const link = `/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`;
        if (IsB2BWebsite == 1) {
            if (islogin) {
                navigation(link)
            } else {
                localStorage.setItem('redirectLookBook', link);
                navigation('/signin')
            }
        } else {
            navigation(link)
        }
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const handleNavigate = () => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        const link = `/p/Trending/?T=${btoa('Trending')}`;
        if (storeinit?.IsB2BWebsite == 1) {
            if (islogin) {
                navigation(link)
            } else {
                localStorage.setItem('redirectLookBook', link);
                navigation('/signin')
            }
        } else {
            navigation(link)
        }
    }

    const renderSlides = () => {
        if (!trandingViewData?.length) return null;
        const slides = [];
        for (let i = 0; i < Math.min(trandingViewData?.length, 5); i += 2) {
            slides.push(
                <div className='linkRingLove' key={i}>
                    <div>
                        <div className='linkLoveRing1' onClick={() => handleNavigation(trandingViewData[i]?.designno, trandingViewData[i]?.autocode, trandingViewData[i]?.TitleLine)}>
                            <img src={trandingViewData[i]?.src || imageNotFound} className='likingLoveImages' loading="lazy" onError={(e) => e.target.src = imageNotFound} alt='Trending Item' />
                        </div>
                        <div className='linkLoveRing1Desc'>
                            <p className='ring1Desc'>{trandingViewData[i]?.designno}</p>

                            {storeInit?.IsPriceShow == 1 && <p className='smr_bestSellerPrice'>
                                <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}</span>&nbsp;
                                {formatter(trandingViewData[i]?.UnitCostWithMarkUp)}
                            </p>}
                        </div>
                    </div>
                    {trandingViewData[i + 1] && (
                        <div>
                            <div className='linkLoveRing2' onClick={() => handleNavigation(trandingViewData[i + 1]?.designno, trandingViewData[i + 1]?.autocode, trandingViewData[i + 1]?.TitleLine)}>
                                <img src={trandingViewData[i + 1]?.src || imageNotFound} onError={(e) => e.target.src = imageNotFound} loading="lazy" className='likingLoveImages' alt='Trending Item' />
                            </div>
                            <div className='linkLoveRing1Desc'>
                                <p className='ring1Desc'>{trandingViewData[i + 1]?.designno}</p>

                                {storeInit?.IsPriceShow == 1 && <p className='smr_bestSellerPrice'>
                                    <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}</span>&nbsp;
                                    {formatter(trandingViewData[i + 1]?.UnitCostWithMarkUp)}
                                </p>}
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        return slides;
    };

    return (
        <div className='smrMA_trendingViewTopMain' ref={trendingRef}>
            {isLoading ?
                <div>
                    {/* Image Skeleton */}
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={500}
                        sx={{
                            marginTop: 2,
                            '@media (max-width: 600px)': { height: '620px !important' },
                            '@media (max-width: 420px)': { height: '550px !important' },
                        }}
                    />

                    {/* Product Card Skeletons (Slider Placeholder) */}
                    <div style={{ display: 'flex', gap: 16, padding: '0 16px', marginTop: '1rem', width: "100%" }}>
                        {[1, 2].map((_, index) => (
                            <div key={index} style={{ width: '100%' }}>
                                <Skeleton variant="square" width='100%' height={150} />
                                <Skeleton variant="text" width="100%" height={20} sx={{ marginTop: 1 }} />
                                <Skeleton variant="text" width="80%" height={20} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className='smr_trendingViewTopMain_div'>
                    <div className='smr_trendingViewTopMain_Imgdiv'>
                        {/* <img src={`${storImagePath()}/images/HomePage/TrendingViewBanner/TrendingViewImg.webp`} className='linkingLoveImageDesign' /> */}
                        <img src={data?.image?.[0]} className='linkingLoveImageDesign' loading="lazy" onError={(e) => e.target.src = imageNotFound} />
                    </div>
                    <div className='smr_trendingViewTopMain_Sliderdiv'>
                        <p className='linkingTitle'>Trending View</p>
                        <p className='smr_TrendingViewAll' onClick={handleNavigate}>SHOP COLLECTION</p>
                        <Slider {...settings}>
                            {renderSlides()}
                        </Slider>
                    </div>
                </div>
            }
        </div>
    )
}

export default TrendingView


{/* <div className='linkRingLove'>
                            <div>
                                <div className='linkLoveRing1' onClick={() => handleNavigation(trandingViewData[0]?.designno, trandingViewData[0]?.autocode, trandingViewData[0]?.TitleLine)}>
                                    <img src={ring1ImageChange ?
                                        `${imageUrl}${trandingViewData && trandingViewData[0]?.designno === undefined ? '' : trandingViewData[0]?.designno}_2.${trandingViewData && trandingViewData[0]?.ImageExtension === undefined ? '' : trandingViewData[0]?.ImageExtension}`
                                        :
                                        `${imageUrl}${trandingViewData && trandingViewData[0]?.designno === undefined ? '' : trandingViewData[0]?.designno}_1.${trandingViewData && trandingViewData[0]?.ImageExtension === undefined ? '' : trandingViewData[0]?.ImageExtension}`} className='likingLoveImages'

                                        onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1}
                                    />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>{trandingViewData[0]?.TitleLine}</p>
                                    <p className='ring1Desc'><span
                                        className="smr_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                storeInit?.Currencysymbol
                                            ),
                                        }}
                                    /> {trandingViewData[0]?.UnitCost}</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2' onClick={() => handleNavigation(trandingViewData[1]?.designno, trandingViewData[1]?.autocode, trandingViewData[1]?.TitleLine)}>
                                    <img src={`${imageUrl}${trandingViewData && trandingViewData[1]?.designno === undefined ? '' : trandingViewData[1]?.designno}_1.${trandingViewData && trandingViewData[1]?.ImageExtension === undefined ? '' : trandingViewData[1]?.ImageExtension}`} className='likingLoveImages' />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>{trandingViewData[1]?.TitleLine}</p>
                                    <p className='ring1Desc'><span
                                        className="smr_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                storeInit?.Currencysymbol
                                            ),
                                        }}
                                    /> {trandingViewData[1]?.UnitCost}</p>
                                </div>
                            </div>
                        </div>

                        <div className='linkRingLove'>
                            <div>
                                <div className='linkLoveRing1' onClick={() => handleNavigation(trandingViewData[2]?.designno, trandingViewData[2]?.autocode, trandingViewData[2]?.TitleLine)}>
                                    <img src={`${imageUrl}${trandingViewData && trandingViewData[2]?.designno === undefined ? '' : trandingViewData[2]?.designno}_1.${trandingViewData && trandingViewData[2]?.ImageExtension === undefined ? '' : trandingViewData[2]?.ImageExtension}`} className='likingLoveImages' />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>{trandingViewData[2]?.TitleLine}</p>
                                    <p className='ring1Desc'><span
                                        className="smr_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                storeInit?.Currencysymbol
                                            ),
                                        }}
                                    /> {trandingViewData[2]?.UnitCost}</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2' onClick={() => handleNavigation(trandingViewData[3]?.designno, trandingViewData[3]?.autocode, trandingViewData[3]?.TitleLine)}>
                                    <img src={`${imageUrl}${trandingViewData && trandingViewData[3]?.designno === undefined ? '' : trandingViewData[3]?.designno}_1.${trandingViewData && trandingViewData[3]?.ImageExtension === undefined ? '' : trandingViewData[3]?.ImageExtension}`} className='likingLoveImages' />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>{trandingViewData[3]?.TitleLine}</p>
                                    <p className='ring1Desc'><span
                                        className="smr_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                storeInit?.Currencysymbol
                                            ),
                                        }}
                                    /> {trandingViewData[3]?.UnitCost}</p>
                                </div>
                            </div>
                        </div>

                        <div className='linkRingLove'>
                            <div>
                                <div className='linkLoveRing1' onClick={() => handleNavigation(trandingViewData[4]?.designno, trandingViewData[4]?.autocode, trandingViewData[4]?.TitleLine)}>
                                    <img src={`${imageUrl}${trandingViewData && trandingViewData[4]?.designno === undefined ? '' : trandingViewData[4]?.designno}_1.${trandingViewData && trandingViewData[4]?.ImageExtension === undefined ? '' : trandingViewData[4]?.ImageExtension}`} className='likingLoveImages' />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>{trandingViewData[4]?.TitleLine}</p>
                                    <p className='ring1Desc'><span
                                        className="smr_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                storeInit?.Currencysymbol
                                            ),
                                        }}
                                    /> {trandingViewData[4]?.UnitCost}</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2' onClick={() => handleNavigation(trandingViewData[5]?.designno, trandingViewData[5]?.autocode, trandingViewData[6]?.TitleLine)}>
                                    <img src={`${imageUrl}${trandingViewData && trandingViewData[5]?.designno === undefined ? '' : trandingViewData[5]?.designno}_1.${trandingViewData && trandingViewData[5]?.ImageExtension === undefined ? '' : trandingViewData[5]?.ImageExtension}`} className='likingLoveImages' />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>{trandingViewData[5]?.TitleLine}</p>
                                    <p className='ring1Desc'><span
                                        className="smr_currencyFont"
                                        dangerouslySetInnerHTML={{
                                            __html: decodeEntities(
                                                storeInit?.Currencysymbol
                                            ),
                                        }}
                                    /> {trandingViewData[5]?.UnitCost}</p>
                                </div>
                            </div>

                        </div> */}



// import React, { useEffect, useState } from 'react'
// import './TrendingView.modul.scss'
// import imageNotFound from "../../../Assets/image-not-found.jpg"

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
// import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

// const TrendingView = () => {

//     const [trandingViewData, setTrandingViewData] = useState('');
//     const [imageUrl, setImageUrl] = useState();

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



//     useEffect(() => {
//         let data = JSON.parse(sessionStorage.getItem('storeInit'))
//         setImageUrl(data?.DesignImageFol);

//         Get_Tren_BestS_NewAr_DesigSet_Album("GETTrending").then((response) => {
//             if (response?.Data?.rd) {
//                 setTrandingViewData(response?.Data?.rd);
//             }
//         }).catch((err) => console.log(err))
//     }, [])


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


//     console.log('trandingViewDatatrandingViewData', trandingViewData &&


//         `${imageUrl}${trandingViewData && trandingViewData[11]?.designno === undefined ? '' : trandingViewData[11]?.designno}_1.${trandingViewData && trandingViewData[11]?.ImageExtension}`
//     );
//     const ProdCardImageFunc = (pd) => {
//         let finalprodListimg;
//         if (pd?.ImageCount > 0) {
//             finalprodListimg = imageUrl + pd?.designno + "_" + 1 + "." + pd?.ImageExtension
//         }
//         else {
//             finalprodListimg = imageNotFound;
//         }
//         return finalprodListimg
//     }


//     return (
//         <div className='smr_trendingViewTopMain'>


//             <div className='linkingLoveMain linkingLoveMain2'>
//                 <div className='linkingLoveImage'>
//                     <img src={`${storImagePath()}/images/HomePage/TrendingViewBanner/TrendingViewImg.jpg`} className='linkingLoveImageDesign' />
//                 </div>
//                 <div className='linkingLove'>
//                     <p className='linkingTitle'>Trending View</p>
//                     <p className='linkingShopCol'>SHOP COLLECTION</p>
//                     <Slider {...settings} >
//                         <div className='linkRingLove'>
//                             <div>
//                                 <div className='linkLoveRing1'>
//                                     <img src={!ring3ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[0]?.designno === undefined ? '' : trandingViewData[0]?.designno}_1.${trandingViewData && trandingViewData[0]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[2]?.designno}_1.${trandingViewData && trandingViewData[2]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className='linkLoveRing2'>
//                                     <img src={!ring4ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[1]?.designno}_1.${trandingViewData && trandingViewData[0]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[3]?.designno}_1.${trandingViewData && trandingViewData[3]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                 </div>
//                             </div>

//                         </div>

//                         <div className='linkRingLove'>
//                             <div>
//                                 <div className='linkLoveRing1'>
//                                     <img src={!ring3ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[3]?.designno}_1.${trandingViewData && trandingViewData[3]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[0]?.designno}_1.${trandingViewData && trandingViewData[0]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className='linkLoveRing2'>
//                                     <img src={!ring4ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[4]?.designno}_1.${trandingViewData && trandingViewData[4]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[1]?.designno}_1.${trandingViewData && trandingViewData[1]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                 </div>
//                             </div>

//                         </div>

//                         <div className='linkRingLove'>
//                             <div>
//                                 <div className='linkLoveRing1'>
//                                     <img src={!ring3ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[9]?.designno}_1.${trandingViewData && trandingViewData[9]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[10]?.designno}_1.${trandingViewData && trandingViewData[10]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className='linkLoveRing2'>
//                                     <img src={!ring4ImageChange ? `${imageUrl} + ${trandingViewData && trandingViewData[11]?.designno} + "_" + 1 + "." + ${trandingViewData && trandingViewData[11]?.ImageExtension}` : `${imageUrl} + ${trandingViewData && trandingViewData[12]?.designno} + "_" + 1 + "." + ${trandingViewData && trandingViewData[12]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                 </div>
//                             </div>

//                         </div>
//                     </Slider>
//                     <p className='smr_TrendingViewAll'>View All</p>
//                 </div>
//             </div>

//             {/* <div>
//                 <Swiper
//                     slidesPerView={1}
//                     spaceBetween={10}
//                     loop={true}
//                     breakpoints={{
//                         640: {
//                             slidesPerView: 2,
//                             spaceBetween: 0,
//                         },
//                         768: {
//                             slidesPerView: 4,
//                             spaceBetween: 0,
//                         },
//                         1024: {
//                             slidesPerView: 5,
//                             spaceBetween: 0,
//                         },
//                         1240: {
//                             slidesPerView: 4,
//                             spaceBetween: 0,
//                         },
//                     }}
//                     modules={[Pagination, Navigation]}
//                     navigation={{ // Custom navigation configuration
//                         nextEl: '.swiper-button-next',
//                         prevEl: '.swiper-button-prev',
//                     }}
//                     className="mySwiper"
//                 >

//                     {trandingViewData?.slice(0, 11).map((data, index) => (
//                         <SwiperSlide key={index} className='smr_trendingViewMain'>
//                             <div className='smr_trendingImageDiv'>
//                                 <img loading="lazy" src={ProdCardImageFunc(data)}
//                                     alt={`Slide ${index}`} className='smr_TrendingViewImage' />
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//                 <div className="swiper-button-next"></div>
//                 <div className="swiper-button-prev"></div>
//             </div> */}
//         </div>
//     )
// }

// export default TrendingView