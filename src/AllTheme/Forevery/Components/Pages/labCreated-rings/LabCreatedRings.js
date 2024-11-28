import React, { useEffect } from "react";
import "./LabCreatedRings.scss";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import btnstyle from "../../scss/Button.module.scss";
import { Link } from "react-router-dom";
import { ringscollection, metalcollection } from "../../data/NavbarMenu";
import ShapeSection from "../Home/Common/ShapeSection/ShapeSection";
import RingCarousel from "../Home/Common/ProductCarousel/RingCarousel";
import NewsLetter from "../ReusableComponent/SubscribeNewsLater/NewsletterSignup";

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
      <RingCarousel showmore={true}  />
      <BannerNew />
      <NewsLetter />
    </div>
  );
};

export default LabCreatedRings;

const Banner = () => {
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
                <Link href="#">
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
              <button
                className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
              >
                {" "}
                start with setting
              </button>
              <span>OR</span>
              <button
                className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
              >
                start with a diamond
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const BannerNew = () => {
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
            className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
          >
            View All Engagement Ring
          </button>
        </div>
      </div>
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
