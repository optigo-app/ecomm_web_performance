import React, { useEffect, useState } from "react";
import "./Index.modul.scss";
import TopVideoSection from "./Common/TopVideoSection/TopVideoSection";
import ShoptheCollections from "./Common/ShoptheCollections/ShoptheCollections";
import LabgrownDiamondInfo from "./Common/LabgrownDiamondInfo/LabgrownDiamondInfo";
import ShapeSection from "./Common/ShapeSection/ShapeSection";
import DiamondLifeTime from "./Common/DiamondLifeTime/DiamondLifeTime";
import ProductCarousel from "./Common/ProductCarousel/ProductCarousel";
import Bestseller from "./Common/Bestseller/Bestseller";
import Banner from "./Common/Banner/Banner";
import OurServices from "./Common/OurServices/OurServices";
import HistoryPage from "./Common/HistoryPage/HistoryPage";
import NewsletterSignup from "../../Pages/ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import GetInTouch from "./Common/GetInTouch/GetInTouch";
import InstagramSection from "./Common/InstagramSection/InstagramSection";
import NewArrivalCarousel from "./Common/ProductCarousel/CarouselReUse";
import useHomeBannerImages from "../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import { GetAPIUrlFromStoreInit } from "../../../../../utils/Glob_Functions/GlobalFunction";

function Home() {
  const banner = useHomeBannerImages();
  const data = JSON.parse(sessionStorage.getItem("storeInit"));
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  return (
    <>
      <div className="for_home_index_main">
        <div style={{ backgroundColor: "white" }}>
          <div className="for_home_index_Submain">
            <TopVideoSection data={banner?.mainBanner} />
            <ShoptheCollections />
            <LabgrownDiamondInfo data={banner?.middleBanner} />
            <ShapeSection />
            {/* <DiamondLifeTime data={banner?.middleBanner} /> */}
            {data?.IsHomeTrending == 1 && <ProductCarousel />}
            <Bestseller />
            <Banner data={banner?.promotionalBanner} />
            {data?.IsHomeNewArrival == 1 && (
              <NewArrivalCarousel data={banner?.newArrivalBanner} />
            )}
            {/* <OurServices /> */}
            <HistoryPage data={banner?.bottomBanner} />
            <InstagramSection />
            {/* <GetInTouch data={banner?.bottomBanner} /> */}
            {/* <NewsletterSignup /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
