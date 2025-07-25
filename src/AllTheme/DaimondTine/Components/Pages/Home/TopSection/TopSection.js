import React from 'react'
import './TopSection.modul.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const sliderData = [
    {
        imageUrl: "/images/HomePage/TopBanner/HomepageMainBanner1.webp",
    },
    {
        imageUrl: "/images/HomePage/TopBanner/HomepageMainBanner2.webp",
    },
    {
        imageUrl: "/images/HomePage/TopBanner/HomepageMainBanner3.webp",
    },
];

const SonasliderData = [
    {
        imageUrl: "/images/HomePage/TopBanner/sona/HomepageMainBanner1.png",
    },
    {
        imageUrl: "/images/HomePage/TopBanner/sona/HomepageMainBanner2.png",
    },
    {
        imageUrl: "/images/HomePage/TopBanner/sona/HomepageMainBanner3.png",
    },
];

const TopSection = ({ data, promoBanner }) => {
    console.log(promoBanner, "promoBanner")
    return (
        <div className='dt_topSectionMain' onContextMenu={(e) => {
            e.preventDefault();
        }}>
            <Swiper
                pagination={{ clickable: false }}
                className="mySwiper"
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                {data?.image?.slice(0, 3).map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/* <img src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} className='dt_topSectionImg' style={{ width: '100%', height: '100%', minHeight: '700px', maxHeight: "800px", objectFit: 'cover' }} loading='eager' /> */}
                        <img src={slide} alt={`Slide ${index}`}
                            onContextMenu={(e) => {
                                e.preventDefault();
                            }}
                            draggable={true}
                            className='dt_topSectionImg' style={{ width: '100%', height: '100%', minHeight: '700px', maxHeight: "800px", objectFit: 'cover' }} loading='eager' />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="dt_imageContainer">
                {/* <img src={`${storImagePath()}/images/HomePage/Banner/PromoBanner1.webp`} className="dt_centeredImg" alt="Diamondtine Banner" /> */}
                <img src={promoBanner}
                    onContextMenu={(e) => {
                        e.preventDefault();
                    }}
                    draggable={true}
                    className="dt_centeredImg" alt="Diamondtine Banner" />
            </div>
        </div>
    )
}

export default TopSection