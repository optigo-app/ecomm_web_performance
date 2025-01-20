import React from "react";
import "./PromotionalBanner.scss";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { IoClose } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { for_companyLogo, for_companyLogoM } from "../../Recoil/atom";
import useHomeBannerImages from "../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";

const PromotionalBanner = ({ onClose ,img }) => {
  const compnyLogo = useRecoilValue(for_companyLogo);
  const compnyLogoM = useRecoilValue(for_companyLogoM);
  const {popup} =useHomeBannerImages();
  const imgCol = {
    logo: `${storImagePath()}/Forevery/promotion/logo.png`,
    banner: `${storImagePath()}/Forevery/promotion/offer.webp`,
  };
  
  return (
    <div className="for_pm_PromotionalBanner">
      <div class="discount-popup ">
      <div class="close_for_btn">
            <IoClose onClick={onClose} className="close_for_api" size={22}/>
          </div>
      <div className="forevery_center_mode">
        <div className="title_cm">
        <img src={imgCol?.logo} alt="Forevery" />
        </div>
      </div>
      <div
          class="for-col-image"
          style={{
            backgroundImage: `url(${popup?.image?.[1]})`,
            // backgroundImage: `url(${imgCol?.banner})`,
          }}
        >
          {/* <img src={imgCol?.banner} alt=""/> */}
        </div>
        {/* <div class="for-col-discount">
          <div class="close_for_btn">
            <IoClose onClick={onClose} className="close_for_api" size={22}/>
          </div>
          <div class="for_li_logo ">
            <img src={imgCol?.logo} alt="Forevery" />
          </div>
          <div class="for_pb_title">
            <span className="pb-for_1">SUSTAINABLE </span>
            <span className="pb-for_2">LAB-GROWN</span>
            <span className="pb-for_2">DIAMOND JEWELRY!</span>  
          </div>
          <div class="for_line">
            <span className="line_li_12" />
          </div>
          <p class="for_desc_meow_meow">
            sign up for upcoming exclusive offers and exciting updates.
          </p>
          <div class="for_pb_btn">
            <button>sign up</button>
          </div>
          <p class="for_pb_note">
            We respect your privacy. Your information will be keep confidential
          </p>
        </div> */}
        <div class="for-col-discount" style={{
            backgroundImage: `url(${popup?.image?.[2]})`,
            // backgroundImage: `url(${imgCol?.banner})`,
          }}
          >
            <div className="content">
            <h2>Visit Our B2C Website.</h2>
            <h4>For more Exclusive Designs and Offers.</h4>
  
            <div class="for_pb_btn">
            <a href="https://www.forevery.one" onClick={onClose} target="_blank">Shop The Collection</a>
          </div>

            </div>
                  </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;

