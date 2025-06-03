import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import './Components/scss/variable.scss'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import PrivateRoutes from "./PrivateRoutes";
import Cookies from "js-cookie";
import { storImagePath } from "../../utils/Glob_Functions/GlobalFunction";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import loaderImg from "../StamFordJewels/Components/Assets/mobileLogo.png";
import { stam_CartNo, stam_companyLogo, stam_companyLogoM, stam_loginState } from "./Components/Recoil/atom";
import ScrollToTop from "../DaimondTine/Components/Pages/ScrollToTop ";
import { Box, CircularProgress } from "@mui/material";

const Home = React.lazy(() => import("./Components/Pages/Home/Index"));
const Header = React.lazy(() => import("./Components/Pages/Home/Header/Header"));
const Footer = React.lazy(() => import("./Components/Pages/Home/Footer/Footer"));
const Cart = React.lazy(() => import("./Components/Pages/Cart/CartMain"));
const StamScrollToTop = React.lazy(() => import("./Components/Pages/BackToTop/StamScrollToTop"));
const LoginOption = React.lazy(() => import("./Components/Pages/Auth/LoginOption/LoginOption"));
const ContinueWithEmail = React.lazy(() => import("./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail"));
const LoginWithEmail = React.lazy(() => import("./Components/Pages/Auth/LoginWithEmail/LoginWithEmail"));
const ProductList = React.lazy(() => import("./Components/Pages/Product/ProductList/ProductList"));
const ProductDetail = React.lazy(() => import("./Components/Pages/Product/ProductDetail/ProductDetail"));
const ContactUs = React.lazy(() => import("./Components/Pages/FooterPages/contactUs/ContactUs"));
const ServicePolicy = React.lazy(() => import("./Components/Pages/FooterPages/servicePolicy/ServicePolicy"));
const ExpertAdvice = React.lazy(() => import("./Components/Pages/FooterPages/ExpertAdvice/ExpertAdvice"));
const FunFact = React.lazy(() => import("./Components/Pages/FooterPages/FunFact/FunFact"));
const Register = React.lazy(() => import("./Components/Pages/Auth/Registretion/Register"));
const ContimueWithMobile = React.lazy(() => import("./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile"));
const LoginWithEmailCode = React.lazy(() => import("./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode"));
const LoginWithMobileCode = React.lazy(() => import("./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode"));
const AboutUs = React.lazy(() => import("./Components/Pages/aboutUs/AboutUs"));
const Wishlist = React.lazy(() => import("./Components/Pages/Wishlist/Wishlist"));
const PageNotFound = React.lazy(() => import("./Components/Pages/404Page/PageNotFound"));
const Delivery = React.lazy(() => import("./Components/Pages/OrderFlow/DeliveryPage/Delivery"));
const Payment = React.lazy(() => import("./Components/Pages/OrderFlow/PaymentPage/Payment"));
const Confirmation = React.lazy(() => import("./Components/Pages/OrderFlow/ConfirmationPage/Confirmation"));
const ForgotPass = React.lazy(() => import("./Components/Pages/Auth/forgotPass/ForgotPass"));
const Header2 = React.lazy(() => import("./Components/Pages/Home/Header/Header2"));
const Account = React.lazy(() => import("./Components/Pages/Account/Account"));
const Lookbook = React.lazy(() => import("./Components/Pages/Home/LookBook/Lookbook"));
const TermsPolicy = React.lazy(() => import("./Components/Pages/FooterPages/TermsPolicy/TermsPolicy"));
const PrivacyPolicy = React.lazy(() => import("./Components/Pages/FooterPages/PrivacyPolicy/PrivacyPolicy"));
const Category = React.lazy(() => import("./Components/Pages/Home/Category/Category"));

const StamFordJewels_App = () => {
  const islogin = useRecoilValue(stam_loginState);
  const [localData, setLocalData] = useState();
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(stam_loginState);
  const setCartNo = useSetRecoilState(stam_CartNo);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(stam_companyLogo);
  const [companyTitleLogoM, setCompanyTitleLogoM] = useRecoilState(stam_companyLogoM);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    setHtmlContent(storeInit);
  }, []);

  useEffect(() => {
    if (htmlContent) {
      setLocalData((prevData) => ({
        ...prevData,
        Headerno: htmlContent?.Headerno,
        BrowserTitle: htmlContent.BrowserTitle,
      }));
    }
  }, [htmlContent]);

  useEffect(() => {
    setCartNo(3);
  }, []);

  useEffect(() => {
    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;
    setCompanyTitleLogo(webLogo);
    setCompanyTitleLogoM(mobileLogo);
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


  const LoadingFallback = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
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
    <>
      <Helmet>
        <title>{localData?.BrowserTitle}</title>
      </Helmet>
      <Suspense fallback={<LoadingFallback />}>
        <div style={{ minHeight: '700px' }}>
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
              path="/ContinueWithMobile"
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
            <Route path="/shubu" element={<Category />} />
            {/* <Route path="/servicePolicy" element={<ServicePolicy />} /> */}
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/ExpertAdvice" element={<ExpertAdvice />} />
            <Route path="/FunFact" element={<FunFact />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/TermsPolicy" element={<TermsPolicy />} />
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
        </div >
        {
          (location.pathname != "payment") ||
            (location.pathname != "Delivery") ||
            (location.pathname != "Confirmation") ?
            <Footer />
            :
            ''
        }
      </Suspense>
      <StamScrollToTop />
    </>
  );
};

export default StamFordJewels_App;
