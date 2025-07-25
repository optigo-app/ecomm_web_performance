import React, { useEffect, useRef, useState } from "react";
import "./NewArrival1.scss";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Link,
  Skeleton,
} from "@mui/material";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import Pako from "pako";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Cookies from "js-cookie";
import {
  formatRedirectTitleLine,
  formatter,
  formatTitleLine,
  storImagePath,
} from "../../../../../../utils/Glob_Functions/GlobalFunction";
import noImageFound from "../../../Assets/image-not-found.jpg";
import { roop_loginState } from "../../../Recoil/atom";

const NewArrival = () => {
  const [newArrivalData, setNewArrivalData] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [storeInit, setStoreInit] = useState({});
  const [ring1ImageChange, setRing1ImageChange] = useState(false);
  const [ring2ImageChange, setRing2ImageChange] = useState(false);
  const islogin = useRecoilValue(roop_loginState);
  const productRefs = useRef({});

  const checkImageAvailability = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(noImageFound);
      img.src = url;
    });
  };

  useEffect(() => {
    setIsLoading(true)
    const loginUserDetail = JSON.parse(
      sessionStorage.getItem("loginUserDetail")
    );
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

    Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID)
      .then(async (response) => {
        if (response?.Data?.rd) {
          const itemsWithImageCheck = await Promise.all(
            response.Data.rd.map(async (item) => {
              // const imgURL = `${storeinit?.CDNDesignImageFol}${item.designno}~1.${item.ImageExtension}`;
              const imgURL = `${storeinit?.CDNDesignImageFolThumb}${item.designno}~1.jpg`;
              // const imageAvailable = await checkImageAvailability(imgURL);
              return { ...item, src: imgURL };
            })
          );
          setNewArrivalData(itemsWithImageCheck);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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

  const handleNavigation = (designNo, autoCode, titleLine, index) => {
    let obj = {
      a: autoCode,
      b: designNo,
      m: loginUserDetail?.MetalId,
      d: loginUserDetail?.cmboDiaQCid,
      c: loginUserDetail?.cmboCSQCid,
      f: {},
    };
    sessionStorage.setItem('scrollToProduct3', `product-${index}`);
    let encodeObj = compressAndEncode(JSON.stringify(obj));
    // navigation(
    //   `/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""
    //   }${designNo}?p=${encodeObj}`
    // );
    navigation(`/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`);
  };

  useEffect(() => {
    const scrollDataStr = sessionStorage.getItem('scrollToProduct3');
    if (!scrollDataStr) return;

    const maxRetries = 10;
    let retries = 0;

    const tryScroll = () => {
      const el = productRefs.current[scrollDataStr];
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        sessionStorage.removeItem('scrollToProduct3');
      } else if (retries < maxRetries) {
        retries++;
        setTimeout(tryScroll, 200); // retry until ref is ready
      }
    };

    tryScroll();

  }, [newArrivalData]);

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleMouseEnterRing1 = (data) => {
    if (data?.ImageCount > 1) {
      setRing1ImageChange(true);
    }
  };
  const handleMouseLeaveRing1 = () => {
    setRing1ImageChange(false);
  };

  const handleMouseEnterRing2 = (data) => {
    if (data?.ImageCount > 1) {
      setRing2ImageChange(true);
    }
  };
  const handleMouseLeaveRing2 = () => {
    setRing2ImageChange(false);
  };

  if (newArrivalData?.length === 0) {
    return;
  }
  return (
    <div className="roop_newwArr1MainDiv" onContextMenu={(e) => e.preventDefault()}>
      {newArrivalData?.length != 0 && (
        <>
          <div className="title_rp">
            <Typography variant="h4" className="roop_NewArr1Title">
              NEW ARRIVAL
              <span
                role="link"
                className="rp_designSetViewmoreBtn"
                aria-label="View more new arrival products"
                onClick={() => navigation(`/p/NewArrival/?N=${btoa("NewArrival")}`)}
              >
                View more
              </span>
            </Typography>
          </div>

          {isLoading ? <Skeleton
            variant="rectangular"
            width="100%"
            height="545px"
            animation="wave"
            sx={{
              '@media (max-width: 1650px)': {
                height: "480px !important",
              },
              '@media (max-width: 1440px)': {
                height: "420px !important",
              },
              '@media (max-width: 1000px)': {
                height: "360px !important",
              },
              '@media (max-width: 900px)': {
                height: "720px !important",
              },
              '@media (max-width: 768px)': {
                height: "700px !important",
              },
              '@media (max-width: 600px)': {
                height: "640px !important",
              },
              '@media (max-width: 450px)': {
                height: "600px !important",
              },
              '@media (max-width: 325px)': {
                height: "520px !important",
              },
            }}
          /> :
            <Grid container spacing={1} className="roop_NewArrival1product-list" onContextMenu={(e) => e.preventDefault()}>
              {newArrivalData?.slice(0, 4)?.map((product, index) => (
                <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
                  <Card
                    aria-label={`View details of ${product?.TitleLine || "product"
                      } - ${product?.designno}`}
                    className="roop_NewArrproduct-card"
                    onClick={() =>
                      handleNavigation(
                        product?.designno,
                        product?.autocode,
                        product?.TitleLine,
                        index
                      )
                    }
                  >
                    <div className="roop_newArr1Image">
                      <CardMedia
                        component="img"
                        className="roop_newArrImage"
                        // image="https://www.bringitonline.in/uploads/2/2/4/5/22456530/female-diamond-necklace-jewellery-photoshoot-jewellery-photography-jewellery-photographers-jewellery-model-shoot-jewellery-product-shoot-bringitonline_orig.jpeg"
                        image={
                          product?.ImageCount >= 1 ? product?.src : noImageFound
                        }
                        draggable={true}
                        onContextMenu={(e) => e.preventDefault()}
                        // image={product?.ImageCount >= 1 ?
                        //     `${imageUrl}${newArrivalData && product?.designno}_1.${newArrivalData && product?.ImageExtension}`
                        //     : noImageFound}
                        alt={product?.TitleLine}
                        id={`product-${index}`}
                        ref={(el) => (productRefs.current[`product-${index}`] = el)}
                        onError={(e) => e.target.src = noImageFound}
                        loading="lazy" // Use lazy loading to optimize performance
                      />
                    </div>
                    <CardContent className="roop_newarrproduct-info">
                      <Typography variant="h6" className="roop_newArrTitle">
                        {formatTitleLine(product?.TitleLine) && product?.TitleLine + " - "}
                        {product?.designno !== "" && product?.designno}
                      </Typography>
                      <Typography variant="body2">
                        {storeInit?.IsGrossWeight == 1 && (
                          <>
                            <span className="roop_lb3detailDT">GWT: </span>
                            <span className="roop_lb3detailDT">
                              {(product?.Gwt || 0)?.toFixed(3)}
                            </span>
                          </>
                        )}
                        {Number(product?.Nwt) !== 0 && (
                          <>
                            <span className="roop_lb3pipe"> | </span>
                            <span className="roop_lb3detailDT">NWT : </span>
                            <span className="roop_lb3detailDT">
                              {(product?.Nwt || 0)?.toFixed(3)}
                            </span>
                          </>
                        )}
                        {storeInit?.IsDiamondWeight == 1 && (
                          <>
                            {(product?.Dwt != "0" || product?.Dpcs != "0") && (
                              <>
                                <span className="roop_lb3pipe"> | </span>
                                <span className="roop_lb3detailDT">DWT: </span>
                                <span className="roop_lb3detailDT">
                                  {(product?.Dwt || 0)?.toFixed(3)} /{" "}
                                  {product?.Dpcs || 0}
                                </span>
                              </>
                            )}
                          </>
                        )}
                        {storeInit?.IsStoneWeight == 1 && (
                          <>
                            {(product?.CSwt != "0" || product?.CSpcs != "0") && (
                              <>
                                <span className="roop_lb3pipe"> | </span>
                                <span className="roop_lb3detailDT">CWT: </span>
                                <span className="roop_lb3detailDT">
                                  {(product?.CSwt || 0)?.toFixed(3)} /{" "}
                                  {product?.CSpcs || 0}
                                </span>
                              </>
                            )}
                          </>
                        )}
                      </Typography>
                      {storeInit?.IsPriceShow == 1 && <p className="roop_newArrPrice">
                        <span
                          className="roop_currencyFont"
                          dangerouslySetInnerHTML={{
                            __html: decodeEntities(
                              islogin
                                ? loginUserDetail?.CurrencyCode
                                : storeInit?.CurrencyCode
                            ),
                          }}
                        />{" "}
                        {formatter(product?.UnitCostWithMarkUp)}
                      </p>}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          }
        </>
      )}
    </div>
  );
};

export default NewArrival;
