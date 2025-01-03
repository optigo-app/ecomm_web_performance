// import { useEffect, useState } from "react";

// const checkUserLogin = () => {
//   const user = JSON.parse(sessionStorage.getItem("LoginUser"));
//   return !!user;
// };

// const usePromotionalBanner = () => {
//   const [openPromotionalBanner, setOpenPromotionalBanner] = useState(false);
//   const [timer, setTimer] = useState(null);

//   const handleCloseBanner = () => {
//     setOpenPromotionalBanner(false);
//     checkLoginAndShowBanner();
//   };

//   const checkLoginAndShowBanner = () => {
//     const userLoggedIn = checkUserLogin();

//     if (!userLoggedIn) {
//       const newTimer = setTimeout(() => {
//         setOpenPromotionalBanner(true);
//       }, 100);
//       setTimer(newTimer);
//     }
//   };

//   useEffect(() => {
//     checkLoginAndShowBanner();

//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//     };
//   }, []);

//   return {
//     openPromotionalBanner,
//     handleCloseBanner,
//   };
// };

// export default usePromotionalBanner;


import { useEffect, useState } from "react";

const usePromotionalBanner = () => {
  const [openPromotionalBanner, setOpenPromotionalBanner] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleCloseBanner = () => {
    setOpenPromotionalBanner(false);
    sessionStorage.setItem("promotionalBannerClosed", "true"); 
    resetTimer(); 
  };

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      if (!sessionStorage.getItem("promotionalBannerClosed")) {
        setOpenPromotionalBanner(true); 
      }
    }, 5 * 60 * 1000); // 5 minutes timer

    setTimer(newTimer);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("promotionalBannerClosed")) {
      resetTimer();
    }

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

