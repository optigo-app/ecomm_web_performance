import React, { useEffect, useState } from "react";
import "./for_wishlist.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import btnstyle from "../../scss/Button.module.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { for_CartCount, for_MatchDiamonds, for_WishCount, for_customizationSteps, for_filterDiamond } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import noImageFound from "../../Assets/image-not-found.jpg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { formatter } from "../../../../../utils/Glob_Functions/GlobalFunction";
import diaImage from "../../Assets/round.png"
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import { CartAndWishListAPI } from "../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import { useNavigate } from "react-router-dom";

const DiamondLitsItems = ({
    item,
    diamondValue,
    itemInCart,
    updateCount,
    countDataUpdted,
    itemsLength,
    matchingDiamonds,
    currency,
    decodeEntities,
    WishCardImageFunc,
    handleRemoveItem,
    handleWishlistToCart,
    handleMoveToDetail,
}) => {
    const [imageSrc, setImageSrc] = useState(noImageFound);
    const setWishCountVal = useSetRecoilState(for_WishCount);
    const setCartCountVal = useSetRecoilState(for_CartCount);
    const [customizeStep, setCustomizeStep] = useRecoilState(for_customizationSteps);
    const visiterId = Cookies.get("visiterId");
    const navigate = useNavigate();
    const [custSteps, setCustSteps] = useState();
    const [custData, setCustData] = useState();
    const steps1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const steps3 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));
    const [filterDia, setfilterDia] = useRecoilState(for_filterDiamond)

    let isPair;
    if ((steps3?.[0]?.Status === 'active' || (steps3?.[2]?.step3 === true || steps1?.[2]?.step3 === true)) && JSON.parse(sessionStorage.getItem('isPair'))) {
        isPair = true;
    } else {
        isPair = false;
    }

    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    // const matchedDiamonds = diamondValue.filter(dia =>
    //     matchingDiamonds.some(diamond => diamond.stockno === dia?.stockno)
    // );

    useEffect(() => {
        setfilterDia(diamondValue);
    }, [])

    const [showModal, setShowModal] = useState(false);

    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };;

    useEffect(() => {
        const step1 = JSON.parse(sessionStorage.getItem("customizeSteps"));
        setCustSteps(step1)
        const stepData = JSON.parse(sessionStorage.getItem("custStepData"));
        setCustData(stepData)
    }, [showModal === true])

    const handleWishlistToCartFun = async (item) => {
        const returnValue = await handleWishlistToCart(item);
        if (returnValue?.msg == "success") {
            toast.success("Wishlist items added in cart")
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            });
        }
    };

    const handleButtonChange = async (value, e, item, stockno, shape) => {

        const isRing = JSON.parse(sessionStorage.getItem('isRing')) ?? "";
        const isPendant = JSON.parse(sessionStorage.getItem('isPendant')) ?? "";

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
            await CartAndWishListAPI('Wish', {}, '', '', stockno).then((res) => {
                console.log(res?.Data?.rd[0])
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

        if (value == 'ring') {

            const addCategory = `Ring/category`;
            const filterKeyVal = btoa(addCategory)
            setCustomizeStep({
                ...customizeStep,
                step2: true,
            })
            const updatedStep1 = custSteps?.map(step => {
                if (step.step2 !== undefined) {
                    return { "step2": true, "Setting": 'Ring' };
                }
                return step;
            });

            if (!updatedStep1?.some(step => step.step2 !== undefined)) {
                updatedStep1?.push({ "step2": true, "Setting": 'Ring' });
            }
            const step1Data = [{ "step1Data": [item] }]
            sessionStorage.setItem('custStepData', JSON.stringify(step1Data));
            sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));

            if (custData?.[1]?.step2Data.id > 0) {
                navigate(`d/setting-complete-product/det/?p=${custSteps?.[2]?.url}`);
            }
            else {
                if (!isRing) {
                    sessionStorage.setItem('isRing', true);
                }
                navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${shape}/M=${filterKeyVal}`);
            }
        }

        if (value == 'pendant') {
            const addCategory = `Pendant/category`;
            const filterKeyVal = btoa(addCategory);
            setCustomizeStep({
                ...customizeStep,
                step2: true,
            })
            const updatedStep1 = custSteps?.map(step => {
                if (step.step2 !== undefined) {
                    return { "step2": true, "Setting": 'Pendant' };
                }
                return step;
            });

            if (!updatedStep1?.some(step => step.step2 !== undefined)) {
                updatedStep1?.push({ "step2": true, "Setting": 'Pendant' });
            }
            const step1Data = [{ "step1Data": [item] }]
            sessionStorage.setItem('custStepData', JSON.stringify(step1Data));
            sessionStorage.setItem("customizeSteps", JSON.stringify(updatedStep1));

            if (custData?.[1]?.step2Data.id > 0) {
                navigate(`d/setting-complete-product/det/?p=${custSteps?.[2]?.url}`);
            }
            else {
                if (!isPendant) {
                    sessionStorage.setItem('isPendant', true);
                }
                navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${shape}/M=${filterKeyVal}`);
            }
        }
    }

    const handleRemoveItemFun = async (item) => {
        const isdiamond = "isdiamond"
        const returnValue = await handleRemoveItem(item, isdiamond);

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

        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setWishCountVal(res?.wishcount);
            });
        }
    };

    useEffect(() => {
        if (item?.ImageCount > 0) {
            WishCardImageFunc(item).then((src) => {
                setImageSrc(src);
            });
        } else {
            setImageSrc(noImageFound);
        }
    }, [item]);

    const handleError = (event) => {
        event.target.src = noImageFound;
    };

    const isEarring = isPair;

    const earringsData = [
        {
            diamond1: {
                image: "https://www.forevery.one/images_new/diamond-sample/round.jpg",
                sku: "2400000695965",
                carat: 0.54,
                color: "VVS1",
                clarity: "Very Good",
                cut: "Round",
            },
            diamond2: {
                image: "https://www.forevery.one/images_new/diamond-sample/round.jpg",
                sku: "240000068999",
                carat: 0.55,
                color: "VVS2",
                clarity: "Very Good",
                cut: "Round",
            },
            price: 290.0,
        },
    ];

    return (
        <>
            {isEarring ? (
                <Grid container spacing={2} className="for_WlListData_earr">
                    {earringsData?.map((pair, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index} className="for_wlListGrid_earr">
                            <Card className="for_WlListCard_earr">
                                <div className="for_cardContent_earr_div">
                                    {/* Diamond 1 */}
                                    <div className="for_cardContentMainDiv_1">
                                        <CardMedia
                                            component="img"
                                            image={pair?.diamond1?.image}
                                            alt={pair?.diamond1?.title || "Diamond 1"}
                                            className="for_WlListImage"
                                            onError={(e) => (e.target.src = "/imageNotFound.png")}
                                        />
                                        <CardContent className="for_cardContent for_diamondImage">
                                            <Typography variant="body2" className="for_card-ContentData">
                                                {pair?.diamond1?.carat} Carat {pair?.diamond1?.color} {pair?.diamond1?.clarity} {pair?.diamond1?.cut} Cut
                                            </Typography>
                                            <Typography variant="body2" className="for_card-ContentData for_WlTitleline">
                                                SKU: {pair?.diamond1?.sku}
                                            </Typography>
                                        </CardContent>
                                    </div>

                                    {/* Diamond 2 */}
                                    <div className="for_cardContentMainDiv_2">
                                        <CardMedia
                                            component="img"
                                            image={pair?.diamond2?.image || "/default-diamond.png"}
                                            alt={pair?.diamond2?.title || "Diamond 2"}
                                            className="for_WlListImage"
                                            onError={(e) => (e.target.src = "/imageNotFound.png")}
                                        />
                                        <CardContent className="for_cardContent for_diamondImage">
                                            <Typography variant="body2" className="for_card-ContentData">
                                                {pair?.diamond2?.carat} Carat {pair?.diamond2?.color} {pair?.diamond2?.clarity} {pair?.diamond2?.cut} Cut
                                            </Typography>
                                            <Typography variant="body2" className="for_card-ContentData for_WlTitleline">
                                                SKU: {pair?.diamond2?.sku}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </div>

                                {/* Price & Select Button */}
                                <div className="for_priceDataDiv">
                                    <span className="for_currencyFont">€{pair?.price}</span>
                                </div>
                                <div className="for_Wl-CartbtnDiv">
                                    <button variant="contained" className={`${btnstyle?.btn_for_new} for_Wl-Cartbtn ${btnstyle?.btn_15}`}>
                                        Select These Diamonds
                                    </button>
                                </div>

                                {/* Remove Button */}
                                <IconButton className="for_closeWlIconDiv" >
                                    <CloseIcon className="closeWlIcon" />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid
                    item
                    xs={diamondValue?.length <= 2 ? 6 : 6}
                    sm={diamondValue?.length <= 2 ? 4 : 4}
                    md={diamondValue?.length <= 2 ? 4 : 4}
                    lg={diamondValue?.length <= 2 ? 3 : 3}
                    xxl={diamondValue?.length <= 2 ? 3 : 2}
                    className="for_wlListGrid"
                >
                    <Card className="for_WlListCard">
                        <div className="for_cardContentMainDiv">
                            <CardMedia
                                component="div"
                                className="for_WlListImage"
                                onClick={() => handleMoveToDetail(item)}
                            >
                                <img
                                    src={item?.image_file_url}
                                    alt={item?.TitleLine}
                                    onError={(e) => e.target.src = noImageFound}
                                    className="for_WlListImage"
                                />
                            </CardMedia>

                            <CardContent className="for_cardContent for_diamondImage">
                                <div className="for_cardText">
                                    <Typography
                                        variant="body2"
                                        className="for_card-ContentData for_WlTitleline"
                                    >
                                        SKU:{" "}{item?.stockno != "" && item?.stockno}
                                    </Typography>
                                    <Typography variant="body2" className="for_card-ContentData">
                                        <span>
                                            {item?.carat?.toFixed(3)}{" "}
                                            Carat {item?.colorname} {item?.clarityname}{" "}
                                            {item?.cutname} Cut {item?.shapename} Diamond
                                        </span>
                                    </Typography>
                                    {/* <Typography variant="body2" className="for_card-ContentData">
                                <span className="for_currencyFont">
                                    {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                </span>{" "}
                                <span>{formatter(item?.price)}</span>
                            </Typography> */}
                                </div>
                            </CardContent>
                            <div className="for_priceDataDiv">
                                <span className="for_currencyFont">
                                    {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                </span>{" "}
                                <span>{formatter(item?.price)}</span>
                            </div>
                            <span className="for_totalcart">
                                {/* {selectedDia && Object.keys(selectedDia).length != 0 &&
                            <>
                                Total carat weight:{" "}{selectedDia?.carat}
                            </>
                        } */}
                            </span>
                            <div className="for_Wl-CartbtnDiv" onClick={handleClickOpen}>
                                <button
                                    className="for_Wl-Cartbtn"
                                // onClick={() => handleWishlistToCartFun(item)}
                                >
                                    {item?.IsInCart != 1 ? "Select This Diamond" : "In cart"}
                                </button>
                            </div>
                        </div>
                        <div
                            className="for_closeWlIconDiv"
                            onClick={(e) => handleRemoveItemFun(item)}
                        >
                            <CloseIcon className="closeWlIcon" />
                        </div>
                    </Card>
                </Grid>
            )}

            <Modal open={showModal} handleClose={handleClose} stockno={item?.stockno} handleButtonChange={handleButtonChange} shape={item?.shapename} item={item} />
        </>
    );
};

export default DiamondLitsItems;

const Modal = ({
    open,
    handleClose,
    stockno,
    handleButtonChange,
    shape,
    item,
}) => {
    useEffect(() => {
        if (open === true) {
            const shapes = [{ "step1": true, 'shape': shape }];
            sessionStorage.setItem('customizeSteps', JSON.stringify(shapes));
        }
    }, [open]);

    return (
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
                            handleButtonChange('ring', "", item, "", shape);
                            handleClose();
                        }}>Add your diamond to a ring</button>
                        <button onClick={() => { handleButtonChange('pendant', "", item, "", shape); handleClose(); }}>Add your diamond to a pendant</button>
                        <button onClick={() => {
                            handleButtonChange('cart', "", "", stockno, "");
                            handleClose();
                        }}>Add your diamond to cart</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
