import React from "react";
import "./Banner.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";

const Banner = ({data}) => {
  const Banner = `${storImagePath()}/Forevery/usp.png`;
console.log(data,"data")
  return (
    <div className="for_Banner">
      <div className="image_banner_for">
        <img src={data?.image?.[0]} alt="usp" />
      </div>
      <MobileBanner mobileiamge={data?.image} />
    </div>
  );
};

export default Banner;

const MobileBanner = ({mobileiamge}) => {
  return (
    <>
      <div className="mobile-images">
        <img
          className="mb-images"
          // src={`${storImagePath()}/Forevery/2.png`}
          src={mobileiamge[1]}
          alt="USP"
        />
        <img
          className="mb-images"
          // src={`${storImagePath()}/Forevery/1.png`}
          src={mobileiamge[2]}
          alt="USP"
        />
        <img
          className="mb-images"
          // src={`${storImagePath()}/Forevery/3.png`}
          src={mobileiamge[3]}
          alt="USP"
        />
      </div>
    </>
  );
};
