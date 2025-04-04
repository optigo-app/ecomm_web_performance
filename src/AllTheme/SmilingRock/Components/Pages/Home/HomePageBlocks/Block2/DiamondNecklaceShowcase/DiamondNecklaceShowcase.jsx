import { React, useState, useRef } from 'react';
import './DiamondNecklaceShowcase.scss';
import { storImagePath } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Box, Grid, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom';

export default function DiamondNecklaceShowcase() {
    const [leftImageIndex, setLeftImageIndex] = useState(0);
    const [rightImageIndex, setRightImageIndex] = useState(1);
    const swiperRef = useRef(null);

    const img1 = `${storImagePath()}/images/HomePage/demo-images/img1.webp`;
    const img2 = `${storImagePath()}/images/HomePage/demo-images/img2.webp`;
    const img3 = `${storImagePath()}/images/HomePage/demo-images/img3.webp`;
    const img4 = `${storImagePath()}/images/HomePage/demo-images/img4.webp`;
    const arrow1 = `${storImagePath()}/images/HomePage/demo-images/arrow1.svg`;
    const arrow2 = `${storImagePath()}/images/HomePage/demo-images/arrow2.svg`;

    const slides = [
        { leftImage: img1, rightImage: img2 },
        { leftImage: img3, rightImage: img4 },
        { leftImage: img2, rightImage: img1 },
    ];

    const handleLeftArrowClick = () => {
        setLeftImageIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
        swiperRef.current.swiper.slidePrev();
    };

    const handleRightArrowClick = () => {
        setRightImageIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        swiperRef.current.swiper.slideNext();
    };

    return (
        <>
            <section className="diamond-showcase-section">
                <Box className="container">
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={50}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        loop={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="diamond_showcase_swiper"
                    >
                        <SwiperSlide>
                            <Grid className="diamond_showcase_grid">
                                {/* Left Image */}
                                <Grid item xs={12} md={4} className="image-container">
                                    <Box className="image-box">
                                        <img
                                            src={slides[leftImageIndex].leftImage}
                                            alt="Left side image"
                                            className="image"
                                        />
                                    </Box>
                                </Grid>

                                {/* Center Content */}
                                <Grid item xs={12} md={4} className="content-container">
                                    <Typography variant="h4" className="title">Lab-Grown Diamond Necklace</Typography>
                                    <Typography variant="body1" className="description">
                                        Indulge in the timeless elegance of our Lab-Grown Diamond Necklace Collection. Each necklace in this
                                        collection features meticulously crafted lab-grown diamonds that sparkle with exceptional brilliance and
                                        clarity.
                                    </Typography>
                                    <Button variant="contained" className="explore-button">Explore Now</Button>
                                    <div className="arrow-buttons_div">
                                        <div className="arrow-buttons">
                                            <div
                                                className="arrow-left"
                                                aria-label="left arrow"
                                                onClick={handleLeftArrowClick}
                                            >
                                                <img src={arrow1} alt="Left Arrow" />
                                            </div>
                                            <div
                                                className="arrow-right"
                                                aria-label="right arrow"
                                                onClick={handleRightArrowClick}
                                            >
                                                <img src={arrow2} alt="Right Arrow" />
                                            </div>
                                        </div>
                                    </div>
                                </Grid>

                                {/* Right Image */}
                                <Grid item xs={12} md={4} className="image-container">
                                    <Box className="image-box">
                                        <img
                                            src={slides[rightImageIndex].rightImage}
                                            alt="Right side image"
                                            className="image"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </SwiperSlide>
                    </Swiper>
                </Box>
            </section>

            {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: "1rem", marginTop: "2rem" }}>
                <Link to={"/"}>Ecat</Link>
                <Link to={"/banner"}>Banner</Link>
                <Link to={"/album"}>Album</Link>
                <Link to={"/hero"}>Hero</Link>
            </div> */}
        </>
    );
}
