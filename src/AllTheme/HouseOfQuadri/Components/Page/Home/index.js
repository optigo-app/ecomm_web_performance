import React, { useEffect, useState } from "react";
import "./index.modul.scss";
import TopSlider from "./Slider/Slider";
import TabSection from "./TabSection/TabSection";
import Collection from "./Collection/Collection";
import FeaturedBrand from "./FeaturedBrand/FeaturedBrand";
import ReviewTab from "./ReviewTab/ReviewTab";
import CategoryTab from "./CategoryTab/CategoryTab";
import ReadyToShip from "./ReadyToShip/ReadyToShip";
import ImageBannerTab from "./ImageBannerTab/ImageBannerTab";
import ScrollTriggerTab from "./ScrollTriggerTab/ScrollTriggerTab";
import SocialTab from "./SocialTab/SocialTab";
import FaqSection from "./FaQSection/FaqSection";
import InfoSection from "./InfoSection/InfoSection";
import Preloader from "../../../../../dum/Load";

const HomePage = () => {
  const data = JSON.parse(sessionStorage.getItem("storeInit"));

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  return (
    <div className="hoq_main_homepage">
      {/* <Preloader/> */}
      <TopSlider />
      {data?.IsHomeNewArrival === 1 && <TabSection />}
      {data?.IsHomeDesignSet === 1 && <Collection />}
      <FeaturedBrand />
      <ReviewTab />
      {data?.IsHomeAlbum === 1 && <CategoryTab />}
      {data?.IsHomeBestSeller === 1 && <ReadyToShip />}
      <ImageBannerTab />
      <ScrollTriggerTab />
      <SocialTab />
      <InfoSection />
      <FaqSection />
    </div>
  );
};

export default HomePage;
