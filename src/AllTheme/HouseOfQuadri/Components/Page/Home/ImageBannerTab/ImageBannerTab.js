import React from "react";
import "./ImageBannerTab.modul.scss";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const ImageBannerTab = () => {
  return (
    <>
      <div className="hoq_main_ImageBannerTab">
        <div className="banner">
          <img
            src={`${storImagePath()}/images/HomePage/others/cert.webp`}
            alt=""
          />
        </div>
        <button>
        <a
          href={`${storImagePath()}/images/certificate/guide.pdf`}
          target="_blank"
        >
            View sample certificate
          </a>
        </button>
      </div>
      <div className="MOBILE_BANNER">
        <MobileImageBannerTab />
      </div>
    </>
  );
};

export default ImageBannerTab;

const MobileImageBannerTab = () => {
  return (
    <>
      <div className="banner">
        <img
          src={`${storImagePath()}/images/HomePage/others/mobcert.webp`}
          alt="HOQ"
        />
      </div>
      <p>
        HOQ believes that your diamonds should empower you, and we make sure we
        stick by our promise in more ways than one.
      </p>
      <button>Read More</button>
      <button>
        <a
          href={`${storImagePath()}/images/certificate/guide.pdf`}
          target="_blank"
        >
          View sample certificate
        </a>
      </button>
    </>
  );
};
