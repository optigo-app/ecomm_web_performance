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
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { useNavigate } from 'react-router-dom';
import pako from "pako";
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { stam_loginState } from '../../../Recoil/atom';

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
    const islogin = useRecoilValue(stam_loginState);
    const [hoveredItem, setHoveredItem] = useState(null);

    const isOdd = (num) => num % 2 !== 0;

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
            setHoveredItem(data.SrNo); 
            setRing1ImageChange(true)
        }
    }
    const handleMouseLeaveRing1 = () => {
        setHoveredItem(null); 
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

    
    const chunkedData = [];
    for (let i = 0; i < trandingViewData?.length; i += 3) {
        chunkedData.push(trandingViewData?.slice(i, i + 3));
    }
    
    console.log('trandingViewDatatrandingViewData', trandingViewData);
    console.log('chunkedDatachunkedData', chunkedData);
    return (
        <div>
            {trandingViewData?.length != 0 &&
                <div className='stam_trendingViewTopMain'>
                    <div className='stam_trendingViewTopMain_div'>
                        <div className='stam_trendingViewTopMain_Imgdiv'>
                            <img src={`${storImagePath()}/images/HomePage/TrendingViewBanner/TrendingViewImg.jpg`} className='linkingLoveImageDesign' />
                        </div>
                        <div className='stam_trendingViewTopMain_Sliderdiv'>
                            <p className='linkingTitle'>Trending View</p>
                            <Slider {...settings} >
                                {chunkedData?.map((chunk, index) => (
                                        <div className='linkRingLove'>
                                              {chunk?.map((data, dataIndex) => (
                                            <div className='stam_TrendingMainDiv'>
                                                <div className='linkLoveRing1' onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
                                                    <img src={hoveredItem === data.SrNo  ?
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
                                                        <span className="stam_currencyFont">
                                                           {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                        </span> &nbsp;
                                                        {formatter(data?.UnitCostWithMarkUp)}</p>
                                                </div>
                                            </div>
                                             ))}
                                        </div>
                                    ))
                                }
                            </Slider>
                            <p className='stam_TrendingViewAll' onClick={() => navigation(`/p/Trending/?T=${btoa('Trending')}`)}>SHOP COLLECTION</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default TrendingView


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
// import { useNavigate } from 'react-router-dom';
// import pako from "pako";
// import { useRecoilValue } from 'recoil';
// import Cookies from 'js-cookie';

// const TrendingView = () => {

//     const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//     const [trandingViewData, setTrandingViewData] = useState([]);
//     const [imageUrl, setImageUrl] = useState();

//     const [ring1ImageChange, setRing1ImageChange] = useState(false);
//     const [ring1ImageChangeOdd, setRing1ImageChangeOdd] = useState(false);
//     const [ring3ImageChange, setRing3ImageChange] = useState(false);
//     const [ring4ImageChange, setRing4ImageChange] = useState(false);
//     const navigation = useNavigate();
//     const [storeInit, setStoreInit] = useState({});

//     const [oddNumberObjects, setOddNumberObjects] = useState([]);
//     const [evenNumberObjects, setEvenNumberObjects] = useState([]);
//     const islogin = useRecoilValue(loginState);

//     const isOdd = (num) => num % 2 !== 0;

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
//         let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
//         setStoreInit(storeinit)

//         let data = JSON.parse(sessionStorage.getItem('storeInit'))
//         setImageUrl(data?.DesignImageFol);
//         const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
//         const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
//         const { IsB2BWebsite } = storeInit;
//         const visiterID = Cookies.get('visiterId');
//         let finalID;
//         if (IsB2BWebsite == 0) {
//             finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
//         } else {
//             finalID = loginUserDetail?.id || '0';
//         }


//         Get_Tren_BestS_NewAr_DesigSet_Album("GETTrending", finalID).then((response) => {
//             if (response?.Data?.rd) {
//                 setTrandingViewData(response?.Data?.rd);

//                 const oddNumbers = response.Data.rd.filter(obj => isOdd(obj.SrNo));
//                 const evenNumbers = response.Data.rd.filter(obj => !isOdd(obj.SrNo));

//                 // Setting states with the separated objects
//                 setOddNumberObjects(oddNumbers);
//                 setEvenNumberObjects(evenNumbers);
//             }
//         }).catch((err) => console.log(err))
//     }, [])

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

//     const compressAndEncode = (inputString) => {
//         try {
//             const uint8Array = new TextEncoder().encode(inputString);
//             const compressed = pako.deflate(uint8Array, { to: 'string' });
//             return btoa(String.fromCharCode.apply(null, compressed));
//         } catch (error) {
//             console.error('Error compressing and encoding:', error);
//             return null;
//         }
//     };

//     const handleNavigation = (designNo, autoCode, titleLine) => {
//         const storeInit = JSON.parse(sessionStorage.getItem('storeInit')) ?? "";
//         const { IsB2BWebsite } = storeInit;

//         let obj = {
//             a: autoCode,
//             b: designNo,
//             m: loginUserDetail?.MetalId,
//             d: loginUserDetail?.cmboDiaQCid,
//             c: loginUserDetail?.cmboCSQCid,
//             f: {}
//         }
//         let encodeObj = compressAndEncode(JSON.stringify(obj))

//         // if(IsB2BWebsite === 1){
//         //     navigation(`/productdetail/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
//         // }else{
//         navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
//         // }
//     }

//     const decodeEntities = (html) => {
//         var txt = document.createElement("textarea");
//         txt.innerHTML = html;
//         return txt.value;
//     }




//     const handleMouseEnterRing1 = (data) => {
//         if (data?.ImageCount > 1) {
//             setRing1ImageChange(true)
//         }
//     }
//     const handleMouseLeaveRing1 = () => {
//         setRing1ImageChange(false)
//     }

//     const handleMouseEnterRing2 = (data) => {
//         if (data?.ImageCount > 1) {
//             setRing1ImageChangeOdd(true)
//         }
//     }
//     const handleMouseLeaveRing2 = () => {
//         setRing1ImageChangeOdd(false)
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

//     console.log('nnnnnnnnnnnnn', trandingViewData?.length);


//     return (
//         <div>
//             {trandingViewData?.length != 0 &&
//                 <div className='stam_trendingViewTopMain'>
//                     <div className='stam_trendingViewTopMain_div'>
//                         <div className='stam_trendingViewTopMain_Imgdiv'>
//                             <img src={`${storImagePath()}/images/HomePage/TrendingViewBanner/TrendingViewImg.jpg`} className='linkingLoveImageDesign' />
//                         </div>
//                         <div className='stam_trendingViewTopMain_Sliderdiv'>
//                             <p className='linkingTitle'>Trending View</p>
//                             <Slider {...settings} >
//                                 {
//                                     oddNumberObjects?.slice(0, 2).map((data, inedx) => (
//                                         evenNumberObjects?.slice(0, 2).map((data, inedxn) => (
//                                             <div className='linkRingLove'>
//                                                 <div>
//                                                     <div className='linkLoveRing1' onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
//                                                         <img src={ring1ImageChange ?
//                                                             `${imageUrl}${data.designno === undefined ? '' : data?.designno}_2.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
//                                                             :
//                                                             `${imageUrl}${data.designno === undefined ? '' : data?.designno}_1.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
//                                                         } className='likingLoveImages'
//                                                             onMouseEnter={() => handleMouseEnterRing1(data)} onMouseLeave={handleMouseLeaveRing1}
//                                                         />
//                                                     </div>
//                                                     <div className='linkLoveRing1Desc'>
//                                                         <p className='ring1Desc'>{data?.TitleLine}</p>
//                                                         <p className='ring1Desc'>
//                                                             <span
//                                                                 className="stam_currencyFont"
//                                                                 dangerouslySetInnerHTML={{
//                                                                     __html: decodeEntities(
//                                                                         storeInit?.Currencysymbol
//                                                                     ),
//                                                                 }}
//                                                             /> {(data?.UnitCost)?.toFixed(2)}</p>
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <div className='linkLoveRing1' onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
//                                                         <img src={ring1ImageChangeOdd ?
//                                                             `${imageUrl}${data.designno === undefined ? '' : data?.designno}_2.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
//                                                             :
//                                                             `${imageUrl}${data.designno === undefined ? '' : data?.designno}_1.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
//                                                         } className='likingLoveImages'

//                                                             onMouseEnter={() => handleMouseEnterRing2(data)} onMouseLeave={handleMouseLeaveRing2}
//                                                         />
//                                                     </div>
//                                                     <div className='linkLoveRing1Desc'>
//                                                         <p className='ring1Desc'>{data?.TitleLine}</p>
//                                                         <p className='ring1Desc'><span
//                                                             className="stam_currencyFont"
//                                                             dangerouslySetInnerHTML={{
//                                                                 __html: decodeEntities(
//                                                                     storeInit?.Currencysymbol
//                                                                 ),
//                                                             }}
//                                                         /> {(data?.UnitCost)?.toFixed(2)}</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     ))
//                                 }
//                             </Slider>
//                             <p className='stam_TrendingViewAll' onClick={() => navigation(`/p/Trending/?T=${btoa('Trending')}`)}>SHOP COLLECTION</p>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </div>
//     )
// }

// export default TrendingView
