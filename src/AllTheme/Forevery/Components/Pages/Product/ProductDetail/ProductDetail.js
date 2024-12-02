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
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, Rating, Skeleton, Typography, useMediaQuery } from '@mui/material';
import { getSizeData } from '../../../../../../utils/API/CartAPI/GetCategorySizeAPI';
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
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
import useZoom from '../../../hooks/UseZoom';
import OurServices from '../../Home/Common/OurServices/OurServices';
import Stockitems from '../InstockProduct/Stockitems';


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
  const getCartWishImgColor = JSON.parse(sessionStorage.getItem('cartWishImgColor'));
  const [colorImgFromURL, setColorImgFromURL] = useState();
  const [colorImgFromCartWish, setColorImgFromCartWish] = useState();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [CustPath, setCustpath] = useState(false);
  console.log('CustPath: ', CustPath);
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
  const [diaList, setDiaList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [SimilarBrandArr, setSimilarBrandArr] = useState([]);
  const [isDataFound, setIsDataFound] = useState(false)
  const [isPriceloading, setisPriceLoading] = useState(false);
  const [decodeUrl, setDecodeUrl] = useState({})
  console.log('decodeUrl: ', decodeUrl);
  const [loadingdata, setloadingdata] = useState(false);
  const [pdImageLoading, setPdImageLoading] = useState(false);
  const [path, setpath] = useState();
  console.log('path: ', path);
  const [metalWiseColorImg, setMetalWiseColorImg] = useState()
  const [videoArr, SETvideoArr] = useState([]);
  const [setshape, setSetShape] = useState();
  const stepsData = JSON.parse(sessionStorage.getItem('custStepData2'))
  const steps1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const [cartArr, setCartArr] = useState({});

  const [Swap, setswap] = useState("diamond");
  const breadCrumb = location?.pathname?.split("/")[2];

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useZoom(containerRef, imgRef);

  const StyleCondition = {
    fontSize: breadCrumb === "settings" && "14px",
    fontWeight: breadCrumb === "settings" && "700",
  };

  useEffect(() => {
    const handleCompset = () => {
      const getSetShape = JSON.parse(sessionStorage.getItem('customizeSteps')) ?? JSON.parse(sessionStorage.getItem('customizeSteps2'));
      setSetShape(getSetShape);
    }
    handleCompset();
  }, [])


  const setCartCountVal = useSetRecoilState(for_CartCount)
  const setWishCountVal = useSetRecoilState(for_WishCount)
  const [addToCardFlag, setAddToCartFlag] = useState(null);
  const [wishListFlag, setWishListFlag] = useState(null);
  const [PdImageArr, setPdImageArr] = useState([]);
  const [imageSrc, setImageSrc] = useState();
  const [ratingvalue, setratingvalue] = useState(5);

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
      mcArr = mtColorLocal?.filter(
        (ele) => ele?.colorcode == e.target.value
      )[0];
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

    // setMetalWiseColorImg(imgLink);

    let isImg = await checkImageAvailability(imgLink);

    if (isImg) {
      setMetalWiseColorImg(imgLink);
    } else {
      setMetalWiseColorImg();
    }

    let pd = singleProd;
    let pdImgListCol = [];
    let pdImgList = [];

    if (singleProd?.ColorImageCount > 0) {
      for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          i +
          "~" +
          mcArr?.colorcode +
          "." +
          singleProd?.ImageExtension;
        pdImgListCol.push(imgString);
      }
    }

    if (singleProd?.ImageCount > 0) {
      for (let i = 1; i <= singleProd?.ImageCount; i++) {
        let imgString =
          storeInit?.CDNDesignImageFol +
          singleProd?.designno +
          "~" +
          i +
          "." +
          singleProd?.ImageExtension;
        pdImgList.push(imgString);
      }
    }

    let isImgCol;

    if (pdImgListCol?.length > 0) {
      isImgCol = await checkImageAvailability(pdImgListCol[0]);
    }

    if (pdImgListCol?.length > 0 && isImgCol == true) {
      setSelectedThumbImg({ link: pdImgListCol[thumbImgIndex], type: "img" });
      setPdThumbImg(pdImgListCol);
      setThumbImgIndex(thumbImgIndex);
      const imageMap = pdImgListCol?.map((val, i) => {
        return { src: val, type: "img" };
      });
      setPdImageArr([...imageMap, ...videoArr]);
    } else {
      if (pdImgList?.length > 0) {
        setSelectedThumbImg({ link: pdImgList[thumbImgIndex], type: "img" });
        setPdThumbImg(pdImgList);
        setThumbImgIndex(thumbImgIndex);
        const imageMap = pdImgList?.map((val, i) => {
          return { src: val, type: "img" };
        });
        setPdImageArr([...imageMap, ...videoArr]);
        setPdImageLoading(false)
      }
    }

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
    sessionStorage.setItem('cartWishImgColor', JSON.stringify(mcArr?.id))

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
    // console.log("event", e.target.checked, ele, type);
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

    navigate(
      `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
      }${productData?.designno}?p=${encodeObj}`
    );
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
    const SettingSteps = JSON.parse(sessionStorage.getItem('customizeSteps2'));

    let mcArr;
    let mcArr1;

    const activeColorCode = colorImgFromURL ?? colorImgFromCartWish;
    console.log('activeColorCode: ', activeColorCode);

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

    console.log('mcArr1: ', mcArr1);


    mcArr =
      metalColorCombo?.find((ele) => {
        return ele?.colorcode == metalColor
      }) ?? metalColorCombo;

    console.log('mcArr: ', mcArr?.id);
    setImageSrc(mcArr?.id);
    sessionStorage.setItem('cartWishImgColor', JSON.stringify(mcArr?.id))

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

      if (type === "hasData") {
        const step1 = JSON.parse(sessionStorage.getItem("customizeSteps2"));
        const stepData = JSON.parse(sessionStorage.getItem("custStepData2"));

        const step1Index = stepData?.findIndex(item => item.step1Data !== undefined);

        const updatedStepData = [...stepData];
        if (step1Index !== -1) {
          updatedStepData[step1Index] = { "step1Data": singleProd1 ?? singleProd, 'selectedMetalId': selectedMetalId, 'selectedDiaId': selectedDiaId, 'selectedCsId': selectedCsId };
        } else {
          updatedStepData.unshift({ "step1Data": singleProd1 ?? singleProd, 'selectedMetalId': selectedMetalId, 'selectedDiaId': selectedDiaId, 'selectedCsId': selectedCsId });
        }

        sessionStorage.setItem('custStepData2', JSON.stringify(updatedStepData));

        navigate(`/d/setting-complete-product/det345/?p=${step1?.[2]?.url}`);
      }
      else {
        // Replace or add the step2 entry in the step1 data
        const updatedStep1 = SettingSteps?.map(step => {
          if (step.step2 !== undefined) {
            // Replace existing step2 data
            return { "step2": true, "shape": 'Oval' };
          }
          return step;
        });

        // If no existing step2, add new entry
        if (!updatedStep1.some(step => step.step2 !== undefined)) {
          updatedStep1.push({ "step2": true, "shape": 'Oval' });
        }
        const step1Data = [{ "step1Data": singleProd1 ?? singleProd, 'selectedMetalId': selectedMetalId, 'selectedDiaId': selectedDiaId, 'selectedCsId': selectedCsId }]
        sessionStorage.setItem('custStepData2', JSON.stringify(step1Data));
        sessionStorage.setItem("customizeSteps2", JSON.stringify(updatedStep1));


        navigate(`/certified-loose-lab-grown-diamonds/diamond/Oval`);
      }

    }
    else {

      const totalPrice = (Number(stepsData?.[0]?.step1Data?.[0]?.price) + Number((singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp))).toFixed(2);

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

  return (
    <div className="for_ProductDet_mainDiv">
      <div className="for_ProductDet_div">
        <div className="for_ProductDet_details_container">
          {CustPath === 'Diamond_Pendants' && (
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
                                  {PdImageArr?.length > 0 && PdImageArr.map((val, i) => (
                                    <div key={i} className="for_slider_card">
                                      <div className="for_image">
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
                                <div className="for_slider_card">
                                  <div className="for_image">
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
                          {` / ${path?.menuname}`}
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
                    <div className="for_ProductDet_title">
                      <span>{singleProd?.designno} {singleProd?.TitleLine?.length > 0 && " - " + singleProd?.TitleLine}</span>
                    </div>
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
                        <span>&nbsp;{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp)}</span>
                    }
                  </span>
                </div>
                <div className="for_productDet_ATC_div">
                  {CustPath === 'Engagement_Ring' || CustPath === 'Diamond_Pendants' ? (
                    <>
                      {stepsData?.[1]?.step2Data?.[0]?.id > 0 ? (
                        <button onClick={() => handleButtonChange("hasData")} className={`${btnstyle?.btn_for_new} for_productDet_choose_Dia ${btnstyle?.btn_15} ${isLoading ? 'disabled' : ''}`}>
                          choose this setting
                        </button>
                      ) : (
                        <button onClick={() => handleButtonChange("")} className={`${btnstyle?.btn_for_new} for_productDet_choose_Dia ${btnstyle?.btn_15} ${isLoading ? 'disabled' : ''}`}>
                          choose this setting
                        </button>
                      )}
                    </>
                  ) : (
                    <button onClick={() => handleCart(!addToCardFlag)} className={`${btnstyle?.btn_for_new} for_productDet_ATC ${btnstyle?.btn_15}`}>
                      {addToCardFlag === false ? "ADD TO CART" : "REMOVE FROM CART"}
                    </button>
                  )}

                </div>
                {/* <div className="for_productDet_shipping_fee_div">
                  <div className="for_productDet_shipping_icon">
                    <img className='for_productDet_shipp_image' src={`${storImagePath()}/images/ProductListing/Shipping/shipping-cart.png`} alt='shipping-icon' ></img>
                  </div>
                  <div className="for_productDet_shipp_desc">
                    <span className='for_shipp_desc_title_1'>Free shipping, free 30 days return</span>
                    <span className='for_shipp_desc_title_2'><span className='for_shipp_desc_bold'>Please Note :</span> If the diamond is part of a diamond ring, the completed ring will ship according to the shipping date of the setting</span>
                  </div>
                </div>
                <div className="for_productDet_calender_div">
                  <div className="for_productDet_calender_icon">
                    <img className='for_productDet_calender_image' src={`${storImagePath()}/images/ProductListing/Shipping/calendar.png`} alt='calender-icon' ></img>
                  </div>
                  <div className="for_productDet_calender_desc">
                    <span className='for_calender_desc_title_1'>order now and your order shipped by</span>
                    <span className='for_calender_desc_title_2'>Tuesday , August 20</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="for_ProductDet_prod_desc_mainDIv">
            <div className="for_ProductDet_desc">
              <span className='for_ProductDet_desc_title'>Product Description</span>
              <p className='for_ProductDet_desc_1_para'>Discover unparalleled elegance with our Italian-crafted Oval Diamond Ring, a masterpiece designed for the discerning luxury connoisseur. This exquisite ring features a brilliant oval lab-grown diamond, known for its impeccable clarity and extraordinary brilliance. Handcrafted in Italy, this piece marries timeless design with cutting-edge technology, offering a sustainable and ethically sourced alternative to traditional diamonds</p>
            </div>
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
              <span className='for_ProductDet_desc_title'>{CustPath === 'Engagement_Ring' ? 'Ring Description' : CustPath === 'Diamond_Pendants' ? 'Pendant Description' : 'Material Details'}</span>
              {/* <span className='for_ProductDet_desc_title'>Stone Information</span> */}
              <div className='for_ProductDet_desc_div'>
                {/* <div>Diamond Size : <span>0.50CT To 3.00CT</span></div>
                <div>Diamond Quality : <span>VVS2/VS1</span></div>
                <div>Diamond Color : <span> D / E</span></div>
                <div>Diamond Origin : <span>Lab Grown Diamond CVD TYPE 2A</span></div>
                <div>CARAT WEIGHT : <span>0.5</span></div> */}

                <div>Metal Purity : <span>{typeof metalType === 'string' ? metalType : null}</span></div>
                <div>Metal Color : <span>{metalColor && metalColor}</span></div>
                {(storeInit?.IsDiamondCustomization === 1 && diaQcCombo?.length > 0 && diaList?.length) ? (
                  <div>Diamond Quality Color : <span>{selectDiaQc}</span></div>
                ) : null}
                <div>Net Wt : <span>{(singleProd1?.Nwt ?? singleProd?.Nwt)?.toFixed(3)}</span></div>
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
                <div className="for_ProductDet_desc">
                  <div className="for_ProductDet_desc_title">Can be set with</div>
                  <div>{steps?.[0]?.shape} : <span>0.5 - 15 Ct.</span></div>
                </div>
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
            <OurServices />
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
          <div className="for_ProductDet_NewsLetter">
            <NewsletterSignup />
          </div>
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
  const Navigation = useNavigate();
  const location = useLocation();
  const isDiamondPage = 'diamond' || 'det345';
  const getStepName = location?.pathname.split('/');
  const getCustStepData = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const getdiaData = JSON.parse(sessionStorage.getItem('custStepData'));
  const setting = getStepName.includes('Engagement_Ring') || getStepName.includes('Diamond_Pendants');
  const settingActive = 'Ring' || 'Pendant' || 'Diamond_Pendants' || 'Engagement_Ring';
  const getCustStepData2 = JSON.parse(sessionStorage.getItem('customizeSteps2'));
  const getdiaData2 = JSON.parse(sessionStorage.getItem('custStepData2'));

  const getCompleteStep1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const getCompleteStep2 = JSON.parse(sessionStorage.getItem('customizeSteps2'));

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
              Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
              setswap("settings");
            }}
          >
            <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={
              ((getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? StepImages[1]?.img1 : StepImages[1]?.img) ||
              StepImages[1]?.img
            } alt="" /> Settings
          </span>
          {getdiaData2?.[0]?.step1Data && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData2?.[0]}
              ref={(el) => { dropdownRefs.current[0] = el; }}
            />
          )}
          {(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data}
              ref={(el) => { dropdownRefs.current[0] = el; }}
            />
          )}
        </div>

        <div className={`step_data ${isActive(isDiamondPage) ? 'active' : ''} d-1`}>
          <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
            setswap("diamond");
          }}>
            <img className='for_shapes_img' src={StepImages[0]?.img} alt="" /> Diamond
          </span>
          {(getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
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

        <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
          <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url)}`); setswap("finish"); }}>
            <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={((getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? StepImages[2]?.img1 : StepImages[2]?.img) ||
              StepImages[2]?.img} alt="" /> {(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'Pendant' : 'Ring'}
          </span>
          {(getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true) && (
            <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter((getCompleteStep1?.[2]?.price || getCompleteStep2?.[2]?.price))}</span>
          )}``
        </div>
      </>
    );
  };

  return (
    <>
      {getdiaData?.length > 0 || (getCustStepData?.[0]?.step1 === true ?? getCustStepData2?.[1]?.step2 === true) ? (
        <div className="diamond_Step_data_det">
          <div className={`step_data ${isActive(isDiamondPage) ? 'active' : ''} d-1`}>
            <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
              setswap("diamond");
            }}>
              <img className='for_shapes_img' src={StepImages[0]?.img} alt="" /> Diamond
            </span>
            {getdiaData?.[0]?.step1Data?.[0] && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData?.[0]?.step1Data?.[0]}
                ref={(el) => { dropdownRefs.current[0] = el; }}
              />
            )}
            {(getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
                ref={(el) => { dropdownRefs.current[0] = el; }}
              />
            )}
          </div>

          <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
            <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition}
              onClick={() => {
                Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                setswap("settings");
              }}
            >
              <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={((getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? StepImages[1]?.img1 : StepImages[1]?.img) ||
                StepImages[2]?.img} alt="" /> Settings
            </span>
            {(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
            {getdiaData2?.[0]?.step1Data && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={getdiaData2?.[0]}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
          </div>

          <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
            <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url)}`); setswap("finish"); }}>
              <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={((getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? StepImages[2]?.img1 : StepImages[2]?.img) ||
                StepImages[2]?.img} alt="" /> {(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'Pendant' : 'Ring'}
            </span>
            {(getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true) && (
              <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter((getCompleteStep1?.[2]?.price || getCompleteStep2?.[2]?.price))}</span>
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
                  <span style={StyleCondition} onClick={() => Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.step3?.url ?? getCompleteStep2?.[2]?.url)}`)}>
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

const HandleDrp = forwardRef(({ index, open, handleOpen, data }, ref) => {
  const [storeInit, setStoreInit] = useState({});
  const [loginCurrency, setLoginCurrency] = useState();
  const [metalColor, setMetalColor] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const Navigation = useNavigate();
  const location = useLocation();
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [isRing, setIsRing] = useState(false);
  const getShape1 = JSON.parse(sessionStorage.getItem('customizeSteps'))
  const getShape2 = JSON.parse(sessionStorage.getItem('customizeSteps2'))
  const forTabletResp = useMediaQuery('(max-width: 1000px)');

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
    const storedData2 = JSON.parse(sessionStorage.getItem('custStepData2'));
    const storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2'));

    if (index === 0) {
      sessionStorage.removeItem('custStepData');
      sessionStorage.removeItem('custStepData2');
      handleOpen(null)
    }
    else {
      if (Array.isArray(storedData)) {
        storedData.splice(index, 1);
        handleOpen(null)

        sessionStorage.setItem('custStepData', JSON.stringify(storedData));
      }
      if (Array.isArray(storedData2)) {
        storedData2.splice(index, 1);
        handleOpen(null)

        sessionStorage.setItem('custStepData2', JSON.stringify(storedData2));
      }
    }

    if (index === 0) {
      sessionStorage.removeItem('customizeSteps');
      sessionStorage.removeItem('customizeSteps2');
      handleOpen(null)
    }
    else {
      if (Array.isArray(storedSteps)) {
        storedSteps.splice(index, 2);
        handleOpen(null)

        sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));
      }
      if (Array.isArray(storedSteps2)) {
        storedSteps2.splice(index, 2);
        handleOpen(null)

        sessionStorage.setItem('customizeSteps2', JSON.stringify(storedSteps2));
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
    if (data?.stockno) {
      const obj = {
        a: data?.stockno,
        b: data?.shapename,
      };

      let encodeObj = compressAndEncode(JSON.stringify(obj));

      let navigateUrl = `/d/${data?.stockno}/det345/?p=${encodeObj}`;
      handleOpen(null)
      Navigation(navigateUrl);
    }
    if ((data?.autocode ?? data?.step1Data?.autocode)) {
      let pValue = getShape1?.[1]?.Setting === 'Ring' ? { menuname: 'Engagement Ring' } : { menuname: 'Diamond Pendants' } || getShape2?.[0]?.Setting === 'Ring' ? { menuname: 'Engagement Ring' } : { menuname: 'Diamond Pendants' }
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
    // const baseImagePath = `${getDesignImageFol}${designno}_${1}`;
    const colorImage = imageData?.ImageCount > 0 ? `${baseImagePath}~${matchMetalColorid?.colorcode}.${extension}` : imageNotFound;
    // const colorImage = imageData?.ImageCount > 0 ? `${baseImagePath}_${matchMetalColorid?.colorcode}.${extension}` : imageNotFound;
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
  }, [data]);


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
          <div className="for_dia_data_image">
            <img
              src={data?.stockno ? data?.image_file_url : imageMap?.colorImage}
              alt=""
              style={{ cursor: 'default' }}
            />
          </div>
          <div className="for_dia_price">
            <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(data?.price ?? (data?.UnitCostWithMarkUp ?? data?.step1Data?.UnitCostWithMarkUp))}</span>
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
                <span>{details}</span> <span>({pcsTotalVal[0]?.total}/{wtTotalVal[0]?.total}gm)</span>
              </>
            ) : (
              <>
                <span>{details}</span> <span>({pcsTotalVal[0]?.total}/{wtTotalVal[0]?.total}ct)</span>
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
              <th style={{ flex: '1' }}>Pcs/wt</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((val, i) => (
              <tr key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.F}</td>
                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.H}</td>
                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.J}</td>
                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.M}/{(val?.N).toFixed(3)}</td>
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
                <span>{details}</span> <span>({pcsTotalVal1[0]?.total}/{wtTotalVal1[0]?.total}gm)</span>
              </>
            ) : (
              <>
                <span>{details}</span> <span>({pcsTotalVal[0]?.total}/{wtTotalVal[0]?.total}ct)</span>
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
              <th style={{ flex: '1' }}>Pcs/wt</th>
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