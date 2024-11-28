import React, { useEffect } from "react";
import "./LabGrownWeddingRing.scss";
import btnstyle from "../../scss/Button.module.scss";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { Link } from "react-router-dom";
import { CategoryGrid } from "../labCreated-rings/LabCreatedRings";
import {
  StylesCollections,
  weddingRingsCollection,
} from "../../data/NavbarMenu";
import RingCarousel from "../Home/Common/ProductCarousel/RingCarousel";
import NewsletterSignup from "../ReusableComponent/SubscribeNewsLater/NewsletterSignup";

const LabGrownWeddingRing = () => {
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);
  return (
    <div className="for_LabGrownWeddingRing">
      <Banner
        bg={`${storImagePath()}/Forevery/106.webp`}
        height={`450px`}
        title={"Lab Grown Wedding Rings"}
        desc={`  Start your journey of forever with unique and stunning Forevery
            Wedding Rings. Select from a range of beautiful styles -
            diamond-studded, traditional, or eternity wedding bands - to
            symbolize your unconditional love. Make a vow of forever with a
            distinctively beautiful ring.`}
        ishave={true}
      />
      <CategoryGrid title="SHOP BY STYLE" data={StylesCollections} />
      <Banner
        bg={`${storImagePath()}/Forevery/107.webp`}
        height={` 370px`}
        cx={"second_banner"}
        title={"Make her heart race"}
        subtitle={`TRENDING & UNIQUE COLLECTION`}
      />
      <ShopByCategory />
      <RingCarousel showmore={true} />
      <MeetTheMatch />
      <NewsletterSignup />
    </div>
  );
};

export default LabGrownWeddingRing;

const Banner = ({ bg, height, title, subtitle, desc, ishave, cx }) => {
  return (
    <>
      <div
        className="banner_w_r "
        style={{
          background: `url(${bg})`,
          height: height,
        }}
      >
        <div className={`content ${cx}`}>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <p>{desc}</p>
          <button
            className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
          >
            Shop Wedding Rings
          </button>
        </div>
      </div>
      {ishave && (
        <div className="breadCrumb-lab">
          <Link to={"/"}>Home </Link>
          <span>/</span>
          <span>Wedding Rings</span>
        </div>
      )}
    </>
  );
};

const ShopByCategory = () => {
  return (
    <>
      <div className="shop_by_category_ring">
        <div className="heading">
          <h1>SHOP BY CATEGORY</h1>
        </div>
        <div className="ring_grid_col">
          {weddingRingsCollection?.map((val, i) => {
            return (
              <div className="ring_card_a">
                <div className="image_box_ring">
                  <img src={val?.img} alt="" />
                </div>
                <div className="ring_details">
                  <h1>{val?.title}</h1>
                  <p>{val?.description}</p>
                  <button
                    className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                  >
                    {val?.btnText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const MeetTheMatch = () => {
  return (
    <>
      <div
        className="MeetTheMatch"
        style={{
          background: `url(${storImagePath()}/Forevery/ring-col/176.webp)`,
        }}
      >
        <div className="content-mtm">
          <h1>Uncover Your Perfect Matching Wedding Band</h1>
          <p>
            Celebrate your love with a bridal set that truly reflects the unique
            bond between you and your partner. Choose your engagement ring, and
            let us help you discover the perfect matching band to complete your
            bridal set. <br />
            Our Women's Wedding Rings collection boasts a variety of
            breathtaking styles to choose from.
          </p>
          <button
            className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
          >
            Meet The Match
          </button>
        </div>
      </div>
    </>
  );
};
