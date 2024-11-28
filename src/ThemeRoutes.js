import React, { useEffect, useState } from "react";
import SmilingRock_App from "./AllTheme/SmilingRock/SmilingRock_App";
import DaimondTine_App from "./AllTheme/DaimondTine/DaimondTine_App";
import Elveester_App from "./AllTheme/Elveester/Elveester_App";
// import MobileApp_App from './AllTheme/MobileApp/MobileApp_App'
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
// import { el_companyLogo } from "./AllTheme/Elveester/Components/Recoil/atom";
import SmilingRock_MobileApp_App from "./AllTheme/MobileApp/SmilingRock_MobileApp/SmilingRock_MobileApp_App";
import { smrMA_companyLogo } from "./AllTheme/MobileApp/SmilingRock_MobileApp/Components/Recoil/atom";
import Cookies from "js-cookie";
import HemratnaProcatalog_App from "./AllTheme/hemratnaProcatalog/HemratnaProcatalog_App";
import Procatalog_App from "./AllTheme/Pocatalog/Procatalog_App";
import HouseOfQuadri_App from "./AllTheme/HouseOfQuadri/HouseOfQuadri_App";
import ForEveryRoutes from "./AllTheme/Forevery/ForeveryRoutes";
import Procatalog_MobileApp_App from "./AllTheme/MobileApp/Procatalog_MobileApp/Procatalog_MobileApp_App";
import StamFordJewels_App from "./AllTheme/StamFordJewels/StamFordJewels_App";
import RoopJewellers_App from "./AllTheme/RoopJewellers/RoopJewellers_App";
import MalakanJewels_App from "./AllTheme/MalakanJwewls/MalakanJewels_App";
import {
  storImagePath,
  storInitDataPath,
} from "./utils/Glob_Functions/GlobalFunction";
import { Helmet } from "react-helmet";
import SEO from "./utils/Seo/Seo";
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
    setTitle(title);
    let CompanyinfoData = JSON.parse(sessionStorage.getItem("CompanyInfoData"));
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    if (CompanyinfoData) {
      let visiterId = CompanyinfoData?.VisitorId;
      const existingVisitorId = Cookies.get("visiterId") ?? '';
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
    console.log("worked call")
    if (storeinit) {
      console.log("worked htmlcontent")
      callAllApi();
      // callAllApi(htmlContent?.rd[0]);
    }
  }, [htmlContent]);

  const callAllApi = () => {
    const storeInit = JSON?.parse(
      sessionStorage.getItem("storeInit")
    );
    const loginUserDetail = JSON?.parse(
      sessionStorage.getItem("loginUserDetail")
    );
    const LoginUser = JSON?.parse(sessionStorage.getItem("LoginUser"));
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (storeInit?.IsB2BWebsite == 0) {
      finalID = LoginUser === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    MetalTypeComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          sessionStorage.setItem("metalTypeCombo", data);
        }
      })
      .catch((err) => console.log(err));

    DiamondQualityColorComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          sessionStorage.setItem("diamondQualityColorCombo", data);
        }
      })
      .catch((err) => console.log(err));

    MetalColorCombo(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          sessionStorage.setItem("MetalColorCombo", data);
        }
      })
      .catch((err) => console.log(err));

    ColorStoneQualityColorComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          sessionStorage.setItem("ColorStoneQualityColorCombo", data);
        }
      })
      .catch((err) => console.log(err));

    CurrencyComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          sessionStorage.setItem("CurrencyCombo", data);
        }
      })
      .catch((err) => console.log(err));
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
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={title} />
            <link
              rel="icon"
              href={storeInitData?.favicon}
              type="image/x-icon"
            />
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
            <meta
              name="msapplication-TileImage"
              content={storeInitData?.favicon}
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Helmet>
        </div>
      ) : (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={title} />
            <link
              rel="icon"
              href={`${storImagePath()}/logoIcon/sona/favicon1.png`}
              type="image/x-icon"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href={`${storImagePath()}/logoIcon/sona/apple-touch-icon.png`}
            />
            <link
              rel="icon"
              type="image/png"
              sizes="192x192"
              href={`${storImagePath()}/logoIcon/sona/androidCh1.png`}
            />
            <link
              rel="icon"
              type="image/png"
              sizes="512x512"
              href={`${storImagePath()}/logoIcon/sona/androidCh2.png`}
            />
            <link
              rel="mask-icon"
              href={`${storImagePath()}/logoIcon/sona/apple-touch-icon.png`}
            />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
              name="msapplication-TileImage"
              content={`${storImagePath()}/logoIcon/sona/androidCh2.png`}
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Helmet>
        </div>
      )}

      {htmlContent?.rd && htmlContent?.rd.length > 0 && (
        <>
          {htmlContent?.rd[0]?.Themeno === 1 && <SmilingRock_App />}

          {htmlContent?.rd[0]?.Themeno === 2 && <DaimondTine_App />}

          {htmlContent?.rd[0]?.Themeno === 3 && <Elveester_App />}

          {htmlContent?.rd[0]?.Themeno === 4 && <SmilingRock_MobileApp_App />}

          {htmlContent?.rd[0]?.Themeno === 5 && <HemratnaProcatalog_App />}

          {htmlContent?.rd[0]?.Themeno === 6 && <Procatalog_App />}

          {htmlContent?.rd[0]?.Themeno === 7 && <HouseOfQuadri_App />}

          {htmlContent?.rd[0]?.Themeno === 8 && <ForEveryRoutes />}

          {htmlContent?.rd[0]?.Themeno === 9 && <Procatalog_MobileApp_App />}

          {htmlContent?.rd[0]?.Themeno === 10 && <StamFordJewels_App />}

          {htmlContent?.rd[0]?.Themeno === 11 && <RoopJewellers_App />}

          {htmlContent?.rd[0]?.Themeno === 12 && <MalakanJewels_App />}
        </>
      )}
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import SmilingRock_App from "./AllTheme/SmilingRock/SmilingRock_App";
// import DaimondTine_App from "./AllTheme/DaimondTine/DaimondTine_App";
// import Elveester_App from "./AllTheme/Elveester/Elveester_App";
// // import MobileApp_App from './AllTheme/MobileApp/MobileApp_App'
// import { Storeinit } from "./utils/API/Home/Storeinit/Storeinit";
// import { CurrencyComboAPI } from "./utils/API/Combo/CurrencyComboAPI";
// import { MetalColorCombo } from "./utils/API/Combo/MetalColorCombo";
// import { ColorStoneQualityColorComboAPI } from "./utils/API/Combo/ColorStoneQualityColorComboAPI";
// import { DiamondQualityColorComboAPI } from "./utils/API/Combo/DiamondQualityColorComboAPI";
// import { MetalTypeComboAPI } from "./utils/API/Combo/MetalTypeComboAPI";
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import { companyLogo, companyLogoM, loginState, smr_companyLogo, smr_companyLogoM, smr_loginState } from "./AllTheme/SmilingRock/Components/Recoil/atom";
// import { dt_companyLogo, dt_companyLogoM } from "./AllTheme/DaimondTine/Components/Recoil/atom";
// import { el_companyLogo } from "./AllTheme/Elveester/Components/Recoil/atom";
// import SmilingRock_MobileApp_App from "./AllTheme/MobileApp/SmilingRock_MobileApp/SmilingRock_MobileApp_App";
// import { smrMA_companyLogo } from "./AllTheme/MobileApp/SmilingRock_MobileApp/Components/Recoil/atom";
// import Cookies from "js-cookie";
// import HemratnaProcatalog_App from "./AllTheme/hemratnaProcatalog/HemratnaProcatalog_App";
// import Procatalog_App from "./AllTheme/Pocatalog/Procatalog_App";
// import HouseOfQuadri_App from "./AllTheme/HouseOfQuadri/HouseOfQuadri_App";
// import ForEveryRoutes from "./AllTheme/Forevery/ForeveryRoutes";
// import Procatalog_MobileApp_App from "./AllTheme/MobileApp/Procatalog_MobileApp/Procatalog_MobileApp_App";
// import StamFordJewels_App from "./AllTheme/StamFordJewels/StamFordJewels_App";
// import RoopJewellers_App from "./AllTheme/RoopJewellers/RoopJewellers_App";
// import MalakanJewels_App from "./AllTheme/MalakanJwewls/MalakanJewels_App";
// import { storImagePath, storInitDataPath } from "./utils/Glob_Functions/GlobalFunction";
// import { Helmet } from "react-helmet";
// import SEO from "./utils/Seo/Seo";
// import { proCat_companyLogo, proCat_companyLogoM } from "./AllTheme/Pocatalog/Components/Recoil/atom";
// import { roop_companyLogo, roop_companyLogoM } from "./AllTheme/RoopJewellers/Components/Recoil/atom";

// export default function ThemeRoutes() {

//   const [themeNo, setThemeNo] = useState()

//   const smr_SetCompanyTitleLogo = useSetRecoilState(smr_companyLogo)
//   const smr_SetCompanyTitleLogoM = useSetRecoilState(smr_companyLogoM)

//   const proCat_setCompanyTitleLogo = useSetRecoilState(proCat_companyLogo)
//   const proCatM_setCompanyTitleLogo = useSetRecoilState(proCat_companyLogoM)

//   const setRoopWebLogo = useSetRecoilState(roop_companyLogo);
//   const setRoopMobileLogo = useSetRecoilState(roop_companyLogoM);

//   const dt_setCompanyTitleLogo = useSetRecoilState(dt_companyLogo)
//   const dt_setCompanyTitleLogoM = useSetRecoilState(dt_companyLogoM)

//   const [smrMA_companyTitleLogo, smrMA_setCompanyTitleLogo] = useRecoilState(smrMA_companyLogo)
//   const [el_companyTitleLogo, el_setCompanyTitleLogo] = useRecoilState(el_companyLogo)

//   const [title, setTitle] = useState();
//   const [favicon, setFavIcon] = useState();
//   const [htmlContent, setHtmlContent] = useState("");

//   useEffect(() => {
//     fetch(`${storInitDataPath()}/StoreInit.json`)
//       .then((response) => response.text())
//       .then((text) => {
//         try {
//           const jsonData = JSON?.parse(text);
//           setHtmlContent(jsonData);
//           if (jsonData) {
//             sessionStorage.setItem("storeInit", JSON.stringify(jsonData.rd[0]));
//             sessionStorage.setItem("myAccountFlags", JSON.stringify(jsonData.rd1));
//             sessionStorage.setItem("CompanyInfoData", JSON.stringify(jsonData.rd2[0]));
//           }
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching the file:", error);
//       });

//     let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
//     let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;

//     smr_SetCompanyTitleLogo(webLogo);
//     smr_SetCompanyTitleLogoM(mobileLogo);

//     setRoopWebLogo(webLogo);
//     setRoopMobileLogo(mobileLogo);

//     proCat_setCompanyTitleLogo(webLogo);
//     proCatM_setCompanyTitleLogo(mobileLogo);

//     dt_setCompanyTitleLogo(webLogo);
//     dt_setCompanyTitleLogoM(mobileLogo);

//     // fetch(`${storImagePath()}/ExtraFlag.txt`)

//   }, []);

//   useEffect(() => {
//     let SessionData = JSON.parse(sessionStorage.getItem("storeInit"));
//     if (!SessionData) {
//       Storeinit()
//         .then((response) => {
//           if (response.status === 200 && response?.data?.Data) {
//             setThemeNo(response?.data?.Data?.rd[0]?.Themeno);
//             let title = response?.data?.Data?.rd[0]?.companyname;
//             let favIcon = response?.data?.Data?.rd[0]?.favicon;
//             setTitle(title);
//             setFavIcon(favIcon);
//             console.log(response.data.Data.rd1, response.data.Data.rd[0]);
//             let visiterId = response?.data.Data?.rd2[0]?.VisitorId;

//             const existingVisitorId = Cookies.get("visiterId");
//             if (!existingVisitorId) {
//               Cookies.set("visiterId", visiterId, { path: "/", expires: 30 });
//             } else {
//               try {
//                 const visitorIdCookie = JSON.parse(Cookies.get("visiterId"));
//                 const expirationDate = visitorIdCookie?.expires && new Date(visitorIdCookie.expires);
//                 if (expirationDate && expirationDate <= new Date()) {
//                   Cookies.remove("visiterId", { path: "/" });
//                 }
//               } catch (e) {
//                 console.error("Error parsing visiterId cookie:", e);
//               }
//             }

//             if (response?.data?.Data?.rd[0]?.Themeno === 3) {
//               el_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo);
//             }

//             if (response?.data?.Data?.rd[0]?.Themeno === 4) {
//               smrMA_setCompanyTitleLogo(
//                 response?.data?.Data?.rd[0]?.companylogo
//               );
//             }

//             if (response?.data?.Data) {
//               callAllApi(response?.data?.Data);
//             }
//             let title1 = response?.data?.Data?.rd[0]?.BrowserTitle;
//             setTitle(title1);
//             setFavIcon(favIcon);
//             window.scrollTo({
//               top: 0,
//               left: 0,
//               behavior: "smooth",
//             });
//           }
//         })
//         .catch((err) => console.log(err));
//     } else {
//       setThemeNo(SessionData?.Themeno);
//     }
//     let title = SessionData?.companyname;
//     let favIcon = SessionData?.favicon;
//     setTitle(title);
//     setFavIcon(favIcon);
//   }, []);

//   const callAllApi = (Data) => {
//     const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
//     const LoginUser = JSON?.parse(sessionStorage.getItem("LoginUser"));
//     const { IsB2BWebsite } = Data;
//     const visiterID = Cookies.get("visiterId");
//     let finalID;
//     if (IsB2BWebsite == 0) {
//       finalID = (LoginUser === false) ? visiterID : loginUserDetail?.id || "0";
//     } else {
//       finalID = loginUserDetail?.id || "0";
//     }

//     MetalTypeComboAPI(finalID)
//       .then((response) => {
//         if (response?.Data?.rd) {
//           let data = JSON.stringify(response?.Data?.rd);
//           sessionStorage.setItem("metalTypeCombo", data);
//         }
//       })
//       .catch((err) => console.log(err));

//     DiamondQualityColorComboAPI(finalID)
//       .then((response) => {
//         if (response?.Data?.rd) {
//           let data = JSON.stringify(response?.Data?.rd);
//           sessionStorage.setItem("diamondQualityColorCombo", data);
//         }
//       }
//       )
//       .catch((err) => console.log(err));

//     MetalColorCombo(finalID).then((response) => {
//       if (response?.Data?.rd) {
//         let data = JSON.stringify(response?.Data?.rd)
//         sessionStorage.setItem('MetalColorCombo', data)
//       }
//     }).catch((err) => console.log(err))

//     ColorStoneQualityColorComboAPI(finalID)
//       .then((response) => {
//         if (response?.Data?.rd) {
//           let data = JSON.stringify(response?.Data?.rd);
//           sessionStorage.setItem("ColorStoneQualityColorCombo", data);
//         }
//       })
//       .catch((err) => console.log(err));

//     CurrencyComboAPI(finalID)
//       .then((response) => {
//         if (response?.Data?.rd) {
//           let data = JSON.stringify(response?.Data?.rd);
//           sessionStorage.setItem("CurrencyCombo", data);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   {
//     htmlContent?.rd && htmlContent?.rd.length > 0 &&

//       console.log('jsonDatajsonData', htmlContent?.rd[0]?.Themeno);
//   }
//   return (
//     <>
//       <div>

//         <Helmet>
//           <title>{title}</title>
//           <meta name="description" content={title} />
//           <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
//           <link rel="apple-touch-icon" href={favicon} />
//           <link rel="icon" sizes="192x192" href={favicon} />
//           <link rel="icon" sizes="512x512" href={favicon} />
//           <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
//           <meta name="description" content={title} />
//           <link rel="icon" href={`${storImagePath()}/logoIcon/favicon1.png`} type="image/x-icon" />
//           <link rel="apple-touch-icon" sizes="180x180" href={`${storImagePath()}/logoIcon/apple-touch-icon.png`} />
//           <link rel="icon" type="image/png" sizes="192x192" href={`${storImagePath()}/logoIcon/androidCh1.png`} />
//           <link rel="icon" type="image/png" sizes="512x512" href={`${storImagePath()}/logoIcon/androidCh2.png`} />
//           <link rel="mask-icon" href={`${storImagePath()}/logoIcon/apple-touch-icon.png`} />
//           <meta name="msapplication-TileColor" content="#ffffff" />
//           <meta name="msapplication-TileImage" content={`${storImagePath()}/logoIcon/androidCh2.png`} />
//           <meta
//             name="viewport"
//             content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
//           />
//         </Helmet>

//       </div>

//       {htmlContent?.rd && htmlContent?.rd.length > 0 &&
//         (
//           <>
//             {htmlContent?.rd[0]?.Themeno === 1 && <SmilingRock_App />}

//             {htmlContent?.rd[0]?.Themeno === 2 && <DaimondTine_App />}

//             {htmlContent?.rd[0]?.Themeno === 3 && <Elveester_App />}

//             {htmlContent?.rd[0]?.Themeno === 4 && <SmilingRock_MobileApp_App />}

//             {htmlContent?.rd[0]?.Themeno === 5 && <HemratnaProcatalog_App />}

//             {htmlContent?.rd[0]?.Themeno === 6 && <Procatalog_App />}

//             {htmlContent?.rd[0]?.Themeno === 7 && <HouseOfQuadri_App />}

//             {htmlContent?.rd[0]?.Themeno === 8 && <ForEveryRoutes />}

//             {htmlContent?.rd[0]?.Themeno === 9 && <Procatalog_MobileApp_App />}

//             {htmlContent?.rd[0]?.Themeno === 10 && <StamFordJewels_App />}

//             {htmlContent?.rd[0]?.Themeno === 11 && <RoopJewellers_App />}

//             {htmlContent?.rd[0]?.Themeno === 12 && <MalakanJewels_App />}
//           </>
//         )
//       }
//     </>
//   );
// }
