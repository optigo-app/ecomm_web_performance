import React, { useEffect, useRef, useState } from 'react'
import './TrendingView1.scss';
import imageNotFound from "../../../Assets/image-not-found.jpg"
import { formatRedirectTitleLine, formatter, formatTitleLine, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { useNavigate } from 'react-router-dom';
import pako from "pako";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { homeLoading, loginState, lov_loginState, smr_loginState } from '../../../Recoil/atom';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';




const TrendingView1 = ({data}) => {
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
    const islogin = useRecoilValue(lov_loginState);
    const [hoveredItem, setHoveredItem] = useState(null);
    const setLoadingHome = useSetRecoilState(homeLoading);
    const [validatedData, setValidatedData] = useState([]);

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
        setImageUrl(data?.CDNDesignImageFol);
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (storeInit?.IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }


        Get_Tren_BestS_NewAr_DesigSet_Album("GETTrending", finalID).then((response) => {
            setLoadingHome(false);
            if (response?.Data?.rd) {
                setTrandingViewData(response?.Data?.rd);
                const oddNumbers = response.Data.rd.filter(obj => isOdd(obj.SrNo));
                const evenNumbers = response.Data.rd.filter(obj => !isOdd(obj.SrNo));

                setOddNumberObjects(oddNumbers);
                setEvenNumberObjects(evenNumbers);
            }
        }).catch((err) => console.log(err))

    }

    const ProdCardImageFunc = (pd) => {
        let finalprodListimg;
        if (pd?.ImageCount > 0) {
            finalprodListimg = imageUrl + pd?.designno + "~" + 1 + "." + pd?.ImageExtension
        }
        else {
            finalprodListimg = imageNotFound;
        }
        return finalprodListimg
    }

    const checkImageAvailability = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve(imageNotFound);
            img.src = url;
        });
    };

    const validateImageURLs = async () => {
        if (!trandingViewData?.length) return;
        const validatedData = await Promise.all(
            trandingViewData.map(async (item) => {
                const imageURL = `${imageUrl}${item?.designno}~1.${item?.ImageExtension}`;
                // const validatedURL = await checkImageAvailability(imageURL);
                // return { ...item, validatedImageURL: validatedURL };
                return { ...item, validatedImageURL: imageURL };
            })
        );
        setValidatedData(validatedData);
    };

    useEffect(() => {
        validateImageURLs();
    }, [trandingViewData]);


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
        // navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`);
        navigation(`/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`);

    }

    const chunkedData = [];
    for (let i = 0; i < validatedData?.length; i += 3) {
        chunkedData.push(validatedData?.slice(i, i + 3));
    }

    return (
        <div ref={trendingRef}>
            {validatedData?.length != 0 &&
                <div className='smr_mainTrending1Div' >
                    <div className='smr1_trending1TitleDiv'>
                        <span className='smr_trending1Title'>TRENDING</span>
                    </div>
                    <div className="smr_trendingProduct-grid">
                        <div className='smr_leftSideBestTR'>
                            {/* <img src="https://pipeline-theme-fashion.myshopify.com/cdn/shop/files/web-210128-BW-PF21_S219259.jpg?v=1646112530&width=2000" alt="modalimages" /> */}
                            {/* <img src={`${storImagePath()}/images/HomePage/TrendingViewBanner/TrendingViewImgHom2.png`} alt="modalimages" /> */}
                            <img src={data?.image[0]}  alt="modalimages" />

                            <div className="smr_lookbookImageRightDT">
                                {/* <p>SHORESIDE COLLECTION</p>
                                <h2>FOR LOVE OF SUN & SEA</h2> */}
                                <button onClick={() => navigation(`/p/Trending/?T=${btoa('Trending')}`)}>SHOP COLLECTION</button>
                            </div>
                        </div>
                        <div className='smr_rightSideTR'>
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
                                            onError={(e) => {
                                                e.target.src = imageNotFound
                                            }}
                                            alt={data.name}
                                        />
                                    </div>
                                    <div className="product-info">
                                        <h3>{data?.designno} {formatTitleLine(data?.TitleLine) && " - "} {formatTitleLine(data?.TitleLine) && data?.TitleLine}</h3>
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
                                    {storeInit?.IsPriceShow == 1 &&     <p>
                                            <span className="smr_currencyFont">
                                                {islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode}
                                            </span>&nbsp;
                                            <span>{formatter(data?.UnitCostWithMarkUp)}</span></p>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default TrendingView1;
