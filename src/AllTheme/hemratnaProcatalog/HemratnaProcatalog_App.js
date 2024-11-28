import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Components/Pages/Home/Index';
import Header from './Components/Pages/Home/Header/Header';
import Footer from './Components/Pages/Home/Footer/Footer';
import ProAlbum from './Components/Pages/Home/ProAlbum/ProAlbum';
import LoginOption from './Components/Pages/Auth/LoginOption/LoginOption';
import ContinueWithEmail from './Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail';
import ContinueWithMobile from './Components/Pages/Auth/ContinueWithMobile/ContinueWithMobile';
import Registration from './Components/Pages/Auth/Registration/Registration';
import LoginWithEmail from './Components/Pages/Auth/LoginWithEmail/LoginWithEmail';
import ForgotPassword from './Components/Pages/Auth/ForgotPassword/ForgotPassword';
import LoginWithEmailCode from './Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode';
import LoginWithMobileCode from './Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode';

const HemratnaProcatalog_App = () => {
  const location = useLocation();
  const [localData, setLocalData] = useState({});
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem('storeInit');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setLocalData(parsedData);
      } catch (error) {
        console.error('Error parsing local storage data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (
      location?.pathname === '/signin' ||
      location?.pathname === '/continue-with-email' ||
      location?.pathname === '/continue-with-mobile' ||
      location?.pathname.startsWith('/register') ||
      location?.pathname.startsWith('/login-with-email') ||
      location?.pathname === '/login-with-email-code' ||
      location?.pathname === '/login-with-mobile-code' ||
      location?.pathname === '/forgot-password'
    ) {
      setShowHeader(false);
      setShowFooter(false);
    } else {
      setShowHeader(true);
      setShowFooter(true);
    }
  }, [location?.pathname]);

  return (
    <>
      <div>
        {showHeader && localData?.Headerno === 1 && <Header />}
      </div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/signin" element={<LoginOption />} />
        <Route path="/continue-with-email" element={<ContinueWithEmail />} />
        <Route path="/continue-with-mobile" element={<ContinueWithMobile />} />
        <Route path="/register/*" element={<Registration />} />
        <Route path="/login-with-email" element={<LoginWithEmail />} />
        <Route path="/login-with-email-code" element={<LoginWithEmailCode />} />
        <Route path="/login-with-mobile-code" element={<LoginWithMobileCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pro-album" element={<ProAlbum />} />
      </Routes>
      <div>
        {showFooter && localData?.Footerno === 1 && <Footer />}
      </div>
    </>
  );
};

export default HemratnaProcatalog_App;
