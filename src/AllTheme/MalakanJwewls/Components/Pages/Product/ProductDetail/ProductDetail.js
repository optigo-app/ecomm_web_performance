import React, { useEffect, useRef, useState } from "react";
import "./Productdetail.scss";
import Footer from "../../Home/Footer/Footer";
import { useAsyncError, useLocation, useNavigate } from "react-router-dom";
import Pako from "pako";
import { SingleProdListAPI } from "../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI";
import { SingleFullProdPriceAPI } from "../../../../../../utils/API/SingleFullProdPriceAPI/SingleFullProdPriceAPI";
import NOimage from "../../../Assets/image-not-found.jpg";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Skeleton, Typography } from "@mui/material";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useSetRecoilState } from "recoil";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { IoIosPlayCircle } from "react-icons/io";
import { getSizeData } from "../../../../../../utils/API/CartAPI/GetCategorySizeAPI"
import { StockItemApi } from "../../../../../../utils/API/StockItemAPI/StockItemApi";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import visionArround from '../../../Assets/360.png'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Cookies from 'js-cookie'
import { DesignSetListAPI } from "../../../../../../utils/API/DesignSetListAPI/DesignSetListAPI";
import { Helmet } from "react-helmet";
import axios from "axios";
import { mala_CartCount, mala_WishCount } from "../../../Recoil/atom";
import { SaveLastViewDesign } from "../../../../../../utils/API/SaveLastViewDesign/SaveLastViewDesign";
import { formatRedirectTitleLine, formatTitleLine } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const ProductDetail = () => {
  let location = useLocation();
  const ErrornoiMAGE = '';
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
  const [selectedThumbImg, setSelectedThumbImg] = useState({})
  const [decodeUrl, setDecodeUrl] = useState({});
  // const [finalprice, setFinalprice] = useState(0);
  const [addToCartFlag, setAddToCartFlag] = useState(null);
  const [wishListFlag, setWishListFlag] = useState(null);
  const [loginInfo, setLoginInfo] = useState();
  const [SizeCombo, setSizeCombo] = useState();
  const [sizeData, setSizeData] = useState();
  const [isPriceloading, setisPriceLoading] = useState(false)
  const [isDataFound, setIsDataFound] = useState(false)
  const [metalWiseColorImg, setMetalWiseColorImg] = useState()
  const [vison360, setVision360] = useState()
  const [designSetList, setDesignSetList] = useState();
  const [thumbImgIndex, setThumbImgIndex] = useState()
  const [diaList, setDiaList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [prodLoading, setProdLoading] = useState(true)
  const [selectedMetalColor, setSelectedMetalColor] = useState();

  const [isExpanded, setIsExpanded] = useState(false);

  const [imageAvailability, setImageAvailability] = useState({});
  const [imageAvailability1, setImageAvailability1] = useState({});


  const setCartCountVal = useSetRecoilState(mala_CartCount)
  const setWishCountVal = useSetRecoilState(mala_WishCount)

  const [pdVideoArr, setPdVideoArr] = useState([]);
  const [saveLastView, setSaveLastView] = useState();


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

  const [cartArr, setCartArr] = useState({})


  let cookie = Cookies.get('visiterId')

  // console.log("selectttt",{selectMtType,selectDiaQc,selectCsQc,selectMtColor});

  // console.log("sizeData",sizeData)

  // console.log("pdVideoArr", selectedThumbImg?.link ?? ErrornoiMAGE)

  const navigate = useNavigate()

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
  }, [])

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

    const metal =
      metalTypeCombo?.find((ele) => {
        return ele?.metaltype == selectMtType
      }) ?? metalTypeCombo;

    const dia =
      diaQcCombo?.find((ele) => {
        return ele?.Quality == selectDiaQc.split(",")[0] &&
          ele?.color == selectDiaQc.split(",")[1]
      }) ?? diaQcCombo;

    const cs =
      csQcCombo?.find((ele) => {
        return ele?.Quality == selectCsQc.split(",")[0] &&
          ele?.color == selectCsQc.split(",")[1]
      }) ?? csQcCombo;

    let mcArr = metalColorCombo?.filter(
      (ele) => {
        if (selectMtColor) {
          return ele?.colorcode == selectMtColor
        }
        else { return ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid) }
      })[0];

    console.log("selectMtColor", selectMtColor);

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: `${dia?.QualityId ?? 0},${dia?.ColorId ?? 0}`,
      CsQCid: `${cs?.QualityId ?? 0},${cs?.ColorId ?? 0}`,
      Size: sizeData ?? singleProd?.DefaultSize,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup: singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
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

    const metal =
      metalTypeCombo?.find((ele) => {
        return ele?.metaltype == selectMtType
      }) ?? metalTypeCombo;

    const dia =
      diaQcCombo?.find((ele) => {
        return ele?.Quality == selectDiaQc.split(",")[0] &&
          ele?.color == selectDiaQc.split(",")[1]
      }) ?? diaQcCombo;

    const cs =
      csQcCombo?.find((ele) => {
        return ele?.Quality == selectCsQc.split(",")[0] &&
          ele?.color == selectCsQc.split(",")[1]
      }) ?? csQcCombo;

    let mcArr = metalColorCombo?.filter(
      (ele) => {
        if (selectMtColor) {
          return ele?.colorcode == selectMtColor
        }
        else { return ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid) }
      })[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: `${dia?.QualityId ?? 0},${dia?.ColorId ?? 0}`,
      CsQCid: `${cs?.QualityId ?? 0},${cs?.ColorId ?? 0}`,
      Size: sizeData ?? (singleProd1?.DefaultSize ?? singleProd?.DefaultSize),
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup: singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
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
      mcArr =
        mtColorLocal?.filter(
          (ele) => ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
          // (ele) => ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
        )[0]
    }

    setSelectMtColor(mcArr?.colorcode);

  }, [singleProd])
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

  const handleMoveToDetail = (productData) => {

    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let storeInit = JSON.parse(sessionStorage.getItem('storeInit'));

    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: loginInfo?.MetalId ?? storeInit?.MetalId,
      d: loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
      c: loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
      f: {},
    };

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    // navigate(
    //   `/d/${productData?.TitleLine?.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
    //   }${productData?.designno}?p=${encodeObj}`
    // );
    navigate(`/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`);

    // setp 1
    setSingleProd1({});
    setSingleProd({});
    setIsImageLoad(true);
    setImagePromise(true);
    setProdLoading(true);
    setWishListFlag(null)
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

    let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));

    let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));

    let metalArr;
    let diaArr;
    let csArr;

    if (mtTypeLocal?.length) {
      metalArr =
        mtTypeLocal?.filter(
          (ele) => ele?.Metalid == decodeobj?.m
        )[0]?.Metalid ?? decodeobj?.m;
    }

    if (diaQcLocal) {
      diaArr =
        diaQcLocal?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.d?.split(",")[0] &&
            ele?.ColorId == decodeobj?.d?.split(",")[1]
        )[0] ?? `${decodeobj?.d?.split(",")[0]},${decodeobj?.d?.split(",")[1]}`;
    }

    if (csQcLocal) {
      csArr =
        csQcLocal?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.c?.split(",")[0] &&
            ele?.ColorId == decodeobj?.c?.split(",")[1]
        )[0] ?? `${decodeobj?.c?.split(",")[0]},${decodeobj?.c?.split(",")[1]}`;
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
      // let obj = {
      //   mt: metalArr ? metalArr : (logininfoInside?.MetalId ?? storeinitInside?.MetalId),
      //   diaQc: diaArr ? `${diaArr?.QualityId},${diaArr?.ColorId}` : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid) ,
      //   csQc: csArr ? `${csArr?.QualityId},${csArr?.ColorId}` : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid)
      // }

      // console.log("objjj",obj)

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
              //   link: "",
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

  const [LoadChecker, setloadchecker] = useState(true)
  const [ImagePromise, setImagePromise] = useState(true);

  const imageCache = {};  // Caching object to store checked images

  const loadAndCheckImages = async (img) => {
    if (imageCache[img] !== undefined) {
      // If the image result is already cached, return the cached result
      return imageCache[img];
    }

    try {
      const result = await checkImage(img);
      imageCache[img] = result;
      return result;
    } catch (error) {
      imageCache[img] = NOimage;
      return NOimage;
    } finally {
      if (!prodLoading) {
        setTimeout(() => {
          setImagePromise(false);
        }, 0);
      }
    }
  };

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
      else if (item?.TI === 3 && !item?.CN) normalVideos.push(item);
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
      const extension = isColor ?
        colorImages[i - 1]?.Ex :
        normalImages[i - 1]?.Ex;

      const imageUrl = isColor ?
        `${base}${pd.designno}~${i}~${mcArr?.colorcode}.${colorImages[i - 1]?.Ex}`
        : `${base}${pd.designno}~${i}.${normalImages[i - 1]?.Ex}`;

      return { imageUrl, extension }
    };

    const pdImgList = [];

    if (maxColorCount > 0) {
      // Asynchronously populate pdImgList with color images
      for (let i = 1; i <= maxColorCount; i++) {
        const colorImageUrl = buildImageURL(i, true);
        const isColorImageAvailable = await checkImageAvailability(colorImageUrl?.imageUrl);

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

    // Now check if pdImgList is populated and set finalprodListimg after that
    let finalprodListimg = {};
    if (pdImgList.length > 0) {
      finalprodListimg = pdImgList[0];

      // Set the selected thumbnail image if we have a valid image
      if (Object.keys(finalprodListimg).length > 0) {
        setSelectedThumbImg({
          link: {
            imageUrl: finalprodListimg?.imageUrl,
            extension: finalprodListimg?.extension
          },
          type: 'img'
        });
      }
    } else {
      console.log("No images found, pdImgList is empty.");
    }

    if (pdImgList.length) {
      const thumbImagePath = pdImgList.map(url => {
        const fileName = url?.imageUrl?.split("Design_Image/")[1];
        const thumbImageUrl = `${storeInit?.CDNDesignImageFolThumb}${fileName?.split('.')[0]}.jpg`;
        const originalImageExtension = url?.extension;
        return { thumbImageUrl, originalImageExtension };
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
  }, [singleProd, singleProd1, location?.key]);

  useEffect(() => {
    if (isImageload === false) {
      if (!(pdThumbImg?.length !== 0 || pdVideoArr?.length !== 0)) {
        setSelectedThumbImg({ "link": { "imageUrl": NOimage, "extension": "" }, "type": 'img' });
      }
    }
  }, [isImageload])

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

    // Filter categorized media
    const normalImages = [], colorImages = [], normalVideos = [], colorVideos = [];
    parsedData.forEach(item => {
      if (item?.TI === 1 && !item?.CN) normalImages.push(item);
      else if (item?.TI === 2 && item?.CN) colorImages.push(item);
      else if (item?.TI === 4 && item?.CN) colorVideos.push(item);
      else if (item?.TI === 3 && !item?.CN) normalVideos.push(item);
    });

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
    const buildColorImageList = () => Array.from({ length: maxColorImgCount }, (_, i) => {
      const extension = colorImages[i]?.Ex;
      const imageUrl = `${baseCDN}${designno}~${i + 1}~${mcArr?.colorcode}.${colorImages[i]?.Ex}`;
      return { imageUrl, extension }
    }
    );

    const buildNormalImageList = () => Array.from({ length: normalImageCount }, (_, i) => {
      const extension = normalImages[i]?.Ex;
      const imageUrl = `${baseCDN}${designno}~${i + 1}.${normalImages[i]?.Ex}`;

      return { imageUrl, extension }
    }
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
        checkImages.map(url => checkImageAvailability(url?.imageUrl))
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
        const fileName = url?.imageUrl.split('Design_Image/')[1]?.split('.')[0];
        const thumbImageUrl = `${thumbCDN}${fileName}.jpg`;
        const originalImageExtension = url?.extension;
        return { thumbImageUrl, originalImageExtension };
      });

      setPdThumbImg(thumbImagePath);

      const safeIndex = thumbImgIndex < pdImgListCol.length ? thumbImgIndex : pdImgListCol.length - 1;
      const mainImg = pdImgListCol[safeIndex];
      console.log("TCL: ProductDetail -> mainImg", mainImg)
      // setSelectedThumbImg({ link: mainImg, type: 'img' });
      setSelectedThumbImg({
        link: {
          imageUrl: mainImg?.imageUrl,
          extension: mainImg?.originalImageExtension
        },
        type: 'img'
      });
      setThumbImgIndex(safeIndex);

      const defaultMainImg = `${baseCDN}${designno}~${safeIndex + 1}~${mcArr?.colorcode}.${ImageExtension}`;
      setMetalWiseColorImg(defaultMainImg);

    } else if (pdImgList.length > 0) {
      const thumbImagePath = pdImgList.map(url => {
        const fileName = url?.imageUrl?.split('Design_Image/')[1]?.split('.')[0];
        const thumbImageUrl = `${thumbCDN}${fileName}.jpg`;
        const originalImageExtension = url?.extension;
        return { thumbImageUrl, originalImageExtension };
      });

      setPdThumbImg(thumbImagePath);

      const safeIndex = thumbImgIndex < pdImgList.length ? thumbImgIndex : pdImgListCol.length - 1;
      const fallbackImg = pdImgList[safeIndex];
      // setSelectedThumbImg({ link: fallbackImg, type: 'img' });
      setSelectedThumbImg({
        link: {
          imageUrl: fallbackImg?.imageUrl,
          extension: fallbackImg?.originalImageExtension
        },
        type: 'img'
      });
      setThumbImgIndex(safeIndex);
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
    // console.log("event", e.target.checked, ele, type);
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let prodObj = {
      "StockId": ele?.StockId,
      // "autocode": ele?.autocode,
      // "Metalid": ele?.MetalPurityid,
      // "MetalColorId": ele?.MetalColorid,
      // "DiaQCid": loginInfo?.cmboDiaQCid,
      // "CsQCid": loginInfo?.cmboCSQCid,
      // "Size": ele?.Size,
      "Unitcost": ele?.Amount,
      // "UnitCostWithmarkup": ele?.Amount,
      // "Remark": ""
    }

    if (e.target.checked == true) {
      CartAndWishListAPI(type, prodObj, cookie).then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC = res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err) => console.log("err", err))
    } else {
      RemoveCartAndWishAPI(type, ele?.StockId, cookie, true).then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC = res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err) => console.log("err", err))
    }

    if (type === "Cart") {
      setCartArr((prev) => ({
        ...prev,
        [ele?.StockId]: e.target.checked
      }))
    }

  }

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

  // const handleMoveToDetail = (productData) => {

  //   let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  //   let obj = {
  //     a: productData?.autocode,
  //     b: productData?.designno,
  //     m: loginInfo?.MetalId,
  //     d: loginInfo?.cmboDiaQCid,
  //     c: loginInfo?.cmboCSQCid,
  //     f: {}
  //   }

  //   let encodeObj = compressAndEncode(JSON.stringify(obj))

  //   navigate(`/d/${productData?.TitleLine?.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""}${productData?.designno}?p=${encodeObj}`)

  // }

  const handleCustomChange = async (e, type) => {

    let metalArr
    let diaArr
    let csArr
    let size

    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));

    let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));

    if (type === "mt") {
      metalArr =
        mtTypeLocal?.filter(
          (ele) => ele?.metaltype == e.target.value
        )[0]?.Metalid
      setSelectMtType(e.target.value)
    }
    if (type === "dia") {
      setSelectDiaQc(e.target.value)
      diaArr =
        diaQcLocal?.filter(
          (ele) =>
            ele?.Quality == e.target.value?.split(",")[0] &&
            ele?.color == e.target.value?.split(",")[1]
        )[0]
    }
    if (type === "cs") {
      setSelectCsQc(e.target.value)
      csArr =
        csQcLocal?.filter(
          (ele) =>
            ele?.Quality == e.target.value?.split(",")[0] &&
            ele?.color == e.target.value?.split(",")[1]
        )[0]
    }
    if (type === "sz") {
      setSizeData(e.target.value)
      size = e.target.value
    }

    if (metalArr == undefined) {
      metalArr =
        mtTypeLocal?.filter(
          (ele) => ele?.metaltype == selectMtType
        )[0]?.Metalid
    }

    if (diaArr == undefined) {
      diaArr =
        diaQcLocal?.filter(
          (ele) =>
            ele?.Quality == selectDiaQc?.split(",")[0] &&
            ele?.color == selectDiaQc?.split(",")[1]
        )[0]
    }

    if (csArr == undefined) {
      csArr =
        csQcLocal?.filter(
          (ele) =>
            ele?.Quality == selectCsQc?.split(",")[0] &&
            ele?.color == selectCsQc?.split(",")[1]
        )[0]
    }

    let obj = {
      mt: metalArr ?? 0,
      diaQc: `${diaArr?.QualityId ?? 0},${diaArr?.ColorId ?? 0}`,
      csQc: `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`
    }

    let prod = {
      a: singleProd?.autocode,
      b: singleProd?.designno
    }

    // console.log("eeee",obj)
    setisPriceLoading(true)
    await SingleProdListAPI(prod, (size ?? sizeData), obj, cookie)
      .then((res) => {
        setSingleProd1(res?.pdList[0])

        if (res?.pdList?.length > 0) {
          setisPriceLoading(false)
        }
        setDiaList(res?.pdResp?.rd3)
        setCsList(res?.pdResp?.rd4)
        // console.log("res123",res)
      }).catch((err) => { console.log("customProdDetailErr", err) })

  }

  const formatter = new Intl.NumberFormat('en-IN')

  const SizeSorting = (SizeArr) => {

    let SizeSorted = SizeArr?.sort((a, b) => {
      const nameA = parseInt(a?.sizename?.toUpperCase()?.slice(0, -2), 10);
      const nameB = parseInt(b?.sizename?.toUpperCase()?.slice(0, -2), 10);
      console.log("SizeSorted", a?.sizename?.toUpperCase())

      return nameA - nameB;
    })


    return SizeSorted

  }

  useEffect(() => {
    SimilarBrandArr?.forEach(async (ele) => {
      const imageUrl =
        storeInit?.CDNDesignImageFol + ele?.designno + "~" + "1" + "." + ele?.ImageExtension;
      const isAvailable = await checkImageAvailability(imageUrl);
      setImageAvailability((prevState) => ({
        ...prevState,
        [ele.designno]: isAvailable,
      }));
    });
  }, [SimilarBrandArr]);

  useEffect(() => {
    designSetList?.forEach((ele) => {
      let designdetailArray = [];
      if (ele?.Designdetail) {
        try {
          designdetailArray = Array.isArray(ele.Designdetail)
            ? ele.Designdetail
            : JSON.parse(ele.Designdetail);
        } catch (error) {
          console.error("Error parsing Designdetail:", error);
        }
      }

      designdetailArray?.forEach(async (ele1) => {
        const imageUrl =
          storeInit?.CDNDesignImageFol + ele1?.designno + "~" + "1" + "." + ele1?.ImageExtension;
        const isAvailable = await checkImageAvailability(imageUrl);
        setImageAvailability1((prevState) => ({
          ...prevState,
          [ele1.designno]: isAvailable,
        }));
      });
    });
  }, [designSetList]);

  const [isClamped, setIsClamped] = useState(false);

  const descriptionRef = useRef(null); // Using useRef instead of document.querySelector
  const descriptionText = singleProd1?.description ?? singleProd?.description;

  useEffect(() => {
    setIsClamped(false);
    setIsExpanded(false);

    const checkTextOverflow = () => {
      const descriptionElement = descriptionRef.current;
      if (descriptionElement) {
        const isOverflowing =
          descriptionElement.scrollHeight > descriptionElement.clientHeight;
        setIsClamped(isOverflowing);
      }
    };

    checkTextOverflow();

    window.addEventListener('resize', checkTextOverflow);
    return () => {
      window.removeEventListener('resize', checkTextOverflow);
    };
  }, [descriptionText, descriptionRef])

  useEffect(() => {
    setIsClamped(false);
    setIsExpanded(false);
  }, [location?.key])

  const toggleText = () => {
    setIsExpanded((prevState) => !prevState);
  };


  return (
    <>
      <Helmet>
        <title>
          {formatTitleLine(singleProd?.TitleLine)
            ? `${singleProd.TitleLine} - ${singleProd?.designno ?? ''}`
            : ((singleProd?.TitleLine || singleProd?.designno) ? `${singleProd?.designno ?? ''}` : "loading...")}
        </title>
      </Helmet>
      <div className="mala_prodDetail_bodyContain">
        <div className="mala_prodDetail_outerContain">
          <div className="mala_prodDetail_whiteInnerContain">
            {isDataFound ? (
              <div
                style={{
                  height: "90vh",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                className="mala_prodd_datanotfound"
              >
                Data not Found!!
              </div>
            ) : (
              <>
                <div className="mala_prod_detail_main">
                  <div className="mala_prod_image_shortInfo">
                    <div className="mala_prod_image_Sec">
                      {/* {isImageload && ( */}
                      {(ImagePromise) && (
                        <Skeleton
                          sx={{
                            width: "95%",
                            height: "750px",
                            margin: "20px 0 0 0"
                          }}
                          variant="rounded"
                          className="pSkelton"
                        />
                      )}

                      <div
                        className="mala_main_prod_img"
                        style={{ display: (ImagePromise) ? "none" : "block" }}
                      >
                        {(selectedThumbImg?.type == "img") ? (
                          <img
                            src={selectedThumbImg?.link?.imageUrl}
                            // src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : ErrornoiMAGE}
                            // src={metalWiseColorImg ? metalWiseColorImg : (selectedThumbImg?.link ?? ErrornoiMAGE) }
                            // onError={() => setSelectedThumbImg({ "link": ErrornoiMAGE, "type": 'img' })}
                            alt={""}
                            onLoad={() => { setIsImageLoad(false) }}
                            className="mala_prod_img"
                            onError={(e) => {
                              e.target.src = NOimage;
                              e.target.onerror = null;
                            }}
                            draggable={true}
                            onContextMenu={(e) => e.preventDefault()}
                            loading="lazy"
                          />
                        ) : (
                          <div className="mala_prod_video">
                            <video
                              src={pdVideoArr?.length > 0 ? selectedThumbImg?.link?.imageUrl : NOimage}
                              loop={true}
                              autoPlay={true}
                              style={{
                                width: "100%",
                                objectFit: "cover",
                                marginTop: "40px",
                                // height: "90%",
                                borderRadius: "8px",
                              }}
                              draggable={true}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                          </div>
                        )}

                        <div className="mala_main_thumb_prod_img">
                          {((pdThumbImg?.length > 1 || pdVideoArr?.length > 0) || storeInit?.IsVision360 == 1) &&
                            pdThumbImg?.map((ele, i) => {
                              const firstHalf = ele?.thumbImageUrl?.split("/Design_Thumb")[0];
                              const secondhalf = ele?.thumbImageUrl?.split("/Design_Thumb")[1]?.split('.')[0];
                              return (
                                <img
                                  src={ele?.thumbImageUrl}
                                  alt={""}
                                  onLoad={() => { setIsImageLoad(false) }}
                                  className="mala_prod_thumb_img"
                                  onClick={() => {
                                    setSelectedThumbImg({
                                      // link: ele.replace('Design_Thumb/', ''),
                                      link: {
                                        "imageUrl": `${firstHalf}${secondhalf}.${ele?.originalImageExtension}`,
                                        "extension": `${ele?.originalImageExtension}`
                                      },
                                      type: "img",
                                    });
                                    setThumbImgIndex(i);
                                  }}
                                  draggable={true}
                                  onContextMenu={(e) => e.preventDefault()}
                                  onError={(e) => {
                                    e.target.src = NOimage
                                  }}
                                  loading="lazy"
                                />
                              )
                            })}
                          {filteredVideos?.map((data) => (
                            <div
                              style={{
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() =>
                                // setSelectedThumbImg({ link: {data}, type: "vid" })
                                setSelectedThumbImg({ link: { "imageUrl": data, "extension": "mp4" }, type: "vid" })
                              }
                            >
                              <video
                                src={data}
                                autoPlay={true}
                                loop={true}
                                className="mala_prod_thumb_img"
                                style={{ height: "70px", objectFit: "cover" }}
                                draggable={true}
                                onContextMenu={(e) => e.preventDefault()}
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
                          {
                            vison360 && vison360?.length > 0 ? (
                              <img
                                src={visionArround}
                                alt={""}
                                onLoad={() => { setIsImageLoad(false) }}
                                className="mala_prod_thumb_img"
                                id="vision360"
                                onClick={() => {
                                  setSelectedThumbImg({
                                    link: {
                                      "imageUrl": vison360,
                                      "extension": "mp4"
                                    },
                                    type: "img",
                                  });
                                }}
                                draggable={true}
                                onContextMenu={(e) => e.preventDefault()}
                                onError={(e) => {
                                  e.target.src = NOimage;
                                }}
                                loading="lazy"
                              />
                            ) :
                              null
                          }
                          {/* <div className="mala_thumb_prod_img">
                      
                      </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="mala_prod_shortInfo">
                      {prodLoading ?
                        <Skeleton
                          variant="rounded"
                          width={"100%"}
                          height={"97%"}
                          sx={{ marginInline: "16%", marginTop: "3%" }}
                          className="pSkelton"
                        />
                        : <div className="mala_prod_shortInfo_inner">
                          <p className="mala_prod_titleLine">
                            {formatTitleLine(singleProd?.TitleLine) && singleProd?.TitleLine}
                          </p>

                          <div className="mala_prod_summury_info">
                            <div className="mala_prod_summury_info_inner">
                              <span className="mala_single_prod_designno">
                                {singleProd?.designno}
                              </span>
                              {(singleProd?.MetalTypePurity !== "" && selectMtType) ? <span className="mala_prod_short_key">
                                Metal Purity :{" "}
                                <span className="mala_prod_short_val">
                                  {singleProd?.IsMrpBase === 1 ? singleProd?.MetalTypePurity : selectMtType}
                                </span>
                              </span> : null}
                              <span className="mala_prod_short_key">
                                Metal Color :{" "}
                                <span className="mala_prod_short_val">
                                  {JSON.parse(sessionStorage.getItem("MetalColorCombo"))?.filter(
                                    (ele) => ele?.colorcode == selectMtColor
                                  )[0]?.metalcolorname}
                                </span>
                              </span>
                              {(storeInit?.IsDiamondCustomization === 1 &&
                                diaQcCombo?.length > 0 && diaList?.length && singleProd?.DiaQuaCol !== "" && selectDiaQc) ? <span className="mala_prod_short_key">
                                Diamond Quality Color :{" "}
                                <span className="mala_prod_short_val">
                                  {singleProd?.IsMrpBase === 1 ? singleProd?.DiaQuaCol : `${selectDiaQc}`}
                                </span>
                              </span> : null}
                              <span className="mala_prod_short_key">
                                Net Wt :{" "}
                                <span className="mala_prod_short_val">
                                  {(singleProd1?.Nwt ?? singleProd?.Nwt)?.toFixed(3)}
                                </span>
                              </span>
                              {/* {singleProd?.description && (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: "12px",
                                  }}
                                >
                                  <p
                                    style={{
                                      color: "#7d7f85",
                                      fontSize: "14px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      display: isExpanded
                                        ? "block"
                                        : "-webkit-box",
                                      WebkitBoxOrient: "vertical",
                                      WebkitLineClamp: isExpanded ? "none" : 3,
                                      height: isExpanded ? "auto" : "4.5em",
                                      margin: "0px",
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
                                      color: "#7d7f85",
                                      fontSize: "13px",
                                      fontWeight: "500",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {isExpanded ? "Show less" : "Read more"}
                                  </a>
                                </div>
                              )} */}
                              {descriptionText?.length > 0 && (
                                <div className={`mala_prod_description ${isExpanded ? 'mala_show-more' : ''}`}>
                                  <p className="mala_description-text" ref={descriptionRef}>
                                    {descriptionText}
                                  </p>

                                  {(isClamped && !isExpanded) && ( // Show "Show More" only if text is clamped and not expanded
                                    <span className="mala_toggle-text" onClick={toggleText}>
                                      Show More
                                    </span>
                                  )}

                                  {isExpanded && ( // Show "Show Less" when the description is expanded
                                    <span className="mala_toggle-text" onClick={toggleText}>
                                      Show Less
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {storeInit?.IsProductWebCustomization == 1 &&
                            (
                              <div className="mala_single_prod_customize">
                                {metalTypeCombo?.length > 0 && storeInit?.IsMetalCustomization === 1
                                  && (<div className="mala_single_prod_customize_metal">
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
                                        {singleProd?.MetalTypePurity}
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
                                  </div>)}
                                {metalColorCombo?.length > 0 && storeInit?.IsMetalTypeWithColor === 1 && (
                                  <div className="mala_single_prod_customize_outer">
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
                                {(storeInit?.IsDiamondCustomization === 1 &&
                                  diaQcCombo?.length > 0 && diaList?.length) ? (
                                  <div className="mala_single_prod_customize_outer">
                                    <label className="menuItemTimeEleveDeatil">
                                      DIAMOND :
                                    </label>
                                    {
                                      singleProd?.IsMrpBase == 1 ? (
                                        <span className="menuitemSelectoreMain">
                                          {singleProd?.DiaQuaCol}
                                        </span>
                                      )
                                        :
                                        (
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
                                {(storeInit?.IsCsCustomization === 1 &&
                                  selectCsQc?.length > 0 && csList?.filter((ele) => ele?.D !== "MISC")?.length > 0) ? (
                                  <div className="mala_single_prod_customize_outer">
                                    <label className="menuItemTimeEleveDeatil">
                                      COLOR STONE :
                                    </label>
                                    {
                                      singleProd?.IsMrpBase == 1 ? (
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
                                      )
                                    }

                                  </div>
                                )
                                  :
                                  null
                                }
                                {/* {console.log("sizeData",SizeCombo?.find((size) => size.IsDefaultSize === 1)?.sizename)} */}
                                {SizeSorting(SizeCombo?.rd)?.length > 0 && singleProd?.DefaultSize !== "" && (
                                  <div className="mala_single_prod_customize_outer">
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

                          {storeInit?.IsPriceShow == 1 && storeInit?.IsPriceBreakUp == 1 && singleProd1?.IsMrpBase !== 1 && singleProd?.IsMrpBase !== 1 &&
                            (
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
                                  width: '95.5%'
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
                                  <Typography sx={{ fontSize: '14px', fontFamily: "Baskerville" }}>Price Breakup</Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    // minHeight: "fit-content",
                                    // maxHeight: "300px",
                                    // overflow: "auto",
                                    padding: '0 0 16px 0',

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


                                  {(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="mala_Price_breakup_label">Metal</Typography>
                                    <span style={{ display: 'flex', alignItems: "center" }}>
                                      <Typography>
                                        {
                                          <span className="mala_currencyFont">
                                            {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                          </span>
                                        }
                                      </Typography>
                                      &nbsp;
                                      <Typography className="mala_PriceBreakup_Price">{formatter.format(Math.round(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost))}</Typography>
                                    </span>
                                  </div> : null}

                                  {(singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="mala_Price_breakup_label">Diamond </Typography>

                                    <span style={{ display: 'flex', alignItems: "center" }}>
                                      <Typography>{
                                        <span className="mala_currencyFont">
                                          {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }</Typography>
                                      &nbsp;
                                      <Typography className="mala_PriceBreakup_Price">{formatter.format(Math.round(singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost))}</Typography>
                                    </span>
                                  </div> : null}

                                  {(singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="mala_Price_breakup_label">Stone </Typography>

                                    <span style={{ display: 'flex', alignItems: "center" }}>
                                      <Typography>{
                                        <span className="mala_currencyFont">
                                          {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }</Typography>
                                      &nbsp;
                                      <Typography className="mala_PriceBreakup_Price">{formatter.format(Math.round(singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost))}</Typography>
                                    </span>
                                  </div> : null}

                                  {(singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="mala_Price_breakup_label">MISC </Typography>

                                    <span style={{ display: 'flex', alignItems: "center" }}>
                                      <Typography>{
                                        <span className="mala_currencyFont">
                                          {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }</Typography>
                                      &nbsp;
                                      <Typography className="mala_PriceBreakup_Price">{formatter.format(Math.round(singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost))}</Typography>
                                    </span>
                                  </div> : null}

                                  {(singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="mala_Price_breakup_label">Labour </Typography>

                                    <span style={{ display: 'flex', alignItems: "center" }}>
                                      <Typography>{
                                        <span className="mala_currencyFont">
                                          {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }</Typography>
                                      &nbsp;
                                      <Typography className="mala_PriceBreakup_Price">{formatter.format(Math.round(singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost))}</Typography>
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
                                        <Typography className="mala_Price_breakup_label">Other </Typography>

                                        <span style={{ display: 'flex', alignItems: "center" }}>
                                          <Typography>{
                                            <span className="mala_currencyFont">
                                              {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>
                                          }</Typography>
                                          &nbsp;
                                          <Typography className="mala_PriceBreakup_Price">{
                                            formatter.format(Math.round(

                                              (singleProd1?.Other_Cost ? singleProd1?.Other_Cost : singleProd?.Other_Cost) +
                                              (singleProd1?.Size_MarkUp ? singleProd1?.Size_MarkUp : singleProd?.Size_MarkUp) +
                                              (singleProd1?.DesignMarkUpAmount ? singleProd1?.DesignMarkUpAmount : singleProd?.DesignMarkUpAmount) +
                                              (singleProd1?.ColorStone_SettingCost ? singleProd1?.ColorStone_SettingCost : singleProd?.ColorStone_SettingCost) +
                                              (singleProd1?.Diamond_SettingCost ? singleProd1?.Diamond_SettingCost : singleProd?.Diamond_SettingCost) +
                                              (singleProd1?.Misc_SettingCost ? singleProd1?.Misc_SettingCost : singleProd?.Misc_SettingCost)

                                            ))
                                          }</Typography>
                                        </span>
                                      </div>
                                      :
                                      null
                                  }

                                </AccordionDetails>
                              </Accordion>
                            )}

                          {storeInit?.IsPriceShow === 1 &&
                            (<div className="mala_price_portion">
                              {isPriceloading ? (
                                ""
                              ) : (
                                <span className="mala_currencyFont_total">
                                  {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
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
                                  className="pSkelton"
                                />
                              ) :
                                formatter.format
                                  (
                                    singleProd1?.UnitCostWithMarkUp ??
                                    singleProd?.UnitCostWithMarkUp
                                  )
                              }
                              {/* {singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp} */}
                            </div>)
                          }

                          {prodLoading ? null :
                            <div>

                              <div className="Smr_CartAndWish_portion">
                                <button
                                  className={
                                    !addToCartFlag
                                      ? "mala_AddToCart_btn"
                                      : "mala_AddToCart_btn_afterCart"
                                  }
                                  onClick={() => handleCart(!addToCartFlag)}
                                >
                                  <span
                                    className="mala_addtocart_btn_txt"
                                    style={{ color: !addToCartFlag ? "white" : "white" }}
                                  >
                                    {!addToCartFlag
                                      ? "ADD TO CART"
                                      : "REMOVE FROM CART"}
                                  </span>
                                </button>
                                <div className="Smr_wishlistcont">
                                  <Checkbox
                                    icon={
                                      <FavoriteBorderIcon
                                        className="mala_wishlist_icon"
                                      />
                                    }
                                    checkedIcon={
                                      <FavoriteIcon
                                        className="mala_wishlist_icon"
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
                                </div>
                              </div>
                              {
                                // prodLoading &&
                                singleProd?.InStockDays !== 0 && <p style={{ margin: '20px 0px 0px 0px', fontWeight: 500, fontSize: '18px', color: '#7d7f85' }}>Express Shipping in Stock {singleProd?.InStockDays} Days Delivery</p>}
                              {singleProd?.MakeOrderDays != 0 && <p style={{ margin: '0px', fontWeight: 500, fontSize: '18px', color: '#7d7f85' }}>Make To Order {singleProd?.MakeOrderDays} Days Delivery</p>}
                            </div>
                          }
                        </div>}
                    </div>
                  </div>
                </div>

                <div className="mala_material_details_portion">
                  {(diaList?.length > 0 || csList?.filter((ele) => ele?.D === "MISC")?.length > 0 || csList?.filter((ele) => ele?.D !== "MISC")?.length > 0) && (
                    <p className="mala_details_title"> Product Details</p>
                  )}
                  {diaList?.length > 0 && (
                    <div className="mala_material_details_portion_inner">
                      <ul style={{ margin: "0px 0px 3px 0px" }}>
                        <li
                          style={{ fontWeight: 600, color: '#7d7f85', fontSize: "15px" }}
                        >{`Diamond Detail (${diaList?.reduce(
                          (accumulator, data) => accumulator + data.M,
                          0
                        )}/${diaList
                          ?.reduce(
                            (accumulator, data) => accumulator + data?.N,
                            0
                          )
                          .toFixed(3)} ct)`}</li>
                      </ul>
                      <ul className="mala_mt_detail_title_ul">
                        <li className="mala_proDeatilList">Shape</li>
                        <li className="mala_proDeatilList">Clarity</li>
                        <li className="mala_proDeatilList">Color</li>
                        <li className="mala_proDeatilList">Pcs&nbsp;/&nbsp;Wt</li>
                      </ul>
                      {diaList?.map((data) => (
                        <ul className="mala_mt_detail_title_ul">
                          <li className="mala_proDeatilList1">{data?.F}</li>
                          <li className="mala_proDeatilList1">{data?.H}</li>
                          <li className="mala_proDeatilList1">{data?.J}</li>
                          <li className="mala_proDeatilList1">
                            {data.M} / {(data?.N)?.toFixed(3)}
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                  {/* {console.log("csListcsList",csList?.filter((ele)=>ele?.D === "MISC"))} */}
                  {csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 && (
                    <div className="mala_material_details_portion_inner">
                      <ul style={{ margin: "10px 0px 3px 0px" }}>
                        <li
                          style={{ fontWeight: 600, color: '#7d7f85', fontSize: "15px" }}
                        >{`ColorStone Detail (${csList?.filter((ele) => ele?.D !== "MISC")?.reduce(
                          (accumulator, data) => accumulator + data.M,
                          0
                        )}/${csList?.filter((ele) => ele?.D !== "MISC")
                          ?.reduce(
                            (accumulator, data) => accumulator + data?.N,
                            0
                          )
                          .toFixed(3)}ct)`}</li>
                      </ul>
                      <ul className="mala_mt_detail_title_ul">
                        <li className="mala_proDeatilList">Shape</li>
                        <li className="mala_proDeatilList">Clarity</li>
                        <li className="mala_proDeatilList">Color</li>
                        <li className="mala_proDeatilList">Pcs&nbsp;/&nbsp;Wt</li>
                      </ul>
                      {csList?.filter((ele) => ele?.D !== "MISC")?.map((data) => (
                        <ul className="mala_mt_detail_title_ul">
                          <li className="mala_proDeatilList1">{data?.F}</li>
                          <li className="mala_proDeatilList1">{data?.H}</li>
                          <li className="mala_proDeatilList1">{data?.J}</li>
                          <li className="mala_proDeatilList1">
                            {data.M} / {(data?.N)?.toFixed(3)}
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}

                  {csList?.filter((ele) => ele?.D === "MISC")?.length > 0 && (
                    <div className="mala_material_details_portion_inner">
                      <ul style={{ margin: "10px 0px 3px 0px" }}>
                        <li
                          style={{ fontWeight: 600, color: '#7d7f85', fontSize: "15px" }}
                        >{`MISC Detail (${csList?.filter((ele) => ele?.D === "MISC")?.reduce(
                          (accumulator, data) => accumulator + data.M,
                          0
                        )}/${csList?.filter((ele) => ele?.D === "MISC")
                          ?.reduce(
                            (accumulator, data) => accumulator + data?.N,
                            0
                          )
                          .toFixed(3)}gm)`}</li>
                      </ul>
                      <ul className="mala_mt_detail_title_ul">
                        <li className="mala_proDeatilList">Shape</li>
                        <li className="mala_proDeatilList">Clarity</li>
                        <li className="mala_proDeatilList">Color</li>
                        <li className="mala_proDeatilList">Pcs&nbsp;/&nbsp;Wt</li>
                      </ul>
                      {csList?.filter((ele) => ele?.D === "MISC")?.map((data) => (
                        <ul className="mala_mt_detail_title_ul">
                          <li className="mala_proDeatilList1">{data?.F}</li>
                          <li className="mala_proDeatilList1">{data?.H}</li>
                          <li className="mala_proDeatilList1">{data?.J}</li>
                          <li className="mala_proDeatilList1">
                            {data.M} / {(data?.N)?.toFixed(3)}
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                </div>

                {stockItemArr?.length > 0 &&
                  storeInit?.IsStockWebsite === 1 && stockItemArr?.[0]?.stat_code != 1005 && (
                    <div className="mala_stockItem_div">
                      <p className="mala_details_title"> Stock Items </p>
                      <div className="mala_stockitem_container">
                        {/* <div className="mala_stock_item_card">
                  {stockItemArr?.map((ele) => (
                    <div className="mala_stockItemCard">
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
                        className="mala_productCard_Image"
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
                      <div className="mala_stockutem_shortinfo" style={{display:'flex',flexDirection:'column',gap:'5px',paddingBottom:'5px'}}>
                      <span className="mala_prod_designno">
                        {ele?.designno}
                      </span>
                      <div className="mala_prod_Allwt">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            letterSpacing: "1px",
                            gap: "3px",
                          }}
                        >
                          <span className="mala_prod_wt">
                            <span className="mala_d_keys">NWT:</span>
                            <span className="mala_d_val">{ele?.NetWt}</span>
                          </span>

                          {storeInit?.IsGrossWeight == 1 &&
                            Number(ele?.GrossWt) !== 0 && (
                              <>
                                <span>|</span>
                                <span className="mala_prod_wt">
                                  <span className="mala_d_keys">GWT:</span>
                                  <span className="mala_d_val">
                                    {ele?.GrossWt}
                                  </span>
                                </span>
                              </>
                            )}
                          {storeInit?.IsDiamondWeight == 1 &&
                            Number(ele?.DiaWt) !== 0 && (
                              <>
                                <span>|</span>
                                <span className="mala_prod_wt">
                                  <span className="mala_d_keys">DWT:</span>
                                  <span className="mala_d_val">
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
                                <span className="mala_prod_wt">
                                  <span className="mala_d_keys">CWT:</span>
                                  <span className="mala_d_val">
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

                      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}} className="mala_stockItem_price_type_mt">
                          <span>
                            {ele?.MetalColorName}-{ele?.metaltypename}{ele?.metalPurity} 
                            {" "}/{" "}
                            <span
                                className="mala_currencyFont"
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
                        <table className="Smr_stockItem_table">
                          <tr className="Smr_stockItem_table_tr">
                            <th className="Smr_stockItem_table_td">SrNo</th>
                            <th className="Smr_stockItem_table_td">Design No</th>
                            {/* <th className="Smr_stockItem_table_td" >StockBarcode</th> */}
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
                            {storeInit?.IsPriceShow == 1 && <th className="Smr_stockItem_table_td">Price</th>}
                            <th className="Smr_stockItem_table_td">
                              Add To Cart
                            </th>
                          </tr>
                          {stockItemArr?.map((ele, i) => (
                            <tr className="Smr_stockItem_table_tr">
                              <td className="Smr_stockItem_table_td">
                                <span className="mala_prod_designno">
                                  {ele?.SrNo}
                                </span>
                              </td>
                              <td className="Smr_stockItem_table_td">
                                <span className="mala_prod_designno">
                                  {ele?.designno}
                                </span>
                              </td>
                              <td className="Smr_stockItem_table_td">
                                <span className="mala_prod_designno">
                                  {ele?.StockBarcode}
                                </span>
                              </td>
                              {/* <td className="Smr_stockItem_table_td">
                        <span className="mala_prod_designno">
                        {ele?.JobNo}
                        </span>
                      </td> */}
                              <td className="Smr_stockItem_table_td">
                                <div className="mala_prod_Allwt">
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
                                          <span className="mala_prod_wt">
                                            <span className="mala_d_keys">
                                              GWT:
                                            </span>
                                            <span className="mala_d_val">
                                              {(ele?.GrossWt)?.toFixed(3)}
                                            </span>
                                          </span>
                                        </>
                                      )}

                                    {Number(ele?.NetWt) !== 0 && (
                                      <>
                                        <span>|</span>
                                        <span className="mala_prod_wt">
                                          <span className="mala_d_keys">NWT:</span>
                                          <span className="mala_d_val">
                                            {(ele?.NetWt)?.toFixed(3)}
                                          </span>
                                        </span>
                                      </>
                                    )}

                                    {/* {storeInit?.IsGrossWeight == 1 &&
                              Number(ele?.GrossWt) !== 0 && (
                                <>
                                  <span>|</span>
                                  <span className="mala_prod_wt">
                                    <span className="mala_d_keys">GWT:</span>
                                    <span className="mala_d_val">
                                      {ele?.GrossWt}
                                    </span>
                                  </span>
                                </>
                              )} */}
                                    {storeInit?.IsDiamondWeight == 1 &&
                                      Number(ele?.DiaWt) !== 0 && (
                                        <>
                                          <span>|</span>
                                          <span className="mala_prod_wt">
                                            <span className="mala_d_keys">
                                              DWT:
                                            </span>
                                            <span className="mala_d_val">
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
                                          <span className="mala_prod_wt">
                                            <span className="mala_d_keys">
                                              CWT:
                                            </span>
                                            <span className="mala_d_val">
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
                                {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}} className="mala_stockItem_price_type_mt"> */}
                                <span>
                                  {ele?.MetalColorName}-{ele?.metaltypename}
                                  {ele?.metalPurity}
                                  {/* {" "}/{" "} */}
                                </span>
                                {/* </div> */}
                              </td>
                              {storeInit?.IsPriceShow == 1 && <td className="Smr_stockItem_table_td">
                                <span>
                                  <span className="mala_currencyFont">
                                    {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                  </span>
                                  &nbsp;
                                  <span> {
                                    formatter.format(
                                      ele?.Amount
                                    )
                                  }</span>
                                </span>
                              </td>}
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
                      </div>
                    </div>
                  )}

                {storeInit?.IsProductDetailSimilarDesign == 1 &&
                  SimilarBrandArr?.length > 0 && SimilarBrandArr?.[0]?.stat_code != 1005 && (
                    <div className="mala_stockItem_div">
                      <p className="mala_details_title"> Similar Designs</p>
                      <div className="mala_stockitem_container">
                        <div className="mala_stock_item_card">
                          {SimilarBrandArr?.map((ele) => {
                            // const imageUrl =
                            //   storeInit?.CDNDesignImageFol + ele?.designno + "~" + "1" + "." + ele?.ImageExtension;
                            const imageUrl =
                              storeInit?.CDNDesignImageFolThumb + ele?.designno + "~" + "1" + "." + "jpg";
                            const isAvailable = imageAvailability[ele?.designno];
                            return (
                              <div
                                className="mala_stockItemCard"
                                onClick={() =>
                                  // setTimeout(() => 
                                  handleMoveToDetail(ele)
                                  // , 500)
                                }
                              >
                                <img
                                  className="mala_productCard_Image"
                                  src={
                                    ele?.ImageCount > 0
                                      ? imageUrl
                                      : NOimage
                                  }
                                  alt={""}
                                  onError={(e) => {
                                    e.target.src = NOimage;
                                  }}
                                  loading="lazy"
                                  draggable={true}
                                  onContextMenu={(e) => e.preventDefault()}
                                />
                                <div
                                  className="mala_stockutem_shortinfo"
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    paddingBottom: "5px",
                                  }}
                                >
                                  <span
                                    className="mala_prod_designno"
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
                                    className="mala_stockItem_price_type_mt"
                                  >
                                    <spam>
                                      <span className="mala_currencyFont_total">
                                        {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                      </span>
                                      &nbsp;
                                    </spam>
                                    <span>{
                                      formatter.format(
                                        ele?.UnitCostWithMarkUp
                                      )
                                    }</span>
                                  </div>}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                {storeInit?.IsProductDetailDesignSet === 1 &&
                  <div className="mala_DesignSet_main">
                    {designSetList?.length > 0 && designSetList?.[0]?.stat_code != 1005 &&
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <p
                          style={{
                            color: "#7d7f85",
                            fontSize: "30px",
                            // display:'none'
                          }}
                        >
                          Complete The Look
                        </p>
                      </div>}

                    <div className="mala_Swiper_designSet" >
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
                              <div className="mala_ctlImg_containe">
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
                                      NOimage
                                  }
                                  alt={""}
                                  className="ctl_img"
                                  onError={(e) => {
                                    e.target.src = NOimage;
                                  }}
                                  draggable={true}
                                  onContextMenu={(e) => e.preventDefault()}
                                  loading="lazy"
                                />
                              </div>

                              <div
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
                                )?.map((ele, i) => {
                                  // const imageUrl =
                                  //   storeInit?.CDNDesignImageFol + ele?.designno + "~" + "1" + "." + ele?.ImageExtension;
                                  const imageUrl =
                                    storeInit?.CDNDesignImageFolThumb + ele?.designno + "~" + "1" + "." + "jpg";
                                  const isAvailable = imageAvailability1[ele?.designno];
                                  return (
                                    <div
                                      className="completethelook_outer"
                                      onClick={() => handleMoveToDetail(ele)}
                                      style={{ borderTop: i !== 0 ? "none" : "" }}
                                    >
                                      <div style={{ display: "flex", gap: "60px" }}>
                                        <div style={{ marginLeft: "12px" }}>
                                          <img
                                            src={
                                              ele?.ImageCount > 0 ?
                                                imageUrl
                                                : NOimage
                                            }
                                            alt={""}
                                            onError={(e) => {
                                              e.target.src = NOimage;
                                            }}
                                            loading="lazy"
                                            draggable={true}
                                            onContextMenu={(e) => e.preventDefault()}
                                            // src={
                                            //   "https://smilingrocks.com/cdn/shop/products/Lab-grown-diamond-white-gold-earrings-sre00362wht_medium.jpg?v=1590473229"
                                            // }
                                            className="srthelook_img"
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
                                              {ele?.designno} - {ele?.CategoryName}
                                              <br />
                                              {storeInit?.IsPriceShow == 1 && <>
                                                <span className="mala_currencyFont">
                                                  {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                </span>
                                                &nbsp;
                                                {
                                                  formatter.format(
                                                    ele?.UnitCostWithMarkUp
                                                  )
                                                }
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
                                  )
                                })}
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
