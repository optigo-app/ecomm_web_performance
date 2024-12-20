import React, { Suspense, lazy,useState,useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import PrivateRoutes from "./PrivateRoutes";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import { roop_CartNo, roop_companyLogo, roop_loginState } from "./Components/Recoil/atom";
import { storImagePath } from "../../utils/Glob_Functions/GlobalFunction";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import AboutUsVara from './Components/Pages/static/AboutUs/AboutUsVara';
import BrandsComponent from './Components/Pages/Home/BrandComponent/BrandComponents';
import PrivacyPolicy from './Components/Pages/static/PrivacyPolicy/PrivacyPolicy';
import AXboutUs from './Components/Pages/aboutUs/AQbout';


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
// import ScrollToTop from "../DaimondTine/Components/Pages/ScrollToTop ";
// import StamScrollToTop from "./Components/Pages/BackToTop/StamScrollToTop";
// import Footer from "./Components/Pages/Home/Footer/Footer";

const Home = lazy(() => import("./Components/Pages/Home/Index"));
const Header = lazy(() => import("./Components/Pages/Home/Header/Header"));
const Cart = lazy(() => import("./Components/Pages/Cart/CartMain"));
const LoginOption = lazy(() => import("./Components/Pages/Auth/LoginOption/LoginOption"));
const ContinueWithEmail = lazy(() => import("./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail"));
const LoginWithEmail = lazy(() => import("./Components/Pages/Auth/LoginWithEmail/LoginWithEmail"));
const ProductList = lazy(() => import("./Components/Pages/Product/ProductList/ProductList"));
const ProductDetail = lazy(() => import("./Components/Pages/Product/ProductDetail/ProductDetail"));
const ContactUs = lazy(() => import("./Components/Pages/FooterPages/contactUs/ContactUs"));
const ServicePolicy = lazy(() => import("./Components/Pages/FooterPages/servicePolicy/ServicePolicy"));
const ExpertAdvice = lazy(() => import("./Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice"));
const FunFact = lazy(() => import("./Components/Pages/FooterPages/FunFact/FunFact"));
const Register = lazy(() => import("./Components/Pages/Auth/Registretion/Register"));
const ContimueWithMobile = lazy(() => import("./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile"));
const LoginWithEmailCode = lazy(() => import("./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode"));
const LoginWithMobileCode = lazy(() => import("./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode"));
const AboutUs = lazy(() => import("./Components/Pages/aboutUs/AboutUs"));
const Wishlist = lazy(() => import("./Components/Pages/Wishlist/Wishlist"));
const PageNotFound = lazy(() => import("./Components/Pages/404Page/PageNotFound"));
const Delivery = lazy(() => import("./Components/Pages/OrderFlow/DeliveryPage/Delivery"));
const Payment = lazy(() => import("./Components/Pages/OrderFlow/PaymentPage/Payment"));
const Confirmation = lazy(() => import("./Components/Pages/OrderFlow/ConfirmationPage/Confirmation"));
const ForgotPass = lazy(() => import("./Components/Pages/Auth/forgotPass/ForgotPass"));
const Header2 = lazy(() => import("./Components/Pages/Home/Header/Header2"));
const Account = lazy(() => import("./Components/Pages/Account/Account"));
const Lookbook = lazy(() => import("./Components/Pages/Home/LookBook/Lookbook"));
const ScrollToTop = lazy(() => import("../DaimondTine/Components/Pages/ScrollToTop "));
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
    fetch(`${storImagePath()}/Store_Init.txt`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON.parse(text);
          setHtmlContent(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return ;
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
        return ;
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

  
  const Vaara = 1 ;

  const Vara = Vaara == 0 ? <AboutUs/> : <AboutUsVara/>

  console.log(location)
  return (
    <>
    <Suspense fallback={<></>}>
      <Helmet>
        <title>{localData?.BrowserTitle}</title>
      </Helmet>
      <div style={{ minHeight: '85vh' }}>
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
          <Route path="/servicePolicy" element={<ServicePolicy />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route
            path="/ManagementTeam"
            element={<ManagementTeam />}
          />
           <Route
            path="/terms-and-conditions"
            
            element={<TermsAndConditions />}
          />
          {/* For sonasons and vara */}
          {/* <Route path="/aboutUs" element={Vara} /> */}

          {/* For shinjini */}
          <Route path="/aboutUs" element={<AXboutUs />} />
          {/* <Route path="/ExpertAdvice" element={<ExpertAdvice />} /> */}
          {/* <Route path="/FunFact" element={<FunFact />} /> */}
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
          {storeinit?.IsDesignSetInMenu == 1 && (
            <Route path="/Lookbook" element={<Lookbook />} />
          )}
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
