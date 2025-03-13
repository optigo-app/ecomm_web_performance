import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import "./InstagramSection.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import useInstagramPosts from "../../../../hooks/UseInstagram";
import btnstyle from "../../../../scss/Button.module.scss";
import { FaChevronDown } from "react-icons/fa";

const InstagramSection = () => {
  const instaFrame = `${storImagePath()}/Forevery/frame.png`;
  const instaLogo = `${storImagePath()}/Forevery/instagram-draw.png`;
  // const { posts, loading, error } = useInstagramPosts("foreverydiamonds");
  const swiperRef = useRef(null);
  const [images, setimages] = useState([])

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    const updateOpacity = () => {
      const slides = swiperInstance.slides;
      slides.forEach((slide, index) => {
        const isActive = swiperInstance.activeIndex + 2 === index;
        slide.style.opacity = isActive ? "1" : "0.5";
      });
    };

    updateOpacity();
    swiperInstance.on("slideChange", updateOpacity);

    return () => {
      swiperInstance.off("slideChange", updateOpacity);
    };
  }, []);

  // const postlist = posts?.map((val, i) => {
  //   return { imageUrl: val?.node?.image_versions2?.candidates[0]?.url };
  // });

  const imagesList = [
    `${storImagePath()}/Forevery/social/1.jpg`,
    `${storImagePath()}/Forevery/social/2.jpg`,
    `${storImagePath()}/Forevery/social/3.jpg`,
    `${storImagePath()}/Forevery/social/4.jpg`,
    `${storImagePath()}/Forevery/social/5.jpg`,
    `${storImagePath()}/Forevery/social/6.jpg`,
  ];

  useEffect(() => {
    const CheckAllImages = async () => {
      let iamges = [];
      for (let i = 0; i < imagesList?.length; i++) {
        const image = imagesList[i];
        const response = await fetch(image);
        const blob = await response?.blob();
        const objectURL = URL?.createObjectURL(blob);
        iamges?.push(objectURL);
      }
      setimages(iamges);
      return iamges;
    }
    CheckAllImages()
  }, [])

  return (
    <div className="for_InstagramSection">
      <div className="for_heading">
        <img src={instaLogo} alt="" />
        <span className="title-insta">#forevery</span>
        <p className="desc_insta">
          View our customer’s engagement moments from around the world
        </p>
      </div>
      <div className="insta_carousel_frame">
        <div className="main_swiper_carousel">
          <div className="mobile_frame">
            <img src={instaFrame} alt="" />
          </div>
          <Swiper
            ref={swiperRef}
            slidesPerView={5}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={false}
            modules={[Pagination, Autoplay]}
            className="mySwiper-1"
          >
            <div className="left-over-lay"></div>
            <div className="right-over-lay"></div>
            {images?.map((val, i) => {
              return (
                <SwiperSlide>
                  <InstaCard src={val} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div
        className="btn"
        style={{
          outline: "none",
          border: "none",
        }}
      >
        <a
          style={{
            padding: "7px 15px",
            outline: "none",
            fontWeight: "600",
            textDecoration: "none",
          }}
          className={`${btnstyle?.btn_15} forevery-btn ${btnstyle?.btn_for_new}`}
          href="https://www.instagram.com/foreverydiamonds/"
          target="_blank"
        >
          Show More On Instagram <FaChevronDown />
        </a>
      </div>
    </div>
  );
};

export default InstagramSection;

const InstaCard = ({ src }) => {
  const image = `${storImagePath()}/Forevery/insta.jpg`;
  return (
    <div className="insta_card">
      <img
        style={{
          objectFit: "cover",
          width: "100%",
        }}
        src={src || image}
        alt=""
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = image;
        }}
      />
    </div>
  );
};
