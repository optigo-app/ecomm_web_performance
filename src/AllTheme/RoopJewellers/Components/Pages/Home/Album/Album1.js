import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Album1.scss';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import imageNotFound from '../../../Assets/image-not-found.jpg';
import Pako from 'pako';
import { Box, Link, Tab, Tabs, tabsClasses, useMediaQuery } from '@mui/material';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { roop_loginState } from '../../../Recoil/atom';

const Album1 = () => {
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [albumData, setAlbumData] = useState();
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const islogin = useRecoilValue(roop_loginState);
    const [storeInit, setStoreInit] = useState({});
    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
    const isMobileScreen = useMediaQuery('(max-width:768px)');

    useEffect(() => {
        let data = JSON?.parse(sessionStorage.getItem("storeInit"));
        setImageUrl(data?.AlbumImageFol);
        setStoreInit(data)

        const loginUserDetail = JSON?.parse(sessionStorage?.getItem('loginUserDetail'));
        const storeInit = JSON?.parse(sessionStorage?.getItem('storeInit'));
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
                    setAlbumData(response?.Data?.rd);
                    setSelectedAlbum(response?.Data?.rd[0]?.AlbumName)
                }
            })
            .catch((err) => console.log(err));
    }, []);

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

        console.log('aaaaaaaaaaa', designNo, autoCode, titleLine);
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

    console.log('albumDataalbumData', albumData);

    return (
        <>
            {albumData?.length != 0 &&
                <div className="roop_album-container">
                    <div className='roop_ablbumtitleDiv'>
                        <span className='roop_albumtitle'>Album</span>

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
                            className='roop_Albumtabs'
                        >
                            {albumData?.map((album) => (
                                <Tab
                                    key={album?.Albumid}
                                    label={album?.AlbumName}
                                    value={album?.AlbumName}
                                    className={selectedAlbum === album?.AlbumName ? 'active roop_Albumtab' : 'roop_Albumtab'}
                                />
                            ))}
                        </Tabs>
                    </Box>
                    <div className="swiper-container">
                        {albumData?.map((album) =>
                            album?.AlbumName === selectedAlbum ? (
                                <Swiper
                                    key={album?.Albumid}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    // breakpoints={{
                                    //     1200: {
                                    //         slidesPerView: 4,
                                    //     },
                                    //     992: {
                                    //         slidesPerView: 3,
                                    //     },
                                    //     768: {
                                    //         slidesPerView: 2,
                                    //     },
                                    // }}
                                    lazy={true}
                                    navigation={true}
                                    // navigation={!isMobileScreen && (JSON?.parse(album?.Designdetail).length > 4 ? true : false)}
                                    modules={[Keyboard, FreeMode, Navigation]}
                                    keyboard={{ enabled: true }}
                                    pagination={false}
                                >
                                    {JSON?.parse(album?.Designdetail)?.map((design) => (
                                        <SwiperSlide key={design?.autocode} className="swiper-slide-custom">
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
                                                        e.target.src = imageNotFound
                                                    }}
                                                />
                                            </div>
                                            <div className="design-info">
                                                <p className='roop_album1price'>
                                                    <span
                                                        className="roop_currencyFont"
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeEntities(
                                                                islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                                            ),
                                                        }}
                                                    /> {formatter(design?.UnitCostWithMarkUp)}
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : null
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default Album1;
