import React, { useEffect, useState } from "react";
import "./for_wishlist.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState, useSetRecoilState } from "recoil";
import { for_CartCount, for_MatchDiamonds, for_WishCount, for_customizationSteps } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import noImageFound from "../../Assets/image-not-found.jpg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { formatter, formatTitleLine } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { RxCross1 } from "react-icons/rx";
import { Dialog, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartAndWishListAPI } from "../../../../../utils/API/CartAndWishList/CartAndWishListAPI";
import designImage from "../../Assets/ring.png"
import diamondShapeImage from "../../Assets/diamond.png"

const WishlistItems = ({
    item,
    diamondValue,
    itemInCart,
    matchingDiamonds,
    updateCount,
    countDataUpdted,
    itemsLength,
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
    const [selectedDia, setSelectedDia] = useState();
    const visiterId = Cookies.get("visiterId");
    const navigate = useNavigate();
    const [matchDataSet, setmatchDataSet] = useRecoilState(for_MatchDiamonds)
    const steps1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const steps3 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));

    let isPair;
    if ((steps3?.[0]?.Status === 'active' || (steps3?.[2]?.step3 === true || steps1?.[2]?.step3 === true)) && JSON.parse(sessionStorage.getItem('isPair'))) {
        isPair = true;
    } else {
        isPair = false;
    }

    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    const [showModal, setShowModal] = useState(false);

    const matchedDiamonds = diamondValue.filter(dia =>
        matchingDiamonds.some(diamond => diamond.stockno === dia?.stockno)
    );

    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };;

    const handleWishlistToCartFun = async (item) => {
        const returnValue = await handleWishlistToCart(item);
        if (returnValue?.msg == "success") {
            toast.success("Wishlist items added in cart")
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            });
        }
    };

    useEffect(() => {
        setmatchDataSet(matchedDiamonds);
    }, [item])

    const handleRemoveItemFun = async (item) => {
        console.log('matchedDiamonds: ', matchedDiamonds);
        const returnValue = await handleRemoveItem(item);

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

    useEffect(() => {
        setTimeout(() => {
            const diamondCartData = diamondValue?.find((dia) => dia?.stockno == item?.Sol_StockNo);
            setSelectedDia(diamondCartData)
        }, 500);
    }, [item])

    console.log("diamondValueData", selectedDia)

    const isEarring = isPair;
    console.log('isEarring: ', isEarring);
    return (
        <>
            {isEarring && (
                <Grid
                    item
                    xs={itemsLength <= 2 ? 6 : 6}
                    sm={itemsLength <= 2 ? 4 : 4}
                    md={itemsLength <= 2 ? 4 : 4}
                    lg={itemsLength <= 2 ? 3 : 3}
                    xxl={itemsLength <= 2 ? 3 : 2}
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
                                    src={imageSrc}
                                    alt={item?.TitleLine}
                                    onError={(e) => e.target.src = noImageFound}
                                    className="for_WlListImage"
                                />
                            </CardMedia>
                            <CardContent className="for_cardContent">
                                <div className="for_cardText">
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 700 }}
                                        className="for_card-ContentData for_WlTitleline"
                                    >
                                        {selectedDia && Object.keys(selectedDia).length != 0 &&
                                            <img src={designImage} alt="designImage" className="for_diamondDShapeImg" />
                                        }
                                        {item?.designno != "" && item?.designno}
                                        {formatTitleLine(item?.TitleLine) && " - " + item?.TitleLine}
                                    </Typography>
                                    <Typography variant="body2" className="for_card-ContentData" style={{ textAlign: "start" }}>
                                        {storeInit?.IsGrossWeight == 1 &&
                                            <>
                                                <span className="for_wishDT">GWT: </span>
                                                <span className="for_wishDT">
                                                    {(item?.Gwt || 0)?.toFixed(3)}
                                                </span>
                                                <span className="for_pipes"> | </span>
                                            </>
                                        }
                                        {storeInit?.IsMetalWeight == 1 &&
                                            <>
                                                <span className="for_wishDT">NWT: </span>
                                                <span className="for_wishDT">
                                                    {(item?.Nwt || 0)?.toFixed(3)}
                                                </span>
                                            </>
                                        }
                                        {storeInit?.IsDiamondWeight == 1 &&
                                            <>
                                                {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                                                    <>
                                                        <span className="for_pipes"> | </span>
                                                        <span className="for_wishDT">DWT: </span>
                                                        <span>
                                                            {(item?.Dwt || 0)?.toFixed(3)} / {(item?.Dpcs || 0)}
                                                        </span>
                                                    </>
                                                }
                                            </>
                                        }
                                        {storeInit?.IsStoneWeight == 1 &&
                                            <>
                                                {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                                                    <>
                                                        <span className="for_pipes"> | </span>
                                                        <span className="for_wishDT">CWT: </span>
                                                        <span>
                                                            {(item?.CSwt || 0)?.toFixed(3)} / {(item?.CSpcs || 0)}
                                                        </span>
                                                    </>
                                                }{" "}
                                            </>
                                        }
                                    </Typography>
                                    <Typography variant="body2" className="for_card-ContentData" sx={{ fontWeight: 700 }}>
                                        {storeInit?.IsMetalTypeWithColor == 1 &&
                                            <>
                                                {item?.metalcolorname !== "" && (
                                                    <span>{item.metalcolorname}</span>
                                                )}
                                                {item?.metalcolorname !== "" &&
                                                    item?.metaltypename !== "" && <span> - </span>}
                                                {item?.metaltypename !== "" && (
                                                    <span>{item?.metaltypename}</span>
                                                )}
                                            </>
                                        }
                                    </Typography>
                                    {selectedDia && Object.keys(selectedDia).length != 0 &&
                                        <Typography variant="body2" className="for_card-ContentData">
                                            {selectedDia && Object.keys(selectedDia).length != 0 &&
                                                <img src={diamondShapeImage} alt="designImage" className="for_diamondDShapeImg" />
                                            }
                                            <span>
                                                {selectedDia?.carat?.toFixed(3)}{" "}
                                                Carat {selectedDia?.colorname}, {selectedDia?.clarityname},{" "}
                                                {selectedDia?.cutname} Cut, {selectedDia?.shapename} Diamond
                                            </span>
                                        </Typography>
                                    }
                                    {selectedDia && Object.keys(selectedDia).length != 0 &&
                                        <Typography variant="body2" className="for_card-ContentData_1 for_diamondData_1">
                                            {selectedDia && Object.keys(selectedDia).length != 0 &&
                                                <img src={diamondShapeImage} alt="designImage" className="for_diamondDShapeImg" />
                                            }
                                            <span>
                                                {selectedDia?.carat?.toFixed(3)}{" "}
                                                Carat {selectedDia?.colorname}, {selectedDia?.clarityname},{" "}
                                                {selectedDia?.cutname} Cut, {selectedDia?.shapename} Diamond
                                            </span>
                                        </Typography>
                                    }
                                </div>
                            </CardContent>
                            <div className="for_priceDataDiv">
                                <span className="for_currencyFont">
                                    {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                </span>{" "}
                                <span>{formatter(selectedDia && Object.keys(selectedDia).length != 0 ? (selectedDia?.price + item?.FinalCost) : item?.FinalCost)}</span>
                            </div>
                            <span className="for_totalcart">
                                {selectedDia && Object.keys(selectedDia).length != 0 &&
                                    <>
                                        Total carat weight:{" "}{selectedDia?.carat?.toFixed(3)}
                                    </>
                                }

                            </span>

                            <div className="for_Wl-CartbtnDiv">
                                <button
                                    className="for_Wl-Cartbtn"
                                    onClick={() => handleWishlistToCartFun(item)}
                                >
                                    {item?.IsInCart != 1 ? "Add to cart +" : "In cart"}
                                </button>
                            </div>
                        </div>
                        <div
                            className="for_closeWlIconDiv"
                            onClick={(e) => handleRemoveItemFun(item)}
                        >
                            <CloseIcon className="closeWlIcon" />
                        </div>
                    </Card >
                </Grid >
            )}
            <Grid
                item
                xs={itemsLength <= 2 ? 6 : 6}
                sm={itemsLength <= 2 ? 4 : 4}
                md={itemsLength <= 2 ? 4 : 4}
                lg={itemsLength <= 2 ? 3 : 3}
                xxl={itemsLength <= 2 ? 3 : 2}
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
                                src={imageSrc}
                                alt={item?.TitleLine}
                                onError={(e) => e.target.src = noImageFound}
                                className="for_WlListImage"
                            />
                        </CardMedia>
                        <CardContent className="for_cardContent">
                            <div className="for_cardText">
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 700 }}
                                    className="for_card-ContentData for_WlTitleline"
                                >
                                    {selectedDia && Object.keys(selectedDia).length != 0 &&
                                        <img src={designImage} alt="designImage" className="for_diamondDShapeImg" />
                                    }
                                    {item?.designno != "" && item?.designno}
                                    {item?.TitleLine != "" && " - " + item?.TitleLine}
                                </Typography>
                                <Typography variant="body2" className="for_card-ContentData" style={{ textAlign: "start" }}>
                                    {storeInit?.IsGrossWeight == 1 &&
                                        <>
                                            <span className="for_wishDT">GWT: </span>
                                            <span className="for_wishDT">
                                                {(item?.Gwt || 0)?.toFixed(3)}
                                            </span>
                                            <span className="for_pipes"> | </span>
                                        </>
                                    }
                                    {storeInit?.IsMetalWeight == 1 &&
                                        <>
                                            <span className="for_wishDT">NWT: </span>
                                            <span className="for_wishDT">
                                                {(item?.Nwt || 0)?.toFixed(3)}
                                            </span>
                                        </>
                                    }
                                    {storeInit?.IsDiamondWeight == 1 &&
                                        <>
                                            {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                                                <>
                                                    <span className="for_pipes"> | </span>
                                                    <span className="for_wishDT">DWT: </span>
                                                    <span>
                                                        {(item?.Dwt || 0)?.toFixed(3)} / {(item?.Dpcs || 0)}
                                                    </span>
                                                </>
                                            }
                                        </>
                                    }
                                    {storeInit?.IsStoneWeight == 1 &&
                                        <>
                                            {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                                                <>
                                                    <span className="for_pipes"> | </span>
                                                    <span className="for_wishDT">CWT: </span>
                                                    <span>
                                                        {(item?.CSwt || 0)?.toFixed(3)} / {(item?.CSpcs || 0)}
                                                    </span>
                                                </>
                                            }{" "}
                                        </>
                                    }
                                </Typography>
                                <Typography variant="body2" className="for_card-ContentData" sx={{ fontWeight: 700 }}>
                                    {storeInit?.IsMetalTypeWithColor == 1 &&
                                        <>
                                            {item?.metalcolorname !== "" && (
                                                <span>{item.metalcolorname}</span>
                                            )}
                                            {item?.metalcolorname !== "" &&
                                                item?.metaltypename !== "" && <span> - </span>}
                                            {item?.metaltypename !== "" && (
                                                <span>{item?.metaltypename}</span>
                                            )}
                                        </>
                                    }
                                </Typography>
                                {selectedDia && Object.keys(selectedDia).length != 0 &&
                                    <Typography variant="body2" className="for_card-ContentData for_diamondData">
                                        {selectedDia && Object.keys(selectedDia).length != 0 &&
                                            <img src={diamondShapeImage} alt="designImage" className="for_diamondDShapeImg" />
                                        }
                                        <span>
                                            {selectedDia?.carat?.toFixed(3)}{" "}
                                            Carat {selectedDia?.colorname}, {selectedDia?.clarityname},{" "}
                                            {selectedDia?.cutname} Cut, {selectedDia?.shapename} Diamond
                                        </span>
                                    </Typography>
                                }
                            </div>
                        </CardContent>
                        <div className="for_priceDataDiv">
                            <span className="for_currencyFont">
                                {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                            </span>{" "}
                            <span>{formatter(selectedDia && Object.keys(selectedDia).length != 0 ? (selectedDia?.price + item?.FinalCost) : item?.FinalCost)}</span>
                        </div>
                        <span className="for_totalcart">
                            {selectedDia && Object.keys(selectedDia).length != 0 &&
                                <>
                                    Total carat weight:{" "}{selectedDia?.carat?.toFixed(3)}
                                </>
                            }

                        </span>

                        <div className="for_Wl-CartbtnDiv">
                            <button
                                className="for_Wl-Cartbtn"
                                onClick={() => handleWishlistToCartFun(item)}
                            >
                                {item?.IsInCart != 1 ? "Add to cart +" : "In cart"}
                            </button>
                        </div>
                    </div>
                    <div
                        className="for_closeWlIconDiv"
                        onClick={(e) => handleRemoveItemFun(item)}
                    >
                        <CloseIcon className="closeWlIcon" />
                    </div>
                </Card >
            </Grid >
        </>
    );
};

export default WishlistItems;


