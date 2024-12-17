import React, { useEffect, useRef, useState } from "react";
import "./Productdetail.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { dt_CartCount, dt_WishCount } from "../../../Recoil/atom";
import Cookies from "js-cookie";
import imageNotFound from "../../../Assets/image-not-found.jpg";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import Pako from "pako";
import { SingleProdListAPI } from "../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI";
import { getSizeData } from "../../../../../../utils/API/CartAPI/GetCategorySizeAPI";
import { StockItemApi } from "../../../../../../utils/API/StockItemAPI/StockItemApi";
import { DesignSetListAPI } from "../../../../../../utils/API/DesignSetListAPI/DesignSetListAPI";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Divider, FormControlLabel, Skeleton, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { IoIosPlayCircle } from "react-icons/io";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Swiper, SwiperSlide } from 'swiper/react';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import GoogleAnalytics from 'react-ga4'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Footer from "../../Home/Footer/Footer";
import { SaveLastViewDesign } from "../../../../../../utils/API/SaveLastViewDesign/SaveLastViewDesign";


const ProductDetail = () => {
  let location = useLocation();

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
  const [isPriceloading, setisPriceLoading] = useState(false);
  const [isDataFound, setIsDataFound] = useState(false);
  const [metalWiseColorImg, setMetalWiseColorImg] = useState();
  const loginUserDetail = JSON?.parse(sessionStorage.getItem('loginUserDetail'));

  const [designSetList, setDesignSetList] = useState();

  const [thumbImgIndex, setThumbImgIndex] = useState();

  const [diaList, setDiaList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [saveLastView, setSaveLastView] = useState();

  const [prodLoading, setProdLoading] = useState(false);

  const setCartCountVal = useSetRecoilState(dt_CartCount);
  const setWishCountVal = useSetRecoilState(dt_WishCount);

  const [pdVideoArr, setPdVideoArr] = useState([]);

  const imgRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsImageLoad(false);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Adjust the threshold as needed
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // console.log("SizeCombo",SizeCombo);

  // const [metalFilterData, setMetalFilterData] = useState();
  // const [daimondFilterData, setDaimondFiletrData] = useState([]);
  // const [colorStoneFilterData, setColorStoneFiletrData] = useState([]);
  // const [FindingFilterData, setFindingFiletrData] = useState([]);

  // const [dqcRate, setDqcRate] = useState();
  // const [dqcSettRate, setDqcSettRate] = useState()
  // const [csqcRate, setCsqcRate] = useState()
  // const [csqcSettRate, setCsqcSettRate] = useState()

  const [stockItemArr, setStockItemArr] = useState([]);
  const [SimilarBrandArr, setSimilarBrandArr] = useState([]);

  const [cartArr, setCartArr] = useState({});

  let cookie = Cookies.get("visiterId");

  // console.log("selectttt",{selectMtType,selectDiaQc,selectCsQc,selectMtColor});

  // console.log("sizeData",sizeData)

  // console.log("pdVideoArr", selectedThumbImg?.link ?? imageNotFound)

  const navigate = useNavigate();

  const setCSSVariable = () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  };

  useEffect(() => {
    setCSSVariable();
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "auto",
    });
  }, [location?.key]);

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

  const handleCart = (cartflag) => {
    let metal =
      metalTypeCombo?.filter((ele) => ele?.metaltype == selectMtType)[0] ??
      (loginInfo?.MetalId ?? storeInit?.MetalId);
    let dia =
      diaQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectDiaQc.split(",")[0] &&
          ele?.color == selectDiaQc.split(",")[1]
      )[0] ?? (loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
    let cs =
      csQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectCsQc.split(",")[0] &&
          ele?.color == selectCsQc.split(",")[1]
      )[0] ?? (loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid);

    let mcArr = metalColorCombo?.filter(
      (ele) => {
        if (selectMtColor) {
          return ele?.colorname == selectMtColor
        }
        else { return ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid) }

      })[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid ?? 0,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: `${dia?.QualityId ?? 0},${dia?.ColorId ?? 0}`,
      CsQCid: `${cs?.QualityId ?? 0},${cs?.ColorId ?? 0}`,
      Size: sizeData ?? singleProd?.DefaultSize,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup:
        singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
    };
    if (cartflag) {
      GoogleAnalytics.event({
        action: `Added to Cart by User ${loginUserDetail?.firstname || 'Guest'}`,
        category: `Cart Interaction on Product Detail Page`,
        label: singleProd?.designNo || singleProd?.titleLine || singleProd?.autocode || 'Unknown Product',
        value: loginUserDetail?.firstname || "Not Login" // Use 1 for logged-in, 0 for guest
      });

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
      (loginInfo?.MetalId ?? storeInit?.MetalId);
    let dia =
      diaQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectDiaQc.split(",")[0] &&
          ele?.color == selectDiaQc.split(",")[1]
      )[0] ?? (loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
    let cs =
      csQcCombo?.filter(
        (ele) =>
          ele?.Quality == selectCsQc.split(",")[0] &&
          ele?.color == selectCsQc.split(",")[1]
      )[0] ?? (loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid);

    let mcArr = metalColorCombo?.filter(
      (ele) => {
        if (selectMtColor) {
          return ele?.colorname == selectMtColor
        }
        else { return ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid) }

      })[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid ?? 0,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: `${dia?.QualityId ?? 0},${dia?.ColorId ?? 0}`,
      CsQCid: `${cs?.QualityId ?? 0},${cs?.ColorId ?? 0}`,
      Size: sizeData ?? singleProd1?.DefaultSize ?? singleProd?.DefaultSize,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup:
        singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
    };

    if (e?.target?.checked == true) {
      GoogleAnalytics.event({
        action: `Wishlist Clicked by User ${loginUserDetail?.firstname || 'Guest'}`,
        category: `Wishlist Interaction on Product Detail Page`,
        label: singleProd?.designNo || singleProd?.titleLine || singleProd?.autocode || 'Unknown Product',
        value: loginUserDetail?.firstname || "Not Login" // Use 1 for logged-in, 0 for guest
      });
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

    let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));

    let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));


    setTimeout(() => {
      if (decodeUrl) {
        let metalArr
        let diaArr
        let csArr

        let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
        let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

        if (mtTypeLocal?.length) {
          metalArr =
            mtTypeLocal?.filter((ele) => ele?.Metalid == (decodeobj?.m ? decodeobj?.m : (logininfoInside?.MetalId ?? storeinitInside?.MetalId)))[0]
        }

        if (diaQcLocal?.length) {
          diaArr =
            diaQcLocal?.filter(
              (ele) =>
                ele?.QualityId == (decodeobj?.d ? decodeobj?.d?.split(",")[0] : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid).split(",")[0]) &&
                ele?.ColorId == (decodeobj?.d ? decodeobj?.d?.split(",")[1] : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid).split(",")[1])
            )[0]
        }

        if (csQcLocal?.length) {
          csArr =
            csQcLocal?.filter(
              (ele) =>
                ele?.QualityId == (decodeobj?.c ? decodeobj?.c?.split(",")[0] : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid).split(",")[0]) &&
                ele?.ColorId == (decodeobj?.c ? decodeobj?.c?.split(",")[1] : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid).split(",")[1])
            )[0]
        }

        setSelectMtType(metalArr?.metaltype)

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
    }, 500)
  }, [singleProd])

  useEffect(() => {
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr = mtColorLocal?.filter(
        (ele) =>
          ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
      )[0];
    }


    setSelectMtColor(mcArr?.colorcode);
  }, [singleProd, singleProd1]);


  console.log("mcArr", selectMtColor)

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

  // console.log("sizeData",sizeData);

  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];

    let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
    let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let decodeobj = decodeAndDecompress(navVal);

    if (decodeobj) {
      setDecodeUrl(decodeobj);
    }

    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));

    let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));

    let metalArr;
    let diaArr;
    let csArr;

    if (mtTypeLocal?.length) {
      metalArr =
        mtTypeLocal?.filter(
          (ele) => ele?.Metalid == decodeobj?.m
        )[0]?.Metalid
    }

    if (diaQcLocal) {
      diaArr =
        diaQcLocal?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.d?.split(",")[0] &&
            ele?.ColorId == decodeobj?.d?.split(",")[1]
        )[0];
    }

    if (csQcLocal) {
      csArr =
        csQcLocal?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.c?.split(",")[0] &&
            ele?.ColorId == decodeobj?.c?.split(",")[1]
        )[0]
    }

    // console.log("decodeobj",(diaArr))


    const FetchProductData = async () => {

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

      // console.log("objjj",obj)
      setProdLoading(true)

      setisPriceLoading(true)
      // step 4 
      setSingleProd1({})
      setSingleProd({})
      await SingleProdListAPI(decodeobj, sizeData, obj, cookie)
        .then(async (res) => {
          if (res) {

            setSingleProd(res?.pdList[0]);

            if (res?.pdList?.length > 0) {
              setisPriceLoading(false)
              // setIsImageLoad(false)
              // setSelectedThumbImg({
              //   link: vidSkel,
              //   type: "img",
              // });
              setProdLoading(false)
            }

            if (!res?.pdList[0]) {
              // console.log("singleprod",res?.pdList[0]);
              setisPriceLoading(false)
              setProdLoading(false)
              setIsDataFound(true)
            } else {
              setIsDataFound(false)
            }

            setDiaList(res?.pdResp?.rd3)
            setCsList(res?.pdResp?.rd4)

            let prod = res?.pdList[0]

            let initialsize = (prod && prod.DefaultSize !== "")
              ? prod?.DefaultSize
              : (SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename === undefined
                ? SizeCombo?.rd[0]?.sizename : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename)

            setSizeData(initialsize)

            // await SingleFullProdPriceAPI(decodeobj).then((res) => {
            //   setSingleProdPrice(res);
            //   console.log("singlePrice", res);
            // });
          }
          return res;
        }).then(async (resp) => {
          if (resp) {
            await getSizeData(resp?.pdList[0], cookie).then((res) => {
              // console.log("Sizeres",res)
              setSizeCombo(res?.Data)
            }).catch((err) => console.log("SizeErr", err))

            if (storeinitInside?.IsStockWebsite === 1) {
              await StockItemApi(resp?.pdList[0]?.autocode, "stockitem", cookie).then((res) => {
                setStockItemArr(res?.Data?.rd)
              }).catch((err) => console.log("stockItemErr", err))
            }

            if (storeinitInside?.IsProductDetailSimilarDesign === 1) {
              await StockItemApi(resp?.pdList[0]?.autocode, "similarbrand", obj, cookie).then((res) => {
                setSimilarBrandArr(res?.Data?.rd)
              }).catch((err) => console.log("similarbrandErr", err))
            }

            if (storeinitInside?.IsProductDetailDesignSet === 1) {
              await DesignSetListAPI(obj1, resp?.pdList[0]?.designno, cookie).then((res) => {
                // console.log("designsetList",res?.Data?.rd[0])
                setDesignSetList(res?.Data?.rd)
              }).catch((err) => console.log("designsetErr", err))
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
    }

    FetchProductData()

    window.scroll({
      top: 0,
      behavior: "smooth",
    });

  }, [location?.key]);

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const ProdCardImageFunc = async () => {
    let finalprodListimg;
    let pdImgList = [];
    let pdvideoList = [];

    let pd = singleProd;

    let colImg;

    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr =
        mtColorLocal?.filter(
          (ele) => ele?.id == singleProd?.MetalColorid
        )[0]
    }

    if (singleProd?.ColorImageCount > 0) {
      for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
        let imgString =
          // storeInit?.DesignImageFol +
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          i +
          "~" + mcArr?.colorcode +
          "." +
          singleProd?.ImageExtension;

        let IsImg = checkImageAvailability(imgString)
        if (IsImg) {
          pdImgList.push(imgString);
        }
      }

      if (pdImgList?.length > 0) {
        colImg = pdImgList[0]
      }
    }


    let IsColImg = false;
    if (colImg?.length > 0) {
      IsColImg = await checkImageAvailability(colImg)
    }

    if (pd?.ImageCount > 0 && !IsColImg) {
      for (let i = 1; i <= pd?.ImageCount; i++) {
        let imgString =
          // storeInit?.DesignImageFol +
          storeInit?.CDNDesignImageFol +
          pd?.designno +
          "~" +
          i +
          "." +
          pd?.ImageExtension;

        let IsImg = checkImageAvailability(imgString)
        if (IsImg) {
          pdImgList.push(imgString);
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
    }
    else {
      pdvideoList = [];
    }

    let FinalPdImgList = [];

    if (pdImgList?.length > 0) {
      for (let i = 0; i < pdImgList?.length; i++) {
        let isImgAvl = await checkImageAvailability(pdImgList[i])
        if (isImgAvl) {
          FinalPdImgList.push(pdImgList[i])
        }
      }
    }

    // console.log("SearchData",singleProd);

    if (FinalPdImgList?.length > 0) {
      finalprodListimg = FinalPdImgList[0];
      setSelectedThumbImg({ "link": FinalPdImgList[0], "type": 'img' });
      setPdThumbImg(FinalPdImgList);
      setThumbImgIndex(0)
    } else {
      // step 2 
      setSelectedThumbImg({ link: imageNotFound, type: "img" });
      setPdThumbImg();
      setThumbImgIndex();
    }

    if (pdvideoList?.length > 0) {
      setPdVideoArr(pdvideoList);
    } else {
      setPdVideoArr([]);
    }

    return finalprodListimg;


  };

  useEffect(() => {
    ProdCardImageFunc();
  }, [singleProd, location?.key]);


  useEffect(() => {
    if (isImageload === false) {
      if (!(pdThumbImg?.length !== 0 || pdVideoArr?.length !== 0)) {
        setSelectedThumbImg({ "link": imageNotFound, "type": 'img' });
        // setIsImageLoad(false)
      }
    }
  }, [isImageload])

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const handleMetalWiseColorImg = async (e) => {
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr = mtColorLocal?.filter(
        (ele) => ele?.colorcode == e.target.value
      )[0];
    }

    setSelectMtColor(e.target.value);

    // let imgLink =       storeInit?.DesignImageFol +
    let imgLink = storeInit?.CDNDesignImageFol +
      (singleProd ?? singleProd1)?.designno +
      "~" +
      (thumbImgIndex + 1) + "~" + mcArr?.colorcode +
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
          // storeInit?.DesignImageFol +
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          i +
          "~" + mcArr?.colorcode +
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
        let isImgAvl = await checkImageAvailability(pdImgListCol[i])
        if (isImgAvl) {
          FinalPdColImgList.push(pdImgListCol[i])
        } else {
          FinalPdColImgList.push(imageNotFound)
        }
      }
    }

    if (FinalPdColImgList?.length > 0 && isImgCol == true) {
      setPdThumbImg(FinalPdColImgList);
      setSelectedThumbImg({ link: FinalPdColImgList[thumbImgIndex], type: "img" });
      setThumbImgIndex(thumbImgIndex);
    } else {
      if (pdImgList?.length > 0) {
        setSelectedThumbImg({ link: pdImgList[thumbImgIndex], type: "img" });
        setPdThumbImg(pdImgList);
        setThumbImgIndex(thumbImgIndex);
      }
    }
  };

  const handleCartandWish = (e, ele, type) => {
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let prodObj = {
      StockId: ele?.StockId,
      Unitcost: ele?.Amount,
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

    // step 1
    setSingleProd1({});
    setSingleProd({});
    setIsImageLoad(true);
    setProdLoading(true)
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
      mt: metalArr,
      diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
      csQc: `${csArr?.QualityId},${csArr?.ColorId}`,
    };

    let prod = {
      a: singleProd?.autocode,
      b: singleProd?.designno,
    };

    setisPriceLoading(true);
    await SingleProdListAPI(prod, size ?? sizeData, obj, cookie)
      .then((res) => {
        setSingleProd1(res?.pdList[0]);

        if (res?.pdList?.length > 0) {
          setisPriceLoading(false);
        }
        setDiaList(res?.pdResp?.rd3);
        setCsList(res?.pdResp?.rd4);
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

  return (
    <>
      {isDataFound ?
        (<div
          style={{
            height: "70vh",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
          className="smr_prodd_datanotfound_ss"
        >
          Data not Found!!
        </div>)
        :
        (<div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "15px",
              visibility: "hidden"
            }}
          >
            <div className="breadCrumb_menu">
              <span style={{ textTransform: "uppercase" }}>
                {singleProd?.TitleLine ? `${singleProd?.TitleLine} (${singleProd?.designno})` : singleProd?.designno}
              </span>
            </div>
          </div>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            className="productDetail-container-flex"
          >
            <div className="dt_product-detail-container">
              <div className="srprodetail1" style={{ display: isImageload && "flex", alignItems: isImageload && 'center', }}>
                {/* <div className="smr_prod_image_Sec"> */}
                {/* {isImageload && ( */}
                {isImageload && (
                  <Skeleton
                    // sx={{
                    //   width: "95%",
                    //   // height: "750px",
                    //   height: '100% !important',
                    //   // margin: "20px 0 0 0",
                    // }}
                    sx={{
                      width: "95%",
                      height: "550px",
                      margin: "20px 0 0 0",
                    }}
                    className="dt_skeleton_main"
                    variant="rounded"
                  />
                )}

                {!isImageload ? <div
                  className="dt_main_prod_img"
                >
                  {selectedThumbImg?.type == "img" ? (
                    <img
                      // src={
                      //   pdThumbImg?.length > 0
                      //     ? selectedThumbImg?.link
                      //     : imageNotFound
                      // }
                      ref={imgRef}
                      src={selectedThumbImg?.link}
                      onError={(e) => {
                        e.target.src = imageNotFound
                      }}
                      alt={""}
                      onLoad={() => setIsImageLoad(false)}
                      className="dt_prod_img"
                    />
                  ) : (
                    <div className="dt_prod_video">
                      <video
                        src={selectedThumbImg?.link}
                        loop={true}
                        autoPlay={true}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          // marginTop: "40px",
                          borderRadius: "4px",
                        }}
                        onError={(e) => {
                          e.target.poster = imageNotFound
                        }}
                      />
                    </div>
                  )}

                  <div className="dt_thumb_prod_img">
                    {(pdThumbImg?.length > 1 || pdVideoArr?.length > 0) &&
                      pdThumbImg?.map((ele, i) => (
                        <img
                          src={ele}
                          alt={""}
                          onLoad={() => setIsImageLoad(false)}
                          className="dt_prod_thumb_img"
                          onClick={() => {
                            setSelectedThumbImg({
                              link: ele,
                              type: "img",
                            });
                            setThumbImgIndex(i);
                          }}
                          onError={(e) => {
                            e.target.src = imageNotFound
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
                          setSelectedThumbImg({ link: data, type: "vid" })
                        }
                      >
                        <video
                          src={data}
                          autoPlay={true}
                          loop={true}
                          className="dt_prod_thumb_img"
                          onError={(e) => {
                            e.target.poster = imageNotFound
                          }}
                        // style={{ height: "100px", objectFit: "cover" }}
                        />
                        <IoIosPlayCircle
                          className="Dt_palyCircle"
                        // style={{
                        //   position: "absolute",
                        //   color: "white",
                        //   width: "50px",
                        //   height: "50px",
                        // }}
                        />
                      </div>
                    ))}
                  </div>
                </div> : null}

                {/* </div> */}
              </div>
              <div className="srprodetail2">
                <div className="srprodetail2-cont">
                  <p className="smilingProdutDetltTitle">{singleProd?.TitleLine ? `${singleProd?.TitleLine ?? ""}` : ''}</p>

                  {storeInit?.IsPriceShow === 1 &&
                    (isPriceloading ? (
                      <Skeleton variant="rounded" width={240} height={30} />
                    ) : (
                      <div>
                        <p
                          style={{
                            color: "#7d7f85",
                            fontSize: "12px",
                            display: "flex",
                          }}
                        >
                          <span className="mainpriceDeatilPage">
                            {/* <text>From:</text>&nbsp; */}
                            {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                            &nbsp;
                            {formatter.format(
                              singleProd1?.UnitCostWithMarkUp ??
                              singleProd?.UnitCostWithMarkUp
                            )}
                          </span>
                        </p>
                      </div>
                    ))}

                  {singleProd?.description &&
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p
                        style={{
                          color: "#7d7f85",
                          fontSize: "14px",
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          // whiteSpace: 'nowrap',
                          display: isExpanded ? 'block' : '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: isExpanded ? 'none' : 3,
                          height: isExpanded ? 'auto' : '4.5em',
                          margin: '0px'
                        }}
                      >
                        {singleProd?.description}
                      </p>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleExpand();
                        }}
                        style={{
                          color: 'black',
                          cursor: 'pointer',
                        }}
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </a>
                    </div>
                  }
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      width: "100%",
                      marginTop: "12px",
                    }}
                    className="CustomiZationDeatilPageWeb"
                  >
                    {storeInit?.IsProductWebCustomization == 1 && (
                      <>
                        {metalTypeCombo?.length > 0 &&
                          storeInit?.IsMetalCustomization === 1 ? (
                          <div
                            style={{
                              display: "flex",
                              width: "95%",
                              marginBottom: "15px",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <label className="dt_menuItemTimeEleveDeatil">
                              METAL TYPE:
                            </label>
                            {singleProd?.IsMrpBase == 1 ? (
                              <span
                                style={{ fontSize: "13px", color: "rgb(66, 66, 66)" }}
                              >
                                {singleProd?.MetalTypePurity}
                              </span>
                            ) : (
                              <select
                                className="dt_menuitemSelectoreMain"
                                value={selectMtType}
                                onChange={(e) => handleCustomChange(e, "mt")}
                                style={{ marginLeft: "54px" }}
                              >
                                {metalTypeCombo.map((ele) => (
                                  <option key={ele?.Metalid} value={ele?.metaltype}>
                                    {ele?.metaltype}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ) : null}

                        {storeInit?.IsDiamondCustomization === 1 &&
                          diaQcCombo?.length > 0 &&
                          diaList?.length ? (
                          <div
                            style={{
                              display: "flex",
                              width: "95%",
                              marginBottom: "15px",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <label className="dt_menuItemTimeEleveDeatil">
                              DIAMOND :
                            </label>
                            {singleProd?.IsMrpBase == 1 ? (
                              <span
                                style={{ fontSize: "13px", color: "rgb(66, 66, 66)" }}
                              >
                                {singleProd?.DiaQuaCol}
                              </span>
                            ) : (
                              <select
                                className="dt_menuitemSelectoreMain"
                                value={selectDiaQc}
                                onChange={(e) => handleCustomChange(e, "dia")}
                                style={{ marginLeft: "64px" }}
                              >
                                {diaQcCombo.map((ele) => (
                                  <option
                                    key={ele?.QualityId}
                                    value={`${ele?.Quality},${ele?.color}`}
                                  >{`${ele?.Quality}, ${ele?.color}`}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        ) : null}

                        {storeInit?.IsCsCustomization === 1 &&
                          selectCsQc?.length > 0 &&
                          csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 ? (
                          <div
                            style={{
                              display: "flex",
                              width: "95%",
                              marginBottom: "15px",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <label className="dt_menuItemTimeEleveDeatil">
                              COLOR STONE :
                            </label>
                            {singleProd?.IsMrpBase == 1 ? (
                              <span
                                style={{ fontSize: "13px", color: "rgb(66, 66, 66)" }}
                              >
                                {singleProd?.CsQuaCol}
                              </span>
                            ) : (
                              <select
                                className="dt_menuitemSelectoreMain"
                                value={selectCsQc}
                                onChange={(e) => handleCustomChange(e, "cs")}
                                style={{ marginLeft: "35px" }}
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

                        {metalColorCombo?.length > 0 &&
                          storeInit?.IsMetalTypeWithColor === 1 ? (
                          <div
                            style={{
                              display: "flex",
                              width: "95%",
                              marginBottom: "15px",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <label className="dt_menuItemTimeEleveDeatil">
                              METAL COLOR:
                            </label>
                            {singleProd?.IsMrpBase == 1 ? (
                              <span
                                style={{ fontSize: "13px", color: "rgb(66, 66, 66)" }}
                              >
                                {
                                  metalColorCombo?.filter(
                                    (ele) => ele?.id == singleProd?.MetalColorid
                                  )[0]?.metalcolorname
                                }
                              </span>
                            ) : (
                              <select
                                className="dt_menuitemSelectoreMain"
                                value={selectMtColor}
                                onChange={(e) => handleMetalWiseColorImg(e)}
                                style={{ marginLeft: "40px" }}
                              >
                                {metalColorCombo?.map((ele) => (
                                  <option key={ele?.id} value={ele?.colorcode}>
                                    {ele?.metalcolorname}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ) : null}

                        {(SizeCombo?.rd?.length > 0 && singleProd?.DefaultSize !== "") ? (
                          <div
                            style={{
                              display: "flex",
                              width: "95%",
                              marginBottom: "15px",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <label className="dt_menuItemTimeEleveDeatil">SIZE:</label>
                            {singleProd?.IsMrpBase == 1 ? (
                              <span
                                style={{ fontSize: "13px", color: "rgb(66, 66, 66)", marginBottom: '3px' }}
                              >
                                {singleProd?.DefaultSize}
                              </span>
                            ) : (
                              <select
                                className="dt_menuitemSelectoreMain"
                                value={sizeData}
                                onChange={(e) => handleCustomChange(e, "sz")}
                                style={{ marginLeft: "109px" }}
                              >
                                {SizeCombo?.rd?.map((ele) => (
                                  <option value={ele?.sizename} key={ele?.id}>
                                    {ele?.sizename}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ) : null}
                      </>
                    )}
                    {/* <Divider sx={{
                      marginTop: '20px', background: '#a9a7a7',
                      marginTop: '20px'
                }} /> */}
                  </div>
                  <div
                    className="part-container"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      paddingBottom: "12px",
                    }}
                  >
                    <div
                      className="part1"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                      }}
                    >
                      {(singleProd?.MetalTypePurity !== "" && selectMtType && singleProd?.IsMrpBase !== 1) ? <span className="part1_key">
                        Metal Purity:{" "}
                        <span className="part1_value">{singleProd?.IsMrpBase === 1 ? singleProd?.MetalTypePurity : selectMtType}</span>
                      </span> : null}
                      {(singleProd?.IsMrpBase !== 1) ? <sapn className="part1_key">
                        Metal Color:{" "}
                        <span className="part1_value">{JSON.parse(sessionStorage.getItem("MetalColorCombo"))?.filter(
                          (ele) => ele?.colorcode == selectMtColor
                        )[0]?.metalcolorname}</span>
                      </sapn> : null}

                      {(storeInit?.IsDiamondCustomization === 1 &&
                        diaQcCombo?.length > 0 && diaList?.length && singleProd?.DiaQuaCol !== "" && selectDiaQc && singleProd?.IsMrpBase !== 1) ? <sapn className="part1_key">
                        Diamond Quality Color:{" "}
                        <span className="part1_value">{`${selectDiaQc}`}</span>
                      </sapn> : null}

                      {storeInit?.IsB2BWebsite == 0 ? <sapn className="part1_key">
                        Gross Wt:{" "}
                        <span className="part1_value">
                          {(singleProd1?.Gwt ?? singleProd?.Gwt)?.toFixed(3)}
                        </span>
                      </sapn> : null}

                      <sapn className="part1_key">
                        Net Wt:{" "}
                        <span className="part1_value">
                          {(singleProd1?.Nwt ?? singleProd?.Nwt)?.toFixed(3)}
                        </span>
                      </sapn>


                    </div>
                  </div>

                  {storeInit?.IsPriceBreakUp == 1 && singleProd1?.IsMrpBase !== 1 && singleProd?.IsMrpBase !== 1 && (
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
                        "&.MuiPaper-root.MuiAccordion-root:before":
                        {
                          background: "none",
                        },
                      }}
                      className="dt_price_breakup"
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
                        <Typography sx={{ fontFamily: "TT Commons Regular", fontSize: '18px' }}>Price Breakup</Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          padding: '0 0 16px 0',

                        }}
                      >

                        {(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        </div> : null}

                        {
                          (

                            (singleProd1?.Other_Cost ? singleProd1?.Other_Cost : singleProd?.Other_Cost) +
                            (singleProd1?.Size_MarkUp ? singleProd1?.Size_MarkUp : singleProd?.Size_MarkUp) +
                            (singleProd1?.DesignMarkUpAmount ? singleProd1?.DesignMarkUpAmount : singleProd?.DesignMarkUpAmount) +
                            (singleProd1?.ColorStone_SettingCost ? singleProd1?.ColorStone_SettingCost : singleProd?.ColorStone_SettingCost) +
                            (singleProd1?.Diamond_SettingCost ? singleProd1?.Diamond_SettingCost : singleProd?.Diamond_SettingCost) +
                            (singleProd1?.Misc_SettingCost ? singleProd1?.Misc_SettingCost : singleProd?.Misc_SettingCost)

                          ) !== 0 ?

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography className="smr_Price_breakup_label" sx={{ fontFamily: "TT Commons Regular" }}>Other </Typography>

                              <span style={{ display: 'flex' }}>
                                <Typography>{
                                  <span className="smr_currencyFont" sx={{ fontFamily: "TT Commons Regular" }}>
                                    {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                  </span>
                                }</Typography>
                                &nbsp;
                                <Typography className="smr_PriceBreakup_Price" sx={{ fontFamily: "TT Commons Regular" }}>{
                                  formatter.format((

                                    (singleProd1?.Other_Cost ? singleProd1?.Other_Cost : singleProd?.Other_Cost) +
                                    (singleProd1?.Size_MarkUp ? singleProd1?.Size_MarkUp : singleProd?.Size_MarkUp) +
                                    (singleProd1?.DesignMarkUpAmount ? singleProd1?.DesignMarkUpAmount : singleProd?.DesignMarkUpAmount) +
                                    (singleProd1?.ColorStone_SettingCost ? singleProd1?.ColorStone_SettingCost : singleProd?.ColorStone_SettingCost) +
                                    (singleProd1?.Diamond_SettingCost ? singleProd1?.Diamond_SettingCost : singleProd?.Diamond_SettingCost) +
                                    (singleProd1?.Misc_SettingCost ? singleProd1?.Misc_SettingCost : singleProd?.Misc_SettingCost)

                                  )?.toFixed(2))
                                }</Typography>
                              </span>
                            </div>
                            :
                            null
                        }

                      </AccordionDetails>
                    </Accordion>
                  )}
                  <p className="smilingProdutDetltTitle">{singleProd?.designno}</p>
                  {/* {storeInit?.IsPriceShow === 1 &&
                    (isPriceloading ? (
                      <Skeleton variant="rounded" width={240} height={30} sx={{ marginTop: '5px' }} />
                    ) : (
                      <div>
                        <p
                          style={{
                            color: "#7d7f85",
                            fontSize: "12px",
                            display: "flex",
                            marginTop: '5px'
                          }}
                        >
                          <span className="mainpriceDeatilPage">
                            {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                            &nbsp;
                            {formatter.format(
                              singleProd1?.UnitCostWithMarkUp ??
                              singleProd?.UnitCostWithMarkUp
                            )}
                          </span>
                        </p>
                      </div>
                    ))} */}

                  {!prodLoading ? (<div>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="addtocartcont"
                        onClick={() => handleCart(!addToCartFlag)}
                      >
                        <span className="addtocarttxt">
                          {addToCartFlag ? "REMOVE FROM CART" : "ADD TO CART"}
                        </span>
                      </div>
                      {
                        <div className="wishlistcont">
                          <FormControlLabel
                            label={
                              <span
                                className="wishlist_label"
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  color: "#999",
                                  fontSize: "16px",
                                }}
                              >
                                ADD TO WISHLIST
                              </span>
                            }
                            control={
                              <Checkbox
                                icon={
                                  <FavoriteBorderIcon
                                    sx={{ fontSize: "25px", color: "pink" }}
                                  />
                                }
                                checkedIcon={
                                  <FavoriteIcon
                                    sx={{ fontSize: "25px", color: "pink" }}
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
                            }
                          />

                          {/* <label>Browse wishlist</label> */}
                        </div>
                      }
                    </div>
                    {singleProd?.InStockDays !== 0 && <p style={{ margin: '20px 0px 0px 0px', fontWeight: 500, fontSize: '18px', fontFamily: 'TT Commons Regular', color: '#7d7f85' }}>Express Shipping in Stock {singleProd?.InStockDays} Days Delivery</p>}
                    {singleProd?.MakeOrderDays != 0 && <p style={{ margin: '0px', fontWeight: 500, fontSize: '18px', fontFamily: 'TT Commons Regular', color: '#7d7f85' }}>Make To Order {singleProd?.MakeOrderDays} Days Delivery</p>}
                  </div>) : null}
                </div>
              </div>
            </div>


          </div>
          <div className="dia_material_details_portion" style={{ marginBottom: '50px' }}>
            {(diaList?.length > 0 || csList?.filter((ele) => ele?.D === "MISC")?.length > 0 || csList?.filter((ele) => ele?.D !== "MISC")?.length > 0) && (
              <p className="smr_details_title"> Product Details</p>
            )}
            {diaList?.length > 0 && (
              <div className="smr_material_details_portion_inner">
                <ul style={{ margin: "0px 0px 3px 0px" }}>
                  <li
                    style={{ fontWeight: 600 }}
                  >{`Diamond Detail(${diaList
                    ?.reduce(
                      (accumulator, data) => accumulator + data?.N,
                      0
                    )
                    .toFixed(3)}ct)`}</li>
                </ul>
                <ul className="smr_mt_detail_title_ul">
                  <li className="dt_deatil_proDeatilList">Shape</li>
                  <li className="dt_deatil_proDeatilList">Quality</li>
                  <li className="dt_deatil_proDeatilList">Color</li>
                  <li className="dt_deatil_proDeatilList">Pcs / Wt</li>
                </ul>
                {diaList?.map((data) => (
                  <ul className="smr_mt_detail_title_ul">
                    <li className="dt_deatil_proDeatilList1">{data?.F}</li>
                    <li className="dt_deatil_proDeatilList1">{data?.H}</li>
                    <li className="dt_deatil_proDeatilList1">{data?.J}</li>
                    <li className="dt_deatil_proDeatilList1">
                      {data?.M} / {(data?.N)?.toFixed(3)}
                    </li>
                  </ul>
                ))}
              </div>
            )}
            {csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 && (
              <div className="smr_material_details_portion_inner">
                <ul style={{ margin: "10px 0px 3px 0px" }}>
                  <li
                    style={{ fontWeight: 600 }}
                  >{`ColorStone Detail(${csList?.filter((ele) => ele?.D !== "MISC")
                    ?.reduce(
                      (accumulator, data) => accumulator + data?.N,
                      0
                    )
                    .toFixed(3)}ct)`}</li>
                </ul>
                <ul className="smr_mt_detail_title_ul">
                  <li className="dt_deatil_proDeatilList">Shape</li>
                  <li className="dt_deatil_proDeatilList">Quality</li>
                  <li className="dt_deatil_proDeatilList">Color</li>
                  <li className="dt_deatil_proDeatilList">Wt</li>
                </ul>
                {csList?.filter((ele) => ele?.D !== "MISC")?.map((data) => (
                  <ul className="smr_mt_detail_title_ul">
                    <li className="dt_deatil_proDeatilList1">{data?.F}</li>
                    <li className="dt_deatil_proDeatilList1">{data?.H}</li>
                    <li className="dt_deatil_proDeatilList1">{data?.J}</li>
                    <li className="dt_deatil_proDeatilList1">
                      {(data?.N)?.toFixed(3)}
                    </li>
                  </ul>
                ))}
              </div>
            )}

            {csList?.filter((ele) => ele?.D === "MISC")?.length > 0 && (
              <div className="smr_material_details_portion_inner">
                <ul style={{ margin: "10px 0px 3px 0px" }}>
                  <li
                    style={{ fontWeight: 600 }}
                  >{`MISC Detail(${csList?.filter((ele) => ele?.D === "MISC")
                    ?.reduce(
                      (accumulator, data) => accumulator + data?.N,
                      0
                    )
                    .toFixed(3)}ct)`}</li>
                </ul>
                <ul className="smr_mt_detail_title_ul">
                  <li className="dt_deatil_proDeatilList">Shape</li>
                  <li className="dt_deatil_proDeatilList">Quality</li>
                  <li className="dt_deatil_proDeatilList">Color</li>
                  <li className="dt_deatil_proDeatilList">Wt</li>
                </ul>
                {csList?.filter((ele) => ele?.D === "MISC")?.map((data) => (
                  <ul className="smr_mt_detail_title_ul">
                    <li className="dt_deatil_proDeatilList1">{data?.F}</li>
                    <li className="dt_deatil_proDeatilList1">{data?.H}</li>
                    <li className="dt_deatil_proDeatilList1">{data?.J}</li>
                    <li className="dt_deatil_proDeatilList1">
                      {(data?.N)?.toFixed(3)}
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>

          {(stockItemArr?.length > 0 && storeInit?.IsStockWebsite === 1) && (
            <div className="smr_stockItem_div" style={{ marginBottom: "50px" }}>
              <p className="smr_details_title"> Stock Items </p>
              <div className="dt_stockitem_container" >
                {/* <div className="smr_stock_item_card">
                  {stockItemArr?.map((ele) => (
                    <div className="smr_stockItemCard">
                      <div className="cart_and_wishlist_icon">
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

                          onChange={(e) => handleCartandWish(e, ele, "Cart")}
                          checked={cartArr[ele?.StockId] ?? ele?.IsInCart === 1 ? true : false}
                        />

                      </div>
                      <img
                        className="smr_productCard_Image"
                        src={
                          storeInit?.DesignImageFol +
                          ele?.designno +
                          "_" +
                          "1" +
                          "." +
                          ele?.ImageExtension
                        }
                        alt={""}
                      />
                      <div className="smr_stockutem_shortinfo" style={{display:'flex',flexDirection:'column',gap:'5px',paddingBottom:'5px'}}>
                      <span className="smr_prod_designno">
                        {ele?.designno}
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
                          <span className="smr_prod_wt">
                            <span className="smr_d_keys">NWT:</span>
                            <span className="smr_d_val">{ele?.NetWt}</span>
                          </span>

                          {storeInit?.IsGrossWeight == 1 &&
                            Number(ele?.GrossWt) !== 0 && (
                              <>
                                <span>|</span>
                                <span className="smr_prod_wt">
                                  <span className="smr_d_keys">GWT:</span>
                                  <span className="smr_d_val">
                                    {ele?.GrossWt}
                                  </span>
                                </span>
                              </>
                            )}
                          {storeInit?.IsDiamondWeight == 1 &&
                            Number(ele?.DiaWt) !== 0 && (
                              <>
                                <span>|</span>
                                <span className="smr_prod_wt">
                                  <span className="smr_d_keys">DWT:</span>
                                  <span className="smr_d_val">
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
                                <span >|</span>
                                <span className="smr_prod_wt">
                                  <span className="smr_d_keys">CWT:</span>
                                  <span className="smr_d_val">
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

                      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}} className="smr_stockItem_price_type_mt">
                          <span>
                            {ele?.MetalColorName}-{ele?.metaltypename}{ele?.metalPurity} 
                            {" "}/{" "}
                            <span
                                className="smr_currencyFont"
                                dangerouslySetInnerHTML={{
                                  __html: decodeEntities(
                                    storeInit?.Currencysymbol
                                  ),
                                }}
                              />
                             </span>
                             <span>{" "}{ele?.Amount}</span>
                      </div>
                      </div>
                    </div>
                  ))}
                </div> */}
                <table className="dt_stockItem_table">
                  <tr className="dt_stockItem_table_tr">
                    <th className="dt_stockItem_table_td">SrNo</th>
                    <th className="dt_stockItem_table_td">Design No</th>
                    {/* <th className="dt_stockItem_table_td" >StockBarcode</th> */}
                    <th className="dt_stockItem_table_td">Job No</th>
                    <th
                      className="dt_stockItem_table_td"
                      style={{ textAlign: "center" }}
                    >
                      Gross Wt/Net Wt/Dia Wt/CS Wt
                    </th>
                    <th className="dt_stockItem_table_td">
                      Metal Color-Purity
                    </th>
                    <th className="dt_stockItem_table_td">Price</th>
                    <th className="dt_stockItem_table_td">
                      Add To Cart
                    </th>
                  </tr>
                  {stockItemArr?.map((ele, i) => (
                    <tr className="dt_stockItem_table_tr">
                      <td className="dt_stockItem_table_td">
                        <span className="smr_prod_designno">
                          {ele?.SrNo}
                        </span>
                      </td>
                      <td className="dt_stockItem_table_td">
                        <span className="smr_prod_designno">
                          {ele?.designno}
                        </span>
                      </td>
                      <td className="dt_stockItem_table_td">
                        <span className="smr_prod_designno">
                          {ele?.StockBarcode}
                        </span>
                      </td>
                      {/* <td className="dt_stockItem_table_td">
                        <span className="smr_prod_designno">
                        {ele?.JobNo}
                        </span>
                      </td> */}
                      <td className="dt_stockItem_table_td">
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
                            {storeInit?.IsGrossWeight == 1 &&
                              Number(ele?.GrossWt) !== 0 && (
                                <>
                                  <span className="smr_prod_wt">
                                    <span className="dt_d_keys">
                                      GWT:
                                    </span>
                                    <span className="dt_d_val">
                                      {ele?.GrossWt.toFixed(3)}
                                    </span>
                                  </span>
                                </>
                              )}

                            {Number(ele?.NetWt) !== 0 && (
                              <>
                                <span>|</span>
                                <span className="smr_prod_wt">
                                  <span className="dt_d_keys">NWT:</span>
                                  <span className="dt_d_val">
                                    {ele?.NetWt.toFixed(3)}
                                  </span>
                                </span>
                              </>
                            )}

                            {/* {storeInit?.IsGrossWeight == 1 &&
                              Number(ele?.GrossWt) !== 0 && (
                                <>
                                  <span>|</span>
                                  <span className="smr_prod_wt">
                                    <span className="dt_d_keys">GWT:</span>
                                    <span className="smr_d_val">
                                      {ele?.GrossWt}
                                    </span>
                                  </span>
                                </>
                              )} */}
                            {storeInit?.IsDiamondWeight == 1 &&
                              Number(ele?.DiaWt) !== 0 && (
                                <>
                                  <span>|</span>
                                  <span className="smr_prod_wt">
                                    <span className="dt_d_keys">
                                      DWT:
                                    </span>
                                    <span className="dt_d_val">
                                      {ele?.DiaWt.toFixed(3)}
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
                                  <span className="smr_prod_wt">
                                    <span className="dt_d_keys">
                                      CWT:
                                    </span>
                                    <span className="dt_d_val">
                                      {ele?.CsWt.toFixed(3)}
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
                      <td className="dt_stockItem_table_td">
                        {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}} className="smr_stockItem_price_type_mt"> */}
                        <span className="dt_table_mtcol">
                          {ele?.MetalColorName}-{ele?.metaltypename}
                          {ele?.metalPurity}
                          {/* {" "}/{" "} */}
                        </span>
                        {/* </div> */}
                      </td>
                      <td className="dt_stockItem_table_td">
                        <span className="dt_table_Price">
                          <span className="smr_currencyFont">
                            {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                          </span>
                          &nbsp;
                          <span> {
                            // formatter.format(
                            ele?.Amount
                            // )
                          }</span>
                        </span>
                      </td>
                      <td
                        className="dt_stockItem_table_td"
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
              </div>
            </div>
          )}

          {storeInit?.IsProductDetailSimilarDesign == 1 &&
            SimilarBrandArr?.length > 0 && (
              <div className="smr_stockItem_div" style={{ marginBottom: "50px" }}>
                <p className="smr_details_title"> Similar Designs</p>
                <div className="dt_stockitem_container">
                  <div className="smr_stock_item_card">
                    {SimilarBrandArr?.map((ele) => (
                      <div
                        className="smr_stockItemCard"
                        onClick={() =>
                          // setTimeout(() => 
                          handleMoveToDetail(ele)
                          // , 500)
                        }
                      >
                        <img
                          className="smr_productCard_Image"
                          src={
                            ele?.ImageCount > 0
                              ? storeInit?.CDNDesignImageFol + ele?.designno + "~" + "1" + "." + ele?.ImageExtension
                              : imageNotFound
                          }
                          alt={""}
                          onError={(e) => {
                            e.target.src = imageNotFound
                          }}
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

                          <div
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
                                {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                              </span>
                              &nbsp;
                            </spam>
                            <span>{
                              // formatter.format(
                              ele?.UnitCostWithMarkUp
                              // )
                            }</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          {storeInit?.IsProductDetailDesignSet === 1 &&
            <div className="dt_DesignSet_main">
              {designSetList?.length > 0 && <div
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
              </div>}

              <div className="dt_Swiper_designSet" >
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
                      <div className="dt_compeletethelook_cont">
                        <div className="dt_ctlImg_containe">
                          <img
                            // src={
                            //   "https://cdn.accentuate.io/3245609615460/4121939443812/99-v1581576944425.jpg?2048x1950"
                            // }
                            src={
                              designSetList?.DefaultImageName ? storeInit?.DesignSetImageFol +
                                designSetList?.designsetuniqueno +
                                "/" +
                                designSetList?.DefaultImageName
                                :
                                imageNotFound
                            }
                            onError={(e) => {
                              e.target.src = imageNotFound
                            }}
                            alt={""}
                            className="dt_ctl_img"
                          />
                        </div>

                        <div
                          className={
                            (designSetList?.Designdetail == undefined
                              ? []
                              : JSON.parse(designSetList?.Designdetail)
                            )?.length > 3
                              ? "dt_compeletethelook_prodt_for_3"
                              : "dt_compeletethelook_prodt"
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

                          {(designSetList?.Designdetail == undefined
                            ? []
                            : JSON.parse(designSetList?.Designdetail)
                          )?.map((ele, i) => (
                            <div
                              className="dt_completethelook_outer"
                              onClick={() => handleMoveToDetail(ele)}
                              style={{ borderTop: i !== 0 ? "none" : "" }}
                            >
                              <div style={{ display: "flex", gap: "60px" }}>
                                <div style={{ marginLeft: "12px" }}>
                                  <img
                                    src={
                                      ele?.ImageCount > 0
                                        ? storeInit?.CDNDesignImageFol + ele?.designno + "~" + "1" + "." + ele?.ImageExtension
                                        : imageNotFound
                                    }
                                    alt={""}
                                    // src={
                                    //   "https://smilingrocks.com/cdn/shop/products/Lab-grown-diamond-white-gold-earrings-sre00362wht_medium.jpg?v=1590473229"
                                    // }
                                    className="dt_srthelook_img"
                                    onError={(e) => {
                                      e.target.src = imageNotFound
                                    }}
                                  />
                                </div>
                                <div className="dt_srthelook_prodinfo">
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      color: "#7d7f85",
                                      textTransform: "uppercase",
                                    }}
                                    className="dtthelook_prodinfo_inner"
                                  >
                                    <p>
                                      {ele?.designno} - {ele?.CategoryName}
                                      <br />
                                      {
                                        <span className="dt_currencyFont">
                                          {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }
                                      &nbsp;
                                      {
                                        formatter.format(
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
            </div>}
          <Footer />
        </div>)
      }
    </>
  );
};

export default ProductDetail;
