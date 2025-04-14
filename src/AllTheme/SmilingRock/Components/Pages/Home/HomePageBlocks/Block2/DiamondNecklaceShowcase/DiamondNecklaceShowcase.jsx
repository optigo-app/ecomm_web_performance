import { React, useState, useRef, useEffect } from 'react';
import './DiamondNecklaceShowcase.scss';
import { formatRedirectTitleLine, storImagePath } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Cookies from 'js-cookie';
import { Navigation } from 'swiper/modules';
import { Box, Grid, Typography, Button } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { homeLoading, smr_loginState } from '../../../../../Recoil/atom';
import imageNotFound from '../../../../../Assets/image-not-found.jpg';
import Pako from 'pako';

export default function DiamondNecklaceShowcase() {
    const [leftImageIndex, setLeftImageIndex] = useState(0);
    const [rightImageIndex, setRightImageIndex] = useState(1);
    const [imageUrl, setImageUrl] = useState();
    const islogin = useRecoilValue(smr_loginState);
    const trendingRef = useRef(null);
    const swiperRef = useRef(null);
    const navigation = useNavigate();

    // Fallback images
    const arrow1 = `${storImagePath()}/images/HomePage/demo-images/arrow1.svg`;
    const arrow2 = `${storImagePath()}/images/HomePage/demo-images/arrow2.svg`;

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [trandingViewData, setTrandingViewData] = useState([]);
    const [validatedData, setValidatedData] = useState([]);
    const [storeInit, setStoreInit] = useState({});
    const setLoadingHome = useSetRecoilState(homeLoading);

    // Function to safely get image URL with fallback
    const getImageUrl = (item) => {
        return item?.validatedImageURL || imageNotFound;
    };

    const callAPI = () => {
        setLoadingHome(true);
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit);

        let data = JSON.parse(sessionStorage.getItem('storeInit'));
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
                // Initialize rightImageIndex if we have data
                if (response?.Data?.rd.length > 1) {
                    setRightImageIndex(1);
                } else {
                    setRightImageIndex(0);
                }
            }
        }).catch((err) => {
            console.log(err);
            setLoadingHome(false);
        });
    };

    useEffect(() => {
        callAPI();
    }, []);

    const validateImageURLs = async () => {
        if (!trandingViewData?.length) return;
        const validatedData = await Promise.all(
            trandingViewData.map(async (item) => {
                const imageURL = `${imageUrl}${item?.designno}~1.${item?.ImageExtension}`;
                return { ...item, validatedImageURL: imageURL };
            })
        );
        setValidatedData(validatedData);
    };

    useEffect(() => {
        validateImageURLs();
    }, [trandingViewData, imageUrl]);

    // Handle left arrow click - only changes left image
    const handleLeftArrowClick = () => {
        if (validatedData.length > 0) {
            setLeftImageIndex((prevIndex) =>
                prevIndex === 0 ? validatedData.length - 1 : prevIndex - 1
            );
        }
    };

    // Handle right arrow click - only changes right image
    const handleRightArrowClick = () => {
        if (validatedData.length > 0) {
            setRightImageIndex((prevIndex) =>
                prevIndex + 1 >= validatedData.length ? 0 : prevIndex + 1
            );
        }
    };

    // Get current left image
    const getCurrentLeftImage = () => {
        if (validatedData.length === 0) return null;
        return validatedData[leftImageIndex];
    };

    // Get current right image
    const getCurrentRightImage = () => {
        if (validatedData.length === 0) return null;
        if (validatedData.length === 1) return validatedData[0]; // If only one image, use it for both sides
        return validatedData[rightImageIndex];
    };

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
        // navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
        navigation(`/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`);
    }

    return (
        <>
            <section className="diamond-showcase-section">
                <Box className="container-diamond">
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={50}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        loop={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="diamond_showcase_swiper"
                    >
                        {validatedData.length > 0 && (
                            <SwiperSlide>
                                <Grid className="diamond_showcase_grid">
                                    {/* Left Image */}
                                    <Grid item xs={12} md={4} className="image-container">
                                        <Box className="image-box">
                                            <img
                                                src={getImageUrl(getCurrentLeftImage())}
                                                alt={getCurrentLeftImage()?.designno || "Left side image"}
                                                className="image"
                                                onClick={() => handleNavigation(getCurrentLeftImage()?.designno, getCurrentLeftImage()?.autocode, getCurrentLeftImage()?.TitleLine)}
                                                onError={(e) => { e.target.src = imageNotFound; }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Center Content */}
                                    <Grid item xs={12} md={4} className="content-container">
                                        <Typography variant="h4" className="title" mb={3}>Jewelry Trends</Typography>
                                        <Typography variant="body1" mb={2} className="description">
                                        Shine Brighter, Shine Bolder – The Latest Jewelry Trends" suggests that the jewelry collection helps you stand out with bold, eye-catching designs while embracing the newest trends. It conveys confidence and modernity, encouraging customers to enhance their personal style with jewelry that shines both literally and figuratively.
                                        </Typography>
                                        <button variant="contained" onClick={() => navigation(`/p/Trending/?T=${btoa('Trending')}`)} className="explore-button">View More</button>
                                        <div className="arrow-buttons_div">
                                            <div className="arrow-buttons">
                                                <div
                                                    className="arrow-left"
                                                    aria-label="left arrow"
                                                    onClick={handleLeftArrowClick}
                                                >
                                                    <img src={arrow1} alt="Left Arrow" />
                                                </div>
                                                <div
                                                    className="arrow-right"
                                                    aria-label="right arrow"
                                                    onClick={handleRightArrowClick}
                                                >
                                                    <img src={arrow2} alt="Right Arrow" />
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>

                                    {/* Right Image */}
                                    <Grid item xs={12} md={4} className="image-container">
                                        <Box className="image-box">
                                            <img
                                                src={getImageUrl(getCurrentRightImage())}
                                                alt={getCurrentRightImage()?.designno || "Right side image"}
                                                onClick={() => handleNavigation(getCurrentRightImage()?.designno, getCurrentRightImage()?.autocode, getCurrentRightImage()?.TitleLine)}
                                                className="image"
                                                onError={(e) => { e.target.src = imageNotFound; }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </Box>
            </section>
        </>
    );
}