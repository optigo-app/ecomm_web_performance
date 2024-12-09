import React, { useEffect, useRef, useState } from "react";
import "./Lookbook.modul.scss";
import gradientColors from "./color.json"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  IconButton,
  Modal,
  PaginationItem,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  tooltipClasses,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MuiPagination from '@mui/material/Pagination';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import imageNotFound from "../../../Assets/image-not-found.jpg";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  FreeMode,
  Navigation,
  Thumbs,
  Scrollbar,
  Keyboard,
  Mousewheel
} from "swiper/modules";
import Pako from "pako";
import { IoArrowBack, IoClose } from "react-icons/io5";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { smrMA_CartCount, smrMA_loginState } from "../../../Recoil/atom";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { LookBookAPI } from "../../../../../../../utils/API/FilterAPI/LookBookAPI";
import { formatter } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import { CartAndWishListAPI } from "../../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import ProductListSkeleton from "../../ProductList/productlist_skeleton/ProductListSkeleton";
import LookbookSkeleton from "./lookbookSkelton";
import noimagefound from "../../../Assets/image-not-found.jpg";


const Lookbook = () => {
  let location = useLocation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [imageUrlDesignSet, setImageUrlDesignSet] = useState();
  const isMobileScreen = useMediaQuery('(max-width:800px)');

  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [designSetLstData, setDesignSetListData] = useState([]);
  const [dstCount, setDstCount] = useState();
  const [filterData, setFilterData] = useState([]);
  const [filterChecked, setFilterChecked] = useState({});
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [selectedMetalId, setSelectedMetalId] = useState(
    loginUserDetail?.MetalId ?? ""
  );
  const [selectedDiaId, setSelectedDiaId] = useState(
    loginUserDetail?.cmboDiaQCid ?? ""
  );
  const [selectedCsId, setSelectedCsId] = useState(
    loginUserDetail?.cmboCSQCid ?? ""
  );
  const [imageSources , setImageSources] = useState([]);
  const [productListData, setProductListData] = useState([]);
  const [locationKey, setLocationKey] = useState();
  const islogin = useRecoilValue(smrMA_loginState);
  const setCartCountVal = useSetRecoilState(smrMA_CartCount);
  const [storeInit, setStoreInit] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isProdLoading, setIsProdLoading] = useState(true);
  const [isPgLoading, setIsPgLoading] = useState(false);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSelectAll, setShowSelectAll] = useState(false);
  const [DynamicSize, setDynamicSize] = useState({ w: 0, h: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const SwiperSlideRef = useRef();
  let maxwidth464px = useMediaQuery('(max-width:464px)')
  const [imageLoadError, setImageLoadError] = useState({});

  const handleImageError = (index, e) => {
    setImageLoadError((prev) => ({ ...prev, [index]: true }));
    e.target.src = noimagefound;
  };

  const handelPageChange = (event, value) => {
    setCurrentPage(value);
    setThumbsSwiper(null);
    setIsPgLoading(true);
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    })
  };

  const updateSize = () => {
    if (SwiperSlideRef.current) {
      const { offsetWidth, offsetHeight } = SwiperSlideRef.current;
      setDynamicSize({ w: `${offsetWidth}px`, h: `${offsetHeight}px` });
      console.log("Size updated:", offsetWidth, offsetHeight);
    }
  };

  // const checkImageAvailability = (url) => {
  //   return new Promise((resolve) => {
  //     const img = new Image();
  //     img.onload = () => resolve(url);
  //     img.onerror = () => resolve(imageNotFound);
  //     img.src = url;
  //   });
  // };

  const handleResize = () => {
    updateSize();
  };
  const handleKeyDown = (e) => {
    if (e.key === 'F12') {
      handleResize();
    }
  };
  const handleImageLoad = () => {
    updateSize();
  };
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDynamicSize({ w: `${width}px`, h: `${height}px` });
        console.log("Resized:", width, height);
      }
    });

    if (SwiperSlideRef.current) {
      resizeObserver.observe(SwiperSlideRef.current);
      updateSize();
    }


    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeinit);

    let data = JSON.parse(sessionStorage.getItem("storeInit"));
    setImageUrl(data?.DesignSetImageFol);
    setImageUrlDesignSet(data?.CDNDesignImageFol);

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet_List", finalID, {}, currentPage, itemsPerPage)
      .then((response) => {
        if (response?.Data?.rd) {
          setDesignSetListData(response?.Data?.rd);
          setDstCount(response?.Data?.rd1[0]?.TotalCount)

          const initialCartItems = response?.Data?.rd.flatMap((slide) =>
            parseDesignDetails(slide?.Designdetail)
              .filter((detail) => detail?.IsInCart === 1)
              .map((detail) => detail.autocode)
          );
          setIsProdLoading(false);
          setIsPgLoading(false);
          setCartItems((prevCartItems) => [
            ...new Set([...prevCartItems, ...initialCartItems]),
          ]); // Use Set to avoid duplicates
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsProdLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("cartItemscartItemscartItems", filterData);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    let productlisttype = {
      FilterKey: "GETDesignSet_List",
      FilterVal: "GETDesignSet_List",
    };
    LookBookAPI(productlisttype, finalID)
      .then((res) => setFilterData(res))
      .catch((err) => console.log("err", err));
  }, [designSetLstData]);

  const handelFilterClearAll = () => {
    if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) {
      setFilterChecked({});
    }
  };

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
    setThumbsSwiper(null);
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

    return output;
  };

  useEffect(() => {
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const { IsB2BWebsite } = storeInit;

    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    let output = FilterValueWithCheckedOnly();
    if (Object.keys(filterChecked)?.length >= 0) {
      Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet_List", finalID, output, currentPage, itemsPerPage)
        .then((response) => {
          if (response?.Data?.rd) {
            setDesignSetListData(response?.Data?.rd);
            setDstCount(response?.Data?.rd1[0]?.TotalCount)
            const initialCartItems = response?.Data?.rd.flatMap((slide) =>
              parseDesignDetails(slide?.Designdetail)
                .filter((detail) => detail?.IsInCart === 1)
                .map((detail) => detail.autocode)
            );
            setCartItems((prevCartItems) => [
              ...new Set([...prevCartItems, ...initialCartItems]),
            ]); // Use Set to avoid duplicates

            setIsProdLoading(false);
            setIsPgLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [filterChecked, currentPage]);

  const ProdCardImageFunc = (pd) => {
    let finalprodListimg;
    if (pd?.DefaultImageName) {
      finalprodListimg =
        imageUrl + pd?.designsetuniqueno + "/" + pd?.DefaultImageName;
    } else {
      finalprodListimg = 'a.jpg';
    }
    return finalprodListimg;
  };

  const getRandomBgColor = (index) => {
    const colorsLength = gradientColors.length;
    return gradientColors[index % colorsLength];
  };

  const parseDesignDetails = (details) => {
    if (details) {
      try {
        return JSON?.parse(details);
      } catch (error) {
        console.error("Error parsing design details:", error);
        return [];
      }
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("Ring");
  let cookie = Cookies.get("visiterId");

  const handleAddToCart = (ele, type) => {
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let prodObj = {
      autocode: ele?.autocode,
      Metalid: loginInfo?.MetalId,
      MetalColorId: ele?.MetalColorid,
      DiaQCid: loginInfo?.cmboDiaQCid,
      CsQCid: loginInfo?.cmboCSQCid,
      Size: ele?.DefaultSize,
      Unitcost: ele?.UnitCost,
      markup: ele?.DesignMarkUp,
      UnitCostWithmarkup: formatter(ele?.UnitCostWithMarkUp),
      Remark: "",
    };

    setCartItems((prevCartItems) => [...prevCartItems, ele?.autocode]);

    CartAndWishListAPI(type, prodObj, cookie)
      .then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount;
        setCartCountVal(cartC);
      })
      .catch((err) => console.log("err", err));
  };

  const handleRemoveCart = async (ele) => {
    try {
      const res = await RemoveCartAndWishAPI("Cart", ele?.autocode, cookie);
      let cartC = res?.Data?.rd[0]?.Cartlistcount;
      setCartCountVal(cartC);

      // Use a callback to update the state
      setCartItems((prevCartItems) => {
        const updatedCartItems = prevCartItems.filter(
          (item) => item !== ele?.autocode
        );
        console.log(
          "Updated cartItems inside setState callback:",
          updatedCartItems
        );
        return updatedCartItems;
      });
    } catch (err) {
      console.log("Error removing from cart", err);
    }
  };

  // const handleCategoryChange = (e) => {
  //     setSelectedCategory(e.target.value);
  // };

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const createProdObj = (ele, loginInfo) => {
    return {
      autocode: ele?.autocode,
      Metalid: loginInfo?.MetalId ?? "",
      MetalColorId: ele?.MetalColorid,
      DiaQCid: loginInfo?.cmboDiaQCid,
      CsQCid: loginInfo?.cmboCSQCid,
      Size: ele?.DefaultSize,
      Unitcost: ele?.UnitCost,
      markup: ele?.DesignMarkUp,
      UnitCostWithmarkup: formatter(ele?.UnitCostWithMarkUp),
      Remark: "",
    };
  };

  const handleByCombo = (data) => {
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let prodObjs = data.map((detail) => createProdObj(detail, loginInfo));
    setCartItems((prevItems) => [
      ...prevItems,
      ...data.map((detail) => detail.autocode),
    ]);
    CartAndWishListAPI("Cart", prodObjs, cookie, "look")
      .then((res) => {
        let cartC = res?.Data?.rd[0]?.Cartlistcount;
        setCartCountVal(cartC);
      })
      .catch((err) => console.log("err", err));
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleNavigation = (designNo, autoCode, titleLine) => {
    let obj = {
      a: autoCode,
      b: designNo,
      m: loginUserDetail?.MetalId ?? storeInit?.MetalId,
      d: loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
      c: loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid,
      f: {},
    };
    let encodeObj = compressAndEncode(JSON.stringify(obj));
    navigate(
      `/d/${titleLine?.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""
      }${designNo}?p=${encodeObj}`
    );
  };

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const categoryOptions = JSON?.parse(
      filterData?.find((item) => item.id === "category")?.options ?? "[]"
    );
    const categoryNames = categoryOptions?.map((opt) => opt.Name);
    setSelectedCategories(categoryNames);
  }, [filterData]);

  useEffect(() => {
    const category = filterData.find(ele => ele.id === 'category');

    if (category) {
      const allOptions = JSON.parse(category.options).map(opt => opt.Name);
      // Show the Select All button if no options are selected and options are available
      console.log('categorycategorycategory', allOptions);
      console.log('categorycategorycategory selectedCategories', selectedCategories);
      setShowSelectAll(selectedCategories.length !== allOptions.length);
    }
  }, [selectedCategories]);

  const handleSelectAll = () => {
    const category = filterData.find(ele => ele.id === 'category');
    if (category) {
      const allOptions = JSON.parse(category.options).map(opt => opt.Name);
      setSelectedCategories(allOptions);
      setShowSelectAll(false);
    }
  };


  const handleCheckboxChangeNew = (e, categoryId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((id) => id !== categoryId)
      );
    }
  };

  // const filterDesignSetsByCategory = (designSetLstData, selectedCategories) => {
  //   if (selectedCategories.length === 0) return designSetLstData;
  //   return designSetLstData
  //     ?.map((set) => ({
  //       ...set,
  //       Designdetail: JSON?.stringify(
  //         JSON?.parse(set.Designdetail)?.filter((detail) =>
  //           selectedCategories?.includes(detail.CategoryName)
  //         )
  //       ),
  //     }))
  //     ?.filter((set) => JSON?.parse(set.Designdetail).length > 0);
  // };

  const filterDesignSetsByCategory = (designSetLstData, selectedCategories) => {
    if (selectedCategories.length === 0) return designSetLstData;
    return designSetLstData
      ?.map((set) => {
        let designdetail;
        try {
          designdetail = JSON.parse(set.Designdetail) || [];
        } catch (e) {
          designdetail = [];
        }
        const filteredDetails = designdetail.filter((detail) =>
          selectedCategories.includes(detail.CategoryName)
        );
        return {
          ...set,
          Designdetail: JSON.stringify(filteredDetails),
        };
      })
      .filter((set) => {
        try {
          return JSON.parse(set.Designdetail).length > 0;
        } catch (e) {
          return false; // If parsing fails here, filter out this set
        }
      });
  };

  const filteredDesignSetLstData = filterDesignSetsByCategory(
    designSetLstData,
    selectedCategories
  );


  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  // const [imageSources, setImageSources] = React.useState({});

  useEffect(() => {
    if (filteredDesignSetLstData && Array.isArray(filteredDesignSetLstData)) {
      const imagePromises = filteredDesignSetLstData.flatMap((slide) =>
        parseDesignDetails(slide?.Designdetail).map(async (detail) => {
          const designImageUrl = `${imageUrlDesignSet}${detail?.designno}~1.${detail?.ImageExtension}`;
          // const designImageUrl = `${imageUrlDesignSet}${detail?.designno}_1.${detail?.ImageExtension}`;
          const isAvailable = await checkImageAvailability(designImageUrl);
          return {
            designno: detail?.designno,
            src: isAvailable ? designImageUrl : imageNotFound,
          };
        })
      );

      Promise.all(imagePromises).then((results) => {
        const newImageSources = results.reduce((acc, { designno, src }) => {
          acc[designno] = src;
          return acc;
        }, {});

        setImageSources((prevSources) => {
          const isDifferent = newImageSources && Object?.keys(newImageSources)?.some(
            (key) => newImageSources[key] !== prevSources[key]
          );
          return isDifferent ? newImageSources : prevSources;
        });
      });
    }
  }, [filteredDesignSetLstData, imageUrlDesignSet]);

  const calculateTotalUnitCostWithMarkUp = (details) => {
    let total = 0;
    details.forEach((detail) => {
      total += detail.UnitCostWithMarkUp;
    });
    return total;
  };

  const calculateTotalUnitCostWithMarkUpGWt = (details) => {
    let total = 0;
    details.forEach((detail) => {
      total += detail.Gwt;
    });
    return total;
  };

  const calculateTotalUnitCostWithMarkUpNwt = (details) => {
    let total = 0;
    details.forEach((detail) => {
      total += detail.Nwt;
    });
    return total;
  };

  const calculateTotalUnitCostWithMarkUpDwt = (details) => {
    let total = 0;
    details.forEach((detail) => {
      total += detail.Dwt;
    });
    return total;
  };

  const sortDesignDetailsBySrNo = (details) => {
    return details.sort((a, b) => a.SrNo - b.SrNo);
  };

  const [dataKey, seyDataKey] = useState(null);

  const imageRefs = useRef([]);

  const scrollIntoView = (index) => {
    if (imageRefs.current[index]) {
      const image = imageRefs.current[index];
      const imageRect = image.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate the scroll position to make the image fully visible
      const scrollPosition = window.scrollY + imageRect.top - (viewportHeight - imageRect.height) / 2;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  };


  const handleHoverImages = (data) => {

    if (imageRefs.current[data]) {
      const image = imageRefs.current[data];
      const imageRect = image.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if the image is partially visible
      if (imageRect.bottom > 0 && imageRect.top < viewportHeight) {
        if (imageRect.height > viewportHeight) {
          // Image is taller than the viewport
          scrollIntoView(data);
        } else if (imageRect.top < 0 || imageRect.bottom > viewportHeight) {
          // Image is partially visible
          scrollIntoView(data);
        }
      }
    }


    if (dataKey == data) {
      seyDataKey(null);
    } else {
      seyDataKey(data);
    }
  };

  const addImageRef = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };


  const [selectedValue, setSelectedValue] = useState(1);
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setSelectedValue(newValue);
      setThumbsSwiper(null);
    }
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  const CustomTooltipContent = ({ categories }) => (
    <div>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );


  const swiperParams = {
    loop: true,
    modules: [Pagination],
    slidesPerView: 2,
  };

  const isCategoryPresent = filterData?.some(ele => ele?.Name === "Category" && ele?.id === "category");


  return (
    <div>
      <p className="smrMA_SmiCartListTitle" style={{ zIndex: !isDrawerOpen && 11111111111 }}>
        <span>
          <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigate(-1)} />
          Look Book
        </span>
      </p>
      <div className="smrMA_LookBookMain">
        <Drawer
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          className="smr_filterDrawer"
        >
          {filterData?.length > 0 && (
            <div className="smr_lookBookFilterSubDiv" style={{ padding: "10px 20px 20px 20px" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: '20px' }}>
                <IoClose
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "rgba(143, 140, 139, 0.9019607843)",
                  }}
                  onClick={() => setIsDrawerOpen(false)}
                />
              </div>
              <span className="smr_filter_text">
                <span>Filters</span>
                <span onClick={() => handelFilterClearAll()}>
                  {Object.values(filterChecked).filter((ele) => ele.checked)
                    ?.length > 0
                    ? "Clear All"
                    : ""}
                </span>
              </span>
              <div style={{ marginTop: "12px", width: "250px" }}>
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
                              color: "#7d7f85 !imporatnt",
                              borderRadius: 0,

                              "&.MuiAccordionSummary-root": {
                                padding: 0,
                              },
                            }}
                          // className="filtercategoryLable"
                          >
                            {/* <span> */}
                            {ele.Name}
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
                                        color: "#7d7f85 !important",
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
                            color: "#7d7f85 !important",
                            borderRadius: 0,

                            "&.MuiAccordionSummary-root": {
                              padding: 0,
                            },
                          }}
                        // className="filtercategoryLable"
                        >
                          {/* <span> */}
                          {ele.Name}
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
                          {(JSON.parse(ele?.options) ?? []).map((opt, i) => (
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
                                      filterChecked[`Price${i}${i}`]?.checked ===
                                        undefined
                                        ? false
                                        : filterChecked[`Price${i}${i}`]?.checked
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
                                // label={
                                //   opt?.Minval == 0
                                //     ? `Under ${decodeEntities(
                                //       storeInit?.Currencysymbol
                                //     )}${opt?.Maxval}`
                                //     : opt?.Maxval == 0
                                //       ? `Over ${decodeEntities(
                                //         storeInit?.Currencysymbol
                                //       )}${opt?.Minval}`
                                //       : `${decodeEntities(
                                //         storeInit?.Currencysymbol
                                //       )}${opt?.Minval} - ${decodeEntities(
                                //         storeInit?.Currencysymbol
                                //       )}${opt?.Maxval}`
                                // }
                                label={
                                  opt?.Minval == 0
                                    ? `Under ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Maxval}`
                                    : opt?.Maxval == 0
                                      ? `Over ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Minval}`
                                      : `${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Minval} - ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Maxval}`
                                }
                              />
                            </div>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </>
                ))}
              </div>
            </div>
          )}
        </Drawer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="smrlookBookPopuMain"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 380,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
              margin:"0",
              padding:'0 16px !important'
            }}
            className="smr_lookBookCategoryPoupuBox"
          >
            <div onClick={handleClose} className="smr_lookSubCtSaveBtn">
              <IoClose
                style={{ height: "25px", width: "25px", color: "#000000ab" }}
              />
            </div>
            {filterData?.map((ele) => (
              <React.Fragment key={ele.id}>
                {ele?.id === "category" && (
                  <Accordion
                    elevation={0}
                    sx={{
                      borderRadius: 0,
                      "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                    }}
                    expanded={true}
                  >
                    <p
                      style={{
                        color: "#7f7d85",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      {ele.Name}
                    </p>
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
                                checked={selectedCategories.includes(opt?.Name)}
                                style={{
                                  color: "#7f7d85",
                                  padding: 0,
                                  width: "10px",
                                }}
                                onClick={(e) =>
                                  handleCheckboxChangeNew(e, opt?.Name)
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
              </React.Fragment>
            ))}
             <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
             {showSelectAll && (
               <button
               variant="contained"
               onClick={handleSelectAll}
               // style={{ marginTop: '10px' }}  
               className="smrMA_selctAllCategoryBtn"
               >
                  Select All
                </button>
              )}
              </div>
                       </Box>
        </Modal>
        {isProdLoading ? (
          // true ?
          <div style={{ marginInline: "6%", backgroundColor: "white" }}>
            <ProductListSkeleton />
          </div>
        ) : (
          <div>

            <div className="smr_LookBookSubMainDiv">
              <div className="smr_lookbookFilterMain">
                {filterData?.length > 0 && (
                  <div className="smr_lookBookFilterSubDiv">
                    <span className="smr_filter_text">
                      <span>Filters</span>
                      {/* <span>
                                        {Object.values(filterChecked).filter(
                                            (ele) => ele.checked
                                        )?.length === 0
                                            ? 
                                            "Filters"
                                            : 
                                            `Product Found:
                                             ${afterFilterCount}`}
                                    </span> */}
                      <span onClick={() => handelFilterClearAll()}>
                        {Object.values(filterChecked).filter((ele) => ele.checked)
                          ?.length > 0
                          ? "Clear All"
                          : ""}
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
                                    color: "#7d7f85 !important",
                                    borderRadius: 0,

                                    "&.MuiAccordionSummary-root": {
                                      padding: 0,
                                    },
                                  }}
                                // className="filtercategoryLable"
                                >
                                  {/* <span> */}
                                  {ele.Name}
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
                                  color: "#7d7f85 !important",
                                  borderRadius: 0,

                                  "&.MuiAccordionSummary-root": {
                                    padding: 0,
                                  },
                                }}
                              // className="filtercategoryLable"
                              >
                                {/* <span> */}
                                {ele.Name}
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
                                {(JSON?.parse(ele?.options) ?? [])?.map(
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
                                        // label={
                                        //   opt?.Minval == 0
                                        //     ? `Under ${decodeEntities(
                                        //       storeInit?.Currencysymbol
                                        //     )}${opt?.Maxval}`
                                        //     : opt?.Maxval == 0
                                        //       ? `Over ${decodeEntities(
                                        //         storeInit?.Currencysymbol
                                        //       )}${opt?.Minval}`
                                        //       : `${decodeEntities(
                                        //         storeInit?.Currencysymbol
                                        //       )}${opt?.Minval} - ${decodeEntities(
                                        //         storeInit?.Currencysymbol
                                        //       )}${opt?.Maxval}`
                                        // }
                                        label={
                                          opt?.Minval == 0
                                            ? `Under ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Maxval}`
                                            : opt?.Maxval == 0
                                              ? `Over ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Minval}`
                                              : `${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Minval} - ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} ${opt?.Maxval}`
                                        }
                                      />
                                    </div>
                                  )
                                )}
                              </AccordionDetails>
                            </Accordion>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="smr_lookBookImgDiv">
                {<div
                  className="smr_lookBookMobileTopLine"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0px 5px 2.5px 5px",
                    gap: '20px'
                  }}
                >

                  {isCategoryPresent && <HtmlTooltip
                    title={<CustomTooltipContent categories={selectedCategories} />}
                  >
                    <button
                      onClick={handleOpen}
                      className="smr_lookBookSelectViewBtn"
                      style={{
                        background: selectedCategories.length !== 0 ? "#7d7f85" : "#ffff",
                        color: selectedCategories.length !== 0 ? "#fff" : "#7d7f85"
                      }}
                    >
                      Set View
                    </button>
                  </HtmlTooltip>}

                  <FilterAltIcon
                    fontSize="large"
                    style={{ color: "#c0bbb1" }}
                    className="smr_lookBookMobileFilter"
                    onClick={() => setIsDrawerOpen(true)}
                  />
                </div>}

                {/* {selectedValue == 2 && ( */}

                {!isPgLoading ? (
                  <>
                    <div className="smr_lookBookImgDivMain">
                      {filteredDesignSetLstData && filteredDesignSetLstData?.length == 0 ? (
                        <div className="smr_noProductFoundLookBookDiv">
                          <p>No Product Found!</p>
                        </div>
                      ) : (
                        filteredDesignSetLstData && filteredDesignSetLstData?.map((slide, index) => (
                          <div className="smr_designSetDiv" key={index}>
                            <div
                              style={{
                                // display: "flex",
                                position: 'relative',
                                // height: dataKey == index ? '250px' : '100%'
                                height: '100%'
                              }}
                            >
                              {ProdCardImageFunc(slide) && !imageLoadError[index] ? (
                                <img
                                  className="smr_lookBookImg"
                                  loading="lazy"
                                  src={ProdCardImageFunc(slide)}
                                  alt={`Slide ${index}`}
                                  ref={addImageRef}
                                  onClick={() => handleHoverImages(index)}
                                  onError={(e) => handleImageError(index, e)}
                                  style={{
                                    height: "100%",
                                    // height: dataKey == index ? "250px" : "100%",
                                    cursor: "pointer",
                                    backgroundColor: ProdCardImageFunc(slide) === null ? "rgb(191, 200, 255)" : getRandomBgColor(index),
                                  }}
                                />
                              ) : (
                                <div
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    ...getRandomBgColor(index),
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "rgb(191, 200, 255)",
                                    cursor: "pointer",
                                  }}
                                >
                                  {/* <p style={{ fontSize: "30px", color: getRandomBgColor(index).color }}>{slide?.designsetno}</p> */}
                                </div>
                              )}
                              <p className="smr_lb2designList_title">
                                {slide?.designsetno}
                              </p>
                              {dataKey == index &&
                                <div style={{ position: 'absolute', bottom: '0px', backgroundColor: 'white', width: '100%' }}>
                                  <div
                                    className="smr_lookBookImgDeatil"
                                    style={{
                                      // display: dataKey == index ? "none" : "flex",
                                      justifyContent: "space-between",
                                      margin: "5px",
                                    }}
                                  >
                                    <p className="smrMA_lookbookDeatilShow" style={{ fontSize: "13px", margin: "0px" }}>
                                      DWT:{" "}
                                      {calculateTotalUnitCostWithMarkUpDwt(
                                        JSON.parse(slide.Designdetail)
                                      ).toFixed(3)}{" "}
                                      | GWT:{" "}
                                      {calculateTotalUnitCostWithMarkUpGWt(
                                        JSON.parse(slide.Designdetail)
                                      ).toFixed(3)}{" "}
                                      | NWT:{" "}
                                      {calculateTotalUnitCostWithMarkUpNwt(
                                        JSON.parse(slide.Designdetail)
                                      ).toFixed(3)}{" "}
                                    </p>
                                    <div
                                      className="smr1_lookBookImgDeatilSub"
                                      style={{ display: "flex", alignItems: "center" }}
                                    >
                                      <p
                                        style={{
                                          margin: "0px 10px 0px 0px",
                                          fontSize: "15px",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {" "}
                                        <span
                                          className="smr_currencyFont"
                                        >
                                          {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                        &nbsp;
                                        {formatter(calculateTotalUnitCostWithMarkUp(
                                          JSON.parse(slide.Designdetail)
                                        ))}
                                      </p>
                                      <Button
                                        className="smr_lookBookBuyBtn"
                                        onClick={() =>
                                          handleByCombo(
                                            parseDesignDetails(slide?.Designdetail, "Cart")
                                          )
                                        }
                                      >
                                        Buy Combo
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="smr_lookBookSubImgMain">
                                    <Swiper
                                      {...swiperParams}
                                      className="smr_LookBookmySwiper"
                                    >
                                      {sortDesignDetailsBySrNo(
                                        parseDesignDetails(slide?.Designdetail)
                                      )?.map((detail, subIndex) => (
                                        <div
                                          className="smr_lookBookSubImageDiv"
                                          key={subIndex}
                                        >
                                          <SwiperSlide
                                            className="smr_lookBookSliderSubDiv"
                                            style={{
                                              marginRight: "0px",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {detail?.IsInReadyStock == 1 && (
                                              <span className="smr_LookBookinstock">
                                                In Stock
                                              </span>
                                            )}
                                            <img
                                              className="smr_lookBookSubImage"
                                              loading="lazy"
                                              src={`${imageUrlDesignSet}${detail?.designno}~1.${detail?.ImageExtension}`}
                                              alt={`Sub image ${subIndex} for slide ${index}`}
                                              onClick={() =>
                                                handleNavigation(
                                                  detail?.designno,
                                                  detail?.autocode,
                                                  detail?.TitleLine ? detail?.TitleLine : ""
                                                )
                                              }
                                              onError={(e) => {
                                                e.target.src = noimagefound;
                                              }}
                                            />
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginBottom: "5px",
                                              }}
                                            >
                                              {cartItems.includes(detail?.autocode) ? (
                                                <button
                                                  className="smr_lookBookINCartBtn"
                                                  onClick={() => handleRemoveCart(detail)}
                                                >
                                                  REMOVE CART
                                                </button>
                                              ) : (
                                                <button
                                                  className="smr_lookBookAddtoCartBtn"
                                                  onClick={() => handleAddToCart(detail)}
                                                >
                                                  ADD TO CART +
                                                </button>
                                              )}
                                            </div>
                                          </SwiperSlide>
                                        </div>
                                      ))}
                                    </Swiper>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) :
                  <LookbookSkeleton />
                }
                <div className="lpDiv">
                  <MuiPagination
                    count={Math.ceil(dstCount / itemsPerPage)}
                    size={maxwidth464px ? "small" : "large"}
                    shape="circular"
                    onChange={handelPageChange}
                    page={currentPage}
                    disabled={false} // Don't disable the whole pagination component
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        disabled={item.page === currentPage}
                      />
                    )}
                    hidePrevButton={currentPage === 1}
                    hideNextButton={currentPage  === Math.ceil(dstCount / itemsPerPage)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <p
            style={{
              paddingBlock: "30px",
              margin: "0px",
              textAlign: "center",
              color: "white",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "1px",
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            BACK TO TOP
          </p>
        </div>
      </div>
    </div >
  );
};

export default Lookbook;
