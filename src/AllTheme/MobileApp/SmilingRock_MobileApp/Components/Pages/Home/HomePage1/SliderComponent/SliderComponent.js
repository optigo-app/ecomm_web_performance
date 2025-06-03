import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './SliderComponent.scss';
import imageNotFound from '../../../../Assets/image-not-found.jpg';
import 'swiper/css';
import { BsSuitHeart } from "react-icons/bs";
import 'swiper/css/effect-coverflow';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { formatter, formatTitleLine } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';
import { Button, Skeleton } from '@mui/material';
import { color } from 'framer-motion';

const SliderComponent = ({ title, description, products, loginInfo, storeInit, handleNavigation, handleNavigate }) => {
    // Product data
    // const products = [
    //     {
    //         id: 1,
    //         brand: "Victoria Beckham",
    //         name: "denim waistcoat",
    //         price: "$755",
    //         category: "New Season",
    //         imageUrl: "https://m.media-amazon.com/images/I/61kqhTCKtgL._AC_UF894,1000_QL80_.jpg"
    //     },
    //     {
    //         id: 2,
    //         brand: "Dolce & Gabbana",
    //         name: "logo-plaque earrings",
    //         price: "$925",
    //         category: "New Season",
    //         imageUrl: "https://m.media-amazon.com/images/I/61kqhTCKtgL._AC_UF894,1000_QL80_.jpg"
    //     },
    //     {
    //         id: 3,
    //         brand: "Prada",
    //         name: "leather shoulder bag",
    //         price: "$2,450",
    //         category: "New Season",
    //         imageUrl: "https://m.media-amazon.com/images/I/61kqhTCKtgL._AC_UF894,1000_QL80_.jpg"
    //     },
    //     {
    //         id: 4,
    //         brand: "Gucci",
    //         name: "GG canvas sneakers",
    //         price: "$890",
    //         category: "New Season",
    //         imageUrl: "https://m.media-amazon.com/images/I/61kqhTCKtgL._AC_UF894,1000_QL80_.jpg"
    //     },
    //     {
    //         id: 5,
    //         brand: "Balenciaga",
    //         name: "oversized t-shirt",
    //         price: "$550",
    //         category: "New Season",
    //         imageUrl: "https://m.media-amazon.com/images/I/61kqhTCKtgL._AC_UF894,1000_QL80_.jpg"
    //     }
    // ];

    const [activeIndex, setActiveIndex] = useState(0);
    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <div clas style={{ width: '92%', marginInline: "auto", marginBlock: "2rem" }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 className='srmm_fontFamily' style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {/* New in */}
                    {title}
                </h2>
                <p className='srmm_fontFamily' style={{ color: '#4B5563' }}>
                    {/* Handpicked daily from the world's best brands and boutiques */}
                    {description}
                </p>
            </div>

            <div style={{ width: '100%' }}>
                {(!products || products.length === 0) ? (
                    // Skeleton for SwiperSlide (height: 408px)
                    <div style={{ display: 'flex', overflowX: 'auto' }}>
                        {[...Array(2)].map((_, index) => (
                            <div key={index} style={{ width: '100%', padding: '0 0.5rem' }}>
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={408}
                                    sx={{ borderRadius: '0.5rem' }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Swiper
                        // effect="coverflow"
                        grabCursor={true}
                        // centeredSlides={true}
                        slidesPerView="auto"
                        slideToClickedSlide={true}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        modules={[EffectCoverflow, Pagination]}
                        onSlideChange={handleSlideChange}
                        initialSlide={0}
                        {...(products?.[0]?.AlbumImageFol
                            ? {
                                pagination: {
                                    clickable: true,
                                    dynamicBullets: true,
                                },
                            }
                            : {})}
                        style={{
                            paddingTop: '10px',
                            height: "415px",
                            // paddingBottom: '40px',
                        }}
                    >
                        {products.map((product, index) => {
                            return (
                                <SwiperSlide
                                    key={product.id}
                                    style={{
                                        width: '65%',
                                        paddingLeft: '0.5rem',
                                        paddingRight: '0.5rem',
                                        transition: 'all 0.3s ease',
                                    }}
                                >

                                    <div style={{ position: 'relative' }}>
                                        <div
                                            style={{
                                                backgroundColor: '#F3F4F6',
                                                borderRadius: '0.5rem',
                                                overflow: 'hidden',
                                                width: '100%', height: '100%'
                                            }}
                                        >
                                            <img
                                                src={product.src}
                                                style={{
                                                    width: "100%",
                                                    height: products?.[0]?.AlbumImageFol ? "100%" : "350px",
                                                    mixBlendMode: "multiply",
                                                    objectFit: 'contain',
                                                }}
                                                loading='lazy'
                                                onError={(e) => {
                                                    e.target.src = imageNotFound;
                                                }}
                                                onClick={() =>
                                                    product?.AlbumImageFol ? handleNavigate(product?.name) : handleNavigation(product?.designno, product?.autocode, product?.titleLine)
                                                }
                                            />
                                            {!products?.[0]?.AlbumImageFol &&
                                                <Button
                                                    style={{
                                                        position: 'absolute',
                                                        top: '1rem',
                                                        right: '0rem',
                                                        width: '2rem',
                                                        height: '2rem',
                                                        borderRadius: '9999px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <BsSuitHeart fontSize="20px" style={{ color: "black" }} />
                                                </Button>
                                            }
                                        </div>

                                        <div className='srmm_fontFamily' style={{ marginTop: '0.4rem' }}>
                                            {/* <div style={{ color: '#6B7280', fontSize: '0.875rem' }}>{product.category}</div> */}
                                            {!products?.[0]?.AlbumImageFol ? (
                                                <>
                                                    <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{product.designno}</div>
                                                    <div style={{ color: '#374151', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{formatTitleLine(product?.TitleLine) && product?.TitleLine}</div>
                                                    <div style={{ fontWeight: '500', marginTop: '0.1rem' }}>
                                                        {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}&nbsp;
                                                        {formatter(product.UnitCostWithMarkUpIncTax)}</div>
                                                </>
                                            ) :
                                                <div className='srmm_fontFamily' style={{ color: '#374151', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{formatTitleLine(product?.name) && product?.name}</div>
                                            }
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                )}
                {!products?.[0]?.AlbumImageFol && (
                    <Button className='srmm_sliderComponent_button' onClick={handleNavigate}>
                        Shop Now
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SliderComponent;