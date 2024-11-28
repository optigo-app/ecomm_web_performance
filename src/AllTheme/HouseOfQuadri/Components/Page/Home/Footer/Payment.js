import React from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const Payment = () => {
  return (
    <div className="payment-btn">
       <div className="pay">
            <img
              src={storImagePath()+`/images/footer/mastercard.webp`}
              alt=""
            />
          </div>
          <div className="pay">
            <img
              src={storImagePath()+`/images/footer/gpay.webp`}
              alt=""
            />
          </div>
          <div className="pay">
            <img
              src={storImagePath()+`/images/footer/visa.webp`}
              alt=""
            />
          </div>
          <div className="pay">
            <img
              src={storImagePath()+`/images/footer/paytm.webp`}
              alt=""
            />
          </div>
    </div>
  );
};

export default Payment;
