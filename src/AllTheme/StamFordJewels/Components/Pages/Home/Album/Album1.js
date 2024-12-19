import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Album1.scss';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import imageNotFound from '../../../Assets/image-not-found.jpg';
import Pako from 'pako';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Box, Link, Tab, Tabs, tabsClasses, useMediaQuery } from '@mui/material';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { stam_loginState } from '../../../Recoil/atom';

const Album1 = () => {
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [albumData, setAlbumData] = useState();
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const islogin = useRecoilValue(stam_loginState);
    const [storeInit, setStoreInit] = useState({});
    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
    const isMobileScreen = useMediaQuery('(max-width:768px)');
    const [validImages, setValidImages] = useState([]);
    const [slideHeight, setSlideHeight] = useState(null);
    const swiperSlideRef = useRef(null);

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

        // Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum_List", finalID)
        Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID)
            .then((response) => {
                if (response?.Data?.rd) {
                    setAlbumData(response?.Data?.rd);
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

    useEffect(() => {
        const getValidImages = async () => {
            if (!albumData?.length) return;

            const imagePromises = albumData.map(async (album) => {
                if (album.AlbumImageName && album.AlbumImageFol) {
                    const imgSrc = `${storeInit?.AlbumImageFol}${album?.AlbumImageFol}/${album?.AlbumImageName}`
                    return { ...album, src: imgSrc, name: album?.AlbumName };
                }
                else {
                    return { ...album, src: imageNotFound, name: album?.AlbumName };
                }
            });

            const images = await Promise.all(imagePromises);
            setValidImages(images);
        };
        getValidImages();
    }, [albumData, storeInit, imageNotFound]);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const GenerateWidthBaseOnContent = useCallback(() => {
        const length = albumData && validImages?.length;
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
    }, [albumData])

    useEffect(() => {

        if (swiperSlideRef.current) {
            setSlideHeight(swiperSlideRef.current.offsetHeight);
        }
    }, [albumData]);

    if (albumData?.length === 0) {
        return;
    }

    return (
        <div className={`stam_jewlSet_Main stam-inducing-div ${isVisible ? 'show' : ''}`} role="region" aria-labelledby="album-gallery" >
            {/* <p className="stam_jewl_title">Discover our carefully curated Jewellery Album</p> */}
            {/* <p className="stam_jewl_title" id="album-gallery">ALBUM COLLECTIONS</p>
            <p className="stam_jewl_title_para">Browse our curated collections of albums, crafted to perfection for every style and occasions.</p> */}

            <div class="header-container">
                <h1 class="header-title">ALBUM COLLECTIONS</h1>
                <p class="header-description">
                    Browse our curated collections of albums, crafted to perfection for every style and occasions.
                </p>
            </div>

            <div className="stam_jewls_main_sub"
                style={{
                    width: GenerateWidthBaseOnContent()?.width,
                }}
            >
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    // slidesPerView={4} 
                    style={{
                        width: '100%',
                    }}
                    breakpoints={{
                        850: {
                            slidesPerView: 4
                        },
                        650: {
                            slidesPerView: 3
                        },
                        450: {
                            slidesPerView: 2
                        },
                        0: {
                            slidesPerView: 1
                        }

                    }}
                    className="stam_album_main_swiper"
                >
                    {validImages?.map((item, index) => (
                        <SwiperSlide key={index} role="listitem">
                            <div className='stam_jewel_div'>
                                <div className="stam_jewls__image_div">
                                    <img
                                        className="stam_jewelImg"
                                        loading="lazy"
                                        src={item?.src}
                                        alt={item?.name ?? 'Jewellery Item'}
                                        onClick={() => handleNavigate(item)}
                                        aria-label={`Navigate to details of ${item?.name}`}
                                    />
                                </div>
                                <p className="stam_jewls_Div_name">{item?.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >


    );
};

export default Album1;




// <>
//     {albumData?.length != 0 &&
//         <div className="stam_album-container">
//             <div className='stam_ablbumtitleDiv'>
//                 <span className='stam_albumtitle'>Album</span>
//                 {/* <Link className='stam_designSetViewmoreBtn' onClick={() => navigation(`/p/AlbumName/?A=${btoa('AlbumName')}`)}>
//             View more
//         </Link> */}
//             </div>
//             <Box className="tabs"
//                 sx={{
//                     flexGrow: 1,
//                     maxWidth: "100%",
//                 }}>
//                 <Tabs
//                     value={selectedAlbum}
//                     onChange={handleChangeTab}
//                     variant="scrollable"
//                     scrollButtons="auto"
//                     aria-label="scrollable auto tabs example"
//                     TabIndicatorProps={{
//                         style: { display: 'none' }
//                     }}
//                     className='stam_Albumtabs'
//                 >
//                     {albumData?.map((album) => (
//                         <Tab
//                             key={album?.Albumid}
//                             label={album?.AlbumName}
//                             value={album?.AlbumName}
//                             className={selectedAlbum === album?.AlbumName ? 'active stam_Albumtab' : 'stam_Albumtab'}
//                         />
//                     ))}
//                 </Tabs>
//             </Box>
//             <div className="swiper-container">
//                 {albumData?.map((album) =>
//                     album?.AlbumName === selectedAlbum ? (
//                         <Swiper
//                             key={album?.Albumid}
//                             spaceBetween={10}
//                             slidesPerView={4}
//                             // breakpoints={{
//                             //     1200: {
//                             //         slidesPerView: 4,
//                             //     },
//                             //     992: {
//                             //         slidesPerView: 3,
//                             //     },
//                             //     768: {
//                             //         slidesPerView: 2,
//                             //     },
//                             // }}
//                             lazy={true}
//                             navigation={true}
//                             // navigation={!isMobileScreen && (JSON?.parse(album?.Designdetail).length > 4 ? true : false)}
//                             modules={[Keyboard, FreeMode, Navigation]}
//                             keyboard={{ enabled: true }}
//                             pagination={false}
//                         >
//                             {JSON?.parse(album?.Designdetail)?.map((design) => (
//                                 <SwiperSlide key={design?.autocode} className="swiper-slide-custom">
//                                     <div className="design-slide" onClick={() => handleNavigation(design?.designno, design?.autocode, design?.TitleLine)}>
//                                         <img
//                                             src={
//                                                 design?.ImageCount > 0
//                                                     ? `${storeInit?.DesignImageFol}${design?.designno}_1.${design?.ImageExtension}`
//                                                     : imageNotFound
//                                             }
//                                             alt={design?.TitleLine}
//                                             loading="lazy"
//                                         />
//                                     </div>
//                                     <div className="design-info">
//                                         <p className='stam_album1price'>
//                                             <span
//                                                 className="stam_currencyFont"
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: decodeEntities(
//                                                         islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
//                                                     ),
//                                                 }}
//                                             /> {formatter(design?.UnitCostWithMarkUp)}
//                                         </p>
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     ) : null
//                 )}
//             </div>
//         </div>
//     }
// </>