import React, { useEffect, useRef, useState } from "react";
import "./productlist.scss";
import "./GiveFilterMenu.scss";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { useLocation, useNavigate } from "react-router-dom";
import imageNotFound from "../../../Assets/image-not-found.jpg"
import { GetPriceListApi } from "../../../../../../utils/API/PriceListAPI/GetPriceListApi";
import { findMetal, findMetalColor, findMetalType, formatter } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ProductListSkeleton from "./productlist_skeleton/ProductListSkeleton";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import {
  Accordion, AccordionDetails, AccordionSummary, Badge, Box, Button, CardMedia, Checkbox, Drawer, FormControlLabel, Input, Pagination, PaginationItem, Skeleton, Slider,
  Typography, useMediaQuery
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from "../../Home/Footer/Footer";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProductCard_Skeleton from "../../ReusableComponent/productCard_skeleton/Productcard_skeleton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { useRecoilValue, useSetRecoilState } from "recoil";
import pako from "pako";
import { SearchProduct } from "../../../../../../utils/API/SearchProduct/SearchProduct";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie'
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Helmet } from "react-helmet";
import { roop_CartCount, roop_DiamondRangeArr, roop_WishCount } from "../../../Recoil/atom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { BsHandbag } from "react-icons/bs";
import { IoClose } from "react-icons/io5";


const ProductList = () => {

  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeinit)

    let mtCombo = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
    setMetalTypeCombo(mtCombo)

    let diaQcCombo = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));
    setDiaQcCombo(diaQcCombo)

    let CsQcCombo = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));
    setCsQcCombo(CsQcCombo)
  }, [])


  let location = useLocation();
  let navigate = useNavigate();
  let minwidth1201px = useMediaQuery('(min-width:1201px)')
  let maxwidth1674px = useMediaQuery('(max-width:1674px)')
  let maxwidth590px = useMediaQuery('(max-width:590px)')
  let maxwidth464px = useMediaQuery('(max-width:464px)')
  let maxwidth425px = useMediaQuery('(max-width:425px)')

  const [productListData, setProductListData] = useState([]);
  const [priceListData, setPriceListData] = useState([]);
  const [finalProductListData, setFinalProductListData] = useState([]);
  const [isProdLoading, setIsProdLoading] = useState(true);
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
  const [storeInit, setStoreInit] = useState({});
  const [filterData, setFilterData] = useState([])
  const [filterChecked, setFilterChecked] = useState({})
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [accExpanded, setAccExpanded] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [cartArr, setCartArr] = useState({})
  const [wishArr, setWishArr] = useState({})
  const [menuParams, setMenuParams] = useState({})
  const [filterProdListEmpty, setFilterProdListEmpty] = useState(false)
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [diaQcCombo, setDiaQcCombo] = useState([]);
  const [csQcCombo, setCsQcCombo] = useState([]);
  const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId);
  const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid);
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const [loginInfo, setLoginInfo] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [rollOverImgPd, setRolloverImgPd] = useState({})
  const [locationKey, setLocationKey] = useState()
  const [prodListType, setprodListType] = useState();

  const [imageAvailability, setImageAvailability] = useState({});

  let [sortBySelect, setSortBySelect] = useState("Recommended");

  const [totalProductCount, setTotalProductCount] = useState();

  const setCartCountVal = useSetRecoilState(roop_CartCount)
  const setWishCountVal = useSetRecoilState(roop_WishCount)
  const [diaFilterRange, setDiaFilterRange] = useState({})
  const [sliderValue, setSliderValue] = useState([]);
  const [sliderValue1, setSliderValue1] = useState([]);
  const [sliderValue2, setSliderValue2] = useState([]);
  const [isRollOverVideo, setIsRollOverVideo] = useState({});

  const [afterCountStatus, setAfterCountStatus] = useState(false);

  const [value, setValue] = React.useState([]);

  const getDiaRangeFilter = useRecoilValue(roop_DiamondRangeArr)


  // console.log("getDiaRangeFilter",getDiaRangeFilter)



  let cookie = Cookies.get('visiterId')

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
    const storeInitInside = JSON.parse(sessionStorage.getItem("storeInit"));
    const loginUserDetailInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let mtid = loginUserDetailInside?.MetalId ?? storeInitInside?.MetalId
    setSelectedMetalId(mtid)

    let diaid = loginUserDetailInside?.cmboDiaQCid ?? storeInitInside?.cmboDiaQCid
    setSelectedDiaId(diaid)

    let csid = loginUserDetailInside?.cmboCSQCid ?? storeInitInside?.cmboCSQCid;
    setSelectedCsId(csid)

  }, [])

  // console.log("loginUserDetail?.MetalId ?? storeInit?.MetalId",selectedMetalId,selectedDiaId,selectedCsId);

  // console.log("rollOverImgPd",rollOverImgPd).


  // useEffect(()=>{

  //   let UrlVal =  location?.search.slice(1).split("/")

  //     let MenuVal = '';
  //     let MenuKey = '';
  //     let SearchVar = '';
  //     let TrendingVar = '';
  //     let NewArrivalVar = '';
  //     let BestSellerVar = '';
  //     let AlbumVar = '';

  //   UrlVal.forEach((ele)=>{
  //     let firstChar = ele.charAt(0);

  //     switch (firstChar) {
  //       case 'V':
  //           MenuVal = ele;
  //           break;
  //       case 'K':
  //           MenuKey = ele;
  //           break;
  //       case 'S':
  //           SearchVar = ele;
  //           break;
  //       case 'T':
  //           TrendingVar = ele;
  //           break;
  //       case 'N':
  //           NewArrivalVar = ele;
  //           break;
  //       case 'B':
  //           BestSellerVar = ele;
  //           break;
  //       case 'AB':
  //           AlbumVar = ele;
  //           break;
  //       default:
  //           return '';
  //     }
  //   })

  //   if(MenuVal && MenuKey){
  //     let key = location?.search.slice(1).split("/")[1]?.slice(2).split("&")
  //     let val = location?.search.slice(1).split("/")[0]?.slice(2).split("&")

  //     let MergedUrlArr = MergedUrl(key,val)

  //     console.log("menuval",MergedUrlArr)
  //   }

  //   if(SearchVar){
  //     console.log("SearchVar",SearchVar)
  //   }
  //   if(TrendingVar){
  //     console.log("TrendingVar",TrendingVar)
  //   }
  //   if(NewArrivalVar){
  //     console.log("NewArrivalVar",NewArrivalVar)
  //   }
  //   if(BestSellerVar){
  //     console.log("BestSellerVar",BestSellerVar)
  //   }
  //   if(AlbumVar){
  //     console.log("AlbumVar",AlbumVar)
  //   }


  // },[location?.key])

  useEffect(() => {
    setSelectedMetalId(loginUserDetail?.MetalId ?? storeInit?.MetalId);
    setSelectedDiaId(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
    setSelectedCsId(loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid);
    setSortBySelect('Recommended')
  }, [location?.key])

  const callAllApi = () => {
    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
    let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));
    let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));
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
    }
    else {
      setMetalTypeCombo(mtTypeLocal);
    }

    if (!diaQcLocal || diaQcLocal?.length === 0) {
      DiamondQualityColorComboAPI()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            sessionStorage.setItem("diamondQualityColorCombo", JSON.stringify(data));
            setDiaQcCombo(data);
          }
        })
        .catch((err) => console.log(err));
    }
    else {
      setDiaQcCombo(diaQcLocal);
    }

    if (!csQcLocal || csQcLocal?.length === 0) {
      ColorStoneQualityColorComboAPI()
        .then((response) => {
          if (response?.Data?.rd) {
            let data = response?.Data?.rd;
            sessionStorage.setItem("ColorStoneQualityColorCombo", JSON.stringify(data));
            setCsQcCombo(data);
          }
        })
        .catch((err) => console.log(err));
    }
    else {
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
    })
  }, [])




  useEffect(() => {

    let param = JSON.parse(sessionStorage.getItem("menuparams"))
    if (location?.state?.SearchVal === undefined) {
      setMenuParams(param)
    }
  }, [location?.key, productListData, filterChecked])
  // },[location?.state?.menu,productListData,filterChecked])

  useEffect(() => {

    const fetchData = async () => {
      setSortBySelect('Recommended');

      let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

      let UrlVal = location?.search.slice(1).split("/")

      // console.log("URLVal", UrlVal);

      let MenuVal = '';
      let MenuKey = '';
      let SearchVar = '';
      let TrendingVar = '';
      let NewArrivalVar = '';
      let BestSellerVar = '';
      let AlbumVar = '';

      let productlisttype;

      UrlVal.forEach((ele) => {
        let firstChar = ele.charAt(0);

        switch (firstChar) {
          case 'M':
            MenuVal = ele;
            break;
          case 'S':
            SearchVar = ele;
            break;
          case 'T':
            TrendingVar = ele;
            break;
          case 'N':
            NewArrivalVar = ele;
            break;
          case 'B':
            BestSellerVar = ele;
            break;
          case 'A':
            AlbumVar = ele;
            break;
          default:
            return '';
        }
      })

      if (MenuVal?.length > 0) {
        let menuDecode = atob(MenuVal?.split("=")[1])

        let key = menuDecode?.split("/")[1].split(',')
        let val = menuDecode?.split("/")[0].split(',')

        setIsBreadcumShow(true)

        productlisttype = [key, val]
      }

      if (SearchVar) {
        productlisttype = SearchVar
      }

      if (TrendingVar) {
        productlisttype = TrendingVar.split("=")[1]
      }
      if (NewArrivalVar) {
        productlisttype = NewArrivalVar.split("=")[1]
      }

      if (BestSellerVar) {
        productlisttype = BestSellerVar.split("=")[1]
      }

      if (AlbumVar) {
        productlisttype = AlbumVar.split("=")[1]
      }

      setIsProdLoading(true)
      //  if(location?.state?.SearchVal === undefined){ 
      setprodListType(productlisttype)
      await ProductListApi({}, 1, obj, productlisttype, cookie, sortBySelect = "Recommended")
        .then((res) => {
          if (res) {
            // console.log("productList", res);
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
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
            await FilterListAPI(productlisttype, cookie).then((res) => {
              setFilterData(res)

              let diafilter = res?.filter((ele) => ele?.Name == "Diamond")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "Diamond")[0]?.options)[0] : [];
              let diafilter1 = res?.filter((ele) => ele?.Name == "NetWt")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "NetWt")[0]?.options)[0] : [];
              let diafilter2 = res?.filter((ele) => ele?.Name == "Gross")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "Gross")[0]?.options)[0] : [];

              // console.log("diafilter",diafilter);
              setSliderValue([diafilter?.Min, diafilter?.Max])
              setSliderValue1([diafilter1?.Min, diafilter1?.Max])
              setSliderValue2([diafilter2?.Min, diafilter2?.Max])

              forWardResp1 = res
            }).catch((err) => console.log("err", err))
          }
          return forWardResp1
        }).finally(() => {
          setIsProdLoading(false)
          setIsOnlyProdLoading(false)
          window.scroll({
            top: 0,
            behavior: 'smooth'
          })
        })
        .catch((err) => console.log("err", err))

      // }

    }

    fetchData();

    if (location?.key) {
      setLocationKey(location?.key)
    }

    setCurrPage(1)
  }, [location?.key])

  useEffect(() => {
    const finalProdWithPrice = productListData.map((product) => {
      let pdImgList = [];

      if (product?.ImageCount > 0) {
        for (let i = 1; i <= product?.ImageCount; i++) {
          let imgString = storeInit?.CDNDesignImageFol + product?.designno + "~" + i + "." + product?.ImageExtension
          // let imgString = storeInit?.DesignImageFol + product?.designno + "_" + i + "." + product?.ImageExtension
          pdImgList.push(imgString)
        }
      }
      else {
        pdImgList.push(imageNotFound)
      }

      let images = pdImgList;

      return {
        ...product,
        images
      };
    });

    // console.log("finalProdWithPrice", finalProdWithPrice?.filter((ele)=>ele?.ImageCount > 0));
    setFinalProductListData(finalProdWithPrice);
  }, [productListData]);
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
  //           let imgString = storeInit?.DesignImageFol + product?.designno + "_" + i + "." + product?.ImageExtension
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

  //   // console.log("finalProdWithPrice", finalProdWithPrice?.filter((ele)=>ele?.ImageCount > 0));
  //   setFinalProductListData(finalProdWithPrice);
  // }, [productListData, priceListData]);

  const ProdCardImageFunc = (pd, j) => {
    let finalprodListimg;
    let pdImgList = [];

    if (pd?.ImageCount > 0) {
      for (let i = 1; i <= pd?.ImageCount; i++) {
        let imgString = storeInit?.CDNDesignImageFol + pd?.designno + "~" + i + "." + pd?.ImageExtension
        // let imgString = storeInit?.DesignImageFol + pd?.designno + "_" + i + "." + pd?.ImageExtension
        pdImgList.push(imgString)
      }
    }
    else {
      finalprodListimg = imageNotFound;
    }
    if (pdImgList?.length > 0) {
      finalprodListimg = pdImgList[j]
      if (j > 0 && (!finalprodListimg || finalprodListimg == undefined)) {
        finalprodListimg = pdImgList[0]
      }
    }
    return finalprodListimg
  }

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
    if (pPrice <= 0) {
      return 0
    }
    else if (pmu <= 0) {
      return pPrice
    }
    else {
      let percentPMU = ((pmu / 100) / curr)
      return (Number(pPrice * (percentPMU ?? 0)) + Number(pPrice ?? 0))
    }
  }

  const handleCheckboxChange = (e, listname, val) => {
    const { name, checked } = e.target;
    setAfterCountStatus(true);

    // console.log("output filterCheckedVal",{checked,type:listname,id:name.replace(/[a-zA-Z]/g, ''),value:val});

    // console.log("output filterCheckedVal",e, listname, val);

    setFilterChecked((prev) => ({
      ...prev,
      [name]: { checked, type: listname, id: name?.replace(/[a-zA-Z]/g, ''), value: val }
    }))
  }

  const FilterValueWithCheckedOnly = () => {
    let onlyTrueFilterValue = Object.values(filterChecked).filter(ele => ele.checked)

    const priceValues = onlyTrueFilterValue
      .filter(item => item.type === "Price")
      .map(item => item.value);

    const output = {};

    onlyTrueFilterValue.forEach(item => {
      if (!output[item.type]) {
        output[item.type] = '';
      }

      if (item.type == 'Price') {
        output['Price'] = priceValues
        return;
      }

      output[item.type] += `${item.id}, `;
    });

    for (const key in output) {
      if (key !== 'Price') {
        output[key] = output[key].slice(0, -2);
      }
    }

    return output
  }

  useEffect(() => {
    setAfterCountStatus(true);
    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    //  if(location?.state?.SearchVal === undefined && Object.keys(filterChecked)?.length > 0){
    // console.log("locationkey",location?.key !== locationKey,location?.key,locationKey);

    if (location?.key === locationKey) {
      setIsOnlyProdLoading(true)
      ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
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
        .catch((err) => console.log("err", err)).finally(() => { setIsOnlyProdLoading(false) })
    }
    // .then(async(res)=>{
    //   if(res){
    //     FilterListAPI().then((res)=>setFilterData(res)).catch((err)=>console.log("err",err))
    //   }
    // })
    // }
  }, [filterChecked])


  const handelFilterClearAll = () => {
    // setAfterCountStatus(true);
    if (Object.values(filterChecked).filter(ele => ele.checked)?.length > 0) { setFilterChecked({}) }
    setAccExpanded(false)
  }

  useEffect(() => {
    handelFilterClearAll()
  }, [location?.key])

  const handelPageChange = (event, value) => {

    // console.log("pagination",value);

    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }
    setIsProdLoading(true)
    setCurrPage(value)
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }, 100)
    ProductListApi(output, value, obj, prodListType, cookie, sortBySelect)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
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
      .catch((err) => console.log("err", err)).finally(() => {
        setTimeout(() => {
          setIsProdLoading(false)
        }, 100);
      })
  }

  const handleCartandWish = (e, ele, type) => {
    // console.log("event", e.target.checked, ele, type);
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let prodObj = {
      "autocode": ele?.autocode,
      "Metalid": (selectedMetalId ?? ele?.MetalPurityid),
      "MetalColorId": ele?.MetalColorid,
      "DiaQCid": (selectedDiaId ?? loginInfo?.cmboDiaQCid),
      "CsQCid": (selectedCsId ?? loginInfo?.cmboCSQCid),
      "Size": ele?.DefaultSize,
      "Unitcost": ele?.UnitCost,
      "markup": ele?.DesignMarkUp,
      "UnitCostWithmarkup": ele?.UnitCostWithMarkUp,
      "Remark": ""
    }



    if (e.target.checked == true) {
      CartAndWishListAPI(type, prodObj, cookie).then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC = res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err) => console.log("err", err))
    } else {
      RemoveCartAndWishAPI(type, ele?.autocode, cookie).then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC = res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err) => console.log("err", err))
    }

    if (type === "Cart") {
      setCartArr((prev) => ({
        ...prev,
        [ele?.autocode]: e.target.checked
      }))
    }

    if (type === "Wish") {
      setWishArr((prev) => ({
        ...prev,
        [ele?.autocode]: e.target.checked
      }))
    }

  }

  useEffect(() => {
    if (productListData?.length === 0 || !productListData || productListData?.[0]?.stat_code === 1005) {
      setFilterProdListEmpty(true)
    } else {
      setFilterProdListEmpty(false)
      setAfterCountStatus(false);
    }
  }, [productListData])


  const handelCustomCombo = (obj) => {

    let output = FilterValueWithCheckedOnly()

    if (location?.state?.SearchVal === undefined) {
      setIsOnlyProdLoading(true)
      ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect)
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          return res;
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setTimeout(() => {
            sessionStorage.setItem("short_cutCombo_val", JSON?.stringify(obj))
            setIsOnlyProdLoading(false)
          }, 100);
        })
    }
  }

  useEffect(() => {

    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    sessionStorage.setItem("short_cutCombo_val", JSON?.stringify(obj))


    if (loginInfo?.MetalId !== selectedMetalId || loginInfo?.cmboDiaQCid !== selectedDiaId || loginInfo?.cmboCSQCid !== selectedCsId) {
      if (selectedMetalId !== "" || selectedDiaId !== "" || selectedCsId !== "") {
        handelCustomCombo(obj)
      }
    }


  }, [selectedMetalId, selectedDiaId, selectedCsId])

  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = pako.deflate(uint8Array, { to: 'string' });


      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error('Error compressing and encoding:', error);
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
      const decompressed = pako.inflate(uint8Array, { to: 'string' });

      // Convert decompressed data back to JSON object
      const jsonObject = JSON.parse(decompressed);

      return jsonObject;
    } catch (error) {
      console.error('Error decoding and decompressing:', error);
      return null;
    }
  };

  const handleMoveToDetail = (productData) => {
    let output = FilterValueWithCheckedOnly()
    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId,
      d: selectedDiaId,
      c: selectedCsId,
      f: output
    }
    // console.log('ksjkfjkjdkjfkjsdk--', obj);
    // compressAndEncode(JSON.stringify(obj))

    decodeAndDecompress()

    let encodeObj = compressAndEncode(JSON.stringify(obj))

    navigate(`/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""}${productData?.designno}?p=${encodeObj}`)

  }

  // const handleImgRollover = (pd) => {
  //   if (pd?.images?.length >= 1) {
  //     // setRolloverImgPd((prev) => pd?.images[1])
  //     setRolloverImgPd((prev) => { return { [pd?.autocode]: pd?.images[1] } })
  //   }
  // }

  // const handleLeaveImgRolloverImg = (pd) => {
  //   if (pd?.images?.length > 0) {
  //     // setRolloverImgPd((prev) => pd?.images[0] )
  //     setRolloverImgPd((prev) => { return { [pd?.autocode]: pd?.images[0] } })
  //   }
  // }

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }


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

  const handleBreadcums = (mparams) => {

    let key = Object?.keys(mparams)
    let val = Object?.values(mparams)

    let KeyObj = {};
    let ValObj = {};

    key.forEach((value, index) => {
      let keyName = `FilterKey${index === 0 ? '' : index}`;
      KeyObj[keyName] = value;
    });

    val.forEach((value, index) => {
      let keyName = `FilterVal${index === 0 ? '' : index}`;
      ValObj[keyName] = value;
    });

    let finalData = { ...KeyObj, ...ValObj }

    const queryParameters1 = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ].filter(Boolean).join('/');

    const queryParameters = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ].filter(Boolean).join(',');

    const otherparamUrl = Object.entries({
      b: finalData?.FilterKey,
      g: finalData?.FilterKey1,
      c: finalData?.FilterKey2,
    })
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => value)
      .filter(Boolean)
      .join(',');

    let menuEncoded = `${queryParameters}/${otherparamUrl}`;

    const url = `/p/${BreadCumsObj()?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
    // const url = `/p?V=${queryParameters}/K=${otherparamUrl}`;

    navigate(url);

    // console.log("mparams", KeyObj, ValObj)

  }


  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value)

    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }
    setCurrPage(1);
    setIsOnlyProdLoading(true)

    let sortby = e.target?.value

    await ProductListApi(output, 1, obj, prodListType, cookie, sortby)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false)

        // if(element)
        //   {
        //     element.scrollIntoView({ behavior: "smooth", block: "start" })
        //   }
        // window.scroll({
        //   top: 0,
        //   behavior: 'smooth'
        // })
      })
  }

  // useEffect(()=>{
  // let element =  document.getElementById("roop_outer_portion")
  // if(element){
  //   console.log("scroll",element)
  // }
  // },[])

  // const showBreadCumsValue = () =>{

  //   let UrlVal = location?.search.slice(1).split("/")[0]?.charAt(0)

  //   let Compo;

  //   if(UrlVal == "M"){
  //     Compo = (
  //       <div className="roop_breadcums_port">
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
    // const element = document.getElementsByClassName("roop_filter_portion_outter")
    // const clientHeight = element?.clientHeight;
    // console.log('ClientHeight', clientHeight);
  }

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
    setAfterCountStatus(true);
    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    // let diafilter = JSON.parse(filterData?.filter((ele)=>ele?.Name == "Diamond")[0]?.options)[0]
    let diafilter1 = JSON.parse(filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options)[0]
    let diafilter2 = JSON.parse(filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options)[0]

    let DiaRange = { DiaMin: Rangeval[0], DiaMax: Rangeval[1] }
    let netRange = { netMin: (diafilter1?.Min == sliderValue1[0] || diafilter1?.Max == sliderValue1[1]) ? "" : sliderValue1[0], netMax: (diafilter1?.Min == sliderValue1[0] || diafilter1?.Max == sliderValue1[1]) ? "" : sliderValue1[1] }
    let grossRange = { grossMin: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[0], grossMax: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[1] }

    await ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          setAfterCountStatus(false);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false)
        setAfterCountStatus(false);
      })


  }
  const handleRangeFilterApi1 = async (Rangeval1) => {

    let diafilter = JSON.parse(filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options)[0]
    // let diafilter1 = JSON.parse(filterData?.filter((ele)=>ele?.Name == "NetWt")[0]?.options)[0]
    let diafilter2 = JSON.parse(filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options)[0]

    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    let DiaRange = { diaMin: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[0], diaMax: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[1] }
    let netRange = { netMin: Rangeval1[0], netMax: Rangeval1[1] }
    let grossRange = { grossMin: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[0], grossMax: (diafilter2?.Min == sliderValue2[0] || diafilter2?.Max == sliderValue2[1]) ? "" : sliderValue2[1] }

    await ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false)
      })


  }
  const handleRangeFilterApi2 = async (Rangeval2) => {

    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    let diafilter = JSON.parse(filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options)[0]
    let diafilter1 = JSON.parse(filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options)[0]
    // let diafilter2 = JSON.parse(filterData?.filter((ele)=>ele?.Name == "Gross")[0]?.options)[0]

    let DiaRange = { diaMin: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[0], diaMax: (diafilter?.Min == sliderValue[0] || diafilter?.Max == sliderValue[1]) ? "" : sliderValue[1] }
    let netRange = { netMin: (diafilter1?.Min == sliderValue1[0] || diafilter1?.Max == sliderValue1[1]) ? "" : sliderValue1[0], netMax: (diafilter1?.Min == sliderValue1[0] || diafilter1?.Max == sliderValue1[1]) ? "" : sliderValue1[1] }
    let grossRange = { grossMin: Rangeval2[0], grossMax: Rangeval2[1] }


    await ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false)
      })
  }



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
              value={sliderValue[0]}
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
              value={sliderValue[1]}
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
              value={sliderValue1[0]}
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
              value={sliderValue1[1]}
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
              value={sliderValue2[0]}
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
              value={sliderValue2[1]}
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

  const DynamicListPageTitleLineFunc = () => {
    if (location?.search.split("=")[0]?.slice(1) == "M") {
      return menuParams?.menuname?.replaceAll('%20', '')
    } else {
      return location?.pathname.split('/')[2]?.replaceAll('%20', "")
    }
  }

  const BreadCumsObj = () => {
    let BreadCum = decodeURI(atob(location?.search?.slice(3))).split('/')

    const values = BreadCum?.[0]?.split(',');
    const labels = BreadCum?.[1]?.split(',');

    const updatedBreadCum = labels?.reduce((acc, label, index) => {
      acc[label] = values[index] || '';
      return acc;
    }, {});

    const result = Object?.entries(updatedBreadCum ?? {})?.reduce((acc, [key, value], index) => {
      acc[`FilterKey${index === 0 ? '' : index}`] = key?.charAt(0)?.toUpperCase() + key?.slice(1);
      acc[`FilterVal${index === 0 ? '' : index}`] = value;
      return acc;
    }, {});

    console.log('result: ', result);
    // decodeURI(location?.pathname).slice(3).slice(0,-1).split("/")[0]

    if (result) {
      result.menuname = decodeURI(location?.pathname)?.slice(3)?.slice(0, -1)?.split("/")[0]
    } else {
      result = {}
    }

    return result
  }
  // useEffect(()=>{
  //   console.log("breadcum",BreadCumsObj())
  // },[location?.key])


  useEffect(() => {
    const checkAllImages = async () => {
      let availability = {};

      const checks = finalProductListData.map(async (productData) => {
        const imageUrl = productData?.images?.[0] || imageNotFound;
        const isAvailable = await checkImageAvailability(imageUrl);
        availability[productData?.autocode] = isAvailable;
      });

      // Wait for all availability checks to complete
      await Promise.all(checks);
      setImageAvailability(availability);
    };

    checkAllImages();
  }, [finalProductListData]);

  return (
    <>
      <Helmet>
        <title>{DynamicListPageTitleLineFunc()}</title>
      </Helmet>
      <div id="top">
        <Drawer
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          className="roop_filterDrawer"
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
          <div
            style={{
              // marginLeft: "15px",
              marginBottom: "20px",
              display: "flex",
              gap: "5px",
              flexDirection: "column",
              padding: "0 16px"
            }}
          >
            <Typography
              sx={{
                color: "#7f7d85",
                fontSize: "16px",
                fontFamily: "Spectral-Regular",
                marginTop: "12px",
              }}
            >
              Customization
            </Typography>
            {storeInit?.IsMetalCustComb === 1 && <div
            // className="roop_metal_custom"
            >
              <Typography
                className="label"
                sx={{
                  color: "#7f7d85",
                  fontSize: "14px",
                  fontFamily: "Spectral-Regular",
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
              // className="roop_dia_custom"
              >
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "Spectral-Regular",
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
                      {`${diaQc.Quality},${diaQc.color}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {storeInit?.IsCsCustomization === 1 && (
              <div
              // className="roop_cs_custom"
              >
                <Typography
                  className="label"
                  sx={{
                    color: "#7f7d85",
                    fontSize: "14px",
                    fontFamily: "Spectral-Regular",
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

            {storeInit?.IsMetalCustComb === 1 && (

              <div
              // className="roop_sorting_custom"
              >
                <div
                // className="container"
                >
                  <Typography
                    className="label"
                    sx={{
                      color: "#7f7d85",
                      fontSize: "14px",
                      fontFamily: "Spectral-Regular",
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
                    <option className="option" value="Trending">
                      Trending
                    </option>
                    <option className="option" value="Bestseller">
                      Bestseller
                    </option>
                    {storeInit?.IsStockWebsite == 1 &&
                      <option className="option" value="In Stock">
                        In stock
                      </option>
                    }
                    <option className="option" value="PRICE HIGH TO LOW">
                      Price High To Low
                    </option>
                    <option className="option" value="PRICE LOW TO HIGH">
                      Price Low To High
                    </option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="roop_mobile_filter_portion">
            {filterData?.length > 0 && (
              <div className="roop_mobile_filter_portion_outter">
                <span className="roop_filter_text"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 16px"
                  }}
                >
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
                        <span>{`Product Found : ${afterFilterCount}`}</span>
                      }
                      </>
                    }
                  </span>
                  <span style={{
                    fontWeight: "500",
                    cursor: "pointer"
                  }}
                    onClick={() => handelFilterClearAll()}
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
                <div style={{
                  marginTop: "12px",
                  padding: "0 16px"
                }}>
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
                                margin: 0,
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
                                    sx={{
                                      display: "flex",
                                      width: "100%",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      flexDirection: "row-reverse"
                                    }}
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
                                    className="roop_mui_checkbox_label"
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
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "100%",
                                      flexDirection: "row-reverse",
                                      justifyContent: "space-between"
                                    }}
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
                                    className="roop_mui_checkbox_label"
                                    label={
                                      opt?.Minval == 0
                                        ? `Under ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Maxval}`
                                        : opt?.Maxval == 0
                                          ? `Over ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${opt?.Minval}`
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
                            <Box sx={{ width: 203, height: 88 }}>
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
                            <Box sx={{ width: 204, height: 88 }}>
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
                            <Box sx={{ width: 204, height: 88 }}>
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
        <div className="roop_bodyContain">
          <div className="roop_outerContain">
            <div className="roop_whiteInnerContain">
              {isProdLoading ? (
                // true ?
                <ProductListSkeleton className="pSkelton" />
              ) : (
                <>
                  {!minwidth1201px ? (
                    <div className="roop_mobile_prodSorting">
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
                    </div>
                  ) : (
                    null
                    // <div className="roop_prodSorting">
                    //   <div className="empty_sorting_div">
                    //     <span
                    //       className="roop_breadcums_port "
                    //       style={{ marginLeft: "72px" }}
                    //       onClick={() => {
                    //         navigate("/");
                    //       }}
                    //     >
                    //       {"Home >"}{" "}
                    //     </span>

                    //     {location?.search.charAt(1) == "A" && (
                    //       <div
                    //         className="roop_breadcums_port"
                    //         style={{ marginLeft: "3px" }}
                    //       >
                    //         <span>{"Album"}</span>
                    //       </div>
                    //     )}

                    //     {location?.search.charAt(1) == "T" && (
                    //       <div
                    //         className="roop_breadcums_port"
                    //         style={{ marginLeft: "3px" }}
                    //       >
                    //         <span>{"Trending"}</span>
                    //       </div>
                    //     )}

                    //     {location?.search.charAt(1) == "B" && (
                    //       <div
                    //         className="roop_breadcums_port"
                    //         style={{ marginLeft: "3px" }}
                    //       >
                    //         <span>{"Best Seller"}</span>
                    //       </div>
                    //     )}

                    //     {location?.search.charAt(1) == "N" && (
                    //       <div
                    //         className="roop_breadcums_port"
                    //         style={{ marginLeft: "3px" }}
                    //       >
                    //         <span>{"New Arrival"}</span>
                    //       </div>
                    //     )}

                    //     {IsBreadCumShow && (
                    //       <div
                    //         className="roop_breadcums_port"
                    //         style={{ marginLeft: "3px" }}
                    //       >
                    //         {menuParams?.menuname && (
                    //           <span
                    //             onClick={() =>
                    //               handleBreadcums({
                    //                 [menuParams?.FilterKey]:
                    //                   menuParams?.FilterVal,
                    //               })
                    //             }
                    //           >
                    //             {menuParams?.menuname}
                    //           </span>
                    //         )}

                    //         {menuParams?.FilterVal1 && (
                    //           <span
                    //             onClick={() =>
                    //               handleBreadcums({
                    //                 [menuParams?.FilterKey]:
                    //                   menuParams?.FilterVal,
                    //                 [menuParams?.FilterKey1]:
                    //                   menuParams?.FilterVal1,
                    //               })
                    //             }
                    //           >
                    //             {` > ${menuParams?.FilterVal1}`}
                    //           </span>
                    //         )}

                    //         {menuParams?.FilterVal2 && (
                    //           <span
                    //             onClick={() =>
                    //               handleBreadcums({
                    //                 [menuParams?.FilterKey]:
                    //                   menuParams?.FilterVal,
                    //                 [menuParams?.FilterKey1]:
                    //                   menuParams?.FilterVal1,
                    //                 [menuParams?.FilterKey2]:
                    //                   menuParams?.FilterVal2,
                    //               })
                    //             }
                    //           >
                    //             {` > ${menuParams?.FilterVal2}`}
                    //           </span>
                    //         )}

                    //         {/* {
                    //           decodeURIComponent(location?.pathname)?.slice(3)?.slice(0,-1)?.split("/")?.map((ele,i)=>(
                    //               (i !== 2 && <span
                    //                 onClick={() =>
                    //                   handleBreadcums({
                    //                     [menuParams?.FilterKey]:
                    //                       menuParams?.FilterVal,
                    //                   })
                    //                 }
                    //               >
                    //                 {ele} {i !== decodeURIComponent(location?.pathname)?.slice(3)?.slice(0,-1)?.split("/")[decodeURIComponent(location?.pathname)?.slice(3)?.slice(0,-1)?.split("/")?.length-1] && ">"} {" "}
                    //               </span>)
                    //           ))
                    //         } */}
                    //       </div>
                    //     )}
                    //   </div>

                    // <div className="roop_main_sorting_div">
                    //   <div className="roop_metal_custom">
                    //     <label className="label">Metal:&nbsp;</label>
                    //     <select
                    //       className="select"
                    //       value={selectedMetalId}
                    //       onChange={(e) => setSelectedMetalId(e.target.value)}
                    //     >
                    //       {metalTypeCombo?.map((metalele, i) => (
                    //         <option
                    //           className="option"
                    //           key={i}
                    //           value={metalele?.Metalid}
                    //         >
                    //           {metalele?.metaltype.toUpperCase()}
                    //         </option>
                    //       ))}
                    //     </select>
                    //   </div>

                    //   {storeInit?.IsDiamondCustomization === 1 && (
                    //     <div className="roop_dia_custom">
                    //       <label className="label">Diamond:&nbsp;</label>
                    //       <select
                    //         className="select"
                    //         value={selectedDiaId}
                    //         onChange={(e) => setSelectedDiaId(e.target.value)}
                    //       >
                    //         {diaQcCombo?.map((diaQc, i) => (
                    //           <option
                    //             className="option"
                    //             key={i}
                    //             value={`${diaQc?.QualityId},${diaQc?.ColorId}`}
                    //           >
                    //             {" "}
                    //             {`${diaQc.Quality.toUpperCase()},${diaQc.color.toLowerCase()}`}
                    //           </option>
                    //         ))}
                    //       </select>
                    //     </div>
                    //   )}

                    //   {storeInit?.IsCsCustomization === 1 && (
                    //     <div className="roop_cs_custom">
                    //       <label className="label">color stone:&nbsp;</label>
                    //       <select
                    //         className="select"
                    //         value={selectedCsId}
                    //         onChange={(e) => setSelectedCsId(e.target.value)}
                    //       >
                    //         {csQcCombo?.map((csCombo, i) => (
                    //           <option
                    //             className="option"
                    //             key={i}
                    //             value={`${csCombo?.QualityId},${csCombo?.ColorId}`}
                    //           >
                    //             {" "}
                    //             {`${csCombo.Quality.toUpperCase()},${csCombo.color.toLowerCase()}`}
                    //           </option>
                    //         ))}
                    //       </select>
                    //     </div>
                    //   )}

                    //   <div className="roop_sorting_custom">
                    //     <div className="container">
                    //       <label className="label">Sort By:&nbsp;</label>
                    //       <select
                    //         className="select"
                    //         value={sortBySelect}
                    //         onChange={(e) => handleSortby(e)}
                    //       >
                    //         <option className="option" value="Recommended">
                    //           Recommended
                    //         </option>
                    //         <option className="option" value="New">
                    //           New
                    //         </option>
                    //         <option className="option" value="Trending">
                    //           Trending
                    //         </option>
                    //         <option className="option" value="In Stock">
                    //           In stock
                    //         </option>
                    //         <option
                    //           className="option"
                    //           value="PRICE HIGH TO LOW"
                    //         >
                    //           Price High To Low
                    //         </option>
                    //         <option
                    //           className="option"
                    //           value="PRICE LOW TO HIGH"
                    //         >
                    //           Price Low To High
                    //         </option>
                    //       </select>
                    //     </div>
                    //   </div>
                    // </div>
                    // </div>
                  )}

                  <GivaFilterMenu
                    RangeFilterView={RangeFilterView}
                    RangeFilterView1={RangeFilterView1}
                    RangeFilterView2={RangeFilterView2}
                    afterCountStatus={afterCountStatus}
                    afterFilterCount={afterFilterCount}
                    filterChecked={filterChecked}
                    filterData={filterData}
                    handelFilterClearAll={handelFilterClearAll}
                    handleCheckboxChange={handleCheckboxChange}
                    handleScrollHeight={handleScrollHeight}
                    loginUserDetail={loginUserDetail}
                    storeInit={storeInit}
                    metalTypeCombo={metalTypeCombo}
                    selectedMetalId={selectedMetalId}
                    setSelectedMetalId={setSelectedMetalId}
                    diaQcCombo={diaQcCombo}
                    selectedDiaId={selectedDiaId}
                    setSelectedDiaId={setSelectedDiaId}
                    csQcCombo={csQcCombo}
                    selectedCsId={selectedCsId}
                    setSelectedCsId={setSelectedCsId}
                    handleSortby={handleSortby}
                    sortBySelect={sortBySelect}
                    FilterValueWithCheckedOnly={FilterValueWithCheckedOnly()}
                    BreadCumsObj={BreadCumsObj}
                    IsBreadCumShow={IsBreadCumShow}
                    handleBreadcums={handleBreadcums}
                    setCurrPage={setCurrPage}
                    currPage={currPage}
                  />

                  <div className="roop_mainPortion">
                    <div className="roop_filter_portion" style={{ marginTop: '20px' }}>
                      {/* Breac crumb section place */}
                      {/* here the previous filter section place */}
                    </div>
                    {filterProdListEmpty ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          alignItems: "center",
                          height: "500px",
                        }}
                      >
                        <span className="roop_prod_datanotfound">
                          <div className="serach_notfound">
                            <p style={{ textTransform: 'capitalize' }}>We couldn't find any matches for</p>
                            <p style={{ fontWeight: 'bold' }}>{`"${decodeURIComponent(location?.pathname?.split("/")[2])}".`}</p>
                            <p className="search_notfound2" style={{ marginTop: '0.5rem' }}>Please try another search.</p>
                          </div>

                        </span>
                      </div>
                    ) : (
                      <div className="roop_productList">
                        {isOnlyProdLoading ? (
                          <ProductListSkeleton fromPage={"Prodlist"} className="pSkelton" />
                        ) : (
                          <>
                            <div className="roop_outer_portion" id="roop_outer_portion">
                              {/* <div className="roop_breadcums_port">{`${menuParams?.menuname || ''}${menuParams?.FilterVal1 ? ` > ${menuParams?.FilterVal1}` : ''}${menuParams?.FilterVal2 ? ` > ${menuParams?.FilterVal2}` : ''}`}</div> */}
                              <div className="roop_inner_portion">
                                {finalProductListData?.map((productData, i) => {
                                  const isChecked = cartArr[productData?.autocode] ?? productData?.IsInCart === 1;
                                  const isAvailable = imageAvailability[productData?.autocode];
                                  return (
                                    <div className="roop_productCard">
                                      <div className="cart_and_wishlist_icon">
                                        {/* <Checkbox
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
                                              color: "#000",
                                            }}
                                          />
                                        }
                                        disableRipple={false}
                                        sx={{ padding: "10px" }}
                                        onChange={(e) =>
                                          handleCartandWish(e, productData, "Cart")
                                        }
                                        checked={
                                          cartArr[productData?.autocode] ??
                                            productData?.IsInCart === 1
                                            ? true
                                            : false
                                        }
                                      /> */}
                                        <Checkbox
                                          icon={
                                            <MdFavoriteBorder
                                              opacity="0.7"
                                              fontSize="22px"
                                              color="#7d7f85"
                                            />
                                          }
                                          checkedIcon={
                                            <MdFavorite
                                              fontSize="22px"
                                              color="#D14A61"
                                            />
                                          }
                                          disableRipple={false}
                                          sx={{ padding: "10px" }}
                                          onChange={(e) => handleCartandWish(e, productData, "Wish")}
                                          checked={
                                            wishArr[productData?.autocode] ?? productData?.IsInWish === 1
                                          }
                                        />
                                      </div>

                                      <div className="smrWeb_app_product_label">
                                        {productData?.IsInReadyStock == 1 && <span className="smrWeb_app_instock">In Stock</span>}
                                        {productData?.IsBestSeller == 1 && <span className="smrWeb_app_bestSeller">Best Seller</span>}
                                        {productData?.IsTrending == 1 && <span className="smrWeb_app_intrending">Trending</span>}
                                        {productData?.IsNewArrival == 1 && <span className="smrWeb_app_newarrival">New</span>}
                                      </div>
                                      <div
                                        onMouseEnter={() => {
                                          handleImgRollover(productData);
                                          if (productData?.VideoCount > 0) {
                                            setIsRollOverVideo({ [productData?.autocode]: true })
                                          } else {
                                            setIsRollOverVideo({ [productData?.autocode]: false })
                                          }
                                        }}

                                        onClick={() =>
                                          handleMoveToDetail(productData)
                                        }

                                        onMouseLeave={() => {
                                          handleLeaveImgRolloverImg(productData);
                                          setIsRollOverVideo({ [productData?.autocode]: false })
                                        }}
                                        className="roop_ImgandVideoContainer"
                                      >
                                        {
                                          isRollOverVideo[productData?.autocode] == true ?
                                            <video
                                              // src={"https://cdn.caratlane.com/media/catalog/product/J/R/JR03351-YGP600_16_video.mp4"}
                                              src={productData?.VideoCount > 0 ?
                                                (storeInit?.CDNVPath) +
                                                productData?.designno +
                                                "~" +
                                                1 +
                                                "." +
                                                productData?.VideoExtension : ""}
                                              // src={productData?.VideoCount > 0 ?
                                              //   (storeInit?.DesignImageFol).slice(0, -13) +
                                              //   "video/" +
                                              //   productData?.designno +
                                              //   "_" +
                                              //   1 +
                                              //   "." +
                                              //   productData?.VideoExtension : ""}
                                              loop={true}
                                              autoPlay={true}
                                              className="roop_productCard_video"
                                              onError={(e) => {
                                                e.target.poster = imageNotFound
                                              }}
                                            // style={{objectFit:'cover',height:'412px',minHeight:'412px',width:'399px',minWidth:'399px'}}
                                            />
                                            :
                                            <>
                                              {isAvailable === undefined
                                                ? <CardMedia style={{ width: '100%', height: '100%' }} className='roop_productCard_cardMainSkeleton'>
                                                  <Skeleton animation="wave" variant="rect" width={'100%'} height='100%' style={{ backgroundColor: '#e8e8e86e' }} />
                                                </CardMedia> :
                                                <img
                                                  className="roop_productListCard_Image"
                                                  id={`roop_productListCard_Image${productData?.autocode}`}
                                                  // src={productData?.DefaultImageName !== "" ? storeInit?.DesignImageFol+productData?.DesignFolderName+'/'+storeInit?.ImgMe+'/'+productData?.DefaultImageName : imageNotFound}
                                                  // src={ ProdCardImageFunc(productData,0)}
                                                  src={
                                                    rollOverImgPd[productData?.autocode]
                                                      ? rollOverImgPd[productData?.autocode]
                                                      : productData?.images[0]
                                                  }
                                                  onError={(e) => {
                                                    e.target.src = imageNotFound
                                                  }}
                                                  // {Old code}
                                                  // src={
                                                  //   rollOverImgPd[productData?.autocode]
                                                  //     ? rollOverImgPd[productData?.autocode]
                                                  //     : productData?.images?.length > 0
                                                  //       ? productData?.images[0]
                                                  //       : imageNotFound
                                                  // }
                                                  alt=""
                                                // onClick={() =>
                                                //   handleMoveToDetail(productData)
                                                // }
                                                // onMouseEnter={() => {
                                                //   handleImgRollover(productData);
                                                // }}
                                                // onMouseLeave={() => {
                                                //   handleLeaveImgRolloverImg(productData);
                                                // }}
                                                />
                                              }
                                            </>
                                        }
                                      </div>
                                      <div className="roop_prod_card_info">
                                        <div className="roop_prod_Title">
                                          <span
                                            className="roop1_prod_title_with_width"
                                          // className={
                                          //   (productData?.TitleLine?.length > 30)
                                          //     ?
                                          //     "roop1_prod_title_with_width"
                                          //     :
                                          //     "roop1_prod_title_with_no_width"
                                          // }
                                          >
                                            {productData?.designno} {productData?.TitleLine?.length > 0 && " - " + productData?.TitleLine}
                                          </span>

                                        </div>
                                        <div style={{ display: !maxwidth425px ? "none" : "block" }}>
                                          <span className="roop_price">
                                            <span className="roop_currencyFont">
                                              {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>
                                            <span className="roop_pricePort">
                                              {formatter(
                                                productData?.UnitCostWithMarkUp
                                              )}
                                            </span>
                                          </span>
                                        </div>
                                        <div className="roop_prod_Allwt">
                                          <div
                                            style={{
                                              display: "flex",
                                              letterSpacing: maxwidth590px
                                                ? "0px"
                                                : "1px",
                                              justifyContent: 'space-between',
                                              width: "90%",
                                              marginInline: "auto",
                                              alignItems: 'center',
                                            }}
                                          >
                                            <div style={{ display: 'flex', flexDirection: maxwidth425px ? "row" : "column", justifyContent: maxwidth425px ? 'space-between' : "", width: maxwidth425px ? '100%' : "" }}>
                                              {storeInit?.IsGrossWeight == 1 &&
                                                Number(productData?.Gwt) !== 0 && (
                                                  <span className="roop_prod_wt">
                                                    <span className="roop_main_keys">
                                                      GWT:
                                                    </span>
                                                    <span className="roop_main_val">
                                                      {(productData?.Gwt)?.toFixed(3)}
                                                    </span>
                                                  </span>
                                                )}
                                              {Number(productData?.Nwt) !== 0 && (
                                                <>
                                                  <span className="roop_prod_wt">
                                                    <span className="roop_main_keys">NWT:</span>
                                                    <span className="roop_main_val">
                                                      {(productData?.Nwt)?.toFixed(3)}
                                                    </span>
                                                  </span>
                                                </>
                                              )}
                                            </div>
                                            <div style={{ display: maxwidth425px ? "none" : "block" }}>
                                              <span className="roop_price">
                                                <span className="roop_currencyFont">
                                                  {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                </span>
                                                <span className="roop_pricePort">
                                                  {formatter(
                                                    productData?.UnitCostWithMarkUp
                                                  )}
                                                </span>
                                              </span>
                                            </div>
                                            {/* </span> */}
                                            {/* <span className="roop_por"> */}
                                            {/* {storeInit?.IsDiamondWeight == 1 &&
                                            Number(productData?.Dwt) !== 0 && (
                                              <>
                                                <span style={{ fontSize: '13px', marginInline: '5px' }}>|</span>
                                                <span className="roop_prod_wt">
                                                  <span className="roop_main_keys">
                                                    DWT:
                                                  </span>
                                                  <span className="roop_main_val">
                                                    {(productData?.Dwt)?.toFixed(3)}
                                                    {storeInit?.IsDiamondPcs === 1
                                                      ? `/${productData?.Dpcs}`
                                                      : null}
                                                  </span>
                                                </span>
                                              </>
                                            )} */}
                                            {/* {storeInit?.IsStoneWeight == 1 &&
                                            Number(productData?.CSwt) !== 0 && (
                                              <>
                                                <span style={{ fontSize: '13px', marginInline: '5px' }}>|</span>
                                                <span className="roop_prod_wt">
                                                  <span className="roop_main_keys">
                                                    CWT:
                                                  </span>
                                                  <span className="roop_main_val">
                                                    {(productData?.CSwt)?.toFixed(3)}
                                                    {storeInit?.IsStonePcs === 1
                                                      ? `/${productData?.CSpcs}`
                                                      : null}
                                                  </span>
                                                </span>
                                              </>
                                            )} */}
                                            {/* </span> */}
                                          </div>
                                        </div>
                                        {/* <div className="roop_prod_mtcolr_price">
                                        <span className="roop_prod_metal_col">
                                          {findMetalColor(
                                            productData?.MetalColorid
                                          )?.[0]?.metalcolorname.toUpperCase()}
                                          -
                                          {
                                            findMetalType(
                                              productData?.IsMrpBase == 1 ? productData?.MetalPurityid : (selectedMetalId ?? productData?.MetalPurityid)
                                            )[0]?.metaltype
                                          }
                                        </span>
                                        <span>/</span>
                                      </div> */}
                                        {/* <div className="roop_prod_mtcolr_price" onClick={(e) => handleCartandWish(e, productData, "Cart")}>
                                        <button className="roop_prodBtn">Add To Cart</button>
                                      </div> */}

                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              icon={<BsHandbag style={{ color: '#fff', fontSize: '17px' }} />}
                                              checkedIcon={<BsHandbag style={{ color: '#fff', fontSize: '17px' }} />}
                                              checked={cartArr[productData?.autocode] ?? productData?.IsInCart === 1}
                                              onChange={(e) => handleCartandWish(e, productData, "Cart")}
                                            />
                                          }
                                          label={<span className={`roop_proBtn_text`}>{isChecked ? "In Cart" : "Add to Cart"}</span>}
                                          className="roop_prodBtn"
                                        />
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                            {storeInit?.IsProductListPagination == 1 &&
                              Math.ceil(afterFilterCount / storeInit.PageSize) > 1 && (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "5%",
                                    width: '100%'
                                  }}
                                  className="roop_pagination_portion"
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
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* <div className="roop_backtotop">
              BACK TO TOP
        </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductList;

const GivaFilterMenu = ({
  filterData,
  filterChecked,
  afterCountStatus,
  afterFilterCount,
  handelFilterClearAll,
  handleScrollHeight,
  handleCheckboxChange,
  loginUserDetail,
  storeInit,
  RangeFilterView,
  RangeFilterView1,
  RangeFilterView2,
  metalTypeCombo,
  selectedMetalId,
  setSelectedMetalId,
  diaQcCombo,
  selectedDiaId,
  setSelectedDiaId,
  selectedCsId,
  setSelectedCsId,
  csQcCombo,
  sortBySelect,
  handleSortby,
  FilterValueWithCheckedOnly,
  BreadCumsObj,
  IsBreadCumShow,
  handleBreadcums,
  setCurrPage,
  currPage,
}) => {
  console.log('currPage: ', currPage);
  const [showMenu, setshowMenu] = useState(-1);
  const menuRef = useRef(null)
  const CustomLabel = ({ text }) => (
    <Typography
      sx={{
        fontFamily: "Spectral-Regular , sans-serif !important",
        textWrap: "nowrap",
        color: 'black',
        letterSpacing: "0.5px",
        fontSize: {
          xs: "13.2px !important", // Mobile screens
          sm: "13.5px !important", // Tablets
          md: "14.1px !important", // Desktop screens
          lg: "14.6px !important", // Large desktops
          xl: "15.4px !important", // Extra large screens
        },
      }}
    >
      {text}
    </Typography>
  );

  function calculateTotalFilters(selectedFilters) {
    let totalCount = 0;

    for (const key in selectedFilters) {
      const value = selectedFilters[key];

      // Split the string by comma if there are multiple selections
      if (value.includes(",")) {
        const options = value.split(",").map((item) => item.trim());
        totalCount += options.length; // Add the count of multiple selections
      } else {
        totalCount += 1; // Count the single selection
      }
    }

    return totalCount;
  }
  //   function getCheckedFilterNames(FilterValueWithCheckedOnly, filterData) {
  //     // Extracting checked filter values
  //     const checkedNames = [];

  //     // Loop through each entry in FilterValueWithCheckedOnly
  //     for (const key in FilterValueWithCheckedOnly) {
  //         const checkedId = FilterValueWithCheckedOnly[key]; // e.g., '4' for 'collection'

  //         // Find the corresponding filter in filterData
  //         const filterEntry = filterData.find(item => item.id === key);

  //         if (filterEntry) {
  //             const options = JSON.parse(filterEntry.options);

  //             // Find the option with the matching id and push its name to checkedNames
  //             const checkedOption = options.find(option => option.id.toString() === checkedId);
  //     console.log(checkedOption,"before")
  //             if (checkedOption) {
  //                 checkedNames.push(checkedOption.Name);
  //             }
  //         }
  //     }
  //     console.log(checkedNames,"afte=er")

  //     return checkedNames;
  // }

  function getCheckedFilterNames(FilterValueWithCheckedOnly, filterData) {
    // Extracting checked filter values
    const checkedNames = [];

    // Loop through each entry in FilterValueWithCheckedOnly
    for (const key in FilterValueWithCheckedOnly) {
      const checkedId = FilterValueWithCheckedOnly[key]; // Single checked ID

      // Find the corresponding filter in filterData
      const filterEntry = filterData.find((item) => item.id === key);

      if (filterEntry) {
        // Parse the options from the string to an array of objects
        const options = JSON.parse(filterEntry.options);

        // Find the option with the matching id and push its name to checkedNames
        const checkedOption = options.find(
          (option) => option?.id?.toString() === checkedId
        );

        if (checkedOption) {
          checkedNames.push(checkedOption.Name);
        }
      }
    }

    // console.log('checkedNames: ', checkedNames);

    // if (checkedNames?.[0] !== "") {
    //   setCurrPage(currPage)
    // }
    // else {
    setCurrPage(1);
    // }

    return checkedNames;
  }

  const totalSelected = calculateTotalFilters(FilterValueWithCheckedOnly);

  const checkedFilterNames = getCheckedFilterNames(
    FilterValueWithCheckedOnly,
    filterData
  );

  const HandleMenu = (id) => {
    setshowMenu((prev) => (prev === id ? -1 : id));
  };
  const isFilterHaveEnoughData =
    filterData?.length > 0
  // &&
  // filterData.some(
  //   (ele) => ele?.Name === "Category" && ele?.id === "category"
  // );
  const options = [
    { value: "Recommended", label: "Recommended" },
    { value: "New", label: "New" },
    { value: "Trending", label: "Trending" },
    { value: "Bestseller", label: "Bestseller" },
    { value: "In Stock", label: "In stock", },
    { value: "PRICE HIGH TO LOW", label: "Price High To Low" },
    { value: "PRICE LOW TO HIGH", label: "Price Low To High" },
  ];
  // useEffect(() => {
  //   // Function to handle outside click
  //   const handleOutsideClick = (e) => {
  //     if (menuRef.current && !menuRef.current.contains(e.target)) {
  //       setshowMenu(-1); // Close the menu if clicked outside
  //     }
  //   };

  //   // Add the event listener
  //   document.addEventListener('mousedown', handleOutsideClick);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, []);

  return (
    <>
      <div className="giva_roop_filter_menu_style" id="style-1">
        <BreadCumView
          BreadCumsObj={BreadCumsObj}
          IsBreadCumShow={IsBreadCumShow}
          handleBreadcums={handleBreadcums}
        />
        <div className="main_fmg">
          <div className="flex_giva_roop_menu">
            {isFilterHaveEnoughData && (
              <div className="filter_menu_giva_roop">

                <Typography
                  sx={{ fontSize: "15px", cursor: 'pointer', position: 'relative', zIndex: '1' }}
                  className="fmg_menu"
                  onClick={() => HandleMenu(1)}
                >
                  {showMenu === 1 && <div className="span"
                    style={{
                      position: 'absolute',
                      zIndex: '888',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                    }}
                  >
                  </div>}
                  <Badge
                    badgeContent={totalSelected}
                    // onClick={() => HandleMenu(1)}
                    sx={{
                      '& .MuiBadge-badge': {
                        color: "#fff",
                        backgroundColor: '#D14A61',
                      },
                      '& .MuiBadge-dot': {
                        backgroundColor: '#D14A61',
                      },
                    }}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    Filters
                  </Badge>
                  <ExpandMoreIcon
                    className="fmg_icon"
                    sx={{ cursor: 'pointer' }}
                    // onClickCapture={() => HandleMenu(1)}
                    onClick={() => HandleMenu(1)}
                  />
                </Typography>
                <div ref={menuRef} className="div_check">

                  {showMenu === 1 && (
                    <div className="giva_roop_filter_menu_list_filterM">
                      {filterData?.map((ele) => (
                        <>
                          {!ele?.id?.includes("Range") &&
                            !ele?.id?.includes("Price") && (
                              <Box className="giva_roop_menu">
                                <Typography className="giva_roop_menu_title">
                                  {ele.Fil_DisName}
                                </Typography>
                                <Box className="giva_roop_menu_options">
                                  {(JSON.parse(ele?.options) ?? []).map((opt) => (
                                    <div key={opt?.id}>
                                      <FormControlLabel
                                        className="giva_roop_options_flex"
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
                                              padding: 0,
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
                                        label={<CustomLabel text={opt.Name} />}
                                      />
                                    </div>
                                  ))}
                                </Box>
                              </Box>
                            )}
                          {ele?.id?.includes("Price") && (
                            <Box className="giva_roop_menu">
                              <Typography className="giva_roop_menu_title">
                                {ele.Fil_DisName}
                              </Typography>
                              <Box className="giva_roop_menu_options">
                                {(JSON.parse(ele?.options) ?? []).map(
                                  (opt, i) => (
                                    <div key={i}>
                                      <FormControlLabel
                                        className="giva_roop_options_flex"
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
                                              padding: 0,
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
                                        label={
                                          <CustomLabel
                                            text={
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
                                        }
                                      />
                                    </div>
                                  )
                                )}
                              </Box>
                            </Box>
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
                                <Box sx={{ width: 203, height: 88 }}>
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
                                <Box sx={{ width: 204, height: 88 }}>
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
                                <Box sx={{ width: 204, height: 88 }}>
                                  {RangeFilterView2(ele)}
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          )}
                        </>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="div_check" ref={menuRef}>
              {storeInit?.IsMetalCustComb === 1 && metalTypeCombo?.length > 0 && (
                <div className="filter_menu_giva_roop">
                  <Typography
                    sx={{ fontSize: "15px", cursor: 'pointer' }}
                    className="fmg_menu"
                    onClick={() => HandleMenu(2)}
                  >
                    Metal{" "}
                    <ExpandMoreIcon
                      className="fmg_icon"
                      sx={{ cursor: 'pointer' }}
                      // onClickCapture={() => HandleMenu(2)}
                      onClick={() => HandleMenu(2)}
                    />{" "}
                  </Typography>
                  {showMenu === 2 && (
                    <div className="giva_roop_filter_menu_list">
                      <Box
                        className="giva_roop_menu_options"
                        sx={{
                          padding: "0 15px",
                        }}
                      >
                        {metalTypeCombo?.map((metalele, i) => (
                          <div key={i}>
                            <FormControlLabel
                              className="giva_roop_options_flex"
                              value={metalele?.Metalid}
                              control={
                                <Checkbox
                                  name={metalele?.Metalid}
                                  checked={selectedMetalId === metalele?.Metalid}
                                  style={{
                                    padding: 0,
                                  }}
                                  onChange={(e) => {
                                    setSelectedMetalId(metalele?.Metalid);
                                    setCurrPage(1);
                                  }}
                                  size="small"
                                />
                              }
                              label={
                                <CustomLabel
                                  text={metalele?.metaltype.toUpperCase()}
                                />
                              }
                            />
                          </div>
                        ))}
                      </Box>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="div_check" ref={menuRef}>
              {storeInit?.IsDiamondCustComb === 1 && diaQcCombo?.length > 0 && (
                <div className="filter_menu__roop">
                  <Typography
                    sx={{ fontSize: "15px", cursor: 'pointer' }}
                    className="fmg_menu"
                    onClick={() => HandleMenu(3)}
                  >
                    Diamond{" "}
                    <ExpandMoreIcon
                      className="fmg_icon"
                      sx={{ cursor: 'pointer' }}
                      // onClickCapture={() => HandleMenu(3)}
                      onClick={() => HandleMenu(3)}
                    />{" "}
                  </Typography>
                  {showMenu === 3 && (
                    <div className="giva_roop_filter_menu_list">
                      <Box
                        className="giva_roop_menu_options"
                        sx={{
                          padding: "0 15px",
                        }}
                      >
                        {diaQcCombo?.map((diaQc, i) => (
                          <div key={i}>
                            <FormControlLabel
                              className="giva_roop_options_flex"
                              value={`${diaQc?.QualityId},${diaQc?.ColorId}`}
                              control={
                                <Checkbox
                                  name={diaQc?.Metalid}
                                  checked={
                                    selectedDiaId ===
                                    `${diaQc?.QualityId},${diaQc?.ColorId}`
                                  }
                                  style={{
                                    padding: 0,
                                  }}
                                  onChange={(e) => {
                                    setSelectedDiaId(
                                      `${diaQc?.QualityId},${diaQc?.ColorId}`
                                    );
                                    setCurrPage(1);
                                  }}
                                  size="small"
                                />
                              }
                              label={
                                <CustomLabel
                                  text={`${diaQc.Quality.toUpperCase()},${diaQc.color.toUpperCase()}`}
                                />
                              }
                            />
                          </div>
                        ))}
                      </Box>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="div_check" ref={menuRef}>
              {storeInit?.IsCsCustomization === 1 && csQcCombo?.length > 0 && (
                <div className="filter_menu_giva_roop">
                  <Typography
                    sx={{ fontSize: "15px", cursor: 'pointer' }}
                    className="fmg_menu"
                    onClick={() => HandleMenu(4)}
                  >
                    Color Stone
                    <ExpandMoreIcon
                      className="fmg_icon"
                      sx={{ cursor: 'pointer' }}
                      // onClickCapture={() => HandleMenu(4)}
                      onClick={() => HandleMenu(4)}
                    />{" "}
                  </Typography>
                  {showMenu === 4 && (
                    <div className="giva_roop_filter_menu_list">
                      <Box
                        className="giva_roop_menu_options"
                        sx={{
                          padding: "0 15px",
                        }}
                      >
                        {csQcCombo?.map((CsQcC, i) => (
                          <div key={i}>
                            <FormControlLabel
                              className="giva_roop_options_flex"
                              value={`${CsQcC?.QualityId},${CsQcC?.ColorId}`}
                              control={
                                <Checkbox
                                  name={CsQcC?.Metalid}
                                  checked={
                                    selectedCsId ===
                                    `${CsQcC?.QualityId},${CsQcC?.ColorId}`
                                  }
                                  style={{
                                    padding: 0,
                                  }}
                                  onChange={(e) => {
                                    setSelectedCsId(
                                      `${CsQcC?.QualityId},${CsQcC?.ColorId}`
                                    );
                                    setCurrPage(1);
                                  }}
                                  size="small"
                                />
                              }
                              label={
                                <CustomLabel
                                  text={`${CsQcC.Quality.toUpperCase()},${CsQcC.color.toLowerCase()}`}
                                />
                              }
                            />
                          </div>
                        ))}
                      </Box>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
          <div className="flex__roop_right_menu">
            <div className="flex_giva_roop_menu">
              {/* {storeInit?.IsMetalCustComb === 1 && (
                <div className="filter_menu_giva_roop">
                  <Typography
                    sx={{ fontSize: "15px", cursor: 'pointer' }}
                    className="fmg_menu"
                    onClick={() => HandleMenu(5)}
                  >
                    Sort by : {sortBySelect}{" "}
                    <ExpandMoreIcon
                      className="fmg_icon"
                      sx={{ cursor: 'pointer' }}
                      onClickCapture={() => HandleMenu(5)}
                      onClick={() => HandleMenu(5)}
                    />{" "}
                  </Typography>
                  {showMenu === 5 && (
                    <div
                      className="giva_roop_filter_menu_list"
                      style={{ right: "0" }}
                    >
                      <Box
                        className="giva_roop_menu_options"
                        sx={{
                          padding: "0 15px",
                        }}
                      >
                        {options?.map((sort, i) => (
                          <div key={i}>
                            <FormControlLabel
                              className="giva_roop_options_flex"
                              value={sort?.value}
                              control={
                                <Checkbox
                                  name={sort?.label}
                                  checked={sortBySelect === sort?.value}
                                  style={{
                                    padding: 0,
                                  }}
                                  onChange={(e) => handleSortby(e)}
                                  size="small"
                                />
                              }
                              label={<CustomLabel text={sort?.label} />}
                            />
                          </div>
                        ))}
                      </Box>
                    </div>
                  )}
                </div>
              )} */}

              <div className="div_check" ref={menuRef}>
                {storeInit?.IsMetalCustComb === 1 && (
                  <div className="filter_menu_giva_roop">
                    <Typography
                      sx={{ fontSize: "15px" }}
                      className="fmg_menu"
                    >
                      Sort by:{" "}
                      <select
                        value={sortBySelect}
                        onChange={(e) => handleSortby(e)}
                        className="giva_roop_options_flex"
                        style={{
                          cursor: "pointer",
                          fontSize: "15px",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "none",
                          // border: "1px solid #ccc",
                          outline: "none",
                        }}
                      >
                        {/* {options?.map((sort, i) => (
                        <option key={i} value={sort?.value}>
                          {sort?.label}
                        </option>
                      ))} */}

                        <option className="option" value="Recommended">
                          Recommended
                        </option>
                        <option className="option" value="New">
                          New
                        </option>
                        <option className="option" value="Trending">
                          Trending
                        </option>
                        <option className="option" value="Bestseller">
                          Bestseller
                        </option>
                        {storeInit?.IsStockWebsite == 1 &&
                          <option className="option" value="In Stock">
                            In stock
                          </option>
                        }
                        <option className="option" value="PRICE HIGH TO LOW">
                          Price High To Low
                        </option>
                        <option className="option" value="PRICE LOW TO HIGH">
                          Price Low To High
                        </option>
                      </select>
                    </Typography>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
        {/* <FilterSelectedView selectedFilterValues={checkedFilterNames}/> */}
        <ClearAllAndTotalResult
          afterFilterCount={afterFilterCount}
          filterChecked={filterChecked}
          afterCountStatus={afterCountStatus}
          handelFilterClearAll={handelFilterClearAll}
        />
      </div>
    </>
  );
};

const BreadCumView = ({ BreadCumsObj, handleBreadcums, IsBreadCumShow }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="breadcrumb_fmg">
      <div className="empty_sorting_div_fmg">
        <span
          className="roop_breadcums_port_fmg"
          onClick={() => {
            navigate("/");
          }}
        >
          {"Home /"}
        </span>

        {location?.search.charAt(1) == "A" && (
          <div
            className="roop_breadcums_port_fmg"
            style={{ marginLeft: "3px" }}
          >
            {location?.pathname?.split("/")[2]?.replaceAll('%20', '')}
            {/* <span>{"Album"}</span> */}
          </div>
        )}

        {location?.search.charAt(1) == "T" && (
          <div
            className="roop_breadcums_port_fmg"
            style={{ marginLeft: "3px" }}
          >
            <span>{"Trending"}</span>
          </div>
        )}

        {location?.search.charAt(1) == "S" && (
          <div
            className="roop_breadcums_port_fmg"
            style={{ marginLeft: "3px" }}
          >
            {location?.pathname?.split("/")[2]?.replaceAll('%20', '')}
          </div>
        )}

        {location?.search.charAt(1) == "B" && (
          <div
            className="roop_breadcums_port_fmg"
            style={{ marginLeft: "3px" }}
          >
            <span>{"Best Seller"}</span>
          </div>
        )}

        {location?.search.charAt(1) == "N" && (
          <div
            className="roop_breadcums_port_fmg"
            style={{ marginLeft: "3px" }}
          >
            <span>{"New Arrival"}</span>
          </div>
        )}

        {IsBreadCumShow && (
          <div
            className="roop_breadcums_port_fmg"
            style={{ marginLeft: "3px" }}
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
                {location?.search.charAt(1) == "S" ? "" : BreadCumsObj()?.menuname}
              </span>
            )}

            {BreadCumsObj()?.FilterVal1 && (
              <span
                onClick={() =>
                  handleBreadcums({
                    [BreadCumsObj()?.FilterKey]: BreadCumsObj()?.FilterVal,
                    [BreadCumsObj()?.FilterKey1]: BreadCumsObj()?.FilterVal1,
                  })
                }

              >
                &nbsp;{` / ${BreadCumsObj()?.FilterVal1}`}
              </span>
            )}

            {BreadCumsObj()?.FilterVal2 && (
              <span
                onClick={() =>
                  handleBreadcums({
                    [BreadCumsObj()?.FilterKey]: BreadCumsObj()?.FilterVal,
                    [BreadCumsObj()?.FilterKey1]: BreadCumsObj()?.FilterVal1,
                    [BreadCumsObj()?.FilterKey2]: BreadCumsObj()?.FilterVal2,
                  })
                }

              >
                &nbsp;{` / ${BreadCumsObj()?.FilterVal2}`}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ClearAllAndTotalResult = ({ afterFilterCount, filterChecked, afterCountStatus, handelFilterClearAll }) => {
  return <div className="clear_fmg_list">
    <span className="roop_filter_text">
      <span>
        {Object.values(filterChecked).filter(
          (ele) => ele.checked
        )?.length === 0 ? (
          ""
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
              <span className="fmg_total_product">{`Product Found : ${afterFilterCount}`}</span>
            )}
          </>
        )}
      </span>
      <span onClick={() => handelFilterClearAll()}>
        {Object.values(filterChecked).filter(
          (ele) => ele.checked
        )?.length > 0 ? (
          <div className="fmg_remove_All">Remove All <IoClose /></div>
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
              <span className="fmg_total_product">{`Total Products : ${afterFilterCount}`}</span>
            )}
          </>
        )}
      </span>
    </span>
  </div>
}

