// import React from "react";
// import "./TabSection.modul.scss";
// import { TabImage } from "../../../Constants/TabImages";
// import { Link } from "react-router-dom";
// const TabSection = () => {
//   return (
//     <div className="hoq_main_TabSection">
//       <div className="header">
//         <h1>Solitaire Rings</h1>
//         <button>View All</button>
//       </div>
//       <div className="tab_card">
//         {TabImage?.map((val, i) => {
//           return (
//             <div className="TabCard_main">
//               <div className="cardhover">
//                 <img src={val?.FrontImg} alt={val?.id} />
//                 <div className="overlay_img">
//                   <img src={val?.BackerImg} alt={val?.id} />
//                 </div>
//               </div>
//               <div className="tab_hover_Details">
//                 <h3>{i + 1} ct Heart Ring</h3>
//                 <small>INR 79,000</small>
//               </div>
//             </div>
//           );
//         })}
//         <div className="TabCard_main mobile-only">
//           <div className="box">
//             <Link to={"/"}>View All 106 Products</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TabSection;

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./TabSection.modul.scss";
import { TabImage } from "../../../Constants/TabImages";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Hoq_loginState } from "../../../Recoil/atom";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import Pako from "pako";
import noimage from "../../../Assets/noImageFound.jpg";

const TabSection = () => {
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [storeInit, setStoreInit] = useState({});
  const islogin = useRecoilValue(Hoq_loginState);

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeinit);

  }, []);

  useEffect(() => {
    const loginUserDetail = JSON.parse(
      sessionStorage?.getItem("loginUserDetail")
    );
    // const storeInit = JSON?.parse(sessionStorage?.getItem("storeInit"));
    const IsB2BWebsite = storeInit?.IsB2BWebsite;
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }
    let data = JSON.parse(sessionStorage.getItem("storeInit"));
    // setImageUrl(data?.DesignImageFol);
    setImageUrl(data?.CDNDesignImageFol);


    Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID)
      ?.then((response) => {
        if (response?.Data?.rd) {
          setNewArrivalData(response?.Data?.rd);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const ImageGenrate = (product) => {
    return product?.ImageCount >= 1
      ? `${imageUrl}${newArrivalData && product?.designno}~1.${
          newArrivalData && product?.ImageExtension
        }`
      : "noImageFound";
  };

  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = Pako.deflate(uint8Array, { to: "string" });

      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error("Error compressing and encoding:", error);
      return null;
    }
  };
  const handleMoveToDetail = (productData) => {
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: loginInfo?.MetalId,
      d: loginInfo?.cmboDiaQCid,
      c: loginInfo?.cmboCSQCid,
      f: {},
    };

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    navigation(
      `/d/${productData?.TitleLine?.replace(/\s+/g, `_`)}${
        productData?.TitleLine?.length > 0 ? "_" : ""
      }${productData?.designno}?p=${encodeObj}`
    );
  };

  const formatter = new Intl.NumberFormat("en-IN");

  if (newArrivalData?.length === 0) {
    return <div style={{ marginTop: "2rem" }}></div>;
  }

  return (
    <div className="hoq_main_TabSection">
      <div className="header">
        <h1>New Arrivals</h1>
        <button
          onClick={() => navigation(`/p/NewArrival/?N=${btoa("NewArrival")}`)}
        >
          View All
        </button>
      </div>
      {/* 330 w 500 h */}
      <div className="tab_card">
        {newArrivalData?.slice(0, 4)?.map((val, i) => {
          return (
            <div
            key={i}
              className="TabCard_main"
              style={{ backgroundColor: " #b8b4b823", cursor: "pointer" }}
              onClick={() => handleMoveToDetail(val)}
            >
              <div className="cardhover">
                <img
                  src={ImageGenrate(val)}
          // src={imageUrl}

                  alt={val?.id}
                  style={{ mixBlendMode: "multiply", objectFit: "contain" }}
                  onError={(e) => {
                    e.target.src = noimage;
                    e.target.alt = "Fallback image";
                  }}
                />
                {/* <div className="overlay_img">
                  <img src={val?.BackerImg} alt={val?.id} />
                </div> */}
              </div>
              <div className="tab_hover_Details">
                <h3 style={{ fontSize: "20px" }}>{val?.designno}</h3>
                {storeInit?.IsPriceShow === 1 && (
                  <small>
                    {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}{" "}
                    &nbsp;
                    {formatter.format(val?.UnitCostWithMarkUp)}
                  </small>
                )}
              </div>
            </div>
          );
        })}
        {/* <div className="TabCard_main mobile-only">
          <div className="box">
            <span
              onClick={() =>
                navigation(`/p/NewArrival/?N=${btoa("NewArrival")}`)
              }
            >
              View All
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TabSection;
