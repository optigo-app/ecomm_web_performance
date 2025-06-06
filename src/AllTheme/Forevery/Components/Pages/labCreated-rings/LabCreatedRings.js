import React, { useEffect, useState } from "react";
import "./LabCreatedRings.scss";
import { useNavigate } from "react-router-dom";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import btnstyle from "../../scss/Button.module.scss";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { for_customizationSteps1, for_customizationSteps, for_isRingFlowOn } from '../../Recoil/atom';
import { metalcollection } from "../../data/NavbarMenu";
import { RxCross1 } from "react-icons/rx";
import ShapeSection from "../Home/Common/ShapeSection/ShapeSection";
import RingCarousel from "../Home/Common/ProductCarousel/RingCarousel";
import NewsLetter from "../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import MountModel from "../ReusableComponent/MountModel/MountModel";
import { Dialog, DialogContent } from "@mui/material";

const LabCreatedRings = () => {
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  const navigate = useNavigate();
  const addCategory = `Ring/category`;
  const filterKeyVal = btoa(addCategory);
  const isRingFlowOn = useRecoilValue(for_isRingFlowOn);

  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
  const steps2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
  const steps3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));

  const checkStepsOf0 =
    (steps?.[0] !== undefined && steps?.[0] !== null) ||
    (steps1?.[0] !== undefined && steps1?.[0] !== null) ||
    (steps2?.[0] !== undefined && steps2?.[0] !== null) ||
    (steps3?.[0] !== undefined && steps3?.[0] !== null);

  const checkSteps =
    (steps?.[2] !== undefined && steps?.[2] !== null) ||
    (steps1?.[2] !== undefined && steps1?.[2] !== null) ||
    (steps2?.[2] !== undefined && steps2?.[2] !== null) ||
    (steps3?.[2] !== undefined && steps3?.[2] !== null);

  const handleSettingNavigation = () => {
    // const regex = /M=([^/]+)/;
    // const match = link.match(regex);
    // if (match) {
    //   mValue = match[1];
    // } else {
    //   // console.log('M value not found.');
    // }

    if (checkSteps) {
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
      sessionStorage.setItem('isRing', true)
      sessionStorage.removeItem('isPair')
      sessionStorage.removeItem('isPendant')
      navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
    }
  };

  const encodeLink = (link) => btoa(link);

  const styleLinks = {
    Solitaire: "Solitaire/style",
    Halo: "Halo/style",
    Vintage: "Vintage/style",
    Side_Stone: "Side Stone/style",
    Designer: "Designer/style",
  };

  const ringscollection = [
    {
      key: "solitaire",
      image: `${storImagePath()}/Forevery/ring-col/1.webp`,
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Solitaire/M=${encodeLink(styleLinks?.Solitaire)}`,
      link1: `/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/Solitaire/M=${encodeLink(styleLinks?.Solitaire)}`,
    },

    {
      key: "halo",
      image: `${storImagePath()}/Forevery/ring-col/4.webp`,
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Halo/M=${encodeLink(styleLinks?.Halo)}`,
      link1: `/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/Halo/M=${encodeLink(styleLinks?.Halo)}`,
    },
    {
      key: "vintage",
      image: `${storImagePath()}/Forevery/ring-col/7.webp`,
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Vintage/M=${encodeLink(styleLinks?.Vintage)}`,
      link1: `/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/Vintage/M=${encodeLink(styleLinks?.Vintage)}`,
    },
    {
      key: "side stone",
      image: `${storImagePath()}/Forevery/ring-col/10.webp`,
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Side_Stone/M=${encodeLink(styleLinks?.Side_Stone)}`,
      link1: `/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/Side_Stone/M=${encodeLink(styleLinks?.Side_Stone)}`,
    },
    {
      key: "designer",
      image: `${storImagePath()}/Forevery/ring-col/13.webp`,
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Designer/M=${encodeLink(styleLinks?.Designer)}`,
      link1: `/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/Designer/M=${encodeLink(styleLinks?.Designer)}`,
    },
  ];

  const handleStyleSettFlow = (link, link1) => {
    if (checkSteps) {
      navigate(link1);
    } else {
      if (checkStepsOf0) {
        sessionStorage.removeItem('customizeSteps')
        sessionStorage.removeItem("custStepData");
      }
      navigate(link);
      const step1 = [{ step1: true, Setting: "Ring", id: 1, Status: "active" }];
      sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(step1));
    }
  }

  return (
    <div className="for_LabCreatedRings">
      <Banner handleSettingNavigation={handleSettingNavigation} />
      {isRingFlowOn === 1 &&
        <CategoryGrid data={ringscollection} handleStyleSettFlow={handleStyleSettFlow} />
      }
      {isRingFlowOn === 1 &&
        <DesignyourOwn />
      }
      {isRingFlowOn === 1 &&
        <ShapeSection />
      }
      <Metalcolor />
      <RingCarousel showmore={true} />
      <BannerNew handleSettingNavigation={handleSettingNavigation} />
      {/* <NewsLetter /> */}
    </div>
  );
};

export default LabCreatedRings;

const Banner = ({ handleSettingNavigation }) => {
  const navigate = useNavigate();
  const addCategory = `Ring/category`;
  const filterKeyVal = btoa(addCategory);
  const isRingFlowOn = useRecoilValue(for_isRingFlowOn);

  return (
    <>
      <div
        className="lab_ring_for_banner"
        style={{
          background: `url(${storImagePath()}/Forevery/99.webp)`,
        }}
      >
        <div class="container-lab">
          <h1 class="title_lab">Lab Grown Engagement Rings</h1>
          <p class="desc_lab">
            Looking for an engagement ring that is both beautiful and
            sustainable? Say yes to love and sustainability with a Forevery
            engagement ring. From classic solitaires to unique and trendy
            styles, we have something for “Everyone”. Choose a ring that
            represents your commitment to each other and to the planet.
          </p>
          {isRingFlowOn === 1 &&
            <button
              className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
              onClick={handleSettingNavigation}
            >
              SHOP ENGAGEMENT RING
            </button>
          }
        </div>
      </div>
      <div className="breadCrumb-lab">
        <Link to={"/"}>Home </Link>
        <span>/</span>
        <span>Engagement Rings</span>
      </div>
    </>
  );
};
export const CategoryGrid = ({ title = "Find Your Forever Ring", data, handleStyleSettFlow }) => {
  return (
    <>
      <div className="lab-CategoryGrid">
        <div className="heading">
          <h1>{title}</h1>
        </div>
        <div className="grid_container">
          {data?.map((val, i) => {
            return (
              <div key={i} className="card-grid">
                <div onClick={() => handleStyleSettFlow(val?.link)}>
                  <img src={val?.image} loading="lazy" alt="" />
                </div>
                <div className="title_For_q">{val?.key}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
const DesignyourOwn = () => {

  const navigate = useNavigate();
  const [showModal1, setShowModal1] = useState(false);

  const createYesUrl = `/certified-loose-lab-grown-diamonds/diamond/`;

  const [customizeStep, setCustomizeStep] = useRecoilState(
    for_customizationSteps
  );
  const [customizeStep1, setCustomizeStep1] = useRecoilState(
    for_customizationSteps1
  );
  const [showModal, setShowModal] = useState(false);
  const [checkIndex, setCheckIndex] = useState();
  const [typeFlow, setTypeFlow] = useState();

  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
  const steps2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
  const steps3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));

  const createUrl = `/d/setting-complete-product/det345/?p=${(steps ?? steps1 ?? steps2)?.[2]?.url}`;

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const handleConfirm = () => {
    navigate(createUrl);
  }

  const checkSteps =
    (steps?.[2] !== undefined && steps?.[2] !== null) ||
    (steps1?.[2] !== undefined && steps1?.[2] !== null) ||
    (steps2?.[2] !== undefined && steps2?.[2] !== null) ||
    (steps3?.[2] !== undefined && steps3?.[2] !== null);

  const checkStepsOf0 =
    (steps?.[0] !== undefined && steps?.[0] !== null) ||
    (steps1?.[0] !== undefined && steps1?.[0] !== null) ||
    (steps2?.[0] !== undefined && steps2?.[0] !== null) ||
    (steps3?.[0] !== undefined && steps3?.[0] !== null);

  const handleCheckSteps = (value, index, style, link, type) => {
    let isStepValid = false;

    if (value === "Ring") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps;
      } else {
        isStepValid = false;
        sessionStorage.setItem('isRing', true)
        sessionStorage.removeItem('isPair')
        sessionStorage.removeItem('isPendant')
      }
    }

    if (value === "Diamond") {
      isStepValid = true;
    }
    if (isStepValid) {
      setShowModal(true);
      setTypeFlow(type)
      setCheckIndex(index);
    } else {
      console.log("Alternative action");

      if (style !== "" && link !== "") {
        if (value === 'Ring') {
          navigate(link);
        }
      } else if (style === "" && link !== "") {
        if (value === 'Ring') {
          navigate(link);
        }
      } else {
        if (value === 'Ring') {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=UmluZy9jYXRlZ29yeQ==`);
        }
      }
    }
  };

  const handleToggle1 = () => {
    setShowModal1(!showModal1);
  }

  const handleNoConfirm = () => {
    if (steps1?.[0]?.Status === 'active') {
      const getRingSteps = [...steps1];
      sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(getRingSteps));
      setShowModal(false);
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${getRingSteps?.[1]?.shape}`);
    }
    if (steps2?.[0]?.Status === 'active') {
      const getPendantSteps = [...steps2];
      sessionStorage.setItem("customizeSteps2Pendant", JSON.stringify(getPendantSteps));
      setShowModal(false);
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${getPendantSteps?.[1]?.shape}`);
    }
    if (steps3?.[0]?.Status === 'active') {
      const getEarringSteps = [...steps3];
      sessionStorage.setItem("customizeSteps2Earring", JSON.stringify(getEarringSteps));
      setShowModal(false);
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${getEarringSteps?.[1]?.shape}`);
    }
  };

  const HandleSettingNavigation = (value) => {
    const addCategory = `Ring/category`;
    const filterKeyVal = btoa(addCategory);
    const addCategory1 = `Pendant/category`;
    const filterKeyVal1 = btoa(addCategory1);
    const addCategory2 = `Earring/category`;
    const filterKeyVal2 = btoa(addCategory2);

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
        setCustomizeStep1({
          step1: true,
        });
        sessionStorage.removeItem('isPair')
        const step1 = [{ step1: true, Setting: "Ring", id: 1, Status: "active" }];
        sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(step1));
      }
    }
  }

  const HandleDiamondNavigation = (value) => {
    const isEarring = value === "earring";
    const isRing = value === "ring";
    const isPendant = value === "pendant";

    if (
      checkStepsOf0 &&
      (steps1?.[1]?.step2 !== true &&
        steps2?.[1]?.step2 !== true &&
        steps3?.[1]?.step2 !== true)
    ) {
      if (isEarring) {
        sessionStorage.setItem("isPair", true);
        sessionStorage.removeItem("isRing");
        sessionStorage.removeItem('isPendant');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`, {
          state: { isPairFlow: true },
        });
      } if (isRing) {
        sessionStorage.setItem('isRing', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isPendant');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
      }
      if (isPendant) {
        sessionStorage.setItem('isPendant', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isRing');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
      }
    } else if (steps1?.[1]?.step2 === true || steps2?.[1]?.step2 === true || steps3?.[1]?.step2 === true) {
      const getShape = steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape;
      if (getShape) {
        setShowModal1(true);
        setTypeFlow(value);
      } else {
        handleNoConfirm();
      }
    } else {
      if (isEarring) {
        sessionStorage.setItem("isPair", true);
        sessionStorage.removeItem("isRing");
        sessionStorage.removeItem('isPendant');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`, {
          state: { isPairFlow: true },
        });
      } if (isRing) {
        sessionStorage.setItem('isRing', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isPendant');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
      }
      if (isPendant) {
        sessionStorage.setItem('isPendant', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isRing');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
      }
    }

    // Common logic executed after navigation
    setCustomizeStep({
      step1: true,
    });

    // const step1 = [{ step1: true, shape: "All" }];
    // sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
  };

  const handleRemoveData = (index) => {
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    sessionStorage.removeItem("custStepData2Ring");
    sessionStorage.removeItem("customizeSteps2Ring");
    sessionStorage.removeItem("customizeSteps2Pendant");
    sessionStorage.removeItem("custStepData2Pendant");
    sessionStorage.removeItem("customizeSteps2Earring");
    sessionStorage.removeItem("custStepData2Earring");
    sessionStorage.removeItem("setImage");
    sessionStorage.removeItem("setPenImage");
    sessionStorage.removeItem("setEarImage");
    sessionStorage.removeItem('isPair');
    sessionStorage.removeItem('isPendant');
    sessionStorage.removeItem('isRing');
    sessionStorage.removeItem('ringFlowUrl');
    sessionStorage.removeItem('PendantFlowUrl');
    sessionStorage.removeItem('EarringFlowUrl');
    sessionStorage.removeItem('ShapeRingFlowUrl')
    sessionStorage.removeItem('ShapePendantFlowUrl')
    sessionStorage.removeItem('ShapeEarringFlowUrl')

    if (index === 0) {
      if (typeFlow === "Ring") {
        sessionStorage.setItem('isRing', true)
      } else if (typeFlow === "Pendant") {
        sessionStorage.setItem('isPendant', true)
      } else if (typeFlow === "Earring") {
        sessionStorage.setItem('isPair', true)
      }
      navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
    } else if (index === 1) {
      const addCategory = `Ring/category`;
      const filterKeyVal = btoa(addCategory);
      navigate(
        `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
      );
    }
    handleToggle();
  };


  return (
    <>
      <div
        className="DesignyourOwn"
        style={{
          background: `url(${storImagePath()}/Forevery/100.png)`,
        }}
      >
        <div className="flex_Design_box">
          <div className="image_continer">
            <img src={`${storImagePath()}/Forevery/103.png`} alt="" />
          </div>
          <div className="details_container">
            <div className="head">Design your own</div>
            <div className="head_ti">Engagement Ring</div>
            <p>
              Design your dream engagement ring online with ease using our
              user-friendly platform. Choose from a wide range of styles,
              diamonds, and precious metals to create the perfect symbol of your
              eternal love and commitment. Start your journey towards a lifetime
              of love today!
            </p>
            <div className="btn">
              {checkSteps ? (
                <button
                  onClick={() => handleCheckSteps("Ring", 1, "", "/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==")}
                  className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                >
                  start with setting
                </button>
              ) : (
                <button
                  onClick={() => {
                    HandleSettingNavigation("Ring");
                  }}
                  className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                >
                  start with setting
                </button>
              )}
              <span>OR</span>
              {checkSteps ? (
                <button
                  className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                  onClick={() => handleCheckSteps("Diamond", 0, "", "", "Ring")}
                >
                  start with a diamond
                </button>
              ) : (
                <button
                  onClick={() => HandleDiamondNavigation()}
                  className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                >
                  start with a diamond
                </button>
              )}
            </div>
          </div>
        </div>
      </div >
      <Modal
        open={showModal}
        handleConfirm={handleConfirm}
        handleClose={handleToggle}
        handleRemoveData={handleRemoveData}
        index={checkIndex}
      />
      <CheckingDiaSetModal
        open={showModal1}
        link1={createYesUrl}
        handleNoConfirm={handleNoConfirm}
        handleClose={handleToggle1}
        handleRemoveData={handleRemoveData}
        index={checkIndex}
        flowType={typeFlow}
      />
    </>
  );
};
const BannerNew = ({ handleSettingNavigation }) => {
  const navigate = useNavigate();
  const addCategory = `Ring/category`;
  const filterKeyVal = btoa(addCategory);
  const isRingFlowOn = useRecoilValue(for_isRingFlowOn);

  return (
    <>
      <div
        className="lab_ring_for_banner"
        style={{
          background: `url(${storImagePath()}/Forevery/101.png)`,
          backgroundColor: " rgba(218, 200, 300, 29) !important",
        }}
      >
        <div className="overlay"></div>
        <div
          class="container-lab"
          style={{
            color: "white",
            zIndex: 100,
          }}
        >
          <div className="head">Make her heart race</div>
          <h1
            class="title_lab"
            style={{
              textTransform: "uppercase",
              fontSize: "36px",
              fontWeight: "500",
            }}
          >
            Unique & Trending Collection
          </h1>
          <p
            class="desc_lab"
            style={{
              fontSize: "16px",
              lineHeight: "22px",
              fontWeight: "400",
            }}
          >
            We offers a huge lab grown diamonds jewelry collection. Surprise
            your significant other with a stunning diamond jewelry and a
            proposal they will never forget. Browse our collection now and find
            the perfect diamond jewelry for your love story.
          </p>
          {isRingFlowOn === 1 &&
            <button
              style={{
                color: "white",
              }}
              onClick={handleSettingNavigation}
              className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
            >
              View All Engagement Ring
            </button>
          }
        </div>
      </div >
    </>
  );
};
const Metalcolor = () => {
  return (
    <>
      <div className="for_Metalcolor">
        <div className="heading_metal">
          <h1>Shop by metal</h1>
          <p>
            With options for different metal finishes, you can find the perfect
            piece to match your soulmate’s personal style. Whether you're
            looking for a special gift for special one or want to treat
            yourself, Forevery has you covered.
          </p>
        </div>
        <div className="metal_grid">
          {metalcollection?.map((val, i) => {
            return (
              <div className="metal_card">
                <a href="#">
                  <img src={val?.image} alt="" />
                </a>
                <h1>{val?.key}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};


const Modal = ({ open, handleConfirm, handleClose, handleRemoveData, index }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 9999999,
          "& .MuiDialog-root": {
            zIndex: 9999,
          },
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            border: "1px solid white",
            zIndex: 9999,
          },
          "& .MuiDialogContent-root": {
            padding: "10px",
          },
        }}
      >
        <DialogContent
          sx={{
            minWidth: 260,
            padding: "0px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="for_modal_cancel_btn_nav_div" onClick={handleClose}>
            <RxCross1 className="for_modal_cancel_nav_btn" size={"12px"} />
          </div>
          <div className="for_modal_inner_nav_div">
            <span className="for_modal_nav_title">
              You have already selected mount & diamond, would you like to view
              it?
            </span>
            <div className="for_modal_buttons_nav_div">
              <button
                onClick={() => {
                  handleConfirm();
                  handleClose();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleRemoveData(index);
                }}
              >
                No
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const CheckingDiaSetModal = ({ open, link1, handleNoConfirm, handleClose, handleRemoveData, index, shape, flowType }) => {

  const handleYesConfirm = () => {
    sessionStorage.removeItem("customizeSteps2Ring");
    sessionStorage.removeItem("custStepData2Ring");
    sessionStorage.removeItem('isRing');
    sessionStorage.removeItem("setImage");
    sessionStorage.removeItem('ringFlowUrl')
    sessionStorage.removeItem('ShapeRingFlowUrl')
    sessionStorage.removeItem("customizeStepsPendant");
    sessionStorage.removeItem("custStepData2Pendant");
    sessionStorage.removeItem("setPenImage");
    sessionStorage.removeItem("isPendant");
    sessionStorage.removeItem('PendantFlowUrl')
    sessionStorage.removeItem('ShapePendantFlowUrl')
    sessionStorage.removeItem("customizeStepsEarring");
    sessionStorage.removeItem("custStepData2Earring");
    sessionStorage.removeItem("setEarImage");
    sessionStorage.removeItem("isPair");
    sessionStorage.removeItem('EarringFlowUrl')
    sessionStorage.removeItem('ShapeEarringFlowUrl')
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    handleClose();
    const step = [{ step1: true, shape: "All" }]
    sessionStorage.setItem('customizeSteps', JSON.stringify(step));
    if (flowType !== "") {
      if (flowType === "ring") {
        sessionStorage.setItem('isRing', 'true')
      } else if (flowType === "pendant") {
        sessionStorage.setItem('isPendant', 'true')
      } else if (flowType === "earring") {
        sessionStorage.setItem('isPair', 'true')
      }
    }
    window.location.href = `${link1}${shape ? shape : ""}`;
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 9999999,
          "& .MuiDialog-root": {
            zIndex: 9999,
          },
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            border: "1px solid white",
            zIndex: 9999,
          },
          "& .MuiDialogContent-root": {
            padding: "10px",
          },
        }}
      >
        <DialogContent
          sx={{
            minWidth: 260,
            padding: "0px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="for_modal_cancel_btn_nav_div" onClick={handleClose}>
            <RxCross1 className="for_modal_cancel_nav_btn" size={"12px"} />
          </div>
          <div className="for_modal_inner_nav_div">
            <span className="for_modal_nav_title">
              This Diamond Shape Is Not Compatible With Your Selected Setting.
              Do You Want To Remove Selected Setting And Continue?
            </span>
            <div className="for_modal_buttons_nav_div">
              <button
                onClick={() => {
                  handleYesConfirm();
                  handleClose();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleNoConfirm();
                }}
              >
                No
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};