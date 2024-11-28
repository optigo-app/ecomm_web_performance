import React, { useEffect, useState } from 'react'
import Header from './Components/Pages/Home/Header/Header'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import LoginOption from './Components/Pages/Auth/LoginOption/LoginOption'
import ContinueWithEmail from './Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'
import ContimueWithMobile from './Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile'
import LoginWithEmail from './Components/Pages/Auth/LoginWithEmail/LoginWithEmail'
import Register from './Components/Pages/Auth/Registretion/Register'
import LoginWithMobileCode from './Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode'
import LoginWithEmailCode from './Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode'
import ForgotPass from './Components/Pages/Auth/forgotPass/ForgotPass'
import { dt_companyLogo, dt_companyLogoM, dt_loginState, lookBookDrawer } from './Components/Recoil/atom'
import ProductList from './Components/Pages/Product/ProductList/ProductList'
import ProductDetail from './Components/Pages/Product/ProductDetail/ProductDetail'
import DiamondTine_PrivateRoutes from './DiamondTine_PrivateRoutes'
import Account from './Components/Pages/Account/Account';
import CartMain from './Components/Pages/Cart/CartMain';
import Wishlist from "./Components/Pages/Wishlist/MainWish";
import Delivery from "./Components/Pages/OrderFlow/DeliveryPage/Delivery";
import Payment from "./Components/Pages/OrderFlow/PaymentPage/Payment";
import Confirmation from "./Components/Pages/OrderFlow/ConfirmationPage/Confirmation";
import { LoginWithEmailAPI } from '../../utils/API/Auth/LoginWithEmailAPI'
import Cookies from "js-cookie";
import FAQ from './Components/Pages/StaticPages/FAQ/FAQ'
import TermsAndConditions from './Components/Pages/StaticPages/Terms&Condition/TermsCondition'
import PrivacyPolicy from './Components/Pages/StaticPages/privacyPolicy/PrivacyPolicy'
import ContactUs from './Components/Pages/StaticPages/contactUs/ContactUs'
import ScrollToTop from './Components/Pages/ScrollToTop '
import Lookbook from './Components/Pages/Home/LookBook/Lookbook'
import WhtasIcone from './Components/Pages/Home/ChatMenu/ChatMenu'
import MaterialCore from './Components/Pages/StaticPages/MaterialCore/MaterialCore'
import ShipingReturn from './Components/Pages/StaticPages/ShipingReturn/ShipingReturn'
import Exchange from './Components/Pages/StaticPages/Exchange/Exchange'
import Location from './Components/Pages/StaticPages/Location/Location'
import { storImagePath } from '../../utils/Glob_Functions/GlobalFunction'
import GoogleAnalytics  from 'react-ga4';
import PaymentFailure from '../../utils/PaymentSuccessFail/PaymentFailure'



const DaimondTine_App = () => {

  const navigation = useNavigate();
  const [islogin, setIsLoginState] = useRecoilState(dt_loginState)
  const  setCompanyTitleLogo = useSetRecoilState(dt_companyLogo);
  const  setCompanyTitleLogoM = useSetRecoilState(dt_companyLogoM);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [localData, setLocalData] = useState();
  const isDrawerLookBook = useRecoilValue(lookBookDrawer);
  

  const TRACKING_ID = "G-6ETM8Y1KCR";
  GoogleAnalytics.initialize(TRACKING_ID);

  useEffect(() => {
    GoogleAnalytics.set({ page: location.pathname });
    GoogleAnalytics.send("pageview");
    GoogleAnalytics.event({
      category: "Navigation",
      action: "Visited Route",
      label: location.pathname,
    });
  }, [location]);

  useEffect(() => {
    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;
    
    // let webLogo = `${storImagePath()}/logoIcon/sona/webLogo.png`;
    // let mobileLogo = `${storImagePath()}/logoIcon/sona/mobileLogo.png`;
    
    
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

  useEffect(() => {
    setTimeout(() => {
      if (islogin == true) {
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

    }, 500);
  }, [location?.pathname])


  return (
    <div>
      {!isDrawerLookBook && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginOption" element={<LoginOption />} />
        <Route path="/ContinueWithEmail" element={<ContinueWithEmail />} />
        <Route path="/ContimueWithMobile" element={<ContimueWithMobile />} />
        <Route path="/LoginWithMobileCode" element={<LoginWithMobileCode />} />
        <Route path="/LoginWithEmailCode" element={<LoginWithEmailCode />} />
        <Route path="/LoginWithEmail" element={<LoginWithEmail />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/FAQ" element={<FAQ />} />   
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/term&condition" element={<TermsAndConditions />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        <Route path="/ShipingReturn" element={<ShipingReturn />} />
        <Route path="/Exchange" element={<Exchange />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/MaterialCore" element={<MaterialCore />} />
        <Route path="/Lookbook" element={<Lookbook />} />
        <Route path="/" element={<DiamondTine_PrivateRoutes isLoginStatus={islogin} />}>
          <Route path="/p/*" element={<ProductList />} />
          <Route path="/d/*" element={<ProductDetail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cartPage" element={<CartMain />} />
          <Route path="/myWishList" element={<Wishlist />} />
          <Route path="/Delivery" element={<Delivery />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Confirmation" element={<Confirmation />} />
          <Route path="/failure" element={<PaymentFailure />} />
        </Route>
      </Routes>
      <ScrollToTop />
      <WhtasIcone phoneNo='9810976359'/>
    </div>
  )
}

export default DaimondTine_App