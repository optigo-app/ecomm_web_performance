import React, { useState } from 'react';
import './BannerCarousel.scss';
import { storImagePath } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const BannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.activeIndex);
    };

    const banner = `${storImagePath()}/images/HomePage/demo-images/banner.webp`;
    const image1 = `${storImagePath()}/images/HomePage/demo-images/image1.webp`;
    const image2 = `${storImagePath()}/images/HomePage/demo-images/image2.webp`;

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

    return (
        <>
            <div className='main_BannerCar_div'>
                <div className='main_Bannercar_wrapper'>
                    <div className="main_BannerCar_left_div">
                        <img src={banner} alt="Banner" />
                    </div>
                    <div className="main_BannerCar_right_div">
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={6}
                            slidesPerGroup={6}
                            onSlideChange={handleSlideChange}
                            loop={true}
                            modules={[Autoplay]}
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <div className="slide-content">
                                        <img
                                            src={slide.imageUrl}
                                            alt={slide.title}
                                            className="slide-image"
                                            onMouseEnter={(e) => e.target.src = slide.rollOverUrl}
                                            onMouseLeave={(e) => e.target.src = slide.imageUrl}
                                        />
                                        <div className="slide-details">
                                            <h3>{slide.title}</h3>
                                            <p className="price">{slide.price}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: "1rem", marginTop: "2rem" }}>
                <Link to={"/"}>Ecat</Link>
                <Link to={"/diamond"}>Diamond</Link>
                <Link to={"/album"}>Album</Link>
                <Link to={"/hero"}>Hero</Link>
            </div> */}
        </>

    );
}

export default BannerCarousel;
