import React, { useEffect, useRef, useState } from "react";
import "./Productdetail.scss";
import Footer from "../../Home/Footer/Footer";
import { useAsyncError, useLocation, useNavigate } from "react-router-dom";
import Pako from "pako";
import { SingleProdListAPI } from "../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI";
import { SingleFullProdPriceAPI } from "../../../../../../utils/API/SingleFullProdPriceAPI/SingleFullProdPriceAPI";
import imageNotFound from "../../../Assets/image-not-found.jpg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import {
  AlmacarinoFlag,
  proCat_CartCount,
  proCat_WishCount,
  soketProductData,
} from "../../../Recoil/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { IoIosPlayCircle } from "react-icons/io";
import { getSizeData } from "../../../../../../utils/API/CartAPI/GetCategorySizeAPI";
import { StockItemApi } from "../../../../../../utils/API/StockItemAPI/StockItemApi";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  FreeMode,
  Keyboard,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Cookies from "js-cookie";
import { DesignSetListAPI } from "../../../../../../utils/API/DesignSetListAPI/DesignSetListAPI";
import { Helmet } from "react-helmet";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { IoArrowBack } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { SaveLastViewDesign } from "../../../../../../utils/API/SaveLastViewDesign/SaveLastViewDesign";

const ProductDetail = () => {
  let location = useLocation();
  const Almacarino = useRecoilValue(AlmacarinoFlag);
  const [singleProd, setSingleProd] = useState({});
  const [singleProd1, setSingleProd1] = useState({});
  // const [singleProdPrice, setSingleProdPrice] = useState();
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
  // const [finalprice, setFinalprice] = useState(0);
  const [addToCartFlag, setAddToCartFlag] = useState(null);
  const [wishListFlag, setWishListFlag] = useState(null);
  const [loginInfo, setLoginInfo] = useState();
  const [SizeCombo, setSizeCombo] = useState();
  const [sizeData, setSizeData] = useState();
  const [saveLastView, setSaveLastView] = useState();
  const [isPriceloading, setisPriceLoading] = useState(false);
  const [isDataFound, setIsDataFound] = useState(false);
  const [metalWiseColorImg, setMetalWiseColorImg] = useState();
  const [designSetList, setDesignSetList] = useState();
  const [thumbImgIndex, setThumbImgIndex] = useState();
  const [diaList, setDiaList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [prodLoading, setProdLoading] = useState(false);
  const [albumView, setAlbumView] = useState([]);
  const setCartCountVal = useSetRecoilState(proCat_CartCount);
  const setWishCountVal = useSetRecoilState(proCat_WishCount);
  const [pdVideoArr, setPdVideoArr] = useState([]);
  const [allListDataSlide, setAllListDataSlide] = useState([]);
  const [imageData, setImageData] = useState([]);
  console.log('imageData: ', imageData);
  const SoketData = useRecoilValue(soketProductData);
  const [imageStates, setImageStates] = useState({});
  const [imageSrc, setImageSrc] = useState();

  const [stockItemArr, setStockItemArr] = useState([]);
  const [SimilarBrandArr, setSimilarBrandArr] = useState([]);
  const [cartArr, setCartArr] = useState({});
  let cookie = Cookies.get("visiterId");
  const navigate = useNavigate();

  const setCSSVariable = () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  };

  const maxwidth1023px = useMediaQuery('(max-width: 1023px)')

  console.log(Almacarino, "Almacarino")

  useEffect(() => {
    setCSSVariable();
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    let allListData = JSON.parse(sessionStorage.getItem("deatilSliderData"));

    const finalProdWithPrice = allListData.map((product) => {
      let pdImgList = [];

      if (product?.ImageCount > 0) {
        for (let i = 1; i <= product?.ImageCount; i++) {
          let imgString =
            storeInit?.CDNDesignImageFol +
            product?.designno +
            "~" +
            i +
            "." +
            product?.ImageExtension;
          pdImgList.push(imgString);
        }
      } else {
        pdImgList.push(imageNotFound);
      }

      let images = pdImgList;

      let StatusId = product?.StatusId ?? 0;

      if (SoketData && SoketData?.length != 0) {
        let filterdata = SoketData?.find(
          (ele) => ele?.designno === product?.designno
        );
        StatusId = filterdata?.StatusId ?? 0;
      }

      return {
        ...product,
        images,
        StatusId,
      };
    });

    const fetchImageData = async () => {
      const processedData = await Promise.all(
        finalProdWithPrice?.map(async (ele) => {
          const src = `${storeInit?.CDNDesignImageFol}${ele?.designno}~1.${ele?.ImageExtension}`;
          const isImageAvailable = await checkImageAvailability(src);
          return {
            ...ele,
            imageSrc: isImageAvailable ? src : imageNotFound,
          };
        })
      );

      setAllListDataSlide(finalProdWithPrice);
      setImageData(processedData);
    };
    fetchImageData();
    let isincart = singleProd?.IsInCart == 0 ? false : true;
    setAddToCartFlag(isincart);
  }, [singleProd]);

  useEffect(() => {
    fetch(`${storImagePath()}/ColorTheme.txt`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const styleTag = document.createElement("style");
          styleTag.type = "text/css";
          styleTag.innerHTML = text;
          document.head.appendChild(styleTag);
        } catch (error) {
          console.error("Error processing the text file:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);



  const handleCart = (cartflag) => {
    let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
    let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let metal = metalTypeCombo?.filter(
      (ele) => ele?.metaltype == selectMtType
    )[0];
    // ??
    // metalTypeCombo[0];
    let dia = diaQcCombo?.filter(
      (ele) =>
        ele?.Quality == selectDiaQc.split(",")[0] &&
        ele?.color == selectDiaQc.split(",")[1]
    );
    // ??
    // diaQcCombo[0];
    let cs = csQcCombo?.filter(
      (ele) =>
        ele?.Quality == selectCsQc.split(",")[0] &&
        ele?.color == selectCsQc.split(",")[1]
    );
    // ??
    // csQcCombo[0];

    // let mcArr = metalColorCombo?.filter(
    //   (ele) => ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
    // )[0];

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
      Metalid: metal?.Metalid
        ? metal?.Metalid
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
      AlbumName: decodeUrl?.n ?? "",
    };

    if (cartflag) {
      CartAndWishListAPI("Cart", prodObj, cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          // console.log("addtocart re", cartflag);
          setAddToCartFlag(cartflag);
        });
    } else {
      RemoveCartAndWishAPI("Cart", singleProd?.autocode, cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          // console.log("rremovve add", cartflag);
          setAddToCartFlag(cartflag);
        });
    }
  };

  const handleWishList = (e, ele) => {
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
    let mcArr = metalColorCombo?.filter(
      (ele) =>
        ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
    )[0];

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
      AlbumName: decodeUrl?.n ?? "",
    };

    if (e?.target?.checked == true) {
      CartAndWishListAPI("Wish", prodObj, cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    } else {
      RemoveCartAndWishAPI("Wish", singleProd?.autocode, cookie)
        .then((res) => {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        })
        .catch((err) => console.log("err", err));
    }
  };

  // const [mtrd, setMtrd] = useState([]);
  // const [diard1, setDiard1] = useState([]);
  // const [csrd2, setCsrd2] = useState([]);

  // const PriceWithMarkupFunction = (pmu, pPrice, curr, swp = 0) => {
  //   if (pPrice <= 0) {
  //     return 0
  //   }
  //   else if (pmu <= 0) {
  //     return (pPrice + swp).toFixed(2)
  //   }
  //   else {
  //     let percentPMU = ((pmu / 100) / curr)
  //     return (Number(pPrice * percentPMU ?? 0) + Number(pPrice ?? 0) + (swp ?? 0)).toFixed(2)
  //   }
  // }

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
      }
    }, 500);
  }, [singleProd]);

  useEffect(() => {
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr = mtColorLocal?.filter(
        (ele) =>
          ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
      )[0];
    }

    setSelectMtColor(mcArr?.colorname);
  }, [singleProd]);
  // }, [metalTypeCombo, diaQcCombo, csQcCombo, singleProd])

  // useEffect(()=>{

  //   let finalSize = SizeCombo?.rd1?.filter((ele)=>ele?.sizename == sizeData)
  //   const filteredDataMetal = finalSize?.filter(item => item.DiamondStoneTypeName === "METAL")[0]
  //   const filteredDataDaimond = finalSize?.filter(item => item.DiamondStoneTypeName === "DIAMOND")
  //   const filteredDataColorStone = finalSize?.filter(item => item.DiamondStoneTypeName === "COLOR STONE")
  //   const filteredDataFinding = finalSize?.filter(item => item.DiamondStoneTypeName === "FINDING")

  //   setMetalFilterData(filteredDataMetal)
  //   setDaimondFiletrData(filteredDataDaimond)
  //   setColorStoneFiletrData(filteredDataColorStone)
  //   setFindingFiletrData(filteredDataFinding)

  // },[sizeData,SizeCombo])

  // let metalUpdatedPrice = () => {
  //   if (metalFilterData && metalFilterData.length && mtrd?.AE === 1) {

  //     let CalcNetwt = ((mtrd?.I ?? 0) + (metalFilterData?.Weight ?? 0) ?? 0)

  //     let fprice = ((mtrd?.AD ?? 0) * CalcNetwt) + ((mtrd?.AC ?? 0) * CalcNetwt)
  //     console.log('fpricemetal', fprice);

  //     return Number(fprice.toFixed(2))
  //   } else {
  //     return 0
  //   }
  // }

  // let diaUpdatedPrice = () => {

  //   if (daimondFilterData && daimondFilterData?.length && diard1[0]?.T === 1) {
  //     let calcDiaWt = (mtrd?.K ?? 0) + (daimondFilterData?.Weight ?? 0)

  //     let CalcPics = (mtrd?.J ?? 0) + (daimondFilterData?.pieces ?? 0)

  //     let fpprice = ((dqcRate ?? 0) * (calcDiaWt ?? 0)) + ((dqcSettRate ?? 0) * (CalcPics ?? 0))

  //     return Number(fpprice.toFixed(2))
  //   }
  //   else {
  //     return 0
  //   }
  // }

  // let colUpdatedPrice = () => {

  //   if (colorStoneFilterData && colorStoneFilterData?.length && csrd2[0]?.T === 1) {

  //     let calcDiaWt = (singleProd?.totalcolorstoneweight ?? 0) + (colorStoneFilterData?.Weight ?? 0)

  //     let CalcPics = (singleProd?.totalcolorstonepcs ?? 0) + (colorStoneFilterData?.pieces ?? 0)

  //     let fpprice = ((csqcRate ?? 0) * (calcDiaWt ?? 0)) + ((csqcSettRate ?? 0) * (CalcPics ?? 0))

  //     return Number(fpprice.toFixed(2))
  //   } else {
  //     return 0
  //   }
  // }

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
      MetalTypeComboAPI(cookie)
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
      MetalColorCombo(cookie)
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
  }, [storeInit]);

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
    let alName = "";

    if (decodeobj) {
      setDecodeUrl(decodeobj);
      alName = decodeobj?.n;
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
      // let obj={
      //   mt: metalArr,
      //   diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
      //   csQc: `${csArr?.QualityId},${csArr?.ColorId}`,
      // }

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

      setProdLoading(true);

      setisPriceLoading(true);

      await SingleProdListAPI(decodeobj, sizeData, obj, cookie, alName)
        .then(async (res) => {
          if (res) {
            setSingleProd(res?.pdList[0]);

            if (res?.pdList?.length > 0) {
              setisPriceLoading(false);
              // setIsImageLoad(false)
              // setSelectedThumbImg({
              //   link: "",
              //   type: "img",
              // });
              setProdLoading(false);
            }

            if (!res?.pdList[0]) {
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

            await SaveLastViewDesign(cookie, resp?.pdList[0]?.autocode, resp?.pdList[0]?.designno).then((res) => {
              setSaveLastView(res?.Data?.rd)
            }).catch((err) => console.log("saveLastView", err))
          }
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setIsImageLoad(false);
          setProdLoading(false);
        });
    };

    // const productlistDataFetch20 = async () => {
    //   let obj = { mt: decodeobj?.m, dia: decodeobj?.d, cs: decodeobj?.c };

    //   await ProductListApi(
    //     {},
    //     1,
    //     obj,
    //     decodeobj?.pl,
    //     cookie,
    //     decodeobj?.sb,
    //     {},
    //     {},
    //     {},
    //     "",
    //     decodeobj?.b,
    //     decodeobj?.n
    //   )
    //     .then((res) => {
    //       if (res) {
    //         console.log("productList", res);
    //         setAlbumView(res?.pdList);
    //       }
    //       return res;
    //     })
    //     .catch((err) => console.log("err", err));
    // };

    FetchProductData();
    // productlistDataFetch20();

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [location?.key]);

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

  const [imagePromise, setImagePromise] = useState(true)

  const imageCache = {};  // Caching object to store checked images

  const loadAndCheckImages = async (img) => {
    if (imageCache[img] !== undefined) {
      // If the image result is already cached, return the cached result
      return imageCache[img];
    }

    try {
      const result = await checkImage(img);
      imageCache[img] = result;  // Cache the result for future reference
      if (!isImageload) {
        setTimeout(() => {
          setImagePromise(false);
        }, 500);
      }
      return result;
    } catch (error) {
      imageCache[img] = imageNotFound;
      return imageNotFound;
    }
  }

  const checkImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(imageUrl);  // Image loaded successfully
      };

      img.onerror = () => {
        reject(new Error("Image not found"));  // Image not found
      };

      img.src = imageUrl;
    });
  };

  const ProdCardImageFunc = async () => {
    let finalprodListimg;
    let pdImgList = [];
    let pdvideoList = [];

    let pd = singleProd;

    let colImg;

    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr = mtColorLocal?.filter(
        (ele) => ele?.id == singleProd?.MetalColorid
      )[0];
    }

    if (singleProd?.ColorImageCount > 0) {
      for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          i +
          "~" +
          mcArr?.colorcode +
          "." +
          singleProd?.ImageExtension;

        let IsImg = checkImageAvailability(imgString);
        if (IsImg) {
          pdImgList.push(imgString);
        }
      }

      if (pdImgList?.length > 0) {
        colImg = pdImgList[0];
      }
    }

    let IsColImg = false;
    if (colImg?.length > 0) {
      IsColImg = await checkImageAvailability(colImg);
    }

    if (pd?.ImageCount > 0 && !IsColImg) {
      for (let i = 1; i <= pd?.ImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          pd?.designno +
          "~" +
          i +
          "." +
          pd?.ImageExtension;

        let IsImg = checkImageAvailability(imgString);
        if (IsImg) {
          pdImgList.push(imgString);
        }
        else {
          pdImgList.push(imageNotFound);
        }
      }
    } else {
      finalprodListimg = imageNotFound;
    }

    if (pd?.VideoCount > 0) {
      for (let i = 1; i <= pd?.VideoCount; i++) {
        let videoString =
          (storeInit?.CDNVPath) +
          pd?.designno +
          "~" +
          i +
          "." +
          pd?.VideoExtension;
        pdvideoList.push(videoString);
      }
    } else {
      pdvideoList = [];
    }

    let FinalPdImgList = [];

    if (pdImgList?.length > 0) {
      for (let i = 0; i < pdImgList?.length; i++) {
        let isImgAvl = await checkImageAvailability(pdImgList[i]);
        if (isImgAvl) {
          FinalPdImgList.push(pdImgList[i]);
        }
      }
    }

    if (FinalPdImgList?.length > 0) {
      finalprodListimg = FinalPdImgList[0];
      setSelectedThumbImg({ link: FinalPdImgList[0], type: "img" });
      setPdThumbImg(FinalPdImgList);
      setThumbImgIndex(0);
    }
    else {
      setSelectedThumbImg({ link: imageNotFound, type: "img" });
      setPdThumbImg();
      setThumbImgIndex();
    }

    if (pdvideoList?.length > 0) {
      setPdVideoArr(pdvideoList);
    } else {
      setPdVideoArr([]);
    }

    // return finalprodListimg;
    const img = await loadAndCheckImages(finalprodListimg);
    return img;
  };

  useEffect(() => {
    ProdCardImageFunc();
  }, [singleProd, singleProd1, location?.key]);

  useEffect(() => {
    if (isImageload === false) {
      if (!(pdThumbImg?.length !== 0 || pdVideoArr?.length !== 0)) {
        setSelectedThumbImg({ "link": imageNotFound, "type": 'img' });
      }
    }
  }, [isImageload, pdThumbImg, pdVideoArr])

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const metalColorName = () => {
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr = mtColorLocal?.filter((ele) => ele?.colorcode == selectMtColor)[0];
    }

    return mcArr?.metalcolorname;
  };

  useEffect(() => {
    try {
      if (selectedThumbImg == undefined) return;

      if (selectedThumbImg) {
        setImageSrc(selectedThumbImg.link);
      } else {
        setImageSrc(pdVideoArr?.length > 0 ? imageNotFound : 'p.png');
      }
    } catch (error) {
      console.log("Error in fetching image", error);
    }
  }, [selectedThumbImg, pdVideoArr]);

  const handleMetalWiseColorImg = async (e) => {
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr = mtColorLocal?.filter(
        (ele) => ele?.colorcode == e.target.value
      )[0];
    }

    setSelectMtColor(e.target.value);

    let imgLink =
      storeInit?.CDNDesignImageFol +
      (singleProd ?? singleProd1)?.designno +
      "~" +
      (thumbImgIndex + 1) +
      "~" +
      mcArr?.colorcode +
      "." +
      (singleProd ?? singleProd1)?.ImageExtension;

    let isImg = await checkImageAvailability(imgLink);

    if (isImg) {
      setMetalWiseColorImg(imgLink);
    } else {
      setMetalWiseColorImg();
    }

    let pd = singleProd;
    let pdImgListCol = [];
    let pdImgList = [];

    if (singleProd?.ColorImageCount > 0) {
      for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          i +
          "~" +
          mcArr?.colorcode +
          "." +
          singleProd?.ImageExtension;
        pdImgListCol.push(imgString);
      }
    }

    if (singleProd?.ImageCount > 0) {
      for (let i = 1; i <= singleProd?.ImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          i +
          "." +
          singleProd?.ImageExtension;
        pdImgList.push(imgString);
      }
    }

    let isImgCol;

    if (pdImgListCol?.length > 0) {
      isImgCol = await checkImageAvailability(pdImgListCol[0]);
    }

    let FinalPdColImgList = [];

    if (pdImgListCol?.length > 0) {
      for (let i = 0; i < pdImgListCol?.length; i++) {
        FinalPdColImgList.push(pdImgListCol[i]);
      }
    }

    if (FinalPdColImgList?.length > 0 && isImgCol == true) {
      setPdThumbImg(FinalPdColImgList);
      setSelectedThumbImg({
        link: FinalPdColImgList[thumbImgIndex],
        type: "img",
      });
      setThumbImgIndex(thumbImgIndex);
    } else {
      if (pdImgList?.length > 0) {
        setSelectedThumbImg({ link: pdImgList[thumbImgIndex], type: "img" });
        setPdThumbImg(pdImgList);
        setThumbImgIndex(thumbImgIndex);
      }
    }

    // console.log("pdImgList",pdImgList,pdImgListCol)
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
    // console.log("event", e.target.checked, ele, type);
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

    navigate(
      `/d/${productData?.TitleLine?.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
      }${productData?.designno}?p=${encodeObj}`
    );
    setProdLoading(true);
    setIsImageLoad(true)
  };

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
      mt: metalArr ?? 0,
      diaQc: `${diaArr?.QualityId ?? 0},${diaArr?.ColorId ?? 0}`,
      csQc: `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`,
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

  const formatter = new Intl.NumberFormat("en-IN");

  const SizeSorting = (SizeArr) => {
    let SizeSorted = SizeArr?.sort((a, b) => {
      const nameA = parseInt(a?.sizename?.toUpperCase()?.slice(0, -2), 10);
      const nameB = parseInt(b?.sizename?.toUpperCase()?.slice(0, -2), 10);

      return nameA - nameB;
    });

    return SizeSorted;
  };

  const swiperMainRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleProductDetail = (index) => {
    handleMoveToDetail(allListDataSlide[index]);
  };

  const onSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
    handleProductDetail(swiper.activeIndex);
  };

  const handleNext = async () => {
    const nextIndex = (currentIndex + 1) % allListDataSlide?.length;
    swiperMainRef?.current.swiper.slideTo(nextIndex);
    const selectedData = nextIndex;
    if (selectedData) {
      const imageLink = await checkImageAvailability(selectedData?.images?.[0]);
      if (imageLink === undefined || imageLink === false) {
        setImageSrc(imageNotFound)
        setSelectedThumbImg({ link: imageNotFound, type: "img" });
      }
      else {
        setImageSrc(imageLink);
        setSelectedThumbImg({ link: imageLink, type: "img" });
      }
    }
    handleProductDetail(nextIndex);
  };

  const handlePrev = async () => {
    const prevIndex = (currentIndex - 1 + allListDataSlide?.length) % allListDataSlide?.length;
    swiperMainRef.current.swiper.slideTo(prevIndex);
    const selectedData = prevIndex;
    if (selectedData) {
      const imageLink = await checkImageAvailability(selectedData?.images?.[0]);
      if (imageLink === undefined || imageLink === false) {
        setImageSrc(imageNotFound)
        setSelectedThumbImg({ link: imageNotFound, type: "img" });
      }
      else {
        setImageSrc(imageLink);
        setSelectedThumbImg({ link: imageLink, type: "img" });
      }
    }
    handleProductDetail(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        if (allListDataSlide.length) handleNext();
      } else if (event.key === 'ArrowLeft') {
        if (allListDataSlide.length) handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [allListDataSlide, currentIndex, handleNext, handlePrev]);

  useEffect(() => {
    const checkImages = async () => {
      const updatedStates = {};

      for (const ele of stockItemArr) {
        const imageUrl = `${storeInit?.CDNDesignImageFol}${ele?.designno}~1.${ele?.ImageExtension}`;
        const available = await checkImageAvailability(imageUrl);
        updatedStates[ele.StockId] = available ? imageUrl : imageNotFound;
      }

      setImageStates(updatedStates);
    };

    if (stockItemArr.length) {
      checkImages();
    }
  }, [stockItemArr]);


  return (
    <>
      <Helmet>
        <title>{`${singleProd?.TitleLine ?? "loading..."} ${singleProd?.TitleLine?.length > 0 ? "-" : ""
          } ${singleProd?.designno ?? ""}`}</title>
      </Helmet>
      <div className="proCat_prodDetail_bodyContain">
        <div className="proCat_prodDetail_outerContain">
          <div className="proCat_prodDetail_whiteInnerContain">
            {isDataFound ? (
              <div
                style={{
                  height: "90vh",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                className="proCat_prodd_datanotfound"
              >
                Data not Found!!
              </div>
            ) : (
              <>
                <Swiper
                  ref={swiperMainRef}
                  spaceBetween={10}
                  lazy={true}
                  navigation={true}
                  breakpoints={{
                    1024: {
                      slidesPerView: 4,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    0: {
                      slidesPerView: 2,
                    },
                  }}
                  modules={[Keyboard, FreeMode, Navigation]}
                  keyboard={{ enabled: true }}
                  pagination={false}
                  onSlideChange={onSlideChange}
                >
                  <div className="proCat_prod_detail_main">
                    <IoArrowBack
                      style={{
                        height: "35px",
                        width: "35px",
                        margin: "20px 0px 0px 50px",
                        cursor: "pointer",
                        color: "rgba(143, 140, 139, 0.9019607843)",
                      }}
                      onClick={() => navigate(-1)}
                    />
                    <div className="proCat_prod_image_shortInfo">
                      {/* <div>
                      <span>{"<"}</span>
                    </div> */}

                      <div className="proCat_prod_image_Sec">
                        {/* {isImageload && ( */}
                        {(isImageload || imagePromise) && (
                          <Skeleton
                            sx={{
                              width: "95%",
                              height: "750px",
                              margin: "20px 0 0 0",
                            }}
                            variant="rounded"
                          />
                        )}

                        <div
                          className="proCat_main_prod_img"
                          style={{ display: (isImageload || imagePromise) ? "none" : "block" }}
                        >
                          {selectedThumbImg?.type == "img" ? (
                            <img
                              // src={imageSrc}
                              src={selectedThumbImg?.link}
                              onError={(e) => {
                                e.target.src = imageNotFound;
                                e.target.alt = 'no-image-found';
                              }}
                              alt={""}
                              onLoad={() => setIsImageLoad(false)}
                              className="proCat_prod_img"
                            />
                          ) : (
                            <div className="proCat_prod_video">
                              <video
                                src={
                                  pdVideoArr?.length > 0
                                    ? selectedThumbImg?.link
                                    : imageNotFound
                                }
                                loop={true}
                                autoPlay={true}
                                style={{
                                  width: "100%",
                                  objectFit: "cover",
                                  marginTop: "40px",
                                  // height: "90%",
                                  borderRadius: "8px",
                                }}
                                onError={(e) => {
                                  e.target.poster = imageNotFound;
                                  e.target.alt = 'no-image-found';
                                }}
                              />
                            </div>
                          )}

                          <div className="proCat_thumb_prod_img">
                            {(pdThumbImg?.length > 1 ||
                              pdVideoArr?.length > 0) &&
                              pdThumbImg?.map((ele, i) => (
                                <img
                                  src={ele}
                                  alt={""}
                                  onLoad={() => setIsImageLoad(false)}
                                  className="proCat_prod_thumb_img"
                                  onClick={() => {
                                    setSelectedThumbImg({
                                      link: ele,
                                      type: "img",
                                    });
                                    setThumbImgIndex(i);
                                  }}
                                  onError={(e) => {
                                    e.target.src = imageNotFound;
                                    e.target.alt = 'no-image-found';
                                  }}
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
                                onClick={() =>
                                  setSelectedThumbImg({
                                    link: data,
                                    type: "vid",
                                  })
                                }
                              >
                                <video
                                  src={data}
                                  autoPlay={true}
                                  loop={true}
                                  className="proCat_prod_thumb_img"
                                  style={{ height: "70px", objectFit: "cover" }}
                                  onError={(e) => {
                                    e.target.poster = imageNotFound;
                                    e.target.alt = 'no-image-found';
                                  }}
                                />
                                <IoIosPlayCircle
                                  style={{
                                    position: "absolute",
                                    color: "white",
                                    width: "35px",
                                    height: "35px",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="proCat_prod_shortInfo">
                        <div className="proCat_prod_shortInfo_inner">
                          <p className="proCat_prod_titleLine">
                            {singleProd?.TitleLine}
                          </p>
                          <div className="proCat_prod_summury_info">
                            <div className="proCat_prod_summury_info_inner">
                              <span className="proCat_single_prod_designno">
                                {singleProd?.designno}
                                {prodLoading == false && (
                                  <div className="proCat_app_productDetail_label">
                                    {singleProd?.StatusId == 1 ? (
                                      <span className="proCat_app_Deatil_instock">
                                        In Stock
                                      </span>
                                    ) : singleProd?.StatusId == 2 ? (
                                      <span className="proCat_app_deatil_MEMO">
                                        In memo
                                      </span>
                                    ) : (
                                      <span className="proCat_app_Make_to_order">
                                        Make To Order
                                      </span>
                                    )}
                                  </div>
                                )}
                              </span>
                              <span className="proCat_prod_short_key">
                                Metal Purity :{" "}
                                <span className="proCat_prod_short_val">
                                  {selectMtType}
                                </span>
                              </span>
                              <span className="proCat_prod_short_key">
                                Metal Color :{" "}
                                <span className="proCat_prod_short_val">
                                  {metalColorName()}
                                </span>
                              </span>
                              {storeInit?.IsDiamondCustomization === 1 &&
                                diaQcCombo?.length > 0 &&
                                diaList?.length ? (
                                <span className="proCat_prod_short_key">
                                  Diamond Quality Color :{" "}
                                  <span className="proCat_prod_short_val">
                                    {`${selectDiaQc}`}
                                  </span>
                                </span>
                              ) : null}
                              <span className="proCat_prod_short_key">
                                NWT :{" "}
                                <span className="proCat_prod_short_val">
                                  {(
                                    singleProd1?.Nwt ?? singleProd?.Nwt
                                  )?.toFixed(3)}
                                </span>
                              </span>
                              {Almacarino === 1 && <span className="proCat_prod_short_key">
                                GWT :{" "}
                                <span className="proCat_prod_short_val">
                                  {(
                                    singleProd1?.Gwt ?? singleProd?.Gwt
                                  )?.toFixed(3)}
                                </span>
                              </span>}
                            </div>
                          </div>
                          {storeInit?.IsProductWebCustomization == 1 &&
                            metalTypeCombo?.length > 0 &&
                            storeInit?.IsMetalCustomization === 1 && (
                              <div className="proCat_single_prod_customize">
                                <div className="proCat_single_prod_customize_metal">
                                  <label className="menuItemTimeEleveDeatil">
                                    METAL TYPE:
                                  </label>
                                  {singleProd?.IsMrpBase == 1 ? (
                                    <span className="menuitemSelectoreMain">
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
                                      onChange={(e) =>
                                        handleCustomChange(e, "mt")
                                      }
                                    // onChange={(e) => setSelectMtType(e.target.value)}
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
                                {metalColorCombo?.length > 0 &&
                                  storeInit?.IsMetalTypeWithColor === 1 && (
                                    <div className="proCat_single_prod_customize_outer">
                                      <label className="menuItemTimeEleveDeatil">
                                        METAL COLOR:
                                      </label>
                                      {singleProd?.IsMrpBase == 1 ? (
                                        <span className="menuitemSelectoreMain">
                                          {
                                            metalColorCombo?.filter(
                                              (ele) =>
                                                ele?.id ==
                                                singleProd?.MetalColorid
                                            )[0]?.metalcolorname
                                          }
                                        </span>
                                      ) : (
                                        <select
                                          className="menuitemSelectoreMain"
                                          value={selectMtColor}
                                          onChange={(e) =>
                                            handleMetalWiseColorImg(e)
                                          }
                                        >
                                          {metalColorCombo?.map((ele) => (
                                            <option
                                              key={ele?.id}
                                              value={ele?.colorcode}
                                            >
                                              {ele?.metalcolorname}
                                            </option>
                                          ))}
                                        </select>
                                      )}
                                    </div>
                                  )}
                                {storeInit?.IsDiamondCustomization === 1 &&
                                  diaQcCombo?.length > 0 &&
                                  diaList?.length ? (
                                  <div className="proCat_single_prod_customize_outer">
                                    <label className="menuItemTimeEleveDeatil">
                                      DIAMOND :
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
                                ) : null}
                                {storeInit?.IsCsCustomization === 1 &&
                                  selectCsQc?.length > 0 &&
                                  csList?.filter((ele) => ele?.D !== "MISC")
                                    ?.length > 0 ? (
                                  <div className="proCat_single_prod_customize_outer">
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
                                ) : null}
                                {/* {console.log("sizeData",SizeCombo?.find((size) => size.IsDefaultSize === 1)?.sizename)} */}
                                {SizeSorting(SizeCombo?.rd)?.length > 0 &&
                                  singleProd?.DefaultSize !== "" && (
                                    <div className="proCat_single_prod_customize_outer">
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
                                          // onChange={(e) => {
                                          //   setSizeData(e.target.value);
                                          // }}
                                          onChange={(e) =>
                                            handleCustomChange(e, "sz")
                                          }
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

                          {storeInit?.IsPriceShow == 1 &&
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
                                    padding: "0 0 16px 0",
                                  }}
                                >
                                  {(singleProd1?.Metal_Cost
                                    ? singleProd1?.Metal_Cost
                                    : singleProd?.Metal_Cost) !== 0 ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Typography
                                        className="proCat_Price_breakup_label"
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                      >
                                        Metal
                                      </Typography>
                                      <span style={{ display: "flex" }}>
                                        <Typography>
                                          {
                                            <span
                                              className="proCat_currencyFont"
                                              sx={{
                                                fontFamily:
                                                  "TT Commons Regular",
                                              }}
                                            >
                                              {loginInfo?.CurrencyCode ??
                                                storeInit?.CurrencyCode}
                                            </span>
                                          }
                                        </Typography>
                                        &nbsp;
                                        <Typography
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                          className="proCat_PriceBreakup_Price"
                                        >
                                          {formatter.format(
                                            (singleProd1?.Metal_Cost
                                              ? singleProd1?.Metal_Cost
                                              : singleProd?.Metal_Cost
                                            )?.toFixed(2)
                                          )}
                                        </Typography>
                                      </span>
                                    </div>
                                  ) : null}

                                  {(singleProd1?.Diamond_Cost
                                    ? singleProd1?.Diamond_Cost
                                    : singleProd?.Diamond_Cost) !== 0 ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Typography
                                        className="proCat_Price_breakup_label"
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                      >
                                        Diamond{" "}
                                      </Typography>

                                      <span style={{ display: "flex" }}>
                                        <Typography>
                                          {
                                            <span
                                              className="proCat_currencyFont"
                                              sx={{
                                                fontFamily:
                                                  "TT Commons Regular",
                                              }}
                                            >
                                              {loginInfo?.CurrencyCode ??
                                                storeInit?.CurrencyCode}
                                            </span>
                                          }
                                        </Typography>
                                        &nbsp;
                                        <Typography
                                          className="proCat_PriceBreakup_Price"
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                        >
                                          {formatter.format(
                                            (singleProd1?.Diamond_Cost
                                              ? singleProd1?.Diamond_Cost
                                              : singleProd?.Diamond_Cost
                                            )?.toFixed(2)
                                          )}
                                        </Typography>
                                      </span>
                                    </div>
                                  ) : null}

                                  {(singleProd1?.ColorStone_Cost
                                    ? singleProd1?.ColorStone_Cost
                                    : singleProd?.ColorStone_Cost) !== 0 ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Typography
                                        className="proCat_Price_breakup_label"
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                      >
                                        Stone{" "}
                                      </Typography>

                                      <span style={{ display: "flex" }}>
                                        <Typography>
                                          {
                                            <span
                                              className="proCat_currencyFont"
                                              sx={{
                                                fontFamily:
                                                  "TT Commons Regular",
                                              }}
                                            >
                                              {loginInfo?.CurrencyCode ??
                                                storeInit?.CurrencyCode}
                                            </span>
                                          }
                                        </Typography>
                                        &nbsp;
                                        <Typography
                                          className="proCat_PriceBreakup_Price"
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                        >
                                          {formatter.format(
                                            (singleProd1?.ColorStone_Cost
                                              ? singleProd1?.ColorStone_Cost
                                              : singleProd?.ColorStone_Cost
                                            )?.toFixed(2)
                                          )}
                                        </Typography>
                                      </span>
                                    </div>
                                  ) : null}

                                  {(singleProd1?.Misc_Cost
                                    ? singleProd1?.Misc_Cost
                                    : singleProd?.Misc_Cost) !== 0 ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Typography
                                        className="proCat_Price_breakup_label"
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                      >
                                        MISC{" "}
                                      </Typography>

                                      <span style={{ display: "flex" }}>
                                        <Typography>
                                          {
                                            <span
                                              className="proCat_currencyFont"
                                              sx={{
                                                fontFamily:
                                                  "TT Commons Regular",
                                              }}
                                            >
                                              {loginInfo?.CurrencyCode ??
                                                storeInit?.CurrencyCode}
                                            </span>
                                          }
                                        </Typography>
                                        &nbsp;
                                        <Typography
                                          className="proCat_PriceBreakup_Price"
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                        >
                                          {formatter.format(
                                            (singleProd1?.Misc_Cost
                                              ? singleProd1?.Misc_Cost
                                              : singleProd?.Misc_Cost
                                            )?.toFixed(2)
                                          )}
                                        </Typography>
                                      </span>
                                    </div>
                                  ) : null}

                                  {(singleProd1?.Labour_Cost
                                    ? singleProd1?.Labour_Cost
                                    : singleProd?.Labour_Cost) !== 0 ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Typography
                                        className="proCat_Price_breakup_label"
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                      >
                                        Labour{" "}
                                      </Typography>

                                      <span style={{ display: "flex" }}>
                                        <Typography>
                                          {
                                            <span
                                              className="proCat_currencyFont"
                                              sx={{
                                                fontFamily:
                                                  "TT Commons Regular",
                                              }}
                                            >
                                              {loginInfo?.CurrencyCode ??
                                                storeInit?.CurrencyCode}
                                            </span>
                                          }
                                        </Typography>
                                        &nbsp;
                                        <Typography
                                          className="proCat_PriceBreakup_Price"
                                          sx={{
                                            fontFamily: "TT Commons Regular",
                                          }}
                                        >
                                          {formatter.format(
                                            (singleProd1?.Labour_Cost
                                              ? singleProd1?.Labour_Cost
                                              : singleProd?.Labour_Cost
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
                                        className="proCat_Price_breakup_label"
                                        sx={{
                                          fontFamily: "TT Commons Regular",
                                        }}
                                      >
                                        Other{" "}
                                      </Typography>

                                      <span style={{ display: "flex" }}>
                                        <Typography>
                                          {
                                            <span
                                              className="proCat_currencyFont"
                                              sx={{
                                                fontFamily:
                                                  "TT Commons Regular",
                                              }}
                                            >
                                              {loginInfo?.CurrencyCode ??
                                                storeInit?.CurrencyCode}
                                            </span>
                                          }
                                        </Typography>
                                        &nbsp;
                                        <Typography
                                          className="proCat_PriceBreakup_Price"
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

                          {storeInit?.IsPriceShow == 1 && (
                            <div className="proCat_price_portion">
                              {isPriceloading ? (
                                ""
                              ) : (
                                <span className="proCat_currencyFont">
                                  {loginInfo?.CurrencyCode ??
                                    storeInit?.CurrencyCode}
                                </span>
                              )}
                              &nbsp;
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
                          )}

                          {prodLoading ? null : (
                            <div>
                              <div className="Smr_CartAndWish_portion">
                                <button
                                  className={
                                    !addToCartFlag
                                      ? "proCat_AddToCart_btn btnColorProCatProduct"
                                      : "proCat_AddToCart_btn_afterCart btnColorProCatProductRemoveCart"
                                  }
                                  onClick={() => handleCart(!addToCartFlag)}
                                >
                                  <span
                                    className="pro_addtocart_btn_txt"
                                  >
                                    {!addToCartFlag
                                      ? "ADD TO CART"
                                      : "REMOVE FROM CART"}
                                  </span>
                                </button>
                                {/* <div className="Smr_wishlistcont">
                                <Checkbox
                                  icon={
                                    <StarBorderIcon
                                      sx={{ fontSize: "25px", color: "#7d7f85" }}
                                    />
                                  }
                                  checkedIcon={
                                    <StarIcon
                                      sx={{ fontSize: "25px", color: "#7d7f85" }}
                                    />
                                  }
                                  disableRipple={true}
                                  checked={
                                    wishListFlag ?? singleProd?.IsInWish == 1
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => handleWishList(e, singleProd)}
                                />
                              </div> */}
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
                        </div>
                      </div>
                      {/* <div>
                      <span>{">"}</span>
                    </div> */}
                    </div>

                    <button
                      className="proDuct_swiper_button_prev"
                      // onClick={() => {
                      //   swiperMainRef.current.swiper.slidePrev();
                      //   handleProductDetail(currentIndex - 1);
                      // }}
                      onClick={handlePrev}
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <HiOutlineChevronLeft className="rightIconeP" />
                    </button>
                    <button
                      className="proDuct_swiper_button_next"
                      // onClick={() => {
                      //   swiperMainRef.current.swiper.slideNext();
                      //   handleProductDetail(currentIndex + 1);
                      // }}
                      onClick={handleNext}
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <HiOutlineChevronRight className="rightIconeP" />
                    </button>
                  </div>
                </Swiper>


                <div className="proCat_material_details_portion">
                  {diaList?.length > 0 && (
                    <p className="proCat_details_title"> Product Details</p>
                  )}
                  {diaList?.length > 0 && (
                    <div className="proCat_material_details_portion_inner">
                      <ul style={{ margin: "0px 0px 3px 0px" }}>
                        <li
                          style={{ fontWeight: 600 }}
                        >{`Diamond Detail(${diaList?.reduce(
                          (accumulator, data) => accumulator + data.M,
                          0
                        )}/${diaList
                          ?.reduce(
                            (accumulator, data) => accumulator + data?.N,
                            0
                          )
                          .toFixed(3)}ct)`}</li>
                      </ul>
                      <ul className="proCat_mt_detail_title_ul">
                        <li className="proCat_proDeatilList">Shape</li>
                        <li className="proCat_proDeatilList">Clarity</li>
                        <li className="proCat_proDeatilList">Color</li>
                        <li className="proCat_proDeatilList">Pcs / Wt</li>
                      </ul>
                      {diaList?.map((data) => (
                        <ul className="proCat_mt_detail_title_ul">
                          <li className="proCat_proDeatilList1">{data?.F}</li>
                          <li className="proCat_proDeatilList1">{data?.H}</li>
                          <li className="proCat_proDeatilList1">{data?.J}</li>
                          <li className="proCat_proDeatilList1">
                            {data.M}&nbsp;/&nbsp;{data?.N?.toFixed(3)}
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}

                  {/* {csList?.length > 0 && (
                    <div className="proCat_material_details_portion_inner">
                      <ul style={{ margin: "10px 0px 3px 0px" }}>
                        <li
                          style={{ fontWeight: 600 }}
                        >{`ColorStone Detail(${csList?.reduce(
                          (accumulator, data) => accumulator + data.M,
                          0
                        )}/${csList
                          ?.reduce(
                            (accumulator, data) => accumulator + data?.N,
                            0
                          )
                          .toFixed(3)}ct)`}</li>
                      </ul>
                      <ul className="proCat_mt_detail_title_ul">
                        <li className="proCat_proDeatilList">Shape</li>
                        <li className="proCat_proDeatilList">Clarity</li>
                        <li className="proCat_proDeatilList">Color</li>
                        <li className="proCat_proDeatilList">Pcs&nbsp;&nbsp;Wt</li>
                      </ul>
                      {csList?.map((data) => (
                        <ul className="proCat_mt_detail_title_ul">
                          <li className="proCat_proDeatilList1">{data?.F}</li>
                          <li className="proCat_proDeatilList1">{data?.H}</li>
                          <li className="proCat_proDeatilList1">{data?.J}</li>
                          <li className="proCat_proDeatilList1">
                            {data.M}&nbsp;&nbsp;{data?.N?.toFixed(3)}
                          </li>
                        </ul>
                      ))}
                    </div>
                  )} */}

                  {csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 && (
                    <div className="proCat_material_details_portion_inner">
                      <ul style={{ margin: "10px 0px 3px 0px" }}>
                        <li
                          style={{ fontWeight: 600 }}
                        >{`ColorStone Detail (${csList
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
                      <ul className="proCat_mt_detail_title_ul">
                        <li className="proCat_proDeatilList">Shape</li>
                        <li className="proCat_proDeatilList">Clarity</li>
                        <li className="proCat_proDeatilList">Color</li>
                        <li className="proCat_proDeatilList">
                          Pcs&nbsp;/&nbsp;Wt
                        </li>
                      </ul>
                      {csList
                        ?.filter((ele) => ele?.D !== "MISC")
                        ?.map((data) => (
                          <ul className="proCat_mt_detail_title_ul">
                            <li className="proCat_proDeatilList1">{data?.F}</li>
                            <li className="proCat_proDeatilList1">{data?.H}</li>
                            <li className="proCat_proDeatilList1">{data?.J}</li>
                            <li className="proCat_proDeatilList1">
                              {data.M}&nbsp;/&nbsp;{data?.N?.toFixed(3)}
                            </li>
                          </ul>
                        ))}
                    </div>
                  )}

                  {csList?.filter((ele) => ele?.D === "MISC")?.length > 0 && (
                    <div className="proCat_material_details_portion_inner">
                      <ul style={{ margin: "10px 0px 3px 0px" }}>
                        <li style={{ fontWeight: 600 }}>{`MISC Detail (${csList
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
                            .toFixed(3)}gm)`}</li>
                      </ul>
                      <ul className="proCat_mt_detail_title_ul">
                        <li className="proCat_proDeatilList">Shape</li>
                        <li className="proCat_proDeatilList">Clarity</li>
                        <li className="proCat_proDeatilList">Color</li>
                        <li className="proCat_proDeatilList">
                          Pcs&nbsp;/&nbsp;Wt
                        </li>
                      </ul>
                      {csList
                        ?.filter((ele) => ele?.D === "MISC")
                        ?.map((data) => (
                          <ul className="proCat_mt_detail_title_ul">
                            <li className="proCat_proDeatilList1">{data?.F}</li>
                            <li className="proCat_proDeatilList1">{data?.H}</li>
                            <li className="proCat_proDeatilList1">{data?.J}</li>
                            <li className="proCat_proDeatilList1">
                              {data.M}&nbsp;/&nbsp;{data?.N?.toFixed(3)}
                            </li>
                          </ul>
                        ))}
                    </div>
                  )}
                </div>

                {imageData?.length > 0 && (
                  <>
                    {(imageData?.length < 5 && !maxwidth1023px) ? (
                      <div className="proCat_moreProduct_cardContainer">
                        <p className="proCat_details_title">More Products</p>
                        <div className="proCat_swiper_container">
                          {imageData?.map((ele) => (
                            <div
                              key={ele?.autocode}
                              className="procat_design_slide_detailpage_card"
                              onClick={() => handleMoveToDetail(ele)}
                              style={{
                                border: singleProd?.designno === ele?.designno ? "1px solid #d8a4a4" : "",
                              }}
                            >
                              <img src={ele?.imageSrc} alt={ele?.TitleLine} loading="lazy" onError={(e) => e.target.src = imageNotFound} />
                              {/* <div className="procat_design_details_div procat_cart_btn "> */}
                              <div className="procat_design_details_div ">
                                <span>{ele?.designno}</span>
                                {/* remove for all pro user by priyank bhai */}
                                {/* <span>{ele?.TitleLine}</span> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="proCat_moreProduct_swiperMainDiv">
                        <p className="proCat_details_title">More Products</p>
                        <div className="proCat_swiper_container">
                          <Swiper
                            spaceBetween={10}
                            lazy={true}
                            navigation={true}
                            breakpoints={{
                              1440: {
                                slidesPerView: 6,
                              },
                              1024: {
                                slidesPerView: 4,
                              },
                              768: {
                                slidesPerView: 2,
                              },
                              0: {
                                slidesPerView: 2,
                              },
                            }}
                            modules={[Keyboard, FreeMode, Navigation]}
                            keyboard={{ enabled: true }}
                            pagination={false}
                          >
                            {imageData?.map((ele) => (
                              <SwiperSlide
                                key={ele?.autocode}
                                className="proCat_Swiper_slide_custom"
                                onClick={() => handleMoveToDetail(ele)}
                              >
                                <div
                                  className="procat_design_slide_detailpage"
                                  style={{
                                    border: singleProd?.designno === ele?.designno ? "1px solid #d8a4a4" : "",
                                  }}
                                >
                                  <img src={ele?.imageSrc} alt={ele?.TitleLine} loading="lazy" onError={(e) => e.target.src = imageNotFound} />
                                  <div className="procat_design_details_div ">
                                    <span>{ele?.designno}</span>
                                    {/* <span>{ele?.TitleLine}</span> */}
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


                {stockItemArr?.length > 0 && stockItemArr?.[0]?.stat_code != 1005 &&
                  storeInit?.IsStockWebsite === 1 && (
                    <div className="proCat_stockItem_div">
                      <p className="proCat_details_title"> Stock Items </p>
                      <div className="proCat_stockitem_container">
                        <div className="proCat_stock_item_card">
                          {stockItemArr?.map((ele) => (
                            <div className="proCat_stockItemCard">
                              <div className="cart_and_wishlist_icon">
                              </div>
                              <img
                                className="procat_productCard_Image"
                                // src={
                                //   storeInit?.CDNDesignImageFol +
                                //   ele?.designno +
                                //   "~" +
                                //   "1" +
                                //   "." +
                                //   ele?.ImageExtension
                                // }
                                src={imageStates[ele.StockId] || imageNotFound}
                                alt={""}
                                onError={(e) => e.target.src = imageNotFound}
                              />
                              <div
                                className="proCat_stockutem_shortinfo"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                }}
                              >
                                <span className="proCat_prod_designno">
                                  {ele?.designno + '  ' + '(' + ele?.StockBarcode + ')'}
                                </span>
                                <div className="proCat_prod_Allwt">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <span className="proCat_prod_wt">
                                      <span className="proCat_d_keys" style={{
                                        fontSize: '12px'
                                      }}>NWT:</span>
                                      <span className="proCat_d_val" style={{
                                        fontSize: '12px'
                                      }}>
                                        {ele?.NetWt}
                                      </span>
                                    </span>

                                    {storeInit?.IsGrossWeight == 1 &&
                                      Number(ele?.GrossWt) !== 0 && (
                                        <>
                                          <span style={{
                                            fontSize: '12px',
                                            padding: '0 2px'
                                          }}>|</span>
                                          <span className="proCat_prod_wt">
                                            <span className="proCat_d_keys" style={{
                                              fontSize: '12px'
                                            }}>
                                              GWT:
                                            </span>
                                            <span className="proCat_d_val">
                                              {ele?.GrossWt}
                                            </span>
                                          </span>
                                        </>
                                      )}
                                    {storeInit?.IsDiamondWeight == 1 &&
                                      Number(ele?.DiaWt) !== 0 && (
                                        <>
                                          <span style={{
                                            fontSize: '12px',
                                            padding: '0 2px'

                                          }}>|</span>
                                          <span className="proCat_prod_wt">
                                            <span className="proCat_d_keys" style={{
                                              fontSize: '12px'
                                            }}>
                                              DWT:
                                            </span>
                                            <span className="proCat_d_val" style={{
                                              fontSize: '12px'
                                            }}>
                                              {ele?.DiaWt}
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
                                          <span style={{
                                            fontSize: '12px',
                                            padding: '0 2px'

                                          }}>|</span>
                                          <span className="proCat_prod_wt">
                                            <span className="proCat_d_keys" style={{
                                              fontSize: '12px'
                                            }}>
                                              CWT:
                                            </span>
                                            <span className="proCat_d_val" style={{
                                              fontSize: '12px'
                                            }}>
                                              {ele?.CsWt}
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
                                  className="proCat_stockItem_price_type_mt"
                                >
                                  {storeInit?.IsMetalTypeWithColor == 1
                                    ? `${ele?.metalPurity}-${ele?.MetalColorName}`
                                    : ""}{" "}
                                  <span style={{
                                    padding: "0 4px"
                                  }}>/</span>
                                  {storeInit?.IsPriceShow == 1 && (
                                    <div style={{
                                      fontWeight: '600',
                                    }}>
                                      {isPriceloading ? (
                                        ""
                                      ) : (
                                        <span className="proCat_currencyFont">
                                          {loginInfo?.CurrencyCode ??
                                            storeInit?.CurrencyCode}
                                        </span>
                                      )}
                                      &nbsp;
                                      {formatter.format(ele?.Amount)}
                                    </div>
                                  )}
                                </div>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      icon={
                                        <LocalMallOutlinedIcon
                                          sx={{
                                            fontSize: "22px",
                                            color: "#594646",
                                          }}
                                        />
                                      }
                                      checkedIcon={
                                        <LocalMallIcon
                                          sx={{
                                            fontSize: "22px",
                                            color: "#474747d1",
                                          }}
                                        />
                                      }
                                      disableRipple={false}
                                      onChange={(e) =>
                                        handleCartandWish(e, ele, "Cart")
                                      }
                                      checked={
                                        cartArr[ele?.StockId] ??
                                          ele?.IsInCart === 1
                                          ? true
                                          : false
                                      }
                                    />
                                  }
                                  label={
                                    cartArr[ele?.StockId] ??
                                      ele?.IsInCart === 1 ? (
                                      <span style={{ color: "#474747d1" }}>
                                        Remove From Cart
                                      </span>
                                    ) : (
                                      <span style={{ color: "#594646" }}>
                                        Add To Cart
                                      </span>
                                    )
                                  }
                                  className={
                                    cartArr[ele?.StockId] ?? ele?.IsInCart === 1
                                      ? "procat_cart_btn_alter"
                                      : "procat_cart_btn"
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <div style={{ overflow: 'scroll' }}>
                        <table className="Smr_stockItem_table" style={{ minWidth: '700px' }}>
                          <tr className="Smr_stockItem_table_tr">
                            <th className="Smr_stockItem_table_td">SrNo</th>
                            <th className="Smr_stockItem_table_td">Design No</th>
                            <th className="Smr_stockItem_table_td">Job No</th>
                            <th
                              className="Smr_stockItem_table_td"
                              style={{ textAlign: "center" }}
                            >
                              Gross Wt/Net Wt/Dia Wt/CS Wt
                            </th>
                            <th className="Smr_stockItem_table_td">
                              Metal Color-Purity
                            </th>
                            {storeInit?.IsPriceShow != 0 &&
                              <th className="Smr_stockItem_table_td">Price</th>
                            }
                            <th className="Smr_stockItem_table_td">
                              Add To Cart
                            </th>
                          </tr>
                          {stockItemArr?.map((ele, i) => (
                            <tr className="Smr_stockItem_table_tr">
                              <td className="Smr_stockItem_table_td">
                                <span className="proCat_prod_designno">
                                  {ele?.SrNo}
                                </span>
                              </td>
                              <td className="Smr_stockItem_table_td">
                                <span className="proCat_prod_designno">
                                  {ele?.designno}
                                </span>
                              </td>
                              <td className="Smr_stockItem_table_td">
                                <span className="proCat_prod_designno">
                                  {ele?.StockBarcode}
                                </span>
                              </td>
                              <td className="Smr_stockItem_table_td">
                                <div className="proCat_prod_Allwt">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      letterSpacing: "1px",
                                      gap: "3px",
                                    }}
                                  >
                                    {storeInit?.IsGrossWeight == 1 &&
                                      Number(ele?.GrossWt) !== 0 && (
                                        <>
                                          <span className="proCat_prod_wt">
                                            <span className="proCat_d_keys">
                                              GWT:
                                            </span>
                                            <span className="proCat_d_val">
                                              {(ele?.GrossWt)?.toFixed(3)}
                                            </span>
                                          </span>
                                        </>
                                      )}

                                    {Number(ele?.NetWt) !== 0 && (
                                      <>
                                        <span>|</span>
                                        <span className="proCat_prod_wt">
                                          <span className="proCat_d_keys">NWT:</span>
                                          <span className="proCat_d_val">
                                            {(ele?.NetWt)?.toFixed(3)}
                                          </span>
                                        </span>
                                      </>
                                    )}
                                    {storeInit?.IsDiamondWeight == 1 &&
                                      Number(ele?.DiaWt) !== 0 && (
                                        <>
                                          <span>|</span>
                                          <span className="proCat_prod_wt">
                                            <span className="proCat_d_keys">
                                              DWT:
                                            </span>
                                            <span className="proCat_d_val">
                                              {(ele?.DiaWt)?.toFixed(3)}
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
                                          <span>|</span>
                                          <span className="proCat_prod_wt">
                                            <span className="proCat_d_keys">
                                              CWT:
                                            </span>
                                            <span className="proCat_d_val">
                                              {(ele?.CsWt)?.toFixed(3)}
                                              {storeInit?.IsStonePcs === 1
                                                ? `/${ele?.CsPcs}`
                                                : null}
                                            </span>
                                          </span>
                                        </>
                                      )}
                                  </div>
                                </div>
                              </td>
                              <td className="Smr_stockItem_table_td">
                                <span>
                                  {ele?.MetalColorName}-{ele?.metaltypename}
                                  {ele?.metalPurity}
                                </span>
                              </td>
                              {storeInit?.IsPriceShow != 0 &&
                                <td className="Smr_stockItem_table_td">
                                  <span>
                                    <span className="proCat_currencyFont">
                                      {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                    </span>
                                    &nbsp;
                                    <span> {
                                      formatter.format(
                                        ele?.Amount
                                      )
                                    }</span>
                                  </span>
                                </td>
                              }
                              <td
                                className="Smr_stockItem_table_td"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  border: 'none'
                                }}
                              >
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
                              </td>
                            </tr>
                          ))}
                        </table>
                      </div> */}
                      </div>
                    </div>
                  )}

                {storeInit?.IsProductDetailSimilarDesign == 1 &&
                  SimilarBrandArr?.length > 0 && SimilarBrandArr?.[0]?.stat_code != 1005 && (
                    <div className="proCat_stockItem_div">
                      <p className="proCat_details_title"> Similar Designs</p>
                      <div className="proCat_stockitem_container">
                        <div className="proCat_stock_item_card">
                          {SimilarBrandArr?.map((ele) => (
                            <div
                              className="proCat_stockItemCard"
                              onClick={
                                () =>
                                  // setTimeout(() =>
                                  handleMoveToDetail(ele)
                                // , 500)
                              }
                            >
                              <img
                                className="proCat_productCard_Image"
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
                                onError={(e) => {
                                  e.target.src = imageNotFound;
                                }}
                              />
                              <div
                                className="proCat_stockutem_shortinfo"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                  paddingBottom: "0px",
                                }}
                              >
                                <span
                                  className="proCat_prod_designno"
                                  style={{ fontSize: "14px" }}
                                >
                                  {ele?.designno}
                                </span>

                                {storeInit?.IsPriceShow == 1 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "100%",
                                      fontSize: "16px",
                                    }}
                                    className="proCat_stockItem_price_type_mt"
                                  >
                                    <spam>
                                      <span className="proCat_currencyFont">
                                        {loginInfo?.CurrencyCode ??
                                          storeInit?.CurrencyCode}
                                      </span>
                                      &nbsp;
                                    </spam>
                                    <span>
                                      {formatter.format(
                                        ele?.UnitCostWithMarkUp
                                      )}
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>
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









// import React, { useEffect, useState } from "react";
// import "./Productdetail.scss";
// import Footer from "../../Home/Footer/Footer";
// import { useAsyncError, useLocation, useNavigate } from "react-router-dom";
// import Pako from "pako";
// import { SingleProdListAPI } from "../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI";
// import { SingleFullProdPriceAPI } from "../../../../../../utils/API/SingleFullProdPriceAPI/SingleFullProdPriceAPI";
// import imageNotFound from "../../../Assets/image-not-found.jpg";
// import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Skeleton, Typography } from "@mui/material";
// import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
// import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
// import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
// import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import StarIcon from "@mui/icons-material/Star";
// import { proCat_CartCount, proCat_WishCount } from "../../../Recoil/atom";
// import { useSetRecoilState } from "recoil";
// import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
// import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
// import { IoIosPlayCircle } from "react-icons/io";
// import { getSizeData } from "../../../../../../utils/API/CartAPI/GetCategorySizeAPI"
// import { StockItemApi } from "../../../../../../utils/API/StockItemAPI/StockItemApi";
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
// import LocalMallIcon from '@mui/icons-material/LocalMall';
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Keyboard } from 'swiper/modules';

// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// import Cookies from 'js-cookie'
// import { DesignSetListAPI } from "../../../../../../utils/API/DesignSetListAPI/DesignSetListAPI";
// import { Helmet } from "react-helmet";
// import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
// import { IoArrowBack } from "react-icons/io5";

// const ProductDetail = () => {
//   let location = useLocation();

//   const [singleProd, setSingleProd] = useState({});
//   const [singleProd1, setSingleProd1] = useState({});
//   // const [singleProdPrice, setSingleProdPrice] = useState();
//   const [storeInit, setStoreInit] = useState({});
//   const [metalTypeCombo, setMetalTypeCombo] = useState([]);
//   const [diaQcCombo, setDiaQcCombo] = useState([]);
//   const [csQcCombo, setCsQcCombo] = useState([]);
//   const [metalColorCombo, setMetalColorCombo] = useState([]);
//   const [selectMtType, setSelectMtType] = useState();
//   const [selectDiaQc, setSelectDiaQc] = useState();
//   const [selectCsQc, setSelectCsQc] = useState();
//   const [selectMtColor, setSelectMtColor] = useState();
//   const [pdThumbImg, setPdThumbImg] = useState([]);
//   const [isImageload, setIsImageLoad] = useState(true);
//   const [selectedThumbImg, setSelectedThumbImg] = useState();
//   const [decodeUrl, setDecodeUrl] = useState({});
//   // const [finalprice, setFinalprice] = useState(0);
//   const [addToCartFlag, setAddToCartFlag] = useState(null);
//   const [wishListFlag, setWishListFlag] = useState(null);
//   const [loginInfo, setLoginInfo] = useState();
//   const [SizeCombo, setSizeCombo] = useState();
//   const [sizeData, setSizeData] = useState();
//   const [isPriceloading, setisPriceLoading] = useState(false)
//   const [isDataFound, setIsDataFound] = useState(false)
//   const [metalWiseColorImg, setMetalWiseColorImg] = useState()
//   const [designSetList, setDesignSetList] = useState();
//   const [thumbImgIndex, setThumbImgIndex] = useState()
//   const [diaList, setDiaList] = useState([]);
//   const [csList, setCsList] = useState([]);
//   const [prodLoading, setProdLoading] = useState(false);
//   const [albumView, setAlbumView] = useState([]);
//   const setCartCountVal = useSetRecoilState(proCat_CartCount)
//   const setWishCountVal = useSetRecoilState(proCat_WishCount)
//   const [pdVideoArr, setPdVideoArr] = useState([]);

//   let fakeData = [
//     {
//       "id": 1942,
//       "DesignId": 1942,
//       "IsBestSeller": 0,
//       "IsTrending": 0,
//       "designno": "K24705E",
//       "autocode": "0001942",
//       "DefaultImageName": "0001942_11092024113736361.jpg",
//       "imgrandomno": "228CC7FB4A",
//       "RollOverImageName": "0001942_11092024113738685.jpg",
//       "IsNewArrival": 0,
//       "TitleLine": "",
//       "MasterManagement_labid": 3,
//       "DisplayOrder": 58505,
//       "Producttypeid": 1,
//       "Collectionid": 16,
//       "Categoryid": 13,
//       "SubCategoryid": 6,
//       "Brandid": 3,
//       "Genderid": 1,
//       "Ocassionid": 3,
//       "Themeid": 6,
//       "MetalTypeid": 1,
//       "MetalTypePurity": "GOLD 18K",
//       "MetalColorid": 4,
//       "IsInReadyStock": 1,
//       "InReadyStockCnt": 1,
//       "MetalPurityid": 2,
//       "FrontEnd_OrderCnt": 0,
//       "CenterStoneId": 0,
//       "ColorWiseRollOverImageName": "0001942_11092024113759543.jpg",
//       "CenterStonePieces": 0,
//       "Hashtagid": "5",
//       "description": "",
//       "SetDno": "",
//       "similarband": "",
//       "DefaultSize": "5mm",
//       "ImageName": "",
//       "VideoName": "0001942_11092024113853909.mp4",
//       "DesignFolderName": "228CC7FB4AMDAwMTk0Mg==",
//       "EntryDate": "2024-07-20T00:00:00",
//       "FrontEnd1_newArrivalsto": null,
//       "IsMrpBase": 0,
//       "InStockDays": 0,
//       "MakeOrderDays": 0,
//       "SrNo": 1,
//       "StatusId": 1,
//       "DiaQuaCol": "VVS,GH",
//       "CsQuaCol": "S-EMR,S-RUB,GRN,RED",
//       "IsInWish": 0,
//       "IsInCart": 0,
//       "ImageCount": 4,
//       "ColorImageCount": 4,
//       "360ImageCount": 0,
//       "VideoCount": 1,
//       "ImageExtension": "jpg",
//       "360ImageExtension": "",
//       "VideoExtension": "mp4",
//       "IsImageNameWithRandNo": 0,
//       "ImageVideoDetail": "[{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2},{\"Nm\":1,\"Ex\":\"mp4\",\"CN\":\"\",\"TI\":3},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2}]",
//       "stockno": "",
//       "Nwt": 13.606,
//       "Gwt": 14.782,
//       "Dwt": 0.504,
//       "Dpcs": 48,
//       "CSwt": 5.374,
//       "CSpcs": 5,
//       "UnitCost": 336331.51,
//       "DesignMarkUp": 0,
//       "DesignMarkUpAmount": 0,
//       "SizeMarkUpOn": "",
//       "Size_MarkUp": 0,
//       "SizeMarkUpAmount": 0,
//       "UnitCostWithMarkUp": 336331,
//       "Metal_Cost": 89146.51,
//       "Labour_Cost": 2400,
//       "Diamond_Cost": 26050.8,
//       "Diamond_SettingCost": 21800,
//       "ColorStone_Cost": 190734.2,
//       "ColorStone_SettingCost": 2900,
//       "Misc_Cost": 0,
//       "Misc_SettingCost": 0,
//       "Other_Cost": 3300,
//       "SolPrice": 0
//     },
//     {
//       "id": 1943,
//       "DesignId": 1943,
//       "IsBestSeller": 0,
//       "IsTrending": 0,
//       "designno": "K24706E",
//       "autocode": "0001943",
//       "DefaultImageName": "0001943_19092024115722145.jpg",
//       "imgrandomno": "AD3DEADF9C",
//       "RollOverImageName": "",
//       "IsNewArrival": 0,
//       "TitleLine": "",
//       "MasterManagement_labid": 3,
//       "DisplayOrder": 58505,
//       "Producttypeid": 1,
//       "Collectionid": 16,
//       "Categoryid": 13,
//       "SubCategoryid": 6,
//       "Brandid": 3,
//       "Genderid": 1,
//       "Ocassionid": 3,
//       "Themeid": 6,
//       "MetalTypeid": 1,
//       "MetalTypePurity": "GOLD 18K",
//       "MetalColorid": 4,
//       "IsInReadyStock": 2,
//       "InReadyStockCnt": 0,
//       "MetalPurityid": 2,
//       "FrontEnd_OrderCnt": 0,
//       "CenterStoneId": 0,
//       "ColorWiseRollOverImageName": "",
//       "CenterStonePieces": 0,
//       "Hashtagid": "5",
//       "description": "Wipe your jewellery with a soft cloth after every use Always store your jewellery in a flat box to avoid accidental scratches Keep sprays and perfumes away from your jewellery Do not soak your jewellery in water Clean your jewellery using a soft brush, dipped in jewellery cleaning solution only.",
//       "SetDno": "",
//       "similarband": "K24705E, K24706E, D24705E",
//       "DefaultSize": "5mm",
//       "ImageName": "",
//       "VideoName": "0001943_11092024123456869.mp4",
//       "DesignFolderName": "AD3DEADF9CMDAwMTk0Mw==",
//       "EntryDate": "2024-07-20T00:00:00",
//       "FrontEnd1_newArrivalsto": null,
//       "IsMrpBase": 0,
//       "InStockDays": 0,
//       "MakeOrderDays": 0,
//       "SrNo": 2,
//       "StatusId": 2,
//       "DiaQuaCol": "VVS,GH",
//       "CsQuaCol": "S-EMR,S-RUB,GRN,RED",
//       "IsInWish": 0,
//       "IsInCart": 0,
//       "ImageCount": 4,
//       "ColorImageCount": 4,
//       "360ImageCount": 0,
//       "VideoCount": 1,
//       "ImageExtension": "jpg",
//       "360ImageExtension": "",
//       "VideoExtension": "mp4",
//       "IsImageNameWithRandNo": 0,
//       "ImageVideoDetail": "[{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2},{\"Nm\":1,\"Ex\":\"mp4\",\"CN\":\"\",\"TI\":3},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2}]",
//       "stockno": "",
//       "Nwt": 13.606,
//       "Gwt": 19.782,
//       "Dwt": 0.504,
//       "Dpcs": 48,
//       "CSwt": 5.374,
//       "CSpcs": 5,
//       "UnitCost": 586331.51,
//       "DesignMarkUp": 0,
//       "DesignMarkUpAmount": 0,
//       "SizeMarkUpOn": "",
//       "Size_MarkUp": 0,
//       "SizeMarkUpAmount": 0,
//       "UnitCostWithMarkUp": 586331,
//       "Metal_Cost": 89146.51,
//       "Labour_Cost": 2400,
//       "Diamond_Cost": 26050.8,
//       "Diamond_SettingCost": 21800,
//       "ColorStone_Cost": 190734.2,
//       "ColorStone_SettingCost": 2900,
//       "Misc_Cost": 250000,
//       "Misc_SettingCost": 0,
//       "Other_Cost": 3300,
//       "SolPrice": 0
//     },
//     {
//       "id": 368,
//       "DesignId": 368,
//       "IsBestSeller": 1,
//       "IsTrending": 0,
//       "designno": "S24704E",
//       "autocode": "0000368",
//       "DefaultImageName": "0000368_07082024160706154.jpg",
//       "imgrandomno": "E3C81E9D91",
//       "RollOverImageName": "0000368_07082024160706154.jpg",
//       "IsNewArrival": 0,
//       "TitleLine": "Trio Pear Cut Gemstone Bracelet",
//       "MasterManagement_labid": 2,
//       "DisplayOrder": 58607,
//       "Producttypeid": 1,
//       "Collectionid": 16,
//       "Categoryid": 11,
//       "SubCategoryid": 6,
//       "Brandid": 3,
//       "Genderid": 1,
//       "Ocassionid": 4,
//       "Themeid": 11,
//       "MetalTypeid": 1,
//       "MetalTypePurity": "GOLD 18K",
//       "MetalColorid": 2,
//       "IsInReadyStock": 0,
//       "InReadyStockCnt": 0,
//       "MetalPurityid": 2,
//       "FrontEnd_OrderCnt": 0,
//       "CenterStoneId": 0,
//       "ColorWiseRollOverImageName": "",
//       "CenterStonePieces": 0,
//       "Hashtagid": "",
//       "description": "",
//       "SetDno": "",
//       "similarband": "",
//       "DefaultSize": "",
//       "ImageName": "",
//       "VideoName": "",
//       "DesignFolderName": "E3C81E9D91MDAwMDM2OA==",
//       "EntryDate": "2024-06-19T00:00:00",
//       "FrontEnd1_newArrivalsto": null,
//       "IsMrpBase": 0,
//       "InStockDays": 0,
//       "MakeOrderDays": 0,
//       "SrNo": 3,
//       "StatusId": 0,
//       "DiaQuaCol": "VVS,GH",
//       "CsQuaCol": "",
//       "IsInWish": 0,
//       "IsInCart": 0,
//       "ImageCount": 4,
//       "ColorImageCount": 4,
//       "360ImageCount": 0,
//       "VideoCount": 0,
//       "ImageExtension": "jpg",
//       "360ImageExtension": "",
//       "VideoExtension": "",
//       "IsImageNameWithRandNo": 0,
//       "ImageVideoDetail": "[{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":2,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":3,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"Rose\",\"TI\":2},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"White\",\"TI\":2},{\"Nm\":4,\"Ex\":\"jpg\",\"CN\":\"Yellow\",\"TI\":2}]",
//       "stockno": "",
//       "Nwt": 5.119,
//       "Gwt": 5.291,
//       "Dwt": 0.862,
//       "Dpcs": 82,
//       "CSwt": 0,
//       "CSpcs": 0,
//       "UnitCost": 102741.51,
//       "DesignMarkUp": 0,
//       "DesignMarkUpAmount": 0,
//       "SizeMarkUpOn": "",
//       "Size_MarkUp": 0,
//       "SizeMarkUpAmount": 0,
//       "UnitCostWithMarkUp": 102741,
//       "Metal_Cost": 30959.71,
//       "Labour_Cost": 900,
//       "Diamond_Cost": 44881.8,
//       "Diamond_SettingCost": 25200,
//       "ColorStone_Cost": 0,
//       "ColorStone_SettingCost": 0,
//       "Misc_Cost": 0,
//       "Misc_SettingCost": 0,
//       "Other_Cost": 800,
//       "SolPrice": 0
//     },
//     {
//       "id": 98,
//       "DesignId": 98,
//       "IsBestSeller": 1,
//       "IsTrending": 0,
//       "designno": "D24701E",
//       "autocode": "0000075",
//       "DefaultImageName": "",
//       "imgrandomno": "CBAF13AE88",
//       "RollOverImageName": "",
//       "IsNewArrival": 0,
//       "TitleLine": "",
//       "MasterManagement_labid": 2,
//       "DisplayOrder": 58501,
//       "Producttypeid": 1,
//       "Collectionid": 16,
//       "Categoryid": 13,
//       "SubCategoryid": 6,
//       "Brandid": 3,
//       "Genderid": 1,
//       "Ocassionid": 3,
//       "Themeid": 6,
//       "MetalTypeid": 1,
//       "MetalTypePurity": "GOLD 18K",
//       "MetalColorid": 1,
//       "IsInReadyStock": 1,
//       "InReadyStockCnt": 1,
//       "MetalPurityid": 2,
//       "FrontEnd_OrderCnt": 0,
//       "CenterStoneId": 0,
//       "ColorWiseRollOverImageName": "",
//       "CenterStonePieces": 0,
//       "Hashtagid": "5",
//       "description": "",
//       "SetDno": "",
//       "similarband": "",
//       "DefaultSize": "",
//       "ImageName": "",
//       "VideoName": "",
//       "DesignFolderName": "CBAF13AE88MDAwMDA3NQ==",
//       "EntryDate": "2024-06-19T00:00:00",
//       "FrontEnd1_newArrivalsto": null,
//       "IsMrpBase": 1,
//       "InStockDays": 5,
//       "MakeOrderDays": 8,
//       "SrNo": 4,
//       "StatusId": 1,
//       "DiaQuaCol": "BETTER_SI,GREEN",
//       "CsQuaCol": "",
//       "IsInWish": 0,
//       "IsInCart": 0,
//       "ImageCount": 1,
//       "ColorImageCount": 1,
//       "360ImageCount": 0,
//       "VideoCount": 0,
//       "ImageExtension": "jpg",
//       "360ImageExtension": "",
//       "VideoExtension": "",
//       "IsImageNameWithRandNo": 0,
//       "ImageVideoDetail": "0",
//       "stockno": "",
//       "Nwt": 11.8,
//       "Gwt": 11.8,
//       "Dwt": 0,
//       "Dpcs": 0,
//       "CSwt": 0,
//       "CSpcs": 0,
//       "UnitCost": 56000,
//       "DesignMarkUp": 0,
//       "DesignMarkUpAmount": 0,
//       "SizeMarkUpOn": "",
//       "Size_MarkUp": 0,
//       "SizeMarkUpAmount": 0,
//       "UnitCostWithMarkUp": 56000,
//       "Metal_Cost": 0,
//       "Labour_Cost": 0,
//       "Diamond_Cost": 0,
//       "Diamond_SettingCost": 0,
//       "ColorStone_Cost": 0,
//       "ColorStone_SettingCost": 0,
//       "Misc_Cost": 0,
//       "Misc_SettingCost": 0,
//       "Other_Cost": 0,
//       "SolPrice": 0
//     },
//     {
//       "id": 16,
//       "DesignId": 16,
//       "IsBestSeller": 0,
//       "IsTrending": 1,
//       "designno": "D24703E",
//       "autocode": "0000079",
//       "DefaultImageName": "0000079_10082024132825286.jpg",
//       "imgrandomno": "3951DEF362",
//       "RollOverImageName": "0000079_10082024132825286.jpg",
//       "IsNewArrival": 0,
//       "TitleLine": "",
//       "MasterManagement_labid": 2,
//       "DisplayOrder": 58507,
//       "Producttypeid": 1,
//       "Collectionid": 16,
//       "Categoryid": 13,
//       "SubCategoryid": 6,
//       "Brandid": 3,
//       "Genderid": 1,
//       "Ocassionid": 3,
//       "Themeid": 6,
//       "MetalTypeid": 1,
//       "MetalTypePurity": "GOLD 14K",
//       "MetalColorid": 1,
//       "IsInReadyStock": 0,
//       "InReadyStockCnt": 0,
//       "MetalPurityid": 1,
//       "FrontEnd_OrderCnt": 0,
//       "CenterStoneId": 0,
//       "ColorWiseRollOverImageName": "",
//       "CenterStonePieces": 0,
//       "Hashtagid": "",
//       "description": "",
//       "SetDno": "",
//       "similarband": "",
//       "DefaultSize": "5mm",
//       "ImageName": "",
//       "VideoName": "",
//       "DesignFolderName": "3951DEF362MDAwMDA3OQ==",
//       "EntryDate": "2024-06-19T00:00:00",
//       "FrontEnd1_newArrivalsto": null,
//       "IsMrpBase": 1,
//       "InStockDays": 0,
//       "MakeOrderDays": 0,
//       "SrNo": 5,
//       "StatusId": 0,
//       "DiaQuaCol": "VVS,GH",
//       "CsQuaCol": "S-EMR,GRN",
//       "IsInWish": 0,
//       "IsInCart": 0,
//       "ImageCount": 1,
//       "ColorImageCount": 0,
//       "360ImageCount": 0,
//       "VideoCount": 0,
//       "ImageExtension": "jpg",
//       "360ImageExtension": "",
//       "VideoExtension": "",
//       "IsImageNameWithRandNo": 0,
//       "ImageVideoDetail": "[{\"Nm\":1,\"Ex\":\"jpg\",\"CN\":\"\",\"TI\":1}]",
//       "stockno": "",
//       "Nwt": 98.78,
//       "Gwt": 98.78,
//       "Dwt": 0,
//       "Dpcs": 0,
//       "CSwt": 0,
//       "CSpcs": 0,
//       "UnitCost": 150000,
//       "DesignMarkUp": 5,
//       "DesignMarkUpAmount": 7500,
//       "SizeMarkUpOn": "",
//       "Size_MarkUp": 0,
//       "SizeMarkUpAmount": 0,
//       "UnitCostWithMarkUp": 157500,
//       "Metal_Cost": 0,
//       "Labour_Cost": 0,
//       "Diamond_Cost": 0,
//       "Diamond_SettingCost": 0,
//       "ColorStone_Cost": 0,
//       "ColorStone_SettingCost": 0,
//       "Misc_Cost": 0,
//       "Misc_SettingCost": 0,
//       "Other_Cost": 0,
//       "SolPrice": 0
//     },
//     {
//       "id": 8,
//       "DesignId": 8,
//       "IsBestSeller": 0,
//       "IsTrending": 0,
//       "designno": "A27805",
//       "autocode": "0000040",
//       "DefaultImageName": "",
//       "imgrandomno": "1E4E16FE01",
//       "RollOverImageName": "",
//       "IsNewArrival": 0,
//       "TitleLine": "",
//       "MasterManagement_labid": 2,
//       "DisplayOrder": 81805,
//       "Producttypeid": 1,
//       "Collectionid": 15,
//       "Categoryid": 1,
//       "SubCategoryid": 10,
//       "Brandid": 3,
//       "Genderid": 1,
//       "Ocassionid": 4,
//       "Themeid": 11,
//       "MetalTypeid": 1,
//       "MetalTypePurity": "GOLD 18K",
//       "MetalColorid": 1,
//       "IsInReadyStock": 0,
//       "InReadyStockCnt": 0,
//       "MetalPurityid": 2,
//       "FrontEnd_OrderCnt": 0,
//       "CenterStoneId": 0,
//       "ColorWiseRollOverImageName": "",
//       "CenterStonePieces": 0,
//       "Hashtagid": "",
//       "description": "",
//       "SetDno": "",
//       "similarband": "",
//       "DefaultSize": "",
//       "ImageName": "",
//       "VideoName": "",
//       "DesignFolderName": "1E4E16FE01MDAwMDA0MA==",
//       "EntryDate": "2024-06-19T00:00:00",
//       "FrontEnd1_newArrivalsto": null,
//       "IsMrpBase": 0,
//       "InStockDays": 0,
//       "MakeOrderDays": 0,
//       "SrNo": 6,
//       "StatusId": 0,
//       "DiaQuaCol": "SI,GH",
//       "CsQuaCol": "S-EMR,GRN",
//       "IsInWish": 0,
//       "IsInCart": 0,
//       "ImageCount": 4,
//       "ColorImageCount": 4,
//       "360ImageCount": 0,
//       "VideoCount": 0,
//       "ImageExtension": "jpg",
//       "360ImageExtension": "",
//       "VideoExtension": "",
//       "IsImageNameWithRandNo": 0,
//       "ImageVideoDetail": "0",
//       "stockno": "",
//       "Nwt": 7.143,
//       "Gwt": 11.143,
//       "Dwt": 5,
//       "Dpcs": 2,
//       "CSwt": 5,
//       "CSpcs": 1,
//       "UnitCost": 402150.86,
//       "DesignMarkUp": 0,
//       "DesignMarkUpAmount": 0,
//       "SizeMarkUpOn": "",
//       "Size_MarkUp": 0,
//       "SizeMarkUpAmount": 0,
//       "UnitCostWithMarkUp": 402150,
//       "Metal_Cost": 43200.86,
//       "Labour_Cost": 900,
//       "Diamond_Cost": 257250,
//       "Diamond_SettingCost": 0,
//       "ColorStone_Cost": 0,
//       "ColorStone_SettingCost": 0,
//       "Misc_Cost": 100000,
//       "Misc_SettingCost": 0,
//       "Other_Cost": 800,
//       "SolPrice": 0
//     },
//     {
//       "id": 4,
//       "DesignId": 4,
//       "IsBestSeller": 0,
//       "IsTrending": 1,
//       "designno": "A27801",
//       "autocode": "0000036",
//       "DefaultImageName": "",
//       "imgrandomno": "43666C1807",
//       "RollOverImageName": "",
//       "IsNewArrival": 0,
//       "TitleLine": "",
//       "MasterManagement_labid": 2,
//       "DisplayOrder": 103326,
//       "Producttypeid": 1,
//       "Collectionid": 15,
//       "Categoryid": 1,
//       "SubCategoryid": 10,
//       "Brandid": 3,
//       "Genderid": 1,
//       "Ocassionid": 4,
//       "Themeid": 11,
//       "MetalTypeid": 1,
//       "MetalTypePurity": "GOLD 18K",
//       "MetalColorid": 6,
//       "IsInReadyStock": 1,
//       "InReadyStockCnt": 1,
//       "MetalPurityid": 2,
//       "FrontEnd_OrderCnt": 0,
//       "CenterStoneId": 0,
//       "ColorWiseRollOverImageName": "",
//       "CenterStonePieces": 0,
//       "Hashtagid": "",
//       "description": "",
//       "SetDno": "",
//       "similarband": "A14413,A19903",
//       "DefaultSize": "",
//       "ImageName": "",
//       "VideoName": "",
//       "DesignFolderName": "43666C1807MDAwMDAzNg==",
//       "EntryDate": "2024-06-19T00:00:00",
//       "FrontEnd1_newArrivalsto": null,
//       "IsMrpBase": 0,
//       "InStockDays": 0,
//       "MakeOrderDays": 0,
//       "SrNo": 7,
//       "StatusId": 1,
//       "DiaQuaCol": "VVS1,IJ",
//       "CsQuaCol": "S-CRL,GRN",
//       "IsInWish": 0,
//       "IsInCart": 0,
//       "ImageCount": 2,
//       "ColorImageCount": 1,
//       "360ImageCount": 0,
//       "VideoCount": 2,
//       "ImageExtension": "png",
//       "360ImageExtension": "",
//       "VideoExtension": "mp4",
//       "IsImageNameWithRandNo": 0,
//       "ImageVideoDetail": "0",
//       "stockno": "",
//       "Nwt": 9.748,
//       "Gwt": 10,
//       "Dwt": 0.258,
//       "Dpcs": 5,
//       "CSwt": 1,
//       "CSpcs": 1,
//       "UnitCost": 74471.8,
//       "DesignMarkUp": 0,
//       "DesignMarkUpAmount": 0,
//       "SizeMarkUpOn": "",
//       "Size_MarkUp": 0,
//       "SizeMarkUpAmount": 0,
//       "UnitCostWithMarkUp": 74471,
//       "Metal_Cost": 58955.9,
//       "Labour_Cost": 900,
//       "Diamond_Cost": 13815.9,
//       "Diamond_SettingCost": 0,
//       "ColorStone_Cost": 0,
//       "ColorStone_SettingCost": 0,
//       "Misc_Cost": 0,
//       "Misc_SettingCost": 0,
//       "Other_Cost": 800,
//       "SolPrice": 0
//     }
//   ]

//   // console.log("SizeCombo",SizeCombo);

//   // const [metalFilterData, setMetalFilterData] = useState();
//   // const [daimondFilterData, setDaimondFiletrData] = useState([]);
//   // const [colorStoneFilterData, setColorStoneFiletrData] = useState([]);
//   // const [FindingFilterData, setFindingFiletrData] = useState([]);

//   // const [dqcRate, setDqcRate] = useState();
//   // const [dqcSettRate, setDqcSettRate] = useState()
//   // const [csqcRate, setCsqcRate] = useState()
//   // const [csqcSettRate, setCsqcSettRate] = useState()

//   const [stockItemArr, setStockItemArr] = useState([]);
//   const [SimilarBrandArr, setSimilarBrandArr] = useState([]);
//   const [cartArr, setCartArr] = useState({})
//   let cookie = Cookies.get('visiterId')
//   const navigate = useNavigate()

//   const setCSSVariable = () => {
//     const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
//     const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
//     document.documentElement.style.setProperty(
//       "--background-color",
//       backgroundColor
//     );
//   };

//   useEffect(() => {
//     setCSSVariable();
//   }, []);

//   useEffect(() => {
//     window.scroll({
//       top: 0,
//       behavior: "auto",
//     });
//   }, [])

//   useEffect(() => {
//     let isincart = singleProd?.IsInCart == 0 ? false : true;
//     setAddToCartFlag(isincart);
//   }, [singleProd]);

//   const handleCart = (cartflag) => {

//     let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
//     let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

//     let metal =
//       metalTypeCombo?.filter((ele) => ele?.metaltype == selectMtType)[0]
//     // ??
//     // metalTypeCombo[0];
//     let dia =
//       diaQcCombo?.filter(
//         (ele) =>
//           ele?.Quality == selectDiaQc.split(",")[0] &&
//           ele?.color == selectDiaQc.split(",")[1]
//       )
//     // ??
//     // diaQcCombo[0];
//     let cs =
//       csQcCombo?.filter(
//         (ele) =>
//           ele?.Quality == selectCsQc.split(",")[0] &&
//           ele?.color == selectCsQc.split(",")[1]
//       )
//     // ??
//     // csQcCombo[0];

//     // let mcArr = metalColorCombo?.filter(
//     //   (ele) => ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
//     // )[0];

//     let mcArr = metalColorCombo?.filter(
//       (ele) => {
//         if (selectMtColor) {
//           return ele?.colorcode == selectMtColor
//         }
//         else { return ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid) }
//       })[0];

//     let prodObj = {
//       autocode: singleProd?.autocode,
//       Metalid: metal?.Metalid ? metal?.Metalid : (logininfoInside?.MetalId ?? storeinitInside?.MetalId),
//       MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
//       DiaQCid: dia?.length ? `${dia[0]?.QualityId},${dia[0]?.ColorId}` : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid),
//       CsQCid: cs?.length ? `${cs[0]?.QualityId},${cs[0]?.ColorId}` : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid),
//       Size: sizeData ?? singleProd?.DefaultSize,
//       Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
//       markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
//       UnitCostWithmarkup: singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
//       Remark: "",
//       AlbumName: decodeUrl?.n ?? ""
//     };

//     if (cartflag) {
//       CartAndWishListAPI("Cart", prodObj, cookie)
//         .then((res) => {
//           let cartC = res?.Data?.rd[0]?.Cartlistcount;
//           let wishC = res?.Data?.rd[0]?.Wishlistcount;
//           setWishCountVal(wishC);
//           setCartCountVal(cartC);
//         })
//         .catch((err) => console.log("err", err))
//         .finally(() => {
//           // console.log("addtocart re", cartflag);
//           setAddToCartFlag(cartflag);
//         });
//     } else {
//       RemoveCartAndWishAPI("Cart", singleProd?.autocode, cookie)
//         .then((res) => {
//           let cartC = res?.Data?.rd[0]?.Cartlistcount;
//           let wishC = res?.Data?.rd[0]?.Wishlistcount;
//           setWishCountVal(wishC);
//           setCartCountVal(cartC);
//         })
//         .catch((err) => console.log("err", err))
//         .finally(() => {
//           // console.log("rremovve add", cartflag);
//           setAddToCartFlag(cartflag);
//         });
//     }
//   };

//   const handleWishList = (e, ele) => {
//     setWishListFlag(e?.target?.checked);

//     let metal =
//       metalTypeCombo?.filter((ele) => ele?.metaltype == selectMtType)[0] ??
//       metalTypeCombo[0];
//     let dia =
//       diaQcCombo?.filter(
//         (ele) =>
//           ele?.Quality == selectDiaQc.split(",")[0] &&
//           ele?.color == selectDiaQc.split(",")[1]
//       )[0] ?? diaQcCombo[0];
//     let cs =
//       csQcCombo?.filter(
//         (ele) =>
//           ele?.Quality == selectCsQc.split(",")[0] &&
//           ele?.color == selectCsQc.split(",")[1]
//       )[0] ?? csQcCombo[0];
//     let mcArr = metalColorCombo?.filter(
//       (ele) => ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
//     )[0];

//     let prodObj = {
//       autocode: singleProd?.autocode,
//       Metalid: metal?.Metalid,
//       MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
//       DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
//       CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
//       Size: sizeData ?? (singleProd1?.DefaultSize ?? singleProd?.DefaultSize),
//       Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
//       markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
//       UnitCostWithmarkup: singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
//       Remark: "",
//       AlbumName: decodeUrl?.n ?? ""
//     };

//     if (e?.target?.checked == true) {
//       CartAndWishListAPI("Wish", prodObj, cookie)
//         .then((res) => {
//           let cartC = res?.Data?.rd[0]?.Cartlistcount;
//           let wishC = res?.Data?.rd[0]?.Wishlistcount;
//           setWishCountVal(wishC);
//           setCartCountVal(cartC);
//         })
//         .catch((err) => console.log("err", err));
//     } else {
//       RemoveCartAndWishAPI("Wish", singleProd?.autocode, cookie)
//         .then((res) => {
//           let cartC = res?.Data?.rd[0]?.Cartlistcount;
//           let wishC = res?.Data?.rd[0]?.Wishlistcount;
//           setWishCountVal(wishC);
//           setCartCountVal(cartC);
//         })
//         .catch((err) => console.log("err", err));
//     }
//   };

//   // const [mtrd, setMtrd] = useState([]);
//   // const [diard1, setDiard1] = useState([]);
//   // const [csrd2, setCsrd2] = useState([]);

//   // const PriceWithMarkupFunction = (pmu, pPrice, curr, swp = 0) => {
//   //   if (pPrice <= 0) {
//   //     return 0
//   //   }
//   //   else if (pmu <= 0) {
//   //     return (pPrice + swp).toFixed(2)
//   //   }
//   //   else {
//   //     let percentPMU = ((pmu / 100) / curr)
//   //     return (Number(pPrice * percentPMU ?? 0) + Number(pPrice ?? 0) + (swp ?? 0)).toFixed(2)
//   //   }
//   // }

//   useEffect(() => {
//     let navVal = location?.search.split("?p=")[1];
//     let decodeobj = decodeAndDecompress(navVal);

//     let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

//     let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));

//     let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));

//     setTimeout(() => {
//       if (decodeUrl) {
//         let metalArr
//         let diaArr
//         let csArr

//         let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
//         let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

//         if (mtTypeLocal?.length) {
//           metalArr =
//             mtTypeLocal?.filter((ele) => ele?.Metalid == (decodeobj?.m ? decodeobj?.m : (logininfoInside?.MetalId ?? storeinitInside?.MetalId)))[0]
//         }

//         if (diaQcLocal?.length) {
//           diaArr =
//             diaQcLocal?.filter(
//               (ele) =>
//                 ele?.QualityId == (decodeobj?.d ? decodeobj?.d?.split(",")[0] : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid).split(",")[0]) &&
//                 ele?.ColorId == (decodeobj?.d ? decodeobj?.d?.split(",")[1] : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid).split(",")[1])
//             )[0]
//         }

//         if (csQcLocal?.length) {
//           csArr =
//             csQcLocal?.filter(
//               (ele) =>
//                 ele?.QualityId == (decodeobj?.c ? decodeobj?.c?.split(",")[0] : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid).split(",")[0]) &&
//                 ele?.ColorId == (decodeobj?.c ? decodeobj?.c?.split(",")[1] : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid).split(",")[1])
//             )[0]
//         }

//         setSelectMtType(metalArr?.metaltype)

//         setSelectDiaQc(`${diaArr?.Quality},${diaArr?.color}`);

//         setSelectCsQc(`${csArr?.Quality},${csArr?.color}`);

//         // let InitialSize = (singleProd && singleProd.DefaultSize !== "")
//         //                       ? singleProd?.DefaultSize
//         //                       : (SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename === undefined ? SizeCombo?.rd[0]?.sizename : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename)
//         // if(InitialSize){
//         //   setSizeData(InitialSize)
//         // }

//         // if(metalArr || diaArr || csArr || InitialSize){
//         //   setCustomObj({metalArr, diaArr, csArr ,InitialSize})
//         // }

//       }
//     }, 500)
//   }, [singleProd])

//   useEffect(() => {
//     let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
//     let mcArr;

//     if (mtColorLocal?.length) {
//       mcArr =
//         mtColorLocal?.filter(
//           (ele) => ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
//         )[0]
//     }

//     setSelectMtColor(mcArr?.colorname);

//   }, [singleProd])
//   // }, [metalTypeCombo, diaQcCombo, csQcCombo, singleProd])

//   // useEffect(()=>{

//   //   let finalSize = SizeCombo?.rd1?.filter((ele)=>ele?.sizename == sizeData)
//   //   const filteredDataMetal = finalSize?.filter(item => item.DiamondStoneTypeName === "METAL")[0]
//   //   const filteredDataDaimond = finalSize?.filter(item => item.DiamondStoneTypeName === "DIAMOND")
//   //   const filteredDataColorStone = finalSize?.filter(item => item.DiamondStoneTypeName === "COLOR STONE")
//   //   const filteredDataFinding = finalSize?.filter(item => item.DiamondStoneTypeName === "FINDING")

//   //   setMetalFilterData(filteredDataMetal)
//   //   setDaimondFiletrData(filteredDataDaimond)
//   //   setColorStoneFiletrData(filteredDataColorStone)
//   //   setFindingFiletrData(filteredDataFinding)

//   // },[sizeData,SizeCombo])

//   // let metalUpdatedPrice = () => {
//   //   if (metalFilterData && metalFilterData.length && mtrd?.AE === 1) {

//   //     let CalcNetwt = ((mtrd?.I ?? 0) + (metalFilterData?.Weight ?? 0) ?? 0)

//   //     let fprice = ((mtrd?.AD ?? 0) * CalcNetwt) + ((mtrd?.AC ?? 0) * CalcNetwt)
//   //     console.log('fpricemetal', fprice);

//   //     return Number(fprice.toFixed(2))
//   //   } else {
//   //     return 0
//   //   }
//   // }

//   // let diaUpdatedPrice = () => {

//   //   if (daimondFilterData && daimondFilterData?.length && diard1[0]?.T === 1) {
//   //     let calcDiaWt = (mtrd?.K ?? 0) + (daimondFilterData?.Weight ?? 0)

//   //     let CalcPics = (mtrd?.J ?? 0) + (daimondFilterData?.pieces ?? 0)

//   //     let fpprice = ((dqcRate ?? 0) * (calcDiaWt ?? 0)) + ((dqcSettRate ?? 0) * (CalcPics ?? 0))

//   //     return Number(fpprice.toFixed(2))
//   //   }
//   //   else {
//   //     return 0
//   //   }
//   // }

//   // let colUpdatedPrice = () => {

//   //   if (colorStoneFilterData && colorStoneFilterData?.length && csrd2[0]?.T === 1) {

//   //     let calcDiaWt = (singleProd?.totalcolorstoneweight ?? 0) + (colorStoneFilterData?.Weight ?? 0)

//   //     let CalcPics = (singleProd?.totalcolorstonepcs ?? 0) + (colorStoneFilterData?.pieces ?? 0)

//   //     let fpprice = ((csqcRate ?? 0) * (calcDiaWt ?? 0)) + ((csqcSettRate ?? 0) * (CalcPics ?? 0))

//   //     return Number(fpprice.toFixed(2))
//   //   } else {
//   //     return 0
//   //   }
//   // }

//   const callAllApi = () => {
//     let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
//     let diaQcLocal = JSON.parse(
//       sessionStorage.getItem("diamondQualityColorCombo")
//     );
//     let csQcLocal = JSON.parse(
//       sessionStorage.getItem("ColorStoneQualityColorCombo")
//     );
//     let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));

//     if (!mtTypeLocal || mtTypeLocal?.length === 0) {
//       MetalTypeComboAPI(cookie)
//         .then((response) => {
//           if (response?.Data?.rd) {
//             let data = response?.Data?.rd;
//             sessionStorage.setItem("metalTypeCombo", JSON.stringify(data));
//             setMetalTypeCombo(data);
//           }
//         })
//         .catch((err) => console.log(err));
//     } else {
//       setMetalTypeCombo(mtTypeLocal);
//     }

//     if (!diaQcLocal || diaQcLocal?.length === 0) {
//       DiamondQualityColorComboAPI()
//         .then((response) => {
//           if (response?.Data?.rd) {
//             let data = response?.Data?.rd;
//             sessionStorage.setItem(
//               "diamondQualityColorCombo",
//               JSON.stringify(data)
//             );
//             setDiaQcCombo(data);
//           }
//         })
//         .catch((err) => console.log(err));
//     } else {
//       setDiaQcCombo(diaQcLocal);
//     }

//     if (!csQcLocal || csQcLocal?.length === 0) {
//       ColorStoneQualityColorComboAPI()
//         .then((response) => {
//           if (response?.Data?.rd) {
//             let data = response?.Data?.rd;
//             sessionStorage.setItem(
//               "ColorStoneQualityColorCombo",
//               JSON.stringify(data)
//             );
//             setCsQcCombo(data);
//           }
//         })
//         .catch((err) => console.log(err));
//     } else {
//       setCsQcCombo(csQcLocal);
//     }

//     if (!mtColorLocal || mtColorLocal?.length === 0) {
//       MetalColorCombo(cookie)
//         .then((response) => {
//           if (response?.Data?.rd) {
//             let data = response?.Data?.rd;
//             sessionStorage.setItem("MetalColorCombo", JSON.stringify(data));
//             setMetalColorCombo(data);
//           }
//         })
//         .catch((err) => console.log(err));
//     } else {
//       setMetalColorCombo(mtColorLocal);
//     }
//   };

//   useEffect(() => {
//     const logininfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//     setLoginInfo(logininfo);
//   }, []);

//   useEffect(() => {
//     callAllApi();
//   }, [storeInit]);

//   useEffect(() => {
//     let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
//     if (storeinit) setStoreInit(storeinit);
//   }, []);

//   const decodeAndDecompress = (encodedString) => {
//     try {
//       const binaryString = atob(encodedString);

//       const uint8Array = new Uint8Array(binaryString.length);
//       for (let i = 0; i < binaryString.length; i++) {
//         uint8Array[i] = binaryString.charCodeAt(i);
//       }

//       const decompressed = Pako.inflate(uint8Array, { to: "string" });

//       const jsonObject = JSON.parse(decompressed);

//       return jsonObject;
//     } catch (error) {
//       console.error("Error decoding and decompressing:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     let navVal = location?.search.split("?p=")[1];

//     let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
//     let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

//     let decodeobj = decodeAndDecompress(navVal);
//     let alName = ''

//     if (decodeobj) {
//       setDecodeUrl(decodeobj);
//       alName = decodeobj?.n
//     }

//     let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

//     let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));

//     let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));

//     let metalArr;
//     let diaArr;
//     let csArr;

//     if (mtTypeLocal?.length) {
//       metalArr =
//         mtTypeLocal?.filter(
//           (ele) => ele?.Metalid == decodeobj?.m
//         )[0]?.Metalid
//     }

//     if (diaQcLocal) {
//       diaArr =
//         diaQcLocal?.filter(
//           (ele) =>
//             ele?.QualityId == decodeobj?.d?.split(",")[0] &&
//             ele?.ColorId == decodeobj?.d?.split(",")[1]
//         )[0]
//     }

//     if (csQcLocal) {
//       csArr =
//         csQcLocal?.filter(
//           (ele) =>
//             ele?.QualityId == decodeobj?.c?.split(",")[0] &&
//             ele?.ColorId == decodeobj?.c?.split(",")[1]
//         )[0]
//     }

//     const FetchProductData = async () => {

//       // let obj={
//       //   mt: metalArr,
//       //   diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
//       //   csQc: `${csArr?.QualityId},${csArr?.ColorId}`,
//       // }

//       let obj = {
//         mt: metalArr ? metalArr : (logininfoInside?.MetalId ?? storeinitInside?.MetalId),
//         diaQc: diaArr ? `${diaArr?.QualityId},${diaArr?.ColorId}` : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid),
//         csQc: csArr ? `${csArr?.QualityId},${csArr?.ColorId}` : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid)
//       }

//       setProdLoading(true)

//       setisPriceLoading(true)

//       await SingleProdListAPI(decodeobj, sizeData, obj, cookie, alName)
//         .then(async (res) => {
//           if (res) {

//             setSingleProd(res?.pdList[0]);

//             if (res?.pdList?.length > 0) {
//               setisPriceLoading(false)
//               // setIsImageLoad(false)
//               // setSelectedThumbImg({
//               //   link: "",
//               //   type: "img",
//               // });
//               setProdLoading(false)
//             }

//             if (!res?.pdList[0]) {
//               setisPriceLoading(false)
//               setProdLoading(false)
//               setIsDataFound(true)
//             } else {
//               setIsDataFound(false)
//             }

//             setDiaList(res?.pdResp?.rd3)
//             setCsList(res?.pdResp?.rd4)

//             let prod = res?.pdList[0]

//             let initialsize = (prod && prod.DefaultSize !== "")
//               ? prod?.DefaultSize
//               : (SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename === undefined
//                 ? SizeCombo?.rd[0]?.sizename : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename)
//             setSizeData(initialsize)

//             // await SingleFullProdPriceAPI(decodeobj).then((res) => {
//             //   setSingleProdPrice(res);
//             //   console.log("singlePrice", res);
//             // });
//           }
//           return res;
//         }).then(async (resp) => {
//           if (resp) {
//             await getSizeData(resp?.pdList[0], cookie).then((res) => {
//               // console.log("Sizeres",res)
//               setSizeCombo(res?.Data)
//             }).catch((err) => console.log("SizeErr", err))

//             if (storeinitInside?.IsStockWebsite === 1) {
//               await StockItemApi(resp?.pdList[0]?.autocode, "stockitem", cookie).then((res) => {
//                 setStockItemArr(res?.Data?.rd)
//               }).catch((err) => console.log("stockItemErr", err))
//             }

//             if (storeinitInside?.IsProductDetailSimilarDesign === 1) {
//               await StockItemApi(resp?.pdList[0]?.autocode, "similarbrand", obj, cookie).then((res) => {
//                 setSimilarBrandArr(res?.Data?.rd)
//               }).catch((err) => console.log("similarbrandErr", err))
//             }

//             if (storeinitInside?.IsProductDetailDesignSet === 1) {
//               await DesignSetListAPI(obj, resp?.pdList[0]?.designno, cookie).then((res) => {
//                 // console.log("designsetList",res?.Data?.rd[0])
//                 setDesignSetList(res?.Data?.rd)
//               }).catch((err) => console.log("designsetErr", err))
//             }
//           }
//         })
//         .catch((err) => console.log("err", err))
//         .finally(() => {
//           setIsImageLoad(false);
//           setProdLoading(false);
//         });
//     }

//     const productlistDataFetch20 = async () => {
//       let obj = { mt: decodeobj?.m, dia: decodeobj?.d, cs: decodeobj?.c };

//       console.log("detailparam", {}, 1, obj, decodeobj?.pl, cookie, decodeobj?.sb, {}, {}, {}, "", decodeobj?.b, decodeobj?.n);

//       await ProductListApi({}, 1, obj, decodeobj?.pl, cookie, decodeobj?.sb, {}, {}, {}, "", decodeobj?.b, decodeobj?.n)
//         .then((res) => {
//           if (res) {
//             console.log("productList", res);
//             setAlbumView(res?.pdList)
//           }
//           return res;
//         }).catch((err) => console.log("err", err));

//     }

//     FetchProductData()
//     productlistDataFetch20()

//     window.scroll({
//       top: 0,
//       behavior: "smooth",
//     });

//   }, [location?.key]);

//   console.log("decodeurl", decodeUrl);

//   // useEffect(() => {
//   //   let metal = metalTypeCombo?.filter(
//   //     (ele) => ele?.metaltype == selectMtType
//   //   )[0];
//   //   let dia = diaQcCombo?.filter(
//   //     (ele) =>
//   //       ele?.Quality == selectDiaQc.split(",")[0] &&
//   //       ele?.color == selectDiaQc.split(",")[1]
//   //   )[0];
//   //   let cs = csQcCombo?.filter(
//   //     (ele) =>
//   //       ele?.Quality == selectCsQc.split(",")[0] &&
//   //       ele?.color == selectCsQc.split(",")[1]
//   //   )[0];

//   //   let metalPdata = singleProdPrice?.rd?.filter(
//   //     (ele) => ele?.C == metal?.Metalid
//   //   )[0];

//   //   let diaPData = singleProdPrice?.rd1?.filter(
//   //     (ele) => ele?.G == dia?.QualityId && ele?.I == dia?.ColorId
//   //   );

//   //   let csPData = singleProdPrice?.rd2?.filter(
//   //     (ele) => ele?.G == cs?.QualityId && ele?.I == cs?.ColorId
//   //   );

//   //   let metalPrice = 0;
//   //   let diamondPrice = 0;
//   //   let csPrice = 0;

//   //   if (metalPdata) {
//   //     setMtrd(metalPdata);
//   //     metalPrice =
//   //       ((metalPdata?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
//   //         (metalPdata?.W ?? 0) +
//   //         (metalPdata?.X ?? 0) ?? 0;
//   //   }

//   //   console.log("metalPdata", metalPrice);

//   //   if (diaPData?.length > 0) {
//   //     setDiard1(diaPData);
//   //     let diasetRate = diard1?.reduce((acc, obj) => acc + obj.O, 0)
//   //     let diaSettRate = diard1?.reduce((acc, obj) => acc + obj.Q, 0)
//   //     setDqcRate(diasetRate ?? 0)
//   //     setDqcSettRate(diaSettRate ?? 0)
//   //     diamondPrice =
//   //       Number(diaPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;
//   //   }

//   //   if (csPData?.length > 0) {
//   //     setCsrd2(csPData);
//   //     let csRate = csrd2?.reduce((acc, obj) => acc + obj.O, 0)
//   //     let csSettRate = csrd2?.reduce((acc, obj) => acc + obj.Q, 0)
//   //     setCsqcRate(csRate ?? 0)
//   //     setCsqcSettRate(csSettRate ?? 0)
//   //     csPrice = Number(csPData?.reduce((acc, obj) => acc + obj.S, 0)) ?? 0;
//   //   }

//   //   let finalPrice =
//   //     Number(metalPrice) + Number(diamondPrice)  + Number(csPrice);
//   //   console.log("pData", { metalPrice, diamondPrice, csPrice });

//   //   let fp = finalPrice.toFixed(2)
//   //   setFinalprice(fp)
//   // }, [singleProd, singleProdPrice, selectMtType, selectDiaQc, selectCsQc]);

//   // const handlePrice = () =>{

//   //   let finalSize = SizeCombo?.rd?.filter((ele)=>ele?.sizename == sizeData)[0]

//   //   if(finalSize?.IsMarkUpInAmount == 1){

//   //     let ultimatePrice = (Number(finalprice)+ metalUpdatedPrice() + diaUpdatedPrice() + colUpdatedPrice())

//   //     console.log("ultimatePrice",(mtrd?.AB ?? 0) , ultimatePrice , mtrd?.AA , ((finalSize?.MarkUp ?? 0) / mtrd?.AA ));

//   //     return PriceWithMarkupFunction((mtrd?.AB ?? 0) , ultimatePrice , mtrd?.AA , ((finalSize?.MarkUp ?? 0) / mtrd?.AA ))

//   //   }else{

//   //     let finalSize = SizeCombo?.rd?.filter((ele)=>ele?.sizename == sizeData)[0]
//   //     const percentMarkupPlus = (mtrd?.AB ?? 0) + (finalSize?.MarkUp ?? 0)
//   //     let ultimatePrice = (Number(finalprice) + metalUpdatedPrice() + diaUpdatedPrice() + colUpdatedPrice())

//   //     console.log("ultimatePrice",percentMarkupPlus, ultimatePrice , mtrd?.AA);

//   //     return PriceWithMarkupFunction(percentMarkupPlus, ultimatePrice , mtrd?.AA )
//   //   }

//   // }

//   function checkImageAvailability(imageUrl) {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => resolve(true);
//       img.onerror = () => resolve(false);
//       img.src = imageUrl;
//     });
//   }

//   const ProdCardImageFunc = async () => {
//     let finalprodListimg;
//     let pdImgList = [];
//     let pdvideoList = [];

//     let pd = singleProd;

//     let colImg;

//     let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
//     let mcArr;

//     if (mtColorLocal?.length) {
//       mcArr =
//         mtColorLocal?.filter(
//           (ele) => ele?.id == singleProd?.MetalColorid
//         )[0]
//     }

//     if (singleProd?.ColorImageCount > 0) {
//       for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
//         let imgString =
//           storeInit?.CDNDesignImageFol +
//           singleProd?.designno +
//           "~" +
//           i +
//           "_" + mcArr?.colorcode +
//           "." +
//           singleProd?.ImageExtension;

//         let IsImg = checkImageAvailability(imgString)
//         if (IsImg) {
//           pdImgList.push(imgString);
//         }
//       }

//       if (pdImgList?.length > 0) {
//         colImg = pdImgList[0]
//       }
//     }

//     let IsColImg = false;
//     if (colImg?.length > 0) {
//       IsColImg = await checkImageAvailability(colImg)
//     }

//     if (pd?.ImageCount > 0 && !IsColImg) {
//       for (let i = 1; i <= pd?.ImageCount; i++) {
//         let imgString =
//           storeInit?.CDNDesignImageFol +
//           pd?.designno +
//           "~" +
//           i +
//           "." +
//           pd?.ImageExtension;

//         let IsImg = checkImageAvailability(imgString)
//         if (IsImg) {
//           pdImgList.push(imgString);
//         }
//       }
//     } else {
//       finalprodListimg = imageNotFound;
//     }

//     if (pd?.VideoCount > 0) {
//       for (let i = 1; i <= pd?.VideoCount; i++) {
//         let videoString =
//           (storeInit?.CDNDesignImageFol).slice(0, -13) +
//           "video/" +
//           pd?.designno +
//           "~" +
//           i +
//           "." +
//           pd?.VideoExtension;
//         pdvideoList.push(videoString);
//       }
//     }
//     else {
//       pdvideoList = [];
//     }

//     let FinalPdImgList = [];

//     if (pdImgList?.length > 0) {
//       for (let i = 0; i < pdImgList?.length; i++) {
//         let isImgAvl = await checkImageAvailability(pdImgList[i])
//         if (isImgAvl) {
//           FinalPdImgList.push(pdImgList[i])
//         }
//       }
//     }

//     if (FinalPdImgList?.length > 0) {
//       finalprodListimg = FinalPdImgList[0];
//       setSelectedThumbImg({ "link": FinalPdImgList[0], "type": 'img' });
//       setPdThumbImg(FinalPdImgList);
//       setThumbImgIndex(0)
//     }

//     if (pdvideoList?.length > 0) {
//       setPdVideoArr(pdvideoList);
//     } else {
//       setPdVideoArr([]);
//     }

//     return finalprodListimg;

//   };

//   useEffect(() => {
//     ProdCardImageFunc();
//   }, [singleProd, location?.key]);

//   useEffect(() => {
//     if (isImageload === false) {
//       if (!(pdThumbImg?.length !== 0 || pdVideoArr?.length !== 0)) {
//         setSelectedThumbImg({ "link": imageNotFound, "type": 'img' });
//         // setIsImageLoad(false)
//       }
//     }
//   }, [isImageload])

//   const decodeEntities = (html) => {
//     var txt = document.createElement("textarea");
//     txt.innerHTML = html;
//     return txt.value;
//   };

//   // function checkImageAvailability(imageUrl) {
//   //   return new Promise((resolve, reject) => {
//   //     const img = new Image();
//   //     img.onload = () => resolve(true);
//   //     img.onerror = () => resolve(false);
//   //     img.src = imageUrl;
//   //   });
//   // }

//   const metalColorName = () => {
//     let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
//     let mcArr;

//     if (mtColorLocal?.length) {
//       mcArr =
//         mtColorLocal?.filter(
//           (ele) => ele?.colorcode == selectMtColor
//         )[0]
//     }

//     return mcArr?.metalcolorname
//   }

//   const handleMetalWiseColorImg = async (e) => {

//     let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
//     let mcArr;

//     if (mtColorLocal?.length) {
//       mcArr =
//         mtColorLocal?.filter(
//           (ele) => ele?.colorcode == e.target.value
//         )[0]
//     }

//     setSelectMtColor(e.target.value)

//     let imgLink = storeInit?.CDNDesignImageFol +
//       (singleProd ?? singleProd1)?.designno +
//       "~" +
//       (thumbImgIndex + 1) + "~" + mcArr?.colorcode +
//       "." +
//       (singleProd ?? singleProd1)?.ImageExtension;

//     // setMetalWiseColorImg(imgLink)

//     let isImg = await checkImageAvailability(imgLink)

//     if (isImg) {
//       setMetalWiseColorImg(imgLink)
//     } else {
//       setMetalWiseColorImg()
//     }

//     let pd = singleProd;
//     let pdImgListCol = [];
//     let pdImgList = [];

//     if (singleProd?.ColorImageCount > 0) {
//       for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
//         let imgString =
//           storeInit?.CDNDesignImageFol +
//           singleProd?.designno +
//           "~" +
//           i +
//           "~" + mcArr?.colorcode +
//           "." +
//           singleProd?.ImageExtension;
//         pdImgListCol.push(imgString);
//       }
//     }

//     if (singleProd?.ImageCount > 0) {
//       for (let i = 1; i <= singleProd?.ImageCount; i++) {
//         let imgString =
//           storeInit?.CDNDesignImageFol +
//           singleProd?.designno +
//           "~" +
//           i +
//           "." +
//           singleProd?.ImageExtension;
//         pdImgList.push(imgString);
//       }
//     }

//     let isImgCol;

//     if (pdImgListCol?.length > 0) {
//       isImgCol = await checkImageAvailability(pdImgListCol[0])
//     }

//     let FinalPdColImgList = [];

//     if (pdImgListCol?.length > 0) {
//       for (let i = 0; i < pdImgListCol?.length; i++) {
//         let isImgAvl = await checkImageAvailability(pdImgListCol[i])
//         if (isImgAvl) {
//           FinalPdColImgList.push(pdImgListCol[i])
//         } else {
//           FinalPdColImgList.push(imageNotFound)
//         }
//       }
//     }

//     if (FinalPdColImgList?.length > 0 && (isImgCol == true)) {
//       setPdThumbImg(FinalPdColImgList)
//       setSelectedThumbImg({ "link": FinalPdColImgList[thumbImgIndex], "type": 'img' });
//       setThumbImgIndex(thumbImgIndex)

//     }
//     else {
//       if (pdImgList?.length > 0) {
//         setSelectedThumbImg({ "link": pdImgList[thumbImgIndex], "type": 'img' });
//         setPdThumbImg(pdImgList)
//         setThumbImgIndex(thumbImgIndex)
//       }
//     }

//     // console.log("pdImgList",pdImgList,pdImgListCol)
//   }

//   // useEffect(()=>{

//   //  StockItemApi(singleProd?.autocode,"stockitem").then((res)=>{

//   //   setStockItemArr(res?.Data?.rd)

//   // }).catch((err)=>console.log("stockItemErr",err))

//   // },[singleProd])

//   // useEffect(()=>{

//   //  StockItemApi(singleProd?.autocode,"similarbrand").then((res)=>{

//   //   setSimilarBrandArr(res?.Data?.rd)

//   // }).catch((err)=>console.log("similarbrandErr",err))

//   // },[singleProd])

//   // console.log("stock",stockItemArr,SimilarBrandArr);

//   const handleCartandWish = (e, ele, type) => {
//     // console.log("event", e.target.checked, ele, type);
//     let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

//     let prodObj = {
//       "StockId": ele?.StockId,
//       // "autocode": ele?.autocode,
//       // "Metalid": ele?.MetalPurityid,
//       // "MetalColorId": ele?.MetalColorid,
//       // "DiaQCid": loginInfo?.cmboDiaQCid,
//       // "CsQCid": loginInfo?.cmboCSQCid,
//       // "Size": ele?.Size,
//       "Unitcost": ele?.Amount,
//       // "UnitCostWithmarkup": ele?.Amount,
//       // "Remark": ""
//     }

//     if (e.target.checked == true) {
//       CartAndWishListAPI(type, prodObj, cookie).then((res) => {
//         let cartC = res?.Data?.rd[0]?.Cartlistcount
//         let wishC = res?.Data?.rd[0]?.Wishlistcount
//         setWishCountVal(wishC)
//         setCartCountVal(cartC);
//       }).catch((err) => console.log("err", err))
//     } else {
//       RemoveCartAndWishAPI(type, ele?.StockId, cookie, true).then((res) => {
//         let cartC = res?.Data?.rd[0]?.Cartlistcount
//         let wishC = res?.Data?.rd[0]?.Wishlistcount
//         setWishCountVal(wishC)
//         setCartCountVal(cartC);
//       }).catch((err) => console.log("err", err))
//     }

//     if (type === "Cart") {
//       setCartArr((prev) => ({
//         ...prev,
//         [ele?.StockId]: e.target.checked
//       }))
//     }

//   }

//   const compressAndEncode = (inputString) => {
//     try {
//       const uint8Array = new TextEncoder().encode(inputString);

//       const compressed = Pako.deflate(uint8Array, { to: 'string' });

//       return btoa(String.fromCharCode.apply(null, compressed));
//     } catch (error) {
//       console.error('Error compressing and encoding:', error);
//       return null;
//     }
//   };

//   const handleMoveToDetail = (productData) => {

//     let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

//     let obj = {
//       a: productData?.autocode,
//       b: productData?.designno,
//       m: loginInfo?.MetalId,
//       d: loginInfo?.cmboDiaQCid,
//       c: loginInfo?.cmboCSQCid,
//       f: {}
//     }

//     let encodeObj = compressAndEncode(JSON.stringify(obj))

//     navigate(`/d/${productData?.TitleLine?.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""}${productData?.designno}?p=${encodeObj}`)

//   }

//   const handleCustomChange = async (e, type) => {

//     let metalArr
//     let diaArr
//     let csArr
//     let size

//     let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

//     let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));

//     let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));

//     if (type === "mt") {
//       metalArr =
//         mtTypeLocal?.filter(
//           (ele) => ele?.metaltype == e.target.value
//         )[0]?.Metalid
//       setSelectMtType(e.target.value)
//     }
//     if (type === "dia") {
//       setSelectDiaQc(e.target.value)
//       diaArr =
//         diaQcLocal?.filter(
//           (ele) =>
//             ele?.Quality == e.target.value?.split(",")[0] &&
//             ele?.color == e.target.value?.split(",")[1]
//         )[0]
//     }
//     if (type === "cs") {
//       setSelectCsQc(e.target.value)
//       csArr =
//         csQcLocal?.filter(
//           (ele) =>
//             ele?.Quality == e.target.value?.split(",")[0] &&
//             ele?.color == e.target.value?.split(",")[1]
//         )[0]
//     }
//     if (type === "sz") {
//       setSizeData(e.target.value)
//       size = e.target.value
//     }

//     if (metalArr == undefined) {
//       metalArr =
//         mtTypeLocal?.filter(
//           (ele) => ele?.metaltype == selectMtType
//         )[0]?.Metalid
//     }

//     if (diaArr == undefined) {
//       diaArr =
//         diaQcLocal?.filter(
//           (ele) =>
//             ele?.Quality == selectDiaQc?.split(",")[0] &&
//             ele?.color == selectDiaQc?.split(",")[1]
//         )[0]
//     }

//     if (csArr == undefined) {
//       csArr =
//         csQcLocal?.filter(
//           (ele) =>
//             ele?.Quality == selectCsQc?.split(",")[0] &&
//             ele?.color == selectCsQc?.split(",")[1]
//         )[0]
//     }

//     let obj = {
//       mt: metalArr ?? 0,
//       diaQc: `${diaArr?.QualityId ?? 0},${diaArr?.ColorId ?? 0}`,
//       csQc: `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`
//     }

//     let prod = {
//       a: singleProd?.autocode,
//       b: singleProd?.designno
//     }

//     // console.log("eeee",obj)
//     setisPriceLoading(true)
//     await SingleProdListAPI(prod, (size ?? sizeData), obj, cookie)
//       .then((res) => {
//         setSingleProd1(res?.pdList[0])

//         if (res?.pdList?.length > 0) {
//           setisPriceLoading(false)
//         }
//         setDiaList(res?.pdResp?.rd3)
//         setCsList(res?.pdResp?.rd4)
//         // console.log("res123",res)
//       }).catch((err) => { console.log("customProdDetailErr", err) })

//   }

//   const formatter = new Intl.NumberFormat('en-IN')

//   const SizeSorting = (SizeArr) => {

//     let SizeSorted = SizeArr?.sort((a, b) => {
//       const nameA = parseInt(a?.sizename?.toUpperCase()?.slice(0, -2), 10);
//       const nameB = parseInt(b?.sizename?.toUpperCase()?.slice(0, -2), 10);

//       return nameA - nameB;
//     })

//     return SizeSorted

//   }

//   return (
//     <>
//       <Helmet>
//         <title>{`${singleProd?.TitleLine ?? "loading..."} ${singleProd?.TitleLine?.length > 0 ? '-' : ''} ${singleProd?.designno ?? ''}`}</title>
//       </Helmet>
//       <div className="proCat_prodDetail_bodyContain">
//         <div className="proCat_prodDetail_outerContain">
//           <div className="proCat_prodDetail_whiteInnerContain">
//             {isDataFound ? (
//               <div
//                 style={{
//                   height: "90vh",
//                   justifyContent: "center",
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//                 className="proCat_prodd_datanotfound"
//               >
//                 Data not Found!!
//               </div>
//             ) : (
//               <>
//                 <div className="proCat_prod_detail_main">
//                   <IoArrowBack
//                     style={{
//                       height: "35px",
//                       width: "35px",
//                       margin: '20px 0px 0px 50px',
//                       cursor: "pointer",
//                       color: "rgba(143, 140, 139, 0.9019607843)",
//                     }}
//                     onClick={() => navigate(-1)}
//                   />
//                   <div className="proCat_prod_image_shortInfo">
//                     {/* <div>
//                       <span>{"<"}</span>
//                     </div> */}

//                     <div className="proCat_prod_image_Sec">
//                       {/* {isImageload && ( */}
//                       {isImageload && (
//                         <Skeleton
//                           sx={{
//                             width: "95%",
//                             height: "750px",
//                             margin: "20px 0 0 0"
//                           }}
//                           variant="rounded"
//                         />
//                       )}

//                       <div
//                         className="proCat_main_prod_img"
//                         style={{ display: isImageload ? "none" : "block" }}
//                       >
//                         {(selectedThumbImg?.type == "img") ? (
//                           <img
//                             src={selectedThumbImg?.link}
//                             // src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : imageNotFound}
//                             // src={metalWiseColorImg ? metalWiseColorImg : (selectedThumbImg?.link ?? imageNotFound) }
//                             onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
//                             alt={""}
//                             onLoad={() => setIsImageLoad(false)}
//                             className="proCat_prod_img"
//                           />
//                         ) : (
//                           <div className="proCat_prod_video">
//                             <video
//                               src={pdVideoArr?.length > 0 ? selectedThumbImg?.link : imageNotFound}
//                               loop={true}
//                               autoPlay={true}
//                               style={{
//                                 width: "100%",
//                                 objectFit: "cover",
//                                 marginTop: "40px",
//                                 // height: "90%",
//                                 borderRadius: "8px",
//                               }}
//                             />
//                           </div>
//                         )}

//                         <div className="proCat_thumb_prod_img">
//                           {(pdThumbImg?.length > 1 || pdVideoArr?.length > 0) &&
//                             pdThumbImg?.map((ele, i) => (
//                               <img
//                                 src={ele}
//                                 alt={""}
//                                 onLoad={() => setIsImageLoad(false)}
//                                 className="proCat_prod_thumb_img"
//                                 onClick={() => {
//                                   setSelectedThumbImg({
//                                     link: ele,
//                                     type: "img",
//                                   });
//                                   setThumbImgIndex(i);
//                                 }}
//                               />
//                             ))}
//                           {pdVideoArr?.map((data) => (
//                             <div
//                               style={{
//                                 position: "relative",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                               }}
//                               onClick={() =>
//                                 setSelectedThumbImg({ link: data, type: "vid" })
//                               }
//                             >
//                               <video
//                                 src={data}
//                                 autoPlay={true}
//                                 loop={true}
//                                 className="proCat_prod_thumb_img"
//                                 style={{ height: "70px", objectFit: "cover" }}
//                               />
//                               <IoIosPlayCircle
//                                 style={{
//                                   position: "absolute",
//                                   color: "white",
//                                   width: "35px",
//                                   height: "35px",
//                                 }}
//                               />
//                             </div>
//                           ))}
//                           {/* <div className="proCat_thumb_prod_img">

//                       </div> */}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="proCat_prod_shortInfo">
//                       <div className="proCat_prod_shortInfo_inner">
//                         <p className="proCat_prod_titleLine">
//                           {singleProd?.TitleLine}
//                         </p>
//                         <div className="proCat_prod_summury_info">
//                           <div className="proCat_prod_summury_info_inner">
//                             <span className="proCat_single_prod_designno">
//                               {singleProd?.designno}
//                             </span>
//                             <span className="proCat_prod_short_key">
//                               Metal Purity :{" "}
//                               <span className="proCat_prod_short_val">
//                                 {selectMtType}
//                               </span>
//                             </span>
//                             <span className="proCat_prod_short_key">
//                               Metal Color :{" "}
//                               <span className="proCat_prod_short_val">
//                                 {metalColorName()}
//                               </span>
//                             </span>
//                             {(storeInit?.IsDiamondCustomization === 1 &&
//                               diaQcCombo?.length > 0 && diaList?.length) ? <span className="proCat_prod_short_key">
//                               Diamond Quality Color :{" "}
//                               <span className="proCat_prod_short_val">
//                                 {`${selectDiaQc}`}
//                               </span>
//                             </span> : null}
//                             <span className="proCat_prod_short_key">
//                               Net Wt :{" "}
//                               <span className="proCat_prod_short_val">
//                                 {(singleProd1?.Nwt ?? singleProd?.Nwt)?.toFixed(3)}
//                               </span>
//                             </span>
//                           </div>
//                         </div>
//                         {storeInit?.IsProductWebCustomization == 1 &&
//                           metalTypeCombo?.length > 0 && storeInit?.IsMetalCustomization === 1 && (
//                             <div className="proCat_single_prod_customize">
//                               <div className="proCat_single_prod_customize_metal">
//                                 <label className="menuItemTimeEleveDeatil">
//                                   METAL TYPE:
//                                 </label>
//                                 {singleProd?.IsMrpBase == 1 ? (
//                                   <span className="menuitemSelectoreMain">
//                                     {
//                                       metalTypeCombo?.filter(
//                                         (ele) =>
//                                           ele?.Metalid ==
//                                           singleProd?.MetalPurityid
//                                       )[0]?.metaltype
//                                     }
//                                   </span>
//                                 ) : (
//                                   <select
//                                     className="menuitemSelectoreMain"
//                                     value={selectMtType}
//                                     onChange={(e) =>
//                                       handleCustomChange(e, "mt")
//                                     }
//                                   // onChange={(e) => setSelectMtType(e.target.value)}
//                                   >
//                                     {metalTypeCombo.map((ele) => (
//                                       <option
//                                         key={ele?.Metalid}
//                                         value={ele?.metaltype}
//                                       >
//                                         {ele?.metaltype}
//                                       </option>
//                                     ))}
//                                   </select>
//                                 )}
//                               </div>
//                               {metalColorCombo?.length > 0 && storeInit?.IsMetalTypeWithColor === 1 && (
//                                 <div className="proCat_single_prod_customize_outer">
//                                   <label className="menuItemTimeEleveDeatil">
//                                     METAL COLOR:
//                                   </label>
//                                   {singleProd?.IsMrpBase == 1 ? (
//                                     <span className="menuitemSelectoreMain">
//                                       {
//                                         metalColorCombo?.filter(
//                                           (ele) =>
//                                             ele?.id == singleProd?.MetalColorid
//                                         )[0]?.metalcolorname
//                                       }
//                                     </span>
//                                   ) : (
//                                     <select
//                                       className="menuitemSelectoreMain"
//                                       value={selectMtColor}
//                                       onChange={(e) =>
//                                         handleMetalWiseColorImg(e)
//                                       }
//                                     >
//                                       {metalColorCombo?.map((ele) => (
//                                         <option
//                                           key={ele?.id}
//                                           value={ele?.colorcode}
//                                         >
//                                           {ele?.metalcolorname}
//                                         </option>
//                                       ))}
//                                     </select>
//                                   )}
//                                 </div>
//                               )}
//                               {(storeInit?.IsDiamondCustomization === 1 &&
//                                 diaQcCombo?.length > 0 && diaList?.length) ? (
//                                 <div className="proCat_single_prod_customize_outer">
//                                   <label className="menuItemTimeEleveDeatil">
//                                     DIAMOND :
//                                   </label>
//                                   {singleProd?.IsMrpBase == 1 ?
//                                     (
//                                       <span className="menuitemSelectoreMain">
//                                         {singleProd?.DiaQuaCol}
//                                       </span>
//                                     )
//                                     :
//                                     <select
//                                       className="menuitemSelectoreMain"
//                                       value={selectDiaQc}
//                                       // onChange={(e) => setSelectDiaQc(e.target.value)}
//                                       onChange={(e) =>
//                                         handleCustomChange(e, "dia")
//                                       }
//                                     >
//                                       {diaQcCombo.map((ele) => (
//                                         <option
//                                           key={ele?.QualityId}
//                                           value={`${ele?.Quality},${ele?.color}`}
//                                         >{`${ele?.Quality},${ele?.color}`}</option>
//                                       ))}
//                                     </select>
//                                   }
//                                 </div>
//                               ) : null}
//                               {(storeInit?.IsCsCustomization === 1 &&
//                                 selectCsQc?.length > 0 && csList?.filter((ele) => ele?.D !== "MISC")?.length > 0) ? (
//                                 <div className="proCat_single_prod_customize_outer">
//                                   <label className="menuItemTimeEleveDeatil">
//                                     COLOR STONE :
//                                   </label>
//                                   {singleProd?.IsMrpBase == 1 ? (
//                                     <span className="menuitemSelectoreMain">
//                                       {singleProd?.CsQuaCol}
//                                     </span>
//                                   ) :
//                                     <select
//                                       className="menuitemSelectoreMain"
//                                       value={selectCsQc}
//                                       onChange={(e) =>
//                                         handleCustomChange(e, "cs")
//                                       }
//                                     >
//                                       {csQcCombo.map((ele) => (
//                                         <option
//                                           key={ele?.QualityId}
//                                           value={`${ele?.Quality},${ele?.color}`}
//                                         >{`${ele?.Quality},${ele?.color}`}</option>
//                                       ))}
//                                     </select>}
//                                 </div>
//                               ) : null}
//                               {/* {console.log("sizeData",SizeCombo?.find((size) => size.IsDefaultSize === 1)?.sizename)} */}
//                               {SizeSorting(SizeCombo?.rd)?.length > 0 && singleProd?.DefaultSize !== "" && (
//                                 <div className="proCat_single_prod_customize_outer">
//                                   <label className="menuItemTimeEleveDeatil">
//                                     SIZE:
//                                   </label>
//                                   {singleProd?.IsMrpBase == 1 ? (
//                                     <span className="menuitemSelectoreMain">
//                                       {singleProd?.DefaultSize}
//                                     </span>
//                                   ) : (
//                                     <select
//                                       className="menuitemSelectoreMain"
//                                       value={sizeData}
//                                       // onChange={(e) => {
//                                       //   setSizeData(e.target.value);
//                                       // }}
//                                       onChange={(e) =>
//                                         handleCustomChange(e, "sz")
//                                       }
//                                     >
//                                       {SizeCombo?.rd?.map((ele) => (
//                                         <option
//                                           value={ele?.sizename}
//                                           // selected={
//                                           //   singleProd && singleProd.DefaultSize === ele.sizename
//                                           // }
//                                           key={ele?.id}
//                                         >
//                                           {ele?.sizename}
//                                         </option>
//                                       ))}
//                                     </select>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           )}

//                         {storeInit?.IsPriceShow == 1 && (
//                           storeInit?.IsPriceBreakUp == 1 && singleProd1?.IsMrpBase !== 1 && singleProd?.IsMrpBase !== 1 &&
//                           <Accordion
//                             elevation={0}
//                             sx={{
//                               borderBottom: "1px solid #c7c8c9",
//                               borderRadius: 0,
//                               "&.MuiPaper-root.MuiAccordion-root:last-of-type":
//                               {
//                                 borderBottomLeftRadius: "0px",
//                                 borderBottomRightRadius: "0px",
//                               },
//                               "&.MuiPaper-root.MuiAccordion-root:before":
//                               {
//                                 background: "none",
//                               },
//                               width: '95.5%'
//                             }}
//                           >
//                             <AccordionSummary
//                               expandIcon={
//                                 <ExpandMoreIcon sx={{ width: "20px" }} />
//                               }
//                               aria-controls="panel1-content"
//                               id="panel1-header"
//                               sx={{
//                                 color: "#7d7f85 !important",
//                                 borderRadius: 0,

//                                 "&.MuiAccordionSummary-root": {
//                                   padding: 0,
//                                 },
//                               }}
//                             // className="filtercategoryLable"

//                             >
//                               <Typography sx={{ fontFamily: "TT Commons Regular", fontSize: '18px' }}>Price Breakup</Typography>
//                             </AccordionSummary>
//                             <AccordionDetails
//                               sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 gap: "4px",
//                                 padding: '0 0 16px 0',
//                               }}
//                             >
//                               {(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Typography className="proCat_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Metal</Typography>
//                                 <span style={{ display: 'flex' }}>
//                                   <Typography>
//                                     {
//                                       <span className="proCat_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
//                                         {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                       </span>
//                                     }
//                                   </Typography>
//                                   &nbsp;
//                                   <Typography sx={{ fontFamily: "TT Commons Regular" }} className="proCat_PriceBreakup_Price">{formatter.format((singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost)?.toFixed(2))}</Typography>
//                                 </span>
//                               </div> : null}

//                               {(singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Typography className="proCat_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Diamond </Typography>

//                                 <span style={{ display: 'flex' }}>
//                                   <Typography>{
//                                     <span className="proCat_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
//                                       {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                     </span>
//                                   }</Typography>
//                                   &nbsp;
//                                   <Typography className="proCat_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{formatter.format((singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost)?.toFixed(2))}</Typography>
//                                 </span>
//                               </div> : null}

//                               {(singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Typography className="proCat_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Stone </Typography>

//                                 <span style={{ display: 'flex' }}>
//                                   <Typography>{
//                                     <span className="proCat_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
//                                       {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                     </span>
//                                   }</Typography>
//                                   &nbsp;
//                                   <Typography className="proCat_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{formatter.format((singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost)?.toFixed(2))}</Typography>
//                                 </span>
//                               </div> : null}

//                               {(singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Typography className="proCat_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>MISC </Typography>

//                                 <span style={{ display: 'flex' }}>
//                                   <Typography>{
//                                     <span className="proCat_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
//                                       {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                     </span>
//                                   }</Typography>
//                                   &nbsp;
//                                   <Typography className="proCat_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{formatter.format((singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost)?.toFixed(2))}</Typography>
//                                 </span>
//                               </div> : null}

//                               {(singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Typography className="proCat_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Labour </Typography>

//                                 <span style={{ display: 'flex' }}>
//                                   <Typography>{
//                                     <span className="proCat_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
//                                       {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                     </span>
//                                   }</Typography>
//                                   &nbsp;
//                                   <Typography className="proCat_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{formatter.format((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2))}</Typography>
//                                 </span>
//                               </div> : null}

//                               {
//                                 (
//                                   (singleProd1?.Other_Cost ? singleProd1?.Other_Cost : singleProd?.Other_Cost) +
//                                   (singleProd1?.Size_MarkUp ? singleProd1?.Size_MarkUp : singleProd?.Size_MarkUp) +
//                                   (singleProd1?.DesignMarkUpAmount ? singleProd1?.DesignMarkUpAmount : singleProd?.DesignMarkUpAmount) +
//                                   (singleProd1?.ColorStone_SettingCost ? singleProd1?.ColorStone_SettingCost : singleProd?.ColorStone_SettingCost) +
//                                   (singleProd1?.Diamond_SettingCost ? singleProd1?.Diamond_SettingCost : singleProd?.Diamond_SettingCost) +
//                                   (singleProd1?.Misc_SettingCost ? singleProd1?.Misc_SettingCost : singleProd?.Misc_SettingCost)

//                                 ) !== 0 ?
//                                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                     <Typography className="proCat_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Other </Typography>

//                                     <span style={{ display: 'flex' }}>
//                                       <Typography>{
//                                         <span className="proCat_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
//                                           {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                         </span>
//                                       }</Typography>
//                                       &nbsp;
//                                       <Typography className="proCat_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{
//                                         formatter.format((

//                                           (singleProd1?.Other_Cost ? singleProd1?.Other_Cost : singleProd?.Other_Cost) +
//                                           (singleProd1?.Size_MarkUp ? singleProd1?.Size_MarkUp : singleProd?.Size_MarkUp) +
//                                           (singleProd1?.DesignMarkUpAmount ? singleProd1?.DesignMarkUpAmount : singleProd?.DesignMarkUpAmount) +
//                                           (singleProd1?.ColorStone_SettingCost ? singleProd1?.ColorStone_SettingCost : singleProd?.ColorStone_SettingCost) +
//                                           (singleProd1?.Diamond_SettingCost ? singleProd1?.Diamond_SettingCost : singleProd?.Diamond_SettingCost) +
//                                           (singleProd1?.Misc_SettingCost ? singleProd1?.Misc_SettingCost : singleProd?.Misc_SettingCost)

//                                         )?.toFixed(2))
//                                       }</Typography>
//                                     </span>
//                                   </div> : null}

//                             </AccordionDetails>
//                           </Accordion>

//                         )
//                         }

//                         {
//                           storeInit?.IsPriceShow == 1 && (
//                             <div className="proCat_price_portion">
//                               {isPriceloading ? (
//                                 ""
//                               ) : (
//                                 <span className="proCat_currencyFont">
//                                   {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                 </span>
//                               )}
//                               &nbsp;
//                               {isPriceloading ? (
//                                 <Skeleton
//                                   variant="rounded"
//                                   width={140}
//                                   height={30}
//                                 />
//                               ) :
//                                 formatter.format
//                                   (
//                                     singleProd1?.UnitCostWithMarkUp ??
//                                     singleProd?.UnitCostWithMarkUp
//                                   )
//                               }
//                             </div>
//                           )
//                         }

//                         {prodLoading ? null :
//                           <div>

//                             <div className="Smr_CartAndWish_portion">
//                               <button
//                                 className={
//                                   !addToCartFlag
//                                     ? "proCat_AddToCart_btn"
//                                     : "proCat_AddToCart_btn_afterCart"
//                                 }
//                                 onClick={() => handleCart(!addToCartFlag)}
//                               >
//                                 <span
//                                   className="proCat_addtocart_btn_txt"
//                                   style={{ color: !addToCartFlag ? "" : "white" }}
//                                 >
//                                   {!addToCartFlag
//                                     ? "ADD TO CART"
//                                     : "REMOVE FROM CART"}
//                                 </span>
//                               </button>
//                               {/* <div className="Smr_wishlistcont">
//                                 <Checkbox
//                                   icon={
//                                     <StarBorderIcon
//                                       sx={{ fontSize: "25px", color: "#7d7f85" }}
//                                     />
//                                   }
//                                   checkedIcon={
//                                     <StarIcon
//                                       sx={{ fontSize: "25px", color: "#7d7f85" }}
//                                     />
//                                   }
//                                   disableRipple={true}
//                                   checked={
//                                     wishListFlag ?? singleProd?.IsInWish == 1
//                                       ? true
//                                       : false
//                                   }
//                                   onChange={(e) => handleWishList(e, singleProd)}
//                                 />
//                               </div> */}
//                             </div>
//                             {singleProd?.InStockDays !== 0 && <p style={{ margin: '20px 0px 0px 0px', fontWeight: 500, fontSize: '18px', fontFamily: 'TT Commons Regular', color: '#7d7f85' }}>Express Shipping in Stock {singleProd?.InStockDays} Days Delivery</p>}
//                             {singleProd?.MakeOrderDays != 0 && <p style={{ margin: '0px', fontWeight: 500, fontSize: '18px', fontFamily: 'TT Commons Regular', color: '#7d7f85' }}>Make To Order {singleProd?.MakeOrderDays} Days Delivery</p>}
//                           </div>
//                         }
//                       </div>
//                     </div>
//                     {/* <div>
//                       <span>{">"}</span>
//                     </div> */}
//                   </div>
//                 </div>

//                 <div className="proCat_material_details_portion">
//                   {diaList?.length > 0 && (
//                     <p className="proCat_details_title"> Product Details</p>
//                   )}
//                   {diaList?.length > 0 && (
//                     <div className="proCat_material_details_portion_inner">
//                       <ul style={{ margin: "0px 0px 3px 0px" }}>
//                         <li
//                           style={{ fontWeight: 600 }}
//                         >{`Diamond Detail(${diaList?.reduce(
//                           (accumulator, data) => accumulator + data.M,
//                           0
//                         )}/${diaList
//                           ?.reduce(
//                             (accumulator, data) => accumulator + data?.N,
//                             0
//                           )
//                           .toFixed(3)}ct)`}</li>
//                       </ul>
//                       <ul className="proCat_mt_detail_title_ul">
//                         <li className="proCat_proDeatilList">Shape</li>
//                         <li className="proCat_proDeatilList">Clarity</li>
//                         <li className="proCat_proDeatilList">Color</li>
//                         <li className="proCat_proDeatilList">Pcs&nbsp;&nbsp;Wt</li>
//                       </ul>
//                       {diaList?.map((data) => (
//                         <ul className="proCat_mt_detail_title_ul">
//                           <li className="proCat_proDeatilList1">{data?.F}</li>
//                           <li className="proCat_proDeatilList1">{data?.H}</li>
//                           <li className="proCat_proDeatilList1">{data?.J}</li>
//                           <li className="proCat_proDeatilList1">
//                             {data.M}&nbsp;&nbsp;{data?.N?.toFixed(3)}
//                           </li>
//                         </ul>
//                       ))}
//                     </div>
//                   )}

//                   {/* {csList?.length > 0 && (
//                     <div className="proCat_material_details_portion_inner">
//                       <ul style={{ margin: "10px 0px 3px 0px" }}>
//                         <li
//                           style={{ fontWeight: 600 }}
//                         >{`ColorStone Detail(${csList?.reduce(
//                           (accumulator, data) => accumulator + data.M,
//                           0
//                         )}/${csList
//                           ?.reduce(
//                             (accumulator, data) => accumulator + data?.N,
//                             0
//                           )
//                           .toFixed(3)}ct)`}</li>
//                       </ul>
//                       <ul className="proCat_mt_detail_title_ul">
//                         <li className="proCat_proDeatilList">Shape</li>
//                         <li className="proCat_proDeatilList">Clarity</li>
//                         <li className="proCat_proDeatilList">Color</li>
//                         <li className="proCat_proDeatilList">Pcs&nbsp;&nbsp;Wt</li>
//                       </ul>
//                       {csList?.map((data) => (
//                         <ul className="proCat_mt_detail_title_ul">
//                           <li className="proCat_proDeatilList1">{data?.F}</li>
//                           <li className="proCat_proDeatilList1">{data?.H}</li>
//                           <li className="proCat_proDeatilList1">{data?.J}</li>
//                           <li className="proCat_proDeatilList1">
//                             {data.M}&nbsp;&nbsp;{data?.N?.toFixed(3)}
//                           </li>
//                         </ul>
//                       ))}
//                     </div>
//                   )} */}

//                   {csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 && (
//                     <div className="proCat_material_details_portion_inner">
//                       <ul style={{ margin: "10px 0px 3px 0px" }}>
//                         <li
//                           style={{ fontWeight: 600 }}
//                         >{`ColorStone Detail (${csList?.filter((ele) => ele?.D !== "MISC")?.reduce(
//                           (accumulator, data) => accumulator + data.M,
//                           0
//                         )}  ${csList?.filter((ele) => ele?.D !== "MISC")
//                           ?.reduce(
//                             (accumulator, data) => accumulator + data?.N,
//                             0
//                           )
//                           .toFixed(3)}ct)`}</li>
//                       </ul>
//                       <ul className="proCat_mt_detail_title_ul">
//                         <li className="proCat_proDeatilList">Shape</li>
//                         <li className="proCat_proDeatilList">Clarity</li>
//                         <li className="proCat_proDeatilList">Color</li>
//                         <li className="proCat_proDeatilList">Pcs&nbsp;&nbsp;Wt</li>
//                       </ul>
//                       {csList?.filter((ele) => ele?.D !== "MISC")?.map((data) => (
//                         <ul className="proCat_mt_detail_title_ul">
//                           <li className="proCat_proDeatilList1">{data?.F}</li>
//                           <li className="proCat_proDeatilList1">{data?.H}</li>
//                           <li className="proCat_proDeatilList1">{data?.J}</li>
//                           <li className="proCat_proDeatilList1">
//                             {data.M}&nbsp;&nbsp;{(data?.N)?.toFixed(3)}
//                           </li>
//                         </ul>
//                       ))}
//                     </div>
//                   )}

//                   {csList?.filter((ele) => ele?.D === "MISC")?.length > 0 && (
//                     <div className="proCat_material_details_portion_inner">
//                       <ul style={{ margin: "10px 0px 3px 0px" }}>
//                         <li
//                           style={{ fontWeight: 600 }}
//                         >{`MISC Detail (${csList?.filter((ele) => ele?.D === "MISC")?.reduce(
//                           (accumulator, data) => accumulator + data.M,
//                           0
//                         )}  ${csList?.filter((ele) => ele?.D === "MISC")
//                           ?.reduce(
//                             (accumulator, data) => accumulator + data?.N,
//                             0
//                           )
//                           .toFixed(3)}gm)`}</li>
//                       </ul>
//                       <ul className="proCat_mt_detail_title_ul">
//                         <li className="proCat_proDeatilList">Shape</li>
//                         <li className="proCat_proDeatilList">Clarity</li>
//                         <li className="proCat_proDeatilList">Color</li>
//                         <li className="proCat_proDeatilList">Pcs&nbsp;&nbsp;Wt</li>
//                       </ul>
//                       {csList?.filter((ele) => ele?.D === "MISC")?.map((data) => (
//                         <ul className="proCat_mt_detail_title_ul">
//                           <li className="proCat_proDeatilList1">{data?.F}</li>
//                           <li className="proCat_proDeatilList1">{data?.H}</li>
//                           <li className="proCat_proDeatilList1">{data?.J}</li>
//                           <li className="proCat_proDeatilList1">
//                             {data.M}&nbsp;&nbsp;{(data?.N)?.toFixed(3)}
//                           </li>
//                         </ul>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <p className="proCat_details_title" style={{fontSize:'20px',marginLeft:'40px',textAlign:'center'}}> MORE PRODUCTS</p>
//                 <div className="proCat_swiper_container">
//                     <Swiper
//                         spaceBetween={10}
//                         lazy={true}
//                         navigation={true}
//                         breakpoints={{
//                             1024: {
//                                 slidesPerView: 4,
//                             },
//                             768: {
//                                 slidesPerView: 2,
//                             },
//                             0: {
//                                 slidesPerView: 2,
//                             }
//                         }}
//                         modules={[Keyboard, FreeMode, Navigation]}
//                         keyboard={{ enabled: true }}
//                         pagination={false}
//                     >
//                       {
//                         fakeData.map((ele)=>{
//                           const imageSrc = `${storeInit?.CDNDesignImageFol}${ele?.designno}~1.${ele?.ImageExtension}`;
//                           return (
//                             <SwiperSlide key={ele?.autocode} className="swiper-slide-custom">
//                                 <div className="procat_design_slide_detailpage">
//                                 <img
//                                   src={imageSrc ?? imageNotFound}
//                                   alt={ele?.TitleLine}
//                                   loading="lazy"
//                                 />
//                                 </div>
//                             </SwiperSlide>
//                           )
//                         })
//                       }
//                     </Swiper>
//                 </div>

//                 {(stockItemArr?.length > 0 && storeInit?.IsStockWebsite === 1) && (
//                   <div className="proCat_stockItem_div">
//                     <p className="proCat_details_title"> Stock Items </p>
//                     <div className="proCat_stockitem_container">
//                       <div className="proCat_stock_item_card">
//                         {stockItemArr?.map((ele) => (
//                           <div className="proCat_stockItemCard">
//                             <div className="cart_and_wishlist_icon">
//                               <Checkbox
//                                 icon={
//                                   <LocalMallOutlinedIcon
//                                     sx={{
//                                       fontSize: "22px",
//                                       color: "#7d7f85",
//                                       opacity: ".7",
//                                     }}
//                                   />
//                                 }
//                                 checkedIcon={
//                                   <LocalMallIcon
//                                     sx={{
//                                       fontSize: "22px",
//                                       color: "#009500",
//                                     }}
//                                   />
//                                 }
//                                 disableRipple={false}
//                                 sx={{ padding: "10px" }}

//                                 onChange={(e) => handleCartandWish(e, ele, "Cart")}
//                                 checked={cartArr[ele?.StockId] ?? ele?.IsInCart === 1 ? true : false}
//                               />

//                             </div>
//                             <img
//                               className="procat_productCard_Image"
//                               src={
//                                 storeInit?.CDNDesignImageFol +
//                                 ele?.designno +
//                                 "~" +
//                                 "1" +
//                                 "." +
//                                 ele?.ImageExtension
//                               }
//                               alt={""}
//                             />
//                             <div className="proCat_stockutem_shortinfo" style={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingBottom: '5px' }}>
//                               <span className="proCat_prod_designno">
//                                 {ele?.designno}({ele?.StockBarcode})
//                               </span>
//                               <div className="proCat_prod_Allwt">
//                                 <div
//                                   style={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     letterSpacing: "1px",
//                                     gap: "3px",
//                                   }}
//                                 >
//                                   <span className="proCat_prod_wt">
//                                     <span className="proCat_d_keys">NWT:</span>
//                                     <span className="proCat_d_val">{ele?.NetWt}</span>
//                                   </span>

//                                   {storeInit?.IsGrossWeight == 1 &&
//                                     Number(ele?.GrossWt) !== 0 && (
//                                       <>
//                                         <span>|</span>
//                                         <span className="proCat_prod_wt">
//                                           <span className="proCat_d_keys">GWT:</span>
//                                           <span className="proCat_d_val">
//                                             {ele?.GrossWt}
//                                           </span>
//                                         </span>
//                                       </>
//                                     )}
//                                   {storeInit?.IsDiamondWeight == 1 &&
//                                     Number(ele?.DiaWt) !== 0 && (
//                                       <>
//                                         <span>|</span>
//                                         <span className="proCat_prod_wt">
//                                           <span className="proCat_d_keys">DWT:</span>
//                                           <span className="proCat_d_val">
//                                             {ele?.DiaWt}
//                                             {storeInit?.IsDiamondPcs === 1
//                                               ? `/${ele?.DiaPcs}`
//                                               : null}
//                                           </span>
//                                         </span>
//                                       </>
//                                     )}

//                                   {storeInit?.IsStoneWeight == 1 &&
//                                     Number(ele?.CsWt) !== 0 && (
//                                       <>
//                                         <span >|</span>
//                                         <span className="proCat_prod_wt">
//                                           <span className="proCat_d_keys">CWT:</span>
//                                           <span className="proCat_d_val">
//                                             {ele?.CsWt}
//                                             {storeInit?.IsStonePcs === 1
//                                               ? `/${ele?.CsPcs}`
//                                               : null}
//                                           </span>
//                                         </span>
//                                       </>
//                                     )}
//                                 </div>
//                               </div>

//                               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} className="proCat_stockItem_price_type_mt">
//                                 {storeInit?.IsMetalTypeWithColor == 1 ? `${ele?.MetalColorName}-${ele?.metaltypename}${ele?.metalPurity}` : ""}
//                                 {" "}/{" "}
//                                 {
//                                   storeInit?.IsPriceShow == 1 && (
//                                     <div>
//                                       {isPriceloading ? (
//                                         ""
//                                       ) : (
//                                         <span className="proCat_currencyFont">
//                                           {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                         </span>
//                                       )}
//                                       &nbsp;
//                                       {
//                                         formatter.format
//                                           (
//                                             ele?.Amount
//                                           )
//                                       }
//                                     </div>
//                                   )
//                                 }
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                       {/* <div style={{ overflow: 'scroll' }}>
//                         <table className="Smr_stockItem_table" style={{ minWidth: '700px' }}>
//                           <tr className="Smr_stockItem_table_tr">
//                             <th className="Smr_stockItem_table_td">SrNo</th>
//                             <th className="Smr_stockItem_table_td">Design No</th>
//                             <th className="Smr_stockItem_table_td">Job No</th>
//                             <th
//                               className="Smr_stockItem_table_td"
//                               style={{ textAlign: "center" }}
//                             >
//                               Gross Wt/Net Wt/Dia Wt/CS Wt
//                             </th>
//                             <th className="Smr_stockItem_table_td">
//                               Metal Color-Purity
//                             </th>
//                             {storeInit?.IsPriceShow != 0 &&
//                               <th className="Smr_stockItem_table_td">Price</th>
//                             }
//                             <th className="Smr_stockItem_table_td">
//                               Add To Cart
//                             </th>
//                           </tr>
//                           {stockItemArr?.map((ele, i) => (
//                             <tr className="Smr_stockItem_table_tr">
//                               <td className="Smr_stockItem_table_td">
//                                 <span className="proCat_prod_designno">
//                                   {ele?.SrNo}
//                                 </span>
//                               </td>
//                               <td className="Smr_stockItem_table_td">
//                                 <span className="proCat_prod_designno">
//                                   {ele?.designno}
//                                 </span>
//                               </td>
//                               <td className="Smr_stockItem_table_td">
//                                 <span className="proCat_prod_designno">
//                                   {ele?.StockBarcode}
//                                 </span>
//                               </td>
//                               <td className="Smr_stockItem_table_td">
//                                 <div className="proCat_prod_Allwt">
//                                   <div
//                                     style={{
//                                       display: "flex",
//                                       justifyContent: "center",
//                                       alignItems: "center",
//                                       letterSpacing: "1px",
//                                       gap: "3px",
//                                     }}
//                                   >
//                                     {storeInit?.IsGrossWeight == 1 &&
//                                       Number(ele?.GrossWt) !== 0 && (
//                                         <>
//                                           <span className="proCat_prod_wt">
//                                             <span className="proCat_d_keys">
//                                               GWT:
//                                             </span>
//                                             <span className="proCat_d_val">
//                                               {(ele?.GrossWt)?.toFixed(3)}
//                                             </span>
//                                           </span>
//                                         </>
//                                       )}

//                                     {Number(ele?.NetWt) !== 0 && (
//                                       <>
//                                         <span>|</span>
//                                         <span className="proCat_prod_wt">
//                                           <span className="proCat_d_keys">NWT:</span>
//                                           <span className="proCat_d_val">
//                                             {(ele?.NetWt)?.toFixed(3)}
//                                           </span>
//                                         </span>
//                                       </>
//                                     )}
//                                     {storeInit?.IsDiamondWeight == 1 &&
//                                       Number(ele?.DiaWt) !== 0 && (
//                                         <>
//                                           <span>|</span>
//                                           <span className="proCat_prod_wt">
//                                             <span className="proCat_d_keys">
//                                               DWT:
//                                             </span>
//                                             <span className="proCat_d_val">
//                                               {(ele?.DiaWt)?.toFixed(3)}
//                                               {storeInit?.IsDiamondPcs === 1
//                                                 ? `/${ele?.DiaPcs}`
//                                                 : null}
//                                             </span>
//                                           </span>
//                                         </>
//                                       )}

//                                     {storeInit?.IsStoneWeight == 1 &&
//                                       Number(ele?.CsWt) !== 0 && (
//                                         <>
//                                           <span>|</span>
//                                           <span className="proCat_prod_wt">
//                                             <span className="proCat_d_keys">
//                                               CWT:
//                                             </span>
//                                             <span className="proCat_d_val">
//                                               {(ele?.CsWt)?.toFixed(3)}
//                                               {storeInit?.IsStonePcs === 1
//                                                 ? `/${ele?.CsPcs}`
//                                                 : null}
//                                             </span>
//                                           </span>
//                                         </>
//                                       )}
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="Smr_stockItem_table_td">
//                                 <span>
//                                   {ele?.MetalColorName}-{ele?.metaltypename}
//                                   {ele?.metalPurity}
//                                 </span>
//                               </td>
//                               {storeInit?.IsPriceShow != 0 &&
//                                 <td className="Smr_stockItem_table_td">
//                                   <span>
//                                     <span className="proCat_currencyFont">
//                                       {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                     </span>
//                                     &nbsp;
//                                     <span> {
//                                       formatter.format(
//                                         ele?.Amount
//                                       )
//                                     }</span>
//                                   </span>
//                                 </td>
//                               }
//                               <td
//                                 className="Smr_stockItem_table_td"
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "center",
//                                   border: 'none'
//                                 }}
//                               >
//                                 <Checkbox
//                                   icon={
//                                     <LocalMallOutlinedIcon
//                                       sx={{
//                                         fontSize: "22px",
//                                         color: "#7d7f85",
//                                         opacity: ".7",
//                                       }}
//                                     />
//                                   }
//                                   checkedIcon={
//                                     <LocalMallIcon
//                                       sx={{
//                                         fontSize: "22px",
//                                         color: "#009500",
//                                       }}
//                                     />
//                                   }
//                                   disableRipple={false}
//                                   sx={{ padding: "10px" }}
//                                   onChange={(e) =>
//                                     handleCartandWish(e, ele, "Cart")
//                                   }
//                                   checked={
//                                     cartArr[ele?.StockId] ?? ele?.IsInCart === 1
//                                       ? true
//                                       : false
//                                   }
//                                 />
//                               </td>
//                             </tr>
//                           ))}
//                         </table>
//                       </div> */}
//                     </div>
//                   </div>
//                 )}

//                 {storeInit?.IsProductDetailSimilarDesign == 1 &&
//                   SimilarBrandArr?.length > 0 && (
//                     <div className="proCat_stockItem_div">
//                       <p className="proCat_details_title"> Similar Designs</p>
//                       <div className="proCat_stockitem_container">
//                         <div className="proCat_stock_item_card">
//                           {SimilarBrandArr?.map((ele) => (
//                             <div
//                               className="proCat_stockItemCard"
//                               onClick={() =>
//                                 // setTimeout(() =>
//                                 handleMoveToDetail(ele)
//                                 // , 500)
//                               }
//                             >
//                               <img
//                                 className="proCat_productCard_Image"
//                                 src={
//                                   ele?.ImageCount > 0
//                                     ? storeInit?.CDNDesignImageFol +
//                                     ele?.designno +
//                                     "~" +
//                                     "1" +
//                                     "." +
//                                     ele?.ImageExtension
//                                     : imageNotFound
//                                 }
//                                 alt={""}
//                               />
//                               <div
//                                 className="proCat_stockutem_shortinfo"
//                                 style={{
//                                   display: "flex",
//                                   flexDirection: "column",
//                                   gap: "5px",
//                                   paddingBottom: "5px",
//                                 }}
//                               >
//                                 <span
//                                   className="proCat_prod_designno"
//                                   style={{ fontSize: "14px" }}
//                                 >
//                                   {ele?.designno}
//                                 </span>

//                                 {storeInit?.IsPriceShow == 1 ? <div
//                                   style={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     width: "100%",
//                                     fontSize: "16px",
//                                   }}
//                                   className="proCat_stockItem_price_type_mt"
//                                 >
//                                   <spam>
//                                     <span className="proCat_currencyFont">
//                                       {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                     </span>
//                                     &nbsp;
//                                   </spam>
//                                   <span>{
//                                     formatter.format(
//                                       ele?.UnitCostWithMarkUp
//                                     )
//                                   }</span>
//                                 </div> : null}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                 {storeInit?.IsProductDetailDesignSet === 1 &&
//                   <div className="proCat_DesignSet_main">
//                     {designSetList?.length > 0 && <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         width: "100%",
//                       }}
//                     >
//                       <p
//                         style={{
//                           fontFamily: "FreightDisp Pro Medium",
//                           color: "#7d7f85",
//                           fontSize: "30px",
//                           // display:'none'
//                         }}
//                       >
//                         Complete The Look
//                       </p>
//                     </div>}

//                     <div className="proCat_Swiper_designSet" >
//                       <Swiper
//                         modules={[Navigation, Pagination, Scrollbar]}
//                         // spaceBetween={50}
//                         // slidesPerView={3}
//                         navigation
//                         pagination={{ clickable: true }}
//                       // scrollbar={{ draggable: true }}
//                       >
//                         {designSetList?.map((designSetList) => (
//                           <SwiperSlide>
//                             <div className="compeletethelook_cont">
//                               <div className="proCat_ctlImg_containe">
//                                 <img
//                                   // src={
//                                   //   "https://cdn.accentuate.io/3245609615460/4121939443812/99-v1581576944425.jpg?2048x1950"
//                                   // }
//                                   src={
//                                     designSetList?.DefaultImageName ? storeInit?.DesignSetImageFol +
//                                       designSetList?.designsetuniqueno +
//                                       "/" +
//                                       designSetList?.DefaultImageName
//                                       :
//                                       imageNotFound
//                                   }
//                                   alt={""}
//                                   className="ctl_img"
//                                 />
//                               </div>

//                               <div
//                                 className={
//                                   (designSetList?.Designdetail == undefined
//                                     ? []
//                                     : JSON.parse(designSetList?.Designdetail)
//                                   )?.length > 3
//                                     ? "compeletethelook_prodt_for_3"
//                                     : "compeletethelook_prodt"
//                                 }
//                               >
//                                 <p
//                                   style={{
//                                     fontFamily: "FreightDisp Pro Medium",
//                                     color: "#7d7f85",
//                                     fontSize: "30px",
//                                     display: "none",
//                                   }}
//                                 >
//                                   Complete The Look
//                                 </p>

//                                 {(designSetList?.Designdetail == undefined
//                                   ? []
//                                   : JSON.parse(designSetList?.Designdetail)
//                                 )?.map((ele, i) => (
//                                   <div
//                                     className="completethelook_outer"
//                                     onClick={() => handleMoveToDetail(ele)}
//                                     style={{ borderTop: i !== 0 ? "none" : "" }}
//                                   >
//                                     <div style={{ display: "flex", gap: "60px" }}>
//                                       <div style={{ marginLeft: "12px" }}>
//                                         <img
//                                           src={
//                                             ele?.ImageCount > 0
//                                               ? storeInit?.CDNDesignImageFol +
//                                               ele?.designno +
//                                               "~" +
//                                               "1" +
//                                               "." +
//                                               ele?.ImageExtension
//                                               : imageNotFound
//                                           }
//                                           alt={""}
//                                           // src={
//                                           //   "https://smilingrocks.com/cdn/shop/products/Lab-grown-diamond-white-gold-earrings-sre00362wht_medium.jpg?v=1590473229"
//                                           // }
//                                           className="srthelook_img"
//                                         />
//                                       </div>
//                                       <div className="srthelook_prodinfo">
//                                         <div
//                                           style={{
//                                             fontSize: "14px",
//                                             color: "#7d7f85",
//                                             textTransform: "uppercase",
//                                           }}
//                                           className="srthelook_prodinfo_inner"
//                                         >

//                                           <p>
//                                             {ele?.designno} - {ele?.CategoryName}
//                                             <br />
//                                             {storeInit?.IsPriceShow == 1 &&
//                                               <span className="proCat_currencyFont">
//                                                 {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                               </span>
//                                             }
//                                             &nbsp;
//                                             {storeInit?.IsPriceShow == 1 &&
//                                               formatter.format(
//                                                 ele?.UnitCostWithMarkUp
//                                               )
//                                             }
//                                           </p>

//                                         </div>
//                                         {/* <div>
//                           <span style={{ fontSize: "30px", color: "#7d7f85",padding:'5px'}} className=''>
//                             &#8250;
//                           </span>
//                         </div> */}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           </SwiperSlide>
//                         ))}
//                       </Swiper>
//                     </div>
//                   </div>}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetail;
