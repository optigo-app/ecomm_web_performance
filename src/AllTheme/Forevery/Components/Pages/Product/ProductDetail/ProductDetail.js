import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './Productdetail.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import btnstyle from "../../../scss/Button.module.scss";
import Slider from "react-slick";
import Cookies from 'js-cookie'
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { SingleProdListAPI } from '../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI';
import Pako from 'pako';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MetalTypeComboAPI } from '../../../../../../utils/API/Combo/MetalTypeComboAPI';
import { DiamondQualityColorComboAPI } from '../../../../../../utils/API/Combo/DiamondQualityColorComboAPI';
import { ColorStoneQualityColorComboAPI } from '../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI';
import { MetalColorCombo } from '../../../../../../utils/API/Combo/MetalColorCombo';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Dialog, DialogContent, FormControl, Rating, Skeleton, Step, Typography, useMediaQuery } from '@mui/material';
import { getSizeData } from '../../../../../../utils/API/CartAPI/GetCategorySizeAPI';
import { formatRedirectTitleLine, formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Services from '../../ReusableComponent/OurServives/OurServices';
import { StockItemApi } from '../../../../../../utils/API/StockItemAPI/StockItemApi';
import RelatedProduct from './RelatedProduct/RelatedProduct';
import NewsletterSignup from '../../ReusableComponent/SubscribeNewsLater/NewsletterSignup';
import { IoIosPlayCircle } from 'react-icons/io';
import { CartAndWishListAPI } from '../../../../../../utils/API/CartAndWishList/CartAndWishListAPI';
import { RemoveCartAndWishAPI } from '../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { for_CartCount, for_Loader, for_MetalColor_Image, for_WishCount, for_customizationSteps, for_customizationSteps1, for_loginState } from '../../../Recoil/atom';
import Faq from '../../ReusableComponent/Faq/Faq';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { responsiveConfig } from '../../../Config/ProductSliderConfig';
import { StepImages } from '../../../data/NavbarMenu';
import OurServices from '../../Home/Common/OurServices/OurServices';
import Stockitems from '../InstockProduct/Stockitems';
import { useImageZoom } from '../../../../../../hooks/UseImageZoom'
import { RxCross1 } from 'react-icons/rx';
import { SaveLastViewDesign } from '../../../../../../utils/API/SaveLastViewDesign/SaveLastViewDesign';
import PairSvg from '../../../Config/PairSvg';


const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobileView = useMediaQuery('(max-width:600px)');
  const isLoading = useRecoilValue(for_Loader)
  const sliderRef = useRef(null);
  const videoRef = useRef(null);
  const [stockItemArr, setStockItemArr] = useState([]);
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  let cookie = Cookies.get("visiterId");
  const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
  const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
  const csQcLocal = JSON.parse(sessionStorage.getItem('ColorStoneQualityColorCombo'));
  const mtColorLocal = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
  const [customizeStep, setCustomizeStep] = useRecoilState(for_customizationSteps);
  const [customizeStep1, setCustomizeStep1] = useRecoilState(for_customizationSteps);
  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const getImageColor = useRecoilValue(for_MetalColor_Image);
  const getSessImgColor = JSON.parse(sessionStorage.getItem('imgColorCode'));
  const getCartWishImgColor = JSON.parse(sessionStorage.getItem('cartWishImgColor')) ?? "";
  const [colorImgFromURL, setColorImgFromURL] = useState();
  const [colorImgFromCartWish, setColorImgFromCartWish] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [saveLastView, setSaveLastView] = useState();
  const [CustPath, setCustpath] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [completeSet, setCompleteSet] = useState(false);
  const [IsBreadCumShow, setIsBreadcumShow] = useState(false);
  const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId);
  const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid);
  const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid);
  const [metalType, setMetaltype] = useState([]);
  const [diamondType, setDiamondType] = useState([]);
  const [loginCurrency, setLoginCurrency] = useState();
  const [storeInit, setStoreInit] = useState({});
  const [metalTypeCombo, setMetalTypeCombo] = useState([])
  const [diaQcCombo, setDiaQcCombo] = useState([])
  const [csQcCombo, setCsQcCombo] = useState([])
  const [selectDiaQc, setSelectDiaQc] = useState();
  const [metalColor, setMetalColor] = useState();
  const [metalColorTitle, setMetalColorTitle] = useState();
  const [isImageload, setIsImageLoad] = useState(true);
  const [netWTData, setnetWTData] = useState([])
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [selectCsQC, setSelectCsQC] = useState();
  const [SizeCombo, setSizeCombo] = useState([]);
  const [sizeData, setSizeData] = useState();
  const [thumbImgIndex, setThumbImgIndex] = useState()
  const [pdThumbImg, setPdThumbImg] = useState([]);
  const [pdVideoArr, setPdVideoArr] = useState([]);
  const [selectedThumbImg, setSelectedThumbImg] = useState();
  const [singleProd, setSingleProd] = useState();
  const [singleProd1, setSingleProd1] = useState();
  const [singleDiaProd, setSingleDiaProd] = useState();
  const [diaList, setDiaList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [SimilarBrandArr, setSimilarBrandArr] = useState([]);
  const [isDataFound, setIsDataFound] = useState(false)
  const [isPriceloading, setisPriceLoading] = useState(false);
  const [decodeUrl, setDecodeUrl] = useState({})
  const [loadingdata, setloadingdata] = useState(false);
  const [pdImageLoading, setPdImageLoading] = useState(false);
  const [path, setpath] = useState();
  const [metalWiseColorImg, setMetalWiseColorImg] = useState()
  const [videoArr, SETvideoArr] = useState([]);
  const [setshape, setSetShape] = useState();
  const stepsData = JSON.parse(sessionStorage.getItem('custStepData2Ring'))
  const stepsData1 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'))
  const stepsData2 = JSON.parse(sessionStorage.getItem('custStepData2Earring'))
  const steps1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const stepsDatas = JSON.parse(sessionStorage.getItem('custStepData'));
  const [cartArr, setCartArr] = useState({});
  const ringSteps = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
  const pendantSteps = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
  const earringSteps = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));
  const getSettingTypeName = location?.pathname.split('/');
  const [showModal1, setShowModal1] = useState(false);
  const [shippingDate, setShippingDate] = useState('');
  const [navbarImage, setNavbarImage] = useState();
  const getRingImages = JSON.parse(sessionStorage.getItem('setImage')) ?? "";
  const getPendantImages = JSON.parse(sessionStorage.getItem('setPenImage')) ?? "";
  const getEarringImages = JSON.parse(sessionStorage.getItem('setEarImage')) ?? "";

  const handleToggle1 = () => {
    setShowModal1(!showModal1);
  }

  const shapeData = (() => {
    if (stepsDatas?.[1]?.step2Data?.ShapeName) {
      return stepsDatas?.[1];
    }
    if (stepsData?.[0]?.step1Data?.ShapeName && ringSteps?.[0]?.Status === "active") {
      return stepsData?.[0];
    }
    if (stepsData1?.[0]?.step1Data?.ShapeName && pendantSteps?.[0]?.Status === "active") {
      return stepsData1?.[0];
    }
    if (stepsData2?.[0]?.step1Data?.ShapeName && earringSteps?.[0]?.Status === "active") {
      return stepsData2?.[0];
    }
  })();

  const sendSteps = shapeData?.id === 1 ? ringSteps : shapeData?.id === 2 ? pendantSteps : earringSteps;


  const handleNoConfirm = () => {
    const getRingSteps = [...steps1];
    sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(getRingSteps));
    setShowModal1(false);
    navigate(`/certified-loose-lab-grown-diamonds/diamond/${getRingSteps?.[1]?.shape}`);
  };

  const [Swap, setswap] = useState("diamond");
  const breadCrumb = location?.pathname?.split("/")[2];

  const getImagePath = JSON.parse(sessionStorage?.getItem("setImage")) ?? "";

  const StyleCondition = {
    fontSize: breadCrumb === "settings" && "14px",
    fontWeight: breadCrumb === "settings" && "700",
  };

  useEffect(() => {
    const handleCompset = () => {
      const getSetShape = JSON.parse(sessionStorage.getItem('customizeSteps')) ?? (ringSteps?.[0]?.Status === "active" ? ringSteps : pendantSteps);
      setSetShape(getSetShape);
    }
    handleCompset();
  }, [])

  const isRingFlow = (ringSteps?.[0]?.Setting === 'Ring' && ringSteps?.[0]?.Status === 'active');
  const isPendantFlow = (pendantSteps?.[0]?.Setting === 'Pendant' && pendantSteps?.[0]?.Status === 'active');

  let isStepDataValid;
  if (isRingFlow) {
    isStepDataValid = stepsData?.[1]?.step2Data?.[0]?.id > 0 && isRingFlow;
  } else if (isPendantFlow) {
    isStepDataValid = stepsData1?.[1]?.step2Data?.[0]?.id > 0 && isPendantFlow;
  }


  const setCartCountVal = useSetRecoilState(for_CartCount)
  const setWishCountVal = useSetRecoilState(for_WishCount)
  const [addToCardFlag, setAddToCartFlag] = useState(null);
  const [wishListFlag, setWishListFlag] = useState(null);
  const [PdImageArr, setPdImageArr] = useState([]);
  const [imageSrc, setImageSrc] = useState();
  const [ratingvalue, setratingvalue] = useState(5);

  const imageUrl = storeInit?.CDNDesignImageFol;
  // const setImage = { "colorImage": `${imageUrl}${(singleProd1 ?? singleProd)?.designno}~1.${(singleProd1 ?? singleProd)?.ImageExtension}` }
  const setImage = { "colorImage": `${PdImageArr?.[0]?.src}` }

  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setCustpath(location?.pathname.split('/')[3])
  }, [location?.pathname])

  const services = [
    {
      title: 'Free Shipping',
      description: 'Now it\'s easier for customers to get the beautiful and sustainable diamonds they want without paying extra for shipping.',
      image: 'https://forevery.one/images_new/new-home/free-ship.png',
      link: '#',
      btnText: "Read More"
    },
    {
      title: 'Free 30 Day Returns',
      description: 'Forevery offers a hassle-free jewelry shopping experience with its 30-DAY Returns policy. Get ready to shop confidently.',
      image: 'https://forevery.one/images_new/new-home/free-return.png',
      link: '#',
      btnText: "Read More"
    },
    {
      title: 'Free Lifetime Warranty',
      description: 'Shop with Confidence; a lifetime warranty covers every piece of fine jewelry you buy.',
      image: 'https://forevery.one/images_new/new-home/waranty.png',
      link: '#',
      btnText: "Read More"
    },
    {
      title: '60-Days Free Resizing',
      description: 'Within 60 days of purchase, resize your jewelry to the perfect fit without any additional costs.',
      image: 'https://forevery.one/images_new/new-home/resizing.png',
      link: '#',
      btnText: "Read More"
    },
    {
      title: 'Free Engraving',
      description: 'Add sentimental value to the piece and make it a unique and meaningful gift.',
      image: 'https://forevery.one/images_new/new-home/engraving.png',
      link: '#',
      btnText: "Read More"
    }
  ];

  const handleThumbnailClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play();
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(videoElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    try {
      if (PdImageArr == undefined) return;

      if (PdImageArr) {
        setImageSrc(selectedThumbImg.src);
      } else {
        setImageSrc(pdVideoArr?.length > 0 ? imageNotFound : 'p.png');
      }
    } catch (error) {
      console.log("Error in fetching image", error)
    }

  }, [PdImageArr, pdVideoArr]);


  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    loop: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => setCurrentSlide(next),
    afterChange: (current) => setCurrentSlide(current),
    responsive: responsiveConfig,
  };

  const callAllApi = async () => {
    if (!mTypeLocal || mTypeLocal?.length === 0) {
      const res = await MetalTypeComboAPI(cookie);
      if (res) {
        let data = res?.Data?.rd;
        sessionStorage.setItem("metalTypeCombo", JSON.stringify(data));
        setMetalTypeCombo(data);
      }
      else {
        console.log("error")
      }
    } else {
      setMetalTypeCombo(mTypeLocal);
    }

    if (!diaQcLocal || diaQcLocal?.length === 0) {
      const res = await DiamondQualityColorComboAPI();
      if (res) {
        let data = res?.Data?.rd;
        sessionStorage.setItem("diamondQualityColorCombo", JSON.stringify(data));
        setDiaQcCombo(data);
      }
      else {
        console.log("error")
      }
    } else {
      setDiaQcCombo(diaQcLocal)
    }

    if (!csQcLocal || csQcLocal?.length === 0) {
      const res = await ColorStoneQualityColorComboAPI();
      if (res) {
        let data = res?.Data?.rd;
        sessionStorage.setItem("ColorStoneQualityColorCombo", JSON.stringify(data));
        setCsQcCombo(data);
      }
      else {
        console.log("error")
      }
    } else {
      setCsQcCombo(csQcLocal)
    }

    if (!mtColorLocal || mtColorLocal?.length === 0) {
      const res = await MetalColorCombo(cookie);
      if (res) {
        let data = res?.Data?.rd;
        sessionStorage.setItem("MetalColorCombo", JSON.stringify(data));
        setMetalColorCombo(data);
      }
      else {
        console.log("error")
      }
    } else {
      setMetalColorCombo(mtColorLocal)
    }
  }

  useEffect(() => {
    callAllApi();
  }, [storeInit])

  function getDayName(dateStr, locale) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        const addToDate = (singleProd1 ?? singleProd)?.MakeOrderDays;

        const today = new Date();
        const shippingDate = new Date(today);
        shippingDate.setDate(today?.getDate() + addToDate);

        const formattedDate = shippingDate.toLocaleDateString('en-IN', {
          month: "long",
          day: "numeric",
        })

        const dayName = getDayName(shippingDate, "en-IN");

        const ShipDate = `${dayName}, ${formattedDate?.split(' ')[1] + " " + formattedDate?.split(' ')[0]}`;

        setShippingDate(ShipDate);

      } catch (error) {
        console.error('Error fetching shipping data:', error);
      }
    }

    fetchShippingData();
  }, [singleProd1, singleProd])


  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];
    let decodeobj = decodeAndDecompress(navVal);

    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));

    let csQcLocal = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"));


    setTimeout(() => {
      if (decodeUrl) {
        let metalArr
        let diaArr
        let csArr

        let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
        let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));


        if (mtTypeLocal?.length) {
          metalArr =
            mtTypeLocal?.filter((ele) => ele?.Metalid == (decodeobj?.m ? decodeobj?.m : (logininfoInside?.MetalId ?? storeinitInside?.MetalId)))[0]
        }

        if (diaQcLocal?.length) {
          diaArr =
            diaQcLocal?.filter(
              (ele) =>
                ele?.QualityId == (decodeobj?.d ? decodeobj?.d?.split(",")[0] :
                  (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid).split(",")[0]) &&
                ele?.ColorId == (decodeobj?.d ? decodeobj?.d?.split(",")[1] : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid).split(",")[1])
            )[0] ?? diaQcLocal[0];
        }

        if (csQcLocal?.length) {
          csArr =
            csQcLocal?.filter(
              (ele) =>
                ele?.QualityId == (decodeobj?.c ? decodeobj?.c?.split(",")[0] : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid).split(",")[0]) &&
                ele?.ColorId == (decodeobj?.c ? decodeobj?.c?.split(",")[1] : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid).split(",")[1])
            )[0]
        }
        setMetaltype(metalArr?.metaltype);

        setSelectDiaQc(`${diaArr?.Quality},${diaArr?.color}`);

        setSelectCsQC(`${csArr?.Quality},${csArr?.color}`);
      }
    }, 500)
  }, [singleProd])



  const handleCustomChange = async (e, type) => {
    let metalArr;
    let diaArr;
    let csArr;
    let size;

    if (type === 'mt') {
      metalArr = mTypeLocal?.find((ele) => {
        return ele?.metaltype === e.target.value
      })?.Metalid;
      setMetaltype(e.target.value)
      if (metalArr) {
        setSelectedMetalId(metalArr);
      } else {
        setSelectedMetalId('');
      }
    }
    if (type === 'mc') {
      setMetalColor(e.target.value)
    }
    if (type === 'dt') {
      diaArr = diaQcLocal?.find((ele) => {
        return ele?.Quality === e.target.value?.split(',')[0] &&
          ele?.color === e.target.value?.split(",")[1]
      })
      setSelectDiaQc(e.target.value)
      if (diaArr) {
        setSelectedDiaId(`${diaArr.QualityId},${diaArr.ColorId}`);
      } else {
        setSelectedDiaId('');
      }
    }
    if (type === 'cs') {
      csArr = csQcLocal.find((ele) => {
        return ele?.Quality === e.target.value?.split(',')[0] &&
          ele?.color === e.target.value?.split(",")[1]
      })
      setSelectCsQC(e.target.value)
    }
    if (type === "size") {
      setSizeData(e.target.value)
      size = e.target.value
    }

    if (metalArr == undefined) {
      metalArr =
        mTypeLocal?.filter(
          (ele) => ele?.metaltype == metalType
        )[0]?.Metalid
    }

    if (diaArr == undefined) {
      diaArr =
        diaQcLocal?.filter(
          (ele) =>
            ele?.Quality == selectDiaQc?.split(",")[0] &&
            ele?.color == selectDiaQc?.split(",")[1]
        )[0]
    }

    if (csArr == undefined) {
      csArr =
        csQcLocal?.filter(
          (ele) =>
            ele?.Quality == selectCsQC?.split(",")[0] &&
            ele?.color == selectCsQC?.split(",")[1]
        )[0]
    }

    let obj = {
      mt: metalArr,
      diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
      csQc: `${csArr?.QualityId},${csArr?.ColorId}`
    }


    let prod = {
      a: singleProd?.autocode,
      b: singleProd?.designno
    }

    setisPriceLoading(true)
    const res = await SingleProdListAPI(prod, (size ?? sizeData), obj, cookie)
    if (res) {
      setSingleProd1(res?.pdList[0])
    }

    if (res?.pdList?.length > 0) {
      setisPriceLoading(false)
    }
    setnetWTData(res?.pdList[0])
    setDiaList(res?.pdResp?.rd3)
    setCsList(res?.pdResp?.rd4)
  }

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const BreadCumsObj = () => {
    let BreadCum = location?.search.split("?p=")[1];
    let decodeobj = decodeAndDecompress(BreadCum);

    const values = BreadCum[0].split(',');
    const labels = BreadCum[1].split(',');

    const updatedBreadCum = labels.reduce((acc, label, index) => {
      acc[label] = values[index] || '';
      return acc;
    }, {});

    const result = Object.entries(updatedBreadCum).reduce((acc, [key, value], index) => {
      acc[`FilterKey${index === 0 ? '' : index}`] = key.charAt(0).toUpperCase() + key.slice(1);
      acc[`FilterVal${index === 0 ? '' : index}`] = value;
      return acc;
    }, {});

    // decodeURI(location?.pathname).slice(3).slice(0,-1).split("/")[0]

    result.menuname = decodeURI(location?.pathname).slice(3).slice(0, -1).split("/")[0]

    return result
  }

  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];
    let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
    let decodeobj = decodeAndDecompress(navVal);
    if (decodeobj) {
      setDecodeUrl(decodeobj);
      setpath(decodeobj?.p)
      setColorImgFromURL(decodeobj?.cmc)
      setColorImgFromCartWish(decodeobj?.mc)
    }

    let mtTypeLocal = JSON.parse(sessionStorage.getItem("metalTypeCombo"));

    let diaQcLocal = JSON.parse(
      sessionStorage.getItem("diamondQualityColorCombo")
    );

    let csQcLocal = JSON.parse(
      sessionStorage.getItem("ColorStoneQualityColorCombo")
    );

    let metalArr;
    let diaArr;
    let csArr;

    if (mtTypeLocal?.length) {
      metalArr =
        mtTypeLocal?.filter(
          (ele) => ele?.Metalid == decodeobj?.m
        )[0]?.Metalid ?? decodeobj?.m;
    }

    if (diaQcLocal) {
      diaArr =
        diaQcLocal?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.d?.split(",")[0] &&
            ele?.ColorId == decodeobj?.d?.split(",")[1]
        )[0] ?? `${decodeobj?.d?.split(",")[0]},${decodeobj?.d?.split(",")[1]}`;
    }

    if (csQcLocal) {
      csArr =
        csQcLocal?.filter(
          (ele) =>
            ele?.QualityId == decodeobj?.c?.split(",")[0] &&
            ele?.ColorId == decodeobj?.c?.split(",")[1]
        )[0] ?? `${decodeobj?.c?.split(",")[0]},${decodeobj?.c?.split(",")[1]}`;
    }

    setloadingdata(true);
    setIsBreadcumShow(true);
    const FetchProductData = async () => {
      let obj = {
        mt: metalArr,
        diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
        csQc: `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`,
      };

      setisPriceLoading(true);

      await SingleProdListAPI(decodeobj, sizeData, obj, cookie)
        .then(async (res) => {
          if (res) {
            setSingleProd(res?.pdList[0]);
            setSingleDiaProd(res?.pdResp?.rd3);

            if (res?.pdList?.length > 0) {
              setisPriceLoading(false);
              setloadingdata(false);
            }

            if (!res?.pdList[0]) {
              setisPriceLoading(false);
              setIsDataFound(true);
            }
            else {
              setIsDataFound(false)
            }

            setDiaList(res?.pdResp?.rd3);
            setCsList(res?.pdResp?.rd4);

            let prod = res?.pdList[0];

            let resp = res;
            if (resp) {
              await getSizeData(resp?.pdList[0], cookie)
                .then((res) => {
                  setSizeCombo(res?.Data);
                })
                .catch((err) => console.log("SizeErr", err));

              if (storeinitInside?.IsStockWebsite === 1) {
                await StockItemApi(resp?.pdList[0]?.autocode, "stockitem", cookie).then((res) => {
                  setStockItemArr(res?.Data?.rd)
                }).catch((err) => console.log("stockItemErr", err))
              }

              if (storeinitInside?.IsProductDetailSimilarDesign === 1) {
                await StockItemApi(resp?.pdList[0]?.autocode, "similarbrand", obj, cookie).then((res) => {
                  setSimilarBrandArr(res?.Data?.rd)
                }).catch((err) => console.log("similarbrandErr", err))
              }

              await SaveLastViewDesign(cookie, resp?.pdList[0]?.autocode, resp?.pdList[0]?.designno).then((res) => {
                setSaveLastView(res?.Data?.rd)
              }).catch((err) => console.log("saveLastView", err))

            }

            let initialsize =
              prod && prod.DefaultSize !== ""
                ? prod?.DefaultSize
                : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)
                  ?.sizename === undefined
                  ? SizeCombo?.rd[0]?.sizename
                  : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)
                    ?.sizename;

            setSizeData(initialsize);

            // await SingleFullProdPriceAPI(decodeobj).then((res) => {
            //   setSingleProdPrice(res);
            //   console.log("singlePrice", res);
            // });
          }
          return res;
        })
        // .then(async (resp) => {

        // })
        .catch((err) => console.log("err", err))
        .finally(() => setloadingdata(false));
    };

    FetchProductData();

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [location?.key]);

  const decodeAndDecompress = (encodedString) => {
    try {
      const binaryString = atob(encodedString);

      const unit8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString?.length; i++) {
        unit8Array[i] = binaryString.charCodeAt(i)
      }

      const decompressed = Pako.inflate(unit8Array, { to: 'string' });

      const jsonObject = JSON.parse(decompressed);

      return jsonObject;
    } catch (error) {
      console.error("Error decoding and decompressing:", error);
      return null;
    }
  }

  const ProdCardImageFunc = async () => {
    let colImg;
    let finalprodListimg;
    let pdImgList = [];
    let pdvideoList = [];

    let pd = singleProd;

    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;
    let mcArr1;

    // const activeColorCode = getImageColor || getSessImgColor;
    const activeColorCode = colorImgFromURL ?? colorImgFromCartWish;

    if (activeColorCode !== "" && activeColorCode !== undefined && activeColorCode !== null) {
      const getAllMetalColor = mtColorLocal?.find((ele) => ele?.id === colorImgFromCartWish);
      if (getAllMetalColor?.id) {
        mcArr1 = getAllMetalColor?.colorcode;
      }
      if (colorImgFromURL === 1) {
        const getYellowImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Yellow')?.colorcode;
        mcArr1 = getYellowImage;
      }
      if (colorImgFromURL === 2) {
        const getWhiteImage = mtColorLocal?.find((ele) => ele?.colorcode === 'White')?.colorcode;
        mcArr1 = getWhiteImage
      }
      if (colorImgFromURL === 3) {
        const getRoseImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Rose')?.colorcode;
        mcArr1 = getRoseImage
      }
    } else {
      if (mtColorLocal?.length) {
        mcArr = mtColorLocal?.filter(
          (ele) => ele?.id == singleProd?.MetalColorid
        )[0];
      }
    }

    if (singleProd?.ColorImageCount > 0) {
      for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          i +
          "~" +
          (activeColorCode !== "" && activeColorCode !== undefined && activeColorCode !== null ? mcArr1 : mcArr?.colorcode) +
          "." +
          singleProd?.ImageExtension;

        let IsImg = checkImageAvailability(imgString);
        if (IsImg) {
          pdImgList.push(imgString);
        }
      }

      if (pdImgList?.length > 0) {
        colImg = pdImgList[0];
      }
    }

    let IsColImg = false;
    if (colImg?.length > 0) {
      IsColImg = await checkImageAvailability(colImg);
    }

    if (pd?.ImageCount > 0 && !IsColImg) {
      for (let i = 1; i <= pd?.ImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          pd?.designno +
          "~" +
          i +
          "." +
          pd?.ImageExtension;

        let IsImg = checkImageAvailability(imgString);
        if (IsImg) {
          pdImgList.push(imgString);
        }
      }
    } else {
      finalprodListimg = imageNotFound;
    }

    if (pd?.VideoCount > 0) {
      for (let i = 1; i <= pd?.VideoCount; i++) {
        let videoString =
          (storeInit?.CDNVPath) + pd?.designno +
          "~" +
          i +
          "." +
          pd?.VideoExtension;
        pdvideoList.push(videoString);
      }
    } else {
      pdvideoList = [];
    }

    let FinalPdImgList = [];

    if (pdImgList?.length > 0) {
      for (let i = 0; i < pdImgList?.length; i++) {
        let isImgAvl = await checkImageAvailability(pdImgList[i]);
        if (isImgAvl) {
          FinalPdImgList.push(pdImgList[i]);
        }
      }
    }

    if (FinalPdImgList?.length > 0) {
      finalprodListimg = FinalPdImgList[0];
      setSelectedThumbImg({ link: FinalPdImgList[0], type: "img" });
      setPdThumbImg(FinalPdImgList);
      setThumbImgIndex(0);
      const imageMap = FinalPdImgList?.map((val, i) => {
        return { src: val, type: "img" };
      });
      setPdImageArr(imageMap);
    }

    if (pdvideoList?.length > 0) {
      setPdVideoArr(pdvideoList);
      const VideoMap = pdvideoList?.map((val, i) => {
        return { src: val, type: "video" };
      });
      SETvideoArr(VideoMap);
      setPdImageArr((prev) => [...prev, ...VideoMap]);
    }


    setPdImageLoading(false)
    return finalprodListimg;
  };

  useEffect(() => {
    setPdImageLoading(true)
    ProdCardImageFunc();
  }, [singleProd]);

  const handleMetalWiseColorImg = async (e) => {
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr = mtColorLocal.find((ele) => ele?.colorcode == e.target.value);
    }

    setMetalColor(e.target.value);

    let imgLink =
      storeInit?.CDNDesignImageFol +
      (singleProd ?? singleProd1)?.designno +
      "~" +
      (thumbImgIndex + 1) +
      "~" +
      mcArr?.colorcode +
      "." +
      (singleProd ?? singleProd1)?.ImageExtension;

    let isImg = await checkImageAvailability(imgLink);

    if (isImg) {
      setMetalWiseColorImg(imgLink);
    } else {
      setMetalWiseColorImg();
    }

    let pdImgListCol = [];
    let pdImgList = [];

    if (singleProd?.ColorImageCount > 0) {
      const colorImgPromises = Array.from({ length: singleProd.ColorImageCount }, async (_, i) => {
        let imgString =
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          (i + 1) +
          "~" +
          mcArr?.colorcode +
          "." +
          singleProd?.ImageExtension;

        return (await checkImageAvailability(imgString)) ? imgString : null;
      });

      pdImgListCol = (await Promise.all(colorImgPromises)).filter(Boolean);
    }

    if (singleProd?.ImageCount > 0) {
      const defaultImgPromises = Array.from({ length: singleProd.ImageCount }, async (_, i) => {
        let imgString =
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          (i + 1) +
          "." +
          singleProd?.ImageExtension;

        return (await checkImageAvailability(imgString)) ? imgString : null;
      });

      pdImgList = (await Promise.all(defaultImgPromises)).filter(Boolean);
    }

    if (pdImgListCol.length > 0) {
      setSelectedThumbImg({ link: pdImgListCol[thumbImgIndex], type: "img" });
      setPdThumbImg(pdImgListCol);
      setThumbImgIndex(thumbImgIndex);
      const imageMap = pdImgListCol.map((val) => ({ src: val, type: "img" }));
      setPdImageArr([...imageMap, ...videoArr]);
    } else if (pdImgList.length > 0) {
      setSelectedThumbImg({ link: pdImgList[thumbImgIndex], type: "img" });
      setPdThumbImg(pdImgList);
      setThumbImgIndex(thumbImgIndex);
      const imageMap = pdImgList.map((val) => ({ src: val, type: "img" }));
      setPdImageArr([...imageMap, ...videoArr]);
    }

    setPdImageLoading(false);
  };

  const handleMetalWiseColorImgWithFlag = async (e) => {

    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr =
        mtColorLocal?.filter(
          (ele) => ele?.colorcode == e.target.value
        )[0]
    }

    setMetalColor(e.target.value)

  }

  useEffect(() => {
    if (metalTypeCombo.length) {
      const mtType = metalTypeCombo?.find(ele => ele.Metalid === singleProd?.MetalPurityid)?.metaltype;
      setMetaltype(mtType);

      if (metalColorCombo.length) {
        const mtColor = metalColorCombo?.find(ele => ele.id === singleProd?.MetalColorid)?.colorcode;
        setMetalColorTitle(mtColor);
      }
    }

    // const activeColorCode = getImageColor || getSessImgColor;
    // const activeColorCode = colorImgFromURL ?? getSessImgColor;
    const activeColorCode = colorImgFromURL ?? colorImgFromCartWish;
    if (metalColorCombo.length) {
      if (activeColorCode !== "" && activeColorCode !== undefined && activeColorCode !== null) {
        const getAllMetalColor = mtColorLocal?.find((ele) => ele?.id === colorImgFromCartWish);
        if (getAllMetalColor?.id) {
          setMetalColor(getAllMetalColor?.colorcode);
        }
        if (colorImgFromURL === 1) {
          const getYellowImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Yellow')?.colorcode;
          setMetalColor(getYellowImage)
        }
        if (colorImgFromURL === 2) {
          const getWhiteImage = mtColorLocal?.find((ele) => ele?.colorcode === 'White')?.colorcode;
          setMetalColor(getWhiteImage)
        }
        if (colorImgFromURL === 3) {
          const getRoseImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Rose')?.colorcode;
          setMetalColor(getRoseImage)
        }
      }
      else {
        const getCurrentMetalColor = mtColorLocal?.find((ele) => ele?.id === singleProd?.MetalColorid)?.colorcode;
        setMetalColor(getCurrentMetalColor);
      }
    }
  }, [singleProd])

  useEffect(() => {
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr =
        mtColorLocal?.filter(
          (ele) => ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
        )[0]
    }

    // const activeColorCode = colorImgFromURL ?? getSessImgColor;
    // const activeColorCode = getImageColor || getSessImgColor;
    const activeColorCode = colorImgFromURL ?? colorImgFromCartWish;

    if (activeColorCode !== "" && activeColorCode !== undefined && activeColorCode !== null) {
      const getAllMetalColor = mtColorLocal?.find((ele) => ele?.id === colorImgFromCartWish);
      if (getAllMetalColor?.id) {
        setMetalColor(getAllMetalColor?.colorcode);
      }
      if (colorImgFromURL === 1) {
        const getYellowImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Yellow')?.colorcode;
        setMetalColor(getYellowImage)
      }
      if (colorImgFromURL === 2) {
        const getWhiteImage = mtColorLocal?.find((ele) => ele?.colorcode === 'White')?.colorcode;
        setMetalColor(getWhiteImage)
      }
      if (colorImgFromURL === 3) {
        const getRoseImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Rose')?.colorcode;
        setMetalColor(getRoseImage)
      }
    }
    else {
      const getCurrentMetalColor = mtColorLocal?.find((ele) => ele?.id === singleProd?.MetalColorid)?.colorcode;
      setMetalColor(getCurrentMetalColor);
    }

    // setMetalColor(mcArr?.colorname);

  }, [singleProd])

  useEffect(() => {
    const isInCart = singleProd?.IsInCart === 0 ? false : true;
    setAddToCartFlag(isInCart);
  }, [singleProd])

  const handleCart = async (cartFlag) => {
    const metal =
      metalTypeCombo?.find((ele) => {
        return ele?.metaltype == metalType
      }) ?? metalTypeCombo;

    const dia =
      diaQcCombo?.find((ele) => {
        return ele?.Quality == selectDiaQc?.split(",")[0] &&
          ele?.color == selectDiaQc?.split(",")[1]
      }) ?? diaQcCombo;

    const cs =
      csQcCombo?.find((ele) => {
        return ele?.Quality == selectCsQC?.split(",")[0] &&
          ele?.color == selectCsQC?.split(",")[1]
      }) ?? csQcCombo;

    let mcArr;
    let mcArr1;

    // const activeColorCode = colorImgFromURL || getSessImgColor;
    // const activeColorCode = getImageColor || getSessImgColor;
    const activeColorCode = colorImgFromURL ?? colorImgFromCartWish;

    if (activeColorCode !== "" && activeColorCode !== undefined && activeColorCode !== null) {
      const getAllMetalColor = mtColorLocal?.find((ele) => ele?.id === colorImgFromCartWish);
      if (getAllMetalColor?.id) {
        mcArr1 = getAllMetalColor?.colorcode;
      }
      if (colorImgFromURL === 1) {
        const getYellowImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Yellow')?.colorcode;
        mcArr1 = getYellowImage;
      }
      if (colorImgFromURL === 2) {
        const getWhiteImage = mtColorLocal?.find((ele) => ele?.colorcode === 'White')?.colorcode;
        mcArr1 = getWhiteImage
      }
      if (colorImgFromURL === 3) {
        const getRoseImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Rose')?.colorcode;
        mcArr1 = getRoseImage
      }
    }

    mcArr =
      metalColorCombo?.find((ele) => {
        return ele?.colorcode == metalColor
      }) ?? metalColorCombo;

    setImageSrc(mcArr?.id);
    sessionStorage.setItem('cartWishImgColor', JSON.stringify(mcArr?.id ?? ""))

    const prodObj = {
      autocode: singleProd?.autocode ?? 0,
      Metalid: metal?.Metalid ?? 0,
      MetalColorId: `${(mcArr1 === mcArr?.id ? mcArr1 : (mcArr?.id ?? singleProd?.MetalColorid)) ?? 0}`,
      DiaQCid: `${dia?.QualityId ?? 0},${dia?.ColorId ?? 0}`,
      CsQCid: `${cs?.QualityId ?? 0},${cs?.ColorId ?? 0}`,
      Size: sizeData ?? singleProd?.DefaultSize,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup: singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
    }

    if (cartFlag) {
      let res = await CartAndWishListAPI("Cart", prodObj, cookie);
      if (res) {
        try {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        } catch (error) {
          console.log("err", error)
        }
        setAddToCartFlag(cartFlag);
      }
    }
    else {
      let res1 = await RemoveCartAndWishAPI("Cart", singleProd?.autocode, cookie);
      if (res1) {
        try {
          let cartC = res1?.Data?.rd[0]?.Cartlistcount;
          let wishC = res1?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        } catch (error) {
          console.log("err", error);
        }
        setAddToCartFlag(cartFlag);
      }
    }
  }

  const handleWishList = async (e, ele) => {
    setWishListFlag(e?.target?.checked);

    const metal =
      metalTypeCombo?.find((ele) => {
        return ele?.metaltype == metalType
      }) ?? metalTypeCombo;

    const dia =
      diaQcCombo?.find((ele) => {
        return ele?.Quality == selectDiaQc?.split(",")[0] &&
          ele?.color == selectDiaQc?.split(",")[1]
      }) ?? diaQcCombo;

    const cs =
      csQcCombo?.find((ele) => {
        return ele?.Quality == selectCsQC?.split(",")[0] &&
          ele?.color == selectCsQC?.split(",")[1]
      }) ?? csQcCombo;

    const mcArr =
      metalColorCombo?.find((ele) => {
        return ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
      }) ?? metalColorCombo;

    const prodObj = {
      autocode: singleProd?.autocode ?? 0,
      Metalid: metal?.Metalid ?? 0,
      MetalColorId: `${(mcArr?.id ?? singleProd?.MetalColorid) ?? 0}`,
      DiaQCid: `${dia?.QualityId ?? 0},${dia?.ColorId ?? 0}`,
      CsQCid: `${cs?.QualityId ?? 0},${cs?.ColorId ?? 0}`,
      Size: sizeData ?? singleProd?.DefaultSize,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup: singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
    }

    if (e.target.checked === true) {
      let res = await CartAndWishListAPI("Wish", prodObj, cookie);
      if (res) {
        try {
          let cartC = res?.Data?.rd[0]?.Cartlistcount;
          let wishC = res?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        } catch (error) {
          console.log("err", error)
        }
      }
    }
    else {
      let res1 = await RemoveCartAndWishAPI("Wish", singleProd?.autocode, cookie);
      if (res1) {
        try {
          let cartC = res1?.Data?.rd[0]?.Cartlistcount;
          let wishC = res1?.Data?.rd[0]?.Wishlistcount;
          setWishCountVal(wishC);
          setCartCountVal(cartC);
        } catch (error) {
          console.log("err", error);
        }
      }
    }
  }

  const handleCartandWish = (e, ele, type) => {
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let prodObj = {
      StockId: ele?.StockId,
      // "autocode": ele?.autocode,
      // "Metalid": ele?.MetalPurityid,
      // "MetalColorId": ele?.MetalColorid,
      // "DiaQCid": loginInfo?.cmboDiaQCid,
      // "CsQCid": loginInfo?.cmboCSQCid,
      // "Size": ele?.Size,
      Unitcost: ele?.Amount,
      // "UnitCostWithmarkup": ele?.Amount,
      // "Remark": ""
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
      RemoveCartAndWishAPI(type, ele?.StockId, cookie, true)
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
        [ele?.StockId]: e.target.checked,
      }));
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

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(data);

    const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    setLoginCurrency(loginData)
    setLoginData(loginData)

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


  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])

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

  const handleMoveToDetail = (productData) => {
    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: selectedMetalId,
      d: selectedDiaId,
      c: selectedCsId,
      p: BreadCumsObj(),
      f: {},
    };
    // compressAndEncode(JSON.stringify(obj))

    // decodeAndDecompress()

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    // navigate(
    //   `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
    //   }${productData?.designno}?p=${encodeObj}`
    // );
    navigate(`/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`);
  };

  const SizeSorting = (SizeArr) => {

    let SizeSorted = SizeArr?.sort((a, b) => {
      const nameA = parseInt(a?.sizename?.toUpperCase()?.slice(0, -2), 10);
      const nameB = parseInt(b?.sizename?.toUpperCase()?.slice(0, -2), 10);

      return nameA - nameB;
    })

    return SizeSorted

  }

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleButtonChange = (type) => {
    const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
    const stepsData = JSON.parse(sessionStorage.getItem('custStepData'));
    const SettingSteps = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
    const SettingSteps1 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
    const SettingSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));
    const stepData = JSON.parse(sessionStorage.getItem("custStepData2Ring"));
    const stepData1 = JSON.parse(sessionStorage.getItem("custStepData2Pendant"));
    const stepData2 = JSON.parse(sessionStorage.getItem("custStepData2Earring"));

    let mcArr;
    let mcArr1;

    const imageUrl = storeInit?.CDNDesignImageFol;
    // const setImage = { "colorImage": `${imageUrl}${(singleProd1 ?? singleProd)?.designno}~1.${(singleProd1 ?? singleProd)?.ImageExtension}` }
    const setImage = { "colorImage": `${PdImageArr?.[0]?.src}` }
    const checkDesignNo = (getRingImages ?? getPendantImages ?? getEarringImages)?.colorImage?.split('/')?.[7]?.split('~')[0];

    const shapeName = (singleProd1?.ShapeName ?? singleProd?.ShapeName)
      ?.charAt(0).toUpperCase() + (singleProd1?.ShapeName ?? singleProd?.ShapeName)?.slice(1).toLowerCase();

    const activeColorCode = colorImgFromURL ?? colorImgFromCartWish;

    if (activeColorCode !== "" && activeColorCode !== undefined && activeColorCode !== null) {
      const getAllMetalColor = mtColorLocal?.find((ele) => ele?.id === colorImgFromCartWish);
      if (getAllMetalColor?.id) {
        mcArr1 = getAllMetalColor?.id;
      }
      if (colorImgFromURL === 1) {
        const getYellowImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Yellow')?.id;
        mcArr1 = getYellowImage;
      }
      if (colorImgFromURL === 2) {
        const getWhiteImage = mtColorLocal?.find((ele) => ele?.colorcode === 'White')?.id;
        mcArr1 = getWhiteImage
      }
      if (colorImgFromURL === 3) {
        const getRoseImage = mtColorLocal?.find((ele) => ele?.colorcode === 'Rose')?.id;
        mcArr1 = getRoseImage
      }
    }

    mcArr =
      metalColorCombo?.find((ele) => {
        return ele?.colorcode == metalColor
      }) ?? metalColorCombo;

    setImageSrc(mcArr?.id);
    sessionStorage.setItem('cartWishImgColor', JSON.stringify(mcArr?.id))

    const validCondition = type !== "hasData" && shapeName;
    const validDesignCondition = type === "hasData" && (checkDesignNo === ((singleProd1 ?? singleProd)?.designno));

    if (validCondition || validDesignCondition) {
      if (getSettingTypeName.includes('Engagement_Ring')) {
        sessionStorage.setItem('setImage', JSON.stringify(setImage));
      } else if (getSettingTypeName.includes('Diamond_Pendants')) {
        sessionStorage.setItem('setPenImage', JSON.stringify(setImage));
      } else if (getSettingTypeName.includes('Diamond_Earrings')) {
        sessionStorage.setItem('setEarImage', JSON.stringify(setImage));
      }
    }

    if (colorImgFromURL) {
      if (mcArr ?? mcArr1) {
        (singleProd.MetalColorid = mcArr?.id ?? mcArr1) ?? (singleProd1.MetalColorid = mcArr?.id ?? mcArr1)
      }
    }

    if (colorImgFromCartWish) {
      if (mcArr ?? mcArr1) {
        (singleProd.MetalColorid = mcArr?.id ?? mcArr1) ?? (singleProd1.MetalColorid = mcArr?.id ?? mcArr1)
      }
    }

    if ((steps?.[0] == undefined || steps?.[0] == null) || (steps?.[1] == undefined || steps?.[1] == null)) {
      const step1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
      const step2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
      const step3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));

      if (type === "hasData") {
        const step1Index = (stepData ?? stepData1)?.findIndex(item => item.step1Data !== undefined);

        const updatedStepData = [...(stepData ?? stepData1)];
        if (step1Index !== -1) {
          updatedStepData[step1Index] = { "step1Data": singleProd1 ?? singleProd, 'selectedMetalId': selectedMetalId, 'selectedDiaId': selectedDiaId, 'selectedCsId': selectedCsId };
        } else {
          updatedStepData.unshift({ "step1Data": singleProd1 ?? singleProd, 'selectedMetalId': selectedMetalId, 'selectedDiaId': selectedDiaId, 'selectedCsId': selectedCsId });
        }

        if (updatedStepData?.[0]?.id === 1 && step1?.[0]?.Status === "active") {
          sessionStorage.setItem('custStepData2Ring', JSON.stringify(updatedStepData));
        }

        if (updatedStepData?.[0]?.id === 2 && step2?.[0]?.Status === "active") {
          sessionStorage.setItem('custStepData2Pendant', JSON.stringify(updatedStepData));
        }

        if (updatedStepData?.[0]?.id === 3 && step3?.[0]?.Status === "active") {
          sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(updatedStepData));
        }

        if ((singleProd1 ?? singleProd)?.ShapeName === (stepsData?.[1]?.step2Data?.ShapeName ??
          (stepData?.[0]?.step1Data?.ShapeName && SettingSteps?.[0]?.Status === 'active') ? stepData?.[0]?.step1Data?.ShapeName : (stepData1?.[0]?.step1Data?.ShapeName && SettingSteps1?.[0]?.Status === 'active') ? stepData1?.[0]?.step1Data?.ShapeName : stepData2?.[0]?.step1Data?.ShapeName)) {
          navigate(`/d/setting-complete-product/det345/?p=${(step1?.[2]?.url ?? step2?.[2]?.url)}`);
        } else {
          setShowModal1(true);
        }
      }
      else {
        // Replace or add the step2 entry in the step1 data
        // const updatedStep1 = (SettingSteps ?? SettingSteps1)?.map(step => {
        //   if (step.step2 !== undefined) {
        //     // Replace existing step2 data
        //     return { "step2": true, "shape": 'Oval' };
        //   }
        //   return step;
        // });

        let updatedStep1;
        if (SettingSteps?.[0]?.Status === 'active') {
          updatedStep1 = SettingSteps;
        }
        if (SettingSteps1?.[0]?.Status === 'active') {
          updatedStep1 = SettingSteps1;
        }
        if (SettingSteps2?.[0]?.Status === 'active') {
          updatedStep1 = SettingSteps2;
        }

        // If no existing step2, add new entry
        if (!updatedStep1.some(step => step.step2 !== undefined) && updatedStep1?.[0]?.Status === "active") {
          updatedStep1.push({
            "step2": true,
            "shape": shapeName,
            id: SettingSteps?.[0]?.Status === 'active' ? 1 : SettingSteps1?.[0]?.Status === 'active' ? 2 : 3
          });
        }

        const step1Data = [{ "step1Data": singleProd1 ?? singleProd, 'selectedMetalId': selectedMetalId, 'selectedDiaId': selectedDiaId, 'selectedCsId': selectedCsId, 'id': SettingSteps?.[0]?.Status === 'active' ? 1 : SettingSteps1?.[0]?.Status === 'active' ? 2 : 3 }]

        if (shapeName) {

          if (step1Data?.[0]?.id === 1 && step1?.[0]?.Status === "active") {
            sessionStorage.setItem('ringFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/diamond/${shapeName}`))
            sessionStorage.setItem('custStepData2Ring', JSON.stringify(step1Data));
          }

          if (step1Data?.[0]?.id === 2 && step2?.[0]?.Status === "active") {
            sessionStorage.setItem('PendantFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/diamond/${shapeName}`))
            sessionStorage.setItem('custStepData2Pendant', JSON.stringify(step1Data));
          }

          if (step1Data?.[0]?.id === 3 && step3?.[0]?.Status === "active") {
            sessionStorage.setItem('EarringFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/diamond/${shapeName}`))
            sessionStorage.setItem('custStepData2Earring', JSON.stringify(step1Data));
          }

          if (updatedStep1?.[0]?.id === 1 && step1?.[0]?.Status === "active") {
            sessionStorage.setItem('isRing', true)
            sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(updatedStep1));
          }

          if (updatedStep1?.[0]?.id === 2 && step2?.[0]?.Status === "active") {
            sessionStorage.setItem('isPendant', true)
            sessionStorage.setItem("customizeSteps2Pendant", JSON.stringify(updatedStep1));
          }

          if (updatedStep1?.[0]?.id === 3 && step3?.[0]?.Status === "active") {
            sessionStorage.setItem('isPair', true)
            sessionStorage.setItem("customizeSteps2Earring", JSON.stringify(updatedStep1));
          }


          navigate(`/certified-loose-lab-grown-diamonds/diamond/${shapeName}`);
        } else {
          alert("Please choose your setting which have a diamond shape")
        }
      }

    }
    else {

      const totalPrice = (Number(stepsData?.[0]?.step1Data?.[0]?.price) + Number((singleProd1?.UnitCostWithMarkUpIncTax ?? singleProd?.UnitCostWithMarkUpIncTax))).toFixed(2);

      const obj = {
        a: stepsData?.[0]?.step1Data?.[0]?.stockno,
        b: stepsData?.[0]?.step1Data?.[0]?.shapename,
        q: (singleProd1 ?? singleProd)?.autocode,
        r: (singleProd1 ?? singleProd)?.designno,
        m: selectedMetalId,
        d: selectedDiaId,
        c: selectedCsId,
      };

      let encodeObj = compressAndEncode(JSON.stringify(obj));

      const updatedStep1 = steps.map(step => {
        if (step.step3 !== undefined) {
          return { "step3": true, "url": encodeObj, "price": totalPrice };
        }
        return step;
      });

      if (!updatedStep1.some(step => step.step3 !== undefined)) {
        updatedStep1.push({ "step3": true, "url": encodeObj, "price": totalPrice });
      }

      if ((singleProd1 ?? singleProd)?.ShapeName?.toLowerCase() !== stepsData?.[1]?.step2Data?.ShapeName?.toLowerCase() &&
        stepsData?.[1]?.step2Data?.ShapeName !== undefined &&
        stepsData?.[1]?.step2Data?.ShapeName !== null &&
        stepsData?.[1]?.step2Data?.ShapeName !== "") {
        setShowModal1(true);
      } else {
        const updatedStepData = stepsData.map(step => {
          if (step?.step2Data !== undefined) {
            return { "step2Data": singleProd1 ?? singleProd, 'selectedMetalId': selectedMetalId, 'selectedDiaId': selectedDiaId, 'selectedCsId': selectedCsId };
          }
          return step;
        });

        if (!updatedStepData.some(step => step?.step2Data !== undefined)) {
          updatedStepData.push({ "step2Data": singleProd1 ?? singleProd, 'selectedMetalId': selectedMetalId, 'selectedDiaId': selectedDiaId, 'selectedCsId': selectedCsId });
        }
        sessionStorage.setItem('custStepData', JSON.stringify(updatedStepData));
        sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));

        setCustomizeStep({
          ...customizeStep,
          step3: {
            "step": true,
            "url": encodeObj,
            "price": totalPrice,
          },
        })

        navigate(`/d/setting-complete-product/det345/?p=${encodeObj}`);
      }
    }

  }
  // const imageRefs = useRef([])
  // const [origin, setorigin] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (e, index) => {
  //   const imageRef = imageRefs?.current[index];
  //   if (!imageRef) return;

  //   const imageContainer = imageRef?.parentElement;
  //   if (!imageContainer) return;

  //   const rect = imageContainer.getBoundingClientRect();
  //   const x = (e.clientX - rect.left) / rect.width;
  //   const y = (e.clientY - rect.top) / rect.height;

  //   const zoomLevel = 1.5;

  //   const transformOriginX = x * 100;
  //   const transformOriginY = y * 100;
  //   console.log(transformOriginX ,
  //     transformOriginY , "xy")

  //   setorigin({ x: transformOriginX, y: transformOriginY })
  //   imageRef.style.transformOrigin = `${transformOriginX}% ${transformOriginY}%`;
  //   imageRef.style.transform = `scale(${zoomLevel})`;
  // };

  // const handleMouseLeave = (index) => {
  //   const imageReff = imageRefs?.current[index]
  //   if (!imageReff) return

  //   imageReff.style.transform = 'scale(1)';
  //   imageReff.style.transformOrigin = 'center center'; // reset the origin to center
  //   setorigin({ x: 0, y: 0 })

  // }

  // useEffect(() => {
  //   // Cleanup logic when component unmounts or ref changes
  //   return () => {
  //     // Reset all image transformations
  //     imageRefs.current.forEach((ref) => {
  //       if (ref) {
  //         ref.style.transform = 'scale(1)';
  //         ref.style.transformOrigin = 'center center';
  //       }
  //     });
  //   };
  // }, []);

  const { imageRefs, handleMouseMove, handleMouseLeave } = useImageZoom(1.5);

  return (
    <div className="for_ProductDet_mainDiv">
      <div className="for_ProductDet_div">
        <div className="for_ProductDet_details_container">
          {(CustPath === 'Diamond_Pendants' || CustPath === 'Diamond_Earrings') && (
            <DiamondNavigation
              StyleCondition={StyleCondition}
              Swap={Swap}
              setswap={setswap}
              customizeStep={customizeStep}
              setshape={setshape}
            />
          )}
          <div className="for_ProductDet_container_div">
            {
              !mobileView ? (
                <div className="for_ProductDet_left_prodImages">
                  <div className="for_slider_container">
                    <div className="for_images_slider">
                      {loadingdata || pdImageLoading ? (
                        <>
                          <div className="for_slider">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className='for_skeleton_thumb_div'>
                                <Skeleton className='for_skeleton_det_thumb' />
                              </div>
                            ))}
                          </div>
                          <div className="for_main_image">
                            <Skeleton variant='square' className='for_skeleton_main_image' />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="for_slider">
                            {(
                              PdImageArr.map((val, i) => (
                                <div
                                  key={i}
                                  className={`for_box ${i === currentSlide ? "active" : ""}`}
                                  onClick={() => handleThumbnailClick(i)}
                                >
                                  {val?.type === "img" ? (
                                    <img
                                      src={val?.src}
                                      alt=""
                                      onClick={() => {
                                        setSelectedThumbImg({ link: val?.src, type: "img" });
                                        setThumbImgIndex(i);
                                      }}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = imageNotFound;
                                      }}
                                    />
                                  ) : (
                                    <div className="for_video_box" style={{ position: "relative" }}>
                                      <video
                                        src={val?.src}
                                        autoPlay
                                        muted
                                        loop
                                        style={{ width: '65px' }}
                                      />
                                      <IoIosPlayCircle className="for_play_io_icon" />
                                    </div>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                          <div className="for_main_image">
                            <div className="forWeb_app_product_label">
                              {singleProd?.IsInReadyStock === 1 && <span className="forWeb_app_instock">In Stock</span>}
                              {singleProd?.IsBestSeller === 1 && <span className="forWeb_app_bestSeller">Best Seller</span>}
                              {singleProd?.IsTrending === 1 && <span className="forWeb_app_intrending">Trending</span>}
                              {singleProd?.IsNewArrival === 1 && <span className="forWeb_app_newarrival">New</span>}
                            </div>
                            {(
                              imageSrc || PdImageArr?.length > 1 ? (
                                <Slider {...settings} ref={sliderRef} lazyLoad="progressive">
                                  {PdImageArr?.length > 0 && PdImageArr.map((val, i) => {
                                    // setNavbarImage(val?.src);
                                    return (
                                      <div key={i} className="for_slider_card">
                                        <div className="for_image"
                                          style={{
                                            position: "relative",
                                            overflow: "hidden",
                                            cursor: "zoom-in",
                                            transition: "0.3s ease-in"
                                          }}
                                          onMouseMove={(e) => handleMouseMove(e, i)}
                                          onMouseLeave={() => handleMouseLeave(i)}
                                        >
                                          {val?.type === "img" ? (
                                            <img
                                              ref={el => imageRefs.current[i] = el}
                                              loading="lazy"
                                              src={val?.src}
                                              alt=""
                                              onLoad={() => setIsImageLoad(false)}
                                              onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = imageNotFound;
                                              }}
                                            />
                                          ) : (
                                            <div style={{ height: "80%" }}>
                                              <video
                                                src={val?.src}
                                                ref={videoRef}
                                                loop={true}
                                                autoPlay={true}
                                                muted
                                                style={{ width: "100%", height: "100%", objectFit: "scale-down" }}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  })}
                                </Slider>
                              ) : imageSrc || PdImageArr.length === 1 ? (
                                <div className="for_slider_card" ref={sliderRef} lazyLoad="progressive">
                                  <div className="for_image"
                                    style={{
                                      position: "relative",
                                      overflow: "hidden",
                                      cursor: "zoom-in",
                                      transition: "0.3s ease-in"
                                    }}
                                    onMouseMove={(e) => handleMouseMove(e, 1)}
                                    onMouseLeave={() => handleMouseLeave(1)}
                                  >
                                    <img
                                      ref={el => imageRefs.current[1] = el}
                                      loading="lazy"
                                      src={PdImageArr[0]?.src}
                                      alt=""
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = imageNotFound;
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : imageSrc || PdImageArr?.length === 0 && (
                                <div className="for_slider_card">
                                  <div className="for_image">
                                    <img
                                      src={imageSrc || 'p.png'}
                                      alt=""
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = imageNotFound;
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="for_ProductDet_left_prodImages_mob">
                  <div className="for_slider_container_mob">
                    <div className="for_images_slider_mob">
                      {loadingdata || pdImageLoading ? (
                        <>
                          <div className="for_slider_mob">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className='for_skeleton_thumb_div_mob'>
                                <Skeleton className='for_skeleton_det_thumb_mob' />
                              </div>
                            ))}
                          </div>
                          <div className="for_main_image_mob">
                            <Skeleton variant='square' className='for_skeleton_main_image_mob' />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="for_slider_mob">
                            {(
                              PdImageArr.map((val, i) => (
                                <div
                                  key={i}
                                  className={`for_box_mob ${i === currentSlide ? "active" : ""}`}
                                  onClick={() => handleThumbnailClick(i)}
                                >
                                  {val?.type === "img" ? (
                                    <img
                                      src={val?.src}
                                      alt=""
                                      onClick={() => {
                                        setSelectedThumbImg({ link: val?.src, type: "img" });
                                        setThumbImgIndex(i);
                                      }}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = imageNotFound;
                                      }}
                                    />
                                  ) : (
                                    <div className="for_video_box_mob" style={{ position: "relative" }}>
                                      <video
                                        src={val?.src}
                                        autoPlay
                                        muted
                                        loop
                                        style={{ width: '65px' }}
                                      />
                                      <IoIosPlayCircle className="for_play_io_icon_mob" />
                                    </div>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                          <div className="for_main_image_mob">
                            <div className="forWeb_app_product_label_mob">
                              {singleProd?.IsInReadyStock === 1 && <span className="forWeb_app_instock_mob">In Stock</span>}
                              {singleProd?.IsBestSeller === 1 && <span className="forWeb_app_bestSeller_mob">Best Seller</span>}
                              {singleProd?.IsTrending === 1 && <span className="forWeb_app_intrending_mob">Trending</span>}
                              {singleProd?.IsNewArrival === 1 && <span className="forWeb_app_newarrival_mob">New</span>}
                            </div>
                            {(
                              imageSrc || PdImageArr?.length > 1 ? (
                                <Slider {...settings} ref={sliderRef} lazyLoad="progressive">
                                  {PdImageArr?.length > 0 && PdImageArr.map((val, i) => (
                                    <div key={i} className="for_slider_card_mob">
                                      <div className="for_image_mob">
                                        {val?.type === "img" ? (
                                          <img
                                            loading="lazy"
                                            src={val?.src}
                                            alt=""
                                            style={{ transition: 'transform 0.3s ease' }}
                                            onLoad={() => setIsImageLoad(false)}
                                          />
                                        ) : (
                                          <div style={{ height: "80%" }}>
                                            <video
                                              src={val?.src}
                                              ref={videoRef}
                                              loop={true}
                                              autoPlay={true}
                                              muted
                                              style={{ width: "100%", height: "100%", objectFit: "scale-down" }}
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </Slider>
                              ) : imageSrc || PdImageArr.length === 1 ? (
                                <div className="for_slider_card_mob">
                                  <div className="for_image_mob">
                                    <img
                                      src={PdImageArr[0]?.src}
                                      alt=""
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = imageNotFound;
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : imageSrc || PdImageArr?.length === 0 && (
                                <div className="for_slider_card_mob">
                                  <div className="for_image_mob">
                                    <img
                                      src={imageSrc || 'p.png'}
                                      alt=""
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = imageNotFound;
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )

            }
            <div className="for_ProductDet_right_prodDetails">
              <div className="for_ProductDet_breadcrumbs">
                <div className="for_ProductDet_breadcrumbs">
                  {IsBreadCumShow && (
                    <div
                      className="for_breadcrumbs"
                      style={{ marginLeft: "3px" }}
                    >
                      <span
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        {"Home"}{" "}
                      </span>
                      {path?.menuname !== undefined ? (
                        <span
                        // onClick={() =>
                        //   handleBreadcums({
                        //     [path?.FilterKey]:
                        //       path?.FilterVal,
                        //   })
                        // }
                        >
                          {decodeUrl?.s ? "" : ` / ${path?.menuname}`}
                        </span>
                      ) : CustPath !== undefined ? ` / ${CustPath}` : ""}

                      {path?.FilterVal1 !== undefined && (
                        <span
                        // onClick={() =>
                        //   handleBreadcums({
                        //     [path?.FilterKey]:
                        //       path?.FilterVal,
                        //     [path?.FilterKey1]:
                        //       path?.FilterVal1,
                        //   })
                        // }
                        >
                          {` / ${path?.FilterVal1}`}
                        </span>
                      )}
                      {decodeUrl != undefined && (
                        <span>
                          {` / ${decodeUrl?.b}`}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="for_ProductDet_title_main_div">
                  <div className="for_ProductDet_title_div">
                    {
                      isPriceloading ?
                        <Skeleton variant="rounded"
                          sx={{
                            width: 500,
                            '@media (max-width: 1400px)': {
                              width: 400,
                            },
                            '@media (max-width: 1150px)': {
                              width: 350,
                            },
                            '@media (max-width: 970px)': {
                              width: 300,
                            },
                            '@media (max-width: 830px)': {
                              width: 250,
                            },
                            '@media (max-width: 600px)': {
                              width: 400,
                            },
                            '@media (max-width: 470px)': {
                              width: 250,
                            },
                            '@media (max-width: 320px)': {
                              width: 200,
                            },
                          }}
                          height={40} style={{ marginInline: "0.3rem" }} />
                        :
                        <div className="for_ProductDet_title">
                          <span> {` ${singleProd?.MetalTypePurity?.split(" ")[1]} ${metalColorTitle} ${singleProd?.MetalTypePurity?.split(" ")[0]} ${singleProd?.ShapeName} Diamond ${singleProd?.category} with ${singleProd?.style} style`}</span>
                          <span className='for_prod_design'>{singleProd?.designno}
                            {/* {singleProd?.TitleLine && singleProd?.designno
                              ? " - "
                              : ""} {singleProd?.TitleLine} */}
                          </span>
                        </div>
                    }
                    {/* <div className="for_ProductDet_rating_div">
                      <div className="">
                        <Rating
                          name="simple-controlled"
                          value={ratingvalue}
                          size="small"
                          className="for_productDet_listting_rating"
                          readOnly
                        />
                      </div>
                      <div className='for_productDet_rating_text_div'><span className='for_productDet_rating_text'>4.5</span> Out of 5</div>
                    </div> */}
                    <div className="for_ProductDet_title_sku">
                      {/* <span>SKU: FE-CO-YG-0.5CT</span> */}
                    </div>
                  </div>
                  <div className="for_ProductDet_title_wishlist">
                    <Checkbox
                      icon={
                        <GoHeart size={26} color='black' />
                      }
                      checkedIcon={
                        <GoHeartFill size={26} color='black' />
                      }

                      className='for_wishlist_icon'
                      disableRipple={true}
                      checked={wishListFlag ?? singleProd?.IsInWish == 1 ? true : false}
                      onChange={(e) => handleWishList(e, singleProd)}
                    />
                  </div>
                </div>
                <div className="for_ProductDet_prodWeights_div">
                  {storeInit?.IsProductWebCustomization == 1 && (
                    <>
                      {metalTypeCombo?.length > 0 && storeInit?.IsMetalCustomization === 1 && (
                        <div className="for_prodWeights_metalType_div">
                          <div className="for_prodWeights_metalType_title">
                            Metal:
                          </div>
                          {singleProd?.IsMrpBase == 1 ?
                            <span className="for_prodWeights_weights_drp">
                              {metalTypeCombo?.filter((ele) => ele?.Metalid == singleProd?.MetalPurityid)[0]?.metaltype}
                              {/* {singleProd?.MetalTypePurity} */}
                            </span>
                            :
                            <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                              <select
                                className="for_prodWeights_weights_drp"
                                value={metalType}
                                onChange={(e) => handleCustomChange(e, 'mt')}
                              >
                                {metalTypeCombo.map((ele) => (
                                  <option key={ele?.Metalid} value={ele?.metaltype}>
                                    {ele?.metaltype}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                          }
                        </div>
                      )}
                      {metalColorCombo?.length > 0 && storeInit?.IsMetalTypeWithColor === 1 && (
                        <div className="for_prodWeights_metalType_div">
                          <div className="for_prodWeights_metalType_title">
                            metal color
                          </div>
                          {singleProd?.IsMrpBase == 1 ?
                            <span className="for_prodWeights_weights_drp">
                              {metalColorCombo?.filter((ele) => ele?.id == singleProd?.MetalColorid)[0]?.metalcolorname}
                            </span>
                            :
                            <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                              <select
                                className="for_prodWeights_weights_drp"
                                value={metalColor}
                                onChange={(e) =>
                                  storeInit?.IsColorWiseImages === 1 ?
                                    handleMetalWiseColorImg(e) :
                                    handleMetalWiseColorImgWithFlag(e)
                                }
                              >
                                {metalColorCombo?.map((ele) => (
                                  <option key={ele?.id} value={ele?.colorcode}>
                                    {ele?.metalcolorname}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                          }
                        </div>
                      )}
                      {(storeInit?.IsDiamondCustomization === 1 && diaQcCombo?.length > 0 && diaList?.length) ? (
                        <div className="for_prodWeights_metalType_div">
                          <div className="for_prodWeights_metalType_title">
                            Diamond Quality
                          </div>
                          {
                            singleProd?.IsMrpBase == 1 ? (
                              <span className="for_prodWeights_weights_drp">
                                {singleProd?.DiaQuaCol}
                              </span>
                            )
                              :
                              <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                                <select
                                  className="for_prodWeights_weights_drp"
                                  value={selectDiaQc}
                                  onChange={(e) => handleCustomChange(e, 'dt')}
                                >
                                  {diaQcCombo.map((ele) => (
                                    <option key={ele?.QualityId} value={`${ele?.Quality},${ele?.color}`}>
                                      {`${ele?.Quality}#${ele?.color}`}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                          }
                        </div>
                      ) : null}
                      {(storeInit?.IsCsCustomization === 1 &&
                        selectCsQC?.length > 0 && csList?.filter((ele) => ele?.D !== "MISC")?.length > 0) ? (
                        <div className="for_prodWeights_metalType_div">
                          <div className="for_prodWeights_metalType_title">
                            Color stone quality
                          </div>
                          {
                            singleProd?.IsMrpBase == 1 ? (
                              <span className="menuitemSelectoreMain">
                                {singleProd?.CsQuaCol}
                              </span>
                            ) : (
                              <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                                <select
                                  className="for_prodWeights_weights_drp"
                                  value={selectCsQC}
                                  onChange={(e) => handleCustomChange(e, 'cs')}
                                >
                                  {csQcCombo.map((ele) => (
                                    <option key={ele?.QualityId} value={`${ele?.Quality},${ele?.color}`}>
                                      {`${ele?.Quality}#${ele?.color}`}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                            )
                          }
                        </div>
                      ) : null}
                      {SizeSorting(SizeCombo?.rd)?.length > 0 && (
                        <div className="for_prodWeights_metalType_div">
                          <div className="for_prodWeights_metalType_title">
                            Size
                          </div>
                          {singleProd?.IsMrpBase == 1 ?
                            <span className="for_prodWeights_weights_drp">
                              {singleProd?.DefaultSize}
                            </span>
                            :
                            <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                              <select
                                className="for_prodWeights_weights_drp"
                                value={sizeData}
                                onChange={(e) => handleCustomChange(e, 'size')}
                              >
                                {/* {SizeSorting(SizeCombo?.rd)?.map((ele) => (
                                      <option key={ele?.id} value={ele?.sizename}>
                                        {ele?.sizename}
                                      </option>
                                    ))} */}
                                {SizeCombo?.rd?.map((ele) => (
                                  <option key={ele?.id} value={ele?.sizename}>
                                    {ele?.sizename}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                          }
                        </div>
                      )}
                      {(storeInit?.IsPriceShow == 1 && storeInit?.IsPriceBreakUp == 1) && (singleProd ?? singleProd1)?.IsMrpBase != 1 && (
                        <>
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
                              width: '95.5%'
                            }}
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
                                width: "51%",

                                "&.MuiAccordionSummary-root": {
                                  padding: 0,
                                },
                              }}
                            // className="filtercategoryLable"

                            >
                              <Typography className='for_price_break'>Price Breakup</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                                width: "51%",
                              }}
                            >

                              {(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography className="for_Price_breakup_label" sx={{ fontFamily: 'Nunito' }}>Metal</Typography>
                                <span style={{ display: 'flex' }}>
                                  <Typography>
                                    {
                                      <span className="for_currencyFont" sx={{ fontFamily: 'Nunito' }}>
                                        {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                      </span>
                                    }
                                  </Typography>
                                  &nbsp;
                                  <Typography sx={{ fontFamily: 'Nunito' }} className="for_PriceBreakup_Price">{formatter((singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost)?.toFixed(2))}</Typography>
                                </span>
                              </div> : null}

                              {(singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography className="for_Price_breakup_label" sx={{ fontFamily: 'Nunito' }}>Diamond </Typography>

                                <span style={{ display: 'flex' }}>
                                  <Typography>{
                                    <span className="for_currencyFont" sx={{ fontFamily: 'Nunito' }}>
                                      {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                    </span>
                                  }</Typography>
                                  &nbsp;
                                  <Typography className="for_PriceBreakup_Price" sx={{ fontFamily: 'Nunito' }}>{formatter((singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost)?.toFixed(2))}</Typography>
                                </span>
                              </div> : null}

                              {(singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography className="for_Price_breakup_label" sx={{ fontFamily: 'Nunito' }}>Stone </Typography>

                                <span style={{ display: 'flex' }}>
                                  <Typography>{
                                    <span className="for_currencyFont" sx={{ fontFamily: 'Nunito' }}>
                                      {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                    </span>
                                  }</Typography>
                                  &nbsp;
                                  <Typography className="for_PriceBreakup_Price" sx={{ fontFamily: 'Nunito' }}>{formatter((singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost)?.toFixed(2))}</Typography>
                                </span>
                              </div> : null}

                              {(singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography className="for_Price_breakup_label" sx={{ fontFamily: 'Nunito' }}>MISC </Typography>

                                <span style={{ display: 'flex' }}>
                                  <Typography>{
                                    <span className="for_currencyFont" sx={{ fontFamily: 'Nunito' }}>
                                      {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                    </span>
                                  }</Typography>
                                  &nbsp;
                                  <Typography className="for_PriceBreakup_Price" sx={{ fontFamily: 'Nunito' }}>{formatter((singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost)?.toFixed(2))}</Typography>
                                </span>
                              </div> : null}

                              {formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2)) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography className="for_Price_breakup_label" sx={{ fontFamily: 'Nunito' }}>Labour </Typography>

                                <span style={{ display: 'flex' }}>
                                  <Typography>{
                                    <span style={{ fontFamily: 'sans-serif' }}>
                                      {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                    </span>
                                  }</Typography>
                                  &nbsp;
                                  <Typography className="for_PriceBreakup_Price" sx={{ fontFamily: 'Nunito' }}>{formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2))}</Typography>
                                </span>
                              </div> : null}

                              {
                                (

                                  (singleProd1?.Other_Cost ? singleProd1?.Other_Cost : singleProd?.Other_Cost) +
                                  (singleProd1?.Size_MarkUp ? singleProd1?.Size_MarkUp : singleProd?.Size_MarkUp) +
                                  (singleProd1?.DesignMarkUpAmount ? singleProd1?.DesignMarkUpAmount : singleProd?.DesignMarkUpAmount) +
                                  (singleProd1?.ColorStone_SettingCost ? singleProd1?.ColorStone_SettingCost : singleProd?.ColorStone_SettingCost) +
                                  (singleProd1?.Diamond_SettingCost ? singleProd1?.Diamond_SettingCost : singleProd?.Diamond_SettingCost) +
                                  (singleProd1?.Misc_SettingCost ? singleProd1?.Misc_SettingCost : singleProd?.Misc_SettingCost)

                                ) !== 0 ?

                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="for_Price_breakup_label" sx={{ fontFamily: 'Nunito' }}>Other </Typography>

                                    <span style={{ display: 'flex' }}>
                                      <Typography>{
                                        <span className="for_currencyFont" sx={{ fontFamily: 'Nunito' }}>
                                          {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }</Typography>
                                      &nbsp;
                                      <Typography className="for_PriceBreakup_Price" sx={{ fontFamily: 'Nunito' }}>{
                                        formatter((

                                          (singleProd1?.Other_Cost ? singleProd1?.Other_Cost : singleProd?.Other_Cost) +
                                          (singleProd1?.Size_MarkUp ? singleProd1?.Size_MarkUp : singleProd?.Size_MarkUp) +
                                          (singleProd1?.DesignMarkUpAmount ? singleProd1?.DesignMarkUpAmount : singleProd?.DesignMarkUpAmount) +
                                          (singleProd1?.ColorStone_SettingCost ? singleProd1?.ColorStone_SettingCost : singleProd?.ColorStone_SettingCost) +
                                          (singleProd1?.Diamond_SettingCost ? singleProd1?.Diamond_SettingCost : singleProd?.Diamond_SettingCost) +
                                          (singleProd1?.Misc_SettingCost ? singleProd1?.Misc_SettingCost : singleProd?.Misc_SettingCost)

                                        )?.toFixed(2))
                                      }</Typography>
                                    </span>
                                  </div>
                                  :
                                  null
                              }

                            </AccordionDetails>
                          </Accordion>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="for_productDet_price_div">
                  <span className='for_productDet_price'>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode),
                      }}
                    />
                    {
                      isPriceloading ?
                        <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                        :
                        <span>&nbsp;{formatter(singleProd1?.UnitCostWithMarkUpIncTax ?? singleProd?.UnitCostWithMarkUpIncTax)}</span>
                    }
                  </span>
                </div>
                <div className="for_productDet_ATC_div">
                  {CustPath === 'Engagement_Ring' || CustPath === 'Diamond_Pendants' || CustPath === 'Diamond_Earrings' ? (
                    <>
                      {isStepDataValid ? (
                        <>
                          <button disabled={isPriceloading} onClick={() => handleButtonChange("hasData")} className={`${btnstyle?.btn_for_new} for_productDet_choose_Dia ${btnstyle?.btn_15} ${isLoading ? 'disabled' : ''}`}>
                            choose this setting
                          </button>
                          <CheckingSettingSetModal
                            open={showModal1}
                            data={shapeData}
                            Steps={sendSteps}
                            handleClose={handleToggle1}
                            productData={singleProd1 ?? singleProd}
                            setImage={setImage}
                          />
                        </>
                      ) : (
                        <>
                          <button disabled={isPriceloading} onClick={() => handleButtonChange("")} className={`${btnstyle?.btn_for_new} for_productDet_choose_Dia ${btnstyle?.btn_15} ${isLoading ? 'disabled' : ''}`}>
                            choose this setting
                          </button>
                          <CheckingSettingSetModal
                            open={showModal1}
                            data={shapeData}
                            Steps={sendSteps}
                            handleClose={handleToggle1}
                            productData={singleProd1 ?? singleProd}
                            setImage={setImage}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <button disabled={isPriceloading} onClick={() => handleCart(!addToCardFlag)} className={`${btnstyle?.btn_for_new} for_productDet_ATC ${btnstyle?.btn_15}`}>
                      {addToCardFlag === false ? "ADD TO CART" : "REMOVE FROM CART"}
                    </button>
                  )}

                </div>
                <div className="for_productDet_shipping_fee_div">
                  <div className="for_productDet_shipping_icon">
                    <img className='for_productDet_shipp_image' src={`${storImagePath()}/images/ProductListing/Shipping/shipping-cart.png`} alt='shipping-icon' ></img>
                  </div>
                  <div className="for_productDet_shipp_desc">
                    <span className='for_shipp_desc_title_1'>Free shipping, free 30 days return</span>
                    <span className='for_shipp_desc_title_2'><span className='for_shipp_desc_bold'>Please Note :</span> If the diamond is part of a diamond ring, the completed ring will ship according to the shipping date of the setting</span>
                  </div>
                </div>
                {
                  (singleProd1 ?? singleProd)?.MakeOrderDays !== "" &&
                  (singleProd1 ?? singleProd)?.MakeOrderDays !== 0 &&
                  (singleProd1 ?? singleProd)?.MakeOrderDays !== null && (
                    <div className="for_productDet_calender_div">
                      <div className="for_productDet_calender_icon">
                        <img className='for_productDet_calender_image' src={`${storImagePath()}/images/ProductListing/Shipping/calendar.png`} alt='calender-icon' ></img>
                      </div>
                      <div className="for_productDet_calender_desc">
                        <span className='for_calender_desc_title_1'>order now and your order shipped by</span>
                        {
                          isPriceloading ?
                            <Skeleton variant="rounded" width={200} height={20} style={{ marginInline: "0.3rem" }} />
                            :
                            <span className='for_calender_desc_title_2'>{shippingDate}</span>
                        }
                        {/* <span className='for_calender_desc_title_2'>Tuesday , August 20</span> */}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="for_ProductDet_prod_desc_mainDIv">
            {(singleProd ?? singleProd1)?.description !== "" && (
              <div className="for_ProductDet_desc">
                <span className='for_ProductDet_desc_title'>Product Description</span>
                <p className='for_ProductDet_desc_1_para'>{(singleProd ?? singleProd1)?.description}</p>
                {/* <p className='for_ProductDet_desc_1_para'>Discover unparalleled elegance with our Italian-crafted Oval Diamond Ring, a masterpiece designed for the discerning luxury connoisseur. This exquisite ring features a brilliant oval lab-grown diamond, known for its impeccable clarity and extraordinary brilliance. Handcrafted in Italy, this piece marries timeless design with cutting-edge technology, offering a sustainable and ethically sourced alternative to traditional diamonds</p> */}
              </div>
            )}
            {(CustPath !== 'Engagement_Ring' && CustPath !== 'Diamond_Pendants') && (
              <div className="for_ProductDet_desc">
                <span className='for_ProductDet_desc_title'>Diamond Rings Information</span>
                <p className='for_ProductDet_desc_2_para'>Key Features: <br />
                  Lab-Grown Diamond: Our oval diamond is meticulously created in a state-of-the-art laboratory, ensuring superior quality and ethical sourcing.
                  Italian Craftsmanship: Each ring is handcrafted by skilled artisans in Italy, reflecting centuries of tradition and a commitment to perfection.
                  Luxurious Setting: The diamond is set in a sleek, modern band made from the finest materials, designed to highlight the stone's natural beauty.</p>
              </div>
            )}
            <div className="for_ProductDet_desc">
              <span className='for_ProductDet_desc_title'>{CustPath === 'Engagement_Ring' ? 'Ring Description' : CustPath === 'Diamond_Pendants' ? 'Pendant Description' : CustPath === 'Diamond_Earrings' ? 'Earring Description' : 'Material Details'}</span>
              {/* <span className='for_ProductDet_desc_title'>Stone Information</span> */}
              <div className='for_ProductDet_desc_div'>
                {/* <div>Diamond Size : <span>0.50CT To 3.00CT</span></div>
                <div>Diamond Quality : <span>VVS2/VS1</span></div>
                <div>Diamond Color : <span> D / E</span></div>
                <div>Diamond Origin : <span>Lab Grown Diamond CVD TYPE 2A</span></div>
                <div>CARAT WEIGHT : <span>0.5</span></div> */}

                <div>Metal Purity : <span>{typeof metalType === 'string' ? metalType : null}</span></div>
                <div>Metal Color : <span>{metalColor && metalColor}</span></div>
                <div>Net Wt : <span>{(singleProd1?.Nwt ?? singleProd?.Nwt)?.toFixed(3)}</span></div>
                <div>Side Diamonds Weight : <span>{(
                  (singleProd1 ?? singleProd)?.Dwt -
                  singleDiaProd
                    ?.filter((item) => item?.IsCenterStone === 1)
                    .map((items) => items?.N)
                    .reduce((acc, curr) => acc + curr, 0)
                ).toFixed(3)}</span></div>
                {/* {(storeInit?.IsDiamondCustomization === 1 && diaQcCombo?.length > 0 && diaList?.length) ? (
                  <div>Diamond Quality Color : <span>{selectDiaQc}</span></div>
                ) : null} */}
                <div>Diamond Quality : <span>{(singleProd1 ?? singleProd)?.DiaQuaCol?.split(',')[0]}</span></div>
                <div>Diamond Color : <span>{(singleProd1 ?? singleProd)?.DiaQuaCol?.split(',')[1]}</span></div>

              </div>

              {(CustPath !== 'Engagement_Ring' && CustPath !== 'Diamond_Pendants') ? (
                <>
                  {diaList?.length > 0 && (
                    <>
                      <div style={{ marginBlock: '10px' }}>
                        <TableComponents list={diaList} details={'Diamond Details'} />
                      </div>
                    </>
                  )}
                  {csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 && (
                    <>
                      <div style={{ marginTop: '1rem' }}>
                        <TableComponentsMISC list={csList} details={'Color Stone Details'} />
                      </div>
                    </>
                  )}
                  {csList?.filter((ele) => ele?.D === "MISC")?.length > 0 && (
                    <>
                      <div style={{ marginTop: '1rem' }}>
                        <TableComponentsMISC list={csList} details={'MISC Details'} />
                      </div>
                    </>
                  )}
                </>
              ) : (
                // <div className="for_ProductDet_desc">
                //   <div className="for_ProductDet_desc_title">Can be set with</div>
                //   <div>{steps?.[0]?.shape} : <span>0.5 - 15 Ct.</span></div>
                // </div> 
                ""
              )}

            </div>
          </div>
          {storeInit?.IsProductDetailSimilarDesign == 1 &&
            SimilarBrandArr?.length > 0 && (
              <div className="for_ProductDet_Similiar_products_div">
                <RelatedProduct
                  SimilarBrandArr={SimilarBrandArr}
                  handleMoveToDetail={handleMoveToDetail}
                  storeInit={storeInit}
                  loginInfo={loginUserDetail}
                />
              </div>
            )}
          {stockItemArr?.length > 0 && storeInit?.IsStockWebsite === 1 &&
            <Stockitems loginInfo={loginUserDetail} storeInit={storeInit} check={storeInit?.IsPriceShow === 1}
              handleCartandWish={handleCartandWish}
              cartArr={cartArr}
              stockItemArr={stockItemArr}
            />
          }
          <div className="for_ProductDet_services_div">
            {/* <Services title={"Our Exclusive services"} services={services} /> */}
            {/* <OurServices /> */}
          </div>
        </div>
        <div className="for_ProductDet_trend_coll_banner_div">
          <div className="for_trend_coll_details_div">
            <div className="for_trend_coll_det_title">
              <div className='for_trenf_coll_tit1'><span>Make her heart race</span></div>
              <div className='for_trenf_coll_tit2'><span>Trending & Unique Collection</span></div>
              <div className='for_trend_coll_para'>
                <p>We offers a huge lab grown diamonds jewelry collection. Surprise your significant other with a stunning diamond jewelry and a proposal they will never forget. Browse our collection now and find the perfect diamond jewelry for your love story.</p>
              </div>
              <div className="for_trend_coll_btn">
                <button className={`${btnstyle?.btn_for_new} for_trend_jewel_coll ${btnstyle?.btn_15}`}>View all jewelry collection</button>
              </div>
            </div>
          </div>
          <div className='for_trend_coll_image_div'>
            <img className='for_trend_coll_image' src={`${storImagePath()}/images/ProductListing/DetailsBanner/fine-jewelery-banner.webp`} alt="" />
          </div>
          <div className="for_productDet_faq">
            <Faq />
          </div>
          {/* <div className="for_ProductDet_NewsLetter">
            <NewsletterSignup />
          </div> */}
        </div>
      </div>
    </div >
  )
}

export default ProductDetail

const DiamondNavigation = ({ Swap, StyleCondition, setswap, customizeStep, setshape }) => {
  const dropdownRefs = useRef({});
  const isLoading = useRecoilValue(for_Loader);
  const [open, setOpen] = useState(null);
  const [isSetting, setIsSetting] = useState([]);
  const [storeInit, setStoreInit] = useState({});
  const [loginCurrency, setLoginCurrency] = useState();
  const [settingSteps, setSettingSteps] = useState();
  const Navigation = useNavigate();
  const location = useLocation();
  const isDiamondPage = 'diamond' || 'det345';
  const getStepName = location?.pathname.split('/');
  const [SettName, setSettName] = useState();
  const getCustStepData = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const getdiaData = JSON.parse(sessionStorage.getItem('custStepData'));
  const setting = getStepName.includes('Engagement_Ring') || getStepName.includes('Diamond_Pendants') || getStepName.includes('Diamond_Earrings');
  const settingActive = 'Ring' || 'Pendant' || 'Diamond_Pendants' || 'Engagement_Ring';
  const getCustStepData2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
  const getCustStepData3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
  const getCustStepData4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));
  const getdiaData2 = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
  const getdiaData3 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
  const getdiaData4 = JSON.parse(sessionStorage.getItem('custStepData2Earring'));

  const getCompleteStep1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const getCompleteStep2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
  const getCompleteStep3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
  const getCompleteStep4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));

  const isRing = JSON?.parse(sessionStorage.getItem('isRing')) ?? "";
  const isPendant = JSON?.parse(sessionStorage.getItem('isPendant')) ?? "";
  const isEarring = JSON?.parse(sessionStorage.getItem('isPair')) ?? "";

  const [getImagePath, setImagePath] = useState();

  useEffect(() => {
    const getImagePath = ((settingSteps?.[0]?.Setting === "Ring" && settingSteps?.[0]?.Status === "active") || isRing) ? JSON.parse(sessionStorage?.getItem("setImage")) : ((settingSteps?.[0]?.Setting === "Pendant" && settingSteps?.[0]?.Status === "active") || isPendant) ? JSON.parse(sessionStorage?.getItem("setPenImage")) : ((settingSteps?.[0]?.Setting === "Earring" && settingSteps?.[0]?.Status === "active") || isEarring) ? JSON.parse(sessionStorage?.getItem("setEarImage")) : null;
    setImagePath(getImagePath);
  }, [settingSteps, location?.key])

  useEffect(() => {
    const handleDiaSettingName = () => {
      const getSettName = isRing === true ? "Ring" : isPendant === true ? "Pendant" : "Earring";
      setSettName(getSettName)
    }
    handleDiaSettingName();
  }, [location?.key])

  useEffect(() => {
    if (getCompleteStep2?.[0]?.Status === 'active') {
      setSettingSteps(getCompleteStep2)
    }
    if (getCompleteStep3?.[0]?.Status === 'active') {
      setSettingSteps(getCompleteStep3);
    }
    if (getCompleteStep4?.[0]?.Status === 'active') {
      setSettingSteps(getCompleteStep4);
    }
  }, [location?.key])

  useEffect(() => {
    const storeData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeData);

    const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    setLoginCurrency(loginData);
  }, []);

  const isActive = (pathSegment) => getStepName.includes(pathSegment) || location?.pathname.slice('/')?.includes(pathSegment);

  useEffect(() => {
    setIsSetting(location?.pathname.split('/'));
  }, [location?.pathname]);

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

  const handleOpen = (index) => {
    setOpen(open === index ? null : index);
  };


  const renderSteps = () => {
    return (
      <>
        <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
          <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition}
            onClick={() => {
              if ((getCompleteStep2?.[2]?.step3 && getCompleteStep2?.[0]?.Status === "active") ?? (getCompleteStep3?.[2]?.step3 && getCompleteStep3?.[0]?.Status === "active") ?? (getCompleteStep4?.[2]?.step3 && getCompleteStep4?.[0]?.Status === "active")) {
                Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
              } else {
                Navigation(`/certified-loose-lab-grown-diamonds/settings/${SettName}/${(SettName === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : SettName === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
              }
              setswap("settings");
            }}
          >
            <img
              className={
                getCustStepData?.[1]?.Setting === 'Pendant' || (getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active')
                  ? 'for_pendant_view'
                  : (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active')
                    ? 'for_shapes_img'
                    : 'for_earring_shape'
              }
              src={
                getCustStepData?.[1]?.Setting === 'Pendant' || (getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active')
                  ? StepImages[1]?.img1
                  : (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active')
                    ? StepImages[1]?.img
                    : StepImages[1]?.img2
              }
              alt=""
            />  Settings
          </span>
          {(getdiaData2?.[0]?.step1Data && getCustStepData2?.[0]?.Status === "active") && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData2?.[0]?.step1Data}
              ref={(el) => { dropdownRefs.current[0] = el; }}
              getImagePath={getImagePath}
            />
          )}
          {(getdiaData3?.[0]?.step1Data && getCustStepData3?.[0]?.Status === "active") && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData3?.[0]?.step1Data}
              ref={(el) => { dropdownRefs.current[0] = el; }}
              getImagePath={getImagePath}
            />
          )}
          {(getdiaData4?.[0]?.step1Data && getCustStepData4?.[0]?.Status === "active") && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData4?.[0]?.step1Data}
              totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
              ref={(el) => { dropdownRefs.current[0] = el; }}
              getImagePath={getImagePath}
            />
          )}
        </div>

        <div className={`step_data ${getStepName.includes('diamond') ? 'active' : ''} d-1`}>
          <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
            if ((getCompleteStep2?.[2]?.step3 === true && getCompleteStep2?.[0]?.Status === "active") ?? (getCompleteStep3?.[2]?.step3 === true && getCompleteStep3?.[0]?.Status === "active") ?? (getCompleteStep4?.[0]?.step3 === true && getCompleteStep4?.[0]?.Status === "active")) {
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
            } else {
              if (((getCompleteStep2?.[0]?.step1 === true && getCompleteStep2?.[0]?.Status === "active") ?? (getCompleteStep3?.[0]?.step1 === true && getCompleteStep3?.[0]?.Status === "active") ?? (getCompleteStep4?.[0]?.step1 === true && getCompleteStep4?.[0]?.Status === "active"))) {
                if ((getCompleteStep2?.[0]?.step1 === true && getCompleteStep2?.[0]?.Status === "active")) {
                  sessionStorage.removeItem('customizeSteps2Ring');
                }
                if ((getCompleteStep3?.[0]?.step1 === true && getCompleteStep3?.[0]?.Status === "active")) {
                  sessionStorage.removeItem('customizeSteps2Pendant');
                }
                if ((getCompleteStep4?.[0]?.step1 === true && getCompleteStep4?.[0]?.Status === "active")) {
                  sessionStorage.removeItem('customizeSteps2Earring');
                }
                Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
              } else {
                if (setshape?.[0]?.shape ?? setshape?.[1]?.shape) {
                  Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                } else {
                  Navigation(`/certified-loose-lab-grown-diamonds/diamond/`)
                }
              }
            }
            setswap("diamond");
          }}>
            <img className="for_shapes_img" src={getCompleteStep4?.[0]?.Status === 'active' ? StepImages[0]?.img1 : StepImages[0]?.img} alt="" /> Diamond
          </span>
          {((getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && getCustStepData2?.[0]?.Status === "active") && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
              ref={(el) => { dropdownRefs.current[1] = el; }}
            />
          )}
          {((getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data) && getCustStepData3?.[0]?.Status === "active") && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData3?.[1]?.step2Data?.[0] ?? getdiaData3?.[0]?.step2Data?.[0]}
              ref={(el) => { dropdownRefs.current[1] = el; }}
            />
          )}
          {((getdiaData4?.[1]?.step2Data ?? getdiaData4?.[0]?.step2Data) && getCustStepData4?.[0]?.Status === "active") && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData4?.[1]?.step2Data?.[0] ?? getdiaData4?.[0]?.step2Data?.[0]}
              totalPairPrice={getdiaData4?.[1]?.totalPrice ?? getdiaData4?.[0]?.totalPrice}
              ref={(el) => { dropdownRefs.current[1] = el; }}
            />
          )}
          {getdiaData?.[0]?.step1Data?.[0] && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData?.[0]?.step1Data?.[0]}
              ref={(el) => { dropdownRefs.current[1] = el; }}
            />
          )}
        </div>

        <div className={`step_data ${((getdiaData2?.[1]?.step2Data && getCompleteStep2?.[0]?.Status === 'active') || (getdiaData3?.[1]?.step2Data && getCompleteStep3?.[0]?.Status === 'active') || getdiaData?.[1]?.step2Data || (getdiaData4?.[1]?.step2Data && getCompleteStep4?.[0]?.Status === 'active')) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
          <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url || getCompleteStep3?.[2]?.url || getCompleteStep4?.[2]?.url)}`); setswap("finish"); }}>
            <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : (getCustStepData2?.[0]?.Setting === 'Ring' || getCustStepData3?.[0]?.Setting === 'Ring' || getCustStepData?.[1]?.Setting === 'Ring') ? 'for_shapes_img' : 'for_earring_shape'} src={
              ((((getCompleteStep2?.[0]?.Setting === 'Pendant' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active') ? StepImages[1]?.img1 : (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Ring' && getCompleteStep3?.[0]?.Status === 'active') ? StepImages[1]?.img : StepImages[1]?.img3)))
            } alt="" /> {((getCompleteStep2?.[0]?.Setting === 'Pendant' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active')) ? 'Pendant' : ((getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Ring' && getCompleteStep3?.[0]?.Status === 'active')) ? 'Ring' : 'Earring'}
          </span>
          {(getCompleteStep1?.[2]?.price || (getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3?.[2]?.price : getCompleteStep4?.[2]?.price && getCompleteStep4?.[0]?.Status === "active" ? getCompleteStep4?.[2]?.price : "")) && (
            <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(
              getCompleteStep1?.[2]?.price || (getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3?.[2]?.price : getCompleteStep4?.[2]?.price && getCompleteStep4?.[0]?.Status === "active" ? getCompleteStep4?.[2]?.price : ""))}</span>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {getdiaData?.length > 0 || (getCustStepData?.[0]?.step1 === true ?? (getCustStepData2?.[1]?.step2 ?? getCustStepData3?.[1]?.step2 ?? getCustStepData4?.[1]?.step2) === true) ? (
        <div className="diamond_Step_data_det">
          <div className={`step_data ${isActive(isDiamondPage) ? 'active' : ''} d-1`}>
            <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
              setswap("diamond");
            }}>
              <img className='for_shapes_img' src={(getCompleteStep4?.[0]?.Status === 'active' || isEarring === true) ? StepImages[0]?.img1 : StepImages[0]?.img} alt="" /> Diamond
            </span>
            {((getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && getCustStepData2?.[0]?.Status === "active") && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
            {((getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data) && getCustStepData3?.[0]?.Status === "active") && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData3?.[1]?.step2Data?.[0] ?? getdiaData3?.[0]?.step2Data?.[0]}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
            {((getdiaData4?.[1]?.step2Data ?? getdiaData4?.[0]?.step2Data) && getCustStepData4?.[0]?.Status === "active") && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData4?.[1]?.step2Data?.[0] ?? getdiaData4?.[0]?.step2Data?.[0]}
                totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
            {getdiaData?.[0]?.step1Data?.[0] && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData?.[0]?.step1Data?.[0]}
                totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
          </div>

          <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
            <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition}
              onClick={() => {
                if (getCompleteStep1?.[1]?.step2 === true) {
                  Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
                } else {
                  if (getCompleteStep1?.[0]?.step1 === true && (getdiaData === null || getdiaData === undefined)) {
                    sessionStorage.removeItem('customizeSteps');
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${SettName}/${(SettName === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : SettName === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
                    // Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                  }
                  // else {
                  //   Navigation(`/certified-loose-lab-grown-diamonds/settings/${SettName}/${(SettName === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : SettName === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
                  // }
                }
                setswap("settings");
              }}
            >
              <img
                className={
                  getCustStepData?.[1]?.Setting === 'Pendant' || ((getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active') || isPendant === true)
                    ? 'for_pendant_view'
                    : ((getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active') || isRing === true)
                      ? 'for_shapes_img'
                      : ((getCompleteStep4?.[0]?.Setting === 'Earring' && getCompleteStep4?.[0]?.Status === 'active') || isEarring === true)
                        ? 'for_earring_shape'
                        : 'for_shapes_img'
                }
                src={
                  getCustStepData?.[1]?.Setting === 'Pendant' || ((getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active') || isPendant === true)
                    ? StepImages[1]?.img1
                    : ((getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active') || isRing === true)
                      ? StepImages[1]?.img
                      : ((getCompleteStep4?.[0]?.Setting === 'Earring' && getCompleteStep4?.[0]?.Status === 'active') || isEarring === true)
                        ? StepImages[1]?.img2
                        : StepImages[1]?.img
                }
                alt=""
              />  Settings
            </span>
            {((getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) ?? (getdiaData2?.[0]?.step1Data && getCustStepData2?.[0]?.Status === "active")) && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={(getdiaData2?.[0] ?? getdiaData3?.[0])}
                ref={(el) => { dropdownRefs.current[0] = el; }}
                getImagePath={getImagePath}
              />
            )}
            {(getdiaData3?.[0]?.step1Data && getCustStepData3?.[0]?.Status === "active") && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={(getdiaData2?.[0] ?? getdiaData3?.[0])}
                ref={(el) => { dropdownRefs.current[0] = el; }}
                getImagePath={getImagePath}
              />
            )}
            {(getdiaData4?.[0]?.step1Data && getCustStepData4?.[0]?.Status === "active") && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={getdiaData4?.[0]}
                totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
                ref={(el) => { dropdownRefs.current[0] = el; }}
                getImagePath={getImagePath}
              />
            )}
            {/* {getdiaData?.[0]?.step1Data && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={getdiaData?.[0]?.step1Data?.[0]}
                totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )} */}
          </div>

          <div className={`step_data ${((getdiaData2?.[1]?.step2Data && getCompleteStep2?.[0]?.Status === 'active') || (getdiaData3?.[1]?.step2Data && getCompleteStep3?.[0]?.Status === 'active') || getdiaData?.[1]?.step2Data || (getdiaData4?.[1]?.step2Data && getCompleteStep4?.[0]?.Status === 'active')) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
            <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url || getCompleteStep3?.[2]?.url || getCompleteStep4?.[2]?.url)}`); setswap("finish"); }}>

              <img className={
                ((getCustStepData3?.[0]?.Setting === 'Pendant' || isPendant === true)) ? 'for_pendant_view' : ((getCustStepData2?.[0]?.Setting === 'Ring' || isRing === true)) ? 'for_shapes_img' : ((getCustStepData4?.[0]?.Setting === 'Earring' || isEarring === true)) ? 'for_earring_shape' : 'for_shapes_img'}
                src={
                  (((((getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active' || isPendant === true)) ? StepImages[1]?.img1 :
                    (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || isRing === true) ? StepImages[1]?.img :
                      (getCompleteStep4?.[0]?.Setting === 'Earring' && getCompleteStep4?.[0]?.Status === 'active' || isEarring === true) ? StepImages[1]?.img3 : StepImages[1]?.img)))
                } alt="" />
              {((getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active' || isPendant === true)) ? 'Pendant' :
                (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || isRing === true) ? 'Ring' :
                  (getCompleteStep4?.[0]?.Setting === 'Earring' && getCompleteStep4?.[0]?.Status === 'active' || isEarring === true) ? 'Earring' : 'Ring'}

            </span>
            {(getCompleteStep1?.[2]?.price || (getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3?.[2]?.price : getCompleteStep4?.[2]?.price && getCompleteStep4?.[0]?.Status === "active" ? getCompleteStep4?.[2]?.price : "")) && (
              <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(
                getCompleteStep1?.[2]?.price ||
                ((getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price
                  : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active"
                    ? getCompleteStep3?.[2]?.price
                    : getCompleteStep4?.[2]?.price && getCompleteStep4?.[0]?.Status === "active"
                      ? getCompleteStep4?.[2]?.price : "")))}</span>
            )}
          </div>
        </div>
      ) : (
        <>
          {!isSetting.join(' ').includes('diamond_shape') ? (
            <div className="diamond_Step_data_det">
              {renderSteps()}
            </div>
          ) : (
            <>
              <div className="for_diamond_Step">
                {Swap === "diamond" ? (
                  <div
                    className="for_step d-1"
                    onClick={() => {
                      Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                      setswap("diamond");
                    }}
                  >
                    <span style={StyleCondition}>
                      <img className='for_shapes_img' src={StepImages[0]?.img} alt="" /> Diamond
                    </span>
                  </div>
                ) : (
                  <div
                    className="for_step d-2"
                    onClick={() => {
                      Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                      setswap("settings");
                    }}
                  >
                    <span style={StyleCondition}>
                      <img className='for_shapes_img' src={StepImages[1]?.img} alt="" /> Settings
                    </span>
                  </div>
                )}
                {Swap !== "diamond" ? (
                  <div
                    className="for_step d-1"
                    onClick={() => {
                      Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                      setswap("diamond");
                    }}
                  >
                    <span style={StyleCondition}>
                      <img className='for_shapes_img' src={StepImages[0]?.img} alt="" /> Diamond
                    </span>
                  </div>
                ) : (
                  <div
                    className="for_step d-2"
                    onClick={() => {
                      Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                      setswap("settings");
                    }}
                  >
                    <span style={StyleCondition}>
                      <img className='for_shapes_img' src={StepImages[1]?.img} alt="" /> Settings
                    </span>
                  </div>
                )}
                <div className="for_step d-3">
                  <span style={StyleCondition} onClick={() => Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.step3?.url ?? getCompleteStep2?.[2]?.url ?? getCompleteStep3?.[2]?.url)}`)}>
                    <img className='for_shapes_img' src={StepImages[2]?.img} alt="" /> Rings
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

const HandleDrp = forwardRef(({ index, open, handleOpen, data, getImagePath, totalPairPrice }, ref) => {
  const [storeInit, setStoreInit] = useState({});
  const [loginCurrency, setLoginCurrency] = useState();
  const [metalColor, setMetalColor] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const Navigation = useNavigate();
  const location = useLocation();
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [isRing, setIsRing] = useState(false);
  const getShape1 = JSON.parse(sessionStorage.getItem('customizeSteps'))
  const getShape2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'))
  const getShape3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'))
  const getShape4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'))
  const forTabletResp = useMediaQuery('(max-width: 1000px)');

  const isEarring = JSON?.parse(sessionStorage.getItem('isPair')) ?? "";

  useEffect(() => {
    setIsRing(location?.pathname.split('/')[3])
  }, [location?.pathname])

  useEffect(() => {
    const storeData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeData);

    const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    setLoginCurrency(loginData);

    const metalC = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
    setMetalColor(metalC)
  }, []);


  const handleRemoveItem = (index) => {
    const storedData = JSON.parse(sessionStorage.getItem('custStepData'));
    const storedData2 = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
    const storedData3 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
    const storedData4 = JSON.parse(sessionStorage.getItem('custStepData2Earring'));
    const storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
    const storedSteps3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
    const storedSteps4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));

    const shapename = storedSteps?.[0]?.shape ?? (storedSteps2?.[0]?.Setting === 'Ring' && storedSteps2?.[0]?.Status === 'active' ? storedSteps2?.[1]?.shape : storedSteps3?.[0]?.Setting === 'Pendant' && storedSteps3?.[0]?.Status === 'active' ? storedSteps3?.[1]?.shape : storedSteps4?.[1]?.shape);
    const ring = (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting) === 'Ring' ? true : false;
    const pendant = (storedSteps?.[0]?.Setting ?? storedSteps2?.[1]?.Setting ?? storedSteps3?.[1]?.Setting) === 'Pendant' ? true : false;;

    if (index === 0) {
      if (Array.isArray(storedData)) {
        if (storedSteps?.[1]?.Setting === "Ring") {
          let storedData2 = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
          if (!Array.isArray(storedData2)) {
            storedData2 = [];
          }

          if (storedData?.[1]) {
            storedData[1].id = 1;
          }

          if (storedData?.[1]?.step2Data) {
            storedData[1].step1Data = storedData[1].step2Data;
            delete storedData[1].step2Data;
          }

          if (storedData?.length > 0 && storedSteps?.[2]?.step3 === true) {
            // Insert modified storedData[1] at the 0 index of storedData2
            storedData2.unshift(storedData?.[1]);
            sessionStorage.setItem('custStepData2Ring', JSON.stringify(storedData2));
            if (storedData2?.length > 0) {
              sessionStorage.removeItem("custStepData");
            }
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
          }
          else {
            sessionStorage.removeItem("custStepData");
            sessionStorage.removeItem("custStepData2Ring");
            sessionStorage.removeItem("setImage");
            sessionStorage.removeItem("isRing");
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
          }
        }
        if (storedSteps?.[1]?.Setting === "Pendant") {
          let storedData3 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
          if (!Array.isArray(storedData3)) {
            storedData3 = [];
          }

          if (storedData?.[1]) {
            storedData[1].id = 2;
          }

          if (storedData?.[1]?.step2Data) {
            storedData[1].step1Data = storedData[1].step2Data;
            delete storedData[1].step2Data;
          }

          if (storedData?.length > 0 && storedSteps?.[2]?.step3 === true) {
            // Insert modified storedData[1] at the 0 index of storedData2
            storedData3.unshift(storedData?.[1]);
            sessionStorage.setItem('custStepData2Pendant', JSON.stringify(storedData3));

            if (storedData3?.length > 0) {
              sessionStorage.removeItem("custStepData");
            }
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
          } else {
            sessionStorage.removeItem("custStepData");
            sessionStorage.removeItem("custStepData2Pendant");
            sessionStorage.removeItem("setPenImage");
            sessionStorage.removeItem("isPendant");
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
          }
        }

        if (storedSteps?.[1]?.Setting === "Earring") {
          let storedData4 = JSON.parse(sessionStorage.getItem('custStepData2Earring'));
          if (!Array.isArray(storedData4)) {
            storedData4 = [];
          }

          if (storedData?.[1]) {
            storedData[1].id = 3;
          }

          if (storedData?.[1]?.step2Data) {
            storedData[1].step1Data = storedData[1].step2Data;
            delete storedData[1].step2Data;
          }

          if (storedData?.length > 0 && storedSteps?.[2]?.step3 === true) {
            // Insert modified storedData[1] at the 0 index of storedData2
            storedData4.unshift(storedData?.[1]);
            sessionStorage.setItem('custStepData2Earring', JSON.stringify(storedData4));

            if (storedData4?.length > 0) {
              sessionStorage.removeItem("custStepData");
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
            }
          } else {
            sessionStorage.removeItem("custStepData");
            sessionStorage.removeItem("custStepData2Earring");
            sessionStorage.removeItem("setEarImage");
            sessionStorage.removeItem("isPair");
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
          }
        }

        if (storedSteps?.[0]?.step1 === true) {
          sessionStorage.removeItem("custStepData");
          window.location.href = `/certified-loose-lab-grown-diamonds/diamond/`
        }
        handleOpen(null)
        // sessionStorage.setItem('custStepData', JSON.stringify(storedData));
      }

      if (Array.isArray(storedData2) && storedSteps2?.[0]?.Status === 'active') {
        let storedData = JSON.parse(sessionStorage.getItem('custStepData'));
        if (!Array.isArray(storedData)) {
          storedData = [];
        }

        if (storedData2?.[1]?.step2Data) {
          storedData2[1].step1Data = storedData2[1].step2Data;
          delete storedData2[1].step2Data;
        }

        if (storedData2?.length > 0 && storedSteps2?.[2]?.step3 === true) {
          storedData.unshift(storedData2?.[1]);
          sessionStorage.setItem('custStepData', JSON.stringify(storedData));
          if (storedData?.length > 0) {
            sessionStorage.removeItem("custStepData2Ring");
            sessionStorage.removeItem("setImage");
          }
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
        }
        else {
          sessionStorage.removeItem("custStepData");
          sessionStorage.removeItem("custStepData2Ring");
          sessionStorage.removeItem("setImage");
          sessionStorage.removeItem("isRing");
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
        }

        handleOpen(null)
      }
      if (Array.isArray(storedData3) && storedSteps3?.[0]?.Status === 'active') {
        let storedData = JSON.parse(sessionStorage.getItem('custStepData'));
        if (!Array.isArray(storedData)) {
          storedData = [];
        }

        if (storedData3?.[1]?.step2Data) {
          storedData3[1].step1Data = storedData3[1].step2Data;
          delete storedData3[1].step2Data;
        }

        if (storedData?.length > 0 && storedSteps?.[2]?.step3 === true) {
          storedData.unshift(storedData3?.[1]);
          sessionStorage.setItem('custStepData', JSON.stringify(storedData));
          if (storedData?.length > 0) {
            sessionStorage.removeItem("custStepData2Pendant");
            sessionStorage.removeItem("setPenImage");
          }
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
        }
        else {
          sessionStorage.removeItem("custStepData");
          sessionStorage.removeItem("custStepData2Pendant");
          sessionStorage.removeItem("setPenImage");
          sessionStorage.removeItem("isPendant");
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "Pendant" : "Earring")}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "UGVuZGFudC9jYXRlZ29yeQ==" : "RWFycmluZy9jYXRlZ29yeQ==")}`, { replace: true });
        }

        handleOpen(null)
      }
      if (Array.isArray(storedData4) && storedSteps4?.[0]?.Status === 'active') {
        let storedData = JSON.parse(sessionStorage.getItem('custStepData'));
        if (!Array.isArray(storedData)) {
          storedData = [];
        }

        if (storedData4?.[1]?.step2Data) {
          storedData4[1].step1Data = storedData4[1].step2Data;
          delete storedData4[1].step2Data;
        }

        if (storedData4?.length > 0 && storedSteps4?.[2]?.step3 === true) {
          storedData.unshift(storedData4?.[1]);
          sessionStorage.setItem('custStepData', JSON.stringify(storedData));
          if (storedData?.length > 0) {
            sessionStorage.removeItem("custStepData2Earring");
            sessionStorage.removeItem("setEarImage");
          }
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "Pendant" : "Earring")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape && storedSteps3?.[0]?.Status === "active" ? storedSteps3?.[1]?.shape : storedSteps4?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "UGVuZGFudC9jYXRlZ29yeQ==" : "RWFycmluZy9jYXRlZ29yeQ==")} `, { replace: true });
        }
        else {
          sessionStorage.removeItem("custStepData");
          sessionStorage.removeItem("custStepData2Earring");
          sessionStorage.removeItem("setEarImage");
          sessionStorage.removeItem("isPair");
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "Pendant" : "Earring")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape && storedSteps3?.[0]?.Status === "active" ? storedSteps3?.[1]?.shape : storedSteps4?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "UGVuZGFudC9jYXRlZ29yeQ==" : "RWFycmluZy9jYXRlZ29yeQ==")} `, { replace: true });
        }

        handleOpen(null)
      }
    }
    else {
      if (Array.isArray(storedData)) {
        if (storedData?.[1]?.step2Data?.id > 0) {
          storedData.pop();
          sessionStorage.setItem('custStepData', JSON.stringify(storedData));

          sessionStorage.removeItem('setImage');
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting}/diamond_shape=${storedSteps?.[0]?.shape}/M=${(storedSteps?.[1]?.Setting === "Ring" ? "UmluZy9jYXRlZ29yeQ==" : storedSteps?.[1]?.Setting === "Pendant" ? "UGVuZGFudC9jYXRlZ29yeQ==" : "RWFycmluZy9jYXRlZ29yeQ==")} `, { replace: true });
        } else {
          console.warn("storedData is not a valid array or doesn't meet the condition.");
        }

        handleOpen(null);
      }

      if (Array.isArray(storedData2) && storedSteps2?.[0]?.Status === 'active') {
        if (storedData2?.[1]?.step2Data?.[0]?.stockno) {
          storedData2.pop();
          sessionStorage.setItem('custStepData2Ring', JSON.stringify(storedData2));
          Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
        } else {
          console.warn("storedData2 is not a valid array or doesn't meet the condition.");
        }
        handleOpen(null)
      }
      if (Array.isArray(storedData3) && storedSteps3?.[0]?.Status === 'active') {
        if (storedData3?.[1]?.step2Data?.[0]?.stockno) {
          storedData3.pop();
          sessionStorage.setItem('custStepData2Pendant', JSON.stringify(storedData3));
          Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
        } else {
          console.warn("storedData2 is not a valid array or doesn't meet the condition.");
        }
        handleOpen(null)
      }
      if (Array.isArray(storedData4) && storedSteps4?.[0]?.Status === 'active') {
        if (storedData4?.[1]?.step2Data?.[0]?.stockno) {
          storedData4.pop();
          sessionStorage.setItem('custStepData2Earring', JSON.stringify(storedData4));
          Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
        } else {
          console.warn("storedData2 is not a valid array or doesn't meet the condition.");
        }
        handleOpen(null)
      }
    }

    if (index === 0) {
      if (Array.isArray(storedSteps)) {
        if (storedData?.[0]?.step1Data?.[0]?.stockno) {
          handleOpen(null)
          if (storedSteps?.[1]?.Setting === "Ring") {
            let step1;
            let step2;
            let storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
            if (!Array.isArray(storedSteps2)) {
              storedSteps2 = [];
            }

            if (storedSteps?.[1]) {
              step1 = { step1: true, Setting: "Ring", id: 1, Status: "active" };
              step2 = { step2: true, shape: shapename, id: 1 };
            }

            if (storedSteps?.length > 0 && storedSteps?.[2]?.step3 === true) {
              storedSteps2.unshift(step1, step2);
              sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(storedSteps2));
              if (storedSteps2?.length > 0) {
                sessionStorage.removeItem("customizeSteps");
              }
            }
            else {
              sessionStorage.removeItem("customizeSteps");
              sessionStorage.removeItem("customizeSteps2Ring");
            }
          }

          if (storedSteps?.[1]?.Setting === "Pendant") {
            let step1;
            let step2;
            let storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
            if (!Array.isArray(storedSteps2)) {
              storedSteps2 = [];
            }

            if (storedSteps?.[1]) {
              step1 = { step1: true, Setting: "Pendant", id: 2, Status: "active" };
              step2 = { step2: true, shape: shapename, id: 2 };
            }

            if (storedSteps?.length > 0 && storedSteps?.[2]?.step3 === true) {
              storedSteps2.unshift(step1, step2);
              sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(storedSteps2));
              if (storedSteps2?.length > 0) {
                sessionStorage.removeItem("customizeSteps");
              }
            }
            else {
              sessionStorage.removeItem("customizeSteps");
              sessionStorage.removeItem("customizeSteps2Pendant");
            }
          }

          if (storedSteps?.[1]?.Setting === "Earring") {
            let step1;
            let step2;
            let storedSteps3 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));
            if (!Array.isArray(storedSteps3)) {
              storedSteps3 = [];
            }

            if (storedSteps?.[1]) {
              step1 = { step1: true, Setting: "Earring", id: 3, Status: "active" };
              step2 = { step2: true, shape: shapename, id: 3 };
            }

            if (storedSteps?.length > 0 && storedSteps?.[2]?.step3 === true) {
              storedSteps3.unshift(step1, step2);
              sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(storedSteps3));
              if (storedSteps3?.length > 0) {
                sessionStorage.removeItem("customizeSteps");
              }
            }
            else {
              sessionStorage.removeItem("customizeSteps");
              sessionStorage.removeItem("customizeSteps2Earring");
            }
          }

          if (storedSteps?.[0]?.step1 === true) {
            sessionStorage.removeItem("customizeSteps");
          }
        }
      }

      if (Array.isArray(storedSteps2) && storedSteps2?.[0]?.Status === 'active') {
        let step1;
        let step2;
        let storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
        if (!Array.isArray(storedSteps)) {
          storedSteps = [];
        }

        if (storedSteps2?.[1]) {
          step1 = { step1: true, shape: shapename, id: 1 };
          step2 = { step2: true, Setting: "Ring", id: 1 };
        }

        if (storedData2?.length > 0 && storedSteps2?.[2]?.step3 === true) {
          storedSteps.unshift(step1, step2);
          sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));
          if (storedSteps?.length > 0) {
            sessionStorage.removeItem("customizeSteps2Ring");
          }
        }
        else {
          sessionStorage.removeItem("customizeSteps");
          sessionStorage.removeItem("customizeSteps2Ring");
        }

      }
      if (Array.isArray(storedSteps3) && storedSteps3?.[0]?.Status === 'active') {
        let step1;
        let step2;
        let storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
        if (!Array.isArray(storedSteps)) {
          storedSteps = [];
        }

        if (storedSteps3?.[1]) {
          step1 = { step1: true, shape: shapename, id: 2 };
          step2 = { step2: true, Setting: "Pendant", id: 2 };
        }

        // Optionally remove customizeSteps from sessionStorage

        if (storedData3?.length > 0 && storedSteps3?.[2]?.step3 === true) {
          storedSteps.unshift(step1, step2);
          sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));
          if (storedSteps?.length > 0) {
            sessionStorage.removeItem("customizeSteps2Pendant");
          }
        }
        else {
          sessionStorage.removeItem("customizeSteps");
          sessionStorage.removeItem("customizeSteps2Pendant");
        }
      }

      if (Array.isArray(storedSteps4) && storedSteps4?.[0]?.Status === 'active') {
        let step1;
        let step2;
        let storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
        if (!Array.isArray(storedSteps)) {
          storedSteps = [];
        }

        if (storedSteps4?.[1]) {
          step1 = { step1: true, shape: shapename, id: 3 };
          step2 = { step2: true, Setting: "Earring", id: 3 };
        }


        if (storedData4?.length > 0 && storedSteps4?.[2]?.step3 === true) {
          storedSteps.unshift(step1, step2);
          sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));
          if (storedSteps?.length > 0) {
            sessionStorage.removeItem("customizeSteps2Earring");
          }
        }
        else {
          sessionStorage.removeItem("customizeSteps");
          sessionStorage.removeItem("customizeSteps2Earring");
        }
      }
    }
    else {
      if (Array.isArray(storedSteps)) {
        storedSteps.pop();
        sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));

        // Navigation(`/certified-loose-lab-grown-diamonds/settings/${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "Ring" : "Pendant"}/diamond_shape=${(storedSteps?.[0]?.shape ?? storedSteps2?.[1]?.shape ?? storedSteps3?.[1]?.shape)}/M=${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ=="}`);

        handleOpen(null);
      }

      if (Array.isArray(storedSteps2) && storedSteps2?.[0]?.Status === 'active') {
        storedSteps2.pop();
        handleOpen(null)
        sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(storedSteps2));
        // Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
      }
      if (Array.isArray(storedSteps3) && storedSteps3?.[0]?.Status === 'active') {
        storedSteps3.pop();
        handleOpen(null)
        sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(storedSteps3));
        // Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
      }
      if (Array.isArray(storedSteps4) && storedSteps4?.[0]?.Status === 'active') {
        storedSteps4.pop();
        handleOpen(null)
        sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(storedSteps4));
        // Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
      }
    }
  };

  const handleInnerClick = (event) => {
    event.stopPropagation();
  };

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

  const handleMoveToDet = (data) => {
    if ((data?.[0]?.stockno && data?.[1]?.stockno) || data?.stockno) {
      const obj = {
        a: isEarring ? [data?.[0]?.stockno, data?.[1]?.stockno] : data?.stockno,
        b: data?.shapename,
      };

      let encodeObj = compressAndEncode(JSON.stringify(obj));

      let navigateUrl;
      if (isEarring) {
        navigateUrl = `/d/pair-diamonds/det345/?p=${encodeObj}`;
      } else {
        navigateUrl = `/d/${data?.stockno}/det345/?p=${encodeObj}`;
      }
      handleOpen(null)
      if (isEarring) {
        Navigation(navigateUrl, { state: [{ isPair: true }, { stockno1: data?.[0]?.stockno }, { stockno2: data?.[1]?.stockno }] });
      } else {
        Navigation(navigateUrl);
      }
    }
    if ((data?.autocode ?? data?.step1Data?.autocode)) {
      let pValue = {
        menuname: (getShape1?.[1]?.Setting === 'Ring' || getShape2?.[0]?.Setting === 'Ring' || getShape3?.[0]?.Setting === 'Ring')
          ? 'Engagement Ring'
          : (getShape1?.[1]?.Setting === 'Pendant' || getShape2?.[0]?.Setting === 'Pendant' || getShape3?.[0]?.Setting === 'Pendant')
            ? 'Diamond Pendants'
            : 'Diamond Earrings'
      };
      let obj = {
        a: (data?.autocode ?? data?.step1Data?.autocode),
        b: (data?.designno ?? data?.step1Data?.designno),
        m: (data?.MetalPurityid ?? data?.selectedMetalId),
        d: (loginUserDetail?.cmboDiaQCid ?? data?.selectedDiaId),
        c: (loginUserDetail?.cmboCSQCid ?? data?.selectedCsId),
        mc: (data?.MetalColorid ?? data?.step1Data?.MetalColorid),
        p: pValue,
        f: {},
      };
      let encodeObj = compressAndEncode(JSON.stringify(obj));

      handleOpen(null)
      Navigation(
        `/d/${(data?.TitleLine ?? data?.step1Data?.TitleLine).replace(/\s+/g, `_`)}${(data?.TitleLine ?? data?.step1Data?.TitleLine)?.length > 0 ? "_" : ""
        }${(data?.designno ?? data?.step1Data?.designno)}/${pValue.menuname.split(' ').join('_')}/?p=${encodeObj}`
      );
    }
  }

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => reject(src);
    });
  };

  let getDesignImageFol = storeInit?.CDNDesignImageFol;
  // let getDesignImageFol = storeInit?.DesignImageFol;

  const getDynamicImages = async (imageData, designno, MetalColorid, extension) => {
    const matchMetalColorid = metalColor.find((color) => color?.id === MetalColorid);
    const baseImagePath = `${getDesignImageFol}${designno}~${1}`;
    const colorImage = imageData?.ImageCount > 0 ? `${baseImagePath}~${matchMetalColorid?.colorcode}.${extension}` : imageNotFound;
    const defaultImage = imageData?.ImageCount > 0 ? `${baseImagePath}.${extension}` : imageNotFound;

    try {
      await Promise.all([
        loadImage(colorImage),
        loadImage(defaultImage),
      ]);
      return colorImage; // return the color image if it loads successfully
    } catch {
      return defaultImage; // fallback to default if color fails
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      if (!data?.stockno) {
        let loadedImages;
        const currentData = data?.step1Data ?? data;

        const designno = currentData?.designno;
        const MetalColorid = currentData?.MetalColorid;
        const ImageExtension = currentData?.ImageExtension;

        const colorImage = await getDynamicImages(currentData, designno, MetalColorid, ImageExtension);
        loadedImages = { colorImage };
        setImageMap(loadedImages);
      }
    };
    loadImages();
  }, [data, getImagePath]);


  return (
    <div
      className="for_dia_step_eye_div"
      onClick={() => handleOpen(null)}
      style={{ cursor: 'pointer' }}
      ref={ref}
    >
      <img
        className="for_dia_step_eye"
        src={forTabletResp ? StepImages[0]?.downIcon : StepImages[0]?.eyeIcon}
        alt=""
        style={{ cursor: 'pointer' }}
      />
      <div
        className="for_navigate_eye_div"
        style={{
          height: open ? "65px" : "0px",
          overflow: open ? "unset" : "hidden",
          cursor: 'default'
        }}
      >
        <div
          className="for_dia_data_div"
          onClick={handleInnerClick}
          style={{ cursor: 'default' }}
        >
          {isEarring ? (
            <>
              {data?.stockno && (
                <div>
                  <PairSvg />
                  <PairSvg />
                </div>
              )}
              {!data?.stockno && (
                <div className="for_dia_data_image">
                  <img
                    src={(getImagePath?.colorImage ?? imageMap?.colorImage)}
                    // src={data?.stockno ? data?.image_file_url : (!imageMap?.colorImage?.includes('/static') ? imageMap?.colorImage : getImagePath?.colorImage)}
                    alt=""
                    style={{ cursor: 'default' }}
                    onError={(e) => e.target.src = imageNotFound}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="for_dia_data_image">
              <img
                src={data?.stockno ? data?.image_file_url : (getImagePath?.colorImage ?? imageMap?.colorImage)}
                // src={data?.stockno ? data?.image_file_url : (!imageMap?.colorImage?.includes('/static') ? imageMap?.colorImage : getImagePath?.colorImage)}
                alt=""
                style={{ cursor: 'default' }}
                onError={(e) => e.target.src = imageNotFound}
              />
            </div>
          )}
          <div className="for_dia_price">
            {isEarring ? (
              <>
                {(getShape1?.[1]?.Setting === "Earring" && index === 0) ? (
                  <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(totalPairPrice)}</span>
                ) : (getShape4?.[0]?.Status === "active" && index === 1) ? (
                  <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(totalPairPrice)}</span>
                ) : (
                  <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(data?.price ?? (data?.UnitCostWithMarkUpIncTax ?? data?.step1Data?.UnitCostWithMarkUpIncTax))}</span>
                )}
              </>
            ) : (
              <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(data?.price ?? (data?.UnitCostWithMarkUpIncTax ?? data?.step1Data?.UnitCostWithMarkUpIncTax))}</span>
            )}

          </div>
          <div className="for_view_rem_div">
            <span onClick={(e) => { e.stopPropagation(); handleMoveToDet(data) }} className="for_view">View | </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveItem(index)
              }}
              className="for_rem"
            >
              &nbsp;Remove
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});


const TableComponents = ({ list, details }) => {

  const pcsTotalVal = [];
  const wtTotalVal = [];

  const getTotalPcs = list?.reduce((total, pcs) => total + pcs?.M, 0)
  pcsTotalVal.push({
    total: getTotalPcs
  })
  const getTotalWt = list?.reduce((total, WT) => total + WT?.N, 0)
  wtTotalVal.push({
    total: getTotalWt.toFixed(3)
  })

  return (
    <>
      <ul class='for_ProductDet_diaDet_ff'>
        <li>
          <div>
            {details.includes('MISC') ? (
              <>
                <span>{details}</span> <span>({pcsTotalVal[0]?.total} / {wtTotalVal[0]?.total}gm)</span>
              </>
            ) : (
              <>
                <span>{details}</span> <span>({pcsTotalVal[0]?.total} / {wtTotalVal[0]?.total}ct)</span>
              </>
            )}
          </div>
        </li>
      </ul>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead className='for_ProductDet_weight_names_ff' style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline' }}>
            <tr style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <th style={{ flex: '1' }}>Shape</th>
              <th style={{ flex: '1' }}>Clarity</th>
              <th style={{ flex: '1' }}>Color</th>
              <th style={{ flex: '1' }}>Pcs / wt</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((val, i) => (
              <tr key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.F}</td>
                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.H}</td>
                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.J}</td>
                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.M} / {(val?.N).toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

}

const TableComponentsMISC = ({ list, details }) => {

  const pcsTotalVal = [];
  const wtTotalVal = [];
  const pcsTotalVal1 = [];
  const wtTotalVal1 = [];

  const getTotalPcs = list?.filter((ele) => ele?.D !== "MISC")?.reduce((total, pcs) => total + pcs?.M, 0)
  pcsTotalVal.push({
    total: getTotalPcs
  })
  const getTotalWt = list?.filter((ele) => ele?.D !== "MISC")?.reduce((total, WT) => total + WT?.N, 0)
  wtTotalVal.push({
    total: getTotalWt.toFixed(3)
  })
  const getTotalPcs1 = list?.filter((ele) => ele?.D == "MISC")?.reduce((total, pcs) => total + pcs?.M, 0)
  pcsTotalVal1.push({
    total: getTotalPcs1
  })
  const getTotalWt1 = list?.filter((ele) => ele?.D == "MISC")?.reduce((total, WT) => total + WT?.N, 0)
  wtTotalVal1.push({
    total: getTotalWt1.toFixed(3)
  })

  return (
    <>
      <ul class='for_ProductDet_diaDet_ff'>
        <li>
          <div>
            {details.includes('MISC') ? (
              <>
                <span>{details}</span> <span>({pcsTotalVal1[0]?.total} / {wtTotalVal1[0]?.total}gm)</span>
              </>
            ) : (
              <>
                <span>{details}</span> <span>({pcsTotalVal[0]?.total} / {wtTotalVal[0]?.total}ct)</span>
              </>
            )}
          </div>
        </li>
      </ul>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead className='for_ProductDet_weight_names_ff' style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline' }}>
            <tr style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <th style={{ flex: '1' }}>Shape</th>
              <th style={{ flex: '1' }}>Clarity</th>
              <th style={{ flex: '1' }}>Color</th>
              <th style={{ flex: '1' }}>Pcs / wt</th>
            </tr>
          </thead>
          <tbody>
            {details.includes('MISC') ? (
              <>
                {list?.filter((ele) => ele?.D === 'MISC')?.map((val, i) => (
                  <tr key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.F}</td>
                    <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.H}</td>
                    <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.J}</td>
                    <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{`${val?.M} / ${(val?.N).toFixed(3)}`}</td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {list?.filter((ele) => ele?.D !== 'MISC')?.map((val, i) => (
                  <tr key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.F}</td>
                    <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.H}</td>
                    <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.J}</td>
                    <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{`${val?.M} / ${(val?.N).toFixed(3)}`}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );

}



const CheckingSettingSetModal = ({ open, data, Steps, handleClose, productData, setImage }) => {
  const navigate = useNavigate();
  const handleYesConfirm = () => {
    if (Steps?.[0] || Steps?.[1]) {
      if (Steps[0].Setting === "Ring") {
        Steps.pop();
        Steps[1].shape = productData?.ShapeName;
        sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(Steps));
        data.step1Data = productData;
        sessionStorage.setItem('custStepData2Ring', JSON.stringify([data]));
        sessionStorage.removeItem('setImage');
        sessionStorage.setItem('setImage', JSON.stringify(setImage));
        sessionStorage.setItem('ringFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`))
        navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
      }
      else if (Steps[0]?.Setting === 'Pendant') {
        Steps.pop();
        Steps[1].shape = productData?.ShapeName;
        sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(Steps));
        data.step1Data = productData;
        sessionStorage.setItem('custStepData2Pendant', JSON.stringify([data]));
        sessionStorage.setItem('setPenImage', JSON.stringify(setImage));
        sessionStorage.setItem('PendantFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`))
        navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
      }
      else if (Steps[0]?.Setting === 'Earring') {
        Steps.pop();
        Steps[1].shape = productData?.ShapeName;
        sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(Steps));
        data.step1Data = productData;
        sessionStorage.setItem('custStepData2Earring', JSON.stringify([data]));
        sessionStorage.setItem('setEarImage', JSON.stringify(setImage));
        sessionStorage.setItem('EarringFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`))
        navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
      }
      else if (Steps[0]?.shape !== "" && Steps[0]?.step1 === true) {
        const stepsBackup = [...Steps];
        Steps = [];
        Steps.push({
          step1: true,
          Setting: stepsBackup[1]?.Setting,
          id: stepsBackup[1]?.Setting === "Ring" ? 1 : stepsBackup[1]?.Setting === "Pendant" ? 2 : 3,
          Status: "active",
        });
        Steps.push({
          step2: true,
          shape: productData?.ShapeName,
          id: stepsBackup[1]?.Setting === "Ring" ? 1 : stepsBackup[1]?.Setting === "Pendant" ? 2 : 3,
        });
        data.step1Data = data.step2Data; // Copy step2Data to step1Data
        delete data.step2Data; // Remove the step2Data key
        data.step1Data = productData;

        if (stepsBackup[1]?.Setting === "Ring") {
          sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(Steps));
          sessionStorage.setItem('custStepData2Ring', JSON.stringify([data]));
          sessionStorage.removeItem('customizeSteps');
          sessionStorage.removeItem('custStepData');
          sessionStorage.setItem('ShapeRingFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`));
          navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
        } else if (stepsBackup[1]?.Setting === "Pendant") {
          sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(Steps));
          sessionStorage.setItem('custStepData2Pendant', JSON.stringify([data]));
          sessionStorage.removeItem('customizeSteps');
          sessionStorage.removeItem('custStepData');
          sessionStorage.setItem('ShapePendantFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`));
          navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
        } else if (stepsBackup[1]?.Setting === "Earring") {
          sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(Steps));
          sessionStorage.setItem('custStepData2Earring', JSON.stringify([data]));
          sessionStorage.removeItem('customizeSteps');
          sessionStorage.removeItem('custStepData');
          sessionStorage.setItem('ShapeEarringFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`));
          navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
        }
      }
    }
  };

  const handleNoConfirm = () => {
    if (Steps?.[0] || Steps?.[1]) {
      if (Steps[0].Setting === "Ring") {
        navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`)
      }
      else if (Steps[0]?.Setting === 'Pendant') {
        navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ==`)
      }
      else if (Steps[0]?.Setting === 'Earring') {
        navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ==`)
      }
      else if (Steps[0]?.shape !== "") {
        if (Steps[1]?.Setting === 'Ring') {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`)
        }
        else if (Steps[1]?.Setting === 'Pendant') {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ==`)
        }
        else if (Steps[1]?.Setting === 'Earring') {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ==`)
        }
      }
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 9999999,
          "& .MuiDialog-root": {
            zIndex: 9999,
          },
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            border: "1px solid white",
            zIndex: 9999,
          },
          "& .MuiDialogContent-root": {
            padding: "10px",
          },
        }}
      >
        <DialogContent
          sx={{
            minWidth: 260,
            padding: "0px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="for_modal_cancel_btn_nav_div" onClick={handleClose}>
            <RxCross1 className="for_modal_cancel_nav_btn" size={"12px"} />
          </div>
          <div className="for_modal_inner_nav_div">
            <span className="for_modal_nav_title">
              This Setting Shape Is Not Matching With Your Already Selected Setting Shape.
              Do You Want To Remove Selected Setting And Continue?
            </span>
            <div className="for_modal_buttons_nav_div_1">
              <button
                onClick={() => {
                  handleYesConfirm();
                  handleClose();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleNoConfirm();
                }}
              >
                No
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
