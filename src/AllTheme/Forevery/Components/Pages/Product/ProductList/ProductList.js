import React, { useEffect, useState, useRef, forwardRef, lazy, useMemo } from "react";
import "./productlist.scss";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { styled } from '@mui/material/styles';
import noImageFound from '../../../Assets/image-not-found.jpg'
import { Helmet } from "react-helmet";
import Cookies from 'js-cookie'
import { Swiper, SwiperSlide } from 'swiper/react';
import Pagination from "@mui/material/Pagination";
import { Navigation, Autoplay } from 'swiper/modules';
import { BsHandbag } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Rating from '@mui/material/Rating';
import { IoClose } from "react-icons/io5";
import Stack from '@mui/material/Stack';
import { Box, Checkbox, Divider, Drawer, FormControl, FormControlLabel, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Slider, colors, useMediaQuery } from "@mui/material";
import { formatter, storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { FilterListAPI } from "../../../../../../utils/API/FilterAPI/FilterListAPI";
import { RemoveCartAndWishAPI } from "../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI";
import { CartAndWishListAPI } from "../../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { for_CartCount, for_MetalColor_Image, for_WishCount } from "../../../Recoil/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CheckBox } from "@mui/icons-material";
import Pako from "pako";
import { DiamondQualityColorComboAPI } from "../../../../../../utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";
import ShippingDrp from "../../ReusableComponent/ShippingDrp/ShippingDrp";
import ScrollTop from "../../ReusableComponent/ScrollTop/ScrollTop";


const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRefs = useRef({})
  let maxwidth464px = useMediaQuery('(max-width:464px)')
  let maxwidth375px = useMediaQuery('(max-width:375px)')
  let maxwidth1000px = useMediaQuery('(max-width:1000px)')
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const storeINit = JSON.parse(sessionStorage.getItem("storeInit"));
  const [storeInit, setStoreInit] = useState({});
  const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
  const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
  const mtColorLocal = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
  let cookie = Cookies.get("visiterId");
  const videoRef = useRef(null);

  const categoryArr = [
    {
      id: 1,
      title: 'All Jewelry',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/all-jewelry.svg`
    },
    {
      id: 2,
      title: 'Diamond Rings',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/Diamond_Rings.svg`
    },
    {
      id: 3,
      title: 'Diamond Earings',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/Diamond_Studs.svg`
    },
    {
      id: 4,
      title: 'Diamond Braceletes',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/Diamond-bracelets.svg`
    },
    {
      id: 5,
      title: 'Diamond Necklaces',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/diamond-necklaces.svg`
    },
    {
      id: 6,
      title: 'Diamond Pendants',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/pendant.png`
    },
    {
      id: 7,
      title: 'Signet Rings',
      image: `${storImagePath()}/images/ProductListing/CategoryImages/signetring.svg`
    },
  ]

  const shippData = [
    {
      title: "Any Date",
      value: 'ANY DATE',
    },
    {
      title: "Thursday,Aug 8",
      value: 'THURSDAY,AUG 8',
    },
    {
      title: "Friday,Aug 9",
      value: 'FRIDAY,AUG 9',
    },
    {
      title: "Saturday,Aug 10",
      value: 'SATURDAY,AUG 10',
    },
    {
      title: "Sunday,Aug 11",
      value: 'SUNDAY,AUG 11',
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState(categoryArr[0]?.id)
  const [trend, setTrend] = useState('Recommended');
  const [shippingDrp, setShippingDrp] = useState('ANY DATE');
  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const [open, setOpen] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [ratingvalue, setratingvalue] = useState(5);
  const [selectMetalColor, setSelectMetalColor] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(true);
  const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId ?? storeInit?.MetalId);
  const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid);
  const [locationKey, setLocationKey] = useState();
  const getEncodeData = atob(location?.search?.slice(3));
  const [collectionName, setCollectionName] = useState(getEncodeData.split('/')?.[0]);

  const [priceRangeValue, setPriceRangeValue] = useState([5000, 250000]);
  const [caratRangeValue, setCaratRangeValue] = useState([0.96, 41.81]);
  const [productListData, setProductListData] = useState([]);
  const [prodListType, setprodListType] = useState();
  const [isProdLoading, setIsProdLoading] = useState(false);
  const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
  const [loginCurrency, setLoginCurrency] = useState();
  const [metalType, setMetaltype] = useState([]);
  const [diamondType, setDiamondType] = useState([]);
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [filterData, setFilterData] = useState([]);
  const [sortBySelect, setSortBySelect] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [colorImgSrc, setColorImgSrc] = useState([]);
  const [imageMap, setImageMap] = useState({});

  const setCartCountVal = useSetRecoilState(for_CartCount);
  const setWishCountVal = useSetRecoilState(for_WishCount);
  const [cartArr, setCartArr] = useState({})

  const [open1, setOpen1] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen1(newOpen);
  };

  const handleCardHover = () => {
    setHoverIndex(!hoverIndex);
  }

  const handleOpen = (index) => {
    setOpen(open === index ? null : index)
  }

  const handleCategory = (id) => {
    setSelectedCategory(selectedCategory === id ? null : id);
  }

  const handleMetalColor = (index) => {
    setSelectMetalColor(selectMetalColor === index ? null : index)
  }

  const handleChange = (event) => {
    setTrend(event.target.value);
  };
  const handleChange1 = (event) => {
    setShippingDrp(event.target.value);
  };

  const handleChangeTrend = (event) => {
    setTrend(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside of any dropdown
      if (Object.values(dropdownRefs.current).every(ref => ref && !ref.contains(event.target))) {
        setOpen(null); // Close all dropdowns
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const callAllApi = async () => {
    if (!mTypeLocal || mTypeLocal?.length === 0) {
      const res = await MetalTypeComboAPI(cookie);
      if (res) {
        let data = res?.Data?.rd;
        sessionStorage.setItem("metalTypeCombo", JSON.stringify(data));
        setMetaltype(data);
      }
      else {
        console.log("error")
      }
    } else {
      setMetaltype(mTypeLocal);
    }

    if (!diaQcLocal || diaQcLocal?.length === 0) {
      const res = await DiamondQualityColorComboAPI();
      if (res) {
        let data = res?.Data?.rd;
        sessionStorage.setItem("diamondQualityColorCombo", JSON.stringify(data));
        setDiamondType(data);
      }
      else {
        console.log("error")
      }
    } else {
      setDiamondType(diaQcLocal)
    }
  }

  useEffect(() => {
    callAllApi();
  }, [storeInit])

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(data);

    const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    setLoginCurrency(loginData)

    let mtid = loginUserDetail?.MetalId ?? data?.MetalId;
    setSelectedMetalId(mtid);

    let diaid = loginUserDetail?.cmboDiaQCid ?? data?.cmboDiaQCid;
    setSelectedDiaId(diaid);

    let csid = loginUserDetail?.cmboCSQCid ?? data?.cmboCSQCid;
    setSelectedCsId(csid);

    let metalTypeDrpdown = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
    setMetaltype(metalTypeDrpdown);

    let diamondTypeDrpdown = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));
    setDiamondType(diamondTypeDrpdown);

  }, []);

  const links = [
    {
      link: `${storImagePath()}/images/ProductListing/Banner/1.jpg`,
    },
    {
      link: `${storImagePath()}/images/ProductListing/Banner/2.png`,
    },
    {
      link: `${storImagePath()}/images/ProductListing/Banner/3.png`,
    },
  ]


  // const getGoldName = mtColorLocal?.find((ele) => ele)
  // const getWhiteName = 
  // const getRoseName = 

  const metalColorType = [
    {
      id: 1,
      metal: 'gold'
    },
    {
      id: 2,
      metal: 'white'
    },
    {
      id: 3,
      metal: 'rose'
    },
  ]

  let getDesignImageFol = storeInit?.CDNDesignImageFol;
  // let getDesignImageFol = storeInit?.DesignImageFol;
  const getDesignVideoFol = storeInit?.CDNVPath;
  // const getDesignVideoFol = (storeInit?.DesignImageFol)?.slice(0, -13) + "video/";

  const getDynamicImages = (designno, extension) => {
    return `${getDesignImageFol}${designno}~${1}.${extension}`;
    // return `${getDesignImageFol}${designno}_${1}.${extension}`;
  };

  const getDynamicYellowImage = (item, designno, extension) => {
    // return `${getDesignImageFol}${designno}_${1}_Yellow.${extension}`;
    return new Promise((resolve) => {
      const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
      });

      const baseImagePath = `${getDesignImageFol}${designno}~${1}`;
      // const baseImagePath = `${getDesignImageFol}${designno}_${1}`;
      const colorImage = item?.ImageCount > 0
        ? `${baseImagePath}~Yellow.${extension}`
        : noImageFound;
      const defaultImage = item?.ImageCount > 0
        ? `${baseImagePath}.${extension}`
        : noImageFound;

      loadImage(colorImage)
        .then(resolve)
        .catch(() => loadImage(defaultImage)
          .then(resolve)
          .catch(() => resolve(noImageFound)));
    });
  };

  const getDynamicWhiteImage = (item, designno, extension) => {
    // return `${getDesignImageFol}${designno}_${1}_White.${extension}`;
    return new Promise((resolve) => {
      const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
      });

      const baseImagePath = `${getDesignImageFol}${designno}~${1}`;
      const colorImage = item?.ImageCount > 0
        ? `${baseImagePath}~White.${extension}`
        : noImageFound;
      const defaultImage = item?.ImageCount > 0
        ? `${baseImagePath}.${extension}`
        : noImageFound;

      loadImage(colorImage)
        .then(resolve)
        .catch(() => loadImage(defaultImage)
          .then(resolve)
          .catch(() => resolve(noImageFound)));
    });
  }

  const getDynamicRoseImage = (item, designno, extension) => {
    // return `${getDesignImageFol}${designno}_${1}_Rose.${extension}`;
    return new Promise((resolve) => {
      const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
      });

      const baseImagePath = `${getDesignImageFol}${designno}~${1}`;
      const colorImage = item?.ImageCount > 0
        ? `${baseImagePath}~Rose.${extension}`
        : noImageFound;
      const defaultImage = item?.ImageCount > 0
        ? `${baseImagePath}.${extension}`
        : noImageFound;

      loadImage(colorImage)
        .then(resolve)
        .catch(() => loadImage(defaultImage)
          .then(resolve)
          .catch(() => resolve(noImageFound)));
    });
  }

  const getDynamicRollYellowImage = (item, designno, extension) => {
    // return `${getDesignImageFol}${designno}_${2}_Yellow.${extension}`;
    return new Promise((resolve) => {
      const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
      });

      const defaultImagePath = `${getDesignImageFol}${designno}~${1}`;
      const baseImagePath = `${getDesignImageFol}${designno}~${2}`;
      const colorImage = item?.ImageCount > 0
        ? `${baseImagePath}~Yellow.${extension}`
        : noImageFound;
      const defaultImage = item?.ImageCount > 0 ? `${baseImagePath}.${extension}` : defaultImagePath;

      loadImage(colorImage)
        .then(resolve)
        .catch(() => loadImage(defaultImage)
          .then(resolve)
          .catch(() => resolve(noImageFound)));
    });
  }

  const getDynamicRollWhiteImage = (item, designno, extension) => {
    // return `${getDesignImageFol}${designno}_${2}_White.${extension}`;
    return new Promise((resolve) => {
      const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
      });

      const defaultImagePath = `${getDesignImageFol}${designno}~${1}`;
      const baseImagePath = `${getDesignImageFol}${designno}~${2}`;
      const colorImage = item?.ImageCount > 0
        ? `${baseImagePath}~White.${extension}`
        : noImageFound;
      const defaultImage = item?.ImageCount > 0 ? `${baseImagePath}.${extension}` : defaultImagePath;

      loadImage(colorImage)
        .then(resolve)
        .catch(() => loadImage(defaultImage)
          .then(resolve)
          .catch(() => resolve(noImageFound)));
    });
  }

  const getDynamicRollRoseImage = (item, designno, extension) => {
    // return `${getDesignImageFol}${designno}_${2}_Rose.${extension}`;
    return new Promise((resolve) => {
      const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
      });

      const defaultImagePath = `${getDesignImageFol}${designno}~${1}`;
      const baseImagePath = `${getDesignImageFol}${designno}~${2}`;
      const colorImage = item?.ImageCount > 0
        ? `${baseImagePath}~Rose.${extension}`
        : noImageFound;
      const defaultImage = item?.ImageCount > 0 ? `${baseImagePath}.${extension}` : defaultImagePath;

      loadImage(colorImage)
        .then(resolve)
        .catch(() => loadImage(defaultImage)
          .then(resolve)
          .catch(() => resolve(noImageFound)));
    });
  }


  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = {};
      await Promise.all(productListData.map(async (item) => {
        const yellowImage = await getDynamicYellowImage(item, item.designno, item.ImageExtension);
        const whiteImage = await getDynamicWhiteImage(item, item.designno, item.ImageExtension);
        const roseImage = await getDynamicRoseImage(item, item.designno, item.ImageExtension);
        const yellowRollImage = await getDynamicRollYellowImage(item, item?.designno, item?.ImageExtension);
        const whiteRollImage = await getDynamicRollWhiteImage(item, item?.designno, item?.ImageExtension);
        const roseRollImage = await getDynamicRollRoseImage(item, item?.designno, item?.ImageExtension);

        // Store images in an object keyed by design number
        loadedImages[item.designno] = {
          yellowImage,
          whiteImage,
          roseImage,
          yellowRollImage,
          whiteRollImage,
          roseRollImage
        };
      }));
      setImageMap(loadedImages);
    };

    if (productListData.length > 0) {
      loadImages();
    }
  }, [productListData]);

  const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = () => reject(src);
  });

  const getDynamicRollImages = async (designno, count, extension) => {
    if (count > 1) {
      const imageSrc = `${getDesignImageFol}${designno}~2.${extension}`;
      try {
        await loadImage(imageSrc);
        return imageSrc;
      } catch (error) {
        return noImageFound;
      }
    }
    return noImageFound;
  };

  const [rollImages, setRollImages] = useState({});

  const loadRollImage = async (designno, count, extension) => {
    const imageSrc = await getDynamicRollImages(designno, count, extension);
    setRollImages(prevState => ({
      ...prevState,
      [designno]: imageSrc
    }));
  };

  useEffect(() => {
    if (productListData) {
      productListData.forEach(item => {
        loadRollImage(item.designno, item.ImageCount, item.ImageExtension);
      });
    }
  }, [productListData]);

  const getDynamicVideo = (designno, count, extension) => {
    if (extension && count > 0) {
      const url = `${getDesignVideoFol}${designno}~${1}.${extension}`;
      // const url = `${getDesignVideoFol}${designno}_${1}.${extension}`;
      return url;
    }
    return;
  };

  const handleCartandWish = async (e, ele, type) => {

    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const prodObj = {
      "autocode": ele?.autocode,
      "Metalid": (selectedMetalId ?? ele?.MetalPurityid),
      "MetalColorId": ele?.MetalColorid,
      "DiaQCid": (selectedDiaId ?? loginInfo?.cmboDiaQCid),
      "CsQCid": (selectedCsId ?? loginInfo?.cmboCSQCid),
      "Size": ele?.DefaultSize,
      "Unitcost": ele?.UnitCost,
      "markup": ele?.DesignMarkUp,
      "UnitCostWithmarkup": ele?.UnitCostWithMarkUp,
      "Remark": "",
    }

    if (type === "Cart") {
      setCartArr(prev => ({
        ...prev,
        [ele?.autocode]: e.target.checked
      }));
    }

    if (e.target.checked) {
      await CartAndWishListAPI(type, prodObj, cookie).then((res) => {
        if (res) {
          let cartC = res?.Data?.rd[0]?.Cartlistcount
          let wishC = res?.Data?.rd[0]?.Wishlistcount
          setWishCountVal(wishC)
          setCartCountVal(cartC);
        }
      }).catch((err) => console.log("addtocartwishErr", err))

    } else {

      await RemoveCartAndWishAPI(type, ele?.autocode, cookie).then((res1) => {
        if (res1) {
          let cartC = res1?.Data?.rd[0]?.Cartlistcount
          let wishC = res1?.Data?.rd[0]?.Wishlistcount
          setWishCountVal(wishC)
          setCartCountVal(cartC)
        }
      }).catch((err) => console.log("removecartwishErr", err))

    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
        let UrlVal = location?.search?.slice(1).split("/");

        let MenuVal = "";
        let SearchVar = '';
        let AlbumVar = '';
        let BestSellerVar = "";
        let productlisttype;

        UrlVal.forEach((ele) => {
          let firstChar = ele.charAt(0);
          switch (firstChar) {
            case "M":
              MenuVal = ele;
              break;
            case 'S':
              SearchVar = ele;
              break;
            case 'A':
              AlbumVar = ele;
              break;
            case "N":
              BestSellerVar = ele;
              break;
            default:
              return "";
          }
        });


        if (MenuVal.length > 0) {
          let menuDecode = atob(MenuVal?.split("=")[1]);
          let key = menuDecode?.split("/")[1].split(",");
          let val = menuDecode?.split("/")[0].split(",");
          setIsBreadcumShow(true)
          productlisttype = [key, val];
        }

        if (SearchVar) {
          productlisttype = SearchVar
        }
        if (AlbumVar) {
          productlisttype = AlbumVar.split("=")[1];
        }
        if (BestSellerVar) {
          productlisttype = BestSellerVar.split("=")[1];
        }
        setprodListType(productlisttype);
        setIsProdLoading(true);

        const res = await ProductListApi({}, 1, obj, productlisttype, cookie, "");
        const res1 = await FilterListAPI(productlisttype, cookie);

        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }

        if (res1) {
          setFilterData(res1);
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
  }, [location?.key,]);

  useEffect(() => {
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    if (location?.key === locationKey) {
      setIsOnlyProdLoading(true);
      ProductListApi({}, 1, obj, prodListType, cookie, "")
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          return res;
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setIsOnlyProdLoading(false);
        });
    }
  }, [selectedMetalId, selectedDiaId]);

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

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])


  useEffect(() => {
    let output = selectedValues.filter((ele) => ele.value)
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    if (location?.key === locationKey) {
      setIsOnlyProdLoading(true);
      ProductListApi(output, 1, obj, prodListType, cookie, "")
        .then((res) => {
          if (res) {
            setProductListData(res?.pdList);
            setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
          }
          return res;
        })
        .catch((err) => console.log("err", err))
        .finally(() => {
          setIsOnlyProdLoading(false);
        });
    }
  }, [selectedValues]);

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value)

    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    setIsOnlyProdLoading(true)

    let sortby = e.target?.value

    await ProductListApi({}, 1, obj, prodListType, cookie, sortby, "")
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

  // const menuName = BreadCumsObj()?.menuname || 'Title';
  // const menuName = (BreadCumsObj()?.menuname === 'Ikigai' || BreadCumsObj()?.menuname === 'Heritage' || BreadCumsObj()?.menuname === 'Icon') ? 'High End Jewelry' : JSON.parse(BreadCumsObj()?.menuname)?.b.toUpperCase();
  const dropdownsData = [
    // { index: 1, title: `${menuName}`, data: ["Ikigai", "Heritage", "Icon"], type: 'high' },
    { index: 2, title: "All metal", data: metalType, type: 'metal' },
    { index: 3, title: "Diamond quality", data: diamondType, type: 'diamond' },
    // { index: 4, title: "price", data: rangevalue, type: 'range' },
    // { index: 5, title: "carat", data: rangevalue, type: 'range' }
  ];

  const rangeData = [
    { index: 4, title: "price", data: priceRangeValue, type: 'price' },
    { index: 5, title: "carat", data: caratRangeValue, type: 'carat' },
  ]

  const handlePriceSliderChange = (event, newValue) => {
    const roundedValue = newValue.map(val => parseInt(val));
    setPriceRangeValue(roundedValue)
    handleButton(4, roundedValue); // index 4 is the index for price range
  };

  const handleCaratSliderChange = (event, newValue) => {
    const roundedValue = newValue.map(val => parseFloat(val.toFixed(3)));
    setCaratRangeValue(roundedValue)
    handleButton(5, roundedValue); // index 5 is the index for carat range
  };

  const handleButton = (dropdownIndex, value) => {
    setSelectedValues(prev => {
      const existingIndex = prev.findIndex(item => item.dropdownIndex === dropdownIndex);
      const newValue = { dropdownIndex, value };

      if (existingIndex >= 0) {
        if (JSON.stringify(prev[existingIndex].value) === JSON.stringify(value)) {
          return prev.filter((_, i) => i !== existingIndex); // Remove if the same value is selected again
        }
        // Update existing value
        const updatedValues = [...prev];
        updatedValues[existingIndex] = newValue;
        return updatedValues;
      } else {
        // Add new value
        return [...prev, newValue];
      }
    });
  };


  const getMatchCollName = () => {
    const getCollectionNameFromURL = location?.pathname.split('/')?.[2];
    const getCollName = dropdownsData?.[0]?.data;
    return getCollName.find((item) => item === getCollectionNameFromURL) || "";
  };

  // const setDefaultValues = (matchCollName) => {
  const setDefaultValues = () => {
    // setCollectionName(matchCollName);

    const ids = typeof selectedDiaId === 'string' ? selectedDiaId.split(',').map(Number) : [];
    const [qualityId, colorId] = ids;

    const findMetal = metalType?.find((item) => item?.Metalid === selectedMetalId)?.metaltype;
    const findDiamond = diamondType?.find((ele) =>
      ele.QualityId === qualityId && ele.ColorId === colorId
    );

    // if (findMetal && findDiamond && matchCollName && selectedValues?.length === 0) {
    if (findMetal && findDiamond && selectedValues?.length === 0) {
      const defaultValues = [
        // { dropdownIndex: 1, value: matchCollName || "" },
        { dropdownIndex: 2, value: findMetal || "" },
        { dropdownIndex: 3, value: findDiamond ? `${findDiamond.Quality}#${findDiamond.color}` : "" }
      ];

      setSelectedValues(defaultValues);
    }
  };

  useEffect(() => {
    // const matchCollName = getMatchCollName();
    // setDefaultValues(matchCollName);
    setDefaultValues();
  }, [metalType, diamondType, selectedDiaId, location?.pathname]);

  const handleRemoveValues = (index) => {
    setSelectedValues(prev => {
      const existingIndex = prev.findIndex(item => item?.dropdownIndex === index);
      const updatedValues = prev.filter((_, i) => i !== existingIndex);

      if (updatedValues.length === 0) {
        // const matchCollName = getMatchCollName();
        setSelectedMetalId(loginUserDetail?.MetalId ?? storeInit?.MetalId);
        setSelectedDiaId(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
        // setDefaultValues(matchCollName);
        setDefaultValues();
        // navigate(`/p/${BreadCumsObj()?.menuname}?M=${location?.search?.slice(3)}`)
      }

      return updatedValues;
    });

    setCaratRangeValue([0.96, 41.81]);
    setPriceRangeValue([5000, 250000]);
  };

  const handleClearSelectedvalues = () => {
    setSelectedValues([]);

    // const matchCollName = getMatchCollName();
    setSelectedMetalId(loginUserDetail?.MetalId ?? storeInit?.MetalId);
    setSelectedDiaId(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);

    setCaratRangeValue([0.96, 41.81]);
    setPriceRangeValue([5000, 250000]);

    // setDefaultValues(matchCollName);
    setDefaultValues();
  };


  const handelPageChange = (event, value) => {
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
    setIsProdLoading(true);
    setCurrPage(value)
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }, 100)
    ProductListApi({}, value, obj, prodListType, cookie, sortBySelect, "")
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }
        return res;
      })
      .catch((err) => console.log("err", err)).finally(() => {
        setTimeout(() => {
          setIsProdLoading(false)
        }, 100);
      })
  }

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#000',
    },
    '& .MuiRating-iconHover': {
      color: '#000',
    },
  });

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

  const handleMoveToDetail = (productData, metalColor) => {
    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId,
      d: selectedDiaId,
      c: selectedCsId,
      cmc: metalColor,
      // mc: metalColor ?? productData?.MetalColorId,
      p: BreadCumsObj(),
      f: {},
    };
    // compressAndEncode(JSON.stringify(obj))

    // decodeAndDecompress()

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    navigate(
      `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
      }${productData?.designno}/?p=${encodeObj}`
    );
  };

  return (
    <>
      {/* <Helmet>
        <title>{DynamicListPageTitleLineFunc()}</title>
      </Helmet> */}
      <div className="for_productList_MainDiv">
        <div className="for_productList_div">
          <div className="for_productList_banner_swiper">
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop
              navigation={false}
              className="myProductList_swiper"
            >
              {links.map((i, index) => (
                <SwiperSlide key={index} style={{ maxWidth: '100%' }} className="for_productList_banner_slider">
                  <img src={i?.link} alt={`Slide ${index}`} className="for_productList_Banner_img" />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="for_banner_title">
              <span className="for_banner_head_title">Fine Jewelry</span>
              <span className="for_banner_head_desc">Adorn yourself in elegance with fine jewelry</span>
            </div>
          </div>
          <div className="for_productList_breadcrumbs">
            {productListData?.length > 0 ? (
              <div
                className="for_breadcrumbs"
                style={{ marginLeft: "3px" }}
              >
                <span
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {"Home /"}{" "}
                </span>

                {location?.search?.charAt(1) == "S" ? (
                  <>
                    {decodeURIComponent(location?.pathname?.split("/")[2])}
                  </>
                ) : (
                  <>
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
                            {` / ${BreadCumsObj()?.FilterVal1}`}
                          </span>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            ) : null}

          </div>
          <div className="for_productList_filter_mainDiv">
            <div className="for_productList_category_filter_mainDiv">
              <div className="for_productList_category_filter_desc">
                <span>Fine jewelry is a luxurious expression of art and craftsmanship that has captivated humans for centuries. Made with exquisite materials such as gold, platinum, diamonds, and precious gemstones, fine jewelry is a timeless investment that is passed down from generation to generation.</span>
              </div>
              <div className="for_productList_category_filter_options">
                {categoryArr?.map((item, index) => (
                  <div className={`for_category_filter_options_card ${selectedCategory === item?.id && maxwidth1000px ? 'selected' : ''}`} key={index} onClick={() => handleCategory(item?.id)}>
                    <div className={selectedCategory === item?.id ? 'for_category_filter_image_div_selected' : 'for_category_filter_image_div'}>
                      <img src={item?.image} className={selectedCategory === item?.id ? "for_category_filter_image_selected" : "for_category_filter_image"} alt="category image" />
                    </div>
                    <div className="for_category_filter_title_div">
                      <span className={selectedCategory === item?.id ? "for_category_filter_title_span_selected" : "for_category_filter_title_span"}>{item?.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {maxwidth1000px ? (
              <>
                <div className="for_productList_collection_filter_mainDiv_tabletView" onClick={toggleDrawer(true)}>
                  <button className="for_productList_filter_btn">
                    <img src={`${storImagePath()}/images/ProductListing/Filtericons/filter-ring.png`} alt="filter-icon" />
                    <span className="for_productList_filter_span">Filters</span>
                  </button>
                </div>
                <Drawer sx={{
                  zIndex: 9999999,
                  '& .MuiDrawer-paper': {
                    width: maxwidth375px ? '18rem' : maxwidth464px ? '22rem' : '25rem',
                  },
                }} open={open1} onClose={toggleDrawer(false)} className="for_productList_drawer_div">
                  <div className="for_modal_cancel_btn_div_pd" onClick={toggleDrawer(false)}>
                    <IoClose className='for_modal_cancel_btn_pd' size={28} />
                  </div>
                  <div className="for_productLisrt_fillter_div_1" toggleDrawer={toggleDrawer}>
                    {dropdownsData.map(({ index, title, data, type }) => (
                      <CollectionDropdown
                        key={index}
                        handleOpen={handleOpen}
                        open={open === index}
                        type={type}
                        handleButton={(value) => handleButton(index, value)}
                        check1={selectedValues.find(item => item.dropdownIndex === index)?.value || null}
                        title={title}
                        index={index}
                        data={data}
                        ref={(el) => (dropdownRefs.current[index] = el)}
                        setSelectedMetalId={setSelectedMetalId}
                        setSelectedDiaId={setSelectedDiaId}
                        selectedMetalId={selectedMetalId}
                        selectedDiaId={selectedDiaId}
                        maxwidth1000px={maxwidth1000px}
                        collectionName={collectionName}
                        setCollectionName={setCollectionName}
                      />
                    ))}

                    {rangeData?.map(({ index, title, data, type }) => {
                      const Component = type === 'price' ? CollectionPriceRange : CollectionCaratRange;
                      return (
                        <Component
                          key={index}
                          handleOpen={handleOpen}
                          open={open === index}
                          title={title}
                          index={index}
                          handleSliderChange={type === 'price' ? handlePriceSliderChange : handleCaratSliderChange}
                          data={data}
                          maxwidth1000px={maxwidth1000px}
                        />
                      );
                    })}

                    <div className="for_collection_filter_dropdown_sort">
                      <div className="for_collection_filter_label">
                        <label>Sort by:</label>
                      </div>
                      <div className="for_collection_filter_option_div">
                        <div variant="standard" sx={{ m: 1, minWidth: 120, background: 'transparent' }}>
                          <select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={trend}
                            onChange={(e) => {
                              handleSortby(e);
                              handleChangeTrend(e);
                            }}
                            className="for_collection_filter_sort_select"
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999999,
                                },
                              },
                            }}
                          >
                            <option value="Recommended">Recommended</option>
                            <option value="New">New</option>
                            <option value="Trending">Trending</option>
                            {storeInit?.IsStockWebsite === 1 && (
                              <MenuItem value="In Stock">In Stock</MenuItem>
                            )}
                            <option value="Bestseller">Bestseller</option>
                            <option value="PRICE HIGH TO LOW">Price High To Low</option>
                            <option value="PRICE LOW TO HIGH">Price Low To High</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="for_productList_shipping_div">
                      <div className="for_collection_filter_dropdown_sort_ship">
                        <div className="for_collection_filter_label_ship">
                          <label>shipping date </label>
                        </div>
                        <div className="for_collection_filter_option_div_ship">
                          <ShippingDrp value={shippingDrp} onChange={handleChange1} data={shippData} sim={true} className={"for_collection_filter_sort_select_ship"} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Drawer>
              </>
            ) : (
              <div className="for_productList_collection_filter_mainDiv">
                <div className="for_collection_filter_lists">
                  {dropdownsData.map(({ index, title, data, type }) => (
                    <CollectionDropdown
                      key={index}
                      handleOpen={handleOpen}
                      open={open === index}
                      type={type}
                      handleButton={(value) => handleButton(index, value)}
                      check1={selectedValues.find(item => item.dropdownIndex === index)?.value || null}
                      title={title}
                      index={index}
                      data={data}
                      ref={(el) => (dropdownRefs.current[index] = el)}
                      setSelectedMetalId={setSelectedMetalId}
                      setSelectedDiaId={setSelectedDiaId}
                      selectedMetalId={selectedMetalId}
                      selectedDiaId={selectedDiaId}
                      collectionName={collectionName}
                      setCollectionName={setCollectionName}
                    />
                  ))}

                  {rangeData?.map(({ index, title, data, type }) => {
                    const Component = type === 'price' ? CollectionPriceRange : CollectionCaratRange;
                    return (
                      <Component
                        key={index}
                        handleOpen={handleOpen}
                        open={open === index}
                        title={title}
                        index={index}
                        handleSliderChange={type === 'price' ? handlePriceSliderChange : handleCaratSliderChange}
                        data={data}
                      />
                    );
                  })}

                  <div className="for_collection_filter_dropdown_sort">
                    <div className="for_collection_filter_label">
                      <label>Sort by:</label>
                    </div>
                    <div className="for_collection_filter_option_div">
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, background: 'transparent' }}>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={trend}
                          onChange={(e) => {
                            handleSortby(e);
                            handleChangeTrend(e);
                          }}
                          className="for_collection_filter_sort_select"
                        >
                          <MenuItem value="Recommended">Recommended</MenuItem>
                          <MenuItem value="New">New</MenuItem>
                          <MenuItem value="Trending">Trending</MenuItem>
                          {storeInit?.IsStockWebsite === 1 && (
                            <MenuItem value="In Stock">In Stock</MenuItem>
                          )}
                          <MenuItem value="Bestseller">Bestseller</MenuItem>
                          <MenuItem value="PRICE HIGH TO LOW">Price High To Low</MenuItem>
                          <MenuItem value="PRICE LOW TO HIGH">Price Low To High</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            )}


            <div className="for_productList_filter_display_mainDiv">
              <div className="for_productList_filter_data_div">
                <div className="for_productList_filter_selected">
                  {selectedValues.map((item) => {
                    return (
                      <>
                        {item?.dropdownIndex === 2 && (
                          <>
                            <div className="for_productList_filter_selected_value">
                              {item?.value ?? metalType?.[1]?.metaltype}
                            </div>
                            <div onClick={() => handleRemoveValues(item?.dropdownIndex)}>
                              <RxCross1 className="for_productList_filter_selected_icon" />
                            </div>
                          </>
                        )}
                        {item?.dropdownIndex === 1 && (
                          <>
                            <div className="for_productList_filter_selected_value">{item?.value}</div>
                            <div onClick={() => handleRemoveValues(item?.dropdownIndex)}>
                              <RxCross1 className="for_productList_filter_selected_icon" />
                            </div>
                          </>
                        )}
                        {item?.dropdownIndex === 3 && (
                          <>
                            <div className="for_productList_filter_selected_value">
                              {item?.value ?? `${diamondType?.[2]?.Quality}#${diamondType?.[2]?.color}`}
                            </div>
                            <div onClick={() => handleRemoveValues(item?.dropdownIndex)}>
                              <RxCross1 className="for_productList_filter_selected_icon" />
                            </div>
                          </>
                        )}
                        {item?.dropdownIndex === 4 && (
                          <>
                            <div className="for_productList_filter_selected_value">
                              {`Price INR ${item.value[0]} - INR ${item.value[1]}`}
                            </div>
                            <div onClick={() => handleRemoveValues(item?.dropdownIndex)}>
                              <RxCross1 className="for_productList_filter_selected_icon" />
                            </div>
                          </>
                        )}
                        {item?.dropdownIndex === 5 && (
                          <>
                            <div className="for_productList_filter_selected_value">
                              {`Carat ${caratRangeValue[0]}CT - ${caratRangeValue[1]}CT`}
                            </div>
                            <div onClick={() => handleRemoveValues(item?.dropdownIndex)}>
                              <RxCross1 className="for_productList_filter_selected_icon" />
                            </div>
                          </>
                        )}
                      </>
                    )
                  })}
                </div>
                <div className="" >
                  <button className="for_productList_reset_button" onClick={handleClearSelectedvalues}>Reset</button>
                </div>
              </div>
              <div className="for_productList_total_filtered_data_div">
                <span className="for_total_filtered_span">Showing {afterFilterCount || 0} results</span>
              </div>
              {!maxwidth1000px && (
                <div className="for_productList_shipping_div">
                  <div className="for_collection_filter_dropdown_sort_ship">
                    <div className="for_collection_filter_label_ship">
                      <label>shipping date </label>
                    </div>
                    <div className="for_collection_filter_option_div_ship">
                      <ShippingDrp value={shippingDrp} onChange={handleChange1} data={shippData} className={"for_collection_filter_sort_select_ship"} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="for_productList_listing_div">
              {isOnlyProdLoading ? <div className="for_global_spinner"></div> : (
                productListData?.map((item, index) => {
                  const images = imageMap[item.designno] || {};
                  const rollImageUrl = rollImages[item.designno] || noImageFound; 
                  return (
                    <Product_Card
                      StyledRating={StyledRating}
                      productData={item}
                      index={index}
                      ratingvalue={ratingvalue}
                      handleMetalColor={handleMetalColor}
                      metalColorType={metalColorType}
                      imageUrl={getDynamicImages(item.designno, item.ImageExtension)}
                      yellowImage={images?.yellowImage}
                      whiteImage={images?.whiteImage}
                      roseImage={images?.roseImage}
                      yellowRollImage={images?.yellowRollImage}
                      whiteRollImage={images?.whiteRollImage}
                      roseRollImage={images?.roseRollImage}
                      videoUrl={getDynamicVideo(item.designno, item.VideoCount, item.VideoExtension)}
                      RollImageUrl={rollImageUrl}
                      // RollImageUrl={getDynamicRollImages(item.designno, item.ImageCount, item.ImageExtension)}
                      loginCurrency={loginCurrency}
                      storeInit={storeInit}
                      handleCartandWish={handleCartandWish}
                      cartArr={cartArr}
                      handleMoveToDetail={handleMoveToDetail}
                      videoRef={videoRef}
                      selectedMetalId={selectedMetalId}
                      metalType={metalType}
                      location={location}
                    />
                  )
                })
              )}
            </div>
            {storeInit?.IsProductListPagination == 1 &&
              Math.ceil(afterFilterCount / storeInit.PageSize) > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBlock: "3%",
                    width: '100%'
                  }}
                >
                  <Pagination
                    count={Math.ceil(afterFilterCount / storeInit.PageSize)}
                    size={maxwidth464px ? "small" : "large"}
                    shape="circular"
                    onChange={handelPageChange}
                    page={currPage}
                    showFirstButton
                    showLastButton
                  />
                </div>
              )}
          </div>
        </div >
      </div >
      <div>
        <ScrollTop />
      </div>
    </>
  );
};

export default ProductList;

const CollectionDropdown = forwardRef(({
  handleOpen,
  open,
  handleButton,
  setSelectedMetalId,
  setSelectedDiaId,
  check1,
  type,
  title,
  index,
  data,
  selectedMetalId,
  selectedDiaId,
  maxwidth1000px,
  collectionName,
  setCollectionName = () => { },
}, ref) => {
  const isOpen = maxwidth1000px || open;
  return (
    <div className="for_collection_filter_dropdown" onClick={() => handleOpen(index)} ref={ref}>
      <div className="for_collection_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div className={`for_collection_filter_option_div ${isOpen ? 'open' : 'for_collection_filter_option_div_hide'}`}>
        {data?.map((i) => {
          let isChecked = false;

          if (type === 'high') {
            isChecked = collectionName === i;
          } else if (type === 'metal') {
            isChecked = selectedMetalId === i?.Metalid;
          } else if (type === 'diamond') {
            isChecked = selectedDiaId === `${i?.QualityId},${i?.ColorId}`;
          }

          return (
            <div
              className={`for_collction_filter_options ${isChecked ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up to the parent
                if (type === 'metal') {
                  handleButton(i?.metaltype);
                  setSelectedMetalId(i?.Metalid);
                } else if (type === 'diamond') {
                  handleButton(`${i.Quality}#${i?.color}`);
                  setSelectedDiaId(`${i?.QualityId},${i?.ColorId}`);
                } else if (type === 'high') {
                  handleButton(i);
                  setCollectionName(i);
                }
              }}
              key={type === 'metal' ? i.Metalid : type === 'diamond' ? `${i?.QualityId},${i?.ColorId}` : i}
            >
              <input
                type="radio"
                checked={isChecked}
              />
              <span>{type === 'diamond' ? `${i.Quality}#${i?.color}` : i?.metaltype || i}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const CollectionPriceRange = forwardRef(({
  handleOpen,
  open,
  title,
  index,
  handleSliderChange,
  data,
  maxwidth1000px,
}, ref) => {
  const handleSliderMouseDown = (event) => {
    event.stopPropagation(); // Prevent click from propagating to parent div
  };

  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return (...args) => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //     timeoutId = setTimeout(() => {
  //       func.apply(null, args);
  //     }, delay);
  //   };
  // };

  // const debouncedHandleSliderChange = useMemo(() => debounce(handleSliderChange, 1000), [handleSliderChange]);
  const isOpen = maxwidth1000px || open;
  return (
    <div
      className="for_collection_filter_dropdown"
      onClick={() => handleOpen(index)}
      ref={ref} // Attach ref to a DOM element
    >
      <div className="for_collection_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div className={isOpen ? "for_collection_filter_option_div_slide" : 'for_collection_filter_option_div_slide_hide'}>
        <div className='for_collection_slider_div'>
          <Slider
            value={data}
            onChange={handleSliderChange}
            onMouseDown={handleSliderMouseDown}
            min={5000}
            max={250000}
            aria-labelledby="range-slider"
            style={{ color: 'black' }}
            size='small'
            step={1}
            sx={{
              "& .MuiSlider-thumb": {
                width: 17,
                height: 17,
                backgroundColor: "black",
                border: "1px solid #000",
              },
              "& .MuiSlider-rail": {
                height: 5, // Adjust height of the rail
                bgcolor: "black",
                border: " none",
              },
              "& .MuiSlider-track": {
                height: 5, // Adjust height of the track
                padding: "0 5px",
                bgcolor: "black",
                border: " none",
              },
              "& .MuiSlider-markLabel": {
                fontSize: "12px !important",
              },
            }}
          />
          <div className='for_collection_slider_input'>
            <input type="text" value={`INR ${formatter(data[0])}`} className='for_collection_price' />
            <input type="text" value={`INR ${formatter(data[1])}`} className='for_collection_price' />
          </div>
        </div>
      </div>
    </div >
  );
});

const CollectionCaratRange = forwardRef(({
  handleOpen,
  open,
  title,
  index,
  handleSliderChange,
  data,
  maxwidth1000px,
}, ref) => {

  const handleSliderMouseDown = (event) => {
    event.stopPropagation(); // Prevent click from propagating to parent div
  };
  const isOpen = maxwidth1000px || open;
  return (
    <div
      className="for_collection_filter_dropdown"
      onClick={() => handleOpen(index)}
      ref={ref} // Attach ref to a DOM element
    >
      <div className="for_collection_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div className={isOpen ? "for_collection_filter_option_div_slide" : 'for_collection_filter_option_div_slide_hide'}>
        <div className='for_collection_slider_div'>
          <Slider
            value={data}
            onChange={handleSliderChange}
            onMouseDown={handleSliderMouseDown} // Prevent propagation
            min={0.96}
            max={41.81}
            aria-labelledby="range-slider"
            style={{ color: 'black' }}
            size='small'
            step={0.01}
            sx={{
              "& .MuiSlider-thumb": {
                width: 17,
                height: 17,
                backgroundColor: "black",
                border: "1px solid #000",
              },
              "& .MuiSlider-rail": {
                height: 5, // Adjust height of the rail
                bgcolor: "black",
                border: " none",
              },
              "& .MuiSlider-track": {
                height: 5, // Adjust height of the track
                padding: "0 5px",
                bgcolor: "black",
                border: " none",
              },
              "& .MuiSlider-markLabel": {
                fontSize: "12px !important",
              },
            }}
          />
          <div className='for_collection_slider_input'>
            <input type="text" value={`${data[0]}Ct`} className='for_collection_weights' />
            <input type="text" value={`${data[1]}Ct`} className='for_collection_weights' />
          </div>
        </div>
      </div>
    </div>
  );
});

const Product_Card = ({
  StyledRating,
  productData,
  ratingvalue,
  index,
  handleMetalColor,
  metalColorType,
  imageUrl,
  videoUrl,
  RollImageUrl,
  loginCurrency,
  storeInit,
  handleCartandWish,
  cartArr,
  handleMoveToDetail,
  videoRef,
  selectedMetalId,
  metalType,
  yellowImage,
  whiteImage,
  roseImage,
  yellowRollImage,
  whiteRollImage,
  roseRollImage,
  location,
}) => {

  const [isHover, setIsHover] = useState(false);
  const [imageColor, setImageColor] = useRecoilState(for_MetalColor_Image);
  const getSessImgColor = JSON.parse(sessionStorage.getItem('imgColorCode'));
  const [selectedMetalColor, setSelectedMetalColor] = useState(null);
  const getSessCartWishImgColor = JSON?.parse(sessionStorage.getItem('cartWishImgColor')) ?? undefined;

  const activeColorCode = getSessImgColor || getSessCartWishImgColor;

  const videoRefs = useRef([]);

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

  const getGoldType = metalType.filter((item) => item?.Metalid === selectedMetalId)?.[0]?.metaltype.toUpperCase()?.split(' ')[1]?.split('K')[0];

  const handleClick = (id) => {
    setSelectedMetalColor(selectedMetalColor === id ? null : id);
    handleMetalColor(id); // Notify the parent if needed
  };

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const isChecked = cartArr[productData?.autocode] ?? productData?.IsInCart === 1;

  const handleMouseEnter = (index) => {
    setIsHover(true);

    // Pause all video
    // videoRefs.current.forEach((ref, i) => {
    //   if (ref && i !== index) {
    //     ref.pause();
    //   }
    // });

    // Play the hovered video
    if (videoRefs.current[index] && videoUrl !== undefined) {
      videoRefs.current[index].play();
    }
  };

  const handleMouseLeave = () => {
    if (videoUrl !== undefined) {
      setIsHover(true);
    }
    else {
      setIsHover(false);
    }

    // Pause all videos on mouse leave
    videoRefs.current.forEach(ref => {
      if (ref) {
        ref.pause();
      }
    });
  };

  return (
    <>
      <div className="for_productCard_mainDiv">
        <div className="for_productList_listing_card_div">
          <div className="for_product_listing_ratings_div">
            {/* <StyledRating
              name="simple-controlled"
              value={ratingvalue}
              size="small"
              className="for_product_listting_rating"
              // onChange={(event, newValue) => {
              //   setratingvalue(newValue);
              // }}
              readOnly
            /> */}
          </div>
          <div className="forWeb_app_product_label_prd">
            {productData?.IsInReadyStock == 1 && <span className="forWeb_app_instock">In Stock</span>}
            {productData?.IsBestSeller == 1 && <span className="forWeb_app_bestSeller">Best Seller</span>}
            {productData?.IsTrending == 1 && <span className="forWeb_app_intrending">Trending</span>}
            {productData?.IsNewArrival == 1 && <span className="forWeb_app_newarrival">New</span>}
          </div>
          <div className="for_productList_listing_card_image_div"
            // onMouseOver={() => setIsHover(true)}
            // onMouseOut={() => setIsHover(false)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMoveToDetail(productData, selectedMetalColor)}
          >
            {isHover && (videoUrl !== undefined || RollImageUrl !== undefined) ? (
              <>
                {videoUrl !== undefined ? (
                  <div className="for_rollup_video">
                    <video src={videoUrl} muted loop ref={(el) => (videoRefs.current[index] = el)} />
                  </div>
                ) : null}

                {videoUrl === undefined && RollImageUrl !== undefined ? (
                  <div className="for_rollup_img">
                    <img src={selectedMetalColor === 1 ? yellowRollImage : selectedMetalColor === 2 ? whiteRollImage : selectedMetalColor === 3 ? roseRollImage : RollImageUrl} />
                  </div>
                ) : null}
              </>
            ) : null}
            <img
              className="for_productList_listing_card_image"
              src={selectedMetalColor === 1 ? yellowImage : selectedMetalColor === 2 ? whiteImage : selectedMetalColor === 3 ? roseImage : imageUrl}
              onError={(e) => {
                e.target.onerror = null;
                e.stopPropagation();
                e.target.src = noImageFound
              }}
            />
          </div>
          {/* <div className="for_productList_metaltype_div">
            {metalColorType?.map((item) => (
              <div
                className={selectedMetalColor === item?.id ? `for_metaltype_${item?.metal}_clicked` : `for_metaltype_${item?.metal}`}
                key={item?.id}
                onClick={() => handleClick(item?.id)}
              >
                {getGoldType ?? 18}
              </div>
            ))}
          </div> */}
          <FormControlLabel
            control={
              <>
                <Checkbox
                  icon={<BsHandbag style={{ color: '#fff', fontSize: '16px' }} />}
                  checkedIcon={<BsHandbag style={{ color: '#fff', fontSize: '16px' }} />}
                  onChange={(e) => handleCartandWish(e, productData, "Cart")}
                  checked={
                    cartArr[productData?.autocode] ??
                      productData?.IsInCart === 1
                      ? true
                      : false
                  }
                  className="for_productList_cart_title"
                />
              </>
            }
            label={<span className={`for_productList_cart_title`}>{isChecked ? "In Cart" : "Add to Cart"}</span>}
            className="for_productList_listinig_ATC_div"
          />
        </div>
        <div className="for_productList_card_description">
          <div className="for_productList_metaltype_div">
            {metalColorType?.map((item) => (
              <button
                className={selectedMetalColor === item?.id ? `for_metaltype_${item?.metal}_clicked` : `for_metaltype_${item?.metal}`}
                key={item?.id}
                type="button"
                disabled={yellowImage === undefined}
                onClick={() => handleClick(item?.id)}
              >
                {""}
              </button>
            ))}
          </div>
          {/* <div className="for_productList_caratWeight">
            <span className="for_carat_title">Carat Weight:</span>
            <div className="for_carat_weights">
              <span className="for_weight_bg">0.25</span>
              <span className="for_weight_divider">To</span>
              <span className="for_weight_bg">2</span>
            </div>
          </div> */}
          <div className="for_productList_desc_title">
            <span className="for_listing_desc_span">{productData?.designno} {productData?.TitleLine?.length > 0 && " - " + productData?.TitleLine}</span>
          </div>
          <div className="for_productList_desc_div">
            <div className="">
              {storeInit?.IsGrossWeight == 1 && Number(productData?.Gwt) !== 0 && (
                <span>GWT : {productData?.Gwt.toFixed(3)}</span>
              )}
              {storeInit?.IsMetalWeight == 1 && Number(productData?.Nwt) !== 0 && (
                <span>&nbsp;| NWT : {productData?.Nwt.toFixed(3)}</span>
              )}
              {storeInit?.IsDiamondWeight == 1 && Number(productData?.Dwt) !== 0 && (
                <span>&nbsp;| DWT : {productData?.Dwt.toFixed(3)}{storeInit?.IsDiamondPcs === 1
                  ? `/ ${productData?.Dpcs?.toFixed(0)}`
                  : null}</span>
              )}
              {storeInit?.IsStoneWeight == 1 &&
                Number(productData?.CSwt) !== 0 && (
                  <span>&nbsp;| CWT : {productData?.CSwt.toFixed(3)}{storeInit?.IsStonePcs === 1
                    ? `/ ${productData?.CSpcs?.toFixed(0)}`
                    : null}</span>
                )}

            </div>
          </div>
          <div className="for_productList_price_div">
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: decodeEntities(loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode),
                }}
                style={{ paddingRight: '0.4rem' }}
              />
              {formatter(productData?.UnitCostWithMarkUp)}
            </span>
          </div>
        </div>
      </div >
    </>
  )
}



