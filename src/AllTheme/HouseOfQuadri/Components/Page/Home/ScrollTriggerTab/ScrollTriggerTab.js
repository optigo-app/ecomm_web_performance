import React, { useEffect } from "react";
import "./ScrollTriggerTab.modul.scss";
import { ScrollImageList } from "../../../Constants/ScrollImageList";
import { Link } from "react-router-dom";

const ScrollTriggerTab = () => {
  useEffect(() => {
    const handleScrollAnimations = () => {
      const cards = document.querySelectorAll(".ScrollImageCard");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;
        const cardBottom = rect.bottom;
        if (cardTop < window.innerHeight && cardBottom >= 0) {
          card.classList.add("is-visible");
        } else {
          card.classList.remove("is-visible");
        }
      });
    };
    window.addEventListener("scroll", handleScrollAnimations);
    return () => {
      window.removeEventListener("scroll", handleScrollAnimations);
    };
  }, []);

  return (
    <>
      <div className="hoq_main_ScrollTriggerTab">
        {ScrollImageList.map((val, i) => {
          return <ScrollImageCard key={i} img={val?.img} details={val} />;
        })}
      </div>
    </>
  );
};

export default ScrollTriggerTab;

const ScrollImageCard = ({ img, details }) => {
  return (
    <div
      className="ScrollImageCard"
      style={{
        justifyContent: details?.align === "right" && "flex-end",
      }}
    >
      <img src={img} alt={details?.title} />
      <div
        className="details_card"
        style={{
          marginTop: details?.top,
        }}
      >
        <div
          className="info"
          style={{
            border: details?.isborder && "2px solid black",
          }}
        >
          {details?.head && <h1>{details?.head}</h1>}
          <h2>{details?.title}</h2>
          <p>
            {details?.desc} <br /> <br />
            {details?.desc2 && details?.desc2}
          </p>
          <Link
            to={details?.link}
            style={{
              textDecoration: "none",
              color: "inherit",
              outline: "none",
            }}
          >
            <button>{details?.btn_des}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
