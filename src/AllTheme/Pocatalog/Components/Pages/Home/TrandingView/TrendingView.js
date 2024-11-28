import React, { useEffect, useState } from 'react'
import './TrendingView.modul.scss'
import imageNotFound from "../../../Assets/image-not-found.jpg"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { useNavigate } from 'react-router-dom';
import pako from "pako";
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { proCat_loginState } from '../../../Recoil/atom';

const TrendingView = () => {

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [trandingViewData, setTrandingViewData] = useState([]);
    const [imageUrl, setImageUrl] = useState();

    const [ring1ImageChange, setRing1ImageChange] = useState(false);
    const [ring1ImageChangeOdd, setRing1ImageChangeOdd] = useState(false);
    const [ring3ImageChange, setRing3ImageChange] = useState(false);
    const [ring4ImageChange, setRing4ImageChange] = useState(false);
    const navigation = useNavigate();
    const [storeInit, setStoreInit] = useState({});

    const [oddNumberObjects, setOddNumberObjects] = useState([]);
    const [evenNumberObjects, setEvenNumberObjects] = useState([]);
    const islogin = useRecoilValue(proCat_loginState);

    const isOdd = (num) => num % 2 !== 0;

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

    useEffect(() => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        setImageUrl(data?.DesignImageFol);
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


        Get_Tren_BestS_NewAr_DesigSet_Album("GETTrending", finalID).then((response) => {
            if (response?.Data?.rd) {
                setTrandingViewData(response?.Data?.rd);

                const oddNumbers = response.Data.rd.filter(obj => isOdd(obj.SrNo));
                const evenNumbers = response.Data.rd.filter(obj => !isOdd(obj.SrNo));

                // Setting states with the separated objects
                setOddNumberObjects(oddNumbers);
                setEvenNumberObjects(evenNumbers);
            }
        }).catch((err) => console.log(err))
    }, [])

    const ProdCardImageFunc = (pd) => {
        let finalprodListimg;
        if (pd?.ImageCount > 0) {
            finalprodListimg = imageUrl + pd?.designno + "_" + 1 + "." + pd?.ImageExtension
        }
        else {
            finalprodListimg = imageNotFound;
        }
        return finalprodListimg
    }

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

        // if(IsB2BWebsite === 1){
        //     navigation(`/productdetail/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
        // }else{
        navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
        // }
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }




    const handleMouseEnterRing1 = (data) => {
        if (data?.ImageCount > 1) {
            setRing1ImageChange(true)
        }
    }
    const handleMouseLeaveRing1 = () => {
        setRing1ImageChange(false)
    }

    const handleMouseEnterRing2 = (data) => {
        if (data?.ImageCount > 1) {
            setRing1ImageChangeOdd(true)
        }
    }
    const handleMouseLeaveRing2 = () => {
        setRing1ImageChangeOdd(false)
    }

    const handleMouseEnterRing3 = () => {
        setRing3ImageChange(true)
    }
    const handleMouseLeaveRing3 = () => {
        setRing3ImageChange(false)
    }

    const handleMouseEnterRing4 = () => {
        setRing4ImageChange(true)
    }
    const handleMouseLeaveRing4 = () => {
        setRing4ImageChange(false)
    }

    return (
        <div className='proCat_trendingViewTopMain'>
            <div className='smr_trendingViewTopMain_div'>
                <div className='smr_trendingViewTopMain_Imgdiv'>
                    <img src={`${storImagePath()}/images/HomePage/TrendingViewBanner/TrendingViewImg.jpg`} className='linkingLoveImageDesign' />
                </div>
                <div className='smr_trendingViewTopMain_Sliderdiv'>
                    <p className='linkingTitle'>Trending View</p>
                    <p className='linkingShopCol'>SHOP COLLECTION</p>
                    <Slider {...settings} >
                        {
                            oddNumberObjects?.slice(0, 2).map((data, inedx) => (
                                evenNumberObjects?.slice(0, 2).map((datan, inedxn) => (
                                    <div className='linkRingLove'>
                                        <div>
                                            <div className='linkLoveRing1' onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
                                                <img src={ring1ImageChange ?
                                                    `${imageUrl}${data.designno === undefined ? '' : data?.designno}_2.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
                                                    :
                                                    `${imageUrl}${data.designno === undefined ? '' : data?.designno}_1.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
                                                } className='likingLoveImages'
                                                    onMouseEnter={() => handleMouseEnterRing1(data)} onMouseLeave={handleMouseLeaveRing1}
                                                />
                                            </div>
                                            <div className='linkLoveRing1Desc'>
                                                <p className='ring1Desc'>{data?.TitleLine}</p>
                                                <p className='ring1Desc'>
                                                    <span
                                                        className="smr_currencyFont"
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeEntities(
                                                                storeInit?.Currencysymbol
                                                            ),
                                                        }}
                                                    /> {(data?.UnitCost)?.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='linkLoveRing1' onClick={() => handleNavigation(datan?.designno, datan?.autocode, datan?.TitleLine)}>
                                                <img src={ring1ImageChangeOdd ?
                                                    `${imageUrl}${datan.designno === undefined ? '' : datan?.designno}_2.${datan?.ImageExtension === undefined ? '' : datan.ImageExtension}`
                                                    :
                                                    `${imageUrl}${datan.designno === undefined ? '' : datan?.designno}_1.${datan?.ImageExtension === undefined ? '' : datan.ImageExtension}`
                                                } className='likingLoveImages'

                                                    onMouseEnter={() => handleMouseEnterRing2(datan)} onMouseLeave={handleMouseLeaveRing2}
                                                />
                                            </div>
                                            <div className='linkLoveRing1Desc'>
                                                <p className='ring1Desc'>{datan?.TitleLine}</p>
                                                <p className='ring1Desc'><span
                                                    className="smr_currencyFont"
                                                    dangerouslySetInnerHTML={{
                                                        __html: decodeEntities(
                                                            storeInit?.Currencysymbol
                                                        ),
                                                    }}
                                                /> {(datan?.UnitCost)?.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ))
                        }
                    </Slider>
                    <p className='smr_TrendingViewAll' onClick={() => navigation(`/p/Trending/?T=${btoa('Trending')}`)}>View All</p>
                </div>
            </div>
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