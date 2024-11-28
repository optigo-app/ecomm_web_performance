import React from "react";
import "./OurServices.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";

const OurServices = () => {
  const ServicesImage = [
    `${storImagePath()}/Forevery/service/free-ship.png`,
    `${storImagePath()}/Forevery/service/free-return.png`,
    `${storImagePath()}/Forevery/service/waranty.png`,
    `${storImagePath()}/Forevery/service/resizing.png`,
    `${storImagePath()}/Forevery/service/engraving.png`,
  ];
  return (
    <div className="for_OurServices ">
      <div className="for_heading">
        <h1>Our services</h1>
      </div>
      <div
        className={`our-services services-wrap  contact-page`}
      >
        <div class="services ">
          <div class="for_img">
            <img loading="lazy" src={ServicesImage[0]} alt="Free Shipping" />
          </div>
          <h4 class="serv-heading ">Free Shipping</h4>
          <p class="desc">
            Now it’s easier for customers to get the beautiful and sustainable
            diamonds they want without paying extra for shipping
          </p>
          <a
            aria-label="know more Free Shipping"
            class="for_link"
            href="#"
          >
            know more
          </a>
        </div>
        <div class="services ">
          <div class="for_img" href="/hassle-free-returns">
            <img
              loading="lazy"
              src={ServicesImage[1]}
              alt="Free 30 Day Returns"
            />
          </div>
          <h4 class="serv-heading ">Free 30 Day Returns</h4>
          <p class="desc">
            Forevery offers a hassle-free jewelry shopping experience with its
            30-DAY Returns policy. Get ready to shop confidently.
          </p>
          <a
            aria-label="know more Free 30 Day Returns"
            class="for_link"
            href="#"
          >
            know more
          </a>
        </div>
        <div class="services ">
          <div class="for_img" href="/lifetime-warranty">
            <img
              loading="lazy"
              src={ServicesImage[2]}
              alt="Free Lifetime Warranty"
            />
          </div>
          <h4 class="serv-heading ">Free Lifetime Warranty</h4>
          <p class="desc">
            Shop with Confidence; a lifetime warranty covers every piece of fine
            jewelry you buy.
          </p>
          <a
            aria-label="know more Free Lifetime Warranty"
            class="for_link"
            href="#"
          >
            know more
          </a>
        </div>
        <div class="services ">
          <div class="for_img" href="#">
            <img
              loading="lazy"
              src={ServicesImage[3]}
              alt="60-Days Free Resizing"
            />
          </div>
          <h4 class="serv-heading ">60-Days Free Resizing</h4>
          <p class="desc">
            Within 60 days of purchase, resize your jewelry to the perfect fit
            without any additional costs.
          </p>
          <a
            aria-label="know more 60-Days Free Resizing"
            class="for_link"
            href="#"
          >
            know more
          </a>
        </div>
        <div class="services ">
          <div class="for_img" href="#">
            <img loading="lazy" src={ServicesImage[4]} alt="Free Engraving" />
          </div>
          <h4 class="serv-heading ">Free Engraving</h4>
          <p class="desc">
            Add sentimental value to the piece and make it a unique and
            meaningful gift.
          </p>
          <a
            aria-label="Know more Free Engraving"
            class="for_link"
            href="#"
          >
            Know more
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
