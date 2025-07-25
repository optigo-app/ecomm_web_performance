// new Code

import React, { Suspense, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import { CurrencyComboAPI } from "./utils/API/Combo/CurrencyComboAPI";
import { MetalColorCombo } from "./utils/API/Combo/MetalColorCombo";
import { ColorStoneQualityColorComboAPI } from "./utils/API/Combo/ColorStoneQualityColorComboAPI";
import { DiamondQualityColorComboAPI } from "./utils/API/Combo/DiamondQualityColorComboAPI";
import { CountryCodeListApi } from "./utils/API/Auth/CountryCodeListApi";
import { MetalTypeComboAPI } from "./utils/API/Combo/MetalTypeComboAPI";
import { fetchPayMaster } from "./utils/API/OrderFlow/Paymaster";
import { storImagePath, storInitDataPath } from "./utils/Glob_Functions/GlobalFunction";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { orz_companyLogo, orz_companyLogoM } from "./AllTheme/Ornaz/Components/Recoil/atom";
import { el_companyLogo, el_companyLogoM } from "./AllTheme/Elveester/Components/Recoil/atom";
import { for_companyLogo, for_companyLogoM } from "./AllTheme/Forevery/Components/Recoil/atom";
import { dt_companyLogo, dt_companyLogoM } from "./AllTheme/DaimondTine/Components/Recoil/atom";
import { smrMA_companyLogo } from "./AllTheme/MobileApp/SmilingRock_MobileApp/Components/Recoil/atom";
import { proCat_companyLogo, proCat_companyLogoM } from "./AllTheme/Pocatalog/Components/Recoil/atom";
import { roop_companyLogo, roop_companyLogoM } from "./AllTheme/RoopJewellers/Components/Recoil/atom";
import { mala_companyLogo, mala_companyLogoM } from "./AllTheme/MalakanJwewls/Components/Recoil/atom";
import { stam_companyLogo, stam_companyLogoM } from "./AllTheme/StamFordJewels/Components/Recoil/atom";
import { lov_companyLogo, lov_companyLogoM, lov_loginState } from "./AllTheme/LoveIn/Components/Recoil/atom";
import { companyLogo, companyLogoM, loginState, smr_companyLogo, smr_companyLogoM, smr_loginState } from "./AllTheme/SmilingRock/Components/Recoil/atom";
import { REACT_APP_WEB } from "./env";
import { Box, CircularProgress } from "@mui/material";
import { DefaultLoadingFallback, ElveeLoadingFallback, KamalikaJewelssLoadingFallback, LoadingFallback, OjasviLoadingFallback, PacificLoadingFallback, ShinjiniLoadingFallback, ShreeDiamondsLoadingFallback, VaraLoadingFallback } from "./LoadingFallbacks";

const ForEveryRoutes = React.lazy(() => import("./AllTheme/Forevery/ForeveryRoutes"));
const SmilingRock_App = React.lazy(() => import("./AllTheme/SmilingRock/SmilingRock_App"));
const HouseOfQuadri_App = React.lazy(() => import("./AllTheme/HouseOfQuadri/HouseOfQuadri_App"));
const Elveester_App = React.lazy(() => import("./AllTheme/Elveester/Elveester_App"));
const SmilingRock_MobileApp_App = React.lazy(() => import("./AllTheme/MobileApp/SmilingRock_MobileApp/SmilingRock_MobileApp_App"));
const Procatalog_MobileApp_App = React.lazy(() => import("./AllTheme/MobileApp/Procatalog_MobileApp/Procatalog_MobileApp_App"));
const DaimondTine_App = React.lazy(() => import("./AllTheme/DaimondTine/DaimondTine_App"));
const StamFordJewels_App = React.lazy(() => import("./AllTheme/StamFordJewels/StamFordJewels_App"));
const MalakanJewels_App = React.lazy(() => import("./AllTheme/MalakanJwewls/MalakanJewels_App"));
const RoopJewellers_App = React.lazy(() => import("./AllTheme/RoopJewellers/RoopJewellers_App"));
const LoveIn_App = React.lazy(() => import("./AllTheme/LoveIn/LoveIn_App"));
const Ornaz_App = React.lazy(() => import("./AllTheme/Ornaz/Ornaz_App"));
const Procatalog_App = React.lazy(() => import("./AllTheme/Pocatalog/Procatalog_App"));

// Function to detect theme from URL or other sources
const detectThemeNumber = () => {
  // Check with the React app env file
  if (REACT_APP_WEB === "fgstore.web") return 1;
  if (REACT_APP_WEB === "diamondtine.web") return 2;
  if (REACT_APP_WEB === "elvee.web") return 3;
  if (REACT_APP_WEB === "fgstore.mapp") return 4;
  if (REACT_APP_WEB === "fgstore.pro") return 6;
  if (REACT_APP_WEB === "hoq.web") return 7;
  if (REACT_APP_WEB === "forevery.web") return 8;
  if (REACT_APP_WEB === "fgstorepro.mapp") return 9;
  if (REACT_APP_WEB === "stamford.web") return 10;
  if (REACT_APP_WEB === "rpjewel.web") return 11;
  if (REACT_APP_WEB === "malakan.web") return 12;
  if (REACT_APP_WEB === "lovein.web") return 13;
  if (REACT_APP_WEB === "ornaz.web") return 14;
};

export default function ThemeRoutes() {
  // All your existing Recoil setters
  const smr_SetCompanyTitleLogo = useSetRecoilState(smr_companyLogo);
  const smr_SetCompanyTitleLogoM = useSetRecoilState(smr_companyLogoM);
  const lov_SetCompanyTitleLogo = useSetRecoilState(lov_companyLogo);
  const lov_SetCompanyTitleLogoM = useSetRecoilState(lov_companyLogoM);
  const orz_SetCompanyTitleLogo = useSetRecoilState(orz_companyLogo);
  const orz_SetCompanyTitleLogoM = useSetRecoilState(orz_companyLogoM);
  const proCat_setCompanyTitleLogo = useSetRecoilState(proCat_companyLogo);
  const proCatM_setCompanyTitleLogo = useSetRecoilState(proCat_companyLogoM);
  const setRoopWebLogo = useSetRecoilState(roop_companyLogo);
  const setRoopMobileLogo = useSetRecoilState(roop_companyLogoM);
  const el_setCompanyTitleLogoM = useSetRecoilState(el_companyLogoM);
  const el_setCompanyTitleLogo = useSetRecoilState(el_companyLogo);
  const for_setCompanyTitleLogoM = useSetRecoilState(for_companyLogoM);
  const for_setCompanyTitleLogo = useSetRecoilState(for_companyLogo);
  const dt_setCompanyTitleLogo = useSetRecoilState(dt_companyLogo);
  const dt_setCompanyTitleLogoM = useSetRecoilState(dt_companyLogoM);
  const mala_setCompanyTitleLogo = useSetRecoilState(mala_companyLogo);
  const mala_setCompanyTitleLogoM = useSetRecoilState(mala_companyLogoM);
  const stam_setCompanyTitleLogo = useSetRecoilState(stam_companyLogo);
  const stam_setCompanyTitleLogoM = useSetRecoilState(stam_companyLogoM);
  const smrMA_setCompanyTitleLogo = useSetRecoilState(smrMA_companyLogo);

  const [title, setTitle] = useState("Loading...");
  const [htmlContent, setHtmlContent] = useState(null);
  const [storeInitData, setStoreInitData] = useState(null);
  const start = performance.now();
  const [currentTheme, setCurrentTheme] = useState(detectThemeNumber());
  const [isStoreInitLoaded, setIsStoreInitLoaded] = useState(false);
  const hasApiBeenCalled = useRef(false);

  const fetchWithRetry = (url, retries = 3, delay = 1000) => {
    console.log("called")
    return new Promise((resolve, reject) => {
      const attemptFetch = (n) => {
        fetch(url)
          .then((response) => response.text())
          .then(resolve)
          .catch((error) => {
            if (n === 0) {
              reject(error);
            } else {
              setTimeout(() => attemptFetch(n - 1), delay);
            }
          });
      };
      attemptFetch(retries);
    });
  };

  // Initialize logos immediately
  useEffect(() => {
    const webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    const mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;

    // Set all logos immediately
    smr_SetCompanyTitleLogo(webLogo);
    smr_SetCompanyTitleLogoM(mobileLogo);
    lov_SetCompanyTitleLogo(webLogo);
    lov_SetCompanyTitleLogoM(mobileLogo);
    orz_SetCompanyTitleLogo(webLogo);
    orz_SetCompanyTitleLogoM(mobileLogo);
    setRoopWebLogo(webLogo);
    setRoopMobileLogo(mobileLogo);
    mala_setCompanyTitleLogo(webLogo);
    mala_setCompanyTitleLogoM(mobileLogo);
    el_setCompanyTitleLogo(webLogo);
    el_setCompanyTitleLogoM(mobileLogo);
    for_setCompanyTitleLogo(webLogo);
    for_setCompanyTitleLogoM(mobileLogo);
    dt_setCompanyTitleLogo(webLogo);
    dt_setCompanyTitleLogoM(mobileLogo);
    stam_setCompanyTitleLogo(webLogo);
    stam_setCompanyTitleLogoM(mobileLogo);
    smrMA_setCompanyTitleLogo(mobileLogo);
  }, []);

  // Fetch store initialization data in parallel
  useEffect(() => {
    const path = `${storInitDataPath()}/StoreInit.json`;
    fetchWithRetry(path, 4, 1000)
      .then((text) => {
        try {
          const jsonData = JSON?.parse(text);
          if (jsonData) {
            setHtmlContent(jsonData);
            setStoreInitData(jsonData.rd[0]);
            setIsStoreInitLoaded(true);

            // Update theme if different from detected
            if (jsonData.rd[0]?.Themeno && jsonData.rd[0].Themeno !== currentTheme) {
              setCurrentTheme(jsonData.rd[0].Themeno);
            }

            sessionStorage.setItem("storeInit", JSON.stringify(jsonData.rd[0]));
            sessionStorage.setItem("myAccountFlags", JSON.stringify(jsonData.rd1));
            sessionStorage.setItem("CompanyInfoData", JSON.stringify(jsonData.rd2[0]));
          } else {
            alert("StoreInit.json not found")
          }
        } catch (error) {
          alert("Cannot Read store Init");
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, [currentTheme]);

  // Handle title and visitor ID setup
  useEffect(() => {
    if (!isStoreInitLoaded) return;

    const CompanyinfoData = JSON.parse(sessionStorage.getItem("CompanyInfoData"));
    const storeinit = JSON.parse(sessionStorage.getItem("storeInit"));

    setTitle(storeinit?.BrowserTitle || "Jewelry Store");

    if (CompanyinfoData) {
      const visiterId = CompanyinfoData?.VisitorId;
      const existingVisitorId = Cookies.get("visiterId") ?? "";
      if (!existingVisitorId) {
        Cookies.set("visiterId", visiterId, { path: "/", expires: 30 });
      } else {
        try {
          const visitorIdCookie = JSON.parse(Cookies.get("visiterId"));
          const expirationDate = visitorIdCookie?.expires && new Date(visitorIdCookie.expires);
          if (expirationDate && expirationDate <= new Date()) {
            Cookies.remove("visiterId", { path: "/" });
          }
        } catch (e) {
          console.error("Error parsing visiterId cookie:", e);
        }
      }
    }

    if (storeinit && !hasApiBeenCalled.current) {
      hasApiBeenCalled.current = true;
      setTimeout(() => {
        callAllApi();
      }, 1000); // Reduced delay for faster API calls
    }
  }, [isStoreInitLoaded]);

  // Paymaster fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPayMaster = sessionStorage.getItem("payMaster");
        if (!storedPayMaster) {
          const payMaster = await fetchPayMaster();
          const res = payMaster?.Data?.rd;
          sessionStorage.setItem("payMaster", JSON.stringify(res));
        }
      } catch (error) {
        console.error("Error fetching or retrieving payMaster:", error);
      }
    };

    const timer = setTimeout(fetchData, 2000); // Reduced delay
    return () => clearTimeout(timer);
  }, []);

  const callApiAndStore = (apiFunction, storageKey, finalID) => {
    apiFunction(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          sessionStorage.setItem(storageKey, JSON.stringify(response.Data.rd));
        }
      })
      .catch((err) => console.log(err));
  };

  const callAllApi = () => {
    const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
    const LoginUser = JSON?.parse(sessionStorage.getItem("LoginUser"));
    const visiterID = Cookies.get("visiterId");

    const finalID = storeInit?.IsB2BWebsite === 0 ? (LoginUser === false ? visiterID : loginUserDetail?.id || "0") : loginUserDetail?.id || "0";

    // Call all APIs in parallel
    Promise.all([
      callApiAndStore(MetalTypeComboAPI, "metalTypeCombo", finalID),
      callApiAndStore(DiamondQualityColorComboAPI, "diamondQualityColorCombo", finalID),
      callApiAndStore(MetalColorCombo, "MetalColorCombo", finalID),
      callApiAndStore(ColorStoneQualityColorComboAPI, "ColorStoneQualityColorCombo", finalID),
      callApiAndStore(CurrencyComboAPI, "CurrencyCombo", finalID),
      callApiAndStore(CountryCodeListApi, "CountryCodeListApi", finalID)
    ]).then(() => {
      console.log("All combo APIs completed");
    }).catch((error) => {
      console.error("Error in API calls:", error);
    });
  };

  return (
    <>
      {/* Render metadata immediately with fallback */}
      {storeInitData?.DomainForNo == 2 ? (
        <MetaData1 storeInitData={storeInitData} title={title} />
      ) : (
        <MetaData2 title={title} />
      )}

      {/* Render theme immediately based on detected/current theme */}
      <Themes themeNumber={currentTheme} />
    </>
  );
}

const MetaData1 = ({ title, storeInitData }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={title} />
      <link rel="icon" href={storeInitData?.favicon} type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href={storeInitData?.favicon} />
      <link rel="icon" type="image/png" sizes="192x192" href={storeInitData?.favicon} />
      <link rel="icon" type="image/png" sizes="512x512" href={storeInitData?.favicon} />
      <link rel="mask-icon" href={storeInitData?.favicon} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={storeInitData?.favicon} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
    </Helmet>
  );
};

const MetaData2 = ({ title, isHaveSub = false }) => {
  const MetaPath = isHaveSub ? `logoIcon/sona/` : `logoIcon/`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={title} />
      <link rel="icon" href={`${storImagePath()}/${MetaPath}favicon1.png`} type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href={`${storImagePath()}/${MetaPath}apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="192x192" href={`${storImagePath()}/${MetaPath}androidCh1.png`} />
      <link rel="icon" type="image/png" sizes="512x512" href={`${storImagePath()}/${MetaPath}androidCh2.png`} />
      <link rel="mask-icon" href={`${storImagePath()}/${MetaPath}apple-touch-icon.png`} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={`${storImagePath()}/${MetaPath}androidCh2.png`} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
    </Helmet>
  );
};


const Themes = ({ themeNumber }) => {
  return (
    // <Suspense fallback={<LoadingFallback />}>
    // <Suspense fallback={<VaraLoadingFallback />}>
    // <Suspense fallback={<PacificLoadingFallback />}>
    // <Suspense fallback={<OjasviLoadingFallback />}>
    // <Suspense fallback={<ShinjiniLoadingFallback />}>
    // <Suspense fallback={<ShreeDiamondsLoadingFallback />}>
    // <Suspense fallback={<KamalikaJewelssLoadingFallback />}>
    // <Suspense fallback={<DefaultLoadingFallback />}>
    <Suspense fallback={<ElveeLoadingFallback />}>
      {themeNumber === 8 && <ForEveryRoutes />}
      {themeNumber === 3 && <Elveester_App />}
      {themeNumber === 1 && <SmilingRock_App />}
      {themeNumber === 7 && <HouseOfQuadri_App />}
      {themeNumber === 10 && <StamFordJewels_App />}
      {themeNumber === 12 && <MalakanJewels_App />}
      {themeNumber === 6 && <Procatalog_App />}
      {themeNumber === 2 && <DaimondTine_App />}
      {themeNumber === 4 && <SmilingRock_MobileApp_App />}
      {themeNumber === 9 && <Procatalog_MobileApp_App />}
      {themeNumber === 11 && <RoopJewellers_App />}
      {themeNumber === 13 && <LoveIn_App />}
      {themeNumber === 14 && <Ornaz_App />}
      {/* {themeNumber === 5 && <HemratnaProcatalog_App />}   */}
    </Suspense>
  );
};


// Old Theme Routes code

/*
import React, { Suspense, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import { CurrencyComboAPI } from "./utils/API/Combo/CurrencyComboAPI";
import { MetalColorCombo } from "./utils/API/Combo/MetalColorCombo";
import { ColorStoneQualityColorComboAPI } from "./utils/API/Combo/ColorStoneQualityColorComboAPI";
import { DiamondQualityColorComboAPI } from "./utils/API/Combo/DiamondQualityColorComboAPI";
import { CountryCodeListApi } from "./utils/API/Auth/CountryCodeListApi";
import { MetalTypeComboAPI } from "./utils/API/Combo/MetalTypeComboAPI";
import { fetchPayMaster } from "./utils/API/OrderFlow/Paymaster";
import { storImagePath, storInitDataPath } from "./utils/Glob_Functions/GlobalFunction";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { orz_companyLogo, orz_companyLogoM } from "./AllTheme/Ornaz/Components/Recoil/atom";
import { el_companyLogo, el_companyLogoM } from "./AllTheme/Elveester/Components/Recoil/atom";
import { for_companyLogo, for_companyLogoM } from "./AllTheme/Forevery/Components/Recoil/atom";
import { dt_companyLogo, dt_companyLogoM } from "./AllTheme/DaimondTine/Components/Recoil/atom";
import { smrMA_companyLogo } from "./AllTheme/MobileApp/SmilingRock_MobileApp/Components/Recoil/atom";
import { proCat_companyLogo, proCat_companyLogoM } from "./AllTheme/Pocatalog/Components/Recoil/atom";
import { roop_companyLogo, roop_companyLogoM } from "./AllTheme/RoopJewellers/Components/Recoil/atom";
import { mala_companyLogo, mala_companyLogoM } from "./AllTheme/MalakanJwewls/Components/Recoil/atom";
import { stam_companyLogo, stam_companyLogoM } from "./AllTheme/StamFordJewels/Components/Recoil/atom";
import { lov_companyLogo, lov_companyLogoM, lov_loginState } from "./AllTheme/LoveIn/Components/Recoil/atom";
import { companyLogo, companyLogoM, loginState, smr_companyLogo, smr_companyLogoM, smr_loginState } from "./AllTheme/SmilingRock/Components/Recoil/atom";

const ForEveryRoutes = React.lazy(() => import("./AllTheme/Forevery/ForeveryRoutes"));
const SmilingRock_App = React.lazy(() => import("./AllTheme/SmilingRock/SmilingRock_App"));
const HouseOfQuadri_App = React.lazy(() => import("./AllTheme/HouseOfQuadri/HouseOfQuadri_App"));
const Elveester_App = React.lazy(() => import("./AllTheme/Elveester/Elveester_App"));
const SmilingRock_MobileApp_App = React.lazy(() => import("./AllTheme/MobileApp/SmilingRock_MobileApp/SmilingRock_MobileApp_App"));
const Procatalog_MobileApp_App = React.lazy(() => import("./AllTheme/MobileApp/Procatalog_MobileApp/Procatalog_MobileApp_App"));
const DaimondTine_App = React.lazy(() => import("./AllTheme/DaimondTine/DaimondTine_App"));
const StamFordJewels_App = React.lazy(() => import("./AllTheme/StamFordJewels/StamFordJewels_App"));
const MalakanJewels_App = React.lazy(() => import("./AllTheme/MalakanJwewls/MalakanJewels_App"));
const RoopJewellers_App = React.lazy(() => import("./AllTheme/RoopJewellers/RoopJewellers_App"));
const LoveIn_App = React.lazy(() => import("./AllTheme/LoveIn/LoveIn_App"));
const Ornaz_App = React.lazy(() => import("./AllTheme/Ornaz/Ornaz_App"));
const Procatalog_App = React.lazy(() => import("./AllTheme/Pocatalog/Procatalog_App"));
// const HemratnaProcatalog_App = React.lazy(() => import("./AllTheme/hemratnaProcatalog/HemratnaProcatalog_App"));



export default function ThemeRoutes() {
  const smr_SetCompanyTitleLogo = useSetRecoilState(smr_companyLogo);
  const smr_SetCompanyTitleLogoM = useSetRecoilState(smr_companyLogoM);

  const lov_SetCompanyTitleLogo = useSetRecoilState(lov_companyLogo);
  const lov_SetCompanyTitleLogoM = useSetRecoilState(lov_companyLogoM);

  const orz_SetCompanyTitleLogo = useSetRecoilState(orz_companyLogo);
  const orz_SetCompanyTitleLogoM = useSetRecoilState(orz_companyLogoM);

  const proCat_setCompanyTitleLogo = useSetRecoilState(proCat_companyLogo);
  const proCatM_setCompanyTitleLogo = useSetRecoilState(proCat_companyLogoM);

  const setRoopWebLogo = useSetRecoilState(roop_companyLogo);
  const setRoopMobileLogo = useSetRecoilState(roop_companyLogoM);

  const el_setCompanyTitleLogoM = useSetRecoilState(el_companyLogoM);
  const el_setCompanyTitleLogo = useSetRecoilState(el_companyLogo);

  const for_setCompanyTitleLogoM = useSetRecoilState(for_companyLogoM);
  const for_setCompanyTitleLogo = useSetRecoilState(for_companyLogo);

  const dt_setCompanyTitleLogo = useSetRecoilState(dt_companyLogo);
  const dt_setCompanyTitleLogoM = useSetRecoilState(dt_companyLogoM);

  const mala_setCompanyTitleLogo = useSetRecoilState(mala_companyLogo);
  const mala_setCompanyTitleLogoM = useSetRecoilState(mala_companyLogoM);

  const stam_setCompanyTitleLogo = useSetRecoilState(stam_companyLogo);
  const stam_setCompanyTitleLogoM = useSetRecoilState(stam_companyLogoM);

  const smrMA_setCompanyTitleLogo = useSetRecoilState(smrMA_companyLogo);

  const [title, setTitle] = useState();
  const [htmlContent, setHtmlContent] = useState("");
  const [storeInitData, setStoreInitData] = useState();
  const hasApiBeenCalled = useRef(false);

  const fetchWithRetry = (url, retries = 3, delay = 1000) => {
    console.log("called")
    return new Promise((resolve, reject) => {
      const attemptFetch = (n) => {
        fetch(url)
          .then((response) => response.text())
          .then(resolve)
          .catch((error) => {
            if (n === 0) {
              reject(error);
            } else {
              setTimeout(() => attemptFetch(n - 1), delay);
            }
          });
      };
      attemptFetch(retries);
    });
  };

  useEffect(() => {
    const path = `${storInitDataPath()}/StoreInit.json`;
    fetchWithRetry(path, 4, 1000)
      .then((text) => {
        try {
          const jsonData = JSON?.parse(text);
          if (jsonData) {
            setHtmlContent(jsonData);
            sessionStorage.setItem("storeInit", JSON.stringify(jsonData.rd[0]));
            sessionStorage.setItem("myAccountFlags", JSON.stringify(jsonData.rd1));
            sessionStorage.setItem("CompanyInfoData", JSON.stringify(jsonData.rd2[0]));
          } else {
            alert("StoreInit.json not found")
          }
        } catch (error) {
          alert("Cannot Read store Init");
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });

    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;

    smr_SetCompanyTitleLogo(webLogo);
    smr_SetCompanyTitleLogoM(mobileLogo);

    lov_SetCompanyTitleLogo(webLogo);
    lov_SetCompanyTitleLogoM(mobileLogo);

    orz_SetCompanyTitleLogo(webLogo);
    orz_SetCompanyTitleLogoM(mobileLogo);

    setRoopWebLogo(webLogo);
    setRoopMobileLogo(mobileLogo);

    mala_setCompanyTitleLogo(webLogo);
    mala_setCompanyTitleLogoM(mobileLogo);

    el_setCompanyTitleLogo(webLogo);
    el_setCompanyTitleLogoM(mobileLogo);

    for_setCompanyTitleLogo(webLogo);
    for_setCompanyTitleLogoM(mobileLogo);

    dt_setCompanyTitleLogo(webLogo);
    dt_setCompanyTitleLogoM(mobileLogo);

    stam_setCompanyTitleLogo(webLogo);
    stam_setCompanyTitleLogoM(mobileLogo);

    smrMA_setCompanyTitleLogo(mobileLogo);
  }, []);

  useEffect(() => {
    let CompanyinfoData = JSON.parse(sessionStorage.getItem("CompanyInfoData"));
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setTitle(storeinit?.BrowserTitle);
    if (CompanyinfoData) {
      let visiterId = CompanyinfoData?.VisitorId;
      const existingVisitorId = Cookies.get("visiterId") ?? "";
      if (!existingVisitorId) {
        Cookies.set("visiterId", visiterId, { path: "/", expires: 30 });
      } else {
        try {
          const visitorIdCookie = JSON.parse(Cookies.get("visiterId"));
          const expirationDate = visitorIdCookie?.expires && new Date(visitorIdCookie.expires);
          if (expirationDate && expirationDate <= new Date()) {
            Cookies.remove("visiterId", { path: "/" });
          }
        } catch (e) {
          console.error("Error parsing visiterId cookie:", e);
        }
      }
    }
    if (storeinit && !hasApiBeenCalled.current) {
      hasApiBeenCalled.current = true;
      setTimeout(() => {
        callAllApi();
      }, 3000);
    }
  }, [htmlContent]);

  // old version
  // const callAllApi = () => {
  //   const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
  //   const loginUserDetail = JSON?.parse(
  //     sessionStorage.getItem("loginUserDetail")
  //   );
  //   const LoginUser = JSON?.parse(sessionStorage.getItem("LoginUser"));
  //   const visiterID = Cookies.get("visiterId");
  //   let finalID;
  //   if (storeInit?.IsB2BWebsite == 0) {
  //     finalID = LoginUser === false ? visiterID : loginUserDetail?.id || "0";
  //   } else {
  //     finalID = loginUserDetail?.id || "0";
  //   }

  //   MetalTypeComboAPI(finalID)
  //     .then((response) => {
  //       if (response?.Data?.rd) {
  //         let data = JSON.stringify(response?.Data?.rd);
  //         sessionStorage.setItem("metalTypeCombo", data);
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   DiamondQualityColorComboAPI(finalID)
  //     .then((response) => {
  //       if (response?.Data?.rd) {
  //         let data = JSON.stringify(response?.Data?.rd);
  //         sessionStorage.setItem("diamondQualityColorCombo", data);
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   MetalColorCombo(finalID)
  //     .then((response) => {
  //       if (response?.Data?.rd) {
  //         let data = JSON.stringify(response?.Data?.rd);
  //         sessionStorage.setItem("MetalColorCombo", data);
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   ColorStoneQualityColorComboAPI(finalID)
  //     .then((response) => {
  //       if (response?.Data?.rd) {
  //         let data = JSON.stringify(response?.Data?.rd);
  //         sessionStorage.setItem("ColorStoneQualityColorCombo", data);
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   CurrencyComboAPI(finalID)
  //     .then((response) => {
  //       if (response?.Data?.rd) {
  //         let data = JSON.stringify(response?.Data?.rd);
  //         sessionStorage.setItem("CurrencyCombo", data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // new version

  const callApiAndStore = (apiFunction, storageKey, finalID) => {
    apiFunction(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          sessionStorage.setItem(storageKey, JSON.stringify(response.Data.rd));
        }
      })
      .catch((err) => console.log(err));
  };

  const callAllApi = () => {
    const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
    const LoginUser = JSON?.parse(sessionStorage.getItem("LoginUser"));
    const visiterID = Cookies.get("visiterId");

    const finalID = storeInit?.IsB2BWebsite === 0 ? (LoginUser === false ? visiterID : loginUserDetail?.id || "0") : loginUserDetail?.id || "0";

    callApiAndStore(MetalTypeComboAPI, "metalTypeCombo", finalID);
    callApiAndStore(DiamondQualityColorComboAPI, "diamondQualityColorCombo", finalID);
    callApiAndStore(MetalColorCombo, "MetalColorCombo", finalID);
    callApiAndStore(ColorStoneQualityColorComboAPI, "ColorStoneQualityColorCombo", finalID);
    callApiAndStore(CurrencyComboAPI, "CurrencyCombo", finalID);
    callApiAndStore(CountryCodeListApi, "CountryCodeListApi", finalID);
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("storeInit");
    const data = storedData ? JSON.parse(storedData) : null;
    if (htmlContent) {
      setStoreInitData(htmlContent.rd[0]);
    } else if (data) {
      setStoreInitData(data);
    }
  }, [htmlContent]);

  //paymaster
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPayMaster = sessionStorage.getItem("payMaster");

        if (storedPayMaster) {
          // console.log("payMaster from session storage: ", JSON.parse(storedPayMaster));
        } else {
          const payMaster = await fetchPayMaster();
          const res = payMaster?.Data?.rd;
          sessionStorage.setItem("payMaster", JSON.stringify(res));
        }
      } catch (error) {
        console.error("Error fetching or retrieving payMaster:", error);
      }
    };
    const timer = setTimeout(() => {
      fetchData();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {storeInitData?.DomainForNo == 2 ?
        <MetaData1 storeInitData={storeInitData} title={title} /> :
        <MetaData2 title={title} />}
      {htmlContent?.rd && htmlContent?.rd.length > 0 && <Themes htmlContent={htmlContent} />}
    </>
  );
}

const MetaData1 = ({ title, storeInitData }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href={storeInitData?.favicon} type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href={storeInitData?.favicon} />
        <link rel="icon" type="image/png" sizes="192x192" href={storeInitData?.favicon} />
        <link rel="icon" type="image/png" sizes="512x512" href={storeInitData?.favicon} />
        <link rel="mask-icon" href={storeInitData?.favicon} />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content={storeInitData?.favicon} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </Helmet>
    </>
  );
};

const MetaData2 = ({ title, isHaveSub = false }) => {
  const MetaPath = isHaveSub ? `logoIcon/sona/` : `logoIcon/`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={title} />
      <link rel="icon" href={`${storImagePath()}/${MetaPath}favicon1.png`} type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href={`${storImagePath()}/${MetaPath}apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="192x192" href={`${storImagePath()}/${MetaPath}androidCh1.png`} />
      <link rel="icon" type="image/png" sizes="512x512" href={`${storImagePath()}/${MetaPath}androidCh2.png`} />
      <link rel="mask-icon" href={`${storImagePath()}/${MetaPath}apple-touch-icon.png`} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={`${storImagePath()}/${MetaPath}androidCh2.png`} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
    </Helmet>
  );
};

const Themes = ({ htmlContent }) => {
  return (
    <>
      <Suspense fallback={<></>}>
        {htmlContent?.rd[0]?.Themeno === 8 && <ForEveryRoutes />}
        {htmlContent?.rd[0]?.Themeno === 3 && <Elveester_App />}
        {htmlContent?.rd[0]?.Themeno === 1 && <SmilingRock_App />}
        {htmlContent?.rd[0]?.Themeno === 7 && <HouseOfQuadri_App />}
        {htmlContent?.rd[0]?.Themeno === 10 && <StamFordJewels_App />}
        {htmlContent?.rd[0]?.Themeno === 12 && <MalakanJewels_App />}
        {htmlContent?.rd[0]?.Themeno === 6 && <Procatalog_App />}
        {htmlContent?.rd[0]?.Themeno === 2 && <DaimondTine_App />}
        {htmlContent?.rd[0]?.Themeno === 4 && <SmilingRock_MobileApp_App />}
        {htmlContent?.rd[0]?.Themeno === 9 && <Procatalog_MobileApp_App />}
        {htmlContent?.rd[0]?.Themeno === 11 && <RoopJewellers_App />}
        {htmlContent?.rd[0]?.Themeno === 13 && <LoveIn_App />}
        {htmlContent?.rd[0]?.Themeno === 14 && <Ornaz_App />}
      </Suspense>
    </>
  );
};
*/