import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Storeinit } from '../../utils/API/Home/Storeinit/Storeinit';

const PrivateRoutes = ({ isLoginStatus }) => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeout);
    }, [isLoginStatus]);

    if (isLoading) {
        return <div></div>;
    }

    const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(location?.pathname)}${location?.search}`;
    if (storeInit?.IsB2BWebsite != 0) {
        if (isLoginStatus != true) {
            if (location.pathname.startsWith('/p')
                || location.pathname.startsWith('/d')
                || location.pathname.startsWith('/certified-loose-lab-grown-diamonds')
                || location.pathname.startsWith('/cart')
                || location.pathname.startsWith('/Delivery')
                || location.pathname.startsWith('/Payment')
                || location.pathname.startsWith('/account')
                || location.pathname.startsWith('/Confirmation')
                || location.pathname.startsWith('/wishlist')
                || location.pathname.startsWith('/Lookbook')) {
                let storeInt = JSON.parse(sessionStorage.getItem("storeInit"));
                if (!storeInt) {
                    Storeinit();
                }
                return <Navigate to={redirectUrl} replace />;
            }
            else {
                return <Navigate to="/" replace />;
            }
        }
    }
    return <Outlet />;
};

export default PrivateRoutes;
