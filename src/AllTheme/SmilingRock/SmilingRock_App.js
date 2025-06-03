import React, { memo, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import './Components/scss/variable.scss';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  companyLogo,
  companyLogoM,
  loginState,
  smr_companyLogo,
  smr_companyLogoM,
  smr_loginState,
} from "./Components/Recoil/atom";
import PrivateRoutes from "./PrivateRoutes";
import loaderImg from './Components/Assets/webLogo.png';
import {
  storImagePath,
  storInitDataPath,
} from "../../utils/Glob_Functions/GlobalFunction";
import usePromotionalBanner from "./Components/hook/usePromotionBanner";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import { Box } from "@mui/material";
// import Home from "./Components/Pages/Home/Index";
// import Header from "./Components/Pages/Home/Header/Header";
// import Cart from "./Components/Pages/Cart/CartMain";
// import LoginOption from "./Components/Pages/Auth/LoginOption/LoginOption";
// import ContinueWithEmail from "./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail";
// import LoginWithEmail from "./Components/Pages/Auth/LoginWithEmail/LoginWithEmail";
// import ProductList from "./Components/Pages/Product/ProductList/ProductList";
// import ProductDetail from "./Components/Pages/Product/ProductDetail/ProductDetail";
// import ContactUs from "./Components/Pages/FooterPages/contactUs/ContactUs";
// import ServicePolicy from "./Components/Pages/FooterPages/servicePolicy/ServicePolicy";
// import ExpertAdvice from "./Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice";
// import FunFact from "./Components/Pages/FooterPages/FunFact/FunFact";
// import Register from "./Components/Pages/Auth/Registretion/Register";
// import ContimueWithMobile from "./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile";
// import LoginWithEmailCode from "./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode";
// import LoginWithMobileCode from "./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode";
// import AboutUs from "./Components/Pages/aboutUs/AboutUs";
// import Wishlist from "./Components/Pages/Wishlist/Wishlist";
// import PageNotFound from "./Components/Pages/404Page/PageNotFound";
// import Delivery from "./Components/Pages/OrderFlow/DeliveryPage/Delivery";
// import Payment from "./Components/Pages/OrderFlow/PaymentPage/Payment";
// import Confirmation from "./Components/Pages/OrderFlow/ConfirmationPage/Confirmation";
// import ForgotPass from "./Components/Pages/Auth/forgotPass/ForgotPass";
// import Header2 from "./Components/Pages/Home/Header/Header2";
// import Account from "./Components/Pages/Account/Account";
// import Lookbook from "./Components/Pages/Home/LookBook/Lookbook";
// import NatualDiamond from "./Components/Pages/naturalDiamond/NaturalDiamond";
// import DWSRprintComp from "./Components/Pages/Account/DWSRprintComp/DWSRprintComp";
// import PaymentFailure from "../../utils/PaymentSuccessFail/PaymentFailure";
// import TermsPolicy from "./Components/Pages/FooterPages/TermsPolicy/TermsPolicy";
// import Bespoke from "./Components/Pages/Home/Bespokejewelry/Index";
// import Wrapper from "./Components/Pages/Home/Appointment/Wrapper";
// import TermsData from "./Components/Pages/FooterPages/TermsPolicy/Terms";
// import PrivacyPolicy from "./Components/Pages/FooterPages/PrivacyPolicy/PrivacyPolicy";
// import TermsAndConditions from "./Components/Pages/FooterPages/TermsPage/TermsPage";
// import PromotionalBanner from "./Components/Pages/Home/PromotionBanner/PromotionBanner";
// import FooterNew from "./Components/Pages/Home/Footer/New/FooterNew";
// import WhatsAppChat from './Components/Pages/Home/ChatMenu/ChatMenu';
// import HomePageBlock1 from "./Components/Pages/Home/HomePageBlocks/Block1/HomePageBlock1";
// import HomePageBlock2 from "./Components/Pages/Home/HomePageBlocks/Block2/HomePageBlock2";
// import PrintPageCard from "./Components/Pages/Cart/PrintCartPage";

const Home = React.lazy(() => import('./Components/Pages/Home/Index'));
const Header = React.lazy(() => import('./Components/Pages/Home/Header/Header'));
const Cart = React.lazy(() => import('./Components/Pages/Cart/CartMain'));
const LoginOption = React.lazy(() => import('./Components/Pages/Auth/LoginOption/LoginOption'));
const ContinueWithEmail = React.lazy(() => import('./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'));
const LoginWithEmail = React.lazy(() => import('./Components/Pages/Auth/LoginWithEmail/LoginWithEmail'));
const ProductList = React.lazy(() => import('./Components/Pages/Product/ProductList/ProductList'));
const ProductDetail = React.lazy(() => import('./Components/Pages/Product/ProductDetail/ProductDetail'));
const ContactUs = React.lazy(() => import('./Components/Pages/FooterPages/contactUs/ContactUs'));
const ServicePolicy = React.lazy(() => import('./Components/Pages/FooterPages/servicePolicy/ServicePolicy'));
const ExpertAdvice = React.lazy(() => import('./Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice'));
const FunFact = React.lazy(() => import('./Components/Pages/FooterPages/FunFact/FunFact'));
const Register = React.lazy(() => import('./Components/Pages/Auth/Registretion/Register'));
const ContimueWithMobile = React.lazy(() => import('./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile'));
const LoginWithEmailCode = React.lazy(() => import('./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode'));
const LoginWithMobileCode = React.lazy(() => import('./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode'));
const AboutUs = React.lazy(() => import('./Components/Pages/aboutUs/AboutUs'));
const Wishlist = React.lazy(() => import('./Components/Pages/Wishlist/Wishlist'));
const PageNotFound = React.lazy(() => import('./Components/Pages/404Page/PageNotFound'));
const Delivery = React.lazy(() => import('./Components/Pages/OrderFlow/DeliveryPage/Delivery'));
const Payment = React.lazy(() => import('./Components/Pages/OrderFlow/PaymentPage/Payment'));
const Confirmation = React.lazy(() => import('./Components/Pages/OrderFlow/ConfirmationPage/Confirmation'));
const ForgotPass = React.lazy(() => import('./Components/Pages/Auth/forgotPass/ForgotPass'));
const Header2 = React.lazy(() => import('./Components/Pages/Home/Header/Header2'));
const Account = React.lazy(() => import('./Components/Pages/Account/Account'));
const Lookbook = React.lazy(() => import('./Components/Pages/Home/LookBook/Lookbook'));
const NatualDiamond = React.lazy(() => import('./Components/Pages/naturalDiamond/NaturalDiamond'));
const DWSRprintComp = React.lazy(() => import('./Components/Pages/Account/DWSRprintComp/DWSRprintComp'));
const PaymentFailure = React.lazy(() => import('../../utils/PaymentSuccessFail/PaymentFailure'));
const TermsPolicy = React.lazy(() => import('./Components/Pages/FooterPages/TermsPolicy/TermsPolicy'));
const Bespoke = React.lazy(() => import('./Components/Pages/Home/Bespokejewelry/Index'));
const Wrapper = React.lazy(() => import('./Components/Pages/Home/Appointment/Wrapper'));
const TermsData = React.lazy(() => import('./Components/Pages/FooterPages/TermsPolicy/Terms'));
const PrivacyPolicy = React.lazy(() => import('./Components/Pages/FooterPages/PrivacyPolicy/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./Components/Pages/FooterPages/TermsPage/TermsPage'));
const PromotionalBanner = React.lazy(() => import('./Components/Pages/Home/PromotionBanner/PromotionBanner'));
const FooterNew = React.lazy(() => import('./Components/Pages/Home/Footer/New/FooterNew'));
const WhatsAppChat = React.lazy(() => import('./Components/Pages/Home/ChatMenu/ChatMenu'));
const HomePageBlock1 = React.lazy(() => import('./Components/Pages/Home/HomePageBlocks/Block1/HomePageBlock1'));
const HomePageBlock2 = React.lazy(() => import('./Components/Pages/Home/HomePageBlocks/Block2/HomePageBlock2'));
const PrintPageCard = React.lazy(() => import('./Components/Pages/Cart/PrintCartPage'));

const SmilingRock_App = () => {
  const { openPromotionalBanner, handleCloseBanner } = usePromotionalBanner();
  const islogin = useRecoilValue(smr_loginState);
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(smr_loginState);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [companyTitleLogo, setCompanyTitleLogo] =
    useRecoilState(smr_companyLogo);
  const [companyTitleLogoM, setCompanyTitleLogoM] =
    useRecoilState(smr_companyLogoM);
  const [htmlContent, setHtmlContent] = useState("");
  const [localData, setLocalData] = useState();

  const setCSSVariable = () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  };

  useEffect(() => {
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
    if (htmlContent) {
      setLocalData((prevData) => ({
        ...prevData,
        Headerno: htmlContent?.rd[0]?.Headerno,
        BrowserTitle: htmlContent.BrowserTitle,
      }));
    }
  }, [htmlContent]);

  useEffect(() => {
    setCSSVariable();
    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;

    setCompanyTitleLogo(webLogo);
    setCompanyTitleLogoM(mobileLogo);
    // if (Logindata) {
    //   if (Logindata?.IsPLWOn == 1) {
    //     setCompanyTitleLogo(Logindata?.Private_label_logo);
    //     setCompanyTitleLogoM()
    //   } else {
    //     setCompanyTitleLogo(logo?.companylogo);
    //     setCompanyTitleLogoM(logo?.companyMlogo)
    //   }
    // } else {
    //   setCompanyTitleLogo(logo?.companylogo);
    //   setCompanyTitleLogoM(logo?.companyMlogo)
    // }
  }, []);

  useEffect(() => {
    const cookieValue = Cookies.get("userLoginCookie");
    if (cookieValue && islogin == false) {
      LoginWithEmailAPI("", "", "", "", cookieValue)
        .then((response) => {
          if (response?.Data?.rd[0]?.stat === 1) {
            Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token);
            setIsLoginState(true);
            sessionStorage.setItem("LoginUser", true);
            sessionStorage.setItem("loginUserDetail", JSON.stringify(response.Data.rd[0]));
            if (redirectEmailUrl) {
              navigation(redirectEmailUrl);
            } else if (location.pathname.startsWith('/accountdwsr')) {
              navigation("/accountdwsr");
            }
            else {
              // navigation("/");
            }
          }
        })
        .catch((err) => console.log(err));
    }
    let localD = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localD);
  }, []);


  // if (islogin === true) {
  //   const restrictedPaths = [
  //     '/LoginOption',
  //     '/ContinueWithEmail',
  //     '/ContinueWithMobile',
  //     '/LoginWithEmailCode',
  //     '/LoginWithMobileCode',
  //     '/ForgotPass',
  //     '/LoginWithEmail',
  //     '/register'
  //   ];

  //   if (restrictedPaths?.some(path => location.pathname.startsWith(path))) {
  //     return navigation("/");
  //   }
  // }

  useEffect(() => {
    const cookieValue = Cookies.get("userLoginCookie");
    if (cookieValue && islogin === false) {
      LoginWithEmailAPI("", "", "", "", cookieValue)
        .then((response) => {
          if (response?.Data?.rd[0]?.stat === 1) {
            Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token);
            setIsLoginState(true);
            sessionStorage.setItem("LoginUser", true);
            sessionStorage.setItem(
              "loginUserDetail",
              JSON.stringify(response.Data.rd[0])
            );
            if (redirectEmailUrl) {
              navigation(redirectEmailUrl);
            } else if (location.pathname.startsWith("/accountdwsr")) {
              navigation("/accountdwsr");
            }
            else {
              // navigation("/");
            }

            // else if (sessionStorage.getItem("previousUrl")) {
            //   navigation(sessionStorage.getItem("previousUrl"));
            // } else {
            //   navigation("/");
            // }
          }
        })
        .catch((err) => console.log(err));
    }

    // if (!islogin) {
    //   if (location.pathname !== "/") {
    //     sessionStorage.setItem("previousUrl", location.pathname);
    //   }
    // }

    let localD = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localD);
  }, [islogin, location.pathname, redirectEmailUrl, navigation]);

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
      {/* <CircularProgress sx={{ color: 'rgba(255, 87, 34, 0.8)' }} /> */}
      <img
        src={loaderImg}
        alt="Loading..."
        height="100%"
        width="auto"
        loading="lazy"
        style={{
          animation: 'scaleUpDown 1.5s ease-in-out infinite', // Apply the animation here
        }}
      />
    </Box>
  );

  return (
    <div div className="ggg">
      <Helmet>{/* <title>{localData?.BrowserTitle}</title> */}</Helmet>
      {openPromotionalBanner && (
        <PromotionalBanner
          disablescreen={openPromotionalBanner}
          onClose={handleCloseBanner}
        />
      )}
      <Suspense fallback={<LoadingFallback />}>
        {(!location.pathname.startsWith("/accountdwsr") && !location.pathname.startsWith("/block1") && !location.pathname.startsWith("/block2")) && (
          <div>
            {localData?.Headerno == 1 && <Header />}
            {localData?.Headerno == 2 && <Header2 />}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/LoginOption"
            element={
              <div className="smr_authFlowBakcColor">
                <LoginOption />
              </div>
            }
          />
          <Route
            path="/ContinueWithEmail"
            element={
              <div className="smr_authFlowBakcColor">
                <ContinueWithEmail />
              </div>
            }
          />
          {/* Maiora not needed */}
          {/* for kAYRA CRAETEION NEEDED */}

          <Route
            path="/ContimueWithMobile"
            element={
              <div className="smr_authFlowBakcColor">
                <ContimueWithMobile />
              </div>
            }
          />
          <Route
            path="/LoginWithEmailCode"
            element={
              <div className="smr_authFlowBakcColor">
                <LoginWithEmailCode />
              </div>
            }
          />
          {/* Maiora not needed */}
          {/* for kAYRA CRAETEION NEEDED */}

          <Route
            path="/LoginWithMobileCode"
            element={
              <div className="smr_authFlowBakcColor">
                <LoginWithMobileCode />
              </div>
            }
          />
          <Route
            path="/ForgotPass"
            element={
              <div className="smr_authFlowBakcColor">
                <ForgotPass />
              </div>
            }
          />
          <Route
            path="/LoginWithEmail"
            element={
              <div className="smr_authFlowBakcColor">
                <LoginWithEmail />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="smr_authFlowBakcColor">
                <Register />
              </div>
            }
          />
          <Route path="/ContactUs" element={<ContactUs />} />
          {/* Maiora needed servicePolicy */}
          {/* Kayra not needed */}
          {/* sonasons needed */}
          <Route path="/servicePolicy" element={<ServicePolicy />} />
          <Route path="/ExpertAdvice" element={<ExpertAdvice />} />
          <Route path="/bespoke-jewelry" element={<Bespoke />} />
          <Route path="/appointment" element={<Wrapper />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

          {/* Maiora not needed fun facts */}
          {/* Kayra needed */}
          <Route path="/FunFact" element={<FunFact />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/TermsPolicy" element={<TermsPolicy />} />
          <Route path="/natural-diamond" element={<NatualDiamond />} />
          <Route path="/" element={<PrivateRoutes isLoginStatus={islogin} />}>
            <Route path="/p/*" element={<ProductList />} />
            <Route path="/d/*" element={<ProductDetail />} />
            <Route path="/cartPage" element={<Cart />} />
            <Route path="/myWishList" element={<Wishlist />} />
            <Route path="/Delivery" element={<Delivery />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Confirmation" element={<Confirmation />} />
            <Route path="/account" element={<Account />} />
            {/* <Route path="/accountdwsr" element={<DWSRprintComp />} /> */}
          </Route>
          <Route path="/accountdwsr" element={<DWSRprintComp />} />
          <Route path="/Lookbook" element={<Lookbook />} />
          <Route path="/paymentFailure" element={<PaymentFailure />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/block1" element={<HomePageBlock1 />} />
          <Route path="/block2" element={<HomePageBlock2 />} />
        </Routes>
        {(
          !location.pathname.startsWith("/block1") &&
          !location.pathname.startsWith("/block2")
        ) && <FooterNew />}
      </Suspense>
      <WhatsAppChat phoneNo='9099887762' />
    </div>
  );
};

export default memo(SmilingRock_App);
