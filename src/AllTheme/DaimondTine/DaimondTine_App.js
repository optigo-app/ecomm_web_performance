import React, { Suspense, useEffect, useState } from 'react'
// import Header from './Components/Pages/Home/Header/Header'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { storImagePath } from '../../utils/Glob_Functions/GlobalFunction'
import GoogleAnalytics  from 'react-ga4';
import { LoginWithEmailAPI } from '../../utils/API/Auth/LoginWithEmailAPI'
import Cookies from "js-cookie";  
import { dt_companyLogo, dt_companyLogoM, dt_loginState, lookBookDrawer } from './Components/Recoil/atom';
import ScrollToTop from './Components/Pages/ScrollToTop ';
import DiamondTine_PrivateRoutes from './DiamondTine_PrivateRoutes';

const Home = React.lazy(() => import('./Components/Pages/Home/Index'));
const LoginOption = React.lazy(() => import('./Components/Pages/Auth/LoginOption/LoginOption'));
const ContinueWithEmail = React.lazy(() => import('./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'));
const ContimueWithMobile = React.lazy(() => import('./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile'));
const LoginWithEmail = React.lazy(() => import('./Components/Pages/Auth/LoginWithEmail/LoginWithEmail'));
const Register = React.lazy(() => import('./Components/Pages/Auth/Registretion/Register'));
const LoginWithMobileCode = React.lazy(() => import('./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode'));
const LoginWithEmailCode = React.lazy(() => import('./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode'));
const ForgotPass = React.lazy(() => import('./Components/Pages/Auth/forgotPass/ForgotPass'));
const ProductList = React.lazy(() => import('./Components/Pages/Product/ProductList/ProductList'));
const ProductDetail = React.lazy(() => import('./Components/Pages/Product/ProductDetail/ProductDetail'));
const Account = React.lazy(() => import('./Components/Pages/Account/Account'));
const CartMain = React.lazy(() => import('./Components/Pages/Cart/CartMain'));
const Wishlist = React.lazy(() => import('./Components/Pages/Wishlist/MainWish'));
const Delivery = React.lazy(() => import('./Components/Pages/OrderFlow/DeliveryPage/Delivery'));
const Payment = React.lazy(() => import('./Components/Pages/OrderFlow/PaymentPage/Payment'));
const Confirmation = React.lazy(() => import('./Components/Pages/OrderFlow/ConfirmationPage/Confirmation'));
const FAQ = React.lazy(() => import('./Components/Pages/StaticPages/FAQ/FAQ'));
const TermsAndConditions = React.lazy(() => import('./Components/Pages/StaticPages/Terms&Condition/TermsCondition'));
const PrivacyPolicy = React.lazy(() => import('./Components/Pages/StaticPages/privacyPolicy/PrivacyPolicy'));
const ContactUs = React.lazy(() => import('./Components/Pages/StaticPages/contactUs/ContactUs'));
const Lookbook = React.lazy(() => import('./Components/Pages/Home/LookBook/Lookbook'));
const WhtasIcone = React.lazy(() => import('./Components/Pages/Home/ChatMenu/ChatMenu'));
const MaterialCore = React.lazy(() => import('./Components/Pages/StaticPages/MaterialCore/MaterialCore'));
const ShipingReturn = React.lazy(() => import('./Components/Pages/StaticPages/ShipingReturn/ShipingReturn'));
const Exchange = React.lazy(() => import('./Components/Pages/StaticPages/Exchange/Exchange'));
const Location = React.lazy(() => import('./Components/Pages/StaticPages/Location/Location'));
const PaymentFailure = React.lazy(() => import('../../utils/PaymentSuccessFail/PaymentFailure'));
const Header  = React.lazy(()=>import('./Components/Pages/Home/Header/Header'));



const LazyWrapper = ({ children }) => {
  return <Suspense fallback={<></>}>{children}</Suspense>;
};


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
  // GoogleAnalytics.initialize(TRACKING_ID);

  // useEffect(() => {
  //   GoogleAnalytics.set({ page: location.pathname });
  //   GoogleAnalytics.send("pageview");
  //   GoogleAnalytics.event({
  //     category: "Navigation",
  //     action: "Visited Route",
  //     label: location.pathname,
  //   });
  // }, [location]);

  useEffect(() => {
    const initGA = () => {
      GoogleAnalytics.initialize(TRACKING_ID);
      GoogleAnalytics.set({ page: location.pathname });
      GoogleAnalytics.send("pageview");
      GoogleAnalytics.event({
        category: "Navigation",
        action: "Visited Route",
        label: location.pathname,
      });
    };
  
    // Delay the GA initialization by 500ms to prevent blocking the main thread
    const timeoutId = setTimeout(initGA, 500);
  
    // Cleanup the timeout if component is unmounted
    return () => clearTimeout(timeoutId);
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
      <Suspense fallback={<></>}>
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
      </Suspense> 
    </div>
  )
}

export default DaimondTine_App