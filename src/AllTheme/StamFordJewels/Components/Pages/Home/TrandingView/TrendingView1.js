import React, { useCallback, useEffect, useRef, useState } from 'react'
import './TrendingView1.scss';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { formatRedirectTitleLine, formatter, formatTitleLine, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { stam_loginState } from '../../../Recoil/atom';
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
    const islogin = useRecoilValue(stam_loginState);
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
    }, [islogin]);

    useEffect(() => {
        const getValidImages = async () => {
            if (!trendingData?.length) return;

            const imagePromises = trendingData.map(async (trend) => {
                // const imgSrc = `${storeInit?.CDNDesignImageFol}${trend?.designno}~1.${trend?.ImageExtension}`
                const imgSrc = `${storeInit?.CDNDesignImageFolThumb}${trend?.designno}~1.jpg`
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
        let encodeObj = compressAndEncode(JSON.stringify(obj));
        sessionStorage.setItem('scrollToProduct2', `product-${index}`);
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
            <div className='stam_mainTrending1Div' onContextMenu={(e) => e.preventDefault()}>
                <div className="stam_trendingProduct-grid">
                    <div className='stam_leftSideBestTR'>
                        {/* <img src={`${storImagePath()}/images/HomePage/TrendingViewBanner/trendingBanner.png`} loading="lazy" */}
                        <img
                            src={`${storImagePath()}/Banner/trendingBanner.png`} // Fallback image
                            srcSet={`
                                    ${storImagePath()}/Banner/trending-image-400.webp 400w,
                                    ${storImagePath()}/Banner/trending-image-800.webp 800w,
                                    ${storImagePath()}/Banner/trending-image-1200.webp 1200w
                                `}
                            sizes={`
                                    (max-width: 480px) 100vw,
                                    (max-width: 1024px) 90vw,
                                    (max-width: 1500px) 80vw,
                                    70vw
                                `}
                            draggable={true}
                            onContextMenu={(e) => e.preventDefault()}
                            alt="Trending Jewellery Collection Banner"
                            style={{
                                width: '100%',
                                objectFit: 'contain',
                            }}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
            {isLoading ? <Skeleton
                variant="rectangular"
                width="100%"
                height="630px"
                animation="wave"
                sx={{
                    '@media (max-width: 1650px)': {
                        height: "590px !important",
                    },
                    '@media (max-width: 1450px)': {
                        height: "550px !important",
                    },
                    '@media (max-width: 1400px)': {
                        height: "500px !important",
                    },
                    '@media (max-width: 1200px)': {
                        height: "515px !important",
                    },
                    '@media (max-width: 1000px)': {
                        height: "430px !important",
                    },
                    '@media (max-width: 400px)': {
                        height: "600px !important",
                    },
                }}
            /> :
                <div className="stam_trendSet_Main">
                    <div className='stam_trending1TitleDiv'>
                        <span className='stam_trending1Title' id='stam_Trending'>TRENDING ON SONASONS</span>
                        <p className='stam_trending1Title_para'>Discover the latest in luxury with our trending jewellery, elegance that sets the style.</p>
                    </div>

                    <div className="stam_trend_main_sub"
                        style={{
                            width: GenerateWidthBaseOnContent().width,
                        }}
                    >
                        <Swiper
                            style={{
                                width: "100%"
                            }}
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            spaceBetween={15}
                            breakpoints={{
                                1200: {
                                    slidesPerView: 5,
                                    spaceBetween: 10
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 5
                                },
                                500: {
                                    slidesPerView: 3,
                                    spaceBetween: 5
                                },
                                400: {
                                    slidesPerView: 2,
                                    spaceBetween: 5
                                },
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 5
                                },
                            }}
                            className='stam_trend_main_swiper'
                        >

                            {validImages?.map((item, index) => {
                                return (
                                    <SwiperSlide
                                        style={{
                                            width: '100%'
                                        }}
                                        key={index}>
                                        <div className="stam_trend__image_div" >
                                            <img
                                                className="stam_trendImg"
                                                loading="lazy"
                                                src={item?.src}
                                                id={`product-${index}`}
                                                ref={(el) => (productRefs.current[`product-${index}`] = el)}
                                                alt={item?.name}
                                                onError={(e) => e.target.src = imageNotFound}
                                                onClick={() => handleNavigate(item?.designno, item?.autocode, item?.TitleLine, index)}
                                                aria-label={`View details of ${item?.name}`}
                                                draggable={true}
                                                onContextMenu={(e) => e.preventDefault()}
                                            />
                                            <p className="stam_trend_Div_name">{item?.name}</p>
                                            <div className="product-info">
                                                <h3>{item?.designno !== "" && item?.designno} {formatTitleLine(item?.TitleLine) && " - " + item?.TitleLine}</h3>
                                                <div className='prod_info_data'>
                                                    {storeInit?.IsGrossWeight == 1 &&
                                                        <>
                                                            <span className='stam_btdetailDT'>GWT: </span>
                                                            <span className='stam_btdetailDT'>{(item?.Gwt || 0)?.toFixed(3)}</span>
                                                        </>
                                                    }
                                                    {Number(item?.Nwt) !== 0 && (
                                                        <>
                                                            <span className='stam_btpipe'>|</span>
                                                            <span className='stam_btdetailDT'>NWT : </span>
                                                            <span className='stam_btdetailDT'>{(item?.Nwt || 0)?.toFixed(3)}</span>
                                                        </>
                                                    )}
                                                    {storeInit?.IsDiamondWeight == 1 &&
                                                        <>
                                                            {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                                                                <>
                                                                    <span className='stam_btpipe'>|</span>
                                                                    <span className='stam_btdetailDT'>DWT: </span>
                                                                    <span className='stam_btdetailDT'>{(item?.Dwt || 0)?.toFixed(3)}/{(item?.Dpcs || 0)}</span>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                    {storeInit?.IsStoneWeight == 1 &&
                                                        <>
                                                            {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                                                                <>
                                                                    <span className='stam_btpipe'>|</span>
                                                                    <span className='stam_btdetailDT'>CWT: </span>
                                                                    <span className='stam_btdetailDT'>{(item?.CSwt || 0)?.toFixed(3)}/{(item?.CSpcs || 0)}</span>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                                {storeInit?.IsPriceShow == 1 && <p>
                                                    <span className="stam_currencyFont">
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
                                    }} aria-label="View more trending products"
                                        className='btn_more_A' onClick={() => HandleTrendingMore()}>View More</button>
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
