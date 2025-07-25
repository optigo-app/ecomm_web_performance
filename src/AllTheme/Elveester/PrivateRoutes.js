import React, { useState, useEffect, memo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Storeinit } from "../../utils/API/Home/Storeinit/Storeinit";

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

  const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(
    location?.pathname
  )}${location?.search}`;

  if (storeInit?.IsB2BWebsite != 0) {
    if (!isLoginStatus) {
      if (
        location.pathname.startsWith("/p") ||
        location.pathname.startsWith("/d") ||
        location.pathname.startsWith("/cartPage") ||
        location.pathname.startsWith("/myWishList") ||
        location.pathname.startsWith("/Delivery") ||
        location.pathname.startsWith("/payment") ||
        location.pathname.startsWith("/Confirmation") ||
        location.pathname.startsWith("/Lookbook") ||
        location.pathname.startsWith("/account")
      ) {
        let storeInt = JSON.parse(sessionStorage.getItem("storeInit"));
        if (!storeInt) {
          Storeinit();
        }
        return <Navigate to={redirectUrl} />;
      } else {
        return <Navigate to="/" />;
      }
    }
  }
  return <Outlet />;
};

export default PrivateRoutes;
