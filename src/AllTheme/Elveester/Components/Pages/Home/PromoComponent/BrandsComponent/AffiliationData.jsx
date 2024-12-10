import React, { useState } from 'react'
import './Styles.scss'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore from 'swiper/core';
import { Autoplay, Pagination } from 'swiper/modules';


SwiperCore.use([Pagination]);

const AffiliationData = () => {

    const sliderData = [
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo01.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo02.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo03.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo04.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo05.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo06.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo07.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo08.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo09.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo10.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo11.png",
        },
        {
            imageUrl: "/images/HomePage/Affiliation/AffiliationLogo12.png",
        },
    ];

    return (
        <div>
            <div className='elv_affi_div'>
                <p className='elv_AffiliationComponents'>Affiliation</p>
                <span className='elv_affi_subtitle'>Partnering for Excellence and Trust.</span>
            </div>
            <div className='AffiliationClassComponents' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        breakpoints={{
                            375: { slidesPerView: 1, spaceBetween: 0, loopAdditionalSlides: 3, centeredSlides: true },
                            425: { slidesPerView: 1, spaceBetween: 0, loopAdditionalSlides: 3, centeredSlides: true },
                            640: { slidesPerView: 3, spaceBetween: 0, loopAdditionalSlides: 4 },
                            768: { slidesPerView: 3, spaceBetween: 10 },
                            1024: { slidesPerView: 4, spaceBetween: 10 },
                            1280: { slidesPerView: 6, spaceBetween: 10 },
                            1440: { slidesPerView: 6, spaceBetween: 20 },
                            1920: { slidesPerView: 6, spaceBetween: 20 },
                            2560: { slidesPerView: 7, spaceBetween: 20 },
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper_affli"
                    >
                        {sliderData.map((slide, index) => (
                            <SwiperSlide key={index} style={{ maxWidth: '18rem', marginInline: 'auto' }}>
                                <div className='elv_affi_cards'>
                                    <img
                                        loading="lazy"
                                        src={storImagePath() + slide.imageUrl}
                                        alt={`Slide ${index}`}
                                        style={{ maxWidth: '180px', objectFit: 'contain', height: storImagePath() + slide.imageUrl == 'http://elvee.web/WebSiteStaticImage/images/HomePage/Affiliation/AffiliationLogo12.png' ? '10rem' : '5rem' }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper> */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        425: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Autoplay]}
                    className="affli_swiper"
                >
                    {sliderData.map((slide, index) => (
                        <SwiperSlide key={index} className="affiliation-slide">
                            <img
                                src={storImagePath() + slide?.imageUrl}
                                alt={`Slide ${index}`}
                                className="affiliation-image"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default AffiliationData;