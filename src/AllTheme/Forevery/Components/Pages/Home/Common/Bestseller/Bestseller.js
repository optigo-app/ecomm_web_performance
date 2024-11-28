import React, { useEffect, useRef } from "react";
import "./Bestseller.scss";
import { FaChevronDown } from "react-icons/fa";
import btnstyle from "../../../../scss/Button.module.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import { useNavigate } from "react-router-dom";


const Bestseller = () => {
  const videoRef = useRef(null);
  const VidePath = `${storImagePath()}/Forevery/created-labgrown.mp4`;
  const Navigation = useNavigate();
  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play();
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(videoElement);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="for_Bestseller">
      <div className="for_heading">
        <button
          className={`${btnstyle?.btn_for_new} ${btnstyle?.btn_15}`}
          onClick={() => Navigation(`/p/BestSeller/?N=${btoa("BestSeller")}`)}
          // /p/BestSeller/?N=QmVzdFNlbGxlcg==
        >
          SHOP'S BESTSELLERS{" "}
          <FaChevronDown size={20} style={{ marginTop: "-3px" }} />
        </button>
      </div>
      <div className="vid_block">
        <div className=" video-column ">
          <video
            ref={videoRef}
            className="for_desktop"
            width="100%"
            src={VidePath}
            autoPlay={true}
            preload="false"
            muted={true}
            loop={true}
            playsInline={true}
          ></video>
        </div>
        <div className="for_details">
          <h2 className=" for_title">You Desire, We Deliver It.</h2>
          <h5 className="for_Subtitle">
            Create Custom Diamond Jewelry that Matches Your Style.
          </h5>
          <p className="det_para">
            Search through hundreds of engagement ring sets to discover the
            ideal ring. Styles range from solitaire to vintage-inspired to
            everything in between, including settings made specifically for
            engagements. Begin creating your personalized engagement ring with
            handcrafted ring settings made to endure a lifetime.
          </p>
          <div className="for_col_btn">
            <button className={`${btnstyle?.btn_for_new} ${btnstyle?.btn_15}`}
            onClick={()=>Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`)}
            >
              Customize Ring
            </button>
            <button className={`${btnstyle?.btn_for_new} ${btnstyle?.btn_15}`}
            onClick={()=>Navigation(`/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ==`)}
            >
              Customize Earring
            </button>
            <button className={`${btnstyle?.btn_for_new} ${btnstyle?.btn_15}`}
            onClick={()=>Navigation(`/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ==`)}
            >
              Customize Pendant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestseller;
