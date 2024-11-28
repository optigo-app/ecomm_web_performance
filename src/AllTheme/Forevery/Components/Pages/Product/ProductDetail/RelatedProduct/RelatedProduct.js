import React, { useState } from "react";
import "./related.modul.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import { Rating, styled } from "@mui/material";

const RelatedProduct = ({
  SimilarBrandArr,
  loginInfo,
  storeInit,
  handleMoveToDetail,
}) => {
  const [ratingvalue, setRatingValue] = useState(3);

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#000',
    },
    '& .MuiRating-iconHover': {
      color: '#000',
    },
  });

  return (
    <>
      <div className="for_related_products_mainDiv">
        <div className="for_related_products_div">
          <div className="for_related_products_title">
            <h4>Other jewelry you'll love</h4>
          </div>
          <div className="for_related_products_swipper_div">
            <Swiper
              slidesPerView={4}
              loop={true}
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false,
              // }}
              navigation
              modules={[Navigation, Autoplay]}
              className="for_RelatedmySwiper"
            >
              {/* {Array.from({ length: 10 }).map((val, i) => { */}
              {SimilarBrandArr?.slice(0, 4)?.map((elv, i) => {
                return (
                  <SwiperSlide>
                    {/* <div className="for_related_products_card_div">
                      <div className="for_related_ratings_div">
                        <StyledRating
                          name="simple-controlled"
                          value={ratingvalue}
                          size="small"
                          color="#8f8e8c"
                          className="for_related_rating"
                          readOnly
                        />
                      </div>
                      <div className="for_related_card_image_div">
                        <img className="for_related_card_image" src={`${storImagePath()}/Forevery/image.jpg`} alt="" />
                      </div>
                    </div> */}
                    <div className="for_related_products_card_div" onClick={() => handleMoveToDetail(elv)}>
                      <div className="for_related_ratings_div">
                        <StyledRating
                          name="simple-controlled"
                          value={ratingvalue}
                          size="small"
                          color="#8f8e8c"
                          className="for_related_rating"
                          readOnly
                        />
                      </div>
                      <div className="for_related_card_image_div">
                        <img className="for_related_card_image" src={elv?.ImageCount > 0
                          ? storeInit?.DesignImageFol +
                          elv?.designno +
                          "_" +
                          "1" +
                          "." +
                          elv?.ImageExtension
                          : "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg"} alt={elv?.id} />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;