import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./Diamond.scss";
import btnstyle from "../../../scss/Button.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { LooseDiamond } from "../../../data/NavbarMenu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OurServices from "../../Home/Common/OurServices/OurServices";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import { useMediaQuery } from "@mui/material";
import MountModel from "../../ReusableComponent/MountModel/MountModel";

const Diamond = () => {
  const Banner = `${storImagePath()}/Forevery/diamond/banner.jpg`;
  const swiperRef = useRef(null);
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [shape, setShape] = useState();
  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2"));


  const createUrl = `/d/setting-complete-product/det345/?p=${(steps ?? steps1)?.[2]?.url}`;

  const handleToggle = () => {
    setShowModal(!showModal);
  }

  const handleConfirm = () => {
    Navigate(createUrl);
  }
  const checkSteps =
    (steps?.[2] !== undefined && steps?.[2] !== null) ||
    (steps1?.[2] !== undefined && steps1?.[2] !== null);

  const handleCheckSteps = (value) => {
    if (checkSteps) {
      setShowModal(true);
      setShape(value);
    } else {
      console.log("Alternative action");
    }
  };

  const HandleDiamondNavigation = (shape) => {
    Navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
    const step1 = [{ step1: true, shape: shape }];
    sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
  };

  const handleRemoveData = (shape) => {
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    sessionStorage.removeItem("customizeSteps2");
    sessionStorage.removeItem("custStepData2");
    Navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
    handleToggle();
  };


  const isMobile = useMediaQuery("(max-width: 546px)");
  const check = isMobile ? 1 : 2;
  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    const updateOpacity = () => {
      const slides = swiperInstance.slides;
      slides.forEach((slide, index) => {
        // Check if the slide is the center one
        const isActive = swiperInstance.activeIndex + check === index;
        slide.style.opacity = isActive ? "1.1" : "0.9";
        slide.style.Scale = isActive ? "1.05" : "0.95";
        slide.style.fontWeight = isActive ? "700" : "500";
      });
    };

    updateOpacity();
    swiperInstance.on("slideChange", updateOpacity);

    return () => {
      swiperInstance.off("slideChange", updateOpacity);
    };
  }, [isMobile]);
  return (
    <div className="For_main_diamond">
      <div
        className="hero-banner"
        style={{
          backgroundImage: `url(${Banner})`,
        }}
      >
        <div className="wrap">
          <h1 className="head_for">the hearts and arrows diamond</h1>
          <p className="sub_head_for">
            Exquisitely rare, hypnotically beautiful and cut to perfection
          </p>
          <button
            className={`${btnstyle?.btn_for_new} btn-12 ${btnstyle?.btn_15}`}
          >
            shop hearts and love collection
          </button>
        </div>
      </div>
      <div className="loose_diamond_carousel">
        <div className="heading">
          <span>explore loose diamonds</span>
          <small></small>
        </div>
        <div className="for_carousel">
          <Swiper
            slidesPerView={5}
            freeMode={true}
            ref={swiperRef}
            loop={true}
            breakpoints={{
              546: {
                slidesPerView: 5,
              },
              545: {
                slidesPerView: 3,
              },
              420: {
                slidesPerView: 3,
              },
              416: {
                slidesPerView: 1,
              },
              0: {
                slidesPerView: 1,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
            className="fo_mySwiper"
          >
            {LooseDiamond?.map((val, i) => {
              return (
                <SwiperSlide>
                  {checkSteps ? (
                    <div
                      className="shape_card_ca"
                      // onClick={() =>
                      //   Navigate(
                      //     `/certified-loose-lab-grown-diamonds/diamond/${val?.name}`
                      //   )
                      // }
                      onClick={() => handleCheckSteps(val?.name)}
                    >
                      <img src={val?.img} alt="" />
                      <span>{val?.name}</span>
                    </div>
                  ) : (
                    <div
                      className="shape_card_ca"
                      // onClick={() =>
                      //   Navigate(
                      //     `/certified-loose-lab-grown-diamonds/diamond/${val?.name}`
                      //   )
                      // }
                      onClick={() => HandleDiamondNavigation(val?.name)}
                    >
                      <img src={val?.img} alt="" />
                      <span>{val?.name}</span>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
          <MountModel
            open={showModal}
            handleConfirm={handleConfirm}
            handleClose={handleToggle}
            handleRemoveData={handleRemoveData}
            index={shape}
          />
        </div>
        <div className="p">
          round cut diamonds maximize light return and sparkle, and are the most
          brilliant of the diamond cuts.
        </div>
      </div>
      <div className="lab_created_diamond">
        <div
          className="image"
          style={{
            backgroundImage: `url(${storImagePath()}/Forevery/diamond/labgrown-diamonds.webp)`,
          }}
        ></div>
        <div className="details">
          <img
            src={`${storImagePath()}/Forevery/diamond/lab-symbol.webp`}
            alt=""
          />
          <h1>lab created diamonds</h1>
          <p>
            Our lab created diamonds are optically and chemically identical to
            earth created diamonds. They also minimize environmental impact and
            allow you to maximize your budget.
          </p>
          <button>shop labgrown diamonds</button>
        </div>
      </div>
      <LabgrownMobile />
      <div
        className="diamond_initial"
        style={{
          backgroundImage: `url(${storImagePath()}/Forevery/diamond/diamonds-initials-bg.webp)`,
        }}
      >
        <div className="dum"></div>
        <div class="content ">
          <h5 class="title_For">personalized jewelry</h5>
          <h2 class="text-uppercase initials-head position-relative fs-3 fw-bold mb-5">
            specially grown and cut for you
          </h2>
          <p class="subtitle_for">
            Elevate your jewelry collection with Initial Diamonds by Forevery.
            We transform rough diamonds into the Initial of your choice,
            crafting personalized pieces with high-quality metal settings. Our
            aim is simple: when you wear our jewelry, we want you to feel pure
            joy. This collection emphasizes unique designs and one-of-a-kind
            diamonds, reflecting our commitment to innovation. Forevery is
            dedicated to making your dreams a reality. Experience the next level
            of customization with our letter-shaped diamonds.
          </p>
          <div class="cta">
            <button
              style={{
                backgroundColor: "transparent",
                padding: "6px 22px",
              }}
              className={`${btnstyle?.btn_for_new} forevery-btn ${btnstyle?.btn_15}`}
            >
              shop letter diamonds
            </button>
          </div>
        </div>
      </div>
      <div className="info_grid_for">
        <div className="heading">
          <span>Specification of The Hearts and Arrows</span>
          <small></small>
          <p
            className="para-for-i-q"
            style={{
              margin: "0 auto",
              textAlign: "center",
              padding: "25px 0",
            }}
          >
            Hearts and Arrows diamonds are renowned for their mesmerizing
            brilliance, born from unparalleled cutting precision. This section
            delves into their specifications, guiding you toward a diamond that
            radiates exceptional beauty and fire.
          </p>

          <img
            src={`${storImagePath()}/Forevery/diamond/hearts_and_arrow.webp`}
            alt=""
            style={{
              width: "100%",
              margin: "0 auto",
            }}
          />
          <div className="grid_col_for">
            <div className="diamond-attributes">
              <div className="attribute">
                <h2>
                  {" "}
                  <div className="block-no-grid">1 -</div> Precision of Cut
                </h2>
                <p>
                  "Hearts and Arrows" diamonds, with exceptional symmetry,
                  showcase a unique pattern: arrows from the top and hearts from
                  the bottom. This distinct feature underscores the precise
                  craftsmanship of these round brilliant cut diamonds.
                </p>
              </div>
              <div className="attribute">
                <h2>
                  {" "}
                  <div className="block-no-grid">2 -</div> Fluorescence
                </h2>
                <p>
                  Some diamonds exhibit fluorescence, a phenomenon where the
                  diamond emits a soft glow when exposed to ultraviolet light.
                  While fluorescence is a personal preference, it's important to
                  ensure that it doesn’t negatively impact the overall
                  appearance of the diamond.
                </p>
              </div>
              <div className="attribute">
                <h2>
                  {" "}
                  <div className="block-no-grid">3 -</div> Symmetry
                </h2>
                <p>
                  Symmetry plays a crucial role in the Hearts and Arrows
                  pattern. The facets on the top (crown) and bottom (pavilion)
                  of the diamond must be perfectly aligned. If there is any
                  deviation in the alignment of facets, it can affect the
                  clarity of the hearts and arrows pattern. A high degree of
                  symmetry contributes to the diamond’s brilliance and sparkle.
                </p>
              </div>
              <div className="attribute">
                <h2>
                  {" "}
                  <div className="block-no-grid">4 -</div> Clarity
                </h2>
                <p>
                  Clarity refers to the presence of any internal or external
                  flaws, known as inclusions and blemishes, respectively. While
                  Hearts and Arrows diamonds are admired for their optical
                  precision, a high level of clarity is also desirable to ensure
                  that the patterns are not disrupted by visible imperfections.
                </p>
              </div>
            </div>
          </div>
          <div className="shop_h_l">
            <button>Shop Hearts and Love collection</button>
          </div>
        </div>
      </div>
      <OurServices />
      <NewsletterSignup />
    </div>
  );
};

export default Diamond;

const LabgrownMobile = () => {
  return (
    <div className="main-mob-new">
      <img
        src={`${storImagePath()}/Forevery/diamond/diamonds-initials-bg.webp`}
        alt=""
      />
      <div class="content ">
        <h5 class="title_For">personalized jewelry</h5>
        <h2 class="text-uppercase initials-head position-relative  fw-bold ">
          specially grown and cut for you
        </h2>
        <p class="subtitle_for">
          Elevate your jewelry collection with Initial Diamonds by Forevery. We
          transform rough diamonds into the Initial of your choice, crafting
          personalized pieces with high-quality metal settings. Our aim is
          simple: when you wear our jewelry, we want you to feel pure joy. This
          collection emphasizes unique designs and one-of-a-kind diamonds,
          reflecting our commitment to innovation. Forevery is dedicated to
          making your dreams a reality. Experience the next level of
          customization with our letter-shaped diamonds.
        </p>
        <div class="cta">
          <button
            className={`${btnstyle?.btn_for_new} forevery-btn ${btnstyle?.btn_15}`}
          >
            shop letter diamonds
          </button>
        </div>
      </div>
    </div>
  );
};
