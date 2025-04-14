import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Storeinit } from '../../utils/API/Home/Storeinit/Storeinit';
import { useRecoilValue } from 'recoil';
import { IsSecurityKey } from './Components/Recoil/atom';

const PrivateRoutes = ({ isLoginStatus }) => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const getSecurityKey = useRecoilValue(IsSecurityKey);
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 500);

        return () => clearTimeout(timeout);
    }, [isLoginStatus]);


    if (isLoading) {
        return <div></div>;
    }

    const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(location?.pathname)}${location?.search}`;
    const url = `${location?.pathname}${location?.search}`;
    let navVal = url?.split('/')[3]; 
    let securityKey = navVal?.includes('K=') ? navVal.split('K=')[1].split('/')[0] : null;
    let albumSecurityId = null;
    try {
      if (securityKey) {
        albumSecurityId = atob(securityKey);
      }
    } catch (e) {
      console.warn("Invalid base64 securityKey:", e);
    }

    if (location.pathname.startsWith('/p') && albumSecurityId == 0) {
        return <Outlet />;
      }
  

    if (storeInit?.IsB2BWebsite != 0) {
        if (isLoginStatus != true && getSecurityKey == 1) {
            if (location.pathname.startsWith('/p')
                || location.pathname.startsWith('/d')
                || location.pathname.startsWith('/cartPage')) {
                let storeInt = JSON.parse(sessionStorage.getItem("storeInit"));
                if (!storeInt) {
                    Storeinit();
                }
                return <Navigate to={redirectUrl} replace />;
            }
            else {
                return <Navigate to="/" />;
            }
        }
    }
    return <Outlet />;
};

export default PrivateRoutes;
