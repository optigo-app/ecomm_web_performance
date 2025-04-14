import React, { useEffect, useRef, useState } from 'react';
import './BannerCarousel.scss';
import { formatRedirectTitleLine, formatter, formatTitleLine, storImagePath } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import imageNotFound from '../../../../../Assets/image-not-found.jpg';
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MetalColor_Image, smr_loginState } from '../../../../../Recoil/atom';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Pako from 'pako';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const BannerCarousel = () => {
    const banner = `${storImagePath()}/images/HomePage/demo-images/banner.webp`;
    const image1 = `${storImagePath()}/images/HomePage/demo-images/image1.webp`;
    const image2 = `${storImagePath()}/images/HomePage/demo-images/image2.webp`;

    // Fallback images
    const arrow1 = `${storImagePath()}/images/HomePage/demo-images/arrow1.svg`;
    const arrow2 = `${storImagePath()}/images/HomePage/demo-images/arrow2.svg`;

    const slides = [
        {
            title: "Slide 1",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$50"
        },
        {
            title: "Slide 2",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$60"
        },
        {
            title: "Slide 3",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$70"
        },
        {
            title: "Slide 4",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$80"
        },
        {
            title: "Slide 5",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$90"
        },
        {
            title: "Slide 6",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$100"
        },
        {
            title: "Slide 7",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$110"
        },
        {
            title: "Slide 8",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$120"
        },
        {
            title: "Slide 9",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$130"
        },
        {
            title: "Slide 10",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$140"
        },
        {
            title: "Slide 11",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$150"
        },
        {
            title: "Slide 12",
            imageUrl: image1,
            rollOverUrl: image2,
            price: "$160"
        }
    ];

    const [newArrivalData, setNewArrivalData] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [storeInit, setStoreInit] = useState({});
    const islogin = useRecoilValue(smr_loginState);
    const [validatedData, setValidatedData] = useState([]);
    const [hoveredProducts, setHoveredProducts] = useState({});  // Track which products are being hovered

    const callAPI = () => {
        setIsLoading(true)
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

        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID).then((response) => {
            if (response?.Data?.rd) {
                setNewArrivalData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err)).finally(() => { setIsLoading(false) })
    }

    useEffect(() => {
        callAPI();
    }, [])

    function checkImageAvailability(imageUrl) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imageUrl;
        });
    }

    const validateImageURLs = async () => {
        if (!newArrivalData?.length) return;
        const validatedData = await Promise.all(
            newArrivalData.map(async (item) => {
                const imageURL = `${imageUrl}${item?.designno}~1.${item?.ImageExtension}`;
                const rollOverImage = `${imageUrl}${item?.designno}~2.${item?.ImageExtension}`;

                const rollOverExists = await checkImageAvailability(rollOverImage);

                if (rollOverExists) {
                    return { ...item, validatedImageURL: imageURL, rollOverImage: rollOverImage };
                } else {
                    return { ...item, validatedImageURL: imageURL, rollOverImage: imageURL };
                }
            })
        );
        setValidatedData(validatedData);
    };

    useEffect(() => {
        validateImageURLs();
    }, [newArrivalData]);

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
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        navigation(`/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`);
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const handleMouseEnter = (designno) => {
        setHoveredProducts(prev => ({
            ...prev,
            [designno]: true
        }));
    };

    const handleMouseLeave = (designno) => {
        setHoveredProducts(prev => ({
            ...prev,
            [designno]: false
        }));
    };

    // Function to determine which image to show
    const getDisplayImage = (product) => {
        if (hoveredProducts[product.designno] && product.rollOverImage) {
            // If hovering and rollover image exists
            return product.rollOverImage;
        } else if (product.validatedImageURL) {
            // Default to primary image
            return product.validatedImageURL;
        } else {
            // Fallback to not found image
            return imageNotFound;
        }
    };

    return (
        <>
            <div className='main_BannerCar_div'>
                <div className="arrow-buttons_div_banner">
                    <div className="arrow-buttons_banner">
                        <div
                            className="arrow-left_banner"
                            aria-label="left arrow"
                        >
                            <img src={arrow1} alt="Left Arrow" />
                        </div>
                        <div
                            className="arrow-right_banner"
                            aria-label="right arrow"
                        >
                            <img src={arrow2} alt="Right Arrow" />
                        </div>
                    </div>
                </div>
                <div className='main_Bannercar_wrapper'>
                    <div className="main_BannerCar_left_div">
                        <img src={banner} alt="Banner" />
                    </div>
                    <div className="main_BannerCar_right_div">
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={4}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 4,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                480: {
                                    slidesPerView: 2,
                                },
                                0: {
                                    slidesPerView: 1,
                                },
                            }}
                            navigation={{
                                nextEl: ".arrow-right_banner",
                                prevEl: ".arrow-left_banner",
                            }}
                            loop={true}
                            modules={[Navigation, Autoplay]}
                        >
                            <div>
                                {validatedData?.map((product, index) => (
                                    <SwiperSlide key={index}>
                                        <Card sx={{ height: "99%" }}>
                                            <div className="slide-content">
                                                <CardMedia
                                                    component="img"
                                                    className="slide-image"
                                                    image={getDisplayImage(product)}
                                                    alt={product?.TitleLine}
                                                    onError={(e) => {
                                                        e.target.src = imageNotFound;
                                                    }}
                                                    onClick={() =>
                                                        handleNavigation(product?.designno, product?.autocode, product?.TitleLine)
                                                    }
                                                    onMouseEnter={() => handleMouseEnter(product.designno)}
                                                    onMouseLeave={() => handleMouseLeave(product.designno)}
                                                />
                                            </div>
                                            <CardContent className="slide-details" style={{ width: '100%', padding: "20px" }}>
                                                <Typography className="smr_newArrTitle" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {product?.designno}
                                                    {formatTitleLine(product?.TitleLine) && ' - '}
                                                    {formatTitleLine(product?.TitleLine) && product?.TitleLine}
                                                </Typography>
                                                {storeInit?.IsPriceShow == 1 && (
                                                    <p className="price">
                                                        <span
                                                            className="smr_currencyFont"
                                                            dangerouslySetInnerHTML={{
                                                                __html: decodeEntities(
                                                                    islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                                                ),
                                                            }}
                                                        />
                                                        {formatter(product?.UnitCostWithMarkUp)}
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </SwiperSlide>
                                ))}
                            </div>
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BannerCarousel;