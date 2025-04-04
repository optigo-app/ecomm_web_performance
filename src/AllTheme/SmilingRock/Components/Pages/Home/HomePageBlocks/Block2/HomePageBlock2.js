import React from 'react'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import HeroSection from './HeroSection/HeroSection'
import AlbumCard from './AlbumCard/AlbumCard'
import BannerCarousel from './bannerCarousel/BannerCarousel'
import DiamondNecklaceShowcase from './DiamondNecklaceShowcase/DiamondNecklaceShowcase'
import HoverCard from './hoverCard/HoverCard'
import Footer from './Footer/Footer';

const HomePageBlock2 = () => {

    const Banner = `${storImagePath()}/images/HomePage/demo-images/Banner.png`;
    const Banner2 = `${storImagePath()}/images/HomePage/demo-images/Banner2.jpg`;

    return (
        <div>
            <HeroSection />
            <AlbumCard />
            <div style={{ marginInline: "auto", width: "95%" }}>
                <img src={Banner} alt="banner.png" style={{ height: "600px", objectFit: "cover", objectPosition: "center", width: "100%", marginTop: "4rem" }} />
            </div>
            <BannerCarousel />
            <DiamondNecklaceShowcase />
            <HoverCard />
            <div style={{ marginInline: "auto", width: "95%" }}>
                <img src={Banner2} alt="banner2.png" style={{ height: "400px", objectFit: "cover", objectPosition: "center", width: "100%", marginBlock: "4rem" }} />
            </div>
            <Footer />
        </div>
    )
}

export default HomePageBlock2