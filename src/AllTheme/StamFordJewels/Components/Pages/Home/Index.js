import React, { useEffect, useState, lazy } from "react";
import "./Index.modul.scss";
import useHomeBannerImages from "../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import { data } from "./json";
// const TopSection = lazy(() => import("./TopVideo/TopSection"));
// const TheDifference = lazy(() => import("./TheDifference/TheDifference"));
// const PromotionBaner1 = lazy(() => import("./PromotionBanner1/PromotionBaner1"));
// const PromotionBaner2 = lazy(() => import("./PromotionBanner1/PromotionBaner2"));
// const ShopByCategory = lazy(() => import("./ShopByCategory/ShopByCategory"));
// const PromoSetSection = lazy(() => import("./BestSellerSection/BestSellerSection"));
// const SustainAbility = lazy(() => import("./SustainAbility/SustainAbility"));
// const BottomBanner = lazy(() => import("./BottomBanner/BottomBanner"));
// const Footer = lazy(() => import("./Footer/Footer"));
// const TrendingView = lazy(() => import("./TrandingView/TrendingView"));
// const TrendingView1 = lazy(() => import("./TrandingView/TrendingView1"));
// const DesignSet = lazy(() => import("./DesignSet/DesignSet1"));
// const DesignSet1 = lazy(() => import("./DesignSet/DesignSet2"));
// const Album = lazy(() => import("./Album/Album"));
// const Album1 = lazy(() => import("./Album/Album1"));
// const NewArrival = lazy(() => import("./NewArrival/NewArrival"));
// const NewArrival1 = lazy(() => import("./NewArrival/NewArrival1"));
// const BestSellerSection = lazy(() => import("./BestSellerSection/BestSellerSection"));
// const BestSellerSection1 = lazy(() => import("./BestSellerSection/BestSellerSection1"));
// const BrandsComponent = lazy(() => import("./BrandComponent/BrandComponents"));
// const Collection = lazy(() => import("./Collection/Collection"));
// const FooterBanner = lazy(() => import("./FooterBanner/FooterBanner"));

import TopSection from "./TopVideo/TopSection";
import TheDifference from "./TheDifference/TheDifference";
import PromotionBaner1 from "./PromotionBanner1/PromotionBaner1";
import TrendingView1 from "./TrandingView/TrendingView1";
import Album1 from "./Album/Album1";
import FooterBanner from "./FooterBanner/FooterBanner";

function Home() {
  const [localData, setLocalData] = useState();
  const [minHeight, setMinHeight] = useState("800px");
  const banner = useHomeBannerImages();

  useEffect(() => {
    let localData = JSON?.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localData);
    if (localData) {
      setMinHeight("0px");
    }
    setCSSVariable();
  }, []);

  const setCSSVariable = () => {
    const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
    const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
  };



  return (
    <>
      <div className="stam_home_index_main">
        <div style={{ minHeight: minHeight }}>
          <div className="stam_home_index_Submain">
            <TopSection data={{ mainBanner: banner?.mainBanner, srcsetMedias: banner?.srcsetMedias }} obj={data} />
            <TheDifference />
            <PromotionBaner1 data={banner?.middleBanner} />
            {localData?.IsHomeAlbum === 1 && <Album1 />}
            {localData?.IsHomeTrending === 1 && <TrendingView1 data={banner?.trendingBanner} />}
            <FooterBanner />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
