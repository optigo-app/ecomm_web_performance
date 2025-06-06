import React, { useEffect, useRef, useState } from "react";
import "./Productdetail.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Pako from "pako";
import { SingleProdListAPI } from "../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI";
import { SingleFullProdPriceAPI } from "../../../../../../utils/API/SingleFullProdPriceAPI/SingleFullProdPriceAPI";
import imageNotFound from "../../Assets/image-not-found.jpg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Skeleton,
  Typography,
} from "@mui/material";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { smrMA_CartCount, smrMA_WishCount } from "../../Recoil/atom";
import { useSetRecoilState } from "recoil";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { IoIosPlayCircle } from "react-icons/io";
import { getSizeData } from "../../../../../../utils/API/CartAPI/GetCategorySizeAPI";
import { StockItemApi } from "../../../../../../utils/API/StockItemAPI/StockItemApi";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Cookies from "js-cookie";
import { DesignSetListAPI } from "../../../../../../utils/API/DesignSetListAPI/DesignSetListAPI";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaBoxOpen } from "react-icons/fa"
import { Link } from "react-router-dom"

import {
  FreeMode,
  Navigation,
  Pagination,
  Keyboard,
  Scrollbar,
  A11y,
  Thumbs,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { formatRedirectTitleLine, formatTitleLine } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const ProductDetail = () => {
  let location = useLocation();

  const [singleProd, setSingleProd] = useState({});
  const [singleProd1, setSingleProd1] = useState({});
  const [singleProdPrice, setSingleProdPrice] = useState();
  const [storeInit, setStoreInit] = useState({});
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [diaQcCombo, setDiaQcCombo] = useState([]);
  const [csQcCombo, setCsQcCombo] = useState([]);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [selectMtType, setSelectMtType] = useState();
  const [selectDiaQc, setSelectDiaQc] = useState();
  const [selectCsQc, setSelectCsQc] = useState();
  const [selectMtColor, setSelectMtColor] = useState();
  const [pdThumbImg, setPdThumbImg] = useState([]);
  const [isImageload, setIsImageLoad] = useState(true);
  const [selectedThumbImg, setSelectedThumbImg] = useState();
  const [decodeUrl, setDecodeUrl] = useState({});
  const [finalprice, setFinalprice] = useState(0);
  const [addToCartFlag, setAddToCartFlag] = useState(null);
  const [wishListFlag, setWishListFlag] = useState(null);
  const [loginInfo, setLoginInfo] = useState();
  // const [SizeCombo,getSizeCombo] = useState();
  const [sizeData, setSizeData] = useState();
  const [isPriceloading, setisPriceLoading] = useState(false);
  const [ShowNoImage, setShowNoImage] = useState(false);
  const [designSetList, setDesignSetList] = useState();
  const [thumbImgIndex, setThumbImgIndex] = useState();

  const [prodLoading, setProdLoading] = useState(false);
  const [isDataFound, setIsDataFound] = useState(false);
  const [SizeCombo, setSizeCombo] = useState();
  const [selectedMetalColor, setSelectedMetalColor] = useState();

  const [diaList, setDiaList] = useState([]);
  const [csList, setCsList] = useState([]);

  const setCartCountVal = useSetRecoilState(smrMA_CartCount);
  const setWishCountVal = useSetRecoilState(smrMA_WishCount);

  const [pdVideoArr, setPdVideoArr] = useState([]);

  const [metalFilterData, setMetalFilterData] = useState();
  const [daimondFilterData, setDaimondFiletrData] = useState([]);
  const [colorStoneFilterData, setColorStoneFiletrData] = useState([]);
  const [FindingFilterData, setFindingFiletrData] = useState([]);

  const [dqcRate, setDqcRate] = useState();
  const [dqcSettRate, setDqcSettRate] = useState();
  const [csqcRate, setCsqcRate] = useState();
  const [csqcSettRate, setCsqcSettRate] = useState();

  const [stockItemArr, setStockItemArr] = useState([]);
  const [SimilarBrandArr, setSimilarBrandArr] = useState([]);

  const [cartArr, setCartArr] = useState({});

  // console.log("selectttt",{selectMtType,selectDiaQc,selectCsQc,selectMtColor});

  const formatter = new Intl.NumberFormat("en-IN");
  const videoRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play();
            console.log("videoRef");
          } else {
            videoElement.pause();
            console.log("videoRef");
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    observer.observe(videoElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  let cookie = Cookies.get("visiterId");

  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr = mtColorLocal?.filter(
        (ele) =>
          ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
      )[0];
    }

    setSelectMtColor(mcArr?.metalcolorname);
  }, [singleProd]);

  useEffect(() => {
    localStorage.removeItem("redirectLookBook");
  }, []);

  // useEffect(()=>{
  //     getSizeData(singleProd).then((res)=>{
  //       console.log("Sizeres",res)
  //       getSizeCombo(res?.Data)
  //     }).catch((err)=>console.log("SizeErr",err))
  // },[singleProd])

  // useEffect(()=>{
  //    let sizeData = JSON.stringify(sessionStorage.getItem("sizecombo"))
  //    getSizeCombo(sizeData)
  // },[])

  useEffect(() => {
    let isincart = singleProd?.IsInCart == 0 ? false : true;
    setAddToCartFlag(isincart);
  }, [singleProd]);

  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    if (!pdVideoArr || !selectedMetalColor) return;

    const colorMatched = pdVideoArr.filter((url) => {
      const parts = url.split("~");
      const colorPart = parts[2]?.split(".")[0];
      return colorPart === selectedMetalColor;
    });

    if (colorMatched.length > 0) {
      setFilteredVideos(colorMatched);
    } else {
      // Fallback: videos without any color in the filename
      const noColorVideos = pdVideoArr.filter((url) => {
        const parts = url.split("~");
        return parts.length === 2; // means format is like MCJ66~1.mp4
      });
      setFilteredVideos(noColorVideos);
    }
  }, [pdVideoArr, selectedMetalColor]);

  const handleCart = (cartflag) => {
    // let metal =
    //   metalTypeCombo?.filter((ele) => ele?.metaltype == selectMtType)[0] ??
    //   metalTypeCombo[0];
    // let dia =
    //   diaQcCombo?.filter(
    //     (ele) =>
    //       ele?.Quality == selectDiaQc.split(",")[0] &&
    //       ele?.color == selectDiaQc.split(",")[1]
    //   )[0] ?? diaQcCombo[0];
    // let cs =
    //   csQcCombo?.filter(
    //     (ele) =>
    //       ele?.Quality == selectCsQc.split(",")[0] &&
    //       ele?.color == selectCsQc.split(",")[1]
    //   )[0] ?? csQcCombo[0];

    // let mcArr = metalColorCombo?.filter((ele) => {
    //   if (selectMtColor) {
    //     return ele?.colorname == selectMtColor;
    //   } else {
    //     return (
    //       ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
    //     );
    //   }
    // })[0];

    // console.log(mcArr ,"mmmm")

    // let prodObj = {
    //   autocode: singleProd?.autocode,
    //   Metalid: metal?.Metalid,
    //   MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
    //   DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
    //   CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
    //   Size: sizeData ?? singleProd?.DefaultSize,
    //   Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
    //   markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
    //   UnitCostWithmarkup:
    //     singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
    //   Remark: "",
    // };

    let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
    let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let metal = metalTypeCombo?.filter((ele) => ele?.metaltype == selectMtType);
    let dia = diaQcCombo?.filter(
      (ele) =>
        ele?.Quality == selectDiaQc.split(",")[0] &&
        ele?.color == selectDiaQc.split(",")[1]
    );
    let cs = csQcCombo?.filter(
      (ele) =>
        ele?.Quality == selectCsQc.split(",")[0] &&
        ele?.color == selectCsQc.split(",")[1]
    );

    let mcArr = metalColorCombo?.filter((ele) => {
      if (selectMtColor) {
        return ele?.colorcode == selectMtColor;
      } else {
        return (
          ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
        );
      }
    })[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.length
        ? metal[0]?.Metalid
        : logininfoInside?.MetalId ?? storeinitInside?.MetalId,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: dia?.length
        ? `${dia[0]?.QualityId},${dia[0]?.ColorId}`
        : logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid,
      CsQCid: cs?.length
        ? `${cs[0]?.QualityId},${cs[0]?.ColorId}`
        : logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid,
      Size: sizeData ?? singleProd?.DefaultSize,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup:
        singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
    };


    if (cartflag) {
      CartAndWishListAPI("Cart", prodObj)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          console.log("addtocart re", cartflag);
          setAddToCartFlag(cartflag);
        });
    } else {
      RemoveCartAndWishAPI("Cart", singleProd?.autocode)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          console.log("rremovve add", cartflag);
          setAddToCartFlag(cartflag);
        });
    }
  };

  const handleWishList = (e) => {
    setWishListFlag(e?.target?.checked);

    let metal =
      metalTypeCombo?.filter((ele) => ele?.metaltype == selectMtType)[0] ??
      metalTypeCombo[0];
    let dia =
      diaQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectDiaQc.split(",")[0] &&
          ele?.color == selectDiaQc.split(",")[1]
      )[0] ?? diaQcCombo[0];
    let cs =
      csQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectCsQc.split(",")[0] &&
          ele?.color == selectCsQc.split(",")[1]
      )[0] ?? csQcCombo[0];

    let mcArr = metalColorCombo?.filter((ele) => {
      if (selectMtColor) {
        return ele?.colorname == selectMtColor;
      } else {
        return (
          ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
        );
      }
    })[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
      CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
      Size: sizeData ?? singleProd1?.DefaultSize ?? singleProd?.DefaultSize,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup:
        singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
    };

    if (e?.target?.checked == true) {
      CartAndWishListAPI("Wish", prodObj)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    } else {
      RemoveCartAndWishAPI("Wish", singleProd?.autocode)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    }
  };

  const [mtrd, setMtrd] = useState([]);
  const [diard1, setDiard1] = useState([]);
  const [csrd2, setCsrd2] = useState([]);

  // const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
  //   if (pPrice <= 0) {
  //     return 0;
  //   } else if (pmu <= 0) {
  //     return pPrice;
  //   } else {
  //     let percentPMU = pmu / 100 / curr;
  //     return Number(pPrice * (percentPMU ?? 0)) + Number(pPrice ?? 0);
  //   }
  // };

  const PriceWithMarkupFunction = (pmu, pPrice, curr, swp = 0) => {
    if (pPrice <= 0) {
      return 0;
    } else if (pmu <= 0) {
      return (pPrice + swp).toFixed(2);
    } else {
      let percentPMU = pmu / 100 / curr;
      return (
        Number(pPrice * percentPMU ?? 0) +
        Number(pPrice ?? 0) +
        (swp ?? 0)
      ).toFixed(2);
    }
  };

  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];
    let decodeobj = decodeAndDecompress(navVal);

    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(
      sessionStorage.getItem("diamondQualityColorCombo")
    );

    let csQcLocal = JSON.parse(
      sessionStorage.getItem("ColorStoneQualityColorCombo")
    );

    setTimeout(() => {
      if (decodeUrl) {
        let metalArr;
        let diaArr;
        let csArr;

        let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
        let logininfoInside = JSON.parse(
          sessionStorage.getItem("loginUserDetail")
        );

        // if (mtTypeLocal?.length) {
        //   metalArr =
        //     mtTypeLocal?.filter((ele) => ele?.Metalid == decodeobj?.m)[0] ??
        //     mtTypeLocal[0];
        // }

        // if (diaQcLocal?.length) {
        //   diaArr =
        //     diaQcLocal?.filter(
        //       (ele) =>
        //         ele?.QualityId == decodeobj?.d?.split(",")[0] &&
        //         ele?.ColorId == decodeobj?.d?.split(",")[1]
        //     )[0] ?? diaQcLocal[0];
        // }

        // if (csQcLocal?.length) {
        //   csArr =
        //     csQcLocal?.filter(
        //       (ele) =>
        //         ele?.QualityId == decodeobj?.c?.split(",")[0] &&
        //         ele?.ColorId == decodeobj?.c?.split(",")[1]
        //     )[0] ?? csQcLocal[0];
        // }
        if (mtTypeLocal?.length) {
          metalArr = mtTypeLocal?.filter(
            (ele) =>
              ele?.Metalid ==
              (decodeobj?.m
                ? decodeobj?.m
                : logininfoInside?.MetalId ?? storeinitInside?.MetalId)
          )[0];
        }

        if (diaQcLocal?.length) {
          diaArr = diaQcLocal?.filter(
            (ele) =>
              ele?.QualityId ==
              (decodeobj?.d
                ? decodeobj?.d?.split(",")[0]
                : (
                  logininfoInside?.cmboDiaQCid ??
                  storeinitInside?.cmboDiaQCid
                ).split(",")[0]) &&
              ele?.ColorId ==
              (decodeobj?.d
                ? decodeobj?.d?.split(",")[1]
                : (
                  logininfoInside?.cmboDiaQCid ??
                  storeinitInside?.cmboDiaQCid
                ).split(",")[1])
          )[0];
        }

        if (csQcLocal?.length) {
          csArr = csQcLocal?.filter(
            (ele) =>
              ele?.QualityId ==
              (decodeobj?.c
                ? decodeobj?.c?.split(",")[0]
                : (
                  logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid
                ).split(",")[0]) &&
              ele?.ColorId ==
              (decodeobj?.c
                ? decodeobj?.c?.split(",")[1]
                : (
                  logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid
                ).split(",")[1])
          )[0];
        }

        setSelectMtType(metalArr?.metaltype);

        setSelectDiaQc(`${diaArr?.Quality},${diaArr?.color}`);

        setSelectCsQc(`${csArr?.Quality},${csArr?.color}`);

        // let InitialSize = (singleProd && singleProd.DefaultSize !== "")
        //                       ? singleProd?.DefaultSize
        //                       : (SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename === undefined ? SizeCombo?.rd[0]?.sizename : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename)
        // if(InitialSize){
        //   setSizeData(InitialSize)
        // }

        // if(metalArr || diaArr || csArr || InitialSize){
        //   setCustomObj({metalArr, diaArr, csArr ,InitialSize})
        // }

        // console.log("default", { metalArr, diaArr, csArr }, decodeobj);
      }
    }, 500);
  }, [singleProd]);

  useEffect(() => {
    let finalSize = SizeCombo?.rd1?.filter((ele) => ele?.sizename == sizeData);
    const filteredDataMetal = finalSize?.filter(
      (item) => item.DiamondStoneTypeName === "METAL"
    )[0];
    const filteredDataDaimond = finalSize?.filter(
      (item) => item.DiamondStoneTypeName === "DIAMOND"
    );
    const filteredDataColorStone = finalSize?.filter(
      (item) => item.DiamondStoneTypeName === "COLOR STONE"
    );
    const filteredDataFinding = finalSize?.filter(
      (item) => item.DiamondStoneTypeName === "FINDING"
    );

    setMetalFilterData(filteredDataMetal);
    setDaimondFiletrData(filteredDataDaimond);
    setColorStoneFiletrData(filteredDataColorStone);
    setFindingFiletrData(filteredDataFinding);
  }, [sizeData, SizeCombo]);

  let metalUpdatedPrice = () => {
    if (metalFilterData && metalFilterData.length && mtrd?.AE === 1) {
      let CalcNetwt = (mtrd?.I ?? 0) + (metalFilterData?.Weight ?? 0) ?? 0;

      let fprice = (mtrd?.AD ?? 0) * CalcNetwt + (mtrd?.AC ?? 0) * CalcNetwt;
      console.log("fpricemetal", fprice);

      return Number(fprice.toFixed(2));
    } else {
      return 0;
    }
  };

  let diaUpdatedPrice = () => {
    if (daimondFilterData && daimondFilterData?.length && diard1[0]?.T === 1) {
      let calcDiaWt = (mtrd?.K ?? 0) + (daimondFilterData?.Weight ?? 0);

      let CalcPics = (mtrd?.J ?? 0) + (daimondFilterData?.pieces ?? 0);

      let fpprice =
        (dqcRate ?? 0) * (calcDiaWt ?? 0) +
        (dqcSettRate ?? 0) * (CalcPics ?? 0);

      return Number(fpprice.toFixed(2));
    } else {
      return 0;
    }
  };

  let colUpdatedPrice = () => {
    if (
      colorStoneFilterData &&
      colorStoneFilterData?.length &&
      csrd2[0]?.T === 1
    ) {
      let calcDiaWt =
        (singleProd?.totalcolorstoneweight ?? 0) +
        (colorStoneFilterData?.Weight ?? 0);

      let CalcPics =
        (singleProd?.totalcolorstonepcs ?? 0) +
        (colorStoneFilterData?.pieces ?? 0);

      let fpprice =
        (csqcRate ?? 0) * (calcDiaWt ?? 0) +
        (csqcSettRate ?? 0) * (CalcPics ?? 0);

      return Number(fpprice.toFixed(2));
    } else {
      return 0;
    }
  };

  // console.log("finalSize", colUpdatedPrice())

  const callAllApi = () => {
    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
    let diaQcLocal = JSON.parse(
      sessionStorage.getItem("diamondQualityColorCombo")
    );
    let csQcLocal = JSON.parse(
      sessionStorage.getItem("ColorStoneQualityColorCombo")
    );
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));

    if (!mtTypeLocal || mtTypeLocal?.length === 0) {
      MetalTypeComboAPI()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            sessionStorage.setItem("metalTypeCombo", JSON.stringify(data));
            setMetalTypeCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setMetalTypeCombo(mtTypeLocal);
    }

    if (!diaQcLocal || diaQcLocal?.length === 0) {
      DiamondQualityColorComboAPI()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            sessionStorage.setItem(
              "diamondQualityColorCombo",
              JSON.stringify(data)
            );
            setDiaQcCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setDiaQcCombo(diaQcLocal);
    }

    if (!csQcLocal || csQcLocal?.length === 0) {
      ColorStoneQualityColorComboAPI()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            sessionStorage.setItem(
              "ColorStoneQualityColorCombo",
              JSON.stringify(data)
            );
            setCsQcCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setCsQcCombo(csQcLocal);
    }

    if (!mtColorLocal || mtColorLocal?.length === 0) {
      MetalColorCombo()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            sessionStorage.setItem("MetalColorCombo", JSON.stringify(data));
            setMetalColorCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setMetalColorCombo(mtColorLocal);
    }
  };

  useEffect(() => {
    const logininfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    setLoginInfo(logininfo);
  }, []);

  useEffect(() => {
    callAllApi();
  }, [loginInfo]);

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    if (storeinit) setStoreInit(storeinit);
  }, []);

  const decodeAndDecompress = (encodedString) => {
    try {
      const binaryString = atob(encodedString);

      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      const decompressed = Pako.inflate(uint8Array, { to: "string" });

      const jsonObject = JSON.parse(decompressed);

      return jsonObject;
    } catch (error) {
      console.error("Error decoding and decompressing:", error);
      return null;
    }
  };

  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];

    let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
    let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let decodeobj = decodeAndDecompress(navVal);

    if (decodeobj) {
      setDecodeUrl(decodeobj);
    }

    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(
      sessionStorage.getItem("diamondQualityColorCombo")
    );

    let csQcLocal = JSON.parse(
      sessionStorage.getItem("ColorStoneQualityColorCombo")
    );

    let metalArr;
    let diaArr;
    let csArr;

    if (mtTypeLocal?.length) {
      metalArr = mtTypeLocal?.filter((ele) => ele?.Metalid == decodeobj?.m)[0]
        ?.Metalid;
    }

    if (diaQcLocal) {
      diaArr = diaQcLocal?.filter(
        (ele) =>
          ele?.QualityId == decodeobj?.d?.split(",")[0] &&
          ele?.ColorId == decodeobj?.d?.split(",")[1]
      )[0];
    }

    if (csQcLocal) {
      csArr = csQcLocal?.filter(
        (ele) =>
          ele?.QualityId == decodeobj?.c?.split(",")[0] &&
          ele?.ColorId == decodeobj?.c?.split(",")[1]
      )[0];
    }

    const FetchProductData = async () => {
      setProdLoading(true);
      setShowNoImage(false);
      setisPriceLoading(true);
      setSingleProd1({});
      setSingleProd({});
      let obj1 = {
        mt: logininfoInside?.MetalId ?? storeinitInside?.MetalId,
        diaQc: diaArr
          ? `${diaArr?.QualityId ?? 0},${diaArr?.ColorId ?? 0}`
          : logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid,
        csQc: csArr
          ? `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`
          : logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid,
      };

      let obj = {
        mt: metalArr
          ? metalArr
          : logininfoInside?.MetalId ?? storeinitInside?.MetalId,
        diaQc: diaArr
          ? `${diaArr?.QualityId ?? 0},${diaArr?.ColorId ?? 0}`
          : logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid,
        csQc: csArr
          ? `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`
          : logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid,
      };

      await SingleProdListAPI(decodeobj, sizeData, obj, cookie)
        .then(async (res) => {
          if (res) {
            setSingleProd(res?.pdList[0]);
            if (
              res?.pdList[0]?.ImageExtension === "" &&
              res?.pdList[0]?.VideoExtension === ""
            ) {
              setShowNoImage(true);
            }

            if (res?.pdList?.length > 0) {
              setisPriceLoading(false);
              // setIsImageLoad(false)
              // setSelectedThumbImg({
              //   link: "",
              //   type: "img",
              // });
              setProdLoading(false);
            }

            if (!res?.pdList[0] || res?.status?.Status != 200 || res?.status?.Message != "Success") {
              setisPriceLoading(false);
              setProdLoading(false);
              setIsDataFound(true);
            } else {
              setIsDataFound(false);
            }

            setDiaList(res?.pdResp?.rd3);
            setCsList(res?.pdResp?.rd4);

            let prod = res?.pdList[0];

            let initialsize =
              prod && prod.DefaultSize !== ""
                ? prod?.DefaultSize
                : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)
                  ?.sizename === undefined
                  ? SizeCombo?.rd[0]?.sizename
                  : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)
                    ?.sizename;

            setSizeData(initialsize);

            // await SingleFullProdPriceAPI(decodeobj).then((res) => {
            //   setSingleProdPrice(res);
            //   console.log("singlePrice", res);
            // });
          } else {
            setShowNoImage(true);
          }
          return res;
        })
        .then(async (resp) => {
          if (resp) {
            await getSizeData(resp?.pdList[0], cookie)
              .then((res) => {
                // console.log("Sizeres",res)
                setSizeCombo(res?.Data);
              })
              .catch((err) => console.log("SizeErr", err));

            if (storeinitInside?.IsStockWebsite === 1) {
              await StockItemApi(resp?.pdList[0]?.autocode, "stockitem", cookie)
                .then((res) => {
                  setStockItemArr(res?.Data?.rd);
                })
                .catch((err) => console.log("stockItemErr", err));
            }

            if (storeinitInside?.IsProductDetailSimilarDesign === 1) {
              await StockItemApi(
                resp?.pdList[0]?.autocode,
                "similarbrand",
                obj,
                cookie
              )
                .then((res) => {
                  setSimilarBrandArr(res?.Data?.rd);
                })
                .catch((err) => console.log("similarbrandErr", err));
            }

            if (storeinitInside?.IsProductDetailDesignSet === 1) {
              await DesignSetListAPI(obj1, resp?.pdList[0]?.designno, cookie)
                .then((res) => {
                  // console.log("designsetList",res?.Data?.rd[0])
                  setDesignSetList(res?.Data?.rd);
                })
                .catch((err) => console.log("designsetErr", err));
            }
          }
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          // setIsImageLoad(false)
          setProdLoading(false);
        });
    };
    FetchProductData();

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [location?.key]);


  // console.log("location", location);

  // useEffect(() => {
  //   let metal = metalTypeCombo?.filter(
  //     (ele) => ele?.metaltype == selectMtType
  //   )[0];
  //   let dia = diaQcCombo?.filter(
  //     (ele) =>
  //       ele?.Quality == selectDiaQc.split(",")[0] &&
  //       ele?.color == selectDiaQc.split(",")[1]
  //   )[0];
  //   let cs = csQcCombo?.filter(
  //     (ele) =>
  //       ele?.Quality == selectCsQc.split(",")[0] &&
  //       ele?.color == selectCsQc.split(",")[1]
  //   )[0];

  //   let metalPdata = singleProdPrice?.rd?.filter(
  //     (ele) => ele?.C == metal?.Metalid
  //   )[0];

  //   let diaPData = singleProdPrice?.rd1?.filter(
  //     (ele) => ele?.G == dia?.QualityId && ele?.I == dia?.ColorId
  //   );

  //   let csPData = singleProdPrice?.rd2?.filter(
  //     (ele) => ele?.G == cs?.QualityId && ele?.I == cs?.ColorId
  //   );

  //   let metalPrice = 0;
  //   let diamondPrice = 0;
  //   let csPrice = 0;

  //   if (metalPdata) {
  //     setMtrd(metalPdata);
  //     metalPrice =
  //       ((metalPdata?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
  //         (metalPdata?.W ?? 0) +
  //         (metalPdata?.X ?? 0) ?? 0;
  //   }

  //   console.log("metalPdata", metalPrice);

  //   if (diaPData?.length > 0) {
  //     setDiard1(diaPData);
  //     let diasetRate = diard1?.reduce((acc, obj) => acc + obj.O, 0)
  //     let diaSettRate = diard1?.reduce((acc, obj) => acc + obj.Q, 0)
  //     setDqcRate(diasetRate ?? 0)
  //     setDqcSettRate(diaSettRate ?? 0)
  //     diamondPrice =
  //       Number(diaPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;
  //   }

  //   if (csPData?.length > 0) {
  //     setCsrd2(csPData);
  //     let csRate = csrd2?.reduce((acc, obj) => acc + obj.O, 0)
  //     let csSettRate = csrd2?.reduce((acc, obj) => acc + obj.Q, 0)
  //     setCsqcRate(csRate ?? 0)
  //     setCsqcSettRate(csSettRate ?? 0)
  //     csPrice = Number(csPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;
  //   }

  //   let finalPrice =
  //     Number(metalPrice) + Number(diamondPrice)  + Number(csPrice);
  //   console.log("pData", { metalPrice, diamondPrice, csPrice });

  //   let fp = finalPrice.toFixed(2)
  //   setFinalprice(fp)
  // }, [singleProd, singleProdPrice, selectMtType, selectDiaQc, selectCsQc]);

  const handleCustomChange = async (e, type) => {
    let metalArr;
    let diaArr;
    let csArr;
    let size;

    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(
      sessionStorage.getItem("diamondQualityColorCombo")
    );

    let csQcLocal = JSON.parse(
      sessionStorage.getItem("ColorStoneQualityColorCombo")
    );

    if (type === "mt") {
      metalArr = mtTypeLocal?.filter(
        (ele) => ele?.metaltype == e.target.value
      )[0]?.Metalid;
      setSelectMtType(e.target.value);
    }
    if (type === "dia") {
      setSelectDiaQc(e.target.value);
      diaArr = diaQcLocal?.filter(
        (ele) =>
          ele?.Quality == e.target.value?.split(",")[0] &&
          ele?.color == e.target.value?.split(",")[1]
      )[0];
    }
    if (type === "cs") {
      setSelectCsQc(e.target.value);
      csArr = csQcLocal?.filter(
        (ele) =>
          ele?.Quality == e.target.value?.split(",")[0] &&
          ele?.color == e.target.value?.split(",")[1]
      )[0];
    }
    if (type === "sz") {
      setSizeData(e.target.value);
      size = e.target.value;
    }

    if (metalArr == undefined) {
      metalArr = mtTypeLocal?.filter((ele) => ele?.metaltype == selectMtType)[0]
        ?.Metalid;
    }

    if (diaArr == undefined) {
      diaArr = diaQcLocal?.filter(
        (ele) =>
          ele?.Quality == selectDiaQc?.split(",")[0] &&
          ele?.color == selectDiaQc?.split(",")[1]
      )[0];
    }

    if (csArr == undefined) {
      csArr = csQcLocal?.filter(
        (ele) =>
          ele?.Quality == selectCsQc?.split(",")[0] &&
          ele?.color == selectCsQc?.split(",")[1]
      )[0];
    }

    let obj = {
      mt: metalArr,
      diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
      csQc: `${csArr?.QualityId},${csArr?.ColorId}`,
    };

    let prod = {
      a: singleProd?.autocode,
      b: singleProd?.designno,
    };

    // console.log("eeee",obj)
    setisPriceLoading(true);
    await SingleProdListAPI(prod, size ?? sizeData, obj, cookie)
      .then((res) => {
        setSingleProd1(res?.pdList[0]);

        if (res?.pdList?.length > 0) {
          setisPriceLoading(false);
        }
        setDiaList(res?.pdResp?.rd3);
        setCsList(res?.pdResp?.rd4);
        // console.log("res123",res)
      })
      .catch((err) => {
        console.log("customProdDetailErr", err);
      });
  };

  // const handlePrice = () =>{

  //   let finalSize = SizeCombo?.rd?.filter((ele)=>ele?.sizename == sizeData)[0]

  //   if(finalSize?.IsMarkUpInAmount == 1){

  //     let ultimatePrice = (Number(finalprice)+ metalUpdatedPrice() + diaUpdatedPrice() + colUpdatedPrice())

  //     console.log("ultimatePrice",(mtrd?.AB ?? 0) , ultimatePrice , mtrd?.AA , ((finalSize?.MarkUp ?? 0) / mtrd?.AA ));

  //     return PriceWithMarkupFunction((mtrd?.AB ?? 0) , ultimatePrice , mtrd?.AA , ((finalSize?.MarkUp ?? 0) / mtrd?.AA ))

  //   }else{

  //     let finalSize = SizeCombo?.rd?.filter((ele)=>ele?.sizename == sizeData)[0]
  //     const percentMarkupPlus = (mtrd?.AB ?? 0) + (finalSize?.MarkUp ?? 0)
  //     let ultimatePrice = (Number(finalprice) + metalUpdatedPrice() + diaUpdatedPrice() + colUpdatedPrice())

  //     console.log("ultimatePrice",percentMarkupPlus, ultimatePrice , mtrd?.AA);

  //     return PriceWithMarkupFunction(percentMarkupPlus, ultimatePrice , mtrd?.AA )
  //   }

  // }

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const loadAndCheckImages = async (img) => {
    try {
      const result = await checkImage(img); // check the image
      return result;
    } catch (error) {
      return imageNotFound;
    }
  };

  const checkImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(imageUrl); // Image loaded successfully
      };

      img.onerror = () => {
        reject(new Error("Image not found")); // Image not found
      };

      img.src = imageUrl;
    });
  };

  const ProdCardImageFunc = async () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo")) || [];
    const imageVideoDetail = singleProd?.ImageVideoDetail;
    const pd = singleProd;

    let parsedData = [];
    try {
      parsedData = imageVideoDetail === "0" ? [] : JSON.parse(imageVideoDetail || "[]");
    } catch (err) {
      console.error("Invalid JSON in ImageVideoDetail:", err);
      return;
    }

    // Filter categorized media
    const normalImages = [], colorImages = [], normalVideos = [], colorVideos = [];
    parsedData.forEach(item => {
      if (item?.TI === 1 && !item?.CN) normalImages.push(item);
      else if (item?.TI === 2 && item?.CN) colorImages.push(item);
      else if (item?.TI === 4 && item?.CN) colorVideos.push(item);
      else if (item?.Ex === "mp4" && !item?.CN) normalVideos.push(item);
    });

    const getMaxCountByColor = (list) => {
      return list.reduce((acc, curr) => {
        const color = curr.CN;
        acc[color] = (acc[color] || 0) + 1;
        return acc;
      }, {});
    };

    const maxColorCount = Math.max(...Object.values(getMaxCountByColor(colorImages)), 0);
    const normalImageCount = normalImages.length ? Math.max(...normalImages.map(i => i.Nm)) : 0;

    // Get metal color code
    const mcArr = mtColorLocal.find(ele => ele.id === singleProd?.MetalColorid);
    setSelectedMetalColor(mcArr?.colorcode);

    const buildImageURL = (i, isColor = false) => {
      const base = storeInit?.CDNDesignImageFol;
      return isColor
        ? `${base}${pd.designno}~${i}~${mcArr?.colorcode}.${colorImages[i - 1]?.Ex}`
        : `${base}${pd.designno}~${i}.${normalImages[i - 1]?.Ex}`;
    };

    const pdImgList = [];
    if (maxColorCount > 0) {
      for (let i = 1; i <= maxColorCount; i++) {
        const colorImageUrl = buildImageURL(i, true);
        const isColorImageAvailable = await checkImageAvailability(colorImageUrl);

        // Only push the image if it is available
        if (isColorImageAvailable) {
          pdImgList.push(colorImageUrl);
        }
      }
    }

    // If no color image was added, push normal images
    if (pdImgList.length === 0 && normalImageCount > 0) {
      for (let i = 1; i <= normalImageCount; i++) {
        pdImgList.push(buildImageURL(i));
      }
    }

    let finalprodListimg = pdImgList.length ? pdImgList[0] : imageNotFound;
    setSelectedThumbImg({ link: finalprodListimg, type: "img" });

    if (pdImgList.length) {
      const thumbImagePath = pdImgList.map(url => {
        const fileName = url.split("Design_Image/")[1];
        return `${storeInit?.CDNDesignImageFolThumb}${fileName?.split('.')[0]}.jpg`;
      });
      setPdThumbImg(thumbImagePath);
      setThumbImgIndex(0);
    } else {
      setThumbImgIndex();
    }

    // Video processing
    const buildVideoURL = (video, isColor = false) => {
      const base = storeInit?.CDNVPath;
      return isColor
        ? `${base}${pd.designno}~${video.Nm}~${video.CN}.${video.Ex}`
        : `${base}${pd.designno}~${video.Nm}.${video.Ex}`;
    };

    const pdvideoList = [
      ...colorVideos.map(v => buildVideoURL(v, true)),
      ...normalVideos.map(v => buildVideoURL(v))
    ];

    setPdVideoArr(pdvideoList.length ? pdvideoList : []);

    const img = await loadAndCheckImages(finalprodListimg);
    return img;
  };

  useEffect(() => {
    ProdCardImageFunc();
  }, [singleProd, location?.key]);

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };


  const handleMetalWiseColorImg = async (e) => {
    const selectedColorCode = e.target.value;
    const mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo") || "[]");
    const mcArr = mtColorLocal.find(ele => ele?.colorcode === selectedColorCode);

    const prod = singleProd ?? singleProd1;
    const { designno, ImageExtension } = prod || {};
    const baseCDN = storeInit?.CDNDesignImageFol;
    const thumbCDN = storeInit?.CDNDesignImageFolThumb;

    setSelectedMetalColor(mcArr?.colorcode);
    setSelectMtColor(selectedColorCode);

    // Parse image/video data
    let parsedData = [];
    try {
      parsedData = prod?.ImageVideoDetail && prod.ImageVideoDetail !== "0"
        ? JSON.parse(prod.ImageVideoDetail)
        : [];
    } catch (err) {
      console.error("Invalid JSON in ImageVideoDetail:", err);
      return;
    }

    // Filter color and normal images
    const colorImgs = parsedData.filter(ele => ele?.CN && ele?.TI === 2);
    const normalImgs = parsedData.filter(ele => !ele?.CN && ele?.TI === 1);

    const maxColorImgCount = Math.max(
      0,
      ...Object.values(
        colorImgs.reduce((acc, { CN }) => {
          acc[CN] = (acc[CN] || 0) + 1;
          return acc;
        }, {})
      )
    );

    const normalImageCount = normalImgs.length > 0
      ? Math.max(...normalImgs.map(item => item.Nm))
      : 0;

    // Build image URLs
    const buildColorImageList = () => Array.from({ length: maxColorImgCount }, (_, i) =>
      `${baseCDN}${designno}~${i + 1}~${mcArr?.colorcode}.${ImageExtension}`
    );

    const buildNormalImageList = () => Array.from({ length: normalImageCount }, (_, i) =>
      `${baseCDN}${designno}~${i + 1}.${ImageExtension}`
    );

    let pdImgListCol = [];
    let pdImgList = [];
    let colorImagesAvailable = false;

    // Check color image availability dynamically
    if (colorImgs.length > 0) {
      const tempColorList = buildColorImageList().filter(Boolean);

      const checkImages = tempColorList.length > 3
        ? tempColorList.slice(0, 3) // Optional cap for performance
        : tempColorList;

      const availabilityChecks = await Promise.all(
        checkImages.map(url => checkImageAvailability(url))
      );

      colorImagesAvailable = availabilityChecks.some(Boolean);
      if (colorImagesAvailable) {
        pdImgListCol = tempColorList;
      }
    }

    // Fallback to normal images if no color images are available
    if (!colorImagesAvailable && normalImgs.length > 0) {
      pdImgList = buildNormalImageList();
    }

    // Set images to UI
    if (colorImagesAvailable && pdImgListCol.length > 0) {
      const thumbImagePath = pdImgListCol.map(url => {
        const fileName = url.split('Design_Image/')[1]?.split('.')[0];
        return `${thumbCDN}${fileName}.jpg`;
      });

      setPdThumbImg(thumbImagePath);

      const mainImg = pdImgListCol[thumbImgIndex] || pdImgListCol[thumbImgIndex - 1];
      setSelectedThumbImg({ link: mainImg, type: 'img' });
      setThumbImgIndex(thumbImgIndex);

      const defaultMainImg = `${baseCDN}${designno}~${thumbImgIndex + 1}~${mcArr?.colorcode}.${ImageExtension}`;
      // setMetalWiseColorImg(defaultMainImg);

    } else if (pdImgList.length > 0) {
      const thumbImagePath = pdImgList.map(url => {
        const fileName = url.split('Design_Image/')[1]?.split('.')[0];
        return `${thumbCDN}${fileName}.jpg`;
      });
      console.log("TCL: handleMetalWiseColorImg -> thumbImagePath", thumbImagePath)
      setPdThumbImg(thumbImagePath);
      const fallbackImg = pdImgList[thumbImgIndex] || pdImgList[thumbImgIndex - 1];
      setSelectedThumbImg({ link: fallbackImg, type: 'img' });
      setThumbImgIndex(thumbImgIndex);
    }
  };

  // useEffect(()=>{

  //  StockItemApi(singleProd?.autocode,"stockitem").then((res)=>{

  //   setStockItemArr(res?.Data?.rd)

  // }).catch((err)=>console.log("stockItemErr",err))

  // },[singleProd])

  // useEffect(()=>{

  //  StockItemApi(singleProd?.autocode,"similarbrand").then((res)=>{

  //   setSimilarBrandArr(res?.Data?.rd)

  // }).catch((err)=>console.log("similarbrandErr",err))

  // },[singleProd])

  // console.log("stock",stockItemArr,SimilarBrandArr);

  const handleCartandWish = (e, ele, type) => {
    console.log("event", e.target.checked, ele, type);
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let prodObj = {
      StockId: ele?.StockId,
      // "autocode": ele?.autocode,
      // "Metalid": ele?.MetalPurityid,
      // "MetalColorId": ele?.MetalColorid,
      // "DiaQCid": loginInfo?.cmboDiaQCid,
      // "CsQCid": loginInfo?.cmboCSQCid,
      // "Size": ele?.Size,
      Unitcost: ele?.Amount,
      // "UnitCostWithmarkup": ele?.Amount,
      // "Remark": ""
    };

    if (e.target.checked == true) {
      CartAndWishListAPI(type, prodObj, cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    } else {
      RemoveCartAndWishAPI(type, ele?.StockId, cookie, true)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    }

    if (type === "Cart") {
      setCartArr((prev) => ({
        ...prev,
        [ele?.StockId]: e.target.checked,
      }));
    }
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

    // navigate(
    //   `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${
    //     productData?.TitleLine?.length > 0 ? "_" : ""
    //   }${productData?.designno}?p=${encodeObj}`
    // );
    navigate(`/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`);
    setSingleProd1({});
    setSingleProd({});
    setIsImageLoad(true);
    setProdLoading(true);
    setShowNoImage(false);
    setWishListFlag(null)
  };

  const SizeSorting = (SizeArr) => {
    let SizeSorted = SizeArr?.sort((a, b) => {
      const nameA = parseInt(a?.sizename?.toUpperCase()?.slice(0, -2), 10);
      const nameB = parseInt(b?.sizename?.toUpperCase()?.slice(0, -2), 10);

      return nameA - nameB;
    });

    return SizeSorted;
  };
  const mediaItems = [...pdThumbImg, ...pdVideoArr];

  return (
    <>
      <div className="smrMA_prodDetail_bodyContain">
        <div className="smr_prodDetail_outerContain">
          <div className="smr_prodDetail_whiteInnerContain">
            {isDataFound ? (
              // <div
              //   style={{
              //     height: "90vh",
              //     justifyContent: "center",
              //     display: "flex",
              //     alignItems: "center",
              //   }}
              //   className="smr_prodd_datanotfound_ss"
              // >
              //   Data not Found!!
              // </div>
              <div className="product-not-found">
                <div className="content">
                  <div className="icon-wrapper">
                    <FaBoxOpen className="icon" />
                  </div>
                  <h2 className="title">Product Not Found</h2>
                  <p className="description">We couldn't find the product you're looking for.</p>
                  <div className="button-wrapper">
                    <Link to="/" className="button">
                      Return to Homepage
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="smr_prod_detail_main"
                  style={{ marginTop: "50px", marginBottom: "40px", }}
                >
                  <div className="smr_prod_image_shortInfo">
                    <div className="smr_prod_image_Sec">
                      {isImageload && (
                        <Skeleton
                          sx={{
                            width: "100%",
                            height: "400px",
                          }}
                          variant="rounded"
                        />
                      )}
                      {ShowNoImage && (
                        <img
                          src={imageNotFound}
                          // onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                          alt={"noimage"}
                          style={{ scale: "0.5" }}
                          // onLoad={() => setIsImageLoad(false)}
                          className="smr_prod_img"
                          loading="lazy"
                        />
                      )}

                      <div
                        className="smr_main_prod_img"
                        style={{ display: isImageload ? "none" : "block" }}
                      >
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={10}
                          modules={[
                            Keyboard,
                            FreeMode,
                            Navigation,
                            Thumbs,
                            Pagination,
                          ]}
                          keyboard={{ enabled: true }}
                          navigation={true}
                          loop={true}
                          pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                              const mediaItem = mediaItems[index];
                              if (!mediaItem || typeof mediaItem !== "string")
                                return null;
                              const videoFormats =
                                /\.(mp4|mov|avi|wmv|flv|webm|ogv|mkv)$/i;
                              const isVideo = videoFormats.test(mediaItem);
                              return `
                                <button class="${className} flex items-center justify-center w-8 h-8 rounded-full bg-transparent">
                                  ${isVideo
                                  ? '<svg style="margin-top: 4px;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 10.5L10 8V16L14 13.5V10.5Z" fill="currentColor"/></svg>'
                                  : '<svg style="margin-top: 10px;" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M8 3a5 5 0 100 10A5 5 0 008 3z"></path></g></svg>'
                                }
                                </button>
                              `;
                            },
                          }}
                        >
                          {/* {
                            !(isImageload === false && !(pdThumbImg?.length !== 0 || pdVideoArr?.length !== 0))  ?
                            ([...pdThumbImg,...pdVideoArr]?.map((ele,i)=>(
                              <SwiperSlide key={i}>
                              {ele?.split(".")[1] !== "mp4" ? (
                              <img
                                // src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                src={ele ?? imageNotFound}
                                onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                                alt={""}
                                onLoad={() => setIsImageLoad(false)}
                                className="smr_prod_img"
                              />
                              ) : (
                              <div
                                className="smr_app_prod_video"
                              >
                                <video
                                   ref={videoRef}
                                   src={ele ?? imageNotFound}
                                   loop={true}
                                   autoPlay={true} 
                                   style={{
                                     width: "100%",
                                     objectFit: "cover",
                                     height: "90%",
                                     borderRadius: "8px",
                                   }}
                                   muted={true}
                                   playsInline={true}
                                />
                              </div>
                            )}
                              </SwiperSlide>
                            )))
                            :
                            (
                              <img
                                src={imageNotFound}
                                // onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                                // alt={""}
                                onLoad={() => setIsImageLoad(false)}
                                className="smr_prod_img"
                              />                        
                            )
                          } */}
                          {!(
                            isImageload === false &&
                            !(pdThumbImg?.length || pdVideoArr?.length)
                          ) &&
                            [...pdThumbImg, ...filteredVideos]?.map((ele, i) => {
                              // Check if the element is a valid string and then check the format
                              // if (typeof ele !== 'string') return null;

                              const videoFormats =
                                /\.(mp4|mov|avi|wmv|flv|webm|ogv|mkv)$/i;
                              const isVideo = videoFormats.test(ele);

                              return (
                                <SwiperSlide key={i}>
                                  {isVideo ? (
                                    <div className="smr_app_prod_video">
                                      <video
                                        ref={videoRef} // Ensure this ref is initialized
                                        src={ele ?? imageNotFound}
                                        loop={true}
                                        autoPlay={true}
                                        style={{
                                          width: "100%",
                                          objectFit: "cover",
                                          height: "90%",
                                          borderRadius: "8px",
                                        }}
                                        muted={true}
                                        playsInline={true}
                                        onLoadedData={() =>
                                          setIsImageLoad(false)
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <img
                                      src={ele ?? imageNotFound}
                                      onError={() =>
                                        setSelectedThumbImg({
                                          link: imageNotFound,
                                          type: "img",
                                        })
                                      }
                                      loading="lazy"
                                      alt=""
                                      onLoad={() => setIsImageLoad(false)}
                                      className="smr_prod_img"
                                    />
                                  )}
                                </SwiperSlide>
                              );
                            })}
                        </Swiper>

                        {/* {selectedThumbImg?.type == "img" ? (
                          <img
                            // src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                            src={selectedThumbImg?.link}
                            onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                            alt={""}
                            onLoad={() => setIsImageLoad(false)}
                            className="smr_prod_img"
                          />
                        ) : (
                          <div
                            className="smr_app_prod_video"
                          >
                            <video
                              src={pdVideoArr?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                              loop={true}
                              autoPlay={true}
                              style={{
                                width: "100%",
                                objectFit: "cover",
                                // marginTop: "40px",
                                height: "90%",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                        )} */}

                        {/* <div className="smr_app_thumb_prod_img">
                          {pdThumbImg?.length > 1 && pdThumbImg?.map((ele) => (
                            <img
                              src={""}
                              alt={""}
                              onLoad={() => setIsImageLoad(false)}
                              className="smr_app_prod_thumb_img"
                              onClick={() =>
                                setSelectedThumbImg({ link: ele, type: "img" })
                              }
                            />
                          ))}
                          {pdVideoArr?.map((data) => (
                            <div
                              style={{
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              className="smr_app_prod_thumb_img"
                              onClick={() =>
                                setSelectedThumbImg({ link: data, type: "vid" })
                              }
                            >
                          
                            </div>
                          ))}
                    </div> */}
                      </div>
                    </div>
                    <div className="smr_prod_shortInfo">
                      <div className="smrMA_prod_shortInfo_inner">
                        <p className="smr_prod_titleLine_app">
                          {formatTitleLine(singleProd?.TitleLine) && singleProd?.TitleLine}
                        </p>
                        <div className="smr_prod_summury_info">
                          <div className="smr_prod_summury_info_inner">
                            <span className="smr_single_prod_designno">
                              {singleProd?.designno}
                            </span>
                            {singleProd?.MetalTypePurity !== "" &&
                              selectMtType ? (
                              <span className="smr_prod_short_key">
                                Metal Purity :{" "}
                                <span className="smr_prod_short_val">
                                  {singleProd?.IsMrpBase === 1
                                    ? singleProd?.MetalTypePurity
                                    : selectMtType}
                                </span>
                              </span>
                            ) : null}
                            <span className="smr_prod_short_key">
                              Metal Color :{" "}
                              <span className="smr_prod_short_val">
                                {
                                  JSON.parse(
                                    sessionStorage.getItem("MetalColorCombo")
                                  )?.filter(
                                    (ele) => ele?.colorcode == selectMtColor
                                  )[0]?.metalcolorname
                                }
                              </span>
                            </span>
                            {diaList?.length > 0 &&
                              singleProd?.DiaQuaCol !== "" &&
                              selectDiaQc ? (
                              <span className="smr_prod_short_key">
                                Diamond Quality & Color:{" "}
                                <span className="smr_prod_short_val">
                                  {singleProd?.IsMrpBase === 1
                                    ? singleProd?.DiaQuaCol
                                    : `${selectDiaQc}`}
                                </span>
                              </span>
                            ) : null}
                            {storeInit?.IsMetalWeight == 1 ? (
                              <span className="smr_prod_short_key">
                                Net Wt:{" "}
                                <span className="smr_prod_short_val">
                                  {(
                                    singleProd1?.Nwt ?? singleProd?.Nwt
                                  )?.toFixed(3)}
                                </span>
                              </span>
                            ) : null}
                          </div>
                        </div>
                        {storeInit?.IsProductWebCustomization == 1 && (
                          <div className="smr_single_prod_customize">
                            <div className="smr_single_prod_customize_metal">
                              <label className="menuItemTimeEleveDeatil">
                                METAL TYPE:
                              </label>
                              {singleProd?.IsMrpBase == 1 ? (
                                <span className="menuitemSelectoreMain">
                                  {/* {
                                      metalTypeCombo?.filter(
                                        (ele) =>
                                          ele?.Metalid ==
                                          singleProd?.MetalPurityid
                                      )[0]?.metaltype
                                    } */}
                                  {
                                    metalTypeCombo?.filter(
                                      (ele) =>
                                        ele?.Metalid ==
                                        singleProd?.MetalPurityid
                                    )[0]?.metaltype
                                  }
                                </span>
                              ) : (
                                <select
                                  className="menuitemSelectoreMain"
                                  value={selectMtType}
                                  // onChange={(e) => setSelectMtType(e.target.value)}
                                  onChange={(e) => handleCustomChange(e, "mt")}
                                >
                                  {metalTypeCombo.map((ele) => (
                                    <option
                                      key={ele?.Metalid}
                                      value={ele?.metaltype}
                                    >
                                      {ele?.metaltype}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                            <div className="smr_single_prod_customize_outer">
                              <label className="menuItemTimeEleveDeatil">
                                METAL COLOR:
                              </label>
                              {singleProd?.IsMrpBase == 1 ? (
                                <span className="menuitemSelectoreMain">
                                  {
                                    metalColorCombo?.filter(
                                      (ele) =>
                                        ele?.id == singleProd?.MetalColorid
                                    )[0]?.metalcolorname
                                  }
                                </span>
                              ) : (
                                <select
                                  className="menuitemSelectoreMain"
                                  value={selectMtColor}
                                  onChange={(e) => handleMetalWiseColorImg(e)}
                                >
                                  {metalColorCombo?.map((ele) => {
                                    return <option
                                      key={ele?.id}
                                      value={ele?.colorcode}
                                    >
                                      {ele?.metalcolorname}
                                    </option>
                                  })}
                                </select>
                              )}
                            </div>
                            {storeInit?.IsDiamondCustomization === 1 &&
                              diaList?.length > 0 && (
                                <div className="smr_single_prod_customize_outer">
                                  <label className="menuItemTimeEleveDeatil">
                                    DAIMOND :
                                  </label>
                                  {singleProd?.IsMrpBase == 1 ? (
                                    <span className="menuitemSelectoreMain">
                                      {singleProd?.DiaQuaCol}
                                    </span>
                                  ) : (
                                    <select
                                      className="menuitemSelectoreMain"
                                      value={selectDiaQc}
                                      // onChange={(e) => setSelectDiaQc(e.target.value)}
                                      onChange={(e) =>
                                        handleCustomChange(e, "dia")
                                      }
                                    >
                                      {diaQcCombo.map((ele) => (
                                        <option
                                          key={ele?.QualityId}
                                          value={`${ele?.Quality},${ele?.color}`}
                                        >{`${ele?.Quality},${ele?.color}`}</option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              )}
                            {storeInit?.IsCsCustomization === 1 &&
                              csList?.length > 0 && (
                                <div className="smr_single_prod_customize_outer">
                                  <label className="menuItemTimeEleveDeatil">
                                    COLOR STONE :
                                  </label>
                                  {singleProd?.IsMrpBase == 1 ? (
                                    <span className="menuitemSelectoreMain">
                                      {singleProd?.CsQuaCol}
                                    </span>
                                  ) : (
                                    <select
                                      className="menuitemSelectoreMain"
                                      value={selectCsQc}
                                      // onChange={(e) => setSelectCsQc(e.target.value)}
                                      onChange={(e) =>
                                        handleCustomChange(e, "cs")
                                      }
                                    >
                                      {csQcCombo.map((ele) => (
                                        <option
                                          key={ele?.QualityId}
                                          value={`${ele?.Quality},${ele?.color}`}
                                        >{`${ele?.Quality},${ele?.color}`}</option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              )}
                            {/* {console.log("sizeData",SizeCombo?.find((size) => size.IsDefaultSize === 1)?.sizename)} */}
                            {SizeSorting(SizeCombo?.rd)?.length > 0 && (
                              <div className="smr_single_prod_customize_outer">
                                <label className="menuItemTimeEleveDeatil">
                                  SIZE:
                                </label>
                                {singleProd?.IsMrpBase == 1 ? (
                                  <span className="menuitemSelectoreMain">
                                    {singleProd?.DefaultSize}
                                  </span>
                                ) : (
                                  <select
                                    className="menuitemSelectoreMain"
                                    value={sizeData}
                                    onChange={(e) => {
                                      handleCustomChange(e, "sz");
                                      // setSizeData(e.target.value);
                                    }}
                                  >
                                    {SizeCombo?.rd?.map((ele) => (
                                      <option
                                        value={ele?.sizename}
                                        // selected={
                                        //   singleProd && singleProd.DefaultSize === ele.sizename
                                        // }
                                        key={ele?.id}
                                      >
                                        {ele?.sizename}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {
                          storeInit?.IsPriceShow == 1 &&
                          storeInit?.IsPriceBreakUp == 1 &&
                          singleProd1?.IsMrpBase !== 1 &&
                          singleProd?.IsMrpBase !== 1 && (
                            <Accordion
                              elevation={0}
                              sx={{
                                borderBottom: "1px solid #c7c8c9",
                                borderRadius: 0,
                                "&.MuiPaper-root.MuiAccordion-root:last-of-type":
                                {
                                  borderBottomLeftRadius: "0px",
                                  borderBottomRightRadius: "0px",
                                },
                                "&.MuiPaper-root.MuiAccordion-root:before": {
                                  background: "none",
                                },
                                width: "95.5%",
                              }}
                            >
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon sx={{ width: "20px" }} />
                                }
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{
                                  color: "#7d7f85 !important",
                                  borderRadius: 0,

                                  "&.MuiAccordionSummary-root": {
                                    padding: 0,
                                  },
                                }}
                              // className="filtercategoryLable"
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "TT Commons Regular",
                                    fontSize: "18px",
                                  }}
                                >
                                  Price Breakup
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "4px",
                                  // minHeight: "fit-content",
                                  // maxHeight: "300px",
                                  // overflow: "auto",
                                  padding: "0 0 16px 0",
                                }}
                              >
                                {/* <table>
                                <tr>
                                  <td><Typography>{(singleProd?.Metal_Cost).toFixed(3)}</Typography></td>
                                  <td><Typography>Metal Amount</Typography></td>
                                </tr>
                                <tr>
                                  <td><Typography>{(singleProd?.Diamond_Cost).toFixed(3)}</Typography></td>
                                  <td><Typography>Diamond Amount</Typography></td>
                                </tr>
                                <tr>
                                  <td><Typography>{(singleProd?.ColorStone_Cost).toFixed(3)}</Typography></td>
                                  <td><Typography>Stone Amount</Typography></td>
                                </tr>
                              </table> */}

                                {/* {(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography className="smr_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Metal</Typography>
                                  <span style={{ display: 'flex' }}>
                                    <Typography>
                                      {
                                        <span className="smr_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
                                          {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }
                                    </Typography>
                                    &nbsp;
                                    <Typography sx={{ fontFamily: "TT Commons Regular" }} className="smr_PriceBreakup_Price">{formatter.format((singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost)?.toFixed(2))}</Typography>
                                  </span>
                                </div> : null}

                                {(singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography className="smr_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Diamond </Typography>

                                  <span style={{ display: 'flex' }}>
                                    <Typography>{
                                      <span className="smr_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
                                        {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                      </span>
                                    }</Typography>
                                    &nbsp;
                                    <Typography className="smr_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{formatter.format((singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost)?.toFixed(2))}</Typography>
                                  </span>
                                </div> : null}

                                {(singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography className="smr_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Stone </Typography>

                                  <span style={{ display: 'flex' }}>
                                    <Typography>{
                                      <span className="smr_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
                                        {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                      </span>
                                    }</Typography>
                                    &nbsp;
                                    <Typography className="smr_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{formatter.format((singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost)?.toFixed(2))}</Typography>
                                  </span>
                                </div> : null}

                                {(singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography className="smr_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>MISC </Typography>

                                  <span style={{ display: 'flex' }}>
                                    <Typography>{
                                      <span className="smr_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
                                        {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                      </span>
                                    }</Typography>
                                    &nbsp;
                                    <Typography className="smr_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{formatter.format((singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost)?.toFixed(2))}</Typography>
                                  </span>
                                </div> : null}

                                {formatter.format((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2)) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography className="smr_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Labour </Typography>

                                  <span style={{ display: 'flex' }}>
                                    <Typography>{
                                      <span className="smr_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
                                        {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                      </span>
                                    }</Typography>
                                    &nbsp;
                                    <Typography className="smr_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{formatter.format((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2))}</Typography>
                                  </span>
                                </div> : null} */}
                                {(singleProd1?.Metal_Cost ??
                                  singleProd?.Metal_Cost) !== 0 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      className="smr_Price_breakup_label"
                                      sx={{ fontFamily: "TT Commons Regular" }}
                                    >
                                      Metal
                                    </Typography>
                                    <span style={{ display: "flex" }}>
                                      <Typography>
                                        <span
                                          className="smr_currencyFont"
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                        >
                                          {loginInfo?.CurrencyCode ??
                                            storeInit?.CurrencyCode}
                                        </span>
                                      </Typography>
                                      &nbsp;
                                      <Typography
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                        className="smr_PriceBreakup_Price"
                                      >
                                        {formatter.format(
                                          (
                                            singleProd1?.Metal_Cost ??
                                            singleProd?.Metal_Cost
                                          )?.toFixed(2)
                                        )}
                                      </Typography>
                                    </span>
                                  </div>
                                ) : null}

                                {(singleProd1?.Diamond_Cost ??
                                  singleProd?.Diamond_Cost) !== 0 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      className="smr_Price_breakup_label"
                                      sx={{ fontFamily: "TT Commons Regular" }}
                                    >
                                      Diamond
                                    </Typography>
                                    <span style={{ display: "flex" }}>
                                      <Typography>
                                        <span
                                          className="smr_currencyFont"
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                        >
                                          {loginInfo?.CurrencyCode ??
                                            storeInit?.CurrencyCode}
                                        </span>
                                      </Typography>
                                      &nbsp;
                                      <Typography
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                        className="smr_PriceBreakup_Price"
                                      >
                                        {formatter.format(
                                          (
                                            singleProd1?.Diamond_Cost ??
                                            singleProd?.Diamond_Cost
                                          )?.toFixed(2)
                                        )}
                                      </Typography>
                                    </span>
                                  </div>
                                ) : null}

                                {(singleProd1?.ColorStone_Cost ??
                                  singleProd?.ColorStone_Cost) !== 0 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      className="smr_Price_breakup_label"
                                      sx={{ fontFamily: "TT Commons Regular" }}
                                    >
                                      Stone
                                    </Typography>
                                    <span style={{ display: "flex" }}>
                                      <Typography>
                                        <span
                                          className="smr_currencyFont"
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                        >
                                          {loginInfo?.CurrencyCode ??
                                            storeInit?.CurrencyCode}
                                        </span>
                                      </Typography>
                                      &nbsp;
                                      <Typography
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                        className="smr_PriceBreakup_Price"
                                      >
                                        {formatter.format(
                                          (
                                            singleProd1?.ColorStone_Cost ??
                                            singleProd?.ColorStone_Cost
                                          )?.toFixed(2)
                                        )}
                                      </Typography>
                                    </span>
                                  </div>
                                ) : null}

                                {(singleProd1?.Misc_Cost ??
                                  singleProd?.Misc_Cost) !== 0 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      className="smr_Price_breakup_label"
                                      sx={{ fontFamily: "TT Commons Regular" }}
                                    >
                                      MISC
                                    </Typography>
                                    <span style={{ display: "flex" }}>
                                      <Typography>
                                        <span
                                          className="smr_currencyFont"
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                        >
                                          {loginInfo?.CurrencyCode ??
                                            storeInit?.CurrencyCode}
                                        </span>
                                      </Typography>
                                      &nbsp;
                                      <Typography
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                        className="smr_PriceBreakup_Price"
                                      >
                                        {formatter.format(
                                          (
                                            singleProd1?.Misc_Cost ??
                                            singleProd?.Misc_Cost
                                          )?.toFixed(2)
                                        )}
                                      </Typography>
                                    </span>
                                  </div>
                                ) : null}

                                {(singleProd1?.Labour_Cost ??
                                  singleProd?.Labour_Cost) !== 0 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      className="smr_Price_breakup_label"
                                      sx={{ fontFamily: "TT Commons Regular" }}
                                    >
                                      Labour
                                    </Typography>
                                    <span style={{ display: "flex" }}>
                                      <Typography>
                                        <span
                                          className="smr_currencyFont"
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                        >
                                          {loginInfo?.CurrencyCode ??
                                            storeInit?.CurrencyCode}
                                        </span>
                                      </Typography>
                                      &nbsp;
                                      <Typography
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                        className="smr_PriceBreakup_Price"
                                      >
                                        {formatter.format(
                                          (
                                            singleProd1?.Labour_Cost ??
                                            singleProd?.Labour_Cost
                                          )?.toFixed(2)
                                        )}
                                      </Typography>
                                    </span>
                                  </div>
                                ) : null}

                                {(singleProd1?.Other_Cost
                                  ? singleProd1?.Other_Cost
                                  : singleProd?.Other_Cost) +
                                  (singleProd1?.Size_MarkUp
                                    ? singleProd1?.Size_MarkUp
                                    : singleProd?.Size_MarkUp) +
                                  (singleProd1?.DesignMarkUpAmount
                                    ? singleProd1?.DesignMarkUpAmount
                                    : singleProd?.DesignMarkUpAmount) +
                                  (singleProd1?.ColorStone_SettingCost
                                    ? singleProd1?.ColorStone_SettingCost
                                    : singleProd?.ColorStone_SettingCost) +
                                  (singleProd1?.Diamond_SettingCost
                                    ? singleProd1?.Diamond_SettingCost
                                    : singleProd?.Diamond_SettingCost) +
                                  (singleProd1?.Misc_SettingCost
                                    ? singleProd1?.Misc_SettingCost
                                    : singleProd?.Misc_SettingCost) !==
                                  0 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      className="smr_Price_breakup_label"
                                      sx={{ fontFamily: "TT Commons Regular" }}
                                    >
                                      Other{" "}
                                    </Typography>

                                    <span style={{ display: "flex" }}>
                                      <Typography>
                                        {
                                          <span
                                            className="smr_currencyFont"
                                            sx={{
                                              fontFamily: "TT Commons Regular",
                                            }}
                                          >
                                            {loginInfo?.CurrencyCode ??
                                              storeInit?.CurrencyCode}
                                          </span>
                                        }
                                      </Typography>
                                      &nbsp;
                                      <Typography
                                        className="smr_PriceBreakup_Price"
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                      >
                                        {formatter.format(
                                          (
                                            (singleProd1?.Other_Cost
                                              ? singleProd1?.Other_Cost
                                              : singleProd?.Other_Cost) +
                                            (singleProd1?.Size_MarkUp
                                              ? singleProd1?.Size_MarkUp
                                              : singleProd?.Size_MarkUp) +
                                            (singleProd1?.DesignMarkUpAmount
                                              ? singleProd1?.DesignMarkUpAmount
                                              : singleProd?.DesignMarkUpAmount) +
                                            (singleProd1?.ColorStone_SettingCost
                                              ? singleProd1?.ColorStone_SettingCost
                                              : singleProd?.ColorStone_SettingCost) +
                                            (singleProd1?.Diamond_SettingCost
                                              ? singleProd1?.Diamond_SettingCost
                                              : singleProd?.Diamond_SettingCost) +
                                            (singleProd1?.Misc_SettingCost
                                              ? singleProd1?.Misc_SettingCost
                                              : singleProd?.Misc_SettingCost)
                                          )?.toFixed(2)
                                        )}
                                      </Typography>
                                    </span>
                                  </div>
                                ) : null}
                              </AccordionDetails>
                            </Accordion>
                          )}



                        {
                          storeInit?.IsPriceShow == 1 &&
                          <div className="smr_price_portion">
                            {isPriceloading ? (
                              ""
                            ) : (
                              <span className="smr_currencyFont">
                                {loginInfo?.CurrencyCode ??
                                  storeInit?.CurrencyCode}
                              </span>
                            )}
                            &nbsp;
                            {/* {PriceWithMarkupFunction(
                        mtrd?.AB,
                        finalprice,
                        storeInit?.CurrencyRate
                      )?.toFixed(2)} */}
                            {isPriceloading ? (
                              <Skeleton
                                variant="rounded"
                                width={140}
                                height={30}
                              />
                            ) : (
                              formatter.format(
                                singleProd1?.UnitCostWithMarkUp ??
                                singleProd?.UnitCostWithMarkUp
                              )
                            )}
                          </div>
                        }

                        {!isPriceloading && (
                          <div>
                            <div className="Smr_CartAndWish_portion">
                              <button
                                className="smrMA_AddToCart_btn"
                                onClick={() => handleCart(!addToCartFlag)}
                              >
                                <span className="smrMA_addtocart_btn_txt">
                                  {!addToCartFlag
                                    ? "ADD TO CART"
                                    : "REMOVE FROM CART"}
                                </span>
                              </button>
                              <div className="Smr_wishlistcont">
                                <Checkbox
                                  icon={
                                    <FavoriteBorderIcon
                                      sx={{
                                        fontSize: "25px",
                                        color: "#7d7f85",
                                      }}
                                    />
                                  }
                                  checkedIcon={
                                    <FavoriteIcon
                                      sx={{
                                        fontSize: "25px",
                                        color: "#7d7f85",
                                      }}
                                    />
                                  }
                                  disableRipple={true}
                                  checked={wishListFlag ?? singleProd?.IsInWish}
                                  onChange={(e) => handleWishList(e)}
                                />
                              </div>
                            </div>
                            {singleProd?.InStockDays !== 0 && (
                              <p
                                style={{
                                  margin: "20px 0px 0px 0px",
                                  fontWeight: 500,
                                  fontSize: "18px",
                                  fontFamily: "TT Commons Regular",
                                  color: "#7d7f85",
                                }}
                              >
                                Express Shipping in Stock{" "}
                                {singleProd?.InStockDays} Days Delivery
                              </p>
                            )}
                            {singleProd?.MakeOrderDays != 0 && (
                              <p
                                style={{
                                  margin: "0px",
                                  fontWeight: 500,
                                  fontSize: "18px",
                                  fontFamily: "TT Commons Regular",
                                  color: "#7d7f85",
                                }}
                              >
                                Make To Order {singleProd?.MakeOrderDays} Days
                                Delivery
                              </p>
                            )}
                          </div>
                        )}
                        <Accordion
                          elevation={0}
                          sx={{
                            borderBottom: "1px solid #c7c8c9",
                            borderRadius: 0,
                            "&.MuiPaper-root.MuiAccordion-root:last-of-type":
                            {
                              borderBottomLeftRadius: "0px",
                              borderBottomRightRadius: "0px",
                            },
                            "&.MuiPaper-root.MuiAccordion-root:before": {
                              background: "none",
                            },
                            width: "95.5%",
                            marginTop: '1rem'
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ width: "20px" }} />
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                              color: "#7d7f85 !important",
                              borderRadius: 0,

                              "&.MuiAccordionSummary-root": {
                                padding: 0,
                              },
                            }}
                          // className="filtercategoryLable"
                          >
                            <Typography
                              sx={{
                                fontFamily: "TT Commons Regular",
                                fontSize: "18px",
                              }}
                            >
                              Product Details
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              // minHeight: "fit-content",
                              // maxHeight: "300px",
                              // overflow: "auto",
                              padding: "0 0 16px 0",
                            }}
                          >
                            <div className="smrMA_material_details_portion">

                              <div style={{ width: "100%" }}>
                                {diaList?.length > 0 && (
                                  <div
                                    className="smr_material_details_portion_inner"
                                    style={{ marginLeft: "0px" }}
                                  >
                                    <ul style={{ margin: "0px 0px 3px 0px" }}>
                                      <li className="prod_detail_info_title">{`Diamond Detail(${diaList?.reduce(
                                        (accumulator, data) => accumulator + data.M,
                                        0
                                      )}/${diaList
                                        ?.reduce(
                                          (accumulator, data) => accumulator + data?.N,
                                          0
                                        )
                                        .toFixed(3)}ct)`}</li>
                                    </ul>
                                    <ul className="smr_mt_detail_title_ul">
                                      <li className="smr_proDeatilList_mobileapp">Shape</li>
                                      <li className="smr_proDeatilList_mobileapp">
                                        Clarity
                                      </li>
                                      <li className="smr_proDeatilList_mobileapp">Color</li>
                                      <li className="smr_proDeatilList_mobileapp">
                                        Pcs&nbsp;/&nbsp;Wt
                                      </li>
                                    </ul>
                                    {diaList?.map((data) => (
                                      <ul className="smr_mt_detail_title_ul">
                                        <li className="smr_proDeatilList_mobileapp1">
                                          {data?.F}
                                        </li>
                                        <li className="smr_proDeatilList_mobileapp1">
                                          {data?.H}
                                        </li>
                                        <li className="smr_proDeatilList_mobileapp1">
                                          {data?.J}
                                        </li>
                                        <li className="smr_proDeatilList_mobileapp1">
                                          {data.M}&nbsp;/&nbsp;{data?.N?.toFixed(3)}
                                        </li>
                                      </ul>
                                    ))}
                                  </div>
                                )}

                                {csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 && (
                                  <div
                                    className="smr_material_details_portion_inner"
                                    style={{ marginLeft: "0px" }}
                                  >
                                    <ul style={{ margin: "0px 0px 3px 0px" }}>
                                      <li className="prod_detail_info_title">{`ColorStone Detail(${csList
                                        ?.filter((ele) => ele?.D !== "MISC")
                                        ?.reduce(
                                          (accumulator, data) => accumulator + data.M,
                                          0
                                        )}/${csList
                                          ?.filter((ele) => ele?.D !== "MISC")
                                          ?.reduce(
                                            (accumulator, data) => accumulator + data?.N,
                                            0
                                          )
                                          .toFixed(3)}ct)`}</li>
                                    </ul>
                                    <ul className="smr_mt_detail_title_ul">
                                      <li className="smr_proDeatilList_mobileapp">Shape</li>
                                      <li className="smr_proDeatilList_mobileapp">
                                        Clarity
                                      </li>
                                      <li className="smr_proDeatilList_mobileapp">Color</li>
                                      <li className="smr_proDeatilList_mobileapp">
                                        Pcs&nbsp;/&nbsp;Wt
                                      </li>
                                    </ul>
                                    {csList
                                      ?.filter((ele) => ele?.D !== "MISC")
                                      ?.map((data) => (
                                        <ul className="smr_mt_detail_title_ul">
                                          <li className="smr_proDeatilList_mobileapp1">
                                            {data?.F}
                                          </li>
                                          <li className="smr_proDeatilList_mobileapp1">
                                            {data?.H}
                                          </li>
                                          <li className="smr_proDeatilList_mobileapp1">
                                            {data?.J}
                                          </li>
                                          <li className="smr_proDeatilList_mobileapp1">
                                            {data.M}&nbsp;/&nbsp;{data?.N?.toFixed(3)}
                                          </li>
                                        </ul>
                                      ))}
                                  </div>
                                )}

                                {csList?.filter((ele) => ele?.D === "MISC")?.length > 0 && (
                                  <div
                                    className="smr_material_details_portion_inner"
                                    style={{ marginLeft: "0px" }}
                                  >
                                    <ul style={{ margin: "0px 0px 3px 0px" }}>
                                      <li className="prod_detail_info_title">{`MISC Detail(${csList
                                        ?.filter((ele) => ele?.D === "MISC")
                                        ?.reduce(
                                          (accumulator, data) => accumulator + data.M,
                                          0
                                        )}/${csList
                                          ?.filter((ele) => ele?.D === "MISC")
                                          ?.reduce(
                                            (accumulator, data) => accumulator + data?.N,
                                            0
                                          )
                                          .toFixed(3)}ct)`}</li>
                                    </ul>
                                    <ul className="smr_mt_detail_title_ul">
                                      <li className="smr_proDeatilList_mobileapp">Shape</li>
                                      <li className="smr_proDeatilList_mobileapp">
                                        Clarity
                                      </li>
                                      <li className="smr_proDeatilList_mobileapp">Color</li>
                                      <li className="smr_proDeatilList_mobileapp">
                                        Pcs&nbsp;/&nbsp;Wt
                                      </li>
                                    </ul>
                                    {csList
                                      ?.filter((ele) => ele?.D === "MISC")
                                      ?.map((data) => (
                                        <ul className="smr_mt_detail_title_ul">
                                          <li className="smr_proDeatilList_mobileapp1">
                                            {data?.F}
                                          </li>
                                          <li className="smr_proDeatilList_mobileapp1">
                                            {data?.H}
                                          </li>
                                          <li className="smr_proDeatilList_mobileapp1">
                                            {data?.J}
                                          </li>
                                          <li className="smr_proDeatilList_mobileapp1">
                                            {data.M}&nbsp;/&nbsp;{data?.N?.toFixed(3)}
                                          </li>
                                        </ul>
                                      ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="smrMA_material_details_portion">
                  {(diaList?.length > 0 ||
                    csList?.filter((ele) => ele?.D === "MISC")?.length > 0 ||
                    csList?.filter((ele) => ele?.D !== "MISC")?.length > 0) && (
                    <p className="smr_app_details_title"> Product Details</p>
                  )}
                  <div style={{ width: "100%", border: "1px solid #80808038" }}>
                    {diaList?.length > 0 && (
                      <div
                        className="smr_material_details_portion_inner"
                        style={{ marginLeft: "0px" }}
                      >
                        <ul style={{ margin: "0px 0px 3px 0px" }}>
                          <li className="prod_detail_info_title">{`Diamond Detail(${diaList?.reduce(
                            (accumulator, data) => accumulator + data.M,
                            0
                          )}/${diaList
                            ?.reduce(
                              (accumulator, data) => accumulator + data?.N,
                              0
                            )
                            .toFixed(3)}ct)`}</li>
                        </ul>
                        <ul className="smr_mt_detail_title_ul">
                          <li className="smr_proDeatilList_mobileapp">Shape</li>
                          <li className="smr_proDeatilList_mobileapp">
                            Clarity
                          </li>
                          <li className="smr_proDeatilList_mobileapp">Color</li>
                          <li className="smr_proDeatilList_mobileapp">
                            Pcs&nbsp;/&nbsp;Wt
                          </li>
                        </ul>
                        {diaList?.map((data) => (
                          <ul className="smr_mt_detail_title_ul">
                            <li className="smr_proDeatilList_mobileapp1">
                              {data?.F}
                            </li>
                            <li className="smr_proDeatilList_mobileapp1">
                              {data?.H}
                            </li>
                            <li className="smr_proDeatilList_mobileapp1">
                              {data?.J}
                            </li>
                            <li className="smr_proDeatilList_mobileapp1">
                              {data.M}&nbsp;/&nbsp;{data?.N?.toFixed(3)}
                            </li>
                          </ul>
                        ))}
                      </div>
                    )}

                    {csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 && (
                      <div
                        className="smr_material_details_portion_inner"
                        style={{ marginLeft: "0px" }}
                      >
                        <ul style={{ margin: "0px 0px 3px 0px" }}>
                          <li className="prod_detail_info_title">{`ColorStone Detail(${csList
                            ?.filter((ele) => ele?.D !== "MISC")
                            ?.reduce(
                              (accumulator, data) => accumulator + data.M,
                              0
                            )}/${csList
                            ?.filter((ele) => ele?.D !== "MISC")
                            ?.reduce(
                              (accumulator, data) => accumulator + data?.N,
                              0
                            )
                            .toFixed(3)}ct)`}</li>
                        </ul>
                        <ul className="smr_mt_detail_title_ul">
                          <li className="smr_proDeatilList_mobileapp">Shape</li>
                          <li className="smr_proDeatilList_mobileapp">
                            Clarity
                          </li>
                          <li className="smr_proDeatilList_mobileapp">Color</li>
                          <li className="smr_proDeatilList_mobileapp">
                            Pcs&nbsp;/&nbsp;Wt
                          </li>
                        </ul>
                        {csList
                          ?.filter((ele) => ele?.D !== "MISC")
                          ?.map((data) => (
                            <ul className="smr_mt_detail_title_ul">
                              <li className="smr_proDeatilList_mobileapp1">
                                {data?.F}
                              </li>
                              <li className="smr_proDeatilList_mobileapp1">
                                {data?.H}
                              </li>
                              <li className="smr_proDeatilList_mobileapp1">
                                {data?.J}
                              </li>
                              <li className="smr_proDeatilList_mobileapp1">
                                {data.M}&nbsp;/&nbsp;{data?.N?.toFixed(3)}
                              </li>
                            </ul>
                          ))}
                      </div>
                    )}

                    {csList?.filter((ele) => ele?.D === "MISC")?.length > 0 && (
                      <div
                        className="smr_material_details_portion_inner"
                        style={{ marginLeft: "0px" }}
                      >
                        <ul style={{ margin: "0px 0px 3px 0px" }}>
                          <li className="prod_detail_info_title">{`MISC Detail(${csList
                            ?.filter((ele) => ele?.D === "MISC")
                            ?.reduce(
                              (accumulator, data) => accumulator + data.M,
                              0
                            )}/${csList
                            ?.filter((ele) => ele?.D === "MISC")
                            ?.reduce(
                              (accumulator, data) => accumulator + data?.N,
                              0
                            )
                            .toFixed(3)}ct)`}</li>
                        </ul>
                        <ul className="smr_mt_detail_title_ul">
                          <li className="smr_proDeatilList_mobileapp">Shape</li>
                          <li className="smr_proDeatilList_mobileapp">
                            Clarity
                          </li>
                          <li className="smr_proDeatilList_mobileapp">Color</li>
                          <li className="smr_proDeatilList_mobileapp">
                            Pcs&nbsp;/&nbsp;Wt
                          </li>
                        </ul>
                        {csList
                          ?.filter((ele) => ele?.D === "MISC")
                          ?.map((data) => (
                            <ul className="smr_mt_detail_title_ul">
                              <li className="smr_proDeatilList_mobileapp1">
                                {data?.F}
                              </li>
                              <li className="smr_proDeatilList_mobileapp1">
                                {data?.H}
                              </li>
                              <li className="smr_proDeatilList_mobileapp1">
                                {data?.J}
                              </li>
                              <li className="smr_proDeatilList_mobileapp1">
                                {data.M}&nbsp;/&nbsp;{data?.N?.toFixed(3)}
                              </li>
                            </ul>
                          ))}
                      </div>
                    )}
                  </div>
                </div> */}

                {stockItemArr?.length > 0 && (
                  <div className="dt_stockItem_div">
                    <p className="smr_details_title"> Stock Items </p>
                    <div className="smr_stockitem_container">
                      <div className="smr_stock_item_card">
                        {stockItemArr?.map((ele) => (
                          <div className="smr_stockItemCard">
                            <div className="cart_and_wishlist_icon_ss_app">
                              <Checkbox
                                icon={
                                  <LocalMallOutlinedIcon
                                    sx={{
                                      fontSize: "22px",
                                      color: "#7d7f85",
                                      opacity: ".7",
                                    }}
                                  />
                                }
                                checkedIcon={
                                  <LocalMallIcon
                                    sx={{
                                      fontSize: "22px",
                                      color: "#009500",
                                    }}
                                  />
                                }
                                disableRipple={false}
                                sx={{ padding: "10px" }}
                                onChange={(e) =>
                                  handleCartandWish(e, ele, "Cart")
                                }
                                checked={
                                  cartArr[ele?.StockId] ?? ele?.IsInCart === 1
                                    ? true
                                    : false
                                }
                              />
                            </div>
                            {/* <img
                        className="smrMA_productCard_Image"
                        src={
                          storeInit?.DesignImageFol +
                          ele?.designno +
                          "_" +
                          "1" +
                          "." +
                          ele?.ImageExtension
                        }
                        alt={""}
                      /> */}
                            <div
                              className="smr_stockutem_shortinfo"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                                paddingBottom: "5px",
                                marginTop: "40px",
                              }}
                            >
                              <span className="dt_prod_designno">
                                {ele?.designno}
                                {ele?.StockBarcode &&
                                  `- (${ele?.StockBarcode})`}
                              </span>
                              <div className="smr_prod_Allwt">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    letterSpacing: "1px",
                                    gap: "3px",
                                  }}
                                >
                                  {storeInit?.IsMetalWeight == 1 && (
                                    <span className="smr_prod_wt">
                                      <span className="dt_keys">NWT:</span>
                                      <span className="dt_val">
                                        {ele?.NetWt}
                                      </span>
                                    </span>
                                  )}

                                  {storeInit?.IsGrossWeight == 1 &&
                                    Number(ele?.GrossWt) !== 0 && (
                                      <>
                                        <span className="smr_prod_wt">
                                          <span style={{ fontSize: "10px" }}>
                                            |
                                          </span>
                                          <span className="dt_keys">GWT:</span>
                                          <span className="dt_val">
                                            {ele?.GrossWt?.toFixed(3)}
                                          </span>
                                        </span>
                                      </>
                                    )}
                                  {storeInit?.IsDiamondWeight == 1 &&
                                    Number(ele?.DiaWt) !== 0 && (
                                      <>
                                        <span style={{ fontSize: "10px" }}>
                                          |
                                        </span>
                                        <span className="smr_prod_wt">
                                          <span className="dt_keys">DWT:</span>
                                          <span className="dt_val">
                                            {ele?.DiaWt?.toFixed(3)}
                                            {storeInit?.IsDiamondPcs === 1
                                              ? `/${ele?.DiaPcs}`
                                              : null}
                                          </span>
                                        </span>
                                      </>
                                    )}

                                  {storeInit?.IsStoneWeight == 1 &&
                                    Number(ele?.CsWt) !== 0 && (
                                      <>
                                        <span style={{ fontSize: "10px" }}>
                                          |
                                        </span>
                                        <span className="smr_prod_wt">
                                          <span className="dt_keys">CWT:</span>
                                          <span className="dt_val">
                                            {ele?.CsWt?.toFixed(3)}
                                            {storeInit?.IsStonePcs === 1
                                              ? `/${ele?.CsPcs}`
                                              : null}
                                          </span>
                                        </span>
                                      </>
                                    )}
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                                className="smr_stockItem_price_type_mt"
                              >
                                <span>
                                  {ele?.MetalColorName} - {ele?.metaltypename}
                                  {ele?.metalPurity}
                                  {storeInit?.IsPriceShow == 1 && <>
                                    /{" "}
                                    <span className="smr_currencyFont">
                                      {loginInfo?.CurrencyCode ??
                                        storeInit?.CurrencyCode}
                                    </span>
                                  </>}
                                </span>
                                {storeInit?.IsPriceShow == 1 && <span>
                                  &nbsp;{formatter.format(ele?.Amount)}
                                </span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {storeInit?.IsProductDetailSimilarDesign == 1 &&
                  SimilarBrandArr?.length > 0 && (
                    <div className="dt_stockItem_div">
                      <p className="smr_details_title"> Similar Designs</p>
                      <div className="smr_stockitem_container">
                        <div className="smr_stock_item_card">
                          {SimilarBrandArr?.map((ele) => (
                            <div
                              className="smr_stockItemCard"
                              onClick={() =>
                                setTimeout(() => handleMoveToDetail(ele), 500)
                              }
                            >
                              <img
                                style={{
                                  objectFit: "contain",
                                }}
                                className="smrMA_productCard_Image"
                                src={
                                  ele?.ImageCount > 0
                                    ?
                                    // storeInit?.CDNDesignImageFol +
                                    // ele?.designno +
                                    // "~" +
                                    // "1" +
                                    // "." +
                                    // ele?.ImageExtension
                                    storeInit?.CDNDesignImageFolThumb +
                                    ele?.designno +
                                    "~" +
                                    "1" +
                                    "." +
                                    "jpg"
                                    : imageNotFound
                                }
                                alt={""}
                                onError={(e) => {
                                  e.target.src = imageNotFound;
                                }}
                                loading="lazy"
                              />
                              <div
                                className="smr_stockutem_shortinfo"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                  paddingBottom: "5px",
                                }}
                              >
                                <span
                                  className="smr_prod_designno"
                                  style={{ fontSize: "14px" }}
                                >
                                  {ele?.designno}
                                </span>

                                {storeInit?.IsPriceShow == 1 && <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    fontSize: "16px",
                                  }}
                                  className="smr_stockItem_price_type_mt"
                                >
                                  <spam>
                                    <span className="smr_currencyFont">
                                      {loginInfo?.CurrencyCode ??
                                        storeInit?.CurrencyCode}
                                    </span>
                                  </spam>
                                  <span>
                                    &nbsp;{formatter.format(ele?.UnitCost)}
                                  </span>
                                </div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                {storeInit?.IsProductDetailDesignSet === 1 && (
                  <div className="mobile_smr_DesignSet_main">
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
                            fontFamily: "FreightDisp Pro Medium",
                            color: "#7d7f85",
                            fontSize: "30px",
                            // display:'none'
                          }}
                        >
                          Complete The Look
                        </p>
                      </div>
                    )}

                    <div className="smr_Swiper_designSet">
                      <Swiper
                        modules={[Navigation, Pagination, Scrollbar]}
                        // spaceBetween={50}
                        // slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                      // scrollbar={{ draggable: true }}
                      >
                        {designSetList?.map((designSetList) => (
                          <SwiperSlide>
                            <div className="compeletethelook_cont">
                              <div className="smr_ctlImg_containe">
                                <img
                                  // src={selectedThumbImg?.link}
                                  src={
                                    designSetList?.DefaultImageName
                                      ? storeInit?.DesignSetImageFol +
                                      designSetList?.designsetuniqueno +
                                      "/" +
                                      designSetList?.DefaultImageName
                                      : imageNotFound
                                  }
                                  alt={"design set"}
                                  className="ctl_img"
                                  loading="lazy"
                                />
                              </div>

                              <div
                                style={{
                                  overflowX: "auto",
                                  maxHeight: "400px !important",
                                }}
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
                                    fontFamily: "FreightDisp Pro Medium",
                                    color: "#7d7f85",
                                    fontSize: "30px",
                                    display: "none",
                                  }}
                                >
                                  Complete The Look
                                </p>

                                <div
                                  className="list_Smr_lookbook"
                                  style={{
                                    width: "100%",
                                    height: "390px",
                                    overflow: "auto",
                                  }}
                                >
                                  {(designSetList?.Designdetail == undefined
                                    ? []
                                    : JSON.parse(designSetList?.Designdetail)
                                  )?.map((ele, i) => (
                                    <div
                                      className="completethelook_outer"
                                      onClick={() => handleMoveToDetail(ele)}
                                      style={{
                                        borderTop: i !== 0 ? "none" : "",
                                      }}
                                    >
                                      <div
                                        style={{ display: "flex", gap: "60px" }}
                                      >
                                        <div style={{ marginLeft: "12px" }}>
                                          <img
                                            src={
                                              ele?.ImageCount > 0
                                                ?
                                                // storeInit?.CDNDesignImageFol +
                                                // ele?.designno +
                                                // "~" +
                                                // "1" +
                                                // "." +
                                                // ele?.ImageExtension
                                                storeInit?.CDNDesignImageFolThumb +
                                                ele?.designno +
                                                "~" +
                                                "1" +
                                                "." +
                                                "jpg"
                                                : imageNotFound
                                            }
                                            alt={""}
                                            className="srthelook_img"
                                            onError={(e) => {
                                              e.target.src = imageNotFound;
                                            }}
                                            loading="lazy"
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
                                              {ele?.designno} -{" "}
                                              {ele?.CategoryName}
                                              <br />
                                              {storeInit?.IsPriceShow == 1 && <>
                                                <span className="smr_currencyFont">
                                                  {loginInfo?.CurrencyCode ??
                                                    storeInit?.CurrencyCode}
                                                </span>

                                                &nbsp;
                                                {formatter.format(
                                                  ele?.UnitCostWithMarkUp
                                                )}

                                              </>}
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
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
