import React, { lazy, Suspense, useEffect, useState } from "react";
import "./Index.modul.scss";
import useHomeBannerImages from "../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";

// const TopSection = lazy(() => import('./TopVideo/TopSection'));
// const TrendingView1 = lazy(() => import('./TrandingView/TrendingView1'));
// const NewArrival1 = lazy(() => import('./NewArrival/NewArrival1'));
// const BestSellerSection1 = lazy(() => import('./BestSellerSection/BestSellerSection1'));
// const JewellerySet = lazy(() => import('./JewellerySet/JewellerySet'));
// const Collection = lazy(() => import('./Collection/Collection'));

import TopSection from './TopVideo/TopSection';
import TrendingView1 from './TrandingView/TrendingView1';
import NewArrival1 from './NewArrival/NewArrival1';
import BestSellerSection1 from './BestSellerSection/BestSellerSection1';
import JewellerySet from './JewellerySet/JewellerySet';
import Collection from './Collection/Collection';


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

      <>
        {/* <Suspense fallback={<></>}> */}
        <div className="roop_home_index_main" aria-labelledby="main-content">
          <div style={{ minHeight: minHeight }} aria-hidden="false">
            <div className="roop_home_index_Submain" role="main">
              <TopSection aria-labelledby="top-section" data={banner?.mainBanner} />

              {localData?.IsHomeAlbum === 1 &&
                <div id="home-album-section" role="region" aria-labelledby="home-album-title">
                  <JewellerySet />
                </div>
              }

              {localData?.IsHomeTrending === 1 &&
                <div id="home-trending-section" role="region" aria-labelledby="home-trending-title">
                  <TrendingView1 data={banner?.trendingBanner} />
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
        {/* </Suspense> */}
      </>

    </>
  );
}

export default Home;


{/* <div className="roop_home_index_main">
        <div style={{ minHeight: minHeight }}>
          <div className="roop_home_index_Submain">
            <TopSection />
            {localData?.IsHomeAlbum === 1 && <JewellerySet />}
            {localData?.IsHomeTrending === 1 && <TrendingView1 />}
            {localData?.IsHomeNewArrival === 1 && <NewArrival1 />}
            <Collection />
            {localData?.IsHomeBestSeller === 1 && <BestSellerSection1 />} */}
{/* <TheDifference /> */ }
{/* <TrendingView1 /> */ }
{/* <PromotionBaner2 /> */ }
{/* {localData?.IsHomeAlbum === 1 && <Album1 />} */ }

{/* {localData?.IsHomeDesignSet === 1 && <DesignSet1 />} */ }
{/* <BottomBanner /> */ }
{/* <PromotionBaner1 /> */ }
{/* <BrandsComponent /> */ }
{/* </div> */ }
{/* </div> */ }
{/* </div> */ }