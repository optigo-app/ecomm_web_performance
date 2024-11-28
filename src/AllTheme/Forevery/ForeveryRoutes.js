import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./Components/Pages/Home/Index";
import Cart from "./Components/Pages/Cart/CartMain";
import LoginOption from "./Components/Pages/Auth/LoginOption/LoginOption";
import ContinueWithEmail from "./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail";
import LoginWithEmail from "./Components/Pages/Auth/LoginWithEmail/LoginWithEmail";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  for_companyLogo,
  for_companyLogoM,
  for_loginState,
  for_nav_height,
} from "./Components/Recoil/atom";
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
import { MetalTypeComboAPI } from "../../utils/API/Combo/MetalTypeComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { CurrencyComboAPI } from "../../utils/API/Combo/CurrencyComboAPI";
import { DiamondQualityColorComboAPI } from "../../utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalColorCombo } from "../../utils/API/Combo/MetalColorCombo";
import Wishlist from "./Components/Pages/Wishlist/Wishlist";
import PageNotFound from "./Components/Pages/404Page/PageNotFound";
import PrivateRoutes from "./PrivateRoutes";
import { Helmet } from "react-helmet";
import Delivery from "./Components/Pages/OrderFlow/DeliveryPage/Delivery";
import Payment from "./Components/Pages/OrderFlow/PaymentPage/Payment";
import Confirmation from "./Components/Pages/OrderFlow/ConfirmationPage/Confirmation";
import ForgotPass from "./Components/Pages/Auth/forgotPass/ForgotPass";
import Cookies from "js-cookie";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import Lookbook from "./Components/Pages/Home/LookBook/Lookbook";
import Navbar from "./Components/Pages/Common/NavBar/Navbar";
import TopBar from "./Components/Pages/Common/TopBar/TopBar";
import AppointmentPage from "./Components/Pages/Home/AppointMent/AppointmentPage";
import Footer from "./Components/Pages/Home/Footer/Footer";
import DiamondFilter from "./Components/Pages/Diamond/DiamondFilter/DiamondFilter";
import RingPage from "./Components/Pages/Diamond/RingPage/RingPage";
import SettingPage from "./Components/Pages/Diamond/SettingPage/SettingPage";
import DiamondPage from "./Components/Pages/Diamond";
import Diamond from "./Components/Pages/Diamond/Diamond/Diamond";
import DetailsRoute from "./Components/Pages/Product";
import FineJewelry from "./Components/Pages/Home/FineJewelry/FineJewelry";
import Preloader from "../../dum/Load";
import Bespokejewelry from "./Components/Pages/staticpages/Bespokejewelry/Bespokejewelry";
import Test from "./Components/Pages/ReusableComponent/Test";
import Education from "./Components/Pages/staticpages/Education/Education";
import PrivacyPage from "./Components/Pages/staticpages/PrivacyPage/PrivacyPage";
import TermsAndCondition from "./Components/Pages/staticpages/TermsAndCondition/TermsAndCondition";
import Account from "./Components/Pages/Account/Account";
import LabCreatedRings from "./Components/Pages/labCreated-rings/LabCreatedRings";
import JewelryInquiryForm from "../../utils/Inquary/JewelryInquiryForm";
import LabGrownWeddingRing from "./Components/Pages/lab-grown-wedding-rings/LabGrownWeddingRing";
import ZaraStyleSlider from "./Components/Pages/AZara";
import { storImagePath } from "../../utils/Glob_Functions/GlobalFunction";
import PromotionalBanner from "./Components/Pages/PromotionalBanner/PromotionalBanner";
import usePromotionalBanner from "./Components/hooks/usePromotionalBanner";

const ForEveryRoutes = () => {
  const { openPromotionalBanner, handleCloseBanner } =
    usePromotionalBanner();
  const islogin = useRecoilValue(for_loginState);
  const [localData, setLocalData] = useState();
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(for_loginState);
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

  console.log(navHeight, "stste");

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

  console.log(openPromotionalBanner, "openPromotionalBanner")

  return (
    <>
      <Helmet>
        <title>{localData?.BrowserTitle}</title>
      </Helmet>
      <div>
        <Preloader />
        {openPromotionalBanner && (
          <PromotionalBanner onClose={handleCloseBanner} />
        )}
        <TopBar />
        <Navbar />
      </div>
      <div
        className="body"
        style={{
          marginTop: `${navHeight}px`,
          overflow: "hidden",
        }}
      >
        <Routes>
          <>
            <Route path="/" element={<Home />} />
            {/* <Route path="/test" element={<Test />} /> */}
            {/* <Route path="/zara" element={<ZaraStyleSlider />} /> */}
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
    </>
  );
};

export default ForEveryRoutes;
