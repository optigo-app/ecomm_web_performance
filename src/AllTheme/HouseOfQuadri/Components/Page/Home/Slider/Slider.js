import React, { useEffect, useRef, useState } from "react";
import "./Slider.modul.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SliderItemns, MobilSliderImage } from "../../../Constants/SliderItems";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  draggable: true,
  fade: true,
  cssEase: "linear",
};

const TopSlider = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const slider = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hoq_main_slider" draggable={true}
      onContextMenu={(e) => e.preventDefault()}>
      {/* <div className="controller_btn">
        <button onClick={() => slider?.current?.slickPrev()}>
          <BsChevronCompactLeft className="btn_icons" />
        </button>
      </div> */}
      <Slider {...settings} ref={slider}>
        {isMobile
          ? data?.image?.slice(0, 3)?.map((val, i) => (
            <div className="slide" key={i}>
              <img src={val || ""} alt={val + i}
                draggable={true}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ))
          : data?.image?.slice(0, 3)?.map((val, i) => (
            <div className="slide" key={i}>
              <img src={val || ""} alt={val + i}
                draggable={true}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ))}
      </Slider>
      {/* <div className="controller_btn_2">
        <button onClick={() => slider?.current?.slickNext()}>
          <BsChevronCompactRight className="btn_icons" />
        </button>
      </div> */}
    </div>
  );
};

export default TopSlider;
