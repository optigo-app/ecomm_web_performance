import React from "react";
import "./PromotionalBanner.scss";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { IoClose } from "react-icons/io5";

const PromotionalBanner = ({ onClose }) => {
  const imgCol = {
    logo: `${storImagePath()}/Forevery/promotion/logo.png`,
    banner: `${storImagePath()}/Forevery/promotion/offer.webp`,
  };
  return (
    <div className="for_pm_PromotionalBanner">
      <div class="discount-popup ">
        <div class="for-col-discount">
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
        </div>
        <div
          class="for-col-image"
          style={{
            backgroundImage: `url(${imgCol?.banner})`,
          }}
        >
          {/* <img src={imgCol?.banner} alt=""/> */}
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
