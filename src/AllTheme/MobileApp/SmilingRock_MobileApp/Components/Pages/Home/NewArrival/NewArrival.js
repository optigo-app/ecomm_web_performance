import React, { useEffect, useRef, useState } from "react";
import "./PromotionBanner2.modul.scss";
import Pako from "pako";
import { useNavigate } from "react-router-dom";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import Cookies from "js-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { smrMA_homeLoading, smrMA_loginState } from "../../../Recoil/atom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { Pagination } from "swiper/modules";
import { formatter } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import notfound from '../../../Assets/image-not-found.jpg';

const NewArrival = () => {

  const newArrivalRef = useRef(null);
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [storeInit, setStoreInit] = useState({});
  const islogin = useRecoilValue(smrMA_loginState);
  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const setLoadingHome = useSetRecoilState(smrMA_homeLoading);
  const [isAPICalled, setIsAPICalled] = useState(false);

  const checkImageAvailability = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(imageNotFound);
      img.src = url;
    });
  };

  useEffect(() => {
    setLoadingHome(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAPICalled) {  // Check if API has already been called
            console.log("called ")
            setIsAPICalled(true);  // Set flag to true so it doesn't call again
            callAPI();
            observer.unobserve(entry.target);  // Stop observing after the first call
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    if (newArrivalRef.current) {
      observer.observe(newArrivalRef.current);
    }
    return () => {
      if (newArrivalRef.current) {
        observer.unobserve(newArrivalRef.current);
      }
    };

  }, [isAPICalled]);


  const callAPI = () => {

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const { IsB2BWebsite } = storeInit;
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
    setImageUrl(data?.CDNDesignImageFol);
    // setImageUrl(data?.DesignImageFol);

    setLoadingHome(false);
    Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID)
      .then(async (response) => {
        if (response?.Data?.rd) {
          const itemsWithImageCheck = await Promise.all(
            response.Data.rd.map(async (item) => {
              const imgURL = `${storeinit?.CDNDesignImageFol}${item.designno}~1.${item.ImageExtension}`;
              const imageAvailable = await checkImageAvailability(imgURL);
              return { ...item, src: imageAvailable };
            })
          );
          setNewArrivalData(itemsWithImageCheck);
        }
      })
      .catch((err) => console.log(err));
  }

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

  const handleNavigation = (designNo, autoCode, titleLine) => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    let obj = {
      a: autoCode,
      b: designNo,
      m: loginUserDetail?.MetalId,
      d: loginUserDetail?.cmboDiaQCid,
      c: loginUserDetail?.cmboCSQCid,
      f: {},
    };
    let encodeObj = compressAndEncode(JSON.stringify(obj));
    const link =  `/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""
          }${designNo}?p=${encodeObj}`;
    if (storeinit?.IsB2BWebsite == 1) {
      if (islogin) {
        navigation(link);
      } else {
        localStorage.setItem('redirectLookBook',link);
        navigation("/signin");
      }
    } else {
      navigation(link);
    }
  };

  const swiperParams = {
    loop: true,
    modules: [Pagination],
    slidesPerView: 3,
  };


  return (
    <div style={{ marginBottom: newArrivalData?.length == 0 && '5px' }} ref={newArrivalRef}>
      {newArrivalData?.length != 0 &&
        <div className="smrMA_NewArrivalMain">
          <Swiper {...swiperParams}
            className="smaMA_newArrivalBoxcMain"
          >
            {newArrivalData?.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{ maxWidth: "18rem", marginInline: "auto" }}
                className="smaMA_newArrivalBoxcMainSub"
              >
                <div
                  className="smr_newArrialDiv1"
                  onClick={() =>
                    handleNavigation(
                      item.designno,
                      item.autocode,
                      item.TitleLine
                    )
                  }
                >
                  <img
                    src={item.imageAvailable
                      ? `${item?.src}`
                      // ? `${imageUrl}${item.designno}_1.${item.ImageExtension}`
                      : notfound}
                    className="smilingMainImages"
                    alt={item.TitleLine}
                  />
                  <p className="ring1Desc">{item.designno}</p>
                  <p className='smr_nwArrivalTitle'>
                    <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}</span>&nbsp;
                    {formatter(item.UnitCostWithMarkUp)}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </div>
  );
};

export default NewArrival;
