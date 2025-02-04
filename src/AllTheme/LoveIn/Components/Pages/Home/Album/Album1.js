import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Album1.scss';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { homeLoading, loginState, lov_loginState, smr_loginState } from "../../../Recoil/atom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import imageNotFound from '../../../Assets/image-not-found.jpg';
import Pako from 'pako';
import { motion } from 'framer-motion';
import { Box, Link, Tab, Tabs, tabsClasses, useMediaQuery } from '@mui/material';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import AlbumSkeletonCards from './album1Skelton';

const Album1 = () => {
    const albumRef = useRef(null);
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [albumData, setAlbumData] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const islogin = useRecoilValue(lov_loginState);
    const [storeInit, setStoreInit] = useState({});
    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
    const isMobileScreen = useMediaQuery('(max-width:768px)');
    const setLoadingHome = useSetRecoilState(homeLoading);
    const [isloding, setIsloding] = useState(false);
    const [slideHeight, setSlideHeight] = useState(null);
    const swiperSlideRef = useRef(null);

    useEffect(() => {
        setLoadingHome(true);
        let data = JSON?.parse(sessionStorage.getItem("storeInit"));
        setImageUrl(data?.AlbumImageFol);
        setStoreInit(data)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        apiCall();
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.5,
            }
        );

        if (albumRef.current) {
            observer.observe(albumRef.current);
        }
        return () => {
            if (albumRef.current) {
                observer.unobserve(albumRef.current);
            }
        };
    }, []);

    const apiCall = () => {
        setIsloding(true);
        const loginUserDetail = JSON?.parse(sessionStorage?.getItem('loginUserDetail'));
        const storeInit = JSON?.parse(sessionStorage?.getItem('storeInit'));
        setStoreInit(storeInit)
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (storeInit?.IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }
        setLoadingHome(false);
        Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum_List", finalID)
            .then((response) => {
                if (response?.Data?.rd) {
                    setAlbumData(response?.Data?.rd);
                    setSelectedAlbum(response?.Data?.rd[0]?.AlbumName)
                    setIsloding(false);
                }
            })
            .catch((err) => console.log(err));
    }

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

    const handleNavigate = (album) => {
        navigation(`/p/${album?.AlbumName}/?A=${btoa(`AlbumName=${album?.AlbumName}`)}`)
    }

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

    const handleChangeTab = (event, newValue) => {
        setTimeout(() => {
            setSelectedAlbum(newValue);
        }, 300);
    };

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const GenerateWidthBaseOnContent = useCallback(() => {
        const selectedAlbumDetails = albumData?.find((album) => album?.AlbumName === selectedAlbum);
        const parsedDesignDetails = selectedAlbumDetails?.Designdetail
            ? JSON.parse(selectedAlbumDetails.Designdetail)
            : null;
        const totalDesignDetails = Array.isArray(parsedDesignDetails) ? parsedDesignDetails.length : 0;
        const length = totalDesignDetails;
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
    }, [selectedAlbum])

    useEffect(() => {
        if (swiperSlideRef.current) {
            setSlideHeight(swiperSlideRef.current.offsetHeight);
        }
    }, [selectedAlbum, albumData]);

    const HandleAlbumMore = (data) => {
        const url = `/p/${encodeURIComponent(selectedAlbum)}/?A=${btoa(`AlbumName=${selectedAlbum}`)}`;
        const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;
        sessionStorage.setItem('redirectURL', url)
        navigation(islogin !== 0 ? url : redirectUrl);
    };


    return (
        <>
            {!isloding ? (
                // <div >
                    <div
                        ref={albumRef}
                    >
                        {albumData?.length != 0 &&
                            <div className="smr_album-container" >
                                <div className='smr_ablbumtitleDiv'>
                                    <span className='smr_albumtitle'>ALBUM</span>
                                    {/* <Link className='smr_designSetViewmoreBtn' onClick={() => navigation(`/p/AlbumName/?A=${btoa('AlbumName')}`)}>
                    View more
                  </Link> */}
                                </div>
                                <Box className="tabs"
                                    sx={{
                                        flexGrow: 1,
                                        maxWidth: "100%",
                                    }}>
                                    <Tabs
                                        value={selectedAlbum}
                                        onChange={handleChangeTab}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable auto tabs example"
                                        TabIndicatorProps={{
                                            style: { display: 'none' }
                                        }}
                                        className='smr_Albumtabs'
                                    >
                                        {albumData?.map((album) => (
                                            <Tab
                                                key={album?.Albumid}
                                                label={album?.AlbumName}
                                                value={album?.AlbumName}
                                                className={selectedAlbum === album?.AlbumName ? 'active smr_Albumtab' : 'smr_Albumtab'}
                                            />
                                        ))}
                                    </Tabs>
                                </Box>
                                <div className="smr_swiper_container"
                                    style={{
                                        width: GenerateWidthBaseOnContent().width,
                                    }}
                                >
                                    {albumData && albumData?.map((album) =>
                                        album?.AlbumName === selectedAlbum ? (
                                            <Swiper
                                                style={{
                                                    width: "100%"
                                                }}
                                                key={album?.Albumid}
                                                spaceBetween={10}
                                                slidesPerView={4}
                                                breakpoints={{
                                                    1024: {
                                                        slidesPerView: 4,
                                                    },
                                                    768: {
                                                        slidesPerView: 2,
                                                    },
                                                    0: {
                                                        slidesPerView: 2,
                                                    }
                                                }}
                                                lazy={true}
                                                navigation={true}
                                                // navigation={!isMobileScreen && (JSON?.parse(album?.Designdetail).length > 4 ? true : false)}
                                                modules={[Keyboard, FreeMode, Navigation]}
                                                keyboard={{ enabled: true }}
                                            // pagination={false}
                                            >
                                                {album && JSON?.parse(album?.Designdetail)?.map((design, index) => (
                                                    <SwiperSlide
                                                        style={{
                                                            width: '300px'
                                                        }}
                                                        ref={index === 0 ? swiperSlideRef : null}
                                                        key={design?.autocode} className="swiper-slide-custom">
                                                        <div className="design-slide" onClick={() => handleNavigation(design?.designno, design?.autocode, design?.TitleLine)}>
                                                            <img
                                                                src={
                                                                    design?.ImageCount > 0
                                                                        ? `${storeInit?.CDNDesignImageFol}${design?.designno}~1.${design?.ImageExtension}`
                                                                        : imageNotFound
                                                                }
                                                                alt={design?.TitleLine}
                                                                loading="lazy"
                                                                onError={(e) => {
                                                                    e.target.src = imageNotFound;
                                                                    e.target.alt = "no-image-found"
                                                                }}
                                                            />
                                                        </div>
                                                      {storeInit?.IsPriceShow == 1 &&  <div className="design-info">
                                                            <p className='smr_album1price'>
                                                                <span
                                                                    className="smr_currencyFont"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: decodeEntities(
                                                                            islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                                                        ),
                                                                    }}
                                                                /> {formatter(design?.UnitCostWithMarkUp)}
                                                            </p>
                                                        </div>}
                                                    </SwiperSlide>
                                                ))}
                                                {GenerateWidthBaseOnContent().length > 8 && <SwiperSlide key="slide-1" className="swiper-slide-custom" style={{
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
                                                        }} className='btn_more_A' onClick={() => HandleAlbumMore()}>View More</button>
                                                    </div>
                                                </SwiperSlide>}
                                            </Swiper>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                // {/* </div> */}
            ) :
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                    <AlbumSkeletonCards />

                </div>
            }
        </>
    );
};

export default Album1;
