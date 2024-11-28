import { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { for_nav_height } from "../Recoil/atom";

const useNavbar = () => {
  const navRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [NavHeight, setNavHeight] = useRecoilState(for_nav_height);

  const updateNavbarHeight = () => {
    if (navRef.current) {
      setNavbarHeight(navRef.current.offsetHeight + 25);
      setNavHeight(navRef.current.offsetHeight + 25);
      console.log(navRef.current.offsetHeight, "navbar");
    }
  };

  useEffect(() => {
    updateNavbarHeight();

    window.addEventListener("load", updateNavbarHeight);
    window.addEventListener("resize", updateNavbarHeight);

    return () => {
      window.removeEventListener("load", updateNavbarHeight);
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

  useEffect(() => {
    if (logoLoaded) {
      updateNavbarHeight();
    }
  }, [logoLoaded, navbarHeight]);

  const handleLogoLoad = () => {
    setLogoLoaded(true);
  };

  return { navRef, navbarHeight, handleLogoLoad };
};

export default useNavbar;
