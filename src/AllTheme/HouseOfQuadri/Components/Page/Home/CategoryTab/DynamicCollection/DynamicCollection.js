import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./DynamicCollection.modul.scss";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Product } from "../../../../Constants/DynamicValue";
import ProductListApi from "../../../../../../../utils/API/ProductListAPI/ProductListApi";
import Cookies from "js-cookie";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MetalColorCombo } from "../../../../../../../utils/API/Combo/MetalColorCombo";
import { ColorStoneQualityColorComboAPI } from "../../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalTypeComboAPI } from "../../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineFilterListOff } from "react-icons/md";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IoChevronForward } from "react-icons/io5";
import Stories from 'react-insta-stories';
import imageNotFound from "../../../../Assets/noImageFound.jpg";

import {
  findMetalColor,
  findMetalType,
  formatRedirectTitleLine,
  formatter,
  formatTitleLine,
  storImagePath,
} from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  Input,
  PaginationItem,
  Skeleton,
  Slider,
  Stack,
  useMediaQuery,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { FilterListAPI } from "../../../../../../../utils/API/FilterAPI/FilterListAPI";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdFilterListAlt } from "react-icons/md";
import { toast } from 'react-toastify';
import FiberNewIcon from "@mui/icons-material/FiberNew";
import GradeIcon from "@mui/icons-material/Grade";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import pako from "pako";
import { SlPlus } from "react-icons/sl";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CartAndWishListAPI } from "../../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { Hoq_CartCount, Hoq_WishCount } from "../../../../Recoil/atom";
import { RemoveCartAndWishAPI } from "../../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import imagnotfound from './../../../../Assets/noImageFound.jpg';
import { ProductListConfig, ProductListConfig2, ReactStoriesConfig } from "../../../../Config/ReactStoriesConfig";
import StoryLine from "../../../../../../../utils/Glob_Functions/StoryLine/StoryLine";
import EditablePagination from "../../../../../../RoopJewellers/Components/Pages/ReusableComponent/EditablePagination/EditablePagination";
import RangeFilter from "../../../../../../../utils/Glob_Functions/RangeFilter/RangeFilter";


const DynamicCollection = () => {
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const location = useLocation();
  const { query } = useParams();
  const navigate = useNavigate();
  const [filterProdListEmpty, setFilterProdListEmpty] = useState(false);
  let cookie = Cookies.get("visiterId");
  const [ShowMore, SetShowMore] = useState(false);
  const [storeInit, setStoreInit] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductList, setProductList] = useState([]);
  const [selectedFilter, setselectedFilter] = useState("");
  const [productsPerPage, setproductsPerPage] = useState();
  const [menuParams, setMenuParams] = useState({});
  const [prodListType, setprodListType] = useState();
  const [productListData, setProductListData] = useState([]);
  const [locationKey, setLocationKey] = useState();
  const [isProdLoading, setIsProdLoading] = useState(true);
  const [metalTypeCombo, SetmetalTypeCombo] = useState([]);
  const [ColorStoneQualityColorCombo, SetColorStoneQualityColorCombo] =
    useState([]);
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);

  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const setCartCountVal = useSetRecoilState(Hoq_CartCount);
  const setWishCountVal = useSetRecoilState(Hoq_WishCount);
  const [diamondQualityColorCombo, SetdiamondQualityColorCombo] = useState([]);
  const [loginInfo, setLoginInfo] = useState();
  const [filterData, setfilterData] = useState([]);
  const [filterChecked, setFilterChecked] = useState([]);
  const [sliderValue, setSliderValue] = useState([]);
  const [sliderValue1, setSliderValue1] = useState([]);
  const [sliderValue2, setSliderValue2] = useState([]);
  const [sortBySelect, setSortBySelect] = useState("Recommended");
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [StoryLineProductList, setStoryLineProductList] = useState([]);
  const [selectedMetalId, setSelectedMetalId] = useState(
    loginUserDetail?.MetalId
  );
  const [SearchError, setSearchError] = useState(false)
  const [cartArr, setCartArr] = useState({});
  const [wishArr, setWishArr] = useState({});
  const [accExpanded, setAccExpanded] = useState(null);
  const [afterCountStatus, setAfterCountStatus] = useState(false);
  const [inputPage, setInputPage] = useState(currentPage);

  const [selectedDiaId, setSelectedDiaId] = useState(
    loginUserDetail?.cmboDiaQCid
  );
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
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

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeinit);

    let mtCombo = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
    SetmetalTypeCombo(mtCombo);

    let diaQcCombo = JSON.parse(
      sessionStorage.getItem("diamondQualityColorCombo")
    );
    SetdiamondQualityColorCombo(diaQcCombo);

    let CsQcCombo = JSON.parse(
      sessionStorage.getItem("ColorStoneQualityColorCombo")
    );
    SetColorStoneQualityColorCombo(CsQcCombo);
  }, []);

  useEffect(() => {
    setSelectedMetalId(loginUserDetail?.MetalId ?? storeInit?.MetalId);
    setSelectedDiaId(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
    // setSelectedCsId(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
    setSortBySelect('Recommended')
  }, [location?.key])

  useEffect(() => {
    let param = JSON.parse(sessionStorage.getItem("menuparams"));

    if (location?.state?.SearchVal === undefined) {
      setMenuParams(param);
    }
  }, [location?.key, productListData, filterChecked]);

  const FilterValueWithCheckedOnly = () => {
    let onlyTrueFilterValue = Object.values(filterChecked).filter(
      (ele) => ele.checked
    );

    if (onlyTrueFilterValue?.length > 0) {
      setCurrentPage(1);
      setInputPage(1);
    }

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

    return output;
  };


  useEffect(() => {
    // setCSSVariable();

    let mtid = loginUserDetail?.MetalId ?? storeInit?.MetalId;
    setSelectedMetalId(mtid);

    let diaid = loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid;
    setSelectedDiaId(diaid);

    let csid = loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid;
    setSelectedCsId(csid);
  }, []);

  //  range filter Api

  const handleRangeFilterApi = async (Rangeval) => {
    setIsProdLoading(true);
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
    // let netRange = { netMin: sliderValue1[0] ?? "", netMax: sliderValue1[1] ?? "" }
    // let grossRange = { grossMin: sliderValue2[0] ?? "", grossMax: sliderValue2[1] ?? "" }

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
          setIsProdLoading(false);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
        setIsProdLoading(false);
        setAfterCountStatus(false);
      });
  };
  const handleRangeFilterApi1 = async (Rangeval1) => {
    setIsProdLoading(true);
    setAfterCountStatus(true);

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
    // let DiaRange = { DiaMin: sliderValue[0] ?? "", DiaMax: sliderValue[1] ?? "" }
    // let grossRange = { grossMin: sliderValue2[0] ?? "", grossMax: sliderValue2[1] ?? "" }
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
          setIsProdLoading(false);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
        setIsProdLoading(false);
        setAfterCountStatus(false);
      });
  };
  const handleRangeFilterApi2 = async (Rangeval2) => {
    setIsProdLoading(true);
    setAfterCountStatus(true);

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

    // let DiaRange = { DiaMin: sliderValue[0] ?? diafilter?.Min, DiaMax: sliderValue[1] ?? diafilter?.Max }
    // let netRange = { netMin: sliderValue1[0] ?? "", netMax: sliderValue1[1] ?? "" }
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
          setIsProdLoading(false);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
        setIsProdLoading(false);
        setAfterCountStatus(false);
      });
  };

  //range filter handlers

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
    let diafilter = JSON.parse(
      filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options
    )[0];

    const newSliderValue = [...sliderValue];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    // if(index === 1  && diafilter?.Max > event.target.value){
    //   setSliderValue(newSliderValue);
    //   handleRangeFilterApi(newSliderValue);
    // }
    // if(index === 0 && diafilter?.Min < event.target.value){
    setSliderValue(newSliderValue);
    handleRangeFilterApi(newSliderValue);
    // }
  };
  // gross
  const handleInputChange1 = (index) => (event) => {
    const newSliderValue = [...sliderValue1];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setSliderValue1(newSliderValue);
    handleRangeFilterApi1(newSliderValue);
  };
  //
  const handleInputChange2 = (index) => (event) => {
    const newSliderValue = [...sliderValue2];
    newSliderValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setSliderValue2(newSliderValue);
    handleRangeFilterApi2(newSliderValue);
  };

  // range filter for diammond net wt  gross wet

  // const RangeFilterView = (ele) => {
  //   return (
  //     <>
  //       <div>
  //         <div>
  //           <Slider
  //             value={sliderValue}
  //             onChange={(event, newValue) => setSliderValue(newValue)}
  //             onChangeCommitted={handleSliderChange}
  //             valueLabelDisplay="auto"
  //             aria-labelledby="range-slider"
  //             min={JSON?.parse(ele?.options)[0]?.Min}
  //             max={JSON?.parse(ele?.options)[0]?.Max}
  //             step={0.001}
  //             sx={{ marginTop: "25px" }}
  //           />
  //         </div>
  //         <div style={{ display: "flex", gap: "10px" ,width:"100%",justifyContent:"space-between" }}>
  //           <Input
  //             value={sliderValue[0]}
  //             margin="none"
  //             onChange={handleInputChange(0)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //           <Input
  //             value={sliderValue[1]}
  //             margin="none"
  //             onChange={handleInputChange(1)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  // const RangeFilterView1 = (ele) => {
  //   // console.log("netwt",ele)
  //   return (
  //     <>
  //       <div>
  //         <div>
  //           <Slider
  //             value={sliderValue1}
  //             onChange={() => (event, newValue) => setSliderValue1(newValue)}
  //             onChangeCommitted={handleSliderChange1}
  //             valueLabelDisplay="auto"
  //             aria-labelledby="range-slider"
  //             min={JSON?.parse(ele?.options)[0]?.Min}
  //             max={JSON?.parse(ele?.options)[0]?.Max}
  //             step={0.001}
  //             sx={{ marginTop: "25px" }}
  //           />
  //         </div>
  //         <div style={{ display: "flex", gap: "10px" ,width:"100%",justifyContent:"space-between"  }}>
  //           <Input
  //             value={sliderValue1[0]}
  //             margin="dense"
  //             onChange={handleInputChange1(0)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //           <Input
  //             value={sliderValue1[1]}
  //             margin="dense"
  //             onChange={handleInputChange1(1)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  // const RangeFilterView2 = (ele) => {
  //   return (
  //     <>
  //       <div>
  //         <div>
  //           <Slider
  //             value={sliderValue2}
  //             onChange={(event, newValue) => setSliderValue2(newValue)}
  //             onChangeCommitted={handleSliderChange2}
  //             valueLabelDisplay="auto"
  //             aria-labelledby="range-slider"
  //             min={JSON?.parse(ele?.options)[0]?.Min}
  //             max={JSON?.parse(ele?.options)[0]?.Max}
  //             step={0.001}
  //             sx={{ marginTop: "25px" }}
  //           />
  //         </div>
  //         <div style={{ display: "flex", gap: "10px" ,width:"100%",justifyContent:"space-between"  }}>
  //           <Input
  //             value={sliderValue2[0]}
  //             margin="dense"
  //             onChange={handleInputChange2(0)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //               pattern: "\\d*(\\.\\d{0,3})?",
  //             }}
  //           />
  //           <Input
  //             value={sliderValue2[1]}
  //             margin="dense"
  //             onChange={handleInputChange2(1)}
  //             inputProps={{
  //               step: 0.001,
  //               min: JSON?.parse(ele?.options)[0]?.Min,
  //               max: JSON?.parse(ele?.options)[0]?.Max,
  //               type: "number",
  //               "aria-labelledby": "range-slider",
  //               pattern: "\\d*(\\.\\d{0,3})?",
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  // new range filter for diammond net wt  gross wet

  // Product Fetching Api
  useEffect(() => {
    setIsProdLoading(true);
    const fetchData = async () => {
      const data = JSON.parse(sessionStorage.getItem("storeInit"));
      setStoreInit(data);
      let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

      // let obj = {
      //   mt: data?.metalId,
      //   dia: data?.cmboDiaQCid,
      //   cs: data?.cmboCSQCid,
      // };

      let UrlVal = location?.search.slice(1).split("/");

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


      await ProductListApi({}, 1, obj, productlisttype, cookie,
        sortBySelect,
        DiaRange, netRange, grossRange
      )
        .then((res) => {
          if (res) {
            setproductsPerPage(res?.pdResp?.rd1[0]?.designcount);
            setProductListData(res?.pdList);
            setIsProdLoading(false);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
          }
          return res;
        })
        .then(async (res) => {
          let forWardResp1;
          if (res) {
            await FilterListAPI(productlisttype, cookie)
              .then((res) => {
                setfilterData(res);

                let diafilter =
                  JSON?.parse(
                    res?.filter((ele) => ele?.Name == "Diamond")[0]?.options
                  )[0] || [];
                let diafilter1 =
                  JSON?.parse(
                    res?.filter((ele) => ele?.Name == "NetWt")[0]?.options
                  )[0] || [];
                let diafilter2 =
                  JSON?.parse(
                    res?.filter((ele) => ele?.Name == "Gross")[0]?.options
                  )[0] || [];

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
            left: 0,
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
    setCurrentPage(1);
    setInputPage(1);
  }, [location?.key]);



  useEffect(() => {
    setAfterCountStatus(true);
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    //  if(location?.state?.SearchVal === undefined && Object.keys(filterChecked)?.length > 0){
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

    if (location?.key === locationKey && (Object.keys(filterChecked)?.length > 0 || isClearAllClicked === true)) {

      setIsProdLoading(true);
      setIsOnlyProdLoading(true);
      let DiaRange = { DiaMin: isDia ? sliderValue[0] : "", DiaMax: isDia ? sliderValue[1] : "" }
      let grossRange = { grossMin: isGross ? sliderValue2[0] : "", grossMax: isGross ? sliderValue2[1] : "" }
      let netRange = { netMin: isNet ? sliderValue1[0] : "", netMax: isNet ? sliderValue1[1] : "" }

      ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)

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
          setIsProdLoading(false);
          setIsOnlyProdLoading(false);
          setIsClearAllClicked(false);
        });
    }
  }, [filterChecked]);

  // Image Hover
  const ImageUrl = (designNo, ext) => {
    // return storeInit?.CDNDesignImageFol + designNo + "~" + 1 + "." + ext;
    return storeInit?.CDNDesignImageFolThumb + designNo + "~" + 1 + "." + ext;
  };
  const RollUpImageUrl2 = (designNo, ext, imagCount) => {
    if (imagCount > 1) {
      // return storeInit?.CDNDesignImageFol + designNo + "~" + 2 + "." + ext;
      return storeInit?.CDNDesignImageFolThumb + designNo + "~" + 2 + "." + ext;
    }
    return;
  };
  const VideoUrl = (i = 1, designno, VideoExtension) => {
    if (VideoExtension) {
      return (
        (storeInit?.CDNVPath) +
        designno +
        "~" +
        i +
        "." +
        VideoExtension
      );

    }
  };
  // Bread new comp

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

  // image hover ends
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
            SetmetalTypeCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      SetmetalTypeCombo(mtTypeLocal);
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
            SetdiamondQualityColorCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      SetdiamondQualityColorCombo(diaQcLocal);
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
            SetColorStoneQualityColorCombo(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      SetColorStoneQualityColorCombo(csQcLocal);
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

  // pRODUCT nAVIGATING lOGICS
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

  const handleScrollHeight = () => { };

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

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value);

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    setIsProdLoading(true);

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
    let DiaRange = { DiaMin: isDia ? sliderValue[0] : "", DiaMax: isDia ? sliderValue[1] : "" }
    let grossRange = { grossMin: isGross ? sliderValue2[0] : "", grossMax: isGross ? sliderValue2[1] : "" }
    let netRange = { netMin: isNet ? sliderValue1[0] : "", netMax: isNet ? sliderValue1[1] : "" }

    setCurrentPage(1);
    setInputPage(1);

    await ProductListApi(output, 1, obj, prodListType, cookie, sortby, DiaRange, netRange, grossRange)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsProdLoading(false);
      });
  };

  // cUTSOMIZATION
  const handelCustomCombo = (obj) => {
    let output = FilterValueWithCheckedOnly();
    setIsProdLoading(true);

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

    setCurrentPage(1);
    setInputPage(1);

    if (location?.state?.SearchVal === undefined) {
      let DiaRange = { DiaMin: isDia ? sliderValue[0] : "", DiaMax: isDia ? sliderValue[1] : "" }
      let grossRange = { grossMin: isGross ? sliderValue2[0] : "", grossMax: isGross ? sliderValue2[1] : "" }
      let netRange = { netMin: isNet ? sliderValue1[0] : "", netMax: isNet ? sliderValue1[1] : "" }

      setIsProdLoading(true);
      ProductListApi(
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
          setTimeout(() => {
            sessionStorage.setItem("short_cutCombo_val", JSON?.stringify(obj));
            setIsProdLoading(false);
          }, 100);
        });
    }
  };

  // Handling PrODUCT nAVIGATING
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
    // compressAndEncode(JSON.stringify(obj))

    decodeAndDecompress();

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    // navigate(`/d/${(productData?.TitleLine && productData?.TitleLine?.toLowerCase() !== "null" && productData?.TitleLine?.length > 0 ? productData?.TitleLine?.replace(/\s+/g, "_") + "_" : "")}${productData?.designno}?p=${encodeObj}`);
    navigate(`/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`);
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
  }, [selectedMetalId, selectedDiaId, selectedCsId]);

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // const handleRangeFilterApi = async (Rangeval) => {
  //   let output = FilterValueWithCheckedOnly();
  //   let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

  //   let DiaRange = { DiaMin: Rangeval[0], DiaMax: Rangeval[1] };
  //   let netRange = { netMin: sliderValue1[0], netMax: sliderValue1[1] };
  //   let grossRange = { grossMin: sliderValue2[0], grossMax: sliderValue2[1] };

  //   await ProductListApi(
  //     output,
  //     1,
  //     obj,
  //     prodListType,
  //     cookie,
  //     sortBySelect,
  //     DiaRange,
  //     netRange,
  //     grossRange
  //   )
  //     .then((res) => {
  //       if (res) {
  //         setProductListData(res?.pdList);
  //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log("err", err))
  //     .finally(() => {
  //       setIsOnlyProdLoading(false);
  //     });
  // };
  // const handleRangeFilterApi1 = async (Rangeval1) => {
  //   let output = FilterValueWithCheckedOnly();
  //   let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

  //   let DiaRange = { diaMin: sliderValue[0], diaMax: sliderValue[1] };
  //   let netRange = { netMin: Rangeval1[0], netMax: Rangeval1[1] };
  //   let grossRange = { grossMin: sliderValue2[0], grossMax: sliderValue2[1] };

  //   await ProductListApi(
  //     output,
  //     1,
  //     obj,
  //     prodListType,
  //     cookie,
  //     sortBySelect,
  //     DiaRange,
  //     netRange,
  //     grossRange
  //   )
  //     .then((res) => {
  //       if (res) {
  //         setProductListData(res?.pdList);
  //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log("err", err))
  //     .finally(() => {
  //       setIsOnlyProdLoading(false);
  //     });
  // };
  // const handleRangeFilterApi2 = async (Rangeval2) => {
  //   console.log("newValue", Rangeval2);

  //   let output = FilterValueWithCheckedOnly();
  //   let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

  //   let DiaRange = { diaMin: sliderValue[0], diaMax: sliderValue[1] };
  //   let netRange = { netMin: sliderValue1[0], netMax: sliderValue1[1] };
  //   let grossRange = { grossMin: Rangeval2[0], grossMax: Rangeval2[1] };

  //   await ProductListApi(
  //     output,
  //     1,
  //     obj,
  //     prodListType,
  //     cookie,
  //     sortBySelect,
  //     DiaRange,
  //     netRange,
  //     grossRange
  //   )
  //     .then((res) => {
  //       if (res) {
  //         setProductListData(res?.pdList);
  //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log("err", err))
  //     .finally(() => {
  //       setIsOnlyProdLoading(false);
  //     });
  // };

  // Range filter logics

  // Dummy Function just for trials
  // const handleRangeFilterApi = () => {
  //   // Implementation of your range filter API logic
  // };

  // // Example of defining handleRangeFilterApi1
  // const handleRangeFilterApi1 = () => {
  //   // Implementation of your range filter API 1 logic
  // };

  // // Example of defining handleRangeFilterApi2
  // const handleRangeFilterApi2 = () => {
  //   // Implementation of your range filter API 2 logic
  // };

  // Example of defining handleCheckboxChange

  // const handleInputChange = (index) => (event) => {
  //   const newSliderValue = [...sliderValue];
  //   newSliderValue[index] =
  //     event.target.value === "" ? "" : Number(event.target.value);
  //   setSliderValue(newSliderValue);
  //   handleRangeFilterApi(newSliderValue);
  // };
  // const handleInputChange1 = (index) => (event) => {
  //   const newSliderValue = [...sliderValue1];
  //   newSliderValue[index] =
  //     event.target.value === "" ? "" : Number(event.target.value);
  //   setSliderValue1(newSliderValue);
  //   handleRangeFilterApi1(newSliderValue);
  // };
  // const handleInputChange2 = (index) => (event) => {
  //   const newSliderValue = [...sliderValue2];
  //   newSliderValue[index] =
  //     event.target.value === "" ? "" : Number(event.target.value);
  //   setSliderValue2(newSliderValue);
  //   handleRangeFilterApi2(newSliderValue);
  // };

  useEffect(() => {
    const logininfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    setLoginInfo(logininfo);
  }, []);

  // const handelFilterClearAll = () => {
  //   setAfterCountStatus(false);
  //   if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) {
  //     setFilterChecked({});
  //   }
  //   setAccExpanded(false);
  // };

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
      if (Object.keys(filterChecked).length > 0 || isSliderChanged) {
        setIsClearAllClicked(true);
      }
    }
  };

  useEffect(() => {
    callAllApi();
  }, [loginInfo]);

  const totalPages = Math.ceil(
    afterFilterCount / storeInit.PageSize
  );

  const handlePageInputChange = (event) => {
    if (event.key === 'Enter') {
      let newPage = parseInt(inputPage, 10);
      if (newPage < 1) newPage = 1;
      if (newPage > totalPages) newPage = totalPages;
      setCurrentPage(newPage);
      setInputPage(newPage);
      handlePageChange("", newPage);
    }
  };

  const handlePageChange = (event, value) => {
    setIsProdLoading(true);
    setIsProdLoading(true)
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    setCurrentPage(value);
    setInputPage(value);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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


    // ProductListApi(output, value, obj, prodListType, cookie, sortBySelect)
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
          setIsProdLoading(false)
        }, 100);
      });
  };

  const handleCartandWish = (e, ele, type) => {
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

  // const BreadCumsObj = () => {
  //   let BreadCum = decodeURI(atob(location?.search.slice(3))).split("/");

  //   const values = BreadCum[0].split(",");
  //   const labels = BreadCum[1].split(",");

  //   const updatedBreadCum = labels.reduce((acc, label, index) => {
  //     acc[label] = values[index] || "";
  //     return acc;
  //   }, {});

  //   const result = Object.entries(updatedBreadCum).reduce(
  //     (acc, [key, value], index) => {
  //       acc[`FilterKey${index === 0 ? "" : index}`] =
  //         key.charAt(0).toUpperCase() + key.slice(1);
  //       acc[`FilterVal${index === 0 ? "" : index}`] = value;
  //       return acc;
  //     },
  //     {}
  //   );


  //   // decodeURI(location?.pathname).slice(3).slice(0,-1).split("/")[0]

  //   result.menuname = decodeURI(location?.pathname)
  //     .slice(3)
  //     .slice(0, -1)
  //     .split("/")[0];

  //   return result;
  // };

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

    if (result) {
      result.menuname = decodeURI(location?.pathname)?.slice(3)?.slice(0, -1)?.split("/")[0]
    } else {
      result = {}
    }

    return result
  }

  useEffect(() => {
    callAllApi();
  }, []);

  useEffect(() => {
    if (productListData?.length === 0 || !productListData) {
      setFilterProdListEmpty(true);
    } else {
      setFilterProdListEmpty(false);
      setAfterCountStatus(false);
    }
  }, [productListData]);

  useEffect(() => {
    handelFilterClearAll();
  }, [location?.pathname || location?.search]);

  const CustomLabel = ({ text }) => (
    <Typography
      sx={{
        fontFamily: "Tenor Sans , sans-serif !important",
        fontSize: {
          xs: "13.2px !important", // Mobile screens
          sm: "13.5px !important", // Tablets
          md: "13.6px !important", // Desktop screens
          lg: "13.7px !important", // Large desktops
          xl: "14.3px !important", // Extra large screens
        },
      }}
    >
      {text}
    </Typography>
  );

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

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }
  const ProdCardImageFunc = async (data) => {
    let pdImgList = [];
    let pdvideoList = [];

    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr = mtColorLocal?.filter((ele) => ele?.id === data?.MetalColorid)[0];
    }

    // Fetching color images
    // if (data?.ColorImageCount > 0) {
    //   for (let i = 1; i <= data?.ColorImageCount; i++) {
    //     let imgString =
    //       storeInit?.CDNDesignImageFol +
    //       data?.designno +
    //       "~" +
    //       i +
    //       "~" +
    //       mcArr?.colorcode +
    //       "." +
    //       data?.ImageExtension;

    //     const IsImg = await checkImageAvailability(imgString);
    //     if (IsImg) {
    //       pdImgList.push(imgString);
    //     }
    //   }
    // }

    if (data?.ImageCount > 0 && pdImgList.length === 0) {
      for (let i = 2; i <= data?.ImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          data?.designno +
          "~" +
          i +
          "." +
          data?.ImageExtension;

        const IsImg = await checkImageAvailability(imgString);
        if (IsImg) {
          pdImgList.push(imgString);
        }
      }
    }

    if (data?.VideoCount > 0) {
      for (let i = 1; i <= data?.VideoCount; i++) {
        let videoString =
          storeInit?.CDNVPath +
          data?.designno +
          "~" +
          i +
          "." +
          data?.VideoExtension;
        pdvideoList.push(videoString);
      }
    }

    return { images: pdImgList, videos: pdvideoList };
  };

  useEffect(() => {
    const MakeNewImageList = async () => {
      const newImgListPromises = productListData?.map(async (item) => {
        const media = await ProdCardImageFunc(item);
        return {
          designo: item?.designno,
          images: media.images,
          videos: media.videos,
        };
      });

      const result = await Promise.all(newImgListPromises);
      setStoryLineProductList(result)
    };

    if (productListData?.length > 0) {
      MakeNewImageList();
    }
  }, [productListData]);



  return (
    <>
      <div className="hoq_dynamic_Collections">
        {/* Mobile filter Drawer */}
        <Drawer
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          className="hoq_filterDrawer"
          style={{ zIndex: "99999999" }}
          sx={{
            zIndex: 9999999,
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(4px)',
            },
          }}
        >
          <div
            style={{
              padding: "10px"
            }}
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
                  fontFamily: "Tenor Sans , sans-serif",
                  marginTop: "12px",
                  padding: "4px 0"

                }}
              >
                Customization
              </Typography>
              {storeInit?.IsMetalCustComb == 1 && (
                <div
                // className="smr_metal_custom"
                >
                  <Typography
                    className="label"
                    sx={{
                      color: "#7f7d85",
                      fontSize: "14px",
                      fontFamily: "Tenor Sans , sans-serif",
                      padding: "4px 0"

                    }}
                  >
                    Metal:&nbsp;
                  </Typography>
                  <select
                    style={{
                      border: "1px solid #e1e1e1",
                      borderRadius: "2px",
                      minWidth: "270px",
                      textTransform: "uppercase",
                    }}
                    className="select"
                    value={selectedMetalId}
                    onChange={(e) => {
                      setSelectedMetalId(e.target.value)
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
                </div>
              )}

              {storeInit?.IsDiamondCustComb === 1 && (
                <div
                // className="smr_dia_custom"
                >
                  <Typography
                    className="label"
                    sx={{
                      color: "#7f7d85",
                      fontSize: "14px",
                      fontFamily: "Tenor Sans , sans-serif",
                      padding: "4px 0"
                    }}
                  >
                    Diamond:&nbsp;
                  </Typography>
                  <select
                    style={{
                      border: "1px solid #e1e1e1",
                      borderRadius: "2px",
                      minWidth: "270px",
                      textTransform: "uppercase",
                      fontWeight: "500",
                    }}
                    className="select"
                    value={selectedDiaId}
                    onChange={(e) => { setSelectedDiaId(e.target.value) }}
                  >
                    {diamondQualityColorCombo?.map((diaQc) => (
                      <option
                        className="option"
                        key={diaQc?.QualityId}
                        value={`${diaQc?.QualityId},${diaQc?.ColorId}`}
                        style={{
                          textTransform: "uppercase",
                        }}
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
                // className="smr_cs_custom"
                >
                  <Typography
                    className="label"
                    sx={{
                      color: "#7f7d85",
                      fontSize: "14px",
                      fontFamily: "Tenor Sans , sans-serif",
                      padding: "4px 0"

                    }}
                  >
                    color stone:&nbsp;
                  </Typography>
                  <select
                    style={{
                      border: "1px solid #e1e1e1",
                      borderRadius: "2px",
                      minWidth: "270px",
                      fontFamily: "Tenor Sans , sans-serif",
                      textTransform: "uppercase",
                    }}
                    className="select"
                    value={selectedCsId}
                    onChange={(e) => setSelectedCsId(e.target.value)}
                  >
                    {ColorStoneQualityColorCombo?.map((csCombo) => (
                      <option
                        className="option"
                        key={csCombo?.QualityId}
                        value={`${csCombo?.QualityId},${csCombo?.ColorId}`}
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "500"
                        }}
                      >
                        {" "}
                        {`${csCombo.Quality.toUpperCase()},${csCombo.color.toLowerCase()}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* sort */}
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
                      fontFamily: "Tenor Sans , sans-serif",
                      padding: "4px 0"

                    }}
                  >
                    Sort By:&nbsp;
                  </Typography>
                  <select
                    style={{
                      border: "1px solid #e1e1e1",
                      borderRadius: "2px",
                      minWidth: "270px",
                      fontFamily: "Tenor Sans , sans-serif ",
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
            <div
              className="smr_mobile_filter_portion"
              style={{
                fontFamily: "Tenor Sans , sans-serif !Important",
              }}
            >
              {filterData?.length > 0 && (
                <div className="smr_mobile_filter_portion_outter">
                  <span className="smr_filter_text"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%"
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "500",
                        fontFamily: "Tenor Sans , sans-serif",
                      }}
                    >
                      {
                        // Object.values(filterChecked).filter((ele) => ele.checked)
                        //   ?.length === 0 
                        !showClearAllButton()
                          ? (
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
                                <span>{`Product Found : ${afterFilterCount}`}</span>
                              )}
                            </>
                          )}
                    </span>
                    <span
                      onClick={() => handelFilterClearAll()}
                      style={{
                        fontWeight: "600",
                        fontFamily: "Tenor Sans , sans-serif",

                      }}
                    >
                      {
                        // Object.values(filterChecked).filter((ele) => ele.checked)
                        //   ?.length > 0 
                        showClearAllButton()
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
                                <span
                                  style={{
                                    fontWeight: "500",
                                    fontFamily: "Tenor Sans , sans-serif",
                                  }}
                                >{`Total Products: ${afterFilterCount}`}</span>
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
                                fontFamily: "Tenor Sans , sans-serif ",
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
                                  color: "gray",
                                  borderRadius: 0,
                                  fontFamily: "Tenor Sans , sans-serif",
                                  fontWeight: "500 !important",
                                  "&.MuiAccordionSummary-root": {
                                    padding: 0,
                                  },

                                }}
                                className="filtercategoryLable"
                              >
                                {/* <span> */}
                                <Typography sx={{
                                  color: "gray",
                                  borderRadius: 0,
                                  fontFamily: "Tenor Sans , sans-serif",
                                  fontWeight: "500 !important",
                                }}>  {ele.Fil_DisName}</Typography>
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
                                  fontFamily: "Tenor Sans , sans-serif",
                                  bgcolor: "white"
                                }}
                              >
                                {(JSON.parse(ele?.options) ?? []).map((opt) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      gap: "12px",
                                      fontFamily:
                                        "Tenor Sans , sans-serif !important",
                                    }}
                                    key={opt?.id}
                                  >
                                    <FormControlLabel
                                      sx={{
                                        "& .MuiFormControlLabel-label": {
                                          fontFamily:
                                            "Tenor Sans, sans-serif !important",
                                        },
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flexDirection: "row-reverse"
                                      }}
                                      control={
                                        <Checkbox
                                          disableRipple={true}
                                          name={`${ele?.id}${opt?.id}`}
                                          checked={
                                            filterChecked[`${ele?.id}${opt?.id}`]
                                              ?.checked === undefined
                                              ? false
                                              : filterChecked[
                                                `${ele?.id}${opt?.id}`
                                              ]?.checked
                                          }
                                          sx={{
                                            fontFamily:
                                              "Tenor Sans , sans-serif !important",
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            flexDirection: "row-reverse"
                                          }}
                                          style={{
                                            color: "#7f7d85",
                                            padding: 0,

                                            fontFamily:
                                              "Tenor Sans , sans-serif  !important",
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
                                      label={<CustomLabel text={opt.Name} />}
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
                              fontFamily: "Tenor Sans , sans-serif",
                              gap: "12px",
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
                                color: "gray",
                                borderRadius: 0,
                                fontFamily: "Tenor Sans , sans-serif",
                                "&.MuiAccordionSummary-root": {
                                  padding: 0,
                                },
                              }}
                              className="filtercategoryLable"
                              onClick={() => handleScrollHeight()}
                            >
                              {/* <span> */}
                              <Typography sx={{
                                color: "gray",
                                borderRadius: 0,
                                fontFamily: "Tenor Sans , sans-serif",
                                fontWeight: "500 !important",
                              }}>  {ele.Fil_DisName}</Typography>
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
                                fontFamily: "Tenor Sans , sans-serif",
                              }}
                            >
                              {(JSON.parse(ele?.options) ?? []).map((opt, i) => (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "12px",
                                    fontFamily: "Tenor Sans , sans-serif",
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
                                    style={{
                                      fontFamily: "Tenor Sans , sans-serif",
                                    }}
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      flexDirection: "row-reverse"
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
                                            : filterChecked[`Price${i}${i}`]
                                              ?.checked
                                        }
                                        style={{
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
                                    // sx={{
                                    //   display: "flex",
                                    //   justifyContent: "space-between", // Adjust spacing between checkbox and label
                                    //   width: "100%",
                                    //   flexDirection: "row-reverse", // Align items to the right
                                    //   fontFamily:'TT Commons Regular'
                                    // }}
                                    className="smr_mui_checkbox_label"
                                    label={
                                      <CustomLabel
                                        text={
                                          opt?.Minval == 0
                                            ? `Under  ${decodeEntities(
                                              loginUserDetail?.CurrencyCode ??
                                              storeInit?.CurrencyCode
                                            )} ${formatter(opt?.Maxval)}`
                                            : opt?.Maxval == 0
                                              ? `Over  ${decodeEntities(
                                                loginUserDetail?.CurrencyCode ??
                                                storeInit?.CurrencyCode
                                              )} ${formatter(opt?.Minval)}`
                                              : `${decodeEntities(
                                                loginUserDetail?.CurrencyCode ??
                                                storeInit?.CurrencyCode
                                              )}  ${formatter(
                                                opt?.Minval
                                              )} - ${decodeEntities(
                                                loginUserDetail?.CurrencyCode ??
                                                storeInit?.CurrencyCode
                                              )}  ${formatter(opt?.Maxval)}`
                                        }
                                      />
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
                            style={{
                              fontFamily: "Tenor Sans , sans-serif",
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
                                color: "gray",
                                borderRadius: 0,
                                fontSize: "14px",

                                "&.MuiAccordionSummary-root": {
                                  padding: 0,
                                },
                              }}
                              // className="filtercategoryLable"
                              onClick={() => handleScrollHeight()}
                            >
                              {/* <span> */}
                              <Typography sx={{
                                color: "gray",
                                borderRadius: 0,
                                fontFamily: "Tenor Sans , sans-serif",
                                fontWeight: "500 !important",
                              }}>  {ele.Fil_DisName}</Typography>
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
                                {/* {RangeFilterView(ele)} */}
                                {/* <RangeFilterView ele={ele} sliderValue={sliderValue} setSliderValue={setSliderValue} handleRangeFilterApi={handleRangeFilterApi} prodListType={prodListType} cookie={cookie} show={show} setShow={setShow} appliedRange1={appliedRange1} setAppliedRange1={setAppliedRange1} /> */}
                                <RangeFilter
                                  ele={ele}
                                  sliderValue={sliderValue}
                                  setSliderValue={setSliderValue}
                                  handleRangeFilterApi={handleRangeFilterApi}
                                  prodListType={prodListType}
                                  cookie={cookie}
                                  show={show}
                                  setShow={setShow}
                                  filterName="Diamond"
                                  setAppliedRange={setAppliedRange1}
                                  appliedRange={appliedRange1}
                                />
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
                                color: "gray",
                                borderRadius: 0,
                                fontSize: "14px",

                                "&.MuiAccordionSummary-root": {
                                  padding: 0,
                                },
                              }}
                              style={{
                                fontFamily: "Tenor Sans , sans-serif",
                              }}
                              // className="filtercategoryLable"
                              onClick={() => handleScrollHeight()}
                            >
                              {/* <span> */}
                              <Typography sx={{
                                color: "gray",
                                borderRadius: 0,
                                fontFamily: "Tenor Sans , sans-serif",
                                fontWeight: "500 !important",
                              }}>  {ele.Fil_DisName}</Typography>
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
                                {/* {RangeFilterView1(ele)} */}
                                {/* <RangeFilterView1 ele={ele} sliderValue1={sliderValue1} setSliderValue1={setSliderValue1} handleRangeFilterApi1={handleRangeFilterApi1} prodListType={prodListType} cookie={cookie} show1={show1} setShow1={setShow1} appliedRange2={appliedRange2} setAppliedRange2={setAppliedRange2} /> */}
                                <RangeFilter
                                  ele={ele}
                                  sliderValue={sliderValue1}
                                  setSliderValue={setSliderValue1}
                                  handleRangeFilterApi={handleRangeFilterApi1}
                                  prodListType={prodListType}
                                  cookie={cookie}
                                  show={show1}
                                  setShow={setShow1}
                                  filterName="NetWt"
                                  setAppliedRange={setAppliedRange2}
                                  appliedRange={appliedRange2}
                                />
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
                                color: "gray",
                                borderRadius: 0,
                                fontSize: "14px",

                                "&.MuiAccordionSummary-root": {
                                  padding: 0,
                                },
                              }}
                              style={{
                                fontFamily: "Tenor Sans , sans-serif",
                              }}
                              // className="filtercategoryLable"
                              onClick={() => handleScrollHeight()}
                            >
                              {/* <span> */}
                              <Typography sx={{
                                color: "gray",
                                borderRadius: 0,
                                fontFamily: "Tenor Sans , sans-serif",
                                fontWeight: "500 !important",
                              }}>  {ele.Fil_DisName}</Typography>
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
                                {/* {RangeFilterView2(ele)} */}
                                {/* <RangeFilterView2 ele={ele} sliderValue2={sliderValue2} setSliderValue2={setSliderValue2} handleRangeFilterApi2={handleRangeFilterApi2} prodListType={prodListType} cookie={cookie} show2={show2} setShow2={setShow2} appliedRange3={appliedRange3} setAppliedRange3={setAppliedRange3} /> */}
                                <RangeFilter
                                  ele={ele}
                                  sliderValue={sliderValue2}
                                  setSliderValue={setSliderValue2}
                                  handleRangeFilterApi={handleRangeFilterApi2}
                                  prodListType={prodListType}
                                  cookie={cookie}
                                  show={show2}
                                  setShow={setShow2}
                                  filterName="Gross"
                                  setAppliedRange={setAppliedRange3}
                                  appliedRange={appliedRange3}
                                />
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
          </div>
        </Drawer>
        {/* Main Image Banner */}
        <Banner />
        {/* Image Below */}
        <div className="collection_info">
          <h1>{query}</h1>
          <div className="para">
            <p>
              Symmetry is boring, imperfections make you perfect. But you know
              that because you dare to be different, you dare to be you.
            </p>
            {ShowMore && (
              <>
                <p>
                  This collection symbolises just that. Spanning over the three
                  shapes of diamond cuts, Emerald, Oval and Pear, these pieces
                  bring out the various shades of your personality. Unique, edgy
                  and unconventional yet unfailingly in vogue. A cut above the
                  rest, these stones are intertwined with light weight white
                  gold, that lets the diamonds do the talking.
                </p>
              </>
            )}
            <span onClick={() => SetShowMore(!ShowMore)}>
              {ShowMore ? "Read Less" : "Read More"}
            </span>
          </div>
        </div>
        <div className="bread_crumb_section">
          <BreadcrumbMenu
            BreadCumsObj={BreadCumsObj}
            IsBreadCumShow={IsBreadCumShow}
            handleBreadcums={handleBreadcums}
            location={location}
            navigate={navigate}
          />
        </div>
        <div className="filter_btn_mobile">
          <FilterButton
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            filterData={filterData}
            sliderValue={sliderValue}
            sliderValue1={sliderValue1}
            sliderValue2={sliderValue2}
            FilterValueWithCheckedOnly={FilterValueWithCheckedOnly}
          />
        </div>
        {/* Filter on Below on iamge Banner */}
        <div className="filter_section">
          {/* productlist cards */}
          <div className="cc_list">

            {isProdLoading ? (
              <div className="collections_list">
                <LoadingSkeleton />
              </div>
            ) : productListData && productListData.length > 0 ? (
              <div className="collections_list">
                {productListData.map((val, i) => (
                  <C_Card
                    key={i}
                    index={i}
                    // img={ImageUrl(val?.designno, val?.ImageExtension)}
                    img={ImageUrl(val?.designno, "jpg")}
                    videoUrl={VideoUrl(1, val?.designno, val?.VideoExtension)}
                    // rollUpImage={RollUpImageUrl2(
                    //   val?.designno,
                    //   val?.ImageExtension,
                    //   val?.ImageCount
                    // )}
                    rollUpImage={RollUpImageUrl2(
                      val?.designno,
                      "jpg",
                      val?.ImageCount
                    )}
                    // CurrenyCode={
                    //   loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode
                    // }
                    title={val?.TitleLine}
                    designo={val?.designno}
                    decodeEntities={decodeEntities}
                    productData={val}
                    handleMoveToDetail={handleMoveToDetail}
                    storeInit={storeInit}
                    selectedMetalId={selectedMetalId}
                    handleCartandWish={handleCartandWish}
                    cartArr={cartArr}
                    productIndex={i}
                    wishArr={wishArr}
                    CurrencyCode={loginUserDetail?.CurrencyCode}
                    CurrencyCode2={storeInit?.CurrencyCode}
                    StoryLineProductList={StoryLineProductList}
                  />
                ))}
              </div>
            ) : (
              // <NoProductFound />
              <NoSearchRes location={location} />
            )}

            {/* Math.ceil(afterFilterCount / storeInit.PageSize) > 1 && ( */}
            {/* {storeInit?.IsProductListPagination == 1 && */}
            {/* {storeInit?.IsProductListPagination == 1 &&
              Math.ceil(afterFilterCount / storeInit.PageSize) */}
            {storeInit?.IsProductListPagination == 1 &&
              Math.ceil(afterFilterCount / storeInit.PageSize) > 1 && (
                <div className="pagination_sec">
                  <PaginationBar
                    totalPages={Math.ceil(
                      afterFilterCount / storeInit?.PageSize
                    )}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    isEditablePage={1}
                    handlePageInputChange={handlePageInputChange}
                    inputPage={inputPage}
                    setInputPage={setInputPage}
                    afterFilterCount={afterFilterCount}
                    storeInit={storeInit}
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        sx={{
                          pointerEvents: item.page === currentPage ? 'none' : 'auto',
                        }}
                      />
                    )}

                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(DynamicCollection);

const FilterButton = ({
  isDrawerOpen,
  setIsDrawerOpen,
  FilterValueWithCheckedOnly = () => { },
  sliderValue,
  sliderValue1,
  sliderValue2,
  filterData
}) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [totalSelected, setTotalSelected] = useState(0);

  const calculateTotalFilters = (selectedFilters) => {
    if (!filterData) return 0;

    let diafilter = filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options?.length > 0
      ? JSON.parse(filterData?.filter((ele) => ele?.Name == "Diamond")[0]?.options)[0]
      : [];
    let diafilter1 = filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options?.length > 0
      ? JSON.parse(filterData?.filter((ele) => ele?.Name == "NetWt")[0]?.options)[0]
      : [];
    let diafilter2 = filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options?.length > 0
      ? JSON.parse(filterData?.filter((ele) => ele?.Name == "Gross")[0]?.options)[0]
      : [];

    const isDia = JSON.stringify(sliderValue) !== JSON.stringify((diafilter?.Min != null || diafilter?.Max != null) ? [diafilter?.Min, diafilter?.Max] : []);
    const isNet = JSON.stringify(sliderValue1) !== JSON.stringify((diafilter1?.Min != null || diafilter1?.Max != null) ? [diafilter1?.Min, diafilter1?.Max] : []);
    const isGross = JSON.stringify(sliderValue2) !== JSON.stringify((diafilter2?.Min != null || diafilter2?.Max != null) ? [diafilter2?.Min, diafilter2?.Max] : []);

    let totalCount = 0;

    for (const key in selectedFilters) {
      const value = selectedFilters[key];

      if (value.includes(",")) {
        const options = value.split(",").map((item) => item.trim());
        totalCount += options.length;
      } else {
        totalCount += 1;
      }
    }

    if (isDia) totalCount += 1;
    if (isNet) totalCount += 1;
    if (isGross) totalCount += 1;

    return totalCount;
  };

  useEffect(() => {
    if (isFirstLoad) {
      const timeoutId = setTimeout(() => {
        setIsFirstLoad(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isFirstLoad]);

  useEffect(() => {
    if (!isFirstLoad && filterData) {
      const values = FilterValueWithCheckedOnly();
      const total = calculateTotalFilters(values);
      setTotalSelected(total);
    }
  }, [isFirstLoad, filterData, sliderValue, sliderValue1, sliderValue2, FilterValueWithCheckedOnly]);

  return (
    <>
      <div className="fb_btn">
        <Badge
          sx={{
            "& .MuiBadge-badge": {
              bgcolor: "#C20000",
            },
          }}
          badgeContent={totalSelected} color="primary" className="badge_hoq_filter_Count">
          <Checkbox
            icon={<MdOutlineFilterList size={32} />}
            checkedIcon={<MdOutlineFilterListOff size={32} style={{ color: "#666666" }} />}
            checked={isDrawerOpen}
            onChange={(e) => setIsDrawerOpen(e.target.value)}
          />
        </Badge>
      </div>
    </>
  );
};

const Banner = () => {
  return (
    <div
      className="Banner"
      style={{
        backgroundImage: `url(${storImagePath()}/images/HomePage/ImageBannerTab/2.webp)`,
      }}
    >
      <h1>Imperfectly Perfect. </h1>
    </div>
  );
};
const C_Card = ({
  img,
  index,
  title,
  videoUrl,
  rollUpImage,
  designo,
  productData,
  storeInit,
  decodeEntities,
  selectedMetalId,
  handleMoveToDetail,
  handleCartandWish,
  cartArr,
  productIndex,
  wishArr,
  CurrencyCode,
  CurrencyCode2,
  StoryLineProductList
}) => {

  const [isHover, setisHover] = useState(false);
  const [isPlusClicked, SetisPlusClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resetKey, setResetKey] = useState(0); // A key to reset the story component
  const selectedProduct = StoryLineProductList && StoryLineProductList?.find(product => product?.designo == designo);

  const handleMouseEnter = () => {
    setResetKey(prevKey => prevKey + 1);
  };

  // Add staggered loading effect
  useEffect(() => {
    const delay = (productIndex + 1) * 150;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [productIndex]);

  return (
    <div className="C_Card" onMouseLeave={() => SetisPlusClicked(false)}>
      {isLoading ? (
        <Skeleton
          sx={{
            width: '100%',
            height: {
              xs: '200px !important',
              sm: '300px !important',
              md: '500px !important',
            },
            display: 'block',
          }}
          key={productIndex}
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          className="hoq_CartSkelton_1"
        />
      ) : (
        <>
          <div className="hoq_product_label">
            {productData?.IsInReadyStock == 1 && (
              <span className="hoq_instock">In Stock</span>
            )}
            {productData?.IsBestSeller == 1 && (
              <span className="hoq_bestSeller">Best Seller</span>
            )}
            {productData?.IsTrending == 1 && (
              <span className="hoq_intrending">Trending</span>
            )}
            {productData?.IsNewArrival == 1 && (
              <span className="hoq_newarrival">New</span>
            )}
          </div>
          <div className="hoq_plus">
            <Checkbox
              icon={
                <LocalMallOutlinedIcon
                  sx={{
                    fontSize: "26px",
                    color: "#7d7f85",
                    opacity: ".7",
                  }}
                />
              }
              checkedIcon={
                <LocalMallIcon
                  sx={{
                    fontSize: "26px",
                    color: "#009500",
                  }}
                />
              }
              disableRipple={false}
              sx={{ padding: "10px" }}
              onChange={(e) => handleCartandWish(e, productData, "Cart")}
              checked={
                cartArr[productData?.autocode] ?? productData?.IsInCart === 1
                  ? true
                  : false
              }
            />
            <Checkbox
              icon={
                <FavoriteBorderIcon
                  sx={{
                    fontSize: "26px",
                    color: "#7d7f85",
                    opacity: ".7",
                  }}
                />
              }
              checkedIcon={
                <FavoriteIcon
                  sx={{
                    fontSize: "26px",
                    color: "#e31b23",
                  }}
                />
              }
              disableRipple={false}
              sx={{ padding: "10px" }}
              onChange={(e) => handleCartandWish(e, productData, "Wish")}
              // checked={productData?.IsInWish}
              checked={
                wishArr[productData?.autocode] ?? productData?.IsInWish === 1
                  ? true
                  : false
              }
            />
          </div>
          <div
            onClick={() => handleMoveToDetail(productData)}
            className="image"
            style={{ border: "none" }}
            onMouseOver={() => setisHover(true)}
            onMouseOut={() => setisHover(false)}
            onMouseEnter={handleMouseEnter}
          >
            {selectedProduct && <StoryLine storeInit={storeInit} resetKey={resetKey} selectedProduct={selectedProduct} />}
            {/* {isHover && (videoUrl || rollUpImage) ? (
            <>
              {videoUrl ? (
                <div className="rollup_video">
                  <video
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    onError={(e) => (e.target.poster = "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg")}
                  />
                </div>
              ) : null}

              {!videoUrl && rollUpImage ? (
                <div className="rollup_img">
                  <img
                    src={rollUpImage}
                    alt="Roll Up Image"
                    onError={(e) => (e.target.src = "https://www.defindia.org/wp-content/themes/dt-the7/images/noimage.jpg")}
                  />
                </div>
              ) : null}
            </>
          ) : (
            <img
              src={img}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = imagnotfound;
              }}
            />
          )} */}
            <img
              src={img}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = imagnotfound;
              }}
              loading="lazy"
            />
          </div>

          <div className="det">
            <h2 className="">
              {/* {!title?.length > 0 ? designo : designo + "-" + title} */}
              {designo !== "" && designo}
              {formatTitleLine(title) && " - " + title}
            </h2>
            <small className="jewel_parameter">
              {storeInit?.IsGrossWeight == 1 && Number(productData?.Gwt) !== 0 && (
                <>
                  <span className="smr_prod_wt">
                    <span className="smr_keys">GWT:</span>
                    <span className="smr_val">{productData?.Gwt?.toFixed(3)}</span>
                  </span>
                </>
              )}
              {storeInit?.IsMetalWeight == 1 && Number(productData?.Nwt) !== 0 && (
                <>
                  {storeInit?.IsGrossWeight == 1 && Number(productData?.Gwt) !== 0 && <span>|</span>}
                  <span className="smr_prod_wt">
                    <span className="smr_keys">NWT:</span>
                    <span className="smr_val">{productData?.Nwt?.toFixed(3)} </span>
                  </span>
                </>
              )}

              {/* </span> */}
              {/* <span className="smr_por"> */}
              {storeInit?.IsDiamondWeight == 1 &&
                Number(productData?.Dwt) !== 0 && (
                  <>
                    {storeInit?.IsMetalWeight == 1 && Number(productData?.Nwt) !== 0 && <span>|</span>}
                    <span className="smr_prod_wt">
                      <span className="smr_keys">DWT:</span>
                      <span className="smr_val">
                        {productData?.Dwt?.toFixed(3)}
                        {storeInit?.IsDiamondPcs === 1
                          ? `/${productData?.Dpcs?.toFixed(0)}`
                          : null}
                      </span>
                    </span>
                  </>
                )}
              {storeInit?.IsStoneWeight == 1 && Number(productData?.CSwt) !== 0 && (
                <>
                  {storeInit?.IsDiamondWeight == 1 &&
                    Number(productData?.Dwt) !== 0 && <span>|</span>}
                  <span className="smr_prod_wt">
                    <span className="smr_keys">CWT:</span>
                    <span className="smr_val">
                      {productData?.CSwt?.toFixed(3)}
                      {storeInit?.IsStonePcs === 1
                        ? `/${productData?.CSpcs?.toFixed(0)}`
                        : null}
                    </span>
                  </span>
                </>
              )}
              {/* </span> */}
            </small>
            <div className="hoq_prod_mtcolr_price">
              {
                <span className="hoq_prod_metal_col">
                  {findMetalColor(
                    productData?.MetalColorid
                  )?.[0]?.metalcolorname?.toUpperCase()}
                  {findMetalColor(
                    productData?.MetalColorid
                  )?.[0]?.metalcolorname && "-"}
                  {
                    findMetalType(
                      productData?.IsMrpBase == 1
                        ? productData?.MetalPurityid
                        : selectedMetalId ?? productData?.MetalPurityid
                    )[0]?.metaltype
                  }
                </span>
              }
              {storeInit?.IsPriceShow === 1 && (
                <>
                  <span> / </span>
                  <span className="hoq_price">
                    <span
                      className="hoq_currencyFont"
                      style={{ paddingRight: "0.1rem" }}
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(CurrencyCode ?? CurrencyCode2),
                      }}
                    />
                    <span className="hoq_pricePort">
                      {productData?.UnitCostWithMarkUp?.toLocaleString("en-IN")}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
const PaginationBar = ({ totalPages, currentPage, onPageChange, isEditablePage, handlePageInputChange, inputPage, setInputPage, afterFilterCount, storeInit }) => {
  let maxwidth464px = useMediaQuery('(max-width:464px)')
  return (
    <>
      {isEditablePage === 1 ? (
        <div className="pagination-bar">
          <EditablePagination
            currentPage={currentPage}
            totalItems={afterFilterCount}
            itemsPerPage={storeInit.PageSize}
            onPageChange={onPageChange}
            inputPage={inputPage}
            setInputPage={setInputPage}
            handlePageInputChange={handlePageInputChange}
            maxwidth464px={maxwidth464px}
            totalPages={totalPages}
            currPage={currentPage}
            isShowButton={false}
          />
        </div>
      ) : (
        <div className="pagination-bar">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            shape="rounded"
            className="pagination-btn"
            size={maxwidth464px ? "small" : "large"}
            showFirstButton
            showLastButton
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  pointerEvents: item.page === currentPage ? 'none' : 'auto',
                }}
              />
            )}
          />
        </div>
      )}
    </>
  );
};
const NoProductFound = () => {
  return (
    <div className="NoProductFound">
      <h1>
        Sorry, no products match your current filters. Please adjust your
        criteria or contact support for assistance.
      </h1>
    </div>
  );
};
const NoSearchRes = ({ location }) => {
  return <div className="NoProductFound">
    <div className="">
      <p style={{ textTransform: 'capitalize' }}>We couldn't find any matches for</p>
      <p style={{ fontWeight: 'bold' }}>{`"${decodeURIComponent(location?.pathname?.split("/")[2])}".`}</p>
    </div>
    <br />
    <p className="search_notfound2">Please try another search.</p>
  </div>
}
const LoadingSkeleton = () => {
  return Array.from({ length: 8 }).map((_, i) => {
    return (
      <div className="C_Card">
        <div className="image">
          <Skeleton
            sx={{
              width: '100%',
              height: {
                xs: '200px !important',
                sm: '300px !important',
                md: '500px !important',
              },
              display: 'block',
            }}
            key={i}
            variant="rectangular"
            width={"100%"}
            height={"100%"}
            className="hoq_CartSkelton"
          />
        </div>
        <div
          className="det"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <Skeleton
            key={i}
            className="hoq_CartSkelton"
            width={"100%"}
            height={"22px"}
          />
          <Skeleton
            key={i}
            className="hoq_CartSkelton"
            width={"100%"}
            height={"22px"}
          />
          <Skeleton
            key={i}
            className="hoq_CartSkelton"
            width={"100%"}
            height={"22px"}
          />
        </div>
      </div>
    );
  });
};
const BreadcrumbMenu = ({
  BreadCumsObj,
  handleBreadcums,
  IsBreadCumShow,
  navigate,
  location,
}) => {
  return (
    <>
      <div
        className="hoq_sorting_div"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <span
          className="hoq_breadcums_port "
          style={{ color: "gray" }}
          onClick={() => {
            navigate("/");
          }}
        >
          {"Home"} <IoChevronForward />
        </span>

        {location?.search.charAt(1) == "A" && (
          <div className="hoq_breadcums_port" style={{ marginLeft: "3px" }}>
            {/* <span>{"Album"}</span> */}
            <span>{location?.pathname?.split("/")[2]?.replaceAll('%20', '')}</span>
          </div>
        )}

        {location?.search.charAt(1) == "T" && (
          <div className="hoq_breadcums_port" style={{ marginLeft: "3px" }}>
            <span>{"Trending"}</span>
          </div>
        )}

        {location?.search.charAt(1) == "B" && (
          <div className="hoq_breadcums_port" style={{ marginLeft: "3px" }}>
            <span>{"Best Seller"}</span>
          </div>
        )}
        {location?.search?.charAt(1) == "S" && (
          <div className="hoq_breadcums_port" style={{ marginLeft: "3px" }}>
            <span>{location?.pathname?.split("/")[2]}</span>
          </div>
        )}

        {location?.search.charAt(1) == "N" && (
          <div className="hoq_breadcums_port" style={{ marginLeft: "3px" }}>
            <span>{"New Arrival"}</span>
          </div>
        )}

        {IsBreadCumShow && (
          <div className="hoq_breadcums_port" style={{ marginLeft: "3px" }}>
            {/* {decodeURI(location?.pathname).slice(3).replaceAll("/"," > ").slice(0,-2)} */}
            {/* {BreadCumsObj()?.menuname && (
              <span
                onClick={() =>
                  handleBreadcums({
                    [BreadCumsObj()?.FilterKey]: BreadCumsObj()?.FilterVal,
                  })
                }
              >
                {BreadCumsObj()?.menuname}
              </span>
            )} */}
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
                <IoChevronForward />
                {`${BreadCumsObj()?.FilterVal1}`}
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
                {` > ${BreadCumsObj()?.FilterVal2}`}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};
// const StoryLine = ({resetKey,selectedProduct})=>{
//   if (!selectedProduct) {
//     return null; // Don't render if selectedProduct is not available
//   }
//   return <>
//     <div className="story-diamond"
//         style={{
//         position:"absolute",
//         top:"0",
//         bottom:"0",
//         overflow:"hidden" ,
//         zIndex:"9999" ,
//         height:"100%",
//         width:"100%" ,
//         backgroundColor:"red !important",
//       }}
//       >
//       <Stories
//       key={resetKey}
//       {...ReactStoriesConfig}
//       stories={selectedProduct?.images?.map((url) => ({ url }))}
//       />
//       </div>
//   </>
// }







{/* <div
        className="hoq_cart_and_wishlist_icon"
        style={{
          bottom: isPlusClicked ? "9.5rem" : "",
          opacity: isPlusClicked ? "" : "0.2",
        }}
      >
        <Checkbox
          icon={
            <h1 style={{ fontSize: "0.9rem", margin: 0, fontWeight: "600" }}>
              <IoBagHandleOutline color="green" size={"20px"} /> Add To Cart
            </h1>
          }
          checkedIcon={
            <h1 style={{ fontSize: "0.9rem", margin: 0, fontWeight: "600" }}>
              {" "}
              <IoBagHandleOutline color="green" size={"20px"} /> Added In Cart
            </h1>
          }
          disableRipple={false}
          sx={{
            padding: "10px",
            fontSize: "0.5rem",
            padding: "10px 15px",
            borderRadius: "1px",
          }}
          className="cart"
          // onChange={(e) => handleCartandWish(e, productData, "Cart")}
          // checked={
          //   cartArr[productData?.autocode] ?? productData?.IsInCart === 1
          //     ? true
          //     : false
          // }
        />
        <Checkbox
          icon={
            <h1 style={{ fontSize: "0.9rem", margin: 0, fontWeight: "600" }}>
              <CiHeart size={"24px"}   /> Wishlist
            </h1>
          }
          checkedIcon={
            <h1 style={{ fontSize: "0.9rem", margin: 0, fontWeight: "600" }}>
              <FaHeart size={"20px"} color="red" /> Wishlist
            </h1>
          }
          disableRipple={false}
          sx={{
            padding: "10px",
            fontSize: "0.5rem",
            padding: "10px 15px",
            borderRadius: "1px",
          }}
          className="wishlist"
          // onChange={(e) => handleCartandWish(e, productData, "Wish")}
          // checked={
          //   wishArr[productData?.autocode] ?? productData?.IsInWish === 1
          //     ? true
          //     : false
          // }
        />
      </div> */}