import React, { lazy, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./ProductList.modul.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import MuiAccordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import { Button, Divider, Drawer, IconButton, PaginationItem, Skeleton, Stack, useMediaQuery, useTheme } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FilterListIcon from "@mui/icons-material/FilterList";
import noImageFound from "../../../Assets/image-not-found.jpg";
import WindowIcon from "@mui/icons-material/Window";
import SortIcon from "@mui/icons-material/Sort";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Popover from "@mui/material/Popover";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AppsIcon from "@mui/icons-material/Apps";
import Modal from "@mui/material/Modal";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CiMenuKebab } from "react-icons/ci";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import debounce from "lodash.debounce";
import _ from "lodash";
import { Accordion, Box, FormControlLabel, Input, Slider } from "@mui/material";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import ProductListSkeleton from "../productlist_skeleton/ProductListSkeleton";
import Pako from "pako";
import ProductFilterSkeleton from "../productlist_skeleton/ProductFilterSkeleton";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { el_CartCount, el_WishCount } from "../../../Recoil/atom";
import {
  formatRedirectTitleLine,
  formatter,
  formatTitleLine,
  storImagePath,
} from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { Helmet } from "react-helmet";
import EditablePagination from "../../../../../RoopJewellers/Components/Pages/ReusableComponent/EditablePagination/EditablePagination";
import JsonLd from "../../../Jsonld";
import useGlobalPreventSave from "../../../../../../utils/Glob_Functions/useGlobalPreventSave";

const ProductList = () => {
  const location = useLocation();
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  let cookie = Cookies.get("visiterId");
  const navigate = useNavigate();
  const getBreadCrumData = JSON.parse(sessionStorage.getItem("breadcrumbData")) ?? "";

  let maxwidth700px = useMediaQuery("(max-width:700px)");
  let maxwidth1000px = useMediaQuery("(max-width:1000px)");
  let maxwidth1400px = useMediaQuery("(max-width:1400px)");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  let drawerWidth;

  if (isSmallScreen) {
    drawerWidth = "15rem";
  } else {
    drawerWidth = "20rem";
  }

  const baseUrl = window.location.origin;

  const breadcrumbData = [
    { name: "Homne", url: baseUrl },
    {
      name: "Product",
      url: `${baseUrl}${location?.pathname}${location?.search}`
    }
  ];

  useEffect(() => {
    sessionStorage.setItem("breadcrumbData", JSON.stringify(`${baseUrl}${location?.pathname}${location?.search}`));
  }, [])

  const generateBreadcrumbJsonLd = (breadcrumbs) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": breadcrumb.name,
        "item": breadcrumb.url
      }))
    };
  };

  useGlobalPreventSave();

  const jsonLd = generateBreadcrumbJsonLd(breadcrumbData);

  // Designing States
  const [showFilter, setShowFilter] = useState(false);
  const [showFilterTemp, setShowFilterTemp] = useState(false);
  const [trend, setTrend] = useState("Recommended");
  const [carat, setCarat] = useState("");
  const [clarity, setClarity] = useState("VS#GH");
  const [filter, setFilter] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openGridModal, setOpenGridModal] = useState(false);
  const [gridToggle, setGridToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIcon, setActiveIcon] = useState();

  // API's States
  const [menuParams, setMenuParams] = useState({});
  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const [productListData, setProductListData] = useState([]);
  const [metalType, setMetaltype] = useState([]);
  const [diamondType, setDiamondType] = useState([]);
  const [allFilter, setAllFilter] = useState([]);
  const [filterChecked, setFilterChecked] = useState({});
  const [prodListType, setprodListType] = useState();
  const [isProdLoading, setIsProdLoading] = useState(false);
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
  const [locationKey, setLocationKey] = useState();
  const [sortBySelect, setSortBySelect] = useState();
  const [csQcCombo, setCsQcCombo] = useState([]);
  const [storeInit, setStoreInit] = useState({});
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [rollOverImgPd, setRolloverImgPd] = useState({});
  const [filterPriceSlider, setFilterPriceSlider] = useState([]);
  const [filterGrossSlider, setFilterGrossSlider] = useState([]);
  const [filterNetWtSlider, setFilterNetWTSlider] = useState([]);
  const [sliderValue, setSliderValue] = useState([]);
  const [sliderValue1, setSliderValue1] = useState([]);
  const [sliderValue2, setSliderValue2] = useState([]);
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [filterDiamondSlider, setFilterDiamondSlider] = useState([]);
  const [loginInfo, setLoginInfo] = useState();
  const [detailsMenu, setDetailsMenu] = useState();
  const [selectedMetalId, setSelectedMetalId] = useState(
    loginUserDetail?.MetalId
  );
  const [selectedDiaId, setSelectedDiaId] = useState(
    loginUserDetail?.cmboDiaQCid
  );

  const [isClearAllClicked, setIsClearAllClicked] = useState(false);
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [close, setClose] = useState(false);
  const setCartCountVal = useSetRecoilState(el_CartCount);
  const setWishCountVal = useSetRecoilState(el_WishCount);
  const [cartArr, setCartArr] = useState({});
  const [wishArr, setWishArr] = useState({});
  const [visibleIndices, setVisibleIndices] = useState([]);
  const [loginCurrency, setLoginCurrency] = useState();
  const [inputPage, setInputPage] = useState(currPage);
  const [priceRangeValue, setPriceRangeValue] = useState(["", ""]);
  const [highestPrice, setHighestPrice] = useState();
  const [lowestPrice, setLowestPrice] = useState();
  const [inputPrice, setInputPrice] = useState(["", ""]);
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

  let maxwidth464px = useMediaQuery("(max-width:464px)");

  // useEffect(() => {
  //   // Update the activeIcon based on the value of openGridModal
  //   setActiveIcon(
  //     openGridModal ? "double_view" : filter ? "view_grid" : "apps"
  //   );
  //   if (showFilter) {
  //     setActiveIcon(
  //       openGridModal ? "double_view" : filter ? "apps" : "view_grid"
  //     );
  //   } else {
  //     setActiveIcon(
  //       openGridModal ? "double_view" : filter ? "view_grid" : "apps"
  //     );
  //   }
  // }, [openGridModal, filter, showFilter]);



  // Temporary purpose
  useEffect(() => {
    let icon = "view_grid"; // default

    if (openGridModal) {
      icon = "double_view";
    } else if (showFilterTemp) {
      icon = "apps";
    } else if (showFilter) {
      icon = "view_grid";
    }

    setActiveIcon(icon);
  }, [openGridModal, filter, showFilter, showFilterTemp]);

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

  const convertUrl = (productData) => {
    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId,
      d: selectedDiaId,
      c: selectedCsId,
      g: detailsMenu,
    };

    let encodeObj = compressAndEncode(JSON.stringify(obj));
    return encodeObj;
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": productListData.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${window.location.origin}/d/${formatRedirectTitleLine(product?.TitleLine)}${product?.designno}?p=${convertUrl(product)}`,
    }))
  };

  // let getDesignImageFol = storeInit?.CDNDesignImageFol;
  let getDesignImageFol = storeInit?.CDNDesignImageFolThumb;

  const handleCheckboxChange = (e, listname, val) => {
    const { name, checked } = e.target;

    setFilterChecked((prev) => ({
      ...prev,
      [name]: {
        checked,
        type: listname,
        id: name?.replace(/[a-zA-Z]/g, ""),
        value: val,
      },
    }));
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  function parseRangeData(filterData, name, sliderValue, inputValue) {
    const target = filterData?.find((ele) => ele?.Name === (name == "Dia" ? "Diamond" : name == "net" ? "NetWt" : name));
    const options = target?.options?.length > 0 ? JSON.parse(target.options)[0] : {};

    const isChanged = JSON.stringify(sliderValue) !== JSON.stringify([options?.Min, options?.Max]);

    return {
      [`${name != "Dia" ? name.toLowerCase() : name}Min`]: isChanged
        ? (sliderValue[0] !== inputValue[0] ? sliderValue[0] : inputValue[0])
        : "",
      [`${name != "Dia" ? name.toLowerCase() : name}Max`]: isChanged
        ? (sliderValue[1] !== inputValue[1] ? sliderValue[1] : inputValue[1])
        : ""
    };
  }

  const FilterValueWithCheckedOnly = () => {
    const onlyTrueFilterValue = Object.values(filterChecked).filter(
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

      if (item.type === "Price") {
        output["Price"] = priceValues;
        return;
      }

      output[item.type] += `${item.id}, `;
    });

    if (priceValues.length > 0 && (inputPrice[0] !== "" && inputPrice[1] !== "")) {
      setPriceRangeValue(["", ""]);
      setInputPrice(["", ""])
      setIsReset(false);
    }

    for (const key in output) {
      if (key !== "Price") {
        output[key] = output[key]?.slice(0, -2); // 
      }
    }

    return output;
  };


  useEffect(() => {
    setSelectedMetalId(loginUserDetail?.MetalId ?? storeInit?.MetalId);
    setSelectedDiaId(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
    setTrend('Recommended')
  }, [location?.key])

  useEffect(() => {
    // Avoid multiple calls by debouncing
    const debounceFilter = _.debounce(() => {
      let output = FilterValueWithCheckedOnly();
      let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

      if (location?.key === locationKey && (Object.keys(filterChecked)?.length > 0 || isClearAllClicked === true)) {
        const DiaRange = parseRangeData(filterData, "Dia", sliderValue, inputDia);
        const grossRange = parseRangeData(filterData, "Gross", sliderValue2, inputGross);
        const netRange = parseRangeData(filterData, "net", sliderValue1, inputNet);

        const inputPriceField = JSON.stringify(inputPrice) !== JSON.stringify(["", ""]);

        if (inputPriceField) {
          const pricerange = { PriceMin: inputPrice[0], PriceMax: inputPrice[1] };
          if (!output?.Price?.length) {
            output = { ...output, ...pricerange };
          }
        }

        setCurrPage(1);
        setInputPage(1);
        setIsOnlyProdLoading(true);

        ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
          .then((res) => {
            if (res) {
              setProductListData(res?.pdList);
              setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
            }
          })
          .catch((err) => console.log("err", err))
          .finally(() => {
            setIsOnlyProdLoading(false);
            setIsClearAllClicked(false);
          });
      }
    }, 300); // 300ms debounce

    debounceFilter();

    return () => {
      debounceFilter.cancel();
    };
  }, [filterChecked]);

  const handleGridToggles = (event) => {
    setAnchorEl(event.currentTarget); // Open the popover
  };

  const handleClosePopover = () => {
    setAnchorEl(null); // Close the popover
  };

  const handleChangeTrend = (event) => {
    setTrend(event.target.value);
  };
  const handleChangeCarat = (event) => {
    setCarat(event.target.value);
  };
  const handleChangeClarity = (event) => {
    setClarity(event.target.value);
  };

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleActiveIcons = (icons) => {
    setActiveIcon(icons);
    handleClosePopover();
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleGridToggle = () => {
    setGridToggle(!gridToggle);
  };

  const open = Boolean(anchorEl);
  const id = open ? "icon-popover" : undefined;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleResize = () => {
    const width = window.innerWidth;

    if (width <= 1400) {
      setFilter(true);
    } else {
      setFilter(false);
      setOpenDrawer(false);
    }

    // if (width <= 1400 && width >= 701) {
    //   setShowFilter(true);
    // } else {
    //   setShowFilter(false);
    // }

    // Temporary purpose
    if (width <= 1400 && width >= 1000) {
      setShowFilter(true);
    } else {
      setShowFilter(false);
    }

    // Temporary
    if (width <= 1001 && width >= 699) {
      setShowFilterTemp(true);
    } else {
      setShowFilterTemp(false);
    }

    if (width <= 700 && width >= 0) {
      setOpenGridModal(true);
    } else {
      setOpenGridModal(false);
    }
  };

  // cleared
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize1 = () => {
    const width = window.innerWidth;

    if (width <= 700) {
      setVisibleIndices([3, 4]);
    } else if (width <= 1400) {
      setVisibleIndices([0, 1]);
    } else {
      setVisibleIndices([0, 1, 2, 3, 4]);
    }

    // Your existing logic for setting other states
    setFilter(width <= 1400);
    setShowFilter(width <= 1400 && width >= 701);
    setOpenGridModal(width <= 700);
  };

  useEffect(() => {
    handleResize1();
    window.addEventListener("resize", handleResize1);
    return () => window.removeEventListener("resize", handleResize1);
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 1400) {
  //       setFilter(true);
  //       setShowFilter(true);
  //     } else {
  //       setFilter(false);
  //       setShowFilter(false);
  //     }
  //   };

  //   handleResize();

  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 700) {
  //       setOpenGridModal(true);
  //     } else {
  //       setOpenGridModal(false);
  //     }
  //   };

  //   handleResize();

  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // Working With API's

  const activeIconsBtns = [
    {
      name: "window",
      class1: "elv_filtered_prodlists_1",
      class2: "elv_filtered_image_1",
      class3: "elv_filtered_image_1_filter_click",
      calcWidth: "calc(100% / 2)",
    },
    {
      name: "apps",
      class1: "elv_filtered_prodlists_2",
      class2: "elv_filtered_image_2",
      class3: "elv_filtered_image_2_filter_click",
      calcWidth: "calc(100% / 3)",
    },
    {
      name: "view_grid",
      class1: "elv_filtered_prodlists_3",
      class2: "elv_filtered_image_3",
      class3: "elv_filtered_image_3_filter_click",
      calcWidth: "calc(100% / 4)",
    },
    {
      name: "single_view",
      class1: "elv_filtered_prodlists_4",
      class2: "elv_filtered_image_4",
      calcWidth: "calc(100% / 1)",
    },
    {
      name: "double_view",
      class1: "elv_filtered_prodlists_5",
      class2: "elv_filtered_image_5",
      calcWidth: "calc(100% / 2)",
    },
  ];

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(data);

    const loginData = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    setLoginCurrency(loginData);

    let mtid = loginUserDetail?.MetalId ?? data?.MetalId;
    setSelectedMetalId(mtid);

    let diaid = loginUserDetail?.cmboDiaQCid ?? data?.cmboDiaQCid;
    setSelectedDiaId(diaid);

    let csid = loginUserDetail?.cmboCSQCid ?? data?.cmboCSQCid;
    setSelectedCsId(csid);
  }, []);

  useEffect(() => {
    let params = JSON.parse(sessionStorage.getItem("menuparams"));
    setMenuParams(params);

    let metalTypeDrpdown = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
    setMetaltype(metalTypeDrpdown);
    setCarat(metalTypeDrpdown?.[1]?.Metalid);

    let diamondTypeDrpdown = JSON.parse(
      sessionStorage.getItem("diamondQualityColorCombo")
    );
    setDiamondType(diamondTypeDrpdown);
    setClarity(
      diamondTypeDrpdown?.[0]?.Quality + "#" + diamondTypeDrpdown?.[0]?.color
    );

    let CsQcCombo = JSON.parse(
      sessionStorage.getItem("ColorStoneQualityColorCombo")
    );
    setCsQcCombo(CsQcCombo);

    // let getAllFilter = JSON?.parse(sessionStorage?.getItem("AllFilter"));
    // setAllFilter(getAllFilter);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
        let UrlVal = location?.search?.slice(1).split("/");
        let MenuVal = "";
        let SearchVar = "";
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
            default:
              return "";
          }
        });

        if (MenuVal.length > 0) {
          let menuDecode = atob(MenuVal?.split("=")[1]);
          let key = menuDecode?.split("/")[1].split(",");
          let val = menuDecode?.split("/")[0].split(",");
          setIsBreadcumShow(true);
          productlisttype = [key, val];
          setDetailsMenu(productlisttype)
        }

        if (SearchVar) {
          productlisttype = SearchVar;
        }
        setprodListType(productlisttype);
        setDetailsMenu(productlisttype)
        setIsProdLoading(true);

        const DiaRange = parseRangeData(filterData, "Dia", sliderValue, inputDia);
        const grossRange = parseRangeData(filterData, "Gross", sliderValue2, inputGross);
        const netRange = parseRangeData(filterData, "net", sliderValue1, inputNet);

        const res = await ProductListApi({}, 1, obj, productlisttype, cookie,
          sortBySelect,
          DiaRange, netRange, grossRange
        );
        const res1 = await FilterListAPI(productlisttype, cookie);
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
        }

        if (res1) {
          setFilterData(res1);
          let priceFilter = JSON.parse(
            res1?.filter((ele) => ele.Name == "Price")[0]?.options
          )[0];
          setFilterPriceSlider(priceFilter);
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
          setFilterGrossSlider([diafilter2?.Min, diafilter2?.Max]);
          setFilterNetWTSlider([
            diafilter1?.Min.toFixed(3),
            diafilter1?.Max.toFixed(3),
          ]);

          // const highestPrice = res?.pdList?.reduce((max, item) => {
          //   return Math.max(max, item?.UnitCostWithMarkUpIncTax);
          // }, 0);
          // setHighestPrice(highestPrice);

          // const lowestPrice = res?.pdList?.reduce((min, item) => {
          //   const value = item?.UnitCostWithMarkUpIncTax;
          //   return value > 0 ? Math.min(min, value) : min;
          // }, Infinity);
          // setLowestPrice(lowestPrice);

          // setPriceRangeValue([lowestPrice, highestPrice]);
          // setInputPrice([lowestPrice, highestPrice])

          // let diafilter = res1?.filter((ele) => ele?.Name == "Diamond")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "Diamond")[0]?.options)[0] : [];
          // let diafilter1 = res1?.filter((ele) => ele?.Name == "NetWt")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "NetWt")[0]?.options)[0] : [];
          // let diafilter2 = res1?.filter((ele) => ele?.Name == "Gross")[0]?.options?.length > 0 ? JSON.parse(res?.filter((ele) => ele?.Name == "Gross")[0]?.options)[0] : [];

          setSliderValue(diafilter?.Min != null || diafilter?.Max != null ? [diafilter.Min, diafilter.Max] : []);
          setInputDia(diafilter?.Min != null || diafilter?.Max != null ? [diafilter.Min, diafilter.Max] : []);
          setSliderValue1(diafilter1?.Min != null || diafilter1?.Max != null ? [diafilter1?.Min, diafilter1?.Max] : []);
          setInputNet(diafilter1?.Min != null || diafilter1?.Max != null ? [diafilter1?.Min, diafilter1?.Max] : []);
          setSliderValue2(diafilter2?.Min != null || diafilter2?.Max != null ? [diafilter2?.Min, diafilter2?.Max] : []);
          setInputGross(diafilter2?.Min != null || diafilter2?.Max != null ? [diafilter2?.Min, diafilter2?.Max] : [])
          // setFilterDiamondSlider([diaFilter?.Min, diaFilter?.Max]);
        }
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
      setIsProdLoading(false);
      setIsOnlyProdLoading(false);
    };

    fetchData();

    if (location?.key) {
      setLocationKey(location?.key);
    }
    setCurrPage(1)
    setInputPage(1);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [location?.pathname]);

  // useEffect(() => {
  //   if (productListData?.length > 0) {
  //     const high = productListData.reduce((max, item) => Math.max(max, item.UnitCostWithMarkUpIncTax), 0);
  //     const low = productListData.reduce((min, item) => {
  //       const value = item.UnitCostWithMarkUpIncTax;
  //       return value > 0 ? Math.min(min, value) : min;
  //     }, Infinity);

  //     setLowestPrice(low);
  //     setHighestPrice(high);

  //     // Only set this once
  //     setPriceRangeValue([low, high]);
  //   }
  // }, [productListData]);

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handelPageChange = (event, value) => {
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    // setIsProdLoading(true);
    setIsOnlyProdLoading(true);
    setCurrPage(value);
    setInputPage(value);
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 100);

    const inputPriceField = JSON.stringify(inputPrice) !== JSON.stringify(["", ""]);

    if (inputPriceField) {
      const pricerange = { PriceMin: inputPrice[0], PriceMax: inputPrice[1] };
      output = { ...output, ...pricerange };
    }

    const DiaRange = parseRangeData(filterData, "Dia", sliderValue, inputDia);
    const grossRange = parseRangeData(filterData, "Gross", sliderValue2, inputGross);
    const netRange = parseRangeData(filterData, "net", sliderValue1, inputNet);

    // ProductListApi(output, value, obj, prodListType, cookie, sortBySelect)
    ProductListApi(output, value, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
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
          // setIsProdLoading(false);
          setIsOnlyProdLoading(false);
        }, 100);
      });
  };

  const totalPages = Math.ceil(
    afterFilterCount / storeInit.PageSize
  );

  // Handle page change using the editable input
  const handlePageInputChange = (event) => {
    if (event.key === 'Enter') {
      let newPage = parseInt(inputPage, 10);
      if (newPage < 1) newPage = 1; // Ensure the page is at least 1
      if (newPage > totalPages) newPage = totalPages; // Ensure the page doesn't exceed total pages
      setCurrPage(newPage);
      setInputPage(newPage);
      handelPageChange("", newPage);
    }
  };

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
            setMetaltype(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setMetaltype(mtTypeLocal);
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
            setDiamondType(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setDiamondType(diaQcLocal);
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
    }
  };

  useEffect(() => {
    const logininfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    setLoginInfo(logininfo);
  }, []);

  useEffect(() => {
    callAllApi();
  }, [loginInfo]);

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value);
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    const DiaRange = parseRangeData(filterData, "Dia", sliderValue, inputDia);
    const grossRange = parseRangeData(filterData, "Gross", sliderValue2, inputGross);
    const netRange = parseRangeData(filterData, "net", sliderValue1, inputNet);

    const inputPriceField = JSON.stringify(inputPrice) !== JSON.stringify(["", ""]);

    if (inputPriceField) {
      const pricerange = { PriceMin: inputPrice[0], PriceMax: inputPrice[1] };
      output = { ...output, ...pricerange };
    }

    setCurrPage(1);
    setInputPage(1);

    setIsOnlyProdLoading(true);
    let sortby = e.target?.value;

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
        setIsOnlyProdLoading(false);
      });
  };

  const handelCustomCombo = (obj) => {
    let output = FilterValueWithCheckedOnly();

    if (location?.state?.SearchVal === undefined) {
      const DiaRange = parseRangeData(filterData, "Dia", sliderValue, inputDia);
      const grossRange = parseRangeData(filterData, "Gross", sliderValue2, inputGross);
      const netRange = parseRangeData(filterData, "net", sliderValue1, inputNet);

      const inputPriceField = JSON.stringify(inputPrice) !== JSON.stringify(["", ""]);

      if (inputPriceField) {
        const pricerange = { PriceMin: inputPrice[0], PriceMax: inputPrice[1] };
        output = { ...output, ...pricerange };
      }

      setCurrPage(1);
      setInputPage(1);

      setIsOnlyProdLoading(true);
      ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
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
    const obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    sessionStorage.setItem("short_cutCombo_val", JSON.stringify(obj));

    if (loginInfo && Object.keys(loginInfo).length > 0) {
      if (selectedMetalId != undefined || selectedDiaId != undefined || selectedCsId != undefined) {
        if (loginInfo.MetalId !== selectedMetalId || loginInfo.cmboDiaQCid !== selectedDiaId || loginInfo.cmboCSQCid != selectedCsId) {
          handelCustomCombo(obj);
        }
      }
    } else {
      if (storeInit && Object.keys(storeInit).length > 0) {
        if (selectedMetalId != undefined || selectedDiaId != undefined || selectedCsId != undefined) {
          if (
            storeInit?.MetalId !== selectedMetalId ||
            storeInit?.cmboDiaQCid !== selectedDiaId ||
            storeInit?.cmboCSQCid !== selectedCsId
          ) {
            handelCustomCombo(obj);
          }
        }
      }
    }
  }, [selectedMetalId, selectedDiaId, selectedCsId]);

  // const handelFilterClearAll = () => {
  //   if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) {
  //     setFilterChecked({});
  //   }
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

    const isInputFields =
      JSON.stringify(inputPrice) !== JSON.stringify(["", ""]);

    // if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) {
    if (isFilterChecked || isSliderChanged || isInputFields) {
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
      setPriceRangeValue(["", ""]);
      setInputPrice(["", ""]);
      setInputDia(diafilter?.Min != null || diafilter?.Max != null ? [diafilter.Min, diafilter.Max] : []);
      setInputNet(diafilter1?.Min != null || diafilter1?.Max != null ? [diafilter1?.Min, diafilter1?.Max] : []);
      setInputGross(diafilter2?.Min != null || diafilter2?.Max != null ? [diafilter2?.Min, diafilter2?.Max] : []);
      setAppliedRange1(["", ""])
      setAppliedRange2(["", ""])
      setAppliedRange3(["", ""])
      setShow(false);
      setShow1(false);
      setShow2(false);
      setIsReset(false);
      setFilterChecked({});
      if (Object.keys(filterChecked).length > 0 || isSliderChanged || isInputFields) {
        setIsClearAllClicked(true);
      }
    }
  };

  useEffect(() => {
    handelFilterClearAll()
  }, [location?.key])

  const handleCartandWish = async (e, ele, type) => {

    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const prodObj = {
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

    if (type === "Wish") {
      setWishArr((prev) => ({
        ...prev,
        [ele?.autocode]: e.target.checked,
      }));
    }
    if (type === "Cart") {
      setCartArr((prev) => ({
        ...prev,
        [ele?.autocode]: e.target.checked,
      }));
    }

    if (e.target.checked) {
      await CartAndWishListAPI(type, prodObj, cookie)
        .then((res) => {
          if (res) {
            let cartC = res?.Data?.rd[0]?.Cartlistcount;
            let wishC = res?.Data?.rd[0]?.Wishlistcount;
            setWishCountVal(wishC);
            setCartCountVal(cartC);
          }
        })
        .catch((err) => console.log("addtocartwishErr", err));
    } else {
      await RemoveCartAndWishAPI(type, ele?.autocode, cookie)
        .then((res1) => {
          if (res1) {
            let cartC = res1?.Data?.rd[0]?.Cartlistcount;
            let wishC = res1?.Data?.rd[0]?.Wishlistcount;
            setWishCountVal(wishC);
            setCartCountVal(cartC);
          }
        })
        .catch((err) => console.log("removecartwishErr", err));
    }
  };

  const getDesignVideoFol = storeInit?.CDNVPath;

  const getDynamicImages = (designno, extension) => {
    // return `${getDesignImageFol}${designno}~${1}.${extension}`;
    return `${getDesignImageFol}${designno}~${1}.jpg`;
  };
  const getDynamicRollImages = (designno, count, extension) => {
    if (count > 1) {
      // return `${getDesignImageFol}${designno}~${2}.${extension}`;
      return `${getDesignImageFol}${designno}~${2}.jpg`;
    }
    return;
  };

  const getDynamicVideo = (designno, count, extension) => {
    if (extension && count > 0) {
      const url = `${getDesignVideoFol}${designno}~${1}.${extension}`;
      return url;
    }
    return;
  };
  const handleRangeFilterApi = async (Rangeval) => {
    setIsOnlyProdLoading(true);

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };


    setCurrPage(1);
    setInputPage(1);

    const inputPriceField = JSON.stringify(inputPrice) !== JSON.stringify(["", ""]);

    if (inputPriceField) {
      const pricerange = { PriceMin: inputPrice[0], PriceMax: inputPrice[1] };
      output = { ...output, ...pricerange };
    }

    const DiaRange = parseRangeData(filterData, "Dia", Rangeval, inputDia);
    const grossRange = parseRangeData(filterData, "Gross", sliderValue2, inputGross);
    const netRange = parseRangeData(filterData, "net", sliderValue1, inputNet);


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
          setIsOnlyProdLoading(false);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
      });

    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleRangeFilterApi1 = async (Rangeval1) => {
    setIsOnlyProdLoading(true);

    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };


    const inputPriceField = JSON.stringify(inputPrice) !== JSON.stringify(["", ""]);

    if (inputPriceField) {
      const pricerange = { PriceMin: inputPrice[0], PriceMax: inputPrice[1] };
      output = { ...output, ...pricerange };
    }

    const DiaRange = parseRangeData(filterData, "Dia", sliderValue, inputDia);
    const grossRange = parseRangeData(filterData, "Gross", sliderValue2, inputGross);
    const netRange = parseRangeData(filterData, "net", Rangeval1, inputNet);

    setCurrPage(1);
    setInputPage(1);

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
          setIsOnlyProdLoading(false);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
      });

    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleRangeFilterApi2 = async (Rangeval2) => {
    setIsOnlyProdLoading(true);
    let output = FilterValueWithCheckedOnly();
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    const inputPriceField = JSON.stringify(inputPrice) !== JSON.stringify(["", ""]);

    if (inputPriceField) {
      const pricerange = { PriceMin: inputPrice[0], PriceMax: inputPrice[1] };
      output = { ...output, ...pricerange };
    }

    const DiaRange = parseRangeData(filterData, "Dia", sliderValue, inputDia);
    const grossRange = parseRangeData(filterData, "Gross", Rangeval2, inputGross);
    const netRange = parseRangeData(filterData, "net", sliderValue1, inputNet);

    setCurrPage(1);
    setInputPage(1);

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
          setIsOnlyProdLoading(false);
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlyProdLoading(false);
      });

    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const debouncedRangeFilterApi = useMemo(
    () => debounce((value) => handleRangeFilterApi(value), 500),
    []
  );

  const debouncedRangeFilterApi1 = useMemo(
    () => debounce((value) => handleRangeFilterApi1(value), 500),
    []
  );

  const debouncedRangeFilterApi2 = useMemo(
    () => debounce((value) => handleRangeFilterApi2(value), 500),
    []
  );

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    debouncedRangeFilterApi(newValue);
  };
  const handleSliderChange1 = (event, newValue) => {
    setSliderValue1(newValue);
    debouncedRangeFilterApi1(newValue);
  };
  const handleSliderChange2 = (event, newValue) => {
    setSliderValue2(newValue);
    debouncedRangeFilterApi2(newValue);
  };

  const debounceTimeout = useRef(null);

  const handleInputChange = (index) => (event) => {
    const newValue = event.target.value === "" ? "" : Number(event.target.value);
    const newSliderValue = [...sliderValue];
    newSliderValue[index] = newValue;
    setSliderValue(newSliderValue);

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      handleRangeFilterApi(newSliderValue);
    }, 1000)
  };

  const handleInputChange1 = (index) => (event) => {
    const newValue = event.target.value === "" ? "" : Number(event.target.value);
    const newSliderValue = [...sliderValue1];
    newSliderValue[index] = newValue;
    setSliderValue1(newSliderValue);

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      handleRangeFilterApi(newSliderValue);
    }, 1000)
  };

  const handleInputChange2 = (index) => (event) => {
    const newValue = event.target.value === "" ? "" : Number(event.target.value);
    const updatedSlider = [...sliderValue2];
    updatedSlider[index] = newValue;
    setSliderValue2(updatedSlider);

    // Debounce API call
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      handleRangeFilterApi2(updatedSlider);
    }, 1000); // adjust delay if needed
  };

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

  const handleMoveToDetail = (productData) => {
    let output = FilterValueWithCheckedOnly();
    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId,
      d: selectedDiaId,
      c: selectedCsId,
      f: output,
      g: detailsMenu,
    };
    // compressAndEncode(JSON.stringify(obj))

    // decodeAndDecompress()

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    // navigate(
    //   `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
    //   }${productData?.designno}?p=${encodeObj}`
    // );
    // navigate(`/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`);

    const url = `/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`;

    window.open(url, '_blank');
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

  const DynamicListPageTitleLineFunc = () => {
    if (location?.search?.charAt(1) === "S") {
      return decodeURIComponent(location?.pathname?.split("/")[2]) || "ELvee Jewels Pvt. Ltd.";
    } else {
      const menuName = BreadCumsObj()?.menuname;
      return menuName ? menuName : "ELvee Jewels Pvt. Ltd.";
    }
  };

  const BreadCumsObj = () => {
    let BreadCum = decodeURI(atob(location?.search.slice(3)))?.split("/");

    const values = BreadCum[0]?.split(",");
    const labels = BreadCum[1]?.split(",");

    const updatedBreadCum = labels?.reduce((acc, label, index) => {
      acc[label] = values[index] || "";
      return acc;
    }, {});

    let result =
      updatedBreadCum &&
      Object.entries(updatedBreadCum)?.reduce((acc, [key, value], index) => {
        acc[`FilterKey${index === 0 ? "" : index}`] =
          key.charAt(0).toUpperCase() + key.slice(1);
        acc[`FilterVal${index === 0 ? "" : index}`] = value;
        return acc;
      }, {});

    // decodeURI(location?.pathname).slice(3).slice(0,-1).split("/")[0]

    result = result || {};
    result.menuname = decodeURI(location?.pathname)
      ?.slice(3)
      ?.slice(0, -1)
      ?.split("/")[0];

    return result;
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const CustomLabel = ({ text }) => (
    <Typography
      sx={{
        fontFamily: "sans-serif",
        fontSize: {
          xs: "14px !important", // Mobile screens
          sm: "14px !important", // Tablets
          md: "14px !important", // Desktop screens
          lg: "13.6px !important", // Large desktops
          xl: "15px !important", // Extra large screens
        },
      }}
    >
      {text}
    </Typography>
  );

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginInline: "20px",
    fontSize: "16px",
    fontFamily: "sans-serif",
    color: "rgb(127, 125, 133)",
    paddingBlock: "5px",
    flexDirection: "row-reverse",
  }));

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

    const isInputFields =
      JSON.stringify(inputPrice) !== JSON.stringify(["", ""])

    return isFilterChecked || isSliderChanged || isInputFields;
  };

  const PriceRangeInputs = ({
    priceValue,
    setpriceValue,
    lowestPrice,
    highestPrice,
    setLowestPrice,
    setHighestPrice,
    setProductListData,
    setAfterFilterCount,
    setPriceRangeValue,
    setIsOnlyProdLoading,
    selectedMetalId,
    selectedDiaId,
    selectedCsId,
    prodListType,
    cookie,
    filterChecked,
    isReset,
    setIsReset,
  }) => {
    const [initialPriceValue] = useState(priceValue); // store initial price range only once
    const [tempPriceRange, setTempPriceRange] = useState(priceValue);
    const [isShowBtn, setIsShowBtn] = useState(false);
    const secondInputRef = useRef(null);

    const handleFirstKeyDown = (e) => {
      if (e.key === 'Enter') {
        secondInputRef.current?.focus();
      }
    };

    const handleSecondKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleApply();
      }
    };

    useEffect(() => {
      const hasPriceChecked = Object.values(filterChecked).some(
        (item) => item.type === "Price" && item.checked
      );

      if (hasPriceChecked) {
        setTempPriceRange(priceValue);
      }
    }, [filterChecked]);


    const handlePriceRangeChange = (index) => (event) => {
      const value = event.target.value === "" ? "" : Number(event.target.value);
      const updatedRange = [...tempPriceRange];
      updatedRange[index] = value;
      setTempPriceRange(updatedRange);

      // Show apply/reset button only if values are changed from initial
      setIsShowBtn(
        updatedRange[0] !== initialPriceValue[0] || updatedRange[1] !== initialPriceValue[1]
      );
    };

    const DiaRange = parseRangeData(filterData, "Dia", sliderValue, inputDia);
    const grossRange = parseRangeData(filterData, "Gross", sliderValue2, inputGross);
    const netRange = parseRangeData(filterData, "net", sliderValue1, inputNet);

    const handleApply = async () => {
      const [min, max] = tempPriceRange;

      if (min == null || max == null || min === '' || max === '' || min === undefined || max === undefined) {
        toast.error("Please enter valid range values.", {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Validation: Not a number
      if (isNaN(min) || isNaN(max)) {
        toast.error("Please enter valid range values.", {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Validation: Negative values
      if (min < 0 || max < 0) {
        toast.error("Please enter valid range values.", {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Validation: Min > Max
      if (Number(min) > Number(max)) {
        toast.error("Please enter valid range values.", {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // Validation: Min == Max
      if (Number(min) === Number(max)) {
        toast.error("Please enter valid range values.", {
          hideProgressBar: true,
          duration: 5000,
        });
        return;
      }

      // setLowestPrice(min);
      // setHighestPrice(max);
      setPriceRangeValue(tempPriceRange);
      setInputPrice(tempPriceRange)
      setIsShowBtn(false);
      setIsOnlyProdLoading(true);
      setIsReset(true)

      let output = FilterValueWithCheckedOnly();

      const inputPriceField = JSON.stringify(tempPriceRange) !== JSON.stringify(["", ""]);

      if (inputPriceField) {
        const pricerange = { PriceMin: min, PriceMax: max };
        output = { ...output, ...pricerange };
      }

      const obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

      Object.keys(filterChecked).forEach((key) => {
        if (filterChecked[key].type === "Price") {
          filterChecked[key] = {
            ...filterChecked[key],
            checked: false,
            value: {},
          };
        }
      });

      try {
        const res = await ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange);

        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
        }
      } catch (error) {
        console.error("Price range apply failed:", error);
      } finally {
        setIsOnlyProdLoading(false);
      }

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    };

    const handleReset = async () => {
      setIsShowBtn(false);
      setIsOnlyProdLoading(true);
      setIsReset(false);
      const obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

      let output = FilterValueWithCheckedOnly();

      const inputPriceField = JSON.stringify(tempPriceRange) !== JSON.stringify(["", ""]);

      if (inputPriceField) {
        const pricerange = {};
        output = { ...output, ...pricerange };
      }

      try {
        const res = await ProductListApi(output, 1, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange);
        if (res) {
          const productList = res?.pdList || [];
          setProductListData(productList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);

          const high = productList.reduce(
            (max, item) => Math.max(max, item.UnitCostWithMarkUpIncTax),
            0
          );
          const low = productList.reduce((min, item) => {
            const value = item.UnitCostWithMarkUpIncTax;
            return value > 0 ? Math.min(min, value) : min;
          }, Infinity);

          setLowestPrice(low);
          setHighestPrice(high);

          const resetRange = [low, high];
          setTempPriceRange(["", ""]);
          setPriceRangeValue(["", ""])
          setInputPrice(["", ""])
        }
      } catch (error) {
        console.error("Price range reset failed:", error);
      } finally {
        setIsOnlyProdLoading(false);
      }

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    };

    return (
      <Box sx={{ border: "1px solid #ddd", borderRadius: 2, padding: 2, width: "100%" }}>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Price Range
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" mb={0.5}>
              Min Price
            </Typography>
            <Input
              fullWidth
              value={tempPriceRange[0]}
              onWheel={(e) => e.target.blur()}
              onChange={handlePriceRangeChange(0)}
              onKeyDown={handleFirstKeyDown}
              inputProps={{
                type: "number",
                style: {
                  MozAppearance: 'textfield'
                }
              }}
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                }
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" mb={0.5}>
              Max Price
            </Typography>
            <Input
              fullWidth
              inputRef={secondInputRef}
              value={tempPriceRange[1]}
              onWheel={(e) => e.target.blur()}
              onChange={handlePriceRangeChange(1)}
              onKeyDown={handleSecondKeyDown}
              inputProps={{
                type: "number",
                style: {
                  MozAppearance: 'textfield'
                }
              }}
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                }
              }}
            />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" mt={1} spacing={1}>
          {isReset &&
            <Button variant="outlined" onClick={handleReset} color="error">
              Reset
            </Button>
          }
          {isShowBtn && (
            <Button variant="outlined" onClick={handleApply} color="success">
              Apply
            </Button>
          )}
        </Stack>
      </Box>
    );
  };

  let iconConfig = { name: "view_grid" };

  return (
    <>
      <Helmet>
        <title>{DynamicListPageTitleLineFunc()}</title>
        {/* <JsonLd data={productSchema} /> */}
        <script type="application/ld+json">
          {JSON.stringify(productSchema, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, null, 2)}
        </script>
      </Helmet>
      <div className="elv_Productlists_Main_div">
        <div className="elv_Productlists_lists_div">
          <div className="elv_Productlists_lists_header">
            <div className="elv_Productlists_lists_header_breadcrumb">
              <div className="elv_Productslists_lists_name">
                <div className="elv_Productlists_details">
                  <span className="elv_Productlists_details_1">
                    {location?.search?.charAt(1) == "S" ? (
                      <>
                        {decodeURIComponent(location?.pathname?.split("/")[2])}
                      </>
                    ) : (
                      <>
                        {BreadCumsObj()?.menuname && (
                          <span
                            onClick={() =>
                              handleBreadcums({
                                [BreadCumsObj()?.FilterKey]:
                                  BreadCumsObj()?.FilterVal,
                              })
                            }
                          >
                            {BreadCumsObj()?.menuname}
                          </span>
                        )}
                      </>
                    )}
                  </span>
                  <span className="elv_Productlists_details_2">
                    &nbsp;&nbsp;&nbsp;{isOnlyProdLoading || isProdLoading ? <></> : afterFilterCount}
                  </span>
                  <span className="elv_Productlists_details_3">
                    &nbsp;{afterFilterCount === 1 ? "Design" : "Designs"}
                  </span>
                </div>
                <div role="presentation">
                  {productListData?.length > 0 ? (
                    <>
                      <div
                        className="elv_breadcrumbs"
                        style={{ marginLeft: "3px" }}
                      >
                        <span
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          {"Home >"}{" "}
                        </span>

                        {location?.search?.charAt(1) == "S" ? (
                          <span>
                            {decodeURIComponent(
                              location?.pathname?.split("/")[2]
                            )}
                          </span>
                        ) : (
                          <>
                            {/* {decodeURI(location?.pathname).slice(3).replaceAll("/"," > ").slice(0,-2)} */}
                            {IsBreadCumShow && (
                              <>
                                {BreadCumsObj()?.menuname && (
                                  <span
                                    onClick={() =>
                                      handleBreadcums({
                                        [BreadCumsObj()?.FilterKey]:
                                          BreadCumsObj()?.FilterVal,
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
                                        [BreadCumsObj()?.FilterKey]:
                                          BreadCumsObj()?.FilterVal,
                                        [BreadCumsObj()?.FilterKey1]:
                                          BreadCumsObj()?.FilterVal1,
                                      })
                                    }
                                  >
                                    {` > ${BreadCumsObj()?.FilterVal1 ||
                                      BreadCumsObj()?.FilterVal
                                      }`}
                                  </span>
                                )}

                                {BreadCumsObj()?.FilterVal2 && (
                                  <span
                                    onClick={() =>
                                      handleBreadcums({
                                        [BreadCumsObj()?.FilterKey]:
                                          BreadCumsObj()?.FilterVal,
                                        [BreadCumsObj()?.FilterKey1]:
                                          BreadCumsObj()?.FilterVal1,
                                        [BreadCumsObj()?.FilterKey2]:
                                          BreadCumsObj()?.FilterVal2,
                                      })
                                    }
                                  >
                                    {` > ${BreadCumsObj()?.FilterVal2}`}
                                  </span>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="elv_Productlists_lists_header_logo">
                <span>
                  <p className="elv_Productlist_ptitle">
                    <img
                      className="elv_Productlist_logo"
                      src={`${storImagePath()}/images/HomePage/MainBanner/featuresImage.png`}
                      alt="Logo"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </p>
                </span>
              </div>
            </div>
            <div className="elv_filteration_block_div">
              <div className="elv_filteration_rows">
                <div
                  onClick={handleShowFilter}
                  className={`${filter
                    ? "elv_filteration_rows_1_filter"
                    : "elv_filteration_rows_1"
                    }`}
                >
                  {filter ? (
                    <>
                      <span
                        className={`${filter
                          ? "elv_filter_content_1_filter"
                          : "elv_filter_content_1"
                          }`}
                        onClick={toggleDrawer(true)}
                      >
                        Filter
                      </span>
                      <span className="elv_filter_icon_1">
                        &nbsp;
                        <FilterListIcon onClick={toggleDrawer(true)} />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="elv_filter_content_1">
                        {showFilter ? "Show Filter" : "hide filter"}
                      </span>
                      <span className="elv_filter_icon_1">
                        {/* &nbsp; */}
                        <FilterListIcon style={{ fontSize: "26px" }} />
                      </span>
                    </>
                  )}
                </div>
                <div
                  className={`${filter
                    ? "elv_filteration_rows_2_filter"
                    : "elv_filteration_rows_2"
                    }`}
                >
                  <div
                    className={
                      maxwidth1000px || openGridModal
                        ? "elv_filter_row2_inner_div_hide"
                        : "elv_filter_row2_inner_div"
                    }
                  >
                    {/* <div className="elv_filter_row2_label">
                      <label className={maxwidth1000px || openGridModal ? 'elv_filter_sort_by_hide' : ''}>Sort by : </label>
                    </div> */}
                    <div
                      style={{
                        m: 1,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        border: "none",
                      }}
                    >
                      <select
                        value={trend}
                        onChange={(e) => {
                          handleSortby(e);
                          handleChangeTrend(e);
                          setIsOnlyProdLoading(true);
                        }}
                        className="elv_trend_drp"
                      >
                        <option value="Recommended">Recommended</option>
                        <option value="New">New</option>
                        <option value="Trending">Trending</option>
                        <option value="Bestseller">
                          Bestseller
                        </option>
                        {storeInit?.IsStockWebsite === 1 && (
                          <option value="In Stock">In Stock</option>
                        )}
                        {/* {storeInit?.IsHomeBestSeller === 1 && (
                          <option value="Bestseller">Bestseller</option>
                        )} */}
                        <option value="PRICE LOW TO HIGH">
                          Price Low to High
                        </option>
                        <option value="PRICE HIGH TO LOW">
                          Price High to Low
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                {openGridModal ? (
                  <>
                    <div className={`elv_filteration_rows_3_combo`}>
                      <span
                        className={`${filter
                          ? "elv_filter_content_2_filter"
                          : "elv_filter_content_2"
                          }`}
                        onClick={handleOpen}
                      >
                        Combo
                      </span>
                      <span className="elv_filter_icon_1">
                        &nbsp;
                        <SortIcon onClick={handleOpen} />
                      </span>
                      <Modal open={openModal} onClose={handleClose}>
                        <Box sx={modalStyle}>
                          {storeInit?.IsMetalCustomization === 1 && (
                            <div className={`elv_filteration_rows_3`}>
                              <div className="">
                                <div
                                  className=""
                                  style={{ paddingLeft: "0.7rem" }}
                                >
                                  <label>Metal :</label>
                                </div>
                                <FormControl
                                  style={{
                                    m: 1,
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    border: "none",
                                  }}
                                >
                                  <Select
                                    value={selectedMetalId}
                                    onChange={(e) => {
                                      setSelectedMetalId(e.target.value);
                                      setIsOnlyProdLoading(true);
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    className="elv_metal_drp"
                                  >
                                    {metalType?.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.Metalid}
                                      >
                                        {item.metaltype}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                          )}
                          {storeInit?.IsDiamondCustomization === 1 && (
                            <div className="elv_filteration_rows_4">
                              <div className="">
                                <div
                                  className=""
                                  style={{
                                    paddingLeft: "0.7rem",
                                    marginTop: "1rem",
                                  }}
                                >
                                  <label>Diamond :</label>
                                </div>
                                <FormControl
                                  style={{
                                    m: 1,
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    border: "none",
                                  }}
                                >
                                  <Select
                                    value={selectedDiaId}
                                    onChange={(e) => {
                                      setSelectedDiaId(e.target.value);
                                      setIsOnlyProdLoading(true);
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    className="elv_diamond_drp"
                                  >
                                    {diamondType?.map((item, index) => {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={`${item?.QualityId},${item?.ColorId}`}
                                        >
                                          {`${item.Quality}#${item?.color}`}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                          )}
                        </Box>
                      </Modal>
                    </div>
                  </>
                ) : (
                  <>
                    {storeInit?.IsMetalCustomization === 1 && (
                      <div className={`elv_filteration_rows_3`}>
                        <div className="elv_filter_row3_inner_div">
                          {/* <div className="elv_filter_row3_label">
                            <label>
                              Metal :
                            </label>
                          </div> */}
                          <div
                            style={{
                              m: 1,
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              border: "none",
                            }}
                          >
                            <select
                              value={selectedMetalId}
                              onChange={(e) => {
                                setSelectedMetalId(e.target.value);
                                setIsOnlyProdLoading(true);
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              className="elv_metal_drp"
                            >
                              {metalType?.map((item, index) => (
                                <option key={index} value={item.Metalid}>
                                  {item.metaltype}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    {storeInit?.IsDiamondCustomization === 1 && (
                      <div className="elv_filteration_rows_4">
                        <div className="elv_filter_row4_inner_div">
                          {/* <div className="elv_filter_row4_label">
                            <label>Diamond :</label>
                          </div> */}
                          <div
                            style={{
                              m: 1,
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              border: "none",
                            }}
                          >
                            <select
                              value={selectedDiaId}
                              onChange={(e) => {
                                setSelectedDiaId(e.target.value);
                                setIsOnlyProdLoading(true);
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              className="elv_diamond_drp"
                            >
                              {diamondType?.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={`${item?.QualityId},${item?.ColorId}`}
                                  >
                                    {`${item.Quality}#${item?.color}`}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {filter ? (
                  <>
                    <div
                      className={
                        openGridModal
                          ? `${filter
                            ? "elv_filteration_rows_5_filter_dots"
                            : "elv_filteration_rows_5"
                          }`
                          : `${filter
                            ? "elv_filteration_rows_5_filter"
                            : "elv_filteration_rows_5"
                          }`
                      }
                    >
                      <div className="elv_grid_view">
                        {openGridModal ? (
                          <>
                            <CiMenuKebab
                              onClick={handleGridToggles}
                              style={{ fontSize: "1.5rem", cursor: "pointer" }}
                            />
                            <Popover
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClosePopover}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                            >
                              <div style={{ padding: "10px" }}>
                                <div
                                  // style={{
                                  //   display: "flex",
                                  //   justifyContent: "center",
                                  //   flexDirection: "row",
                                  //   gap: "5px",
                                  // }}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    gap: "10px",
                                  }}
                                >
                                  {/* {activeIconsBtns.map((iconConfig, index) => {
                                    const isActive = iconConfig.name === activeIcon;
                                    const IconComponent = iconConfig.name === 'single_view' ? StopRoundedIcon : iconConfig.name === 'double_view' ? ViewStreamIcon : null;

                                    return (
                                      IconComponent && (
                                        <div
                                          key={index}
                                          label={IconComponent}
                                          onClick={() => handleActiveIcons(iconConfig.name)}
                                          style={{
                                            paddingRight: "8px",
                                            fontSize: iconConfig.name === 'double_view' ? "2rem" : "2.2rem",
                                            color: isActive ? "#000" : "#A2A2A2",
                                            cursor: "pointer",
                                          }}
                                        />
                                      )
                                    );
                                  })} */}
                                  {activeIconsBtns.map((iconConfig, index) => {
                                    const isActive =
                                      iconConfig.name === activeIcon;

                                    const label =
                                      iconConfig.name === "single_view"
                                        ? "Single View"
                                        : iconConfig.name === "double_view"
                                          ? "Double View"
                                          : null;

                                    return (
                                      label && (
                                        <div
                                          key={index}
                                          onClick={() =>
                                            handleActiveIcons(iconConfig.name)
                                          }
                                          style={{
                                            fontSize: "14px",
                                            textAlign: "center",
                                            color: isActive
                                              ? "#000"
                                              : "#A2A2A2",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {label}
                                        </div>
                                      )
                                    );
                                  })}
                                </div>
                              </div>
                            </Popover>
                          </>
                        ) : (
                          <>
                            {/* {activeIconsBtns?.map((iconConfig, index) => {
                              const isActive = iconConfig.name === activeIcon;
                              const IconComponent = 
                              iconConfig.name === "window"
                                ? WindowIcon
                                : iconConfig.name === "apps"
                                  ? AppsIcon
                                  : null;

                              return (
                                IconComponent && ( */}
                            <TfiLayoutGrid4Alt
                              // key={index}
                              onClick={() =>
                                handleActiveIcons("view_grid")
                              }
                              style={{
                                paddingRight: "8px",
                                fontSize: "1.8rem",
                                color: "#000",
                                cursor: "pointer",
                              }}
                            />
                            {/* )
                              );
                            })} */}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`${filter
                        ? "elv_filteration_rows_5_filter"
                        : "elv_filteration_rows_5"
                        }`}
                    >
                      <div className="elv_grid_view">
                        {/* {activeIconsBtns.map((iconConfig, index) => {
                          const isActive = iconConfig.name === activeIcon;
                          let IconComponent = null;

                          switch (iconConfig.name) {
                            case "window":
                              IconComponent = WindowIcon;
                              break;
                            case "apps":
                              IconComponent = AppsIcon;
                              break;
                            case "view_grid":
                              IconComponent = TfiLayoutGrid4Alt;
                              break;
                            default:
                              IconComponent = null;
                          }

                          return ( 
                        IconComponent && ( */}
                        <TfiLayoutGrid4Alt
                          // key={index}
                          onClick={() =>
                            handleActiveIcons("view_grid")
                          }
                          sx={{
                            paddingRight:
                              iconConfig.name === "view_grid"
                                ? "2px"
                                : "8px",
                            fontSize:
                              iconConfig.name === "view_grid"
                                ? "2.1rem"
                                : "2rem",
                            color: "#000",
                            cursor: "pointer",
                          }}
                          fontSize={
                            iconConfig?.name === "view_grid"
                              ? "1.25rem"
                              : "2rem"
                          }
                          color={"#000"}
                          paddingRight={
                            iconConfig.name === "view_grid"
                              ? "2px"
                              : "8px"
                          }
                          cursor={"pointer"}
                        />
                        {/* )
                          );
                        })} */}
                      </div>
                    </div>

                    {/* <div
                      className={`${filter ? "elv_filteration_rows_5_filter" : "elv_filteration_rows_5"}`}
                    >
                      <div className="elv_grid_view">
                        <TfiLayoutGrid4Alt
                          key="view_grid"
                          onClick={() => handleActiveIcons("view_grid")}
                          sx={{
                            paddingRight: "2px",
                            fontSize: "2.1rem",
                            color: activeIcon === "view_grid" ? "#000" : "#A2A2A2",
                            cursor: "pointer",
                          }}
                          fontSize="1.25rem"
                          color={activeIcon === "view_grid" ? "#000" : "#A2A2A2"}
                          paddingRight="2px"
                          cursor="pointer"
                        />
                      </div>
                    </div> */}
                  </>
                )}
              </div>
            </div>
            {isProdLoading ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flex: "100%",
                  }}
                >
                  {!maxwidth700px ? (
                    <>
                      <ProductListSkeleton />
                      <ProductFilterSkeleton />
                    </>
                  ) :
                    <ProductFilterSkeleton />
                  }
                </div>
              </>
            ) : (
              <>
                <div className="elv_filtered_data">
                  <div className="elv_filtered_data_div">
                    <div
                      className={
                        showFilter === false &&
                          filter === false &&
                          filterData?.length > 0
                          ? "elv_filtered_data_category"
                          : "elv_filtered_data_category_other"
                      }
                    >
                      {openDrawer ? (
                        <Drawer
                          open={filterData?.length > 0 ? openDrawer : ""}
                          onClose={toggleDrawer(false)}
                          PaperProps={{
                            sx: {
                              width: drawerWidth,
                            },
                          }}
                        >
                          <div className="elv_filtered_category_div ">
                            <div className="elv_filtered_data_div_filter_drawer">
                              <div className="elv_filtered_data_text">Filter</div>
                              <div
                                className="elv_filter_data_clearAll"
                                onClick={() => handelFilterClearAll()}
                              >
                                {
                                  // Object.values(filterChecked).filter(
                                  //   (ele) => ele.checked
                                  // )?.length
                                  //  > 
                                  // 0 
                                  showClearAllButton()
                                    ? (
                                      "Clear All"
                                    ) : (
                                      <span>{`Total Products: ${afterFilterCount || 0
                                        }`}</span>
                                    )}
                              </div>
                            </div>
                            {filterData?.map((item, index) => {
                              return (
                                <>
                                  {!item?.id?.includes("Range") &&
                                    !item?.id?.includes("Price") && (
                                      <Accordion
                                        key={index}
                                        className="accordian"
                                      >
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1-content"
                                          id="panel1-header"
                                          className="elv_category_names"
                                        >
                                          {item?.Fil_DisName}
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          {(
                                            JSON.parse(item?.options) ?? []
                                          ).map((opt) => {
                                            return (
                                              <>
                                                <CustomFormControlLabel
                                                  key={opt?.id}
                                                  label={
                                                    <CustomLabel
                                                      text={opt.Name}
                                                    />
                                                  }
                                                  control={
                                                    <Checkbox
                                                      name={`${item?.id}${opt?.id}`}
                                                      checked={
                                                        filterChecked[
                                                          `${item?.id}${opt?.id}`
                                                        ]?.checked === undefined
                                                          ? false
                                                          : filterChecked[
                                                            `${item?.id}${opt?.id}`
                                                          ]?.checked
                                                      }
                                                      style={{
                                                        color: "#7f7d85",
                                                        padding: 0,
                                                        width: "10px",
                                                      }}
                                                      onClick={(e) => {
                                                        handleCheckboxChange(
                                                          e,
                                                          item?.id,
                                                          opt?.Name
                                                        );
                                                        setIsOnlyProdLoading(
                                                          true
                                                        );
                                                        // setOpenDrawer(false);
                                                      }}
                                                      size="small"
                                                    />
                                                  }
                                                />
                                              </>
                                            );
                                          })}
                                        </AccordionDetails>
                                      </Accordion>
                                    )}
                                  {storeInit?.IsPriceShow == 1 && item?.id?.includes("Price") && (
                                    <Accordion className="accordian" sx={{ paddingInline: 0, borderBottom: "none" }}>
                                      <AccordionSummary
                                        sx={{ paddingInline: "16px" }}
                                        expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                      >
                                        <span className="elv_category_names">{item.Fil_DisName}</span>
                                      </AccordionSummary>

                                      <AccordionDetails
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "8px",
                                          minHeight: "fit-content",
                                          maxHeight: "300px",
                                          overflow: "auto",
                                        }}
                                      >
                                        {(JSON.parse(item?.options) ?? []).map((opt, i) => (
                                          <div key={i}>
                                            <CustomFormControlLabel
                                              control={
                                                <Checkbox
                                                  name={`Price${i}${i}`}
                                                  checked={!!filterChecked[`Price${i}${i}`]?.checked}
                                                  style={{ color: "#7f7d85", padding: 0, width: "10px" }}
                                                  onClick={(e) => {
                                                    handleCheckboxChange(e, item?.id, opt);
                                                    setIsOnlyProdLoading(true);
                                                  }}
                                                  size="small"
                                                />
                                              }
                                              className="elv_subCategory_name_price"
                                              label={
                                                <CustomLabel
                                                  text={
                                                    opt?.Minval == 0
                                                      ? `Under ${decodeEntities(loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode)} ${formatter(opt?.Maxval)}`
                                                      : opt?.Maxval == 0
                                                        ? `Over ${decodeEntities(loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode)} ${formatter(opt?.Minval)}`
                                                        : `${decodeEntities(loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode)} ${formatter(opt?.Minval)} - ${decodeEntities(loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode)} ${formatter(opt?.Maxval)}`
                                                  }
                                                />
                                              }
                                            />
                                          </div>
                                        ))}

                                        {/* 👇 Add your Input Range below the price checkboxes */}
                                        <hr style={{ marginBlock: "0.5rem" }} />
                                        <span style={{ textAlign: "center" }}>OR</span>
                                        <hr style={{ marginBlock: "0.5rem" }} />
                                        {JSON.parse(item?.options)?.length > 0 && (
                                          <PriceRangeInputs
                                            priceValue={priceRangeValue}
                                            setpriceValue={setPriceRangeValue}
                                            lowestPrice={lowestPrice}
                                            highestPrice={highestPrice}
                                            setLowestPrice={setLowestPrice}
                                            setHighestPrice={setHighestPrice}
                                            setProductListData={setProductListData}
                                            setAfterFilterCount={setAfterFilterCount}
                                            setPriceRangeValue={setPriceRangeValue}
                                            setIsOnlyProdLoading={setIsOnlyProdLoading}
                                            selectedMetalId={selectedMetalId}
                                            selectedDiaId={selectedDiaId}
                                            selectedCsId={selectedCsId}
                                            prodListType={prodListType}
                                            cookie={cookie}
                                            filterChecked={filterChecked}
                                            isReset={isReset}
                                            setIsReset={setIsReset}
                                          />
                                        )}
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                  {item?.Name?.includes("Diamond") && (
                                    <Accordion elevation={0}>
                                      <AccordionSummary
                                        sx={{
                                          paddingInline: "16px",
                                          '& .MuiAccordionSummary-content.Mui-expanded': {
                                            marginBlock: '0 !important',
                                          },
                                          '&.Mui-expanded': {
                                            minHeight: '20px',
                                          },
                                        }}
                                        expandIcon={
                                          <ExpandMoreIcon
                                            sx={{ width: "20px" }}
                                          />
                                        }
                                      >
                                        <span className="elv_category_names">
                                          {item?.Fil_DisName}
                                        </span>
                                      </AccordionSummary>
                                      <AccordionDetails
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          minHeight: "fit-content",
                                          maxHeight: "300px",
                                          overflow: "auto",
                                          paddingBottom: "40px !important",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            height: 88,
                                            paddingInline: "5px",
                                          }}
                                        // onChange={(e) =>
                                        //   setIsOnlyProdLoading(true)
                                        // }
                                        >
                                          {/* {RangeFilterView(item)} */}
                                          <RangeFilterView ele={item} sliderValue={sliderValue} setSliderValue={setSliderValue} handleRangeFilterApi={handleRangeFilterApi} prodListType={prodListType} cookie={cookie} show={show} setShow={setShow} appliedRange1={appliedRange1} setAppliedRange1={setAppliedRange1} />
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                  {item?.Name?.includes("Gross") && (
                                    <Accordion elevation={0}>
                                      <AccordionSummary
                                        sx={{
                                          paddingInline: "16px",
                                          '& .MuiAccordionSummary-content.Mui-expanded': {
                                            marginBlock: '0 !important',
                                          },
                                          '&.Mui-expanded': {
                                            minHeight: '20px',
                                          },
                                        }}
                                        expandIcon={
                                          <ExpandMoreIcon
                                            sx={{ width: "20px" }}
                                          />
                                        }
                                      >
                                        <span className="elv_category_names">
                                          {item?.Fil_DisName}
                                        </span>
                                      </AccordionSummary>
                                      <AccordionDetails
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          minHeight: "fit-content",
                                          maxHeight: "300px",
                                          overflow: "auto",
                                          paddingBottom: "40px !important",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            height: 88,
                                            paddingInline: "5px",
                                          }}
                                        // onChange={(e) =>
                                        //   setIsOnlyProdLoading(true)
                                        // }
                                        >
                                          {/* {RangeFilterView2(item)} */}
                                          <RangeFilterView2 ele={item} sliderValue2={sliderValue2} setSliderValue2={setSliderValue2} handleRangeFilterApi2={handleRangeFilterApi2} prodListType={prodListType} cookie={cookie} show2={show2} setShow2={setShow2} appliedRange3={appliedRange3} setAppliedRange3={setAppliedRange3} />
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                  {item?.Name?.includes("NetWt") && (
                                    <Accordion elevation={0}>
                                      <AccordionSummary
                                        sx={{
                                          paddingInline: "16px",
                                          '& .MuiAccordionSummary-content.Mui-expanded': {
                                            marginBlock: '0 !important',
                                          },
                                          '&.Mui-expanded': {
                                            minHeight: '20px',
                                          },
                                        }}
                                        expandIcon={
                                          <ExpandMoreIcon
                                            sx={{ width: "20px" }}
                                          />
                                        }
                                      >
                                        <span className="elv_category_names">
                                          {item?.Fil_DisName}
                                        </span>
                                      </AccordionSummary>
                                      <AccordionDetails
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "4px",
                                          minHeight: "fit-content",
                                          maxHeight: "300px",
                                          overflow: "auto",
                                          paddingBottom: "40px !important",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            height: 88,
                                            paddingInline: "5px",
                                          }}
                                        // onChange={(e) =>
                                        //   setIsOnlyProdLoading(true)
                                        // }
                                        >
                                          {/* {RangeFilterView1(item)} */}
                                          <RangeFilterView1 ele={item} sliderValue1={sliderValue1} setSliderValue1={setSliderValue1} handleRangeFilterApi1={handleRangeFilterApi1} prodListType={prodListType} cookie={cookie} show1={show1} setShow1={setShow1} appliedRange2={appliedRange2} setAppliedRange2={setAppliedRange2} />
                                        </Box>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                </>
                              );
                            })}
                          </div>
                        </Drawer>
                      ) : (
                        <div className="elv_filtered_category_div ">
                          <div className="elv_filtered_data_div_filter">
                            <div className="elv_filtered_data_text">Filter</div>
                            <div
                              className="elv_filter_data_clearAll"
                              onClick={() => handelFilterClearAll()}
                            >
                              {
                                // Object.values(filterChecked).filter(
                                //   (ele) => ele.checked
                                // )?.length > 0 
                                showClearAllButton()
                                  ? (
                                    "Clear All"
                                  ) : (
                                    <span>{`Total Products: ${afterFilterCount || 0
                                      }`}</span>
                                  )}
                            </div>
                          </div>
                          {filterData?.map((item, index) => {
                            return (
                              <>
                                {!item?.id?.includes("Range") &&
                                  !item?.id?.includes("Price") && (
                                    <Accordion
                                      key={index}
                                      className="accordian"
                                    >
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        className="elv_category_names"
                                      >
                                        {item?.Fil_DisName}
                                      </AccordionSummary>
                                      <AccordionDetails className="filter_details_mui">
                                        {(JSON.parse(item?.options) ?? []).map(
                                          (opt) => {
                                            return (
                                              <>
                                                <FormControlLabel
                                                  className="elv_subCategory_name_allfilter"
                                                  key={opt?.id}
                                                  label={
                                                    <CustomLabel
                                                      text={opt.Name}
                                                    />
                                                  }
                                                  control={
                                                    <Checkbox
                                                      name={`${item?.id}${opt?.id}`}
                                                      checked={
                                                        filterChecked[
                                                          `${item?.id}${opt?.id}`
                                                        ]?.checked === undefined
                                                          ? false
                                                          : filterChecked[
                                                            `${item?.id}${opt?.id}`
                                                          ]?.checked
                                                      }
                                                      style={{
                                                        color: "#7f7d85",
                                                        padding: 0,
                                                        width: "10px",
                                                      }}
                                                      onClick={(e) => {
                                                        handleCheckboxChange(
                                                          e,
                                                          item?.id,
                                                          opt?.Name
                                                        );
                                                        setIsOnlyProdLoading(
                                                          true
                                                        );
                                                      }}
                                                      size="small"
                                                    />
                                                  }
                                                />
                                              </>
                                            );
                                          }
                                        )}
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                {storeInit?.IsPriceShow == 1 && item?.id?.includes("Price") && (
                                  <Accordion className="accordian"
                                    sx={{
                                      borderBottom: "none !important"
                                    }}
                                  >
                                    <AccordionSummary
                                      sx={{ paddingInline: 0 }}
                                      expandIcon={
                                        <ExpandMoreIcon
                                          sx={{ width: "20px" }}
                                        />
                                      }
                                      aria-controls="panel1-content"
                                      id="panel1-header"
                                    >
                                      <span className="elv_category_names">
                                        {item.Fil_DisName}
                                      </span>
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
                                      {(JSON.parse(item?.options) ?? []).map(
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
                                                  onClick={(e) => {
                                                    {
                                                      handleCheckboxChange(
                                                        e,
                                                        item?.id,
                                                        opt
                                                      );
                                                      setIsOnlyProdLoading(
                                                        true
                                                      );
                                                    }
                                                  }}
                                                  size="small"
                                                />
                                              }
                                              className="elv_subCategory_name_price"
                                              label={
                                                <CustomLabel
                                                  text={
                                                    opt?.Minval == 0
                                                      ? `Under ${decodeEntities(
                                                        loginCurrency?.CurrencyCode ??
                                                        storeInit?.CurrencyCode
                                                      )} ${formatter(
                                                        opt?.Maxval
                                                      )}`
                                                      : opt?.Maxval == 0
                                                        ? `Over ${decodeEntities(
                                                          loginCurrency?.CurrencyCode ??
                                                          storeInit?.CurrencyCode
                                                        )} ${formatter(
                                                          opt?.Minval
                                                        )}`
                                                        : `${decodeEntities(
                                                          loginCurrency?.CurrencyCode ??
                                                          storeInit?.CurrencyCode
                                                        )} ${formatter(
                                                          opt?.Minval
                                                        )} - ${decodeEntities(
                                                          loginCurrency?.CurrencyCode ??
                                                          storeInit?.CurrencyCode
                                                        )} ${formatter(
                                                          opt?.Maxval
                                                        )}`
                                                  }
                                                />
                                              }
                                            />
                                          </div>
                                        )
                                      )}
                                      <hr style={{ marginBlock: "0.5rem" }} />
                                      <span style={{ textAlign: "center" }}>OR</span>
                                      <hr style={{ marginBlock: "0.5rem" }} />
                                      {JSON.parse(item?.options)?.length > 0 && (
                                        <PriceRangeInputs
                                          priceValue={priceRangeValue}
                                          setpriceValue={setPriceRangeValue}
                                          lowestPrice={lowestPrice}
                                          highestPrice={highestPrice}
                                          setLowestPrice={setLowestPrice}
                                          setHighestPrice={setHighestPrice}
                                          setProductListData={setProductListData}
                                          setAfterFilterCount={setAfterFilterCount}
                                          setPriceRangeValue={setPriceRangeValue}
                                          setIsOnlyProdLoading={setIsOnlyProdLoading}
                                          selectedMetalId={selectedMetalId}
                                          selectedDiaId={selectedDiaId}
                                          selectedCsId={selectedCsId}
                                          prodListType={prodListType}
                                          cookie={cookie}
                                          filterChecked={filterChecked}
                                          isReset={isReset}
                                          setIsReset={setIsReset}
                                        />
                                      )}
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                                {item?.Name?.includes("Diamond") && (
                                  <Accordion elevation={0}>
                                    <AccordionSummary
                                      sx={{
                                        paddingInline: 0,
                                        '& .MuiAccordionSummary-content.Mui-expanded': {
                                          marginBlock: '0 !important',
                                        },
                                        '&.Mui-expanded': {
                                          minHeight: '20px',
                                        },
                                      }}
                                      expandIcon={
                                        <ExpandMoreIcon
                                          sx={{ width: "20px" }}
                                        />
                                      }
                                    >
                                      <span className="elv_category_names">
                                        {item.Fil_DisName}
                                      </span>
                                    </AccordionSummary>
                                    <AccordionDetails
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                        minHeight: "fit-content",
                                        maxHeight: "300px",
                                        overflow: "auto",
                                        paddingBottom: "30px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{ width: 203, height: 88 }}
                                      // onChange={(e) =>
                                      //   setIsOnlyProdLoading(true)
                                      // }
                                      >
                                        {/* {RangeFilterView(item)} */}
                                        <RangeFilterView ele={item} sliderValue={sliderValue} setSliderValue={setSliderValue} handleRangeFilterApi={handleRangeFilterApi} prodListType={prodListType} cookie={cookie} show={show} setShow={setShow} appliedRange1={appliedRange1} setAppliedRange1={setAppliedRange1} />
                                      </Box>
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                                {item?.Name?.includes("Gross") && (
                                  <Accordion elevation={0}>
                                    <AccordionSummary
                                      sx={{
                                        paddingInline: 0,
                                        '& .MuiAccordionSummary-content.Mui-expanded': {
                                          marginBlock: '0 !important',
                                        },
                                        '&.Mui-expanded': {
                                          minHeight: '20px',
                                        },
                                      }}
                                      expandIcon={
                                        <ExpandMoreIcon
                                          sx={{ width: "20px" }}
                                        />
                                      }
                                    >
                                      <span className="elv_category_names">
                                        {item.Fil_DisName}
                                      </span>
                                    </AccordionSummary>
                                    <AccordionDetails
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                        minHeight: "fit-content",
                                        maxHeight: "300px",
                                        overflow: "auto",
                                        paddingBottom: "30px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{ width: 203, height: 88 }}
                                      // onChange={(e) =>
                                      //   setIsOnlyProdLoading(true)
                                      // }
                                      >
                                        {/* {RangeFilterView2(item)} */}
                                        <RangeFilterView2 ele={item} sliderValue2={sliderValue2} setSliderValue2={setSliderValue2} handleRangeFilterApi2={handleRangeFilterApi2} prodListType={prodListType} cookie={cookie} show2={show2} setShow2={setShow2} appliedRange3={appliedRange3} setAppliedRange3={setAppliedRange3} />
                                      </Box>
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                                {item?.Name?.includes("NetWt") && (
                                  <Accordion elevation={0}>
                                    <AccordionSummary
                                      sx={{
                                        paddingInline: 0,
                                        '& .MuiAccordionSummary-content.Mui-expanded': {
                                          marginBlock: '0 !important',
                                        },
                                        '&.Mui-expanded': {
                                          minHeight: '20px',
                                        },
                                      }}
                                      expandIcon={
                                        <ExpandMoreIcon
                                          sx={{ width: "20px" }}
                                        />
                                      }
                                    >
                                      <span className="elv_category_names">
                                        {item.Fil_DisName}
                                      </span>
                                    </AccordionSummary>
                                    <AccordionDetails
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                        minHeight: "fit-content",
                                        maxHeight: "300px",
                                        overflow: "auto",
                                        paddingBottom: "30px !important",
                                      }}
                                    >
                                      <Box
                                        sx={{ width: 203, height: 88 }}
                                      // onChange={(e) =>
                                      //   setIsOnlyProdLoading(true)
                                      // }
                                      >
                                        {/* {RangeFilterView1(item)} */}
                                        <RangeFilterView1 ele={item} sliderValue1={sliderValue1} setSliderValue1={setSliderValue1} handleRangeFilterApi1={handleRangeFilterApi1} prodListType={prodListType} cookie={cookie} show1={show1} setShow1={setShow1} appliedRange2={appliedRange2} setAppliedRange2={setAppliedRange2} />
                                      </Box>
                                    </AccordionDetails>
                                  </Accordion>
                                )}
                              </>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    {isOnlyProdLoading ? (
                      <>
                        {!maxwidth700px ? (

                          <ProductFilterSkeleton />
                        ) :
                          <>
                            <ProductListSkeleton />
                            <ProductFilterSkeleton />
                          </>
                        }
                      </>
                    ) : (
                      <>
                        {productListData.length == 0 ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "80%",
                              fontSize: "25px",
                              marginTop: "5rem",
                            }}
                          >
                            Products not found
                          </div>
                        ) : (
                          <>
                            <div
                              className={
                                showFilter
                                  ? "elv_filtered_data_by_grid"
                                  : "elv_filtered_data_by_grid_other_1"
                              }
                            >
                              <div className="elv_filtered_data_grid_div">
                                {activeIconsBtns.map((iconConfig, index) => {
                                  const isActive =
                                    iconConfig.name === activeIcon;
                                  return (
                                    isActive && (
                                      <React.Fragment key={index}>
                                        {productListData.map(
                                          (item, productIndex) => {
                                            return (
                                              <Product_Card
                                                key={productIndex}
                                                class1={iconConfig.class1}
                                                class2={iconConfig.class2}
                                                class3={iconConfig.class3}
                                                productData={item}
                                                calcVal={iconConfig.calcWidth}
                                                handleCartandWish={
                                                  handleCartandWish
                                                }
                                                cartArr={cartArr}
                                                wishArr={wishArr}
                                                loginCurrency={loginCurrency}
                                                imageUrl={getDynamicImages(
                                                  item.designno,
                                                  item.ImageExtension
                                                )}
                                                videoUrl={getDynamicVideo(
                                                  item.designno,
                                                  item.VideoCount,
                                                  item.VideoExtension
                                                )}
                                                RollImageUrl={getDynamicRollImages(
                                                  item.designno,
                                                  item.ImageCount,
                                                  item.ImageExtension
                                                )}
                                                handleMoveToDetail={
                                                  handleMoveToDetail
                                                }
                                                ImageCount={item?.ImageCount}
                                                VideoCount={item?.VideoCount}
                                                formatter={formatter}
                                                showFilter={showFilter}
                                                filter={filter}
                                                filterData={filterData}
                                                noImageFound={noImageFound}
                                                productIndex={productIndex}
                                                activeIcon={activeIcon}
                                              />
                                            )
                                          }
                                        )}
                                      </React.Fragment>
                                    )
                                  );
                                })}
                                {/* {storeInit?.IsProductListPagination == 1 &&
                                  Math.ceil(
                                    afterFilterCount / storeInit.PageSize
                                  ) > 1 && (
                                    <div className="pagination-container">
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
                                  )} */}
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
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;

const Product_Card = ({
  class1,
  class2,
  class3,
  productData,
  calcVal,
  videoUrl,
  handleCartandWish,
  cartArr,
  wishArr,
  RollImageUrl,
  imageUrl,
  handleMoveToDetail,
  loginCurrency,
  formatter,
  showFilter,
  filter,
  noImageFound,
  filterData,
  productIndex,
  activeIcon,
  ImageCount,
  VideoCount,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [storeInit, setStoreInit] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const maxwidth1000px = useMediaQuery('(max-width:1000px)');

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const formatTitleLine = (titleLine) => {
    // Implement the formatTitleLine function if needed
    return titleLine;
  };

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(data);
  }, []);

  // Add staggered loading effect
  useEffect(() => {
    const delay = (productIndex + 1) * 150;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [productIndex]);

  return (
    <>
      <div
        className={class1}
        style={{
          maxWidth: { calcVal },
        }}
      >
        <div className="elv_filtered_prods">
          <div className="elv_filtered_icons">
            <div>
              <Checkbox
                icon={
                  <LocalMallOutlinedIcon
                    sx={{ fontSize: "22px", color: "#0E244D", opacity: "0.3" }}
                  />
                }
                checkedIcon={
                  <LocalMallIcon sx={{ fontSize: "22px", color: "#0E244D" }} />
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
            </div>
            <div>
              <Checkbox
                icon={
                  <FavoriteBorderIcon
                    sx={{
                      fontSize: "22px",
                      color: "#c2001",
                      opacity: "0.3",
                    }}
                  />
                }
                checkedIcon={
                  <FavoriteIcon
                    sx={{
                      fontSize: "22px",
                      color: "#C20000",
                    }}
                  />
                }
                disableRipple={false}
                sx={{ padding: "10px" }}
                onChange={(e) => handleCartandWish(e, productData, "Wish")}
                checked={
                  wishArr[productData?.autocode] ?? productData?.IsInWish === 1
                    ? true
                    : false
                }
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleMoveToDetail(productData)}
          >
            <div
              className="elv_image_prod"
              onMouseOver={() => setIsHover(true)}
              onMouseOut={() => setIsHover(false)}
            >
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={!maxwidth1000px
                    ? (activeIcon === "apps" ? "412px" :
                      activeIcon === "window" ? "600px" :
                        activeIcon === "view_grid" ? "250px" : "100%")
                    : "100%"}
                  animation="wave"
                  sx={{
                    minHeight: "250px",
                    backgroundColor: "#f0f0f0"
                  }}
                />
              ) : (
                <>
                  <div className="elvWeb_app_product_label">
                    {productData?.IsInReadyStock == 1 && (
                      <span className="elvWeb_app_instock">In Stock</span>
                    )}
                    {productData?.IsBestSeller == 1 && (
                      <span className="elvWeb_app_bestSeller">Best Seller</span>
                    )}
                    {productData?.IsTrending == 1 && (
                      <span className="elvWeb_app_intrending">Trending</span>
                    )}
                    {productData?.IsNewArrival == 1 && (
                      <span className="elvWeb_app_newarrival">New</span>
                    )}
                  </div>

                  <div className="elv_rollup_video">
                    {videoUrl !== undefined ? (
                      <video
                        src={videoUrl}
                        autoPlay
                        muted
                        loop
                        onError={(e) => {
                          e.target.poster = noImageFound; e.stopPropagation()
                          e.onContextMenu = (e) => e.preventDefault();
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                      ></video>
                    ) : (
                      RollImageUrl !== undefined && (
                        <div className="elv_rollup_img">
                          <img
                            src={RollImageUrl}
                            alt="Roll Up Image"
                            onError={(e) => {
                              e.target.src = noImageFound; e.stopPropagation()
                              e.onContextMenu = (e) => e.preventDefault();
                            }}
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                          />
                        </div>
                      )
                    )}
                  </div>
                  <img
                    className={
                      showFilter && filter == false ? class3 != null || class3 != undefined ? class3 : class2 : filterData?.length > 0 ? class2 : class3}
                    loading="lazy"
                    src={imageUrl}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.stopPropagation();
                      e.target.src = noImageFound;
                      e.onContextMenu = (e) => e.preventDefault();
                    }}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                      opacity: isHover && (RollImageUrl || videoUrl) ? "0" : "1",
                      transition: '0s ease-in-out',
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="elv_filtered_prod_details">
              <Skeleton width="80%" height={20} animation="wave" />
              <Skeleton width="60%" height={20} animation="wave" />
              <Skeleton width="40%" height={20} animation="wave" />
            </div>
          ) : (
            <>
              <div className="elv_pd">
                {productData?.TitleLine ? (
                  <span className="elv_prod_titleline_visible">
                    {formatTitleLine(productData?.TitleLine) && productData?.TitleLine}
                  </span>
                ) : (
                  <span className="elv_prod_titleline_invisible">
                    {formatTitleLine(productData?.TitleLine) && productData?.TitleLine}
                  </span>
                )}
              </div>
              <div className="elv_filtered_prod_details">
                <div className="elv_filtered_prod_weights">
                  {storeInit?.IsMetalWeight == 1 &&
                    Number(productData?.Nwt) !== 0 && (
                      <div style={{ display: "flex" }}>
                        <span className="elv_prod_weight_span_1">NWT&nbsp;: </span>
                        <span className="elv_prod_weight_span_2">
                          &nbsp;
                          {productData?.Nwt.toFixed(3)}
                        </span>
                      </div>
                    )}
                  {storeInit?.IsDiamondWeight == 1 &&
                    Number(productData?.Dwt) !== 0 && (
                      <div style={{ display: "flex" }}>
                        <span className="elv_prod_weight_span_1">DWT&nbsp;: </span>
                        <span className="elv_prod_weight_span_2">
                          &nbsp;
                          {productData?.Dwt?.toFixed(3)}
                          {storeInit?.IsDiamondPcs === 1
                            ? `/${productData?.Dpcs}`
                            : null}
                        </span>
                      </div>
                    )}
                  {storeInit?.IsGrossWeight == 1 &&
                    Number(productData?.Gwt) !== 0 && (
                      <div style={{ display: "flex" }}>
                        <span className="elv_prod_weight_span_1">GWT&nbsp;: </span>
                        <span className="elv_prod_weight_span_2">
                          &nbsp;
                          {productData?.Gwt?.toFixed(3)}
                        </span>
                      </div>
                    )}
                </div>
                <div className="elv_filtered_prod_price">
                  <span className="elv_prod_weight_span_1_design">
                    {productData?.designno}
                  </span>
                  {storeInit?.IsPriceShow == 1 && (
                    <span className="elv_price_div">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: decodeEntities(loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode),
                        }}
                        style={{ paddingRight: "0.4rem" }}
                      />
                      <span className="elv_price_tags">
                        {formatter(productData?.UnitCostWithMarkUp)}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
