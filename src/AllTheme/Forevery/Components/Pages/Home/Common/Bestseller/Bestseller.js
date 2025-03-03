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

  const navigate = useNavigate();
  const addCategory = `Ring/category`;
  const addCategory1 = `Pendant/category`;
  const addCategory2 = `Earring/category`;
  const filterKeyVal = btoa(addCategory);
  const filterKeyVal1 = btoa(addCategory1);
  const filterKeyVal2 = btoa(addCategory2);

  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
  const steps2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
  const steps3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));

  const checkStepsOf0 =
    (steps?.[0] !== undefined && steps?.[0] !== null) ||
    (steps1?.[0] !== undefined && steps1?.[0] !== null) ||
    (steps2?.[0] !== undefined && steps2?.[0] !== null) ||
    (steps3?.[1] !== undefined && steps3?.[1] !== null);

  const checkSteps =
    (steps?.[2] !== undefined && steps?.[2] !== null) ||
    (steps1?.[2] !== undefined && steps1?.[2] !== null) ||
    (steps2?.[2] !== undefined && steps2?.[2] !== null) ||
    (steps3?.[1] !== undefined && steps3?.[1] !== null);

  const HandleSettingNavigation = (value) => {
    if (value === "Ring") {
      if (value === "Ring" && checkSteps) {
        navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=UmluZy9jYXRlZ29yeQ==`);
      } else {
        if (checkStepsOf0) {
          if (steps?.[0] !== undefined && steps?.[0] !== null) {
            sessionStorage.removeItem('customizeSteps')
            sessionStorage.removeItem("custStepData");
          } else {
            sessionStorage.removeItem('customizeSteps2Pendant');
            sessionStorage.removeItem('custStepData2Pendant')
            sessionStorage.removeItem('customizeSteps2Earring');
            sessionStorage.removeItem('custStepData2Earring')
          }
        }
        navigate(
          `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
        );
        sessionStorage.removeItem('isPair')
        const step1 = [{ step1: true, Setting: "Ring", id: 1, Status: "active" }];
        sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(step1));
      }
    }

    if (value === 'Pendant') {
      if (value === "Pendant" && checkSteps) {
        navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=${filterKeyVal1}`);
      } else {
        if (checkStepsOf0) {
          if (steps?.[0] !== undefined && steps?.[0] !== null) {
            sessionStorage.removeItem('customizeSteps')
            sessionStorage.removeItem("custStepData");
          } else {
            sessionStorage.removeItem('customizeSteps2Ring');
            sessionStorage.removeItem('custStepData2Ring')
            sessionStorage.removeItem('customizeSteps2Earring');
            sessionStorage.removeItem('custStepData2Earring')
          }
        }
        navigate(
          `/certified-loose-lab-grown-diamonds/settings/Pendant/M=${filterKeyVal1}`
        );
        sessionStorage.removeItem('isPair')
        const step1 = [{ step1: true, Setting: "Pendant", id: 2, Status: "active" }];
        sessionStorage.setItem("customizeSteps2Pendant", JSON.stringify(step1));
      }
    }
    if (value === 'Earring') {
      if (value === "Earring" && checkSteps) {
        navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=${filterKeyVal2}`);
      } else {
        if (checkStepsOf0) {
          if (steps?.[0] !== undefined && steps?.[0] !== null) {
            sessionStorage.removeItem('customizeSteps')
            sessionStorage.removeItem("custStepData");
          } else {
            sessionStorage.removeItem('customizeSteps2Ring');
            sessionStorage.removeItem('custStepData2Ring')
            sessionStorage.removeItem('customizeSteps2Pendant');
            sessionStorage.removeItem('custStepData2Pendant')
          }
        }
        navigate(
          `/certified-loose-lab-grown-diamonds/settings/Earring/M=${filterKeyVal2}`
        );
        sessionStorage.setItem('isPair', true)
        const step1 = [{ step1: true, Setting: "Earring", id: 3, Status: "active" }];
        sessionStorage.setItem("customizeSteps2Earring", JSON.stringify(step1));
      }
    }
  };
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
              onClick={() => HandleSettingNavigation("Ring")}
            >
              Customize Ring
            </button>
            <button className={`${btnstyle?.btn_for_new} ${btnstyle?.btn_15}`}
              onClick={() => HandleSettingNavigation("Earring")}
            >
              Customize Earring
            </button>
            <button className={`${btnstyle?.btn_for_new} ${btnstyle?.btn_15}`}
              onClick={() => HandleSettingNavigation("Pendant")}
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
