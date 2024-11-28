import React from "react";
import "./Banner.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";

const Banner = () => {
  const Banner = `${storImagePath()}/Forevery/usp.png`;

  return (
    <div className="for_Banner">
      <div className="image_banner_for">
        <img src={Banner} alt="usp" />
      </div>
      <MobileBanner />
    </div>
  );
};

export default Banner;

const MobileBanner = () => {
  return (
    <>
      <div className="mobile-images">
        <img
          className="mb-images"
          src={`${storImagePath()}/Forevery/2.png`}
          alt="USP"
        />
        <img
          className="mb-images"
          src={`${storImagePath()}/Forevery/1.png`}
          alt="USP"
        />
        <img
          className="mb-images"
          src={`${storImagePath()}/Forevery/3.png`}
          alt="USP"
        />
      </div>
    </>
  );
};
