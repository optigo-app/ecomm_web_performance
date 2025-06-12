import React, { Suspense, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./Components/Pages/Home/Index";
import './Components/scss/variable.scss';
import Cart from "./Components/Pages/Cart/CartMain";
import loaderImg from './Components/Assets/webLogo.png';
import LoginOption from "./Components/Pages/Auth/LoginOption/LoginOption";
import ContinueWithEmail from "./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail";
import LoginWithEmail from "./Components/Pages/Auth/LoginWithEmail/LoginWithEmail";
import { Box } from "@mui/material";
import { MetalTypeComboAPI } from "../../utils/API/Combo/MetalTypeComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { CurrencyComboAPI } from "../../utils/API/Combo/CurrencyComboAPI";
import { DiamondQualityColorComboAPI } from "../../utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalColorCombo } from "../../utils/API/Combo/MetalColorCombo";
import { storImagePath } from "../../utils/Glob_Functions/GlobalFunction";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import {
  for_companyLogo,
  for_companyLogoM,
  for_isEarringFlowOn,
  for_isPendantFlowOn,
  for_isRingFlowOn,
  for_loginState,
  for_nav_height,
} from "./Components/Recoil/atom";
import useHomeBannerImages from "../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import usePromotionalBanner from "./Components/hooks/usePromotionalBanner";

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
// import Lookbook from "./Components/Pages/Home/LookBook/Lookbook";
// import Navbar from "./Components/Pages/Common/NavBar/Navbar";
// import TopBar from "./Components/Pages/Common/TopBar/TopBar";
// import AppointmentPage from "./Components/Pages/Home/AppointMent/AppointmentPage";
// import Footer from "./Components/Pages/Home/Footer/Footer";
// import DiamondFilter from "./Components/Pages/Diamond/DiamondFilter/DiamondFilter";
// import RingPage from "./Components/Pages/Diamond/RingPage/RingPage";
// import SettingPage from "./Components/Pages/Diamond/SettingPage/SettingPage";
// import DiamondPage from "./Components/Pages/Diamond";
// import Diamond from "./Components/Pages/Diamond/Diamond/Diamond";
// import DetailsRoute from "./Components/Pages/Product";
// import FineJewelry from "./Components/Pages/Home/FineJewelry/FineJewelry";
// import Preloader from "./Components/Pages/Preloader/Load";
// import Bespokejewelry from "./Components/Pages/staticpages/Bespokejewelry/Bespokejewelry";
// import Test from "./Components/Pages/ReusableComponent/Test";
// import Education from "./Components/Pages/staticpages/Education/Education";
// import PrivacyPage from "./Components/Pages/staticpages/PrivacyPage/PrivacyPage";
// import TermsAndCondition from "./Components/Pages/staticpages/TermsAndCondition/TermsAndCondition";
// import Account from "./Components/Pages/Account/Account";
// import LabCreatedRings from "./Components/Pages/labCreated-rings/LabCreatedRings";
// import JewelryInquiryForm from "../../utils/Inquary/JewelryInquiryForm";
// import LabGrownWeddingRing from "./Components/Pages/lab-grown-wedding-rings/LabGrownWeddingRing";
// import ZaraStyleSlider from "./Components/Pages/AZara";
// import PromotionalBanner from "./Components/Pages/PromotionalBanner/PromotionalBanner";
// import SearchData from "./Components/Pages/Product/SearchData/SearchData";

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
const PrivateRoutes = React.lazy(() => import("./PrivateRoutes"));
const Delivery = React.lazy(() => import("./Components/Pages/OrderFlow/DeliveryPage/Delivery"));
const Payment = React.lazy(() => import("./Components/Pages/OrderFlow/PaymentPage/Payment"));
const Confirmation = React.lazy(() => import("./Components/Pages/OrderFlow/ConfirmationPage/Confirmation"));
const ForgotPass = React.lazy(() => import("./Components/Pages/Auth/forgotPass/ForgotPass"));
const Lookbook = React.lazy(() => import("./Components/Pages/Home/LookBook/Lookbook"));
const Navbar = React.lazy(() => import("./Components/Pages/Common/NavBar/Navbar"));
const TopBar = React.lazy(() => import("./Components/Pages/Common/TopBar/TopBar"));
const AppointmentPage = React.lazy(() => import("./Components/Pages/Home/AppointMent/AppointmentPage"));
const Footer = React.lazy(() => import("./Components/Pages/Home/Footer/Footer"));
const DiamondFilter = React.lazy(() => import("./Components/Pages/Diamond/DiamondFilter/DiamondFilter"));
const RingPage = React.lazy(() => import("./Components/Pages/Diamond/RingPage/RingPage"));
const SettingPage = React.lazy(() => import("./Components/Pages/Diamond/SettingPage/SettingPage"));
const DiamondPage = React.lazy(() => import("./Components/Pages/Diamond"));
const Diamond = React.lazy(() => import("./Components/Pages/Diamond/Diamond/Diamond"));
const DetailsRoute = React.lazy(() => import("./Components/Pages/Product"));
const FineJewelry = React.lazy(() => import("./Components/Pages/Home/FineJewelry/FineJewelry"));
const Preloader = React.lazy(() => import("./Components/Pages/Preloader/Load"));
const Bespokejewelry = React.lazy(() => import("./Components/Pages/staticpages/Bespokejewelry/Bespokejewelry"));
const Test = React.lazy(() => import("./Components/Pages/ReusableComponent/Test"));
const Education = React.lazy(() => import("./Components/Pages/staticpages/Education/Education"));
const PrivacyPage = React.lazy(() => import("./Components/Pages/staticpages/PrivacyPage/PrivacyPage"));
const TermsAndCondition = React.lazy(() => import("./Components/Pages/staticpages/TermsAndCondition/TermsAndCondition"));
const Account = React.lazy(() => import("./Components/Pages/Account/Account"));
const LabCreatedRings = React.lazy(() => import("./Components/Pages/labCreated-rings/LabCreatedRings"));
const JewelryInquiryForm = React.lazy(() => import("../../utils/Inquary/JewelryInquiryForm"));
const LabGrownWeddingRing = React.lazy(() => import("./Components/Pages/lab-grown-wedding-rings/LabGrownWeddingRing"));
const ZaraStyleSlider = React.lazy(() => import("./Components/Pages/AZara"));
const PromotionalBanner = React.lazy(() => import("./Components/Pages/PromotionalBanner/PromotionalBanner"));
const SearchData = React.lazy(() => import("./Components/Pages/Product/SearchData/SearchData"));

const ForEveryRoutes = () => {
  const { openPromotionalBanner, handleCloseBanner } =
    usePromotionalBanner();
  const banner = useHomeBannerImages();
  const islogin = useRecoilValue(for_loginState);
  const [localData, setLocalData] = useState();
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(for_loginState);
  const setIsPendantFlowOn = useSetRecoilState(for_isPendantFlowOn);
  const setIsRingFlowOn = useSetRecoilState(for_isRingFlowOn);
  const setIsEarringFlowOn = useSetRecoilState(for_isEarringFlowOn);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  // const [companyTitleLogo, setCompanyTitleLogo] =
  //   useRecoilState(for_companyLogo);
  const [for_companyTitleLogo, for_setCompanyTitleLogo] =
    useRecoilState(for_companyLogo);
  const [for_companyTitleLogoM, for_setCompanyTitleLogoM] =
    useRecoilState(for_companyLogoM);
  const [OpenPromotionalBanner, setOpenPromotionalBanner] = useState(false);

  const navHeight = useRecoilValue(for_nav_height);
  const setCSSVariable = () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  };

  const [urlHistory, setUrlHistory] = useState([]);

  const isPendantFlowOn = 0; // 1 means flow on and 0 means flow off
  const isRingFlowOn = 1; // 1 means flow on and 0 means flow off
  const isEarringFlowOn = 0; // 1 means flow on and 0 means flow off

  // Update URL history on location change
  useEffect(() => {
    setUrlHistory((prevHistory) => [...prevHistory, location.pathname]);
    setIsPendantFlowOn(isPendantFlowOn);
    setIsRingFlowOn(isRingFlowOn);
    setIsEarringFlowOn(isEarringFlowOn);
  }, [location]);
  const handleBackButton = () => {
    localStorage.setItem('useHistory', JSON.stringify(urlHistory));
    const history = JSON.parse(localStorage.getItem('useHistory'));
  }
  useEffect(() => {
    handleBackButton();
  }, [location])

  // useEffect(() => {
  //   let data = sessionStorage.getItem("storeInit");
  //   let Logindata = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  //   let logo = JSON?.parse(data);
  //   if (Logindata) {
  //     if (Logindata?.IsPLWOn == 1) {
  //       setCompanyTitleLogo(Logindata?.Private_label_logo);
  //     } else {
  //       setCompanyTitleLogo(logo?.companylogo);
  //     }
  //   } else {
  //     setCompanyTitleLogo(logo?.companylogo);
  //   }
  //   setCSSVariable();
  // });

  useEffect(() => {
    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;

    for_setCompanyTitleLogo(webLogo);
    for_setCompanyTitleLogoM(mobileLogo);

    setCSSVariable();
  });

  useEffect(() => {
    sessionStorage.setItem('filterMenu', JSON.stringify({}))
    const cookieValue = Cookies.get("userLoginCookie");
    const loginUser = sessionStorage.getItem("LoginUser");

    if (cookieValue && !loginUser) {
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
    // else if (loginUser) {
    //   setIsLoginState(true);
    // }

    const localD = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localD);
  }, []);



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
        <div>
          <Preloader />
          {openPromotionalBanner && (
            <PromotionalBanner img={banner?.popup?.image} onClose={handleCloseBanner} />
          )}
          <TopBar />
          <Navbar />
        </div>
        <div
          className="body"
          style={{
            marginTop: `${navHeight + 15}px`,
            overflow: "hidden",
            paddingBottom: "2rem"
          }}
        >
          <Routes>
            <>
              <Route path="/" element={<Home />} />
              {/* <Route path="/test" element={<Test />} /> */}
              <Route path="/zara" element={<ZaraStyleSlider />} />
              <Route
                path="/LoginOption"
                element={
                  <div className="authFlowBakcColor">
                    <LoginOption />
                  </div>
                }
              />
              <Route
                path="/ContinueWithEmail"
                element={
                  <div className="authFlowBakcColor">
                    <ContinueWithEmail />
                  </div>
                }
              />
              <Route
                path="/ContimueWithMobile"
                element={
                  <div className="authFlowBakcColor">
                    <ContimueWithMobile />
                  </div>
                }
              />
              <Route
                path="/LoginWithEmailCode"
                element={
                  <div className="authFlowBakcColor">
                    <LoginWithEmailCode />
                  </div>
                }
              />
              <Route
                path="/LoginWithMobileCode"
                element={
                  <div className="authFlowBakcColor">
                    <LoginWithMobileCode />
                  </div>
                }
              />
              <Route
                path="/ForgotPass"
                element={
                  <div className="authFlowBakcColor">
                    <ForgotPass />
                  </div>
                }
              />
              <Route
                path="/LoginWithEmail"
                element={
                  <div className="authFlowBakcColor">
                    <LoginWithEmail />
                  </div>
                }
              />
              <Route
                path="/register"
                element={
                  <div className="authFlowBakcColor">
                    <Register />
                  </div>
                }
              />
            </>
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/" element={<PrivateRoutes isLoginStatus={islogin} />}>
              <Route
                path="/certified-loose-lab-grown-diamonds/settings/*"
                element={<SettingPage />}
              />
              <Route
                path="/certified-loose-lab-grown-diamonds/diamond/*"
                element={<DiamondFilter />}
              />
              <Route
                path="/certified-loose-lab-grown-diamonds/ring/*"
                element={<RingPage />}
              />

              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/d/*" element={<DetailsRoute />} />
              <Route path="/p/*" element={<ProductList />} />
              <Route path="/Delivery" element={<Delivery />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/account" element={<Account />} />
              <Route path="/Confirmation" element={<Confirmation />} />
            </Route>

            <Route path="/diamond" element={<Diamond />} />
            <Route path="/search/*" element={<SearchData />} />
            <Route path="/lab-grown-fine-jewelry" element={<FineJewelry />} />
            <Route
              path="/lab-created-engagement-rings"
              element={<LabCreatedRings />}
            />
            {/* <Route path="/Lookbook" element={<Lookbook />} /> */}
            {/* </Route> */}
            <Route path="/bespoke-jewelry" element={<Bespokejewelry />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/education" element={<Education />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms-conditions" element={<TermsAndCondition />} />
            <Route path="/JewelryInquiryForm" element={<JewelryInquiryForm />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </div>
        <Footer />
      </Suspense>
    </>
  );
};

export default ForEveryRoutes;
