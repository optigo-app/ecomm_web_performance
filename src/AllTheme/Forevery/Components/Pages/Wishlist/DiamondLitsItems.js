import React, { useEffect, useState } from "react";
import "./for_wishlist.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState, useSetRecoilState } from "recoil";
import { for_CartCount, for_MatchDiamonds, for_WishCount, for_customizationSteps, for_filterDiamond } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import noImageFound from "../../Assets/image-not-found.jpg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { formatter } from "../../../../../utils/Glob_Functions/GlobalFunction";
import diaImage from "../../Assets/round.png"
import { Dialog, DialogContent } from "@mui/material";
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
    const [filterDia, setfilterDia] = useRecoilState(for_filterDiamond)

    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    console.log('diamondValue: ', diamondValue);

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
                navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${shape}/M=${filterKeyVal}`);
            }
        }
    }

    const handleRemoveItemFun = async (item) => {
        const isdiamond = "isdiamond"
        const returnValue = await handleRemoveItem(item, isdiamond);

        const existingData = JSON.parse(sessionStorage.getItem('custStepData')) || [];
        const existingData1 = JSON.parse(sessionStorage.getItem('custStepData2')) || [];

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

            sessionStorage.setItem('custStepData2', JSON.stringify(updatedData));
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

    return (
        <>
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
                            component="img"
                            image={item?.image_file_url}
                            alt={item?.TitleLine}
                            className="for_WlListImage"
                            onError={handleError}
                        />
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
                                        {item?.carat}{" "}
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
