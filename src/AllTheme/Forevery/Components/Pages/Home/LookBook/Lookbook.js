// import React, { useEffect, useState } from "react";
// import "./Lookbook.modul.scss";
// import gradientColors from "./color.json"
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Box,
//   Button,
//   Checkbox,
//   Drawer,
//   FormControlLabel,
//   IconButton,
//   Modal,
//   styled,
//   ToggleButton,
//   ToggleButtonGroup,
//   Tooltip,
//   tooltipClasses,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { useLocation, useNavigate } from "react-router-dom";
// import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
// import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
// import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
// import Cookies from "js-cookie";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { for_CartCount, for_loginState } from "../../../Recoil/atom";
// import imageNotFound from "../../../Assets/image-not-found.jpg";
// import { LookBookAPI } from "../../../../../../utils/API/FilterAPI/LookBookAPI";
// import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { Swiper, SwiperSlide } from "swiper/react";

// import {
//   Pagination,
//   FreeMode,
//   Navigation,
//   Thumbs,
//   Scrollbar,
//   Keyboard,
//   Mousewheel
// } from "swiper/modules";
// import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
// import ProductListSkeleton from "../../Product/ProductList/productlist_skeleton/ProductListSkeleton";
// import Pako from "pako";
// import { IoClose } from "react-icons/io5";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import LocalMallIcon from "@mui/icons-material/LocalMall";
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

// import { RxGrid } from "react-icons/rx";
// import { TfiLayoutGrid2 } from "react-icons/tfi";
// import { TfiLayoutGrid3 } from "react-icons/tfi";
// import { formatter } from "../../../../../../utils/Glob_Functions/GlobalFunction";

// const Lookbook = () => {
//   let location = useLocation();
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [imageUrl, setImageUrl] = useState();
//   const [imageUrlDesignSet, setImageUrlDesignSet] = useState();
//   const isMobileScreen = useMediaQuery('(max-width:800px)');

//   const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//   const [designSetLstData, setDesignSetListData] = useState();
//   const [filterData, setFilterData] = useState([]);
//   const [filterChecked, setFilterChecked] = useState({});
//   const [afterFilterCount, setAfterFilterCount] = useState();
//   const [selectedMetalId, setSelectedMetalId] = useState(
//     loginUserDetail?.MetalId ?? ""
//   );
//   const [selectedDiaId, setSelectedDiaId] = useState(
//     loginUserDetail?.cmboDiaQCid ?? ""
//   );
//   const [selectedCsId, setSelectedCsId] = useState(
//     loginUserDetail?.cmboCSQCid ?? ""
//   );
//   const [productListData, setProductListData] = useState([]);
//   const [locationKey, setLocationKey] = useState();
//   const islogin = useRecoilValue(for_loginState);
//   const setCartCountVal = useSetRecoilState(for_CartCount);
//   const [storeInit, setStoreInit] = useState({});
//   const [cartItems, setCartItems] = useState([]);
//   const [isProdLoading, setIsProdLoading] = useState(true);
//   const navigate = useNavigate();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [swiper, setSwiper] = useState(null);


//   const handlePrevious = () => {
//     if (swiper !== null) {
//       swiper.slidePrev();
//     }
//   };

//   const handleNext = () => {
//     if (swiper !== null) {
//       swiper.slideNext();
//     }
//   };

//   useEffect(() => {
//     let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
//     setStoreInit(storeinit);

//     let data = JSON.parse(sessionStorage.getItem("storeInit"));
//     setImageUrl(data?.DesignSetImageFol);
//     setImageUrlDesignSet(data?.DesignImageFol);

//     const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//     const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
//     const { IsB2BWebsite } = storeInit;
//     const visiterID = Cookies.get("visiterId");
//     let finalID;
//     if (IsB2BWebsite == 0) {
//       finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
//     } else {
//       finalID = loginUserDetail?.id || "0";
//     }

//     Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet_List", finalID)
//       .then((response) => {
//         if (response?.Data?.rd) {
//           setDesignSetListData(response?.Data?.rd);

//           const initialCartItems = response?.Data?.rd.flatMap((slide) =>
//             parseDesignDetails(slide?.Designdetail)
//               .filter((detail) => detail?.IsInCart === 1)
//               .map((detail) => detail.autocode)
//           );
//           setIsProdLoading(false);
//           setCartItems((prevCartItems) => [
//             ...new Set([...prevCartItems, ...initialCartItems]),
//           ]); // Use Set to avoid duplicates
//         }
//       })
//       .catch((err) => console.log(err))
//       .finally(() => {
//         setIsProdLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     console.log("cartItemscartItemscartItems", filterData);
//     const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//     const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
//     const { IsB2BWebsite } = storeInit;
//     const visiterID = Cookies.get("visiterId");
//     let finalID;
//     if (IsB2BWebsite == 0) {
//       finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
//     } else {
//       finalID = loginUserDetail?.id || "0";
//     }

//     let productlisttype = {
//       FilterKey: "GETDesignSet_List",
//       FilterVal: "GETDesignSet_List",
//     };
//     LookBookAPI(productlisttype, finalID)
//       .then((res) => setFilterData(res))
//       .catch((err) => console.log("err", err));
//   }, [designSetLstData]);

//   const handelFilterClearAll = () => {
//     if (Object.values(filterChecked).filter((ele) => ele.checked)?.length > 0) {
//       setFilterChecked({});
//     }
//   };

//   const handleCheckboxChange = (e, listname, val) => {
//     const { name, checked } = e.target;

//     setFilterChecked((prev) => ({
//       ...prev,
//       [name]: {
//         checked,
//         type: listname,
//         id: name?.replace(/[a-zA-Z]/g, ""),
//         value: val,
//       },
//     }));
//     setThumbsSwiper(null);
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
//     const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//     const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
//     const { IsB2BWebsite } = storeInit;

//     const visiterID = Cookies.get("visiterId");
//     let finalID;
//     if (IsB2BWebsite == 0) {
//       finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
//     } else {
//       finalID = loginUserDetail?.id || "0";
//     }

//     let output = FilterValueWithCheckedOnly();
//     if (Object.keys(filterChecked)?.length >= 0) {
//       Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet_List", finalID, output)
//         .then((response) => {
//           if (response?.Data?.rd) {
//             setDesignSetListData(response?.Data?.rd);
//             const initialCartItems = response?.Data?.rd.flatMap((slide) =>
//               parseDesignDetails(slide?.Designdetail)
//                 .filter((detail) => detail?.IsInCart === 1)
//                 .map((detail) => detail.autocode)
//             );
//             setCartItems((prevCartItems) => [
//               ...new Set([...prevCartItems, ...initialCartItems]),
//             ]); // Use Set to avoid duplicates
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [filterChecked]);

//   const ProdCardImageFunc = (pd) => {
//     let finalprodListimg;
//     if (pd?.DefaultImageName) {
//       finalprodListimg =
//         imageUrl + pd?.designsetuniqueno + "/" + pd?.DefaultImageName;
//     } else {
//       finalprodListimg = null;
//     }
//     return finalprodListimg;
//   };

//   const getRandomBgColor = (index) => {
//     const colorsLength = gradientColors.length;
//     return gradientColors[index % colorsLength];
//   };

//   const parseDesignDetails = (details) => {
//     try {
//       return JSON.parse(details);
//     } catch (error) {
//       console.error("Error parsing design details:", error);
//       return [];
//     }
//   };

//   const [selectedCategory, setSelectedCategory] = useState("Ring");
//   let cookie = Cookies.get("visiterId");

//   const handleAddToCart = (ele, type) => {
//     let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

//     let prodObj = {
//       autocode: ele?.autocode,
//       Metalid: loginInfo?.MetalId,
//       MetalColorId: ele?.MetalColorid,
//       DiaQCid: loginInfo?.cmboDiaQCid,
//       CsQCid: loginInfo?.cmboCSQCid,
//       Size: ele?.DefaultSize,
//       Unitcost: ele?.UnitCost,
//       markup: ele?.DesignMarkUp,
//       UnitCostWithmarkup: formatter(ele?.UnitCostWithMarkUp),
//       Remark: "",
//     };

//     setCartItems((prevCartItems) => [...prevCartItems, ele?.autocode]);

//     CartAndWishListAPI(type, prodObj, cookie)
//       .then((res) => {
//         let cartC = res?.Data?.rd[0]?.Cartlistcount;
//         setCartCountVal(cartC);
//       })
//       .catch((err) => console.log("err", err));
//   };

//   const handleRemoveCart = async (ele) => {
//     try {
//       const res = await RemoveCartAndWishAPI("Cart", ele?.autocode, cookie);
//       let cartC = res?.Data?.rd[0]?.Cartlistcount;
//       setCartCountVal(cartC);

//       // Use a callback to update the state
//       setCartItems((prevCartItems) => {
//         const updatedCartItems = prevCartItems.filter(
//           (item) => item !== ele?.autocode
//         );
//         console.log(
//           "Updated cartItems inside setState callback:",
//           updatedCartItems
//         );
//         return updatedCartItems;
//       });
//     } catch (err) {
//       console.log("Error removing from cart", err);
//     }
//   };

//   // const handleCategoryChange = (e) => {
//   //     setSelectedCategory(e.target.value);
//   // };

//   const decodeEntities = (html) => {
//     var txt = document.createElement("textarea");
//     txt.innerHTML = html;
//     return txt.value;
//   };

//   const createProdObj = (ele, loginInfo) => {
//     return {
//       autocode: ele?.autocode,
//       Metalid: loginInfo?.MetalId ?? "",
//       MetalColorId: ele?.MetalColorid,
//       DiaQCid: loginInfo?.cmboDiaQCid,
//       CsQCid: loginInfo?.cmboCSQCid,
//       Size: ele?.DefaultSize,
//       Unitcost: ele?.UnitCost,
//       markup: ele?.DesignMarkUp,
//       UnitCostWithmarkup: formatter(ele?.UnitCostWithMarkUp),
//       Remark: "",
//     };
//   };

//   const handleByCombo = (data) => {
//     let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
//     let prodObjs = data.map((detail) => createProdObj(detail, loginInfo));
//     setCartItems((prevItems) => [
//       ...prevItems,
//       ...data.map((detail) => detail.autocode),
//     ]);
//     CartAndWishListAPI("Cart", prodObjs, cookie, "look")
//       .then((res) => {
//         let cartC = res?.Data?.rd[0]?.Cartlistcount;
//         setCartCountVal(cartC);
//       })
//       .catch((err) => console.log("err", err));
//   };

//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const compressAndEncode = (inputString) => {
//     try {
//       const uint8Array = new TextEncoder().encode(inputString);
//       const compressed = Pako.deflate(uint8Array, { to: "string" });
//       return btoa(String.fromCharCode.apply(null, compressed));
//     } catch (error) {
//       console.error("Error compressing and encoding:", error);
//       return null;
//     }
//   };

//   const handleNavigation = (designNo, autoCode, titleLine) => {
//     let obj = {
//       a: autoCode,
//       b: designNo,
//       m: loginUserDetail?.MetalId ?? storeInit?.MetalId,
//       d: loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
//       c: loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid,
//       f: {},
//     };
//     let encodeObj = compressAndEncode(JSON.stringify(obj));
//     navigate(
//       `/d/${titleLine?.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""
//       }${designNo}?p=${encodeObj}`
//     );
//   };

//   const [selectedCategories, setSelectedCategories] = useState([]);

//   useEffect(() => {
//     const categoryOptions = JSON?.parse(
//       filterData?.find((item) => item.id === "category")?.options ?? "[]"
//     );
//     const categoryNames = categoryOptions?.map((opt) => opt.Name);
//     setSelectedCategories(categoryNames);
//   }, [filterData]);

//   const handleCheckboxChangeNew = (e, categoryId) => {
//     const isChecked = e.target.checked;
//     if (isChecked) {
//       setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
//     } else {
//       setSelectedCategories((prevSelected) =>
//         prevSelected.filter((id) => id !== categoryId)
//       );
//     }
//   };

//   const filterDesignSetsByCategory = (designSetLstData, selectedCategories) => {
//     if (selectedCategories.length === 0) return designSetLstData;

//     return designSetLstData
//       ?.map((set) => ({
//         ...set,
//         Designdetail: JSON?.stringify(
//           JSON.parse(set.Designdetail)?.filter((detail) =>
//             selectedCategories?.includes(detail.CategoryName)
//           )
//         ),
//       }))
//       ?.filter((set) => JSON?.parse(set.Designdetail).length > 0);
//   };

//   const filteredDesignSetLstData = filterDesignSetsByCategory(
//     designSetLstData,
//     selectedCategories
//   );

//   console.log(
//     "filteredDesignSetLstDatafilteredDesignSetLstData",
//     selectedCategories
//   );

//   const calculateTotalUnitCostWithMarkUp = (details) => {
//     let total = 0;
//     details.forEach((detail) => {
//       total += detail.UnitCostWithMarkUp;
//     });
//     return total;
//   };

//   const calculateTotalUnitCostWithMarkUpGWt = (details) => {
//     let total = 0;
//     details.forEach((detail) => {
//       total += detail.Gwt;
//     });
//     return total;
//   };

//   const calculateTotalUnitCostWithMarkUpNwt = (details) => {
//     let total = 0;
//     details.forEach((detail) => {
//       total += detail.Nwt;
//     });
//     return total;
//   };

//   const calculateTotalUnitCostWithMarkUpDwt = (details) => {
//     let total = 0;
//     details.forEach((detail) => {
//       total += detail.Dwt;
//     });
//     return total;
//   };

//   const sortDesignDetailsBySrNo = (details) => {
//     return details.sort((a, b) => a.SrNo - b.SrNo);
//   };

//   const [dataKey, seyDataKey] = useState(null);

//   const handleHoverImages = (data) => {
//     seyDataKey(data);
//   };

//   const [selectedValue, setSelectedValue] = useState(1);
//   // const handleChange = (event) => {
//   //   setSelectedValue(event.target.value);
//   // };

//   const handleChange = (event, newValue) => {
//     if (newValue !== null) {
//       setSelectedValue(newValue);
//       setThumbsSwiper(null);
//     }
//   };

//   const HtmlTooltip = styled(({ className, ...props }) => (
//     <Tooltip {...props} classes={{ popper: className }} />
//   ))(({ theme }) => ({
//     [`& .${tooltipClasses.tooltip}`]: {
//       backgroundColor: '#f5f5f9',
//       color: 'rgba(0, 0, 0, 0.87)',
//       maxWidth: 220,
//       fontSize: theme.typography.pxToRem(12),
//       border: '1px solid #dadde9',
//     },
//   }));

//   const CustomTooltipContent = ({ categories }) => (
//     <div>
//       <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
//         {categories.map((category, index) => (
//           <li key={index}>{category}</li>
//         ))}
//       </ul>
//     </div>
//   );

//   console.log(
//     "filteredDesignSetLstDatafilteredDesignSetLstData",
//     selectedCategories
//   );

//   return (
//     <div className="for_LookBookMain">
//       <Drawer
//         open={isDrawerOpen}
//         onClose={() => {
//           setIsDrawerOpen(false);
//         }}
//         className="for_filterDrawer"
//       >
//         {filterData?.length > 0 && (
//           <div className="for_lookBookFilterSubDiv" style={{ padding: "20px" }}>
//             <div style={{ display: "flex", justifyContent: "flex-end" }}>
//               <IoClose
//                 style={{
//                   width: "30px",
//                   height: "30px",
//                   color: "rgba(143, 140, 139, 0.9019607843)",
//                 }}
//                 onClick={() => setIsDrawerOpen(false)}
//               />
//             </div>
//             <span className="for_filter_text">
//               <span>Filters</span>
//               <span onClick={() => handelFilterClearAll()}>
//                 {Object.values(filterChecked).filter((ele) => ele.checked)
//                   ?.length > 0
//                   ? "Clear All"
//                   : ""}
//               </span>
//             </span>
//             <div style={{ marginTop: "12px", width: "250px" }}>
//               {filterData?.map((ele) => (
//                 <>
//                   {!ele?.id?.includes("Range") &&
//                     !ele?.id?.includes("Price") && (
//                       <Accordion
//                         elevation={0}
//                         sx={{
//                           borderBottom: "1px solid #c7c8c9",
//                           borderRadius: 0,
//                           "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
//                             borderBottomLeftRadius: "0px",
//                             borderBottomRightRadius: "0px",
//                           },
//                           "&.MuiPaper-root.MuiAccordion-root:before": {
//                             background: "none",
//                           },
//                         }}
//                       // expanded={accExpanded}
//                       // defaultExpanded={}
//                       >
//                         <AccordionSummary
//                           expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
//                           aria-controls="panel1-content"
//                           id="panel1-header"
//                           sx={{
//                             color: "#7d7f85 !imporatnt",
//                             borderRadius: 0,

//                             "&.MuiAccordionSummary-root": {
//                               padding: 0,
//                             },
//                           }}
//                         // className="filtercategoryLable"
//                         >
//                           {/* <span> */}
//                           {ele.Name}
//                           {/* </span> */}
//                         </AccordionSummary>
//                         <AccordionDetails
//                           sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "4px",
//                             minHeight: "fit-content",
//                             maxHeight: "300px",
//                             overflow: "auto",
//                           }}
//                         >
//                           {(JSON.parse(ele?.options) ?? []).map((opt) => (
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                                 gap: "12px",
//                               }}
//                               key={opt?.id}
//                             >
//                               {/* <small
//                                         style={{
//                                           fontFamily: "TT Commons, sans-serif",
//                                           color: "#7f7d85",
//                                         }}
//                                       >
//                                         {opt.Name}
//                                       </small> */}
//                               <FormControlLabel
//                                 control={
//                                   <Checkbox
//                                     name={`${ele?.id}${opt?.id}`}
//                                     // checked={
//                                     //   filterChecked[`checkbox${index + 1}${i + 1}`]
//                                     //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
//                                     //     : false
//                                     // }
//                                     checked={
//                                       filterChecked[`${ele?.id}${opt?.id}`]
//                                         ?.checked === undefined
//                                         ? false
//                                         : filterChecked[`${ele?.id}${opt?.id}`]
//                                           ?.checked
//                                     }
//                                     style={{
//                                       color: "#7d7f85 !important",
//                                       padding: 0,
//                                       width: "10px",
//                                     }}
//                                     onClick={(e) =>
//                                       handleCheckboxChange(
//                                         e,
//                                         ele?.id,
//                                         opt?.Name
//                                       )
//                                     }
//                                     size="small"
//                                   />
//                                 }
//                                 // sx={{
//                                 //   display: "flex",
//                                 //   justifyContent: "space-between", // Adjust spacing between checkbox and label
//                                 //   width: "100%",
//                                 //   flexDirection: "row-reverse", // Align items to the right
//                                 //   fontFamily:'TT Commons Regular'
//                                 // }}
//                                 className="for_mui_checkbox_label"
//                                 label={opt.Name}
//                               />
//                             </div>
//                           ))}
//                         </AccordionDetails>
//                       </Accordion>
//                     )}
//                   {ele?.id?.includes("Price") && (
//                     <Accordion
//                       elevation={0}
//                       sx={{
//                         borderBottom: "1px solid #c7c8c9",
//                         borderRadius: 0,
//                         "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
//                           borderBottomLeftRadius: "0px",
//                           borderBottomRightRadius: "0px",
//                         },
//                         "&.MuiPaper-root.MuiAccordion-root:before": {
//                           background: "none",
//                         },
//                       }}
//                     // expanded={accExpanded}
//                     // defaultExpanded={}
//                     >
//                       <AccordionSummary
//                         expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
//                         aria-controls="panel1-content"
//                         id="panel1-header"
//                         sx={{
//                           color: "#7d7f85 !important",
//                           borderRadius: 0,

//                           "&.MuiAccordionSummary-root": {
//                             padding: 0,
//                           },
//                         }}
//                       // className="filtercategoryLable"
//                       >
//                         {/* <span> */}
//                         {ele.Name}
//                         {/* </span> */}
//                       </AccordionSummary>
//                       <AccordionDetails
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: "4px",
//                           minHeight: "fit-content",
//                           maxHeight: "300px",
//                           overflow: "auto",
//                         }}
//                       >
//                         {(JSON.parse(ele?.options) ?? []).map((opt, i) => (
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "space-between",
//                               gap: "12px",
//                             }}
//                             key={i}
//                           >
//                             {/* <small
//                                         style={{
//                                           fontFamily: "TT Commons, sans-serif",
//                                           color: "#7f7d85",
//                                         }}
//                                       >
//                                         {opt.Name}
//                                       </small> */}
//                             <FormControlLabel
//                               control={
//                                 <Checkbox
//                                   name={`Price${i}${i}`}
//                                   // checked={
//                                   //   filterChecked[`checkbox${index + 1}${i + 1}`]
//                                   //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
//                                   //     : false
//                                   // }
//                                   checked={
//                                     filterChecked[`Price${i}${i}`]?.checked ===
//                                       undefined
//                                       ? false
//                                       : filterChecked[`Price${i}${i}`]?.checked
//                                   }
//                                   style={{
//                                     color: "#7f7d85",
//                                     padding: 0,
//                                     width: "10px",
//                                   }}
//                                   onClick={(e) =>
//                                     handleCheckboxChange(e, ele?.id, opt)
//                                   }
//                                   size="small"
//                                 />
//                               }
//                               // sx={{
//                               //   display: "flex",
//                               //   justifyContent: "space-between", // Adjust spacing between checkbox and label
//                               //   width: "100%",
//                               //   flexDirection: "row-reverse", // Align items to the right
//                               //   fontFamily:'TT Commons Regular'
//                               // }}
//                               className="for_mui_checkbox_label"
//                               // label={
//                               //   opt?.Minval == 0
//                               //     ? `Under ${decodeEntities(
//                               //       storeInit?.Currencysymbol
//                               //     )}${opt?.Maxval}`
//                               //     : opt?.Maxval == 0
//                               //       ? `Over ${decodeEntities(
//                               //         storeInit?.Currencysymbol
//                               //       )}${opt?.Minval}`
//                               //       : `${decodeEntities(
//                               //         storeInit?.Currencysymbol
//                               //       )}${opt?.Minval} - ${decodeEntities(
//                               //         storeInit?.Currencysymbol
//                               //       )}${opt?.Maxval}`
//                               // }
//                               label={
//                                 opt?.Minval == 0
//                                   ? `Under ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${opt?.Maxval}`
//                                   : opt?.Maxval == 0
//                                     ? `Over ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${opt?.Minval}`
//                                     : `${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${opt?.Minval} - ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${opt?.Maxval}`
//                               }
//                             />
//                           </div>
//                         ))}
//                       </AccordionDetails>
//                     </Accordion>
//                   )}
//                 </>
//               ))}
//             </div>
//           </div>
//         )}
//       </Drawer>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//         className="smrlookBookPopuMain"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 2,
//           }}
//           className="for_lookBookCategoryPoupuBox"
//         >
//           <div onClick={handleClose} className="for_lookSubCtSaveBtn">
//             <IoClose
//               style={{ height: "25px", width: "25px", color: "#000000ab" }}
//             />
//           </div>

//           {filterData?.map((ele) => (
//             <React.Fragment key={ele.id}>
//               {ele?.id === "category" && (
//                 <Accordion
//                   elevation={0}
//                   sx={{
//                     borderRadius: 0,
//                     "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
//                       borderBottomLeftRadius: "0px",
//                       borderBottomRightRadius: "0px",
//                     },
//                     "&.MuiPaper-root.MuiAccordion-root:before": {
//                       background: "none",
//                     },
//                   }}
//                   expanded={true}
//                 >
//                   <p
//                     style={{
//                       color: "#7f7d85",
//                       textAlign: "center",
//                       fontWeight: 500,
//                     }}
//                   >
//                     {ele.Name}
//                   </p>
//                   <AccordionDetails
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "4px",
//                       minHeight: "fit-content",
//                       maxHeight: "300px",
//                       overflow: "auto",
//                     }}
//                   >
//                     {(JSON.parse(ele?.options) ?? []).map((opt) => (
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           gap: "12px",
//                         }}
//                         key={opt?.id}
//                       >
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               name={`${ele?.id}${opt?.id}`}
//                               checked={selectedCategories.includes(opt?.Name)}
//                               style={{
//                                 color: "#7f7d85",
//                                 padding: 0,
//                                 width: "10px",
//                               }}
//                               onClick={(e) =>
//                                 handleCheckboxChangeNew(e, opt?.Name)
//                               }
//                               size="small"
//                             />
//                           }
//                           className="for_mui_checkbox_label"
//                           label={opt.Name}
//                         />
//                       </div>
//                     ))}
//                   </AccordionDetails>
//                 </Accordion>
//               )}
//             </React.Fragment>
//           ))}
//         </Box>
//       </Modal>
//       {isProdLoading ? (
//         // true ?
//         <div style={{ marginInline: "6%", backgroundColor: "white" }}>
//           <ProductListSkeleton />
//         </div>
//       ) : (
//         <div className="for_LookBookSubMainDiv">
//           <div className="for_lookbookFilterMain">
//             {filterData?.length > 0 && (
//               <div className="for_lookBookFilterSubDiv">
//                 <span className="for_filter_text">
//                   <span>Filters</span>

//                   {/* <span>
//                                         {Object.values(filterChecked).filter(
//                                             (ele) => ele.checked
//                                         )?.length === 0
//                                             ? 
//                                             "Filters"
//                                             : 
//                                             `Product Found:
//                                              ${afterFilterCount}`}
//                                     </span> */}
//                   <span onClick={() => handelFilterClearAll()}>
//                     {Object.values(filterChecked).filter((ele) => ele.checked)
//                       ?.length > 0
//                       ? "Clear All"
//                       : ""}
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
//                           // expanded={accExpanded}
//                           // defaultExpanded={}
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
//                               {/* <span> */}
//                               {ele.Name}
//                               {/* </span> */}
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
//                                   {/* <small
//                                         style={{
//                                           fontFamily: "TT Commons, sans-serif",
//                                           color: "#7f7d85",
//                                         }}
//                                       >
//                                         {opt.Name}
//                                       </small> */}
//                                   <FormControlLabel
//                                     control={
//                                       <Checkbox
//                                         name={`${ele?.id}${opt?.id}`}
//                                         // checked={
//                                         //   filterChecked[`checkbox${index + 1}${i + 1}`]
//                                         //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
//                                         //     : false
//                                         // }
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
//                                     // sx={{
//                                     //   display: "flex",
//                                     //   justifyContent: "space-between", // Adjust spacing between checkbox and label
//                                     //   width: "100%",
//                                     //   flexDirection: "row-reverse", // Align items to the right
//                                     //   fontFamily:'TT Commons Regular'
//                                     // }}
//                                     className="for_mui_checkbox_label"
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
//                               color: "#7d7f85 !important",
//                               borderRadius: 0,

//                               "&.MuiAccordionSummary-root": {
//                                 padding: 0,
//                               },
//                             }}
//                           // className="filtercategoryLable"
//                           >
//                             {/* <span> */}
//                             {ele.Name}
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
//                             {(JSON?.parse(ele?.options) ?? [])?.map(
//                               (opt, i) => (
//                                 <div
//                                   style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "space-between",
//                                     gap: "12px",
//                                   }}
//                                   key={i}
//                                 >
//                                   {/* <small
//                                         style={{
//                                           fontFamily: "TT Commons, sans-serif",
//                                           color: "#7f7d85",
//                                         }}
//                                       >
//                                         {opt.Name}
//                                       </small> */}
//                                   <FormControlLabel
//                                     control={
//                                       <Checkbox
//                                         name={`Price${i}${i}`}
//                                         // checked={
//                                         //   filterChecked[`checkbox${index + 1}${i + 1}`]
//                                         //     ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
//                                         //     : false
//                                         // }
//                                         checked={
//                                           filterChecked[`Price${i}${i}`]
//                                             ?.checked === undefined
//                                             ? false
//                                             : filterChecked[`Price${i}${i}`]
//                                               ?.checked
//                                         }
//                                         style={{
//                                           color: "#7f7d85",
//                                           padding: 0,
//                                           width: "10px",
//                                         }}
//                                         onClick={(e) =>
//                                           handleCheckboxChange(e, ele?.id, opt)
//                                         }
//                                         size="small"
//                                       />
//                                     }
//                                     // sx={{
//                                     //   display: "flex",
//                                     //   justifyContent: "space-between", // Adjust spacing between checkbox and label
//                                     //   width: "100%",
//                                     //   flexDirection: "row-reverse", // Align items to the right
//                                     //   fontFamily:'TT Commons Regular'
//                                     // }}
//                                     className="for_mui_checkbox_label"
//                                     // label={
//                                     //   opt?.Minval == 0
//                                     //     ? `Under ${decodeEntities(
//                                     //       storeInit?.Currencysymbol
//                                     //     )}${opt?.Maxval}`
//                                     //     : opt?.Maxval == 0
//                                     //       ? `Over ${decodeEntities(
//                                     //         storeInit?.Currencysymbol
//                                     //       )}${opt?.Minval}`
//                                     //       : `${decodeEntities(
//                                     //         storeInit?.Currencysymbol
//                                     //       )}${opt?.Minval} - ${decodeEntities(
//                                     //         storeInit?.Currencysymbol
//                                     //       )}${opt?.Maxval}`
//                                     // }
//                                     label={
//                                       opt?.Minval == 0
//                                         ? `Under ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${opt?.Maxval}`
//                                         : opt?.Maxval == 0
//                                           ? `Over ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${opt?.Minval}`
//                                           : `${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${opt?.Minval} - ${loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}${opt?.Maxval}`
//                                     }
//                                   />
//                                 </div>
//                               )
//                             )}
//                           </AccordionDetails>
//                         </Accordion>
//                       )}
//                     </>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="for_lookBookImgDiv">
//             <div
//               className="for_lookBookMobileTopLine"
//               style={{
//                 display: "flex",
//                 justifyContent: "end",
//                 margin: "0px 5px 25px 5px",
//                 gap: '20px'
//               }}
//             >
//               <FilterAltIcon
//                 fontSize="large"
//                 style={{ color: "#c0bbb1" }}
//                 className="for_lookBookMobileFilter"
//                 onClick={() => setIsDrawerOpen(true)}
//               />
//               <HtmlTooltip
//                 title={<CustomTooltipContent categories={selectedCategories} />}
//               >
//                 <button
//                   onClick={handleOpen}
//                   className="for_lookBookSelectViewBtn"
//                   style={{
//                     background: selectedCategories.length !== 0 ? "#7d7f85" : "#ffff",
//                     color: selectedCategories.length !== 0 ? "#fff" : "#7d7f85"
//                   }}
//                 >
//                   Set View
//                 </button>
//               </HtmlTooltip>

//               {/* <select
//                 value={selectedValue}
//                 onChange={handleChange}
//                 className="for_lookBookViveBoxSet"
//               >
//                 <option value="1">Single Block View</option>
//                 <option value="2">Double Block View</option>
//                 <option value="3">Scroll Block View</option>
//               </select> */}

//               <ToggleButtonGroup
//                 size="medium"
//                 value={selectedValue}
//                 exclusive
//                 onChange={handleChange}
//                 aria-label="text alignment"
//                 sx={{
//                   height: "35px",
//                   borderRadius: '0px',
//                   '.Mui-selected': {
//                     backgroundColor: '#7d7f856e',
//                     color: '#fff',
//                   },
//                   '.MuiToggleButton-root': {
//                     borderRadius: '0px',
//                     '&:not(.Mui-selected)': {
//                       backgroundColor: 'transparent',
//                       color: '#000',
//                     }
//                   }
//                 }}
//               >
//                 <ToggleButton value={1} aria-label="left aligned">
//                   {/* <RxGrid /> */}|
//                 </ToggleButton>
//                 <ToggleButton value={2} aria-label="centered">
//                   {/* <TfiLayoutGrid2 /> */}
//                   ||
//                 </ToggleButton>
//                 <ToggleButton value={3} aria-label="right aligned">
//                   {/* <TfiLayoutGrid3 /> */}
//                   |||
//                 </ToggleButton>
//               </ToggleButtonGroup>
//             </div>

//             {selectedValue == 2 && (
//               <div className="for_lookBookImgDivMain">
//                 {filteredDesignSetLstData?.length == 0 ? (
//                   <div className="for_noProductFoundLookBookDiv">
//                     <p>No Product Found!</p>
//                   </div>
//                 ) : (
//                   filteredDesignSetLstData?.map((slide, index) => (
//                     <div className="for_designSetDiv" key={index}>
//                       <div
//                         style={{
//                           display: "flex",
//                           height: dataKey == index && "100%",
//                           position: 'relative'
//                         }}
//                       >
//                         {ProdCardImageFunc(slide) ? (
//                           <img
//                             className="for_lookBookImg"
//                             loading="lazy"
//                             src={ProdCardImageFunc(slide)}
//                             alt={`Slide ${index}`}
//                             onMouseEnter={() => handleHoverImages(index)}
//                             onMouseLeave={() => seyDataKey(null)}
//                             style={{
//                               height: dataKey == index ? "100%" : "250px",
//                               cursor: "pointer",
//                             }}
//                           />
//                         ) : (
//                           <div
//                             style={{
//                               height: dataKey == index ? "100%" : "250px",
//                               width: "100%",
//                               ...getRandomBgColor(index),
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               cursor: "pointer",
//                             }}
//                           >
//                             <p style={{ fontSize: "30px", color: getRandomBgColor(index).color }}>{slide?.designsetno}</p>
//                           </div>
//                         )}
//                         <p className="for_lb2designList_title">
//                           {slide?.designsetno}
//                         </p>
//                       </div>
//                       <div
//                         className="for_lookBookImgDeatil"
//                         style={{
//                           display: dataKey == index ? "none" : "flex",
//                           justifyContent: "space-between",
//                           alignItems: 'center',
//                           margin: "5px",
//                         }}
//                       >
//                         <p className="for_lookBookDesc" style={{ fontSize: "13px", margin: "2px" }}>
//                           DWT:{" "}
//                           {calculateTotalUnitCostWithMarkUpDwt(
//                             JSON.parse(slide.Designdetail)
//                           ).toFixed(3)}{" "}
//                           | GWT:{" "}
//                           {calculateTotalUnitCostWithMarkUpGWt(
//                             JSON.parse(slide.Designdetail)
//                           ).toFixed(3)}{" "}
//                           | NWT:{" "}
//                           {calculateTotalUnitCostWithMarkUpNwt(
//                             JSON.parse(slide.Designdetail)
//                           ).toFixed(3)}{" "}
//                         </p>
//                         <div
//                           className="for_lookBookImgDeatilSub"
//                           style={{ display: "flex", alignItems: "center" }}
//                         >
//                           <p
//                             style={{
//                               margin: "0px 10px 0px 0px",
//                               fontSize: "15px",
//                               fontWeight: 600,
//                             }}
//                             className="for_lookBookPriceShow"
//                           >
//                             {" "}
//                             <span
//                               className="for_currencyFont"
//                             >
//                               {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
//                             </span>
//                             {/* <span
//                               className="for_currencyFont"
//                               dangerouslySetInnerHTML={{
//                                 __html: decodeEntities(
//                                   storeInit?.Currencysymbol
//                                 ),
//                               }}
//                             /> */}
//                             &nbsp;
//                             {formatter(calculateTotalUnitCostWithMarkUp(
//                               JSON.parse(slide.Designdetail)
//                             ))}
//                           </p>
//                           <button
//                             className="for_lookBookBuyBtn"
//                             onClick={() =>
//                               handleByCombo(
//                                 parseDesignDetails(slide?.Designdetail, "Cart")
//                               )
//                             }
//                           >
//                             Buy Combo
//                           </button>
//                         </div>
//                       </div>
//                       <div
//                         className="for_lookBookSubImgMain"
//                         style={{ display: dataKey == index && "none" }}
//                       >
//                         <Swiper
//                           slidesPerView={4}
//                           spaceBetween={10}
//                           navigation={true}
//                           // pagination={{ clickable: true }}
//                           loop={false}
//                           modules={[Pagination, Navigation]}
//                           className="for_LookBookmySwiper"
//                           breakpoints={{
//                             320: {
//                               slidesPerView: 1,
//                               spaceBetween: 10,
//                             },
//                             480: {
//                               slidesPerView: 2,
//                               spaceBetween: 20,
//                             },
//                             640: {
//                               slidesPerView: 3,
//                               spaceBetween: 30,
//                             },
//                           }}
//                         >
//                           {sortDesignDetailsBySrNo(
//                             parseDesignDetails(slide?.Designdetail)
//                           )?.map((detail, subIndex) => (
//                             <div
//                               className="for_lookBookSubImageDiv"
//                               key={subIndex}
//                             >
//                               <SwiperSlide
//                                 className="for_lookBookSliderSubDiv"
//                                 style={{
//                                   marginRight: "0px",
//                                   cursor: "pointer",
//                                 }}
//                               >
//                                 {detail?.IsInReadyStock == 1 && (
//                                   <span className="for_LookBookinstock">
//                                     In Stock
//                                   </span>
//                                 )}
//                                 <img
//                                   className="for_lookBookSubImage"
//                                   loading="lazy"
//                                   src={`${imageUrlDesignSet}${detail?.designno}_1.${detail?.ImageExtension}`}
//                                   alt={`Sub image ${subIndex} for slide ${index}`}
//                                   onClick={() =>
//                                     handleNavigation(
//                                       detail?.designno,
//                                       detail?.autocode,
//                                       detail?.TitleLine ? detail?.TitleLine : ""
//                                     )
//                                   }
//                                 />
//                                 {/* <p style={{ margin: '0px 0px 5px 2px', color: '#ccc', fontSize: '12px' }}>{detail?.CategoryName}</p> */}
//                                 <div
//                                   style={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     marginBottom: "5px",
//                                   }}
//                                 >
//                                   {cartItems.includes(detail?.autocode) ? (
//                                     <button
//                                       className="for_lookBookINCartBtn"
//                                       onClick={() => handleRemoveCart(detail)}
//                                     >
//                                       REMOVE CART
//                                     </button>
//                                   ) : (
//                                     <button
//                                       className="for_lookBookAddtoCartBtn"
//                                       onClick={() => handleAddToCart(detail)}
//                                     >
//                                       ADD TO CART +
//                                     </button>
//                                   )}
//                                 </div>
//                               </SwiperSlide>
//                             </div>
//                           ))}
//                         </Swiper>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}

//             {selectedValue == 3 && (
//               <div className="for_lookBookImgDivMain">
//                 {filteredDesignSetLstData?.length == 0 ? (
//                   <div className="for_noProductFoundLookBookDiv">
//                     <p>No Product Found!</p>
//                   </div>
//                 ) : (
//                   <>
//                     {filteredDesignSetLstData?.map((slide, index) => (
//                       <div className="for_designSetDiv2" key={index}>
//                         <div
//                           style={{
//                             display: "flex",
//                             width: "30%",
//                             height: "300px",
//                             position: 'relative'
//                           }}
//                           className="for_designSetDiv2_sub1"
//                         >
//                           {ProdCardImageFunc(slide) ? (
//                             <img
//                               className="for_lookBookImg"
//                               loading="lazy"
//                               src={ProdCardImageFunc(slide)}
//                               alt={`Slide ${index}`}
//                               // onMouseEnter={() => handleHoverImages(index)}
//                               // onMouseLeave={() => seyDataKey(null)}
//                               style={{
//                                 height: "100%",
//                                 cursor: "pointer",
//                               }}
//                             />
//                           ) : (
//                             <div
//                               style={{
//                                 height: "100%",
//                                 width: "100%",
//                                 ...getRandomBgColor(index),
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               <p style={{ fontSize: "30px", color: getRandomBgColor(index).color }}>{slide?.designsetno}</p>
//                             </div>
//                           )}
//                           <p className="for_lb1designList_title">{slide?.designsetno}</p>
//                         </div>

//                         <div
//                           style={{
//                             display: dataKey == index && "none",
//                             display: "flex",
//                             width: "70%",
//                             justifyContent: "space-around",
//                             alignItems: "center",
//                             flexDirection: "column",
//                           }}
//                           className="for_designSetDiv2_sub2"
//                         >
//                           <div
//                             className="for_lookBookImgDeatil"
//                             style={{
//                               display: dataKey == index ? "none" : "flex",
//                               justifyContent: "space-between",
//                               alignItems: 'center',
//                               width: "100%",
//                               padding: "0px 15px",
//                               margin: "5px",
//                             }}
//                           >
//                             <p className="for_lookBookDesc" style={{ fontSize: "13px", margin: "2px" }}>
//                               DWT:{" "}
//                               {calculateTotalUnitCostWithMarkUpDwt(
//                                 JSON.parse(slide.Designdetail)
//                               ).toFixed(3)}{" "}
//                               | GWT:{" "}
//                               {calculateTotalUnitCostWithMarkUpGWt(
//                                 JSON.parse(slide.Designdetail)
//                               ).toFixed(3)}{" "}
//                               | NWT:{" "}
//                               {calculateTotalUnitCostWithMarkUpNwt(
//                                 JSON.parse(slide.Designdetail)
//                               ).toFixed(3)}{" "}
//                             </p>
//                             <div
//                               className="for_lookBookImgDeatilSub"
//                               style={{ display: "flex", alignItems: "center" }}
//                             >
//                               <p
//                                 style={{
//                                   margin: "0px 10px 0px 0px",
//                                   fontSize: "15px",
//                                   fontWeight: 600,
//                                 }}
//                                 className="for_lookBookPriceShow"
//                               >
//                                 {" "}
//                                 {/* <span
//                                   className="for_currencyFont"
//                                   dangerouslySetInnerHTML={{
//                                     __html: decodeEntities(
//                                       storeInit?.Currencysymbol
//                                     ),
//                                   }}
//                                 /> */}
//                                 <span
//                                   className="for_currencyFont"
//                                 >
//                                   {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                 </span>
//                                 &nbsp;
//                                 {formatter(calculateTotalUnitCostWithMarkUp(
//                                   JSON.parse(slide.Designdetail)
//                                 ))}
//                               </p>
//                               <button
//                                 className="for_lookBookBuyBtn"
//                                 onClick={() =>
//                                   handleByCombo(
//                                     parseDesignDetails(
//                                       slide?.Designdetail,
//                                       "Cart"
//                                     )
//                                   )
//                                 }
//                               >
//                                 Buy Combo
//                               </button>
//                             </div>
//                           </div>
//                           <Swiper
//                             slidesPerView={4}
//                             spaceBetween={10}
//                             navigation={true}
//                             loop={false}
//                             modules={[Pagination, Navigation]}
//                             className="for_LookBookmySwiper for_lookBookThirdViewWeb"
//                             breakpoints={{
//                               320: {
//                                 slidesPerView: 1,
//                                 spaceBetween: 10,
//                               },
//                               480: {
//                                 slidesPerView: 2,
//                                 spaceBetween: 20,
//                               },
//                               640: {
//                                 slidesPerView: 3,
//                                 spaceBetween: 30,
//                               },
//                             }}
//                           >
//                             {sortDesignDetailsBySrNo(
//                               parseDesignDetails(slide?.Designdetail)
//                             )?.map((detail, subIndex) => (
//                               <div
//                                 className="for_lookBookSubImageDiv"
//                                 key={subIndex}
//                               >
//                                 <SwiperSlide
//                                   className="for_lookBookSliderSubDiv"
//                                   style={{
//                                     marginRight: "0px",
//                                     cursor: "pointer",
//                                   }}
//                                 >
//                                   {detail?.IsInReadyStock == 1 && (
//                                     <span className="for_LookBookinstock">
//                                       In Stock
//                                     </span>
//                                   )}
//                                   <img
//                                     className="for_lookBookSubImage"
//                                     loading="lazy"
//                                     src={`${imageUrlDesignSet}${detail?.designno}_1.${detail?.ImageExtension}`}
//                                     alt={`Sub image ${subIndex} for slide ${index}`}
//                                     onClick={() =>
//                                       handleNavigation(
//                                         detail?.designno,
//                                         detail?.autocode,
//                                         detail?.TitleLine
//                                           ? detail?.TitleLine
//                                           : ""
//                                       )
//                                     }
//                                   />
//                                   <div
//                                     style={{
//                                       display: "flex",
//                                       justifyContent: "center",
//                                       marginBottom: "5px",
//                                     }}
//                                   >
//                                     {cartItems.includes(detail?.autocode) ? (
//                                       <button
//                                         className="for_lookBookINCartBtn"
//                                         onClick={() => handleRemoveCart(detail)}
//                                       >
//                                         REMOVE CART
//                                       </button>
//                                     ) : (
//                                       <button
//                                         className="for_lookBookAddtoCartBtn"
//                                         onClick={() => handleAddToCart(detail)}
//                                       >
//                                         ADD TO CART +
//                                       </button>
//                                     )}
//                                   </div>
//                                 </SwiperSlide>
//                               </div>
//                             ))}
//                           </Swiper>


//                           <div className="for_LookBookMobileThridViewMain">
//                             <div className="card">
//                               <Swiper
//                                 className="for_LookBookMobileThridViewMain_swiper_w"
//                                 spaceBetween={5}
//                                 slidesPerView={1}
//                                 speed={1000}
//                                 onSwiper={setSwiper}
//                                 navigation
//                                 pagination
//                               >
//                                 {sortDesignDetailsBySrNo(
//                                   parseDesignDetails(slide?.Designdetail)
//                                 )?.map((detail, subIndex) => (
//                                   <div
//                                     className="for_lookBookSubImageDiv"
//                                     key={subIndex}
//                                   >
//                                     <SwiperSlide
//                                       key={`detail-${detail?.id}`}
//                                       style={{
//                                         marginRight: "0px",
//                                         cursor: "pointer",
//                                       }}
//                                     >
//                                       {detail?.IsInReadyStock == 1 && (
//                                         <span className="for_LookBookinstock">
//                                           In Stock
//                                         </span>
//                                       )}
//                                       <img
//                                         className="for_lookBookSubImage"
//                                         loading="lazy"
//                                         src={`${imageUrlDesignSet}${detail?.designno}_1.${detail?.ImageExtension}`}
//                                         alt={`Sub image ${subIndex} for slide ${index}`}
//                                         onClick={() =>
//                                           handleNavigation(
//                                             detail?.designno,
//                                             detail?.autocode,
//                                             detail?.TitleLine
//                                               ? detail?.TitleLine
//                                               : ""
//                                           )
//                                         }
//                                       />
//                                       <div
//                                         style={{
//                                           display: "flex",
//                                           justifyContent: "center",
//                                           marginBottom: "5px",
//                                         }}
//                                       >
//                                         {cartItems.includes(detail?.autocode) ? (
//                                           <button
//                                             className="for_lookBookINCartBtn"
//                                             onClick={() => handleRemoveCart(detail)}
//                                           >
//                                             REMOVE CART
//                                           </button>
//                                         ) : (
//                                           <button
//                                             className="for_lookBookAddtoCartBtn"
//                                             onClick={() => handleAddToCart(detail)}
//                                           >
//                                             ADD TO CART +
//                                           </button>
//                                         )}
//                                       </div>
//                                     </SwiperSlide>
//                                   </div>
//                                 ))}
//                               </Swiper>
//                             </div>
//                             {/* <div className="btnflex">
//                               <button className="btncst" onClick={handlePrevious}>&lt;</button>
//                               <button className="btncst" onClick={handleNext}>&gt;</button>
//                             </div> */}
//                           </div>

//                           {/* } */}
//                         </div>
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </div>
//             )}

//             {selectedValue == 1 && (
//               <div className="for_lookbook3MainDiv">
//                 {filteredDesignSetLstData?.length == 0 ? (
//                   <div className="for_noProductFoundLookBookDiv">
//                     <p>No Product Found!</p>
//                   </div>
//                 ) : (
//                   <>
//                     <Swiper
//                       slidesPerView={1}
//                       spaceBetween={10}
//                       navigation={true}
//                       loop={true}
//                       thumbs={{ swiper: thumbsSwiper }}
//                       modules={[Keyboard, FreeMode, Navigation, Thumbs, Scrollbar]}
//                       keyboard={{ enabled: true }}
//                       mousewheel={true}
//                       className="for_LookBookmySwiper mySwiper2"
//                     >
//                       {filteredDesignSetLstData?.map((slide, index) => (
//                         <SwiperSlide key={index}>
//                           <div>
//                             <div className="for_lb3compeletethelook_cont">
//                               <div className="for_lb3ctlImg_containe">
//                                 {ProdCardImageFunc(slide) ? (
//                                   <img
//                                     src={ProdCardImageFunc(slide)}
//                                     alt=""
//                                     className="for_lb3ctl_img"
//                                   />
//                                 ) : (
//                                   <div
//                                     style={{
//                                       height: "100%",
//                                       width: "100%",
//                                       ...getRandomBgColor(index),
//                                       display: "flex",
//                                       alignItems: "center",
//                                       justifyContent: "center",
//                                       cursor: "pointer",
//                                     }}
//                                     className="for_lb3ctl_img"
//                                   >
//                                     {/* <p style={{ fontSize: "30px", color: getRandomBgColor(index).color }}>{slide?.designsetno}</p> */}
//                                   </div>
//                                 )}
//                                 {/* <div className="for_lb3BuyComboDiv" onClick={() =>
//                                   handleByCombo(
//                                     parseDesignDetails(
//                                       slide?.Designdetail,
//                                       "Cart"
//                                     )
//                                   )
//                                 }>
//                                   <button>
//                                     Buy Combo
//                                   </button>
//                                 </div> */}

//                               </div>
//                               <div
//                                 className={
//                                   (slide?.Designdetail == undefined
//                                     ? []
//                                     : sortDesignDetailsBySrNo(
//                                       parseDesignDetails(slide?.Designdetail)
//                                     )
//                                   )?.length > 3
//                                     ? "for_lb3compeletethelook_prodt_for_3"
//                                     : "for_lb3compeletethelook_prodt"
//                                 }
//                               >
//                                 <p className="for_lb3designList_title" >{slide?.designsetno}</p>
//                                 <div className="for_lb3_prodtDiv2">
//                                   {sortDesignDetailsBySrNo(
//                                     parseDesignDetails(slide?.Designdetail)
//                                   )?.map((ele, subIndex) => (
//                                     <div
//                                       key={subIndex}
//                                       className="for_lb3completethelook_outer"
//                                       style={{
//                                         borderTop: subIndex !== 0 ? "none" : "",
//                                         width: "513px",
//                                         padding: "5px",
//                                         border: "1px solid #e1e1e1",
//                                         backgroundColor: "#fff",
//                                       }}
//                                     >
//                                       <div
//                                         className="for_lookbookMainDivdata"
//                                         style={{
//                                           display: "flex",
//                                           gap: "40px",
//                                           justifyContent: "space-around",
//                                         }}
//                                       >
//                                         <div className="for_lb3ImageDiv" style={{ marginLeft: "12px" }}>
//                                           <img
//                                             src={
//                                               ele?.ImageCount > 0
//                                                 ? `${storeInit?.DesignImageFol}${ele?.designno}_1.${ele?.ImageExtension}`
//                                                 : imageNotFound
//                                             }
//                                             alt=""
//                                             className="for_lb3srthelook_img"
//                                             onClick={() =>
//                                               handleNavigation(
//                                                 ele?.designno,
//                                                 ele?.autocode,
//                                                 ele?.TitleLine
//                                                   ? ele?.TitleLine
//                                                   : ""
//                                               )
//                                             }
//                                           />
//                                         </div>
//                                         <div className="for_lb3srthelook_prodinfo" onClick={() =>
//                                           handleNavigation(
//                                             ele?.designno,
//                                             ele?.autocode,
//                                             ele?.TitleLine
//                                               ? ele?.TitleLine
//                                               : ""
//                                           )
//                                         }>
//                                           <div
//                                             style={{
//                                               fontSize: "14px",
//                                               color: "#7d7f85",
//                                               textTransform: "uppercase",
//                                             }}
//                                             className="for_lb3srthelook_prodinfo_inner"
//                                           >
//                                             <p>
//                                               <span>
//                                                 {ele?.designno} - {ele?.CategoryName}
//                                               </span>
//                                               <br />

//                                               {storeInit?.IsGrossWeight == 1 &&
//                                                 <>
//                                                   <span className='for_lb3detailDT'>GWT: </span>
//                                                   <span className='for_lb3detailDT'>{(ele?.Gwt || 0)?.toFixed(3)}</span>
//                                                 </>
//                                               }

//                                               {Number(ele?.Nwt) !== 0 && (
//                                                 <>
//                                                   <span className='for_lb3pipe'> | </span>
//                                                   <span className='for_lb3detailDT'>NWT : </span>
//                                                   <span className='for_lb3detailDT'>{(ele?.Nwt || 0)?.toFixed(3)}</span>
//                                                 </>
//                                               )}

//                                               {storeInit?.IsGrossWeight == 1 &&
//                                                 <>
//                                                   {(ele?.Dwt != "0" || ele?.Dpcs != "0") &&
//                                                     <>
//                                                       <span className='for_lb3pipe'> | </span>
//                                                       <span className='for_lb3detailDT'>DWT: </span>
//                                                       <span className='for_lb3detailDT'>{(ele?.Dwt || 0)?.toFixed(3)} / {(ele?.Dpcs || 0)}</span>
//                                                     </>
//                                                   }
//                                                 </>
//                                               }
//                                               {storeInit?.IsStoneWeight == 1 &&
//                                                 <>
//                                                   {(ele?.CSwt != "0" || ele?.CSpcs != "0") &&
//                                                     <>
//                                                       <span className='for_lb3pipe'> | </span>
//                                                       <span className='for_lb3detailDT'>CWT: </span>
//                                                       <span className='for_lb3detailDT'>{(ele?.CSwt || 0)?.toFixed(3)} /{(ele?.CSpcs || 0)}</span>
//                                                     </>
//                                                   }
//                                                 </>
//                                               }
//                                               <br />
//                                               {/* <span
//                                               className="for_currencyFont"
//                                               dangerouslySetInnerHTML={{
//                                                 __html: decodeEntities(
//                                                   storeInit?.Currencysymbol
//                                                 ),
//                                               }}
//                                             /> */}
//                                               <span
//                                                 className="for_currencyFont"
//                                               >
//                                                 {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                               </span>
//                                               &nbsp;
//                                               {formatter(ele?.UnitCostWithMarkUp)}
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <div
//                                           style={{
//                                             display: "flex",
//                                             justifyContent: "end",
//                                             alignItems: "center",
//                                             marginBottom: "5px",
//                                           }}
//                                           className="for_lb3cartIconBtnDiv"
//                                         >
//                                           {cartItems.includes(ele?.autocode) ? (
//                                             <IconButton
//                                               onClick={() => handleRemoveCart(ele)}
//                                             >
//                                               <LocalMallIcon className="for_lookBookINCartIconBtn" />
//                                             </IconButton>
//                                           ) : (
//                                             <IconButton
//                                               onClick={() => handleAddToCart(ele)}
//                                             >
//                                               <LocalMallOutlinedIcon className="for_lookBookAddtoCartIconBtn" />
//                                             </IconButton>
//                                           )}


//                                         </div>
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                                 <div
//                                   className="for_lb3TotalBtnGroup"
//                                 >
//                                   <div className="for_lb3TotalPrice">
//                                     <span>
//                                       <span
//                                         className="for_currencyFont"
//                                       >
//                                         {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
//                                       </span>
//                                       &nbsp;
//                                       {formatter(calculateTotalUnitCostWithMarkUp(
//                                         JSON.parse(slide.Designdetail)
//                                       ))}
//                                     </span>
//                                   </div>
//                                   <div className="for_lb3BuyComboDiv" onClick={() =>
//                                     handleByCombo(
//                                       parseDesignDetails(
//                                         slide?.Designdetail,
//                                         "Cart"
//                                       )
//                                     )
//                                   }>
//                                     <span>
//                                       Buy Combo
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                     <div className="for_lookbook3thumbMainDiv">
//                       {filteredDesignSetLstData?.length != 0 && (
//                         <Swiper
//                           onSwiper={setThumbsSwiper}
//                           spaceBetween={10}
//                           slidesPerView={20}
//                           freeMode={true}
//                           watchSlidesProgress={true}
//                           modules={[Keyboard, FreeMode, Navigation, Thumbs]}
//                           keyboard={{ enabled: true }}
//                           mousewheel={true}
//                           className="mySwiper"
//                           breakpoints={{
//                             320: {
//                               slidesPerView: 2,
//                               spaceBetween: 10,
//                             },
//                             480: {
//                               slidesPerView: 3,
//                               spaceBetween: 10,
//                             },
//                             640: {
//                               slidesPerView: 4,
//                               spaceBetween: 10,
//                             },
//                             768: {
//                               slidesPerView: 5,
//                               spaceBetween: 10,
//                             },
//                             1024: {
//                               slidesPerView: 10,
//                               spaceBetween: 10,
//                             },
//                             1280: {
//                               slidesPerView: 20,
//                               spaceBetween: 10,
//                             },
//                           }}
//                         >
//                           {filteredDesignSetLstData?.map((slide, index) => (
//                             <SwiperSlide key={index}>

//                               {ProdCardImageFunc(slide) ? (
//                                 <img
//                                   src={ProdCardImageFunc(slide)}
//                                   alt=""
//                                   className="ctl_Paginationimg"
//                                 />
//                               ) : (
//                                 <div
//                                   style={{
//                                     height: "100%",
//                                     width: "100%",
//                                     ...getRandomBgColor(index),
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     cursor: "pointer",
//                                   }}
//                                   className="for_lb3ctl_img"
//                                 >
//                                   {/* <p style={{ fontSize: "30px", color: getRandomBgColor(index).color }}>{slide?.designsetno}</p> */}
//                                 </div>
//                               )}
//                             </SwiperSlide>
//                           ))}
//                         </Swiper>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//           </div>
//         </div>
//       )}
//       <div>
//         <p
//           style={{
//             paddingBlock: "30px",
//             margin: "0px",
//             textAlign: "center",
//             color: "white",
//             cursor: "pointer",
//             fontSize: "13px",
//             fontWeight: 500,
//             letterSpacing: "1px",
//           }}
//           onClick={() =>
//             window.scrollTo({
//               top: 0,
//               behavior: "smooth",
//             })
//           }
//         >
//           BACK TO TOP
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Lookbook;
