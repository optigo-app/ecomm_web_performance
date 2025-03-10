import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './DiamondDetails.scss';
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
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Rating, Skeleton, useMediaQuery } from '@mui/material';
import { RxCross1 } from "react-icons/rx";
import { getSizeData } from '../../../../../../utils/API/CartAPI/GetCategorySizeAPI';
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Services from '../../ReusableComponent/OurServives/OurServices';
import { StockItemApi } from '../../../../../../utils/API/StockItemAPI/StockItemApi';
import NewsletterSignup from '../../ReusableComponent/SubscribeNewsLater/NewsletterSignup';
import { IoIosPlayCircle } from 'react-icons/io';
import { CartAndWishListAPI } from '../../../../../../utils/API/CartAndWishList/CartAndWishListAPI';
import { RemoveCartAndWishAPI } from '../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { for_CartCount, for_Loader, for_WishCount, for_customizationSteps, for_customizationSteps1 } from '../../../Recoil/atom';
import Faq from '../../ReusableComponent/Faq/Faq';
import { responsiveConfig } from '../../../Config/ProductSliderConfig';
import RelatedProduct from '../ProductDetail/RelatedProduct/RelatedProduct';
import { StepImages } from '../../../data/NavbarMenu';
import { DiamondListData } from '../../../../../../utils/API/DiamondStore/DiamondList';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { toast } from 'react-toastify';
import OurServices from '../../Home/Common/OurServices/OurServices';
import certy from '../certy';


const DiamondDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoading = useRecoilValue(for_Loader);
    const sliderRef = useRef(null);
    const certificate = certy;
    const mobileView = useMediaQuery('(max-width:600px)');
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let cookie = Cookies.get("visiterId");
    const mTypeLocal = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
    const diaQcLocal = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
    const csQcLocal = JSON.parse(sessionStorage.getItem('ColorStoneQualityColorCombo'));
    const mtColorLocal = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
    const [customizeStep, setCustomizeStep] = useRecoilState(for_customizationSteps);
    const [customizeStep1, setCustomizeStep1] = useRecoilState(for_customizationSteps);
    const [settingSteps, setSettingSteps] = useState();
    const stepsData = JSON.parse(sessionStorage.getItem('custStepData'))
    const steps = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const steps1 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
    const steps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
    const steps3 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));
    const ringSteps = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
    const pendantSteps = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
    const earringSteps = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));
    const ringData = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
    const pendantData = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
    const earringData = JSON.parse(sessionStorage.getItem('custStepData2Earring'));

    useEffect(() => {
        if (ringSteps?.[0]?.Status === 'active') {
            setSettingSteps(ringSteps)
        }
        if (pendantSteps?.[0]?.Status === 'active') {
            setSettingSteps(pendantSteps);
        }
        if (earringSteps?.[0]?.Status === 'active') {
            setSettingSteps(earringSteps);
        }
    }, [])

    const [showModal, setShowModal] = useState(false);

    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const [singleDiaData, setSingleDiaData] = useState([]);
    const [shape, setShape] = useState()
    const [currentSlide, setCurrentSlide] = useState(0);
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
    const [isImageload, setIsImageLoad] = useState(true);
    const [netWTData, setnetWTData] = useState([])
    const [metalColorCombo, setMetalColorCombo] = useState([]);
    const [selectCsQC, setSelectCsQC] = useState();
    const [SizeCombo, setSizeCombo] = useState([]);
    const [sizeData, setSizeData] = useState();
    const [thumbImgIndex, setThumbImgIndex] = useState()
    const [pdThumbImg, setPdThumbImg] = useState([]);
    const [pdVideoArr, setPdVideoArr] = useState([]);
    const [selectedThumbImg, setSelectedThumbImg] = useState({ type: "video", src: singleDiaData?.[0]?.video_url });
    const [singleProd, setSingleProd] = useState({});
    const [singleProd1, setSingleProd1] = useState({});
    const [diaList, setDiaList] = useState([]);
    const [csList, setCsList] = useState([]);
    const [SimilarBrandArr, setSimilarBrandArr] = useState([]);
    const [isDataFound, setIsDataFound] = useState(false)
    const [isPriceloading, setisPriceLoading] = useState(false);
    const [decodeUrl, setDecodeUrl] = useState({})
    const [loadingdata, setloadingdata] = useState(false);
    const [path, setpath] = useState();
    const [metalWiseColorImg, setMetalWiseColorImg] = useState()
    const [videoArr, SETvideoArr] = useState([]);
    const [diamondData, setDiamondData] = useState([]);
    const [settingData, setSettingData] = useState();
    const [setshape, setSetShape] = useState();
    const [metalColor, setMetalColor] = useState([]);
    const [imageMap, setImageMap] = useState({});
    console.log('imageMap: ', imageMap);

    const setCartCountVal = useSetRecoilState(for_CartCount)
    const setWishCountVal = useSetRecoilState(for_WishCount)
    const [addToCardFlag, setAddToCartFlag] = useState(null);
    const [wishListFlag, setWishListFlag] = useState(false);
    const [addwishListFlag, setAddWishListFlag] = useState(null);
    const [PdImageArr, setPdImageArr] = useState([]);
    const [price, setPrice] = useState();
    const [ratingvalue, setratingvalue] = useState(5);
    const [filterVal, setFilterVal] = useState();
    const [Swap, setswap] = useState("diamond");
    const breadCrumb = location?.pathname?.split("/")[2];
    const [compSet, setCompSet] = useState(false);
    const [mediaArr, setMediaArr] = useState([]);
    const [compSettArr, setCompSettArr] = useState([]);
    const [getAllData, setAllData] = useState([]);
    const [certyLink, setCertyLink] = useState();
    console.log('certyLink: ', certyLink);
    const [getImagePath, setImagePath] = useState();

    const diamondDatas = JSON?.parse(sessionStorage.getItem('custStepData'))?.[0] ?? (ringData ?? pendantData)?.[1];

    const hrdCerti = singleDiaData?.[0]?.certificate_url?.includes("hrd") ? "HRD" : null
    const igiCerti = singleDiaData?.[0]?.certificate_url?.includes("igi") ? "IGI" : null
    const giaCerti = singleDiaData?.[0]?.certificate_url?.includes("gia") ? "GIA" : null

    const diaHrdCerti = (diamondDatas?.step1Data?.[0]?.certificate_url ?? diamondDatas?.step2Data?.[0]?.certificate_url)?.includes("hrd") ? "HRD" : null
    const diaIgiCerti = (diamondDatas?.step1Data?.[0]?.certificate_url ?? diamondDatas?.step2Data?.[0]?.certificate_url)?.includes("igi") ? "IGI" : null
    const diaGiaCerti = (diamondDatas?.step1Data?.[0]?.certificate_url ?? diamondDatas?.step2Data?.[0]?.certificate_url)?.includes("gia") ? "GIA" : null

    useEffect(() => {
        const getImagePath = settingSteps?.[0]?.Setting === "Ring" && settingSteps?.[0]?.Status === "active" ? JSON.parse(sessionStorage?.getItem("setImage")) : settingSteps?.[0]?.Setting === "Pendant" && settingSteps?.[0]?.Status === "active" ? JSON.parse(sessionStorage?.getItem("setPenImage")) : null;
        setImagePath(getImagePath);
    }, [location?.key, location?.pathname])

    const StyleCondition = {
        fontSize: breadCrumb === "settings" && "14px",
        fontWeight: breadCrumb === "settings" && "700",
    };

    const checkIfSettingCompPage = (pathname) => {
        return pathname.split('/').some(part => part.toLowerCase().includes('setting-complete-product'));
    };

    useEffect(() => {
        setCompSet(checkIfSettingCompPage(location?.pathname))
    }, [location?.pathname]);

    useEffect(() => {
        const getCertyNameFromUrl = igiCerti ?? hrdCerti ?? giaCerti;
        const getCertyNameFromUrlDia = diaIgiCerti ?? diaHrdCerti ?? diaGiaCerti;
        const diamondDatas = JSON?.parse(sessionStorage.getItem('custStepData'))?.[0] ?? (ringData ?? pendantData ?? earringData)?.[1];
        console.log('diamondDatas: ', diamondDatas);
        const diaStep1 = (diamondDatas?.step1Data?.[0]?.certyname || getCertyNameFromUrlDia)
        const diaStep2 = (diamondDatas?.step2Data?.[0]?.certyname || getCertyNameFromUrlDia)
        if (singleDiaData !== undefined || diamondDatas !== undefined) {
            const getCertiName = certificate?.find((item) => item?.certyName === (singleDiaData?.[0]?.certyname || getCertyNameFromUrl));
            const getCertiNameCompSet = certificate?.find((item) => item?.certyName === (diaStep1 ?? diaStep2))
            console.log('getCertiNameCompSet: ', getCertiNameCompSet);

            if (!compSet) {
                setCertyLink({
                    ...getCertiName,
                    link: getCertiName?.certyName === getCertyNameFromUrl ? singleDiaData?.[0]?.certificate_url : "",
                });
            }
            else {
                setCertyLink({
                    ...getCertiNameCompSet,
                    link: getCertiNameCompSet?.certyName === getCertyNameFromUrlDia ? (diamondDatas?.step1Data?.[0]?.certificate_url ?? diamondDatas?.step2Data?.[0]?.certificate_url) : "",
                });
            }
        }
    }, [singleDiaData, compSet])

    useEffect(() => {
        try {
            if (singleDiaData === undefined) return;
            const { image_file_url, video_url } = singleDiaData?.[0];
            setMediaArr([{ type: 'video', src: video_url }, { type: 'image', src: image_file_url }])
        } catch (error) {
            console.log("Error in fetching medias", error)
        }
    }, [singleDiaData])

    useEffect(() => {
        if (compSet) {
            const handleCompset = () => {
                const diamondDatas = JSON?.parse(sessionStorage.getItem('custStepData'))?.[0] ?? (ringSteps?.[0]?.Status === 'active' ? ringData?.[1] : pendantData?.[0]?.Status === 'active' ? pendantData?.[1] : earringData?.[1]);
                setDiamondData(diamondDatas)
                const SettingDatas = JSON?.parse(sessionStorage.getItem('custStepData'))?.[1] ?? (ringSteps?.[0]?.Status === 'active' ? ringData?.[0] : pendantData?.[0]?.Status === 'active' ? pendantData?.[0] : earringData?.[0]);
                setSettingData(SettingDatas)
                const getSetShape = JSON?.parse(sessionStorage.getItem('customizeSteps')) ?? (ringSteps?.[0]?.Status === 'active' ? ringSteps : pendantSteps?.[0]?.Status === 'active' ? pendantSteps : earringSteps);
                setSetShape(getSetShape);
                const getAlldata = JSON?.parse(sessionStorage.getItem('custStepData'))
                    ?? (ringSteps?.[0]?.Status === 'active' ? ringData : pendantData?.[0]?.Status === 'active' ? pendantData : earringData);
                setAllData(getAlldata);
                const metalC = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
                setMetalColor(metalC)
            }
            handleCompset();
        }
    }, [compSet, location?.key])

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => reject(src);
        });
    };

    let getDesignImageFol = storeInit?.CDNDesignImageFol;

    const getDynamicImages = async (imageData, designno, MetalColorid, extension) => {
        const matchMetalColorid = metalColor.find((color) => color?.id === MetalColorid);
        const baseImagePath = `${getDesignImageFol}${designno}~${1}`;
        // const colorImage = imageData?.ImageCount > 0 ? `${baseImagePath}_${matchMetalColorid?.colorcode}.${extension}` : imageNotFound;
        // const defaultImage = imageData?.ImageCount > 0 ? `${baseImagePath}.${extension}` : imageNotFound;
        const colorImage = `${baseImagePath}~${matchMetalColorid?.colorcode}.${extension}`;
        const defaultImage = `${baseImagePath}.${extension}`;

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

    const getDynamicImage = (designno, extension) => {
        return `${getDesignImageFol}${designno}~${1}.${extension}`;
        // return `${getDesignImageFol}${designno}_${1}.${extension}`;
    };

    useEffect(() => {
        const loadImages = async () => {
            let loadedImages;
            const currentData = settingData?.step1Data ?? settingData?.step2Data;

            const designno = currentData?.designno;
            const MetalColorid = currentData?.MetalColorid;
            const ImageExtension = currentData?.ImageExtension;

            const colorImage = await getDynamicImages(currentData, designno, MetalColorid, ImageExtension);
            loadedImages = { colorImage };
            setTimeout(() => {
                setImageMap(loadedImages);
            }, 20)
            // if(!getImagePath && compSet){
            //     sessionStorage.setItem('setImage', JSON.stringify(loadedImages))
            // }
        };
        loadImages();
    }, [getAllData]);

    useEffect(() => {
        try {
            if (getAllData === undefined) return;
            if (getAllData?.[0]?.step1Data?.[0]?.stockno !== "" ?? getAllData?.[1]?.step2Data?.[0]?.stockno !== "") {
                const diamondImage = (getAllData?.[0]?.step1Data?.[0]?.image_file_url ?? getAllData?.[1]?.step2Data?.[0]?.image_file_url);
                setCompSettArr(prev => {
                    const existingIndex = prev.filter(item => item?.type !== "diamond");
                    return [...existingIndex, { type: "diamond", src: diamondImage }]
                });
            }
            if (getAllData?.[0]?.step1Data?.designno !== "" ?? getAllData?.[1]?.step2Data?.designno !== "") {
                const settingImage = getDynamicImage((getAllData?.[0]?.step1Data?.designno || getAllData?.[1]?.step2Data?.designno), (getAllData?.[0]?.step1Data?.ImageExtension || getAllData?.[1]?.step2Data?.ImageExtension))
                setCompSettArr(prev => {
                    const existingIndex = prev.filter(item => item?.type !== "setting");
                    return [...existingIndex, { type: "setting", src: settingImage }]
                });
            }
        } catch (error) {
            console.log("Error in genarating diamond or setting image", error)
        }
    }, [compSet, getAllData, settingSteps])

    useEffect(() => {
        if (compSet) {
            const Settingcategory = (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === "Ring" ? 'Ring/category' : (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === "Pendant" ? 'Pendant/category' : 'Earring/category';
            const filterKeyVal = btoa(Settingcategory)
            setFilterVal(filterKeyVal);
        }
    }, [compSet, setshape])


    const totalPrice = Number((Number(diamondData?.step1Data?.[0]?.price ?? diamondData?.step2Data?.[0]?.price) + Number(settingData?.step2Data?.UnitCostWithMarkUpIncTax ?? settingData?.step1Data?.UnitCostWithMarkUpIncTax)).toFixed(2));

    useEffect(() => {
        if (compSet && !isNaN(totalPrice)) {
            const existingSteps = JSON.parse(sessionStorage.getItem('customizeSteps')) || [];

            if (steps?.[1]?.step2 === true) {
                const updatedStep1 = existingSteps?.map(step => {
                    if (step.step3 !== undefined) {
                        return { "step3": true, "url": existingSteps?.[2]?.url, "price": totalPrice };
                    }
                    return step;
                });

                // Check if step3 was updated; if not, add it
                if (!updatedStep1?.some(step => step.step3 !== undefined)) {
                    updatedStep1?.push({ "step3": true, "url": existingSteps?.[2]?.url, "price": totalPrice });
                }

                sessionStorage.setItem('customizeSteps', JSON.stringify(updatedStep1));
            }

            if (steps1?.[1]?.step2 === true || steps2?.[1]?.step2 === true || steps3?.[1]?.step2 === true) {
                let updatedStep2;

                if (steps1?.[0]?.Status === 'active') {
                    updatedStep2 = steps1;
                }
                if (steps2?.[0]?.Status === 'active') {
                    updatedStep2 = steps2;
                }
                if (steps3?.[0]?.Status === 'active') {
                    updatedStep2 = steps3;
                }

                const step3Exists = updatedStep2?.some(step => step.step3 !== undefined);

                if (!step3Exists && updatedStep2?.[0]?.Status === "active") {
                    updatedStep2.push({
                        "step3": true,
                        "url": steps1?.[2]?.url ?? steps2?.[2]?.url ?? steps3?.[2]?.url,
                        "price": totalPrice
                    });
                } else if (step3Exists) {
                    updatedStep2.forEach(step => {
                        if (step.step3 !== undefined) {
                            step.step3 = true;
                            step.url = steps1?.[2]?.url ?? steps2?.[2]?.url ?? steps3?.[2]?.url;
                            step.price = totalPrice;
                        }
                    });
                }

                // Save the updated steps to sessionStorage
                if (updatedStep2?.[1]?.id === 1 && steps1?.[0]?.Status === "active") {
                    sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(updatedStep2));
                }
                if (updatedStep2?.[1]?.id === 2 && steps2?.[0]?.Status === "active") {
                    sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(updatedStep2));
                }
                if (updatedStep2?.[1]?.id === 3 && steps3?.[0]?.Status === "active") {
                    sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(updatedStep2));
                }
            }

        }
        setPrice(totalPrice);
    }, [compSet, totalPrice, steps, steps1, steps2]);

    //     {
    //         title: 'Free Shipping',
    //         description: 'Now it\'s easier for customers to get the beautiful and sustainable diamonds they want without paying extra for shipping.',
    //         image: 'https://forevery.one/images_new/new-home/free-ship.png',
    //         link: '#',
    //         btnText: "Read More"
    //     },
    //     {
    //         title: 'Free 30 Day Returns',
    //         description: 'Forevery offers a hassle-free jewelry shopping experience with its 30-DAY Returns policy. Get ready to shop confidently.',
    //         image: 'https://forevery.one/images_new/new-home/free-return.png',
    //         link: '#',
    //         btnText: "Read More"
    //     },
    //     {
    //         title: 'Free Lifetime Warranty',
    //         description: 'Shop with Confidence; a lifetime warranty covers every piece of fine jewelry you buy.',
    //         image: 'https://forevery.one/images_new/new-home/waranty.png',
    //         link: '#',
    //         btnText: "Read More"
    //     },
    //     {
    //         title: '60-Days Free Resizing',
    //         description: 'Within 60 days of purchase, resize your jewelry to the perfect fit without any additional costs.',
    //         image: 'https://forevery.one/images_new/new-home/resizing.png',
    //         link: '#',
    //         btnText: "Read More"
    //     },
    //     {
    //         title: 'Free Engraving',
    //         description: 'Add sentimental value to the piece and make it a unique and meaningful gift.',
    //         image: 'https://forevery.one/images_new/new-home/engraving.png',
    //         link: '#',
    //         btnText: "Read More"
    //     }
    // ];

    const handleThumbnailClick = (index) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    };

    const sizeCombo = [
        {
            title: '5MM',
            value: '5mm'
        },
        {
            title: '9MM',
            value: '9mm'
        },
        {
            title: '10MM',
            value: '10mm'
        },
    ]

    useEffect(() => {
        const isInCart = (settingData?.step2Data?.IsInCart ?? settingData?.step1Data?.IsInCart) == 0 ? false : true;
        setAddToCartFlag(isInCart);
    }, [settingData])

    const handleCart = async (cartFlag, diamond, setting) => {

        const prodObj = {
            autocode: setting?.step2Data?.autocode ?? setting?.step1Data?.autocode,
            Metalid: setting?.selectedMetalId,
            MetalColorId: setting?.step2Data?.MetalColorid ?? setting?.step1Data?.MetalColorid,
            DiaQCid: setting?.selectedDiaId,
            CsQCid: setting?.selectedCsId,
            Size: setting?.step2Data?.DefaultSize ?? setting?.step1Data?.DefaultSize,
            Unitcost: setting?.step2Data?.UnitCost ?? setting?.step1Data?.UnitCost,
            markup: setting?.step2Data?.DesignMarkUp ?? setting?.step1Data?.DesignMarkUp,
            UnitCostWithmarkup: setting?.step2Data?.UnitCostWithMarkUp ?? setting?.step1Data?.UnitCostWithMarkUp,
            Remark: "",
            stockno: diamond?.step1Data?.[0]?.stockno ?? diamond?.step2Data?.[0]?.stockno,
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
                const existingData = JSON.parse(sessionStorage.getItem('custStepData')) || [];
                const existingData1 = JSON.parse(sessionStorage.getItem('custStepData2Ring')) || [];
                const existingData2 = JSON.parse(sessionStorage.getItem('custStepData2Pendant')) || [];

                if (existingData1?.[0]?.step1Data != undefined) {
                    const newIsInCartValue = 1;

                    const updatedData = existingData1.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInCart: newIsInCartValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Ring', JSON.stringify(updatedData));
                }

                if (existingData2?.[0]?.step1Data != undefined) {
                    const newIsInCartValue = 1;

                    const updatedData = existingData2.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInCart: newIsInCartValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Pendant', JSON.stringify(updatedData));
                }

                if (existingData?.[1]?.step2Data != undefined) {
                    const newIsInCartValue = 1;

                    const updatedData = existingData.map(step => {
                        if (step.step2Data != undefined) {
                            return {
                                ...step,
                                step2Data: {
                                    ...step.step2Data,
                                    IsInCart: newIsInCartValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData', JSON.stringify(updatedData));
                }
            }
        }
        else {
            let res1 = await RemoveCartAndWishAPI("Cart", (setting?.step2Data?.autocode ?? setting?.step1Data?.autocode), cookie, "", (diamond?.step1Data?.[0]?.stockno ?? diamond?.step2Data?.[0]?.stockno));
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
                const existingData = JSON.parse(sessionStorage.getItem('custStepData')) || [];
                const existingData1 = JSON.parse(sessionStorage.getItem('custStepData2Ring')) || [];
                const existingData2 = JSON.parse(sessionStorage.getItem('custStepData2Pendant')) || [];

                if (existingData1?.[0]?.step1Data != undefined) {
                    const newIsInCartValue = 0;

                    const updatedData = existingData1.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInCart: newIsInCartValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Ring', JSON.stringify(updatedData));
                }

                if (existingData2?.[0]?.step1Data != undefined) {
                    const newIsInCartValue = 0;

                    const updatedData = existingData2.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInCart: newIsInCartValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Pendant', JSON.stringify(updatedData));
                }

                if (existingData?.[1]?.step2Data != undefined) {
                    const newIsInCartValue = 0;

                    const updatedData = existingData.map(step => {
                        if (step.step2Data != undefined) {
                            return {
                                ...step,
                                step2Data: {
                                    ...step.step2Data,
                                    IsInCart: newIsInCartValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData', JSON.stringify(updatedData));
                }
            }
        }
    }

    const handleWish = async (e, diamond, setting) => {
        setAddWishListFlag(e.target.checked);
        const prodObj = {
            autocode: setting?.step2Data?.autocode ?? setting?.step1Data?.autocode,
            Metalid: setting?.selectedMetalId,
            MetalColorId: setting?.step2Data?.MetalColorid ?? setting?.step1Data?.MetalColorid,
            DiaQCid: setting?.selectedDiaId,
            CsQCid: setting?.selectedCsId,
            Size: setting?.step2Data?.DefaultSize ?? setting?.step1Data?.DefaultSize,
            Unitcost: setting?.step2Data?.UnitCost ?? setting?.step1Data?.UnitCost,
            markup: setting?.step2Data?.DesignMarkUp ?? setting?.step1Data?.DesignMarkUp,
            UnitCostWithmarkup: setting?.step2Data?.UnitCostWithMarkUp ?? setting?.step1Data?.UnitCostWithMarkUp,
            Remark: "",
            stockno: diamond?.step1Data?.[0]?.stockno ?? diamond?.step2Data?.[0]?.stockno,
        }

        try {
            if (e.target.checked == true) {
                let res = await CartAndWishListAPI("Wish", prodObj, cookie);
                if (res) {
                    let cartC = res?.Data?.rd[0]?.Cartlistcount;
                    let wishC = res?.Data?.rd[0]?.Wishlistcount;
                    setWishCountVal(wishC);
                    setCartCountVal(cartC);
                }
                setAddWishListFlag(true);


                if (compSet) {
                    sessionStorage.setItem("settwish", JSON.stringify(true));
                }

                sessionStorage.setItem("diaWish", JSON.stringify(true))

                const existingData = JSON.parse(sessionStorage.getItem('custStepData')) || [];
                const existingData1 = JSON.parse(sessionStorage.getItem('custStepData2Ring')) || [];
                const existingData2 = JSON.parse(sessionStorage.getItem('custStepData2Pendant')) || [];

                if (existingData1?.[0]?.step1Data != undefined) {
                    const newIsInWishValue = 1;

                    const updatedData = existingData1.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInWish: newIsInWishValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Ring', JSON.stringify(updatedData));
                }

                if (existingData2?.[0]?.step1Data != undefined) {
                    const newIsInWishValue = 1;

                    const updatedData = existingData2.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInWish: newIsInWishValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Pendant', JSON.stringify(updatedData));
                }

                if (existingData?.[1]?.step2Data != undefined) {
                    const newIsInWishValue = 1;

                    const updatedData = existingData.map(step => {
                        if (step.step2Data != undefined) {
                            return {
                                ...step,
                                step2Data: {
                                    ...step.step2Data,
                                    IsInWish: newIsInWishValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData', JSON.stringify(updatedData));
                }


            } else {
                let res1 = await RemoveCartAndWishAPI("Wish", (setting?.step2Data?.autocode ?? setting?.step1Data?.autocode), cookie, "", (diamond?.step1Data?.[0]?.stockno ?? diamond?.step2Data?.[0]?.stockno));
                if (res1) {
                    let cartC = res1?.Data?.rd[0]?.Cartlistcount;
                    let wishC = res1?.Data?.rd[0]?.Wishlistcount;
                    setWishCountVal(wishC);
                    setCartCountVal(cartC);
                }
                setAddWishListFlag(false);

                if (compSet) {
                    sessionStorage.removeItem("settwish")
                }

                sessionStorage.removeItem("diaWish");

                const existingData = JSON.parse(sessionStorage.getItem('custStepData')) || [];
                const existingData1 = JSON.parse(sessionStorage.getItem('custStepData2Ring')) || [];
                const existingData2 = JSON.parse(sessionStorage.getItem('custStepData2Pendant')) || [];

                if (existingData1?.[0]?.step1Data != undefined) {
                    const newIsInWishValue = 0;

                    const updatedData = existingData1.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInWish: newIsInWishValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Ring', JSON.stringify(updatedData));
                }

                if (existingData2?.[0]?.step1Data != undefined) {
                    const newIsInWishValue = 0;

                    const updatedData = existingData2.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInWish: newIsInWishValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Pendant', JSON.stringify(updatedData));
                }

                if (existingData?.[1]?.step2Data != undefined) {
                    const newIsInWishValue = 0;

                    const updatedData = existingData.map(step => {
                        if (step.step2Data != undefined) {
                            return {
                                ...step,
                                step2Data: {
                                    ...step.step2Data,
                                    IsInWish: newIsInWishValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData', JSON.stringify(updatedData));
                }
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

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


    const getDiamondData = async (stockno, shape) => {
        setisPriceLoading(true);
        setIsDataFound(true);
        try {
            const response = await DiamondListData(1, shape, stockno);
            if (response && response.Data) {
                let resData = response.Data?.rd
                setSingleDiaData(resData)
                setisPriceLoading(false)
                setIsDataFound(false);
            } else {
                console.warn("No data found in the response");
                setisPriceLoading(false)
                setIsDataFound(false);
            }
        } catch (error) {
            console.error("Error fetching diamond data:", error);
            setisPriceLoading(false);
            setIsDataFound(false)
        }
    };

    useEffect(() => {
        let navVal = location?.search.split("?p=")[1];
        let decodeobj = decodeAndDecompress(navVal);
        getDiamondData(decodeobj?.a, decodeobj?.b);
        setShape(decodeobj?.b)
    }, [location?.pathname]);

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

    const handleButtonChange = async (value, e, stockno, shape, settingType) => {
        setWishListFlag(e?.target?.checked);
        if (value == 'cart') {
            await CartAndWishListAPI('Cart', {}, '', '', stockno).then((res) => {
                if (res) {
                    if (res?.Data?.rd[0]?.msg === 'success') {
                        let cartC = res?.Data?.rd[0]?.Cartlistcount
                        let wishC = res?.Data?.rd[0]?.Wishlistcount
                        setWishCountVal(wishC)
                        setCartCountVal(cartC);
                    }

                }
            }).catch((err) => console.log("addtocartwishErr", err))
        }

        if (value == 'wish') {
            if (e?.target?.checked === true) {
                let res = await CartAndWishListAPI('Wish', {}, '', '', stockno);
                if (res) {
                    try {
                        let cartC = res?.Data?.rd[0]?.Cartlistcount;
                        let wishC = res?.Data?.rd[0]?.Wishlistcount;
                        setWishCountVal(wishC);
                        setCartCountVal(cartC);
                        if (singleDiaData[0]?.stockno) {
                            singleDiaData[0].isInWish = true;
                        }
                    } catch (error) {
                        console.log("err", error)
                    }
                }
            }
            else {
                let res1 = await RemoveCartAndWishAPI('Wish', "", '', '', stockno);
                if (res1) {
                    try {
                        let cartC = res1?.Data?.rd[0]?.Cartlistcount;
                        let wishC = res1?.Data?.rd[0]?.Wishlistcount;
                        setWishCountVal(wishC);
                        setCartCountVal(cartC);
                        if (singleDiaData[0]?.stockno) {
                            singleDiaData[0].isInWish = false;
                        }
                    } catch (error) {
                        console.log("err", error);
                    }
                }
            }
        }

        if (value == 'diamond') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
            const step2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
            const step3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));
            const stepsData = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
            const stepsData1 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
            const stepsData2 = JSON.parse(sessionStorage.getItem('custStepData2Earring'));

            const obj = {
                a: singleDiaData?.stockno,
                b: singleDiaData?.shapename,
                a: (step1?.[0]?.autocode ?? step2?.[0]?.autocode),
                b: (step1?.[0]?.designno ?? step2?.[0]?.designno),
                m: (stepsData?.[0]?.selectedMetalId ?? stepsData1?.[0]?.selectedMetalId),
                d: (stepsData?.[0]?.selectedDiaId ?? stepsData1?.[0]?.selectedDiaId),
                c: (stepsData?.[0]?.selectedCsId ?? stepsData1?.[0]?.selectedCsId),
                f: { category: '1' },
            };

            let encodeObj = compressAndEncode(JSON.stringify(obj));

            // Replace or add the step2 entry in the step1 data
            // const updatedStep1 = (step1 ?? step2)?.map(step => {
            //     if (step.step3 !== undefined) {
            //         // Replace existing step2 data
            //         return { "step3": true, "url": encodeObj };
            //     }
            //     return step;
            // });
            let updatedStep1;
            if (step1?.[0]?.Status === 'active') {
                updatedStep1 = step1;
            }
            if (step2?.[0]?.Status === 'active') {
                updatedStep1 = step2;
            }
            if (step3?.[0]?.Status === 'active') {
                updatedStep1 = step3;
            }

            // If no existing step3, add new entry
            if (!updatedStep1.some(step => step.step3 !== undefined)) {
                updatedStep1.push({ "step3": true, "url": encodeObj });
            }
            const updatedStepData = (settingSteps[0]?.Setting === 'Ring' ? stepsData : settingSteps[0]?.Setting === 'Pendant' ? stepsData1 : stepsData2)?.map(step => {
                if (step?.step2Data !== undefined) {
                    return {
                        "step2Data": singleDiaData,
                        id: updatedStep1?.[0]?.Setting === "Ring" && updatedStep1?.[0]?.Status === 'active' ? 1 : updatedStep1?.[0]?.Setting === "Pendant" && updatedStep1?.[0]?.Status === 'active' ? 2 : 3
                    };
                }
                return step;
            });

            if (!updatedStepData.some(step => step?.step2Data !== undefined)) {
                updatedStepData.push({ "step2Data": singleDiaData, id: updatedStep1?.[0]?.Setting === "Ring" && updatedStep1?.[0]?.Status === 'active' ? 1 : updatedStep1?.[0]?.Setting === "Pendant" && updatedStep1?.[0]?.Status === 'active' ? 2 : 3 });
            }

            if (updatedStepData?.[1]?.id === 1 && step1?.[0]?.Status === "active") {
                sessionStorage.setItem('custStepData2Ring', JSON.stringify(updatedStepData));
            }
            if (updatedStepData?.[1]?.id === 2 && step2?.[0]?.Status === "active") {
                sessionStorage.setItem('custStepData2Pendant', JSON.stringify(updatedStepData));
            }
            if (updatedStepData?.[1]?.id === 3 && step3?.[0]?.Status === "active") {
                sessionStorage.setItem('custStepData2Earring', JSON.stringify(updatedStepData));
            }


            if (updatedStep1?.[1]?.id === 1 && step1?.[0]?.Status === "active") {
                sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(updatedStep1));
            }
            if (updatedStep1?.[1]?.id === 2 && step2?.[0]?.Status === "active") {
                sessionStorage.setItem("customizeSteps2Pendant", JSON.stringify(updatedStep1));
            }
            if (updatedStep1?.[1]?.id === 3 && step3?.[0]?.Status === "active") {
                sessionStorage.setItem("customizeSteps2Earring", JSON.stringify(updatedStep1));
            }

            navigate(`/d/setting-complete-product/det345/?p=${encodeObj}`);
        }

        if (value == 'ring') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps"));
            const stepData = JSON.parse(sessionStorage.getItem("custStepData"));
            const addCategory = `Ring/category`;
            // const addCategory = `Ring/category/${stockno}`;
            const filterKeyVal = btoa(addCategory)
            setCustomizeStep({
                ...customizeStep,
                step2: true,
            })
            // Replace or add the step2 entry in the step1 data
            const updatedStep1 = step1?.map(step => {
                if (step.step2 !== undefined) {
                    // Replace existing step2 data
                    return { "step2": true, "Setting": 'Ring' };
                }
                return step;
            });

            const shapeName1 = singleDiaData?.[0]?.shapename;
            const formattedShapeName = shapeName1 ? shapeName1.charAt(0).toUpperCase() + shapeName1.slice(1).toLowerCase() : '';

            if (updatedStep1?.[0]?.shape === "All" || updatedStep1?.[0]?.shape === null || updatedStep1?.[0]?.shape === undefined) {
                updatedStep1[0].shape = formattedShapeName ?? "";
            }

            // If no existing step2, add new entry
            if (!updatedStep1?.some(step => step.step2 !== undefined)) {
                updatedStep1?.push({ "step2": true, "Setting": 'Ring' });
            }

            const step1Data = [{ "step1Data": singleDiaData }]
            sessionStorage.setItem('custStepData', JSON.stringify(step1Data));
            sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));

            if (stepData?.[1]?.step2Data.id > 0) {
                navigate(`d/setting-complete-product/det345/?p=${step1?.[2]?.url}`);
            }
            else {
                navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${shape}/M=${filterKeyVal}`);
            }
        }

        if (value == 'pendant') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps"));
            const stepData = JSON.parse(sessionStorage.getItem("custStepData"));
            const addCategory = `Pendant/category`;
            // const addCategory = `Pendant/category/${stockno}`;
            const filterKeyVal = btoa(addCategory);
            setCustomizeStep({
                ...customizeStep,
                step2: true,
            })
            // Replace or add the step2 entry in the step1 data
            const updatedStep1 = step1?.map(step => {
                if (step.step2 !== undefined) {
                    // Replace existing step2 data
                    return { "step2": true, "Setting": 'Pendant' };
                }
                return step;
            });

            const shapeName1 = singleDiaData?.[0]?.shapename;
            const formattedShapeName = shapeName1 ? shapeName1.charAt(0).toUpperCase() + shapeName1.slice(1).toLowerCase() : '';

            if (updatedStep1?.[0]?.shape === "All" || updatedStep1?.[0]?.shape === null || updatedStep1?.[0]?.shape === undefined) {
                updatedStep1[0].shape = formattedShapeName ?? "";
            }

            // If no existing step2, add new entry
            if (!updatedStep1.some(step => step.step2 !== undefined)) {
                updatedStep1.push({ "step2": true, "Setting": 'Pendant' });
            }
            const step1Data = [{ "step1Data": singleDiaData }]
            sessionStorage.setItem('custStepData', JSON.stringify(step1Data));
            sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));

            if (stepData?.[1]?.step2Data.id > 0) {
                navigate(`d/setting-complete-product/det345/?p=${step1?.[2]?.url}`);
            }
            else {
                navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${shape}/M=${filterKeyVal}`);
            }
        }

        if (value == 'earring') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps"));
            const stepData = JSON.parse(sessionStorage.getItem("custStepData"));
            const addCategory = `Earring/category`;
            // const addCategory = `Pendant/category/${stockno}`;
            const filterKeyVal = btoa(addCategory);
            setCustomizeStep({
                ...customizeStep,
                step2: true,
            })
            // Replace or add the step2 entry in the step1 data
            const updatedStep1 = step1?.map(step => {
                if (step.step2 !== undefined) {
                    // Replace existing step2 data
                    return { "step2": true, "Setting": 'Earring' };
                }
                return step;
            });

            const shapeName1 = singleDiaData?.[0]?.shapename;
            const formattedShapeName = shapeName1 ? shapeName1.charAt(0).toUpperCase() + shapeName1.slice(1).toLowerCase() : '';

            if (updatedStep1?.[0]?.shape === "All" || updatedStep1?.[0]?.shape === null || updatedStep1?.[0]?.shape === undefined) {
                updatedStep1[0].shape = formattedShapeName ?? "";
            }

            // If no existing step2, add new entry
            if (!updatedStep1.some(step => step.step2 !== undefined)) {
                updatedStep1.push({ "step2": true, "Setting": 'Earring' });
            }
            const step1Data = [{ "step1Data": singleDiaData }]
            sessionStorage.setItem('custStepData', JSON.stringify(step1Data));
            sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));

            if (stepData?.[1]?.step2Data.id > 0) {
                navigate(`d/setting-complete-product/det345/?p=${step1?.[2]?.url}`);
            }
            else {
                navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/diamond_shape=${shape}/M=${filterKeyVal}`);
            }
        }

        if (value === 'hasData') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps")) || {};
            const stepData = JSON.parse(sessionStorage.getItem("custStepData")) || [];

            const step1Index = stepData.findIndex(item => item.step1Data !== undefined);

            const updatedStepData = [...stepData];
            if (step1Index !== -1) {
                updatedStepData[step1Index] = { step1Data: singleDiaData };
            } else {
                updatedStepData.unshift({ step1Data: singleDiaData });
            }

            sessionStorage.setItem('custStepData', JSON.stringify(updatedStepData));

            navigate(`/d/setting-complete-product/det345/?p=${step1?.[2]?.url}`);
        }
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(data);

        const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        setLoginCurrency(loginData)
    }, []);


    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    const diaArr1 = [
        {
            title: "Shape",
            value: `${singleDiaData[0]?.shapename}`
        },
        {
            title: 'carat weight',
            value: `${singleDiaData[0]?.carat !== '' ? Number(singleDiaData[0]?.carat).toFixed(2) : '0.00'}`,
        },
        {
            title: 'color',
            value: `${singleDiaData[0]?.colorname}`,
        },
        {
            title: 'clarity',
            value: `${singleDiaData[0]?.clarityname}`,
        },
        {
            title: 'cut',
            value: `${singleDiaData[0]?.cutname}`,
        },
        {
            title: 'polish',
            value: `${singleDiaData[0]?.polishname}`,
        },
        {
            title: 'symmetry',
            value: `${singleDiaData[0]?.symmetryname}`,
        },
        {
            title: 'Fluorescence',
            value: `${singleDiaData[0]?.fluorescencename}`,
        },
        {
            title: 'l/w/d (mm)',
            value: `${singleDiaData[0]?.measurements ?? `0.00 X 0.00 X 0.00`}`.replace(/X/g, ' X '),
        },
    ]
    const diaArr2 = [
        {
            title: "l/w ratio",
            value: `${Number(1.00).toFixed(2) ?? 0.00}`
        },
        {
            title: 'depth %',
            value: `${singleDiaData[0]?.depth !== '' ? Number(singleDiaData[0]?.depth).toFixed(2) : '0.00'}%`,
        },
        {
            title: 'table %',
            value: `${singleDiaData[0]?.table !== '' ? Number(singleDiaData[0]?.table).toFixed(2) : '0.00'}%`,
        },
        {
            title: 'culet',
            value: `${singleDiaData[0]?.culetname}`,
        },
        {
            title: 'certificate',
            value: `${singleDiaData[0]?.certyname}`,
        },
        {
            title: 'crown ∠',
            value: `${singleDiaData[0]?.CrownAngle !== '' ? Number(singleDiaData[0]?.CrownAngle).toFixed(3) : '0.000'}`,
        },
        {
            title: 'crown %',
            value: `${singleDiaData[0]?.CrownHeight !== '' ? Number(singleDiaData[0]?.CrownHeight).toFixed(3) : '0.000'}`,
        },
        {
            title: 'pavilion ∠',
            value: `${singleDiaData[0]?.PavillionAngle !== '' ? Number(singleDiaData[0]?.PavillionAngle).toFixed(2) : '0.00'}`,
        },
    ]

    const SizeSorting = (SizeArr) => {

        let SizeSorted = SizeArr?.sort((a, b) => {
            const nameA = parseInt(a?.sizename?.toUpperCase()?.slice(0, -2), 10);
            const nameB = parseInt(b?.sizename?.toUpperCase()?.slice(0, -2), 10);

            return nameA - nameB;
        })

        return SizeSorted

    }

    const handleCustomChange = async (e, type) => {
        // let size;

        // if (type === "size") {
        //   setSizeData(e.target.value)
        //   size = e.target.value
        // }

        // const res = await SingleProdListAPI(prod, (size ?? sizeData), obj, cookie)
        // if (res) {
        //   setSingleProd1(res?.pdList[0])
        // }

        // if (res?.pdList?.length > 0) {
        //   setisPriceLoading(false)
        // }
        // setnetWTData(res?.pdList[0])
        // setDiaList(res?.pdResp?.rd3)
        // setCsList(res?.pdResp?.rd4)
    }

    const designImage = (designno, ImageExtension) => {
        let imgString =
            storeInit?.CDNDesignImageFol +
            designno +
            "~" +
            1 +
            "." +
            ImageExtension;
        return imgString
    }

    const imageRefs = useRef([])
    const [origin, setorigin] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e, index) => {
        const imageRef = imageRefs?.current[index];
        if (!imageRef) return;

        const imageContainer = imageRef?.parentElement;
        if (!imageContainer) return;

        const rect = imageContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const zoomLevel = 1.5;

        const transformOriginX = x * 100;
        const transformOriginY = y * 100;

        setorigin({ x: transformOriginX, y: transformOriginY })
        imageRef.style.transformOrigin = `${transformOriginX}% ${transformOriginY}%`;
        imageRef.style.transform = `scale(${zoomLevel})`;
    };

    const handleMouseLeave = (index) => {
        const imageReff = imageRefs?.current[index]
        if (!imageReff) return

        imageReff.style.transform = 'scale(1)';
        imageReff.style.transformOrigin = 'center center'; // reset the origin to center
        setorigin({ x: 0, y: 0 })

    }

    useEffect(() => {
        // Cleanup logic when component unmounts or ref changes
        return () => {
            // Reset all image transformations
            imageRefs.current.forEach((ref) => {
                if (ref) {
                    ref.style.transform = 'scale(1)';
                    ref.style.transformOrigin = 'center center';
                }
            });
        };
    }, []);

    return (
        <div className="for_DiamondDet_mainDiv">
            <div className="for_DiamondDet_div">
                <div className="for_DiamondDet_details_container">
                    <div className="for_DiamondDet_navigate_div">
                        <DiamondNavigation
                            StyleCondition={StyleCondition}
                            Swap={Swap}
                            setswap={setswap}
                            stockno={singleDiaData[0]?.stockno?.replaceAll(" ", "")}
                            setshape={setshape}
                            compSet={compSet}
                            customizeStep={customizeStep}
                            getImagePath={getImagePath}
                        />
                    </div>
                    <div className="for_DiamondDet_container_div">
                        {!mobileView ? (
                            <div className="for_DiamondDet_left_prodImages">
                                <div className="for_slider_container">
                                    <div className="for_images_slider">
                                        {isDataFound ? (
                                            <>
                                                <div className="for_slider">
                                                    {Array.from({ length: 3 })?.map((_, i) => {
                                                        return (
                                                            <div key={i} className='for_skeleton_thumb_div_dia' >
                                                                <Skeleton className='for_skeleton_det_thumb_dia' />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div
                                                    className="for_main_image"
                                                >
                                                    <Skeleton variant='square' className='for_skeleton_main_image' />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="for_slider">
                                                    {compSet && (
                                                        <>
                                                            {compSettArr?.map((item, index) => {
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className={`for_box ${index === currentSlide ? "active" : ""}`}
                                                                        onClick={() => handleThumbnailClick(index)}
                                                                    >
                                                                        {item?.type !== '' && (
                                                                            <>
                                                                                {item?.type === "setting" && (
                                                                                    <div
                                                                                        className="for_video_box_dia"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <img
                                                                                            src={(!imageMap?.colorImage?.includes('undefinedundefined~1') ? imageMap?.colorImage : getImagePath?.colorImage)}
                                                                                            // src={item?.src}
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )}

                                                                                {item?.type === "diamond" && (
                                                                                    <div
                                                                                        className="for_video_box_dia"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <img
                                                                                            src={item?.src}
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                            {certyLink && (
                                                                <Link
                                                                    to={certyLink?.link}
                                                                    className="for_box_certy"
                                                                    title="Diamond certificate"
                                                                    style={{ position: "relative" }}
                                                                    target='_blank'
                                                                >
                                                                    <img
                                                                        src={certyLink?.imageUrl}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = imageNotFound;
                                                                        }}
                                                                        alt="Diamond Certificate"
                                                                        style={{ width: '100%', height: certyLink?.certyName === 'HRD' ? '4rem' : 'auto' }}
                                                                    />
                                                                </Link>
                                                            )}
                                                        </>
                                                    )}

                                                    {!compSet && (
                                                        <>
                                                            {mediaArr
                                                                ?.filter((item) => item?.src !== imageNotFound && item?.src !== "") // Filter the array
                                                                ?.map((item, index) => {
                                                                    console.log("jeje", item?.src !== imageNotFound && item?.src !== "");
                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className={`for_box ${index === currentSlide ? "active" : ""}`}
                                                                            onClick={() => handleThumbnailClick(index)}
                                                                        >
                                                                            {item?.type === "video" ? (
                                                                                <>
                                                                                    {item?.src?.endsWith(".mp4") ? (
                                                                                        <div
                                                                                            className="for_video_box_dia"
                                                                                            title="A small thumbnail of the selected diamond."
                                                                                            style={{ position: "relative" }}
                                                                                        >
                                                                                            <video src={item?.src} muted loop />
                                                                                            <IoIosPlayCircle className="for_play_io_icon_dia" />
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div
                                                                                            className="for_video_box_dia"
                                                                                            title="A small thumbnail of the selected diamond."
                                                                                            style={{ position: "relative" }}
                                                                                        >
                                                                                            <img
                                                                                                src={`${storImagePath()}/images/ProductListing/Diamond/images/360-view.png`}
                                                                                                onError={(e) => {
                                                                                                    e.target.onerror = null;
                                                                                                    e.target.src = imageNotFound;
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {item?.type === "image" && (
                                                                                        <img
                                                                                            title="A small thumbnail of the selected diamond."
                                                                                            src={item?.src}
                                                                                            alt=""
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound;
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}

                                                            {certyLink && (
                                                                <Link
                                                                    to={certyLink?.link}
                                                                    className="for_box_certy"
                                                                    title="Diamond certificate"
                                                                    style={{ position: "relative" }}
                                                                    target="_blank"
                                                                >
                                                                    <img
                                                                        src={certyLink?.imageUrl}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = imageNotFound;
                                                                        }}
                                                                        alt="Diamond Certificate"
                                                                        style={{ width: '100%', height: certyLink?.certyName === 'HRD' ? '4rem' : 'auto' }}
                                                                    />
                                                                </Link>
                                                            )}
                                                        </>
                                                    )}

                                                </div>

                                                <div className="for_main_image">
                                                    {!compSet && (
                                                        <Slider {...settings} ref={sliderRef} lazyLoad="progressive">
                                                            {mediaArr
                                                                ?.filter((item) => item?.src !== imageNotFound && item?.src !== "") // Filter the array
                                                                ?.map((item, index) => (
                                                                    <div className="for_slider_card" key={index}>
                                                                        <div className="for_image">
                                                                            {item?.type === "video" && (
                                                                                <>
                                                                                    {item?.src?.endsWith(".mp4") ? (
                                                                                        <div style={{ height: "80%" }}>
                                                                                            <video
                                                                                                src={item?.src}
                                                                                                loop
                                                                                                autoPlay
                                                                                                muted
                                                                                                style={{
                                                                                                    width: "100%",
                                                                                                    height: "100%",
                                                                                                    objectFit: "scale-down",
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div style={{ height: "80%" }}>
                                                                                            <iframe src={item?.src} width="500px" height="500px" />
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                            {item?.type === "image" && (
                                                                                <img
                                                                                    loading="lazy"
                                                                                    src={item?.src}
                                                                                    alt=""
                                                                                    onLoad={() => setIsImageLoad(false)}
                                                                                    onError={(e) => {
                                                                                        e.target.onerror = null;
                                                                                        e.target.src = imageNotFound;
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </Slider>
                                                    )}
                                                    {compSet && (
                                                        <Slider
                                                            {...settings}
                                                            ref={sliderRef}
                                                            lazyLoad="progressive"
                                                        >
                                                            {/* <div className="for_slider_card">
                                                                <div className="for_image">
                                                                    <img
                                                                        loading="lazy"
                                                                        src={designImage(
                                                                            settingData?.step1Data?.designno ?? settingData?.step2Data?.designno,
                                                                            settingData?.step1Data?.ImageExtension ?? settingData?.step2Data?.ImageExtension
                                                                        )}
                                                                        alt=""
                                                                        onLoad={() => setIsImageLoad(false)}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = imageNotFound
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div> */}

                                                            {compSettArr?.map((item, index) => (
                                                                <div className="for_slider_card" key={index}>
                                                                    <div className="for_image"
                                                                        style={{
                                                                            position: 'relative',
                                                                            overflow: 'hidden',
                                                                            cursor: 'zoom-in'
                                                                        }}
                                                                        onMouseMove={(e) => handleMouseMove(e, index)}
                                                                        onMouseLeave={() => handleMouseLeave(index)}
                                                                    >
                                                                        {item?.type !== '' && (
                                                                            <>
                                                                                {item?.type === "setting" && (
                                                                                    <div
                                                                                        className="for_video_box_dia"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <img
                                                                                            src={(!imageMap?.colorImage?.includes('undefinedundefined~1') ? imageMap?.colorImage : getImagePath?.colorImage)}
                                                                                            ref={el => imageRefs.current[index] = el}
                                                                                            loading='lazy'
                                                                                            style={{ transition: 'transform 0.3s ease' }}
                                                                                            // src={item?.src}
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )}

                                                                                {item?.type === "diamond" && (
                                                                                    <div
                                                                                        className="for_video_box_dia"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <img
                                                                                            src={item?.src}
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Slider>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="for_DiamondDet_left_prodImages_mob">
                                <div className="for_slider_container_mob">
                                    <div className="for_images_slider_mob">
                                        {isDataFound ? (
                                            <>
                                                <div className="for_slider_mob">
                                                    {Array.from({ length: 3 })?.map((_, i) => {
                                                        return (
                                                            <div key={i} className='for_skeleton_thumb_div_dia_mob' >
                                                                <Skeleton className='for_skeleton_det_thumb_dia_mob' />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div
                                                    className="for_main_image_mob"
                                                >
                                                    <Skeleton variant='square' className='for_skeleton_main_image_mob' />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="for_slider_mob">
                                                    {compSet && (
                                                        // <div
                                                        //     className={`for_box_mob active`}
                                                        // >
                                                        //     <img
                                                        //         src={designImage((settingData?.step1Data?.designno ?? settingData?.step2Data?.designno), (settingData?.step1Data?.ImageExtension ?? settingData?.step2Data?.ImageExtension))}
                                                        //         alt=""
                                                        //         onError={(e) => {
                                                        //             e.target.onerror = null;
                                                        //             e.target.src = imageNotFound;
                                                        //         }}
                                                        //     />
                                                        // </div>
                                                        <>
                                                            {compSettArr?.map((item, index) => {
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className={`for_box_mob ${index === currentSlide ? "active" : ""}`}
                                                                        onClick={() => handleThumbnailClick(index)}
                                                                    >
                                                                        {item?.type !== '' && (
                                                                            <>
                                                                                {item?.type === "setting" && (
                                                                                    <div
                                                                                        className="for_video_box_dia_mob"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <img
                                                                                            src={item?.src}
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )}

                                                                                {item?.type === "diamond" && (
                                                                                    <div
                                                                                        className="for_video_box_dia_mob"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <img
                                                                                            src={item?.src}
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                            {certyLink && (
                                                                <div className="for_box_certy" title='Diamond certificate' style={{ position: "relative" }}>
                                                                    <img
                                                                        src={certyLink?.link}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = imageNotFound;
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </>
                                                    )}

                                                    {!compSet && (
                                                        <>
                                                            {mediaArr?.map((item, index) => {
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className={`for_box_mob ${index === currentSlide ? "active" : ""}`}
                                                                        onClick={() => handleThumbnailClick(index)}
                                                                    >
                                                                        {item?.type === 'video' ? (
                                                                            <>
                                                                                {item?.src?.endsWith('.mp4') ? (
                                                                                    <div
                                                                                        className="for_video_box_dia_mob"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <video
                                                                                            src={item?.src}
                                                                                            // autoPlay
                                                                                            muted
                                                                                            loop
                                                                                        />
                                                                                        <IoIosPlayCircle className="for_play_io_icon_dia_mob" />
                                                                                    </div>
                                                                                ) : (
                                                                                    <div
                                                                                        className="for_video_box_dia_mob"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <img
                                                                                            src={`${storImagePath()}/images/ProductListing/Diamond/images/360-view.png`}
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        ) : (
                                                                            item?.type === "image" && (
                                                                                <img
                                                                                    src={item?.src}
                                                                                    alt=""
                                                                                    onError={(e) => {
                                                                                        e.target.onerror = null;
                                                                                        e.target.src = imageNotFound
                                                                                    }}
                                                                                />
                                                                            )
                                                                        )}

                                                                    </div>
                                                                );
                                                            })}
                                                            {certyLink && (
                                                                <div className="for_box_certy" title='Diamond certificate' style={{ position: "relative" }}>
                                                                    <img
                                                                        src={certyLink?.link}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = imageNotFound;
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>

                                                <div className="for_main_image_mob">
                                                    {!compSet && (
                                                        <Slider {...settings} ref={sliderRef}
                                                            lazyLoad="progressive">
                                                            {mediaArr?.map((item, index) => (
                                                                <div className="for_slider_card_mob" key={index}>
                                                                    <div className="for_image_mob">
                                                                        {item?.type === 'video' && (
                                                                            <>
                                                                                {item?.src?.endsWith('.mp4') ? (
                                                                                    <div style={{ height: "80%" }}>
                                                                                        <video
                                                                                            src={item?.src}
                                                                                            loop
                                                                                            autoPlay
                                                                                            muted
                                                                                            style={{
                                                                                                width: "100%",
                                                                                                height: "100%",
                                                                                                objectFit: "scale-down",
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <div style={{ height: "80%" }}>
                                                                                        <iframe src={item?.src} width="500px" height="500px" />
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                        {item?.type === 'image' && (
                                                                            <img
                                                                                loading="lazy"
                                                                                src={item?.src}
                                                                                alt=""
                                                                                onLoad={() => setIsImageLoad(false)}
                                                                                onError={(e) => {
                                                                                    e.target.onerror = null;
                                                                                    e.target.src = imageNotFound;
                                                                                }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Slider>
                                                    )}
                                                    {compSet && (
                                                        <Slider
                                                            {...settings}
                                                            ref={sliderRef}
                                                            lazyLoad="progressive"
                                                        >
                                                            {/* <div className="for_slider_card_mob">
                                                                <div className="for_image_mob">
                                                                    <img
                                                                        loading="lazy"
                                                                        src={designImage(
                                                                            settingData?.step1Data?.designno ?? settingData?.step2Data?.designno,
                                                                            settingData?.step1Data?.ImageExtension ?? settingData?.step2Data?.ImageExtension
                                                                        )}
                                                                        alt=""
                                                                        onLoad={() => setIsImageLoad(false)}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = imageNotFound
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div> */}
                                                            {compSettArr?.map((item, index) => (
                                                                <div className="for_slider_card_mob" key={index}>
                                                                    <div className="for_image_mob">
                                                                        {item?.type !== '' && (
                                                                            <>
                                                                                {item?.type === "setting" && (
                                                                                    <div
                                                                                        className="for_video_box_dia_mob"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <img
                                                                                            src={item?.src}
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )}

                                                                                {item?.type === "diamond" && (
                                                                                    <div
                                                                                        className="for_video_box_dia_mob"
                                                                                        style={{ position: "relative" }}
                                                                                    >
                                                                                        <img
                                                                                            src={item?.src}
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Slider>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="for_DiamondDet_right_prodDetails">
                            {!compSet ? (
                                <div className="for_DiamondDet_breadcrumbs">
                                    <div className="for_DiamondDet_breadcrumbs">
                                        <div
                                            className="for_breadcrumbs"
                                        >
                                            <div className="for_bredwish_div">
                                                <div>
                                                    {!mobileView ? (
                                                        <>
                                                            {isDataFound ? <Skeleton variant="rounded" style={{ height: '30px', width: '34rem', marginLeft: '-5px' }} /> : (
                                                                <>
                                                                    <span
                                                                        onClick={() => {
                                                                            navigate("/");
                                                                        }}
                                                                    >
                                                                        {"Home / "}{" "}
                                                                    </span>
                                                                    <span
                                                                        onClick={() => {
                                                                            navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
                                                                        }}
                                                                    >
                                                                        {` Certified diamond`}
                                                                    </span>
                                                                    <span
                                                                    >
                                                                        {` / ${singleDiaData[0]?.carat} Carat ${singleDiaData[0]?.colorname} ${singleDiaData[0]?.clarityname} ${singleDiaData[0]?.cutname} Cut ${singleDiaData[0]?.shapename} Diamond`}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {isDataFound ? <Skeleton variant="rounded" style={{ height: '30px', width: '32rem', marginLeft: '-5px' }} /> : (
                                                                <>
                                                                    <span
                                                                        onClick={() => {
                                                                            navigate("/");
                                                                        }}
                                                                    >
                                                                        {"Home / "}{" "}
                                                                    </span>
                                                                    <span
                                                                        onClick={() => {
                                                                            navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
                                                                        }}
                                                                    >
                                                                        {` Certified diamond`}
                                                                    </span>
                                                                    <span
                                                                    >
                                                                        {` / ${singleDiaData[0]?.carat} Carat ${singleDiaData[0]?.colorname} ${singleDiaData[0]?.clarityname} ${singleDiaData[0]?.cutname} Cut ${singleDiaData[0]?.shapename} Diamond`}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </>
                                                    )}

                                                </div>
                                                <div className="for_DiamondDet_title_wishlist">
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
                                                        onChange={(e) => handleButtonChange('wish', e, singleDiaData[0]?.stockno, "", "")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="for_DiamondDet_title_main_div">
                                        <div className="for_DiamondDet_title_div">
                                            {isDataFound ?
                                                <Skeleton variant="rounded" style={{ height: '30px', width: '32rem' }} />
                                                : (
                                                    <div className="for_DiamondDet_title">
                                                        <span>{`${singleDiaData[0]?.carat} Carat ${singleDiaData[0]?.colorname} ${singleDiaData[0]?.clarityname} ${singleDiaData[0]?.cutname} Cut ${singleDiaData[0]?.shapename} Diamond`}</span>
                                                        {/* <span>{singleProd?.designno} {singleProd?.TitleLine?.length > 0 && " - " + singleProd?.TitleLine}</span> */}
                                                    </div>
                                                )
                                            }

                                            <div className="for_DiamondDet_title_sku">
                                                <div className='for_DiamondDet_sku'>SKU: {isDataFound ? <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} /> : singleDiaData[0]?.stockno}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="for_DiamondDet_prodWeights_div">
                                    </div>
                                    <div className="for_DiamondDet_price_div">
                                        <span className='for_DiamondDet_price'>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: decodeEntities(loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode),
                                                }}
                                            />
                                            {
                                                isPriceloading ?
                                                    <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                                                    :
                                                    <span>&nbsp;{formatter(singleDiaData[0]?.price)}</span>
                                                // <span>&nbsp;{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp)}</span>
                                            }
                                        </span>
                                    </div>
                                    <div className="for_DiamondDet_details_div">
                                        {isDataFound ? <Skeleton variant="rounded" style={{ height: '6rem', width: '32rem' }} /> :
                                            (
                                                <span className='for_Diamond_details_span'>{`This ${singleDiaData[0]?.companyname} diamond is a stunning symbol of perfection & brilliance with its flawless ${singleDiaData[0]?.clarityname} clarity, ${singleDiaData[0]?.colorname} color, and expertly crafted excellent round cut.`}</span>
                                            )}
                                    </div>
                                    <div className="for_DiamondDet_choose_Dia_div">
                                        {settingSteps?.[1]?.step2 && settingSteps?.[0]?.Status === "active" ? (
                                            <button disabled={isPriceloading} onClick={() => handleButtonChange('diamond', "", "", "", "")} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15} ${isLoading ? 'disabled' : ''}`}>
                                                choose this diamond
                                            </button>
                                        ) : (
                                            <>
                                                {stepsData?.[1]?.step2Data?.id > 0 ? (
                                                    <button disabled={isPriceloading} onClick={() => handleButtonChange('hasData', "", "", stepsData?.[0]?.step1Data?.[0]?.shapename, steps?.[1]?.Setting)} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15} ${isLoading ? 'disabled' : ''}`}>
                                                        choose this diamond
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button disabled={isPriceloading} onClick={handleClickOpen} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15} ${isLoading ? 'disabled' : ''}`}>
                                                            choose this diamond
                                                        </button>
                                                        <Modal open={showModal} handleClose={handleClose} handleButtonChange={handleButtonChange} stockno={singleDiaData[0]?.stockno} shape={singleDiaData[0]?.shapename} />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="for_DiamondDet_shipping_fee_div">
                                        <div className="for_DiamondDet_shipping_icon">
                                            <img className='for_DiamondDet_shipp_image' src={`${storImagePath()}/images/ProductListing/Shipping/shipping-cart.png`} alt='shipping-icon' ></img>
                                        </div>
                                        <div className="for_DiamondDet_shipp_desc">
                                            <span className='for_shipp_desc_title_1'>Free shipping, free 30 days return</span>
                                            <span className='for_shipp_desc_title_2'><span className='for_shipp_desc_bold'>Please Note :</span> If the diamond is part of a diamond ring, the completed ring will ship according to the shipping date of the setting</span>
                                        </div>
                                    </div>
                                    <div className="for_DiamondDet_calender_div">
                                        <div className="for_DiamondDet_calender_icon">
                                            <img className='for_DiamondDet_calender_image' src={`${storImagePath()}/images/ProductListing/Shipping/calendar.png`} alt='calender-icon' ></img>
                                        </div>
                                        <div className="for_DiamondDet_calender_desc">
                                            <span className='for_calender_desc_title_1'>order now and your order shipped by</span>
                                            <span className='for_calender_desc_title_2'>Tuesday , August 20</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="for_Complete_set_main_div">
                                    <div className="for_Complete_set_title_div">
                                        <div className="for_Complete_set_Setting_div">
                                            {isDataFound ?
                                                <Skeleton variant="rounded" style={{ height: '8rem', width: '38rem' }} />
                                                : (
                                                    <>
                                                        <div className='for_Complete_set_title_des_div'>
                                                            <div className="for_Complete_set_title">
                                                                <span>{settingData?.step2Data?.designno ?? settingData?.step1Data?.designno} {(settingData?.step2Data?.TitleLine?.length > 0 && " - " + settingData?.step2Data?.TitleLine) ?? (settingData?.step1Data?.TitleLine?.length > 0 && " - " + settingData?.step1Data?.TitleLine)}</span>
                                                            </div>

                                                            <div className="for_Complete_set_title_wishlist">
                                                                <Checkbox
                                                                    icon={<GoHeart size={24} color="black" />}
                                                                    checkedIcon={<GoHeartFill size={24} color="black" />}
                                                                    className='for_wishlist_icon'
                                                                    disableRipple={true}
                                                                    checked={addwishListFlag ?? (settingData?.step1Data?.IsInWish ?? settingData?.step2Data?.IsInWish) == 1 ? true : false}
                                                                    onChange={(e) => handleWish(e, diamondData, settingData)}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="for_Complete_set_title_sku">
                                                            {/* <div className='for_Complete_set_sku'>Design No : {settingData?.step2Data?.designno ?? settingData?.step1Data?.designno}</div> */}
                                                        </div>
                                                        <div className="for_Complete_set_price_div">
                                                            <div className="for_Complete_set_price">
                                                                <span>{loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(settingData?.step2Data?.UnitCostWithMarkUp ?? settingData?.step1Data?.UnitCostWithMarkUp)}</span>
                                                            </div>
                                                            <div className="for_change_setting" onClick={() => { navigate(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[0]?.shape ?? setshape?.[1]?.shape}/M=${filterVal}`) }}>
                                                                <HiOutlinePencilSquare fontWeight={700} />
                                                                <span style={{ marginTop: '1px' }}>Change</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                        </div>

                                        <div className="for_Complete_set_Diamond_div">
                                            {isDataFound ?
                                                <Skeleton variant="rounded" style={{ height: '8rem', width: '38rem' }} />
                                                : (
                                                    <>
                                                        <div className="for_Complete_set_title">
                                                            <span>{`${diamondData?.step1Data?.[0]?.carat ?? diamondData?.step2Data?.[0]?.carat} Carat ${diamondData?.step1Data?.[0]?.colorname ?? diamondData?.step2Data?.[0]?.colorname} ${diamondData?.step1Data?.[0]?.clarityname ?? diamondData?.step2Data?.[0]?.clarityname} ${diamondData?.step1Data?.[0]?.cutname ?? diamondData?.step2Data?.[0]?.cutname} Cut ${diamondData?.step1Data?.[0]?.shapename ?? diamondData?.step2Data?.[0]?.shapename} Diamond`}</span>
                                                        </div>

                                                        <div className="for_Complete_set_title_sku_dia">
                                                            <div className='for_Complete_set_sku'>SKU: {diamondData?.step1Data?.[0]?.stockno ?? diamondData?.step2Data?.[0]?.stockno}</div>
                                                        </div>
                                                        <div className="for_Complete_set_price_div">
                                                            <div className="for_Complete_set_price">
                                                                <span>{loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(diamondData?.step1Data?.[0]?.price ?? diamondData?.step2Data?.[0]?.price)}</span>
                                                            </div>
                                                            <div className="for_change_setting" onClick={() => { navigate(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`) }}>
                                                                <HiOutlinePencilSquare fontWeight={700} />
                                                                <span style={{ marginTop: '1px' }}>Change</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                        </div>

                                        {/* <div className="for_Complete_set_size_div">
                                            {sizeCombo?.length > 0 && (
                                                <div className="for_prodWeights_metalType_div">
                                                    <div className='for_prodWeight_title_div'>
                                                        <span className="for_prodWeights_metalType_title">{setshape?.[1]?.Setting ?? setshape?.[0]?.Setting} Size</span>
                                                        <span className="for_prodWeights_metalType_title_1">{`(Choose your ${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting} size)`}</span>
                                                    </div>
                                                    <FormControl variant="standard" sx={{ m: 1, marginLeft: '8px', minWidth: 120, margin: 0, padding: 0, background: 'transparent' }}>
                                                        <select
                                                            className="for_prodWeights_weights_drp"
                                                            value={sizeData}
                                                            onChange={(e) => handleCustomChange(e, 'size')}
                                                        >
                                                            {sizeCombo?.map((ele, index) => (
                                                                <option key={index} value={ele?.value}>
                                                                    {ele?.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </FormControl>
                                                </div>
                                            )}
                                        </div> */}

                                        <div className="for_Complete_set_final_price_div">
                                            <div className="for_Complete_set_price">
                                                <span className='for_com_set_prc_loader'>
                                                    {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                    {isDataFound ? (
                                                        <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                                                    ) : (
                                                        <span>{typeof totalPrice === "number" ? formatter(totalPrice) : 0}</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="for_Complete_set_choose_Dia_div">
                                            {compSet ? (
                                                <button disabled={isPriceloading} onClick={() => handleCart(!addToCardFlag, diamondData, settingData)} className={`${btnstyle?.btn_for_new} for_Complete_set_ATC ${btnstyle?.btn_15} ${isLoading ? 'disabled' : ''}`}>
                                                    {addToCardFlag === false ? "ADD TO CART" : "REMOVE FROM CART"}
                                                </button>
                                            ) : (
                                                <>
                                                    <button disabled={isPriceloading} onClick={handleClickOpen} className={`${btnstyle?.btn_for_new} for_DiamondDet_choose_Dia ${btnstyle?.btn_15} ${isLoading ? 'disabled' : ''}`}>
                                                        choose this diamond
                                                    </button>
                                                    <Modal open={showModal} handleClose={handleClose} handleButtonChange={handleButtonChange} stockno={singleDiaData[0]?.stockno} shape={singleDiaData[0]?.shapename} />

                                                </>
                                            )}
                                        </div>
                                        <div className="for_Complete_set_shipp_div">
                                            <div className="for_DiamondDet_shipping_fee_div">
                                                <div className="for_DiamondDet_shipping_icon">
                                                    <img className='for_DiamondDet_shipp_image' src={`${storImagePath()}/images/ProductListing/Shipping/shipping-cart.png`} alt='shipping-icon' ></img>
                                                </div>
                                                <div className="for_DiamondDet_shipp_desc">
                                                    <span className='for_shipp_desc_title_1'>Free shipping, free 30 days return</span>
                                                    <span className='for_shipp_desc_title_2'><span className='for_shipp_desc_bold'>Please Note :</span> If the diamond is part of a diamond ring, the completed ring will ship according to the shipping date of the setting</span>
                                                </div>
                                            </div>
                                            <div className="for_DiamondDet_calender_div">
                                                <div className="for_DiamondDet_calender_icon">
                                                    <img className='for_DiamondDet_calender_image' src={`${storImagePath()}/images/ProductListing/Shipping/calendar.png`} alt='calender-icon' ></img>
                                                </div>
                                                <div className="for_DiamondDet_calender_desc">
                                                    <span className='for_calender_desc_title_1'>order now and your order shipped by</span>
                                                    <span className='for_calender_desc_title_2'>Tuesday , August 20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    {!compSet && (
                        <div className="for_DiamondDet_prod_desc_mainDIv">
                            <div className="for_DiamondDet_desc">
                                <span className='for_DiamondDet_desc_title'>General information</span>
                                {isDataFound ? <Skeleton variant="rounded" style={{ height: '30px', width: '40rem' }} /> : (
                                    <p className='for_DiamondDet_desc_1_para'>{`This ${singleDiaData[0]?.carat} Carat ${singleDiaData[0]?.cutname} Cut ${singleDiaData[0]?.shapename} Shape Diamond ${singleDiaData[0]?.colorname} Color ${singleDiaData[0]?.clarityname} Clarity has a diamond grading report from ${singleDiaData[0]?.certyname}.`}</p>
                                )}
                            </div>
                            <div className="for_DiamondDet_desc_1">
                                <div className="for_DiamondDet_desc_DiaInfo_1">
                                    <span className='for_DiamondDet_desc_title_1'>Diamond information</span>
                                    <div className='for_DiamondDet_desc_div'>
                                        {diaArr1?.map((item, index) => (
                                            <div className="for_Diamond_desc_div" key={index}>
                                                <div className='for_DiamondDet_desc_title_para'>{item?.title}: </div>
                                                <div className='for_DiamondDet_desc_title_para'>{item?.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="for_DiamondDet_desc_DiaInfo_1">
                                    <span className='for_DiamondDet_desc_title_1'>More Diamond information</span>
                                    <div className='for_DiamondDet_desc_div'>
                                        {diaArr2?.map((item, index) => (
                                            <div className="for_Diamond_desc_div" key={index}>
                                                <div className='for_DiamondDet_desc_title_para'>{item?.title}: </div>
                                                <div className='for_DiamondDet_desc_title_para'>{item?.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="for_Complete_set_services_div">
                        {/* <OurServices /> */}
                        {/* <Services title={"Our Exclusive services"} services={services} /> */}
                    </div>
                </div>
                {
                    (setshape?.[1]?.Setting === 'Ring' || setshape?.[0]?.Setting === 'Ring') ? (
                        <div className="for_DiamondDet_trend_coll_banner_div">
                            <div className="for_trend_coll_details_div">
                                <div className="for_trend_coll_det_title">
                                    <div className='for_trenf_coll_tit1'><span>Make her heart race</span></div>
                                    <div className='for_trenf_coll_tit2'><span>Complete Setting With <span style={{ fontWeight: '700' }}>Rings</span></span></div>
                                    <div className='for_trend_coll_para'>
                                        <p>We offers a huge lab grown diamonds jewelry collection. Surprise your significant other with a stunning diamond jewelry and a proposal they will never forget. Browse our collection now and find the perfect diamond jewelry for your love story.</p>
                                    </div>
                                    <div className="for_trend_coll_btn">
                                        <button className={`${btnstyle?.btn_for_new} for_trend_jewel_coll ${btnstyle?.btn_15} `}>View all Rings</button>
                                    </div>
                                </div>
                            </div>
                            <div className='for_trend_coll_image_div'>
                                <img className='for_trend_coll_image' src={`${storImagePath()}/images/ProductListing/DiamondDetBanner/banner-3.png`} alt="" />
                            </div>
                            {/* <div className="for_DiamondDet_NewsLetter">
                                <NewsletterSignup />
                            </div> */}
                        </div>
                    ) : (
                        <>
                            {(setshape?.[1]?.Setting === 'Pendant' || setshape?.[0]?.Setting === 'Pendant') ? (
                                <div className="for_DiamondDet_trend_coll_banner_div">
                                    <div className="for_trend_coll_details_div">
                                        <div className="for_trend_coll_det_title">
                                            <div className='for_trenf_coll_tit1'><span>Make her heart race</span></div>
                                            <div className='for_trenf_coll_tit2'><span>Complete Setting With <span style={{ fontWeight: '700' }}>Pendants</span></span></div>
                                            <div className='for_trend_coll_para'>
                                                <p>We offers a huge lab grown diamonds jewelry collection. Surprise your significant other with a stunning diamond jewelry and a proposal they will never forget. Browse our collection now and find the perfect diamond jewelry for your love story.</p>
                                            </div>
                                            <div className="for_trend_coll_btn">
                                                <button className={`${btnstyle?.btn_for_new} for_trend_jewel_coll ${btnstyle?.btn_15} `}>View all Pendants</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='for_trend_coll_image_div'>
                                        <img className='for_trend_coll_image' src={`${storImagePath()}/images/ProductListing/DiamondDetBanner/pendants.webp`} alt="" />
                                    </div>
                                    {/* <div className="for_DiamondDet_NewsLetter">
                                        <NewsletterSignup />
                                    </div> */}
                                </div>
                            ) : (
                                <div className="for_DiamondDet_trend_coll_banner_div">
                                    <div className="for_trend_coll_details_div">
                                        <div className="for_trend_coll_det_title">
                                            <div className='for_trenf_coll_tit1'><span>Make her heart race</span></div>
                                            <div className='for_trenf_coll_tit2'><span>Trending & Unique Collection</span></div>
                                            <div className='for_trend_coll_para'>
                                                <p>We offers a huge lab grown diamonds jewelry collection. Surprise your significant other with a stunning diamond jewelry and a proposal they will never forget. Browse our collection now and find the perfect diamond jewelry for your love story.</p>
                                            </div>
                                            <div className="for_trend_coll_btn">
                                                <button className={`${btnstyle?.btn_for_new} for_trend_jewel_coll ${btnstyle?.btn_15} `}>View all Diamonds</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='for_trend_coll_image_div'>
                                        <img className='for_trend_coll_image' src={`${storImagePath()}/images/ProductListing/DiamondDetBanner/diamond-banner.webp`} alt="" />
                                    </div>
                                    {/* <div className="for_DiamondDet_NewsLetter">
                                        <NewsletterSignup />
                                    </div> */}
                                </div>
                            )}
                        </>
                    )
                }

            </div >
        </div >
    )
}

export default DiamondDetails

const HandleDrp = forwardRef(({ index, open, handleOpen, data, compSet, getImagePath }, ref) => {
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
        const storedData2 = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
        const storedData3 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
        const storedData4 = JSON.parse(sessionStorage.getItem('custStepData2Earring'));
        const storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
        const storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
        const storedSteps3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
        const storedSteps4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));

        const shapename = storedSteps?.[0]?.shape ?? (storedSteps2?.[0]?.Setting === 'Ring' && storedSteps2?.[0]?.Status === 'active' ? storedSteps2?.[1]?.shape : storedSteps3?.[0]?.Setting === 'Pendant' && storedSteps3?.[0]?.Status === 'active' ? storedSteps3?.[1]?.shape : storedSteps4?.[1]?.shape);

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
                            Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
                        }
                    } else {
                        sessionStorage.removeItem("custStepData");
                        sessionStorage.removeItem("custStepData2Pendant");
                        sessionStorage.removeItem("setPenImage");
                        Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
                    }
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
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
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

                if (storedData3?.length > 0 && storedSteps3?.[2]?.step3 === true) {
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
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
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
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${(storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting) === "Ring" ? "Ring" : "Pendant"}/diamond_shape=${(storedSteps?.[0]?.shape ?? storedSteps2?.[1]?.shape ?? storedSteps3?.[1]?.shape)}/M=${(storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting) === "Ring" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ=="}`, {
                        replace: true
                    });
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

                        if (!compSet) {
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
                        } else {
                            storedSteps2.unshift(step1, step2);
                            sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(storedSteps2));

                            if (storedSteps2?.length > 0) {
                                sessionStorage.removeItem("customizeSteps");
                            }
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

                        if (!compSet) {
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
                        } else {
                            storedSteps2.unshift(step1, step2);
                            sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(storedSteps2));

                            if (storedSteps2?.length > 0) {
                                sessionStorage.removeItem("customizeSteps");
                            }
                        }
                    }
                    Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
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

                if (!compSet) {
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
                } else {
                    storedSteps.unshift(step1, step2);
                    sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));

                    if (storedSteps?.length > 0) {
                        sessionStorage.removeItem("customizeSteps2Ring");
                    }
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


                if (!compSet) {
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
                } else {
                    storedSteps.unshift(step1, step2);
                    sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));

                    if (storedSteps?.length > 0) {
                        sessionStorage.removeItem("customizeSteps2Pendant");
                    }
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


                if (!compSet) {
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
                } else {
                    storedSteps.unshift(step1, step2);
                    sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));

                    if (storedSteps?.length > 0) {
                        sessionStorage.removeItem("customizeSteps2Earring");
                    }
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
            let pValue = getShape1?.[1]?.Setting === 'Ring' ? { menuname: 'Engagement Ring' } : { menuname: 'Diamond Pendants' } || (getShape2?.[0]?.Setting ?? getShape3?.[0]?.Setting) === 'Ring' ? { menuname: 'Engagement Ring' } : { menuname: 'Diamond Pendants' }
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
                            src={data?.stockno ? data?.image_file_url : (getImagePath?.colorImage ?? imageMap?.colorImage)}
                            // src={data?.stockno ? data?.image_file_url : (!imageMap?.colorImage?.includes('/static') ? imageMap?.colorImage : getImagePath?.colorImage)}
                            alt=""
                            style={{ cursor: 'default' }}
                            onError={(e) => e.target.src = imageNotFound}
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

const DiamondNavigation = ({ Swap, StyleCondition, setswap, stockno, compSet, getImagePath, customizeStep }) => {
    const dropdownRefs = useRef({});
    const [open, setOpen] = useState(null);
    const isLoading = useRecoilValue(for_Loader);
    const [isSetting, setIsSetting] = useState([]);
    const [storeInit, setStoreInit] = useState({});
    const [setshape, setSetShape] = useState();
    const [showModal, setShowModal] = useState(false);
    const [loginCurrency, setLoginCurrency] = useState();
    const [settingSteps, setSettingSteps] = useState();
    const Navigation = useNavigate();
    const location = useLocation();
    const isDiamondPage = stockno || compSet || 'det345';
    const getStepName = location?.pathname.split('/');
    const getCustStepData = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const getdiaData = JSON.parse(sessionStorage.getItem('custStepData'));
    const setting = getStepName.includes('Ring') || getStepName.includes('Pendant') || getStepName.includes('Earring');
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

    const createUrl = `/d/setting-complete-product/det345/?p=${(getCompleteStep1 ?? getCompleteStep2 ?? getCompleteStep3)?.[2]?.url}`;

    const handleToggle = () => {
        setShowModal(!showModal);
    };

    const handleConfirm = () => {
        Navigation(createUrl);
    }

    const handleRemoveData = (index) => {
        sessionStorage.removeItem("customizeSteps");
        sessionStorage.removeItem("custStepData");
        sessionStorage.removeItem("customizeSteps2Ring");
        sessionStorage.removeItem("customizeSteps2Pendant");
        sessionStorage.removeItem("custStepData2Ring");
        sessionStorage.removeItem("custStepData2Pendant");
        if (index === 0) {
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
        }
        else {
            Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
        }
        handleToggle();
    };

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
        const handleCompset = () => {
            const getSetShape = JSON.parse(sessionStorage.getItem('customizeSteps')) ?? (getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2 : getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3 : getCompleteStep4);
            setSetShape(getSetShape);
        }
        handleCompset();
    }, [])

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
                            if ((getCustStepData2?.[2]?.step3 == true || getCustStepData3?.[2]?.step3 == true)) {
                                setShowModal(true)
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
                            compSet={compSet}
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
                            compSet={compSet}
                        />
                    )}
                    {(getdiaData4?.[0]?.step1Data && getCustStepData4?.[0]?.Status === "active") && (
                        <HandleDrp
                            index={0}
                            open={open === 'setting'}
                            handleOpen={() => handleOpen('setting')}
                            data={getdiaData4?.[0]?.step1Data}
                            ref={(el) => { dropdownRefs.current[0] = el; }}
                            getImagePath={getImagePath}
                            compSet={compSet}
                        />
                    )}
                </div>

                <div className={`step_data ${isActive(isDiamondPage) ? 'active' : ''} d-1`}>
                    <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
                        Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                        setswap("diamond");
                    }}>
                        <img className="for_shapes_img" src={getCompleteStep4?.[0]?.step1 === true ? StepImages[0]?.img1 : StepImages[0]?.img} alt="" /> Diamond
                    </span>
                    {((getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && getCustStepData2?.[0]?.Status === "active") && (
                        <HandleDrp
                            index={1}
                            open={open === 'diamond'}
                            handleOpen={() => handleOpen('diamond')}
                            data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                            compSet={compSet}
                        />
                    )}
                    {((getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data) && getCustStepData3?.[0]?.Status === "active") && (
                        <HandleDrp
                            index={1}
                            open={open === 'diamond'}
                            handleOpen={() => handleOpen('diamond')}
                            data={getdiaData3?.[1]?.step2Data?.[0] ?? getdiaData3?.[0]?.step2Data?.[0]}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                            compSet={compSet}
                        />
                    )}
                    {((getdiaData4?.[1]?.step2Data ?? getdiaData4?.[0]?.step2Data) && getCustStepData4?.[0]?.Status === "active") && (
                        <HandleDrp
                            index={1}
                            open={open === 'diamond'}
                            handleOpen={() => handleOpen('diamond')}
                            data={getdiaData4?.[1]?.step2Data?.[0] ?? getdiaData4?.[0]?.step2Data?.[0]}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                            compSet={compSet}
                        />
                    )}
                    {getdiaData?.[0]?.step1Data?.[0] && (
                        <HandleDrp
                            index={1}
                            open={open === 'diamond'}
                            handleOpen={() => handleOpen('diamond')}
                            data={getdiaData?.[0]?.step1Data?.[0]}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                            compSet={compSet}
                        />
                    )}
                </div>

                <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData3?.[1]?.step2Data || getdiaData?.[1]?.step2Data || getdiaData4?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
                    <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url || getCompleteStep3?.[2]?.url || getCompleteStep4?.[2]?.url)}`); setswap("finish"); }}>
                        <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : (getCustStepData2?.[0]?.Setting === 'Ring' || getCustStepData3?.[0]?.Setting === 'Ring' || getCustStepData?.[1]?.Setting === 'Ring') ? 'for_shapes_img' : 'for_earring_shape'} src={
                            ((((getCompleteStep2?.[0]?.Setting === 'Pendant' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active') ? StepImages[1]?.img1 : (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Ring' && getCompleteStep3?.[0]?.Status === 'active') ? StepImages[1]?.img : StepImages[1]?.img3)))
                        } alt="" /> {((getCompleteStep2?.[0]?.Setting === 'Pendant' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active')) ? 'Pendant' : ((getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Ring' && getCompleteStep3?.[0]?.Status === 'active')) ? 'Ring' : 'Earring'}
                    </span>
                    {(compSet && (getCompleteStep1?.[2]?.price || (getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3?.[2]?.price : getCompleteStep4?.[2]?.price))) && (
                        <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(
                            getCompleteStep1?.[2]?.price || (getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3?.[2]?.price : getCompleteStep4?.[2]?.price))}</span>
                    )}
                </div>
                {showModal && (
                    <DemountModal open={showModal} handleConfirm={handleConfirm} handleClose={handleToggle} handleRemoveData={handleRemoveData} index={1} createUrl={createUrl} />
                )}
            </>
        );
    };

    return (
        <>
            {getdiaData?.length > 0 || (getCustStepData?.[0]?.step1 === true ?? (getCustStepData2?.[1]?.step2 === true ?? getCustStepData3?.[1]?.step2 === true)) ? (
                <div className="diamond_Step_data_det">
                    <div className={`step_data ${isActive(isDiamondPage) ? 'active' : ''} d-1`}>
                        <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
                            if (getCustStepData?.[2]?.step3 == true) {
                                setShowModal(true)
                            }
                            // Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                            setswap("diamond");
                        }}>
                            <img src={StepImages[0]?.img} className='for_shapes_img' alt="" /> Diamond
                        </span>
                        {((getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && getCustStepData2?.[0]?.Status === "active") && (
                            <HandleDrp
                                index={0}
                                open={open === 'diamond'}
                                handleOpen={() => handleOpen('diamond')}
                                data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
                                ref={(el) => { dropdownRefs.current[1] = el; }}
                                compSet={compSet}
                            />
                        )}
                        {((getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data) && getCustStepData3?.[0]?.Status === "active") && (
                            <HandleDrp
                                index={0}
                                open={open === 'diamond'}
                                handleOpen={() => handleOpen('diamond')}
                                data={getdiaData3?.[1]?.step2Data?.[0] ?? getdiaData3?.[0]?.step2Data?.[0]}
                                ref={(el) => { dropdownRefs.current[1] = el; }}
                                compSet={compSet}
                            />
                        )}
                        {getdiaData?.[0]?.step1Data?.[0] && (
                            <HandleDrp
                                index={0}
                                open={open === 'diamond'}
                                handleOpen={() => handleOpen('diamond')}
                                data={getdiaData?.[0]?.step1Data?.[0]}
                                ref={(el) => { dropdownRefs.current[1] = el; }}
                                compSet={compSet}
                            />
                        )}
                    </div>

                    <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
                        <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition}
                            onClick={() => {
                                if (getCompleteStep1?.[1]?.step2 === true) {
                                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                                    setswap("settings");
                                } else {
                                    if (getCompleteStep1?.[0]?.step1 === true && (getdiaData === null || getdiaData === undefined)) {
                                        sessionStorage.removeItem('customizeSteps');
                                        Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                                    } else {
                                        Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                                    }
                                }
                            }}
                        >
                            <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={(((getCompleteStep2?.[0]?.Setting === 'Pendant' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active') || getCustStepData?.[1]?.Setting === 'Pendant') ? StepImages[1]?.img1 : StepImages[1]?.img) ||
                                StepImages[2]?.img} alt="" /> Settings
                        </span>
                        {((getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) ?? (getdiaData2?.[0]?.step1Data && getCustStepData2?.[0]?.Status === "active")) && (
                            <HandleDrp
                                index={1}
                                open={open === 'setting'}
                                handleOpen={() => handleOpen('setting')}
                                data={(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) ?? getdiaData2?.[0]}
                                ref={(el) => { dropdownRefs.current[0] = el; }}
                                getImagePath={getImagePath}
                                compSet={compSet}
                            />
                        )}
                        {(getdiaData3?.[0]?.step1Data && getCustStepData3?.[0]?.Status === "active") && (
                            <HandleDrp
                                index={1}
                                open={open === 'setting'}
                                handleOpen={() => handleOpen('setting')}
                                data={getdiaData3?.[0]}
                                ref={(el) => { dropdownRefs.current[0] = el; }}
                                getImagePath={getImagePath}
                                compSet={compSet}
                            />
                        )}
                        {/* {(getdiaData?.[1]?.step1Data && getCustStepData?.[1]?.step === true && (getCustStepData2?.[0]?.Status === "inactive" && getCustStepData3?.[0]?.Status === "inactive")) && (
                            <HandleDrp
                                index={1}
                                open={open === 'setting'}
                                handleOpen={() => handleOpen('setting')}
                                data={getdiaData?.[0]}
                                ref={(el) => { dropdownRefs.current[0] = el; }}
                                getImagePath={getImagePath}
                                compSet={compSet}
                            />
                        )} */}
                    </div>

                    <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData3?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
                        <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url || getCompleteStep3?.[2]?.url)}`); setswap("finish"); }}>
                            <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={
                                ((((getCompleteStep1?.[1]?.Setting === 'Pendant' || (getCompleteStep2?.[0]?.Setting === 'Pendant' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active')) ? StepImages[1]?.img1 : StepImages[1]?.img)))
                            } alt="" /> {(getCompleteStep1?.[1]?.Setting === 'Pendant' || (getCompleteStep2?.[0]?.Setting === 'Pendant' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active')) ? 'Pendant' : 'Ring'}
                        </span>
                        {(compSet || (getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true)) && (
                            <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(
                                getCompleteStep1?.[2]?.price || ((getCompleteStep2?.[2]?.price || getCompleteStep3?.[2]?.price) && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price : getCompleteStep3?.[2]?.price))}</span>
                        )}
                    </div>
                    {showModal && (
                        <DemountModal open={showModal} handleClose={handleToggle} handleRemoveData={handleRemoveData} index={0} createUrl={createUrl} />
                    )}
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
                                            Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
                                            setswap("diamond");
                                        }}
                                    >
                                        <span style={StyleCondition}>
                                            <img src={StepImages[0]?.img} className='for_shapes_img' alt="" /> Diamond
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="for_step d-2"
                                        onClick={() => {
                                            Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=V29tZW4vZ2VuZGVy`);
                                            setswap("settings");
                                        }}
                                    >
                                        <span style={StyleCondition}>
                                            <img src={StepImages[1]?.img} className='for_shapes_img' alt="" /> Settings
                                        </span>
                                    </div>
                                )}
                                {Swap !== "diamond" ? (
                                    <div
                                        className="for_step d-1"
                                        onClick={() => {
                                            Navigation(`/certified-loose-lab-grown-diamonds/diamond`);
                                            setswap("diamond");
                                        }}
                                    >
                                        <span style={StyleCondition}>
                                            <img src={StepImages[0]?.img} className='for_shapes_img' alt="" /> Diamond
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="for_step d-2"
                                        onClick={() => {
                                            Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring`);
                                            setswap("settings");
                                        }}
                                    >
                                        <span style={StyleCondition}>
                                            <img src={StepImages[1]?.img} className='for_shapes_img' alt="" /> Settings
                                        </span>
                                    </div>
                                )}
                                <div className="for_step d-3">
                                    <span style={StyleCondition} onClick={() => Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring`)}>
                                        <img src={StepImages[2]?.img} className='for_shapes_img' alt="" /> Rings
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

const Modal = ({
    open,
    handleClose,
    handleButtonChange,
    stockno,
    shape,
}) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    zIndex: 9999999,
                    '& .MuiDialog-paper': {
                        backgroundColor: 'transparent',
                        border: '1px solid white',
                    },
                    '& .MuiDialogContent-root': {
                        padding: '10px',
                    },
                }}
            >
                <DialogContent
                    sx={{
                        minWidth: 260,
                        padding: '0px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div className="for_modal_cancel_btn_div" onClick={handleClose}>
                        <RxCross1 className='for_modal_cancel_btn' size={'12px'} />
                    </div>
                    <div className="for_modal_inner_div">
                        <span className='for_modal_title'>
                            What would you like to do?
                        </span>
                        <div className="for_modal_buttons_div">
                            <button onClick={() => {
                                handleButtonChange('ring', "", stockno, shape, "");
                                handleClose();
                            }}>Add your diamond to a ring</button>
                            <button onClick={() => { handleButtonChange('pendant', "", stockno, shape, ""); handleClose(); }}>add your diamond to a pendant</button>
                            <button onClick={() => {
                                handleButtonChange('cart', "", stockno, "", "");
                                handleClose();
                            }}>add your diamond to cart</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}


const DemountModal = ({ open, handleConfirm, handleClose, handleRemoveData, index, createUrl }) => {
    const Navigation = useNavigate();
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
                            You have already selected mount & diamond, would you like to view
                            it?
                        </span>
                        <div className="for_modal_buttons_nav_div">
                            <button
                                onClick={() => {
                                    Navigation(createUrl);
                                    handleClose();
                                }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    handleRemoveData(index);
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
