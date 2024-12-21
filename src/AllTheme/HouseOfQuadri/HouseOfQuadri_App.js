import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import { Hoq_companyLogo, Hoq_loginState } from "./Components/Recoil/atom";
import PrivateRoutes from "./PrivateRoutes";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Bespoke from "./Components/Page/Home/Bespokejewelry/Index";
import AppointMent from "./Components/Page/Home/Appointment/Wrapper";

// import Navbar from "./Components/Page/Home/Navbar/Navbar";
// import Footer from "./Components/Page/Home/Footer/Footer";
// import HomePage from "./Components/Page/Home";
// import CollectionPage from "./Components/Page/Collection/CollectionPage";
// import DynamicCollection from "./Components/Page/Home/CategoryTab/DynamicCollection/DynamicCollection";
// import ProductPage from "./Components/Page/Product/Product";
// import WishlistPage from "./Components/Page/Wishlist/WishlistPage";
// import CartPage from "./Components/Page/Cart/CartPage";
// import LoginOption from "./Components/Page/Auth/LoginOptions/Hoq_LoginOptions";
// import ContinueWithEmail from "./Components/Page/Auth/LoginWithEmail/Hoq_LoginWithEmail";
// import ContimueWithMobile from "./Components/Page/Auth/LoginWithMobile/Hoq_LoginWithMobile";
// import Register from "./Components/Page/Auth/Register/Hoq_Register";
// import LoginWithEmail from "./Components/Page/Auth/EmailLogin/Hoq_EmailLogin";
// import LoginWithEmailCode from "./Components/Page/Auth/LoginwithEmailCode/Hoq_LoginwithEmailCode";
// import LoginWithMobileCode from "./Components/Page/Auth/LoginWithMobileCode/Hoq_LoginWithMobileCode";
// import ForgotPass from "./Components/Page/Auth/ForgetPassword/Hoq_ForgetPassword";
// import ChatMenu from "./Components/Page/Home/ChatMenu/ChatMenu";
// import Delivery from "./Components/Page/OrderFlow/DeliveryPage/Delivery";
// import Payment from "./Components/Page/OrderFlow/PaymentPage/Payment";
// import Confirmation from "./Components/Page/OrderFlow/ConfirmationPage/Confirmation";
// import Account from "./Components/Page/Account/Account";
// import ShippingPage from "./Components/Page/staticPage/shippingpage/ShippingPage";
// import PrivacyPolicy from "./Components/Page/staticPage/privacyPolicy/PrivacyPolicy";
// import ReturnPolicy from "./Components/Page/staticPage/returnPolicy/ReturnPolicy";
// import TermsConditionPage from "./Components/Page/staticPage/TermsCondition/TermsConditions";
// import FaqSection from "./Components/Page/staticPage/FaqSection/FaqSection";
// import ContactForm from "./Components/Page/staticPage/ContactForm/ContactForm";
// import SizeGuide from "./Components/Page/staticPage/SizeGuide/SizeGuide";
// import QualityMatters from "./Components/Page/staticPage/WhyQualityMatters/QualityMatters";
// import Blogs from "./Components/Page/staticPage/blogs/Blogs";
// import OurStory from "./Components/Page/staticPage/OurStory/OurStory";
// import LabGrownDiamond from "./Components/Page/staticPage/LabGrownDiamond/LabGrownDiamond";
// import DiamondEducation from "./Components/Page/staticPage/DiamondEducation/DiamondEducation";
// import QualityCertification from "./Components/Page/staticPage/QualityCertification/QualityCertification";
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import Lookbook from "./Components/Page/LookBook/Lookbook";
// import Customization from "./Components/Page/staticPage/customization/Customization";
// import ContactPage from "./Components/Page/Checker";

const Navbar = lazy(() => import("./Components/Page/Home/Navbar/Navbar"));
const Footer = lazy(() => import("./Components/Page/Home/Footer/Footer"));
const HomePage = lazy(() => import("./Components/Page/Home"));
const CollectionPage = lazy(() => import("./Components/Page/Collection/CollectionPage"));
const DynamicCollection = lazy(() => import("./Components/Page/Home/CategoryTab/DynamicCollection/DynamicCollection"));
const ProductPage = lazy(() => import("./Components/Page/Product/Product"));
const WishlistPage = lazy(() => import("./Components/Page/Wishlist/WishlistPage"));
const CartPage = lazy(() => import("./Components/Page/Cart/CartPage"));
const LoginOption = lazy(() => import("./Components/Page/Auth/LoginOptions/Hoq_LoginOptions"));
const ContinueWithEmail = lazy(() => import("./Components/Page/Auth/LoginWithEmail/Hoq_LoginWithEmail"));
const ContimueWithMobile = lazy(() => import("./Components/Page/Auth/LoginWithMobile/Hoq_LoginWithMobile"));
const Register = lazy(() => import("./Components/Page/Auth/Register/Hoq_Register"));
const LoginWithEmail = lazy(() => import("./Components/Page/Auth/EmailLogin/Hoq_EmailLogin"));
const LoginWithEmailCode = lazy(() => import("./Components/Page/Auth/LoginwithEmailCode/Hoq_LoginwithEmailCode"));
const LoginWithMobileCode = lazy(() => import("./Components/Page/Auth/LoginWithMobileCode/Hoq_LoginWithMobileCode"));
const ForgotPass = lazy(() => import("./Components/Page/Auth/ForgetPassword/Hoq_ForgetPassword"));
const ChatMenu = lazy(() => import("./Components/Page/Home/ChatMenu/ChatMenu"));
const Delivery = lazy(() => import("./Components/Page/OrderFlow/DeliveryPage/Delivery"));
const Payment = lazy(() => import("./Components/Page/OrderFlow/PaymentPage/Payment"));
const Confirmation = lazy(() => import("./Components/Page/OrderFlow/ConfirmationPage/Confirmation"));
const Account = lazy(() => import("./Components/Page/Account/Account"));
const ShippingPage = lazy(() => import("./Components/Page/staticPage/shippingpage/ShippingPage"));
const PrivacyPolicy = lazy(() => import("./Components/Page/staticPage/privacyPolicy/PrivacyPolicy"));
const TermsConditionPage = lazy(() => import("./Components/Page/staticPage/TermsCondition/TermsConditions"));
const FaqSection = lazy(() => import("./Components/Page/staticPage/FaqSection/FaqSection"));
const ContactForm = lazy(() => import("./Components/Page/staticPage/ContactForm/ContactForm"));
const SizeGuide = lazy(() => import("./Components/Page/staticPage/SizeGuide/SizeGuide"));
const QualityMatters = lazy(() => import("./Components/Page/staticPage/WhyQualityMatters/QualityMatters"));
const OurStory = lazy(() => import("./Components/Page/staticPage/OurStory/OurStory"));
const LabGrownDiamond = lazy(() => import("./Components/Page/staticPage/LabGrownDiamond/LabGrownDiamond"));
const QualityCertification = lazy(() => import("./Components/Page/staticPage/QualityCertification/QualityCertification"));
const Lookbook = lazy(() => import("./Components/Page/LookBook/Lookbook"));
const Customization = lazy(() => import("./Components/Page/staticPage/customization/Customization"));
const ContactPage = lazy(() => import("./Components/Page/Checker"));

const HouseOfQuadri_App = () => {
  const islogin = useRecoilValue(Hoq_loginState);
  const [localData, setLocalData] = useState();
  const [StoreData, setStoreData] = useState();
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(Hoq_loginState);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [companyTitleLogo, setCompanyTitleLogo] =
    useRecoilState(Hoq_companyLogo);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   let data = sessionStorage.getItem("storeInit");
  //   console.log(data ,"store iit")
  //   let com = sessionStorage.getItem("CompanyInfoData");
  //   let Logindata = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  //   let logo = JSON?.parse(data);
  //   setStoreData(JSON?.parse(com))
  //   if (Logindata) {
  //     if (Logindata?.IsPLWOn == 1) {
  //       setCompanyTitleLogo(Logindata?.Private_label_logo);
  //     } else {
  //       setCompanyTitleLogo(logo?.companylogo);
  //     }
  //   } else {
  //     setCompanyTitleLogo(logo?.companylogo);
  //   }
  // },[]);
  useEffect(() => {
    let interval;
    const checkStoreInit = () => {
      try {
        const storeInit = sessionStorage.getItem("storeInit");
        if (storeInit) {
          const parsedData = JSON.parse(storeInit);
          setStoreData(parsedData);
          setLoading(false);
          console.log(parsedData, "avaiable");

          if (interval) {
            clearInterval(interval);
          }
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error parsing storeInit:", error);
        setLoading(false);

        if (interval) {
          clearInterval(interval);
        }
      }
    };

    checkStoreInit();
    interval = setInterval(checkStoreInit, 1000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  }, [location?.pathname]);
  // useEffect(() => {
  //   const cookieValue = Cookies.get("userLoginCookie");
  //   if (cookieValue) {
  //     LoginWithEmailAPI("", "", "", "", cookieValue)
  //       .then((response) => {
  //         if (response.Data.rd[0].stat === 1) {
  //           Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token);
  //           setIsLoginState(true);
  //           sessionStorage.setItem("LoginUser", true);
  //           sessionStorage.setItem(
  //             "loginUserDetail",
  //             JSON.stringify(response.Data.rd[0])
  //           );
  //           if (redirectEmailUrl) {
  //             navigation(redirectEmailUrl);
  //           } else {
  //             navigation("/");
  //           }
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   let localD = JSON.parse(sessionStorage.getItem("storeInit"));
  //   setLocalData(localD);
  // }, []);

  // useEffect(() => {
  //     setTimeout(() => {
  //       if (islogin == true) {
  //         const restrictedPaths = [
  //           '/LoginOption',
  //           '/ContinueWithEmail',
  //           '/ContinueWithMobile',
  //           '/LoginWithEmailCode',
  //           '/LoginWithMobileCode',
  //           '/ForgotPass',
  //           '/LoginWithEmail',
  //           '/register'
  //         ];

  //         if (restrictedPaths?.some(path => location.pathname.startsWith(path))) {
  //           return navigation(-1);
  //         }
  //       }

  //     }, 500);
  // }, [location])
  const navigate = useNavigate();
  const [Authloading, setAuthLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user is logged in
      if (islogin) {
        const restrictedPaths = [
          "/LoginOption",
          "/ContinueWithEmail",
          "/ContinueWithMobile",
          "/LoginWithEmailCode",
          "/LoginWithMobileCode",
          "/ForgotPass",
          "/LoginWithEmail",
          "/Register",
        ];
        if (
          restrictedPaths.some((path) => location.pathname.startsWith(path))
        ) {
          navigate("/");
        }
      }

      setAuthLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, islogin, navigate]);

  if (Authloading) {
    return null;
  }

  return (
    <>
    <Suspense fallback={<></>}>
      <Navbar StoreData={StoreData} />
      <ChatMenu />
      <Routes>
        {/* <Route path="/checker" element={<ContactPage />} /> */}
        {/* Auth Flow  */}
        <Route path="/LoginOption" element={!islogin && <LoginOption />} />
        <Route path="/ContinueWithEmail" element={<ContinueWithEmail />} />
        <Route path="/ContinueWithMobile" element={<ContimueWithMobile />} />
        <Route path="/LoginWithEmail" element={<LoginWithEmail />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/LoginWithEmailCode" element={<LoginWithEmailCode />} />
        <Route path="/LoginWithMobileCode" element={<LoginWithMobileCode />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        {/* Auth Flow Ends */}
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/" element={<CollectionPage />} />
        <Route path="/" element={<PrivateRoutes isLoginStatus={islogin} />}>
          <Route path="/p/*" element={<DynamicCollection />} />
          <Route path="/d/*" element={<ProductPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/Delivery" element={<Delivery />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Confirmation" element={<Confirmation />} />
          <Route path="/account" element={<Account />} />
          <Route path="/Lookbook" element={<Lookbook />} />
        </Route>
        {/* static Page */}
        <Route path="/Shipping-Policy" element={<ShippingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/bespoke-jewelry" element={<Bespoke />} />
        <Route path="/appointment" element={<AppointMent />} />
        {/* <Route path="/return-exchange-policy" element={<ReturnPolicy />} /> */}
        <Route path="/terms-conditions" element={<TermsConditionPage />} />
        <Route path="/faq" element={<FaqSection />} />
        <Route path="/contacts" element={<ContactForm />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/why-quality-matters" element={<QualityMatters />} />
        {/* <Route path="/blogs" element={<Blogs />} /> */}
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/lab-grown-diamond" element={<LabGrownDiamond />} />
        {/* <Route path="/diamond-education" element={<DiamondEducation />} /> */}
        <Route path="/customization" element={<Customization />} />
        <Route
          path="/quality-certification"
          element={<QualityCertification />}
        />
      </Routes>
      <Footer StoreData={StoreData} />
    </Suspense>
    </>
  );
};

export default HouseOfQuadri_App;
