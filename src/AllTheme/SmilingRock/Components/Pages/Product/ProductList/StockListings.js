import React, { useEffect, useState } from "react";
import "./StockListings.scss";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { useLocation, useNavigate } from "react-router-dom";
import imageNotFound from "../../../Assets/image-not-found.jpg"
import { findMetalColor, findMetalType, formatRedirectTitleLine, formatter, formatTitleLine, storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ProductListSkeleton from "./productlist_skeleton/ProductListSkeleton";
import {
    Accordion, AccordionDetails, AccordionSummary, Box, Card, CardMedia, Checkbox, Drawer, FormControlLabel, Pagination, PaginationItem, Skeleton,
    Typography, useMediaQuery
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CartCount, MetalColor_Image, smr_loginState, WishCount } from "../../../Recoil/atom";
import pako from "pako";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { ColorStoneQualityColorComboAPI } from "../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie'
import { Helmet } from "react-helmet";
import EditablePagination from "../../../../../RoopJewellers/Components/Pages/ReusableComponent/EditablePagination/EditablePagination";
import useGlobalPreventSave from "../../../../../../utils/Glob_Functions/useGlobalPreventSave";

const defaultImage = "http://nzen/R50B3/UFSImage/demostoreQI9S5BDATC0M1KYJH_uKey/Design_Image/Design_Thumb/A14412~1.jpg";

const StockListings = () => {

    const islogin = useRecoilValue(smr_loginState);
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

    useGlobalPreventSave();

    let location = useLocation();
    let navigate = useNavigate();
    let minwidth1201px = useMediaQuery('(min-width:1201px)')
    let maxwidth590px = useMediaQuery('(max-width:590px)')
    let maxwidth464px = useMediaQuery('(max-width:464px)')

    const [productListData, setProductListData] = useState([]);
    const [isProductListData, setIsProductListData] = useState(false);
    const [finalProductListData, setFinalProductListData] = useState([]);
    const [isProdLoading, setIsProdLoading] = useState(true);
    const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
    const [storeInit, setStoreInit] = useState({});
    const [isshowDots, setisshowDots] = useState(false);
    const [filterData, setFilterData] = useState([])
    const [filterChecked, setFilterChecked] = useState({})
    const [afterFilterCount, setAfterFilterCount] = useState();
    const [expandedAccordions, setExpandedAccordions] = useState({});
    const [currPage, setCurrPage] = useState(1);
    const [cartArr, setCartArr] = useState({})
    const [wishArr, setWishArr] = useState({})
    const [menuParams, setMenuParams] = useState({})
    const [filterProdListEmpty, setFilterProdListEmpty] = useState(false)
    const [metalTypeCombo, setMetalTypeCombo] = useState([]);
    const [diaQcCombo, setDiaQcCombo] = useState([]);
    const [csQcCombo, setCsQcCombo] = useState([]);
    const [selectedMetalId, setSelectedMetalId] = useState();
    const [selectedDiaId, setSelectedDiaId] = useState();
    const [selectedCsId, setSelectedCsId] = useState();
    const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
    const [loginInfo, setLoginInfo] = useState();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [prodListType, setprodListType] = useState();
    const [sortBySelect, setSortBySelect] = useState();
    const setCartCountVal = useSetRecoilState(CartCount)
    const setWishCountVal = useSetRecoilState(WishCount)
    const [sliderValue, setSliderValue] = useState([]);
    const [sliderValue1, setSliderValue1] = useState([]);
    const [sliderValue2, setSliderValue2] = useState([]);
    const [selectedMetalColor, setSelectedMetalColor] = useState(null);
    const [imageMap, setImageMap] = useState({});
    const [afterCountStatus, setAfterCountStatus] = useState(false);
    let cookie = Cookies.get('visiterId')
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
    const [stockData, setStockData] = useState([]);

    const isEditablePage = 1;
    const [customFlag, setCustomFlag] = useState(false);

    // Add missing variables and functions
    const [imageAvailability, setImageAvailability] = useState({});
    const [metalColorType] = useState([
        { id: 1, metal: 'yellow' },
        { id: 2, metal: 'white' },
        { id: 3, metal: 'rose' }
    ]);

    // Cart and stock management states
    const [cartItems, setCartItems] = useState([]);
    const [availableStock, setAvailableStock] = useState([]);
    const [usedProducts, setUsedProducts] = useState([]); // Store products that have been used
    console.log("TCL: StockListings -> usedProducts", usedProducts)
    const [totalCaratConsumed, setTotalCaratConsumed] = useState(0); // Track total carat consumed
    const [showCartModal, setShowCartModal] = useState(false);
    const [showStockGridModal, setShowStockGridModal] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');

    // Add missing functions
    const handleImgRollover = (productData, yellowRollImage, whiteRollImage, roseRollImage) => {
        // Implementation for image rollover
    };

    const handleLeaveImgRolloverImg = (productData, yellowImage, whiteImage, roseImage) => {
        // Implementation for leaving image rollover
    };

    const getDynamicVideo = (designno, videoCount, videoExtension) => {
        if (videoCount > 0) {
            return `${storImagePath()}/images/Product/${designno}/video.${videoExtension}`;
        }
        return undefined;
    };

    const getDynamicRollImages = (designno, imageCount, imageExtension) => {
        if (imageCount > 0) {
            return `${storImagePath()}/images/Product/${designno}/roll.${imageExtension}`;
        }
        return undefined;
    };

    const getDynamicImages = (designno, imageExtension) => {
        return `${storImagePath()}/images/Product/${designno}/thumb.${imageExtension}`;
    };

    // Add missing RangeFilterView components and handlers
    const RangeFilterView = ({ ele, sliderValue, setSliderValue, handleRangeFilterApi, prodListType, cookie, show, setShow, appliedRange1, setAppliedRange1 }) => {
        return (
            <div>
                {/* Range filter implementation */}
                <div>Diamond Range Filter</div>
            </div>
        );
    };

    const RangeFilterView1 = ({ ele, sliderValue1, setSliderValue1, handleRangeFilterApi1, prodListType, cookie, show1, setShow1, appliedRange2, setAppliedRange2 }) => {
        return (
            <div>
                {/* Net weight range filter implementation */}
                <div>Net Weight Range Filter</div>
            </div>
        );
    };

    const RangeFilterView2 = ({ ele, sliderValue2, setSliderValue2, handleRangeFilterApi2, prodListType, cookie, show2, setShow2, appliedRange3, setAppliedRange3 }) => {
        return (
            <div>
                {/* Gross weight range filter implementation */}
                <div>Gross Weight Range Filter</div>
            </div>
        );
    };

    const handleRangeFilterApi = () => {
        // Implementation for diamond range filter API
    };

    const handleRangeFilterApi1 = () => {
        // Implementation for net weight range filter API
    };

    const handleRangeFilterApi2 = () => {
        // Implementation for gross weight range filter API
    };

    // Cart management functions
    const addToCart = (product) => {
        const productCarat = Number(product.carat);
        const totalAvailableCarat = stockData.reduce((sum, item) => sum + Number(item.carat || 0), 0);

        // Check if adding this product would exceed total available carat
        if (cartTotalCaratUsed + productCarat > totalAvailableCarat) {
            alert('Cannot add more products. Total carat limit reached!');
            return;
        }

        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            // If item exists, increase quantity
            setCartItems(prev => prev.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // Add new item to cart
            setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const itemToRemove = cartItems.find(item => item.id === productId);
        if (itemToRemove) {
            // Remove from cart
            setCartItems(prev => prev.filter(item => item.id !== productId));
        }
    };

    const updateCartQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const item = cartItems.find(item => item.id === productId);
        if (item) {
            const oldQuantity = item.quantity;
            const productCarat = Number(item.carat);
            const quantityDiff = newQuantity - oldQuantity;
            const totalAvailableCarat = stockData.reduce((sum, item) => sum + Number(item.carat || 0), 0);

            // Check if new quantity would exceed total available carat
            if (cartTotalCaratUsed + (quantityDiff * productCarat) > totalAvailableCarat) {
                alert('Cannot add more products. Total carat limit reached!');
                return;
            }

            // Update cart
            setCartItems(prev => prev.map(cartItem =>
                cartItem.id === productId
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
            ));
        }
    };

    // Filter and sort functions
    const getFilteredAndSortedProducts = () => {
        let filtered = availableStock;
        const totalAvailableCarat = stockData.reduce((sum, item) => sum + Number(item.carat || 0), 0);

        // Filter out products that would exceed carat limit
        filtered = filtered.filter(product => {
            const productCarat = Number(product.carat);
            return cartTotalCaratUsed + productCarat <= totalAvailableCarat;
        });

        // Apply filter
        if (selectedFilter !== 'all') {
            filtered = filtered.filter(product => {
                switch (selectedFilter) {
                    case 'virtual':
                        return product.stockType === 'virtual';
                    case 'physical':
                        return !product.stockType || product.stockType !== 'virtual';
                    case 'available':
                        return parseFloat(product.carat) > 0;
                    default:
                        return true;
                }
            });
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.shape.localeCompare(b.shape);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'carat-low':
                    return parseFloat(a.carat) - parseFloat(b.carat);
                case 'carat-high':
                    return parseFloat(b.carat) - parseFloat(a.carat);
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const setCSSVariable = () => {
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
        document.documentElement.style.setProperty(
            "--background-color",
            backgroundColor
        );
    };

    const handleAccordionChange = (index) => (event, isExpanded) => {
        setExpandedAccordions((prev) => ({
            ...prev,
            [index]: isExpanded,
        }));
    };

    useEffect(() => {
        setCSSVariable();
        const storeInitInside = JSON.parse(sessionStorage.getItem("storeInit"));
        const loginUserDetailInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

        let mtid = loginUserDetailInside?.MetalId ?? storeInitInside?.MetalId
        setSelectedMetalId(mtid)

        let diaid = loginUserDetailInside?.cmboDiaQCid ?? storeInitInside?.cmboDiaQCid
        setSelectedDiaId(diaid)

    }, [])

    useEffect(() => {
        const getStockData = JSON.parse(sessionStorage.getItem("stockData")) ?? [];
        setStockData(getStockData)
    }, [location?.key])

    useEffect(() => {
        if (stockData && stockData.length > 0) {
            setFinalProductListData(stockData);
            setAvailableStock(stockData);
            setIsProductListData(true);
            setIsProdLoading(false);
            setAfterFilterCount(stockData.length);
        }
    }, [stockData]);

    // Load used products from session storage
    useEffect(() => {
        const savedUsedProducts = JSON.parse(sessionStorage.getItem('usedProducts')) || [];
        setUsedProducts(savedUsedProducts);
    }, []);

    // Save used products to session storage
    useEffect(() => {
        sessionStorage.setItem('usedProducts', JSON.stringify(usedProducts));
    }, [usedProducts]);

    // Load total carat consumed from session storage
    useEffect(() => {
        const savedTotalCarat = JSON.parse(sessionStorage.getItem('totalCaratConsumed')) || 0;
        setTotalCaratConsumed(savedTotalCarat);
    }, []);

    // Save total carat consumed to session storage
    useEffect(() => {
        sessionStorage.setItem('totalCaratConsumed', JSON.stringify(totalCaratConsumed));
    }, [totalCaratConsumed]);

    // Load cart items from session storage
    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        setCartItems(savedCart);
    }, []);

    // Save cart items to session storage
    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        setSelectedMetalId(loginUserDetail?.MetalId ?? storeInit?.MetalId);
        setSelectedDiaId(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
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

    const handleCheckboxChange = (e, listname, val) => {
        const { name, checked } = e.target;
        setAfterCountStatus(true);

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

        let finalOutput = JSON.stringify(output?.Price)

        setCurrPage(1);
        setInputPage(1);
        sessionStorage.setItem('key', JSON.stringify(output))
        return output
    }

    const handelFilterClearAll = () => {
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
            setIsReset(false);
            setFilterChecked({});
            if (Object.keys(filterChecked).length > 0 || isSliderChanged) {
                setIsClearAllClicked(true);
            }
        }
    };

    useEffect(() => {
        handelFilterClearAll()
    }, [location?.key])

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

        let output = FilterValueWithCheckedOnly()
        let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }
        setIsOnlyProdLoading(true)
        setCurrPage(value)
        setInputPage(value);
        setTimeout(() => {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
        }, 100)

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

        ProductListApi(output, value, obj, prodListType, cookie, sortBySelect, DiaRange, netRange, grossRange)
            .then((res) => {
                if (res) {
                    setProductListData(res?.pdList);
                    setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
                }
                return res;
            })
            .catch((err) => console.log("err", err)).finally(() => {
                setTimeout(() => {
                    setIsOnlyProdLoading(false)
                }, 100);
            })
    }

    const handleCartandWish = (e, ele, type) => {
        let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

        let prodObj = {
            "autocode": ele?.autocode,
            "Metalid": (selectedMetalId ?? ele?.MetalPurityid),
            "MetalColorId": ele?.MetalColorid,
            "DiaQCid": (selectedDiaId ?? islogin == true ? loginInfo?.cmboDiaQCid : storeInit?.cmboDiaQCid),
            "CsQCid": (selectedCsId ?? islogin == true ? loginInfo?.cmboCSQCid : storeInit?.cmboCSQCid),
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

        let encodeObj = compressAndEncode(JSON.stringify(obj))
        navigate(`/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`);
    }

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

        const otherparamUrl = Object.entries({
            b: finalData?.FilterKey,
            g: finalData?.FilterKey1,
            c: finalData?.FilterKey2,
        })
            .filter(([key, value]) => value !== undefined)
            .map(([key, value]) => value)
            .filter(Boolean)
            .join(',');

        let menuEncoded = `${queryParameters1}/${otherparamUrl}`;
        const url = `/p/${BreadCumsObj()?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
        navigate(url);
    }

    const handleSortby = async (e) => {
        setSortBySelect(e.target?.value)

        let output = FilterValueWithCheckedOnly()
        let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

        setIsOnlyProdLoading(true)

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

        await ProductListApi(output, 1, obj, prodListType, cookie, sortby, DiaRange, netRange, grossRange)
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

    const DynamicListPageTitleLineFunc = () => {
        if (location?.search.split("=")[0]?.slice(1) == "M") {
            return menuParams?.menuname?.replaceAll('%20', '')
        } else {
            return location?.pathname.split('/')[2]?.replaceAll('%20', "")
        }
    }

    const BreadCumsObj = () => {
        let BreadCum = decodeURI(atob(location?.search.slice(3)))?.split('/')

        const values = BreadCum[0]?.split(',');
        const labels = BreadCum[1]?.split(',');

        const updatedBreadCum = labels?.reduce((acc, label, index) => {
            acc[label] = values[index] || '';
            return acc;
        }, {});

        const result = Object?.entries(updatedBreadCum ?? {})?.reduce((acc, [key, value], index) => {
            acc[`FilterKey${index === 0 ? '' : index}`] = key.charAt(0).toUpperCase() + key.slice(1);
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

    const cartTotalCaratUsed = cartItems.reduce((sum, cartItem) => {
        return sum + Number(cartItem.carat || 0) * cartItem.quantity;
    }, 0);

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
                    className="smrstk_filterDrawer"
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
                        // className="smrstk_metal_custom"
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
                            // className="smrstk_dia_custom"
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
                                            {`${diaQc.Quality},${diaQc.color}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {storeInit?.IsCsCustomization === 1 && (
                            <div
                            // className="smrstk_cs_custom"
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
                        {storeInit?.IsMetalCustComb === 1 && (
                            <div
                            // className="smrstk_sorting_custom"
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
                    <div className="smrstk_mobile_filter_portion">
                        {filterData?.length > 0 && (
                            <div className="smrstk_mobile_filter_portion_outter">
                                <span className="smrstk_filter_text">
                                    <span className="filter_Span">
                                        {
                                            // RangeFilterShow || Object.values(filterChecked)?.filter((ele) => ele.checked)
                                            //   ?.length === 0
                                            !showClearAllButton()
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
                                                    <span className="filter_Span">{`Product Found: ${afterFilterCount}`}</span>
                                                }
                                                </>
                                        }
                                    </span>
                                    <span
                                        onClick={() => handelFilterClearAll()}
                                        className="filter_Span"
                                    >
                                        {
                                            // RangeFilterShow || Object.values(filterChecked).filter((ele) => ele.checked)
                                            //   ?.length > 0
                                            showClearAllButton()
                                                ? "Clear All"
                                                : <>{afterCountStatus == true ? (
                                                    <Skeleton
                                                        variant="rounded"
                                                        width={140}
                                                        height={22}
                                                        className="pSkelton"
                                                    />
                                                ) :
                                                    <span className="filter_Span">{`Total Products: ${afterFilterCount}`}</span>
                                                }
                                                </>
                                        }
                                    </span>
                                </span>
                                <div style={{ marginTop: "12px", maxHeight: "80vh", overflowY: "auto" }}>
                                    {filterData?.map((ele, index) => (
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
                                                        expanded={!!expandedAccordions[index]}
                                                        onChange={handleAccordionChange(index)}
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
                                                            {(JSON?.parse(ele?.options) ?? []).map((opt) => (
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
                                                                                sx={{
                                                                                    color: "#7f7d85 !important",
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
                                                                        className="smrstk_mui_checkbox_label"
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
                                                    expanded={!!expandedAccordions[index]}
                                                    onChange={handleAccordionChange(index)}
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
                                                                        className="smrstk_mui_checkbox_label"
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
                                                    expanded={!!expandedAccordions[index]}
                                                    onChange={handleAccordionChange(index)}
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
                                                    expanded={!!expandedAccordions[index]}
                                                    onChange={handleAccordionChange(index)}
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
                                                    expanded={!!expandedAccordions[index]}
                                                    onChange={handleAccordionChange(index)}
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
                <div className="smrstk_bodyContain">
                    <div className="smrstk_outerContain">
                        <div className="smrstk_whiteInnerContain">
                            {/* {isProdLoading ? (
                                <ProductListSkeleton className="pSkelton" />
                            ) : (
                                <> */}
                            {!minwidth1201px ? (
                                <div className="smrstk_mobile_prodSorting">
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
                            )}

                            {/* Filter and Sort Controls */}
                            <div className="smrstk_filter_sort_controls" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '20px',
                                backgroundColor: '#f5f5f5',
                                marginBottom: '20px'
                            }}>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <div>
                                        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter:</label>
                                        <select
                                            value={selectedFilter}
                                            onChange={(e) => setSelectedFilter(e.target.value)}
                                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        >
                                            <option value="all">All Products</option>
                                            <option value="virtual">Virtual Stock</option>
                                            <option value="physical">Real Stock</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Sort By:</label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        >
                                            <option value="name">Sort</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="carat-low">Carat: Low to High</option>
                                            <option value="carat-high">Carat: High to Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 'bold' }}>
                                        Stock Available: {cartTotalCaratUsed.toFixed(1)} / {stockData.reduce((sum, item) => sum + Number(item.carat || 0), 0).toFixed(1)} ct
                                    </span>
                                    <span style={{ fontWeight: 'bold', color: '#dc3545' }}>
                                        Used Products: {cartItems.length}
                                    </span>
                                    <button
                                        onClick={() => setShowCartModal(true)}
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: 'var(--primary-background-smr)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                                    </button>
                                    <button
                                        onClick={() => setShowStockGridModal(true)}
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View Stock Grid
                                    </button>
                                </div>
                            </div>

                            {isProductListData === true ?
                                (
                                    <div className="smrstk_mainPortion">
                                        <div className="smrstk_filter_portion" style={{ marginTop: '20px', display: "none" }}>
                                            <div className="empty_sorting_div">
                                                <span
                                                    className="smrstk_breadcums_port "
                                                    // style={{ marginLeft: "72px" }}
                                                    onClick={() => {
                                                        navigate("/");
                                                    }}
                                                >
                                                    {"Home >"}{" "}
                                                </span>

                                                {location?.search.charAt(1) == "A" && (
                                                    <div
                                                        className="smrstk_breadcums_port"
                                                        style={{ marginLeft: "3px" }}
                                                    >
                                                        {location?.pathname?.split("/")[2]?.replaceAll('%20', '')}
                                                        {/* <span>{"Album"}</span> */}
                                                    </div>
                                                )}

                                                {location?.search.charAt(1) == "T" && (
                                                    <div
                                                        className="smrstk_breadcums_port"
                                                        style={{ marginLeft: "3px" }}
                                                    >
                                                        <span>{"Trending"}</span>
                                                    </div>
                                                )}

                                                {location?.search.charAt(1) == "B" && (
                                                    <div
                                                        className="smrstk_breadcums_port"
                                                        style={{ marginLeft: "3px" }}
                                                    >
                                                        <span>{"Best Seller"}</span>
                                                    </div>
                                                )}

                                                {location?.search?.charAt(1) == "N" && (
                                                    <div
                                                        className="smrstk_breadcums_port"
                                                        style={{ marginLeft: "3px" }}
                                                    >
                                                        <span>{"New Arrival"}</span>
                                                    </div>
                                                )}

                                                {location?.search?.charAt(1) == "S" && (
                                                    <div
                                                        className="smrstk_breadcums_port"
                                                        style={{ marginLeft: "3px", textTransform: "uppercase" }}
                                                    >
                                                        <span>{decodeURIComponent(location?.pathname?.split("/")[2])}</span>
                                                    </div>
                                                )}

                                                {IsBreadCumShow && (
                                                    <div
                                                        className="smrstk_breadcums_port"
                                                        style={{ marginLeft: "3px" }}
                                                    >
                                                        {/* {decodeURI(location?.pathname).slice(3).replaceAll("/"," > ").slice(0,-2)} */}
                                                        {BreadCumsObj()?.menuname && (
                                                            <span
                                                                onClick={() =>
                                                                    handleBreadcums({
                                                                        [BreadCumsObj()?.FilterKey]:
                                                                            BreadCumsObj()?.FilterVal,
                                                                    })
                                                                }
                                                            >
                                                                {/* {BreadCumsObj()?.menuname} */}
                                                                {location?.search.charAt(1) == "S" ? "" : BreadCumsObj()?.menuname}
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
                                                                {` > ${BreadCumsObj()?.FilterVal1}`}
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
                                                    </div>
                                                )}
                                            </div>
                                            {filterData?.length > 0 && (
                                                <div className="smrstk_filter_portion_outter">
                                                    <span className="smrstk_filter_text">
                                                        <span className="filter_Span">
                                                            {
                                                                // RangeFilterShow || Object.values(filterChecked).filter(
                                                                //   (ele) => ele.checked
                                                                // )?.length === 0
                                                                !showClearAllButton()
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
                                                                        <span className="filter_Span">{`Product Found: ${afterFilterCount}`}</span>
                                                                    }
                                                                    </>}
                                                        </span>
                                                        <span className="filter_Span"
                                                            onClick={() => handelFilterClearAll()}
                                                        >
                                                            {
                                                                // RangeFilterShow || Object.values(filterChecked).filter(
                                                                //   (ele) => ele.checked
                                                                // )?.length > 0
                                                                showClearAllButton()
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
                                                                        <span className="filter_Span">{`Total Products: ${afterFilterCount}`}</span>
                                                                    }
                                                                    </>
                                                            }
                                                        </span>
                                                    </span>
                                                    <div style={{ marginTop: "12px", maxHeight: "80vh", overflowY: "auto" }}>
                                                        {filterData?.map((ele, index) => (
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
                                                                            expanded={!!expandedAccordions[index]}
                                                                            onChange={handleAccordionChange(index)}
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
                                                                                                            color: "#7f7d85 !important",
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
                                                                                                className="smrstk_mui_checkbox_label"
                                                                                                label={opt.Name}
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
                                                                        expanded={!!expandedAccordions[index]}
                                                                        onChange={handleAccordionChange(index)}
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
                                                                                            className="smrstk_mui_checkbox_label"
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
                                                                        expanded={!!expandedAccordions[index]}
                                                                        onChange={handleAccordionChange(index)}
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
                                                                        expanded={!!expandedAccordions[index]}
                                                                        onChange={handleAccordionChange(index)}
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
                                                                        expanded={!!expandedAccordions[index]}
                                                                        onChange={handleAccordionChange(index)}
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
                                                <span className="smrstk_prod_datanotfound">
                                                    Products Not found !!!
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="smrstk_productList">
                                                {/* {isOnlyProdLoading ? (
                                                            <ProductListSkeleton fromPage={"Prodlist"} className="pSkelton" />
                                                        ) : (
                                                            <> */}
                                                <div className="smrstk_main_sorting_div" style={{ display: "none" }}>
                                                    {storeInit?.IsMetalCustComb === 1 && <div className="smrstk_metal_custom">
                                                        <label className="label">Metal:&nbsp;</label>
                                                        <select
                                                            className="select"
                                                            value={selectedMetalId}
                                                            onChange={(e) => {
                                                                setCustomFlag(true)
                                                                setSelectedMetalId(e.target.value)
                                                            }}
                                                        >
                                                            {metalTypeCombo?.map((metalele, i) => (
                                                                <option
                                                                    className="option"
                                                                    key={i}
                                                                    value={metalele?.Metalid}
                                                                >
                                                                    {metalele?.metaltype.toUpperCase()}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    }
                                                    {storeInit?.IsDiamondCustComb === 1 && (
                                                        <div className="smrstk_dia_custom">
                                                            <label className="label">Diamond:&nbsp;</label>
                                                            <select
                                                                className="select"
                                                                value={selectedDiaId}
                                                                onChange={(e) => {
                                                                    setCustomFlag(true)
                                                                    setSelectedDiaId(e.target.value)
                                                                }}
                                                            >
                                                                {diaQcCombo?.map((diaQc, i) => (
                                                                    <option
                                                                        className="option"
                                                                        key={i}
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
                                                        <div className="smrstk_cs_custom">
                                                            <label className="label">Color Stone:&nbsp;</label>
                                                            <select
                                                                className="select"
                                                                value={selectedCsId}
                                                                onChange={(e) => {
                                                                    setCustomFlag(true)
                                                                    setSelectedCsId(e.target.value)
                                                                }}
                                                            >
                                                                {csQcCombo?.map((csCombo, i) => (
                                                                    <option
                                                                        className="option"
                                                                        key={i}
                                                                        value={`${csCombo?.QualityId},${csCombo?.ColorId}`}
                                                                    >
                                                                        {" "}
                                                                        {`${csCombo.Quality.toUpperCase()},${csCombo.color.toLowerCase()}`}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}

                                                    <div className="smrstk_sorting_custom">
                                                        <div className="container">
                                                            <label className="label">Sort By:&nbsp;</label>
                                                            <select
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
                                                <div className="smrstk_outer_portion" id="smrstk_outer_portion">
                                                    <div className="smrstk_inner_portion">
                                                        {getFilteredAndSortedProducts()?.map((productData, i) => {

                                                            return (
                                                                <Product_Card
                                                                    productData={productData}
                                                                    imageMap={imageMap}
                                                                    imageAvailability={imageAvailability}
                                                                    isshowDots={isshowDots}
                                                                    menuParams={menuParams}
                                                                    handleCartandWish={handleCartandWish}
                                                                    cartArr={cartArr}
                                                                    wishArr={wishArr}
                                                                    storeInit={storeInit}
                                                                    handleMoveToDetail={handleMoveToDetail}
                                                                    metalColorType={metalColorType}
                                                                    maxwidth590px={maxwidth590px}
                                                                    loginUserDetail={loginUserDetail}
                                                                    selectedMetalId={selectedMetalId}
                                                                    productIndex={i}
                                                                    location={location}
                                                                    defaultImage={defaultImage}
                                                                    metalColorCombo={JSON.parse(sessionStorage.getItem("MetalColorCombo"))}
                                                                    addToCart={addToCart}
                                                                    cartItems={cartItems}
                                                                    updateCartQuantity={updateCartQuantity}
                                                                    totalCaratConsumed={totalCaratConsumed}
                                                                    stockData={stockData}
                                                                    cartTotalCaratUsed={cartTotalCaratUsed}
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
                                                                    className="smrstk_pagination_portion"
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
                                                {/* </>
                                                        )} */}
                                            </div>
                                        )}
                                    </div>
                                )
                                :
                                (
                                    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', width: '100%', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap' }}>
                                        <div className="serach_notfound">
                                            <p style={{ textTransform: 'capitalize' }}>We couldn't find any matches for</p>
                                            <p style={{ fontWeight: 'bold' }}>{`"${decodeURIComponent(location?.pathname?.split("/")[2])}".`}</p>
                                        </div>

                                        <p className="search_notfound2">Please try another search.</p>
                                    </div>
                                )}
                            {/* </>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Modal */}
            {showCartModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '800px',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        width: '90%'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            borderBottom: '1px solid #ddd',
                            paddingBottom: '10px'
                        }}>
                            <h2>Cart Items ({cartItems.length})</h2>
                            <button
                                onClick={() => setShowCartModal(false)}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                                {cartItems.map((item, index) => (
                                    <div key={index} style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        backgroundColor: '#f9f9f9'
                                    }}>
                                        <div style={{ marginBottom: '10px' }}>
                                            <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{item.shape}</h3>
                                            <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                                                Carat: {item.carat} | Size: {item.size}
                                            </p>
                                            {item.quality && (
                                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                                                    Quality: {item.quality} | Color: {item.color}
                                                </p>
                                            )}
                                            <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold', color: '#007bff' }}>
                                                ${item.price}
                                            </p>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}>
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                    style={{
                                                        padding: '5px 10px',
                                                        backgroundColor: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    style={{
                                                        padding: '5px 10px',
                                                        backgroundColor: '#28a745',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                                                    Total: ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {cartItems.length > 0 && (
                            <div style={{
                                marginTop: '20px',
                                paddingTop: '20px',
                                borderTop: '1px solid #ddd',
                                textAlign: 'right'
                            }}>
                                <h3>Total: ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</h3>
                                <button
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        marginTop: '10px'
                                    }}
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Stock Grid Modal */}
            {showStockGridModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '90%',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        width: '50%'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            borderBottom: '1px solid #ddd',
                            paddingBottom: '10px'
                        }}>
                            <h2>Stock Grid View</h2>
                            <button
                                onClick={() => setShowStockGridModal(false)}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                            {/* Virtual Stock Table */}
                            <div>
                                <h3 style={{
                                    color: '#fff',
                                    marginBottom: '15px',
                                    padding: '10px',
                                    backgroundColor: 'var(--primary-background-smr)',
                                    borderRadius: '4px',
                                }}>
                                    Virtual Stock ({stockData.filter(item => item.stockType === 'virtual').length} items)
                                </h3>
                                <div style={{ maxHeight: '300px' }}>
                                    <table style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        background: 'white',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        tableLayout: 'fixed'
                                    }}>
                                        <thead style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                                            <tr style={{
                                                background: 'var(--primary-background-smr)',
                                                color: 'white'
                                            }}>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Shape</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Size</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Quality</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Color</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Carat</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{
                                            display: 'block',
                                            maxHeight: '285px',
                                            overflowY: 'auto',
                                            width: '100%'
                                        }}>
                                            {stockData.filter(item => item.stockType === 'virtual').map((row, index) => (
                                                <tr key={row.id} style={{
                                                    display: 'table',
                                                    tableLayout: 'fixed',
                                                    width: '100%',
                                                    background: index % 2 === 0 ? '#f8f5ff' : 'white',
                                                    borderBottom: '1px solid #eee'
                                                }}>
                                                    <td style={{ padding: '1rem', fontSize: '12px' }}>{row.id}</td>
                                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{row.shape}</td>
                                                    <td style={{ padding: '1rem' }}>{row.size}</td>
                                                    <td style={{ padding: '1rem' }}>{row.quality || '-'}</td>
                                                    <td style={{ padding: '1rem' }}>{row.color || '-'}</td>
                                                    <td style={{ padding: '1rem' }}>{Number(row.carat).toFixed(1)}</td>
                                                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#007bff' }}>${row.price}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            fontSize: '12px',
                                                            padding: '4px 8px',
                                                            backgroundColor: '#ff6b6b',
                                                            color: 'white',
                                                            borderRadius: '4px'
                                                        }}>
                                                            Virtual
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Real Stock Table */}
                            <div>
                                <h3 style={{
                                    color: '#fff',
                                    marginBottom: '15px',
                                    padding: '10px',
                                    backgroundColor: 'var(--primary-background-smr)',
                                    borderRadius: '4px',
                                    border: '1px solid #8a2be2'
                                }}>
                                    Real Stock ({stockData.filter(item => !item.stockType || item.stockType !== 'virtual').length} items)
                                </h3>
                                <div style={{ maxHeight: '300px', marginBottom: "3rem" }}>
                                    <table style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        background: 'white',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        tableLayout: 'fixed'
                                    }}>
                                        <thead style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                                            <tr style={{
                                                background: 'var(--primary-background-smr)',
                                                color: 'white'
                                            }}>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Shape</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Size</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Quality</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Color</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Carat</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                                                <th style={{ padding: '1rem', textAlign: 'left' }}>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{
                                            display: 'block',
                                            maxHeight: '285px',
                                            overflowY: 'auto',
                                            width: '100%'
                                        }}>
                                            {stockData.filter(item => !item.stockType || item.stockType !== 'virtual').map((row, index) => (
                                                <tr key={row.id} style={{
                                                    display: 'table',
                                                    tableLayout: 'fixed',
                                                    width: '100%',
                                                    background: index % 2 === 0 ? '#f8f5ff' : 'white',
                                                    borderBottom: '1px solid #eee'
                                                }}>
                                                    <td style={{ padding: '1rem', fontSize: '12px' }}>{row.id}</td>
                                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{row.shape}</td>
                                                    <td style={{ padding: '1rem' }}>{row.size}</td>
                                                    <td style={{ padding: '1rem' }}>{row.quality || '-'}</td>
                                                    <td style={{ padding: '1rem' }}>{row.color || '-'}</td>
                                                    <td style={{ padding: '1rem' }}>{Number(row.carat).toFixed(1)}</td>
                                                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#007bff' }}>${row.price}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            fontSize: '12px',
                                                            padding: '4px 8px',
                                                            backgroundColor: '#8a2be2',
                                                            color: 'white',
                                                            borderRadius: '4px'
                                                        }}>
                                                            Real
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StockListings;


const Product_Card = ({
    productData,
    isshowDots,
    menuParams,
    handleCartandWish,
    cartArr,
    wishArr,
    handleImgRollover,
    handleLeaveImgRolloverImg,
    storeInit,
    handleMoveToDetail,
    metalColorType,
    maxwidth590px,
    loginUserDetail,
    selectedMetalId,
    productIndex,
    yellowImage,
    whiteImage,
    roseImage,
    yellowRollImage,
    whiteRollImage,
    roseRollImage,
    imageUrl,
    videoUrl,
    RollImageUrl,
    location,
    metalColorCombo,
    defaultImage,
    addToCart,
    cartItems,
    updateCartQuantity,
    totalCaratConsumed,
    stockData,
    cartTotalCaratUsed
}) => {
    const [imageColor, setImageColor] = useRecoilState(MetalColor_Image);
    const getSessImgColor = JSON.parse(sessionStorage.getItem('imgColorCode'));
    const [selectedMetalColor, setSelectedMetalColor] = useState(null);
    const [metalColorTitle, setMetalColorTitle] = useState();
    const getSessCartWishImgColor = JSON?.parse(sessionStorage.getItem('cartWishImgColor')) ?? undefined;

    const activeColorCode = getSessImgColor || getSessCartWishImgColor;

    useEffect(() => {
        if (metalColorCombo?.length > 0) {
            const mtColor = metalColorCombo?.find(ele => ele.id === productData?.MetalColorid)?.colorcode;
            setMetalColorTitle(mtColor);
        }
    }, [productData])

    useEffect(() => {
        if ((activeColorCode !== "" && activeColorCode !== undefined && activeColorCode !== null)) {
            setImageColor("");
            sessionStorage.removeItem("imgColorCode");
            sessionStorage.removeItem("cartWishImgColor");
            setSelectedMetalColor(null);
        }
    }, [location?.search])

    useEffect(() => {
        if (selectedMetalColor !== null) {
            setImageColor(selectedMetalColor);
            sessionStorage.setItem("imgColorCode", JSON.stringify(selectedMetalColor));
        } else {
            sessionStorage.removeItem("imgColorCode");
            setImageColor("");
        }
    }, [selectedMetalColor])
    const handleClick = (id) => {
        setSelectedMetalColor(selectedMetalColor === id ? null : id);
    };

    const titleLine = `${productData?.MetalTypePurity?.split(" ")[1]} ${metalColorTitle} ${productData?.MetalTypePurity?.split(" ")[0]} ${productData?.ShapeName} Diamond ${productData?.category} with ${productData?.style} style`;

    // const getGoldType = metalType.filter((item) => item?.Metalid === selectedMetalId)?.[0]?.metaltype.toUpperCase()?.split(' ')[1]?.split('K')[0];


    const [isLoading, setIsLoading] = useState(true);
    const [isHover, setIsHover] = useState(false);
    const hasNoData = productData?.IsInReadyStock !== 1 && productData?.IsBestSeller !== 1 && productData?.IsTrending !== 1 && productData?.IsNewArrival !== 1;

    useEffect(() => {
        const delay = (productIndex + 1) * 100;

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, delay);

        return () => clearTimeout(timer);
    }, [productIndex]);

    return (
        <>
            <div className="smrstk_productCard">
                <div className="smrstkWeb_app_product_label">
                    {productData?.IsInReadyStock == 1 && <span className="smrstkWeb_app_instock">In Stock</span>}
                    {productData?.IsBestSeller == 1 && <span className="smrstkWeb_app_bestSeller">Best Seller</span>}
                    {productData?.IsTrending == 1 && <span className="smrstkWeb_app_intrending">Trending</span>}
                    {productData?.IsNewArrival == 1 && <span className="smrstkWeb_app_newarrival">New</span>}
                    {productData?.stockType === 'virtual' && <span style={{ backgroundColor: '#ff6b6b', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>Virtual</span>}
                    {productData?.stockType !== 'virtual' && <span style={{ backgroundColor: '#8a2be2', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>Real</span>}
                </div>

                {/* Cart Controls */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                }}>
                    <button
                        onClick={() => addToCart(productData)}
                        disabled={cartTotalCaratUsed >= stockData.reduce((sum, item) => sum + Number(item.carat || 0), 0)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: cartTotalCaratUsed >= stockData.reduce((sum, item) => sum + Number(item.carat || 0), 0) ? '#6c757d' : '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: cartTotalCaratUsed >= stockData.reduce((sum, item) => sum + Number(item.carat || 0), 0) ? 'not-allowed' : 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        {cartTotalCaratUsed >= stockData.reduce((sum, item) => sum + Number(item.carat || 0), 0) ? 'Limit Reached' : 'Add to Cart'}
                    </button>
                    {cartItems.find(item => item.id === productData.id) && (
                        <div style={{
                            backgroundColor: 'white',
                            padding: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            <button
                                onClick={() => updateCartQuantity(productData.id, (cartItems.find(item => item.id === productData.id)?.quantity || 0) - 1)}
                                style={{ padding: '2px 6px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', width: "100%" }}
                            >
                                -
                            </button>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', width: "100%" }}>
                                {cartItems.find(item => item.id === productData.id)?.quantity || 0}
                            </span>
                            <button
                                onClick={() => updateCartQuantity(productData.id, (cartItems.find(item => item.id === productData.id)?.quantity || 0) + 1)}
                                disabled={parseFloat(productData.carat) <= 0}
                                style={{
                                    padding: '2px 6px',
                                    backgroundColor: parseFloat(productData.carat) > 0 ? '#28a745' : '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '2px',
                                    cursor: parseFloat(productData.carat) > 0 ? 'pointer' : 'not-allowed', width: "100%"
                                }}
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>

                <div
                    onMouseMove={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="smrstk_ImgandVideoContainer"
                // onClick={() => handleMoveToDetail(productData)}
                >
                    {/* {isLoading === true ?
                        <Card
                            sx={{
                                height: '100%', // or '100%' if parent has a defined height
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                sx={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#e7e7e7',
                                    }}
                                />
                            </CardMedia>
                        </Card>
                        :
                        <> */}
                    <img
                        className="smrstk_productListCard_Image"
                        src={defaultImage}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.stopPropagation();
                            e.target.src = imageNotFound
                        }}
                        draggable={true}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* </>
                    } */}
                </div>
                <div className="smrstk_prod_card_info" style={{ height: !isshowDots ? "106px" : "90px" }}>
                    <div className="smrstk_prodCard_1"
                    >
                        <div className="smrstk_prod_Title">
                            <span
                                className={
                                    (productData?.TitleLine?.length > 30)
                                        ?
                                        "smrstk1_prod_title_with_width"
                                        :
                                        "smrstk1_prod_title_with_no_width"
                                }
                            >
                                <strong style={{ color: "black" }}>{productData?.shape !== "" && productData?.shape}</strong>
                            </span>
                        </div>
                        <div className="smrstk_prod_Allwt">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    lineHeight: "12px",
                                    gap: "2px",
                                    alignItems: "center",
                                    letterSpacing: maxwidth590px
                                        ? "0px"
                                        : "1px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <span className="smrstk_prod_wt">
                                    <span className="smrstk_main_keys">
                                        Available Carat:
                                    </span>
                                    <span className="smrstk_main_val" style={{
                                        color: parseFloat(productData?.carat) > 0 ? '#28a745' : '#dc3545',
                                        fontWeight: 'bold'
                                    }}>
                                        {parseFloat(productData?.carat)?.toFixed(1)}
                                    </span>
                                </span>
                                {productData?.size && (
                                    <>
                                        <span style={{ fontSize: '13px' }}>|</span>
                                        <span className="smrstk_prod_wt">
                                            <span className="smrstk_main_keys">Size:</span>
                                            <span className="smrstk_main_val">
                                                {productData?.size}
                                            </span>
                                        </span>
                                    </>
                                )}
                                {productData?.quality && (
                                    <>
                                        <span style={{ fontSize: '13px' }}>|</span>
                                        <span className="smrstk_prod_wt">
                                            <span className="smrstk_main_keys">Quality:</span>
                                            <span className="smrstk_main_val">
                                                {productData?.quality}
                                            </span>
                                        </span>
                                    </>
                                )}
                                {productData?.color && (
                                    <>
                                        <span style={{ fontSize: '13px' }}>|</span>
                                        <span className="smrstk_prod_wt">
                                            <span className="smrstk_main_keys">Color:</span>
                                            <span className="smrstk_main_val">
                                                {productData?.color}
                                            </span>
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="smrstk_prod_mtcolr_price">
                            {storeInit?.IsPriceShow == 1 && <>
                                <span className="smrstk_price">
                                    <span className="smrstk_currencyFont">
                                        $
                                    </span>
                                    <span className="smrstk_pricePort">
                                        {productData?.price?.toFixed(2)}
                                    </span>
                                </span></>}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}