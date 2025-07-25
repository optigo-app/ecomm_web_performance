import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import './Components/scss/variable.scss';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import PrivateRoutes from "./PrivateRoutes";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import loaderImg from './Components/Assets/webLogo.png';
import loaderImg1 from './Components/Assets/varaLogo.png';
import loaderImg2 from './Components/Assets/pacificLogo.png';
import loaderImg3 from './Components/Assets/ojasviLogo.png';
import loaderImg4 from './Components/Assets/shinjiniLogo.png';
import { roop_CartNo, roop_companyLogo, roop_loginState } from "./Components/Recoil/atom";
import { storImagePath, storInitDataPath } from "../../utils/Glob_Functions/GlobalFunction";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import AboutUsVara from './Components/Pages/static/AboutUs/AboutUsVara';
// import BrandsComponent from './Components/Pages/Home/BrandComponent/BrandComponents';
import PrivacyPolicy from './Components/Pages/static/PrivacyPolicy/PrivacyPolicy';
// import AXboutUs from './Components/Pages/aboutUs/AQbout';


// import Home from "./Components/Pages/Home/Index";
// import Header from "./Components/Pages/Home/Header/Header";
import Cart from "./Components/Pages/Cart/CartMain";
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
import Wishlist from "./Components/Pages/Wishlist/Wishlist";
// import PageNotFound from "./Components/Pages/404Page/PageNotFound";
// import Delivery from "./Components/Pages/OrderFlow/DeliveryPage/Delivery";
// import Payment from "./Components/Pages/OrderFlow/PaymentPage/Payment";
// import Confirmation from "./Components/Pages/OrderFlow/ConfirmationPage/Confirmation";
// import ForgotPass from "./Components/Pages/Auth/forgotPass/ForgotPass";
// import Header2 from "./Components/Pages/Home/Header/Header2";
import Account from "./Components/Pages/Account/Account";
// import AXboutUs from './Components/Pages/aboutUs/AQbout';
import { Box, CircularProgress } from '@mui/material';
// import Lookbook from "./Components/Pages/Home/LookBook/Lookbook";
// import ScrollToTop from "../DaimondTine/Components/Pages/ScrollToTop ";
// import StamScrollToTop from "./Components/Pages/BackToTop/StamScrollToTop";
// import Footer from "./Components/Pages/Home/Footer/Footer";

import LoginOption from "./Components/Pages/Auth/LoginOption/LoginOption";
import ContinueWithEmail from "./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail";
import LoginWithEmail from "./Components/Pages/Auth/LoginWithEmail/LoginWithEmail";
import Register from "./Components/Pages/Auth/Registretion/Register";
import ContimueWithMobile from "./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile";
import LoginWithEmailCode from "./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode";
import LoginWithMobileCode from "./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode";
import ForgotPass from "./Components/Pages/Auth/forgotPass/ForgotPass";
import useGlobalPreventSave from '../../utils/Glob_Functions/useGlobalPreventSave';

const Home = lazy(() => import("./Components/Pages/Home/Index"));
const Header = lazy(() => import("./Components/Pages/Home/Header/Header"));
// const Cart = lazy(() => import("./Components/Pages/Cart/CartMain"));
const ProductList = lazy(() => import("./Components/Pages/Product/ProductList/ProductList"));
const ProductDetail = lazy(() => import("./Components/Pages/Product/ProductDetail/ProductDetail"));
const ContactUs = lazy(() => import("./Components/Pages/FooterPages/contactUs/ContactUs"));
// const ServicePolicy = lazy(() => import("./Components/Pages/FooterPages/servicePolicy/ServicePolicy"));
// const ExpertAdvice = lazy(() => import("./Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice"));
// const FunFact = lazy(() => import("./Components/Pages/FooterPages/FunFact/FunFact"));
const AboutUs = lazy(() => import("./Components/Pages/aboutUs/AboutUs"));
const AXboutUs = lazy(() => import("./Components/Pages/aboutUs/AQbout"));
// const Wishlist = lazy(() => import("./Components/Pages/Wishlist/Wishlist"));
const PageNotFound = lazy(() => import("./Components/Pages/404Page/PageNotFound"));
const Delivery = lazy(() => import("./Components/Pages/OrderFlow/DeliveryPage/Delivery"));
const Payment = lazy(() => import("./Components/Pages/OrderFlow/PaymentPage/Payment"));
const Confirmation = lazy(() => import("./Components/Pages/OrderFlow/ConfirmationPage/Confirmation"));
const Header2 = lazy(() => import("./Components/Pages/Home/Header/Header2"));
// const Account = lazy(() => import("./Components/Pages/Account/Account"));
const Lookbook = lazy(() => import("./Components/Pages/Home/LookBook/Lookbook"));
// const ScrollToTop = lazy(() => import("../DaimondTine/Components/Pages/ScrollToTop "));
const StamScrollToTop = lazy(() => import("./Components/Pages/BackToTop/StamScrollToTop"));
const Footer = lazy(() => import("./Components/Pages/Home/Footer/Footer"));
const ManagementTeam = lazy(() => import('./Components/Pages/static/Management/Management'));
const TermsAndConditions = lazy(() => import('./Components/Pages/static/TermsPage/TermsPage'));


const RoopJewellers_App = () => {
  const islogin = useRecoilValue(roop_loginState);
  const [localData, setLocalData] = useState();
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(roop_loginState);
  let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
  const setCartNo = useSetRecoilState(roop_CartNo);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(roop_companyLogo);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storInitDataPath()}/StoreInit.json`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON.parse(text);
          setHtmlContent(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return;
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
        return;
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
    setCartNo(3);
  }, []);

  useEffect(() => {
    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    setCompanyTitleLogo(webLogo);
  });

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  useGlobalPreventSave();

  useEffect(() => {
    const cookieValue = Cookies.get("userLoginCookie");
    if (cookieValue) {
      LoginWithEmailAPI("", "", "", "", cookieValue)
        .then((response) => {
          if (response.Data.rd[0].stat === 1) {
            Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token);
            setIsLoginState(true);
            sessionStorage.setItem("LoginUser", true);
            sessionStorage.setItem(
              "loginUserDetail",
              JSON.stringify(response.Data.rd[0])
            );
            if (redirectEmailUrl) {
              navigation(redirectEmailUrl);
            } else {
              // navigation("/");
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

  function ProductListWrapper() {
    return (
      <div onContextMenu={handleContextMenu}>
        <ProductList />
      </div>
    );
  }
  function ProductDetailWrapper() {
    return (
      <div onContextMenu={handleContextMenu}>
        <ProductDetail />
      </div>
    );
  }
  function WishlistWrapper() {
    return (
      <div onContextMenu={handleContextMenu}>
        <Wishlist />
      </div>
    );
  }
  function CartWrapper() {
    return (
      <div onContextMenu={handleContextMenu}>
        <Cart />
      </div>
    );
  }
  function LookbookWrapper() {
    return (
      <div onContextMenu={handleContextMenu}>
        <Lookbook />
      </div>
    );
  }

  const Vaara = 0;

  const Vara = Vaara == 0 ? <AXboutUs /> : <AboutUsVara />

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
        src={loaderImg4}
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
    <>
      <Suspense fallback={<>
        <LoadingFallback />
      </>}>
        <Helmet>
          <title>{localData?.BrowserTitle}</title>
        </Helmet>
        <div style={{ minHeight: '85vh' }} onContextMenu={(e) => e.preventDefault()}>
          {/* <div style={{ minHeight: '700px' }}> */}
          {localData?.Headerno === 1 && <Header />}
          {/* {localData?.Headerno === 2 && <Header2 />} */}
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

            {/* For sonsons, shinjini, pacific, ojasvi */}
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

            {/* For vara */}
            {/* <Route
              path="/ManagementTeam"
              element={<ManagementTeam />}
            /> */}
            <Route
              path="/terms-and-conditions"

              element={<TermsAndConditions />}
            />
            {/* For sonasons and vara */}
            <Route path="/aboutUs" element={Vara} />

            {/* For shinjini, Pacific, ojasvi */}
            {/* <Route path="/aboutUs" element={<AXboutUs />} /> */}
            {/* <Route path="/ExpertAdvice" element={<ExpertAdvice />} /> */}
            {/* <Route path="/FunFact" element={<FunFact />} /> */}
            <Route path="/" element={<PrivateRoutes isLoginStatus={islogin} />}>
              <Route path="/p/*" element={<ProductListWrapper />} />
              <Route path="/d/*" element={<ProductDetailWrapper />} />
              <Route path="/cartPage" element={<CartWrapper />} />
              <Route path="/myWishList" element={<WishlistWrapper />} />
              <Route path="/Delivery" element={<Delivery />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/Confirmation" element={<Confirmation />} />
              <Route path="/account" element={<Account />} />
              {storeinit?.IsDesignSetInMenu == 1 && (
                <Route path="/Lookbook" element={<LookbookWrapper />} />
              )}
            </Route>
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

        {/* For vara */}
        {/* {  location.pathname !== "/404" &&           <BrandsComponent/>} */}
        <StamScrollToTop />
      </Suspense>
    </>

  );
};

export default RoopJewellers_App;
