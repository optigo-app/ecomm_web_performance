import { useEffect, useState } from "react";

const checkUserLogin = () => {
  const user = JSON.parse(sessionStorage.getItem("LoginUser"));
  return !!user;
};

const usePromotionalBanner = () => {
  const [openPromotionalBanner, setOpenPromotionalBanner] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleCloseBanner = () => {
    setOpenPromotionalBanner(false);
    checkLoginAndShowBanner();
  };

  const checkLoginAndShowBanner = () => {
    const userLoggedIn = checkUserLogin();

    if (!userLoggedIn) {
      const newTimer = setTimeout(() => {
        setOpenPromotionalBanner(true);
      }, 120000);
      // }, 15000);
      setTimer(newTimer);
    }
  };

  useEffect(() => {
    checkLoginAndShowBanner();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return {
    openPromotionalBanner,
    handleCloseBanner,
  };
};

export default usePromotionalBanner;
