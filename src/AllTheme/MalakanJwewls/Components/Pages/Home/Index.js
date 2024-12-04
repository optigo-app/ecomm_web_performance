import React, { useEffect, useState } from "react";
import "./Index.modul.scss";
import TopSection from "./TopVideo/TopSection";
import TheDifference from "./TheDifference/TheDifference";
import PromotionBaner2 from "./PromotionBanner1/PromotionBaner2";
import ShopBanner from "./ShopBanner/ShopBanner";
import BottomSection from "./BottomSection/BottomSection";
import TrendingView1 from "./TrandingView/TrendingView1";

function Home() {
  const [localData, setLocalData] = useState();
  const [minHeight, setMinHeight] = useState("800px");

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
      <div className="stam_home_index_main">
        <div style={{ minHeight: minHeight }}>
          <div className="stam_home_index_Submain">
            <TopSection />
            <ShopBanner />
            <PromotionBaner2 />
            <TrendingView1/>
            <TheDifference />
            <BottomSection />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
