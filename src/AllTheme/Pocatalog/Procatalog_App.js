import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import './Components/scss/variable.scss';
import Home from "./Components/Pages/Home/Index";
import Header from "./Components/Pages/Home/Header/Header";
import Cart from "./Components/Pages/Cart/CartMain";
import loaderImg from './Components/Assets/webLogo.png';
import loaderImg1 from './Components/Assets/sarafflogo.png';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  companyLogo,
  proCat_companyLogo,
  proCat_companyLogoM,
  proCat_loginState,
} from "./Components/Recoil/atom";
import Cookies from "js-cookie";
import ProCat_PrivateRoutes from "./ProCat_PrivateRoutes";
import { storImagePath, storInitDataPath, } from "../../utils/Glob_Functions/GlobalFunction";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import { verifyToken, getLocalStorageValue } from "../../utils/Glob_Functions/Tokenizer";
import { Box, CircularProgress } from "@mui/material";
// import ProductList from "./Components/Pages/Product/ProductList/ProductList";

// import AboutUs from "./Components/Pages/aboutUs/AboutUs";
// import ProductDetail from "./Components/Pages/Product/ProductDetail/ProductDetail";
// import ContactUs from "./Components/Pages/FooterPages/contactUs/ContactUs";
// import ServicePolicy from "./Components/Pages/FooterPages/servicePolicy/ServicePolicy";
// import ExpertAdvice from "./Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice";
// import FunFact from "./Components/Pages/FooterPages/FunFact/FunFact";
// // new changes here
// import ContinueWithEmail from "./Components/Pages/Auth/ContinueWithEmail/index";
// import ContimueWithMobile from "./Components/Pages/Auth/ContimueWithMobile/index";
// import LoginWithEmail from "./Components/Pages/Auth/LoginWithEmail/LoginWithEmail";
// import Register from "./Components/Pages/Auth/Registretion/index";

// import LoginWithEmailCode from "./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode";
// import LoginWithMobileCode from "./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode";
// import LoginOption from "./Components/Pages/Auth/LoginOption/LoginOption";

// import Wishlist from "./Components/Pages/Wishlist/Wishlist";
// import PageNotFound from "./Components/Pages/404Page/PageNotFound";
// import Delivery from "./Components/Pages/OrderFlow/DeliveryPage/Delivery";
// import Payment from "./Components/Pages/OrderFlow/PaymentPage/Payment";
// import Confirmation from "./Components/Pages/OrderFlow/ConfirmationPage/Confirmation";
// import ForgotPass from "./Components/Pages/Auth/forgotPass/ForgotPass";
// import Header2 from "./Components/Pages/Home/Header/Header2";
// import Account from "./Components/Pages/Account/Account";
// import Lookbook from "./Components/Pages/Home/LookBook/Lookbook";
// import Footer from "./Components/Pages/Home/Footer/Footer";
// import ProcatAppChatMenu from "./Components/Pages/Home/ChatMenu/ProcatAppChatMenu";
// import AboutUs from "./Components/Pages/Static/AboutUs/AboutUs";
// import TermsCondition from "./Components/Pages/Static/TermsPolicy/TermsPolicy";
// import PrivacyPolicy from "./Components/Pages/Static/PrivacyPolicy/PrivacyPolicy";
// import AboutUs2 from "./Components/Pages/Static/AboutUs/AboutUs2";
// import RefundPolicy from "./Components/Pages/Static/RefundPolicy/RefundPolicy";
// import ShippingPolicy from "./Components/Pages/Static/ShippingPolicy/ShippingPolicy";
// import ConnectionManager from "../../utils/SoketConnection/ConnectionManager";

import ContinueWithEmail from "./Components/Pages/Auth/ContinueWithEmail/index";
import ContimueWithMobile from "./Components/Pages/Auth/ContimueWithMobile/index";
import LoginWithEmail from "./Components/Pages/Auth/LoginWithEmail/LoginWithEmail";
import Register from "./Components/Pages/Auth/Registretion/index";
import LoginWithEmailCode from "./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode";
import LoginOption from "./Components/Pages/Auth/LoginOption/LoginOption";
import ForgotPass from "./Components/Pages/Auth/forgotPass/ForgotPass";
import useGlobalPreventSave from "../../utils/Glob_Functions/useGlobalPreventSave";

const ProductDetail = lazy(() => import("./Components/Pages/Product/ProductDetail/ProductDetail"));
const ContactUs = lazy(() => import("./Components/Pages/FooterPages/contactUs/ContactUs"));
const ServicePolicy = lazy(() => import("./Components/Pages/FooterPages/servicePolicy/ServicePolicy"));
const ExpertAdvice = lazy(() => import("./Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice"));
const FunFact = lazy(() => import("./Components/Pages/FooterPages/FunFact/FunFact"));

// New changes here

const LoginWithMobileCode = lazy(() => import("./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode"));

const Wishlist = lazy(() => import("./Components/Pages/Wishlist/Wishlist"));
const PageNotFound = lazy(() => import("./Components/Pages/404Page/PageNotFound"));
const Delivery = lazy(() => import("./Components/Pages/OrderFlow/DeliveryPage/Delivery"));
const Payment = lazy(() => import("./Components/Pages/OrderFlow/PaymentPage/Payment"));
const Confirmation = lazy(() => import("./Components/Pages/OrderFlow/ConfirmationPage/Confirmation"));

const Header2 = lazy(() => import("./Components/Pages/Home/Header/Header2"));
const Account = lazy(() => import("./Components/Pages/Account/Account"));
const Lookbook = lazy(() => import("./Components/Pages/Home/LookBook/Lookbook"));
const Footer = lazy(() => import("./Components/Pages/Home/Footer/Footer"));
const ProcatAppChatMenu = lazy(() => import("./Components/Pages/Home/ChatMenu/ProcatAppChatMenu"));

const AboutUs = lazy(() => import("./Components/Pages/Static/AboutUs/AboutUs"));
const TermsCondition = lazy(() => import("./Components/Pages/Static/TermsPolicy/TermsPolicy"));
const PrivacyPolicy = lazy(() => import("./Components/Pages/Static/PrivacyPolicy/PrivacyPolicy"));
const AboutUs2 = lazy(() => import("./Components/Pages/Static/AboutUs/AboutUs2"));
const RefundPolicy = lazy(() => import("./Components/Pages/Static/RefundPolicy/RefundPolicy"));
const ShippingPolicy = lazy(() => import("./Components/Pages/Static/ShippingPolicy/ShippingPolicy"));
const ConnectionManager = lazy(() => import("../../utils/SoketConnection/ConnectionManager"));
const ProductList = React.lazy(() => import("./Components/Pages/Product/ProductList/ProductList"));

const Procatalog_App = () => {
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(proCat_loginState);
  const location = useLocation();
  const islogin = useRecoilValue(proCat_loginState);
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");

  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [companyTitleLogo, setCompanyTitleLogo] =
    useRecoilState(proCat_companyLogo);
  const [companyTitleLogoM, setCompanyTitleLogoM] =
    useRecoilState(proCat_companyLogoM);
  const [htmlContent, setHtmlContent] = useState("");
  const [localData, setLocalData] = useState();

  useGlobalPreventSave();

  useEffect(() => {
    sessionStorage.removeItem("Countrycodestate")
    fetch(`${storInitDataPath()}/StoreInit.json`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON.parse(text);
          setHtmlContent(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${storImagePath()}/ColorTheme.txt`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const styleTag = document.createElement("style");
          styleTag.type = "text/css";
          styleTag.innerHTML = text;
          document.head.appendChild(styleTag);
        } catch (error) {
          console.error("Error processing the text file:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

  useEffect(() => {
    if (htmlContent) {
      setLocalData((prevData) => ({
        ...prevData,
        Headerno: htmlContent?.rd[0]?.Headerno,
        BrowserTitle: htmlContent.BrowserTitle,
      }));
    }
  }, [htmlContent]);

  useEffect(() => {
    // let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    // let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setCompanyTitleLogo(storeinit?.companylogo);
    setCompanyTitleLogoM(storeinit?.companyMlogo);

  }, []);


  // Rember me code 

  useEffect(() => {
    let savedToken = getLocalStorageValue('AuthToken');
    let VerifiedToken = verifyToken(savedToken)
    const cookieValue = Cookies.get("userLoginCookie");
    if (VerifiedToken?.status === "authorized") {
      LoginWithEmailAPI("", "", "", "", cookieValue || VerifiedToken?.data?.cookie)
        .then((response) => {
          if (response?.Data?.rd[0]?.stat === 1) {
            Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token);
            setIsLoginState(true);
            sessionStorage.setItem("LoginUser", true);
            sessionStorage.setItem(
              "loginUserDetail",
              JSON.stringify(response.Data.rd[0])
            );
            console.log(redirectEmailUrl, "redirectEmailUrl")
            if (redirectEmailUrl) {
              navigation(redirectEmailUrl);
            } else if (location.pathname.startsWith("/accountdwsr")) {
              navigation("/accountdwsr");
            }
            else if (location?.pathname === sessionStorage.getItem("previousUrl")) {
              navigation(sessionStorage.getItem("previousUrl"));
            }
            //  else {
            //   navigation("/")
            // }
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoginState(false);
      sessionStorage.setItem("LoginUser", false);
      sessionStorage.setItem("loginUserDetail", JSON.stringify({}))
    }

    if (!islogin) {
      if (location.pathname !== "/") {
        sessionStorage.setItem("previousUrl", location.pathname);
      }
    }

    let localD = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localD);
  }, []);

  // old code
  // useEffect(() => {
  //   const cookieValue = Cookies.get("userLoginCookie");
  //   if (cookieValue && islogin === false) {
  //     LoginWithEmailAPI("", "", "", "", cookieValue)
  //       .then((response) => {
  //         if (response?.Data?.rd[0]?.stat === 1) {
  //           Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token);
  //           setIsLoginState(true);
  //           sessionStorage.setItem("LoginUser", true);
  //           sessionStorage.setItem(
  //             "loginUserDetail",
  //             JSON.stringify(response.Data.rd[0])
  //           );
  //           if (redirectEmailUrl) {
  //             navigation(redirectEmailUrl);
  //           } else if (location.pathname.startsWith("/accountdwsr")) {
  //             navigation("/accountdwsr");
  //           }
  //           else if (location?.pathname === sessionStorage.getItem("previousUrl")) {
  //             navigation(sessionStorage.getItem("previousUrl"));
  //           } else {
  //             navigation("/")
  //           }
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }

  //   if (!islogin) {
  //     if (location.pathname !== "/") {
  //       sessionStorage.setItem("previousUrl", location.pathname);
  //     }
  //   }

  //   let localD = JSON.parse(sessionStorage.getItem("storeInit"));
  //   setLocalData(localD);
  // }, [islogin, location.pathname, redirectEmailUrl, navigation]);

  if (islogin === true) {
    const restrictedPaths = [
      "/LoginOption",
      "/ContinueWithEmail",
      "/ContinueWithMobile",
      "/LoginWithEmailCode",
      "/LoginWithMobileCode",
      "/ForgotPass",
      "/LoginWithEmail",
      "/register",
    ];

    if (restrictedPaths?.some((path) => location.pathname.startsWith(path))) {
      return navigation("/");
    }
  }

  const LoadingFallback = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <CircularProgress sx={{ color: 'rgba(255, 87, 34, 0.8)' }} />
      {/* <img
        src={loaderImg1}
        alt="Loading..."
        height="100%"
        width="auto"
        loading="lazy"
        style={{
          animation: 'scaleUpDown 1.5s ease-in-out infinite', // Apply the animation here
        }}
      /> */}
    </Box>
  );

  return (
    <div className="setFullThemeBack">
      <Suspense fallback={<LoadingFallback />}>
        {localData?.Headerno === 1 && <Header />}
        {localData?.Headerno === 2 && <Header2 />}
        <ConnectionManager />
        {/* <ProcatAppChatMenu /> */}
        <div className="proCatMinHeightSet">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginOption" element={<LoginOption />} />
            <Route path="/ContinueWithEmail" element={<ContinueWithEmail />} />
            {/* Changes here */}
            {(!htmlContent?.rd?.[0]?.IsWebMobileLoginOff || htmlContent?.rd?.[0]?.IsWebMobileLoginOff === 0) && <Route path="/ContimueWithMobile" element={<ContimueWithMobile />} />}
            <Route path="/LoginWithEmailCode" element={<LoginWithEmailCode />} />
            {(!htmlContent?.rd?.[0]?.IsWebMobileLoginOff || htmlContent?.rd?.[0]?.IsWebMobileLoginOff === 0) && <Route
              path="/LoginWithMobileCode"
              element={<LoginWithMobileCode />}
            />}
            <Route path="/ForgotPass" element={<ForgotPass />} />
            <Route path="/LoginWithEmail" element={<LoginWithEmail />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/ContactUs" element={<ContactUs />} /> */}
            {/* <Route path="/servicePolicy" element={<ServicePolicy />} /> */}
            <Route path="/ExpertAdvice" element={<ExpertAdvice />} />
            {/* <Route path="/FunFact" element={<FunFact />} /> */}
            {/* <Route path="/Lookbook" element={<Lookbook />} /> */}
            <Route path="/aboutUs" element={<AboutUs2 />} />
            <Route path="/privacy-policy" element={<TermsCondition />} />
            <Route path="/terms-and-conditions" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />

            <Route
              path="/"
              element={<ProCat_PrivateRoutes isLoginStatus={islogin} />}
            >
              <Route path="/p/*" element={<Suspense fallback={<></>}><ProductList /></Suspense>} />
              <Route path="/d/*" element={<ProductDetail />} />
              <Route path="/cartPage" element={<Cart />} />
              <Route path="/myWishList" element={<Wishlist />} />
              <Route path="/Delivery" element={<Delivery />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/Confirmation" element={<Confirmation />} />
              <Route path="/account" element={<Account />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
        <div>
          <p
            style={{
              paddingBlock: "30px",
              margin: "0px",
              textAlign: "center",
              color: "black",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "1px",
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            BACK TO TOP
          </p>
        </div>
      </Suspense >
    </div>
  );
};

export default memo(Procatalog_App);
