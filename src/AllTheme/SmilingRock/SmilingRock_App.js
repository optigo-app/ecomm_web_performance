import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Components/Pages/Home/Index";
import Header from "./Components/Pages/Home/Header/Header";
import Cart from "./Components/Pages/Cart/CartMain";
import LoginOption from "./Components/Pages/Auth/LoginOption/LoginOption";
import ContinueWithEmail from "./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail";
import LoginWithEmail from "./Components/Pages/Auth/LoginWithEmail/LoginWithEmail";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { companyLogo, companyLogoM, loginState, smr_companyLogo, smr_companyLogoM, smr_loginState } from "./Components/Recoil/atom";
import ProductList from "./Components/Pages/Product/ProductList/ProductList";
import ProductDetail from "./Components/Pages/Product/ProductDetail/ProductDetail";
import ContactUs from "./Components/Pages/FooterPages/contactUs/ContactUs";
import ServicePolicy from "./Components/Pages/FooterPages/servicePolicy/ServicePolicy";
import ExpertAdvice from "./Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice";
import FunFact from "./Components/Pages/FooterPages/FunFact/FunFact";
import Register from "./Components/Pages/Auth/Registretion/Register";
import ContimueWithMobile from "./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile";
import LoginWithEmailCode from "./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode";
import LoginWithMobileCode from "./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode";
import AboutUs from "./Components/Pages/aboutUs/AboutUs";
import Wishlist from "./Components/Pages/Wishlist/Wishlist";
import PageNotFound from "./Components/Pages/404Page/PageNotFound";
import PrivateRoutes from "./PrivateRoutes";
import { Helmet } from "react-helmet";
import Delivery from "./Components/Pages/OrderFlow/DeliveryPage/Delivery";
import Payment from "./Components/Pages/OrderFlow/PaymentPage/Payment";
import Confirmation from "./Components/Pages/OrderFlow/ConfirmationPage/Confirmation";
import ForgotPass from "./Components/Pages/Auth/forgotPass/ForgotPass";
import Header2 from "./Components/Pages/Home/Header/Header2";
import Account from "./Components/Pages/Account/Account";
import Cookies from "js-cookie";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import Lookbook from "./Components/Pages/Home/LookBook/Lookbook";
import NatualDiamond from "./Components/Pages/naturalDiamond/NaturalDiamond";
import { storImagePath, storInitDataPath } from "../../utils/Glob_Functions/GlobalFunction";
import DWSRprintComp from "./Components/Pages/Account/DWSRprintComp/DWSRprintComp";
import PaymentFailure from "../../utils/PaymentSuccessFail/PaymentFailure";
import TermsPolicy from './Components/Pages/FooterPages/TermsPolicy/TermsPolicy'

const SmilingRock_App = () => {
  const islogin = useRecoilValue(smr_loginState);
  console.log('islogin: ', islogin);
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(smr_loginState);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(smr_companyLogo);
  const [companyTitleLogoM, setCompanyTitleLogoM] = useRecoilState(smr_companyLogoM);
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
  });

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
            } else {
              navigation("/");
            }
          }
        })
        .catch((err) => console.log(err));
    }
    let localD = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localD);
  }, []);


  if (islogin === true) {
    const restrictedPaths = [
      '/LoginOption',
      '/ContinueWithEmail',
      '/ContinueWithMobile',
      '/LoginWithEmailCode',
      '/LoginWithMobileCode',
      '/ForgotPass',
      '/LoginWithEmail',
      '/register'
    ];

    if (restrictedPaths?.some(path => location.pathname.startsWith(path))) {
      return navigation("/");
    }
  }

  return (
    <>
      <Helmet>
        <title>{localData?.BrowserTitle}</title>
      </Helmet>
      {!location.pathname.startsWith('/accountdwsr') && <div>
        {localData?.Headerno == 1 && <Header />}
        {localData?.Headerno == 2 && <Header2 />}
      </div>}
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
        {/* <Route path="/servicePolicy" element={<ServicePolicy />} /> */}
        <Route path="/ExpertAdvice" element={<ExpertAdvice />} />

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
      </Routes>
    </>
  );
};

export default SmilingRock_App;
