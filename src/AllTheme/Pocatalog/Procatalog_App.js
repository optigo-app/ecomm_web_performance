import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Components/Pages/Home/Index";
import Header from "./Components/Pages/Home/Header/Header";
import Cart from "./Components/Pages/Cart/CartMain";
import LoginOption from "./Components/Pages/Auth/LoginOption/LoginOption";
import ContinueWithEmail from "./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail";
import LoginWithEmail from "./Components/Pages/Auth/LoginWithEmail/LoginWithEmail";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  companyLogo,
  proCat_companyLogo,
  proCat_companyLogoM,
  proCat_loginState,
} from "./Components/Recoil/atom";
import { Storeinit } from "../../utils/API/Home/Storeinit/Storeinit";
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
// import AboutUs from "./Components/Pages/aboutUs/AboutUs";
import { MetalTypeComboAPI } from "../../utils/API/Combo/MetalTypeComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { CurrencyComboAPI } from "../../utils/API/Combo/CurrencyComboAPI";
import { DiamondQualityColorComboAPI } from "../../utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalColorCombo } from "../../utils/API/Combo/MetalColorCombo";
import Wishlist from "./Components/Pages/Wishlist/Wishlist";
import PageNotFound from "./Components/Pages/404Page/PageNotFound";
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
import ProCat_PrivateRoutes from "./ProCat_PrivateRoutes";
import ConnectionManager from "../../utils/SoketConnection/ConnectionManager";
import {
  storImagePath,
  storInitDataPath,
} from "../../utils/Glob_Functions/GlobalFunction";
import Footer from "./Components/Pages/Home/Footer/Footer";
import ProcatAppChatMenu from "./Components/Pages/Home/ChatMenu/ProcatAppChatMenu";
import AboutUs from "./Components/Pages/Static/AboutUs/AboutUs";
import TermsCondition from "./Components/Pages/Static/TermsPolicy/TermsPolicy";
import PrivacyPolicy from "./Components/Pages/Static/PrivacyPolicy/PrivacyPolicy";
import AboutUs2 from "./Components/Pages/Static/AboutUs/AboutUs2";

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

  useEffect(() => {
    const cookieValue = Cookies.get("userLoginCookie");
    if (cookieValue) {
      LoginWithEmailAPI("", "", "", "", cookieValue)
        .then((response) => {
          if (response.Data.rd[0].stat === 1) {
            Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token, {
              path: "/",
              expires: 30,
            });
            setIsLoginState(true);
            // sessionStorage.setItem("LoginUser", true);
            // sessionStorage.setItem(
            //   "loginUserDetail",
            //   JSON.stringify(response.Data.rd[0])
            // );

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

  return (
    <div className="setFullThemeBack">
      {localData?.Headerno === 1 && <Header />}
      {localData?.Headerno === 2 && <Header2 />}
      <ConnectionManager />
      <ProcatAppChatMenu />
      <div className="proCatMinHeightSet">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LoginOption" element={<LoginOption />} />
          <Route path="/ContinueWithEmail" element={<ContinueWithEmail />} />
          <Route path="/ContimueWithMobile" element={<ContimueWithMobile />} />
          <Route path="/LoginWithEmailCode" element={<LoginWithEmailCode />} />
          <Route
            path="/LoginWithMobileCode"
            element={<LoginWithMobileCode />}
          />
          <Route path="/ForgotPass" element={<ForgotPass />} />
          <Route path="/LoginWithEmail" element={<LoginWithEmail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/servicePolicy" element={<ServicePolicy />} />
          <Route path="/ExpertAdvice" element={<ExpertAdvice />} />
          <Route path="/FunFact" element={<FunFact />} />
          {/* <Route path="/Lookbook" element={<Lookbook />} /> */}
          <Route path="/aboutUs" element={<AboutUs2 />} />
          <Route path="/privacy-policy" element={<TermsCondition />} />
          <Route path="/terms-and-conditions" element={ <PrivacyPolicy />} />
          <Route
            path="/"
            element={<ProCat_PrivateRoutes isLoginStatus={islogin} />}
          >
            <Route path="/p/*" element={<ProductList />} />
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
    </div>
  );
};

export default Procatalog_App;
