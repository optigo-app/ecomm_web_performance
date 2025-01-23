import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { lazy } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import { storImagePath } from "../../utils/Glob_Functions/GlobalFunction";
import { mala_companyLogo, mala_companyLogoM, mala_loginState } from "./Components/Recoil/atom";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";

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
// import PrivateRoutes from "./PrivateRoutes";
// import Delivery from "./Components/Pages/OrderFlow/DeliveryPage/Delivery";
// import Payment from "./Components/Pages/OrderFlow/PaymentPage/Payment";
// import Confirmation from "./Components/Pages/OrderFlow/ConfirmationPage/Confirmation";
// import ForgotPass from "./Components/Pages/Auth/forgotPass/ForgotPass";
// import Header2 from "./Components/Pages/Home/Header/Header2";
// import Account from "./Components/Pages/Account/Account";
// import Lookbook from "./Components/Pages/Home/LookBook/Lookbook";
// import StamScrollToTop from "./Components/Pages/BackToTop/StamScrollToTop";
// import Footer from "./Components/Pages/Home/Footer/Footer";
// import TermsPolicy from "./Components/Pages/FooterPages/TermsPolicy/TermsPolicy";
// import PrivacyPolicy from "./Components/Pages/FooterPages/PrivacyPolicy/PrivacyPolicy";

import Home from "./Components/Pages/Home/Index";
import Header from "./Components/Pages/Home/Header/Header";
import Header2 from "./Components/Pages/Home/Header/Header2";
import Footer from "./Components/Pages/Home/Footer/Footer";
import PrivateRoutes from "./PrivateRoutes";
import PageNotFound from "./Components/Pages/404Page/PageNotFound";
import StamScrollToTop from "./Components/Pages/BackToTop/StamScrollToTop";
import { Suspense } from "react";

// Lazy load components that are not immediately needed
const Cart = lazy(() => import("./Components/Pages/Cart/CartMain"));
const LoginOption = lazy(() => import("./Components/Pages/Auth/LoginOption/LoginOption"));
const ContinueWithEmail = lazy(() => import("./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail"));
const LoginWithEmail = lazy(() => import("./Components/Pages/Auth/LoginWithEmail/LoginWithEmail"));
const ProductList = lazy(() => import("./Components/Pages/Product/ProductList/ProductList"));
const ProductDetail = lazy(() => import("./Components/Pages/Product/ProductDetail/ProductDetail"));
const ContactUs = lazy(() => import("./Components/Pages/FooterPages/contactUs/ContactUs"));
const ExpertAdvice = lazy(() => import("./Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice"));
const FunFact = lazy(() => import("./Components/Pages/FooterPages/FunFact/FunFact"));
const Register = lazy(() => import("./Components/Pages/Auth/Registretion/Register"));
const ContimueWithMobile = lazy(() => import("./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile"));
const LoginWithEmailCode = lazy(() => import("./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode"));
const LoginWithMobileCode = lazy(() => import("./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode"));
const AboutUs = lazy(() => import("./Components/Pages/aboutUs/AboutUs"));
const Wishlist = lazy(() => import("./Components/Pages/Wishlist/Wishlist"));
const Delivery = lazy(() => import("./Components/Pages/OrderFlow/DeliveryPage/Delivery"));
const Payment = lazy(() => import("./Components/Pages/OrderFlow/PaymentPage/Payment"));
const Confirmation = lazy(() => import("./Components/Pages/OrderFlow/ConfirmationPage/Confirmation"));
const ForgotPass = lazy(() => import("./Components/Pages/Auth/forgotPass/ForgotPass"));
const Account = lazy(() => import("./Components/Pages/Account/Account"));
const Lookbook = lazy(() => import("./Components/Pages/Home/LookBook/Lookbook"));
const TermsPolicy = lazy(() => import("./Components/Pages/FooterPages/TermsPolicy/TermsPolicy"));
const PrivacyPolicy = lazy(() => import("./Components/Pages/FooterPages/PrivacyPolicy/PrivacyPolicy"));



const MalakanJewels_App = () => {
  const islogin = useRecoilValue(mala_loginState);
  const [localData, setLocalData] = useState();
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(mala_loginState);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [htmlContent, setHtmlContent] = useState("");
  const mala_setCompanyTitleLogo = useSetRecoilState(mala_companyLogo)
  const mala_setCompanyTitleLogoM = useSetRecoilState(mala_companyLogoM)


  useEffect(() => {
    fetch(`${storImagePath()}/Store_Init.txt`)
      .then((response) => response?.text())
      .then((text) => {
        try {
          const jsonData = JSON?.parse(text);
          setHtmlContent(jsonData);
        } catch (error) {
          console.warn("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.warn("Error fetching the file:", error);
      });
  }, []);

  useEffect(() => {
    if (htmlContent) {
      setLocalData((prevData) => ({
        ...prevData,
        Headerno: htmlContent?.rd[0]?.Headerno,
      }));
    }
  }, [htmlContent]);

  useEffect(() => {
    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;

    mala_setCompanyTitleLogo(webLogo);
    mala_setCompanyTitleLogoM(mobileLogo);
  });

 
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
            } else {
              navigation("/");
            }
       
          }
        })
        .catch((err) => console.log(err));
    }


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

  return (
    <Suspense fallback={<></>}>
      <Helmet>
        <title>{localData?.BrowserTitle}</title>
      </Helmet>
      <div>
        {localData?.Headerno === 1 && <Header />}
        {localData?.Headerno === 2 && <Header2 />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/LoginOption"
            element={<LoginOption />}
          />
          <Route
            path="/ContinueWithEmail"
            element={<ContinueWithEmail />}
          />
          <Route
            path="/ContimueWithMobile"
            element={<ContimueWithMobile />}
          />
          <Route
            path="/LoginWithEmailCode"
            element={<LoginWithEmailCode />}
          />
          <Route
            path="/LoginWithMobileCode"
            element={<LoginWithMobileCode />}
          />
          <Route
            path="/ForgotPass"
            element={<ForgotPass />}
          />
          <Route
            path="/LoginWithEmail"
            element={<LoginWithEmail />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route path="/ContactUs" element={<ContactUs />} />
          {/* <Route path="/servicePolicy" element={<ServicePolicy />} /> */}
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsPolicy" element={<TermsPolicy />} />
          <Route path="/ExpertAdvice" element={<ExpertAdvice />} />
          <Route path="/FunFact" element={<FunFact />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/" element={<PrivateRoutes isLoginStatus={islogin} />}>
            <Route path="/p/*" element={<ProductList />} />
            <Route path="/d/*" element={<ProductDetail />} />
            <Route path="/cartPage" element={<Cart />} />
            <Route path="/myWishList" element={<Wishlist />} />
            <Route path="/Delivery" element={<Delivery />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Confirmation" element={<Confirmation />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/Lookbook" element={<Lookbook />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      {
        (location.pathname != "payment") ||
          (location.pathname != "Delivery") ||
          (location.pathname != "Confirmation") ?
          <Footer />
          :
          ''
      }
      <StamScrollToTop />
    </Suspense>
  );
};

export default MalakanJewels_App;
