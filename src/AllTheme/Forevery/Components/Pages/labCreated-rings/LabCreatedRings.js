import React, { useEffect, useState } from "react";
import "./LabCreatedRings.scss";
import { useNavigate } from "react-router-dom";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import btnstyle from "../../scss/Button.module.scss";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { for_customizationSteps1, for_customizationSteps } from '../../Recoil/atom';
import { ringscollection, metalcollection } from "../../data/NavbarMenu";
import ShapeSection from "../Home/Common/ShapeSection/ShapeSection";
import RingCarousel from "../Home/Common/ProductCarousel/RingCarousel";
import NewsLetter from "../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import MountModel from "../ReusableComponent/MountModel/MountModel";

const LabCreatedRings = () => {
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);
  return (
    <div className="for_LabCreatedRings">
      <Banner />
      <CategoryGrid data={ringscollection} />
      <DesignyourOwn />
      <ShapeSection />
      <Metalcolor />
      <RingCarousel showmore={true} />
      <BannerNew />
      <NewsLetter />
    </div>
  );
};

export default LabCreatedRings;

const Banner = () => {
  const navigate = useNavigate();
  const addCategory = `Ring/category`;
  const filterKeyVal = btoa(addCategory);

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
          <button
            className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
            onClick={() => navigate(
              `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
            )}
          >
            SHOP ENGAGEMENT RING
          </button>
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
export const CategoryGrid = ({ title = "Find Your Forever Ring", data }) => {
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
                <Link to={val?.link}>
                  <img src={val?.image} loading="lazy" alt="" />
                </Link>
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

  const [customizeStep, setCustomizeStep] = useRecoilState(
    for_customizationSteps
  );
  const [customizeStep1, setCustomizeStep1] = useRecoilState(
    for_customizationSteps1
  );

  const [showModal, setShowModal] = useState(false);
  const [checkIndex, setCheckIndex] = useState();

  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2"));

  const createUrl = `/d/setting-complete-product/det345/?p=${(steps ?? steps1)?.[2]?.url}`;

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const handleConfirm = () => {
    navigate(createUrl);
  }

  const checkSteps =
    (steps?.[2] !== undefined && steps?.[2] !== null) ||
    (steps1?.[2] !== undefined && steps1?.[2] !== null);

  const handleCheckSteps = (index) => {
    if (checkSteps) {
      setShowModal(true);
      setCheckIndex(index);
    } else {
      console.log("Alternative action");
    }
  };

  const HandleSettingNavigation = () => {
    if (
      (steps?.[0] !== undefined && steps?.[0] !== null) ||
      (steps?.[1] !== undefined && steps?.[1] !== null)
    ) {
      sessionStorage.removeItem("customizeSteps");
      sessionStorage.removeItem("custStepData");
      const addCategory = `Ring/category`;
      const filterKeyVal = btoa(addCategory);
      navigate(
        `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
      );
    } else {
      const addCategory = `Ring/category`;

      const filterKeyVal = btoa(addCategory);
      navigate(
        `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
      );
      setCustomizeStep1({
        step1: true,
      });
      const step1 = [{ step1: true, Setting: "Ring" }];
      sessionStorage.setItem("customizeSteps2", JSON.stringify(step1));
    }
  };

  const HandleDiamondNavigation = () => {
    if (
      (steps1?.[0] !== undefined && steps1?.[0] !== null) ||
      (steps1?.[1] !== undefined && steps1?.[1] !== null)
    ) {
      sessionStorage.removeItem("customizeSteps2");
      sessionStorage.removeItem("custStepData2");
      navigate(`/certified-loose-lab-grown-diamonds/diamond/Round`);
    } else {
      navigate(`/certified-loose-lab-grown-diamonds/diamond/Round`);
      setCustomizeStep({
        step1: true,
      });
      const step1 = [{ step1: true, shape: "Round" }];
      sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
    }
  };

  const handleRemoveData = (index) => {
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    sessionStorage.removeItem("customizeSteps2");
    sessionStorage.removeItem("custStepData2");
    if (index === 0) {
      const addCategory = `Ring/category`;
      const filterKeyVal = btoa(addCategory);
      navigate(
        `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
      );
    } else {
      navigate(`/certified-loose-lab-grown-diamonds/diamond/Round`);
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
                  onClick={() => { handleCheckSteps(0); console.log("Cliked Setting") }}
                  className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                >
                  start with setting
                </button>
              ) : (
                <button
                  onClick={() => {
                    {
                      HandleSettingNavigation();
                      console.log("Cliked Setting")
                    };
                  }}
                  className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                >
                  start with setting
                </button>
              )}
              <span>OR</span>
              {checkSteps ? (
                <button
                  onClick={() => { handleCheckSteps(1); console.log("Cliked Diamond") }}
                  className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                >
                  start with a diamond
                </button>
              ) : (
                <button
                  onClick={() => { HandleDiamondNavigation(); console.log("Cliked Diamond") }}
                  className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                >
                  start with a diamond
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <MountModel
        open={showModal}
        handleConfirm={handleConfirm}
        handleClose={handleToggle}
        handleRemoveData={handleRemoveData}
        index={checkIndex}
      />
    </>
  );
};
const BannerNew = () => {
  const navigate = useNavigate();
  const addCategory = `Ring/category`;
  const filterKeyVal = btoa(addCategory);

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
          <button
            style={{
              color: "white",
            }}
            onClick={() => navigate(
              `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
            )}
            className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
          >
            View All Engagement Ring
          </button>
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
