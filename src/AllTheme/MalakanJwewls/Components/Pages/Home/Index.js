import React, { useEffect, useState, lazy } from "react";
import "./Index.modul.scss";
import useHomeBannerImages from "./../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";

const TopSection = lazy(() => import("./TopVideo/TopSection"));
const TheDifference = lazy(() => import("./TheDifference/TheDifference"));
const PromotionBaner2 = lazy(() => import("./PromotionBanner1/PromotionBaner2"));
const ShopBanner = lazy(() => import("./ShopBanner/ShopBanner"));
const BottomSection = lazy(() => import("./BottomSection/BottomSection"));
const TrendingView1 = lazy(() => import("./TrandingView/TrendingView1"));

// import TopSection from "./TopVideo/TopSection";
// import TheDifference from "./TheDifference/TheDifference";
// import PromotionBaner2 from "./PromotionBanner1/PromotionBaner2";
// import ShopBanner from "./ShopBanner/ShopBanner";
// import BottomSection from "./BottomSection/BottomSection";
// import TrendingView1 from "./TrandingView/TrendingView1";


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
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  };

  return (
    <>
      <div className="mala_home_index_main">
        <div style={{ minHeight: minHeight }}>
          <div className="mala_home_index_Submain">
            <TopSection data={banner?.mainBanner} />
            <ShopBanner />
            <PromotionBaner2 data={banner?.middleBanner} />
            <TrendingView1 data={banner?.trendingBanner} />
            <TheDifference data={banner?.bottomBanner} />
            <BottomSection data={banner?.bottomBanner} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
