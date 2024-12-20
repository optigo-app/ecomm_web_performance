import React, { useCallback, useEffect, useState } from 'react'
import './TrendingView1.scss';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { mala_loginState } from '../../../Recoil/atom';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Pako from 'pako';

const TrendingView1 = () => {

    const trandingViewData = [
        '/images/HomePage/TrendingViewBanner/tranding1.png',
        '/images/HomePage/TrendingViewBanner/tranding4.png',
        '/images/HomePage/TrendingViewBanner/tranding2.jpg',
        '/images/HomePage/TrendingViewBanner/tranding3.png',
    ];

    const [trendingData, setTrendingData] = useState([]);
    const navigation = useNavigate();
    const islogin = useRecoilValue(mala_loginState);
    const [isLoading, setIsLoading] = useState(false);
    const [storeInit, setStoreInit] = useState({});
    const [validImages, setValidImages] = useState([]);

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    useEffect(() => {
        setIsLoading(true);
        const storeInitData = JSON.parse(sessionStorage.getItem("storeInit"));
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));

        setStoreInit(storeInitData);

        const { IsB2BWebsite } = storeInitData;
        const visiterID = Cookies.get('visiterId');

        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }

        Get_Tren_BestS_NewAr_DesigSet_Album("GETTrending", finalID)
            .then((response) => {
                if (response?.Data?.rd) {
                    setTrendingData(response.Data.rd);
                } else {
                    console.log("No album data found", response);
                }
            })
            .catch((err) => {
                console.error("Error fetching album data:", err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [islogin]);

    const checkImageAvailability = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve(imageNotFound);
            img.src = url;
        });
    };
    useEffect(() => {
        const getValidImages = async () => {
            if (!trendingData?.length) return;

            const imagePromises = trendingData.map(async (trend) => {
                const imgSrc = `${storeInit?.CDNDesignImageFol}${trend?.designno}~1.${trend?.ImageExtension}`
                // const validImage = await checkImageAvailability(imgSrc);
                return { ...trend, src: imgSrc };
            });

            const images = await Promise.all(imagePromises);
            setValidImages(images);
        };

        getValidImages();
    }, [trendingData, storeInit, imageNotFound]);

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = Pako.deflate(uint8Array, { to: 'string' });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error('Error compressing and encoding:', error);
            return null;
        }
    };

    const handleNavigate = (designNo, autoCode, titleLine) => {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit')) ?? "";
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));

        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        navigation(`/d/${titleLine?.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
    };

    const HandleTrendingMore = (data) => {
        const url = `/p/Trending/?T=${btoa('Trending')}`;
        const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;
        sessionStorage.setItem('redirectURL', url)
        navigation(islogin !== 0 ? url : redirectUrl);
    };



    const GenerateWidthBaseOnContent = useCallback(() => {
        const length = trendingData && validImages?.length;
        let w;
        if (length === 1) {
            w = '100%';
        } else if (length === 2) {
            w = '100%';
        } else if (length === 3) {
            w = '100%';
        } else if (length > 3) {
            w = '100%';
        }
        return { width: w, length: length }
    }, [trendingData])


    if (trendingData?.length === 0) {
        return;
    }

    return (
        <>
            <div className='malakan_mainTrending1Div'>
                <div className='malakan_trending1TitleDiv'>
                    <span className='malakan_trending1Title'>Trending</span>
                </div>
                <div className="stam_trendingProduct-grid">
                    <div className='malakan_leftSideBestTR'>
                        <img src={`${storImagePath()}/images/HomePage/bg1.png`} alt="trendingBanner" />
                        {/* <img src={`${storImagePath()}/images/HomePage/trend.jpg`} alt="trendingBanner" /> */}
                    </div>
                    {/* <div className='malakan_rightSideTR'> */}

                    {/* {trandingViewData.slice(0, 4).map((imagePath, index) => (
                        <div key={index} className="product-card">
                            <div className='stam_btimageDiv'>
                                <img src={`${storImagePath()}${imagePath}`} alt={`trending-${index}`} />
                            </div>
                        </div>
                    ))} */}

                    {/* </div> */}
                </div>
            </div>
            <div className="malakan_trendSet_Main">
                {/* <p className="malakan_trend_title">Trending</p> */}

                <div className="malakan_trend_main_sub"
                    style={{
                        width: GenerateWidthBaseOnContent().width
                    }}
                >
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        navigation={trendingData?.length > 4}
                        // loop={true}
                        style={{
                            width: '100%'
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 20
                            },
                            500: {
                                slidesPerView: 3,
                                spaceBetween: 20
                            },
                            400: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                        }}
                        className='malakan_trend_main_swiper'
                    >

                        {validImages?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="malakan_trend__image_div" >
                                        <img
                                            className="malakan_trendImg"
                                            loading="lazy"
                                            src={item?.src}
                                            alt={item?.name}
                                            onError={(e) => {
                                                e.target.src = imageNotFound
                                            }}
                                            onClick={() => handleNavigate(item?.designno, item?.autocode, item?.TitleLine)}
                                        />
                                        <p className="malakan_trend_Div_name">{item?.name}</p>
                                        <div className="product-info">
                                            <h3>{item?.designno} {item?.TitleLine && " - "} {item?.TitleLine != "" && item?.TitleLine}</h3>
                                            {storeInit?.IsGrossWeight == 1 &&
                                                <>
                                                    <span className='malakan_btdetailDT'>GWT: </span>
                                                    <span className='malakan_btdetailDT'>{(item?.Gwt || 0)?.toFixed(3)}</span>
                                                </>
                                            }
                                            {Number(item?.Nwt) !== 0 && (
                                                <>
                                                    <span className='malakan_btpipe'>|</span>
                                                    <span className='malakan_btdetailDT'>NWT : </span>
                                                    <span className='malakan_btdetailDT'>{(item?.Nwt || 0)?.toFixed(3)}</span>
                                                </>
                                            )}
                                            {storeInit?.IsDiamondWeight == 1 &&
                                                <>
                                                    {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                                                        <>
                                                            <span className='malakan_btpipe'>|</span>
                                                            <span className='malakan_btdetailDT'>DWT: </span>
                                                            <span className='malakan_btdetailDT'>{(item?.Dwt || 0)?.toFixed(3)}/{(item?.Dpcs || 0)}</span>
                                                        </>
                                                    }
                                                </>
                                            }
                                            {storeInit?.IsStoneWeight == 1 &&
                                                <>
                                                    {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                                                        <>
                                                            <span className='malakan_btpipe'>|</span>
                                                            <span className='malakan_btdetailDT'>CWT: </span>
                                                            <span className='malakan_btdetailDT'>{(item?.CSwt || 0)?.toFixed(3)}/{(item?.CSpcs || 0)}</span>
                                                        </>
                                                    }
                                                </>
                                            }
                                            <p>
                                                <span className="malakan_currencyFont">
                                                    {islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode}
                                                </span>&nbsp;
                                                <span>{formatter(item?.UnitCostWithMarkUp)}</span></p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                        {validImages?.length > 8 && <SwiperSlide key="slide-1" className="swiper-slide-custom" style={{
                            width: "25%",
                            height: "auto",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <div className="data_album">
                                <button style={{
                                    border: "none",
                                    backgroundColor: "transparent",
                                    fontWeight: "500",
                                    textDecoration: "underline",
                                    color: "grey"
                                }} className='btn_more_A' onClick={() => HandleTrendingMore()}>View More</button>
                            </div>
                        </SwiperSlide>}
                    </Swiper>
                </div>
            </div >
        </>
    );
};

export default TrendingView1;
