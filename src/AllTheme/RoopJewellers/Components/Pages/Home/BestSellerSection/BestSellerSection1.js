import React, { useCallback, useEffect, useState } from 'react'
import './BestSellerSection1.scss';
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { Link, useNavigate } from 'react-router-dom';
import Pako from 'pako';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import imageNotFound from "../../../Assets/image-not-found.jpg"
import { roop_loginState } from '../../../Recoil/atom';


const ProductGrid = () => {
    const [imageUrl, setImageUrl] = useState();
    const [bestSellerData, setBestSellerData] = useState('')
    const [storeInit, setStoreInit] = useState({});

    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const islogin = useRecoilValue(roop_loginState);
    const [hoveredItem, setHoveredItem] = useState(null);



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

        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        // setImageUrl(data?.DesignImageFol);
        setImageUrl(data?.CDNDesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller", finalID).then((response) => {
            if (response?.Data?.rd) {
                setBestSellerData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])



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
                // const validatedURL = await checkImageAvailability(imageURL);
                return { ...item, validatedImageURL: imageURL };
            })
        );
        setValidatedData(validatedData);
    };

    useEffect(() => {
        validateImageURLs();
    }, [bestSellerData]);

    const handleNavigation = (designNo, autoCode, titleLine) => {
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

    const handleMouseEnterRing1 = (data) => {
        if (data?.ImageCount > 1) {
            setHoveredItem(data.SrNo);
        }
    }
    const handleMouseLeaveRing1 = () => {
        setHoveredItem(null);
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const HandleBestsellerMore = (data) => {
        const url = `/p/BestSeller/?B=${btoa('BestSeller')}`;
        const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;
        sessionStorage.setItem('redirectURL', url)
        navigation(islogin !== 0 ? url : redirectUrl);
    };


    const GenerateWidthBaseOnContent = useCallback(() => {
        const length = bestSellerData && validatedData?.length;
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
    }, [bestSellerData])


    if (bestSellerData?.length === 0) {
        return;
    }

    return (
        <>
            {bestSellerData?.length != 0 &&
                <div className='roop_mainBestSeler1Div'>
                    <div className='roop_bestseler1TitleDiv'>
                        <span className='roop_bestseler1Title'>Best Seller</span>
                    </div>
                    <div className="roop_bestSellerSet_Main">

                        <div className="roop_bestSeller_main_sub"
                            style={{
                                width: GenerateWidthBaseOnContent().width,
                            }}
                        >
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={30}
                                navigation={bestSellerData?.length > 4}
                                style={{
                                    width: "100%"
                                }}
                                // loop={true}
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
                                className='roop_bestseller_main_swiper'
                            >

                                {validatedData?.map((data, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="roop_bestSeller__image_div"
                                            role="link"
                                            aria-label={`View details for ${data?.TitleLine} - Design No: ${data?.designno}`}

                                            onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
                                            <img
                                                className="roop_bestSellerImg"
                                                loading="lazy"
                                                src={data?.ImageCount >= 1 ?
                                                    data?.validatedImageURL
                                                    // `${imageUrl}${data.designno === undefined ? '' : data?.designno}_1.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
                                                    :
                                                    imageNotFound
                                                }
                                                onError={(e) => e.target.src = imageNotFound}
                                                alt={`Best Seller Jewellery: ${data?.TitleLine || 'Design No: ' + data?.designno}`}
                                            />
                                            <div className="product-info">
                                                <h3>{data?.designno} {data?.TitleLine && " - "} {data?.TitleLine != "" && data?.TitleLine}</h3>
                                                {storeInit?.IsGrossWeight == 1 &&
                                                    <>
                                                        <span className='roop_btdetailDT'>GWT: </span>
                                                        <span className='roop_btdetailDT'>{(data?.Gwt || 0)?.toFixed(3)}</span>
                                                    </>
                                                }
                                                {Number(data?.Nwt) !== 0 && (
                                                    <>
                                                        <span className='roop_btpipe'>|</span>
                                                        <span className='roop_btdetailDT'>NWT : </span>
                                                        <span className='roop_btdetailDT'>{(data?.Nwt || 0)?.toFixed(3)}</span>
                                                    </>
                                                )}
                                                {storeInit?.IsDiamondWeight == 1 &&
                                                    <>
                                                        {(data?.Dwt != "0" || data?.Dpcs != "0") &&
                                                            <>
                                                                <span className='roop_btpipe'>|</span>
                                                                <span className='roop_btdetailDT'>DWT: </span>
                                                                <span className='roop_btdetailDT'>{(data?.Dwt || 0)?.toFixed(3)}/{(data?.Dpcs || 0)}</span>
                                                            </>
                                                        }
                                                    </>
                                                }
                                                {storeInit?.IsStoneWeight == 1 &&
                                                    <>
                                                        {(data?.CSwt != "0" || data?.CSpcs != "0") &&
                                                            <>
                                                                <span className='roop_btpipe'>|</span>
                                                                <span className='roop_btdetailDT'>CWT: </span>
                                                                <span className='roop_btdetailDT'>{(data?.CSwt || 0)?.toFixed(3)}/{(data?.CSpcs || 0)}</span>
                                                            </>
                                                        }
                                                    </>
                                                }
                                                <p>
                                                    <span className="roop_currencyFont">
                                                        {islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode}
                                                    </span>&nbsp;
                                                    <span>{formatter(data?.UnitCostWithMarkUp)}</span></p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                {validatedData?.length > 8 && <SwiperSlide key="slide-1" className="swiper-slide-custom" style={{
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
                                        }} className='btn_more_A' aria-label="View more best sellers"
                                            onClick={() => HandleBestsellerMore()}>View More</button>
                                    </div>
                                </SwiperSlide>}
                            </Swiper>
                        </div>
                    </div >
                    {/* <div className="product-grid">
                        <div className='roop_leftSideBestSeler'>
                            {validatedData?.slice(0, 4).map((data, index) => (
                                <div key={index} className="product-card">
                                    <div className='roop_btimageDiv' onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
                                        <img
                                            src={data?.ImageCount >= 1 ?
                                                data?.validatedImageURL
                                                // `${imageUrl}${data.designno === undefined ? '' : data?.designno}_1.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
                                                :
                                                imageNotFound
                                            }
                                            alt={data.name}
                                        />
                                    </div>
                                    <div className="product-info">
                                        <h3>{data?.TitleLine != "" && data?.TitleLine + " - "}{data?.designno}</h3>
                                        {storeInit?.IsGrossWeight == 1 &&
                                            <>
                                                <span className='roop_btdetailDT'>GWT: </span>
                                                <span className='roop_btdetailDT'>{(data?.Gwt || 0)?.toFixed(3)}</span>
                                            </>
                                        }
                                        {Number(data?.Nwt) !== 0 && (
                                            <>
                                                <span className='roop_btpipe'>|</span>
                                                <span className='roop_btdetailDT'>NWT : </span>
                                                <span className='roop_btdetailDT'>{(data?.Nwt || 0)?.toFixed(3)}</span>
                                            </>
                                        )}
                                        {storeInit?.IsDiamondWeight == 1 &&
                                            <>
                                                {(data?.Dwt != "0" || data?.Dpcs != "0") &&
                                                    <>
                                                        <span className='roop_btpipe'>|</span>
                                                        <span className='roop_btdetailDT'>DWT: </span>
                                                        <span className='roop_btdetailDT'>{(data?.Dwt || 0)?.toFixed(3)}/{(data?.Dpcs || 0)}</span>
                                                    </>
                                                }
                                            </>
                                        }
                                        {storeInit?.IsStoneWeight == 1 &&
                                            <>
                                                {(data?.CSwt != "0" || data?.CSpcs != "0") &&
                                                    <>
                                                        <span className='roop_btpipe'>|</span>
                                                        <span className='roop_btdetailDT'>CWT: </span>
                                                        <span className='roop_btdetailDT'>{(data?.CSwt || 0)?.toFixed(3)}/{(data?.CSpcs || 0)}</span>
                                                    </>
                                                }
                                            </>
                                        }
                                        <p>
                                            <span className="roop_currencyFont">
                                                {islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode}
                                            </span>&nbsp;
                                            <span>{formatter(data?.UnitCostWithMarkUp)}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div >
            }
        </>
    );
};

export default ProductGrid;