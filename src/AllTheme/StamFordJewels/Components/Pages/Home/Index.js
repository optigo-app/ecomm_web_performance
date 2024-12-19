import React, { useEffect, useState } from "react";
import "./Index.modul.scss";
import TopSection from "./TopVideo/TopSection";
import TheDifference from "./TheDifference/TheDifference";
import PromotionBaner1 from "./PromotionBanner1/PromotionBaner1";
import PromotionBaner2 from "./PromotionBanner1/PromotionBaner2";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import PromoSetSection from "./BestSellerSection/BestSellerSection";
import SustainAbility from "./SustainAbility/SustainAbility";
import BottomBanner from "./BottomBanner/BottomBanner";
import Footer from "./Footer/Footer";
import TrendingView from "./TrandingView/TrendingView";
import TrendingView1 from "./TrandingView/TrendingView1";
import DesignSet from "./DesignSet/DesignSet1";
import DesignSet1 from "./DesignSet/DesignSet2";
import Album from "./Album/Album";
import Album1 from "./Album/Album1";
import NewArrival from "./NewArrival/NewArrival";
import NewArrival1 from "./NewArrival/NewArrival1";
import BestSellerSection from "./BestSellerSection/BestSellerSection";
import BestSellerSection1 from "./BestSellerSection/BestSellerSection1";
import BrandsComponent from "./BrandComponent/BrandComponents";
import Collection from "./Collection/Collection";
import FooterBanner from "./FooterBanner/FooterBanner";

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
    // document.documentElement.style.setProperty(
    //   "--background-color",
    //   backgroundColor
    // );
  };



  return (
    <>
      <div className="stam_home_index_main">
        <div style={{ minHeight: minHeight }}>
          <div className="stam_home_index_Submain">
            <TopSection />
            <TheDifference />
            {/* <TrendingView1 /> */}
            <PromotionBaner1 />
            {localData?.IsHomeAlbum === 1 && <Album1 />}
            {localData?.IsHomeTrending === 1 && <TrendingView1 />}
            {/* {localData?.IsHomeBestSeller === 1 && <BestSellerSection1 />}
            {localData?.IsHomeNewArrival === 1 && <NewArrival1 />}
            {localData?.IsHomeDesignSet === 1 && <DesignSet1 />} */}
            {/* <BottomBanner /> */}
            {/* <PromotionBaner1 /> */}
            {/* <Collection /> */}
            {/* <BrandsComponent /> */}
            <FooterBanner />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
