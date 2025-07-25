import React, { useEffect, useState, lazy } from "react";
import "./Index.modul.scss";
import useHomeBannerImages from "../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import { data } from "./json";

import TopSection from "./TopVideo/TopSection";
import TheDifference from "./TheDifference/TheDifference";
import PromotionBaner1 from "./PromotionBanner1/PromotionBaner1";
import TrendingView1 from "./TrandingView/TrendingView1";
import Album1 from "./Album/Album1";
import FooterBanner from "./FooterBanner/FooterBanner";
import useGlobalPreventSave from "../../../../../utils/Glob_Functions/useGlobalPreventSave";

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

  useGlobalPreventSave();

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
