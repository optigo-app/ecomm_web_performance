import React from "react";
import "./related.modul.scss";
import imageNotFound from '../../../../Assets/image-not-found.jpg';
import { Link } from "react-router-dom";

const RelatedProduct = ({
  SimilarBrandArr,
  loginInfo,
  storeInit,
  handleMoveToDetail,
}) => {
  const formatter = new Intl.NumberFormat("en-IN");

  return (
    <div className="elv_main_RelatedProduct">
      <div className="heading">
        <h1>Similar Designs</h1>
      </div>
      <div className="tab_card">
        {SimilarBrandArr?.slice(0, 4)?.map((elv, i) => {
          return (
            <div
              className="TabCard_main"
              onClick={() => handleMoveToDetail(elv)}
            >
              {/* <div className="new">
                <p>new</p>
              </div> */}
              <div className="cardhover">
                <img
                  src={
                    elv?.ImageCount > 0
                      ?
                      // storeInit?.DesignImageFol +
                      //   elv?.designno +
                      //   "_" +
                      //   "1" +
                      //   "." +
                      //   elv?.ImageExtension

                      storeInit?.CDNDesignImageFol + elv?.designno + "~" + "1" + "." + elv?.ImageExtension
                      : imageNotFound
                  }
                  alt={elv?.id}
                  onError={(e) => {
                    e.target.src = imageNotFound;
                  }}
                />
                {/* <div className="overlay_img">
                    <img src={elv?.BackerImg} alt={elv?.id} />
                  </div> */}
              </div>
              <div className="tab_hover_Details">
                <h3>{elv?.designno}</h3>
                <small>
                  {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode} &nbsp;
                  {formatter.format(elv?.UnitCostWithMarkUp)}
                </small>
              </div>
            </div>
          );
        })}
        {/* <div className="TabCard_main mobile-only">
          <div className="box">
            <Link to={"/"}>View All 106 Products</Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RelatedProduct;
