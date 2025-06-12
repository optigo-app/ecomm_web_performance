import React, { memo, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './Components/scss/elvee_modules.scss';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Box, CircularProgress } from '@mui/material';
// import loaderImg from '../Elveester/Components/Assets/webLogo.png';
import loaderImg from '../Elveester/Components/Assets/Gif_Loder.gif';
import { el_companyLogo, el_companyLogoM, el_loginState, redirectModal, timerExpiredState } from './Components/Recoil/atom'
import { storImagePath } from '../../utils/Glob_Functions/GlobalFunction';
import CountdownTimerFnc from './Components/Pages/Home/CountdownTimer/CountdownTimerFnc';
import ReactGA from "react-ga4";
import RedirectModal from './Components/Pages/Home/CountdownTimer/RedirectModal';
import MetaData from './Components/meta/MetaData';
import MetaPage from './Components/meta/Metapage';
import { HelmetProvider } from 'react-helmet-async';
const PrivateRoutes = React.lazy(() => import('./PrivateRoutes'));
// import PrivateRoutes from './PrivateRoutes';
const Home = React.lazy(() => import('./Components/Pages/Home/Index'));
const CartDetails = React.lazy(() => import('./Components/Pages/Cart/Cart'));
const Header = React.lazy(() => import('./Components/Pages/Home/Header/Header'));
const Footer = React.lazy(() => import('./Components/Pages/Home/Footer/Footer'));
const LoginOption = React.lazy(() => import('./Components/Pages/Auth/LoginOption/LoginOption'));
const ContinueWithEmail = React.lazy(() => import('./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'));
const ContimueWithMobile = React.lazy(() => import('./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile'));
const LoginWithEmail = React.lazy(() => import('./Components/Pages/Auth/LoginWithEmail/LoginWithEmail'));
const LoginWithEmailCode = React.lazy(() => import('./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode'));
const LoginWithMobileCode = React.lazy(() => import('./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode'));
const Register = React.lazy(() => import('./Components/Pages/Auth/Registretion/Register'));
const ProductList = React.lazy(() => import('./Components/Pages/Product/ProductList/ProductList'));
const ProductDetail = React.lazy(() => import('./Components/Pages/Product/ProductDetail/ProductDetail'));
const Delivery = React.lazy(() => import('./Components/Pages/OrderFlow/DeliveryPage/Delivery'));
const PaymentPage = React.lazy(() => import('./Components/Pages/OrderFlow/PaymentPage/PaymentPage'));
const ConfirmationPage = React.lazy(() => import('./Components/Pages/OrderFlow/ConfirmationPage/ConfirmationPage'));
const Wishlist = React.lazy(() => import('./Components/Pages/Wishlist/Wishlist'));
const Account = React.lazy(() => import('./Components/Pages/Account/Account'));
const Lookbook = React.lazy(() => import('./Components/Pages/LookBook/Lookbook'));
const ForgotPass = React.lazy(() => import('./Components/Pages/Auth/forgotPass/ForgotPass'));
const Customize = React.lazy(() => import('./Components/Pages/Home/StaticPages/Customize/Customize'));
const CustomerCare = React.lazy(() => import('./Components/Pages/Home/StaticPages/Customercare/CustomerCare'));
const Terms = React.lazy(() => import('./Components/Pages/Home/StaticPages/Terms/Terms'));
const AboutUs = React.lazy(() => import('./Components/Pages/Home/StaticPages/AboutUs/AboutUs'));
const Privacy = React.lazy(() => import('./Components/Pages/Home/StaticPages/Privacy/Privacy'));
const ContactForm = React.lazy(() => import('./Components/Pages/Home/StaticPages/Contact/Contact'));
const Career = React.lazy(() => import('./Components/Pages/Home/StaticPages/Career/Career'));
const Faqs = React.lazy(() => import('./Components/Pages/Home/StaticPages/Faqs/Faqs'));
const History = React.lazy(() => import('./Components/Pages/Home/StaticPages/History/History'));
const Appointment = React.lazy(() => import('./Components/Pages/Home/StaticPages/BookAppointment/Appointment'));

const Elveester_app = () => {

  const location = useLocation();
  const islogin = useRecoilValue(el_loginState)
  console.log("TCL: Elveester_app -> islogin", islogin)
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const timerData = useSetRecoilState(timerExpiredState);
  const getRedModal = useRecoilValue(redirectModal);
  const setRedModal = useSetRecoilState(redirectModal);
  const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));

  const [el_companyTitleLogo, el_setCompanyTitleLogo] = useRecoilState(el_companyLogo)
  const [el_companyTitleLogoM, el_setCompanyTitleLogoM] = useRecoilState(el_companyLogoM)

  const timer = CountdownTimerFnc();
  useEffect(() => {
    if (islogin) {
      if (timer?.showTimer === true) {
        if (loginData?.IsTimeShow == 1) {
          timerData(timer);
          setRedModal(false);
        }
        else {
          setRedModal(false);
        }
      }
    }
  }, [loginData, islogin]);

  const measurementId = "G-X8LQN5ML45";

  useEffect(() => {
    // Initialize only once
    ReactGA.initialize(measurementId);
  }, []);

  useEffect(() => {
    // Send pageview
    const timeoutId = setTimeout(() => {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
        title: document.title || "Elvee",
      });

      // Optional: Send event on navigation
      ReactGA.event({
        category: "Navigation",
        action: "Visited Route",
        label: location.pathname,
      });
    }, 5000); // Short delay to avoid race conditions

    return () => clearTimeout(timeoutId);
  }, [location]);

  useEffect(() => {
    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;

    el_setCompanyTitleLogo(webLogo);
    el_setCompanyTitleLogoM(mobileLogo);

    if (
      location?.pathname === '/menu'
    ) {
      setShowHeader(false);
      setShowFooter(false);
    } else {
      setShowHeader(true);
      setShowFooter(true);
    }
  }, [location?.pathname]);

  const LoadingFallback = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff',
      }}
    >
      {/* <CircularProgress sx={{ color: 'rgba(255, 87, 34, 0.8)' }} /> */}
      <img
        src={loaderImg}
        alt="Loading..."
        width="auto"
        loading="lazy"
        style={{
          maxWidth: '200px',
          width: '100%',
          height: 'auto',
        }}
      // style={{
      //   animation: 'scaleUpDown 1.5s ease-in-out infinite', // Apply the animation here
      // }}
      />
    </Box>
  );

  return (
    <div>
      <HelmetProvider>
        <MetaPage />
        {getRedModal === true && <RedirectModal />}
        {showHeader && <Header />}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Auth Flow  */}
            <Route path="/LoginOption" element={<LoginOption />} />
            <Route
              path="/ContinueWithEmail"
              element={!islogin && <ContinueWithEmail />}
            />
            <Route
              path="/ContimueWithMobile"
              element={!islogin && <ContimueWithMobile />}
            />
            <Route
              path="/LoginWithEmail"
              element={!islogin && <LoginWithEmail />}
            />
            <Route path="/Register" element={!islogin && <Register />} />
            <Route
              path="/LoginWithEmailCode"
              element={!islogin && <LoginWithEmailCode />}
            />
            <Route
              path="/LoginWithMobileCode"
              element={!islogin && <LoginWithMobileCode />}
            />
            <Route
              path="/ForgotPass"
              element={!islogin && <ForgotPass />}
            />

            <Route path="/" element={<Home />} />
            <Route path="/" element={<PrivateRoutes isLoginStatus={islogin} />}>
              <Route path="/cartPage" element={<CartDetails />} />
              <Route path="/myWishList" element={<Wishlist />} />
              <Route path="/Delivery" element={<Delivery />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/Confirmation" element={<ConfirmationPage />} />
              <Route path="/p/*" element={<ProductList />} />
              <Route path="/d/*" element={<ProductDetail />} />
              <Route path="/Lookbook" element={<Lookbook />} />
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/history" element={<History />} />
            <Route path="/term&condition" element={<Terms />} />
            <Route path="/customerServices" element={<CustomerCare />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact-us" element={<ContactForm />} />
            <Route path="/careers" element={<Career />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/faqs" element={<Faqs />} />
          </Routes>
        </Suspense>
        {showFooter && <Footer />}
      </HelmetProvider>
    </div>
  )
}

export default memo(Elveester_app);