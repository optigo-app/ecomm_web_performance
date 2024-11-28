import React, { useEffect, useState } from 'react'
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
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import RelatedProduct from './RelatedProduct/RelatedProduct';
import { StockItemApi } from '../../../../../../utils/API/StockItemAPI/StockItemApi';
import { DesignSetListAPI } from '../../../../../../utils/API/DesignSetListAPI/DesignSetListAPI';
import DesignSet from './DesignSet/DesignSet';
import Stockitems from './InstockProduct/Stockitems';

const New1 = () => {
    const [maxWidth1400, setMaxWidth1400] = useState(false);
    const [maxWidth1000, setMaxWidth1000] = useState(false);
    const [decodeUrl, setDecodeUrl] = useState({})
    const [storeInit, setStoreInit] = useState({});
    const [loginData, setLoginData] = useState({});
    const [sizeData, setSizeData] = useState();
    const [singleProd, setSingleProd] = useState({});
    console.log('singleProd: ', singleProd);
    const [singleProd1, setSingleProd1] = useState({});
    console.log('singleProd1: ', singleProd1);
    const [diaList, setDiaList] = useState([]);
    const [csList, setCsList] = useState([]);
    const [netWTData, setnetWTData] = useState([])
    const [SizeCombo, setSizeCombo] = useState([]);
    const [metalTypeCombo, setMetalTypeCombo] = useState([])
    const [metalType, setMetalType] = useState();
    const [isImageload, setIsImageLoad] = useState(true);
    const [metalColor, setMetalColor] = useState();
    const [selectDiaQc, setSelectDiaQc] = useState();
    const [showtDiaQc, setShowDiaQc] = useState();
    const [diaQcCombo, setDiaQcCombo] = useState([])
    const [csQcCombo, setCsQcCombo] = useState([])
    const [selectCsQC, setSelectCsQC] = useState();
    const [metalWiseColorImg, setMetalWiseColorImg] = useState([]);
    const [showCsQC, setShowCsQC] = useState();
    const [metalColorCombo, setMetalColorCombo] = useState([]);
    const [isPriceloading, setisPriceLoading] = useState(false);
    const [selectedThumbImg, setSelectedThumbImg] = useState();
    console.log('selectedThumbImg: ', selectedThumbImg);
    const [pdThumbImg, setPdThumbImg] = useState([]);
    const [thumbImgIndex, setThumbImgIndex] = useState()
    const [pdVideoArr, setPdVideoArr] = useState([]);
    const [addToCardFlag, setAddToCartFlag] = useState(null);
    const [wishListFlag, setWishListFlag] = useState(null);
    const [isDataFound, setIsDataFound] = useState(false)
    const location = useLocation();

    let cookie = Cookies.get('visiterId')

    const Navigate = useNavigate();

    const setCartCountVal = useSetRecoilState(el_CartCount)
    const setWishCountVal = useSetRecoilState(el_WishCount)
    const [loadingdata, setloadingdata] = useState(false);
    const [SimilarBrandArr, setSimilarBrandArr] = useState([]);
    const [designSetList, setDesignSetList] = useState();
    const [stockItemArr, setStockItemArr] = useState([]);
    console.log('stockItemArr: ', stockItemArr);
    const [cartArr, setCartArr] = useState({});

    let maxWidth1400px = useMediaQuery('(max-width:1400px)')
    let maxWidth1000px = useMediaQuery('(max-width:1000px)')
    useEffect(() => {
        const handleMax1400px = () => {
            if (maxWidth1400px) {
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

    // API Integration


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
            const getCurrentMetalColor = mtColorLocal.find((ele) => ele?.id === singleProd?.MetalColorid)?.metalcolorname;
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
            DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
            CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
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
                return ele?.id == (singleProd1?.MetalColorid ?? singleProd?.MetalColorid)
            }) ?? metalColorCombo;

        const prodObj = {
            autocode: singleProd?.autocode,
            Metalid: metal?.Metalid,
            MetalColorId: mcArr?.id ?? singleProd?.MetalColorid,
            DiaQCid: `${dia?.QualityId},${dia?.ColorId}`,
            CsQCid: `${cs?.QualityId},${cs?.ColorId}`,
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


                if (mtTypeLocal?.length) {
                    metalArr =
                        mtTypeLocal?.filter((ele) => ele?.Metalid == decodeobj?.m)[0] ??
                        mtTypeLocal[0];
                }

                if (diaQcLocal?.length) {
                    diaArr =
                        diaQcLocal?.filter(
                            (ele) =>
                                ele?.QualityId == decodeobj?.d?.split(",")[0] &&
                                ele?.ColorId == decodeobj?.d?.split(",")[1]
                        )[0] ?? diaQcLocal[0];
                }

                if (csQcLocal?.length) {
                    csArr =
                        csQcLocal?.filter(
                            (ele) =>
                                ele?.QualityId == decodeobj?.c?.split(",")[0] &&
                                ele?.ColorId == decodeobj?.c?.split(",")[1]
                        )[0] ?? csQcLocal[0];
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
        let navVal = location?.search.split("?p=")[1];
        let storeinitInside = JSON.parse(sessionStorage.getItem("storeInit"));
        let decodeobj = decodeAndDecompress(navVal);
        if (decodeobj) {
            setDecodeUrl(decodeobj);
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
        const FetchProductData = async () => {
            let obj = {
                mt: metalArr,
                diaQc: `${diaArr?.QualityId},${diaArr?.ColorId}`,
                csQc: `${csArr?.QualityId ?? 0},${csArr?.ColorId ?? 0}`,
            };

            setisPriceLoading(true);

            await SingleProdListAPI(decodeobj, sizeData, obj, cookie)
                .then(async (res) => {
                    console.log('res: ', res);
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
                .then(async (resp) => {
                    console.log('resp: ', resp);
                    if (resp) {
                        await getSizeData(resp?.pdList[0], cookie)
                            .then((res) => {
                                console.log("Sizeres", res);
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
                            await DesignSetListAPI(obj, resp?.pdList[0]?.designno, cookie).then((res) => {
                                setDesignSetList(res?.Data?.rd)
                            }).catch((err) => console.log("designsetErr", err))
                        }
                    }
                })
                .catch((err) => console.log("err", err));
        };

        FetchProductData();

        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, []);

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

    const handleMetalWiseColorImg = async (e) => {

        let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
        let mcArr;

        if (mtColorLocal?.length) {
            mcArr = mtColorLocal?.filter(
                (ele) => ele?.metalcolorname == e.target.value
            )[0];
        }

        setMetalColor(e.target.value)

        let imgLink = storeInit?.DesignImageFol +
            (singleProd ?? singleProd1)?.designno +
            "_" +
            (thumbImgIndex + 1) + "_" + mcArr?.colorcode +
            "." +
            (singleProd ?? singleProd1)?.ImageExtension;

        // setMetalWiseColorImg(imgLink)

        let isImg = await checkImageAvailability(imgLink)

        if (isImg) {
            setMetalWiseColorImg(imgLink)
        } else {
            setMetalWiseColorImg()
        }

        let pd = singleProd;
        let pdImgListCol = [];
        let pdImgList = [];

        if (singleProd?.ColorImageCount > 0) {
            for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
                let imgString =
                    storeInit?.DesignImageFol +
                    singleProd?.designno +
                    "_" +
                    i +
                    "_" + mcArr?.colorcode +
                    "." +
                    singleProd?.ImageExtension;
                pdImgListCol.push(imgString);
            }
        }

        if (singleProd?.ImageCount > 0) {
            for (let i = 1; i <= singleProd?.ImageCount; i++) {
                let imgString =
                    storeInit?.DesignImageFol +
                    singleProd?.designno +
                    "_" +
                    i +
                    "." +
                    singleProd?.ImageExtension;
                pdImgList.push(imgString);
            }
        }


        let isImgCol;

        if (pdImgListCol?.length > 0) {
            isImgCol = await checkImageAvailability(pdImgListCol[0])
        }

        if (pdImgListCol?.length > 0 && (isImgCol == true)) {
            setPdThumbImg(pdImgListCol)
            setSelectedThumbImg({ "link": pdImgListCol[thumbImgIndex], "type": 'img' });
            setThumbImgIndex(thumbImgIndex)

        }
        else {
            if (pdImgList?.length > 0) {
                setSelectedThumbImg({ "link": pdImgList[thumbImgIndex], "type": 'img' });
                setPdThumbImg(pdImgList)
                setThumbImgIndex(thumbImgIndex)
            }
        }



        // console.log("pdImgList",pdImgList,pdImgListCol)
    }

    const ProdCardImageFunc = async () => {
        let finalprodListimg;
        let pdImgList = [];
        let pdvideoList = [];

        let pd = singleProd;

        let colImg;

        let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
        let mcArr;

        if (mtColorLocal?.length) {
            mcArr =
                mtColorLocal?.filter(
                    (ele) => ele?.id == singleProd?.MetalColorid
                )[0]
        }

        if (singleProd?.ColorImageCount > 0) {
            for (let i = 1; i <= singleProd?.ColorImageCount; i++) {
                let imgString =
                    storeInit?.DesignImageFol +
                    singleProd?.designno +
                    "_" +
                    i +
                    "_" + mcArr?.colorcode +
                    "." +
                    singleProd?.ImageExtension;

                let IsImg = checkImageAvailability(imgString)
                if (IsImg) {
                    pdImgList.push(imgString);
                }
            }

            if (pdImgList?.length > 0) {
                colImg = pdImgList[0]
            }
        }


        let IsColImg = false;
        if (colImg?.length > 0) {
            IsColImg = await checkImageAvailability(colImg)
        }

        console.log("colImg", IsColImg)

        if (pd?.ImageCount > 0 && !IsColImg) {
            for (let i = 1; i <= pd?.ImageCount; i++) {
                let imgString =
                    storeInit?.DesignImageFol +
                    pd?.designno +
                    "_" +
                    i +
                    "." +
                    pd?.ImageExtension;

                let IsImg = checkImageAvailability(imgString)
                if (IsImg) {
                    pdImgList.push(imgString);
                }
            }
        } else {
            finalprodListimg = imageNotFound;
        }

        console.log("SearchData", pd?.VideoCount);

        if (pd?.VideoCount > 0) {
            for (let i = 1; i <= pd?.VideoCount; i++) {
                let videoString =
                    (storeInit?.DesignImageFol).slice(0, -13) +
                    "video/" +
                    pd?.designno +
                    "_" +
                    i +
                    "." +
                    pd?.VideoExtension;
                pdvideoList.push(videoString);
            }
        }
        else {
            pdvideoList = [];
        }

        let FinalPdImgList = [];

        if (pdImgList?.length > 0) {
            for (let i = 0; i < pdImgList?.length; i++) {
                let isImgAvl = await checkImageAvailability(pdImgList[i])
                if (isImgAvl) {
                    FinalPdImgList.push(pdImgList[i])
                }
            }
        }

        console.log("SearchData", singleProd);

        if (FinalPdImgList?.length > 0) {
            finalprodListimg = FinalPdImgList[0];
            setSelectedThumbImg({ "link": FinalPdImgList[0], "type": 'img' });
            setPdThumbImg(FinalPdImgList);
            setThumbImgIndex(0)
        }

        if (pdvideoList?.length > 0) {
            setPdVideoArr(pdvideoList);
            if (FinalPdImgList.length < 1) {
                setSelectedThumbImg({ "link": pdvideoList[0], "type": 'vid' });
            }
        }

        return finalprodListimg;


    };

    useEffect(() => {
        ProdCardImageFunc();
    }, [singleProd, location?.key]);

    useEffect(() => {
        let mtColorLocal = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
        let mcArr;

        if (mtColorLocal?.length) {
            mcArr =
                mtColorLocal?.filter(
                    (ele) => ele?.id == (singleProd?.MetalColorid ?? singleProd1?.MetalColorid)
                )[0]
        }

        setMetalColor(mcArr?.metalcolorname);

    }, [singleProd])

    const getDynamicImages = (designno, count, extension) => {
        const getDesignImageFol = storeInit?.DesignImageFol;
        const url = `${getDesignImageFol}${designno}_${count > 0 ? count : 1}.${extension}`;
        return url;
    }
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

    const SizeSorting = (SizeArr) => {

        let SizeSorted = SizeArr?.sort((a, b) => {
            const nameA = parseInt(a?.sizename?.toUpperCase()?.slice(0, -2), 10);
            const nameB = parseInt(b?.sizename?.toUpperCase()?.slice(0, -2), 10);

            return nameA - nameB;
        })

        return SizeSorted

    }
    useEffect(() => {
        console.log('netWTData: ', netWTData);
        console.log("first", singleProd1?.Nwt)
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
        let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

        let obj = {
            a: productData?.autocode,
            b: productData?.designno,
            m: loginInfo?.MetalId,
            d: loginInfo?.cmboDiaQCid,
            c: loginInfo?.cmboCSQCid,
            f: {},
        };

        let encodeObj = compressAndEncode(JSON.stringify(obj));

        Navigate(
            `/d/${productData?.TitleLine?.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
            }${productData?.designno}?p=${encodeObj}`
        );
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

    return (
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
                                <div className='elv_ProductDet_max1400'>
                                    <div className='elv_ProductDet_prod_img_max1400'>
                                        {selectedThumbImg !== undefined ? (
                                            selectedThumbImg?.type == "img" ? (
                                                <img
                                                    // src={metalWiseColorImg ? metalWiseColorImg : selectedThumbImg?.Link}
                                                    src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                    onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                                                    alt={""}
                                                    onLoad={() => setIsImageLoad(false)}
                                                    className="elv_ProductDet_prod_image_max1400"
                                                />
                                            ) : (
                                                <div>
                                                    <video
                                                        src={pdVideoArr?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                        loop
                                                        autoPlay
                                                        playsInline
                                                        muted // Add this attribute to ensure autoplay works
                                                        style={{
                                                            width: "100%",
                                                            objectFit: "cover",
                                                            height: "100%",
                                                            borderRadius: "8px",
                                                        }}
                                                    />
                                                </div>
                                            )
                                        ) : (
                                            pdVideoArr?.length > 0 ? (
                                                <div>
                                                    <video
                                                        src={pdVideoArr?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                        loop
                                                        autoPlay
                                                        playsInline
                                                        muted // Add this attribute to ensure autoplay works
                                                        style={{
                                                            width: "100%",
                                                            objectFit: "cover",
                                                            height: "100%",
                                                            borderRadius: "8px",
                                                        }}
                                                    />
                                                </div>) : (
                                                <img
                                                    src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                    onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                                                    alt={""}
                                                    onLoad={() => setIsImageLoad(false)}
                                                    className="elv_ProductDet_prod_image_max1400"
                                                />
                                            )

                                        )
                                        }
                                    </div>
                                    <div className='elv_ProductDet_prod_img_list_max1400'>
                                        {(pdThumbImg?.length > 1 || pdVideoArr?.length > 0) &&
                                            pdThumbImg?.map((ele, i) => (
                                                <img
                                                    src={ele}
                                                    alt={""}
                                                    onLoad={() => setIsImageLoad(false)}
                                                    className='elv_ProductDet_image_max1400'
                                                    onClick={() => {
                                                        setSelectedThumbImg({
                                                            link: ele,
                                                            type: "img",
                                                        });
                                                        setThumbImgIndex(i);
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = noImageFound
                                                    }}
                                                />
                                            ))}
                                        {pdVideoArr?.map((data) => (
                                            <div
                                                style={{
                                                    position: "relative",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                                onClick={() =>
                                                    setSelectedThumbImg({ link: data, type: "vid" })
                                                }
                                            >
                                                <video
                                                    src={data}
                                                    autoPlay={true}
                                                    loop={true}
                                                    className="elv_ProductDet_image_max1400"
                                                    style={{ height: "58px", width: '58px', objectFit: "cover", cursor: 'pointer' }}
                                                />
                                                <IoIosPlayCircle
                                                    style={{
                                                        position: "absolute",
                                                        color: "white",
                                                        width: "35px",
                                                        height: "35px",
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {loadingdata ? (
                                    <Skeleton className='elv_prod_det_default_thumb' variant="square" />
                                ) : (
                                    <div className='elv_ProductDet_prod_img_list'>
                                        {(pdThumbImg?.length > 1) &&
                                            pdThumbImg?.map((ele, i) => (
                                                <img
                                                    src={ele}
                                                    alt={""}
                                                    onLoad={() => setIsImageLoad(false)}
                                                    className='elv_ProductDet_image'
                                                    onClick={() => {
                                                        setSelectedThumbImg({
                                                            link: ele,
                                                            type: "img",
                                                        });
                                                        setThumbImgIndex(i);
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = noImageFound
                                                    }}
                                                />
                                            ))}
                                        {pdVideoArr?.map((data) => (
                                            <div
                                                style={{
                                                    position: "relative",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                                onClick={() =>
                                                    setSelectedThumbImg({ link: data, type: "vid" })
                                                }
                                            >
                                                <video
                                                    src={data}
                                                    autoPlay={true}
                                                    loop={true}
                                                    // className="elv_prod_thumb_img"
                                                    style={{ height: "58px", width: '58px', objectFit: "cover", cursor: 'pointer' }}
                                                />
                                                <IoIosPlayCircle
                                                    style={{
                                                        position: "absolute",
                                                        color: "white",
                                                        width: "35px",
                                                        height: "35px",
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {loadingdata ? (
                                    <Skeleton className='elv_prod_det_default' variant="rectangular" />
                                ) : (
                                    <>
                                        <div className='elv_ProductDet_prod_img'>
                                            {selectedThumbImg !== undefined ? (
                                                selectedThumbImg?.type == "img" ? (
                                                    <img
                                                        // src={metalWiseColorImg ? metalWiseColorImg : selectedThumbImg?.Link}
                                                        src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                        onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                                                        alt={""}
                                                        onLoad={() => setIsImageLoad(false)}
                                                        className="elv_ProductDet_prod_image"
                                                    />
                                                ) : (
                                                    <div>
                                                        <video
                                                            src={pdVideoArr?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                            loop
                                                            autoPlay
                                                            playsInline
                                                            muted // Add this attribute to ensure autoplay works
                                                            style={{
                                                                width: "100%",
                                                                objectFit: "cover",
                                                                position: 'relative',
                                                                left: '6rem',
                                                                // height: "90%",
                                                                borderRadius: "8px",
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                pdVideoArr?.length > 0 ? (
                                                    <div>
                                                        <video
                                                            src={pdVideoArr?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                            loop
                                                            autoPlay
                                                            playsInline
                                                            muted // Add this attribute to ensure autoplay works
                                                            style={{
                                                                width: "100%",
                                                                objectFit: "cover",
                                                                position: 'relative',
                                                                left: '6rem',
                                                                // height: "90%",
                                                                borderRadius: "8px",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                        onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                                                        alt={""}
                                                        onLoad={() => setIsImageLoad(false)}
                                                        className="elv_ProductDet_prod_image"
                                                    />
                                                )
                                            )
                                            }
                                        </div>
                                    </>
                                )}

                            </>
                        )}
                        {maxWidth1000 ? (
                            <>
                                <div className='elv_ProductDet_max1000'>
                                    <div className='elv_ProductDet_prod_img_max1000'>
                                        {selectedThumbImg !== undefined ? (
                                            selectedThumbImg?.type == "img" ? (
                                                <img
                                                    // src={metalWiseColorImg ? metalWiseColorImg : selectedThumbImg?.Link}
                                                    src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                    onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                                                    alt={""}
                                                    onLoad={() => setIsImageLoad(false)}
                                                    className="elv_ProductDet_prod_image_max1000"
                                                />
                                            ) : (
                                                <div>
                                                    <video
                                                        src={pdVideoArr?.length > 0 ? selectedThumbImg?.link : imageNotFound}
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
                                                    />
                                                </div>
                                            )
                                        ) : (
                                            pdVideoArr?.length > 0 ? (
                                                <div>
                                                    <video
                                                        src={pdVideoArr?.length > 0 ? selectedThumbImg?.link : imageNotFound}
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
                                                    />
                                                </div>
                                            ) : (
                                                <img
                                                    src={pdThumbImg?.length > 0 ? selectedThumbImg?.link : imageNotFound}
                                                    onError={() => setSelectedThumbImg({ "link": imageNotFound, "type": 'img' })}
                                                    alt={""}
                                                    onLoad={() => setIsImageLoad(false)}
                                                    className="elv_ProductDet_prod_image_max1000"
                                                />
                                            )
                                        )
                                        }
                                    </div>
                                    <div className='elv_ProductDet_prod_img_list_max1000'>
                                        {(pdThumbImg?.length > 1 || pdVideoArr?.length > 0) &&
                                            pdThumbImg?.map((ele, i) => (
                                                <img
                                                    src={ele}
                                                    alt={""}
                                                    onLoad={() => setIsImageLoad(false)}
                                                    className='elv_ProductDet_image_max1000'
                                                    onClick={() => {
                                                        setSelectedThumbImg({
                                                            link: ele,
                                                            type: "img",
                                                        });
                                                        setThumbImgIndex(i);
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = noImageFound
                                                    }}
                                                />
                                            ))}
                                        {pdVideoArr?.map((data) => (
                                            <div
                                                style={{
                                                    position: "relative",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                                onClick={() =>
                                                    setSelectedThumbImg({ link: data, type: "vid" })
                                                }
                                            >
                                                <video
                                                    src={data}
                                                    autoPlay={true}
                                                    loop={true}
                                                    className="elv_ProductDet_image_max1000"
                                                    style={{ height: "58px", width: '58px', objectFit: "cover", cursor: 'pointer' }}
                                                />
                                                <IoIosPlayCircle
                                                    style={{
                                                        position: "absolute",
                                                        color: "white",
                                                        width: "35px",
                                                        height: "35px",
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='elv_ProductDet_prod_description_max1000'>
                                        <div className='elv_Product_prod_desc_data_max1000'>
                                            <h1 className='elv_ProductDet_prod_title_max1000'>{singleProd?.TitleLine}</h1>
                                            <div className='elv_ProductDet_det_max1000'>
                                                <span className='elv_ProductDet_prod_code_max1000'>{singleProd?.designno}</span>
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
                                                                <span>Diamond Quality Color : </span> <span className='elv_ProductDet_text_max1000'>{singleProd?.IsMrpBase === 1 ? singleProd?.DiaQuaCol : `${selectDiaQc}`}</span>
                                                            </>
                                                        ) : null}
                                                    </div>
                                                    <div className='elv_ProductDet_prod_text_div_max1000'>
                                                        <span>Net Wt : </span> <span className='elv_ProductDet_text_max1000'>{(singleProd1?.Nwt ?? singleProd?.Nwt)?.toFixed(3)}</span>
                                                    </div>
                                                </div>
                                                <hr className='elv_ProductDet_divider' />
                                            </div>
                                            {storeInit?.IsProductWebCustomization == 1 &&
                                                metalTypeCombo?.length > 0 && storeInit?.IsMetalCustomization === 1 && (
                                                    <div className='elv_ProductDet_dropdown_max1000'>
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
                                                                                onChange={(e) => handleMetalWiseColorImg(e)}
                                                                            >
                                                                                {metalColorCombo?.map((ele) => (
                                                                                    <option key={ele?.id} value={ele?.metalcolorname}>
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
                                                                                    className="elv_metaltype_drp"
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
                                                        {storeInit?.IsPriceBreakUp == 1 && (singleProd ?? singleProd1)?.IsMrpBase !== 1 && (
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
                                                                    <Typography className='elv_price_break'>Price Breakup</Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                        gap: "4px",
                                                                        // minHeight: "fit-content",
                                                                        // maxHeight: "300px",
                                                                        // overflow: "auto",
                                                                        padding: '0 0 16px 0',

                                                                    }}
                                                                >

                                                                    {(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Metal</Typography>
                                                                        <span style={{ display: 'flex' }}>
                                                                            <Typography>
                                                                                {
                                                                                    <span className="elv_currencyFont" sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                        {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                                    </span>
                                                                                }
                                                                            </Typography>
                                                                            &nbsp;
                                                                            <Typography sx={{ fontFamily: "PT Sans, sans-serif" }} className="elv_PriceBreakup_Price">{formatter((singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost)?.toFixed(2))}</Typography>
                                                                        </span>
                                                                    </div> : null}

                                                                    {(singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Diamond </Typography>

                                                                        <span style={{ display: 'flex' }}>
                                                                            <Typography>{
                                                                                <span className="elv_currencyFont" sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                    {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                                </span>
                                                                            }</Typography>
                                                                            &nbsp;
                                                                            <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{formatter((singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost)?.toFixed(2))}</Typography>
                                                                        </span>
                                                                    </div> : null}

                                                                    {(singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Stone </Typography>

                                                                        <span style={{ display: 'flex' }}>
                                                                            <Typography>{
                                                                                <span className="elv_currencyFont" sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                    {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                                </span>
                                                                            }</Typography>
                                                                            &nbsp;
                                                                            <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{formatter((singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost)?.toFixed(2))}</Typography>
                                                                        </span>
                                                                    </div> : null}

                                                                    {(singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>MISC </Typography>

                                                                        <span style={{ display: 'flex' }}>
                                                                            <Typography>{
                                                                                <span className="elv_currencyFont" sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                    {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                                </span>
                                                                            }</Typography>
                                                                            &nbsp;
                                                                            <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{formatter((singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost)?.toFixed(2))}</Typography>
                                                                        </span>
                                                                    </div> : null}

                                                                    {formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2)) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Labour </Typography>

                                                                        <span style={{ display: 'flex' }}>
                                                                            <Typography>{
                                                                                <span style={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                    {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                                </span>
                                                                            }</Typography>
                                                                            &nbsp;
                                                                            <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2))}</Typography>
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
                                                                                <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Other </Typography>

                                                                                <span style={{ display: 'flex' }}>
                                                                                    <Typography>{
                                                                                        <span className="elv_currencyFont" sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                            {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                                        </span>
                                                                                    }</Typography>
                                                                                    &nbsp;
                                                                                    <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{
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
                                                )}

                                            <div className='elv_ProductDet_prod_price'>
                                                <span className='elv_ProductDet_prod_price_1'>
                                                    {
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: decodeEntities(loginData?.CurrencyCode),
                                                            }}
                                                        />
                                                    }
                                                    {
                                                        isPriceloading ?
                                                            <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                                                            :
                                                            <span style={{ marginInline: "0.3rem" }}>{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp)}</span>
                                                    }
                                                </span>
                                            </div>
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
                                            {singleProd?.InStockDays !== 0 && <p style={{ margin: '20px 1rem 0px 1rem', fontWeight: 500, fontSize: '18px', fontFamily: 'PT Sans, sans-serif', color: '#7d7f85' }}>Express Shipping in Stock {singleProd?.InStockDays} Days Delivery</p>}
                                            {singleProd?.MakeOrderDays != 0 && <p style={{ marginInline: '1rem', fontWeight: 500, fontSize: '18px', fontFamily: 'PT Sans, sans-serif', color: '#7d7f85' }}>Make To Order {singleProd?.MakeOrderDays} Days Delivery</p>}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='elv_ProductDet_prod_description'>
                                    <div className='elv_Product_prod_desc_data'>
                                        <h1 className='elv_ProductDet_prod_title'>{singleProd?.TitleLine}</h1>
                                        <div className='elv_ProductDet_det'>
                                            <span className='elv_ProductDet_prod_code'>{singleProd?.designno}</span>
                                            <div className='elv_productDet_metal_style'>
                                                <div>
                                                    <span>Metal Purity : </span> <span className='elv_ProductDet_text' style={{ textTransform: 'uppercase' }}>{singleProd?.IsMrpBase === 1 ? singleProd?.MetalTypePurity : metalType}</span>
                                                </div>
                                                <div>
                                                    <span>Metal Color : </span> <span className='elv_ProductDet_text'>{JSON.parse(sessionStorage.getItem("MetalColorCombo"))?.filter(
                                                        (ele) => ele?.colorcode == metalColor
                                                    )[0]?.metalcolorname}</span>
                                                </div>
                                                <div>
                                                    {(storeInit?.IsDiamondCustomization === 1 &&
                                                        diaQcCombo?.length > 0 && diaList?.length && singleProd?.DiaQuaCol !== "" && selectDiaQc) ? (
                                                        <>
                                                            <span>Diamond Quality Color : </span> <span className='elv_ProductDet_text'>{singleProd?.IsMrpBase === 1 ? singleProd?.DiaQuaCol : `${selectDiaQc}`}</span>
                                                        </>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <span>Net Wt : </span> <span className='elv_ProductDet_text'>{(singleProd1?.Nwt ?? singleProd?.Nwt)?.toFixed(3)}</span>
                                                </div>
                                            </div>
                                            <hr className='elv_ProductDet_divider' />
                                        </div>
                                        {storeInit?.IsProductWebCustomization == 1 &&
                                            metalTypeCombo?.length > 0 && storeInit?.IsMetalCustomization === 1 && (
                                                <div className='elv_ProductDet_dropdown_max1000'>
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
                                                                            onChange={(e) => handleMetalWiseColorImg(e)}
                                                                        >
                                                                            {metalColorCombo?.map((ele) => (
                                                                                <option key={ele?.id} value={ele?.metalcolorname}>
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
                                                                                className="elv_metaltype_drp"
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
                                                    {storeInit?.IsPriceBreakUp == 1 && (singleProd ?? singleProd1)?.IsMrpBase != 1 && (
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
                                                                <Typography className='elv_price_break'>Price Breakup</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    gap: "4px",
                                                                    // minHeight: "fit-content",
                                                                    // maxHeight: "300px",
                                                                    // overflow: "auto",
                                                                    padding: '0 0 16px 0',

                                                                }}
                                                            >

                                                                {(singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Metal</Typography>
                                                                    <span style={{ display: 'flex' }}>
                                                                        <Typography>
                                                                            {
                                                                                <span className="elv_currencyFont" sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                    {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                                </span>
                                                                            }
                                                                        </Typography>
                                                                        &nbsp;
                                                                        <Typography sx={{ fontFamily: "PT Sans, sans-serif" }} className="elv_PriceBreakup_Price">{formatter((singleProd1?.Metal_Cost ? singleProd1?.Metal_Cost : singleProd?.Metal_Cost)?.toFixed(2))}</Typography>
                                                                    </span>
                                                                </div> : null}

                                                                {(singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Diamond </Typography>

                                                                    <span style={{ display: 'flex' }}>
                                                                        <Typography>{
                                                                            <span className="elv_currencyFont" style={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                            </span>
                                                                        }</Typography>
                                                                        &nbsp;
                                                                        <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{formatter((singleProd1?.Diamond_Cost ? singleProd1?.Diamond_Cost : singleProd?.Diamond_Cost)?.toFixed(2))}</Typography>
                                                                    </span>
                                                                </div> : null}

                                                                {(singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Stone </Typography>

                                                                    <span style={{ display: 'flex' }}>
                                                                        <Typography>{
                                                                            <span className="elv_currencyFont" sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                            </span>
                                                                        }</Typography>
                                                                        &nbsp;
                                                                        <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{formatter((singleProd1?.ColorStone_Cost ? singleProd1?.ColorStone_Cost : singleProd?.ColorStone_Cost)?.toFixed(2))}</Typography>
                                                                    </span>
                                                                </div> : null}

                                                                {(singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>MISC </Typography>

                                                                    <span style={{ display: 'flex' }}>
                                                                        <Typography>{
                                                                            <span className="elv_currencyFont" sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                            </span>
                                                                        }</Typography>
                                                                        &nbsp;
                                                                        <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{formatter((singleProd1?.Misc_Cost ? singleProd1?.Misc_Cost : singleProd?.Misc_Cost)?.toFixed(2))}</Typography>
                                                                    </span>
                                                                </div> : null}

                                                                {formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2)) !== 0 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Labour </Typography>

                                                                    <span style={{ display: 'flex' }}>
                                                                        <Typography>{
                                                                            <span sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                            </span>
                                                                        }</Typography>
                                                                        &nbsp;
                                                                        <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{formatter((singleProd1?.Labour_Cost ? singleProd1?.Labour_Cost : singleProd?.Labour_Cost)?.toFixed(2))}</Typography>
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
                                                                            <Typography className="elv_Price_breakup_label" sx={{ fontFamily: "PT Sans, sans-serif" }}>Other </Typography>

                                                                            <span style={{ display: 'flex' }}>
                                                                                <Typography>{
                                                                                    <span className="elv_currencyFont" sx={{ fontFamily: "PT Sans, sans-serif" }}>
                                                                                        {loginData?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                                    </span>
                                                                                }</Typography>
                                                                                &nbsp;
                                                                                <Typography className="elv_PriceBreakup_Price" sx={{ fontFamily: "PT Sans, sans-serif" }}>{
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
                                            )}
                                        <div className='elv_ProductDet_prod_price'>
                                            <span className='elv_ProductDet_prod_price_1'>
                                                {
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodeEntities(loginData?.CurrencyCode),
                                                        }}
                                                    />
                                                }
                                                {
                                                    isPriceloading ?
                                                        <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                                                        :
                                                        <span style={{ marginInline: "0.3rem" }}>{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp)}</span>
                                                }
                                            </span>
                                        </div>
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
                                        {singleProd?.InStockDays !== 0 && <p style={{ margin: '20px 0px 0px 0px', fontWeight: 500, fontSize: '18px', fontFamily: 'PT Sans, sans-serif', color: '#7d7f85' }}>Express Shipping in Stock {singleProd?.InStockDays} Days Delivery</p>}
                                        {singleProd?.MakeOrderDays != 0 && <p style={{ margin: '0px', fontWeight: 500, fontSize: '18px', fontFamily: 'PT Sans, sans-serif', color: '#7d7f85' }}>Make To Order {singleProd?.MakeOrderDays} Days Delivery</p>}
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
                            <TableComponents list={diaList} details={'Diamond Details'} />
                        </div>
                    </>
                )}
                {csList?.filter((ele) => ele?.D !== "MISC")?.length > 0 && (
                    <>
                        <div style={{ marginTop: '1.5rem' }}>
                            <TableComponents list={csList} details={'Color Stone Details'} />
                        </div>
                    </>
                )}
                {csList?.filter((ele) => ele?.D === "MISC")?.length > 0 && (
                    <>
                        <div style={{ marginTop: '1.5rem' }}>
                            <TableComponents list={csList} details={'MISC Details'} />
                        </div>
                    </>
                )}
            </div>


            <div className='elv_ProductDet_extra_stock_items'>
                {stockItemArr?.length > 0 && storeInit?.IsStockWebsite === 1 && (
                    <Stockitems
                        stockItemArr={stockItemArr}
                        storeInit={storeInit}
                        loginInfo={loginData}
                        cartArr={cartArr}
                        handleCartandWish={handleCartandWish}
                    />
                )}
            </div>

            <div className='elv_ProductDet_semiliar_design'>
                {storeInit?.IsProductDetailSimilarDesign == 1 &&
                    SimilarBrandArr?.length > 0 && (
                        <RelatedProduct
                            SimilarBrandArr={SimilarBrandArr}
                            handleMoveToDetail={handleMoveToDetail}
                            storeInit={storeInit}
                            loginInfo={loginData}
                        />
                    )}
            </div>
            <div className='elv_ProductDet_design_set'>

                {storeInit?.IsProductDetailDesignSet === 1 && (
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
    )
}

export default New1

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
            <ul class='elv_ProductDet_diaDet'>
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
                                <td style={{ color: 'gray', fontSize: '14px', flex: '1' }}>{val?.M}/{(val?.N).toFixed(3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

}