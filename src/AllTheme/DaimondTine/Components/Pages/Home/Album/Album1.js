import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Album1.scss';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import imageNotFound from '../../../Assets/image-not-found.jpg';
import Pako from 'pako';
import { Box, Link, Tab, Tabs, tabsClasses, useMediaQuery } from '@mui/material';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { dt_homeLoading, dt_loginState } from '../../../Recoil/atom';
import GoogleAnalytics  from 'react-ga4';


const Album1 = () => {
    const albumRef = useRef(null);
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [albumData, setAlbumData] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [imageStatus, setImageStatus] = useState({});
    const navigation = useNavigate();
    const islogin = useRecoilValue(dt_loginState);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const isMobileScreen = useMediaQuery('(max-width:768px)');
    const setLoadingHome = useSetRecoilState(dt_homeLoading);
    const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));

    useEffect(() => {
        setLoadingHome(true);
        let data = JSON?.parse(sessionStorage.getItem("storeInit"));
        setImageUrl(data?.AlbumImageFol);
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
        const loginUserDetail = JSON?.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON?.parse(sessionStorage.getItem('storeInit'));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }

        Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum_List", finalID)
            .then((response) => {
                if (response?.Data?.rd) {
                    setLoadingHome(false);
                    setAlbumData(response?.Data?.rd);
                    setSelectedAlbum(response?.Data?.rd[0]?.AlbumName)
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
        GoogleAnalytics.event({
            action: "Navigate to Product Detail",
            category: `Product Interaction Through Album Section`,
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

    const checkImageAvailability = (imageUrl) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imageUrl;
        });
    };

    useEffect(() => {
        if (albumData) {
            albumData?.forEach(album => {
                const designs = JSON?.parse(album?.Designdetail) || [];
                designs.forEach(async (design) => {
                    const imageSrc = `${storeInit?.DesignImageFol}${design?.designno}_1.${design?.ImageExtension}`;
                    const available = await checkImageAvailability(imageSrc);
                    setImageStatus(prevStatus => ({
                        ...prevStatus,
                        [imageSrc]: available
                    }));
                });
            });
        }
    }, [albumData]);

    return (
        <div ref={albumRef}>
            {albumData?.length != 0 &&
                <div className="dt_album_container">
                    <div className='smr_ablbumtitleDiv'>
                        <span className='smr_albumtitle'>Album</span>
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
                        >
                            {albumData?.map((album) => (
                                <Tab
                                    key={album?.Albumid}
                                    label={album?.AlbumName}
                                    value={album?.AlbumName}
                                    className={selectedAlbum === album?.AlbumName ? 'active' : ''}
                                />
                            ))}
                        </Tabs>
                    </Box>
                    <div className="Dt_swiper_container">
                        {albumData?.map((album) =>
                            album?.AlbumName === selectedAlbum ? (
                                <Swiper
                                    key={album?.Albumid}
                                    spaceBetween={10}
                                    lazy={true}
                                    navigation={true}
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
                                    modules={[Keyboard, FreeMode, Navigation]}
                                    keyboard={{ enabled: true }}
                                    pagination={false}
                                    className='dt_album_swiper_SubDiv'
                                >
                                    {album?.Designdetail && JSON?.parse(album?.Designdetail)?.map((design) => {
                                        const imageSrc = `${storeInit?.DesignImageFol}${design?.designno}_1.${design?.ImageExtension}`;
                                        const isImageAvailable = imageStatus[imageSrc] !== false;
                                        return (
                                            <SwiperSlide key={design?.autocode} className="swiper-slide-custom">
                                                <div className="design-slide" onClick={() => handleNavigation(design?.designno, design?.autocode, design?.TitleLine)}>
                                                    <img
                                                        src={isImageAvailable ? imageSrc : imageNotFound}
                                                        alt={design?.TitleLine}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="design-info">
                                                    <p className='smr_album1price'>
                                                        {design?.designno}
                                                    </p>
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
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            ) : null
                        )}
                    </div>
                </div>
            }
        </div>
    );
};

export default Album1;
