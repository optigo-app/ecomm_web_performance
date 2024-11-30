import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./style.scss";
import { formatter } from "../../../../../../../utils/Glob_Functions/GlobalFunction";

const DesignSet = ({
  storeInit,
  designSetList,
  imageNotFound,
  loginInfo,
  handleMoveToDetail,
}) => {
  return (
    <div className="elv_design_Set">
      <div className="elv_DesignSet_main">
        {designSetList?.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <p
              style={{
                // fontFamily: "FreightDisp Pro Medium",
                fontFamily: 'sans-serif',
                color: "#7d7f85",
                fontSize: "30px",
                // display:'none'
              }}
            >
              Complete The Look
            </p>
          </div>
        )}

        <div className="elv_Swiper_designSet">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            // spaceBetween={50}
            // slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            className="my_Product_Swiper"
          >
            {designSetList?.map((designSetList) => (
              <SwiperSlide>
                <div className="compeletethelook_cont">
                  <div className="elv_ctlImg_containe">
                    <img
                      // src={
                      //   "https://cdn.accentuate.io/3245609615460/4121939443812/99-v1581576944425.jpg?2048x1950"
                      // }
                      src={
                        designSetList?.DefaultImageName
                          ? storeInit?.DesignSetImageFol +
                          designSetList?.designsetuniqueno +
                          "/" +
                          designSetList?.DefaultImageName
                          : imageNotFound
                      }
                      alt={""}
                      className="elv_ctl_img"
                    />
                  </div>

                  <div
                    className={
                      (designSetList?.Designdetail == undefined
                        ? []
                        : JSON.parse(designSetList?.Designdetail)
                      )?.length > 3
                        ? "compeletethelook_prodt_for_3"
                        : "compeletethelook_prodt"
                    }
                  >
                    <p
                      style={{
                        // fontFamily: "FreightDisp Pro Medium",
                        fontFamily: 'sans-serif',
                        color: "#7d7f85",
                        fontSize: "30px",
                        display: "none",
                      }}
                    >
                      Complete The Look
                    </p>

                    {(designSetList?.Designdetail == undefined
                      ? []
                      : JSON.parse(designSetList?.Designdetail)
                    )?.map((ele, i) => (
                      <div
                        className="completethelook_outer"
                        onClick={() => handleMoveToDetail(ele)}
                        style={{ borderTop: i !== 0 ? "none" : "" }}
                      >
                        <div style={{ display: "flex", gap: "60px" }}>
                          <div style={{ marginLeft: "12px" }}>
                            <img
                              src={
                                ele?.ImageCount > 0
                                  ? storeInit?.CDNDesignImageFol +
                                  ele?.designno +
                                  "~" +
                                  "1" +
                                  "." +
                                  ele?.ImageExtension
                                  : imageNotFound
                              }
                              alt={""}
                              // src={
                              //   "https://smilingrocks.com/cdn/shop/products/Lab-grown-diamond-white-gold-earrings-sre00362wht_medium.jpg?v=1590473229"
                              // }
                              onError={(e)=>{
                                e.target.src = imageNotFound ;
                              }}
                              className="srthelook_img"
                            />
                          </div>
                          <div className="srthelook_prodinfo">
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#7d7f85",
                                textTransform: "uppercase",
                              }}
                              className="srthelook_prodinfo_inner"
                            >
                              <p>
                                {ele?.designno} - {ele?.CategoryName}
                                <br />
                                {
                                  <span className="elv_currencyFont">
                                    {loginInfo?.CurrencyCode ??
                                      storeInit?.CurrencyCode}
                                  </span>
                                }
                                &nbsp;
                                {
                                  formatter(
                                    ele?.UnitCostWithMarkUp
                                  )
                                }
                              </p>
                            </div>
                            {/* <div>
                          <span style={{ fontSize: "30px", color: "#7d7f85",padding:'5px'}} className=''>
                            &#8250;
                          </span>
                        </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default DesignSet;
