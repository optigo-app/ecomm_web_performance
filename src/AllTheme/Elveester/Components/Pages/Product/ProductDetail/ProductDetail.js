import React, { useEffect, useRef, useState } from 'react'
import './ProductDetail.modul.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import imageNotFound from '../../../Assets/image-not-found.jpg'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Skeleton, Typography, useMediaQuery } from '@mui/material';
import Pako from 'pako';
import { el_CartCount, el_WishCount } from '../../../Recoil/atom';
import noImageFound from '../../../Assets/image-not-found.jpg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SingleProdListAPI } from '../../../../../../utils/API/SingleProdListAPI/SingleProdListAPI';
import { getSizeData } from '../../../../../../utils/API/CartAPI/GetCategorySizeAPI';
import { MetalTypeComboAPI } from '../../../../../../utils/API/Combo/MetalTypeComboAPI';
import { DiamondQualityColorComboAPI } from '../../../../../../utils/API/Combo/DiamondQualityColorComboAPI';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MetalColorCombo } from '../../../../../../utils/API/Combo/MetalColorCombo';
import { ColorStoneQualityColorComboAPI } from '../../../../../../utils/API/Combo/ColorStoneQualityColorComboAPI';
import { IoIosPlayCircle } from 'react-icons/io';
import { CartAndWishListAPI } from '../../../../../../utils/API/CartAndWishList/CartAndWishListAPI';
import { useSetRecoilState } from 'recoil';
import { RemoveCartAndWishAPI } from '../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI';
import { formatRedirectTitleLine, formatter, formatTitleLine } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import RelatedProduct from './RelatedProduct/RelatedProduct';
import { StockItemApi } from '../../../../../../utils/API/StockItemAPI/StockItemApi';
import { DesignSetListAPI } from '../../../../../../utils/API/DesignSetListAPI/DesignSetListAPI';
import DesignSet from './DesignSet/DesignSet';
import Stockitems from './InstockProduct/Stockitems';
import { SaveLastViewDesign } from '../../../../../../utils/API/SaveLastViewDesign/SaveLastViewDesign';
import { Helmet } from 'react-helmet';
import { FilterListAPI } from '../../../../../../utils/API/FilterAPI/FilterListAPI';
import { useImageZoom } from '../../../../../../hooks/UseImageZoom'
import JsonLd from '../../../Jsonld';
import useGlobalPreventSave from '../../../../../../utils/Glob_Functions/useGlobalPreventSave';



const ProductDetail = () => {
  const [maxWidth1400, setMaxWidth1400] = useState(false);
  const [maxWidth1000, setMaxWidth1000] = useState(false);
  const [decodeUrl, setDecodeUrl] = useState({})
  const [storeInit, setStoreInit] = useState({});
  const [loginData, setLoginData] = useState({});
  const [sizeData, setSizeData] = useState();
  const [singleProd, setSingleProd] = useState({});
  const [singleProd1, setSingleProd1] = useState({});
  const [diaList, setDiaList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [netWTData, setnetWTData] = useState([])
  const [SizeCombo, setSizeCombo] = useState([]);
  const [metalTypeCombo, setMetalTypeCombo] = useState([])
  const [metalType, setMetalType] = useState();
  const [isImageload, setIsImageLoad] = useState(true);
  const [IIIisImageload, setIIIIsImageLoad] = useState(false);
  const [metalColor, setMetalColor] = useState();
  const [selectDiaQc, setSelectDiaQc] = useState();
  const [showtDiaQc, setShowDiaQc] = useState();
  const [diaQcCombo, setDiaQcCombo] = useState([])
  const [csQcCombo, setCsQcCombo] = useState([])
  const [selectCsQC, setSelectCsQC] = useState();
  const [metalWiseColorImg, setMetalWiseColorImg] = useState([]);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [isPriceloading, setisPriceLoading] = useState(false);
  const [selectedThumbImg, setSelectedThumbImg] = useState({});
  const [pdThumbImg, setPdThumbImg] = useState([]);
  const [thumbImgIndex, setThumbImgIndex] = useState()
  const [pdVideoArr, setPdVideoArr] = useState([]);
  const [addToCardFlag, setAddToCartFlag] = useState(null);
  const [wishListFlag, setWishListFlag] = useState(null);
  const [isDataFound, setIsDataFound] = useState(false)
  const [pdLoadImage, setPdLoadImage] = useState(false);
  const location = useLocation();
  const [saveLastView, setSaveLastView] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [filterData, setFilterData] = useState([]);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const { imageRefs, handleMouseMove, handleMouseLeave } = useImageZoom(2.2);
  const [selectedMetalColor, setSelectedMetalColor] = useState();
  const getBreadCrumData = JSON.parse(sessionStorage.getItem("breadcrumbData")) ?? "";

  useGlobalPreventSave();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlaceholder(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  let cookie = Cookies.get('visiterId')

  const Navigate = useNavigate();

  const setCartCountVal = useSetRecoilState(el_CartCount)
  const setWishCountVal = useSetRecoilState(el_WishCount)
  const [loadingdata, setloadingdata] = useState(false);
  const [SimilarBrandArr, setSimilarBrandArr] = useState([]);
  const [designSetList, setDesignSetList] = useState();
  const [stockItemArr, setStockItemArr] = useState([]);
  const [cartArr, setCartArr] = useState({});

  let maxWidth1400pxAndMinWidth1000px = useMediaQuery('(max-width: 1400px) and (min-width: 1000px)');
  let maxWidth1400px = useMediaQuery('(max-width:1400px)')
  let maxWidth1000px = useMediaQuery('(max-width:1000px)')
  useEffect(() => {
    const handleMax1400px = () => {
      if (maxWidth1400pxAndMinWidth1000px) {
        setMaxWidth1400(true)
      }
      else {
        setMaxWidth1400(false)
      }
    }

    const handleMax1000px = () => {
      if (maxWidth1000px) {
        setMaxWidth1000(true)
        setMaxWidth1400(false)
      }
      else {
        setMaxWidth1000(false)
      }
    }

    handleMax1400px();
    handleMax1000px();

    // const getDiamonddata = sessionStorage.getItem

  }, [maxWidth1400px, maxWidth1000px])

  const getDynamicImages = (designno, extension) => {
    const getDesignImageFol = storeInit?.CDNDesignImageFol;
    const url = `${getDesignImageFol}${designno}~1.${extension}`;
    return url;
  }

  const hasValidData = singleProd1 && Object.keys(singleProd1).length > 0;
  const product = hasValidData ? singleProd1 : singleProd;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product?.TitleLine,
    "image": pdThumbImg,
    "description": product?.description,
    "sku": product?.designno,
    "isRelatedTo": {
      "@type": "Collection",
      "name": product?.collection
    },
    "offers": {
      "@type": "Offer",
      "url": `${window.location.href}`,
      "priceCurrency": `${loginData?.CurrencyCode || storeInit?.CurrencyCode}`,
      "price": product?.UnitCostWithMarkUp,
    }
  };
  // "brand": {
  //   "@type": "Brand",
  //   "name": "MyBrand"
  // },

  const baseUrl = window.location.origin;

  const breadcrumbData = [
    { name: "Homne", url: baseUrl },
    {
      name: "Product",
      url: `${getBreadCrumData}`,
    },
    {
      name: "Product Detail",
      url: `${baseUrl}${location?.pathname}${location?.search}`,
    },
  ];

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

  const jsonLd = generateBreadcrumbJsonLd(breadcrumbData);

  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    if (!pdVideoArr || !selectedMetalColor) return;

    const colorMatched = pdVideoArr.filter((url) => {
      const parts = url.split("~");
      const colorPart = parts[2]?.split(".")[0];
      return colorPart === selectedMetalColor;
    });

    if (colorMatched.length > 0) {
      setFilteredVideos(colorMatched);
    } else {
      // Fallback: videos without any color in the filename
      const noColorVideos = pdVideoArr.filter((url) => {
        const parts = url.split("~");
        return parts.length === 2; // means format is like MCJ66~1.mp4
      });
      setFilteredVideos(noColorVideos);
    }
  }, [pdVideoArr, selectedMetalColor]);

  // API Integration

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(prevState => !prevState);
  };

  const [isClamped, setIsClamped] = useState(false);

  const descriptionRef = useRef(null);
  const descriptionText = singleProd1?.description ?? singleProd?.description;

  useEffect(() => {
    setIsClamped(false);
    setIsExpanded(false);

    const checkTextOverflow = () => {
      const descriptionElement = descriptionRef.current;
      if (descriptionElement) {
        const isOverflowing =
          descriptionElement.scrollHeight > descriptionElement.clientHeight;
        setIsClamped(isOverflowing);
      }
    };

    checkTextOverflow();

    window.addEventListener('resize', checkTextOverflow);
    return () => {
      window.removeEventListener('resize', checkTextOverflow);
    };
  }, [descriptionText, descriptionRef])

  useEffect(() => {
    setIsClamped(false);
    setIsExpanded(false);
  }, [location?.key])

  const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
  const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
  const csQcLocal = JSON.parse(sessionStorage.getItem('ColorStoneQualityColorCombo'));
  const mtColorLocal = JSON.parse(sessionStorage.getItem('MetalColorCombo'));

  useEffect(() => {
    if (metalTypeCombo.length) {
      const mtType = metalTypeCombo.find(ele => ele.Metalid === singleProd?.MetalPurityid)?.metaltype;
      setMetalType(mtType);
    }
    if (metalColorCombo.length) {
      const getCurrentMetalColor = mtColorLocal.find((ele) => ele?.id === singleProd?.MetalColorid)?.colorcode;
      setMetalColor(getCurrentMetalColor);
    }
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
        return ele?.Quality == selectDiaQc.split(",")[0] &&
          ele?.color == selectDiaQc.split(",")[1]
      }) ?? diaQcCombo;

    const cs =
      csQcCombo?.find((ele) => {
        return ele?.Quality == selectCsQC.split(",")[0] &&
          ele?.color == selectCsQC.split(",")[1]
      }) ?? csQcCombo;

    const mcArr =
      metalColorCombo?.find((ele) => {
        return ele?.metalcolorname == metalColor
      }) ?? metalColorCombo;

    const prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.Metalid,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
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

  const handleWishList = async (e, elv) => {
    setWishListFlag(e?.target?.checked);

    let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
    let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let metal = metalTypeCombo?.filter((ele) => ele?.metaltype == metalType);

    let dia = diaQcCombo?.filter(
      (ele) =>
        ele?.Quality == selectDiaQc.split(",")[0] &&
        ele?.color == selectDiaQc.split(",")[1]
    );

    let cs = csQcCombo?.filter(
      (ele) =>
        ele?.Quality == selectCsQC.split(",")[0] &&
        ele?.color == selectCsQC.split(",")[1]
    );

    let mcArr = metalColorCombo?.filter((ele) => {
      if (metalColor) {
        return ele?.colorcode == metalColor;
      } else {
        return (
          ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
        );
      }
    })[0];

    let prodObj = {
      autocode: singleProd?.autocode,
      Metalid: metal?.length
        ? metal[0]?.Metalid
        : logininfoInside?.MetalId ?? storeinitInside?.MetalId,
      MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
      DiaQCid: dia?.length
        ? `${dia[0]?.QualityId},${dia[0]?.ColorId}`
        : logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid,
      CsQCid: cs?.length
        ? `${cs[0]?.QualityId},${cs[0]?.ColorId}`
        : logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid,
      Size: sizeData ?? singleProd1?.DefaultSize ?? singleProd?.DefaultSize,
      Unitcost: singleProd1?.UnitCost ?? singleProd?.UnitCost,
      markup: singleProd1?.DesignMarkUp ?? singleProd?.DesignMarkUp,
      UnitCostWithmarkup:
        singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp,
      Remark: "",
    };

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
                ele?.QualityId == (decodeobj?.d ? decodeobj?.d?.split(",")[0] : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid).split(",")[0]) &&
                ele?.ColorId == (decodeobj?.d ? decodeobj?.d?.split(",")[1] : (logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid).split(",")[1])
            )[0]
        }

        if (csQcLocal?.length) {
          csArr =
            csQcLocal?.filter(
              (ele) =>
                ele?.QualityId == (decodeobj?.c ? decodeobj?.c?.split(",")[0] : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid).split(",")[0]) &&
                ele?.ColorId == (decodeobj?.c ? decodeobj?.c?.split(",")[1] : (logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid).split(",")[1])
            )[0]
        }

        setMetalType(metalArr?.metaltype);

        setSelectDiaQc(`${diaArr?.Quality},${diaArr?.color}`);

        setSelectCsQC(`${csArr?.Quality},${csArr?.color}`);
      }
    }, 500)
  }, [singleProd])

  // useEffect(() => {
  //   const navVal = location?.search.split('?p=')[1];
  //   let decodeObj = decodeAndDecompress(navVal);

  //   if (decodeObj) {
  //     setDecodeUrl(decodeObj)
  //   }

  //   let metalArr;
  //   let diaArr;
  //   let csArr;

  //   if (mTypeLocal?.length) {
  //     metalArr = mTypeLocal?.find((ele) => {
  //       return ele?.Metalid === decodeObj?.m
  //     })?.Metalid ?? mTypeLocal[0]?.Metalid
  //   }
  //   if (diaQcLocal) {
  //     diaArr = diaQcLocal?.find((ele) => {
  //       return ele?.QualityId == decodeObj?.d?.split(',')[0] &&
  //         ele?.ColorId == decodeObj?.d?.split(",")[1]
  //     }) ?? diaQcLocal[0]
  //   }
  //   if (csQcLocal) {
  //     csArr = csQcLocal?.find((ele) => {
  //       return ele?.QualityId == decodeObj?.c?.split(',')[0] &&
  //         ele?.ColorId == decodeObj?.c?.split(",")[1]
  //     }) ?? csQcLocal[0];
  //   }


  //   setMetalType(metalArr?.metaltype)
  //   setSelectDiaQc(`${diaArr?.Quality},${diaArr?.color}`)
  //   setShowDiaQc(`${diaArr?.Quality}#${diaArr?.color}`)
  //   setSelectCsQC(`${csArr?.Quality},${csArr?.color}`)
  //   setShowCsQC(`${csArr?.Quality}#${csArr?.color}`)

  //   const FetchProductData = async () => {
  //     let obj = {
  //       mt: metalArr,
  //       diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
  //       csQc: `${csArr?.QualityId},${csArr?.ColorId}`,
  //     }

  //     // setisPriceLoading(true)

  //     const res1 = await SingleProdListAPI(decodeObj, sizeData, obj, cookie)
  //     if (res1) {
  //       setSingleProd(res1?.pdList[0])
  //     }

  //     // if(res?.pdList?.length > 0){
  //     //   setisPriceLoading(false)
  //     // }

  //     setnetWTData(res1?.pdList[0]);
  //     setDiaList(res1?.pdResp?.rd3)
  //     setCsList(res1?.pdResp?.rd4)

  //     let prod = res1?.pdList?.[0];

  //     const res2 = await getSizeData(prod, cookie);
  //     if (res2) {
  //       setSizeCombo(res2?.Data)
  //     }

  //     const initialsize =
  //       (prod && prod?.DefaultSize !== '') ? prod?.DefaultSize :
  //         (SizeCombo?.rd?.find((size) => size?.DefaultSize === 1)?.sizename === undefined
  //           ? SizeCombo?.rd?.[0]?.sizename : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename)

  //     setSizeData(initialsize)

  //   }

  //   FetchProductData()

  //   window.scroll({
  //     top: 0,
  //     behavior: "smooth",
  //   });

  // }, [location?.key])

  useEffect(() => {
    try {
      if (selectedThumbImg == undefined) return;

      if (selectedThumbImg) {
        setImageSrc(selectedThumbImg?.link?.imageUrl);
      } else {
        // Set a default image if no thumbnail is selected
        setImageSrc(pdVideoArr?.length > 0 ? noImageFound : 'p.png');
      }
    } catch (error) {
      console.log("Error in fetching image", error)
    }

  }, [selectedThumbImg, pdVideoArr]);

  const fallbackImg = `${storeInit?.CDNDesignImageFol}${singleProd?.designno}~1.${singleProd?.ImageExtension}`

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = noImageFound;
  };

  const handleVideoError = (e) => {
    e.target.onerror = null;
    e.target.poster = noImageFound;
  };

  useEffect(() => {
    let navVal = location?.search.split("?p=")[1];
    let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
    let logininfoInside = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let getDecode = decodeAndDecompress(navVal)
    let decodeobj = { ...getDecode };

    if (!decodeobj?.g) {
      decodeobj.g = { g: [["", ""], ["", "", ""]] };
    }
    setDecodeUrl(decodeobj);

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
    const FetchProductData = async () => {
      // const res1 = await FilterListAPI(decodeobj?.g, cookie);
      // setFilterData(res1)
      // let obj = {
      //   mt: metalArr,
      //   diaQc: `${diaArr?.QualityId ?? 0},${diaArr?.ColorId ?? 0}`,
      //   csQc: `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`,
      // };

      let obj1 = {
        mt: logininfoInside?.MetalId ?? storeinitInside?.MetalId,
        diaQc: diaArr
          ? `${diaArr?.QualityId ?? 0},${diaArr?.ColorId ?? 0}`
          : logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid,
        csQc: csArr
          ? `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`
          : logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid,
      };

      let obj = {
        mt: metalArr
          ? metalArr
          : logininfoInside?.MetalId ?? storeinitInside?.MetalId,
        diaQc: diaArr
          ? `${diaArr?.QualityId ?? 0},${diaArr?.ColorId ?? 0}`
          : logininfoInside?.cmboDiaQCid ?? storeinitInside?.cmboDiaQCid,
        csQc: csArr
          ? `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`
          : logininfoInside?.cmboCSQCid ?? storeinitInside?.cmboCSQCid,
      };

      setisPriceLoading(true);
      // step 4 
      setSingleProd1({})
      setSingleProd({})
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

              if (storeinitInside?.IsProductDetailDesignSet === 1) {
                await DesignSetListAPI(obj1, resp?.pdList[0]?.designno, cookie).then((res) => {
                  setDesignSetList(res?.Data?.rd)
                }).catch((err) => console.log("designsetErr", err))
              }

              await SaveLastViewDesign(cookie, resp?.pdList[0]?.autocode, resp?.pdList[0]?.designno).then((res) => {
                setSaveLastView(res?.Data?.rd)
              }).catch((err) => console.log("saveLastView", err))

            }

            let initialsize = (
              (prod && prod.DefaultSize !== "")
                ? prod.DefaultSize
                : (
                  (SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename === undefined) ? SizeCombo?.rd[0]?.sizename
                    : SizeCombo?.rd?.find((size) => size.IsDefaultSize === 1)?.sizename
                )
            );

            setSizeData(initialsize);

            // await SingleFullProdPriceAPI(decodeobj).then((res) => {
            //   setSingleProdPrice(res);
            //   console.log("singlePrice", res);
            // });

          }

          return res;
        })
        // .then(async (resp) => {
        //   console.log('resp: ', resp);

        // })
        .catch((err) => console.log("err", err));
    };

    FetchProductData();

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [location?.key]);

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
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    if (storeinit) setStoreInit(storeinit);
    let loginData = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    if (loginData) setLoginData(loginData);
  }, []);

  useEffect(() => {
    callAllApi();
  }, [storeInit])

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  // const handleMetalWiseColorImg = async (e) => {
  //   const metalColorLocal = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
  //   let mcArr;

  //   if (metalColorLocal?.length) {
  //     mcArr =
  //       metalColorLocal?.find((ele) => {
  //         return ele?.metalcolorname === e.target.value
  //       })
  //   }
  //   // console.log(mcArr)
  //   // if (mcArr?.colorname == "Yellow") {
  //   //   mcArr = { ...mcArr, colorname: 'Y' }
  //   // }
  //   // if (mcArr?.colorname == "White") {
  //   //   mcArr = { ...mcArr, colorname: 'W' }
  //   // }
  //   // if (mcArr?.colorname == "Rose") {
  //   //   mcArr = { ...mcArr, colorname: 'RG' }
  //   // }



  //   setMetalColor(e.target.value)

  //   let imgLink = storeInit?.DesignImageFol + (singleProd ?? singleProd1)?.designno + "_" + (thumbImgIndex + 1) + "_" + mcArr?.colorname + "." +
  //     (singleProd ?? singleProd1)?.ImageExtension;

  //   setMetalWiseColorImg(imgLink);

  //   const isImg = await checkImageAvailability(imgLink);

  //   if (isImg) {
  //     setMetalWiseColorImg(imgLink)
  //   }
  //   else {
  //     setMetalWiseColorImg()
  //   }
  // }

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

  const ProdCardImageFunc = async () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo")) || [];
    const imageVideoDetail = singleProd?.ImageVideoDetail;
    const pd = singleProd;

    let parsedData = [];
    try {
      parsedData = imageVideoDetail === "0" ? [] : JSON.parse(imageVideoDetail || "[]");
    } catch (err) {
      console.error("Invalid JSON in ImageVideoDetail:", err);
      return;
    }

    // Filter categorized media
    const normalImages = [], colorImages = [], normalVideos = [], colorVideos = [];
    parsedData.forEach(item => {
      if (item?.TI === 1 && !item?.CN) normalImages.push(item);
      else if (item?.TI === 2 && item?.CN) colorImages.push(item);
      else if (item?.TI === 4 && item?.CN) colorVideos.push(item);
      else if (item?.TI === 3 && !item?.CN) normalVideos.push(item);
    });

    const getMaxCountByColor = (list) => {
      return list.reduce((acc, curr) => {
        const color = curr.CN;
        acc[color] = (acc[color] || 0) + 1;
        return acc;
      }, {});
    };

    const maxColorCount = Math.max(...Object.values(getMaxCountByColor(colorImages)), 0);
    const normalImageCount = normalImages.length ? Math.max(...normalImages.map(i => i.Nm)) : 0;

    // Get metal color code
    const mcArr = mtColorLocal.find(ele => ele.id === singleProd?.MetalColorid);
    setSelectedMetalColor(mcArr?.colorcode);

    const buildImageURL = (i, isColor = false) => {
      const base = storeInit?.CDNDesignImageFol;
      const extension = isColor ?
        colorImages[i - 1]?.Ex :
        normalImages[i - 1]?.Ex;

      const imageUrl = isColor ?
        `${base}${pd.designno}~${i}~${mcArr?.colorcode}.${colorImages[i - 1]?.Ex}`
        : `${base}${pd.designno}~${i}.${normalImages[i - 1]?.Ex}`;

      return { imageUrl, extension }
    };

    const pdImgList = [];

    if (maxColorCount > 0) {
      // Asynchronously populate pdImgList with color images
      for (let i = 1; i <= maxColorCount; i++) {
        const colorImageUrl = buildImageURL(i, true);
        const isColorImageAvailable = await checkImageAvailability(colorImageUrl?.imageUrl);

        // Only push the image if it is available
        if (isColorImageAvailable) {
          pdImgList.push(colorImageUrl);
        }
      }
    }

    // If no color image was added, push normal images
    if (pdImgList.length === 0 && normalImageCount > 0) {
      for (let i = 1; i <= normalImageCount; i++) {
        pdImgList.push(buildImageURL(i));
      }
    }

    // Now check if pdImgList is populated and set finalprodListimg after that
    let finalprodListimg = {};
    if (pdImgList.length > 0) {
      finalprodListimg = pdImgList[0];

      // Set the selected thumbnail image if we have a valid image
      if (Object.keys(finalprodListimg).length > 0) {
        setSelectedThumbImg({
          link: {
            imageUrl: finalprodListimg?.imageUrl,
            extension: finalprodListimg?.extension
          },
          type: 'img'
        });
      }
    } else {
      console.log("No images found, pdImgList is empty.");
    }

    if (pdImgList.length) {
      const thumbImagePath = pdImgList.map(url => {
        const fileName = url?.imageUrl?.split("Design_Image/")[1];
        const thumbImageUrl = `${storeInit?.CDNDesignImageFolThumb}${fileName?.split('.')[0]}.jpg`;
        const originalImageExtension = url?.extension;
        return { thumbImageUrl, originalImageExtension };
      });
      setPdThumbImg(thumbImagePath);
      setThumbImgIndex(0);
    } else {
      setThumbImgIndex();
    }

    // Video processing
    const buildVideoURL = (video, isColor = false) => {
      const base = storeInit?.CDNVPath;
      return isColor
        ? `${base}${pd.designno}~${video.Nm}~${video.CN}.${video.Ex}`
        : `${base}${pd.designno}~${video.Nm}.${video.Ex}`;
    };

    const pdvideoList = [
      ...colorVideos.map(v => buildVideoURL(v, true)),
      ...normalVideos.map(v => buildVideoURL(v))
    ];

    setPdVideoArr(pdvideoList.length ? pdvideoList : []);

    if (finalprodListimg?.extension !== undefined && finalprodListimg?.imageUrl !== imageNotFound) {
      setPdLoadImage(false);
    } else if (Object.keys(finalprodListimg)?.length === 0) {
      setPdLoadImage(false);
    } else {
      setPdLoadImage(true);
    }

    return finalprodListimg;
  };

  useEffect(() => {
    setPdLoadImage(true)
    ProdCardImageFunc();
  }, [singleProd, location?.key]);

  const handleMetalWiseColorImg = async (e) => {
    const selectedColorCode = e.target.value;
    const mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo") || "[]");
    const mcArr = mtColorLocal.find(ele => ele?.colorcode === selectedColorCode);

    const prod = singleProd ?? singleProd1;
    const { designno, ImageExtension } = prod || {};
    const baseCDN = storeInit?.CDNDesignImageFol;
    const thumbCDN = storeInit?.CDNDesignImageFolThumb;

    setSelectedMetalColor(mcArr?.colorcode);
    setMetalColor(selectedColorCode);

    // Parse image/video data
    let parsedData = [];
    try {
      parsedData = prod?.ImageVideoDetail && prod.ImageVideoDetail !== "0"
        ? JSON.parse(prod.ImageVideoDetail)
        : [];
    } catch (err) {
      console.error("Invalid JSON in ImageVideoDetail:", err);
      return;
    }

    // Filter categorized media
    const normalImages = [], colorImages = [], normalVideos = [], colorVideos = [];
    parsedData.forEach(item => {
      if (item?.TI === 1 && !item?.CN) normalImages.push(item);
      else if (item?.TI === 2 && item?.CN) colorImages.push(item);
      else if (item?.TI === 4 && item?.CN) colorVideos.push(item);
      else if (item?.TI === 3 && !item?.CN) normalVideos.push(item);
    });

    // Filter color and normal images
    const colorImgs = parsedData.filter(ele => ele?.CN && ele?.TI === 2);
    const normalImgs = parsedData.filter(ele => !ele?.CN && ele?.TI === 1);

    const maxColorImgCount = Math.max(
      0,
      ...Object.values(
        colorImgs.reduce((acc, { CN }) => {
          acc[CN] = (acc[CN] || 0) + 1;
          return acc;
        }, {})
      )
    );

    const normalImageCount = normalImgs.length > 0
      ? Math.max(...normalImgs.map(item => item.Nm))
      : 0;

    // Build image URLs
    const buildColorImageList = () => Array.from({ length: maxColorImgCount }, (_, i) => {
      const extension = colorImages[i]?.Ex;
      const imageUrl = `${baseCDN}${designno}~${i + 1}~${mcArr?.colorcode}.${colorImages[i]?.Ex}`;
      return { imageUrl, extension }
    }
    );

    const buildNormalImageList = () => Array.from({ length: normalImageCount }, (_, i) => {
      const extension = normalImages[i]?.Ex;
      const imageUrl = `${baseCDN}${designno}~${i + 1}.${normalImages[i]?.Ex}`;

      return { imageUrl, extension }
    }
    );

    let pdImgListCol = [];
    let pdImgList = [];
    let colorImagesAvailable = false;

    // Check color image availability dynamically
    if (colorImgs.length > 0) {
      const tempColorList = buildColorImageList().filter(Boolean);

      const checkImages = tempColorList.length > 3
        ? tempColorList.slice(0, 3) // Optional cap for performance
        : tempColorList;

      const availabilityChecks = await Promise.all(
        checkImages.map(url => checkImageAvailability(url?.imageUrl))
      );

      colorImagesAvailable = availabilityChecks.some(Boolean);
      if (colorImagesAvailable) {
        pdImgListCol = tempColorList;
      }
    }

    // Fallback to normal images if no color images are available
    if (!colorImagesAvailable && normalImgs.length > 0) {
      pdImgList = buildNormalImageList();
    }

    // Set images to UI
    if (colorImagesAvailable && pdImgListCol.length > 0) {
      const thumbImagePath = pdImgListCol.map(url => {
        const fileName = url?.imageUrl.split('Design_Image/')[1]?.split('.')[0];
        const thumbImageUrl = `${thumbCDN}${fileName}.jpg`;
        const originalImageExtension = url?.extension;
        return { thumbImageUrl, originalImageExtension };
      });

      setPdThumbImg(thumbImagePath);

      const safeIndex = thumbImgIndex < pdImgListCol.length ? thumbImgIndex : pdImgListCol.length - 1;
      const mainImg = pdImgListCol[safeIndex];
      console.log("TCL: ProductDetail -> mainImg", mainImg)
      // setSelectedThumbImg({ link: mainImg, type: 'img' });
      setSelectedThumbImg({
        link: {
          imageUrl: mainImg?.imageUrl,
          extension: mainImg?.originalImageExtension
        },
        type: 'img'
      });
      setThumbImgIndex(safeIndex);

      const defaultMainImg = `${baseCDN}${designno}~${safeIndex + 1}~${mcArr?.colorcode}.${ImageExtension}`;
      setMetalWiseColorImg(defaultMainImg);

    } else if (pdImgList.length > 0) {
      const thumbImagePath = pdImgList.map(url => {
        const fileName = url?.imageUrl?.split('Design_Image/')[1]?.split('.')[0];
        const thumbImageUrl = `${thumbCDN}${fileName}.jpg`;
        const originalImageExtension = url?.extension;
        return { thumbImageUrl, originalImageExtension };
      });

      setPdThumbImg(thumbImagePath);

      const safeIndex = thumbImgIndex < pdImgList.length ? thumbImgIndex : pdImgListCol.length - 1;
      const fallbackImg = pdImgList[safeIndex];
      // setSelectedThumbImg({ link: fallbackImg, type: 'img' });
      setSelectedThumbImg({
        link: {
          imageUrl: fallbackImg?.imageUrl,
          extension: fallbackImg?.originalImageExtension
        },
        type: 'img'
      });
      setThumbImgIndex(safeIndex);
    }
  };


  useEffect(() => {
    let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
    let mcArr;

    if (mtColorLocal?.length) {
      mcArr =
        mtColorLocal?.filter(
          (ele) => ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
        )[0]
    }

    setMetalColor(mcArr?.colorcode);

  }, [singleProd])

  const getDynamicVideo = (designno, count, extension) => {
    const getDesignVideoFol = (storeInit?.DesignImageFol).slice(0, -13) + "video/";
    const url = `${getDesignVideoFol}${designno}_${count > 0 ? count : 1}.${extension}`;
    return url;
  }

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleCustomChange = async (e, type) => {
    let metalArr;
    let diaArr;
    let csArr;
    let size;

    const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
    const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
    const csQcLocal = JSON.parse(sessionStorage.getItem('ColorStoneQualityColorCombo'));

    if (type === 'mt') {
      metalArr = mTypeLocal?.find((ele) => {
        return ele?.metaltype === e.target.value
      })?.Metalid;
      setMetalType(e.target.value)
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
    }
    if (type === 'cs') {
      setSelectCsQC(e.target.value)
      csArr =
        csQcLocal?.filter(
          (ele) =>
            ele?.Quality == e.target.value?.split(",")[0] &&
            ele?.color == e.target.value?.split(",")[1]
        )[0]
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
      mt: metalArr ?? 0,
      diaQc: `${diaArr?.QualityId ?? 0},${diaArr?.ColorId ?? 0}`,
      csQc: `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`
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

  const SizeSorting = (SizeArr) => {

    let SizeSorted = SizeArr?.sort((a, b) => {
      const nameA = parseInt(a?.sizename?.slice(0, -2), 10);
      const nameB = parseInt(b?.sizename?.slice(0, -2), 10);

      return nameA - nameB;
    })

    return SizeSorted

  }

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
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    let obj = {
      a: productData?.autocode,
      b: productData?.designno,
      m: loginInfo?.MetalId,
      d: loginInfo?.cmboDiaQCid,
      c: loginInfo?.cmboCSQCid,
      f: {},
      g: decodeUrl?.g,
    };

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    // Navigate(
    //   `/d/${productData?.TitleLine?.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
    //   }${productData?.designno}?p=${encodeObj}`
    // );
    Navigate(`/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`);
    // step 1
    setSingleProd1({});
    setSingleProd({});
    setIsImageLoad(true);
    setWishListFlag(null);
  };

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

  const getCollectionId = (singleProd?.Collectionid ?? singleProd1?.Collectionid);

  const getCollName = filterData
    ?.filter((item) => item?.Name === "Collection")
    ?.map((item) => {
      const options = JSON.parse(item?.options || "[]");
      const matchedOption = options.find((option) => option.id === getCollectionId);
      return matchedOption?.Name || null;
    })[0];


  return (
    <>
      <Helmet>
        <title>
          {formatTitleLine(singleProd?.TitleLine)
            ? `${singleProd.TitleLine} - ${singleProd?.designno ?? ''}`
            : ((singleProd?.TitleLine || singleProd?.designno) ? `${singleProd?.designno ?? ''}` : "loading...")}
        </title>
        <script type="application/ld+json">
          {JSON.stringify(productSchema, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, null, 2)}
        </script>
      </Helmet>
      <div className='elv_ProductDetMain_div'>
        <div className='elv_ProductDet_prod_div'>
          {isDataFound ? (
            <div
              style={{
                height: "90vh",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: '100%'
              }}
              className="elv_prodd_datanotfound"
            >
              Data not Found!!
            </div>
          ) : (
            <>
              {maxWidth1400 ? (
                <>
                  {loadingdata || pdLoadImage || selectedThumbImg?.link?.imageUrl == "" ? (
                    <Skeleton className='elv_prod_det_default_1400' variant="rectangular" />
                  ) : (
                    <div className='elv_ProductDet_max1400'>
                      <div className='elv_ProductDet_prod_img_max1400'
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          cursor: "zoom-in",
                          width: "100%",
                          transition: "0.3s ease-in"
                        }}
                        onMouseMove={(e) => handleMouseMove(e, 1)}
                        onMouseLeave={() => handleMouseLeave(1)}
                      >
                        {selectedThumbImg || imageSrc ? (
                          selectedThumbImg?.type == "img" ? (
                            <img
                              src={imageSrc}
                              ref={el => imageRefs.current[1] = el}
                              loading="eager"
                              onError={handleError}
                              alt=""
                              onLoad={() => setIsImageLoad(false)}
                              className="elv_ProductDet_prod_image_max1400"
                              draggable={false}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                          ) : (
                            <div>
                              <video
                                src={pdVideoArr?.length > 0 ? selectedThumbImg?.link?.imageUrl : imageNotFound}
                                loop
                                autoPlay
                                playsInline
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                                muted // Add this attribute to ensure autoplay works
                                style={{
                                  width: "100%",
                                  objectFit: "cover",
                                  height: "100%",
                                  borderRadius: "8px",
                                }}
                                onError={handleVideoError}
                              />
                            </div>
                          )
                        ) : (
                          // showPlaceholder == true && (
                          <img
                            src={imageSrc || 'p.png'}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = noImageFound;
                            }}
                            loading="eager"
                            alt={""}
                            className="elv_ProductDet_prod_image_max1400"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          // )
                        )
                        }
                      </div>

                      {/* {!loadingdata ? (
                  <Skeleton className='elv_prod_det_default_thumb_1400' variant="square" />
                ) : ( */}
                      <div className='elv_ProductDet_prod_img_list_max1400'>
                        {(pdThumbImg?.length > 1 || pdVideoArr?.length > 0) &&
                          pdThumbImg?.map((ele, i) => {
                            const firstHalf = ele?.thumbImageUrl?.split("/Design_Thumb")[0];
                            const secondhalf = ele?.thumbImageUrl?.split("/Design_Thumb")[1]?.split('.')[0];
                            return (
                              <img
                                src={ele?.thumbImageUrl}
                                alt={""}
                                onLoad={() => setIsImageLoad(false)}
                                className='elv_ProductDet_image_max1400'
                                onClick={() => {
                                  setSelectedThumbImg({
                                    // link: ele.replace('Design_Thumb/', ''),
                                    link: {
                                      "imageUrl": `${firstHalf}${secondhalf}.${ele?.originalImageExtension}`,
                                      "extension": `${ele?.originalImageExtension}`
                                    },
                                    type: "img",
                                  });
                                  setThumbImgIndex(i);
                                }}
                                loading="eager"
                                onError={handleError}
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                              />
                            )
                          })}
                        {filteredVideos?.map((data) => (
                          <div
                            style={{
                              position: "relative",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() =>
                              // setSelectedThumbImg({ link: data, type: "vid" })
                              setSelectedThumbImg({
                                link: {
                                  "imageUrl": data,
                                  "extension": "mp4"
                                },
                                type: 'vid'
                              })
                            }
                          >
                            <video
                              src={data}
                              autoPlay={true}
                              loop={true}
                              onError={handleVideoError}
                              className="elv_ProductDet_image_max1400"
                              style={{ height: "58px", width: '58px', objectFit: "cover", cursor: 'pointer' }}
                              draggable={false}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                            <IoIosPlayCircle
                              style={{
                                position: "absolute",
                                color: "white",
                                width: "35px",
                                height: "35px",
                                cursor: 'pointer',
                              }}
                              onError={handleVideoError}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* )} */}
                </>
              ) : (
                <>
                  {!maxWidth1000 && (
                    <>{loadingdata || pdLoadImage || selectedThumbImg?.link?.imageUrl == "" ? (
                      <Skeleton className='elv_prod_det_default_thumb' variant="square" />
                    ) : (
                      <div className='elv_ProductDet_prod_img_list'>
                        {(pdThumbImg?.length > 1 || pdVideoArr?.length > 0) &&
                          pdThumbImg?.map((ele, i) => {
                            const firstHalf = ele?.thumbImageUrl?.split("/Design_Thumb")[0];
                            const secondhalf = ele?.thumbImageUrl?.split("/Design_Thumb")[1]?.split('.')[0];
                            return (
                              <img
                                src={ele?.thumbImageUrl}
                                alt={""}
                                loading="eager"
                                onLoad={() => setIsImageLoad(false)}
                                className='elv_ProductDet_image'
                                onClick={() => {
                                  setSelectedThumbImg({
                                    // link: ele.replace('Design_Thumb/', ''),
                                    link: {
                                      "imageUrl": `${firstHalf}${secondhalf}.${ele?.originalImageExtension}`,
                                      "extension": `${ele?.originalImageExtension}`
                                    },
                                    type: "img",
                                  });
                                  setThumbImgIndex(i);
                                }}
                                onError={handleError}
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                              />
                            )
                          })}
                        {filteredVideos?.map((data) => (
                          <div
                            style={{
                              position: "relative",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() =>
                              // setSelectedThumbImg({ link: data, type: "vid" })
                              setSelectedThumbImg({
                                link: {
                                  "imageUrl": data,
                                  "extension": "mp4"
                                },
                                type: 'vid'
                              })
                            }
                          >
                            <video
                              src={data}
                              autoPlay={true}
                              loop={true}
                              onError={handleVideoError}
                              // className="elv_prod_thumb_img"
                              style={{ height: "58px", width: '58px', objectFit: "cover", cursor: 'pointer' }}
                              draggable={false}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                            <IoIosPlayCircle
                              style={{
                                position: "absolute",
                                color: "white",
                                width: "35px",
                                height: "35px",
                                cursor: 'pointer',
                              }}
                              onError={handleVideoError}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                      {loadingdata || pdLoadImage || selectedThumbImg?.link?.imageUrl == "" ? (
                        <Skeleton className='elv_prod_det_default' variant="rectangular" />
                      ) : (
                        <>
                          <div className='elv_ProductDet_prod_img'
                            style={{
                              position: "relative",
                              overflow: "hidden",
                              cursor: "zoom-in",
                              width: "100%",
                              transition: "0.3s ease-in"
                            }}
                            onMouseMove={(e) => handleMouseMove(e, 1)}
                            onMouseLeave={() => handleMouseLeave(1)}
                          >
                            {imageSrc || selectedThumbImg ? (
                              selectedThumbImg.type === "img" ? (
                                <img
                                  src={imageSrc}
                                  ref={el => imageRefs.current[1] = el}
                                  loading="eager"
                                  onError={handleError} // Pass the error handler
                                  alt=""
                                  onLoad={() => setIsImageLoad(false)}
                                  className={`elv_ProductDet_prod_image`}
                                  draggable={false}
                                  onContextMenu={(e) => e.preventDefault()}
                                />
                              ) : (
                                <video
                                  src={pdVideoArr.length > 0 ? selectedThumbImg.link?.imageUrl : imageNotFound}
                                  loop
                                  autoPlay
                                  playsInline
                                  loading="eager"
                                  muted
                                  draggable={false}
                                  onContextMenu={(e) => e.preventDefault()}
                                  style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    position: 'relative',
                                    left: '2rem',
                                    borderRadius: "8px",
                                  }}
                                  onError={handleVideoError}
                                />
                              )
                            ) : (
                              // showPlaceholder == true && (
                              <img
                                src={imageSrc || 'p.png'}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = noImageFound;
                                }}
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                                alt=""
                                loading="eager"
                                className={`elv_ProductDet_prod_image`}
                              />
                              // )
                            )}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              {maxWidth1000 ? (
                <>
                  <div className='elv_ProductDet_max1000'>
                    {loadingdata || pdLoadImage || selectedThumbImg?.link?.imageUrl == "" ? (
                      <Skeleton className='elv_prod_det_default_max1000' variant="rectangular" />
                    ) : (
                      <>
                        <div style={{ maxWidth: maxWidth1000 ? "100%" : "" }}>
                          <div className='elv_ProductDet_prod_img_max1000'
                            style={{
                              position: "relative",
                              overflow: "hidden",
                              cursor: "zoom-in",
                              width: "100%",
                              transition: "0.3s ease-in"
                            }}
                            onMouseMove={(e) => handleMouseMove(e, 1)}
                            onMouseLeave={() => handleMouseLeave(1)}
                          >
                            {selectedThumbImg || imageSrc ? (
                              selectedThumbImg?.type == "img" ? (
                                <img
                                  // src={metalWiseColorImg ? metalWiseColorImg : selectedThumbImg?.Link}
                                  src={imageSrc}
                                  ref={el => imageRefs.current[1] = el}
                                  loading="eager"
                                  onError={handleError}
                                  alt={""}
                                  onLoad={() => setIsImageLoad(false)}
                                  className="elv_ProductDet_prod_image_max1000"
                                  draggable={false}
                                  onContextMenu={(e) => e.preventDefault()}
                                />
                              ) : (
                                <div>
                                  <video
                                    src={pdVideoArr?.length > 0 ? selectedThumbImg?.link?.imageUrl : imageNotFound}
                                    loop
                                    autoPlay
                                    playsInline
                                    muted // Add this attribute to ensure autoplay works
                                    style={{
                                      width: "100%",
                                      objectFit: "cover",
                                      marginTop: '40px',
                                      height: "100%",
                                      maxHeight: "40.625rem",
                                      borderRadius: "8px",
                                    }}
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                    onError={handleVideoError}
                                  />
                                </div>
                              )
                            ) : (
                              // showPlaceholder == true && (
                              <img
                                src={imageSrc || 'p.png'}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = noImageFound;
                                }}
                                alt={""}
                                loading="eager"
                                className="elv_ProductDet_prod_image_max1000"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                              />
                              // )
                            )
                            }
                          </div>
                          <div className='elv_ProductDet_prod_img_list_max1000'>
                            {(pdThumbImg?.length > 1 || pdVideoArr?.length > 0) &&
                              pdThumbImg?.map((ele, i) => {
                                const firstHalf = ele?.thumbImageUrl?.split("/Design_Thumb")[0];
                                const secondhalf = ele?.thumbImageUrl?.split("/Design_Thumb")[1]?.split('.')[0];
                                return (
                                  <img
                                    src={ele?.thumbImageUrl}
                                    alt={""}
                                    onLoad={() => setIsImageLoad(false)}
                                    className='elv_ProductDet_image_max1000'
                                    onClick={() => {
                                      setSelectedThumbImg({
                                        // link: ele.replace('Design_Thumb/', ''),
                                        link: {
                                          "imageUrl": `${firstHalf}${secondhalf}.${ele?.originalImageExtension}`,
                                          "extension": `${ele?.originalImageExtension}`
                                        },
                                        type: "img",
                                      });
                                      setThumbImgIndex(i);
                                    }}
                                    loading="eager"
                                    onError={handleError}
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                  />
                                )
                              })}
                            {filteredVideos?.map((data) => (
                              <div
                                style={{
                                  position: "relative",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onClick={() =>
                                  // setSelectedThumbImg({ link: data, type: "vid" })
                                  setSelectedThumbImg({
                                    link: {
                                      "imageUrl": data,
                                      "extension": "mp4"
                                    },
                                    type: 'vid'
                                  })
                                }
                              >
                                <video
                                  src={data}
                                  autoPlay={true}
                                  loop={true}
                                  onError={handleVideoError}
                                  className="elv_ProductDet_image_max1000"
                                  style={{ height: "58px", width: '58px', objectFit: "cover", cursor: 'pointer' }}
                                  draggable={false}
                                  onContextMenu={(e) => e.preventDefault()}
                                />
                                <IoIosPlayCircle
                                  style={{
                                    position: "absolute",
                                    color: "white",
                                    width: "35px",
                                    height: "35px",
                                    cursor: 'pointer',
                                  }}
                                  onError={handleVideoError}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    <div className='elv_ProductDet_prod_description_max1000'>
                      <div className='elv_Product_prod_desc_data_max1000'>
                        <h1 className='elv_ProductDet_prod_title_max1000'>{formatTitleLine(singleProd?.TitleLine) && singleProd?.TitleLine}</h1>
                        <div className='elv_ProductDet_det_max1000'>
                          {/* <h5 className='elv_ProductDet_prod_code_Coll'>{`Collection/${getCollName}`}</h5> */}
                          <span className='elv_ProductDet_prod_code_max1000'>{singleProd?.designno}</span>
                          <div className="collection-breadcrumb">
                            <span className="text-muted-foreground">Collection</span>
                            <span className="separator">-</span>
                            {/* <span className="text-timeless">{getCollName}</span> */}
                            <span className="text-timeless">{(singleProd ?? singleProd1)?.collection}</span>
                          </div>
                          <div className='elv_productDet_metal_style_max1000'>
                            <div className='elv_ProductDet_prod_text_div_max1000'>
                              <span>Metal Purity : </span> <span className='elv_ProductDet_text_max1000' style={{ textTransform: 'uppercase' }}>{singleProd?.IsMrpBase === 1 ? singleProd?.MetalTypePurity : metalType}</span>
                            </div>
                            <div className='elv_ProductDet_prod_text_div_max1000'>
                              <span>Metal Color : </span> <span className='elv_ProductDet_text_max1000'>{JSON.parse(sessionStorage.getItem("MetalColorCombo"))?.filter(
                                (ele) => ele?.colorcode == metalColor
                              )[0]?.metalcolorname}</span>
                            </div>
                            <div className='elv_ProductDet_prod_text_div_max1000'>
                              {(storeInit?.IsDiamondCustomization === 1 &&
                                diaQcCombo?.length > 0 && diaList?.length && singleProd?.DiaQuaCol !== "" && selectDiaQc) ? (
                                <>
                                  <span>Diamond Quality Color : </span> <span className='elv_ProductDet_text_max1000'>{singleProd?.IsMrpBase === 1
                                    ? singleProd?.DiaQuaCol
                                    : selectDiaQc != "undefined,undefined" ? selectDiaQc : (diaQcCombo?.length ? `${diaQcCombo[0].Quality},${diaQcCombo[0].color}` : '')}</span>
                                </>
                              ) : null}
                            </div>
                            <div className='elv_ProductDet_prod_text_div_max1000'>
                              {storeInit?.IsMetalWeight === 1 && (
                                <>
                                  <span>Net Wt : </span> <span className='elv_ProductDet_text_max1000'>{(singleProd1?.Nwt ?? singleProd?.Nwt)?.toFixed(3)}</span>
                                </>
                              )}
                            </div>
                            {(singleProd1?.description ?? singleProd?.description)?.length > 0 && (
                              <>
                                <hr className='elv_ProductDet_divider' />
                                <div className={`elv_prod_description ${isExpanded ? 'show-more' : ''}`}>
                                  <p className="description-text">
                                    {(singleProd1?.description ?? singleProd?.description)}
                                  </p>
                                  <span className="toggle-text" onClick={toggleText}>
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                  </span>
                                </div>
                              </>
                            )}
                            {/* {descriptionText?.length > 0 && (
                              <div className={`elv_prod_description_1 ${isExpanded ? 'elv_show-more_1' : ''}`}>
                                <p className="elv_description-text_1" ref={descriptionRef}>
                                  {descriptionText}
                                </p>

                                {(isClamped && !isExpanded) && ( // Show "Show More" only if text is clamped and not expanded
                                  <span className="elv_toggle-text_1" onClick={toggleText}>
                                    Show More
                                  </span>
                                )}

                                {isExpanded && ( // Show "Show Less" when the description is expanded
                                  <span className="elv_toggle-text_1" onClick={toggleText}>
                                    Show Less
                                  </span>
                                )}
                              </div>
                            )} */}
                          </div>
                          <hr className='elv_ProductDet_divider' />
                        </div>
                        {storeInit?.IsProductWebCustomization == 1 && (
                          <>
                            <div className='elv_ProductDet_dropdown_max1000'>
                              {metalTypeCombo?.length > 0 && storeInit?.IsMetalCustomization === 1 && (
                                <div>
                                  <div style={{
                                    margin: 1,
                                    width: "95%",
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: 'column',
                                    border: "none",
                                    paddingBottom: '8px'
                                  }}>
                                    <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>metal type : </label>
                                    {singleProd?.IsMrpBase == 1 ?
                                      <span className="elv_metaltype_span">
                                        {metalTypeCombo?.filter((ele) => ele?.Metalid == singleProd?.MetalPurityid)[0]?.metaltype}
                                      </span>
                                      :
                                      <select
                                        className="elv_metaltype_drp"
                                        value={metalType}
                                        onChange={(e) => handleCustomChange(e, 'mt')}
                                      // onChange={(e) => setSelectMtType(e.target.value)}
                                      >
                                        {metalTypeCombo.map((ele) => (
                                          <option key={ele?.Metalid} value={ele?.metaltype}>
                                            {ele?.metaltype}
                                          </option>
                                        ))}
                                      </select>}
                                  </div>
                                  <hr className='elv_ProductDet_divider_1' />
                                </div>
                              )}
                              {metalColorCombo?.length > 0 && storeInit?.IsMetalTypeWithColor === 1 && (
                                <div>
                                  <div>
                                    <div style={{
                                      margin: 1,
                                      width: "95%",
                                      display: "flex",
                                      justifyContent: "center",
                                      flexDirection: 'column',
                                      border: "none",
                                      paddingBottom: '8px'
                                    }}>
                                      <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>metal color : </label>
                                      {singleProd?.IsMrpBase == 1 ?
                                        <span className="elv_metaltype_span">
                                          {metalColorCombo?.filter((ele) => ele?.id == singleProd?.MetalColorid)[0]?.metalcolorname}
                                        </span>
                                        :
                                        <select
                                          className="elv_metaltype_drp"
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
                                        </select>}
                                    </div>
                                  </div>
                                  <hr className='elv_ProductDet_divider_1' />
                                </div>
                              )}
                              {(storeInit?.IsDiamondCustomization === 1 && diaQcCombo?.length > 0 && diaList?.length) ? (
                                <>
                                  <div>
                                    <div>
                                      <div style={{
                                        margin: 1,
                                        width: "95%",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: 'column',
                                        border: "none",
                                        paddingBottom: '8px'
                                      }}>
                                        <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>diamond : </label>
                                        {singleProd?.IsMrpBase == 1 ?
                                          <span className="elv_metaltype_span">
                                            {singleProd?.DiaQuaCol}
                                          </span>
                                          :
                                          <select
                                            className="elv_metaltype_drp"
                                            value={selectDiaQc}
                                            onChange={(e) => handleCustomChange(e, 'dt')}
                                          >
                                            {diaQcCombo.map((ele) => (
                                              <option key={ele?.QualityId} value={`${ele?.Quality},${ele?.color}`}>
                                                {`${ele?.Quality}#${ele?.color}`}
                                              </option>
                                            ))}
                                          </select>
                                        }
                                      </div>
                                    </div>
                                    <hr className='elv_ProductDet_divider_1' />
                                  </div>
                                </>
                              ) : null}
                              {(storeInit?.IsCsCustomization === 1 &&
                                selectCsQC?.length > 0 && csList?.filter((ele) => ele?.D !== "MISC")?.length > 0) ? (
                                <>
                                  <div>
                                    <div>
                                      <div style={{
                                        margin: 1,
                                        width: "95%",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: 'column',
                                        border: "none",
                                        paddingBottom: '8px'
                                      }}>
                                        <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>color stone : </label>
                                        {singleProd?.IsMrpBase == 1 ?
                                          <span className="elv_metaltype_span">
                                            {singleProd?.CsQuaCol}
                                          </span>
                                          :
                                          <select
                                            className="elv_metaltype_drp"
                                            value={selectCsQC}
                                            onChange={(e) => handleCustomChange(e, 'cs')}
                                          >
                                            {csQcCombo.map((ele) => (
                                              <option key={ele?.QualityId} value={`${ele?.Quality},${ele?.color}`}>
                                                {`${ele?.Quality}#${ele?.color}`}
                                              </option>
                                            ))}
                                          </select>
                                        }
                                      </div>
                                      <hr className='elv_ProductDet_divider_1' />
                                    </div>
                                  </div>
                                </>
                              ) : null}
                              {SizeSorting(SizeCombo?.rd)?.length > 0 && (
                                <>
                                  <div>
                                    <div>
                                      <div style={{
                                        margin: 1,
                                        width: "95%",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: 'column',
                                        border: "none",
                                        paddingBottom: '8px'
                                      }}>
                                        <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>size : </label>
                                        {singleProd?.IsMrpBase == 1 ?
                                          <span className="elv_metaltype_span">
                                            {singleProd?.DefaultSize}
                                          </span>
                                          :
                                          <select
                                            className="elv_metaltype_drp_size"
                                            value={sizeData}
                                            onChange={(e) => handleCustomChange(e, 'size')}
                                          >
                                            {SizeCombo?.rd?.map((ele) => (
                                              <option key={ele?.id} value={ele?.sizename}>
                                                {ele?.sizename}
                                              </option>
                                            ))}
                                          </select>}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                              {(storeInit?.IsPriceShow == 1 && storeInit?.IsPriceBreakUp == 1) && (singleProd ?? singleProd1)?.IsMrpBase != 1 && (
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
                                    <span className='elv_price_break'>Price Breakup</span>
                                  </AccordionSummary>
                                  <AccordionDetails
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "4px",
                                      // minHeight: "fit-content",
                                      // maxHeight: "300px",
                                      // overflow: "auto",
                                      padding: '0 6px 16px 6px',

                                    }}
                                  >

                                    {(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Metal</Typography>
                                      <span style={{ display: 'flex' }}>
                                        <Typography>
                                          {
                                            <span className="elv_currencyFont" sx={{ fontFamily: 'sans-serif' }}>
                                              {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>
                                          }
                                        </Typography>
                                        &nbsp;
                                        <Typography sx={{ fontFamily: 'sans-serif' }} className="elv_PriceBreakup_Price">{formatter((singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost)?.toFixed(2))}</Typography>
                                      </span>
                                    </div> : null}

                                    {(singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Diamond </Typography>

                                      <span style={{ display: 'flex' }}>
                                        <Typography>{
                                          <span className="elv_currencyFont" sx={{ fontFamily: 'sans-serif' }}>
                                            {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                          </span>
                                        }</Typography>
                                        &nbsp;
                                        <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{formatter((singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost)?.toFixed(2))}</Typography>
                                      </span>
                                    </div> : null}

                                    {(singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Stone </Typography>

                                      <span style={{ display: 'flex' }}>
                                        <Typography>{
                                          <span className="elv_currencyFont" sx={{ fontFamily: 'sans-serif' }}>
                                            {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                          </span>
                                        }</Typography>
                                        &nbsp;
                                        <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{formatter((singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost)?.toFixed(2))}</Typography>
                                      </span>
                                    </div> : null}

                                    {(singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>MISC </Typography>

                                      <span style={{ display: 'flex' }}>
                                        <Typography>{
                                          <span className="elv_currencyFont" sx={{ fontFamily: 'sans-serif' }}>
                                            {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                          </span>
                                        }</Typography>
                                        &nbsp;
                                        <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{formatter((singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost)?.toFixed(2))}</Typography>
                                      </span>
                                    </div> : null}

                                    {formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2)) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Labour </Typography>

                                      <span style={{ display: 'flex' }}>
                                        <Typography>{
                                          <span style={{ fontFamily: 'sans-serif' }}>
                                            {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                          </span>
                                        }</Typography>
                                        &nbsp;
                                        <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2))}</Typography>
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
                                          <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Other </Typography>

                                          <span style={{ display: 'flex' }}>
                                            <Typography>{
                                              <span className="elv_currencyFont" sx={{ fontFamily: 'sans-serif' }}>
                                                {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                              </span>
                                            }</Typography>
                                            &nbsp;
                                            <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{
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
                              )}
                            </div>
                          </>
                        )}

                        {storeInit?.IsPriceShow == 1 && <div className='elv_ProductDet_prod_price'>
                          <span className='elv_ProductDet_prod_price_1'>
                            {
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: decodeEntities(loginData?.CurrencyCode),
                                }}
                              />
                            }
                            {
                              (isPriceloading || pdLoadImage || loadingdata) ?
                                <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                                :
                                <span style={{ marginInline: "0.3rem" }}>{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp ?? 0)}</span>
                            }
                          </span>
                        </div>}
                        <div className='elv_ProductDet_prod_addtocart'>
                          <div className='elv_ProductDet_cart_div'>
                            <button onClick={() => handleCart(!addToCardFlag)} className='elv_ProductDet_cart'>{addToCardFlag === false ? "ADD TO CART" : "REMOVE FROM CART"}</button>
                          </div>
                          <div className='elv_ProductDet_wishlist_div'>
                            <Checkbox
                              icon={
                                <FavoriteBorderIcon />
                              }
                              checkedIcon={
                                <FavoriteIcon />
                              }
                              className='elv_ProductDet_wishlist'
                              disableRipple={true}
                              checked={wishListFlag ?? singleProd?.IsInWish == 1 ? true : false}
                              onChange={(e) => handleWishList(e, singleProd)}
                            />
                          </div>
                        </div>
                        {/* {singleProd?.InStockDays !== 0 && <p style={{ margin: '20px 1rem 0px 1rem', fontWeight: 500, fontSize: '18px', fontFamily: 'sans-serif', color: '#7d7f85' }}>Express Shipping in Stock {singleProd?.InStockDays} Days Delivery</p>}
                      {singleProd?.MakeOrderDays != 0 && <p style={{ marginInline: '1rem', fontWeight: 500, fontSize: '18px', fontFamily: 'sans-serif', color: '#7d7f85' }}>Make To Order {singleProd?.MakeOrderDays} Days Delivery</p>} */}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='elv_ProductDet_prod_description'>
                    <div className='elv_Product_prod_desc_data'>
                      <h1 className='elv_ProductDet_prod_title'>{formatTitleLine(singleProd?.TitleLine) && singleProd?.TitleLine}</h1>
                      <div className='elv_ProductDet_det'>
                        <span className='elv_ProductDet_prod_code'>{singleProd?.designno}</span>
                        <div className="collection-breadcrumb">
                          <span className="text-muted-foreground">Collection</span>
                          <span className="separator">-</span>
                          {/* <span className="text-timeless">{getCollName}</span> */}
                          <span className="text-timeless">{(singleProd ?? singleProd1)?.collection}</span>
                        </div>
                        <div className='elv_productDet_metal_style'>
                          {singleProd?.MetalTypePurity !== "" &&
                            metalType ? (
                            <div>
                              <span>Metal Purity : </span> <span className='elv_ProductDet_text' style={{ textTransform: 'uppercase' }}>{singleProd?.IsMrpBase === 1 ? singleProd?.MetalTypePurity : metalType}</span>
                            </div>
                          ) : null}
                          <div>
                            <span>Metal Color : </span> <span className='elv_ProductDet_text'>{JSON.parse(sessionStorage.getItem("MetalColorCombo"))?.filter(
                              (ele) => ele?.colorcode == metalColor
                            )[0]?.metalcolorname}</span>
                          </div>
                          <div>
                            {(storeInit?.IsDiamondCustomization === 1 &&
                              diaQcCombo?.length > 0 && diaList?.length && singleProd?.DiaQuaCol !== "" && selectDiaQc) ? (
                              <>
                                <span>Diamond Quality Color : </span> <span className='elv_ProductDet_text'>{singleProd?.IsMrpBase === 1
                                  ? singleProd?.DiaQuaCol
                                  : selectDiaQc != "undefined,undefined" ? selectDiaQc : (diaQcCombo?.length ? `${diaQcCombo[0].Quality},${diaQcCombo[0].color}` : '')}</span>
                              </>
                            ) : null}
                          </div>
                          <div>
                            {storeInit?.IsMetalWeight === 1 && (
                              <>
                                <span>Net Wt : </span> <span className='elv_ProductDet_text'>{(singleProd1?.Nwt ?? singleProd?.Nwt)?.toFixed(3)}</span>
                              </>
                            )}
                          </div>
                          {(singleProd1?.description ?? singleProd?.description)?.length > 0 && (
                            <>
                              <hr className='elv_ProductDet_divider' />
                              <div className={`elv_prod_description ${isExpanded ? 'show-more' : ''}`}>
                                <p className="description-text">
                                  {(singleProd1?.description ?? singleProd?.description)}
                                </p>
                                <span className="toggle-text" onClick={toggleText}>
                                  {isExpanded ? 'Show Less' : 'Show More'}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <hr className='elv_ProductDet_divider' />
                      </div>
                      {storeInit?.IsProductWebCustomization == 1 && (
                        <>
                          <div className='elv_ProductDet_dropdown'>
                            {metalTypeCombo?.length > 0 && storeInit?.IsMetalCustomization === 1 && (
                              <div>
                                <div style={{
                                  margin: 1,
                                  width: "95%",
                                  display: "flex",
                                  justifyContent: "center",
                                  flexDirection: 'column',
                                  border: "none",
                                  paddingBottom: '8px'
                                }}>
                                  <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>metal type : </label>
                                  {singleProd?.IsMrpBase == 1 ?
                                    <span className="elv_metaltype_span">
                                      {metalTypeCombo?.filter((ele) => ele?.Metalid == singleProd?.MetalPurityid)[0]?.metaltype}
                                    </span>
                                    :
                                    <select
                                      className="elv_metaltype_drp"
                                      value={metalType}
                                      onChange={(e) => handleCustomChange(e, 'mt')}
                                    >
                                      {metalTypeCombo.map((ele) => (
                                        <option key={ele?.Metalid} value={ele?.metaltype}>
                                          {ele?.metaltype}
                                        </option>
                                      ))}
                                    </select>
                                  }
                                </div>
                                <hr className='elv_ProductDet_divider_1' />
                              </div>
                            )}
                            {metalColorCombo?.length > 0 && storeInit?.IsMetalTypeWithColor === 1 && (
                              <div>
                                <div>
                                  <div style={{
                                    margin: 1,
                                    width: "95%",
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: 'column',
                                    border: "none",
                                    paddingBottom: '8px'
                                  }}>
                                    <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>metal color : </label>
                                    {singleProd?.IsMrpBase == 1 ?
                                      <span className="elv_metaltype_span">
                                        {metalColorCombo?.filter((ele) => ele?.id == singleProd?.MetalColorid)[0]?.metalcolorname}
                                      </span>
                                      :
                                      <select
                                        className="elv_metaltype_drp"
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
                                      </select>}
                                  </div>
                                </div>
                                <hr className='elv_ProductDet_divider_1' />
                              </div>
                            )}
                            {(storeInit?.IsDiamondCustomization === 1 && diaQcCombo?.length > 0 && diaList?.length) ? (
                              <>
                                <div>
                                  <div>
                                    <div style={{
                                      margin: 1,
                                      width: "95%",
                                      display: "flex",
                                      justifyContent: "center",
                                      flexDirection: 'column',
                                      border: "none",
                                      paddingBottom: '8px'
                                    }}>
                                      <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>diamond : </label>
                                      {singleProd?.IsMrpBase == 1 ?
                                        <span className="elv_metaltype_span">
                                          {singleProd?.DiaQuaCol}
                                        </span>
                                        :
                                        <select
                                          className="elv_metaltype_drp"
                                          value={selectDiaQc}
                                          onChange={(e) => handleCustomChange(e, 'dt')}
                                        >
                                          {diaQcCombo.map((ele) => (
                                            <option key={ele?.QualityId} value={`${ele?.Quality},${ele?.color}`}>
                                              {`${ele?.Quality}#${ele?.color}`}
                                            </option>
                                          ))}
                                        </select>
                                      }
                                    </div>
                                  </div>
                                  <hr className='elv_ProductDet_divider_1' />
                                </div>
                              </>
                            ) : null}
                            {(storeInit?.IsCsCustomization === 1 &&
                              selectCsQC?.length > 0 && csList?.filter((ele) => ele?.D !== "MISC")?.length > 0) ? (
                              <>
                                <div>
                                  <div>
                                    <div style={{
                                      margin: 1,
                                      width: "95%",
                                      display: "flex",
                                      justifyContent: "center",
                                      flexDirection: 'column',
                                      border: "none",
                                      paddingBottom: '8px'
                                    }}>
                                      <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>color stone : </label>
                                      {singleProd?.IsMrpBase == 1 ?
                                        <span className="elv_metaltype_span">
                                          {singleProd?.CsQuaCol}
                                        </span>
                                        :
                                        <select
                                          className="elv_metaltype_drp"
                                          value={selectCsQC}
                                          onChange={(e) => handleCustomChange(e, 'cs')}
                                        >
                                          {csQcCombo.map((ele) => (
                                            <option key={ele?.QualityId} value={`${ele?.Quality},${ele?.color}`}>
                                              {`${ele?.Quality}#${ele?.color}`}
                                            </option>
                                          ))}
                                        </select>
                                      }
                                    </div>
                                    <hr className='elv_ProductDet_divider_1' />
                                  </div>
                                </div>
                              </>
                            ) : null}
                            {SizeSorting(SizeCombo?.rd)?.length > 0 && (
                              <>
                                <div>
                                  <div>
                                    <div style={{
                                      margin: 1,
                                      width: "95%",
                                      display: "flex",
                                      justifyContent: "center",
                                      flexDirection: 'column',
                                      border: "none",
                                      paddingBottom: '8px'
                                    }}>
                                      <label style={{ textTransform: 'uppercase', paddingBottom: '6px' }}>size : </label>
                                      {singleProd?.IsMrpBase == 1 ?
                                        <span className="elv_metaltype_span">
                                          {singleProd?.DefaultSize}
                                        </span>
                                        :
                                        <select
                                          className="elv_metaltype_drp_size"
                                          value={sizeData}
                                          onChange={(e) => handleCustomChange(e, 'size')}
                                        >
                                          {SizeCombo?.rd?.map((ele) => (
                                            <option key={ele?.id} value={ele?.sizename}>
                                              {ele?.sizename}
                                            </option>
                                          ))}
                                        </select>}
                                    </div>
                                    <hr className='elv_ProductDet_divider_1' />
                                  </div>
                                </div>
                              </>
                            )}
                            {(storeInit?.IsPriceShow == 1 && storeInit?.IsPriceBreakUp == 1) && (singleProd ?? singleProd1)?.IsMrpBase != 1 && (
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
                                  <span className='elv_price_break'>Price Breakup</span>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    // minHeight: "fit-content",
                                    // maxHeight: "300px",
                                    // overflow: "auto",
                                    padding: '0 6px 16px 6px',

                                  }}
                                >

                                  {(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Metal</Typography>
                                    <span style={{ display: 'flex' }}>
                                      <Typography>
                                        {
                                          <span className="elv_currencyFont" sx={{ fontFamily: 'sans-serif' }}>
                                            {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                          </span>
                                        }
                                      </Typography>
                                      &nbsp;
                                      <Typography sx={{ fontFamily: 'sans-serif' }} className="elv_PriceBreakup_Price">{formatter((singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost)?.toFixed(2))}</Typography>
                                    </span>
                                  </div> : null}

                                  {(singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Diamond </Typography>

                                    <span style={{ display: 'flex' }}>
                                      <Typography>{
                                        <span className="elv_currencyFont" style={{ fontFamily: 'sans-serif' }}>
                                          {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }</Typography>
                                      &nbsp;
                                      <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{formatter((singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost)?.toFixed(2))}</Typography>
                                    </span>
                                  </div> : null}

                                  {(singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Stone </Typography>

                                    <span style={{ display: 'flex' }}>
                                      <Typography>{
                                        <span className="elv_currencyFont" sx={{ fontFamily: 'sans-serif' }}>
                                          {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }</Typography>
                                      &nbsp;
                                      <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{formatter((singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost)?.toFixed(2))}</Typography>
                                    </span>
                                  </div> : null}

                                  {(singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>MISC </Typography>

                                    <span style={{ display: 'flex' }}>
                                      <Typography>{
                                        <span className="elv_currencyFont" sx={{ fontFamily: 'sans-serif' }}>
                                          {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }</Typography>
                                      &nbsp;
                                      <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{formatter((singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost)?.toFixed(2))}</Typography>
                                    </span>
                                  </div> : null}

                                  {formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2)) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Labour </Typography>

                                    <span style={{ display: 'flex' }}>
                                      <Typography>{
                                        <span sx={{ fontFamily: 'sans-serif' }}>
                                          {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>
                                      }</Typography>
                                      &nbsp;
                                      <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2))}</Typography>
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
                                        <Typography className="elv_Price_breakup_label" sx={{ fontFamily: 'sans-serif' }}>Other </Typography>

                                        <span style={{ display: 'flex' }}>
                                          <Typography>{
                                            <span className="elv_currencyFont" sx={{ fontFamily: 'sans-serif' }}>
                                              {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>
                                          }</Typography>
                                          &nbsp;
                                          <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: 'sans-serif' }}>{
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
                            )}
                          </div>
                        </>
                      )}

                      {storeInit?.IsPriceShow == 1 && <div className='elv_ProductDet_prod_price'>
                        <span className='elv_ProductDet_prod_price_1'>
                          {
                            <span
                              dangerouslySetInnerHTML={{
                                __html: decodeEntities(loginData?.CurrencyCode),
                              }}
                            />
                          }
                          {
                            (isPriceloading || pdLoadImage || loadingdata) ?
                              <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                              :
                              <span style={{ marginInline: "0.3rem" }}>{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp ?? 0)}</span>
                          }
                        </span>
                      </div>}
                      <div className='elv_ProductDet_prod_addtocart'>
                        <div className='elv_ProductDet_cart_div'>
                          <button onClick={() => handleCart(!addToCardFlag)} className='elv_ProductDet_cart'>{addToCardFlag === false ? "ADD TO CART" : "REMOVE FROM CART"}</button>
                        </div>
                        <div className='elv_ProductDet_wishlist_div'>
                          <Checkbox
                            icon={
                              <FavoriteBorderIcon />
                            }
                            checkedIcon={
                              <FavoriteIcon />
                            }
                            className='elv_ProductDet_wishlist'
                            disableRipple={true}
                            checked={wishListFlag ?? singleProd?.IsInWish == 1 ? true : false}
                            onChange={(e) => handleWishList(e, singleProd)}
                          />
                        </div>
                      </div>
                      {/* {singleProd?.InStockDays !== 0 && <p style={{ margin: '20px 0px 0px 0px', fontWeight: 500, fontSize: '18px', fontFamily: 'sans-serif', color: '#7d7f85' }}>Express Shipping in Stock {singleProd?.InStockDays} Days Delivery</p>}
                    {singleProd?.MakeOrderDays != 0 && <p style={{ margin: '0px', fontWeight: 500, fontSize: '18px', fontFamily: 'sans-serif', color: '#7d7f85' }}>Make To Order {singleProd?.MakeOrderDays} Days Delivery</p>} */}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className='elv_ProductDet_extra_dets'>

          <div className='elv_ProductDet_title'>
            {(diaList?.length > 0 || csList?.filter((ele) => ele?.D === "MISC")?.length > 0 || csList?.filter((ele) => ele?.D !== "MISC")?.length > 0) && (
              <p className="elv_details_title"> Product Details</p>
            )}
          </div>
          {diaList?.length > 0 && (
            <>
              <div>
                <TableComponentsDia list={diaList} details={'Diamond Details'} />
              </div>
            </>
          )}
          {csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 && (
            <>
              <div style={{ marginTop: '1.5rem' }}>
                <TableComponentsMISC list={csList} details={'Color Stone Details'} />
              </div>
            </>
          )}
          {csList?.filter((ele) => ele?.D === "MISC")?.length > 0 && (
            <>
              <div style={{ marginTop: '1.5rem' }}>
                <TableComponentsMISC list={csList} details={'MISC Details'} />
              </div>
            </>
          )}
        </div>


        <div className='elv_ProductDet_extra_stock_items'>
          {stockItemArr?.length > 0 && stockItemArr?.[0]?.stat_code != 1005 && storeInit?.IsStockWebsite === 1 && (
            <Stockitems
              stockItemArr={stockItemArr}
              storeInit={storeInit}
              loginInfo={loginData}
              cartArr={cartArr}
              check={storeInit?.IsPriceShow === 1}
              handleCartandWish={handleCartandWish}
            />
          )}
        </div>

        <div className='elv_ProductDet_semiliar_design'>
          {storeInit?.IsProductDetailSimilarDesign == 1 &&
            SimilarBrandArr?.length > 0 && SimilarBrandArr?.[0]?.stat_code != 1005 && (
              <RelatedProduct
                SimilarBrandArr={SimilarBrandArr}
                handleMoveToDetail={handleMoveToDetail}
                storeInit={storeInit}
                loginInfo={loginData}
              />
            )}
        </div>
        <div className='elv_ProductDet_design_set'>

          {storeInit?.IsProductDetailDesignSet === 1 &&
            designSetList?.length > 0 &&
            designSetList?.[0]?.stat_code != 1005 && (
              <DesignSet
                designSetList={designSetList}
                handleMoveToDetail={handleMoveToDetail}
                imageNotFound={imageNotFound}
                loginInfo={loginData}
                storeInit={storeInit}
              />
            )}
        </div>
      </div >
    </>
  )
}

export default ProductDetail

const TableComponentsDia = ({ list, details }) => {

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
      <ul className='elv_ProductDet_diaDet'>
        <li>
          <div>
            <span>{details}</span> <span>({pcsTotalVal[0]?.total}<span style={{ marginInline: '2px' }}>/</span>{wtTotalVal[0]?.total}ct)</span>
          </div>
        </li>
      </ul>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead className='elv_ProductDet_weight_names' style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline' }}>
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
                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{`${val?.M} / ${(val?.N).toFixed(3)}`}</td>
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
      <ul className='elv_ProductDet_diaDet'>
        <li>
          <div>
            {details.includes('MISC') ? (
              <>
                <span>{details}</span> <span>({pcsTotalVal1[0]?.total}<span style={{ marginInline: '2px' }}>/</span>{wtTotalVal1[0]?.total}gm)</span>
              </>
            ) : (
              <>
                <span>{details}</span> <span>({pcsTotalVal[0]?.total}<span style={{ marginInline: '2px' }}>/</span>{wtTotalVal[0]?.total}ct)</span>
              </>
            )}
          </div>
        </li>
      </ul>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead className='elv_ProductDet_weight_names' style={{ color: '#7d7f85', fontWeight: '600', textDecoration: 'underline' }}>
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