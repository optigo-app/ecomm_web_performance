import React, { lazy, useEffect, useState } from "react";
import "./Index.modul.scss";
import { homeLoading } from "../../Recoil/atom";
import { useRecoilValue } from "recoil";
import  Album1  from "./Album/Album1";
import useHomeBannerImages from "../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";

const  TopSection = lazy(()=>import("./TopVideo/TopSection"));
const  TheDifference = lazy(()=>import("./TheDifference/TheDifference"));
const  PromotionBaner1 = lazy(()=>import("./PromotionBanner1/PromotionBaner1"));
const  PromotionBaner2 = lazy(()=>import("./PromotionBanner1/PromotionBaner2"));
const  ShopByCategory = lazy(()=>import("./ShopByCategory/ShopByCategory"));
const  PromoSetSection = lazy(()=>import("./BestSellerSection/BestSellerSection"));
const  SustainAbility = lazy(()=>import("./SustainAbility/SustainAbility"));
const  BottomBanner = lazy(()=>import("./BottomBanner/BottomBanner"));
const  Footer = lazy(()=>import("./Footer/Footer"));
const  TrendingView = lazy(()=>import("./TrandingView/TrendingView"));
const  TrendingView1 = lazy(()=>import("./TrandingView/TrendingView1"));
const  DesignSet = lazy(()=>import("./DesignSet/DesignSet1"));
const  DesignSet1 = lazy(()=>import("./DesignSet/DesignSet2"));
const  Album = lazy(()=>import("./Album/Album"));
const  NewArrival = lazy(()=>import("./NewArrival/NewArrival"));
const  NewArrival1 = lazy(()=>import("./NewArrival/NewArrival1"));
const  BestSellerSection = lazy(()=>import("./BestSellerSection/BestSellerSection"));
const  BestSellerSection1 = lazy(()=>import("./BestSellerSection/BestSellerSection1"));
const  BrandsComponent = lazy(()=>import("./BrandComponent/BrandComponents"));
const  NewsletterSignup = lazy(()=>import("./SubscribeNewsLater/NewsletterSignup"));

function Home() {
  const [localData, setLocalData] = useState();
  const [minHeight, setMinHeight] = useState("0px");
  const [htmlContent, setHtmlContent] = useState("");
  const isLoadingHome = useRecoilValue(homeLoading);
  const [isMount,setIsMount]  =useState(true)
  const banner = useHomeBannerImages();

  useEffect(() => {
    setIsMount(false)
    let localData = JSON?.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localData);
    if (localData) {
      setMinHeight("0px");
    }
    setCSSVariable();
  }, []);

  // useEffect(() => {
  //   fetch(`${storInitDataPath()}/StoreInit.json`)
  //     .then((response) => response.text())
  //     .then((text) => {
  //       try {
  //         const jsonData = JSON?.parse(text);
  //         setHtmlContent(jsonData);
  //       } catch (error) {
  //         console.error("Error parsing JSON:", error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching the file:", error);
  //     });
  // }, []);

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
      {/* {htmlContent?.rd && htmlContent?.rd.length > 0 && */}
      {localData?.YearCode !== "" &&
        (
          <div className="smiling_home_index_main">
            <div style={{ backgroundColor: "white" }}>
              {/* {htmlContent?.rd[0]?.Blockno === 1 && ( */}
              {localData?.Blockno === 1 && (
                <div className="smiling_home_index_Submain">
                  <TopSection data={banner?.mainBanner} />
                  <TheDifference />
                  <PromotionBaner1 />
                  {localData?.IsHomeAlbum === 1 && <Album />}
                  {localData?.IsHomeBestSeller === 1 && <BestSellerSection />}
                  {localData?.IsHomeNewArrival === 1 && <NewArrival />}
                  {localData?.IsHomeTrending === 1 && <TrendingView />}
                  {localData?.IsHomeDesignSet === 1 && <DesignSet />}
                  <BottomBanner />
                  {/* <NewsletterSignup/> */}
                  <Footer />
                </div>
              )}
            </div>
            <div style={{ backgroundColor: "white" }}>
              {/* {htmlContent?.rd[0]?.Blockno === 2 && ( */}
              {localData?.Blockno === 2 && (
                <div className="smiling_home_index_Submain">
                  <TopSection data={banner?.mainBanner} />
                  <TheDifference />
                  <PromotionBaner2 />
                  {localData?.IsHomeAlbum === 1 && <Album1 />}
                  {localData?.IsHomeBestSeller === 1 && <BestSellerSection1 data={banner?.bestsellerBanner} />}
                  {localData?.IsHomeNewArrival === 1 && <NewArrival1 />}
                  {localData?.IsHomeTrending === 1 && <TrendingView1 data={banner?.trendingBanner} />}
                  {localData?.IsHomeDesignSet === 1 && <DesignSet1 data={banner?.lookbookBanner} />}
                  {isLoadingHome == true ?
                    <div className="smrHome_loader_container">
                      <div className="smrHome_loader"></div>
                    </div>
                    :
                    <>
                      <BottomBanner />
                      <BrandsComponent />
                    {/* <NewsletterSignup/> */}
                      <Footer />
                    </>
                  }
                </div>
              )}
            </div>
            <div>
             {!isMount && <p
                style={{
                  paddingBlock: "30px",
                  margin: "0px",
                  textAlign: "center",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "1px",
                  whiteSpace: "nowrap"
                }}
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
              >
                BACK TO TOP
              </p>}
            </div>
          </div>
        )}
    </>
  );
}

export default Home;