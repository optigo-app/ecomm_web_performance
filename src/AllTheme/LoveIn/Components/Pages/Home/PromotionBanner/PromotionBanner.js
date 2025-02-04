import React, { useEffect } from "react";
import "./PromotionBanner.modul.scss";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import FLower from "../../../Assets/flower.svg";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ZigZagLine from "../../../SVGComponent/ZigZagline";
import { useMediaQuery } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { lov_loginState, smr_loginState } from "./../../../Recoil/atom";
import { useRecoilValue } from "recoil";

const PromotionalBanner = ({ onClose, disablescreen }) => {
  const navigate = useNavigate();
  const islogin = useRecoilValue(lov_loginState);
  const image = {
    banner: `${storImagePath()}/images/HomePage/Promotion/banner.webp`,
    banner1: `${storImagePath()}/images/HomePage/Promotion/1.png`,
    banner2: `${storImagePath()}/images/HomePage/Promotion/2.png`,
  };
  const flower = FLower;

  const maxWidth1300px = useMediaQuery("(max-width:1300px)");
  const maxWidth900px = useMediaQuery("(max-width:900px)");
  const maxWidth550px = useMediaQuery("(max-width:550px)");

  const HandleDiscover = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    if (storeinit?.IsB2BWebsite == 1) {
      if (islogin) {
        navigate("/lookbook");
        onClose();
      } else {
        navigate("/LoginOption");
        onClose();
      }
    } else {
      navigate("/lookbook");
      onClose();
    }
  };
  useEffect(() => {
    if (disablescreen) {
      document.body.style.overflow = "hidden";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.userSelect = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.userSelect = "auto";
    };
  }, [disablescreen]);

  return (
    <div className="smr_pm_PromotionalBanner">
      <div className="promotional-banner-new">
        <div className="pb_m_close">
          <button onClick={onClose}>
            <IoClose size={21} />
          </button>
        </div>
        <div className="main_pb_banner">
          <img src={image.banner2} alt="pb_b" />
        </div>
        <div className="jewelry-info">
          <h2 className="jewelry-heading">Exclusive Jewelry Collection</h2>
          <p className="jewelry-description">
            Discover timeless elegance with our curated selection of rings,
            necklaces, and bracelets. Crafted with precision and designed to
            elevate any occasion, our jewelry promises to add a touch of luxury
            to your style.
          </p>
          <button className="jewelry-btn" onClick={HandleDiscover}>
            Discover Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;

// {
/* 
                <div className="promotional-banner">
<div className="banner-content">
<div className="main-content">
    {!maxWidth900px && (
        <ZigZagLine height={300} width={15} color="#D1D5DB" strokeWidth={1.5} />
    )}
    <div className="left-content">
        <h1 className="main-heading">
            {!maxWidth1300px ? (
                <>
                    <span>Essential</span>
                    <br />
                    <span>Accessories</span>
                </>
            ) : (
                <span>Essential Accessories</span>
            )}
        </h1>

        <div className="cta-box">
            <p className="cta-text">elevate your style game</p>
        </div>

        <div className="star-decor">
            {[1, 2, 3].map((_, i) => (
                <MdOutlineStarPurple500 size={maxWidth550px ? 15 : 28} key={i} />
            ))}
        </div>
    </div>

    <div className="right-image-container">
        {!maxWidth900px && (
            <div className="flower-image-container top">
                <img src={flower} alt="Flower Decoration" className="flower-image" />
            </div>
        )}

        <img
            src={image?.banner}
            alt="Gold rings on beige background"
            className="main-image"
        />

        {!maxWidth900px && (
            <div className="flower-image-container bottom">
                <img src={flower} alt="Flower Decoration" className="flower-image rotated" />
            </div>
        )}
    </div>
</div>

<div className="corner-decor">
    <RxCross2 className="corner-cancel" onClick={onClose} />
</div>
            </div>
</div> */
// }
