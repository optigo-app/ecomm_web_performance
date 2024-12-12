import React, { useEffect, useState } from "react";
import "./productlist.scss";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { useLocation, useNavigate } from "react-router-dom";
import imageNotFound from "../../Assets/image-not-found.jpg"
import { GetPriceListApi } from "../../../../../../utils/API/PriceListAPI/GetPriceListApi";
import { findMetal, findMetalColor, findMetalType } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ProductListSkeleton from "./productlist_skeleton/ProductListSkeleton";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CardMedia, Checkbox, Drawer, FormControlLabel, Input, Pagination, Skeleton, Slider, Typography, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { useSetRecoilState } from "recoil";
import pako from "pako";
import { SearchProduct } from "../../../../../../utils/API/SearchProduct/SearchProduct";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CloseIcon from '@mui/icons-material/Close';
import { smrMA_CartCount, smrMA_WishCount } from "../../Recoil/atom";
import { FaEye, FaFilter } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import Cookies from 'js-cookie'

const ProductList = () => {

  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  let location = useLocation();
  let navigate = useNavigate();
  let minwidth1201px = useMediaQuery('(min-width:1201px)')
  let maxwidth1674px = useMediaQuery('(max-width:1674px)')
  let maxwidth590px = useMediaQuery('(max-width:590px)')
  let maxwidth464px = useMediaQuery('(max-width:464px)')
  const [isProductListData, setIsProductListData] = useState(false);
  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
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
  const [selectedMetalId, setSelectedMetalId] = useState(
    loginUserDetail?.MetalId
  );
  const [selectedDiaId, setSelectedDiaId] = useState(
    loginUserDetail?.cmboDiaQCid
  );

  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [loginInfo, setLoginInfo] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [isSortByDrawerOpen, setIsSortByDrawerOpen] = useState(false)
  const [isImgViewDrawerOpen, setIsImgViewDrawerOpen] = useState(false)

  const [rollOverImgPd, setRolloverImgPd] = useState()
  const [activeTab, setActiveTab] = useState("/");

  const [isSingleView, setIsSingleView] = useState(false);
  const [isDoubleView, setIsDoubleView] = useState(true);
  const [locationKey, setLocationKey] = useState()


  const [prodListType, setprodListType] = useState();
  console.log('prodListType: ', prodListType);
  const setCartCountVal = useSetRecoilState(smrMA_CartCount)
  const setWishCountVal = useSetRecoilState(smrMA_WishCount)
  let cookie = Cookies.get('visiterId')
  const [sliderValue, setSliderValue] = useState([]);
  const [sliderValue1, setSliderValue1] = useState([]);
  const [sliderValue2, setSliderValue2] = useState([]);
  const [sortBySelect, setSortBySelect] = useState('Recommended');

  const [afterCountStatus, setAfterCountStatus] = useState(false);


  const formatter = new Intl.NumberFormat('en-IN')


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


  const callAllApi = () => {
    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
    let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));
    let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));
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

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));

    let mtid = loginUserDetail?.MetalId ?? storeinit?.MetalId
    setSelectedMetalId(mtid)

    let diaid = loginUserDetail?.cmboDiaQCid ?? storeinit?.cmboDiaQCid
    setSelectedDiaId(diaid)

    let csid = loginUserDetail?.cmboCSQCid ?? storeinit?.cmboCSQCid;
    setSelectedCsId(csid)

    console.log("selectedCustom", mtid, diaid, csid);

  }, [location?.key])


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

  // useEffect(()=>{
  //   if(location?.state?.SearchVal !== undefined){ 
  //     setTimeout(()=>{
  //       SearchProduct(location?.state?.SearchVal).then((res)=>{
  //         console.log("search",res)
  //       })
  //     },500)
  //   }
  // },[location?.key])

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

  useEffect(() => {
    let param = JSON.parse(sessionStorage.getItem("menuparams"))
    if (location?.state?.SearchVal === undefined) {
      setMenuParams(param)
    }
  }, [location?.key, productListData, filterChecked])
  // },[location?.state?.menu,productListData,filterChecked])

  // useEffect(() => {

  //   const fetchData = async () => {
  //     let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }
  //     let UrlVal = location?.search.slice(1).split("/")
  //     let MenuVal = '';
  //     let MenuKey = '';
  //     let SearchVar = '';
  //     let TrendingVar = '';
  //     let NewArrivalVar = '';
  //     let BestSellerVar = '';
  //     let AlbumVar = '';

  //     let productlisttype;

  //     UrlVal.forEach((ele) => {
  //       let firstChar = ele.charAt(0);

  //       switch (firstChar) {
  //         case 'M':
  //           MenuVal = ele;
  //           break;
  //         case 'S':
  //           SearchVar = ele;
  //           break;
  //         case 'T':
  //           TrendingVar = ele;
  //           break;
  //         case 'N':
  //           NewArrivalVar = ele;
  //           break;
  //         case 'B':
  //           BestSellerVar = ele;
  //           break;
  //         case 'A':
  //           AlbumVar = ele;
  //           break;
  //         default:
  //           return '';
  //       }
  //     })

  //     if (MenuVal?.length > 0) {
  //       let menuDecode = atob(MenuVal?.split("=")[1])

  //       let key = menuDecode?.split("/")[1].split(',')
  //       let val = menuDecode?.split("/")[0].split(',')

  //       setIsBreadcumShow(true)

  //       productlisttype = [key, val]
  //     }

  //     if (SearchVar) {
  //       productlisttype = SearchVar
  //     }

  //     if (TrendingVar) {
  //       productlisttype = TrendingVar.split("=")[1]
  //     }
  //     if (NewArrivalVar) {
  //       productlisttype = NewArrivalVar.split("=")[1]
  //     }

  //     if (BestSellerVar) {
  //       productlisttype = BestSellerVar.split("=")[1]
  //     }

  //     if (AlbumVar) {
  //       productlisttype = AlbumVar.split("=")[1]
  //     }

  //     console.log("URLVal", productlisttype);

  //     setIsProdLoading(true)
  //     //  if(location?.state?.SearchVal === undefined){ 
  //     setprodListType(productlisttype)
  //     await ProductListApi({}, 1, obj, productlisttype, cookie)
  //     .then((res) => {
  //       if (res) {
  //         // console.log("productList", res);

  //         setProductListData(res?.pdList);
  //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
  //       }

  //       if (res?.pdList) {
  //         setIsProductListData(true)
  //       }
  //       return res;
  //     })
  //       // .then( async(res) => {
  //       //   let forWardResp;
  //       //   if (res) {
  //       //     await GetPriceListApi(1,{},{},res?.pdResp?.rd1[0]?.AutoCodeList,obj,productlisttype).then((resp)=>{
  //       //       if(resp){
  //       //        console.log("productPriceData",resp);

  //       //         setPriceListData(resp)
  //       //         forWardResp = resp;
  //       //       }
  //       //     })
  //       //   }
  //       //   return forWardResp
  //       // })
  //       .then(async (res) => {
  //         let forWardResp1;
  //         if (res) {
  //           await FilterListAPI(productlisttype, cookie).then((res) => {
  //             setFilterData(res)

  //             let diafilter = res?.filter((ele) => ele?.Name == "Diamond")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "Diamond")[0]?.options)[0] : [];
  //             let diafilter1 = res?.filter((ele) => ele?.Name == "NetWt")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "NetWt")[0]?.options)[0] : [];
  //             let diafilter2 = res?.filter((ele) => ele?.Name == "Gross")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "Gross")[0]?.options)[0] : [];

  //             // console.log("diafilter",diafilter);
  //             setSliderValue([diafilter?.Min, diafilter?.Max])
  //             setSliderValue1([diafilter1?.Min, diafilter1?.Max])
  //             setSliderValue2([diafilter2?.Min, diafilter2?.Max])

  //             forWardResp1 = res
  //           }).catch((err) => console.log("err", err))
  //         }
  //         return forWardResp1
  //       }).finally(() => {
  //         setIsProdLoading(false)
  //         setIsOnlyProdLoading(false)
  //         window.scroll({
  //           top: 0,
  //           behavior: 'smooth'
  //         })
  //       })
  //       .catch((err) => console.log("err", err))

  //     // }

  //   }

  //   fetchData();

  //   if (location?.key) {
  //     setLocationKey(location?.key)
  //   }

  // }, [location?.key])

  console.log(location ?.state?.SearchVal, location?.key, location?.state?.menu, location?.state?.menukey, location?.state?.menuname, location?.state?.menunamekey , "menu")

    useEffect(() => {
    const fetchData = async () => {
      let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }
      let UrlVal = location?.search.slice(1).split("/")
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
      setprodListType(productlisttype)
      await ProductListApi({}, 1, obj, productlisttype, cookie)
        .then((res) => {
          if (res) {
            console.log("productList", res);
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          console.log("productList", res);
          if (res?.pdList) {
            setIsProductListData(true)
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

  }, [location?.key])

  useEffect(() => {
    const finalProdWithPrice = productListData.map((product) => {
      const newPriceData = priceListData?.rd?.find(
        (pda) => pda.A == product.autocode
      );

      const newPriceData1 = priceListData?.rd1
        ?.filter((pda) => pda.A == product.autocode)
        .reduce((acc, obj) => acc + obj.S, 0);

      const newPriceData2 = priceListData?.rd2
        ?.filter((pda) => pda.A == product.autocode)
        .reduce((acc, obj) => acc + obj.S, 0);

      let pdImgList = [];

      if (product?.ImageCount > 0) {
        for (let i = 1; i <= product?.ImageCount; i++) {
          let imgString = storeInit?.CDNDesignImageFol + product?.designno + "~" + i + "." + product?.ImageExtension
          pdImgList.push(imgString)
        }
      }
      else {
        pdImgList.push(imageNotFound)
      }

      let price = 0;
      let markup = 0;
      let metalrd = 0;
      let diard1 = 0;
      let csrd2 = 0;
      let updNWT = 0;
      let updGWT = 0;
      let updDWT = 0;
      let updDPCS = 0;
      let updCWT = 0;
      let updCPCS = 0;
      let ismrpbase;
      let mrpbaseprice;
      let images = pdImgList;

      if (newPriceData || newPriceData1 || newPriceData2) {
        price =
          ((newPriceData?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
          (newPriceData?.W ?? 0) +
          (newPriceData?.X ?? 0) +
          (newPriceData1 ?? 0) +
          (newPriceData2 ?? 0);
        metalrd =
          ((newPriceData?.V ?? 0) / storeInit?.CurrencyRate ?? 0) +
          (newPriceData?.W ?? 0) +
          (newPriceData?.X ?? 0);
        diard1 = newPriceData1 ?? 0;
        csrd2 = newPriceData2 ?? 0;
        markup = newPriceData?.AB;
        updNWT = newPriceData?.I ?? 0;
        updGWT = newPriceData?.N ?? 0;
        updDWT = newPriceData?.K ?? 0;
        updDPCS = newPriceData?.J ?? 0;
        updCWT = newPriceData?.M ?? 0;
        updCPCS = newPriceData?.L ?? 0;
        ismrpbase = newPriceData?.U;
        mrpbaseprice = newPriceData?.Z;
      }

      return {
        ...product,
        price,
        markup,
        metalrd,
        diard1,
        csrd2,
        updNWT,
        updGWT,
        updDWT,
        updDPCS,
        updCWT,
        updCPCS,
        ismrpbase,
        mrpbaseprice,
        images
      };
    });

    // console.log("finalProdWithPrice", finalProdWithPrice?.filter((ele)=>ele?.ImageCount > 0));
    setFinalProductListData(finalProdWithPrice);
  }, [productListData]);

  const ProdCardImageFunc = (pd, j) => {
    let finalprodListimg;
    let pdImgList = [];

    if (pd?.ImageCount > 0) {
      for (let i = 1; i <= pd?.ImageCount; i++) {
        let imgString = storeInit?.CDNDesignImageFol + pd?.designno + "~" + i + "." + pd?.ImageExtension
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
    // setAfterCountStatus(false);
    setAfterCountStatus(true);


    // console.log("output filterCheckedVal",{checked,type:listname,id:name.replace(/[a-zA-Z]/g, ''),value:val});

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
      // setIsOnlyProdLoading(true)
      setIsProdLoading(true)
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
        .catch((err) => console.log("err", err))
        .finally(() => {
          setIsProdLoading(false)
          setAfterCountStatus(false)
        })
    }
    // .then(async(res)=>{
    //   if(res){
    //     FilterListAPI().then((res)=>setFilterData(res)).catch((err)=>console.log("err",err))
    //   }
    // })
    // }

  }, [filterChecked])



  const handelFilterClearAll = () => {
    setAfterCountStatus(true);
    if (Object.values(filterChecked).filter(ele => ele.checked)?.length > 0) { setFilterChecked({}) }
    setAccExpanded(false)
  }
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
    // {  // .then(async (res) => {
    //   //   if (res) {
    //   //     await GetPriceListApi(value, {}, output, res?.pdResp?.rd1[0]?.AutoCodeList, obj).then((resp) => {
    //   //       if (resp) {
    //   //         setPriceListData(resp)
    //   //       }
    //   //     })
    //   //   }
    //   //   return res
    //   // })
    //   }
      .catch((err) => console.log("err", err)).finally(() => {
        setTimeout(() => {
          setIsProdLoading(false)
        }, 100);
      })
  }
  const handleCartandWish = (e, ele, type) => {
    console.log("event", e.target.checked, ele, type);
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
      CartAndWishListAPI(type, prodObj).then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount
        let wishC = res?.Data?.rd[0]?.Wishlistcount
        setWishCountVal(wishC)
        setCartCountVal(cartC);
      }).catch((err) => console.log("err", err))
    } else {
      RemoveCartAndWishAPI(type, ele?.autocode).then((res) => {
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
    if (productListData?.length === 0 || !productListData) {
      setFilterProdListEmpty(true)
    } else {
      setFilterProdListEmpty(false)
      setAfterCountStatus(false);
    }
  }, [productListData])


  const handelCustomCombo = (obj) => {
    let output = FilterValueWithCheckedOnly()
    if (location?.state?.SearchVal === undefined) {
      // setIsOnlyProdLoading(true)
      setIsProdLoading(true)
      ProductListApi(output, currPage, obj, prodListType, cookie, sortBySelect)
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
            setIsProdLoading(false)
          }, 100);
          window.scroll({
            top: 0,
            behavior: "smooth",
          })
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

    console.log('movetodetail', obj);
    // console.log("selectedMetalId",selectedDiaId);

    // compressAndEncode(JSON.stringify(obj))

    decodeAndDecompress()

    let encodeObj = compressAndEncode(JSON.stringify(obj))

    navigate(`/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""}${productData?.designno}?p=${encodeObj}`)

  }


  // const handleImgRollover = (pd, i) => {
  //   if (pd?.images?.length >= 1) {
  //     setRolloverImgPd((prev) => { return { ...prev, [i]: pd?.images[1] } })
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
      const isImageAvailable = await checkImageAvailability(imageUrl);
      // setRolloverImgPd((prev) => pd?.images[1])
      if (isImageAvailable) {
        setRolloverImgPd((prev) => {
          return { [pd?.autocode]: pd?.images[1] };
        });
      } else {
        setRolloverImgPd((prev) => {
          return { [pd?.autocode]: imageNotFound };
        });
      }
    }
  };



  const handleSortby = async (ele) => {
    setSortBySelect(ele)
    let output = FilterValueWithCheckedOnly()
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    // setIsOnlyProdLoading(true)
    setIsProdLoading(true)

    let sortby = ele

    await ProductListApi(output, currPage, obj, prodListType, cookie, sortby)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)

        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        // setIsOnlyProdLoading(false)
        setIsProdLoading(false)
        setIsSortByDrawerOpen(false)

      })
  }

  const Newlist = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, height: 'auto' }}
      role="presentation"
      onClick={() => setIsSortByDrawerOpen(() => false)}
      onKeyDown={() => setIsSortByDrawerOpen(() => false)}
    >
      <div>
        <label className="sortItemLabelProduct" style={{ color: '#888', paddingInline: '15px' }}>
          SORT BY
        </label>
        <div style={{ paddingInline: '15px' }}>
          <label className="sortItemLabelProduct">
            Recommended
            <input
              checked={sortBySelect === 'Recommended'}
              type="radio"
              name="sortOption"
              value="Recommended"
              onClick={() => handleSortby('Recommended')}
            />
          </label>

          <label className="sortItemLabelProduct">
            New
            <input
              checked={sortBySelect === 'New'}
              type="radio"
              name="sortOption"
              value="New"
              onClick={() => handleSortby('New')}
            />
          </label>

          <label className="sortItemLabelProduct">
            In stock
            <input
              checked={sortBySelect === 'In Stock'}
              type="radio"
              name="sortOption"
              value="In Stock"
              onClick={() => handleSortby('In Stock')}
            />
          </label>

          <label className="sortItemLabelProduct">
            Trending
            <input
              checked={sortBySelect === 'Trending'}
              type="radio"
              name="sortOption"
              value="Trending"
              onClick={() => handleSortby('Trending')}
            />
          </label>

          <label className="sortItemLabelProduct">
            Price High to Low
            <input
              checked={sortBySelect === 'PRICE HIGH TO LOW'}
              type="radio"
              name="sortOption"
              value="PRICE HIGH TO LOW"
              onClick={() => handleSortby('PRICE HIGH TO LOW')}
            />
          </label>


          <label className="sortItemLabelProduct">
            Price Low to High
            <input
              checked={sortBySelect === 'PRICE LOW TO HIGH'}
              type="radio"
              name="sortOption"
              value="PRICE LOW TO HIGH"
              onClick={() => handleSortby('PRICE LOW TO HIGH')}
            />
          </label>
        </div>
      </div>
    </Box>
  );

  const handleSingleView = () => {
    setIsImgViewDrawerOpen(false)
    setIsDoubleView(false)
    setIsSingleView(true)
  }

  const handleDoubleView = () => {
    setIsImgViewDrawerOpen(false)
    setIsSingleView(false)
    setIsDoubleView(true)
  }

  const NewlistImageView = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, height: 'auto' }}
      role="presentation"
    // onClick={()=>setIsImgViewDrawerOpen((prev)=>!prev)}
    // onKeyDown={()=>setIsImgViewDrawerOpen((prev)=>!prev)}
    >
      <div>
        <label className="sortItemLabelProduct" style={{ color: '#888', paddingInline: '15px' }}>
          Product View
        </label>
        <div style={{ paddingInline: '15px' }}>
          <label className="sortItemLabelProduct">
            Single View
            <input
              checked={isSingleView}
              type="radio"
              name="sortOption"
              value="single"
              onClick={() => handleSingleView()}
            />
          </label>

          <label className="sortItemLabelProduct">
            Double View
            <input
              checked={isDoubleView}
              type="radio"
              name="sortOption"
              value="double"
              onClick={() => handleDoubleView()}
            />
          </label>
        </div>
      </div>
    </Box>
  );

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
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsProdLoading(false)
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
        setIsProdLoading(false)
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
        setIsProdLoading(false)
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
              margin="dense"
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
              margin="dense"
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
              onChange={(event, newValue) => setSliderValue1(newValue)}
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

  const [imageAvailability, setImageAvailability] = useState({});

  useEffect(() => {
    const chechAllImages = async () => {
      let availability = {};

      const checks = finalProductListData?.map(async (item) => {
        const imageUrl = item?.images?.[0] || imageNotFound;
        const isAvailable = await checkImageAvailability(imageUrl);
        availability[item?.autocode] = isAvailable;
      });

      await Promise.all(checks);
      setImageAvailability(availability);
    }

    chechAllImages();
  }, [finalProductListData])

  const BreadCumsObj = () => {
    // Check if location.search exists and handle decoding and splitting safely
    const breadCumSearch = location?.search?.slice(3);  // Skip the '?' part from the URL
    const breadCumDecoded = breadCumSearch ? decodeURI(atob(breadCumSearch)) : ''; // Decode if search exists
    const breadCumArray = breadCumDecoded.split('/'); // Split into segments
  
    // Safely extract 'values' and 'labels' from breadCumArray, defaulting to empty arrays if undefined
    const values = breadCumArray[0]?.split(',') || [];
    const labels = breadCumArray[1]?.split(',') || [];
  
    // Reduce labels to create the updatedBreadCum object, using default empty strings if no value is found
    const updatedBreadCum = labels?.reduce((acc, label, index) => {
      acc[label] = values[index] || '';  // Use empty string as fallback if no corresponding value
      return acc;
    }, {});
  
    // Safely build the result object, iterating over the entries of updatedBreadCum
    const result = Object.entries(updatedBreadCum ?? {}).reduce((acc, [key, value], index) => {
      acc[`FilterKey${index === 0 ? '' : index}`] = key.charAt(0).toUpperCase() + key.slice(1);
      acc[`FilterVal${index === 0 ? '' : index}`] = value;
      return acc;
    }, {});
  
    // Safely decode the menuname from pathname and handle any missing data
    const menuname = location?.pathname
      ? decodeURI(location.pathname.slice(3).slice(0, -1).split('/')[0]) // Decode and process the pathname
      : ''; // Default to an empty string if pathname is not available
  
    // Add menuname to result
    result.menuname = menuname;
  
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
  


  return (
    <div id="top">
      <Drawer open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }} className="smr_filterDrawer"  >
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'end', padding: '8px 8px 0px 0px', marginTop: '12px' }} >
          <CloseIcon onClick={() => { setIsDrawerOpen(false) }} />
        </div>
        <div style={{ marginLeft: '15px', marginBottom: '20px', display: 'flex', gap: '5px', flexDirection: 'column' }}>
          <Typography sx={{ color: '#7f7d85', fontSize: '16px', fontFamily: 'TT Commons Medium', marginTop: '12px' }}>
            Customization
          </Typography>
          <div
          // className="smr_metal_custom"

          >
            <Typography className="label" sx={{ color: '#7f7d85', fontSize: '14px', fontFamily: 'TT Commons Regular' }}>
              Metal:&nbsp;
            </Typography>
            <select style={{ border: '1px solid #e1e1e1', borderRadius: '8px', minWidth: '270px' }} className="select" value={selectedMetalId} onChange={(e) => { setSelectedMetalId(e.target.value) }}>
              {
                metalTypeCombo?.map((metalele) => (
                  <option className="option" key={metalele?.Metalid} value={metalele?.Metalid}>{metalele?.metaltype.toUpperCase()}</option>
                ))
              }
            </select>
          </div>

          {storeInit?.IsDiamondCustomization === 1 &&
            <div
            // className="smr_dia_custom"
            >
              <Typography className="label" sx={{ color: '#7f7d85', fontSize: '14px', fontFamily: 'TT Commons Regular' }}>
                Diamond:&nbsp;
              </Typography>
              <select style={{ border: '1px solid #e1e1e1', borderRadius: '8px', minWidth: '270px' }} className="select" value={selectedDiaId} onChange={(e) => setSelectedDiaId(e.target.value)}>
                {
                  diaQcCombo?.map((diaQc) => (
                    <option className="option" key={diaQc.QualityId} value={`${diaQc.QualityId},${diaQc.ColorId}`}> {`${diaQc.Quality.toUpperCase()},${diaQc.color.toLowerCase()}`}</option>
                  ))
                }
              </select>
            </div>}

          {storeInit?.IsCsCustomization === 1 &&
            <div
            // className="smr_cs_custom"
            >
              <Typography className="label" sx={{ color: '#7f7d85', fontSize: '14px', fontFamily: 'TT Commons Regular' }}>
                color stone:&nbsp;
              </Typography>
              <select style={{ border: '1px solid #e1e1e1', borderRadius: '8px', minWidth: '270px' }} className="select" value={selectedCsId} onChange={(e) => setSelectedCsId(e.target.value)}>
                {
                  csQcCombo?.map((csCombo) => (
                    <option className="option" key={csCombo.QualityId} value={`${csCombo.QualityId},${csCombo.ColorId}`}> {`${csCombo.Quality.toUpperCase()},${csCombo.color.toLowerCase()}`}</option>
                  ))
                }
              </select>
            </div>}

          {/* <div 
                      // className="smr_sorting_custom"
                      >
                      <div
                        // className="container"
                        >
                        <Typography className="label" sx={{color:'#7f7d85',fontSize:'14px',fontFamily:'TT Commons Regular'}}>
                          Sort By:&nbsp;
                        </Typography>
                        <select style={{border:'1px solid #e1e1e1',borderRadius:'8px',minWidth:'270px'}} className="select">
                          <option
                            className="option"
                            value="Recommended"
                          >
                            Recommended
                          </option>
                          <option className="option" value="New">
                            New
                          </option>
                          <option
                            className="option"
                            value="In Stock"
                          >
                            In stock
                          </option>
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
                    </div> */}
        </div>
        <div className="smr_mobile_filter_portion" >
          {filterData?.length > 0 && <div className="smr_mobile_filter_portion_outter">
            <span className="smr_filter_text">
              <span>
                {Object.values(filterChecked).filter(
                  (ele) => ele.checked
                )?.length === 0
                  ? "Filters"
                  // ? <span style={{display:'flex',justifyContent:'space-between'}}><span>{"Filters"}</span> <span>{`Total Products: ${afterFilterCount}`}</span></span>
                  : <>{afterCountStatus == true ? (
                    <Skeleton
                      variant="rounded"
                      width={140}
                      height={22}
                      className="pSkelton"
                    />
                  ) :
                    <span>{`Product Found: ${afterFilterCount}`}</span>
                  }
                  </>}
              </span>
              <span onClick={() => {
                if (Object.values(filterChecked).filter(
                  (ele) => ele.checked
                )?.length > 0) { handelFilterClearAll() } else { return; }
              }}>
                {Object.values(filterChecked).filter(
                  (ele) => ele.checked
                )?.length > 0
                  ? "Clear All"
                  :
                  <>{afterCountStatus == true ? (
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
                  {!(ele?.id)?.includes("Range") && !ele?.id?.includes("Price") && (
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
                                    filterChecked[`${ele?.id}${opt?.id}`]?.checked ===
                                      undefined
                                      ? false
                                      : filterChecked[`${ele?.id}${opt?.id}`]?.checked
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
          </div>}
        </div>
      </Drawer>
  
      <div className="smrMA_bodyContain">
                <div className="smr_outerContain">
                               <div className="smrMA_whiteInnerContain ">
                                           {

              isProdLoading ?
                // true ? 
                (
                  <ProductListSkeleton />
                ) : (
                  <>
                    {!minwidth1201px ?
                      <div className="smrMA_mobile_prodSorting">
                        <Checkbox
                          sx={{ padding: '0px 9px 0px 9px' }}
                          icon={<FilterAltIcon fontSize="large" />}
                          checkedIcon={<FilterAltOffIcon fontSize="large" style={{ color: '#666666' }} />}
                          checked={isDrawerOpen}
                          onChange={(e) => setIsDrawerOpen(e.target.value)}
                        />
                      </div>
                      : <div className="smr_prodSorting">
                        <div className="empty_sorting_div">
                          <span className="smr_breadcums_port " style={{ marginLeft: '72px' }} onClick={() => { navigate('/') }}>{'Home >'}{" "}</span>
                          {IsBreadCumShow && <div className="smr_breadcums_port">
                            {menuParams?.menuname && <span onClick={() => handleBreadcums({ [menuParams?.FilterKey]: menuParams?.FilterVal })}>{menuParams?.menuname}</span>}

                            {menuParams?.FilterVal1 && <span
                              onClick={() => handleBreadcums({ [menuParams?.FilterKey]: menuParams?.FilterVal, [menuParams?.FilterKey1]: menuParams?.FilterVal1 })}
                            >
                              {` > ${menuParams?.FilterVal1}`}
                            </span>}

                            {menuParams?.FilterVal2 && <span
                              onClick={() => handleBreadcums({ [menuParams?.FilterKey]: menuParams?.FilterVal, [menuParams?.FilterKey1]: menuParams?.FilterVal1, [menuParams?.FilterKey2]: menuParams?.FilterVal2 })}
                            >
                              {` > ${menuParams?.FilterVal2}`}
                            </span>}
                          </div>
                          }
                        </div>

                        <div className="smr_main_sorting_div">
                          <div className="smr_metal_custom">
                            <label className="label">
                              Metal:&nbsp;
                            </label>
                            <select className="select" value={selectedMetalId} onChange={(e) => setSelectedMetalId(e.target.value)}>
                              {
                                metalTypeCombo?.map((metalele) => (
                                  <option className="option" key={metalele?.Metalid} value={metalele?.Metalid}>{metalele?.metaltype.toUpperCase()}</option>
                                ))
                              }
                            </select>
                          </div>

                          {storeInit?.IsDiamondCustomization === 1 && <div className="smr_dia_custom">
                            <label className="label">
                              Diamond:&nbsp;
                            </label>
                            <select className="select" value={selectedDiaId} onChange={(e) => setSelectedDiaId(e.target.value)}>
                              {

                                diaQcCombo?.map((diaQc) => (
                                  <option className="option" key={diaQc.ColorId} value={`${diaQc.Quality},${diaQc.color}`}> {`${diaQc.Quality.toUpperCase()},${diaQc.color.toLowerCase()}`}</option>
                                ))
                              }
                            </select>
                          </div>}

                          {storeInit?.IsCsCustomization === 1 && <div className="smr_cs_custom">
                            <label className="label">
                              color stone:&nbsp;
                            </label>
                            <select className="select" value={selectedCsId} onChange={(e) => setSelectedCsId(e.target.value)}>
                              {
                                csQcCombo?.map((csCombo) => (
                                  <option className="option" key={csCombo.ColorId} value={`${csCombo.Quality},${csCombo.color}`}> {`${csCombo.Quality.toUpperCase()},${csCombo.color.toLowerCase()}`}</option>
                                ))
                              }
                            </select>
                          </div>}

                          <div className="smr_sorting_custom">
                            <div className="container">
                              <label className="label">
                                Sort By:&nbsp;
                              </label>
                              <select className="select">
                                <option
                                  className="option"
                                  value="Recommended"
                                >
                                  Recommended
                                </option>
                                <option className="option" value="New">
                                  New
                                </option>
                                <option
                                  className="option"
                                  value="In Stock"
                                >
                                  In stock
                                </option>
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

                      </div>}

                    <div className="smr_mainPortion" style={{ marginTop: '50px',display:'flex',flexDirection:'column' }}>
                      <div className="breadcrumb_mapp">
                       <BreadCumView BreadCumsObj={BreadCumsObj}  handleBreadcums={handleBreadcums} IsBreadCumShow={IsBreadCumShow}/>
                      </div>
                      <div className="smr_filter_portion">
                        {filterData?.length > 0 && <div className="smr_filter_portion_outter">
                          <span className="smr_filter_text">
                            <span>
                              {Object.values(filterChecked).filter(
                                (ele) => ele.checked
                              )?.length === 0
                                ? "Filters"
                                // ? <span style={{display:'flex',justifyContent:'space-between'}}><span>{"Filters"}</span> <span>{`Total Products: ${afterFilterCount}`}</span></span>
                                : <>{afterCountStatus == true ? (
                                  <Skeleton
                                    variant="rounded"
                                    width={140}
                                    height={22}
                                    className="pSkelton"
                                  />
                                ) :
                                  <span>{`Product Found: ${afterFilterCount}`}</span>
                                }
                                </>}
                            </span>
                            <span onClick={() => handelFilterClearAll()}>
                              {Object.values(filterChecked).filter(
                                (ele) => ele.checked
                              )?.length > 0
                                ? "Clear All"
                                :
                                <>{afterCountStatus == true ? (
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
                                {!ele?.id?.includes("Range") && !ele?.id?.includes("Price") && (
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
                                                  filterChecked[`${ele?.id}${opt?.id}`]?.checked ===
                                                    undefined
                                                    ? false
                                                    : filterChecked[`${ele?.id}${opt?.id}`]?.checked
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
                              </>
                            ))}
                          </div>
                        </div>}
                      </div>
                      {
                        filterProdListEmpty ?
                          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', height: '500px' }}>
                            <span className="smr_prod_datanotfound">
                              Products Not found !!!
                            </span>
                          </div>
                          :
                          <div className="smr_productList">
                            {
                              //  isOnlyProdLoading ? 
                              isProdLoading ?
                                (
                                  <ProductListSkeleton />
                                ) : (
                                  <div className="smr_outer_portion">
                                    {/* <div className="smr_breadcums_port">{`${menuParams?.menuname || ''}${menuParams?.FilterVal1 ? ` > ${menuParams?.FilterVal1}` : ''}${menuParams?.FilterVal2 ? ` > ${menuParams?.FilterVal2}` : ''}`}</div> */}
                                    <div className="smrMA_inner_portion">
                                      {finalProductListData?.map((productData, i) => {
                                        const isAvailable = imageAvailability[productData?.autocode];
                                        return (
                                          <div className="smrMA_productCard" style={{ width: (isSingleView && '98%') || (isDoubleView && '49%') }}>
                                            <div className="cart_and_wishlist_icon">
                                              {/* <Button className="smr_cart-icon"> */}
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

                                                onChange={(e) => handleCartandWish(e, productData, "Cart")}
                                                checked={cartArr[productData?.autocode] ?? productData?.IsInCart === 1 ? true : false}
                                              />
                                              {/* Object.values(cartArr)?.length > 0 ? cartArr[productData?.autocode] : */}
                                              {/* </Button> */}
                                              {/* <Button className="smr_wish-icon"> */}
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
                                                disableRipple={false}
                                                sx={{ padding: "10px", display: "none" }}

                                                onChange={(e) => handleCartandWish(e, productData, "Wish")}
                                                // checked={productData?.IsInWish}
                                                checked={wishArr[productData?.autocode] ?? productData?.IsInWish === 1 ? true : false}
                                              // Object.values(wishArr)?.length > 0 ? wishArr[productData?.autocode] :
                                              // onChange={(e) => handelWishList(e, products)}
                                              />
                                              {/* </Button> */}
                                            </div>

                                            <div className="smrMA_app_product_label">
                                              {productData?.IsInReadyStock == 1 &&
                                                <span className="smrMA_app_instock">In Stock</span>
                                              }
                                              {productData?.IsBestSeller == 1 && <span className="smrMA_app_bestSeller">Best Seller</span>}
                                              {productData?.IsTrending == 1 &&
                                                <span className="smrMA_app_intrending">Trending</span>
                                              }
                                              {productData?.IsNewArrival == 1 &&
                                                <span className="smrMA_app_newarrival">New</span>
                                              }
                                            </div>
                                            {/* {isAvailable === undefined
                                              ? <CardMedia style={{ width: '100%', height: '30vh' }} className='roop_productCard_cardMainSkeleton'>
                                                <Skeleton animation="wave" variant="rect" width={'100%'} height='40vh' style={{ backgroundColor: '#e8e8e86e' }} />
                                              </CardMedia> : */}
                                              <img
                                                className="smr_productCard_Image"
                                                style={{ height: (isSingleView && '412px') || (isDoubleView && '200px'), minHeight: (isSingleView && '412px') || (isDoubleView && '200px') }}

                                            id={`smr_productCard_Image${productData?.autocode}`}
                                            // src={productData?.DefaultImageName !== "" ? storeInit?.DesignImageFol+productData?.DesignFolderName+'/'+storeInit?.ImgMe+'/'+productData?.DefaultImageName : imageNotFound}
                                            // src={ ProdCardImageFunc(productData,0)}
                                            src={productData?.images?.length > 0 ? productData?.images[0] : imageNotFound}
                                            alt=""
                                            onClick={() => handleMoveToDetail(productData)}
                                            onMouseEnter={() => { handleImgRollover(productData, i) }}
                                            onError={(e)=>{
                                              e.target.src = imageNotFound ;
                                            }}
                                          />
                                          <div className="smr_prod_Title" >
                                            <span
                                              className={
                                                // productData?.TitleLine?.length > 30
                                                // ? 
                                                "smr_prod_title_with_width"
                                                // : 
                                                // "smr_prod_title_with_no_width"
                                              }
                                            >
                                              {productData?.TitleLine?.length > 0 && "-"}
                                              {productData?.TitleLine}{" "}
                                            </span>
                                            <span className="smrMA_prod_designno">
                                              {productData?.designno}
                                            </span>
                                          </div>
                                          <div className="smr_app_prod_Allwt" >
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', letterSpacing: maxwidth590px ? '0px' : '1px', gap: maxwidth1674px ? '0px' : '3px', flexWrap: 'wrap' }}>
                                              {/* <span className="smr_por"> */}
                                              {(storeInit?.IsGrossWeight == 1 && (Number(productData?.Gwt) !== 0)) && <span className="smr_prod_wt">
                                                <span className="smr_keys">GWT:</span>
                                                <span className="smr_val">
                                                  {(productData?.Gwt)?.toFixed(3)}
                                                </span>
                                              </span>
                                              }

                                                {(Number(productData?.Nwt !== 0)) &&
                                                  <>
                                                    <span style={{ fontSize: "10px", marginBottom: "2px" }}>|</span>
                                                    <span className="smr_prod_wt">
                                                      <span className="smr_keys">NWT:</span>
                                                      <span className="smr_val">
                                                        {(productData?.Nwt)?.toFixed(3)}
                                                      </span>
                                                    </span>
                                                  </>
                                                }
                                                {/* </span> */}
                                                {/* <span className="smr_por"> */}
                                                {(storeInit?.IsDiamondWeight == 1 && Number(productData?.Dwt) !== 0) &&
                                                  <>
                                                    <span style={{ fontSize: "10px", marginBottom: "2px" }}>|</span>
                                                    <span className="smr_prod_wt">
                                                      <span className="smr_keys">DWT:</span>
                                                      <span className="smr_val">
                                                        {(productData?.Dwt)?.toFixed(3)}{storeInit?.IsDiamondPcs === 1 ? `/${productData?.Dpcs}` : null}
                                                      </span>
                                                    </span>
                                                  </>
                                                }
                                                {(storeInit?.IsStoneWeight == 1 && Number(productData?.CSwt) !== 0) &&
                                                  <>
                                                    <span style={{ fontSize: "10px", marginBottom: "2px" }}>|</span>
                                                    <span className="smr_prod_wt">
                                                      <span className="smr_keys">CWT:</span>
                                                      <span className="smr_val">
                                                        {(productData?.CSwt)?.toFixed(3)}{storeInit?.IsStonePcs === 1 ? `/${productData?.CSpcs}` : null}
                                                      </span>
                                                    </span>
                                                  </>
                                                }
                                                {/* </span> */}
                                              </div>
                                            </div>
                                            <div className="smrMA_prod_mtcolr_price">
                                              <span className="smr_prod_metal_col">
                                                {findMetalColor(
                                                  productData?.MetalColorid
                                                )?.[0]?.metalcolorname.toUpperCase()}
                                                {findMetalColor(
                                                  productData?.MetalColorid
                                                )?.[0]?.metalcolorname.toUpperCase() && '-'}
                                                {
                                                  findMetalType(selectedMetalId ?? productData?.MetalPurityid)[0]
                                                    ?.metaltype
                                                }
                                              </span>
                                              <span>/</span>
                                              <span className="smrMA_price">
                                                <span className="smr_currencyFont">
                                                  {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                </span>

                                                <span className="smr_pricePort">
                                                  {formatter.format(productData?.UnitCostWithMarkUp)}
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}
                          </div>}
                    </div>
                  </>
                )}
            {storeInit?.IsProductListPagination == 1 &&
                                  Math.ceil(afterFilterCount / storeInit.PageSize)
                                   > 1 && 
                                    (
                                      <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10%",
              }}
              className="smr_pagination_portion"
            >
              <Pagination
                count={Math.ceil(afterFilterCount / storeInit.PageSize)}
                size={maxwidth464px ? "small" : "large"}
                shape="circular"
                page={currPage}
                onChange={handelPageChange}
                showFirstButton
                showLastButton
              />
            </div>
                                    )
            }
          </div>
        </div>
      </div>

      <Drawer
        anchor="bottom"
        open={isSortByDrawerOpen}
        onClose={() => setIsSortByDrawerOpen(false)}
      >
        {Newlist("bottom")}
      </Drawer>

      <Drawer
        anchor="bottom"
        open={isImgViewDrawerOpen}
        onClose={() => setIsImgViewDrawerOpen(false)}
      >
        {NewlistImageView("bottom")}
      </Drawer>

      <div style={styles.container}>
        <div style={styles.tab} onClick={() => setIsDrawerOpen(true)}>
          <FaFilter style={activeTab === "/" ? styles.activeIcon : styles.icon} />
          <span style={activeTab === "/" ? styles.activeText : styles.text}>Filter</span>
        </div>
        <div style={styles.tab} onClick={() => setIsSortByDrawerOpen(true)}>
          <BsFilterLeft style={activeTab === "/shortBy" ? styles.activeIcon : styles.icon} />
          <span style={activeTab === "/shortBy" ? styles.activeText : styles.text}>Sort By</span>
        </div>

        <div style={styles.tab} onClick={() => setIsImgViewDrawerOpen(true)}>
          <FaEye style={styles.icon} />
          <span style={styles.text}>Image View</span>
        </div>
      </div>
    </div>
  );
};

export default ProductList;



const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f0f0f0',
    height: '60px',
    borderTop: '1px solid #ccc',
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    flex: 1,
    color: '#666',
  },
  icon: {
    marginBottom: '5px',
    fontSize: '20px',
  },
  activeIcon: {
    color: '#0000ff78',
    fontSize: '20px',
  },
  text: {
    fontSize: '12px',
  },
  activeText: {
    color: '#0000ff78',
    fontWeight: 'bold',
    fontSize: '14px'
  },
};


const BreadCumView = ({ BreadCumsObj, handleBreadcums, IsBreadCumShow }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname || '';
const pathSegments = pathname.split('/'); 

const secondSegment = pathSegments.length > 2 ? decodeURIComponent(pathSegments[2]) : null;
console.log(location?.search.charAt(1) == "S" ? "" : BreadCumsObj()?.menuname)
  return (
    <div className="breadcrumb_fmg">
      <div className="empty_sorting_div_fmg">
        <span
          className="smr_App_breadcums_port_fmg"
          style={{fontSize:'12.5px !important' }}
          onClick={() => {
            navigate("/");
          }}
        >
          {"Home /"}
        </span>

        {location?.search.charAt(1) == "A" && (
          <div
            className="smr_App_breadcums_port_fmg"
          >
                         <span  style={{ marginLeft: "3px" , fontSize:'12.5px !important' }}>{location?.pathname?.split("/")[2]?.replaceAll('%20', '')}</span> 
          </div>
        )}

        {location?.search.charAt(1) == "T" && (
          <div
            className="smr_App_breadcums_port_fmg"
       >
            <span  style={{ marginLeft: "3px" , fontSize:'12.5px !important' }}>{"Trending"}</span>
          </div>
        )}

        {location?.search.charAt(1) == "S" && (
          <div
            className="smr_App_breadcums_port_fmg"
          >
         <span  style={{ marginLeft: "3px" , fontSize:'12.5px !important' }}>{secondSegment}</span>
          </div>
        )}

        {location?.search.charAt(1) == "B" && (
          <div
            className="smr_App_breadcums_port_fmg"
          >
            <span  style={{ marginLeft: "3px" , fontSize:'12.5px !important' }}>{"Best Seller"}</span>
          </div>
        )}

        {location?.search.charAt(1) == "N" && (
          <div
            className="smr_App_breadcums_port_fmg"
          >
            <span  style={{ marginLeft: "3px" , fontSize:'12.5px !important' }}>{"New Arrival"}</span>
          </div>
        )}

        {IsBreadCumShow && (
          <div
            className="smr_App_breadcums_port_fmg"
            style={{ marginLeft: "3px" , fontSize:'12.5px !important' }}
          >
            {/* {decodeURI(location?.pathname).slice(3).replaceAll("/"," > ").slice(0,-2)} */}
            {BreadCumsObj()?.menuname && (
              <span
              style={{ fontSize:'12.5px !important' }}
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
              style={{ fontSize:'12.5px !important' }}
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
              style={{ fontSize:'12.5px !important' }}
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