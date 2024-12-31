import React, { useEffect,  lazy, Suspense } from "react";
import useHomeBannerImages from './../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner';
import "./index.modul.scss";

const TopSlider = lazy(() => import("./Slider/Slider"));
const TabSection = lazy(() => import("./TabSection/TabSection"));
const Collection = lazy(() => import("./Collection/Collection"));
const FeaturedBrand = lazy(() => import("./FeaturedBrand/FeaturedBrand"));
const ReviewTab = lazy(() => import("./ReviewTab/ReviewTab"));
const CategoryTab = lazy(() => import("./CategoryTab/CategoryTab"));
const ReadyToShip = lazy(() => import("./ReadyToShip/ReadyToShip"));
const ImageBannerTab = lazy(() => import("./ImageBannerTab/ImageBannerTab"));
const ScrollTriggerTab = lazy(() => import("./ScrollTriggerTab/ScrollTriggerTab"));
const SocialTab = lazy(() => import("./SocialTab/SocialTab"));
const FaqSection = lazy(() => import("./FaQSection/FaqSection"));
const InfoSection = lazy(() => import("./InfoSection/InfoSection"));

const HomePage = () => {
  const data = JSON.parse(sessionStorage.getItem("storeInit"));
  const banners = useHomeBannerImages();

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  return (
    <div className="hoq_main_homepage">
      <Suspense fallback={<div></div>}>
        <TopSlider data={banners?.mainBanner} />
        {data?.IsHomeNewArrival === 1 && <TabSection />}
        {data?.IsHomeDesignSet === 1 && <Collection />}
        <FeaturedBrand />
        <ReviewTab />
        {data?.IsHomeAlbum === 1 && <CategoryTab />}
        {data?.IsHomeBestSeller === 1 && <ReadyToShip />}
        <ImageBannerTab />
        <ScrollTriggerTab data={banners?.middleBanner} />
        <SocialTab data={banners?.socialMediaBanner2} />
        <InfoSection />
        <FaqSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
