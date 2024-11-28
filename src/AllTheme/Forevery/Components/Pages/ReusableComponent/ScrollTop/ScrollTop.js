import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { LuChevronUpCircle } from "react-icons/lu";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isTabletView = useMediaQuery('(max-width: 768px)');
  const ScrollTopToBottom = () => {
    window.scrollTo({
      top: "0",
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight - 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className="scrolltop-for"
      style={{
        position: "fixed",
        bottom: "25px",
        right: isTabletView? "13px" :"45px",
        cursor: "pointer",
        opacity: !isVisible ? "0" : "1",
        display: !isVisible ? "none" : "block",
        transition: "0.3s ease-in-out",
        zIndex  :99999 ,
        backgroundColor  :"white",
        borderRadius  :"50%" ,
      }}
      onClick={ScrollTopToBottom}
    >
      <LuChevronUpCircle size={60} />
    </div>
  );
};

export default ScrollTop;
