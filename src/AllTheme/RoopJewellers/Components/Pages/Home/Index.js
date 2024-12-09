import React, { lazy, Suspense, useEffect, useState } from "react";
import "./Index.modul.scss";
// import TopSection from "./TopVideo/TopSection";
// import TheDifference from "./TheDifference/TheDifference";
// import PromotionBaner1 from "./PromotionBanner1/PromotionBaner1";
// import PromotionBaner2 from "./PromotionBanner1/PromotionBaner2";
// import ShopByCategory from "./ShopByCategory/ShopByCategory";
// import PromoSetSection from "./BestSellerSection/BestSellerSection";
// import SustainAbility from "./SustainAbility/SustainAbility";
// import BottomBanner from "./BottomBanner/BottomBanner";
// import Footer from "./Footer/Footer";
// import TrendingView from "./TrandingView/TrendingView";
// import TrendingView1 from "./TrandingView/TrendingView1";
// import DesignSet from "./DesignSet/DesignSet1";
// import DesignSet1 from "./DesignSet/DesignSet2";
// import Album from "./Album/Album";
// import Album1 from "./Album/Album1";
// import NewArrival from "./NewArrival/NewArrival";
// import NewArrival1 from "./NewArrival/NewArrival1";
// import BestSellerSection from "./BestSellerSection/BestSellerSection";
// import BestSellerSection1 from "./BestSellerSection/BestSellerSection1";
// import BrandsComponent from "./BrandComponent/BrandComponents";
// import Collection from "./Collection/Collection";
// import JewellerySet from "./JewellerySet/JewellerySet";

const TopSection = lazy(() => import('./TopVideo/TopSection'));
const TheDifference = lazy(() => import('./TheDifference/TheDifference'));
const PromotionBaner1 = lazy(() => import('./PromotionBanner1/PromotionBaner1'));
const PromotionBaner2 = lazy(() => import('./PromotionBanner1/PromotionBaner2'));
const ShopByCategory = lazy(() => import('./ShopByCategory/ShopByCategory'));
const PromoSetSection = lazy(() => import('./BestSellerSection/BestSellerSection'));
const SustainAbility = lazy(() => import('./SustainAbility/SustainAbility'));
const BottomBanner = lazy(() => import('./BottomBanner/BottomBanner'));
const Footer = lazy(() => import('./Footer/Footer'));
const TrendingView = lazy(() => import('./TrandingView/TrendingView'));
const TrendingView1 = lazy(() => import('./TrandingView/TrendingView1'));
const DesignSet = lazy(() => import('./DesignSet/DesignSet1'));
const DesignSet1 = lazy(() => import('./DesignSet/DesignSet2'));
const Album = lazy(() => import('./Album/Album'));
const Album1 = lazy(() => import('./Album/Album1'));
const NewArrival = lazy(() => import('./NewArrival/NewArrival'));
const NewArrival1 = lazy(() => import('./NewArrival/NewArrival1'));
const BestSellerSection = lazy(() => import('./BestSellerSection/BestSellerSection'));
const BestSellerSection1 = lazy(() => import('./BestSellerSection/BestSellerSection1'));
const BrandsComponent = lazy(() => import('./BrandComponent/BrandComponents'));
const Collection = lazy(() => import('./Collection/Collection'));
const JewellerySet = lazy(() => import('./JewellerySet/JewellerySet'));


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
      {/* <div className="stam_home_index_main">
        <div style={{ minHeight: minHeight }}>
          <div className="stam_home_index_Submain">
            <TopSection />
            {localData?.IsHomeAlbum === 1 && <JewellerySet />}
            {localData?.IsHomeTrending === 1 && <TrendingView1 />}
            {localData?.IsHomeNewArrival === 1 && <NewArrival1 />}
            <Collection />
            {localData?.IsHomeBestSeller === 1 && <BestSellerSection1 />} */}
            {/* <TheDifference /> */}
            {/* <TrendingView1 /> */}
            {/* <PromotionBaner2 /> */}
            {/* {localData?.IsHomeAlbum === 1 && <Album1 />} */}

            {/* {localData?.IsHomeDesignSet === 1 && <DesignSet1 />} */}
            {/* <BottomBanner /> */}
            {/* <PromotionBaner1 /> */}
            {/* <BrandsComponent /> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
      <>
 <Suspense fallback={<></>}>
 <div className="stam_home_index_main" aria-labelledby="main-content">
    <div style={{ minHeight: minHeight }} aria-hidden="false">
      <div className="stam_home_index_Submain" role="main">
        <TopSection aria-labelledby="top-section" />
        
        {localData?.IsHomeAlbum === 1 && 
          <div id="home-album-section" role="region" aria-labelledby="home-album-title">
            <JewellerySet />
          </div>
        }
        
        {localData?.IsHomeTrending === 1 && 
          <div id="home-trending-section" role="region" aria-labelledby="home-trending-title">
            <TrendingView1 />
          </div>
        }
        
        {localData?.IsHomeNewArrival === 1 && 
          <div id="home-new-arrival-section" role="region" aria-labelledby="home-new-arrival-title">
            <NewArrival1 />
          </div>
        }
        
        <Collection aria-labelledby="collection-title" />
        
        {localData?.IsHomeBestSeller === 1 && 
          <div id="best-seller-section" role="region" aria-labelledby="best-seller-title">
            <BestSellerSection1 />
          </div>
        }
      </div>
    </div>
  </div>
 </Suspense>
</>

    </>
  );
}

export default Home;
