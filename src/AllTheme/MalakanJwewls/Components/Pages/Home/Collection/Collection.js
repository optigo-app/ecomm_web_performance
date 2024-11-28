import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Collection.modul.scss";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import Cookies from "js-cookie";
import Pako from "pako";
import { mala_loginState } from "../../../Recoil/atom";

const Collection = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
  const [designSetList, setDesignSetList] = useState([]);
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [storeInit, setStoreInit] = useState({});
  const islogin = useRecoilValue(mala_loginState);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeinit);
  }, [])

  useEffect(() => {
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    // const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const IsB2BWebsite = storeInit?.IsB2BWebsite;
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeinit);

    let data = JSON.parse(sessionStorage.getItem("storeInit"));
    setImageUrl(data?.DesignSetImageFol);

    const Collections = async () => {
      Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet", finalID)
        .then((response) => {
          if (response?.Data?.rd) {
            setDesignSetList(response?.Data?.rd);
            console.log("sss", response?.Data?.rd);
          }
        })
        .catch((err) => console.log(err));
    }
    Collections()
  }, []);

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

  const ProdCardImageFunc = (pd) => {
    let finalprodListimg;
    if (pd?.DefaultImageName) {
      finalprodListimg =
        imageUrl + pd?.designsetuniqueno + "/" + pd?.DefaultImageName;
    } else {
      finalprodListimg =
        "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg";
    }
    return finalprodListimg;
  };

  const handleNavigation = (designNo, autoCode, titleLine) => {
    let obj = {
      a: autoCode,
      b: designNo,
      m: loginUserDetail?.MetalId ?? storeInit?.MetalId,
      d: loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
      c: loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid,
      f: {},
    };
    let encodeObj = compressAndEncode(JSON.stringify(obj));
    // navigate(
    //   `/d/${titleLine?.replace(/\s+/g, `_`)}${
    //     titleLine?.length > 0 ? "_" : ""
    //   }${designNo}?p=${encodeObj}`
    // );
  };

  return (
    <>
      {
        designSetList?.length != 0 &&
        <div className="stam_main_Collection">
          <div className="stam_Collection_heading">
            <h1>Collections</h1>
          </div>
          <div className="collection_cards desktop-collection">
            {designSetList?.slice(0, 4)?.map((val, i) => {
              console.log(val);
              return (
                <div
                  className="c_card"
                  onClick={() =>
                    handleNavigation(
                      val?.designno,
                      val?.autocode,
                      val?.TitleLine ? val?.TitleLine : ""
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={ProdCardImageFunc(val)}
                    alt={val?.title}
                    loading="lazy"
                  />
                  <div className="details">
                    <h3>{val?.designsetno}</h3>
                    {/* <button
                    onClick={() =>
                      handleNavigation(
                        val?.designno,
                        val?.autocode,
                        val?.TitleLine ? val?.TitleLine : ""
                      )
                    }
                    >
                      Explore
                    </button> */}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mobile-only">
            <MobileCollection
              ProdCardImageFunc={ProdCardImageFunc}
              designSetList={designSetList}
              handleNavigation={handleNavigation}
            />
          </div>
        </div>
      }
    </>
  );
};

export default Collection;

const MobileCollection = ({
  ProdCardImageFunc,
  designSetList,
  handleNavigation,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    fade: true,
    // cssEase: "linear",
    useTransform: true,
  };

  return (
    <div className=" mobile-collection">
      <Slider {...settings}>
        {designSetList?.slice(0, 4)?.map((val, i) => {
          return (
            <div
              className="c_card"
              onClick={() =>
                handleNavigation(
                  val?.designno,
                  val?.autocode,
                  val?.TitleLine ? val?.TitleLine : ""
                )
              }
            >
              <div className="details">
                <h3>{val?.designsetno}</h3>
                {/* <button
                onClick={() =>
                  handleNavigation(
                    val?.designno,
                    val?.autocode,
                    val?.TitleLine ? val?.TitleLine : ""
                  )
                }
                >
                  Explore
                </button> */}
              </div>
              <img
                src={ProdCardImageFunc(val)}
                alt={val?.designsetno}
                style={{ objectFit: "contain" }}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
