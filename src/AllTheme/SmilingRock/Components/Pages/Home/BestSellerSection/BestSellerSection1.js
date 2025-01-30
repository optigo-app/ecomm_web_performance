import React, { useEffect, useRef, useState } from 'react'
import './BestSellerSection1.scss';
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { useNavigate } from 'react-router-dom';
import Pako from 'pako';
import { homeLoading, loginState, smr_loginState } from '../../../Recoil/atom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import imageNotFound from "../../../Assets/image-not-found.jpg"

const ProductGrid = ({data}) => {

    const bestSallerRef = useRef(null);
    const [imageUrl, setImageUrl] = useState();
    const [bestSellerData, setBestSellerData] = useState('')
    const [storeInit, setStoreInit] = useState({});
    const [isLoding, setIsLoding] = useState(true);
    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const islogin = useRecoilValue(smr_loginState);
    const [hoveredItem, setHoveredItem] = useState(null);
    const setLoadingHome = useSetRecoilState(homeLoading);
    const [validatedData, setValidatedData] = useState([]);

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
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 if (entry.isIntersecting) {
    //                     callAllApi();
    //                     console.log("visble bestsaller")
    //                     observer.unobserve(entry.target);
    //                 }
    //             });
    //         },
    //         {
    //             root: null, 
    //             threshold: 0.5, 
    //         }
    //     );

    //     if (bestSallerRef.current) {
    //         observer.observe(bestSallerRef.current);
    //     }
    //     return () => {
    //         if (bestSallerRef.current) {
    //             observer.unobserve(bestSallerRef.current);
    //         }
    //     };


    //     // const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    //     // const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
    //     // const visiterID = Cookies.get('visiterId');
    //     // let finalID;
    //     // if (storeInit?.IsB2BWebsite == 0) {
    //     //     finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
    //     // } else {
    //     //     finalID = loginUserDetail?.id || '0';
    //     // }

    //     // let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    //     // setStoreInit(storeinit)

    //     // let data = JSON.parse(sessionStorage.getItem('storeInit'))
    //     // setImageUrl(data?.DesignImageFol);

    //     // Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller", finalID).then((response) => {
    //     //     if (response?.Data?.rd) {
    //     //         setBestSellerData(response?.Data?.rd);
    //     //     }
    //     // }).catch((err) => console.log(err))
    // }, [])

    const callAllApi = () => {
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (storeInit?.IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }

        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        setImageUrl(data?.CDNDesignImageFol);
        setLoadingHome(false);
        Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller", finalID).then((response) => {
            if (response?.Data?.rd) {
                setIsLoding(false);
                setBestSellerData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))

    }

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

    const chunkedData = [];
    for (let i = 0; i < bestSellerData?.length; i += 3) {
        chunkedData.push(bestSellerData?.slice(i, i + 3));
    }

    return (
        <div ref={bestSallerRef}>
            <div>
                {bestSellerData?.length != 0 &&
                    <div className='smr_mainBestSeler1Div' >
                        <div className='smr_bestseler1TitleDiv'>
                            <span className='smr_bestseler1Title'>BEST SELLER</span>
                        </div>
                        <div className="product-grid">
                            <div className='smr_leftSideBestSeler'>
                                {validatedData?.slice(0, 4).map((data, index) => (
                                    <motion.div
                                        key={index}
                                        className="product-card"
                                        initial={{ opacity: 0, y: 30 }} // Initial state before animation
                                        whileInView={{ opacity: 1, y: 0 }} // Final state after animation
                                        transition={{
                                            duration: 1, // Animation duration
                                            ease: 'easeInOut', // Animation easing function
                                            delay: index * 0.2, // Sequential delay (based on the index)
                                        }}
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <div className='smr_btimageDiv' onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
                                            <img
                                                src={data?.ImageCount >= 1 ?
                                                    data?.validatedImageURL
                                                    // `${imageUrl}${data.designno === undefined ? '' : data?.designno}~1.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
                                                    :
                                                    imageNotFound
                                                }
                                                alt={data.name}
                                                onError={(e) => {
                                                    e.target.src = imageNotFound;
                                                }}
                                            />
                                        </div>
                                        <div className="product-info">
                                            <h3>{data?.designno} {data?.TitleLine && " - "} {data?.TitleLine != "" && data?.TitleLine}</h3>
                                            {storeInit?.IsGrossWeight == 1 &&
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
                                            }
                                          {storeInit?.IsPriceShow == 1 &&  <p>
                                                <span className="smr_currencyFont">
                                                    {islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode}
                                                </span>&nbsp;
                                                <span>{formatter(data?.UnitCostWithMarkUp)}</span></p>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className='smr_rightSideBestSeler'>
                                {/* <img src="https://pipeline-theme-fashion.myshopify.com/cdn/shop/files/clothing-look-44.jpg?v=1638651514&width=4000" alt="modalimages" /> */}
                                {/* <img src={`${storImagePath()}/images/HomePage/BestSeller/promoSetMainBanner.png`} alt="modalimages" /> */}
                                <img src={data?.image[0]} alt="modalimages" />
                                <div className="smr_lookbookImageRightDT">
                                    {/*    not need for maiora  */}
                                    {/* <p>SHORESIDE COLLECTION</p>
                                    <h2>FOR LOVE OF SUN & SEA</h2> */}
                                    <button onClick={() => navigation(`/p/BestSeller/?B=${btoa('BestSeller')}`)}>SHOP COLLECTION</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductGrid;
