import React, { forwardRef, lazy, useEffect, useRef, useState } from 'react'
import './SettingPage.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Cookies from 'js-cookie';
import noImageFound from '../../../Assets/image-not-found.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useNavigate, useLocation } from "react-router-dom";
import { Checkbox, Drawer, FormControl, FormControlLabel, MenuItem, Pagination, Rating, Select, Skeleton, Slider, styled, useMediaQuery } from "@mui/material";
import { formatter, storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { MetalTypeComboAPI } from '../../../../../../utils/API/Combo/MetalTypeComboAPI';
import { DiamondQualityColorComboAPI } from '../../../../../../utils/API/Combo/DiamondQualityColorComboAPI';
import { FaAngleDown } from 'react-icons/fa6';
import ShippingDrp from '../../ReusableComponent/ShippingDrp/ShippingDrp';
import DiamondPage from '..';
import { RxCross1 } from 'react-icons/rx';
import { DiamondListData } from '../../../../../../utils/API/DiamondStore/DiamondList';
import ProductListApi from '../../../../../../utils/API/ProductListAPI/ProductListApi';
import { FilterListAPI } from '../../../../../../utils/API/FilterAPI/FilterListAPI';
import { BsHandbag } from 'react-icons/bs';
import Pako from 'pako';
import { for_customizationSteps, for_MakeMyRingProcessDrawer, for_MetalColor_Image } from '../../../Recoil/atom';
import { useRecoilState } from 'recoil';
import MakeRingProcessModal from '../../ReusableComponent/DiamondStepModal/MakeRingProcessModal';
import { IoClose } from 'react-icons/io5';
import ScrollTop from '../../ReusableComponent/ScrollTop/ScrollTop';

const SettingPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  let maxwidth464px = useMediaQuery('(max-width:464px)')
  let maxwidth375px = useMediaQuery('(max-width:375px)')
  let maxwidth1000px = useMediaQuery('(max-width:1000px)')
  const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
  const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  let cookie = Cookies.get("visiterId");
  const dropdownRefs = useRef({})
  const [currPage, setCurrPage] = useState(1);
  const [modalOpen, setModalOpen] = useRecoilState(for_MakeMyRingProcessDrawer);
  const [imageMap, setImageMap] = useState({});

  const [open1, setOpen1] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen1(newOpen);
  };

  const encodeLink = (link) => btoa(link);

  useEffect(() => {
    const showModal = localStorage.getItem('dontShowModal');
    if (showModal !== 'true') {
      setModalOpen(true);
    }
  }, []);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const styleLinks = {
    Solitaire: "Solitaire/style",
    Halo: "Halo/style",
    Vintage: "Vintage/style",
    Side_Stone: "Side Stone/style",
    Designer: "Designer/style",
  };

  const categoryArr = [
    {
      id: 1,
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/solitaire.svg`,
      title: 'solitaire',
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Solitaire/M=${encodeLink(styleLinks?.Solitaire)}`
    },
    {
      id: 2,
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/halo.svg`,
      title: 'halo',
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Halo/M=${encodeLink(styleLinks?.Halo)}`
    },
    {
      id: 3,
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/vintage.svg`,
      title: 'vintage',
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Vintage/M=${encodeLink(styleLinks?.Vintage)}`
    },
    {
      id: 4,
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/side-stone.svg`,
      title: 'Side_stone',
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Side_Stone/M=${encodeLink(styleLinks?.Side_Stone)}`
    },
    {
      id: 5,
      image: `${storImagePath()}/images/ProductListing/SettingBanner/Ringsvg/designer.svg`,
      title: 'designer',
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/Designer/M=${encodeLink(styleLinks?.Designer)}`
    },
  ]

  const handleClick = (id, link) => {
    handleCategory(id);
    navigate(link);
  };

  const [isRing, setIsRing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [trend, setTrend] = useState('Recommended');
  const [selectShape, setSelectShape] = useState();
  const [shippingDrp, setShippingDrp] = useState('ANY DATE');
  const [storeInit, setStoreInit] = useState({})
  const [open, setOpen] = useState(null);
  const [metalType, setMetaltype] = useState([]);
  const [diamondType, setDiamondType] = useState([]);
  const [sortBySelect, setSortBySelect] = useState();
  const [isOnlySettLoading, setIsOnlySettLoading] = useState(true);
  const [isProdLoading, setIsProdLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [loginCurrency, setLoginCurrency] = useState();
  const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId);
  const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid);
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid)
  const [priceRangeValue, setPriceRangeValue] = useState([5000, 250000]);
  const [locationKey, setLocationKey] = useState();
  const [productListData, setProductListData] = useState([]);
  const [prodListType, setprodListType] = useState();
  const [afterFilterCount, setAfterFilterCount] = useState();
  const [ratingvalue, setratingvalue] = useState(5);
  const [selectMetalColor, setSelectMetalColor] = useState(null);
  const [Shape, setShape] = useState("");
  const [customizeStep, setCustomizeStep] = useRecoilState(for_customizationSteps);
  const steps = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const steps1 = JSON.parse(sessionStorage.getItem('customizeSteps2'));
  const stepsData = JSON.parse(sessionStorage.getItem('custStepData'));
  const stepsData2 = JSON.parse(sessionStorage.getItem('custStepData2'));

  const initialSelections = {
    selectedMetalId: loginUserDetail?.MetalId,
    selectedDiaId: loginUserDetail?.cmboDiaQCid,
    selectedCsId: loginUserDetail?.cmboCSQCid
  };

  // Use shallow copy to track changes
  const [previousSelections, setPreviousSelections] = useState(initialSelections);

  useEffect(() => {
    setIsRing(location?.pathname.split('/')[3])
  }, [location?.pathname])

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

  const diaShapeData = [
    { id: 1, img: `${storImagePath()}/images/ProductListing/Diamond/images/r.png`, title: 'Round' },
    { id: 2, img: `${storImagePath()}/images/ProductListing/Diamond/images/p.png`, title: 'Princess' },
    { id: 3, img: `${storImagePath()}/images/ProductListing/Diamond/images/c.png`, title: 'Cushion' },
    { id: 4, img: `${storImagePath()}/images/ProductListing/Diamond/images/e.png`, title: 'Emerald' },
    { id: 5, img: `${storImagePath()}/images/ProductListing/Diamond/images/o.png`, title: 'Qval' },
    { id: 6, img: `${storImagePath()}/images/ProductListing/Diamond/images/rad.png`, title: 'Radiant' },
    { id: 7, img: `${storImagePath()}/images/ProductListing/Diamond/images/as.png`, title: 'Asscher' },
    { id: 8, img: `${storImagePath()}/images/ProductListing/Diamond/images/m.png`, title: 'Marquise' },
    { id: 9, img: `${storImagePath()}/images/ProductListing/Diamond/images/hea.png`, title: 'Heart' },
    { id: 10, img: `${storImagePath()}/images/ProductListing/Diamond/images/p.png`, title: 'Pear' },
    { id: 11, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/1.svg`, title: 'Baguette' },
    { id: 12, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/2.svg`, title: 'Trillion' },
    { id: 13, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/3.svg`, title: 'Kite' },
    { id: 14, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/4.svg`, title: 'Half-moon' },
    { id: 15, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/5.svg`, title: 'Trapezoid' },
    { id: 16, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/6.svg`, title: 'Shield' },
    { id: 17, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/7.svg`, title: 'Hexagonal' },
    { id: 18, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/8.svg`, title: 'Rose' },
    { id: 19, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/9.svg`, title: 'Briolette' },
    { id: 20, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/10.svg`, title: 'Old_european' },
    { id: 21, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/11.svg`, title: 'Old-mine' },
    { id: 22, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/12.svg`, title: 'Antique-cushion' },
    { id: 23, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/13.svg`, title: 'Antique-pear' },
    { id: 24, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/14.svg`, title: 'Antique-marquise' },
    { id: 25, img: `${storImagePath()}/images/ProductListing/Diamond/Svgs/15.svg`, title: 'Antique-oval' },
  ]

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

  // let getDesignImageFol = storeInit?.DesignImageFol;
  let getDesignImageFol = storeInit?.CDNDesignImageFol;

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

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = {};
      await Promise.all(productListData.map(async (item) => {
        const yellowImage = await getDynamicYellowImage(item, item.designno, item.ImageExtension);
        const whiteImage = await getDynamicWhiteImage(item, item.designno, item.ImageExtension);
        const roseImage = await getDynamicRoseImage(item, item.designno, item.ImageExtension);

        // Store images in an object keyed by design number
        loadedImages[item.designno] = {
          yellowImage,
          whiteImage,
          roseImage,
        };
      }));
      setImageMap(loadedImages);
    };

    if (productListData.length > 0) {
      loadImages();
    }
  }, [productListData]);

  useEffect(() => {
    const urlPath = location?.pathname?.slice(1).split("/");
    const shapeParam = urlPath?.[3]?.split('=');

    if (shapeParam?.[0] === 'diamond_shape') {
      fetchData(shapeParam?.[1])
      setShape(shapeParam?.[1])
    }
    else if (shapeParam?.[0] === 'M') {
      fetchData('')
      setShape('')
    }
    else {
      fetchData('')
      setShape('')
    }
    // fetchData('')
    setCurrPage(1)

  }, [location?.pathname]);

  const fetchData = async (Shape) => {
    try {
      // if(!Shape) return;

      const obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
      const urlPath = location?.pathname?.slice(1).split("/");
      let menuVal = "";
      let productlisttype;

      urlPath.forEach((ele) => {
        const firstChar = ele.charAt(0);
        if (firstChar === "M") {
          menuVal = ele;
        }
      });

      if (menuVal.length > 0) {
        const menuDecode = atob(menuVal.split("=")[1]);
        const key = menuDecode.split("/")[1].split(",");
        const val = menuDecode.split("/")[0].split(",");
        productlisttype = [key, val];
      }
      setprodListType(productlisttype);

      const res = await ProductListApi({}, 1, obj, productlisttype, cookie, "", {}, {}, {}, Shape);
      if (res) {
        setProductListData(res?.pdList);
        setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    } finally {
      setIsProdLoading(false);
      setIsOnlySettLoading(false);
    }
  };

  const getShapeFromURL = () => {
    const getSetting = location?.pathname?.split("/")[3];
    const getPath = location.pathname.split('/').slice(1, 3)
    const mergePath = getPath.join('/')
    if (mergePath == 'certified-loose-lab-grown-diamonds/settings') {
      if (stepsData === null && stepsData2 === null && steps1?.[0]?.step1 !== true) {
        const step1 = [{ "step1": true, "Setting": getSetting }];
        sessionStorage.setItem("customizeSteps2", JSON.stringify(step1));
      }
    }
  }

  useEffect(() => {
    getShapeFromURL();
  }, [location?.pathname]);

  const updateSteps = (shape) => {
    const updatedStep1 = steps?.map(step => {
      if (step.step1 !== undefined) {
        return { "step1": true, "Setting": shape };
      }
      return step;
    });

    if (!updatedStep1?.some(step => step?.step1 !== undefined)) {
      updatedStep1?.push({ "step1": true, "Setting": shape });
    }
    sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));
  }


  useEffect(() => {
    // Check if the current values differ from the previous values
    const hasChanges = selectedMetalId !== previousSelections.selectedMetalId
      || selectedDiaId !== previousSelections.selectedDiaId
      || selectedCsId !== previousSelections.selectedCsId || selectShape

    if (hasChanges) {
      filterData(selectedMetalId, selectedDiaId, selectedCsId, selectShape);

      setPreviousSelections({
        selectedMetalId,
        selectedDiaId,
        selectedCsId
      });
    }
  }, [selectedMetalId, selectedDiaId, selectShape]);

  // useEffect(() => {
  //   let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

  //   setIsOnlySettLoading(true);
  //   ProductListApi({}, 1, obj, prodListType, cookie, "", {}, {}, {}, selectShape)
  //     .then((res) => {
  //       if (res) {
  //         setProductListData(res?.pdList);
  //         setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
  //       }
  //       return res;
  //     })
  //     .catch((err) => console.log("err", err))
  //     .finally(() => {
  //       setIsOnlySettLoading(false);
  //     });
  // }, [selectedMetalId, selectedDiaId, selectShape]);

  const filterData = (selectedMetalId, selectedDiaId, selectedCsId, shape) => {
    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

    // if (location?.key === locationKey) {
    setIsOnlySettLoading(true);
    ProductListApi({}, 1, obj, prodListType, cookie, "", {}, {}, {}, shape)
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlySettLoading(false);
      });
    // }
  }

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

  const handleShape = (title) => {
    setSelectShape(selectShape === title ? null : title);
  }

  const handleMetalColor = (index) => {
    setSelectMetalColor(selectMetalColor === index ? null : index)
  }

  useEffect(() => {
    const path = location?.pathname.split('/')?.[4]
    if (!path.includes('M=')) {
      setSelectedCategory(path?.toLocaleLowerCase())
    }
  }, [location?.pathname])

  const handleCategory = (id) => {
    setSelectedCategory(selectedCategory === id ? null : id);
  }

  const handleChangeTrend = (event) => {
    setTrend(event.target.value);
  };

  const handleOpen = (index) => {
    setOpen(open === index ? null : index)
  }

  const handleChange1 = (event) => {
    setShippingDrp(event.target.value);
  };

  const handleRemoveValues = (index) => {
    setSelectedValues(prev => {
      const existingIndex = prev.findIndex(item => item?.dropdownIndex === index)
      return prev.filter((_, i) => i !== existingIndex);
    })
    setPriceRangeValue([5000, 250000])
    setSelectShape();
  }

  const handleClearSelectedvalues = () => {
    setSelectedValues([]);
    setSelectShape();
    setSelectedMetalId(loginUserDetail?.MetalId ?? storeInit?.MetalId)
    setSelectedDiaId(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid)
    setPriceRangeValue([5000, 250000])
    setShippingDrp('ANY DATE')
    setTrend('Recommended')
  }

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
    ProductListApi({}, value, obj, prodListType, cookie, sortBySelect, {}, {}, {}, (Shape ?? ''))
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

  const handleSortby = async (e) => {
    setSortBySelect(e.target?.value)

    let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId }

    setIsOnlySettLoading(true)

    let sortby = e.target?.value

    await ProductListApi({}, 1, obj, prodListType, cookie, sortby, {}, {}, {}, (Shape ?? ''))
      .then((res) => {
        if (res) {
          setProductListData(res?.pdList);
          setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount)
        }
        return res;
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setIsOnlySettLoading(false)
      })

  }

  const handlePriceSliderChange = (event, newValue) => {
    const roundedValue = newValue.map(val => parseInt(val));
    setPriceRangeValue(roundedValue)
    handleButton(3, roundedValue);
  };

  const dropdownsData = [
    { index: 1, title: "All metal", data: metalType, type: 'metal', "diaStep": steps, "setStep": steps1 },
    { index: 2, title: "Diamond shape", data: diaShapeData, type: 'diashape', "diaStep": steps, "settStep": steps1 },
  ];

  const rangeData = [
    { index: 3, title: "price", data: priceRangeValue, type: 'price' },
  ]


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


  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#A2A2A2',
    },
    '& .MuiRating-iconHover': {
      color: '#A2A2A2',
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
    console.log('productData: ', productData);
    let pValue = isRing === 'Ring' ? { menuname: 'Engagement Ring' } : { menuname: 'Diamond Pendants' };
    let output = isRing === 'Ring' ? { category: '1' } : { category: '13' };
    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId,
      d: selectedDiaId,
      c: selectedCsId,
      f: output,
      cmc: metalColor,
    };
    console.log("ksjkfjkjdkjfkjsdk--", obj);
    // compressAndEncode(JSON.stringify(obj))

    // decodeAndDecompress()

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    navigate(
      `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
      }${productData?.designno}/${pValue.menuname.split(' ').join('_')}/?p=${encodeObj}`
    );

  };

  const getBannerImage = (index) => {
    const bannerImage = `${storImagePath()}/images/ProductListing/SettingCardBanner/banner1.png`;
    return index < 0 || (index >= 2 && (index - 2) % 10 === 0)
      ? bannerImage
      : null;
  };

  return (
    <>
      <DiamondPage />
      <div className="for_settingList_MainDiv">
        <div className="for_settingList_div">
          <div className="for_settingList_desc_div">
            <h5 className='for_settingList_desc_title'>All {isRing === 'Ring' ? 'Engagement Rings' : 'Diamond Pendants'}</h5>
            <p className='for_settingList_desc_para'>{isRing === 'Ring' ? 'Find the perfect Engagement Rings for women and men at Forevery. Choose from classic to modern styles or design your own for a ring that is sure to shine.' : 'Find the perfect Diamond Pendants for women and men at Forevery. Choose from classic to modern styles or design your own for a ring that is sure to shine.'}</p>
          </div>
          <div className="for_settingLists_category_lists_div" style={{ display: isRing === 'Ring' ? '' : 'none' }}>
            {categoryArr?.map((item, index) => (
              <div className={`for_settingLists_category_lists ${selectedCategory == item?.title?.toLocaleLowerCase() ? 'selected' : ''}`} key={index} onClick={() => handleClick(item?.id, item?.link)}>
                <img className='for_settingLists_categ_img' src={item?.image} alt={item?.title} />
                <span className='for_settingList_categ_title'>{item?.title}</span>
              </div>
            ))}
          </div>
          <div className="for_settingList_filter_div">
            <div className="for_productList_setting_filter_mainDiv">
              <div className="for_setting_filter_lists">
                {maxwidth1000px ? (
                  <>
                    <Drawer sx={{
                      zIndex: 9999999,
                      '& .MuiDrawer-paper': {
                        width: maxwidth375px ? '18rem' : maxwidth464px ? '22rem' : '25rem',
                      },
                    }} open={open1} onClose={toggleDrawer(false)} className="for_productList_drawer_div">
                      <div className="for_modal_cancel_btn_div_pd" onClick={toggleDrawer(false)}>
                        <IoClose className='for_modal_cancel_btn_pd' size={28} />
                      </div>
                      <h4 className='for_design_h4'>Design Your Own Engagement Rings</h4>
                      <div className="for_settingLisrt_fillter_div_1" toggleDrawer={toggleDrawer}>
                        {dropdownsData.map(({ index, title, data, type, diaStep, settStep }) => {
                          return (
                            type === 'metal' ? (
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
                                ref={el => dropdownRefs.current[index] = el}
                                setSelectedMetalId={setSelectedMetalId}
                                selectedMetalId={selectedMetalId}
                                maxwidth1000px={maxwidth1000px}
                              />
                            ) : (
                              <>
                                {(settStep?.[0]?.step1 == true && diaStep?.[0]?.step1 != true) && (
                                  <CollectionDiamondShape
                                    key={index}
                                    handleOpen={handleOpen}
                                    open={open === index}
                                    type={type}
                                    handleButton={(value) => handleButton(index, value)}
                                    check1={selectedValues.find(item => item.dropdownIndex === index)?.value || null}
                                    title={title}
                                    index={index}
                                    data={data}
                                    ref={el => dropdownRefs.current[index] = el}
                                    handleShape={handleShape}
                                    selectShape={selectShape}
                                    maxwidth1000px={maxwidth1000px}
                                  />
                                )}
                              </>
                            )
                          )
                        })}

                        {rangeData?.map(({ index, title, data, type }) => (
                          type === 'price' && (
                            <CollectionPriceRange
                              key={index}
                              handleOpen={handleOpen}
                              open={open === index}
                              title={title}
                              index={index}
                              handleSliderChange={handlePriceSliderChange}
                              data={data}
                              maxwidth1000px={maxwidth1000px}
                            />
                          )
                        ))}

                        <div className="for_setting_filter_dropdown_sort">
                          <div className="for_setting_filter_label">
                            <label>Sort by:</label>
                          </div>
                          <div className="for_setting_filter_option_div">
                            <div variant="standard" style={{ m: 1, minWidth: 120, background: 'transparent' }}>
                              <select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={trend}
                                onChange={(e) => {
                                  handleSortby(e);
                                  handleChangeTrend(e);
                                }}
                                className="for_setting_filter_sort_select"
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
                                  <option value="In Stock">In Stock</option>
                                )}
                                <option value="Bestseller">Bestseller</option>
                                <option value="PRICE HIGH TO LOW">Price High To Low</option>
                                <option value="PRICE LOW TO HIGH">Price Low To High</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* <div className="for_setting_filter_dropdown_sort_ship">
                          <div className="for_setting_filter_label_ship">
                            <label>shipping date </label>
                          </div>
                          <div className="for_setting_filter_option_div_ship">
                            <ShippingDrp value={shippingDrp} onChange={handleChange1} data={shippData} sim={true} className={"for_setting_filter_sort_select_ship"} />
                          </div>
                        </div> */}
                      </div>
                    </Drawer>
                  </>
                ) : (
                  <>
                    {
                      dropdownsData.map(({ index, title, data, type, diaStep, settStep }) => {
                        return (
                          type === 'metal' ? (
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
                              ref={el => dropdownRefs.current[index] = el}
                              setSelectedMetalId={setSelectedMetalId}
                              selectedMetalId={selectedMetalId}
                            />
                          ) : (
                            <>
                              {(settStep?.[0]?.step1 == true && diaStep?.[0]?.step1 != true) && (
                                <CollectionDiamondShape
                                  key={index}
                                  handleOpen={handleOpen}
                                  open={open === index}
                                  type={type}
                                  handleButton={(value) => handleButton(index, value)}
                                  check1={selectedValues.find(item => item.dropdownIndex === index)?.value || null}
                                  title={title}
                                  index={index}
                                  data={data}
                                  ref={el => dropdownRefs.current[index] = el}
                                  handleShape={handleShape}
                                  selectShape={selectShape}
                                />
                              )}
                            </>
                          )
                        )
                      })
                    }

                    {rangeData?.map(({ index, title, data, type }) => (
                      type === 'price' && (
                        <CollectionPriceRange
                          key={index}
                          handleOpen={handleOpen}
                          open={open === index}
                          title={title}
                          index={index}
                          handleSliderChange={handlePriceSliderChange}
                          data={data}
                        />
                      )
                    ))}

                    <div className="for_setting_filter_dropdown_sort">
                      <div className="for_setting_filter_label">
                        <label>sort by: </label>
                      </div>
                      <div className="for_setting_filter_option_div">
                        <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={trend}
                            onChange={(e) => {
                              handleSortby(e);
                              handleChangeTrend(e);
                            }}
                            className="for_setting_filter_sort_select"
                          >
                            <MenuItem value='Recommended'>Recommended</MenuItem>
                            <MenuItem value='New'>New</MenuItem>
                            <MenuItem value='Trending'>Trending</MenuItem>
                            {storeInit?.IsStockWebsite == 1 &&
                              <MenuItem value='In Stock'>In Stock</MenuItem>
                            }
                            <MenuItem value="Bestseller">Bestseller</MenuItem>
                            <MenuItem value='PRICE HIGH TO LOW'>Price High To Low</MenuItem>
                            <MenuItem value='PRICE LOW TO HIGH'> Price Low To High</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    {/* <div className="for_setting_filter_dropdown_sort_ship">
                      <div className="for_setting_filter_label_ship">
                        <label>shipping date </label>
                      </div>
                      <div className="for_setting_filter_option_div_ship">
                        <ShippingDrp value={shippingDrp} onChange={handleChange1} data={shippData} className={"for_setting_filter_sort_select_ship"} />
                      </div>
                    </div> */}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="for_settingList_display_div">
            <div className="for_settingList_display_dataCount">
              <span><small>Showing {afterFilterCount ?? 0} </small>{isRing === 'Ring' ? 'Engagement Rings' : 'Diamond Pendants'}</span>
            </div>
          </div>
          <div className="for_settingList_filter_display_div">
            <div className="for_settingList_filter_data_div">
              {selectedValues && (
                <div className="for_settingList_filter_selected">
                  {selectedValues?.map((item) => {
                    return (
                      <>
                        {item?.dropdownIndex === 1 && (
                          <>
                            <div className="for_settingList_filter_selected_value">{item?.value}</div>
                            <div onClick={() => handleRemoveValues(item?.dropdownIndex)}><RxCross1 className="for_settingList_filter_selected_icon" /></div>
                          </>
                        )}
                        {item?.dropdownIndex === 2 && (
                          <>
                            <div className="for_settingList_filter_selected_value">{item?.value}</div>
                            <div onClick={() => handleRemoveValues(item?.dropdownIndex)}><RxCross1 className="for_settingList_filter_selected_icon" /></div>
                          </>
                        )}
                        {item?.dropdownIndex === 3 && (
                          <>
                            <div className="for_settingList_filter_selected_value"> {`Price INR ${item.value[0]} - INR ${item.value[1]}`}</div>
                            <div onClick={() => handleRemoveValues(item?.dropdownIndex)}><RxCross1 className="for_settingList_filter_selected_icon" /></div>
                          </>
                        )}
                      </>
                    )
                  })}
                </div>
              )}
              {selectedValues?.length > 0 ? <div className="" >
                <button className="for_settingList_reset_button" onClick={handleClearSelectedvalues}>Reset</button>
              </div> :
                ''
              }
            </div>
          </div>
          <div class="mr_Modal-imageButton">
            <div onClick={handleButtonClick}>
              <button className='mr_Modal_btn'>How it works</button>
            </div>


            {maxwidth1000px && (
              <div className="for_settingList_collection_filter_mainDiv_tabletView" onClick={toggleDrawer(true)}>
                <button className="for_settingList_filter_btn">
                  <img src={`${storImagePath()}/images/ProductListing/Filtericons/filter-ring.png`} alt="filter-icon" />
                  <span className="for_settingList_filter_span">Filters</span>
                </button>
              </div>
            )}
          </div>
          <div className="for_settingList_product_lists_div">
            {isOnlySettLoading ? <div className="for_global_spinner"></div> : (
              productListData?.map((item, index) => {
                const images = imageMap[item.designno] || {};
                return (
                  <Product_Card
                    StyledRating={StyledRating}
                    productData={item}
                    index={index}
                    ratingvalue={ratingvalue}
                    yellowImage={images?.yellowImage}
                    whiteImage={images?.whiteImage}
                    roseImage={images?.roseImage}
                    handleMetalColor={handleMetalColor}
                    metalColorType={metalColorType}
                    imageUrl={getDynamicImages(item.designno, item.ImageExtension)}
                    loginCurrency={loginCurrency}
                    storeInit={storeInit}
                    handleMoveToDetail={handleMoveToDetail}
                    selectedMetalId={selectedMetalId}
                    metalType={metalType}
                    getBannerImage={getBannerImage}
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
        </div >
      </div >
      {modalOpen && <MakeRingProcessModal />}
      <div>
        <ScrollTop />
      </div>
    </>
  )
}

export default SettingPage


const CollectionDropdown = forwardRef(({
  handleOpen,
  open,
  handleButton,
  setSelectedMetalId,
  type,
  title,
  index,
  data,
  selectedMetalId,
  maxwidth1000px,
}, ref) => {
  const isOpen = maxwidth1000px || open;
  return (
    <div className="for_setting_filter_dropdown" onClick={() => handleOpen(index)} ref={ref}>
      <div className="for_setting_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div
        className='for_setting_filter_option_div'
        style={{
          height: isOpen ? "90px" : "0px",
          overflow: isOpen ? "unset" : "hidden",
        }}
      >
        {data?.map((i) => {
          let isChecked = false;

          if (type === 'metal') {
            isChecked = selectedMetalId === i?.Metalid;
          }

          return (
            <div
              className={`for_setting_filter_options ${isChecked ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (type === 'metal') {
                  handleButton(i?.metaltype);
                  setSelectedMetalId(i?.Metalid);
                }
              }}
              key={i.Metalid}
            >
              {type === 'metal' && (
                <>
                  <input
                    type="radio"
                    checked={isChecked}
                  />
                  <span>{i?.metaltype}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

const CollectionDiamondShape = forwardRef(({
  handleOpen,
  open,
  handleButton,
  type,
  title,
  index,
  data,
  handleShape,
  selectShape,
  maxwidth1000px,
}, ref) => {
  const isOpen = maxwidth1000px || open;
  return (
    <div className="for_setting_filter_dropdown" onClick={() => handleOpen(index)} ref={ref}>
      <div className="for_setting_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div
        className={`for_setting_filter_option_dia_div ${isOpen ? 'open' : 'close'}`}
      >
        {data?.map((i) => {
          let isChecked = false;
          if (type === 'diashape') {
            isChecked = i?.title;
          }

          return (
            <div
              className={selectShape === i?.title ? 'for_setting_filter_options_diaShape_seelcted' : `for_setting_filter_options_diaShape`}
              onClick={(e) => {
                e.stopPropagation();
                if (type === 'diashape') {
                  handleButton(i?.title);
                  handleShape(i?.title);
                }
              }}
              key={i?.title}
            >
              {type === 'diashape' && (
                <div className={'for_settingLists_category_lists'} checked={isChecked}
                >
                  <img src={i?.img} alt={i?.title} />
                  <span className='for_settingList_categ_title'>{i?.title}</span>
                </div>
              )}
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
    event.stopPropagation();
  };
  const isOpen = maxwidth1000px || open;
  return (
    <div
      className="for_setting_filter_dropdown"
      onClick={() => handleOpen(index)}
      ref={ref}
    >
      <div className="for_setting_filter_label">
        <label>{title}</label>
        <FaAngleDown />
      </div>
      <div className="for_setting_filter_option_div_slide"
        style={{
          height: isOpen ? "100px" : "0px",
          overflow: isOpen ? "unset" : "hidden",
        }}
      >
        <div className='for_setting_slider_div'>
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
          <div className='for_setting_slider_input'>
            <input type="text" value={`INR ${formatter(data[0])}`} className='for_setting_price' />
            <input type="text" value={`INR ${formatter(data[1])}`} className='for_setting_price' />
          </div>
        </div>
      </div>
    </div >
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
  loginCurrency,
  storeInit,
  handleMoveToDetail,
  selectedMetalId,
  metalType,
  getBannerImage,
  yellowImage,
  whiteImage,
  roseImage,
  location,
}) => {
  const [selectedMetalColor, setSelectedMetalColor] = useState(null);
  const [imageColor, setImageColor] = useRecoilState(for_MetalColor_Image);
  const getSessImgColor = JSON.parse(sessionStorage.getItem('imgColorCode'));
  const getSessCartWishImgColor = JSON.parse(sessionStorage.getItem('cartWishImgColor'));

  const activeColorCode = getSessImgColor || getSessCartWishImgColor;

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

  const bannerImg = getBannerImage(index);

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <>
      <div className="for_settingCard_mainDiv">
        {/* {bannerImg ? (
          <div className="for_settingList_listing_card_image_div">
            <img
              src={bannerImg}
              alt="Banner"
              width="100%"
            />
          </div>
        ) : (
          <> */}
        <div className="for_settingList_listing_card_div">
          {/* <div className="for_product_listing_ratings_div">
            <StyledRating
              name="simple-controlled"
              value={ratingvalue}
              size="small"
              className="for_product_listting_rating"
              readOnly
            />
          </div> */}
          <div className="forWeb_app_product_label_set">
            {productData?.IsInReadyStock == 1 && <span className="forWeb_app_instock">In Stock</span>}
            {productData?.IsBestSeller == 1 && <span className="forWeb_app_bestSeller">Best Seller</span>}
            {productData?.IsTrending == 1 && <span className="forWeb_app_intrending">Trending</span>}
            {productData?.IsNewArrival == 1 && <span className="forWeb_app_newarrival">New</span>}
          </div>
          <div className="for_settingList_listing_card_image_div"
            onClick={() => handleMoveToDetail(productData, selectedMetalColor)}
          >
            <img
              className="for_settingList_listing_card_image"
              loading="lazy"
              src={selectedMetalColor === 1 ? yellowImage : selectedMetalColor === 2 ? whiteImage : selectedMetalColor === 3 ? roseImage : imageUrl}
              onError={(e) => {
                e.target.onerror = null;
                e.stopPropagation();
                e.target.src = noImageFound;
              }}
              alt="Product"
            />
          </div>
          {/* <div className="for_settingList_metaltype_div">
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
        </div>
        <div className="for_settingList_card_description">
          <div className="for_settingList_metaltype_div">
            {metalColorType?.map((item) => (
              <button
                className={selectedMetalColor === item?.id ? `for_metaltype_${item?.metal}_clicked` : `for_metaltype_${item?.metal}`}
                key={item?.id}
                type='button'
                disabled={yellowImage === undefined}
                onClick={() => handleClick(item?.id)}
              >
                {""}
              </button>
            ))}
          </div>
          <div className="for_settingList_desc_title">
            <span className="for_listing_desc_span">{productData?.designno} {productData?.TitleLine?.length > 0 && " - " + productData?.TitleLine}</span>
          </div>
          <div className="for_settingList_desc_div">
            <div>
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
          <div className="for_settingList_price_div">
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
        {/* </>
        )} */}
      </div>
    </>
  )
}

