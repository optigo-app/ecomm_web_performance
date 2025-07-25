import React, { useCallback, useEffect, useRef, useState } from 'react'
import './TrendingView1.scss';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { formatRedirectTitleLine, formatter, formatTitleLine, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { mala_loginState } from '../../../Recoil/atom';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Pako from 'pako';
import { Skeleton } from '@mui/material';

const TrendingView1 = ({ data }) => {

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
    const productRefs = useRef({});

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
    }, []);

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
                // const imgSrc = `${storeInit?.CDNDesignImageFol}${trend?.designno}~1.${trend?.ImageExtension}`
                const imgSrc = `${storeInit?.CDNDesignImageFolThumb}${trend?.designno}~1.jpg`
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

    const backgroundImageUrl = data?.image?.[0];

    const style = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',       // cover whole div
        backgroundPosition: 'center',  // center the image
        width: '100%',                 // adjust as needed
        height: '650px',               // or any height you want
    };

    const handleNavigate = (designNo, autoCode, titleLine, index) => {
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
        sessionStorage.setItem('scrollToProduct2', `product-${index}`);
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        // navigation(`/d/${titleLine?.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
        navigation(`/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`);
    };

    useEffect(() => {
        const scrollDataStr = sessionStorage.getItem('scrollToProduct2');
        if (!scrollDataStr) return;

        const maxRetries = 10;
        let retries = 0;

        const tryScroll = () => {
            const el = productRefs.current[scrollDataStr];
            if (el) {
                el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
                sessionStorage.removeItem('scrollToProduct2');
            } else if (retries < maxRetries) {
                retries++;
                setTimeout(tryScroll, 200); // retry until ref is ready
            }
        };

        tryScroll();

    }, [trendingData]);

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
                    <div className='malakan_leftSideBestTR' style={style}>
                        {/* privaa */}
                        {/* <img src={`${storImagePath()}/images/HomePage/bg1.jpg`} loading="lazy" alt="trendingBanner" /> */}
                        {/* <img src={`${storImagePath()}/images/HomePage/bg1.png`} loading="lazy" alt="trendingBanner" /> */}
                        {/* <img src={data?.image?.[0]} alt="trendingBanner" loading="lazy" /> */}
                    </div>
                    {/* <div className='malakan_rightSideTR'> */}

                    {/* {trandingViewData.slice(0, 4).map((imagePath, index) => (
                        <div key={index} className="product-card">
                            <div className='stam_btimageDiv'>
                                <img src={`${storImagePath()}${imagePath}`} loading="lazy" alt={`trending-${index}`} />
                            </div>
                        </div>
                    ))} */}

                    {/* </div> */}
                </div>
            </div>
            {isLoading ?
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="540px"
                    animation="wave"
                    sx={{
                        '@media (max-width: 1650px)': {
                            height: "475px !important",
                        },
                        '@media (max-width: 1200px)': {
                            height: "380px !important",
                        },
                        '@media (max-width: 1000px)': {
                            height: "330px !important",
                        },
                        '@media (max-width: 600px)': {
                            height: "340px !important",
                        }
                    }}
                />
                :
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
                                    spaceBetween: 10
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
                                    <SwiperSlide key={index} className='mala_trend_slider'>
                                        <div className="malakan_trend__image_div" >
                                            <img
                                                className="malakan_trendImg"
                                                loading="lazy"
                                                src={item?.src}
                                                id={`product-${index}`}
                                                ref={(el) => (productRefs.current[`product-${index}`] = el)}
                                                alt={`Trending-${index}`}
                                                onError={(e) => {
                                                    e.target.src = imageNotFound
                                                }}
                                                onClick={() => handleNavigate(item?.designno, item?.autocode, item?.TitleLine, index)}
                                            />
                                            <p className="malakan_trend_Div_name">{item?.name}</p>
                                            <div className="product-info">
                                                <h3>{item?.designno !== "" && item?.designno} {formatTitleLine(item?.TitleLine) && " - " + item?.TitleLine}</h3>
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
                                                {storeInit?.IsPriceShow == 1 && <p>
                                                    <span className="malakan_currencyFont">
                                                        {islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode}
                                                    </span>&nbsp;
                                                    <span>{formatter(item?.UnitCostWithMarkUp)}</span></p>}
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
            }
        </>
    );
};

export default TrendingView1;
