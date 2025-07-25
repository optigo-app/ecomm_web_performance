import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import "./productlist.scss";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { useLocation, useNavigate } from "react-router-dom";
import imageNotFound from "../../../Assets/image-not-found.jpg";
import {
  findMetalColor,
  findMetalType,
  formatRedirectTitleLine,
  formatTitleLine,
} from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ProductListSkeleton from "./productlist_skeleton/ProductListSkeleton";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardMedia,
  Checkbox,
  Drawer,
  FormControlLabel,
  Input,
  Pagination,
  PaginationItem,
  Skeleton,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  proCat_CartCount,
  proCat_DiamondRangeArr,
  proCat_WishCount,
  proCat_loginState,
  sliderData,
  soketProductData,
} from "../../../Recoil/atom";
import pako from "pako";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import { IoArrowBack } from "react-icons/io5";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import EditablePagination from "../../../../../RoopJewellers/Components/Pages/ReusableComponent/EditablePagination/EditablePagination";
import { toast } from "react-toastify";

const ProductList = () => {
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeinit);

    let mtCombo = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
    setMetalTypeCombo(mtCombo);

    let diaQcCombo = JSON.parse(
      sessionStorage.getItem("diamondQualityColorCombo")
    );
    setDiaQcCombo(diaQcCombo);

    let CsQcCombo = JSON.parse(
      sessionStorage.getItem("ColorStoneQualityColorCombo")
    );
    setCsQcCombo(CsQcCombo);
  }, []);

  let location = useLocation();
  let navigate = useNavigate();
  let minwidth1201px = useMediaQuery("(min-width:1201px)");
  let maxwidth1674px = useMediaQuery("(max-width:1674px)");
  let maxwidth590px = useMediaQuery("(max-width:590px)");
  let maxwidth464px = useMediaQuery("(max-width:464px)");

  const [productListData, setProductListData] = useState([]);
  const setSliderData = useSetRecoilState(sliderData);
  const islogin = useRecoilValue(proCat_loginState);
  const [priceListData, setPriceListData] = useState([]);
  const [finalProductListData, setFinalProductListData] = useState([]);
  const [isProdLoading, setIsProdLoading] = useState(true);
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
  const [storeInit, setStoreInit] = useState({});
  const [filterData, setFilterData] = useState([]);
  const [filterChecked, setFilterChecked] = useState({});
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [accExpanded, setAccExpanded] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [cartArr, setCartArr] = useState({});
  const [wishArr, setWishArr] = useState({});
  const [menuParams, setMenuParams] = useState({});
  const [filterProdListEmpty, setFilterProdListEmpty] = useState(false);
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [diaQcCombo, setDiaQcCombo] = useState([]);
  const [csQcCombo, setCsQcCombo] = useState([]);
  const [selectedMetalId, setSelectedMetalId] = useState(
    loginUserDetail?.MetalId
  );
  const [selectedDiaId, setSelectedDiaId] = useState(
    loginUserDetail?.cmboDiaQCid
  );
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const [loginInfo, setLoginInfo] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rollOverImgPd, setRolloverImgPd] = useState({});
  const [locationKey, setLocationKey] = useState();
  const [prodListType, setprodListType] = useState();
  const [sortBySelect, setSortBySelect] = useState();
  const setCartCountVal = useSetRecoilState(proCat_CartCount);
  const setWishCountVal = useSetRecoilState(proCat_WishCount);
  const [diaFilterRange, setDiaFilterRange] = useState({});
  const [sliderValue, setSliderValue] = useState([]);
  const [sliderValue1, setSliderValue1] = useState([]);
  const [sliderValue2, setSliderValue2] = useState([]);
  const [isRollOverVideo, setIsRollOverVideo] = useState({});
  const [afterCountStatus, setAfterCountStatus] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0)
  const [diaRange, setDiaRange] = useState("")
  const [netRange, setNetRange] = useState("")
  const [grossRange, setGrossRange] = useState("")
  const [securityKey, setSecurityKey] = useState();
  const SoketData = useRecoilValue(soketProductData);
  const formatter = new Intl.NumberFormat("en-IN");
  let cookie = Cookies.get("visiterId");
  const [inputPage, setInputPage] = useState(currPage);
  const [inputGross, setInputGross] = useState([]);
  const [inputNet, setInputNet] = useState([]);
  const [inputDia, setInputDia] = useState([]);
  const [isReset, setIsReset] = useState(false)
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [appliedRange1, setAppliedRange1] = useState(null);
  const [appliedRange2, setAppliedRange2] = useState(null);
  const [appliedRange3, setAppliedRange3] = useState(null);
  const [isClearAllClicked, setIsClearAllClicked] = useState(false);

  const setCSSVariable = () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  };

  const isEditablePage = 1;

  useEffect(() => {
    setCSSVariable();

    let mtid = loginUserDetail?.MetalId ?? storeInit?.MetalId;
    setSelectedMetalId(mtid);

    let diaid = loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid;
    setSelectedDiaId(diaid);

    let csid = loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid;
    setSelectedCsId(csid);
  }, []);

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
      MetalColorCombo()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            sessionStorage.setItem("MetalColorCombo", JSON.stringify(data));
          }
        })
        .catch((err) => console.log(err));
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
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    let param = JSON.parse(sessionStorage.getItem("menuparams"));
    if (location?.state?.SearchVal === undefined) {
      setMenuParams(param);
    }
  }, [location?.key, productListData, filterChecked]);
  // },[location?.state?.menu,productListData,filterChecked])

  useEffect(() => {
    console.log("reached to this")
    let url = `${location?.pathname}${location?.search}`;
    let navVal = url?.split('/')[3];
    let securityKey = navVal?.split('K=')[1]
    let state = { SecurityKey: atob(securityKey) }
    if (atob(securityKey) > 0 && islogin != true) {
      navigate(`/LoginOption/?LoginRedirect=${(url)}`, { state })
    }
  }, [location?.key])

  useEffect(() => {
    const fetchData = async () => {
      let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
      let UrlVal = location?.search.slice(1).split("/");
      let MenuVal = "";
      let MenuKey = "";
      let SearchVar = "";
      let TrendingVar = "";
      let NewArrivalVar = "";
      let BestSellerVar = "";
      let AlbumVar = "";

      const securityKey = location?.state === null ? JSON.parse(sessionStorage?.getItem('Loginkey')) : location?.state?.SecurityKey;
      setSecurityKey(securityKey ?? "");

      let productlisttype;

      UrlVal.forEach((ele) => {

        let firstChar = ele.charAt(0);

        switch (firstChar) {
          case "M":
            MenuVal = ele;
            break;
          case "S":
            SearchVar = ele;
            break;
          case "T":
            TrendingVar = ele;
            break;
          case "N":
            NewArrivalVar = ele;
            break;
          case "B":
            BestSellerVar = ele;
            break;
          case "A":
            AlbumVar = ele;
            break;
          default:
            return "";
        }
      });

      if (MenuVal?.length > 0) {
        let menuDecode = atob(MenuVal?.split("=")[1]);

        let key = menuDecode?.split("/")[1].split(",");
        let val = menuDecode?.split("/")[0].split(",");

        setIsBreadcumShow(true);

        productlisttype = [key, val];
      }

      if (SearchVar) {
        productlisttype = SearchVar;
      }

      if (TrendingVar) {
        productlisttype = TrendingVar.split("=")[1];
      }
      if (NewArrivalVar) {
        productlisttype = NewArrivalVar.split("=")[1];
      }

      if (BestSellerVar) {
        productlisttype = BestSellerVar.split("=")[1];
      }

      if (AlbumVar) {
        productlisttype = AlbumVar.split("=")[1];
      }

      setIsProdLoading(true);
      setprodListType(productlisttype);
      let diafilter =
        filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
          ?.length > 0
          ? JSON.parse(
            filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
          )[0]
          : [];
      let diafilter1 =
        filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
          ?.length > 0
          ? JSON.parse(
            filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
          )[0]
          : [];
      let diafilter2 =
        filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
          ?.length > 0
          ? JSON.parse(
            filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
          )[0]
          : [];
      const isDia = JSON.stringify(sliderValue) !== JSON.stringify([diafilter?.Min, diafilter?.Max]);
      const isNet = JSON.stringify(sliderValue1) !== JSON.stringify([diafilter1?.Min, diafilter1?.Max]);
      const isGross = JSON.stringify(sliderValue2) !== JSON.stringify([diafilter2?.Min, diafilter2?.Max]);

      let DiaRange = {
        DiaMin: isDia ? sliderValue[0] ?? "" : "",
        DiaMax: isDia ? sliderValue[1] ?? "" : ""
      };

      let netRange = {
        netMin: isNet ? sliderValue1[0] ?? "" : "",
        netMax: isNet ? sliderValue1[1] ?? "" : ""
      };

      let grossRange = {
        grossMin: isGross ? sliderValue2[0] ?? "" : "",
        grossMax: isGross ? sliderValue2[1] ?? "" : ""
      };

      setDiaRange(DiaRange);
      setNetRange(netRange);
      setGrossRange(grossRange);

      // await ProductListApi({}, 1, obj, productlisttype, cookie,sortBySelect ,DiaRange, netRange ,grossRange)
      await ProductListApi({}, 1, obj, productlisttype, cookie, sortBySelect,
        DiaRange, netRange, grossRange
      )
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            sessionStorage.setItem(
              "deatilSliderData",
              JSON.stringify(res?.pdList)
            );
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
            // setIsProdLoading(false);
          }
          return res;
        })
        // .then( async(res) => {
        //   let forWardResp;
        //   if (res) {
        //     await GetPriceListApi(1,{},{},res?.pdResp?.rd1[0]?.AutoCodeList,obj,productlisttype).then((resp)=>{
        //       if(resp){
        //         setPriceListData(resp)
        //         forWardResp = resp;
        //       }
        //     })
        //   }
        //   return forWardResp
        // })
        .then(async (res) => {
          let forWardResp1;
          if (res) {
            await FilterListAPI(productlisttype, cookie)
              .then((res) => {
                setFilterData(res);
                let diafilter =
                  res?.filter((ele) => ele?.Name == "Diamond")[0]?.options
                    ?.length > 0
                    ? JSON.parse(
                      res?.filter((ele) => ele?.Name == "Diamond")[0]?.options
                    )[0]
                    : [];
                let diafilter1 =
                  res?.filter((ele) => ele?.Name == "NetWt")[0]?.options
                    ?.length > 0
                    ? JSON.parse(
                      res?.filter((ele) => ele?.Name == "NetWt")[0]?.options
                    )[0]
                    : [];
                let diafilter2 =
                  res?.filter((ele) => ele?.Name == "Gross")[0]?.options
                    ?.length > 0
                    ? JSON.parse(
                      res?.filter((ele) => ele?.Name == "Gross")[0]?.options
                    )[0]
                    : [];
                setSliderValue(diafilter?.Min != null || diafilter?.Max != null ? [diafilter.Min, diafilter.Max] : []);
                setSliderValue1(diafilter1?.Min != null || diafilter1?.Max != null ? [diafilter1?.Min, diafilter1?.Max] : []);
                setSliderValue2(diafilter2?.Min != null || diafilter2?.Max != null ? [diafilter2?.Min, diafilter2?.Max] : []);
                forWardResp1 = res;
              })
              .catch((err) => console.log("err", err));
          }
          return forWardResp1;
        })
        .finally(() => {
          setIsProdLoading(false);
          setIsOnlyProdLoading(false);
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        })
        .catch((err) => console.log("err", err));

      // }
    };

    fetchData();

    if (location?.key) {
      setLocationKey(location?.key);
    }
    setCurrPage(1)
    setInputPage(1)
  }, [location?.key]);

  let getDesignImageFol = storeInit?.CDNDesignImageFolThumb;
  const getDesignVideoFol = storeInit?.CDNVPath;

  const getDynamicRollImages = (designno, count, extension) => {
    if (count > 1) {
      return `${getDesignImageFol}${designno}~${2}.jpg`;
    }
    return;
  };

  const getDynamicImages = (designno, extension) => {
    return `${getDesignImageFol}${designno}~${1}.jpg`;
  };

  const getDynamicVideo = (designno, count, extension) => {
    if (extension && count > 0) {
      const url = `${getDesignVideoFol}${designno}~${1}.${extension}`;
      return url;
    }
    return;
  };

  // useEffect(() => {
  //   const finalProdWithPrice = productListData.map((product) => {
  //     let pdImgList = [];

  //     if (product?.ImageCount > 0) {
  //       for (let i = 1; i <= product?.ImageCount; i++) {
  //         let imgString =
  //           storeInit?.CDNDesignImageFol +
  //           product?.designno +
  //           "~" +
  //           i +
  //           "." +
  //           product?.ImageExtension;
  //         pdImgList.push(imgString);
  //       }
  //     } else {
  //       pdImgList.push(imageNotFound);
  //     }

  //     let images = pdImgList;

  //     let StatusId = product?.StatusId ?? 0;

  //     if (SoketData && SoketData?.length != 0) {
  //       let filterdata = SoketData?.find(
  //         (ele) => ele?.designno === product?.designno
  //       );
  //       StatusId = filterdata?.StatusId ?? 0;
  //     }

  //     return {
  //       ...product,
  //       images,
  //       StatusId,
  //     };
  //   });
  //   setFinalProductListData(finalProdWithPrice);
  // }, [productListData, SoketData]);

  const generateImageList = useCallback((product) => {
    let storeInitX = JSON.parse(sessionStorage.getItem("storeInit"));
    let pdImgList = []
    if (product?.ImageCount > 0) {
      for (let i = 1; i <= product?.ImageCount; i++) {
        let imgString =
          storeInitX?.CDNDesignImageFol +
          product?.designno +
          "~" +
          i +
          "." +
          product?.ImageExtension
        pdImgList?.push(imgString)
      }
    } else {
      pdImgList?.push(imageNotFound)
    }
    return pdImgList
  }, [])

  useEffect(() => {
    const initialProducts = productListData?.map((product) => ({
      ...product,
      images: [],
      loading: true,
    }));

    setFinalProductListData(initialProducts);

    // const timer = setTimeout(() => {
    const updateData = productListData?.map((product) => ({
      ...product,
      images: generateImageList(product),
      loading: false,
    }));

    setFinalProductListData(updateData);
    // }, 150);

    // return () => clearTimeout(timer);

  }, [productListData, generateImageList]);


  // useEffect(() => {
  //   if (loadingIndex >= finalProductListData?.length) return

  //   const loadNextProductImages = () => {
  //     setFinalProductListData(prevData => {
  //       const newData = [...prevData]
  //       newData[loadingIndex] = {
  //         ...newData[loadingIndex],
  //         images: generateImageList(newData[loadingIndex]),
  //         loading: false
  //       }
  //       return newData
  //     })

  //     setLoadingIndex(prevIndex => prevIndex + 1)
  //   }

  //   const timer = setTimeout(loadNextProductImages, 20)
  //   return () => clearTimeout(timer)
  // }, [loadingIndex, finalProductListData, generateImageList])

  // useEffect(()=>{
  //   const finalProdWithSocket = productListData.map((product) => {
  //     let common = SoketData?.find((ele)=> ele?.designno === product?.designno)
  //     if(common !== undefined && common ){
  //       let StatusId = common?.StatusId
  //       return {
  //         ...product,
  //         StatusId
  //       }
  //     }else{
  //       let StatusId = 0
  //       return {...product,StatusId}
  //     }
  //   })
  //   setFinalProductListData(finalProdWithSocket);
  //   console.log("finalProdWithPrice",finalProdWithSocket);
  // },[productListData,SoketData])

  // useEffect(() => {
  //   const finalProdWithPrice = productListData.map((product) => {
  //     const newPriceData = priceListData?.rd?.find(
  //       (pda) => pda.A == product.autocode
  //     );

  //     const newPriceData1 = priceListData?.rd1
  //       ?.filter((pda) => pda.A == product.autocode)
  //       .reduce((acc, obj) => acc + obj.S, 0);

  //     const newPriceData2 = priceListData?.rd2
  //       ?.filter((pda) => pda.A == product.autocode)
  //       .reduce((acc, obj) => acc + obj.S, 0);

  //       let pdImgList = [];

  //       if(product?.ImageCount > 0){
  //         for(let i = 1; i <= product?.ImageCount; i++){
  //           let imgString = storeInit?.CDNDesignImageFol + product?.designno + "~" + i + "." + product?.ImageExtension
  //           pdImgList.push(imgString)
  //         }
  //       }
  //       else{
  //         pdImgList.push(imageNotFound)
  //       }

  //     let price = 0;
  //     let markup = 0;
  //     let metalrd = 0;
  //     let diard1 = 0;
  //     let csrd2 = 0;
  //     let updNWT = 0;
  //     let updGWT = 0;
  //     let updDWT = 0;
  //     let updDPCS = 0;
  //     let updCWT = 0;
  //     let updCPCS = 0;
  //     let ismrpbase;
  //     let mrpbaseprice;
  //     let images = pdImgList;

  //     if (newPriceData || newPriceData1 || newPriceData2) {
  //       price =
  //         ((newPriceData?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
  //         (newPriceData?.W ?? 0) +
  //         (newPriceData?.X ?? 0) +
  //         (newPriceData1 ?? 0) +
  //         (newPriceData2 ?? 0);
  //       metalrd =
  //         ((newPriceData?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
  //         (newPriceData?.W ?? 0) +
  //         (newPriceData?.X ?? 0);
  //       diard1 = newPriceData1 ?? 0;
  //       csrd2 = newPriceData2 ?? 0;
  //       markup = newPriceData?.AB;
  //       updNWT = newPriceData?.I ?? 0;
  //       updGWT = newPriceData?.N ?? 0;
  //       updDWT = newPriceData?.K ?? 0;
  //       updDPCS = newPriceData?.J ?? 0;
  //       updCWT = newPriceData?.M ?? 0;
  //       updCPCS = newPriceData?.L ?? 0;
  //       ismrpbase = newPriceData?.U;
  //       mrpbaseprice = newPriceData?.Z;
  //     }

  //     return {
  //       ...product,
  //       price,
  //       markup,
  //       metalrd,
  //       diard1,
  //       csrd2,
  //       updNWT,
  //       updGWT,
  //       updDWT,
  //       updDPCS,
  //       updCWT,
  //       updCPCS,
  //       ismrpbase,
  //       mrpbaseprice,
  //       images
  //     };
  //   });
  //   setFinalProductListData(finalProdWithPrice);
  // }, [productListData, priceListData]);

  const ProdCardImageFunc = (pd, j) => {
    let finalprodListimg;
    let pdImgList = [];

    if (pd?.ImageCount > 0) {
      for (let i = 1; i <= pd?.ImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          pd?.designno +
          "~" +
          i +
          "." +
          pd?.ImageExtension;
        pdImgList.push(imgString);
      }
    } else {
      finalprodListimg = imageNotFound;
    }
    if (pdImgList?.length > 0) {
      finalprodListimg = pdImgList[j];
      if (j > 0 && (!finalprodListimg || finalprodListimg == undefined)) {
        finalprodListimg = pdImgList[0];
      }
    }
    return finalprodListimg;
  };

  const handleCheckboxChange = (e, listname, val) => {
    const { name, checked } = e.target;
    setAfterCountStatus(true);
    setFilterChecked((prev) => ({
      ...prev,
      [name]: {
        checked,
        type: listname,
        id: name?.replace(/[a-zA-Z]/g, ""),
        value: val,
      },
    }));
  };

  const FilterValueWithCheckedOnly = () => {
    let onlyTrueFilterValue = Object.values(filterChecked).filter(
      (ele) => ele.checked
    );

    const priceValues = onlyTrueFilterValue
      .filter((item) => item.type === "Price")
      .map((item) => item.value);

    const output = {};

    onlyTrueFilterValue.forEach((item) => {
      if (!output[item.type]) {
        output[item.type] = "";
      }

      if (item.type == "Price") {
        output["Price"] = priceValues;
        return;
      }

      output[item.type] += `${item.id}, `;
    });

    for (const key in output) {
      if (key !== "Price") {
        output[key] = output[key].slice(0, -2);
      }
    }

    // if
    setCurrPage(1)
    setInputPage(1)

    return output;
  };

  useEffect(() => {
    setSortBySelect('Recommended')
  }, [location?.key])

  useEffect(() => {
    setAfterCountStatus(true);
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    let diafilter =
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        )[0]
        : [];
    let diafilter1 =
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        )[0]
        : [];
    let diafilter2 =
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        )[0]
        : [];
    const isDia = JSON.stringify(sliderValue) !== JSON.stringify([diafilter?.Min, diafilter?.Max]);
    const isNet = JSON.stringify(sliderValue1) !== JSON.stringify([diafilter1?.Min, diafilter1?.Max]);
    const isGross = JSON.stringify(sliderValue2) !== JSON.stringify([diafilter2?.Min, diafilter2?.Max]);

    //  if(location?.state?.SearchVal === undefined && Object.keys(filterChecked)?.length > 0){
    // console.log("locationkey",location?.key !== locationKey,location?.key,locationKey);

    if (location?.key === locationKey && (Object.keys(filterChecked)?.length > 0 || isClearAllClicked === true)) {
      setIsOnlyProdLoading(true);
      let DiaRange = { DiaMin: isDia ? sliderValue[0] : "", DiaMax: isDia ? sliderValue[1] : "" }
      let grossRange = { grossMin: isGross ? sliderValue2[0] : "", grossMax: isGross ? sliderValue2[1] : "" }
      let netRange = { netMin: isNet ? sliderValue1[0] : "", netMax: isNet ? sliderValue1[1] : "" }

      ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            sessionStorage.setItem('deatilSliderData', JSON.stringify(res?.pdList));
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
            setAfterCountStatus(false);
          }
          return res;
        })
        //  .then( async(res) => {
        //    if (res) {
        //      await GetPriceListApi(1,{},output,res?.pdResp?.rd1[0]?.AutoCodeList,obj).then((resp)=>{
        //        if(resp){
        //          setPriceListData(resp)
        //        }
        //      })
        //    }
        //    return res
        //  })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setAfterCountStatus(false);
          setIsOnlyProdLoading(false);
          setIsClearAllClicked(false);
        });
    }
    else {
      setAfterCountStatus(false);
    }
    // .then(async(res)=>{
    //   if(res){
    //     FilterListAPI().then((res)=>setFilterData(res)).catch((err)=>console.log("err",err))
    //   }
    // })
    // }
  }, [filterChecked]);

  // const handelFilterClearAll = () => {      
  //   // setAfterCountStatus(true);      
  //   if (Object.values(filterChecked).filter(ele => ele.checked)?.length > 0) { 
  //     setFilterChecked({})

  //     setAccExpanded(false) 
  //   } 
  //    let diafilter = filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options?.length > 0 ? JSON.parse(filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options)[0] : [];
  //     let diafilter1 = filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options?.length > 0 ? JSON.parse(filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options)[0] : [];
  //     let diafilter2 = filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options?.length > 0 ? JSON.parse(filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options)[0] : [];
  //     setSliderValue([diafilter?.Min, diafilter?.Max])
  //     setSliderValue1([diafilter1?.Min, diafilter1?.Max])
  //     setSliderValue2([diafilter2?.Min, diafilter2?.Max])
  //     // setRangeFilterShow(false)
  // }

  // new steps clear all range 

  const handelFilterClearAll = () => {
    // setAfterCountStatus(true);
    let diafilter =
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        )[0]
        : [];
    let diafilter1 =
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        )[0]
        : [];
    let diafilter2 =
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        )[0]
        : [];
    const isFilterChecked = Object.values(filterChecked).some((ele) => ele.checked);
    const isSliderChanged =
      JSON.stringify(sliderValue) !== JSON.stringify((diafilter?.Min != null || diafilter?.Max != null) ? [diafilter?.Min, diafilter?.Max] : []) ||
      JSON.stringify(sliderValue1) !== JSON.stringify((diafilter1?.Min != null || diafilter1?.Max != null) ? [diafilter1?.Min, diafilter1?.Max] : []) ||
      JSON.stringify(sliderValue2) !== JSON.stringify((diafilter2?.Min != null || diafilter2?.Max != null) ? [diafilter2?.Min, diafilter2?.Max] : []);

    // if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) {
    if (isFilterChecked || isSliderChanged) {
      let diafilter =
        filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
          ?.length > 0
          ? JSON.parse(
            filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
          )[0]
          : [];
      let diafilter1 =
        filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
          ?.length > 0
          ? JSON.parse(
            filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
          )[0]
          : [];
      let diafilter2 =
        filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
          ?.length > 0
          ? JSON.parse(
            filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
          )[0]
          : [];
      setSliderValue(diafilter?.Min != null || diafilter?.Max != null ? [diafilter.Min, diafilter.Max] : []);
      setSliderValue1(diafilter1?.Min != null || diafilter1?.Max != null ? [diafilter1?.Min, diafilter1?.Max] : []);
      setSliderValue2(diafilter2?.Min != null || diafilter2?.Max != null ? [diafilter2?.Min, diafilter2?.Max] : []);
      setInputDia([diafilter?.Min, diafilter?.Max]);
      setInputNet([diafilter1?.Min, diafilter1?.Max]);
      setInputGross([diafilter2?.Min, diafilter2?.Max]);
      setAppliedRange1(["", ""])
      setAppliedRange2(["", ""])
      setAppliedRange3(["", ""])
      setShow(false);
      setShow1(false);
      setShow2(false);
      setFilterChecked({});
    }
  };

  const totalPages = Math.ceil(
    afterFilterCount / storeInit.PageSize
  );

  const handlePageInputChange = (event) => {
    if (event.key === 'Enter') {
      let newPage = parseInt(inputPage, 10);
      if (newPage < 1) newPage = 1;
      if (newPage > totalPages) newPage = totalPages;
      setCurrPage(newPage);
      setInputPage(newPage);
      handelPageChange("", newPage);
    }
  };

  const handelPageChange = (event, value) => {
    // console.log("pagination",value);

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    setIsProdLoading(true);
    setCurrPage(value);
    setInputPage(value);
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
    let diafilter =
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        )[0]
        : [];
    let diafilter1 =
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        )[0]
        : [];
    let diafilter2 =
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        )[0]
        : [];
    const isDia = JSON.stringify(sliderValue) !== JSON.stringify([diafilter?.Min, diafilter?.Max]);
    const isNet = JSON.stringify(sliderValue1) !== JSON.stringify([diafilter1?.Min, diafilter1?.Max]);
    const isGross = JSON.stringify(sliderValue2) !== JSON.stringify([diafilter2?.Min, diafilter2?.Max]);

    let DiaRange = {
      DiaMin: isDia ? sliderValue[0] ?? "" : "",
      DiaMax: isDia ? sliderValue[1] ?? "" : ""
    };

    let netRange = {
      netMin: isNet ? sliderValue1[0] ?? "" : "",
      netMax: isNet ? sliderValue1[1] ?? "" : ""
    };

    let grossRange = {
      grossMin: isGross ? sliderValue2[0] ?? "" : "",
      grossMax: isGross ? sliderValue2[1] ?? "" : ""
    };

    ProductListApi(output, value, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
        }
        return res;
      })
      // .then(async (res) => {
      //   if (res) {
      //     await GetPriceListApi(value, {}, output, res?.pdResp?.rd1[0]?.AutoCodeList, obj).then((resp) => {
      //       if (resp) {
      //         setPriceListData(resp)
      //       }
      //     })
      //   }
      //   return res
      // })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setTimeout(() => {
          setIsProdLoading(false);
        }, 100);
      });
  };

  const handleCartandWish = (e, ele, type) => {
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let prodObj = {
      autocode: ele?.autocode,
      Metalid: selectedMetalId ?? ele?.MetalPurityid,
      MetalColorId: ele?.MetalColorid,
      DiaQCid:
        selectedDiaId ?? loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
      CsQCid: selectedCsId ?? loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
      Size: ele?.DefaultSize,
      Unitcost: ele?.UnitCost,
      markup: ele?.DesignMarkUp,
      UnitCostWithmarkup: ele?.UnitCostWithMarkUp,
      Remark: "",
      // AlbumName: decodeURI(extractedPart) ?? ""
      AlbumName:
        decodeURIComponent(location.pathname?.split("/p/")[1].split("/")[0]) ??
        "",
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
      RemoveCartAndWishAPI(type, ele?.autocode, cookie)
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
        [ele?.autocode]: e.target.checked,
      }));
    }

    if (type === "Wish") {
      setWishArr((prev) => ({
        ...prev,
        [ele?.autocode]: e.target.checked,
      }));
    }
  };

  useEffect(() => {
    if (productListData?.length === 0 || !productListData) {
      setFilterProdListEmpty(true);
    } else {
      setFilterProdListEmpty(false);
      setAfterCountStatus(false);
    }
  }, [productListData]);

  const handelCustomCombo = (obj) => {
    let output = FilterValueWithCheckedOnly();

    if (location?.state?.SearchVal === undefined) {
      setIsOnlyProdLoading(true);
      let diafilter =
        filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
          ?.length > 0
          ? JSON.parse(
            filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
          )[0]
          : [];
      let diafilter1 =
        filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
          ?.length > 0
          ? JSON.parse(
            filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
          )[0]
          : [];
      let diafilter2 =
        filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
          ?.length > 0
          ? JSON.parse(
            filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
          )[0]
          : [];
      const isDia = JSON.stringify(sliderValue) !== JSON.stringify([diafilter?.Min, diafilter?.Max]);
      const isNet = JSON.stringify(sliderValue1) !== JSON.stringify([diafilter1?.Min, diafilter1?.Max]);
      const isGross = JSON.stringify(sliderValue2) !== JSON.stringify([diafilter2?.Min, diafilter2?.Max]);

      let DiaRange = {
        DiaMin: isDia ? sliderValue[0] ?? "" : "",
        DiaMax: isDia ? sliderValue[1] ?? "" : ""
      };

      let netRange = {
        netMin: isNet ? sliderValue1[0] ?? "" : "",
        netMax: isNet ? sliderValue1[1] ?? "" : ""
      };

      let grossRange = {
        grossMin: isGross ? sliderValue2[0] ?? "" : "",
        grossMax: isGross ? sliderValue2[1] ?? "" : ""
      };

      setCurrPage(1);
      setInputPage(1)

      // , DiaRange, netRange ,grossRange
      ProductListApi(output, currPage, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
          }
          return res;
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setTimeout(() => {
            sessionStorage.setItem("short_cutCombo_val", JSON?.stringify(obj));
            setIsOnlyProdLoading(false);
          }, 100);
        });
    }
  };

  useEffect(() => {
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    sessionStorage.setItem("short_cutCombo_val", JSON?.stringify(obj));

    if (
      loginInfo?.MetalId !== selectedMetalId ||
      loginInfo?.cmboDiaQCid !== selectedDiaId ||
      loginInfo?.cmboCSQCid !== selectedCsId
    ) {
      if (
        selectedMetalId !== "" ||
        selectedDiaId !== "" ||
        selectedCsId !== ""
      ) {
        handelCustomCombo(obj);
      }
    }
  }, [selectedMetalId, selectedDiaId, selectedCsId, storeInit]);

  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = pako.deflate(uint8Array, { to: "string" });

      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error("Error compressing and encoding:", error);
      return null;
    }
  };

  const decodeAndDecompress = (encodedString) => {
    try {
      // Decode the Base64 string to binary data
      const binaryString = atob(encodedString);

      // Convert binary string to Uint8Array
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      // Decompress the data
      const decompressed = pako.inflate(uint8Array, { to: "string" });

      // Convert decompressed data back to JSON object
      const jsonObject = JSON.parse(decompressed);

      return jsonObject;
    } catch (error) {
      console.error("Error decoding and decompressing:", error);
      return null;
    }
  };

  const handleMoveToDetail = (productData, i) => {
    const logininfoDetail = JSON.parse(
      sessionStorage.getItem("loginUserDetail")
    );

    let output = FilterValueWithCheckedOnly();

    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId ?? logininfoDetail?.MetalId ?? storeInit?.MetalId,
      d:
        selectedDiaId ?? logininfoDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
      c: selectedCsId ?? logininfoDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid,
      f: output,
      // n: decodeURI(extractedPart)
      n:
        decodeURIComponent(location.pathname?.split("/p/")[1].split("/")[0]) ??
        "",
      pl: prodListType ?? "",
      sb: sortBySelect ?? "",
      sk: securityKey,
      di: diaRange,
      ne: netRange,
      gr: grossRange,
      in: i,
    };
    decodeAndDecompress();
    let encodeObj = compressAndEncode(JSON.stringify(obj));
    navigate(`/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`);
  };

  const handleImgRollover = (pd) => {
    if (pd?.images?.length >= 1) {
      const imageUrls = [pd.images[1], pd.images[0]];
      let imageToUse = imageNotFound;

      for (const imageUrl of imageUrls) {
        imageToUse = imageUrl;
        break;
      }

      setRolloverImgPd((prev) => {
        if (prev[pd?.autocode] !== imageToUse) {
          return { [pd?.autocode]: imageToUse };
        }
        return prev;
      });
    }
  };

  const handleLeaveImgRolloverImg = (pd) => {
    if (pd?.images?.length > 0) {
      const imageUrl = pd?.images[0];
      setRolloverImgPd((prev) => {
        return { [pd?.autocode]: imageUrl };
      });
    }
  };


  const handleBreadcums = (mparams) => {
    let key = Object?.keys(mparams);
    let val = Object?.values(mparams);

    let KeyObj = {};
    let ValObj = {};

    key.forEach((value, index) => {
      let keyName = `FilterKey${index === 0 ? "" : index}`;
      KeyObj[keyName] = value;
    });

    val.forEach((value, index) => {
      let keyName = `FilterVal${index === 0 ? "" : index}`;
      ValObj[keyName] = value;
    });

    let finalData = { ...KeyObj, ...ValObj };

    const queryParameters1 = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ]
      .filter(Boolean)
      .join("/");

    const queryParameters = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ]
      .filter(Boolean)
      .join(",");

    const otherparamUrl = Object.entries({
      b: finalData?.FilterKey,
      g: finalData?.FilterKey1,
      c: finalData?.FilterKey2,
    })
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => value)
      .filter(Boolean)
      .join(",");

    let menuEncoded = `${queryParameters}/${otherparamUrl}`;

    const url = `/p/${BreadCumsObj()?.menuname}/${queryParameters1}/?M=${btoa(
      menuEncoded
    )}`;
    // const url = `/p?V=${queryParameters}/K=${otherparamUrl}`;

    navigate(url);

    // console.log("mparams", KeyObj, ValObj)
  };

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value);

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    setIsOnlyProdLoading(true);

    let sortby = e.target?.value;
    let diafilter =
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        )[0]
        : [];
    let diafilter1 =
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        )[0]
        : [];
    let diafilter2 =
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        )[0]
        : [];
    const isDia = JSON.stringify(sliderValue) !== JSON.stringify([diafilter?.Min, diafilter?.Max]);
    const isNet = JSON.stringify(sliderValue1) !== JSON.stringify([diafilter1?.Min, diafilter1?.Max]);
    const isGross = JSON.stringify(sliderValue2) !== JSON.stringify([diafilter2?.Min, diafilter2?.Max]);

    let DiaRange = {
      DiaMin: isDia ? sliderValue[0] ?? "" : "",
      DiaMax: isDia ? sliderValue[1] ?? "" : ""
    };

    let netRange = {
      netMin: isNet ? sliderValue1[0] ?? "" : "",
      netMax: isNet ? sliderValue1[1] ?? "" : ""
    };

    let grossRange = {
      grossMin: isGross ? sliderValue2[0] ?? "" : "",
      grossMax: isGross ? sliderValue2[1] ?? "" : ""
    };

    setCurrPage(1);
    setInputPage(1)

    // DiaRange, netRange ,grossRange
    await ProductListApi(output, currPage, obj, prodListType, cookie, sortby, DiaRange, netRange, grossRange)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);

        // if(element)
        //   {
        //     element.scrollIntoView({ behavior: "smooth", block: "start" })
        //   }
        // window.scroll({
        //   top: 0,
        //   behavior: 'smooth'
        // })
      });
  };

  // useEffect(()=>{
  // let element =  document.getElementById("smr_outer_portion")
  // if(element){
  //   console.log("scroll",element)
  // }
  // },[])

  // const showBreadCumsValue = () =>{

  //   let UrlVal = location?.search.slice(1).split("/")[0]?.charAt(0)

  //   let Compo;

  //   if(UrlVal == "M"){
  //     Compo = (
  //       <div className="smr_breadcums_port">
  //                         {menuParams?.menuname && (
  //                           <span
  //                             onClick={() =>
  //                               handleBreadcums({
  //                                 [menuParams?.FilterKey]:
  //                                   menuParams?.FilterVal,
  //                               })
  //                             }
  //                           >
  //                             {menuParams?.menuname}
  //                           </span>
  //                         )}

  //                         {menuParams?.FilterVal1 && (
  //                           <span
  //                             onClick={() =>
  //                               handleBreadcums({
  //                                 [menuParams?.FilterKey]:
  //                                   menuParams?.FilterVal,
  //                                 [menuParams?.FilterKey1]:
  //                                   menuParams?.FilterVal1,
  //                               })
  //                             }
  //                           >
  //                             {` > ${menuParams?.FilterVal1}`}
  //                           </span>
  //                         )}

  //                         {menuParams?.FilterVal2 && (
  //                           <span
  //                             onClick={() =>
  //                               handleBreadcums({
  //                                 [menuParams?.FilterKey]:
  //                                   menuParams?.FilterVal,
  //                                 [menuParams?.FilterKey1]:
  //                                   menuParams?.FilterVal1,
  //                                 [menuParams?.FilterKey2]:
  //                                   menuParams?.FilterVal2,
  //                               })
  //                             }
  //                           >
  //                             {` > ${menuParams?.FilterVal2}`}
  //                           </span>
  //                         )}
  //                       </div>
  //     )
  //   }
  //   if()

  // }

  // console.log("showBreadCumsValue",showBreadCumsValue())

  const handleScrollHeight = () => {
    // const element = document.getElementsByClassName("smr_filter_portion_outter")
    // const clientHeight = element?.clientHeight;
    // console.log('ClientHeight', clientHeight);
  };

  // const handleRangeFilter = async(type,val) => {

  //   let output = FilterValueWithCheckedOnly()
  //   let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId}

  //   let DiaRange = {DiaMin:val[0],DiaMax:val[1]}

  //   console.log("DiaRange",DiaRange)

  //   setDiaFilterRange(DiaRange)

  //   setTimeout(async()=>{
  //     await ProductListApi(output,1,obj,prodListType,cookie,sortBySelect,DiaRange)
  //     .then((res) => {
  //       if (res) {
  //         setProductListData(res?.pdList);
  //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log("err", err))
  //     .finally(()=>{
  //         setIsOnlyProdLoading(false)
  //     })
  //   },100)

  // };

  const handleRangeFilterApi = async (Rangeval) => {
    setIsOnlyProdLoading(true)
    setAfterCountStatus(true);
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    // let diafilter = JSON.parse(filterData?.filter((ele)=>ele?.Name == "Diamond")[0]?.options)[0]
    // let diafilter1 = JSON.parse(
    //   filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
    // )[0];
    // let diafilter2 = JSON.parse(
    //   filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
    // )[0];

    // let DiaRange = { DiaMin: Rangeval[0], DiaMax: Rangeval[1] };
    // let netRange = {
    //   netMin: diafilter1?.Min == sliderValue1[0] ? "" : sliderValue1[0],
    //   netMax: diafilter1?.Max == sliderValue1[1] ? "" : sliderValue1[1],
    // };
    // let grossRange = {
    //   grossMin: diafilter2?.Min == sliderValue2[0] ? "" : sliderValue2[0],
    //   grossMax: diafilter2?.Max == sliderValue2[1] ? "" : sliderValue2[1],
    // };
    // let DiaRange = { DiaMin: Rangeval[0], DiaMax: Rangeval[1] };
    // let netRange = { netMin:  sliderValue1[0] ?? "", netMax: sliderValue1[1] ?? "" } 
    // let grossRange = { grossMin: sliderValue2[0] ?? "", grossMax: sliderValue2[1] ?? ""} 
    let diafilter =
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        )[0]
        : [];
    let diafilter1 =
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        )[0]
        : [];
    let diafilter2 =
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        )[0]
        : [];
    const isDia = JSON.stringify(Rangeval) !== JSON.stringify([diafilter?.Min, diafilter?.Max]);
    const isNet = JSON.stringify(sliderValue1) !== JSON.stringify([diafilter1?.Min, diafilter1?.Max]);
    const isGross = JSON.stringify(sliderValue2) !== JSON.stringify([diafilter2?.Min, diafilter2?.Max]);

    let DiaRange = {
      DiaMin: isDia ? Rangeval[0] ?? "" : "",
      DiaMax: isDia ? Rangeval[1] ?? "" : ""
    };

    let netRange = {
      netMin: isNet ? sliderValue1[0] ?? "" : "",
      netMax: isNet ? sliderValue1[1] ?? "" : ""
    };

    let grossRange = {
      grossMin: isGross ? sliderValue2[0] ?? "" : "",
      grossMax: isGross ? sliderValue2[1] ?? "" : ""
    };



    await ProductListApi(
      output,
      1,
      obj,
      prodListType,
      cookie,
      sortBySelect,
      DiaRange,
      netRange,
      grossRange
    )
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
          setAfterCountStatus(false);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
        setAfterCountStatus(false);
      });
  }

  const handleRangeFilterApi1 = async (Rangeval1) => {
    setIsOnlyProdLoading(true)
    setAfterCountStatus(true)
    // let diafilter = JSON.parse(
    //   filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
    // )[0];
    // // let diafilter1 = JSON.parse(filterData?.filter((ele)=>ele?.Name == "NetWt")[0]?.options)[0]
    // let diafilter2 = JSON.parse(
    //   filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
    // )[0];

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    // let DiaRange = {
    //   diaMin: diafilter?.Min == sliderValue[0] ? "" : sliderValue[0],
    //   diaMax: diafilter?.Max == sliderValue[1] ? "" : sliderValue[1],
    // };
    // let netRange = { netMin: Rangeval1[0], netMax: Rangeval1[1] };
    // let grossRange = {
    //   grossMin: diafilter2?.Min == sliderValue2[0] ? "" : sliderValue2[0],
    //   grossMax: diafilter2?.Max == sliderValue2[1] ? "" : sliderValue2[1],
    // };
    // let DiaRange = { diaMin: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[0], diaMax: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[1] }
    // let grossRange = { grossMin: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[0], grossMax: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[1] }
    // let netRange = { netMin: Rangeval1[0], netMax: Rangeval1[1] }
    // let DiaRange = { DiaMin:  sliderValue[0] ?? "", DiaMax: sliderValue[1] ?? "" }
    // let grossRange = { grossMin: sliderValue2[0] ?? "", grossMax: sliderValue2[1] ?? ""}

    let diafilter =
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        )[0]
        : [];
    let diafilter1 =
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        )[0]
        : [];
    let diafilter2 =
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        )[0]
        : [];
    const isDia = JSON.stringify(sliderValue) !== JSON.stringify([diafilter?.Min, diafilter?.Max]);
    const isNet = JSON.stringify(Rangeval1) !== JSON.stringify([diafilter1?.Min, diafilter1?.Max]);
    const isGross = JSON.stringify(sliderValue2) !== JSON.stringify([diafilter2?.Min, diafilter2?.Max]);

    let DiaRange = {
      DiaMin: isDia ? sliderValue[0] ?? "" : "",
      DiaMax: isDia ? sliderValue[1] ?? "" : ""
    };

    let netRange = {
      netMin: isNet ? Rangeval1[0] ?? "" : "",
      netMax: isNet ? Rangeval1[1] ?? "" : ""
    };

    let grossRange = {
      grossMin: isGross ? sliderValue2[0] ?? "" : "",
      grossMax: isGross ? sliderValue2[1] ?? "" : ""
    };


    await ProductListApi(
      output,
      1,
      obj,
      prodListType,
      cookie,
      sortBySelect,
      DiaRange,
      netRange,
      grossRange
    )
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
          setAfterCountStatus(false)
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
        setAfterCountStatus(false)
      });
  };

  const handleRangeFilterApi2 = async (Rangeval2) => {
    setIsOnlyProdLoading(true)
    setAfterCountStatus(true)
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    // let diafilter = JSON.parse(
    //   filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
    // )[0];
    // let diafilter1 = JSON.parse(
    //   filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
    // )[0];
    // let diafilter2 = JSON.parse(filterData?.filter((ele)=>ele?.Name == "Gross")[0]?.options)[0]

    // let DiaRange = {
    //   diaMin: diafilter?.Min == sliderValue[0] ? "" : sliderValue[0],
    //   diaMax: diafilter?.Max == sliderValue[1] ? "" : sliderValue[1],
    // };
    // let netRange = {
    //   netMin: diafilter1?.Min == sliderValue1[0] ? "" : sliderValue1[0],
    //   netMax: diafilter1?.Max == sliderValue1[1] ? "" : sliderValue1[1],
    // };
    // let grossRange = { grossMin: Rangeval2[0], grossMax: Rangeval2[1] };
    // let DiaRange = { DiaMin:  sliderValue[0] ?? diafilter?.Min , DiaMax: sliderValue[1] ?? diafilter?.Max }
    // let netRange = { netMin: sliderValue1[0] ?? "", netMax: sliderValue1[1] ?? ""}
    // let grossRange = { grossMin: Rangeval2[0], grossMax: Rangeval2[1] }
    let diafilter =
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        )[0]
        : [];
    let diafilter1 =
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        )[0]
        : [];
    let diafilter2 =
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        )[0]
        : [];
    const isDia = JSON.stringify(sliderValue) !== JSON.stringify([diafilter?.Min, diafilter?.Max]);
    const isNet = JSON.stringify(sliderValue1) !== JSON.stringify([diafilter1?.Min, diafilter1?.Max]);
    const isGross = JSON.stringify(Rangeval2) !== JSON.stringify([diafilter2?.Min, diafilter2?.Max]);

    let DiaRange = {
      DiaMin: isDia ? sliderValue[0] ?? "" : "",
      DiaMax: isDia ? sliderValue[1] ?? "" : ""
    };

    let netRange = {
      netMin: isNet ? sliderValue1[0] ?? "" : "",
      netMax: isNet ? sliderValue1[1] ?? "" : ""
    };

    let grossRange = {
      grossMin: isGross ? Rangeval2[0] ?? "" : "",
      grossMax: isGross ? Rangeval2[1] ?? "" : ""
    };



    await ProductListApi(
      output,
      1,
      obj,
      prodListType,
      cookie,
      sortBySelect,
      DiaRange,
      netRange,
      grossRange
    )
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
          setAfterCountStatus(false);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
        setAfterCountStatus(false);
      });
  };


  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    handleRangeFilterApi(newValue);
  };
  const handleSliderChange1 = (event, newValue) => {
    setSliderValue1(newValue);
    handleRangeFilterApi1(newValue);
  };
  const handleSliderChange2 = (event, newValue) => {
    setSliderValue2(newValue);
    handleRangeFilterApi2(newValue);
  };

  const handleInputChange = (index) => (event) => {
    const newSliderValue = [...sliderValue];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setSliderValue(newSliderValue);
    handleRangeFilterApi(newSliderValue);
  };
  const handleInputChange1 = (index) => (event) => {
    const newSliderValue = [...sliderValue1];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setSliderValue1(newSliderValue);
    handleRangeFilterApi1(newSliderValue);
  };
  const handleInputChange2 = (index) => (event) => {
    const newSliderValue = [...sliderValue2];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setSliderValue2(newSliderValue);
    handleRangeFilterApi2(newSliderValue);
  };

  const SharedStyleForRange = {
    width: 170, height: 88, '@media (max-width:1520px)': {
      width: 165, // Example of how to change width on small screens
    }, '@media (max-width:1410px)': {
      width: 160, // Example of how to change width on small screens
    }, '@media (max-width:1290px)': {
      width: 145, // Example of how to change width on small screens
    },
  }

  const resetRangeFilter = async ({
    filterName,
    setSliderValue,
    setTempSliderValue,
    handleRangeFilterApi,
    prodListType,
    cookie,
    setIsShowBtn,
    show, setShow,
    setAppliedRange,
  }) => {
    try {
      const res1 = await FilterListAPI(prodListType, cookie);
      const optionsRaw = res1?.find((f) => f?.Name === filterName)?.options;

      if (optionsRaw) {
        const { Min = 0, Max = 100 } = JSON.parse(optionsRaw)?.[0] || {};
        const resetValue = [Min, Max];
        setSliderValue(resetValue);
        setTempSliderValue(resetValue);
        handleRangeFilterApi("");
        setAppliedRange(["", ""])
        // handleRangeFilterApi(resetValue);
        setIsShowBtn?.(false);
        if (show) setShow(false)
      }
    } catch (error) {
      console.error(`Failed to reset filter "${filterName}":`, error);
    }
  };


  const RangeFilterView = ({ ele, sliderValue, setSliderValue, handleRangeFilterApi, prodListType, cookie, setShow, show, setAppliedRange1, appliedRange1 }) => {
    const parsedOptions = JSON.parse(ele?.options || "[]")?.[0] || {};
    const min = Number(parsedOptions.Min || 0);  // Ensure min is a number
    const max = Number(parsedOptions.Max || 100);
    const [tempSliderValue, setTempSliderValue] = useState(sliderValue);
    const [isShowBtn, setIsShowBtn] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
      inputRefs.current = tempSliderValue.map((_, i) => inputRefs.current[i] ?? React.createRef());
    }, [tempSliderValue]);

    const handleKeyDown = (index) => (e) => {
      if (e.key === 'Enter') {
        if (index < tempSliderValue.length - 1) {
          inputRefs.current[index + 1]?.current?.focus();
        } else {
          handleSave(); // last input triggers apply
        }
      }
    };

    useEffect(() => {
      if (Array.isArray(sliderValue) && sliderValue.length === 2) {
        setTempSliderValue(sliderValue);
      }
    }, [sliderValue]);

    const handleInputChange = (index) => (event) => {
      const value = event.target.value === "" ? "" : Number(event.target.value);
      const updated = [...tempSliderValue];
      updated[index] = value;
      setTempSliderValue(updated);
      setIsShowBtn(updated[0] !== sliderValue[0] || updated[1] !== sliderValue[1]);
    };

    const handleSliderChange = (_, newValue) => {
      setTempSliderValue(newValue);
      setIsShowBtn(newValue[0] !== sliderValue[0] || newValue[1] !== sliderValue[1]);
    };

    const handleSave = () => {
      const [minDiaWt, maxDiaWt] = tempSliderValue;

      // Empty or undefined
      if (minDiaWt == null || maxDiaWt == null || minDiaWt === '' || maxDiaWt === '') {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Not a number
      if (isNaN(minDiaWt) || isNaN(maxDiaWt)) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Negative values
      if (minDiaWt < 0 || maxDiaWt < 0) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Equal values
      if (Number(minDiaWt) === Number(maxDiaWt)) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Min > Max
      if (Number(minDiaWt) > Number(maxDiaWt)) {
        toast.error("Please enter valid range values.", {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Below actual min
      if (minDiaWt < min) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Above actual max
      if (maxDiaWt > max) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      setSliderValue(tempSliderValue);
      setTempSliderValue(tempSliderValue);
      handleRangeFilterApi(tempSliderValue);
      setIsShowBtn(false);
      setAppliedRange1([min, max])
      setShow(true)
    };

    return (
      <div style={{ position: "relative" }}>

        {appliedRange1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4px",
              position: "absolute",
              top: "-12px",
              width: "100%",
            }}
          >
            <Typography variant="caption" color="text.secondary" fontSize="11px">
              {appliedRange1[0] !== "" ? `Min: ${appliedRange1[0]}` : ""}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontSize="11px">
              {appliedRange1[1] !== "" ? `Max: ${appliedRange1[1]}` : ""}
            </Typography>
          </div>
        )}

        <Slider
          value={tempSliderValue}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={0.001}
          disableSwap
          valueLabelDisplay="off"
          sx={{ marginTop: 1, transition: "all 0.2s ease-out" }}
        />

        <div style={{ display: "flex", gap: "10px", justifyContent: "space-around" }}>
          {tempSliderValue.map((val, index) => (
            <Input
              key={index}
              value={val}
              inputRef={inputRefs.current[index]}
              onKeyDown={handleKeyDown(index)}
              onChange={handleInputChange(index)}
              inputProps={{ step: 0.001, min, max, type: "number" }}
              sx={{ textAlign: "center" }}
            />
          ))}
        </div>

        <Stack direction="row" justifyContent="flex-end" gap={1} mt={1}>
          {show &&
            <Button variant="outlined" sx={{ paddingBottom: "0" }} onClick={() =>
              resetRangeFilter({
                filterName: "Diamond",
                setSliderValue: setSliderValue,
                setTempSliderValue,
                handleRangeFilterApi: handleRangeFilterApi,
                prodListType,
                cookie,
                setIsShowBtn,
                show: show,
                setShow: setShow,
                setAppliedRange: setAppliedRange1,
              })
            } color="error">
              Reset
            </Button>
          }
          {isShowBtn && (
            <Button variant="outlined" sx={{ paddingBottom: "0" }} onClick={handleSave} color="success">
              Apply
            </Button>
          )}
        </Stack>
      </div>
    );
  };

  const RangeFilterView1 = ({ ele, sliderValue1, setSliderValue1, handleRangeFilterApi1, prodListType, cookie, show1,
    setShow1, setAppliedRange2, appliedRange2 }) => {
    const parsedOptions = JSON.parse(ele?.options || "[]")?.[0] || {};
    const min = parsedOptions.Min || "";
    const max = parsedOptions.Max || "";
    const [tempSliderValue, setTempSliderValue] = useState(sliderValue1);
    const [isShowBtn, setIsShowBtn] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
      inputRefs.current = tempSliderValue.map((_, i) => inputRefs.current[i] ?? React.createRef());
    }, [tempSliderValue]);

    const handleKeyDown = (index) => (e) => {
      if (e.key === 'Enter') {
        if (index < tempSliderValue.length - 1) {
          inputRefs.current[index + 1]?.current?.focus();
        } else {
          handleSave(); // last input triggers apply
        }
      }
    };

    useEffect(() => {
      if (Array.isArray(sliderValue1) && sliderValue1.length === 2) {
        setTempSliderValue(sliderValue1);
      }
    }, [sliderValue1]);


    useEffect(() => {
      if (Array.isArray(sliderValue1) && sliderValue1.length === 2) {
        setTempSliderValue(sliderValue1);
      }
    }, [sliderValue1]);

    const handleInputChange = (index) => (event) => {
      const newValue = event.target.value === "" ? "" : Number(event.target.value);
      const updated = [...tempSliderValue];
      updated[index] = newValue;
      setTempSliderValue(updated);
      setIsShowBtn(updated[0] !== sliderValue1[0] || updated[1] !== sliderValue1[1]);
    };

    const handleSliderChange = (_, newValue) => {
      setTempSliderValue(newValue);
      setIsShowBtn(newValue[0] !== sliderValue1[0] || newValue[1] !== sliderValue1[1]);
    };

    const handleSave = () => {
      const [minNetWt, maxNetWt] = tempSliderValue;

      if (minNetWt == null || maxNetWt == null || minNetWt === '' || maxNetWt === '') {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      if (isNaN(minNetWt) || isNaN(maxNetWt)) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      if (minNetWt < 0 || maxNetWt < 0) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // 👇 New specific validation
      if (Number(minNetWt) === Number(maxNetWt)) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      if (Number(minNetWt) > Number(maxNetWt)) {
        toast.error("Please enter valid range values.", {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      if (minNetWt < min) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      if (maxNetWt > max) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      setSliderValue1(tempSliderValue);
      setTempSliderValue(tempSliderValue)
      handleRangeFilterApi1(tempSliderValue);
      setAppliedRange2([min, max])

      setIsShowBtn(false);
      setShow1(true)
    };

    return (
      <div style={{ position: "relative" }}>

        {appliedRange2 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", position: "absolute", top: '-12px', width: "100%" }}>
            <Typography variant="caption" color="text.secondary" fontSize="11px">
              {appliedRange2[0] !== "" ? `Min: ${appliedRange2[0]}` : ""}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontSize="11px">
              {appliedRange2[1] !== "" ? `Max: ${appliedRange2[1]}` : ""}
            </Typography>
          </div>
        )}

        <Slider
          value={tempSliderValue}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          min={min}
          max={max}
          step={0.001}
          disableSwap
          sx={{
            marginTop: "5px",
            transition: "all 0.2s ease-out",
            '& .MuiSlider-valueLabel': { display: 'none' },
          }}
        />
        <div style={{ display: "flex", gap: "10px", justifyContent: "space-around" }}>
          {tempSliderValue.map((val, index) => (
            <Input
              key={index}
              inputRef={inputRefs.current[index]}
              onKeyDown={handleKeyDown(index)}
              value={val}
              onChange={handleInputChange(index)}
              inputProps={{ step: 0.001, min, max, type: "number" }}
              sx={{ textAlign: "center" }}
            />
          ))}
        </div>
        <Stack flexDirection="row" justifyContent="flex-end" gap={1} mt={1}>
          {show1 &&
            <Button variant="outlined" sx={{ paddingBottom: "0" }} onClick={() =>
              resetRangeFilter({
                filterName: "NetWt",
                setSliderValue: setSliderValue1,
                setTempSliderValue,
                handleRangeFilterApi: handleRangeFilterApi1,
                prodListType,
                cookie,
                setIsShowBtn,
                show: show1,
                setShow: setShow1,
                setAppliedRange: setAppliedRange2,
              })
            } color="error">
              Reset
            </Button>
          }
          {isShowBtn && (
            <Button variant="outlined" sx={{ paddingBottom: "0" }} onClick={handleSave} color="success">
              Apply
            </Button>
          )}
        </Stack>
      </div>
    );
  };

  const RangeFilterView2 = ({ ele, sliderValue2, setSliderValue2, handleRangeFilterApi2, prodListType, cookie, show2, setShow2, setAppliedRange3, appliedRange3 }) => {
    const parsedOptions = JSON.parse(ele?.options || "[]")?.[0] || {};
    const min = parsedOptions.Min ?? "";
    const max = parsedOptions.Max ?? "";
    const [tempSliderValue, setTempSliderValue] = useState(sliderValue2);
    const [isShowBtn, setIsShowBtn] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
      inputRefs.current = tempSliderValue.map((_, i) => inputRefs.current[i] ?? React.createRef());
    }, [tempSliderValue]);

    const handleKeyDown = (index) => (e) => {
      if (e.key === 'Enter') {
        if (index < tempSliderValue.length - 1) {
          inputRefs.current[index + 1]?.current?.focus();
        } else {
          handleSave(); // last input triggers apply
        }
      }
    };

    useEffect(() => {
      if (Array.isArray(sliderValue2) && sliderValue2.length === 2) {
        setTempSliderValue(sliderValue2);
      }
    }, [sliderValue2]);


    const handleInputChange = (index) => (event) => {
      const newValue = event.target.value === "" ? "" : Number(event.target.value);
      const updated = [...tempSliderValue];
      updated[index] = newValue;
      setTempSliderValue(updated);
      setIsShowBtn(
        updated[0] !== sliderValue2[0] || updated[1] !== sliderValue2[1]
      );
    };

    const handleSliderChange = (_, newValue) => {
      setTempSliderValue(newValue);
      setIsShowBtn(
        newValue[0] !== sliderValue2[0] || newValue[1] !== sliderValue2[1]
      );
    };

    const handleSave = () => {
      const [minWeight, maxWeight] = tempSliderValue;

      // Validation: Empty or undefined
      if (minWeight == null || maxWeight == null || minWeight === '' || maxWeight === '') {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Validation: Not a number
      if (isNaN(minWeight) || isNaN(maxWeight)) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Validation: Negative values
      if (minWeight < 0 || maxWeight < 0) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // 👇 New specific validation
      if (Number(minWeight) === Number(maxWeight)) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Validation: Min > Max
      if (Number(minWeight) > Number(maxWeight)) {
        toast.error("Please enter valid range values.", {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Validation: Range must stay within allowed min and max
      if (minWeight < min) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      if (maxWeight > max) {
        toast.error('Please enter valid range values.', {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // If validation passes, update the parent state and handle the API call
      setSliderValue2(tempSliderValue);
      setTempSliderValue(tempSliderValue)
      handleRangeFilterApi2(tempSliderValue);
      setAppliedRange3([min, max]);
      setIsShowBtn(false);
      setShow2(true)
    };

    return (
      <div style={{ position: "relative" }}>

        {appliedRange3 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", position: "absolute", top: '-12px', width: "100%" }}>
            <Typography variant="caption" color="text.secondary" fontSize="11px">
              {appliedRange3[0] !== "" ? `Min: ${appliedRange3[0]}` : ""}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontSize="11px">
              {appliedRange3[1] !== "" ? `Max: ${appliedRange3[1]}` : ""}
            </Typography>
          </div>
        )}

        <Slider
          value={tempSliderValue}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          min={min}
          max={max}
          step={0.001}
          disableSwap
          sx={{
            marginTop: "5px",
            transition: "all 0.2s ease-out",
            '& .MuiSlider-valueLabel': { display: 'none' },
          }}
        />

        <div style={{ display: "flex", gap: "10px", justifyContent: "space-around" }}>
          {tempSliderValue.map((val, index) => (
            <Input
              key={index}
              inputRef={inputRefs.current[index]}
              value={val}
              onKeyDown={handleKeyDown(index)}
              onChange={handleInputChange(index)}
              inputProps={{ step: 0.001, type: "number" }}
              sx={{ textAlign: "center" }}
            />
          ))}
        </div>

        <Stack direction="row" justifyContent="flex-end" gap={1} mt={1}>
          {show2 &&
            <Button variant="outlined" sx={{ paddingBottom: "0" }} onClick={() =>
              resetRangeFilter({
                filterName: "Gross",
                setSliderValue: setSliderValue2,
                setTempSliderValue,
                handleRangeFilterApi: handleRangeFilterApi2,
                prodListType,
                cookie,
                setIsShowBtn,
                show: show2,
                setShow: setShow2,
                setAppliedRange: setAppliedRange3,
              })
            } color="error">
              Reset
            </Button>
          }
          {isShowBtn && (
            <Button variant="outlined" sx={{ paddingBottom: "0" }} onClick={handleSave} color="success">
              Apply
            </Button>
          )}
        </Stack>
      </div>
    );
  };

  const DynamicListPageTitleLineFunc = () => {
    if (location?.search.split("=")[0]?.slice(1) == "M") {
      return menuParams?.menuname;
    } else {
      return location?.pathname.split("/")[2];
    }
  };

  const BreadCumsObj = () => {
    let BreadCum = decodeURI(atob(location?.search.slice(3))).split("/");
    const values = BreadCum[0].split(",");
    const labels = BreadCum[1].split(",");

    const updatedBreadCum = labels.reduce((acc, label, index) => {
      acc[label] = values[index] || "";
      return acc;
    }, {});

    const result = Object.entries(updatedBreadCum).reduce(
      (acc, [key, value], index) => {
        acc[`FilterKey${index === 0 ? "" : index}`] =
          key.charAt(0).toUpperCase() + key.slice(1);
        acc[`FilterVal${index === 0 ? "" : index}`] = value;
        return acc;
      },
      {}
    );

    result.menuname = decodeURI(location?.pathname)
      .slice(3)
      .slice(0, -1)
      .split("/")[0];

    return result;
  };

  const showClearAllButton = () => {

    let diafilter =
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
        )[0]
        : [];
    let diafilter1 =
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
        )[0]
        : [];
    let diafilter2 =
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        ?.length > 0
        ? JSON.parse(
          filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
        )[0]
        : [];
    const isFilterChecked = Object.values(filterChecked).some((ele) => ele.checked);
    const isSliderChanged =
      JSON.stringify(sliderValue) !== JSON.stringify((diafilter?.Min != null || diafilter?.Max != null) ? [diafilter?.Min, diafilter?.Max] : []) ||
      JSON.stringify(sliderValue1) !== JSON.stringify((diafilter1?.Min != null || diafilter1?.Max != null) ? [diafilter1?.Min, diafilter1?.Max] : []) ||
      JSON.stringify(sliderValue2) !== JSON.stringify((diafilter2?.Min != null || diafilter2?.Max != null) ? [diafilter2?.Min, diafilter2?.Max] : []);

    return isFilterChecked || isSliderChanged;
  };


  return (
    <>
      <Helmet>
        <title>{decodeURI(DynamicListPageTitleLineFunc())}</title>
      </Helmet>
      <div id="top">
        <Drawer
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          className="smr_filterDrawer"
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "end",
              padding: "8px 8px 0px 0px",
            }}
          >
            <CloseIcon
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            />
          </div>

          {/* <div
            style={{
              marginLeft: "15px",
              marginBottom: "20px",
              display: "flex",
              gap: "5px",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                color: "#7f7d85",
                fontSize: "16px",
                fontFamily: "TT Commons Medium",
                marginTop: "12px",
              }}
            >
              Customization
            </Typography>
            {storeInit?.IsMetalCustComb === 1 && <div
            >
              <Typography
                className="label"
                sx={{
                  color: "#7f7d85",
                  fontSize: "14px",
                  fontFamily: "TT Commons Regular",
                }}
              >
                Metal:&nbsp;
              </Typography>
              <select
                style={{
                  border: "1px solid #e1e1e1",
                  borderRadius: "8px",
                  minWidth: "270px",
                }}
                className="select"
                value={selectedMetalId}
                onChange={(e) => {
                  setSelectedMetalId(e.target.value);
                }}
              >
                {metalTypeCombo?.map((metalele) => (
                  <option
                    className="option"
                    key={metalele?.Metalid}
                    value={metalele?.Metalid}
                  >
                    {metalele?.metaltype.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>}

            {storeInit?.IsDiamondCustComb === 1 && (
              <div
              >
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "TT Commons Regular",
                  }}
                >
                  Diamond:&nbsp;
                </Typography>
                <select
                  style={{
                    border: "1px solid #e1e1e1",
                    borderRadius: "8px",
                    minWidth: "270px",
                  }}
                  className="select"
                  value={selectedDiaId}
                  onChange={(e) => setSelectedDiaId(e.target.value)}
                >
                  {diaQcCombo?.map((diaQc) => (
                    <option
                      className="option"
                      key={diaQc?.QualityId}
                      value={`${diaQc?.QualityId},${diaQc?.ColorId}`}
                    >
                      {" "}
                      {`${diaQc.Quality.toUpperCase()},${diaQc.color.toLowerCase()}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {storeInit?.IsCsCustomization === 1 && (
              <div
              >
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "TT Commons Regular",
                  }}
                >
                  Color Stone:&nbsp;
                </Typography>
                <select
                  style={{
                    border: "1px solid #e1e1e1",
                    borderRadius: "8px",
                    minWidth: "270px",
                  }}
                  className="select"
                  value={selectedCsId}
                  onChange={(e) => setSelectedCsId(e.target.value)}
                >
                  {csQcCombo?.map((csCombo) => (
                    <option
                      className="option"
                      key={csCombo?.QualityId}
                      value={`${csCombo?.QualityId},${csCombo?.ColorId}`}
                    >
                      {" "}
                      {`${csCombo.Quality.toUpperCase()},${csCombo.color.toLowerCase()}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div
            >
              <div
              >
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "TT Commons Regular",
                  }}
                >
                  Sort By:&nbsp;
                </Typography>
                <select
                  style={{
                    border: "1px solid #e1e1e1",
                    borderRadius: "8px",
                    minWidth: "270px",
                  }}
                  className="select"
                  value={sortBySelect}
                  onChange={(e) => handleSortby(e)}
                >
                  <option className="option" value="Recommended">
                    Recommended
                  </option>
                  <option className="option" value="In Stock">
                    In stock
                  </option>
                  <option className="option" value="PRICE HIGH TO LOW">
                    Price High To Low
                  </option>
                  <option className="option" value="PRICE LOW TO HIGH">
                    Price Low To High
                  </option>
                </select>
              </div>
            </div>
          </div> */}
          <div className="smr_mobile_filter_portion">
            {filterData?.length > 0 && (
              <div className="smr_mobile_filter_portion_outter">
                <span className="smr_filter_text">
                  <span>
                    {
                      !showClearAllButton()
                        // Object.values(filterChecked).filter((ele) => ele.checked)
                        //   ?.length === 0 
                        ? (
                          "Filters"
                        ) : (
                          <>
                            {afterCountStatus == true ? (
                              <Skeleton
                                variant="rounded"
                                width={140}
                                height={22}
                                className="pSkelton"
                              />
                            ) : (
                              <span>{`Product Found: ${afterFilterCount}`}</span>
                            )}
                          </>
                        )}
                  </span>
                  <span style={{ cursor: "pointer" }} onClick={() => handelFilterClearAll()}>
                    {
                      showClearAllButton()
                        // Object.values(filterChecked).filter((ele) => ele.checked)
                        //   ?.length > 0 
                        ? (
                          "Clear All"
                        ) : (
                          <>
                            {afterCountStatus == true ? (
                              <Skeleton
                                variant="rounded"
                                width={140}
                                height={22}
                                className="pSkelton"
                              />
                            ) : (
                              <span>{`Total Products : ${afterFilterCount}`}</span>
                            )}
                          </>
                        )}
                  </span>
                </span>
                <div style={{ marginTop: "12px" }}>
                  {filterData?.map((ele) => (
                    <>
                      {!ele?.id?.includes("Range") &&
                        !ele?.id?.includes("Price") && (
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
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon sx={{ width: "20px" }} />
                              }
                              aria-controls="panel1-content"
                              id="panel1-header"
                              sx={{
                                color: "#7d7f85",
                                borderRadius: 0,

                                "&.MuiAccordionSummary-root": {
                                  padding: 0,
                                },
                              }}
                            >
                              {ele.Fil_DisName}
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                                minHeight: "fit-content",
                                maxHeight: "300px",
                                overflow: "auto",
                              }}
                            >
                              {(JSON.parse(ele?.options) ?? []).map((opt) => (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "12px",
                                  }}
                                  key={opt?.id}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name={`${ele?.id}${opt?.id}`}
                                        checked={
                                          filterChecked[`${ele?.id}${opt?.id}`]
                                            ?.checked === undefined
                                            ? false
                                            : filterChecked[
                                              `${ele?.id}${opt?.id}`
                                            ]?.checked
                                        }
                                        style={{
                                          color: "#7f7d85",
                                          padding: 0,
                                          width: "10px",
                                        }}
                                        onClick={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            ele?.id,
                                            opt?.Name
                                          )
                                        }
                                        size="small"
                                      />
                                    }
                                    className="smr_mui_checkbox_label"
                                    label={opt.Name}
                                  />
                                </div>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        )}
                      {storeInit?.IsPriceShow == 1 && ele?.id?.includes("Price") && (
                        <Accordion
                          elevation={0}
                          sx={{
                            borderBottom: "1px solid #c7c8c9",
                            borderRadius: 0,
                            "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                              borderBottomLeftRadius: "0px",
                              borderBottomRightRadius: "0px",
                            },
                            "&.MuiPaper-root.MuiAccordion-root:before": {
                              background: "none",
                            },
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ width: "20px" }} />
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                              color: "#7f7d85",
                              borderRadius: 0,

                              "&.MuiAccordionSummary-root": {
                                padding: 0,
                              },
                            }}
                            onClick={() => handleScrollHeight()}
                          >
                            {ele.Fil_DisName}
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              minHeight: "fit-content",
                              maxHeight: "300px",
                              overflow: "auto",
                            }}
                          >
                            {(JSON.parse(ele?.options) ?? []).map((opt, i) => (
                              <div
                                className="formcontroller_box"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "12px",
                                }}
                                key={i}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={`Price${i}${i}`}
                                      checked={
                                        filterChecked[`Price${i}${i}`]
                                          ?.checked === undefined
                                          ? false
                                          : filterChecked[`Price${i}${i}`]
                                            ?.checked
                                      }
                                      style={{
                                        color: "#7f7d85",
                                        padding: 0,
                                        width: "10px",
                                      }}
                                      sx={{
                                        color: "#7f7d85",
                                        padding: 0,
                                        width: "10px",
                                      }}
                                      onClick={(e) =>
                                        handleCheckboxChange(e, ele?.id, opt)
                                      }
                                      size="small"
                                    />
                                  }
                                  // .MuiFormControlLabel-root .MuiFormControlLabel-label

                                  className="smr_mui_checkbox_label smr_mui_label_price "
                                  sx={{ fontSize: "14px" }}
                                  label={
                                    <div style={{ fontSize: '0.6vw !important' }}>
                                      {
                                        opt?.Minval == 0
                                          ? `Under ${loginUserDetail?.CurrencyCode ??
                                          storeInit?.CurrencyCode
                                          } ${formatter.format(opt?.Maxval)}`
                                          : opt?.Maxval == 0
                                            ? `Over ${loginUserDetail?.CurrencyCode ??
                                            storeInit?.CurrencyCode
                                            }${formatter.format(opt?.Minval)}`
                                            : `${loginUserDetail?.CurrencyCode ??
                                            storeInit?.CurrencyCode
                                            } ${formatter.format(opt?.Minval)}
                                      - ${loginUserDetail?.CurrencyCode ??
                                            storeInit?.CurrencyCode
                                            } ${formatter.format(
                                              opt?.Maxval
                                            )}`
                                      }
                                    </div>
                                  }
                                />
                              </div>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                      )}
                      {ele?.Name?.includes("Diamond") && (
                        <Accordion
                          elevation={0}
                          sx={{
                            borderBottom: "1px solid #c7c8c9",
                            borderRadius: 0,
                            "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                              borderBottomLeftRadius: "0px",
                              borderBottomRightRadius: "0px",
                            },
                            "&.MuiPaper-root.MuiAccordion-root:before": {
                              background: "none",
                            },
                          }}
                        // expanded={accExpanded}
                        // defaultExpanded={}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ width: "20px" }} />
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                              color: "#7f7d85",
                              borderRadius: 0,

                              "&.MuiAccordionSummary-root": {
                                padding: 0,
                              },
                            }}
                            // className="filtercategoryLable"
                            onClick={() => handleScrollHeight()}
                          >
                            {/* <span> */}
                            {ele.Fil_DisName}
                            {/* </span> */}
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              minHeight: "fit-content",
                              maxHeight: "300px",
                              overflow: "auto",
                            }}
                          >
                            {/* {console.log("RangeEle",JSON?.parse(ele?.options)[0])} */}
                            <Box sx={{ width: "94%", height: 88 }}>
                              {/* {RangeFilterView(ele)} */}
                              <RangeFilterView ele={ele} sliderValue={sliderValue} setSliderValue={setSliderValue} handleRangeFilterApi={handleRangeFilterApi} prodListType={prodListType} cookie={cookie} show={show} setShow={setShow} appliedRange1={appliedRange1} setAppliedRange1={setAppliedRange1} />
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      )}
                      {ele?.Name?.includes("NetWt") && (
                        <Accordion
                          elevation={0}
                          sx={{
                            borderBottom: "1px solid #c7c8c9",
                            borderRadius: 0,
                            "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                              borderBottomLeftRadius: "0px",
                              borderBottomRightRadius: "0px",
                            },
                            "&.MuiPaper-root.MuiAccordion-root:before": {
                              background: "none",
                            },
                          }}
                        // expanded={accExpanded}
                        // defaultExpanded={}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ width: "20px" }} />
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                              color: "#7f7d85",
                              borderRadius: 0,

                              "&.MuiAccordionSummary-root": {
                                padding: 0,
                              },
                            }}
                            // className="filtercategoryLable"
                            onClick={() => handleScrollHeight()}
                          >
                            {/* <span> */}
                            {ele.Fil_DisName}
                            {/* </span> */}
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              minHeight: "fit-content",
                              maxHeight: "300px",
                              overflow: "auto",
                            }}
                          >
                            {/* {console.log("RangeEle",JSON?.parse(ele?.options)[0])} */}
                            <Box sx={{ width: "94%", height: 88 }}>
                              {/* {RangeFilterView1(ele)} */}
                              <RangeFilterView1 ele={ele} sliderValue1={sliderValue1} setSliderValue1={setSliderValue1} handleRangeFilterApi1={handleRangeFilterApi1} prodListType={prodListType} cookie={cookie} show1={show1} setShow1={setShow1} appliedRange2={appliedRange2} setAppliedRange2={setAppliedRange2} />
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      )}
                      {ele?.Name?.includes("Gross") && (
                        <Accordion
                          elevation={0}
                          sx={{
                            borderBottom: "1px solid #c7c8c9",
                            borderRadius: 0,
                            "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                              borderBottomLeftRadius: "0px",
                              borderBottomRightRadius: "0px",
                            },
                            "&.MuiPaper-root.MuiAccordion-root:before": {
                              background: "none",
                            },
                          }}
                        // expanded={accExpanded}
                        // defaultExpanded={}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ width: "20px" }} />
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                              color: "#7f7d85",
                              borderRadius: 0,

                              "&.MuiAccordionSummary-root": {
                                padding: 0,
                              },
                            }}
                            // className="filtercategoryLable"
                            onClick={() => handleScrollHeight()}
                          >
                            {/* <span> */}
                            {ele.Fil_DisName}
                            {/* </span> */}
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              minHeight: "fit-content",
                              maxHeight: "300px",
                              overflow: "auto",
                            }}
                          >
                            <Box sx={{ width: "94%", height: 88 }}>
                              {/* {RangeFilterView2(ele)} */}
                              <RangeFilterView2 ele={ele} sliderValue2={sliderValue2} setSliderValue2={setSliderValue2} handleRangeFilterApi2={handleRangeFilterApi2} prodListType={prodListType} cookie={cookie} show2={show2} setShow2={setShow2} appliedRange3={appliedRange3} setAppliedRange3={setAppliedRange3} />
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Drawer>
        <div className="proCat_bodyContain">
          <div className="proCat_outerContain">
            <div className="proCat_whiteInnerContain">
              {isProdLoading ? (
                <ProductListSkeleton className="pSkelton" />
              ) : (
                <>
                  {!minwidth1201px ? (
                    <div className="proCat_mobile_prodSorting">
                      <div className="proCat_empty_sorting_div">
                        <IoArrowBack
                          style={{
                            height: "25px",
                            width: "25px",
                            cursor: "pointer",
                            color: "rgba(143, 140, 139, 0.9019607843)",
                          }}
                          onClick={() => navigate(-1)}
                        />
                      </div>

                      {filterData?.length != 0 && <div className="smr_mobile_prodSorting">
                        <Checkbox
                          sx={{ padding: "0px 9px 0px 9px" }}
                          icon={<FilterAltIcon fontSize="large" />}
                          checkedIcon={
                            <FilterAltOffIcon
                              fontSize="large"
                              style={{ color: "#666666" }}
                            />
                          }
                          checked={isDrawerOpen}
                          onChange={(e) => setIsDrawerOpen(e.target.value)}
                        />
                      </div>}
                    </div>
                  ) : null}

                  <div className="smr_mainPortion">
                    {filterData?.length > 0 && (
                      <div
                        className="proCat_filter_portion"
                        style={{ marginTop: "20px" }}
                      >
                        <div
                          className="proCat_topTitleList"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div className="proCat_mpty_sorting_div">
                            <IoArrowBack
                              style={{
                                height: "25px",
                                width: "25px",
                                cursor: "pointer",
                                color: "rgba(143, 140, 139, 0.9019607843)",
                              }}
                              onClick={() => navigate("/")}
                            />
                          </div>
                          <p className="proCat_NameTopShow">
                            {decodeURIComponent(
                              location.pathname?.split("/p/")[1].split("/")[0]
                            )}
                          </p>
                        </div>
                        {filterData?.length > 0 && (
                          <div className="proCat_filter_portion_outter">
                            <span className="smr_filter_text">
                              <span>
                                {
                                  // Object.values(filterChecked).filter(
                                  //   (ele) => ele.checked
                                  // )?.length === 0
                                  !showClearAllButton()
                                    ? (
                                      "Filters"
                                    ) : (
                                      // ? <span style={{display:'flex',justifyContent:'space-between'}}><span>{"Filters"}</span> <span>{`Total Products : ${afterFilterCount}`}</span></span>
                                      <>
                                        {afterCountStatus == true ? (
                                          <Skeleton
                                            variant="rounded"
                                            width={140}
                                            height={22}
                                            className="pSkelton"
                                          />
                                        ) : (
                                          <span>{`Product Found: ${afterFilterCount}`}</span>
                                        )}
                                      </>
                                    )}
                              </span>
                              <span style={{ cursor: "pointer" }} onClick={() => handelFilterClearAll()}>
                                {
                                  showClearAllButton()
                                    // Object.values(filterChecked).filter(
                                    //   (ele) => ele.checked
                                    // )?.length > 0 
                                    ? (
                                      "Clear All"
                                    ) : (
                                      <>
                                        {afterCountStatus == true ? (
                                          <Skeleton
                                            variant="rounded"
                                            width={140}
                                            height={22}
                                            className="pSkelton"
                                          />
                                        ) : (
                                          <span>{`Total Products : ${afterFilterCount}`}</span>
                                        )}
                                      </>
                                    )}
                              </span>
                            </span>
                            <div style={{ marginTop: "12px" }}>
                              {filterData?.map((ele) => (
                                <>
                                  {!ele?.id?.includes("Range") &&
                                    !ele?.id?.includes("Price") && (
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
                                      // expanded={accExpanded}
                                      // defaultExpanded={}
                                      >
                                        <AccordionSummary
                                          expandIcon={
                                            <ExpandMoreIcon
                                              sx={{ width: "20px" }}
                                            />
                                          }
                                          aria-controls="panel1-content"
                                          id="panel1-header"
                                          sx={{
                                            color: "#7d7f85",
                                            borderRadius: 0,

                                            "&.MuiAccordionSummary-root": {
                                              padding: 0,
                                            },
                                          }}
                                          // className="filtercategoryLable"
                                          onClick={() => handleScrollHeight()}
                                        >
                                          {/* <span> */}
                                          {ele.Fil_DisName}
                                          {/* </span> */}
                                        </AccordionSummary>
                                        <AccordionDetails
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                            minHeight: "fit-content",
                                            maxHeight: "300px",
                                            overflow: "auto",
                                          }}
                                        >
                                          {(JSON.parse(ele?.options) ?? []).map(
                                            (opt) => (
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent:
                                                    "space-between",
                                                  gap: "12px",
                                                }}
                                                key={opt?.id}
                                              >
                                                {/* <small
                                        style={{
                                          fontFamily: "TT Commons, sans-serif",
                                          color: "#7f7d85",
                                        }}
                                      >
                                        {opt.Name}
                                      </small> */}
                                                <FormControlLabel
                                                  control={
                                                    <Checkbox
                                                      name={`${ele?.id}${opt?.id}`}
                                                      // checked={
                                                      //   filterChecked[`checkbox${index + 1}${i + 1}`]
                                                      //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
                                                      //     : false
                                                      // }
                                                      checked={
                                                        filterChecked[
                                                          `${ele?.id}${opt?.id}`
                                                        ]?.checked === undefined
                                                          ? false
                                                          : filterChecked[
                                                            `${ele?.id}${opt?.id}`
                                                          ]?.checked
                                                      }
                                                      style={{
                                                        color:
                                                          "#7f7d85 !important",
                                                        padding: 0,
                                                        width: "10px",
                                                      }}
                                                      onClick={(e) =>
                                                        handleCheckboxChange(
                                                          e,
                                                          ele?.id,
                                                          opt?.Name
                                                        )
                                                      }
                                                      size="small"
                                                    />
                                                  }
                                                  // sx={{
                                                  //   display: "flex",
                                                  //   justifyContent: "space-between", // Adjust spacing between checkbox and label
                                                  //   width: "100%",
                                                  //   flexDirection: "row-reverse", // Align items to the right
                                                  //   fontFamily:'TT Commons Regular'
                                                  // }}
                                                  className="smr_mui_checkbox_label"
                                                  label={
                                                    <span style={{ fontSize: '15px' }}>
                                                      {opt.Name}
                                                    </span>
                                                  }
                                                />
                                              </div>
                                            )
                                          )}
                                        </AccordionDetails>
                                      </Accordion>
                                    )}
                                  {storeInit?.IsPriceShow == 1 && ele?.id?.includes("Price") && (
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
                                    // expanded={accExpanded}
                                    // defaultExpanded={}
                                    >
                                      <AccordionSummary
                                        expandIcon={
                                          <ExpandMoreIcon
                                            sx={{ width: "20px" }}
                                          />
                                        }
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{
                                          color: "#7f7d85",
                                          borderRadius: 0,

                                          "&.MuiAccordionSummary-root": {
                                            padding: 0,
                                          },
                                        }}
                                        // className="filtercategoryLable"
                                        onClick={() => handleScrollHeight()}
                                      >
                                        {/* <span> */}
                                        {ele.Fil_DisName}
                                        {/* </span> */}
                                      </AccordionSummary>
                                      <AccordionDetails
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          minHeight: "fit-content",
                                          maxHeight: "300px",
                                          overflow: "auto",
                                        }}
                                      >
                                        {(JSON.parse(ele?.options) ?? []).map(
                                          (opt, i) => (
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                gap: "12px",
                                              }}
                                              key={i}
                                            >
                                              {/* <small
                                        style={{
                                          fontFamily: "TT Commons, sans-serif",
                                          color: "#7f7d85",
                                        }}
                                      >
                                        {opt.Name}
                                      </small> */}
                                              <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    name={`Price${i}${i}`}
                                                    // checked={
                                                    //   filterChecked[`checkbox${index + 1}${i + 1}`]
                                                    //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
                                                    //     : false
                                                    // }
                                                    checked={
                                                      filterChecked[
                                                        `Price${i}${i}`
                                                      ]?.checked === undefined
                                                        ? false
                                                        : filterChecked[
                                                          `Price${i}${i}`
                                                        ]?.checked
                                                    }
                                                    style={{
                                                      color: "#7f7d85",
                                                      padding: 0,
                                                      width: "10px",
                                                    }}
                                                    onClick={(e) =>
                                                      handleCheckboxChange(
                                                        e,
                                                        ele?.id,
                                                        opt
                                                      )
                                                    }
                                                    size="small"
                                                  />
                                                }
                                                // sx={{
                                                //   display: "flex",
                                                //   justifyContent: "space-between", // Adjust spacing between checkbox and label
                                                //   width: "100%",
                                                //   flexDirection: "row-reverse", // Align items to the right
                                                //   fontFamily:'TT Commons Regular'
                                                // }}
                                                className="pro_mui_checkbox_label"
                                                label={
                                                  <span style={{ fontSize: '13px' }}>
                                                    {opt?.Minval == 0
                                                      ? `Under ${loginUserDetail?.CurrencyCode ??
                                                      storeInit?.CurrencyCode
                                                      } ${opt?.Maxval}`
                                                      : opt?.Maxval == 0
                                                        ? `Over ${loginUserDetail?.CurrencyCode ??
                                                        storeInit?.CurrencyCode
                                                        } ${opt?.Minval}`
                                                        : `${loginUserDetail?.CurrencyCode ??
                                                        storeInit?.CurrencyCode
                                                        } ${opt?.Minval} 
                                                    - ${loginUserDetail?.CurrencyCode ??
                                                        storeInit?.CurrencyCode
                                                        } ${opt?.Maxval}`}
                                                  </span>
                                                }
                                                sx={{
                                                  fontSize: '14px',  // This applies the font size to the label
                                                }}

                                              />
                                            </div>
                                          )
                                        )}
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                  {ele?.Name?.includes("Diamond") && (
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
                                    // expanded={accExpanded}
                                    // defaultExpanded={}
                                    >
                                      <AccordionSummary
                                        expandIcon={
                                          <ExpandMoreIcon
                                            sx={{ width: "20px" }}
                                          />
                                        }
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{
                                          color: "#7f7d85",
                                          borderRadius: 0,

                                          "&.MuiAccordionSummary-root": {
                                            padding: 0,
                                          },
                                        }}
                                      // className="filtercategoryLable"
                                      >
                                        {/* <span> */}
                                        {ele.Fil_DisName}
                                        {/* </span> */}
                                      </AccordionSummary>
                                      <AccordionDetails
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          minHeight: "fit-content",
                                          maxHeight: "300px",
                                          overflow: "auto",
                                        }}
                                      >
                                        {/* {console.log("RangeEle",JSON?.parse(ele?.options)[0])} */}
                                        <Box sx={SharedStyleForRange}>
                                          {/* {RangeFilterView(ele)} */}
                                          <RangeFilterView ele={ele} sliderValue={sliderValue} setSliderValue={setSliderValue} handleRangeFilterApi={handleRangeFilterApi} prodListType={prodListType} cookie={cookie} show={show} setShow={setShow} appliedRange1={appliedRange1} setAppliedRange1={setAppliedRange1} />
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                  {ele?.Name?.includes("NetWt") && (
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
                                    // expanded={accExpanded}
                                    // defaultExpanded={}
                                    >
                                      <AccordionSummary
                                        expandIcon={
                                          <ExpandMoreIcon
                                            sx={{ width: "20px" }}
                                          />
                                        }
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{
                                          color: "#7f7d85",
                                          borderRadius: 0,

                                          "&.MuiAccordionSummary-root": {
                                            padding: 0,
                                          },
                                        }}
                                        // className="filtercategoryLable"
                                        onClick={() => handleScrollHeight()}
                                      >
                                        {/* <span> */}
                                        {ele.Fil_DisName}
                                        {/* </span> */}
                                      </AccordionSummary>
                                      <AccordionDetails
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          minHeight: "fit-content",
                                          maxHeight: "300px",
                                          overflow: "auto",
                                        }}
                                      >
                                        <Box sx={SharedStyleForRange}>
                                          {/* {RangeFilterView1(ele)} */}
                                          <RangeFilterView1 ele={ele} sliderValue1={sliderValue1} setSliderValue1={setSliderValue1} handleRangeFilterApi1={handleRangeFilterApi1} prodListType={prodListType} cookie={cookie} show1={show1} setShow1={setShow1} appliedRange2={appliedRange2} setAppliedRange2={setAppliedRange2} />
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                  {ele?.Name?.includes("Gross") && (
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
                                    // expanded={accExpanded}
                                    // defaultExpanded={}
                                    >
                                      <AccordionSummary
                                        expandIcon={
                                          <ExpandMoreIcon
                                            sx={{ width: "20px" }}
                                          />
                                        }
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{
                                          color: "#7f7d85",
                                          borderRadius: 0,

                                          "&.MuiAccordionSummary-root": {
                                            padding: 0,
                                          },
                                        }}
                                        // className="filtercategoryLable"
                                        onClick={() => handleScrollHeight()}
                                      >
                                        {/* <span> */}
                                        {ele.Fil_DisName}
                                        {/* </span> */}
                                      </AccordionSummary>
                                      <AccordionDetails
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          minHeight: "fit-content",
                                          maxHeight: "300px",
                                          overflow: "auto",
                                        }}
                                      >
                                        <Box sx={SharedStyleForRange}>
                                          {/* {RangeFilterView2(ele)} */}
                                          <RangeFilterView2 ele={ele} sliderValue2={sliderValue2} setSliderValue2={setSliderValue2} handleRangeFilterApi2={handleRangeFilterApi2} prodListType={prodListType} cookie={cookie} show2={show2} setShow2={setShow2} appliedRange3={appliedRange3} setAppliedRange3={setAppliedRange3} />
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                </>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {filterProdListEmpty ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "75%",
                          alignItems: "center",
                          height: "500px",
                        }}
                      >
                        <span className="smr_prod_datanotfound">
                          Products Not found !!!
                        </span>
                      </div>
                    ) : (
                      // <div className="smr_productList" style={{ width: filterData?.length <= 0 && '100%', margin: filterData?.length <= 0 && '20px 50px 0px 65px' }}>
                      <div className={filterData?.length == 0 ? "procat_productList_Nodata" : "procat_productList"}>
                        {isOnlyProdLoading ? (
                          <ProductListSkeleton
                            fromPage={"Prodlist"}
                            className="pSkelton"
                          />
                        ) : (
                          <>
                            {filterData?.length == 0 && (
                              <div className="proCat_main_sorting_div_proCat">
                                <div
                                  className="proCat_topTitleList"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <div className="proCat_mpty_sorting_div_NoData">
                                    <IoArrowBack
                                      style={{
                                        height: "25px",
                                        width: "25px",
                                        cursor: "pointer",
                                        color:
                                          "rgba(143, 140, 139, 0.9019607843)",
                                      }}
                                      onClick={() => navigate("/")}
                                    />
                                  </div>
                                  <p className="proCat_NameTopShow">
                                    {/* {decodeURI(extractedPart)} */}
                                    {decodeURIComponent(
                                      location.pathname
                                        ?.split("/p/")[1]
                                        .split("/")[0]
                                    )}
                                  </p>
                                </div>
                                <div
                                  className="proCat_topTitleList_mobile"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: "0px",
                                      width: "100%",
                                      fontWeight: 600,
                                      color:
                                        "rgba(143, 140, 139, 0.9019607843)",
                                    }}
                                  >
                                    {/* {decodeURI(extractedPart)} */}
                                    {decodeURIComponent(
                                      location.pathname
                                        ?.split("/p/")[1]
                                        .split("/")[0]
                                    )}
                                  </p>
                                </div>
                                <div
                                  className={
                                    filterData?.length <= 0
                                      ? "smr_sorting_custom_NoData"
                                      : "smr_sorting_custom"
                                  }
                                >
                                  <div
                                    className={
                                      filterData?.length <= 0
                                        ? "NoDatacontainer"
                                        : "container"
                                    }
                                  >
                                    <label className="label">
                                      Sort By:&nbsp;
                                    </label>
                                    <select
                                      className="select"
                                      value={sortBySelect}
                                      onChange={(e) => handleSortby(e)}
                                    >
                                      <option
                                        className="option"
                                        value="Recommended"
                                      >
                                        Recommended
                                      </option>
                                      {/* <option className="option" value="New">
                                      New
                                    </option>
                                    <option className="option" value="Trending">
                                      Trending
                                    </option> */}
                                      {storeInit?.IsStockWebsite == 1 && (
                                        <option
                                          className="option"
                                          value="In Stock"
                                        >
                                          In stock
                                        </option>
                                      )}
                                      {/* {storeInit?.IsStockWebsite == 1 && ( */}
                                      {/* <option
                                        className="option"
                                        value="In memo"
                                      >
                                        In memo
                                      </option> */}
                                      {/* for all not needed removed by priyank bhai */}
                                      {/* <option className="option" value="Bestseller">
                                        Bestseller
                                      </option> */}
                                      {/* )} */}
                                      <option
                                        className="option"
                                        value="PRICE HIGH TO LOW"
                                      >
                                        Price High To Low
                                      </option>
                                      <option
                                        className="option"
                                        value="PRICE LOW TO HIGH"
                                      >
                                        Price Low To High
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}

                            {filterData?.length != 0 && (
                              <div className="proCat_main_sorting_div_proCat_noLength">
                                <div
                                  className="proCat_topTitleList_mobile"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: "0px",
                                      width: "100%",
                                      fontWeight: 600,
                                      color:
                                        "rgba(143, 140, 139, 0.9019607843)",
                                    }}
                                  >
                                    {/* {decodeURI(extractedPart)} */}
                                    {decodeURIComponent(
                                      location.pathname
                                        ?.split("/p/")[1]
                                        .split("/")[0]
                                    )}
                                  </p>
                                </div>
                                <div
                                  className={
                                    filterData?.length <= 0
                                      ? "smr_sorting_custom_NoData"
                                      : "smr_sorting_custom"
                                  }
                                >
                                  <div
                                    className={
                                      filterData?.length <= 0
                                        ? "NoDatacontainer"
                                        : "container"
                                    }
                                  >
                                    <label className="label">
                                      Sort By:&nbsp;
                                    </label>
                                    <select
                                      className="select"
                                      value={sortBySelect}
                                      onChange={(e) => handleSortby(e)}
                                    >
                                      <option
                                        className="option"
                                        value="Recommended"
                                      >
                                        Recommended
                                      </option>
                                      {/* <option className="option" value="New">
                                      New
                                    </option>
                                    <option className="option" value="Trending">
                                      Trending
                                    </option> */}
                                      {storeInit?.IsStockWebsite == 1 && (
                                        <option
                                          className="option"
                                          value="In Stock"
                                        >
                                          In stock
                                        </option>
                                      )}
                                      {/* {storeInit?.IsStockWebsite == 1 && ( */}
                                      {/* <option
                                        className="option"
                                        value="In memo"
                                      >
                                        In memo
                                      </option> */}
                                      {/* <option className="option" value="Bestseller">
                                        Bestseller
                                      </option> */}
                                      {/* )} */}
                                      <option
                                        className="option"
                                        value="PRICE HIGH TO LOW"
                                      >
                                        Price High To Low
                                      </option>
                                      <option
                                        className="option"
                                        value="PRICE LOW TO HIGH"
                                      >
                                        Price Low To High
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div
                              className="smr_outer_portion"
                              id="smr_outer_portion"
                            >
                              <div className="smr_inner_portion">
                                {finalProductListData?.map((productData, i) => {
                                  return (
                                    <Product_Card
                                      productData={productData}
                                      setIsRollOverVideo={setIsRollOverVideo}
                                      handleImgRollover={handleImgRollover}
                                      handleMoveToDetail={handleMoveToDetail}
                                      i={i}
                                      videoUrl={getDynamicVideo(productData.designno, productData.VideoCount, productData.VideoExtension)}
                                      RollImageUrl={getDynamicRollImages(productData.designno, productData.ImageCount, productData.ImageExtension)}
                                      imageUrl={getDynamicImages(productData.designno, productData.ImageExtension)}
                                      handleLeaveImgRolloverImg={handleLeaveImgRolloverImg}
                                      isRollOverVideo={isRollOverVideo}
                                      storeInit={storeInit}
                                      rollOverImgPd={rollOverImgPd}
                                      loginUserDetail={loginUserDetail}
                                      formatter={formatter}
                                      handleCartandWish={handleCartandWish}
                                      cartArr={cartArr}

                                    />
                                  )
                                })}
                              </div>
                            </div>
                            {isEditablePage === 1 ? (
                              <>
                                {storeInit?.IsProductListPagination == 1 &&
                                  Math.ceil(
                                    afterFilterCount / storeInit.PageSize
                                  ) > 1 &&
                                  <EditablePagination
                                    currentPage={currPage}
                                    totalItems={afterFilterCount}
                                    itemsPerPage={storeInit.PageSize}
                                    onPageChange={handelPageChange}
                                    inputPage={inputPage}
                                    setInputPage={setInputPage}
                                    handlePageInputChange={handlePageInputChange}
                                    maxwidth464px={maxwidth464px}
                                    totalPages={totalPages}
                                    currPage={currPage}
                                    isShowButton={false}
                                  />
                                }
                              </>
                            ) : (
                              <>
                                {storeInit?.IsProductListPagination == 1 &&
                                  Math.ceil(afterFilterCount / storeInit.PageSize)
                                  > 1 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "5%",
                                        width: '100%'
                                      }}
                                      className="smr_pagination_portion"
                                    >
                                      <Pagination
                                        count={Math.ceil(afterFilterCount / storeInit.PageSize)}
                                        size={maxwidth464px ? "small" : "large"}
                                        shape="circular"
                                        onChange={handelPageChange}
                                        page={currPage}
                                        showFirstButton
                                        showLastButton
                                        disabled={false}
                                        renderItem={(item) => (
                                          <PaginationItem
                                            {...item}
                                            sx={{
                                              pointerEvents: item.page === currPage ? 'none' : 'auto',
                                            }}
                                          />
                                        )}
                                      />
                                    </div>
                                  )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* <div className="smr_backtotop">
              BACK TO TOP
        </div> */}
        </div>
      </div>
    </>
  );
};

export default memo(ProductList);

const Product_Card = ({
  productData,
  setIsRollOverVideo,
  handleImgRollover,
  handleMoveToDetail,
  i,
  videoUrl,
  RollImageUrl,
  imageUrl,
  handleLeaveImgRolloverImg,
  isRollOverVideo,
  storeInit,
  rollOverImgPd,
  loginUserDetail,
  formatter,
  handleCartandWish,
  cartArr,
}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const delay = (i + 1) * 150;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [i]);
  return (
    <div className="procat_productCard" >
      {isLoading ? (
        <CardMedia style={{ width: "100%" }} className="cardMainSkeleton">
          <Skeleton
            animation="wave"
            variant="rect"
            width={"100%"}
            height="260px"
            sx={{
              '@media (max-width: 1750px)': {
                height: "250px !important",
              },
              '@media (max-width: 1700px)': {
                height: "280px !important",
              },
              '@media (max-width: 1500px)': {
                height: "230px",
              },
              '@media (max-width: 1350px)': {
                height: "210px",
              },
              '@media (max-width: 1200px)': {
                height: "270px",
              },
              '@media (max-width: 1100px)': {
                height: "250px",
              },
              '@media (max-width: 1040px)': {
                height: "270px",
              },
              '@media (max-width: 600px)': {
                height: "250px",
              },
              '@media (max-width: 600px)': {
                height: "500px",
              },
            }}
            style={{ backgroundColor: "#e8e8e86e" }}
          />
        </CardMedia>
      ) : (
        <div
          onClick={() =>
            handleMoveToDetail(productData, i)
          }
          onMouseMove={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="roop_ImgandVideoContainer"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {isLoading ? (
            <CardMedia
              style={{ width: '100%', height: '100%' }}
              className="proCat_productCard_cardMainSkeleton"
            >
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="100%"
                style={{ backgroundColor: '#e8e8e86e' }}
              />
            </CardMedia>
          ) : (
            <>
              {/* Hover Content (Video or RollImage) */}
              <div style={{ display: isHover ? "block" : "none" }}>
                {videoUrl !== undefined ? (
                  <video
                    className="proCat_productCard_video"
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={(e) => {
                      e.target.poster = imageNotFound;
                    }}
                  />
                ) : (videoUrl === undefined && RollImageUrl !== undefined) ? (
                  <img
                    className="proCat_productListCard_Image"
                    src={RollImageUrl}
                    onError={(e) => {
                      if (productData?.ImageCount > 0) {
                        e.target.src = RollImageUrl;
                      }
                      e.target.src = imageNotFound;
                    }}
                  />
                ) : null}
              </div>

              {/* Default Image */}
              <img
                className="proCat_productListCard_Image"
                src={imageUrl}
                onError={(e) => {
                  e.target.onerror = null;
                  e.stopPropagation();
                  e.target.src = imageNotFound;
                }}
                style={{
                  display: isHover && (RollImageUrl || videoUrl) ? "none" : "block",
                  opacity: isHover && (RollImageUrl || videoUrl) ? "0" : "1",
                  transition: '0s ease-in-out',
                }}
              />
            </>
          )}
        </div>
      )}

      <div className="proCat_app_product_label">
        {productData?.StatusId == 1 ? (
          <span className="proCat_app_instock">
            In Stock
          </span>
        ) : productData?.StatusId == 2 ? (
          <span className="proCat_app_MEMO">
            In memo
          </span>
        ) : (
          <span className="proCat_app_Make_to_order">
            Make To Order
          </span>
        )}
      </div>


      <div className="proCat_prod_card_info">
        <span className="proCat1_prod_title_with_no_width">
          {productData?.designno} {formatTitleLine(productData?.TitleLine) && " - " + productData?.TitleLine}
        </span>
        <p
          className="proCatPriceMobile"
          style={{
            display: "flex",
            margin: "0px",
          }}
        >
          {productData?.Gwt &&
            `GWT - ${productData?.Gwt} / `}
          {storeInit?.IsPriceShow == 1 && (
            <span className="proCat_price">
              <span className="smr_currencyFont">
                {(loginUserDetail?.CurrencyCode ??
                  storeInit?.CurrencyCode) + " "}
                {formatter.format(
                  productData?.UnitCostWithMarkUp
                )}
              </span>
            </span>
          )}
        </p>
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
              // <LocalMallIcon
              //   sx={{
              //     fontSize: "22px",
              //     color: "red",
              //   }}
              // />
            }
            disableRipple={false}
            onChange={(e) =>
              handleCartandWish(
                e,
                productData,
                "Cart"
              )
            }
            checked={
              cartArr[productData?.autocode] ??
                productData?.IsInCart === 1
                ? true
                : false
            }
          />
        }
        label={
          !(cartArr[productData?.autocode] ??
            productData?.IsInCart === 1
            ? true
            : false) ? (
            <span className="btnColorProCatProduct">
              Add To Cart
            </span>
          ) : (
            <span className="btnColorProCatProductRemoveCart">
              Remove From Cart
            </span>
          )
        }
        // sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#474747d1',marginLeft:'0px',color:'white'}}
        className={
          !(cartArr[productData?.autocode] ??
            productData?.IsInCart === 1
            ? true
            : false)
            ? "procat_cart_btn btnColorProCatProduct"
            : "procat_cart_btn_alter btnColorProCatProductRemoveCart"
        }
      />
    </div>
  )
}

// import React, { useEffect, useState } from "react";
// import "./productlist.scss";
// import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
// import { useLocation, useNavigate } from "react-router-dom";
// import imageNotFound from "../../../Assets/image-not-found.jpg";
// import {
//   findMetalColor,
//   findMetalType,
// } from "../../../../../../utils/Glob_Functions/GlobalFunction";
// import ProductListSkeleton from "./productlist_skeleton/ProductListSkeleton";
// import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Box,
//   Button,
//   Checkbox,
//   Drawer,
//   FormControlLabel,
//   Input,
//   Pagination,
//   Skeleton,
//   Slider,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
// import LocalMallIcon from "@mui/icons-material/LocalMall";
// import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
// import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import {
//   proCat_CartCount,
//   proCat_DiamondRangeArr,
//   proCat_WishCount,
//   soketProductData,
// } from "../../../Recoil/atom";
// import pako from "pako";
// import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
// import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
// import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
// import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
// import CloseIcon from "@mui/icons-material/Close";
// import Cookies from "js-cookie";
// import { Helmet } from "react-helmet";
// import { IoArrowBack } from "react-icons/io5";

// const ProductList = () => {
//   const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));

//   useEffect(() => {
//     let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
//     setStoreInit(storeinit);

//     let mtCombo = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
//     setMetalTypeCombo(mtCombo);

//     let diaQcCombo = JSON.parse(
//       sessionStorage.getItem("diamondQualityColorCombo")
//     );
//     setDiaQcCombo(diaQcCombo);

//     let CsQcCombo = JSON.parse(
//       sessionStorage.getItem("ColorStoneQualityColorCombo")
//     );
//     setCsQcCombo(CsQcCombo);
//   }, []);

//   let location = useLocation();
//   let navigate = useNavigate();
//   let minwidth1201px = useMediaQuery("(min-width:1201px)");
//   let maxwidth1674px = useMediaQuery("(max-width:1674px)");
//   let maxwidth590px = useMediaQuery("(max-width:590px)");
//   let maxwidth464px = useMediaQuery("(max-width:464px)");

//   const [productListData, setProductListData] = useState([]);
//   const [priceListData, setPriceListData] = useState([]);
//   const [finalProductListData, setFinalProductListData] = useState([]);
//   const [isProdLoading, setIsProdLoading] = useState(true);
//   const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
//   const [storeInit, setStoreInit] = useState({});
//   const [filterData, setFilterData] = useState([]);
//   const [filterChecked, setFilterChecked] = useState({});
//   const [afterFilterCount, setAfterFilterCount] = useState();
//   const [accExpanded, setAccExpanded] = useState(null);
//   const [currPage, setCurrPage] = useState(1);
//   const [cartArr, setCartArr] = useState({});
//   const [wishArr, setWishArr] = useState({});
//   const [menuParams, setMenuParams] = useState({});
//   const [filterProdListEmpty, setFilterProdListEmpty] = useState(false);
//   const [metalTypeCombo, setMetalTypeCombo] = useState([]);
//   const [diaQcCombo, setDiaQcCombo] = useState([]);
//   const [csQcCombo, setCsQcCombo] = useState([]);
//   const [selectedMetalId, setSelectedMetalId] = useState(
//     loginUserDetail?.MetalId
//   );
//   const [selectedDiaId, setSelectedDiaId] = useState(
//     loginUserDetail?.cmboDiaQCid
//   );
//   const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
//   const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
//   const [loginInfo, setLoginInfo] = useState();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [rollOverImgPd, setRolloverImgPd] = useState({});
//   const [locationKey, setLocationKey] = useState();
//   const [prodListType, setprodListType] = useState();
//   const [sortBySelect, setSortBySelect] = useState();
//   const setCartCountVal = useSetRecoilState(proCat_CartCount);
//   const setWishCountVal = useSetRecoilState(proCat_WishCount);
//   const [diaFilterRange, setDiaFilterRange] = useState({});
//   const [sliderValue, setSliderValue] = useState([]);
//   const [sliderValue1, setSliderValue1] = useState([]);
//   const [sliderValue2, setSliderValue2] = useState([]);
//   const [isRollOverVideo, setIsRollOverVideo] = useState({});
//   const [afterCountStatus, setAfterCountStatus] = useState(false);
//   const SoketData = useRecoilValue(soketProductData);
//   const formatter = new Intl.NumberFormat("en-IN");
//   let cookie = Cookies.get("visiterId");

//   const setCSSVariable = () => {
//     const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
//     const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
//     document.documentElement.style.setProperty(
//       "--background-color",
//       backgroundColor
//     );
//   };

//   const instantGetSoketApi = (param1) => {
//     if (SoketData) {
//       let socketfilterdata = SoketData?.filter(
//         (ele) => ele?.designno == param1?.designno
//       )[0];
//       return socketfilterdata?.StatusId;
//     }
//   };

//   // useEffect(() =>{
//   //   instantGetSoketApi(finalProductListData);
//   //   console.log('SoketDataSoketDataSoketData',instantGetSoketApi(finalProductListData));
//   // },[finalProductListData])

//   useEffect(() => {
//     setCSSVariable();

//     let mtid = loginUserDetail?.MetalId ?? storeInit?.MetalId;
//     setSelectedMetalId(mtid);

//     let diaid = loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid;
//     setSelectedDiaId(diaid);

//     let csid = loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid;
//     setSelectedCsId(csid);
//   }, []);

//   // console.log("selectredmetalid",selectedMetalId);

//   // console.log("loginUserDetail?.MetalId ?? storeInit?.MetalId",selectedMetalId,selectedDiaId,selectedCsId);

//   // console.log("rollOverImgPd",rollOverImgPd).

//   // useEffect(()=>{

//   //   let UrlVal =  location?.search.slice(1).split("/")

//   //     let MenuVal = '';
//   //     let MenuKey = '';
//   //     let SearchVar = '';
//   //     let TrendingVar = '';
//   //     let NewArrivalVar = '';
//   //     let BestSellerVar = '';
//   //     let AlbumVar = '';

//   //   UrlVal.forEach((ele)=>{
//   //     let firstChar = ele.charAt(0);

//   //     switch (firstChar) {
//   //       case 'V':
//   //           MenuVal = ele;
//   //           break;
//   //       case 'K':
//   //           MenuKey = ele;
//   //           break;
//   //       case 'S':
//   //           SearchVar = ele;
//   //           break;
//   //       case 'T':
//   //           TrendingVar = ele;
//   //           break;
//   //       case 'N':
//   //           NewArrivalVar = ele;
//   //           break;
//   //       case 'B':
//   //           BestSellerVar = ele;
//   //           break;
//   //       case 'AB':
//   //           AlbumVar = ele;
//   //           break;
//   //       default:
//   //           return '';
//   //     }
//   //   })

//   //   if(MenuVal && MenuKey){
//   //     let key = location?.search.slice(1).split("/")[1]?.slice(2).split("&")
//   //     let val = location?.search.slice(1).split("/")[0]?.slice(2).split("&")

//   //     let MergedUrlArr = MergedUrl(key,val)

//   //     console.log("menuval",MergedUrlArr)
//   //   }

//   //   if(SearchVar){
//   //     console.log("SearchVar",SearchVar)
//   //   }
//   //   if(TrendingVar){
//   //     console.log("TrendingVar",TrendingVar)
//   //   }
//   //   if(NewArrivalVar){
//   //     console.log("NewArrivalVar",NewArrivalVar)
//   //   }
//   //   if(BestSellerVar){
//   //     console.log("BestSellerVar",BestSellerVar)
//   //   }
//   //   if(AlbumVar){
//   //     console.log("AlbumVar",AlbumVar)
//   //   }

//   // },[location?.key])

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
//       MetalColorCombo()
//         .then((response) => {
//           if (response?.Data?.rd) {
//             let data = response?.Data?.rd;
//             sessionStorage.setItem("MetalColorCombo", JSON.stringify(data));
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   useEffect(() => {
//     const logininfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//     setLoginInfo(logininfo);
//   }, []);

//   useEffect(() => {
//     callAllApi();
//   }, [loginInfo]);

//   useEffect(() => {
//     window.scroll({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   useEffect(() => {
//     let param = JSON.parse(sessionStorage.getItem("menuparams"));
//     if (location?.state?.SearchVal === undefined) {
//       setMenuParams(param);
//     }
//   }, [location?.key, productListData, filterChecked]);
//   // },[location?.state?.menu,productListData,filterChecked])

//   useEffect(() => {
//     const fetchData = async () => {
//       let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

//       let UrlVal = location?.search.slice(1).split("/");

//       console.log("URLVal", UrlVal);

//       let MenuVal = "";
//       let MenuKey = "";
//       let SearchVar = "";
//       let TrendingVar = "";
//       let NewArrivalVar = "";
//       let BestSellerVar = "";
//       let AlbumVar = "";

//       let productlisttype;

//       UrlVal.forEach((ele) => {
//         let firstChar = ele.charAt(0);

//         switch (firstChar) {
//           case "M":
//             MenuVal = ele;
//             break;
//           case "S":
//             SearchVar = ele;
//             break;
//           case "T":
//             TrendingVar = ele;
//             break;
//           case "N":
//             NewArrivalVar = ele;
//             break;
//           case "B":
//             BestSellerVar = ele;
//             break;
//           case "A":
//             AlbumVar = ele;
//             break;
//           default:
//             return "";
//         }
//       });

//       if (MenuVal?.length > 0) {
//         let menuDecode = atob(MenuVal?.split("=")[1]);

//         let key = menuDecode?.split("/")[1].split(",");
//         let val = menuDecode?.split("/")[0].split(",");

//         setIsBreadcumShow(true);

//         productlisttype = [key, val];
//       }

//       if (SearchVar) {
//         productlisttype = SearchVar;
//       }

//       if (TrendingVar) {
//         productlisttype = TrendingVar.split("=")[1];
//       }
//       if (NewArrivalVar) {
//         productlisttype = NewArrivalVar.split("=")[1];
//       }

//       if (BestSellerVar) {
//         productlisttype = BestSellerVar.split("=")[1];
//       }

//       if (AlbumVar) {
//         productlisttype = AlbumVar.split("=")[1];
//       }

//       setIsProdLoading(true);
//       //  if(location?.state?.SearchVal === undefined){
//       setprodListType(productlisttype);
//       await ProductListApi({}, 1, obj, productlisttype, cookie)
//         .then((res) => {
//           if (res) {
//             // console.log("productList", res);
//             setProductListData(res?.pdList);
//             setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
//           }
//           return res;
//         })
//         // .then( async(res) => {
//         //   let forWardResp;
//         //   if (res) {
//         //     await GetPriceListApi(1,{},{},res?.pdResp?.rd1[0]?.AutoCodeList,obj,productlisttype).then((resp)=>{
//         //       if(resp){
//         //        console.log("productPriceData",resp);

//         //         setPriceListData(resp)
//         //         forWardResp = resp;
//         //       }
//         //     })
//         //   }
//         //   return forWardResp
//         // })
//         .then(async (res) => {
//           let forWardResp1;
//           if (res) {
//             await FilterListAPI(productlisttype, cookie)
//               .then((res) => {
//                 setFilterData(res);

//                 let diafilter =
//                   res?.filter((ele) => ele?.Name == "Diamond")[0]?.options
//                     ?.length > 0
//                     ? JSON.parse(
//                       res?.filter((ele) => ele?.Name == "Diamond")[0]?.options
//                     )[0]
//                     : [];
//                 let diafilter1 =
//                   res?.filter((ele) => ele?.Name == "NetWt")[0]?.options
//                     ?.length > 0
//                     ? JSON.parse(
//                       res?.filter((ele) => ele?.Name == "NetWt")[0]?.options
//                     )[0]
//                     : [];
//                 let diafilter2 =
//                   res?.filter((ele) => ele?.Name == "Gross")[0]?.options
//                     ?.length > 0
//                     ? JSON.parse(
//                       res?.filter((ele) => ele?.Name == "Gross")[0]?.options
//                     )[0]
//                     : [];

//                 // console.log("diafilter",diafilter);
//                 setSliderValue([diafilter?.Min, diafilter?.Max]);
//                 setSliderValue1([diafilter1?.Min, diafilter1?.Max]);
//                 setSliderValue2([diafilter2?.Min, diafilter2?.Max]);

//                 forWardResp1 = res;
//               })
//               .catch((err) => console.log("err", err));
//           }
//           return forWardResp1;
//         })
//         .finally(() => {
//           setIsProdLoading(false);
//           setIsOnlyProdLoading(false);
//           window.scroll({
//             top: 0,
//             behavior: "smooth",
//           });
//         })
//         .catch((err) => console.log("err", err));

//       // }
//     };

//     fetchData();

//     if (location?.key) {
//       setLocationKey(location?.key);
//     }
//   }, [location?.key]);

//   useEffect(() => {
//     const finalProdWithPrice = productListData.map((product) => {
//       let pdImgList = [];

//       if (product?.ImageCount > 0) {
//         for (let i = 1; i <= product?.ImageCount; i++) {
//           let imgString =
//             storeInit?.CDNDesignImageFol +
//             product?.designno +
//             "~" +
//             i +
//             "." +
//             product?.ImageExtension;
//           pdImgList.push(imgString);
//         }
//       } else {
//         pdImgList.push(imageNotFound);
//       }

//       let images = pdImgList;

//       let StatusId = product?.StatusId ?? 0;

//       if (SoketData && SoketData?.length != 0) {
//         let filterdata = SoketData?.find(
//           (ele) => ele?.designno === product?.designno
//         );
//         StatusId = filterdata?.StatusId ?? 0;
//       }

//       return {
//         ...product,
//         images,
//         StatusId
//       };
//     });
//     setFinalProductListData(finalProdWithPrice);
//   }, [productListData, SoketData]);

//   // useEffect(()=>{
//   //   const finalProdWithSocket = productListData.map((product) => {
//   //     let common = SoketData?.find((ele)=> ele?.designno === product?.designno)
//   //     if(common !== undefined && common ){
//   //       let StatusId = common?.StatusId
//   //       return {
//   //         ...product,
//   //         StatusId
//   //       }
//   //     }else{
//   //       let StatusId = 0
//   //       return {...product,StatusId}
//   //     }
//   //   })
//   //   setFinalProductListData(finalProdWithSocket);
//   //   console.log("finalProdWithPrice",finalProdWithSocket);
//   // },[productListData,SoketData])

//   // useEffect(() => {
//   //   const finalProdWithPrice = productListData.map((product) => {
//   //     const newPriceData = priceListData?.rd?.find(
//   //       (pda) => pda.A == product.autocode
//   //     );

//   //     const newPriceData1 = priceListData?.rd1
//   //       ?.filter((pda) => pda.A == product.autocode)
//   //       .reduce((acc, obj) => acc + obj.S, 0);

//   //     const newPriceData2 = priceListData?.rd2
//   //       ?.filter((pda) => pda.A == product.autocode)
//   //       .reduce((acc, obj) => acc + obj.S, 0);

//   //       let pdImgList = [];

//   //       if(product?.ImageCount > 0){
//   //         for(let i = 1; i <= product?.ImageCount; i++){
//   //           let imgString = storeInit?.CDNDesignImageFol + product?.designno + "~" + i + "." + product?.ImageExtension
//   //           pdImgList.push(imgString)
//   //         }
//   //       }
//   //       else{
//   //         pdImgList.push(imageNotFound)
//   //       }

//   //     let price = 0;
//   //     let markup = 0;
//   //     let metalrd = 0;
//   //     let diard1 = 0;
//   //     let csrd2 = 0;
//   //     let updNWT = 0;
//   //     let updGWT = 0;
//   //     let updDWT = 0;
//   //     let updDPCS = 0;
//   //     let updCWT = 0;
//   //     let updCPCS = 0;
//   //     let ismrpbase;
//   //     let mrpbaseprice;
//   //     let images = pdImgList;

//   //     if (newPriceData || newPriceData1 || newPriceData2) {
//   //       price =
//   //         ((newPriceData?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
//   //         (newPriceData?.W ?? 0) +
//   //         (newPriceData?.X ?? 0) +
//   //         (newPriceData1 ?? 0) +
//   //         (newPriceData2 ?? 0);
//   //       metalrd =
//   //         ((newPriceData?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
//   //         (newPriceData?.W ?? 0) +
//   //         (newPriceData?.X ?? 0);
//   //       diard1 = newPriceData1 ?? 0;
//   //       csrd2 = newPriceData2 ?? 0;
//   //       markup = newPriceData?.AB;
//   //       updNWT = newPriceData?.I ?? 0;
//   //       updGWT = newPriceData?.N ?? 0;
//   //       updDWT = newPriceData?.K ?? 0;
//   //       updDPCS = newPriceData?.J ?? 0;
//   //       updCWT = newPriceData?.M ?? 0;
//   //       updCPCS = newPriceData?.L ?? 0;
//   //       ismrpbase = newPriceData?.U;
//   //       mrpbaseprice = newPriceData?.Z;
//   //     }

//   //     return {
//   //       ...product,
//   //       price,
//   //       markup,
//   //       metalrd,
//   //       diard1,
//   //       csrd2,
//   //       updNWT,
//   //       updGWT,
//   //       updDWT,
//   //       updDPCS,
//   //       updCWT,
//   //       updCPCS,
//   //       ismrpbase,
//   //       mrpbaseprice,
//   //       images
//   //     };
//   //   });

//   //   // console.log("finalProdWithPrice", finalProdWithPrice?.filter((ele)=>ele?.ImageCount > 0));
//   //   setFinalProductListData(finalProdWithPrice);
//   // }, [productListData, priceListData]);

//   const ProdCardImageFunc = (pd, j) => {
//     let finalprodListimg;
//     let pdImgList = [];

//     if (pd?.ImageCount > 0) {
//       for (let i = 1; i <= pd?.ImageCount; i++) {
//         let imgString =
//           storeInit?.CDNDesignImageFol +
//           pd?.designno +
//           "~" +
//           i +
//           "." +
//           pd?.ImageExtension;
//         pdImgList.push(imgString);
//       }
//     } else {
//       finalprodListimg = imageNotFound;
//     }
//     if (pdImgList?.length > 0) {
//       finalprodListimg = pdImgList[j];
//       if (j > 0 && (!finalprodListimg || finalprodListimg == undefined)) {
//         finalprodListimg = pdImgList[0];
//       }
//     }
//     return finalprodListimg;
//   };

//   const decodeEntities = (html) => {
//     var txt = document.createElement("textarea");
//     txt.innerHTML = html;
//     return txt.value;
//   };

//   const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
//     if (pPrice <= 0) {
//       return 0;
//     } else if (pmu <= 0) {
//       return pPrice;
//     } else {
//       let percentPMU = pmu / 100 / curr;
//       return Number(pPrice * (percentPMU ?? 0)) + Number(pPrice ?? 0);
//     }
//   };

//   const handleCheckboxChange = (e, listname, val) => {
//     const { name, checked } = e.target;
//     setAfterCountStatus(true);

//     // console.log("output filterCheckedVal",{checked,type:listname,id:name.replace(/[a-zA-Z]/g, ''),value:val});

//     // console.log("output filterCheckedVal",e, listname, val);

//     setFilterChecked((prev) => ({
//       ...prev,
//       [name]: {
//         checked,
//         type: listname,
//         id: name?.replace(/[a-zA-Z]/g, ""),
//         value: val,
//       },
//     }));
//   };

//   const FilterValueWithCheckedOnly = () => {
//     let onlyTrueFilterValue = Object.values(filterChecked).filter(
//       (ele) => ele.checked
//     );

//     const priceValues = onlyTrueFilterValue
//       .filter((item) => item.type === "Price")
//       .map((item) => item.value);

//     const output = {};

//     onlyTrueFilterValue.forEach((item) => {
//       if (!output[item.type]) {
//         output[item.type] = "";
//       }

//       if (item.type == "Price") {
//         output["Price"] = priceValues;
//         return;
//       }

//       output[item.type] += `${item.id}, `;
//     });

//     for (const key in output) {
//       if (key !== "Price") {
//         output[key] = output[key].slice(0, -2);
//       }
//     }

//     // if

//     return output;
//   };

//   useEffect(() => {
//     setAfterCountStatus(true);
//     let output = FilterValueWithCheckedOnly();
//     let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

//     //  if(location?.state?.SearchVal === undefined && Object.keys(filterChecked)?.length > 0){
//     // console.log("locationkey",location?.key !== locationKey,location?.key,locationKey);

//     if (location?.key === locationKey) {
//       setIsOnlyProdLoading(true);
//       ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect)
//         .then((res) => {
//           if (res) {
//             setProductListData(res?.pdList);
//             setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
//             setAfterCountStatus(false);
//           }
//           return res;
//         })
//         //  .then( async(res) => {
//         //    if (res) {
//         //      await GetPriceListApi(1,{},output,res?.pdResp?.rd1[0]?.AutoCodeList,obj).then((resp)=>{
//         //        if(resp){
//         //          setPriceListData(resp)
//         //        }
//         //      })
//         //    }
//         //    return res
//         //  })
//         .catch((err) => console.log("err", err))
//         .finally(() => {
//           setIsOnlyProdLoading(false);
//         });
//     }
//     // .then(async(res)=>{
//     //   if(res){
//     //     FilterListAPI().then((res)=>setFilterData(res)).catch((err)=>console.log("err",err))
//     //   }
//     // })
//     // }
//   }, [filterChecked]);

//   const handelFilterClearAll = () => {
//     setAfterCountStatus(true);
//     if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) {
//       setFilterChecked({});
//     }
//     setAccExpanded(false);
//   };

//   const handelPageChange = (event, value) => {
//     // console.log("pagination",value);

//     let output = FilterValueWithCheckedOnly();
//     let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
//     setIsProdLoading(true);
//     setCurrPage(value);
//     setTimeout(() => {
//       window.scroll({
//         top: 0,
//         behavior: "smooth",
//       });
//     }, 100);
//     ProductListApi(output, value, obj, prodListType, cookie, sortBySelect)
//       .then((res) => {
//         if (res) {
//           setProductListData(res?.pdList);
//           setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
//         }
//         return res;
//       })
//       // .then(async (res) => {
//       //   if (res) {
//       //     await GetPriceListApi(value, {}, output, res?.pdResp?.rd1[0]?.AutoCodeList, obj).then((resp) => {
//       //       if (resp) {
//       //         setPriceListData(resp)
//       //       }
//       //     })
//       //   }
//       //   return res
//       // })
//       .catch((err) => console.log("err", err))
//       .finally(() => {
//         setTimeout(() => {
//           setIsProdLoading(false);
//         }, 100);
//       });
//   };

//   const handleCartandWish = (e, ele, type) => {

//     console.log("event",e.target.checked)

//     let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//     let prodObj = {
//       autocode: ele?.autocode,
//       Metalid: selectedMetalId ?? ele?.MetalPurityid,
//       MetalColorId: ele?.MetalColorid,
//       DiaQCid: selectedDiaId ?? loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
//       CsQCid: selectedCsId ?? loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
//       Size: ele?.DefaultSize,
//       Unitcost: ele?.UnitCost,
//       markup: ele?.DesignMarkUp,
//       UnitCostWithmarkup: ele?.UnitCostWithMarkUp,
//       Remark: "",
//       // AlbumName: decodeURI(extractedPart) ?? ""
//       AlbumName: decodeURIComponent(location.pathname?.split("/p/")[1].split("/")[0]) ?? ""
//     };

//     if (e.target.checked == true) {
//       CartAndWishListAPI(type, prodObj, cookie)
//         .then((res) => {
//           let cartC = res?.Data?.rd[0]?.Cartlistcount;
//           let wishC = res?.Data?.rd[0]?.Wishlistcount;
//           setWishCountVal(wishC);
//           setCartCountVal(cartC);
//         })
//         .catch((err) => console.log("err", err));
//     } else {
//       RemoveCartAndWishAPI(type, ele?.autocode, cookie)
//         .then((res) => {
//           let cartC = res?.Data?.rd[0]?.Cartlistcount;
//           let wishC = res?.Data?.rd[0]?.Wishlistcount;
//           setWishCountVal(wishC);
//           setCartCountVal(cartC);
//         })
//         .catch((err) => console.log("err", err));
//     }

//     if (type === "Cart") {
//       setCartArr((prev) => ({
//         ...prev,
//         [ele?.autocode]: e.target.checked,
//       }));
//     }

//     if (type === "Wish") {
//       setWishArr((prev) => ({
//         ...prev,
//         [ele?.autocode]: e.target.checked,
//       }));
//     }
//   };

//   useEffect(() => {
//     if (productListData?.length === 0 || !productListData) {
//       setFilterProdListEmpty(true);
//     } else {
//       setFilterProdListEmpty(false);
//       setAfterCountStatus(false);
//     }
//   }, [productListData]);

//   const handelCustomCombo = (obj) => {
//     let output = FilterValueWithCheckedOnly();

//     if (location?.state?.SearchVal === undefined) {
//       setIsOnlyProdLoading(true);
//       ProductListApi(output, currPage, obj, prodListType, cookie, sortBySelect)
//         .then((res) => {
//           if (res) {
//             setProductListData(res?.pdList);
//             setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
//           }
//           return res;
//         })
//         .catch((err) => console.log("err", err))
//         .finally(() => {
//           setTimeout(() => {
//             sessionStorage.setItem("short_cutCombo_val", JSON?.stringify(obj));
//             setIsOnlyProdLoading(false);
//           }, 100);
//         });
//     }
//   };

//   useEffect(() => {
//     let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

//     let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

//     sessionStorage.setItem("short_cutCombo_val", JSON?.stringify(obj));

//     if (
//       loginInfo?.MetalId !== selectedMetalId ||
//       loginInfo?.cmboDiaQCid !== selectedDiaId ||
//       loginInfo?.cmboCSQCid !== selectedCsId
//     ) {
//       if (
//         selectedMetalId !== "" ||
//         selectedDiaId !== "" ||
//         selectedCsId !== ""
//       ) {
//         handelCustomCombo(obj);
//       }
//     }
//   }, [selectedMetalId, selectedDiaId, selectedCsId, storeInit]);

//   const compressAndEncode = (inputString) => {
//     try {
//       const uint8Array = new TextEncoder().encode(inputString);

//       const compressed = pako.deflate(uint8Array, { to: "string" });

//       return btoa(String.fromCharCode.apply(null, compressed));
//     } catch (error) {
//       console.error("Error compressing and encoding:", error);
//       return null;
//     }
//   };

//   const decodeAndDecompress = (encodedString) => {
//     try {
//       // Decode the Base64 string to binary data
//       const binaryString = atob(encodedString);

//       // Convert binary string to Uint8Array
//       const uint8Array = new Uint8Array(binaryString.length);
//       for (let i = 0; i < binaryString.length; i++) {
//         uint8Array[i] = binaryString.charCodeAt(i);
//       }

//       // Decompress the data
//       const decompressed = pako.inflate(uint8Array, { to: "string" });

//       // Convert decompressed data back to JSON object
//       const jsonObject = JSON.parse(decompressed);

//       return jsonObject;
//     } catch (error) {
//       console.error("Error decoding and decompressing:", error);
//       return null;
//     }
//   };

//   const handleMoveToDetail = (productData) => {
//     const logininfoDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));

//     let output = FilterValueWithCheckedOnly();

//     let obj = {
//       a: productData?.autocode,
//       b: productData?.designno,
//       m: selectedMetalId ?? logininfoDetail?.MetalId ?? storeInit?.MetalId,
//       d: selectedDiaId ?? logininfoDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
//       c: selectedCsId ?? logininfoDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid,
//       f: output,
//       // n: decodeURI(extractedPart)
//       n: decodeURIComponent(location.pathname?.split("/p/")[1].split("/")[0]) ?? "",
//       pl:prodListType ?? "",
//       sb:sortBySelect ?? ""
//     };

//     console.log("selectedMetalId", obj);
//     // console.log('ksjkfjkjdkjfkjsdk--', obj);
//     // compressAndEncode(JSON.stringify(obj))

//     decodeAndDecompress();

//     let encodeObj = compressAndEncode(JSON.stringify(obj));

//     navigate(
//       `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
//       }${productData?.designno}?p=${encodeObj}`
//     );
//   };

//   const handleImgRollover = (pd) => {
//     if (pd?.images?.length >= 1) {
//       // setRolloverImgPd((prev) => pd?.images[1])
//       setRolloverImgPd((prev) => {
//         return { [pd?.autocode]: pd?.images[1] };
//       });
//     }
//   };

//   const handleLeaveImgRolloverImg = (pd) => {
//     if (pd?.images?.length > 0) {
//       // setRolloverImgPd((prev) => pd?.images[0] )
//       setRolloverImgPd((prev) => {
//         return { [pd?.autocode]: pd?.images[0] };
//       });
//     }
//   };

//   const handleBreadcums = (mparams) => {
//     let key = Object?.keys(mparams);
//     let val = Object?.values(mparams);

//     let KeyObj = {};
//     let ValObj = {};

//     key.forEach((value, index) => {
//       let keyName = `FilterKey${index === 0 ? "" : index}`;
//       KeyObj[keyName] = value;
//     });

//     val.forEach((value, index) => {
//       let keyName = `FilterVal${index === 0 ? "" : index}`;
//       ValObj[keyName] = value;
//     });

//     let finalData = { ...KeyObj, ...ValObj };

//     const queryParameters1 = [
//       finalData?.FilterKey && `${finalData.FilterVal}`,
//       finalData?.FilterKey1 && `${finalData.FilterVal1}`,
//       finalData?.FilterKey2 && `${finalData.FilterVal2}`,
//     ]
//       .filter(Boolean)
//       .join("/");

//     const queryParameters = [
//       finalData?.FilterKey && `${finalData.FilterVal}`,
//       finalData?.FilterKey1 && `${finalData.FilterVal1}`,
//       finalData?.FilterKey2 && `${finalData.FilterVal2}`,
//     ]
//       .filter(Boolean)
//       .join(",");

//     const otherparamUrl = Object.entries({
//       b: finalData?.FilterKey,
//       g: finalData?.FilterKey1,
//       c: finalData?.FilterKey2,
//     })
//       .filter(([key, value]) => value !== undefined)
//       .map(([key, value]) => value)
//       .filter(Boolean)
//       .join(",");

//     let menuEncoded = `${queryParameters}/${otherparamUrl}`;

//     const url = `/p/${BreadCumsObj()?.menuname}/${queryParameters1}/?M=${btoa(
//       menuEncoded
//     )}`;
//     // const url = `/p?V=${queryParameters}/K=${otherparamUrl}`;

//     navigate(url);

//     // console.log("mparams", KeyObj, ValObj)
//   };

//   const handleSortby = async (e) => {
//     setSortBySelect(e.target?.value);

//     let output = FilterValueWithCheckedOnly();
//     let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

//     setIsOnlyProdLoading(true);

//     let sortby = e.target?.value;

//     await ProductListApi(output, currPage, obj, prodListType, cookie, sortby)
//       .then((res) => {
//         if (res) {
//           setProductListData(res?.pdList);
//           setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
//         }
//         return res;
//       })
//       .catch((err) => console.log("err", err))
//       .finally(() => {
//         setIsOnlyProdLoading(false);

//         // if(element)
//         //   {
//         //     element.scrollIntoView({ behavior: "smooth", block: "start" })
//         //   }
//         // window.scroll({
//         //   top: 0,
//         //   behavior: 'smooth'
//         // })
//       });
//   };

//   // useEffect(()=>{
//   // let element =  document.getElementById("smr_outer_portion")
//   // if(element){
//   //   console.log("scroll",element)
//   // }
//   // },[])

//   // const showBreadCumsValue = () =>{

//   //   let UrlVal = location?.search.slice(1).split("/")[0]?.charAt(0)

//   //   let Compo;

//   //   if(UrlVal == "M"){
//   //     Compo = (
//   //       <div className="smr_breadcums_port">
//   //                         {menuParams?.menuname && (
//   //                           <span
//   //                             onClick={() =>
//   //                               handleBreadcums({
//   //                                 [menuParams?.FilterKey]:
//   //                                   menuParams?.FilterVal,
//   //                               })
//   //                             }
//   //                           >
//   //                             {menuParams?.menuname}
//   //                           </span>
//   //                         )}

//   //                         {menuParams?.FilterVal1 && (
//   //                           <span
//   //                             onClick={() =>
//   //                               handleBreadcums({
//   //                                 [menuParams?.FilterKey]:
//   //                                   menuParams?.FilterVal,
//   //                                 [menuParams?.FilterKey1]:
//   //                                   menuParams?.FilterVal1,
//   //                               })
//   //                             }
//   //                           >
//   //                             {` > ${menuParams?.FilterVal1}`}
//   //                           </span>
//   //                         )}

//   //                         {menuParams?.FilterVal2 && (
//   //                           <span
//   //                             onClick={() =>
//   //                               handleBreadcums({
//   //                                 [menuParams?.FilterKey]:
//   //                                   menuParams?.FilterVal,
//   //                                 [menuParams?.FilterKey1]:
//   //                                   menuParams?.FilterVal1,
//   //                                 [menuParams?.FilterKey2]:
//   //                                   menuParams?.FilterVal2,
//   //                               })
//   //                             }
//   //                           >
//   //                             {` > ${menuParams?.FilterVal2}`}
//   //                           </span>
//   //                         )}
//   //                       </div>
//   //     )
//   //   }
//   //   if()

//   // }

//   // console.log("showBreadCumsValue",showBreadCumsValue())

//   const handleScrollHeight = () => {
//     // const element = document.getElementsByClassName("smr_filter_portion_outter")
//     // const clientHeight = element?.clientHeight;
//     // console.log('ClientHeight', clientHeight);
//   };

//   // const handleRangeFilter = async(type,val) => {

//   //   let output = FilterValueWithCheckedOnly()
//   //   let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId}

//   //   let DiaRange = {DiaMin:val[0],DiaMax:val[1]}

//   //   console.log("DiaRange",DiaRange)

//   //   setDiaFilterRange(DiaRange)

//   //   setTimeout(async()=>{
//   //     await ProductListApi(output,1,obj,prodListType,cookie,sortBySelect,DiaRange)
//   //     .then((res) => {
//   //       if (res) {
//   //         setProductListData(res?.pdList);
//   //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
//   //       }
//   //       return res;
//   //     })
//   //     .catch((err) => console.log("err", err))
//   //     .finally(()=>{
//   //         setIsOnlyProdLoading(false)
//   //     })
//   //   },100)

//   // };

//   const handleRangeFilterApi = async (Rangeval) => {
//     let output = FilterValueWithCheckedOnly();
//     let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

//     // let diafilter = JSON.parse(filterData?.filter((ele)=>ele?.Name == "Diamond")[0]?.options)[0]
//     let diafilter1 = JSON.parse(
//       filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
//     )[0];
//     let diafilter2 = JSON.parse(
//       filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
//     )[0];

//     let DiaRange = { DiaMin: Rangeval[0], DiaMax: Rangeval[1] };
//     let netRange = {
//       netMin: diafilter1?.Min == sliderValue1[0] ? "" : sliderValue1[0],
//       netMax: diafilter1?.Max == sliderValue1[1] ? "" : sliderValue1[1],
//     };
//     let grossRange = {
//       grossMin: diafilter2?.Min == sliderValue2[0] ? "" : sliderValue2[0],
//       grossMax: diafilter2?.Max == sliderValue2[1] ? "" : sliderValue2[1],
//     };

//     await ProductListApi(
//       output,
//       1,
//       obj,
//       prodListType,
//       cookie,
//       sortBySelect,
//       DiaRange,
//       netRange,
//       grossRange
//     )
//       .then((res) => {
//         if (res) {
//           setProductListData(res?.pdList);
//           setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
//         }
//         return res;
//       })
//       .catch((err) => console.log("err", err))
//       .finally(() => {
//         setIsOnlyProdLoading(false);
//       });
//   };
//   const handleRangeFilterApi1 = async (Rangeval1) => {
//     let diafilter = JSON.parse(
//       filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
//     )[0];
//     // let diafilter1 = JSON.parse(filterData?.filter((ele)=>ele?.Name == "NetWt")[0]?.options)[0]
//     let diafilter2 = JSON.parse(
//       filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
//     )[0];

//     let output = FilterValueWithCheckedOnly();
//     let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

//     let DiaRange = {
//       diaMin: diafilter?.Min == sliderValue[0] ? "" : sliderValue[0],
//       diaMax: diafilter?.Max == sliderValue[1] ? "" : sliderValue[1],
//     };
//     let netRange = { netMin: Rangeval1[0], netMax: Rangeval1[1] };
//     let grossRange = {
//       grossMin: diafilter2?.Min == sliderValue2[0] ? "" : sliderValue2[0],
//       grossMax: diafilter2?.Max == sliderValue2[1] ? "" : sliderValue2[1],
//     };

//     await ProductListApi(
//       output,
//       1,
//       obj,
//       prodListType,
//       cookie,
//       sortBySelect,
//       DiaRange,
//       netRange,
//       grossRange
//     )
//       .then((res) => {
//         if (res) {
//           setProductListData(res?.pdList);
//           setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
//         }
//         return res;
//       })
//       .catch((err) => console.log("err", err))
//       .finally(() => {
//         setIsOnlyProdLoading(false);
//       });
//   };
//   const handleRangeFilterApi2 = async (Rangeval2) => {
//     let output = FilterValueWithCheckedOnly();
//     let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

//     let diafilter = JSON.parse(
//       filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
//     )[0];
//     let diafilter1 = JSON.parse(
//       filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
//     )[0];
//     // let diafilter2 = JSON.parse(filterData?.filter((ele)=>ele?.Name == "Gross")[0]?.options)[0]

//     let DiaRange = {
//       diaMin: diafilter?.Min == sliderValue[0] ? "" : sliderValue[0],
//       diaMax: diafilter?.Max == sliderValue[1] ? "" : sliderValue[1],
//     };
//     let netRange = {
//       netMin: diafilter1?.Min == sliderValue1[0] ? "" : sliderValue1[0],
//       netMax: diafilter1?.Max == sliderValue1[1] ? "" : sliderValue1[1],
//     };
//     let grossRange = { grossMin: Rangeval2[0], grossMax: Rangeval2[1] };

//     await ProductListApi(
//       output,
//       1,
//       obj,
//       prodListType,
//       cookie,
//       sortBySelect,
//       DiaRange,
//       netRange,
//       grossRange
//     )
//       .then((res) => {
//         if (res) {
//           setProductListData(res?.pdList);
//           setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
//         }
//         return res;
//       })
//       .catch((err) => console.log("err", err))
//       .finally(() => {
//         setIsOnlyProdLoading(false);
//       });
//   };

//   const handleSliderChange = (event, newValue) => {
//     setSliderValue(newValue);
//     handleRangeFilterApi(newValue);
//   };
//   const handleSliderChange1 = (event, newValue) => {
//     setSliderValue1(newValue);
//     handleRangeFilterApi1(newValue);
//   };
//   const handleSliderChange2 = (event, newValue) => {
//     setSliderValue2(newValue);
//     handleRangeFilterApi2(newValue);
//   };

//   const handleInputChange = (index) => (event) => {
//     const newSliderValue = [...sliderValue];
//     newSliderValue[index] =
//       event.target.value === "" ? "" : Number(event.target.value);
//     setSliderValue(newSliderValue);
//     handleRangeFilterApi(newSliderValue);
//   };
//   const handleInputChange1 = (index) => (event) => {
//     const newSliderValue = [...sliderValue1];
//     newSliderValue[index] =
//       event.target.value === "" ? "" : Number(event.target.value);
//     setSliderValue1(newSliderValue);
//     handleRangeFilterApi1(newSliderValue);
//   };
//   const handleInputChange2 = (index) => (event) => {
//     const newSliderValue = [...sliderValue2];
//     newSliderValue[index] =
//       event.target.value === "" ? "" : Number(event.target.value);
//     setSliderValue2(newSliderValue);
//     handleRangeFilterApi2(newSliderValue);
//   };

//   const RangeFilterView = (ele) => {
//     return (
//       <>
//         <div>
//           <div>
//             <Slider
//               value={sliderValue}
//               onChange={handleSliderChange}
//               valueLabelDisplay="auto"
//               aria-labelledby="range-slider"
//               min={JSON?.parse(ele?.options)[0]?.Min}
//               max={JSON?.parse(ele?.options)[0]?.Max}
//               step={0.001}
//               sx={{ marginTop: "25px" }}
//             />
//           </div>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <Input
//               value={sliderValue[0]}
//               margin="dense"
//               onChange={handleInputChange(0)}
//               inputProps={{
//                 step: 0.001,
//                 min: JSON?.parse(ele?.options)[0]?.Min,
//                 max: JSON?.parse(ele?.options)[0]?.Max,
//                 type: "number",
//                 "aria-labelledby": "range-slider",
//               }}
//             />
//             <Input
//               value={sliderValue[1]}
//               margin="dense"
//               onChange={handleInputChange(1)}
//               inputProps={{
//                 step: 0.001,
//                 min: JSON?.parse(ele?.options)[0]?.Min,
//                 max: JSON?.parse(ele?.options)[0]?.Max,
//                 type: "number",
//                 "aria-labelledby": "range-slider",
//               }}
//             />
//           </div>
//         </div>
//       </>
//     );
//   };
//   const RangeFilterView1 = (ele) => {
//     // console.log("netwt",ele)
//     return (
//       <>
//         <div>
//           <div>
//             <Slider
//               value={sliderValue1}
//               onChange={handleSliderChange1}
//               valueLabelDisplay="auto"
//               aria-labelledby="range-slider"
//               min={JSON?.parse(ele?.options)[0]?.Min}
//               max={JSON?.parse(ele?.options)[0]?.Max}
//               step={0.001}
//               sx={{ marginTop: "25px" }}
//             />
//           </div>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <Input
//               value={sliderValue1[0]}
//               margin="dense"
//               onChange={handleInputChange1(0)}
//               inputProps={{
//                 step: 0.001,
//                 min: JSON?.parse(ele?.options)[0]?.Min,
//                 max: JSON?.parse(ele?.options)[0]?.Max,
//                 type: "number",
//                 "aria-labelledby": "range-slider",
//               }}
//             />
//             <Input
//               value={sliderValue1[1]}
//               margin="dense"
//               onChange={handleInputChange1(1)}
//               inputProps={{
//                 step: 0.001,
//                 min: JSON?.parse(ele?.options)[0]?.Min,
//                 max: JSON?.parse(ele?.options)[0]?.Max,
//                 type: "number",
//                 "aria-labelledby": "range-slider",
//               }}
//             />
//           </div>
//         </div>
//       </>
//     );
//   };
//   const RangeFilterView2 = (ele) => {
//     return (
//       <>
//         <div>
//           <div>
//             <Slider
//               value={sliderValue2}
//               onChange={handleSliderChange2}
//               valueLabelDisplay="auto"
//               aria-labelledby="range-slider"
//               min={JSON?.parse(ele?.options)[0]?.Min}
//               max={JSON?.parse(ele?.options)[0]?.Max}
//               step={0.001}
//               sx={{ marginTop: "25px" }}
//             />
//           </div>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <Input
//               value={sliderValue2[0]}
//               margin="dense"
//               onChange={handleInputChange2(0)}
//               inputProps={{
//                 step: 0.001,
//                 min: JSON?.parse(ele?.options)[0]?.Min,
//                 max: JSON?.parse(ele?.options)[0]?.Max,
//                 type: "number",
//                 "aria-labelledby": "range-slider",
//               }}
//             />
//             <Input
//               value={sliderValue2[1]}
//               margin="dense"
//               onChange={handleInputChange2(1)}
//               inputProps={{
//                 step: 0.001,
//                 min: JSON?.parse(ele?.options)[0]?.Min,
//                 max: JSON?.parse(ele?.options)[0]?.Max,
//                 type: "number",
//                 "aria-labelledby": "range-slider",
//               }}
//             />
//           </div>
//         </div>
//       </>
//     );
//   };

//   const DynamicListPageTitleLineFunc = () => {
//     if (location?.search.split("=")[0]?.slice(1) == "M") {
//       return menuParams?.menuname;
//     } else {
//       return location?.pathname.split("/")[2];
//     }
//   };

//   const BreadCumsObj = () => {
//     let BreadCum = decodeURI(atob(location?.search.slice(3))).split("/");

//     const values = BreadCum[0].split(",");
//     const labels = BreadCum[1].split(",");

//     const updatedBreadCum = labels.reduce((acc, label, index) => {
//       acc[label] = values[index] || "";
//       return acc;
//     }, {});

//     const result = Object.entries(updatedBreadCum).reduce(
//       (acc, [key, value], index) => {
//         acc[`FilterKey${index === 0 ? "" : index}`] =
//           key.charAt(0).toUpperCase() + key.slice(1);
//         acc[`FilterVal${index === 0 ? "" : index}`] = value;
//         return acc;
//       },
//       {}
//     );

//     // decodeURI(location?.pathname).slice(3).slice(0,-1).split("/")[0]

//     result.menuname = decodeURI(location?.pathname)
//       .slice(3)
//       .slice(0, -1)
//       .split("/")[0];

//     return result;
//   };
//   // useEffect(()=>{
//   //   console.log("breadcum",BreadCumsObj())
//   // },[location?.key])

//   const pathname = location?.pathname;

//   // Extract the part after '/p/' and before the trailing '/'
//   // const extractedPart = pathname?.split("/p/")[1].split("/")[0]?.replace("%20", " ");
//   return (
//     <>
//       <Helmet>
//         <title>{decodeURI(DynamicListPageTitleLineFunc())}</title>
//       </Helmet>
//       <div id="top">
//         <Drawer
//           open={isDrawerOpen}
//           onClose={() => {
//             setIsDrawerOpen(false);
//           }}
//           className="smr_filterDrawer"
//         >
//           <div
//             style={{
//               display: "flex",
//               width: "100%",
//               alignItems: "center",
//               justifyContent: "end",
//               padding: "8px 8px 0px 0px",
//             }}
//           >
//             <CloseIcon
//               onClick={() => {
//                 setIsDrawerOpen(false);
//               }}
//             />
//           </div>
//           {/* <div
//             style={{
//               marginLeft: "15px",
//               marginBottom: "20px",
//               display: "flex",
//               gap: "5px",
//               flexDirection: "column",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#7f7d85",
//                 fontSize: "16px",
//                 fontFamily: "TT Commons Medium",
//                 marginTop: "12px",
//               }}
//             >
//               Customization
//             </Typography>
//             {storeInit?.IsMetalCustComb === 1 && <div
//             >
//               <Typography
//                 className="label"
//                 sx={{
//                   color: "#7f7d85",
//                   fontSize: "14px",
//                   fontFamily: "TT Commons Regular",
//                 }}
//               >
//                 Metal:&nbsp;
//               </Typography>
//               <select
//                 style={{
//                   border: "1px solid #e1e1e1",
//                   borderRadius: "8px",
//                   minWidth: "270px",
//                 }}
//                 className="select"
//                 value={selectedMetalId}
//                 onChange={(e) => {
//                   setSelectedMetalId(e.target.value);
//                 }}
//               >
//                 {metalTypeCombo?.map((metalele) => (
//                   <option
//                     className="option"
//                     key={metalele?.Metalid}
//                     value={metalele?.Metalid}
//                   >
//                     {metalele?.metaltype.toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//             </div>}

//             {storeInit?.IsDiamondCustComb === 1 && (
//               <div
//               >
//                 <Typography
//                   className="label"
//                   sx={{
//                     color: "#7f7d85",
//                     fontSize: "14px",
//                     fontFamily: "TT Commons Regular",
//                   }}
//                 >
//                   Diamond:&nbsp;
//                 </Typography>
//                 <select
//                   style={{
//                     border: "1px solid #e1e1e1",
//                     borderRadius: "8px",
//                     minWidth: "270px",
//                   }}
//                   className="select"
//                   value={selectedDiaId}
//                   onChange={(e) => setSelectedDiaId(e.target.value)}
//                 >
//                   {diaQcCombo?.map((diaQc) => (
//                     <option
//                       className="option"
//                       key={diaQc?.QualityId}
//                       value={`${diaQc?.QualityId},${diaQc?.ColorId}`}
//                     >
//                       {" "}
//                       {`${diaQc.Quality.toUpperCase()},${diaQc.color.toLowerCase()}`}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             {storeInit?.IsCsCustomization === 1 && (
//               <div
//               >
//                 <Typography
//                   className="label"
//                   sx={{
//                     color: "#7f7d85",
//                     fontSize: "14px",
//                     fontFamily: "TT Commons Regular",
//                   }}
//                 >
//                   Color Stone:&nbsp;
//                 </Typography>
//                 <select
//                   style={{
//                     border: "1px solid #e1e1e1",
//                     borderRadius: "8px",
//                     minWidth: "270px",
//                   }}
//                   className="select"
//                   value={selectedCsId}
//                   onChange={(e) => setSelectedCsId(e.target.value)}
//                 >
//                   {csQcCombo?.map((csCombo) => (
//                     <option
//                       className="option"
//                       key={csCombo?.QualityId}
//                       value={`${csCombo?.QualityId},${csCombo?.ColorId}`}
//                     >
//                       {" "}
//                       {`${csCombo.Quality.toUpperCase()},${csCombo.color.toLowerCase()}`}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             <div
//             >
//               <div
//               >
//                 <Typography
//                   className="label"
//                   sx={{
//                     color: "#7f7d85",
//                     fontSize: "14px",
//                     fontFamily: "TT Commons Regular",
//                   }}
//                 >
//                   Sort By:&nbsp;
//                 </Typography>
//                 <select
//                   style={{
//                     border: "1px solid #e1e1e1",
//                     borderRadius: "8px",
//                     minWidth: "270px",
//                   }}
//                   className="select"
//                   value={sortBySelect}
//                   onChange={(e) => handleSortby(e)}
//                 >
//                   <option className="option" value="Recommended">
//                     Recommended
//                   </option>
//                   <option className="option" value="In Stock">
//                     In stock
//                   </option>
//                   <option className="option" value="PRICE HIGH TO LOW">
//                     Price High To Low
//                   </option>
//                   <option className="option" value="PRICE LOW TO HIGH">
//                     Price Low To High
//                   </option>
//                 </select>
//               </div>
//             </div>
//           </div> */}
//           <div className="smr_mobile_filter_portion">
//             {filterData?.length > 0 && (
//               <div className="smr_mobile_filter_portion_outter">
//                 <span className="smr_filter_text">
//                   <span>
//                     {Object.values(filterChecked).filter((ele) => ele.checked)
//                       ?.length === 0 ? (
//                       "Filters"
//                     ) : (
//                       <>
//                         {/* {afterCountStatus == true ? (
//                           <Skeleton
//                             variant="rounded"
//                             width={140}
//                             height={22}
//                             className="pSkelton"
//                           />
//                         ) : ( */}
//                         <span>{`Product Found: ${afterFilterCount}`}</span>
//                         {/* )} */}
//                       </>
//                     )}
//                   </span>
//                   <span onClick={() => handelFilterClearAll()}>
//                     {Object.values(filterChecked).filter((ele) => ele.checked)
//                       ?.length > 0 ? (
//                       "Clear All"
//                     ) : (
//                       <>
//                         {/* {afterCountStatus == true ? (
//                           <Skeleton
//                             variant="rounded"
//                             width={140}
//                             height={22}
//                             className="pSkelton"
//                           />
//                         ) : ( */}
//                         <span>{`Total Products : ${afterFilterCount}`}</span>
//                         {/* )} */}
//                       </>
//                     )}
//                   </span>
//                 </span>
//                 <div style={{ marginTop: "12px" }}>
//                   {filterData?.map((ele) => (
//                     <>
//                       {!ele?.id?.includes("Range") &&
//                         !ele?.id?.includes("Price") && (
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
//                               "&.MuiPaper-root.MuiAccordion-root:before": {
//                                 background: "none",
//                               },
//                             }}
//                           >
//                             <AccordionSummary
//                               expandIcon={
//                                 <ExpandMoreIcon sx={{ width: "20px" }} />
//                               }
//                               aria-controls="panel1-content"
//                               id="panel1-header"
//                               sx={{
//                                 color: "#7d7f85",
//                                 borderRadius: 0,

//                                 "&.MuiAccordionSummary-root": {
//                                   padding: 0,
//                                 },
//                               }}
//                             >
//                               {ele.Fil_DisName}
//                             </AccordionSummary>
//                             <AccordionDetails
//                               sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 gap: "4px",
//                                 minHeight: "fit-content",
//                                 maxHeight: "300px",
//                                 overflow: "auto",
//                               }}
//                             >
//                               {(JSON.parse(ele?.options) ?? []).map((opt) => (
//                                 <div
//                                   style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "space-between",
//                                     gap: "12px",
//                                   }}
//                                   key={opt?.id}
//                                 >
//                                   <FormControlLabel
//                                     control={
//                                       <Checkbox
//                                         name={`${ele?.id}${opt?.id}`}
//                                         checked={
//                                           filterChecked[`${ele?.id}${opt?.id}`]
//                                             ?.checked === undefined
//                                             ? false
//                                             : filterChecked[
//                                               `${ele?.id}${opt?.id}`
//                                             ]?.checked
//                                         }
//                                         style={{
//                                           color: "#7f7d85",
//                                           padding: 0,
//                                           width: "10px",
//                                         }}
//                                         onClick={(e) =>
//                                           handleCheckboxChange(
//                                             e,
//                                             ele?.id,
//                                             opt?.Name
//                                           )
//                                         }
//                                         size="small"
//                                       />
//                                     }
//                                     className="smr_mui_checkbox_label"
//                                     label={opt.Name}
//                                   />
//                                 </div>
//                               ))}
//                             </AccordionDetails>
//                           </Accordion>
//                         )}
//                       {ele?.id?.includes("Price") && (
//                         <Accordion
//                           elevation={0}
//                           sx={{
//                             borderBottom: "1px solid #c7c8c9",
//                             borderRadius: 0,
//                             "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
//                               borderBottomLeftRadius: "0px",
//                               borderBottomRightRadius: "0px",
//                             },
//                             "&.MuiPaper-root.MuiAccordion-root:before": {
//                               background: "none",
//                             },
//                           }}
//                         >
//                           <AccordionSummary
//                             expandIcon={
//                               <ExpandMoreIcon sx={{ width: "20px" }} />
//                             }
//                             aria-controls="panel1-content"
//                             id="panel1-header"
//                             sx={{
//                               color: "#7f7d85",
//                               borderRadius: 0,

//                               "&.MuiAccordionSummary-root": {
//                                 padding: 0,
//                               },
//                             }}
//                             onClick={() => handleScrollHeight()}
//                           >
//                             {ele.Fil_DisName}
//                           </AccordionSummary>
//                           <AccordionDetails
//                             sx={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "4px",
//                               minHeight: "fit-content",
//                               maxHeight: "300px",
//                               overflow: "auto",
//                             }}
//                           >
//                             {(JSON.parse(ele?.options) ?? []).map(
//                               (opt, i) => (
//                                 <div
//                                   className="formcontroller_box"
//                                   style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "space-between",
//                                     gap: "12px",
//                                   }}
//                                   key={i}
//                                 >
//                                   <FormControlLabel
//                                     control={
//                                       <Checkbox
//                                         name={`Price${i}${i}`}
//                                         checked={
//                                           filterChecked[`Price${i}${i}`]
//                                             ?.checked === undefined
//                                             ? false
//                                             : filterChecked[
//                                               `Price${i}${i}`
//                                             ]?.checked
//                                         }
//                                         style={{
//                                           color: "#7f7d85",
//                                           padding: 0,
//                                           width: "10px",
//                                         }}
//                                         sx={{
//                                           color: "#7f7d85",
//                                           padding: 0,
//                                           width: "10px",
//                                         }}
//                                         onClick={(e) =>
//                                           handleCheckboxChange(
//                                             e,
//                                             ele?.id,
//                                             opt
//                                           )
//                                         }
//                                         size="small"
//                                       />
//                                     }
//                                     // .MuiFormControlLabel-root .MuiFormControlLabel-label

//                                     className="smr_mui_checkbox_label smr_mui_label_price "
//                                     label={
//                                       // <div style={{fontSize:'0.6vw !important'}}>
//                                       opt?.Minval == 0
//                                         ? `Under ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${formatter.format(opt?.Maxval)}`
//                                         : opt?.Maxval == 0
//                                           ? `Over ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${formatter.format(opt?.Minval)}`
//                                           : `${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${formatter.format(opt?.Minval)}
//                                                      - ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${formatter.format(opt?.Maxval)}`
//                                       // </div>
//                                     }
//                                   />
//                                 </div>
//                               )
//                             )}
//                           </AccordionDetails>
//                         </Accordion>
//                       )}
//                       {ele?.Name?.includes("Diamond") && (
//                         <Accordion
//                           elevation={0}
//                           sx={{
//                             borderBottom: "1px solid #c7c8c9",
//                             borderRadius: 0,
//                             "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
//                               borderBottomLeftRadius: "0px",
//                               borderBottomRightRadius: "0px",
//                             },
//                             "&.MuiPaper-root.MuiAccordion-root:before": {
//                               background: "none",
//                             },
//                           }}
//                         // expanded={accExpanded}
//                         // defaultExpanded={}
//                         >
//                           <AccordionSummary
//                             expandIcon={
//                               <ExpandMoreIcon sx={{ width: "20px" }} />
//                             }
//                             aria-controls="panel1-content"
//                             id="panel1-header"
//                             sx={{
//                               color: "#7f7d85",
//                               borderRadius: 0,

//                               "&.MuiAccordionSummary-root": {
//                                 padding: 0,
//                               },
//                             }}
//                             // className="filtercategoryLable"
//                             onClick={() => handleScrollHeight()}
//                           >
//                             {/* <span> */}
//                             {ele.Fil_DisName}
//                             {/* </span> */}
//                           </AccordionSummary>
//                           <AccordionDetails
//                             sx={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "4px",
//                               minHeight: "fit-content",
//                               maxHeight: "300px",
//                               overflow: "auto",
//                             }}
//                           >
//                             {/* {console.log("RangeEle",JSON?.parse(ele?.options)[0])} */}
//                             <Box sx={{ width: "94%", height: 88 }}>
//                               {RangeFilterView(ele)}
//                             </Box>
//                           </AccordionDetails>
//                         </Accordion>
//                       )}
//                       {ele?.Name?.includes("NetWt") && (
//                         <Accordion
//                           elevation={0}
//                           sx={{
//                             borderBottom: "1px solid #c7c8c9",
//                             borderRadius: 0,
//                             "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
//                               borderBottomLeftRadius: "0px",
//                               borderBottomRightRadius: "0px",
//                             },
//                             "&.MuiPaper-root.MuiAccordion-root:before": {
//                               background: "none",
//                             },
//                           }}
//                         // expanded={accExpanded}
//                         // defaultExpanded={}
//                         >
//                           <AccordionSummary
//                             expandIcon={
//                               <ExpandMoreIcon sx={{ width: "20px" }} />
//                             }
//                             aria-controls="panel1-content"
//                             id="panel1-header"
//                             sx={{
//                               color: "#7f7d85",
//                               borderRadius: 0,

//                               "&.MuiAccordionSummary-root": {
//                                 padding: 0,
//                               },
//                             }}
//                             // className="filtercategoryLable"
//                             onClick={() => handleScrollHeight()}
//                           >
//                             {/* <span> */}
//                             {ele.Fil_DisName}
//                             {/* </span> */}
//                           </AccordionSummary>
//                           <AccordionDetails
//                             sx={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "4px",
//                               minHeight: "fit-content",
//                               maxHeight: "300px",
//                               overflow: "auto",
//                             }}
//                           >
//                             {/* {console.log("RangeEle",JSON?.parse(ele?.options)[0])} */}
//                             <Box sx={{ width: "94%", height: 88 }}>
//                               {RangeFilterView1(ele)}
//                             </Box>
//                           </AccordionDetails>
//                         </Accordion>
//                       )}
//                       {ele?.Name?.includes("Gross") && (
//                         <Accordion
//                           elevation={0}
//                           sx={{
//                             borderBottom: "1px solid #c7c8c9",
//                             borderRadius: 0,
//                             "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
//                               borderBottomLeftRadius: "0px",
//                               borderBottomRightRadius: "0px",
//                             },
//                             "&.MuiPaper-root.MuiAccordion-root:before": {
//                               background: "none",
//                             },
//                           }}
//                         // expanded={accExpanded}
//                         // defaultExpanded={}
//                         >
//                           <AccordionSummary
//                             expandIcon={
//                               <ExpandMoreIcon sx={{ width: "20px" }} />
//                             }
//                             aria-controls="panel1-content"
//                             id="panel1-header"
//                             sx={{
//                               color: "#7f7d85",
//                               borderRadius: 0,

//                               "&.MuiAccordionSummary-root": {
//                                 padding: 0,
//                               },
//                             }}
//                             // className="filtercategoryLable"
//                             onClick={() => handleScrollHeight()}
//                           >
//                             {/* <span> */}
//                             {ele.Fil_DisName}
//                             {/* </span> */}
//                           </AccordionSummary>
//                           <AccordionDetails
//                             sx={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "4px",
//                               minHeight: "fit-content",
//                               maxHeight: "300px",
//                               overflow: "auto",
//                             }}
//                           >
//                             <Box sx={{ width: "94%", height: 88 }}>
//                               {RangeFilterView2(ele)}
//                             </Box>
//                           </AccordionDetails>
//                         </Accordion>
//                       )}
//                     </>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </Drawer>
//         <div className="proCat_bodyContain">
//           <div className="proCat_outerContain">
//             <div className="proCat_whiteInnerContain">
//               {isProdLoading ? (
//                 // true ?
//                 <ProductListSkeleton className="pSkelton" />
//               ) : (
//                 <>
//                   {!minwidth1201px ? (
//                     <div className="proCat_mobile_prodSorting">
//                       <div className="proCat_empty_sorting_div">
//                         <IoArrowBack
//                           style={{
//                             height: "25px",
//                             width: "25px",
//                             cursor: "pointer",
//                             color: "rgba(143, 140, 139, 0.9019607843)",
//                           }}
//                           onClick={() => navigate(-1)}
//                         />
//                       </div>

//                       {/* {filterData?.length > 0 && <Checkbox
//                         sx={{ padding: "0px 9px 0px 9px" }}
//                         icon={<FilterAltIcon fontSize="large" />}
//                         checkedIcon={
//                           <FilterAltOffIcon
//                             fontSize="large"
//                             style={{ color: "#666666" }}
//                           />
//                         }
//                         checked={isDrawerOpen}
//                         onChange={(e) => setIsDrawerOpen(e.target.value)}
//                       />
//                       } */}
//                     </div>
//                   ) : null
//                     // <div className="smr_prodSorting">
//                     //   <div className="empty_sorting_div">
//                     //     <span
//                     //       className="smr_breadcums_port "
//                     //       style={{ marginLeft: "72px" }}
//                     //       onClick={() => {
//                     //         navigate("/");
//                     //       }}
//                     //     >
//                     //       {"Home >"}{" "}
//                     //     </span>

//                     //     {location?.search.charAt(1) == "A" && (
//                     //       <div
//                     //         className="smr_breadcums_port"
//                     //         style={{ marginLeft: "3px" }}
//                     //       >
//                     //         <span>{"Album"}</span>
//                     //       </div>
//                     //     )}

//                     //     {location?.search.charAt(1) == "T" && (
//                     //       <div
//                     //         className="smr_breadcums_port"
//                     //         style={{ marginLeft: "3px" }}
//                     //       >
//                     //         <span>{"Trending"}</span>
//                     //       </div>
//                     //     )}

//                     //     {location?.search.charAt(1) == "B" && (
//                     //       <div
//                     //         className="smr_breadcums_port"
//                     //         style={{ marginLeft: "3px" }}
//                     //       >
//                     //         <span>{"Best Seller"}</span>
//                     //       </div>
//                     //     )}

//                     //     {location?.search.charAt(1) == "N" && (
//                     //       <div
//                     //         className="smr_breadcums_port"
//                     //         style={{ marginLeft: "3px" }}
//                     //       >
//                     //         <span>{"New Arrival"}</span>
//                     //       </div>
//                     //     )}

//                     //     {IsBreadCumShow && (
//                     //       <div
//                     //         className="smr_breadcums_port"
//                     //         style={{ marginLeft: "3px" }}
//                     //       >
//                     //         {menuParams?.menuname && (
//                     //           <span
//                     //             onClick={() =>
//                     //               handleBreadcums({
//                     //                 [menuParams?.FilterKey]:
//                     //                   menuParams?.FilterVal,
//                     //               })
//                     //             }
//                     //           >
//                     //             {menuParams?.menuname}
//                     //           </span>
//                     //         )}

//                     //         {menuParams?.FilterVal1 && (
//                     //           <span
//                     //             onClick={() =>
//                     //               handleBreadcums({
//                     //                 [menuParams?.FilterKey]:
//                     //                   menuParams?.FilterVal,
//                     //                 [menuParams?.FilterKey1]:
//                     //                   menuParams?.FilterVal1,
//                     //               })
//                     //             }
//                     //           >
//                     //             {` > ${menuParams?.FilterVal1}`}
//                     //           </span>
//                     //         )}

//                     //         {menuParams?.FilterVal2 && (
//                     //           <span
//                     //             onClick={() =>
//                     //               handleBreadcums({
//                     //                 [menuParams?.FilterKey]:
//                     //                   menuParams?.FilterVal,
//                     //                 [menuParams?.FilterKey1]:
//                     //                   menuParams?.FilterVal1,
//                     //                 [menuParams?.FilterKey2]:
//                     //                   menuParams?.FilterVal2,
//                     //               })
//                     //             }
//                     //           >
//                     //             {` > ${menuParams?.FilterVal2}`}
//                     //           </span>
//                     //         )}

//                     //         {/* {
//                     //           decodeURIComponent(location?.pathname)?.slice(3)?.slice(0,-1)?.split("/")?.map((ele,i)=>(
//                     //               (i !== 2 && <span
//                     //                 onClick={() =>
//                     //                   handleBreadcums({
//                     //                     [menuParams?.FilterKey]:
//                     //                       menuParams?.FilterVal,
//                     //                   })
//                     //                 }
//                     //               >
//                     //                 {ele} {i !== decodeURIComponent(location?.pathname)?.slice(3)?.slice(0,-1)?.split("/")[decodeURIComponent(location?.pathname)?.slice(3)?.slice(0,-1)?.split("/")?.length-1] && ">"} {" "}
//                     //               </span>)
//                     //           ))
//                     //         } */}
//                     //       </div>
//                     //     )}
//                     //   </div>

//                     // <div className="smr_main_sorting_div">
//                     //   <div className="smr_metal_custom">
//                     //     <label className="label">Metal:&nbsp;</label>
//                     //     <select
//                     //       className="select"
//                     //       value={selectedMetalId}
//                     //       onChange={(e) => setSelectedMetalId(e.target.value)}
//                     //     >
//                     //       {metalTypeCombo?.map((metalele, i) => (
//                     //         <option
//                     //           className="option"
//                     //           key={i}
//                     //           value={metalele?.Metalid}
//                     //         >
//                     //           {metalele?.metaltype.toUpperCase()}
//                     //         </option>
//                     //       ))}
//                     //     </select>
//                     //   </div>

//                     //   {storeInit?.IsDiamondCustomization === 1 && (
//                     //     <div className="smr_dia_custom">
//                     //       <label className="label">Diamond:&nbsp;</label>
//                     //       <select
//                     //         className="select"
//                     //         value={selectedDiaId}
//                     //         onChange={(e) => setSelectedDiaId(e.target.value)}
//                     //       >
//                     //         {diaQcCombo?.map((diaQc, i) => (
//                     //           <option
//                     //             className="option"
//                     //             key={i}
//                     //             value={`${diaQc?.QualityId},${diaQc?.ColorId}`}
//                     //           >
//                     //             {" "}
//                     //             {`${diaQc.Quality.toUpperCase()},${diaQc.color.toLowerCase()}`}
//                     //           </option>
//                     //         ))}
//                     //       </select>
//                     //     </div>
//                     //   )}

//                     //   {storeInit?.IsCsCustomization === 1 && (
//                     //     <div className="smr_cs_custom">
//                     //       <label className="label">color stone:&nbsp;</label>
//                     //       <select
//                     //         className="select"
//                     //         value={selectedCsId}
//                     //         onChange={(e) => setSelectedCsId(e.target.value)}
//                     //       >
//                     //         {csQcCombo?.map((csCombo, i) => (
//                     //           <option
//                     //             className="option"
//                     //             key={i}
//                     //             value={`${csCombo?.QualityId},${csCombo?.ColorId}`}
//                     //           >
//                     //             {" "}
//                     //             {`${csCombo.Quality.toUpperCase()},${csCombo.color.toLowerCase()}`}
//                     //           </option>
//                     //         ))}
//                     //       </select>
//                     //     </div>
//                     //   )}

//                     //   <div className="smr_sorting_custom">
//                     //     <div className="container">
//                     //       <label className="label">Sort By:&nbsp;</label>
//                     //       <select
//                     //         className="select"
//                     //         value={sortBySelect}
//                     //         onChange={(e) => handleSortby(e)}
//                     //       >
//                     //         <option className="option" value="Recommended">
//                     //           Recommended
//                     //         </option>
//                     //         <option className="option" value="New">
//                     //           New
//                     //         </option>
//                     //         <option className="option" value="Trending">
//                     //           Trending
//                     //         </option>
//                     //         <option className="option" value="In Stock">
//                     //           In stock
//                     //         </option>
//                     //         <option
//                     //           className="option"
//                     //           value="PRICE HIGH TO LOW"
//                     //         >
//                     //           Price High To Low
//                     //         </option>
//                     //         <option
//                     //           className="option"
//                     //           value="PRICE LOW TO HIGH"
//                     //         >
//                     //           Price Low To High
//                     //         </option>
//                     //       </select>
//                     //     </div>
//                     //   </div>
//                     // </div>
//                     // </div>
//                   }

//                   <div className="smr_mainPortion">
//                     <div
//                       className="smr_filter_portion"
//                       style={{ marginTop: "20px", width: filterData?.length <= 0 && '0%', display:'none',width:'0%'}}
//                     >
//                       {filterData?.length > 0 && <div
//                         className="proCat_topTitleList"
//                         style={{ display: "flex", alignItems: "center" }}
//                       >
//                         <div className="proCat_mpty_sorting_div">
//                           <IoArrowBack
//                             style={{
//                               height: "25px",
//                               width: "25px",
//                               cursor: "pointer",
//                               color: "rgba(143, 140, 139, 0.9019607843)",
//                             }}
//                             onClick={() => navigate("/")}
//                           />
//                         </div>
//                         <p className="proCat_NameTopShow">
//                           {/* {decodeURI(extractedPart)} */}
//                           {/* {decodeURI(atob(extractedPart))} */}
//                           {decodeURIComponent(location.pathname?.split("/p/")[1].split("/")[0])}
//                         </p>
//                       </div>
//                       }
//                       {filterData?.length > 0 && (
//                         <div className="smr_filter_portion_outter">
//                           <span className="smr_filter_text">
//                             <span>
//                               {Object.values(filterChecked).filter(
//                                 (ele) => ele.checked
//                               )?.length === 0 ? (
//                                 "Filters"
//                               ) : (
//                                 // ? <span style={{display:'flex',justifyContent:'space-between'}}><span>{"Filters"}</span> <span>{`Total Products : ${afterFilterCount}`}</span></span>
//                                 <>
//                                   {/* {afterCountStatus == true ? (
//                                     <Skeleton
//                                       variant="rounded"
//                                       width={140}
//                                       height={22}
//                                       className="pSkelton"
//                                     />
//                                   ) : ( */}
//                                   <span>{`Product Found: ${afterFilterCount}`}</span>
//                                   {/* )} */}
//                                 </>
//                               )}
//                             </span>
//                             <span onClick={() => handelFilterClearAll()}>
//                               {Object.values(filterChecked).filter(
//                                 (ele) => ele.checked
//                               )?.length > 0 ? (
//                                 "Clear All"
//                               ) : (
//                                 <>
//                                   {/* {afterCountStatus == true ? (
//                                     <Skeleton
//                                       variant="rounded"
//                                       width={140}
//                                       height={22}
//                                       className="pSkelton"
//                                     />
//                                   ) : ( */}
//                                   <span>{`Total Products : ${afterFilterCount}`}</span>
//                                   {/* )} */}
//                                 </>
//                               )}
//                             </span>
//                           </span>
//                           <div style={{ marginTop: "12px" }}>
//                             {filterData?.map((ele) => (
//                               <>
//                                 {!ele?.id?.includes("Range") &&
//                                   !ele?.id?.includes("Price") && (
//                                     <Accordion
//                                       elevation={0}
//                                       sx={{
//                                         borderBottom: "1px solid #c7c8c9",
//                                         borderRadius: 0,
//                                         "&.MuiPaper-root.MuiAccordion-root:last-of-type":
//                                         {
//                                           borderBottomLeftRadius: "0px",
//                                           borderBottomRightRadius: "0px",
//                                         },
//                                         "&.MuiPaper-root.MuiAccordion-root:before":
//                                         {
//                                           background: "none",
//                                         },
//                                       }}
//                                     // expanded={accExpanded}
//                                     // defaultExpanded={}
//                                     >
//                                       <AccordionSummary
//                                         expandIcon={
//                                           <ExpandMoreIcon
//                                             sx={{ width: "20px" }}
//                                           />
//                                         }
//                                         aria-controls="panel1-content"
//                                         id="panel1-header"
//                                         sx={{
//                                           color: "#7d7f85",
//                                           borderRadius: 0,

//                                           "&.MuiAccordionSummary-root": {
//                                             padding: 0,
//                                           },
//                                         }}
//                                         // className="filtercategoryLable"
//                                         onClick={() => handleScrollHeight()}
//                                       >
//                                         {/* <span> */}
//                                         {ele.Fil_DisName}
//                                         {/* </span> */}
//                                       </AccordionSummary>
//                                       <AccordionDetails
//                                         sx={{
//                                           display: "flex",
//                                           flexDirection: "column",
//                                           gap: "4px",
//                                           minHeight: "fit-content",
//                                           maxHeight: "300px",
//                                           overflow: "auto",
//                                         }}
//                                       >
//                                         {(JSON.parse(ele?.options) ?? []).map(
//                                           (opt) => (
//                                             <div
//                                               style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 justifyContent: "space-between",
//                                                 gap: "12px",
//                                               }}
//                                               key={opt?.id}
//                                             >
//                                               {/* <small
//                                         style={{
//                                           fontFamily: "TT Commons, sans-serif",
//                                           color: "#7f7d85",
//                                         }}
//                                       >
//                                         {opt.Name}
//                                       </small> */}
//                                               <FormControlLabel
//                                                 control={
//                                                   <Checkbox
//                                                     name={`${ele?.id}${opt?.id}`}
//                                                     // checked={
//                                                     //   filterChecked[`checkbox${index + 1}${i + 1}`]
//                                                     //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
//                                                     //     : false
//                                                     // }
//                                                     checked={
//                                                       filterChecked[
//                                                         `${ele?.id}${opt?.id}`
//                                                       ]?.checked === undefined
//                                                         ? false
//                                                         : filterChecked[
//                                                           `${ele?.id}${opt?.id}`
//                                                         ]?.checked
//                                                     }
//                                                     style={{
//                                                       color:
//                                                         "#7f7d85 !important",
//                                                       padding: 0,
//                                                       width: "10px",
//                                                     }}
//                                                     onClick={(e) =>
//                                                       handleCheckboxChange(
//                                                         e,
//                                                         ele?.id,
//                                                         opt?.Name
//                                                       )
//                                                     }
//                                                     size="small"
//                                                   />
//                                                 }
//                                                 // sx={{
//                                                 //   display: "flex",
//                                                 //   justifyContent: "space-between", // Adjust spacing between checkbox and label
//                                                 //   width: "100%",
//                                                 //   flexDirection: "row-reverse", // Align items to the right
//                                                 //   fontFamily:'TT Commons Regular'
//                                                 // }}
//                                                 className="smr_mui_checkbox_label"
//                                                 label={opt.Name}
//                                               />
//                                             </div>
//                                           )
//                                         )}
//                                       </AccordionDetails>
//                                     </Accordion>
//                                   )}
//                                 {ele?.id?.includes("Price") && (
//                                   <Accordion
//                                     elevation={0}
//                                     sx={{
//                                       borderBottom: "1px solid #c7c8c9",
//                                       borderRadius: 0,
//                                       "&.MuiPaper-root.MuiAccordion-root:last-of-type":
//                                       {
//                                         borderBottomLeftRadius: "0px",
//                                         borderBottomRightRadius: "0px",
//                                       },
//                                       "&.MuiPaper-root.MuiAccordion-root:before":
//                                       {
//                                         background: "none",
//                                       },
//                                     }}
//                                   // expanded={accExpanded}
//                                   // defaultExpanded={}
//                                   >
//                                     <AccordionSummary
//                                       expandIcon={
//                                         <ExpandMoreIcon
//                                           sx={{ width: "20px" }}
//                                         />
//                                       }
//                                       aria-controls="panel1-content"
//                                       id="panel1-header"
//                                       sx={{
//                                         color: "#7f7d85",
//                                         borderRadius: 0,

//                                         "&.MuiAccordionSummary-root": {
//                                           padding: 0,
//                                         },
//                                       }}
//                                       // className="filtercategoryLable"
//                                       onClick={() => handleScrollHeight()}
//                                     >
//                                       {/* <span> */}
//                                       {ele.Fil_DisName}
//                                       {/* </span> */}
//                                     </AccordionSummary>
//                                     <AccordionDetails
//                                       sx={{
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         gap: "4px",
//                                         minHeight: "fit-content",
//                                         maxHeight: "300px",
//                                         overflow: "auto",
//                                       }}
//                                     >
//                                       {(JSON.parse(ele?.options) ?? []).map(
//                                         (opt, i) => (
//                                           <div
//                                             style={{
//                                               display: "flex",
//                                               alignItems: "center",
//                                               justifyContent: "space-between",
//                                               gap: "12px",
//                                             }}
//                                             key={i}
//                                           >
//                                             {/* <small
//                                         style={{
//                                           fontFamily: "TT Commons, sans-serif",
//                                           color: "#7f7d85",
//                                         }}
//                                       >
//                                         {opt.Name}
//                                       </small> */}
//                                             <FormControlLabel
//                                               control={
//                                                 <Checkbox
//                                                   name={`Price${i}${i}`}
//                                                   // checked={
//                                                   //   filterChecked[`checkbox${index + 1}${i + 1}`]
//                                                   //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
//                                                   //     : false
//                                                   // }
//                                                   checked={
//                                                     filterChecked[
//                                                       `Price${i}${i}`
//                                                     ]?.checked === undefined
//                                                       ? false
//                                                       : filterChecked[
//                                                         `Price${i}${i}`
//                                                       ]?.checked
//                                                   }
//                                                   style={{
//                                                     color: "#7f7d85",
//                                                     padding: 0,
//                                                     width: "10px",
//                                                   }}
//                                                   onClick={(e) =>
//                                                     handleCheckboxChange(
//                                                       e,
//                                                       ele?.id,
//                                                       opt
//                                                     )
//                                                   }
//                                                   size="small"
//                                                 />
//                                               }
//                                               // sx={{
//                                               //   display: "flex",
//                                               //   justifyContent: "space-between", // Adjust spacing between checkbox and label
//                                               //   width: "100%",
//                                               //   flexDirection: "row-reverse", // Align items to the right
//                                               //   fontFamily:'TT Commons Regular'
//                                               // }}
//                                               className="smr_mui_checkbox_label"
//                                               label={
//                                                 opt?.Minval == 0
//                                                   ? `Under ${loginUserDetail?.CurrencyCode ??
//                                                   storeInit?.CurrencyCode
//                                                   } ${opt?.Maxval}`
//                                                   : opt?.Maxval == 0
//                                                     ? `Over ${loginUserDetail?.CurrencyCode ??
//                                                     storeInit?.CurrencyCode
//                                                     } ${opt?.Minval}`
//                                                     : `${loginUserDetail?.CurrencyCode ??
//                                                     storeInit?.CurrencyCode
//                                                     } ${opt?.Minval}
//                                                     - ${loginUserDetail?.CurrencyCode ??
//                                                     storeInit?.CurrencyCode
//                                                     } ${opt?.Maxval}`
//                                               }
//                                             />
//                                           </div>
//                                         )
//                                       )}
//                                     </AccordionDetails>
//                                   </Accordion>
//                                 )}
//                                 {ele?.Name?.includes("Diamond") && (
//                                   <Accordion
//                                     elevation={0}
//                                     sx={{
//                                       borderBottom: "1px solid #c7c8c9",
//                                       borderRadius: 0,
//                                       "&.MuiPaper-root.MuiAccordion-root:last-of-type":
//                                       {
//                                         borderBottomLeftRadius: "0px",
//                                         borderBottomRightRadius: "0px",
//                                       },
//                                       "&.MuiPaper-root.MuiAccordion-root:before":
//                                       {
//                                         background: "none",
//                                       },
//                                     }}
//                                   // expanded={accExpanded}
//                                   // defaultExpanded={}
//                                   >
//                                     <AccordionSummary
//                                       expandIcon={
//                                         <ExpandMoreIcon
//                                           sx={{ width: "20px" }}
//                                         />
//                                       }
//                                       aria-controls="panel1-content"
//                                       id="panel1-header"
//                                       sx={{
//                                         color: "#7f7d85",
//                                         borderRadius: 0,

//                                         "&.MuiAccordionSummary-root": {
//                                           padding: 0,
//                                         },
//                                       }}
//                                       // className="filtercategoryLable"
//                                       onClick={() => handleScrollHeight()}
//                                     >
//                                       {/* <span> */}
//                                       {ele.Fil_DisName}
//                                       {/* </span> */}
//                                     </AccordionSummary>
//                                     <AccordionDetails
//                                       sx={{
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         gap: "4px",
//                                         minHeight: "fit-content",
//                                         maxHeight: "300px",
//                                         overflow: "auto",
//                                       }}
//                                     >
//                                       {/* {console.log("RangeEle",JSON?.parse(ele?.options)[0])} */}
//                                       <Box sx={{ width: '94%', height: 88 }}>
//                                         {RangeFilterView(ele)}
//                                       </Box>
//                                     </AccordionDetails>
//                                   </Accordion>
//                                 )}
//                                 {ele?.Name?.includes("NetWt") && (
//                                   <Accordion
//                                     elevation={0}
//                                     sx={{
//                                       borderBottom: "1px solid #c7c8c9",
//                                       borderRadius: 0,
//                                       "&.MuiPaper-root.MuiAccordion-root:last-of-type":
//                                       {
//                                         borderBottomLeftRadius: "0px",
//                                         borderBottomRightRadius: "0px",
//                                       },
//                                       "&.MuiPaper-root.MuiAccordion-root:before":
//                                       {
//                                         background: "none",
//                                       },
//                                     }}
//                                   // expanded={accExpanded}
//                                   // defaultExpanded={}
//                                   >
//                                     <AccordionSummary
//                                       expandIcon={
//                                         <ExpandMoreIcon
//                                           sx={{ width: "20px" }}
//                                         />
//                                       }
//                                       aria-controls="panel1-content"
//                                       id="panel1-header"
//                                       sx={{
//                                         color: "#7f7d85",
//                                         borderRadius: 0,

//                                         "&.MuiAccordionSummary-root": {
//                                           padding: 0,
//                                         },
//                                       }}
//                                       // className="filtercategoryLable"
//                                       onClick={() => handleScrollHeight()}
//                                     >
//                                       {/* <span> */}
//                                       {ele.Fil_DisName}
//                                       {/* </span> */}
//                                     </AccordionSummary>
//                                     <AccordionDetails
//                                       sx={{
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         gap: "4px",
//                                         minHeight: "fit-content",
//                                         maxHeight: "300px",
//                                         overflow: "auto",
//                                       }}
//                                     >
//                                       {/* {console.log("RangeEle",JSON?.parse(ele?.options)[0])} */}
//                                       <Box sx={{ width: "94%", height: 88 }}>
//                                         {RangeFilterView1(ele)}
//                                       </Box>
//                                     </AccordionDetails>
//                                   </Accordion>
//                                 )}
//                                 {ele?.Name?.includes("Gross") && (
//                                   <Accordion
//                                     elevation={0}
//                                     sx={{
//                                       borderBottom: "1px solid #c7c8c9",
//                                       borderRadius: 0,
//                                       "&.MuiPaper-root.MuiAccordion-root:last-of-type":
//                                       {
//                                         borderBottomLeftRadius: "0px",
//                                         borderBottomRightRadius: "0px",
//                                       },
//                                       "&.MuiPaper-root.MuiAccordion-root:before":
//                                       {
//                                         background: "none",
//                                       },
//                                     }}
//                                   // expanded={accExpanded}
//                                   // defaultExpanded={}
//                                   >
//                                     <AccordionSummary
//                                       expandIcon={
//                                         <ExpandMoreIcon
//                                           sx={{ width: "20px" }}
//                                         />
//                                       }
//                                       aria-controls="panel1-content"
//                                       id="panel1-header"
//                                       sx={{
//                                         color: "#7f7d85",
//                                         borderRadius: 0,

//                                         "&.MuiAccordionSummary-root": {
//                                           padding: 0,
//                                         },
//                                       }}
//                                       // className="filtercategoryLable"
//                                       onClick={() => handleScrollHeight()}
//                                     >
//                                       {/* <span> */}
//                                       {ele.Fil_DisName}
//                                       {/* </span> */}
//                                     </AccordionSummary>
//                                     <AccordionDetails
//                                       sx={{
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         gap: "4px",
//                                         minHeight: "fit-content",
//                                         maxHeight: "300px",
//                                         overflow: "auto",
//                                       }}
//                                     >
//                                       <Box className="smr_diamond_filter" sx={{ width: "94%", height: 88 }}>
//                                         {RangeFilterView2(ele)}
//                                       </Box>
//                                     </AccordionDetails>
//                                   </Accordion>
//                                 )}
//                               </>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     {filterProdListEmpty ? (
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "center",
//                           width: "75%",
//                           alignItems: "center",
//                           height: "500px",
//                         }}
//                       >
//                         <span className="smr_prod_datanotfound">
//                           Products Not found !!!
//                         </span>
//                       </div>
//                     ) : (
//                       // <div className="smr_productList" style={{ width: filterData?.length <= 0 && '100%', margin: filterData?.length <= 0 && '20px 50px 0px 65px' }}>
//                       <div className="procat_productList" style={{ width: '100%'}}>
//                         {isOnlyProdLoading ? (
//                           <ProductListSkeleton
//                             fromPage={"Prodlist"}
//                             className="pSkelton"
//                           />
//                         ) : (
//                           <>
//                             <div className="smr_main_sorting_div_proCat">
//                             <div
//                                   className="proCat_topTitleList"
//                                   style={{ display: "flex", alignItems: "center" }}
//                                 >
//                                   <div className="proCat_mpty_sorting_div_NoData">
//                                     <IoArrowBack
//                                       style={{
//                                         height: "25px",
//                                         width: "25px",
//                                         cursor: "pointer",
//                                         color: "rgba(143, 140, 139, 0.9019607843)",
//                                       }}
//                                       onClick={() => navigate("/")}
//                                     />
//                                   </div>
//                                   <p className="proCat_NameTopShow">
//                                     {/* {decodeURI(extractedPart)} */}
//                                     {decodeURIComponent(location.pathname?.split("/p/")[1].split("/")[0])}
//                                   </p>
//                                 </div>
//                               <div
//                                 className="proCat_topTitleList_mobile"
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <p
//                                   style={{
//                                     margin: "0px",
//                                     width: "100%",
//                                     fontWeight: 600,
//                                     color: "rgba(143, 140, 139, 0.9019607843)",
//                                   }}
//                                 >
//                                   {/* {decodeURI(extractedPart)} */}
//                                   {decodeURIComponent(location.pathname?.split("/p/")[1].split("/")[0])}
//                                 </p>
//                               </div>
//                               <div className={filterData?.length <= 0 ? "smr_sorting_custom_NoData" : "smr_sorting_custom"}
//                               >
//                                 {/* { <div
//                                   className="proCat_topTitleList"
//                                   style={{ display: "flex", alignItems: "center" }}
//                                 >
//                                   <div className="proCat_mpty_sorting_div_NoData">
//                                     <IoArrowBack
//                                       style={{
//                                         height: "25px",
//                                         width: "25px",
//                                         cursor: "pointer",
//                                         color: "rgba(143, 140, 139, 0.9019607843)",
//                                       }}
//                                       onClick={() => navigate("/")}
//                                     />
//                                   </div>
//                                   <p className="proCat_NameTopShow">
//                                     {decodeURIComponent(location.pathname?.split("/p/")[1].split("/")[0])}
//                                   </p>
//                                 </div>
//                                 } */}

//                                 <div className={filterData?.length <= 0 ? 'NoDatacontainer' : "container"}>
//                                   <label className="label">
//                                     Sort By:&nbsp;
//                                   </label>
//                                   <select
//                                     className="select"
//                                     value={sortBySelect}
//                                     onChange={(e) => handleSortby(e)}
//                                   >
//                                     <option
//                                       className="option"
//                                       value="Recommended"
//                                     >
//                                       Recommended
//                                     </option>
//                                     {/* <option className="option" value="New">
//                                       New
//                                     </option>
//                                     <option className="option" value="Trending">
//                                       Trending
//                                     </option> */}
//                                     {storeInit?.IsStockWebsite == 1 && (
//                                       <option
//                                         className="option"
//                                         value="In Stock"
//                                       >
//                                         In stock
//                                       </option>
//                                     )}
//                                     {/* {storeInit?.IsStockWebsite == 1 && ( */}
//                                     <option
//                                       className="option"
//                                       value="In memo"
//                                     >
//                                       In memo
//                                     </option>
//                                     {/*<option className="option" value="Bestseller">
//                                     Bestseller
//                                     </option>*/}
//                                     {/* )} */}
//                                     <option
//                                       className="option"
//                                       value="PRICE HIGH TO LOW"
//                                     >
//                                       Price High To Low
//                                     </option>
//                                     <option
//                                       className="option"
//                                       value="PRICE LOW TO HIGH"
//                                     >
//                                       Price Low To High
//                                     </option>
//                                   </select>
//                                 </div>
//                               </div>
//                             </div>
//                             <div
//                               className="smr_outer_portion"
//                               id="smr_outer_portion"
//                             >
//                               {/* <div className="smr_breadcums_port">{`${menuParams?.menuname || ''}${menuParams?.FilterVal1 ? ` > ${menuParams?.FilterVal1}` : ''}${menuParams?.FilterVal2 ? ` > ${menuParams?.FilterVal2}` : ''}`}</div> */}
//                               <div className="smr_inner_portion">
//                                 {finalProductListData?.map((productData, i) => (
//                                   <div className={filterData?.length <= 0 ? "smr_productCard_noFil" : "procat_productCard"}>

//                                     <div className="cart_and_wishlist_icon" style={{display:'none'}}>
//                                       {/* <Checkbox
//                                         icon={
//                                           <LocalMallOutlinedIcon
//                                             sx={{
//                                               fontSize: "22px",
//                                               color: "red",
//                                               opacity: ".7",
//                                             }}
//                                           />
//                                         }
//                                         checkedIcon={
//                                           <LocalMallIcon
//                                             sx={{
//                                               fontSize: "22px",
//                                               color: "red",
//                                             }}
//                                           />
//                                         }
//                                         disableRipple={false}
//                                         sx={{ padding: "10px" }}
//                                         onChange={(e) =>
//                                           handleCartandWish(
//                                             e,
//                                             productData,
//                                             "Cart"
//                                           )
//                                         }
//                                         checked={
//                                           cartArr[productData?.autocode] ??
//                                             productData?.IsInCart === 1
//                                             ? true
//                                             : false
//                                         }
//                                       /> */}
//                                       {/* Object.values(cartArr)?.length > 0 ? cartArr[productData?.autocode] : */}
//                                       {/* </Button> */}
//                                       {/* <Button className="smr_wish-icon"> */}
//                                       {/* <Checkbox
//                                         icon={
//                                           <StarBorderIcon
//                                             sx={{
//                                               fontSize: "22px",
//                                               color: "#7d7f85",
//                                               opacity: ".7",
//                                             }}
//                                           />
//                                         }
//                                         checkedIcon={
//                                           <StarIcon
//                                             sx={{
//                                               fontSize: "22px",
//                                               color: "#ffd200",
//                                             }}
//                                           />
//                                         }
//                                         disableRipple={false}
//                                         sx={{ padding: "10px" }}
//                                         onChange={(e) =>
//                                           handleCartandWish(
//                                             e,
//                                             productData,
//                                             "Wish"
//                                           )
//                                         }
//                                         checked={
//                                           wishArr[productData?.autocode] ??
//                                           productData?.IsInWish === 1
//                                             ? true
//                                             : false
//                                         }
//                                       /> */}
//                                       {/* </Button> */}
//                                     </div>

//                                     <div
//                                       onMouseEnter={() => {
//                                         handleImgRollover(productData);
//                                         if (productData?.VideoCount > 0) {
//                                           setIsRollOverVideo({
//                                             [productData?.autocode]: true,
//                                           });
//                                         } else {
//                                           setIsRollOverVideo({
//                                             [productData?.autocode]: false,
//                                           });
//                                         }
//                                       }}
//                                       onClick={() =>
//                                         handleMoveToDetail(productData)
//                                       }
//                                       onMouseLeave={() => {
//                                         handleLeaveImgRolloverImg(productData);
//                                         setIsRollOverVideo({
//                                           [productData?.autocode]: false,
//                                         });
//                                       }}
//                                       className="proCat_ImgandVideoContainer"
//                                       style={{position:'relative'}}
//                                     >
//                                       {isRollOverVideo[productData?.autocode] ==
//                                         true ? (
//                                         <video
//                                           //  src={"https://cdn.caratlane.com/media/catalog/product/J/R/JR03351-YGP600_16_video.mp4"}
//                                           src={
//                                             productData?.VideoCount > 0
//                                               ? (storeInit?.CDNDesignImageFol).slice(
//                                                 0,
//                                                 -13
//                                               ) +
//                                               "video/" +
//                                               productData?.designno +
//                                               "~" +
//                                               1 +
//                                               "." +
//                                               productData?.VideoExtension
//                                               : ""
//                                           }
//                                           loop={true}
//                                           autoPlay={true}
//                                           className="proCat_productCard_video"
//                                         // style={{objectFit:'cover',height:'412px',minHeight:'412px',width:'399px',minWidth:'399px'}}
//                                         />
//                                       ) : (
//                                         <img
//                                           className="proCat_productListCard_Image"
//                                           id={`smr_productListCard_Image${productData?.autocode}`}
//                                           // src={productData?.DefaultImageName !== "" ? storeInit?.CDNDesignImageFol+productData?.DesignFolderName+'/'+storeInit?.ImgMe+'/'+productData?.DefaultImageName : imageNotFound}
//                                           // src={ ProdCardImageFunc(productData,0)}
//                                           src={
//                                             rollOverImgPd[productData?.autocode]
//                                               ? rollOverImgPd[
//                                               productData?.autocode
//                                               ]
//                                               : productData?.images?.length > 0
//                                                 ? productData?.images[0]
//                                                 : imageNotFound
//                                           }
//                                           alt=""
//                                         // onClick={() =>
//                                         //   handleMoveToDetail(productData)
//                                         // }
//                                         // onMouseEnter={() => {
//                                         //   handleImgRollover(productData);
//                                         // }}
//                                         // onMouseLeave={() => {
//                                         //   handleLeaveImgRolloverImg(productData);
//                                         // }}
//                                         />
//                                       )}

//                                       <div className="proCat_app_product_label" style={{bottom:'0px'}}>
//                                       {productData?.StatusId == 1 ? (
//                                         <span className="proCat_app_instock">
//                                           In Stock
//                                         </span>
//                                       ) : productData?.StatusId == 2 ? (
//                                         <span className="proCat_app_MEMO">
//                                           In memo
//                                         </span>
//                                       ) : (
//                                         <span className="proCat_app_Make_to_order">
//                                           Make To Order
//                                         </span>
//                                       )}

//                                       {/* {productData?.StatusId == 1 && (
//                                         <span className="proCat_app_instock">
//                                           In Stock
//                                         </span>
//                                       )}
//                                       {productData?.StatusId == 2 && (
//                                         <span className="proCat_app_instock">
//                                           In memo
//                                         </span>
//                                       )} */}
//                                       {/* {productData?.IsBestSeller == 1 && <span className="smr_app_bestSeller">Best Seller</span>}
//                                         {productData?.IsTrending == 1 && <span className="smr_app_intrending">Trending</span>}
//                                         {productData?.IsNewArrival == 1 && <span className="smr_app_newarrival">New</span>} */}
//                                     </div>
//                                     </div>
//                                     <div className="proCat_prod_card_info">
//                                       <div className="smr_prod_Title">
//                                       <span className="proCat1_prod_title_with_no_width">
//                                           {productData?.designno} {productData?.TitleLine?.length > 0 && " - " + productData?.TitleLine}
//                                         </span>
//                                       </div>
//                                       <div className="proCat_prod_Allwt">
//                                         <div
//                                           style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             alignItems: "center",
//                                             letterSpacing: maxwidth590px
//                                               ? "0px"
//                                               : "1px",
//                                             flexWrap: "wrap",
//                                           }}
//                                         >
//                                           {storeInit?.IsGrossWeight == 1 &&
//                                             Number(productData?.Gwt) !== 0 && (
//                                               <span className="smr_prod_wt">
//                                                 <span className="smr_keys">
//                                                   GWT:
//                                                 </span>
//                                                 <span className="smr_val">
//                                                   {productData?.Gwt?.toFixed(3)}
//                                                 </span>
//                                               </span>
//                                             )}
//                                           {storeInit?.IsMetalWeight == 1 && Number(productData?.Nwt) !== 0 && (
//                                             <>
//                                               {(storeInit?.IsGrossWeight == 1 && storeInit?.IsMetalWeight == 1) ?<span style={{fontSize:'13px'}}>|</span>:""}
//                                               <span className="smr_prod_wt">
//                                                 <span className="smr_keys">
//                                                   NWT:
//                                                 </span>
//                                                 <span className="smr_val">
//                                                   {productData?.Nwt?.toFixed(3)}
//                                                 </span>
//                                               </span>
//                                             </>
//                                           )}
//                                           {storeInit?.IsDiamondWeight == 1 &&
//                                             Number(productData?.Dwt) !== 0 && (
//                                               <>
//                                                { (storeInit?.IsDiamondWeight == 1 && storeInit?.IsMetalWeight == 1) ?<span style={{fontSize:'13px'}}>|</span>:""}
//                                                 <span className="smr_prod_wt">
//                                                   <span className="smr_keys">
//                                                     DWT:
//                                                   </span>
//                                                   <span className="smr_val">
//                                                     {productData?.Dwt?.toFixed(3)}
//                                                     {storeInit?.IsDiamondPcs ===
//                                                       1
//                                                       ? `/${productData?.Dpcs}`
//                                                       : null}
//                                                   </span>
//                                                 </span>
//                                               </>
//                                             )}
//                                           {storeInit?.IsStoneWeight == 1 &&
//                                             Number(productData?.CSwt) !== 0 && (
//                                               <>
//                                                 {(storeInit?.IsStoneWeight == 1 && storeInit?.IsDiamondWeight == 1 )?<span style={{fontSize:'13px'}}>|</span>:""}
//                                                 <span className="smr_prod_wt">
//                                                   <span className="smr_keys">
//                                                     CWT:
//                                                   </span>
//                                                   <span className="smr_val">
//                                                     {productData?.CSwt?.toFixed(3)}
//                                                     {storeInit?.IsStonePcs === 1
//                                                       ? `/${productData?.CSpcs}`
//                                                       : null}
//                                                   </span>
//                                                 </span>
//                                               </>
//                                             )}
//                                           {/* </span> */}
//                                         </div>
//                                       </div>
//                                       <div className="proCat_prod_mtcolr_price">
//                                         {storeInit?.IsMetalTypeWithColor == 1 ? <span className="smr_prod_metal_col">
//                                           {findMetalColor(
//                                             productData?.MetalColorid
//                                           )?.[0]?.metalcolorname.toUpperCase()}
//                                           -
//                                           {
//                                             findMetalType(
//                                               productData?.IsMrpBase == 1
//                                                 ? productData?.MetalPurityid
//                                                 : selectedMetalId ??
//                                                 productData?.MetalPurityid
//                                             )[0]?.metaltype
//                                           }
//                                         </span> :  ""}
//                                         {
//                                           storeInit?.IsPriceShow == 1 &&
//                                           <>
//                                             {(storeInit?.IsPriceShow == 1 && storeInit?.IsMetalTypeWithColor == 1 )?<span>/</span>:""}
//                                             <span className="smr_price">
//                                               <span className="smr_currencyFont">
//                                                 {loginUserDetail?.CurrencyCode ??
//                                                   storeInit?.CurrencyCode}
//                                               </span>
//                                               <span className="smr_pricePort">
//                                                 {formatter.format(
//                                                   productData?.UnitCostWithMarkUp
//                                                 )}
//                                               </span>
//                                             </span>
//                                           </>
//                                         }
//                                       </div>
//                                     </div>
//                                     <FormControlLabel
//                                         control={
//                                           <Checkbox
//                                         icon={
//                                           <LocalMallOutlinedIcon
//                                             sx={{
//                                               fontSize: "22px",
//                                               color: "#594646",
//                                             }}
//                                           />
//                                         }
//                                         checkedIcon={
//                                           <LocalMallIcon
//                                             sx={{
//                                               fontSize: "22px",
//                                               color: "#474747d1",
//                                             }}
//                                           />
//                                           // <LocalMallIcon
//                                           //   sx={{
//                                           //     fontSize: "22px",
//                                           //     color: "red",
//                                           //   }}
//                                           // />
//                                         }
//                                         disableRipple={false}
//                                         onChange={(e) =>
//                                           handleCartandWish(
//                                             e,
//                                             productData,
//                                             "Cart"
//                                           )
//                                         }
//                                         checked={
//                                           cartArr[productData?.autocode] ??
//                                             productData?.IsInCart === 1
//                                             ? true
//                                             : false
//                                         }
//                                       />
//                                         }
//                                         label={ !(cartArr[productData?.autocode] ??
//                                           productData?.IsInCart === 1
//                                           ? true
//                                           : false) ? <span style={{ color: '#594646' }}>Add To Cart</span> : <span style={{ color: '#474747d1' }}>Remove From Cart</span> }

//                                         // sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#474747d1',marginLeft:'0px',color:'white'}}
//                                         className={!(cartArr[productData?.autocode] ??
//                                           productData?.IsInCart === 1
//                                           ? true
//                                           : false) ? "procat_cart_btn" :"procat_cart_btn_alter"}
//                                       />
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                             {storeInit?.IsProductListPagination == 1 &&
//                               Math.ceil(afterFilterCount / storeInit.PageSize) >
//                               1 && (
//                                 <div
//                                   style={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     marginTop: "5%",
//                                     width: "100%",
//                                   }}
//                                   className="smr_pagination_portion"
//                                 >
//                                   <Pagination
//                                     count={Math.ceil(
//                                       afterFilterCount / storeInit.PageSize
//                                     )}
//                                     size={maxwidth464px ? "small" : "large"}
//                                     shape="circular"
//                                     onChange={handelPageChange}
//                                     page={currPage}
//                                     showFirstButton
//                                     showLastButton
//                                   />
//                                 </div>
//                               )}
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//           {/* <div className="smr_backtotop">
//               BACK TO TOP
//         </div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductList;
