import React, { useCallback, useEffect, useState } from "react";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import { useLocation, useNavigate } from "react-router-dom";
import imageNotFound from "../../../Assets/image-not-found.jpg";
import Cookies from "js-cookie";
import "./ProductList.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ProductListSkeleton from "../../../../../DaimondTine/Components/Pages/Product/ProductList/productlist_skeleton/ProductListSkeleton";
import Pako from "pako";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { dt_CartCount, dt_WishCount } from "../../../Recoil/atom";
import { useSetRecoilState } from "recoil";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Footer from "../../Home/Footer/Footer";
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import GoogleAnalytics from 'react-ga4'

const ProductList = () => {
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const formatter = new Intl.NumberFormat('en-IN')

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

  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const [productListData, setProductListData] = useState([]);
  const [finalProductListData, setFinalProductListData] = useState([]);
  const [storeInit, setStoreInit] = useState({});
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [diaQcCombo, setDiaQcCombo] = useState([]);
  const [csQcCombo, setCsQcCombo] = useState([]);
  const [selectedMetalId, setSelectedMetalId] = useState(
    loginUserDetail?.MetalId ?? storeInit?.MetalId
  );
  const [selectedDiaId, setSelectedDiaId] = useState(
    loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid
  );
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid);
  const [isProdLoading, setIsProdLoading] = useState(true);
  const [prodListType, setprodListType] = useState();
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [filterData, setFilterData] = useState([]);
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
  const [locationKey, setLocationKey] = useState();
  const [menuData, setMenuData] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [filterChecked, setFilterChecked] = useState({});
  const [sortBySelect, setSortBySelect] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [filterProdListEmpty, setFilterProdListEmpty] = useState(false);
  const [loginInfo, setLoginInfo] = useState();
  const [rollOverImgPd, setRolloverImgPd] = useState({});
  const [isRollOverVideo, setIsRollOverVideo] = useState({});
  const [cartArr, setCartArr] = useState({});
  const [wishArr, setWishArr] = useState({});
  let maxwidth464px = useMediaQuery('(max-width:464px)')

  const [sliderValue, setSliderValue] = useState([]);
  const [sliderValue1, setSliderValue1] = useState([]);
  const [sliderValue2, setSliderValue2] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(-1)
  const [customFlag, setCustomFlag] = useState(false);

  const [afterCountStatus, setAfterCountStatus] = useState(false);
  const setCartCountVal = useSetRecoilState(dt_CartCount);
  const setWishCountVal = useSetRecoilState(dt_WishCount);
  let location = useLocation();
  let navigate = useNavigate();

  let cookie = Cookies.get("visiterId");


  let maxwidth1483 = useMediaQuery('(max-width:1483px)')

  let menuList = JSON.parse(sessionStorage.getItem("menuparams"));
  // useEffect(()=>{
  //   setMenuData(menuList)
  // },[])

  useEffect(() => {
    setSelectedMetalId(loginUserDetail?.MetalId ?? storeInit?.MetalId);
    setSelectedDiaId(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
  }, [location?.key])


  useEffect(() => {

    let loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));

    if (Object?.keys(loginUserDetail ?? {})?.length > 0) {
      setSelectedMetalId(loginUserDetail?.MetalId)
      setSelectedDiaId(loginUserDetail?.cmboDiaQCid)
      setSelectedCsId(loginUserDetail?.cmboCSQCid)
    } else {
      setSelectedMetalId(storeInit?.MetalId)
      setSelectedDiaId(storeInit?.cmboDiaQCid)
      setSelectedCsId(storeInit?.cmboCSQCid)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

      let UrlVal = location?.search.slice(1).split("/");

      // console.log("URLVal", UrlVal);

      let MenuVal = "";
      let MenuKey = "";
      let SearchVar = "";
      let TrendingVar = "";
      let NewArrivalVar = "";
      let BestSellerVar = "";
      let AlbumVar = "";

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
      //  if(location?.state?.SearchVal === undefined){
      setprodListType(productlisttype);
      await ProductListApi({}, 1, obj, productlisttype, cookie)
        .then((res) => {
          if (res) {
            // console.log("productList", res);
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
          }
          return res;
        })
        // .then( async(res) => {
        //   let forWardResp;
        //   if (res) {
        //     await GetPriceListApi(1,{},{},res?.pdResp?.rd1[0]?.AutoCodeList,obj,productlisttype).then((resp)=>{
        //       if(resp){
        //        console.log("productPriceData",resp);

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

                // console.log("diafilter",diafilter);
                setSliderValue([diafilter?.Min, diafilter?.Max]);
                setSliderValue1([diafilter1?.Min, diafilter1?.Max]);
                setSliderValue2([diafilter2?.Min, diafilter2?.Max]);

                forWardResp1 = res;
              })
              .catch((err) => console.log("err", err));
          }
          return forWardResp1;
        })
        .finally(() => {
          setIsProdLoading(false);
          setIsOnlyProdLoading(false);
          // window.scroll({
          //   top: 0,
          //   behavior: "smooth",
          // });
        })
        .catch((err) => console.log("err", err));
    };

    fetchData();

    if (location?.key) {
      setLocationKey(location?.key);
    }

    setCurrPage(1)
  }, [location?.key]);

  // useEffect(() => {
  //   const finalProdWithPrice = productListData?.map((product) => {
  //     let pdImgList = [];

  //     if (product?.ImageCount > 0) {
  //       for (let i = 1; i <= product?.ImageCount; i++) {
  //         let imgString =
  //           // storeInit?.DesignImageFol +
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

  //     return {
  //       ...product,
  //       images,
  //     };
  //   });

  //   setFinalProductListData(finalProdWithPrice);
  // }, [productListData]);

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

    const timer = setTimeout(() => {
      const updateData = productListData?.map((product) => ({
        ...product,
        images: generateImageList(product),
        loading: false,
      }));

      setFinalProductListData(updateData);
    }, 1);

    return () => clearTimeout(timer);

  }, [productListData, generateImageList]);

  // useEffect(() => {
  //   const initialProducts = productListData?.map(product => ({
  //     ...product,
  //     images: [],
  //     loading: true
  //   }))
  //   setFinalProductListData(initialProducts)
  //   setLoadingIndex(0)
  // }, [productListData])

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

  //   const timer = setTimeout(loadNextProductImages, 5)
  //   return () => clearTimeout(timer)
  // }, [loadingIndex, finalProductListData, generateImageList])


  const BreadCumsObj = () => {
    let BreadCum = decodeURI(atob(location?.search.slice(3))).split("/");
    const values = BreadCum[0]?.split(",");
    const labels = BreadCum[1]?.split(",");

    const updatedBreadCum = labels?.reduce((acc, label, index) => {
      acc[label] = values[index] || "";
      return acc;
    }, {});
    let result = {};
    if (updatedBreadCum) {
      result = Object.entries(updatedBreadCum)?.reduce((acc, [key, value], index) => {
        acc[`FilterKey${index === 0 ? "" : index}`] = key.charAt(0).toUpperCase() + key.slice(1);
        acc[`FilterVal${index === 0 ? "" : index}`] = value;
        return acc;
      },
        {}
      );
    }


    // decodeURI(location?.pathname).slice(3).slice(0,-1).split("/")[0]
    if (location?.search.charAt(1) == "A" || location?.search.charAt(1) == "N" || location?.search.charAt(1) == "B" || location?.search.charAt(1) == "T") {
      return;
    } else {
      result.menuname = decodeURI(location?.pathname)?.slice(3)?.slice(0, -1)?.split("/")[0];
    }

    return result;
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

  const handleCheckboxChange = (e, listname, val) => {
    const { name, checked } = e.target;
    setAfterCountStatus(true);

    // console.log("output filterCheckedVal",{checked,type:listname,id:name.replace(/[a-zA-Z]/g, ''),value:val});

    // console.log("output filterCheckedVal",e, listname, val);

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

    const formatCheckboxData = (data) => {
      return Object.values(data)
        .filter(item => item.checked)
        .map(item => ({ id: item.id, type: item.type, value: item.value }))
        .reduce((acc, curr) => {
          acc[curr.type] = acc[curr.type] || [];
          acc[curr.type].push(curr);
          return acc;
        }, {});
    };

    const formattedData = formatCheckboxData(filterChecked);
    const labelString = JSON?.stringify(formattedData);
    const labelSizeLimit = 2000;

    const eventLabel = labelString?.length > labelSizeLimit ?
      labelString?.substring(0, labelSizeLimit) + '...' :
      labelString;

    GoogleAnalytics.event({
      action: "Product Listing Filter",
      category: `Filter Interaction Through Product Listing && Filter by User ${loginUserDetail?.firstname}`,
      label: eventLabel,
      value: loginUserDetail?.firstname ?? 'User Not Login',
    });

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
    setCurrPage(1);

    return output;
  };

  const handleRangeFilterApi = async (Rangeval) => {
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    // let diafilter = JSON.parse(filterData?.filter((ele)=>ele?.Name == "Diamond")[0]?.options)[0]
    let diafilter1 = JSON.parse(
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
    )[0];
    let diafilter2 = JSON.parse(
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
    )[0];

    let DiaRange = { DiaMin: Rangeval[0], DiaMax: Rangeval[1] }
    let netRange = { netMin: (diafilter1?.Min == sliderValue1[0] || diafilter1?.Max == sliderValue1[1]) ? "" : sliderValue1[0], netMax: (diafilter1?.Min == sliderValue1[0] || diafilter1?.Max == sliderValue1[1]) ? "" : sliderValue1[1] }
    let grossRange = { grossMin: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[0], grossMax: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[1] }

    const data = `Diamond Weight Range : ${DiaRange} Net Weight Range : ${netRange} Gross Weight Range : ${grossRange}`;
    GoogleAnalytics.event({
      action: "Product Listing Filter Extra Filter Options *",
      category: `Filter Interaction Through Product Listing  && Filter by User ${loginUserDetail?.firstname}`,
      label: data,
      value: loginUserDetail?.firstname ?? 'User Not Login',
    });

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
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
      });
  };
  const handleRangeFilterApi1 = async (Rangeval1) => {
    let diafilter = JSON.parse(
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
    )[0];
    // let diafilter1 = JSON.parse(filterData?.filter((ele)=>ele?.Name == "NetWt")[0]?.options)[0]
    let diafilter2 = JSON.parse(
      filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options
    )[0];

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    let DiaRange = { diaMin: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[0], diaMax: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[1] }
    let netRange = { netMin: Rangeval1[0], netMax: Rangeval1[1] }
    let grossRange = { grossMin: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[0], grossMax: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[1] }

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
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
      });
  };
  const handleRangeFilterApi2 = async (Rangeval2) => {
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    let diafilter = JSON.parse(
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
    )[0];
    let diafilter1 = JSON.parse(
      filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options
    )[0];
    // let diafilter2 = JSON.parse(filterData?.filter((ele)=>ele?.Name == "Gross")[0]?.options)[0]

    let DiaRange = { diaMin: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[0], diaMax: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[1] }
    let netRange = { netMin: (diafilter1?.Min == sliderValue1[0] || diafilter1?.Max == sliderValue1[1]) ? "" : sliderValue1[0], netMax: (diafilter1?.Min == sliderValue1[0] || diafilter1?.Max == sliderValue1[1]) ? "" : sliderValue1[1] }
    let grossRange = { grossMin: Rangeval2[0], grossMax: Rangeval2[1] }

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
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
      });
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    handleRangeFilterApi(newValue)
  };
  const handleSliderChange1 = (event, newValue) => {
    setSliderValue1(newValue);
    handleRangeFilterApi1(newValue)
  };
  const handleSliderChange2 = (event, newValue) => {
    setSliderValue2(newValue);
    handleRangeFilterApi2(newValue)
  };

  const handleInputChange = (index) => (event) => {
    const newSliderValue = [...sliderValue];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setSliderValue(newSliderValue);
    handleRangeFilterApi(newSliderValue)
  };
  const handleInputChange1 = (index) => (event) => {
    const newSliderValue = [...sliderValue1]
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setSliderValue1(newSliderValue);
    handleRangeFilterApi1(newSliderValue)
  };
  const handleInputChange2 = (index) => (event) => {
    const newSliderValue = [...sliderValue2]
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setSliderValue2(newSliderValue);
    handleRangeFilterApi2(newSliderValue)
  };

  const RangeFilterView = (ele) => {
    return (
      <>
        <div>
          <div>
            <Slider
              value={sliderValue}
              onChange={(event, newValue) => setSliderValue(newValue)}
              onChangeCommitted={handleSliderChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={JSON?.parse(ele?.options)[0]?.Min}
              max={JSON?.parse(ele?.options)[0]?.Max}
              step={0.001}
              sx={{ marginTop: "25px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              value={sliderValue[0].toFixed(3)}
              margin="none"
              onChange={handleInputChange(0)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min,
                max: JSON?.parse(ele?.options)[0]?.Max,
                type: "number",
                "aria-labelledby": "range-slider"
              }}
            />
            <Input
              value={sliderValue[1].toFixed(3)}
              margin="none"
              onChange={handleInputChange(1)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min,
                max: JSON?.parse(ele?.options)[0]?.Max,
                type: "number",
                "aria-labelledby": "range-slider"
              }}
            />
          </div>
        </div>
      </>
    )
  }
  const RangeFilterView1 = (ele) => {
    // console.log("netwt",ele)
    return (
      <>
        <div>
          <div>
            <Slider
              value={sliderValue1}
              onChange={() => (event, newValue) => setSliderValue1(newValue)}
              onChangeCommitted={handleSliderChange1}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={JSON?.parse(ele?.options)[0]?.Min}
              max={JSON?.parse(ele?.options)[0]?.Max}
              step={0.001}
              sx={{ marginTop: "25px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              value={sliderValue1[0].toFixed(3)}
              margin="dense"
              onChange={handleInputChange1(0)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min,
                max: JSON?.parse(ele?.options)[0]?.Max,
                type: "number",
                "aria-labelledby": "range-slider"
              }}
            />
            <Input
              value={sliderValue1[1].toFixed(3)}
              margin="dense"
              onChange={handleInputChange1(1)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min,
                max: JSON?.parse(ele?.options)[0]?.Max,
                type: "number",
                "aria-labelledby": "range-slider"
              }}
            />
          </div>
        </div>
      </>
    )
  }
  const RangeFilterView2 = (ele) => {
    return (
      <>
        <div>
          <div>
            <Slider
              value={sliderValue2}
              onChange={(event, newValue) => setSliderValue2(newValue)}
              onChangeCommitted={handleSliderChange2}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={JSON?.parse(ele?.options)[0]?.Min}
              max={JSON?.parse(ele?.options)[0]?.Max}
              step={0.001}
              sx={{ marginTop: "25px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              value={sliderValue2[0].toFixed(3)}
              margin="dense"
              onChange={handleInputChange2(0)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min,
                max: JSON?.parse(ele?.options)[0]?.Max,
                type: "number",
                "aria-labelledby": "range-slider"
              }}
            />
            <Input
              value={sliderValue2[1].toFixed(3)}
              margin="dense"
              onChange={handleInputChange2(1)}
              inputProps={{
                step: 0.001,
                min: JSON?.parse(ele?.options)[0]?.Min,
                max: JSON?.parse(ele?.options)[0]?.Max,
                type: "number",
                "aria-labelledby": "range-slider"
              }}
            />
          </div>
        </div>
      </>
    )
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
      const decompressed = Pako.inflate(uint8Array, { to: "string" });

      // Convert decompressed data back to JSON object
      const jsonObject = JSON.parse(decompressed);

      return jsonObject;
    } catch (error) {
      console.error("Error decoding and decompressing:", error);
      return null;
    }
  };
  const handleMoveToDetail = (productData) => {
    let output = FilterValueWithCheckedOnly();
    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId,
      d: selectedDiaId,
      c: selectedCsId,
      f: output,
    };
    // console.log('ksjkfjkjdkjfkjsdk--', obj);
    // compressAndEncode(JSON.stringify(obj))
    GoogleAnalytics.event({
      action: "Navigate From Product Listing to Product Detail",
      category: `Product Interaction Through Product Listing Page`,
      label: productData?.designNo || productData?.titleLine || productData?.autocode,
      value: loginUserDetail?.firstname ?? 'User Not Login',
    });
    decodeAndDecompress();

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    navigate(
      `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
      }${productData?.designno}?p=${encodeObj}`
    );
  };
  const handleCartandWish = (e, ele, type) => {
    // console.log("event", e.target.checked, ele, type);
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let prodObj = {
      autocode: ele?.autocode,
      Metalid: selectedMetalId ?? ele?.MetalPurityid,
      MetalColorId: ele?.MetalColorid,
      DiaQCid: selectedDiaId ?? loginInfo?.cmboDiaQCid,
      CsQCid: selectedCsId ?? loginInfo?.cmboCSQCid,
      Size: ele?.DefaultSize,
      Unitcost: ele?.UnitCost,
      markup: ele?.DesignMarkUp,
      UnitCostWithmarkup: ele?.UnitCostWithMarkUp,
      Remark: "",
    };

    if (e.target.checked == true) {
      GoogleAnalytics.event({
        action: ` Item Added in Wishlist  by User ${loginUserDetail?.firstname || 'Guest'}`,
        category: `Wishlist Interaction on Product Listing Page`,
        label: ele?.designNo || ele?.titleLine || ele?.autocode || 'Unknown Product',
        value: loginUserDetail?.firstname
      });
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
    setAfterCountStatus(true);
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    //  if(location?.state?.SearchVal === undefined && Object.keys(filterChecked)?.length > 0){
    // console.log("locationkey",location?.key !== locationKey,location?.key,locationKey);

    if (location?.key === locationKey) {
      setIsOnlyProdLoading(true);
      ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
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
          setIsOnlyProdLoading(false);
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        });
    }
    // .then(async(res)=>{
    //   if(res){
    //     FilterListAPI().then((res)=>setFilterData(res)).catch((err)=>console.log("err",err))
    //   }
    // })
    // }
  }, [filterChecked]);


  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const handelCustomCombo = (obj) => {
    let output = FilterValueWithCheckedOnly();

    if (location?.state?.SearchVal === undefined) {
      setIsOnlyProdLoading(true);
      ProductListApi(output, currPage, obj, prodListType, cookie, sortBySelect)
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

    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    sessionStorage.setItem("short_cutCombo_val", JSON?.stringify(obj))

    if (customFlag || (loginInfo?.MetalId !== selectedMetalId || loginInfo?.cmboDiaQCid !== selectedDiaId || loginInfo?.cmboCSQCid !== selectedCsId)) {
      if (selectedMetalId !== "" || selectedDiaId !== "" || selectedCsId !== "") {
        handelCustomCombo(obj)
      }
    }

  }, [selectedMetalId, selectedDiaId, selectedCsId])

  const handelPageChange = (event, value) => {
    // console.log("pagination",value);

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    setIsProdLoading(true);
    setCurrPage(value);
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
    ProductListApi(output, value, obj, prodListType, cookie, sortBySelect)
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

  const handelFilterClearAll = () => {
    setAfterCountStatus(true);
    if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) {
      setFilterChecked({});
    }
  };

  useEffect(() => {
    handelFilterClearAll()
  }, [location?.key])

  useEffect(() => {
    setSortBySelect("Recommended")
  }, [location?.key])

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value);

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    setIsOnlyProdLoading(true);

    let sortby = e.target?.value;

    await ProductListApi(output, 1, obj, prodListType, cookie, sortby)
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
      });
  };

  useEffect(() => {
    if (productListData?.length === 0 || !productListData) {
      setFilterProdListEmpty(true);
    } else {
      setFilterProdListEmpty(false);
      setAfterCountStatus(false);
    }
  }, [productListData]);

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

  // const handleImgRollover = (pd) => {
  //   if (pd?.images?.length >= 1) {
  //     // setRolloverImgPd((prev) => pd?.images[1])
  //     setRolloverImgPd((prev) => {
  //       return { [pd?.autocode]: pd?.images[1] };
  //     });
  //   }
  // };

  const handleImgRollover = async (pd) => {
    if (pd?.images?.length >= 1) {
      const imageUrl = pd?.images[1];

      // const isImageAvailable = await checkImageAvailability(imageUrl);

      if (imageUrl) {
        setRolloverImgPd((prev) => {
          return { [pd?.autocode]: imageUrl };
        });
      } else {
        setRolloverImgPd((prev) => {
          return { [pd?.autocode]: pd?.images[0] };
        });
      }
    }
  };


  const handleLeaveImgRolloverImg = async (pd) => {
    if (pd?.images?.length > 0) {
      // setRolloverImgPd((prev) => pd?.images[0] )
      const imageUrl = pd?.images[0];
      // const isImageAvailable = await checkImageAvailability(imageUrl);
      if (imageUrl) {
        setRolloverImgPd((prev) => { return { [pd?.autocode]: pd?.images[0] } })
      }
    }
  };
  const handleLabelMenuName = () => {
    switch (location?.search.charAt(1)) {
      case "A":
        return "ALBUM"

      case "T":
        return "TRENDING"

      case "B":
        return "BEST SELLER"

      case "N":
        return "NEW ARRIVAL"

      default:
        return menuList?.menuname
    }
  }

  return (
    <div>

      {
        isProdLoading ? (
          // true ?(
          <ProductListSkeleton className="pSkelton" />
        ) : (
          <>
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
                className="dt_prodtList_drawer_close"
              >
                <CloseIcon
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                />
              </div>
              <div
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
                // className="smr_metal_custom"
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
                  // className="smr_dia_custom"
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
                          {`${diaQc.Quality.toUpperCase()}, ${diaQc.color.toLowerCase()}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {storeInit?.IsCsCustomization === 1 && (
                  <div
                  // className="smr_cs_custom"
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
                // className="smr_sorting_custom"
                >
                  <div
                  // className="container"
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
                      <option className="option" value="New">
                        New
                      </option>
                      <option className="option" value="Bestseller">
                        BestSeller
                      </option>
                      <option className="option" value="Trending">
                        Trending
                      </option>
                      {/*<option className="option" value="Bestseller">
                                    Bestseller
                                    </option>*/}
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
              </div>
              <div className="smr_mobile_filter_portion">
                {filterData?.length > 0 && (
                  <div className="smr_mobile_filter_portion_outter">
                    <span className="smr_filter_text">
                      <span>
                        {Object.values(filterChecked).filter((ele) => ele.checked)
                          ?.length === 0
                          // ? <span><span>{"Filters"}</span> <span>{"Product"}</span></span>
                          ? "Filters"
                          :
                          <>{afterCountStatus == true ? (
                            <Skeleton
                              variant="rounded"
                              width={140}
                              height={22}
                              className="pSkelton"
                            />
                          ) :
                            <span>{`Product Found:: ${afterFilterCount}`}</span>
                          }
                          </>
                        }
                      </span>
                      <span
                        onClick={() => { if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) { handelFilterClearAll() } }}
                      >
                        {Object.values(filterChecked).filter((ele) => ele.checked)
                          ?.length > 0
                          ? "Clear All"
                          : <>{afterCountStatus == true ? (
                            <Skeleton
                              variant="rounded"
                              width={140}
                              height={22}
                              className="pSkelton"
                            />
                          ) :
                            <span>{`Total Products: ${afterFilterCount}`}</span>
                          }
                          </>
                        }
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
                                  expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
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
                                              filterChecked[`${ele?.id}${opt?.id}`]
                                                ?.checked === undefined
                                                ? false
                                                : filterChecked[`${ele?.id}${opt?.id}`]
                                                  ?.checked
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
                                        // sx={{
                                        //   display: "flex",
                                        //   justifyContent: "space-between", // Adjust spacing between checkbox and label
                                        //   width: "100%",
                                        //   flexDirection: "row-reverse", // Align items to the right
                                        //   fontFamily:'TT Commons Regular'
                                        // }}
                                        className="smr_mui_checkbox_label"
                                        label={opt.Name}
                                      />
                                    </div>
                                  ))}
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {ele?.id?.includes("Price") && (
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
                                              filterChecked[`Price${i}${i}`]
                                                ?.checked === undefined
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
                                        className="smr_mui_checkbox_label"
                                        label={
                                          opt?.Minval == 0
                                            ? `Under ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Maxval}`
                                            : opt?.Maxval == 0
                                              ? `Over ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Minval}`
                                              : `${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Minval} 
                                                   - ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Maxval}`
                                        }
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
                                  {RangeFilterView(ele)}
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
                                  {RangeFilterView1(ele)}
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
                                  {RangeFilterView2(ele)}
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
            <div class="bg-image">
              <div className="overlay"></div>
              <div className="text-container">
                <div className="textContainerData">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* <p className="designCounttext">{menuList?.menuname}</p> */}
                    <p className="designCounttext">{handleLabelMenuName()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              // style={{
              //   width: "100%",
              //   display: "flex",
              //   justifyContent: "center",
              //   padding: "5px 0px",
              //   borderBottom: "1px solid #ebebeb",
              // }}
              className="main_breadCrumb_menu_List"
            >
              <div className="breadCrumb_menu_List">
                <span
                  style={{
                    // textTransform: "uppercase",
                    display: "flex",
                    width: maxwidth1483 ? "100%" : "20%",
                  }}
                >
                  <span
                    className="smr_breadcums_port_app"
                    // style={{ marginLeft: "72px" }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    {"Home/"}
                  </span>

                  {location?.search.charAt(1) == "A" && (
                    <div
                      className="smr_breadcums_port_app"
                      style={{ marginLeft: "3px" }}
                    >
                      <span>{"Album"}</span>
                    </div>
                  )}

                  {location?.search.charAt(1) == "T" && (
                    <div
                      className="smr_breadcums_port_app"
                      style={{ marginLeft: "3px" }}
                    >
                      <span>{"Trending"}</span>
                    </div>
                  )}

                  {location?.search.charAt(1) == "B" && (
                    <div
                      className="smr_breadcums_port_app"
                      style={{ marginLeft: "3px" }}
                    >
                      <span>{"Best Seller"}</span>
                    </div>
                  )}

                  {location?.search.charAt(1) == "N" && (
                    <div
                      className="smr_breadcums_port_app"
                      style={{ marginLeft: "3px" }}
                    >
                      <span>{"New Arrival"}</span>
                    </div>
                  )}

                  {location?.search.charAt(1) == "S" && (
                    <div
                      className="smr_breadcums_port_app"
                    // style={{ marginLeft: "3px" }}
                    >
                      <span>{location?.pathname?.split("/")[2]}</span>
                    </div>
                  )}

                  {IsBreadCumShow && (
                    <div
                      className="smr_breadcums_port_app"
                    // style={{ marginLeft: "3px" }}
                    >
                      {/* {decodeURI(location?.pathname).slice(3).replaceAll("/"," > ").slice(0,-2)} */}
                      {BreadCumsObj()?.menuname && (
                        <span
                          onClick={() =>
                            handleBreadcums({
                              [BreadCumsObj()?.FilterKey]: BreadCumsObj()?.FilterVal,
                            })
                          }
                        >
                          {BreadCumsObj()?.menuname}
                        </span>
                      )}

                      {BreadCumsObj()?.FilterVal1 && (
                        <span
                          onClick={() =>
                            handleBreadcums({
                              [BreadCumsObj()?.FilterKey]: BreadCumsObj()?.FilterVal,
                              [BreadCumsObj()?.FilterKey1]:
                                BreadCumsObj()?.FilterVal1,
                            })
                          }
                        >
                          {`/${BreadCumsObj()?.FilterVal1}`}
                        </span>
                      )}

                      {BreadCumsObj()?.FilterVal2 && (
                        <span
                          onClick={() =>
                            handleBreadcums({
                              [BreadCumsObj()?.FilterKey]: BreadCumsObj()?.FilterVal,
                              [BreadCumsObj()?.FilterKey1]:
                                BreadCumsObj()?.FilterVal1,
                              [BreadCumsObj()?.FilterKey2]:
                                BreadCumsObj()?.FilterVal2,
                            })
                          }
                        >
                          {`/${BreadCumsObj()?.FilterVal2}`}
                        </span>
                      )}
                    </div>
                  )}
                </span>
                {
                  maxwidth1483 ?
                    <div className="smr_mobile_prodSorting" style={{ width: maxwidth1483 && 'auto' }}>
                      <Checkbox
                        sx={{ padding: "0px 9px 0px 9px" }}
                        icon={<FilterAltIcon fontSize="large" />}
                        checkedIcon={
                          <FilterAltOffIcon
                            fontSize="large"
                            style={{ color: "#666666" }}
                          />

                        }
                        disableRipple={true}
                        checked={isDrawerOpen}
                        onChange={(e) => setIsDrawerOpen(e.target.value)}
                      />
                    </div>
                    :
                    <div className="productheader" style={{ display: 'block' }}>
                      <div className="productheader part">
                        {storeInit?.IsMetalCustComb === 1 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "12px",
                            }}
                          >
                            <label
                              style={{
                                marginTop: "5px",
                                color: "#333333",
                                fontSize: "13px",
                                fontFamily: "Poppins, sans-serif",
                              }}
                            >
                              Metal :
                            </label>
                            <select
                              className="sortMenuSelection"
                              value={selectedMetalId}
                              onChange={(e) => {
                                setSelectedMetalId(e.target.value);
                                setCustomFlag(true)
                              }}
                            >
                              {metalTypeCombo?.map((metalele) => (
                                <option key={metalele?.Metalid} value={metalele?.Metalid}>
                                  {metalele?.metaltype.toUpperCase()}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        {storeInit?.IsDiamondCustComb === 1 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "12px",
                            }}
                          >
                            <label
                              style={{
                                marginTop: "5px",
                                color: "#333333",
                                fontSize: "13px",
                                fontFamily: "Poppins, sans-serif",
                              }}
                            >
                              Diamond :
                            </label>
                            <select
                              className="sortMenuSelection"
                              value={selectedDiaId}
                              onChange={(e) => {
                                setSelectedDiaId(e.target.value)
                                setCustomFlag(true)
                              }}
                            >
                              {diaQcCombo?.map((diaQc) => (
                                <option
                                  key={diaQc?.QualityId}
                                  value={`${diaQc?.QualityId},${diaQc?.ColorId}`}
                                >
                                  {`${diaQc.Quality.toUpperCase()}, ${diaQc.color.toLowerCase()}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        {storeInit?.IsCsCustomization === 1 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "12px",
                            }}
                          >
                            <label
                              style={{
                                marginTop: "5px",
                                color: "#333333",
                                fontSize: "13px",
                                fontFamily: "Poppins, sans-serif",
                              }}
                            >
                              Color Stone :
                            </label>
                            <select
                              className="sortMenuSelection"
                              value={selectedCsId}
                              onChange={(e) => {
                                setSelectedCsId(e.target.value)
                                setCustomFlag(true)
                              }}
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
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "12px",
                          }}
                        >
                          <label
                            style={{
                              marginTop: "5px",
                              color: "#333333",
                              fontSize: "13px",
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            Sort by :
                          </label>
                          <select
                            className="sortMenuSelection"
                            value={sortBySelect}
                            onChange={(e) => handleSortby(e)}
                          >
                            <option className="option" value="Recommended">
                              Recommended
                            </option>
                            <option className="option" value="Bestseller">
                              BestSeller
                            </option>
                            <option className="option" value="New">
                              New
                            </option>
                            <option className="option" value="Trending">
                              Trending
                            </option>
                            {/*<option className="option" value="Bestseller">
                                    Bestseller
                                    </option>*/}
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
                    </div>
                }
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "10px",
                marginInline: "8%",
              }}
              className="paddingTopMobileSet mainProduct"
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="smilingProductMain" id="smilingProductMain">
                  <div
                    className="smilingProductSubMain"
                    style={{
                      width: "100%",
                      display: "flex",
                      position: "relative",
                      gap: "14px",
                    }}
                  >
                    {!maxwidth1483 && <div className="dt_mobile_filter_portion">
                      {filterData?.length > 0 && (
                        <>
                          {/* <div className="dt_mobile_filter_portion_outter"> */}
                          <span className="dt_filter_text_">
                            <span>
                              {Object.values(filterChecked).filter(
                                (ele) => ele.checked
                              )?.length === 0 ? (
                                // ? <span><span>{"Filters"}</span> <span>{"Product"}</span></span>
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
                            <span onClick={() => { if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) { handelFilterClearAll() } }}>
                              {Object.values(filterChecked).filter(
                                (ele) => ele.checked
                              )?.length > 0 ? (
                                <span style={{ color: "#c96" }}>Clear All</span>
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
                                    <span>{`Total Products: ${afterFilterCount}`}</span>
                                  )}
                                </>
                              )}
                            </span>
                          </span>
                          <div
                            style={{
                              marginTop: "12px",
                              borderTop: "1px solid #e1e1e1",
                            }}
                          >
                            {filterData?.map((ele) => (
                              <>
                                {!ele?.id?.includes("Range") &&
                                  !ele?.id?.includes("Price") && (
                                    <Accordion
                                      elevation={0}
                                      sx={{
                                        // borderBottom: "1px solid #c7c8c9",
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
                                          color: "#666",
                                          borderRadius: 0,
                                          fontSize: "14px",
                                          filter: "contrast(10.4)",

                                          "&.MuiAccordionSummary-root": {
                                            padding: 0,
                                          },
                                        }}
                                      >
                                        {ele
                                          ?.Fil_DisName}
                                      </AccordionSummary>
                                      <AccordionDetails
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          minHeight: "fit-content",
                                          maxHeight: "225px",
                                          overflow: "auto",
                                        }}
                                      >
                                        {(JSON.parse(ele?.options) ?? []).map(
                                          (opt) => (
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
                                                      filterChecked[
                                                        `${ele?.id}${opt?.id}`
                                                      ]?.checked === undefined
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
                                                className="dt_mui_checkbox_label"
                                                label={opt?.Name}
                                              />
                                            </div>
                                          )
                                        )}
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                {ele?.id?.includes("Price") && (
                                  <Accordion
                                    elevation={0}
                                    sx={{
                                      // borderBottom: "1px solid #c7c8c9",
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
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon sx={{ width: "20px" }} />
                                      }
                                      aria-controls="panel1-content"
                                      id="panel1-header"
                                      sx={{
                                        color: "#666",
                                        borderRadius: 0,
                                        fontSize: "14px",
                                        filter: "contrast(10.4)",

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
                                        maxHeight: "225px",
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
                                            <FormControlLabel
                                              control={
                                                <Checkbox
                                                  name={`Price${i}${i}`}
                                                  checked={
                                                    filterChecked[`Price${i}${i}`]
                                                      ?.checked === undefined
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
                                              style={{ fontSize: '10px !important' }}
                                              className="smr_mui_checkbox_label"
                                              label={
                                                opt?.Minval == 0
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
                                                    } ${opt?.Maxval}`
                                              }
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
                                      // borderBottom: "1px solid #c7c8c9",
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
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon sx={{ width: "20px" }} />
                                      }
                                      aria-controls="panel1-content"
                                      id="panel1-header"
                                      sx={{
                                        color: "#666",
                                        borderRadius: 0,
                                        fontSize: "14px",
                                        filter: "contrast(10.4)",

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
                                        maxHeight: "225px",
                                        overflow: "auto",
                                      }}
                                    >
                                      <Box sx={{ width: "94%", height: 88 }}>
                                        {RangeFilterView(ele)}
                                      </Box>
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                                {ele?.Name?.includes("NetWt") && (
                                  <Accordion
                                    elevation={0}
                                    sx={{
                                      // borderBottom: "1px solid #c7c8c9",
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
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon sx={{ width: "20px" }} />
                                      }
                                      aria-controls="panel1-content"
                                      id="panel1-header"
                                      sx={{
                                        color: "#666",
                                        borderRadius: 0,
                                        fontSize: "14px",
                                        filter: "contrast(10.4)",

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
                                        maxHeight: "225px",
                                        overflow: "auto",
                                      }}
                                    >
                                      <Box sx={{ width: "94%", height: 88 }}>
                                        {RangeFilterView1(ele)}
                                      </Box>
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                                {ele?.Name?.includes("Gross") && (
                                  <Accordion
                                    elevation={0}
                                    sx={{
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
                                        <ExpandMoreIcon sx={{ width: "20px" }} />
                                      }
                                      aria-controls="panel1-content"
                                      id="panel1-header"
                                      sx={{
                                        color: "#666",
                                        borderRadius: 0,
                                        fontSize: "14px",
                                        filter: "contrast(10.4)",

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
                                        maxHeight: "225px",
                                        overflow: "auto",
                                      }}
                                    >
                                      <Box sx={{ width: "94%", height: 88 }}>
                                        {RangeFilterView2(ele)}
                                      </Box>
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                              </>
                            ))}
                          </div>
                          {/* </div> */}
                        </>
                      )}
                    </div>}
                    <div
                      style={{
                        // width: isShowfilter ? "80%" : "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "1s ease",
                      }}
                      className="smilingProductImageMain"
                      id="smilingProductImageMain"
                    >
                      {
                        // true ? (
                        isOnlyProdLoading ? (
                          <ProductListSkeleton
                            fromPage={"Prodlist"}
                            className="pSkelton"
                          />
                        ) : (
                          <>
                            {!filterProdListEmpty ? (
                              <div className={`smilingAllProductDataMainMobile`}>
                                {finalProductListData?.map((productData, i) => {
                                  const isLoading = productData && productData?.loading === true;
                                  return <div className={`main-ProdcutListConatiner`}>
                                    <div className={`listing-card`}>
                                      <div className="listing-image">
                                        <div>
                                          {isLoading ?
                                            <CardMedia
                                              style={{ width: "100%" }}
                                              className="cardMainSkeleton"
                                            >
                                              <Skeleton
                                                animation="wave"
                                                variant="rect"
                                                width={"100%"}
                                                height="280px"
                                                style={{ backgroundColor: "#e8e8e86e" }}
                                              />
                                            </CardMedia> :
                                            <div
                                              onMouseEnter={() => {
                                                handleImgRollover(productData);
                                                if (productData?.VideoCount > 0) {
                                                  setIsRollOverVideo({
                                                    [productData?.autocode]: true,
                                                  });
                                                } else {
                                                  setIsRollOverVideo({
                                                    [productData?.autocode]: false,
                                                  });
                                                }
                                              }}
                                              onClick={() =>
                                                handleMoveToDetail(productData)
                                              }
                                              onMouseLeave={() => {
                                                handleLeaveImgRolloverImg(
                                                  productData
                                                );
                                                setIsRollOverVideo({
                                                  [productData?.autocode]: false,
                                                });
                                              }}
                                              className="dt_ImgandVideoContainer"
                                            >
                                              {isRollOverVideo[
                                                productData?.autocode
                                              ] == true ? (
                                                <video
                                                  src={
                                                    productData?.VideoCount > 0
                                                      ? (storeInit?.CDNVPath) +
                                                      productData?.designno +
                                                      "~" +
                                                      1 +
                                                      "." +
                                                      productData?.VideoExtension
                                                      : ""
                                                  }
                                                  loop={true}
                                                  autoPlay={true}
                                                  muted
                                                  playsInline
                                                  className="dt_productCard_video"
                                                  onError={(e) => {
                                                    e.target.poster = imageNotFound;
                                                  }}
                                                />
                                              ) : (
                                                <img
                                                  className="dt_productListCard_Image"
                                                  id={`dt_productListCard_Image${productData?.autocode}`}
                                                  src={
                                                    rollOverImgPd[
                                                      productData?.autocode
                                                    ]
                                                      ? rollOverImgPd[
                                                      productData?.autocode
                                                      ]
                                                      : productData?.images?.length >
                                                        0
                                                        ? productData?.images[0]
                                                        : imageNotFound
                                                  }
                                                  alt="aa"
                                                  onError={(e) => {
                                                    e.target.src = imageNotFound;
                                                  }}
                                                />
                                              )}
                                            </div>}
                                          <div className="dt_product_label">
                                            {productData?.IsInReadyStock == 1 ? (
                                              <span className="dt_instock">
                                                In Stock
                                              </span>
                                            )
                                              :
                                              (
                                                <span className="dt_instock">
                                                  Make To Order
                                                </span>
                                              )
                                            }
                                            {productData?.IsBestSeller == 1 && (
                                              <span className="dt_bestSeller">
                                                Best Seller
                                              </span>
                                            )}
                                            {productData?.IsTrending == 1 && (
                                              <span className="dt_intrending">
                                                Trending
                                              </span>
                                            )}
                                            {productData?.IsNewArrival == 1 && (
                                              <span className="dt_newarrival">
                                                New Arrival
                                              </span>
                                            )}
                                          </div>
                                          <Button
                                            className="cart-icon"
                                            style={{ display: "none" }}
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
                                              disableRipple={true}
                                              sx={{ padding: "5px" }}
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
                                          </Button>
                                          <Button className={"wishlist-icon"}>
                                            <Checkbox
                                              icon={
                                                <FavoriteBorderIcon
                                                  sx={{
                                                    fontSize: "22px",
                                                    color: "#7d7f85",
                                                    opacity: ".7",
                                                  }}
                                                />
                                              }
                                              checkedIcon={
                                                <FavoriteIcon
                                                  sx={{
                                                    fontSize: "22px",
                                                    color: "#e31b23",
                                                  }}
                                                />
                                              }
                                              disableRipple={true}
                                              sx={{ padding: "5px" }}
                                              onChange={(e) =>
                                                handleCartandWish(
                                                  e,
                                                  productData,
                                                  "Wish"
                                                )
                                              }
                                              checked={
                                                wishArr[productData?.autocode] ??
                                                  productData?.IsInWish === 1
                                                  ? true
                                                  : false
                                              }
                                            />
                                          </Button>
                                        </div>
                                      </div>

                                      {productData?.TitleLine?.length !== 0 ? (
                                        <div className="listing-details">
                                          <p
                                            className="prodTitle"
                                            title={`${productData?.TitleLine}`}
                                          >
                                            {/* {productData?.designno} {" - "}  */}
                                            {productData?.TitleLine}
                                          </p>
                                        </div>
                                      ) : (
                                        <div className="listing-details">
                                          {/* <p
                                       className="prodTitle"
                                       title={`${productData?.designno}`}
                                     >
                                       {productData?.designno}
                                     </p> */}
                                        </div>
                                      )}
                                      <div style={{ margin: '0px', fontSize: '15px', display: 'flex', justifyContent: 'center', width: '100%', gap: '5px' }}>
                                        {/* <label className="from">Form:</label> */}
                                        <div className="currencyFont" style={{ fontSize: '16px', color: '#8d8d8d' }}>{loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}</div>
                                        <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#8d8d8d' }}>{formatter.format(productData?.UnitCostWithMarkUp)}</div>
                                      </div>
                                    </div>
                                  </div>
                                })}
                                {storeInit?.IsProductListPagination == 1 &&
                                  Math.ceil(afterFilterCount / storeInit.PageSize) > 1 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "5%",
                                        width: '100%',
                                        // marginBottom:'5%'
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
                              </div>
                            ) : (
                              <div
                                className=""
                                style={{ margin: "50px 0px 50px 0px" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src="https://i.gifer.com/7jM3.gif"
                                    alt="No Products Found"
                                    style={{ maxWidth: "10%", height: "auto" }}
                                  />
                                </div>
                                <Typography
                                  sx={{ color: "#a2a2a2" }}
                                  variant="h4"
                                  align="center"
                                >
                                  No Products Found
                                </Typography>
                                <Typography
                                  sx={{ color: "#a2a2a2" }}
                                  variant="body2"
                                  align="center"
                                >
                                  Your search did not match any products. <br />
                                  Please try again.
                                </Typography>
                              </div>
                            )}
                          </>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      <Footer />
    </div>
  );
};

export default ProductList;
