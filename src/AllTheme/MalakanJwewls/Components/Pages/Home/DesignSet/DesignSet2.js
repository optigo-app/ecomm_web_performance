import React, { useEffect, useState } from "react";
import "./DesignSet2.scss";
import bgImg from "../../../Assets/full.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Pako from 'pako';
import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import { Link } from '@mui/material';
import gradientColors from "../LookBook/color.json"
import { formatter, storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { mala_loginState } from "../../../Recoil/atom";

const DesignSet2 = () => {

  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
  const [designSetList, setDesignSetList] = useState([]);
  const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
  const [storeInit, setStoreInit] = useState({});
  const islogin = useRecoilValue(mala_loginState);
  const [swiper, setSwiper] = useState(null);
  const [imageUrlDesignSet, setImageUrlDesignSet] = useState();

  useEffect(() => {

    const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get('visiterId');
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
    } else {
      finalID = loginUserDetail?.id || '0';
    }

    let storeinit = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInit(storeinit);

    let data = JSON.parse(sessionStorage.getItem('storeInit'));
    setImageUrl(data?.DesignSetImageFol);
    setImageUrlDesignSet(data?.DesignImageFol);

    Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet_List", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          setDesignSetList(response?.Data?.rd);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const ProdCardImageFunc = (pd) => {
    let finalprodListimg;
    if (pd?.DefaultImageName) {
      finalprodListimg = imageUrl + pd?.designsetuniqueno + '/' + pd?.DefaultImageName;
    } else {
      finalprodListimg = imageNotFound;
    }
    return finalprodListimg;
  };

  const getRandomBgColor = (index) => {
    const colorsLength = gradientColors.length;
    return gradientColors[index % colorsLength];
  };

  const parseDesignDetails = (details) => {
    try {
      let finalArr = JSON.parse(details);
      console.log('kjdksjfkjsdjf', finalArr);
      return finalArr;
    } catch (error) {
      console.error("Error parsing design details:", error);
      return [];
    }
  };

  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);
      const compressed = Pako.deflate(uint8Array, { to: 'string' });
      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error('Error compressing and encoding:', error);
      return null;
    }
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
    navigate(`/d/${titleLine?.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? '_' : ''}${designNo}?p=${encodeObj}`);
  };

  const decodeEntities = (html) => {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const handlePrevious = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };
  return (
    <>
      <div className="mala_DesignSet2MainDiv">
        {designSetList?.length !== 0 && (
          <>
            <div className='mala_DesignSetTitleDiv'>
              <p className='mala_desognSetTitle'>Complete Your Look
                <Link href="/Lookbook" className='mala_designSetViewmoreBtn'>
                  View more
                </Link>
              </p>
            </div>
            {/* <Swiper
              className="mySwiper"
              spaceBetween={5}
              slidesPerView={1}
              speed={1000}
              loop={false}
              navigation={true}
              modules={[Navigation]}
            > */}
            {designSetList?.slice(0, 1)?.map((slide, index) => (
              // <SwiperSlide key={`slide-${index}`}>
              <div
                style={{
                  position: 'relative',
                }}
                className="maindiv"
              >
                {ProdCardImageFunc(slide) ? (
                  <img
                    // src={ProdCardImageFunc(slide)}
                    // src="https://pipeline-theme-fashion.myshopify.com/cdn/shop/files/clothing-look-26.jpg?height=1366&v=1638651514&width=2048"
                    src={`${storImagePath()}/images/HomePage/DesignSetBanner/BottomBannerDesignSet1.webp`}
                    alt=""
                    className="imgBG"
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      ...getRandomBgColor(index),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    className="imgBG"
                  >
                    <p style={{ fontSize: "30px", color: getRandomBgColor(index).color }}>{slide?.designsetno}</p>
                  </div>
                )}
                {/* <p className="mala_lb3designList_title">{slide?.designsetno}</p> */}
                <div className="subimgpart">
                  <div className="card">
                    <Swiper
                      className="swiper_w"
                      spaceBetween={5}
                      slidesPerView={1}
                      speed={1000}
                      onSwiper={setSwiper}
                    >
                      {slide?.Designdetail && (
                        <>
                          {parseDesignDetails(slide?.Designdetail)?.map((detail, subIndex) => (
                            <SwiperSlide key={`detail-${detail?.id}`}>
                              <div className="centerall">
                                <div className="mala_ds2ImageDiv">
                                  <img
                                    loading="lazy"
                                    src={`${imageUrlDesignSet}${detail?.designno}_1.${detail?.ImageExtension}`}
                                    alt={`Sub image ${subIndex} for slide ${index}`}
                                    onClick={() =>
                                      handleNavigation(
                                        detail?.designno,
                                        detail?.autocode,
                                        detail?.TitleLine ? detail?.TitleLine : ""
                                      )
                                    }
                                    className="cardimg"
                                  />
                                </div>
                              </div>
                              <div className="fs1 centerall">{detail?.TitleLine ? `${detail.TitleLine} -` : ''}{detail?.designno}</div>
                              <div className="fs2 centerall">
                                <p>
                                  <span
                                    className="mala_currencyFont"
                                    dangerouslySetInnerHTML={{
                                      __html: decodeEntities(
                                        islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                      ),
                                    }}
                                  /> {formatter(detail?.UnitCostWithMarkUp)}
                                </p>
                              </div>
                              <div className="fs3 centerall">View Details</div>
                            </SwiperSlide>
                          ))}
                        </>
                      )}
                    </Swiper>
                  </div>
                  <div className="btnflex">
                    <button className="btncst" onClick={handlePrevious}>&lt;</button>
                    <button className="btncst" onClick={handleNext}>&gt;</button>
                  </div>
                </div>
              </div>
              // </SwiperSlide>
            ))}
            {/* </Swiper> */}

          </>
        )}

      </div>

    </>
  );
};

export default DesignSet2;
