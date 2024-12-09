import React, { useEffect, useRef, useState } from 'react'
import './TrendingView1.scss';
import imageNotFound from "../../../Assets/image-not-found.jpg"
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { useNavigate } from 'react-router-dom';
import pako from "pako";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { dt_homeLoading, dt_loginState } from '../../../Recoil/atom';
import GoogleAnalytics from 'react-ga4';



const TrendingView1 = () => {
    const trendingRef = useRef(null);
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
    const islogin = useRecoilValue(dt_loginState);
    const [hoveredItem, setHoveredItem] = useState(null);
    const setLoadingHome = useSetRecoilState(dt_homeLoading);
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
        setLoadingHome(true);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callAPI();
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.5,
            }
        );

        if (trendingRef.current) {
            observer.observe(trendingRef.current);
        }
        return () => {
            if (trendingRef.current) {
                observer.unobserve(trendingRef.current);
            }
        };

    }, [])

    const callAPI = () => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)
        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        // setImageUrl(data?.DesignImageFol);
        setImageUrl(data?.CDNDesignImageFol);
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const IsB2BWebsite = storeInit?.IsB2BWebsite;
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
                setLoadingHome(false);
                const oddNumbers = response.Data.rd.filter(obj => isOdd(obj.SrNo));
                const evenNumbers = response.Data.rd.filter(obj => !isOdd(obj.SrNo));

                // Setting states with the separated objects
                setOddNumberObjects(oddNumbers);
                setEvenNumberObjects(evenNumbers);
            }
        }).catch((err) => console.log(err))
    }

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
        GoogleAnalytics.event({
            action: "Navigate to Product Detail",
            category: `Product Interaction Through Trending Section`,
            label: designNo || titleLine ,
            value: loginUserDetail?.firstname ?? 'User Not Login',
          });
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const chunkedData = [];
    for (let i = 0; i < trandingViewData?.length; i += 3) {
        chunkedData.push(trandingViewData?.slice(i, i + 3));
    }

    return (
        <div ref={trendingRef}>
            {trandingViewData?.length != 0 &&
                <div className='dt_mainTrending1Div'>
                    <div className='smr_trending1TitleDiv'>
                        <span className='smr_trending1Title'>Trending</span>
                    </div>
                    <div className="smr_trendingProduct-grid">
                        <div className='smr_leftSideBestTR'>
                            {/* <img src="https://pipeline-theme-fashion.myshopify.com/cdn/shop/files/web-210128-BW-PF21_S219259.jpg?v=1646112530&width=2000" alt="modalimages" /> */}
                            <img src={`${storImagePath()}/images/HomePage/Banner/trending.webp`} alt="modalimages" />

                            <div className="smr_lookbookImageRightDT">
                                <p>SHORESIDE COLLECTION</p>
                                <h2>FOR LOVE OF SUN & SEA</h2>
                                <button onClick={() => navigation(`/p/Trending/?T=${btoa('Trending')}`)}>SHOP COLLECTION</button>
                            </div>
                        </div>
                        <div className='smr_rightSideTR'>
                            {trandingViewData?.slice(0, 4).map((data, index) => (
                                <div key={index} className="product-card">
                                    <div className='smr_btimageDiv' onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
                                        <img
                                            src={data?.ImageCount >= 1 ?
                                                `${imageUrl}${data.designno === undefined ? '' : data?.designno}~1.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
                                                :
                                                imageNotFound
                                            }
                                            alt={data.name}
                                            onError={(e)=>{
                                                e.target.src = imageNotFound ;
                                              }}
                                        />
                                    </div>
                                    <div className="trending_ifno_web_product_info">
                                        <h3>{data?.TitleLine != "" && data?.TitleLine}</h3>
                                        {/* {storeInit?.IsGrossWeight == 1 &&
                                            <>
                                                <span className='smr_btdetailDT'>GWT: </span>
                                                <span className='smr_btdetailDT'>{(data?.Gwt || 0)?.toFixed(3)}</span>
                                            </>
                                        }
                                        {Number(data?.Nwt) !== 0 && (
                                            <>
                                                <span className='smr_btpipe'>|</span>
                                                <span className='smr_btdetailDT'>NWT : </span>
                                                <span className='smr_btdetailDT'>{(data?.Nwt || 0)?.toFixed(3)}</span>
                                            </>
                                        )}
                                        {storeInit?.IsDiamondWeight == 1 &&
                                            <>
                                                {(data?.Dwt != "0" || data?.Dpcs != "0") &&
                                                    <>
                                                        <span className='smr_btpipe'>|</span>
                                                        <span className='smr_btdetailDT'>DWT: </span>
                                                        <span className='smr_btdetailDT'>{(data?.Dwt || 0)?.toFixed(3)}/{(data?.Dpcs || 0)}</span>
                                                    </>
                                                }
                                            </>
                                        }
                                        {storeInit?.IsStoneWeight == 1 &&
                                            <>
                                                {(data?.CSwt != "0" || data?.CSpcs != "0") &&
                                                    <>
                                                        <span className='smr_btpipe'>|</span>
                                                        <span className='smr_btdetailDT'>CWT: </span>
                                                        <span className='smr_btdetailDT'>{(data?.CSwt || 0)?.toFixed(3)}/{(data?.CSpcs || 0)}</span>
                                                    </>
                                                }
                                            </>
                                        } */}
                                        <p>
                                            <span
                                                className="smr_currencyFont"
                                                dangerouslySetInnerHTML={{
                                                    __html: decodeEntities(
                                                        islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                                    ),
                                                }}
                                            /> {formatter(data?.UnitCostWithMarkUp)}
                                        </p>
                                    </div>

                                    <div className="trending_ifno_mobile_product_info">
                                        <h3>{data?.designno}</h3>
                                        {/* {(storeInit?.IsGrossWeight == 1 || Number(data?.Nwt) !== 0) &&
                                            <div className='dt_bestS_mobile_singleView_main'>
                                                <div className='dt_bestS_mobile_singleView'>
                                                    {storeInit?.IsGrossWeight == 1 &&
                                                        <>
                                                            <span className='smr_btdetailDT'>GWT: </span>
                                                            <span className='smr_btdetailDT'>{(data?.Gwt || 0)?.toFixed(3)}</span>
                                                        </>
                                                    }
                                                </div>
                                                <div className='dt_bestS_mobile_singleView'>
                                                    {Number(data?.Nwt) !== 0 && (
                                                        <>
                                                            <span className='smr_btdetailDT'>NWT : </span>
                                                            <span className='smr_btdetailDT'>{(data?.Nwt || 0)?.toFixed(3)}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        }
                                        {(storeInit?.IsDiamondWeight == 1) || (storeInit?.IsStoneWeight == 1) &&
                                            <div className='dt_bestS_mobile_singleView_main'>
                                                <div className='dt_bestS_mobile_singleView'>
                                                    {storeInit?.IsDiamondWeight == 1 &&
                                                        <>
                                                            {(data?.Dwt != "0" || data?.Dpcs != "0") &&
                                                                <>
                                                                    <span className='smr_btdetailDT'>DWT: </span>
                                                                    <span className='smr_btdetailDT'>{(data?.Dwt || 0)?.toFixed(3)}/{(data?.Dpcs || 0)}</span>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                                <div className='dt_bestS_mobile_singleView'>
                                                    {storeInit?.IsStoneWeight == 1 &&
                                                        <>
                                                            {(data?.CSwt != "0" || data?.CSpcs != "0") &&
                                                                <>
                                                                    <span className='smr_btdetailDT'>CWT: </span>
                                                                    <span className='smr_btdetailDT'>{(data?.CSwt || 0)?.toFixed(3)}/{(data?.CSpcs || 0)}</span>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        } */}
                                        <p>
                                            <span
                                                className="smr_currencyFont"
                                                dangerouslySetInnerHTML={{
                                                    __html: decodeEntities(
                                                        islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                                    ),
                                                }}
                                            /> {formatter(data?.UnitCostWithMarkUp)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default TrendingView1;
