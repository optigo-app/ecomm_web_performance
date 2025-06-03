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
import PairSvg from "../../../Config/PairSvg";
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
import { for_CartCount, for_Loader, for_WishCount, for_customizationSteps, for_customizationSteps1, for_isEarringFlowOn, for_isPendantFlowOn, for_isRingFlowOn } from '../../../Recoil/atom';
import Faq from '../../ReusableComponent/Faq/Faq';
import { responsiveConfig } from '../../../Config/ProductSliderConfig';
import RelatedProduct from '../ProductDetail/RelatedProduct/RelatedProduct';
import { StepImages } from '../../../data/NavbarMenu';
import { DiamondListData } from '../../../../../../utils/API/DiamondStore/DiamondList';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { getImagePath as getdiaImages } from "../../../Config/ShapeFinder";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { toast } from 'react-toastify';
import OurServices from '../../Home/Common/OurServices/OurServices';
import certy from '../certy';


const DiamondDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoading = useRecoilValue(for_Loader);
    const sliderRef = useRef(null);
    const sliderRef1 = useRef(null);
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
    const isRing = JSON?.parse(sessionStorage.getItem('isRing')) ?? "";
    const isPendant = JSON?.parse(sessionStorage.getItem('isPendant')) ?? "";
    const isEarringpair = JSON?.parse(sessionStorage.getItem('isPair')) ?? "";
    const isPendantFlowOn = useRecoilValue(for_isPendantFlowOn);
    const isRingFlowOn = useRecoilValue(for_isRingFlowOn);
    const isEarringFlowOn = useRecoilValue(for_isEarringFlowOn);

    let isPair;
    if (steps3?.[0]?.Status === 'active' || JSON.parse(sessionStorage.getItem('isPair'))) {
        isPair = true;
    } else {
        isPair = false;
    }

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
    const [pairShapeName, setPairShapeName] = useState([]);
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
    const [totalDiaprice, setTotalDiaPrice] = useState();

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
    const [mediaArr1, setMediaArr1] = useState([]);
    const [compSettArr, setCompSettArr] = useState([]);
    const [getAllData, setAllData] = useState([]);
    const [certyLink, setCertyLink] = useState();
    const [getImagePath, setImagePath] = useState();

    const diamondDatas = JSON?.parse(sessionStorage.getItem('custStepData'))?.[0] ?? (ringData ?? pendantData ?? earringData)?.[1];

    const hrdCerti = singleDiaData?.[0]?.certificate_url?.includes("hrd") ? "HRD" : null
    const igiCerti = singleDiaData?.[0]?.certificate_url?.includes("igi") ? "IGI" : null
    const giaCerti = singleDiaData?.[0]?.certificate_url?.includes("gia") ? "GIA" : null

    const diaHrdCerti = (diamondDatas?.step1Data?.[0]?.certificate_url ?? diamondDatas?.step2Data?.[0]?.certificate_url)?.includes("hrd") ? "HRD" : null
    const diaIgiCerti = (diamondDatas?.step1Data?.[0]?.certificate_url ?? diamondDatas?.step2Data?.[0]?.certificate_url)?.includes("igi") ? "IGI" : null
    const diaGiaCerti = (diamondDatas?.step1Data?.[0]?.certificate_url ?? diamondDatas?.step2Data?.[0]?.certificate_url)?.includes("gia") ? "GIA" : null

    useEffect(() => {
        const getImagePath = ((settingSteps?.[0]?.Setting === "Ring" && settingSteps?.[0]?.Status === "active") || isRing) ? JSON.parse(sessionStorage?.getItem("setImage")) : ((settingSteps?.[0]?.Setting === "Pendant" && settingSteps?.[0]?.Status === "active") || isPendant) ? JSON.parse(sessionStorage?.getItem("setPenImage")) : ((settingSteps?.[0]?.Setting === "Earring" && settingSteps?.[0]?.Status === "active") || isEarringpair) ? JSON.parse(sessionStorage?.getItem("setEarImage")) : null;
        setImagePath(getImagePath);
    }, [settingSteps, location?.key])

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
        const diaStep1 = (diamondDatas?.step1Data?.[0]?.certyname || getCertyNameFromUrlDia)
        const diaStep2 = (diamondDatas?.step2Data?.[0]?.certyname || getCertyNameFromUrlDia)
        if (singleDiaData !== undefined || diamondDatas !== undefined) {
            const getCertiName = certificate?.find((item) => item?.certyName === (singleDiaData?.[0]?.certyname || getCertyNameFromUrl));
            const getCertiNameCompSet = certificate?.find((item) => item?.certyName === (diaStep1 ?? diaStep2))

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
        if (!singleDiaData || !singleDiaData[0]) return;
        const { image_file_url, video_url } = singleDiaData[0];
        setMediaArr([
            { type: 'video', src: video_url },
            { type: 'image', src: image_file_url },
        ]);
        if (singleDiaData[1]) {
            const { image_file_url1, video_url1 } = singleDiaData[1];
            setMediaArr1([
                { type: 'video', src: video_url1 },
                { type: 'image', src: image_file_url1 },
            ]);
        }

        if (singleDiaData[0] && singleDiaData[1]) {
            setTotalDiaPrice(singleDiaData[0]?.price + singleDiaData[1]?.price)
        }
    }, [singleDiaData, location?.key]);


    useEffect(() => {
        if (!compSet) return;

        const custStepData = JSON.parse(sessionStorage.getItem('custStepData')) || [];
        const customizeSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
        const metalColorCombo = JSON.parse(sessionStorage.getItem('MetalColorCombo'));

        const diamondDatas = custStepData[0] ??
            (ringSteps?.[0]?.Status === 'active' ? ringData?.[1]
                : pendantSteps?.[0]?.Status === 'active' ? pendantData?.[1]
                    : earringData?.[1]);

        const settingDatas = custStepData[1] ??
            (ringSteps?.[0]?.Status === 'active' ? ringData?.[0]
                : pendantSteps?.[0]?.Status === 'active' ? pendantData?.[0]
                    : earringData?.[0]);

        const getSetShape = customizeSteps ??
            (ringSteps?.[0]?.Status === 'active' ? ringSteps
                : pendantSteps?.[0]?.Status === 'active' ? pendantSteps
                    : earringSteps);

        const getAllData = custStepData.length > 0 ? custStepData
            : (ringSteps?.[0]?.Status === 'active' ? ringData
                : pendantSteps?.[0]?.Status === 'active' ? pendantData
                    : earringData);

        setDiamondData(diamondDatas);
        setSettingData(settingDatas);
        setSetShape(getSetShape);
        setAllData(getAllData);
        setMetalColor(metalColorCombo);

        const storePairDiaName = (diamondDatas?.step2Data ?? diamondDatas?.step1Data)?.map((item) => item?.shapename);
        setPairShapeName(storePairDiaName)
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
            setImageMap(loadedImages)
        };
        loadImages();
    }, [settingData]);

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
            if ((getAllData?.[0]?.step1Data?.[0]?.stockno !== "" ?? getAllData?.[1]?.step2Data?.[0]?.stockno !== "") && isPair === true) {
                const diamondImage1 = (getAllData?.[0]?.step1Data?.[0]?.image_file_url ?? getAllData?.[1]?.step2Data?.[1]?.image_file_url);
                setCompSettArr(prev => {
                    const existingIndex = prev.filter(item => item?.type !== "diamond1");
                    return [...existingIndex, { type: "diamond1", src: diamondImage1 }]
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
    }, [getAllData, location?.key])

    useEffect(() => {
        if (compSet) {
            const Settingcategory = (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === "Ring" ? 'Ring/category' : (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === "Pendant" ? 'Pendant/category' : 'Earring/category';
            const filterKeyVal = btoa(Settingcategory)
            setFilterVal(filterKeyVal);
        }
    }, [compSet, setshape])


    const diamondPrice1 = diamondData?.step1Data?.[0]?.price ?? diamondData?.step2Data?.[0]?.price;
    const diamondPrice2 = diamondData?.step1Data?.[1]?.price ?? diamondData?.step2Data?.[1]?.price;
    const settingPrice = settingData?.step2Data?.UnitCostWithMarkUpIncTax ?? settingData?.step1Data?.UnitCostWithMarkUpIncTax;
    const totalPrice = Number(((diamondPrice1 || 0) + (diamondPrice2 || 0) + (settingPrice || 0)).toFixed(2));


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

    const handleThumbnailClick1 = (index) => {
        if (sliderRef1.current) {
            sliderRef1.current.slickGoTo(index);
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
                const existingData3 = JSON.parse(sessionStorage.getItem('custStepData2Earring')) || [];

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

                if (existingData3?.[0]?.step1Data != undefined) {
                    const newIsInCartValue = 1;

                    const updatedData = existingData3.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInCartPair: newIsInCartValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Earring', JSON.stringify(updatedData));
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
                const existingData3 = JSON.parse(sessionStorage.getItem('custStepData2Earring')) || [];

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

                if (existingData3?.[0]?.step1Data != undefined) {
                    const newIsInCartValue = 0;

                    const updatedData = existingData3.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInCartPair: newIsInCartValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Earring', JSON.stringify(updatedData));
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
                const existingData3 = JSON.parse(sessionStorage.getItem('custStepData2Earring')) || [];

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

                if (existingData3?.[0]?.step1Data != undefined) {
                    const newIsInWishValue = 1;

                    const updatedData = existingData3.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInWishPair: newIsInWishValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Earring', JSON.stringify(updatedData));
                }

                if (existingData?.[1]?.step2Data != undefined) {
                    const newIsInWishValue = 1;

                    if (isPair && steps?.[1]?.Setting === "Earring") {
                        const updatedData = existingData.map(step => {
                            if (step.step2Data != undefined) {
                                return {
                                    ...step,
                                    step2Data: {
                                        ...step.step2Data,
                                        IsInWishPair: newIsInWishValue
                                    }
                                };
                            }
                            return step;
                        });

                        sessionStorage.setItem('custStepData', JSON.stringify(updatedData));
                    } else {
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
                const existingData3 = JSON.parse(sessionStorage.getItem('custStepData2Earring')) || [];

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

                if (existingData3?.[0]?.step1Data != undefined) {
                    const newIsInWishValue = 0;

                    const updatedData = existingData3.map(step => {
                        if (step.step1Data != undefined) {
                            return {
                                ...step,
                                step1Data: {
                                    ...step.step1Data,
                                    IsInWishPair: newIsInWishValue
                                }
                            };
                        }
                        return step;
                    });

                    sessionStorage.setItem('custStepData2Earring', JSON.stringify(updatedData));
                }

                if (existingData?.[1]?.step2Data != undefined) {
                    const newIsInWishValue = 0;

                    if (isPair && steps?.[1]?.Setting === "Earring") {
                        const updatedData = existingData.map(step => {
                            if (step.step2Data != undefined) {
                                return {
                                    ...step,
                                    step2Data: {
                                        ...step.step2Data,
                                        IsInWishPair: newIsInWishValue
                                    }
                                };
                            }
                            return step;
                        });

                        sessionStorage.setItem('custStepData', JSON.stringify(updatedData));
                    } else {
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


    const getDiamondData = async (stockno, shape, isPair, stockno1, stockno2) => {
        setisPriceLoading(true);
        setIsDataFound(true);
        try {
            let response, response1;

            if (isPair) {
                // Use Promise.all to fetch both API requests in parallel
                [response, response1] = await Promise.all([
                    DiamondListData(1, shape, stockno1),
                    DiamondListData(1, shape, stockno2)
                ]);
            } else {
                response = await DiamondListData(1, shape, stockno);
            }

            if (!isPair && response && response.Data) {
                let resData = response.Data?.rd;
                setSingleDiaData(resData);
                setisPriceLoading(false);
                setIsDataFound(false);
            }
            // Handle the response when the data is a pair
            else if (isPair && response && response1 && response.Data && response1.Data) {
                let resData = response.Data?.rd;
                let resData1 = response1.Data?.rd;

                // Combine the data from both responses
                setSingleDiaData([...resData, ...resData1]);
                setisPriceLoading(false);
                setIsDataFound(false);
            } else {
                console.warn("No data found in the response");
                setisPriceLoading(false);
                setIsDataFound(false);
            }
        } catch (error) {
            console.error("Error fetching diamond data:", error);
            setisPriceLoading(false);
            setIsDataFound(false);
        }
    };


    useEffect(() => {
        let navVal = location?.search.split("?p=")[1];
        let isPairVal = location?.state;
        let decodeobj = decodeAndDecompress(navVal);
        if (isPairVal?.[0]?.isPair === true) {
            getDiamondData("", decodeobj?.b, isPairVal?.[0]?.isPair, isPairVal?.[1]?.stockno1, isPairVal?.[2]?.stockno2);
        } else {
            getDiamondData(decodeobj?.a, decodeobj?.b);
        }
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
            await CartAndWishListAPI('Cart', {}, '', '', isPair ? `${stockno[0]},${stockno[1]}` : stockno, isPair ? 1 : 0).then((res) => {
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
                let res = await CartAndWishListAPI('Wish', {}, '', '', isPair ? `${stockno[0]},${stockno[1]}` : stockno, isPair ? 1 : 0);
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
                let res1 = await RemoveCartAndWishAPI('Wish', "", '', '', isPair ? `${stockno[0]},${stockno[1]}` : stockno);
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
                a: (step1?.[0]?.autocode ?? step2?.[0]?.autocode ?? step3?.[0]?.autocode),
                b: (step1?.[0]?.designno ?? step2?.[0]?.designno ?? step3?.[0]?.designno),
                m: (stepsData?.[0]?.selectedMetalId ?? stepsData1?.[0]?.selectedMetalId ?? stepsData2?.[0]?.selectedMetalId),
                d: (stepsData?.[0]?.selectedDiaId ?? stepsData1?.[0]?.selectedDiaId ?? stepsData2?.[0]?.selectedDiaId),
                c: (stepsData?.[0]?.selectedCsId ?? stepsData1?.[0]?.selectedCsId ?? stepsData2?.[0]?.selectedCsId),
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

            // Calculate totalPrice
            const totalPrice = (singleDiaData?.[0]?.priceIncTax ?? 0) + (singleDiaData?.[1]?.priceIncTax ?? 0);

            // If no existing step3, add new entry
            if (!updatedStep1.some(step => step.step3 !== undefined)) {
                updatedStep1.push({ "step3": true, "url": encodeObj });
            }
            let updatedStepData = (settingSteps[0]?.Setting === 'Ring'
                ? stepsData
                : settingSteps[0]?.Setting === 'Pendant'
                    ? stepsData1
                    : stepsData2
            )?.map(step => {
                if (step?.step2Data !== undefined) {
                    return {
                        totalPrice: updatedStep1?.[0]?.Setting === "Earring" && updatedStep1?.[0]?.Status === 'active' ? totalPrice : "",
                        step2Data: settingSteps[0]?.Setting === 'Earring'
                            ? [
                                { ...singleDiaData?.[0] },
                                { ...singleDiaData?.[1] }
                            ]
                            : singleDiaData, // Otherwise, store all records
                        id: updatedStep1?.[0]?.Setting === "Ring" && updatedStep1?.[0]?.Status === 'active'
                            ? 1
                            : updatedStep1?.[0]?.Setting === "Pendant" && updatedStep1?.[0]?.Status === 'active'
                                ? 2
                                : 3
                    };
                }
                return step;
            });

            if (!updatedStepData.some(step => step?.step2Data !== undefined)) {
                updatedStepData.push({
                    totalPrice: updatedStep1?.[0]?.Setting === "Earring" && updatedStep1?.[0]?.Status === 'active' ? totalPrice : "",
                    "step2Data": settingSteps[0]?.Setting === 'Earring'
                        ? [
                            { ...singleDiaData?.[0] },
                            { ...singleDiaData?.[1] }
                        ]
                        : singleDiaData,
                    id: updatedStep1?.[0]?.Setting === "Ring" && updatedStep1?.[0]?.Status === 'active' ? 1 : updatedStep1?.[0]?.Setting === "Pendant" && updatedStep1?.[0]?.Status === 'active' ? 2 : 3
                });
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
                sessionStorage.setItem('isRing', true)
                sessionStorage.removeItem('isPair')
                sessionStorage.removeItem('isPendant')
                sessionStorage.setItem('ShapeRingFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${shape}/M=${filterKeyVal}`))
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
                sessionStorage.setItem('isPendant', true)
                sessionStorage.removeItem('isPair')
                sessionStorage.removeItem('isRing')
                sessionStorage.setItem('ShapePendantFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${shape}/M=${filterKeyVal}`))
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
            const shapeName2 = singleDiaData?.[1]?.shapename;
            const formattedShapeName = shapeName1 ? shapeName1.charAt(0).toUpperCase() + shapeName1.slice(1).toLowerCase() : '';
            const formattedShapeName1 = shapeName2 ? shapeName2.charAt(0).toUpperCase() + shapeName2.slice(1).toLowerCase() : '';

            // Calculate totalPrice
            const totalPrice = (singleDiaData?.[0]?.priceIncTax ?? 0) + (singleDiaData?.[1]?.priceIncTax ?? 0);

            if (formattedShapeName == formattedShapeName1) {
                if (updatedStep1?.[0]?.shape === "All" || updatedStep1?.[0]?.shape === null || updatedStep1?.[0]?.shape === undefined) {
                    updatedStep1[0].shape = formattedShapeName ?? "";
                }
            }

            // If no existing step2, add new entry
            if (!updatedStep1.some(step => step.step2 !== undefined)) {
                updatedStep1.push({ "step2": true, "Setting": 'Earring' });
            }
            const step1Data = [{
                totalPrice,
                step1Data: [
                    { ...singleDiaData?.[0] },
                    { ...singleDiaData?.[1] },
                ]
            }];
            sessionStorage.setItem('custStepData', JSON.stringify(step1Data));
            sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));

            if (stepData?.[1]?.step2Data.id > 0) {
                navigate(`d/setting-complete-product/det345/?p=${step1?.[2]?.url}`);
            }
            else {
                sessionStorage.setItem('isPair', true)
                sessionStorage.removeItem('isRing')
                sessionStorage.removeItem('isPendant')
                sessionStorage.setItem('ShapeEarringFlowUrl', JSON.stringify(`/certified-loose-lab-grown-diamonds/settings/Earring/diamond_shape=${formattedShapeName}/M=${filterKeyVal}`))
                navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/diamond_shape=${formattedShapeName}/M=${filterKeyVal}`);
            }
        }

        if (value === 'hasData') {
            const step1 = JSON.parse(sessionStorage.getItem("customizeSteps")) || {};
            const stepData = JSON.parse(sessionStorage.getItem("custStepData")) || [];
            const step3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));

            // Calculate totalPrice
            const totalPrice = (singleDiaData?.[0]?.priceIncTax ?? 0) + (singleDiaData?.[1]?.priceIncTax ?? 0);

            const step1Index = stepData.findIndex(item => item.step1Data !== undefined);

            const updatedStepData = [...stepData];
            if (step1Index !== -1) {
                updatedStepData[step1Index] = { step1Data: singleDiaData, totalPrice: (step3?.[0]?.Status === 'active' || step1?.[1]?.Setting === "Earring") ? totalPrice : "" };
            } else {
                updatedStepData.unshift({ step1Data: singleDiaData, totalPrice: (step3?.[0]?.Status === 'active' || step1?.[1]?.Setting === "Earring") ? totalPrice : "" });
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
    }, [location?.key])

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

    const diaArrData1 = [
        {
            title: "Shape",
            value: `${singleDiaData[1]?.shapename}`
        },
        {
            title: 'carat weight',
            value: `${singleDiaData[1]?.carat !== '' ? Number(singleDiaData[1]?.carat).toFixed(2) : '0.00'}`,
        },
        {
            title: 'color',
            value: `${singleDiaData[1]?.colorname}`,
        },
        {
            title: 'clarity',
            value: `${singleDiaData[1]?.clarityname}`,
        },
        {
            title: 'cut',
            value: `${singleDiaData[1]?.cutname}`,
        },
        {
            title: 'polish',
            value: `${singleDiaData[1]?.polishname}`,
        },
        {
            title: 'symmetry',
            value: `${singleDiaData[1]?.symmetryname}`,
        },
        {
            title: 'Fluorescence',
            value: `${singleDiaData[1]?.fluorescencename}`,
        },
        {
            title: 'l/w/d (mm)',
            value: `${singleDiaData[1]?.measurements ?? `0.00 X 0.00 X 0.00`}`.replace(/X/g, ' X '),
        },
    ]
    const diaArrData2 = [
        {
            title: "l/w ratio",
            value: `${Number(1.00).toFixed(2) ?? 0.00}`
        },
        {
            title: 'depth %',
            value: `${singleDiaData[1]?.depth !== '' ? Number(singleDiaData[1]?.depth).toFixed(2) : '0.00'}%`,
        },
        {
            title: 'table %',
            value: `${singleDiaData[1]?.table !== '' ? Number(singleDiaData[1]?.table).toFixed(2) : '0.00'}%`,
        },
        {
            title: 'culet',
            value: `${singleDiaData[1]?.culetname}`,
        },
        {
            title: 'certificate',
            value: `${singleDiaData[1]?.certyname}`,
        },
        {
            title: 'crown ∠',
            value: `${singleDiaData[1]?.CrownAngle !== '' ? Number(singleDiaData[1]?.CrownAngle).toFixed(3) : '0.000'}`,
        },
        {
            title: 'crown %',
            value: `${singleDiaData[1]?.CrownHeight !== '' ? Number(singleDiaData[1]?.CrownHeight).toFixed(3) : '0.000'}`,
        },
        {
            title: 'pavilion ∠',
            value: `${singleDiaData[1]?.PavillionAngle !== '' ? Number(singleDiaData[1]?.PavillionAngle).toFixed(2) : '0.00'}`,
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

    const isEarring = isPair;

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
                    <div className="for_DiamondDet_container_div" style={{ flexDirection: (mobileView) ? "column" : "row" }}>
                        {(isEarring === true && !compSet) ? (
                            <>
                                {!mobileView ? (
                                    <div className="for_DiamondDet_left_prodImages_for_earr">
                                        <div className='for_DiamondDet_wishList_mainDiv'>
                                            <div className='for_DiamondDet_breadcrums_div'>
                                                <span onClick={() => navigate('/')}>Home/</span>
                                                <span> Matching-Diamonds</span>
                                            </div>
                                            <div className='for_DiamondDet_wishlist_div'>
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
                                                        onChange={(e) => handleButtonChange('wish', e, [singleDiaData[0]?.stockno, singleDiaData[1]?.stockno], "", "")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='for_DiamondDet_earring_main_div'>
                                            <div className="for_slider_container_1" style={{ maxWidth: isDataFound ? "38rem" : "42rem" }}>
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
                                                                <Skeleton variant='square' className='for_skeleton_main_image_1' />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="for_slider">

                                                                {!compSet && (
                                                                    <>
                                                                        {mediaArr
                                                                            ?.filter(item => item?.type === 'image' && item?.src !== imageNotFound) // Only filter image types and avoid imageNotFound
                                                                            ?.map((item, index) => {
                                                                                const fallbackImage = getdiaImages(singleDiaData?.[0]?.shapename);
                                                                                const imageSrc = item?.src || fallbackImage; // Use fallback if src is empty
                                                                                const isActive = index === currentSlide;

                                                                                return (
                                                                                    <div
                                                                                        key={index}
                                                                                        className={`for_box ${isActive ? 'active' : ""}`}
                                                                                        onClick={() => handleThumbnailClick(index)}
                                                                                    >
                                                                                        <img
                                                                                            title="A small thumbnail of the selected diamond."
                                                                                            src={imageSrc}
                                                                                            alt="Thumbnail"
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound;
                                                                                            }}
                                                                                        />
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
                                                                                    alt="Diamond Certificate"
                                                                                    style={{
                                                                                        width: '100%',
                                                                                        height: certyLink?.certyName === 'HRD' ? '4rem' : 'auto',
                                                                                    }}
                                                                                    onError={(e) => {
                                                                                        e.target.onerror = null;
                                                                                        e.target.src = imageNotFound;
                                                                                    }}
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
                                                                            ?.filter(item => item?.type === 'image' && item?.src !== imageNotFound) // Filter only images that are not "imageNotFound"
                                                                            ?.map((item, index) => {
                                                                                const fallbackImage = getdiaImages(singleDiaData?.[0]?.shapename);
                                                                                const imageSrc = item?.src || fallbackImage; // Use fallback if src is empty

                                                                                return (
                                                                                    <div className="for_slider_card" key={index}>
                                                                                        <div className="for_image">
                                                                                            <img
                                                                                                loading="lazy"
                                                                                                src={imageSrc}
                                                                                                alt=""
                                                                                                onLoad={() => setIsImageLoad(false)}
                                                                                                onError={(e) => {
                                                                                                    e.target.onerror = null;
                                                                                                    e.target.src = imageNotFound;
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                    </Slider>
                                                                )}

                                                                <div className="for_DiamondDet_right_prodDetails_earr">
                                                                    <div className="for_DiamondDet_breadcrumbs">
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
                                                                                    <div className='for_DiamondDet_sku'>SKU: &nbsp;{isDataFound ? <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} /> : singleDiaData[0]?.stockno}</div>
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
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="for_slider_container_2" style={{ maxWidth: "40rem" }}>
                                                <div className="for_images_slider">
                                                    {isDataFound ? (
                                                        <>
                                                            <div
                                                                className="for_main_image"
                                                            >
                                                                <Skeleton variant='square' className='for_skeleton_main_image_2' />
                                                            </div>
                                                            <div className="for_slider">
                                                                {Array.from({ length: 3 })?.map((_, i) => {
                                                                    return (
                                                                        <div key={i} className='for_skeleton_thumb_div_dia' >
                                                                            <Skeleton className='for_skeleton_det_thumb_dia' />
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>

                                                            <div className="for_main_image">
                                                                {!compSet && (
                                                                    <Slider {...settings} ref={sliderRef1} lazyLoad="progressive">
                                                                        {mediaArr1
                                                                            ?.filter(item => item?.type === 'image' && item?.src !== imageNotFound) // Filter only images that are not "imageNotFound"
                                                                            ?.map((item, index) => {
                                                                                const fallbackImage = getdiaImages(singleDiaData?.[1]?.shapename);
                                                                                const imageSrc = item?.src || fallbackImage; // Use fallback if src is empty

                                                                                return (
                                                                                    <div className="for_slider_card" key={index}>
                                                                                        <div className="for_image">
                                                                                            <img
                                                                                                loading="lazy"
                                                                                                src={imageSrc}
                                                                                                alt=""
                                                                                                onLoad={() => setIsImageLoad(false)}
                                                                                                onError={(e) => {
                                                                                                    e.target.onerror = null;
                                                                                                    e.target.src = imageNotFound;
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                    </Slider>
                                                                )}


                                                                <div className="for_DiamondDet_right_prodDetails_earr">
                                                                    <div className="for_DiamondDet_breadcrumbs">
                                                                        <div className="for_DiamondDet_title_main_div">
                                                                            <div className="for_DiamondDet_title_div">
                                                                                {isDataFound ?
                                                                                    <Skeleton variant="rounded" style={{ height: '30px', width: '32rem' }} />
                                                                                    : (
                                                                                        <div className="for_DiamondDet_title">
                                                                                            <span>{`${singleDiaData[1]?.carat} Carat ${singleDiaData[1]?.colorname} ${singleDiaData[1]?.clarityname} ${singleDiaData[1]?.cutname} Cut ${singleDiaData[1]?.shapename} Diamond`}</span>
                                                                                            {/* <span>{singleProd?.designno} {singleProd?.TitleLine?.length > 0 && " - " + singleProd?.TitleLine}</span> */}
                                                                                        </div>
                                                                                    )
                                                                                }

                                                                                <div className="for_DiamondDet_title_sku">
                                                                                    <div className='for_DiamondDet_sku'>SKU: &nbsp;{isDataFound ? <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} /> : singleDiaData[1]?.stockno}</div>
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
                                                                                        <span>&nbsp;{formatter(singleDiaData[1]?.price)}</span>
                                                                                    // <span>&nbsp;{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp)}</span>
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="for_slider">

                                                                {!compSet && (
                                                                    <>
                                                                        {mediaArr1
                                                                            ?.filter(item => item?.type === 'image' && item?.src !== imageNotFound) // Only filter image types and avoid imageNotFound
                                                                            ?.map((item, index) => {
                                                                                const fallbackImage = getdiaImages(singleDiaData?.[1]?.shapename);
                                                                                const imageSrc = item?.src || fallbackImage; // Use fallback if src is empty
                                                                                const isActive = index === currentSlide;

                                                                                return (
                                                                                    <div
                                                                                        key={index}
                                                                                        className={`for_box ${isActive ? 'active' : ""}`}
                                                                                        onClick={() => handleThumbnailClick1(index)}
                                                                                    >
                                                                                        <img
                                                                                            title="A small thumbnail of the selected diamond."
                                                                                            src={imageSrc}
                                                                                            alt="Thumbnail"
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound;
                                                                                            }}
                                                                                        />
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

                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="for_diaearr_container_3">
                                            <div className="for_DiamondDet_Total_price_div">
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: decodeEntities(loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode),
                                                    }}
                                                />
                                                {
                                                    isPriceloading ?
                                                        <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                                                        :
                                                        <span>{totalDiaprice}</span>
                                                }
                                            </div>
                                            <div className='for_DiamondDet_earr_desc'>
                                                <p>Forevery’s custom matching diamonds give you the freedom to choose your preferred diamonds and create a unique earring set that complements your style. Elegance and individuality go hand-in-hand with this personalized touch to your fine jewelry collection.</p>
                                            </div>
                                            <div className="for_DiamondDet_choose_Dia__earr_div">
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
                                                                <Modal open={showModal} handleClose={handleClose} handleButtonChange={handleButtonChange} stockno1={singleDiaData[0]?.stockno} stockno2={singleDiaData[1]?.stockno} shape1={singleDiaData[0]?.shapename}
                                                                    shape2={singleDiaData[1]?.shapename} isPair={true} isRingFlowOn={isRingFlowOn} isPendantFlowOn={isPendantFlowOn} isEarringFlowOn={isEarringFlowOn} />
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <div className='for_DiamondDet_shipping_earr_div'>
                                                <div className="for_DiamondDet_shipping_fee_div">
                                                    <div className="for_DiamondDet_shipping_icon">
                                                        <img className='for_DiamondDet_shipp_image' src={`${storImagePath()}/images/ProductListing/Shipping/shipping-cart.png`} alt='shipping-icon' ></img>
                                                    </div>
                                                    <div className="for_DiamondDet_shipp_desc">
                                                        <span className='for_shipp_desc_title_1'>Free shipping, free 30 days return</span>
                                                    </div>
                                                </div>
                                                <div className="for_DiamondDet_calender_div">
                                                    <div className="for_DiamondDet_calender_icon">
                                                        <img className='for_DiamondDet_calender_image' src={`${storImagePath()}/images/ProductListing/Shipping/calendar.png`} alt='calender-icon' ></img>
                                                    </div>
                                                    <div className="for_DiamondDet_calender_desc">
                                                        <span className='for_calender_desc_title_1'>order now and your order shipped by</span>
                                                        <span className='for_calender_desc_title_2'>Tuesday , August 20 depending on center diamonds</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="for_DiamondDet_left_prodImages_for_earr_mob">
                                        <div className='for_DiamondDet_wishList_mainDiv_mob'>
                                            <div className='for_DiamondDet_breadcrums_div'>
                                                <span onClick={() => navigate('/')}>Home/</span>
                                                <span> Matching-Diamonds</span>
                                            </div>
                                            <div className='for_DiamondDet_wishlist_div'>
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
                                                        onChange={(e) => handleButtonChange('wish', e, [singleDiaData[0]?.stockno, singleDiaData[1]?.stockno], "", "")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='for_DiamondDet_earring_main_div_mob'>
                                            <div className="for_slider_container_1" style={{ maxWidth: isDataFound ? "38rem" : "42rem" }}>
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
                                                                <Skeleton variant='square' className='for_skeleton_main_image_1' />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="for_slider">

                                                                {!compSet && (
                                                                    <>
                                                                        {mediaArr
                                                                            ?.filter(item => item?.type === 'image' && item?.src !== imageNotFound) // Only filter image types and avoid imageNotFound
                                                                            ?.map((item, index) => {
                                                                                const fallbackImage = getdiaImages(singleDiaData?.[0]?.shapename);
                                                                                const imageSrc = item?.src || fallbackImage; // Use fallback if src is empty
                                                                                const isActive = index === currentSlide;

                                                                                return (
                                                                                    <div
                                                                                        key={index}
                                                                                        className={`for_box ${isActive ? 'active' : ""}`}
                                                                                        onClick={() => handleThumbnailClick(index)}
                                                                                    >
                                                                                        <img
                                                                                            title="A small thumbnail of the selected diamond."
                                                                                            src={imageSrc}
                                                                                            alt="Thumbnail"
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound;
                                                                                            }}
                                                                                        />
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
                                                                                    alt="Diamond Certificate"
                                                                                    style={{
                                                                                        width: '100%',
                                                                                        height: certyLink?.certyName === 'HRD' ? '4rem' : 'auto',
                                                                                    }}
                                                                                    onError={(e) => {
                                                                                        e.target.onerror = null;
                                                                                        e.target.src = imageNotFound;
                                                                                    }}
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
                                                                            ?.filter(item => item?.type === 'image' && item?.src !== imageNotFound) // Filter only images that are not "imageNotFound"
                                                                            ?.map((item, index) => {
                                                                                const fallbackImage = getdiaImages(singleDiaData?.[0]?.shapename);
                                                                                const imageSrc = item?.src || fallbackImage; // Use fallback if src is empty

                                                                                return (
                                                                                    <div className="for_slider_card" key={index}>
                                                                                        <div className="for_image">
                                                                                            <img
                                                                                                loading="lazy"
                                                                                                src={imageSrc}
                                                                                                alt=""
                                                                                                onLoad={() => setIsImageLoad(false)}
                                                                                                onError={(e) => {
                                                                                                    e.target.onerror = null;
                                                                                                    e.target.src = imageNotFound;
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                    </Slider>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="for_DiamondDet_right_prodDetails_earr">
                                                    <div className="for_DiamondDet_breadcrumbs">
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
                                                                    <div className='for_DiamondDet_sku'>SKU: &nbsp;{isDataFound ? <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} /> : singleDiaData[0]?.stockno}</div>
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
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="for_slider_container_2" style={{ maxWidth: "40rem" }}>
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
                                                                <Skeleton variant='square' className='for_skeleton_main_image_2' />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>

                                                            <div className="for_main_image">
                                                                {!compSet && (
                                                                    <Slider {...settings} ref={sliderRef1} lazyLoad="progressive">
                                                                        {mediaArr1
                                                                            ?.filter(item => item?.type === 'image' && item?.src !== imageNotFound) // Filter only images that are not "imageNotFound"
                                                                            ?.map((item, index) => {
                                                                                const fallbackImage = getdiaImages(singleDiaData?.[1]?.shapename);
                                                                                const imageSrc = item?.src || fallbackImage; // Use fallback if src is empty

                                                                                return (
                                                                                    <div className="for_slider_card" key={index}>
                                                                                        <div className="for_image">
                                                                                            <img
                                                                                                loading="lazy"
                                                                                                src={imageSrc}
                                                                                                alt=""
                                                                                                onLoad={() => setIsImageLoad(false)}
                                                                                                onError={(e) => {
                                                                                                    e.target.onerror = null;
                                                                                                    e.target.src = imageNotFound;
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                    </Slider>
                                                                )}



                                                            </div>
                                                            <div className="for_slider">

                                                                {!compSet && (
                                                                    <>
                                                                        {mediaArr1
                                                                            ?.filter(item => item?.type === 'image' && item?.src !== imageNotFound) // Only filter image types and avoid imageNotFound
                                                                            ?.map((item, index) => {
                                                                                const fallbackImage = getdiaImages(singleDiaData?.[1]?.shapename);
                                                                                const imageSrc = item?.src || fallbackImage; // Use fallback if src is empty
                                                                                const isActive = index === currentSlide;

                                                                                return (
                                                                                    <div
                                                                                        key={index}
                                                                                        className={`for_box ${isActive ? 'active' : ""}`}
                                                                                        onClick={() => handleThumbnailClick1(index)}
                                                                                    >
                                                                                        <img
                                                                                            title="A small thumbnail of the selected diamond."
                                                                                            src={imageSrc}
                                                                                            alt="Thumbnail"
                                                                                            onError={(e) => {
                                                                                                e.target.onerror = null;
                                                                                                e.target.src = imageNotFound;
                                                                                            }}
                                                                                        />
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

                                                        </>
                                                    )}
                                                </div>
                                                <div className="for_DiamondDet_right_prodDetails_earr">
                                                    <div className="for_DiamondDet_breadcrumbs">
                                                        <div className="for_DiamondDet_title_main_div">
                                                            <div className="for_DiamondDet_title_div">
                                                                {isDataFound ?
                                                                    <Skeleton variant="rounded" style={{ height: '30px', width: '32rem' }} />
                                                                    : (
                                                                        <div className="for_DiamondDet_title">
                                                                            <span>{`${singleDiaData[1]?.carat} Carat ${singleDiaData[1]?.colorname} ${singleDiaData[1]?.clarityname} ${singleDiaData[1]?.cutname} Cut ${singleDiaData[1]?.shapename} Diamond`}</span>
                                                                            {/* <span>{singleProd?.designno} {singleProd?.TitleLine?.length > 0 && " - " + singleProd?.TitleLine}</span> */}
                                                                        </div>
                                                                    )
                                                                }

                                                                <div className="for_DiamondDet_title_sku">
                                                                    <div className='for_DiamondDet_sku'>SKU: &nbsp;{isDataFound ? <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} /> : singleDiaData[1]?.stockno}</div>
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
                                                                        <span>&nbsp;{formatter(singleDiaData[1]?.price)}</span>
                                                                    // <span>&nbsp;{formatter(singleProd1?.UnitCostWithMarkUp ?? singleProd?.UnitCostWithMarkUp)}</span>
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="for_diaearr_container_3_mob">
                                            <div className="for_DiamondDet_Total_price_div">
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: decodeEntities(loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode),
                                                    }}
                                                />
                                                {
                                                    isPriceloading ?
                                                        <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                                                        :
                                                        <span>{totalDiaprice}</span>
                                                }
                                            </div>
                                            <div className='for_DiamondDet_earr_desc'>
                                                <p>Forevery’s custom matching diamonds give you the freedom to choose your preferred diamonds and create a unique earring set that complements your style. Elegance and individuality go hand-in-hand with this personalized touch to your fine jewelry collection.</p>
                                            </div>
                                            <div className="for_DiamondDet_choose_Dia__earr_div">
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
                                                                <Modal open={showModal} handleClose={handleClose} handleButtonChange={handleButtonChange} stockno1={singleDiaData[0]?.stockno} stockno2={singleDiaData[1]?.stockno} shape1={singleDiaData[0]?.shapename}
                                                                    shape2={singleDiaData[1]?.shapename} isPair={true} isRingFlowOn={isRingFlowOn} isPendantFlowOn={isPendantFlowOn} isEarringFlowOn={isEarringFlowOn} />
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <div className='for_DiamondDet_shipping_earr_div'>
                                                <div className="for_DiamondDet_shipping_fee_div">
                                                    <div className="for_DiamondDet_shipping_icon">
                                                        <img className='for_DiamondDet_shipp_image' src={`${storImagePath()}/images/ProductListing/Shipping/shipping-cart.png`} alt='shipping-icon' ></img>
                                                    </div>
                                                    <div className="for_DiamondDet_shipp_desc">
                                                        <span className='for_shipp_desc_title_1'>Free shipping, free 30 days return</span>
                                                    </div>
                                                </div>
                                                <div className="for_DiamondDet_calender_div">
                                                    <div className="for_DiamondDet_calender_icon">
                                                        <img className='for_DiamondDet_calender_image' src={`${storImagePath()}/images/ProductListing/Shipping/calendar.png`} alt='calender-icon' ></img>
                                                    </div>
                                                    <div className="for_DiamondDet_calender_desc">
                                                        <span className='for_calender_desc_title_1'>order now and your order shipped by</span>
                                                        <span className='for_calender_desc_title_2'>Tuesday , August 20 depending on center diamonds</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </>
                        ) : (
                            <>
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
                                                                        const fallbackImage = getdiaImages(pairShapeName?.[0]);
                                                                        const imageSrc = item?.src || fallbackImage;
                                                                        let dynamicImagePath;
                                                                        if (!imageMap?.colorImage?.includes('undefinedundefined~1')) {
                                                                            if (imageMap?.colorImage !== (getImagePath?.colorImage ?? "")) {
                                                                                dynamicImagePath = getImagePath?.colorImage;
                                                                            } else {
                                                                                dynamicImagePath = imageMap?.colorImage
                                                                            }
                                                                        } else {
                                                                            dynamicImagePath = getImagePath?.colorImage;
                                                                        }
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
                                                                                                    src={dynamicImagePath}
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
                                                                                                    src={imageSrc}
                                                                                                    onError={(e) => {
                                                                                                        e.target.onerror = null;
                                                                                                        e.target.src = imageNotFound
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        )}

                                                                                        {item?.type === "diamond1" && isPair === true && (
                                                                                            <div
                                                                                                className="for_video_box_dia"
                                                                                                style={{ position: "relative" }}
                                                                                            >
                                                                                                <img
                                                                                                    src={imageSrc}
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
                                                                    {(certyLink && !isPair) && (
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

                                                                    {compSettArr?.map((item, index) => {
                                                                        const fallbackImage = getdiaImages(pairShapeName?.[0]);
                                                                        const imageSrc = item?.src || fallbackImage;
                                                                        let dynamicImagePath;
                                                                        if (!imageMap?.colorImage?.includes('undefinedundefined~1')) {
                                                                            if (imageMap?.colorImage !== getImagePath?.colorImage) {
                                                                                dynamicImagePath = getImagePath?.colorImage;
                                                                            } else {
                                                                                dynamicImagePath = imageMap?.colorImage
                                                                            }
                                                                        } else {
                                                                            dynamicImagePath = getImagePath?.colorImage;
                                                                        }
                                                                        return (
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
                                                                                                        src={dynamicImagePath}
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
                                                                                                        src={imageSrc}
                                                                                                        onError={(e) => {
                                                                                                            e.target.onerror = null;
                                                                                                            e.target.src = imageNotFound
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                            )}
                                                                                            {item?.type === "diamond1" && isPair === true && (
                                                                                                <div
                                                                                                    className="for_video_box_dia"
                                                                                                    style={{ position: "relative" }}
                                                                                                >
                                                                                                    <img
                                                                                                        src={imageSrc}
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
                                                                        )
                                                                    })}
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
                                                                <>
                                                                    {compSettArr?.map((item, index) => {
                                                                        const fallbackImage = getdiaImages(pairShapeName?.[0]);
                                                                        const imageSrc = item?.src || fallbackImage;
                                                                        let dynamicImagePath;
                                                                        if (!imageMap?.colorImage?.includes('undefinedundefined~1')) {
                                                                            if (imageMap?.colorImage !== getImagePath?.colorImage) {
                                                                                dynamicImagePath = getImagePath?.colorImage;
                                                                            } else {
                                                                                dynamicImagePath = imageMap?.colorImage
                                                                            }
                                                                        } else {
                                                                            dynamicImagePath = getImagePath?.colorImage;
                                                                        }
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
                                                                                                    src={dynamicImagePath}
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
                                                                                                    src={imageSrc}
                                                                                                    onError={(e) => {
                                                                                                        e.target.onerror = null;
                                                                                                        e.target.src = imageNotFound
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        )}
                                                                                        {item?.type === "diamond1" && isPair === true && (
                                                                                            <div
                                                                                                className="for_video_box_dia_mob"
                                                                                                style={{ position: "relative" }}
                                                                                            >
                                                                                                <img
                                                                                                    src={imageSrc}
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
                                                                    {(certyLink && !isPair) && (
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
                                                                    {compSettArr?.map((item, index) => {
                                                                        const fallbackImage = getdiaImages(pairShapeName?.[0]);
                                                                        const imageSrc = item?.src || fallbackImage;
                                                                        let dynamicImagePath;
                                                                        if (!imageMap?.colorImage?.includes('undefinedundefined~1')) {
                                                                            if (imageMap?.colorImage !== getImagePath?.colorImage) {
                                                                                dynamicImagePath = getImagePath?.colorImage;
                                                                            } else {
                                                                                dynamicImagePath = imageMap?.colorImage
                                                                            }
                                                                        } else {
                                                                            dynamicImagePath = getImagePath?.colorImage;
                                                                        }
                                                                        return (
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
                                                                                                        src={dynamicImagePath}
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
                                                                                                        src={imageSrc}
                                                                                                        onError={(e) => {
                                                                                                            e.target.onerror = null;
                                                                                                            e.target.src = imageNotFound
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                            )}

                                                                                            {item?.type === "diamond1" && isPair === true && (
                                                                                                <div
                                                                                                    className="for_video_box_dia_mob"
                                                                                                    style={{ position: "relative" }}
                                                                                                >
                                                                                                    <img
                                                                                                        src={imageSrc}
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
                                                                        )
                                                                    })}
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
                                                                <Modal open={showModal} handleClose={handleClose} handleButtonChange={handleButtonChange} stockno1={singleDiaData[0]?.stockno} shape1={singleDiaData[0]?.shapename} isPair={false} isRingFlowOn={isRingFlowOn} isPendantFlowOn={isPendantFlowOn} isEarringFlowOn={isEarringFlowOn} />
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
                                                        <Skeleton variant="rounded" style={{ height: '6.5rem', width: '38rem' }} />
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
                                                                    <div className="for_change_setting"
                                                                        onClick={() => { navigate(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[0]?.shape ?? setshape?.[1]?.shape}/M=${filterVal}`) }}
                                                                    >
                                                                        <HiOutlinePencilSquare fontWeight={700} />
                                                                        <span style={{ marginTop: '1px' }}>Change</span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                </div>

                                                <div className="for_Complete_set_Diamond_div">
                                                    {isDataFound ?
                                                        <Skeleton variant="rounded" style={{ height: '6.5rem', width: '38rem' }} />
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
                                                                    <div className="for_change_setting"
                                                                        onClick={() => { navigate(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`) }}
                                                                    >
                                                                        <HiOutlinePencilSquare fontWeight={700} />
                                                                        <span style={{ marginTop: '1px' }}>Change</span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                </div>
                                                {(steps3?.[0]?.Status === 'active' || steps?.[1]?.Setting === 'Earring') && (
                                                    <div className="for_Complete_set_Diamond_div">
                                                        {isDataFound ?
                                                            <Skeleton variant="rounded" style={{ height: '6.5rem', width: '38rem' }} />
                                                            : (
                                                                <>
                                                                    <div className="for_Complete_set_title">
                                                                        <span>{`${diamondData?.step1Data?.[1]?.carat ?? diamondData?.step2Data?.[1]?.carat} Carat ${diamondData?.step1Data?.[1]?.colorname ?? diamondData?.step2Data?.[1]?.colorname} ${diamondData?.step1Data?.[1]?.clarityname ?? diamondData?.step2Data?.[1]?.clarityname} ${diamondData?.step1Data?.[1]?.cutname ?? diamondData?.step2Data?.[1]?.cutname} Cut ${diamondData?.step1Data?.[1]?.shapename ?? diamondData?.step2Data?.[1]?.shapename} Diamond`}</span>
                                                                    </div>

                                                                    <div className="for_Complete_set_title_sku_dia">
                                                                        <div className='for_Complete_set_sku'>SKU: {diamondData?.step1Data?.[0]?.stockno ?? diamondData?.step2Data?.[1]?.stockno}</div>
                                                                    </div>
                                                                    <div className="for_Complete_set_price_div">
                                                                        <div className="for_Complete_set_price">
                                                                            <span>{loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(diamondData?.step1Data?.[1]?.price ?? diamondData?.step2Data?.[1]?.price)}</span>
                                                                        </div>
                                                                        {/* <div className="for_change_setting" onClick={() => { navigate(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`) }}>
                                                                            <HiOutlinePencilSquare fontWeight={700} />
                                                                            <span style={{ marginTop: '1px' }}>Change</span>
                                                                        </div> */}
                                                                    </div>
                                                                </>
                                                            )}
                                                    </div>
                                                )}

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
                                                            <Modal open={showModal} handleClose={handleClose} handleButtonChange={handleButtonChange} stockno1={singleDiaData[0]?.stockno} shape1={singleDiaData[0]?.shapename} isPair={false} isRingFlowOn={isRingFlowOn} isPendantFlowOn={isPendantFlowOn} isEarringFlowOn={isEarringFlowOn} />

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
                            </>
                        )}

                    </div>
                    {(!compSet && isEarring !== true) && (
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
                {(isEarring === true && !compSet) && (
                    <div className='for_DiamondDet_prod_desc_earr_div'>
                        <div className="for_DiamondDet_prod_desc_earr_mainDIv_1">
                            <div className="for_DiamondDet_desc">
                                <span className='for_DiamondDet_desc_title'>General information: SKU: {singleDiaData?.[0]?.stockno}</span>
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
                        <div className="for_DiamondDet_prod_desc_earr_mainDIv_2">
                            <div className="for_DiamondDet_desc">
                                <span className='for_DiamondDet_desc_title'>General information: SKU: {singleDiaData?.[1]?.stockno}</span>
                                {isDataFound ? <Skeleton variant="rounded" style={{ height: '30px', width: '40rem' }} /> : (
                                    <p className='for_DiamondDet_desc_1_para'>{`This ${singleDiaData[1]?.carat} Carat ${singleDiaData[1]?.cutname} Cut ${singleDiaData[1]?.shapename} Shape Diamond ${singleDiaData[1]?.colorname} Color ${singleDiaData[1]?.clarityname} Clarity has a diamond grading report from ${singleDiaData[1]?.certyname}.`}</p>
                                )}
                            </div>
                            <div className="for_DiamondDet_desc_1">
                                <div className="for_DiamondDet_desc_DiaInfo_1">
                                    <span className='for_DiamondDet_desc_title_1'>Diamond information</span>
                                    <div className='for_DiamondDet_desc_div'>
                                        {diaArrData1?.map((item, index) => (
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
                                        {diaArrData2?.map((item, index) => (
                                            <div className="for_Diamond_desc_div" key={index}>
                                                <div className='for_DiamondDet_desc_title_para'>{item?.title}: </div>
                                                <div className='for_DiamondDet_desc_title_para'>{item?.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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
                                <>
                                    {(setshape?.[1]?.Setting === 'Earring' || setshape?.[0]?.Setting === 'Earring') ? (
                                        <div className="for_DiamondDet_trend_coll_banner_div">
                                            <div className="for_trend_coll_details_div">
                                                <div className="for_trend_coll_det_title">
                                                    <div className='for_trenf_coll_tit1'><span>Make her heart race</span></div>
                                                    <div className='for_trenf_coll_tit2'><span>Complete Setting With Earrings</span></div>
                                                    <div className='for_trend_coll_para'>
                                                        <p>We offers a huge lab grown diamonds jewelry collection. Surprise your significant other with a stunning diamond jewelry and a proposal they will never forget. Browse our collection now and find the perfect diamond jewelry for your love story.</p>
                                                    </div>
                                                    <div className="for_trend_coll_btn">
                                                        <button className={`${btnstyle?.btn_for_new} for_trend_jewel_coll_earr ${btnstyle?.btn_15} `}>View all Diamond Earring</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='for_trend_coll_image_div'>
                                                <img className='for_trend_coll_image' src={`${storImagePath()}/images/ProductListing/DiamondDetBanner/earrings.webp`} alt="" />
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

                            )}
                        </>
                    )
                }

            </div >
        </div >
    )
}

export default DiamondDetails

const HandleDrp = forwardRef(({ index, open, handleOpen, data, compSet, getImagePath, totalPairPrice }, ref) => {
    const [storeInit, setStoreInit] = useState({});
    const [loginCurrency, setLoginCurrency] = useState();
    const [metalColor, setMetalColor] = useState([]);
    const [imageMap, setImageMap] = useState({});
    console.log('imageMap: ', imageMap);
    const Navigation = useNavigate();
    const location = useLocation();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [isRing, setIsRing] = useState(false);
    const getShape1 = JSON.parse(sessionStorage.getItem('customizeSteps'))
    const getShape2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'))
    const getShape3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'))
    const getShape4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'))
    const forTabletResp = useMediaQuery('(max-width: 1000px)');

    const isEarring = (JSON?.parse(sessionStorage.getItem('isPair')) && (getShape1?.[1]?.Setting === "Earring") || getShape4?.[0]?.Status === 'active') ?? "";

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

        const shapename = storedSteps?.[0]?.shape ??
            (storedSteps2?.[0]?.Setting === 'Ring' && storedSteps2?.[0]?.Status === 'active' ? storedSteps2?.[1]?.shape
                : storedSteps3?.[0]?.Setting === 'Pendant' && storedSteps3?.[0]?.Status === 'active' ? storedSteps3?.[1]?.shape
                    : storedSteps4?.[1]?.shape);

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
                        sessionStorage.removeItem('ringFlowUrl');
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
                        sessionStorage.removeItem("isPendant");
                        sessionStorage.removeItem("PendantFlowUrl");
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
                        sessionStorage.removeItem("EarringFlowUrl");
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
                        sessionStorage.setItem('isRing', 'true')
                        sessionStorage.removeItem('isPendant')
                        sessionStorage.removeItem('isPair')
                        sessionStorage.removeItem('ringFlowUrl');
                    }
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
                }
                else {
                    sessionStorage.removeItem("custStepData");
                    sessionStorage.removeItem("custStepData2Ring");
                    sessionStorage.removeItem("setImage");
                    sessionStorage.removeItem("isRing");
                    sessionStorage.removeItem('ringFlowUrl');
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

                if (storedData3?.length > 0 && storedSteps3?.[2]?.step3 === true) {
                    storedData.unshift(storedData3?.[1]);
                    sessionStorage.setItem('custStepData', JSON.stringify(storedData));
                    if (storedData?.length > 0) {
                        sessionStorage.removeItem("custStepData2Pendant");
                        sessionStorage.removeItem("setPenImage");
                        sessionStorage.setItem('isPendant', 'true')
                        sessionStorage.removeItem('isRing')
                        sessionStorage.removeItem('isPair')
                        sessionStorage.removeItem('PendantFlowUrl');
                    }
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
                }
                else {
                    sessionStorage.removeItem("custStepData");
                    sessionStorage.removeItem("custStepData2Pendant");
                    sessionStorage.removeItem("setPenImage");
                    sessionStorage.removeItem("isPendant");
                    sessionStorage.removeItem('PendantFlowUrl');
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
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
                        sessionStorage.setItem('isPair', 'true')
                        sessionStorage.removeItem('isPendant')
                        sessionStorage.removeItem('isRing')
                        sessionStorage.removeItem('EarringFlowUrl');
                    }
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "Pendant" : "Earring")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape && storedSteps3?.[0]?.Status === "active" ? storedSteps3?.[1]?.shape : storedSteps4?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "UGVuZGFudC9jYXRlZ29yeQ==" : "RWFycmluZy9jYXRlZ29yeQ==")} `, { replace: true });
                }
                else {
                    sessionStorage.removeItem("custStepData");
                    sessionStorage.removeItem("custStepData2Earring");
                    sessionStorage.removeItem("setEarImage");
                    sessionStorage.removeItem("isPair");
                    sessionStorage.removeItem('EarringFlowUrl');
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "Pendant" : "Earring")}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "UGVuZGFudC9jYXRlZ29yeQ==" : "RWFycmluZy9jYXRlZ29yeQ==")} `, { replace: true });
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

                        if (!compSet) {
                            if (storedSteps?.length > 0 && storedSteps?.[2]?.step3 === true) {
                                storedSteps2.unshift(step1, step2);
                                sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(storedSteps2));
                                if (storedSteps2?.length > 0) {
                                    sessionStorage.removeItem("customizeSteps");
                                    sessionStorage.removeItem("custStepData");
                                    sessionStorage.removeItem("ShapeRingFlowUrl");
                                }
                            }
                            else {
                                sessionStorage.removeItem("customizeSteps");
                                sessionStorage.removeItem("custStepData");
                                sessionStorage.removeItem("ShapeRingFlowUrl");
                                sessionStorage.removeItem("customizeSteps2Ring");
                            }
                        } else {
                            storedSteps2.unshift(step1, step2);
                            sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(storedSteps2));

                            if (storedSteps2?.length > 0) {
                                sessionStorage.removeItem("customizeSteps");
                                sessionStorage.removeItem("custStepData");
                                sessionStorage.removeItem("ShapeRingFlowUrl");
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
                                    sessionStorage.removeItem("custStepData");
                                    sessionStorage.removeItem("ShapePendantFlowUrl");
                                }
                            }
                            else {
                                sessionStorage.removeItem("customizeSteps");
                                sessionStorage.removeItem("custStepData");
                                sessionStorage.removeItem("ShapePendantFlowUrl");
                                sessionStorage.removeItem("customizeSteps2Pendant");
                            }
                        } else {
                            storedSteps2.unshift(step1, step2);
                            sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(storedSteps2));

                            if (storedSteps2?.length > 0) {
                                sessionStorage.removeItem("customizeSteps");
                                sessionStorage.removeItem("custStepData");
                                sessionStorage.removeItem("ShapePendantFlowUrl");
                            }
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

                        if (!compSet) {
                            if (storedSteps?.length > 0 && storedSteps?.[2]?.step3 === true) {
                                storedSteps3.unshift(step1, step2);
                                sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(storedSteps3));
                                if (storedSteps3?.length > 0) {
                                    sessionStorage.removeItem("customizeSteps");
                                    sessionStorage.removeItem("custStepData");
                                    sessionStorage.removeItem("ShapeEarringFlowUrl");
                                }
                            }
                            else {
                                sessionStorage.removeItem("customizeSteps");
                                sessionStorage.removeItem("custStepData");
                                sessionStorage.removeItem("ShapeEarringFlowUrl");
                                sessionStorage.removeItem("customizeSteps2Earring");
                            }
                        } else {
                            storedSteps3.unshift(step1, step2);
                            sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(storedSteps3));

                            if (storedSteps3?.length > 0) {
                                sessionStorage.removeItem("customizeSteps");
                                sessionStorage.removeItem("custStepData");
                                sessionStorage.removeItem("ShapeEarringFlowUrl");
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
                        sessionStorage.removeItem("custStepData");
                        sessionStorage.removeItem("ShapeRingFlowUrl");
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
                        sessionStorage.removeItem("custStepData");
                        sessionStorage.removeItem("ShapePendantFlowUrl");
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
                        sessionStorage.removeItem("custStepData");
                        sessionStorage.removeItem("ShapEarringFlowUrl");
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
            if (!(data?.stockno || (data?.[0]?.stockno && data?.[1]?.stockno))) {
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

    let dynamicImagePath;
    if (!imageMap?.colorImage?.includes('undefinedundefined~1')) {
        if (imageMap?.colorImage !== getImagePath?.colorImage) {
            dynamicImagePath = getImagePath?.colorImage;
        } else {
            dynamicImagePath = imageMap?.colorImage
        }
    } else {
        dynamicImagePath = getImagePath?.colorImage;
    }
    console.log('dynamicImagePath: ', dynamicImagePath);

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
                            {(data?.[0]?.stockno && data?.[1]?.stockno) && (
                                <div>
                                    <PairSvg />
                                    <PairSvg />
                                </div>
                            )}
                            {!(data?.[0]?.stockno && data?.[1]?.stockno) && (
                                <div className="for_dia_data_image">
                                    <img
                                        src={dynamicImagePath}
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
                                src={data?.stockno ? data?.image_file_url : dynamicImagePath}
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
        </div >
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
    const [SettName, setSettName] = useState();
    const isDiamondPage = compSet || 'det345';
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

    const isRing = JSON?.parse(sessionStorage.getItem('isRing')) ?? "";
    const isPendant = JSON?.parse(sessionStorage.getItem('isPendant')) ?? "";
    const isEarring = JSON?.parse(sessionStorage.getItem('isPair')) ?? "";

    const createUrl = `/d/setting-complete-product/det345/?p=${(getCompleteStep1 ?? getCompleteStep2 ?? getCompleteStep3 ?? getCompleteStep4)?.[2]?.url}`;

    const handleToggle = () => {
        setShowModal(!showModal);
    };

    const handleConfirm = () => {
        Navigation(createUrl);
    }

    const handleRemoveData = (index) => {
        sessionStorage.removeItem("customizeSteps");
        sessionStorage.removeItem("custStepData");
        sessionStorage.removeItem("custStepData2Ring");
        sessionStorage.removeItem("customizeSteps2Ring");
        sessionStorage.removeItem("customizeSteps2Pendant");
        sessionStorage.removeItem("custStepData2Pendant");
        sessionStorage.removeItem("customizeSteps2Earring");
        sessionStorage.removeItem("custStepData2Earring");
        sessionStorage.removeItem("setImage");
        sessionStorage.removeItem("setPenImage");
        sessionStorage.removeItem("setEarImage");
        sessionStorage.removeItem('isPair');
        sessionStorage.removeItem('isPendant');
        sessionStorage.removeItem('isRing');
        if (index === 0) {
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
        }
        else {
            Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
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
            const getSetShape = JSON.parse(sessionStorage.getItem('customizeSteps')) ?? (getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2 :
                getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3 : getCompleteStep4);
            setSetShape(getSetShape);
        }

        const handleDiaSettingName = () => {
            const getSettName = isRing === true ? "Ring" : isPendant === true ? "Pendant" : "Earring";
            setSettName(getSettName)
        }
        handleCompset();
        handleDiaSettingName();
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
                            if ((getCustStepData2?.[2]?.step3 == true || getCustStepData3?.[2]?.step3 == true || getCustStepData4?.[2]?.step3 == true)) {
                                setShowModal(true)
                            } else if ((getCompleteStep2?.[2]?.step3 && getCompleteStep2?.[0]?.Status === "active") ?? (getCompleteStep3?.[2]?.step3 && getCompleteStep3?.[0]?.Status === "active") ?? (getCompleteStep4?.[2]?.step3 && getCompleteStep4?.[0]?.Status === "active")) {
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
                            totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
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
                        <img className="for_shapes_img" src={getCompleteStep4?.[0]?.Status === 'active' ? StepImages[0]?.img1 : StepImages[0]?.img} alt="" /> Diamond
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
                            data={getdiaData4?.[1]?.step2Data ?? getdiaData4?.[0]?.step2Data}
                            totalPairPrice={getdiaData4?.[1]?.totalPrice ?? getdiaData4?.[0]?.totalPrice}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                            compSet={compSet}
                        />
                    )}
                    {getdiaData?.[0]?.step1Data?.[0] && (
                        <HandleDrp
                            index={1}
                            open={open === 'diamond'}
                            handleOpen={() => handleOpen('diamond')}
                            data={isEarring ? getdiaData?.[0]?.step1Data : getdiaData?.[0]?.step1Data?.[0]}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                            compSet={compSet}
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
                {showModal && (
                    <DemountModal open={showModal} handleConfirm={handleConfirm} handleClose={handleToggle} handleRemoveData={handleRemoveData} index={1} createUrl={createUrl} />
                )}
            </>
        );
    };

    return (
        <>
            {getdiaData?.length > 0 || (getCustStepData?.[0]?.step1 === true ?? (getCustStepData2?.[1]?.step2 === true ?? getCustStepData3?.[1]?.step2 === true ?? getCustStepData4?.[1]?.step2 === true)) ? (
                <div className="diamond_Step_data_det">
                    <div className={`step_data ${isActive(isDiamondPage) ? 'active' : ''} d-1`}>
                        <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
                            if (getCustStepData?.[2]?.step3 == true) {
                                setShowModal(true)
                            }
                            // Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                            setswap("diamond");
                        }}>
                            <img src={(getCompleteStep4?.[0]?.Status === 'active' || isEarring === true) ? StepImages[0]?.img1 : StepImages[0]?.img} className='for_shapes_img' alt="" /> Diamond
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
                        {((getdiaData4?.[1]?.step2Data ?? getdiaData4?.[0]?.step2Data) && getCustStepData4?.[0]?.Status === "active") && (
                            <HandleDrp
                                index={0}
                                open={open === 'diamond'}
                                handleOpen={() => handleOpen('diamond')}
                                data={getdiaData4?.[1]?.step2Data ?? getdiaData4?.[0]?.step2Data}
                                ref={(el) => { dropdownRefs.current[1] = el; }}
                                compSet={compSet}
                            />
                        )}
                        {getdiaData?.[0]?.step1Data?.[0] && (
                            <HandleDrp
                                index={0}
                                open={open === 'diamond'}
                                handleOpen={() => handleOpen('diamond')}
                                data={isEarring ? getdiaData?.[1]?.step1Data ?? getdiaData?.[0]?.step1Data : getdiaData?.[0]?.step1Data?.[0]}
                                totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
                                ref={(el) => { dropdownRefs.current[1] = el; }}
                                compSet={compSet}
                            />
                        )}
                    </div>

                    <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
                        <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition}
                            onClick={() => {
                                if (getCompleteStep1?.[1]?.step2 === true) {
                                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
                                    setswap("settings");
                                } else {
                                    if (getCompleteStep1?.[0]?.step1 === true && (getdiaData === null || getdiaData === undefined)) {
                                        sessionStorage.removeItem('customizeSteps');
                                        Navigation(`/certified-loose-lab-grown-diamonds/settings/${SettName}/${(SettName === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : SettName === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
                                        // Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                                    }
                                    // else {
                                    //     Navigation(`/certified-loose-lab-grown-diamonds/settings/${SettName}/${(SettName === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : SettName === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
                                    // }
                                }
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
                                data={(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) ?? getdiaData2?.[0]}
                                ref={(el) => { dropdownRefs.current[0] = el; }}
                                // totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
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
                        {(getdiaData4?.[0]?.step1Data && getCustStepData4?.[0]?.Status === "active") && (
                            <HandleDrp
                                index={1}
                                open={open === 'setting'}
                                handleOpen={() => handleOpen('setting')}
                                data={getdiaData4?.[0]}
                                ref={(el) => { dropdownRefs.current[0] = el; }}
                                totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
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
                        {(compSet || (getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true || getCompleteStep3?.[2]?.step3 == true || getCompleteStep4?.[2]?.step3 == true)) && (
                            <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(
                                getCompleteStep1?.[2]?.price || (getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price
                                    : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active"
                                        ? getCompleteStep3?.[2]?.price
                                        : getCompleteStep4?.[2]?.price && getCompleteStep4?.[0]?.Status === "active"
                                            ? getCompleteStep4?.[2]?.price : ""))}</span>
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
    stockno1,
    stockno2,
    shape1,
    shape2,
    isPair,
    isRingFlowOn,
    isPendantFlowOn,
    isEarringFlowOn
}) => {
    return (
        <>
            {isPair === true ? (
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
                        <div className="for_modal_inner_div_earr">
                            <span className='for_modal_title'>
                                What would you like to do?
                            </span>
                            <div className="for_modal_buttons_div">
                                {isEarringFlowOn === 1 &&
                                    <button onClick={() => {
                                        handleButtonChange('earring', "", [stockno1, stockno2], [shape1, shape2], "");
                                        handleClose();
                                    }}>Add A Earring</button>
                                }
                                <button onClick={() => {
                                    handleButtonChange('cart', "", [stockno1, stockno2], "", "");
                                    handleClose();
                                }}>Add To Cart</button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            ) : (
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
                                {isRingFlowOn === 1 &&
                                    <button onClick={() => {
                                        handleButtonChange('ring', "", stockno1, shape1, "");
                                        handleClose();
                                    }}>Add your diamond to a ring</button>
                                }
                                {isPendantFlowOn === 1 &&
                                    <button onClick={() => { handleButtonChange('pendant', "", stockno1, shape1, ""); handleClose(); }}>add your diamond to a pendant</button>
                                }
                                <button onClick={() => {
                                    handleButtonChange('cart', "", stockno1, "", "");
                                    handleClose();
                                }}>add your diamond to cart</button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

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
