import React, { useState, useEffect } from 'react';
import './AlbumCard.scss';
import { storImagePath } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';
import { Link, useNavigate } from 'react-router-dom';
import Star from '../AlbumCard/star';
import Cookies from 'js-cookie';
import imageNotFound from '../../../../../Assets/image-not-found.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

const albumData = [
    { designno: '001', imageUrl: `${storImagePath()}/images/HomePage/demo-images/model1.jpg`, ImageExtension: 'jpg' },
    { designno: '002', imageUrl: `${storImagePath()}/images/HomePage/demo-images/model2.jpg`, ImageExtension: 'jpg' },
    { designno: '003', imageUrl: `${storImagePath()}/images/HomePage/demo-images/model3.jpg`, ImageExtension: 'jpg' },
    { designno: '004', imageUrl: `${storImagePath()}/images/HomePage/demo-images/model4.jpg`, ImageExtension: 'jpg' },
];

const AlbumCard = () => {
    const [validImages, setValidImages] = useState([]);
    console.log("TCL: AlbumCard -> validImages", validImages)
    const [albumData, setAlbumData] = useState([]);
    console.log("TCL: AlbumCard -> albumData", albumData)
    const [isLoading, setIsLoading] = useState(false);
    const [storeInit, setStoreInit] = useState({});
    const islogin = false; // You can replace with actual login state
    const navigation = useNavigate();

    useEffect(() => {
        const fetchAlbumData = async () => {
            setIsLoading(true);

            const storeInitData = JSON.parse(sessionStorage.getItem("storeInit"));
            const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
            setStoreInit(storeInitData);

            const { IsB2BWebsite } = storeInitData;
            const visiterID = Cookies.get('visiterId');

            const finalID = IsB2BWebsite === 0
                ? (islogin === false ? visiterID : (loginUserDetail?.id || '0'))
                : loginUserDetail?.id || '0';

            try {
                const response = await Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID);
                if (response?.Data?.rd) {
                    setAlbumData(response.Data.rd);
                } else {
                    console.log("No album data found", response);
                }
            } catch (err) {
                console.error("Error fetching album data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbumData();
    }, []);

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

    const handleNavigate = (data) => {
        const url = `/p/${encodeURIComponent(data?.AlbumName)}/?A=${btoa(`AlbumName=${data?.AlbumName}`)}`;
        const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;
        sessionStorage.setItem('redirectURL', url);
        navigation(islogin || data?.AlbumSecurityId === 0 ? url : redirectUrl);
    };

    return (
        <div className="main_albumcard_mainDiv">
            <div className="main_albumcard_div">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    slidesPerGroup={1}
                    navigation={{
                        nextEl: ".custom-swiper-button-next",
                        prevEl: ".custom-swiper-button-prev",
                    }}
                    loop={true}
                    // autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                    modules={[Navigation, Autoplay]}
                    className="album-swiper"
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        500: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {validImages.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="main_Card_Container">
                                <div className="main_Card_image_div">
                                    {/* <div className='main_card_left_star'>
                                        <Star />
                                    </div> */}
                                    <img
                                        className="main_Card_image"
                                        src={item.src}
                                        alt={item.name}
                                        onError={(e) => (e.target.src = 'path_to_default_image.jpg')}
                                    />
                                    {/* <div className='main_card_right_star'>
                                        <Star />
                                    </div> */}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="custom-swiper-button-prev">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </div>
                <div className="custom-swiper-button-next">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AlbumCard;
