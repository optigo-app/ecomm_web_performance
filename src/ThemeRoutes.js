import React, { Suspense, useEffect, useRef, useState } from "react";
import SmilingRock_App from "./AllTheme/SmilingRock/SmilingRock_App";
// import DaimondTine_App from "./AllTheme/DaimondTine/DaimondTine_App";
// import Elveester_App from "./AllTheme/Elveester/Elveester_App";
import { Storeinit } from "./utils/API/Home/Storeinit/Storeinit";
import { CurrencyComboAPI } from "./utils/API/Combo/CurrencyComboAPI";
import { MetalColorCombo } from "./utils/API/Combo/MetalColorCombo";
import { ColorStoneQualityColorComboAPI } from "./utils/API/Combo/ColorStoneQualityColorComboAPI";
import { DiamondQualityColorComboAPI } from "./utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalTypeComboAPI } from "./utils/API/Combo/MetalTypeComboAPI";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  el_companyLogo,
  el_companyLogoM,
} from "./AllTheme/Elveester/Components/Recoil/atom";
import {
  for_companyLogo,
  for_companyLogoM,
} from "./AllTheme/Forevery/Components/Recoil/atom";
import {
  companyLogo,
  companyLogoM,
  loginState,
  smr_companyLogo,
  smr_companyLogoM,
  smr_loginState,
} from "./AllTheme/SmilingRock/Components/Recoil/atom";
import {
  dt_companyLogo,
  dt_companyLogoM,
} from "./AllTheme/DaimondTine/Components/Recoil/atom";
import Cookies from "js-cookie";
import { smrMA_companyLogo } from "./AllTheme/MobileApp/SmilingRock_MobileApp/Components/Recoil/atom";
import {
  storImagePath,
  storInitDataPath,
} from "./utils/Glob_Functions/GlobalFunction";
import { Helmet } from "react-helmet";
import {
  proCat_companyLogo,
  proCat_companyLogoM,
} from "./AllTheme/Pocatalog/Components/Recoil/atom";
import {
  roop_companyLogo,
  roop_companyLogoM,
} from "./AllTheme/RoopJewellers/Components/Recoil/atom";
import {
  mala_companyLogo,
  mala_companyLogoM,
} from "./AllTheme/MalakanJwewls/Components/Recoil/atom";
import {
  stam_companyLogo,
  stam_companyLogoM,
} from "./AllTheme/StamFordJewels/Components/Recoil/atom";

// const SmilingRock_MobileApp_App = React.lazy(() =>
//   import("./AllTheme/MobileApp/SmilingRock_MobileApp/SmilingRock_MobileApp_App")
// );
// const HemratnaProcatalog_App = React.lazy(() =>
//   import("./AllTheme/hemratnaProcatalog/HemratnaProcatalog_App")
// );
// const Procatalog_App = React.lazy(() =>
//   import("./AllTheme/Pocatalog/Procatalog_App")
// );
// const HouseOfQuadri_App = React.lazy(() =>
//   import("./AllTheme/HouseOfQuadri/HouseOfQuadri_App")
// );
// const ForEveryRoutes = React.lazy(() =>
//   import("./AllTheme/Forevery/ForeveryRoutes")
// );
// const Procatalog_MobileApp_App = React.lazy(() =>
//   import("./AllTheme/MobileApp/Procatalog_MobileApp/Procatalog_MobileApp_App")
// );
// const StamFordJewels_App = React.lazy(() =>
//   import("./AllTheme/StamFordJewels/StamFordJewels_App")
// );
// const RoopJewellers_App = React.lazy(() =>
//   import("./AllTheme/RoopJewellers/RoopJewellers_App")
// );
// const MalakanJewels_App = React.lazy(() =>
//   import("./AllTheme/MalakanJwewls/MalakanJewels_App")
// );


export default function ThemeRoutes() {
  const smr_SetCompanyTitleLogo = useSetRecoilState(smr_companyLogo);
  const smr_SetCompanyTitleLogoM = useSetRecoilState(smr_companyLogoM);

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

  useEffect(() => {
    fetch(`${storInitDataPath()}/StoreInit.json`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON?.parse(text);
          setHtmlContent(jsonData);
          if (jsonData) {
            sessionStorage.setItem("storeInit", JSON.stringify(jsonData.rd[0]));
            sessionStorage.setItem(
              "myAccountFlags",
              JSON.stringify(jsonData.rd1)
            );
            sessionStorage.setItem(
              "CompanyInfoData",
              JSON.stringify(jsonData.rd2[0])
            );
          }
        } catch (error) {
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
          const expirationDate =
            visitorIdCookie?.expires && new Date(visitorIdCookie.expires);
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

    const finalID = storeInit?.IsB2BWebsite === 0
      ? (LoginUser === false ? visiterID : loginUserDetail?.id || "0")
      : loginUserDetail?.id || "0";

    callApiAndStore(MetalTypeComboAPI, "metalTypeCombo", finalID);
    callApiAndStore(DiamondQualityColorComboAPI, "diamondQualityColorCombo", finalID);
    callApiAndStore(MetalColorCombo, "MetalColorCombo", finalID);
    callApiAndStore(ColorStoneQualityColorComboAPI, "ColorStoneQualityColorCombo", finalID);
    callApiAndStore(CurrencyComboAPI, "CurrencyCombo", finalID);
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

  return (
    <>
      {storeInitData?.DomainForNo == 2 ? (
        <MetaData1 storeInitData={storeInitData} title={title} />
      ) : (
        <MetaData2 title={title} />
      )}

      {htmlContent?.rd && htmlContent?.rd.length > 0 && (
        <Themes htmlContent={htmlContent} />
      )}
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={storeInitData?.favicon}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={storeInitData?.favicon}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href={storeInitData?.favicon}
        />
        <link rel="mask-icon" href={storeInitData?.favicon} />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content={storeInitData?.favicon} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
    </>
  );
};

const MetaData2 = ({ title, isHaveSub = false }) => {
  const MetaPath = isHaveSub ? `logoIcon/sona/` : `logoIcon/`;
  console.log(MetaPath, "meta")
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={title} />
      <link
        rel="icon"
        href={`${storImagePath()}/${MetaPath}favicon1.png`}
        type="image/x-icon"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${storImagePath()}/${MetaPath}apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`${storImagePath()}/${MetaPath}androidCh1.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href={`${storImagePath()}/${MetaPath}androidCh2.png`}
      />
      <link
        rel="mask-icon"
        href={`${storImagePath()}/${MetaPath}apple-touch-icon.png`}
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content={`${storImagePath()}/${MetaPath}androidCh2.png`}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Helmet>
  );
};

const Themes = ({ htmlContent }) => {
  return <>
    <Suspense fallback={<></>}>
      {htmlContent?.rd[0]?.Themeno === 1 && <SmilingRock_App />}

      {/* {htmlContent?.rd[0]?.Themeno === 2 && <DaimondTine_App />} */}

      {/* {htmlContent?.rd[0]?.Themeno === 3 && <Elveester_App />} */}

      {/* {htmlContent?.rd[0]?.Themeno === 4 && <SmilingRock_MobileApp_App />} */}

      {/* {htmlContent?.rd[0]?.Themeno === 5 && <HemratnaProcatalog_App />} */}

      {/* {htmlContent?.rd[0]?.Themeno === 6 && <Procatalog_App />}  */}

      {/* {htmlContent?.rd[0]?.Themeno === 7 && <HouseOfQuadri_App />} */}

      {/* {htmlContent?.rd[0]?.Themeno === 8 && <ForEveryRoutes />} */}

      {/* {htmlContent?.rd[0]?.Themeno === 9 && <Procatalog_MobileApp_App />} */}

      {/* {htmlContent?.rd[0]?.Themeno === 10 && <StamFordJewels_App />} */}

      {/* {htmlContent?.rd[0]?.Themeno === 11 && <RoopJewellers_App />} */}

      {/* {htmlContent?.rd[0]?.Themeno === 12 && <MalakanJewels_App />} */}
    </Suspense>
  </>
}