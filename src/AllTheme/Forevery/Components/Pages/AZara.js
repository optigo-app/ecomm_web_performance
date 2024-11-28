import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Controller, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Azara.scss";
import { Link } from "react-router-dom";
import { productsList } from "../data/product";
import { motion } from "framer-motion";

export default function ZaraStyleSlider() {
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [scrollIndex, setScrollIndex] = useState(-1);
  const horizontalSwiperRef = useRef(null);
  const verticalSwipersRef = useRef([]);


  const handleCategoryChange = (index) => {
    setCategoryIndex(index);
    setScrollIndex(0);
    verticalSwipersRef.current[index]?.slideTo(0);
  };

  const handleScroll = (index) => {
    setScrollIndex(index );
    verticalSwipersRef.current[categoryIndex]?.slideTo(index);
  };

  const card = document.querySelector('.zara_slider_card');

  function isCardInTop20Percent(cardElement) {
    if (!cardElement) return false;
  
    const rect = cardElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
  
    return rect.top <= viewportHeight * 0.2;
  }

  useEffect(()=>{
    isCardInTop20Percent(card)
  },[card])
  

  useEffect(() => {

    verticalSwipersRef.current = verticalSwipersRef.current.slice(
      0,
      productsList.length
    );
  }, []);

  return (
    <div
      style={{
        height: "auto",
        backgroundColor: "#F7FAFC",
        width: "100vw",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        bottom: 0,
        zIndex: 99999999999,
      }}
    >
      <Swiper
        style={{ height: "100%", width: "100%" }}
        direction="horizontal"
        slidesPerView={1}
        navigation
        onSwiper={(swiper) => (horizontalSwiperRef.current = swiper)}
        onSlideChange={(swiper) => handleCategoryChange(swiper.activeIndex)}
        modules={[Navigation, Pagination, Controller, EffectFade]}
        speed={800}
      >
        {productsList.map(({ name, products }, catIndex) => (
          <SwiperSlide key={name} style={{ height: "100%" }}>
            <div
              className="zara_card"
              style={{
                height: "100vh",
                width: "100%",
                overflowY: "scroll",
                position: "relative",
                backgroundColor: "#ffffff",
              }}
              onScroll={(e) => {
                const scrollHeight = e.target.scrollHeight;
                const clientHeight = e.target.clientHeight;
                const scrollTop = e.target.scrollTop;
                const totalScrollableHeight = scrollHeight - clientHeight;
                const index = Math.floor(
                  (scrollTop / totalScrollableHeight) * (products.length - 1)
                );
                if (scrollTop > clientHeight * 0.8) {
                  handleScroll(index);
                }
              }}
            >
              {products.map(({ img, price, title }, index) => (
                <motion.div
                className="zara_slider_card"
                  key={title}
                  initial={{ scale: 1 }}
                  animate={{ scale: scrollIndex === index && scrollIndex !== -1 ? 0.96 : 1 }} 
                  transition={{
                    repeatType: "easeInOut",
                    duration: 0.4, 
                  }}
                  style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    position: "relative",
                    border:"1px solid #efefef"
                  }}
                >
                  <div
                    style={{
                      color: "black",
                      position: "absolute",
                      right: 0,
                      bottom: `5rem`,
                      padding: "2rem",
                      fontFamily: `Nunito, sans-serif`,
                    }}
                    className="desc"
                  >
                    <h1
                      style={{
                        fontSize: "13.5px",
                        fontWeight: "400",
                        textTransform: "uppercase",
                        color: "black",
                        fontFamily: "arial",
                      }}
                    >
                      {title}
                    </h1>
                  </div>
                  <img
                    loading="lazy"
                    src={img}
                    alt={title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
              ))}
              <ZaraFooter />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ZaraFooter() {
  return (
    <footer className="zara-footer">
      <div className="zara-footer__container">
        <div className="zara-footer__newsletter">
          <h2>JOIN OUR NEWSLETTER</h2>
        </div>
        <div className="zara-footer__social">
          <Link to="#">INSTAGRAM</Link>
          <Link to="#">FACEBOOK</Link>
          <Link to="#">X</Link>
          <Link to="#">PINTEREST</Link>
          <Link to="#">YOUTUBE</Link>
          <Link to="#">SPOTIFY</Link>
        </div>
      </div>
      <div className="zara-footer__info">
        <p>NAME AND ADDRESS OF THE MANUFACTURER:</p>
        <p>INDUSTRIA DE DISEÑO TEXTIL, S.A. (INDITEX, S.A.)</p>
        <p>
          AVENIDA DE LA DIPUTACIÓN, EDIFICIO INDITEX, 15143, ARTEIXO (A CORUÑA),
          SPAIN
        </p>
      </div>
    </footer>
  );
}
