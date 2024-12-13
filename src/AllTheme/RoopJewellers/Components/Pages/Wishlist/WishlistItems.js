import React, { useEffect, useState } from "react";
import "./roop_wishlist.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useSetRecoilState } from "recoil";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import noImageFound from "../../Assets/image-not-found.jpg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { formatter } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { roop_CartCount, roop_WishCount } from "../../Recoil/atom";
import { Skeleton } from "@mui/material";

const WishlistItems = ({
    item,
    selectedValue,
    itemInCart,
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
    const [imageSrc, setImageSrc] = useState();

    const setWishCountVal = useSetRecoilState(roop_WishCount);
    const setCartCountVal = useSetRecoilState(roop_CartCount);
    const visiterId = Cookies.get("visiterId");

    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    useEffect(() => {
        if (item?.ImageCount > 0) {
            WishCardImageFunc(item).then((src) => {
                setImageSrc(src);
            });
        } else {
            setImageSrc(noImageFound);
        }
    }, [item]);

    const handleWishlistToCartFun = async (item) => {
        const returnValue = await handleWishlistToCart(item);
        if (returnValue?.msg == "success") {
            // toast.success("Wishlist items added in cart")
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            });
        }
    };

    const handleRemoveItemFun = async (item) => {
        const returnValue = await handleRemoveItem(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setWishCountVal(res?.wishcount);
            });
        }
    };

    return (
        <>
            {selectedValue == 1 ? (
                <Grid
                    item
                    xs={itemsLength <= 2 ? 6 : 6}
                    sm={itemsLength <= 2 ? 4 : 4}
                    md={itemsLength <= 2 ? 4 : 4}
                    lg={itemsLength <= 2 ? 2.4 : 2.4}
                    className="roop_wlListGrid"
                >
                    <Card className="roop_WlListCard">
                        <div className="cardContent">
                            {imageSrc === undefined ? (
                                <CardMedia
                                    style={{ width: "100%" }}
                                    className="roop_WlListImage"
                                >
                                    <Skeleton
                                        animation="wave"
                                        variant="rect"
                                        width="100%"
                                        height={280}
                                        sx={{
                                            backgroundColor: "#e8e8e86e",
                                            '@media (max-width: 600px)': {
                                                height: 200,
                                            },
                                            '@media (max-width: 960px)': {
                                                height: 240,
                                            }
                                        }}
                                    />
                                </CardMedia>
                            ) : (
                                <CardMedia
                                    component="img"
                                    image={imageSrc}
                                    alt={item?.TitleLine}
                                    className="roop_WlListImage"
                                    onClick={() => handleMoveToDetail(item)}
                                />
                            )}
                            <CardContent className="roop_cardContent">
                                <div className="cardText">
                                    <Typography
                                        variant="body2"
                                        className="roop_WlTitleline"
                                    // className="roop_card-ContentData roop_WlTitleline"
                                    >
                                        {item?.designno != "" && item?.designno}
                                        {item?.TitleLine != "" && " - " + item?.TitleLine}
                                    </Typography>
                                    <Typography variant="body2" className="roop_card-ContentData">
                                        <div style={{ display: "flex", flexDirection: "column", gap: '1.3px' }}>
                                            {storeInit?.IsGrossWeight == 1 &&
                                                <>
                                                    <div className="roop_prod_wt_wl">
                                                        <span className="roop_wishDT">GWT: </span>
                                                        {/* <span className='roop_wishDT'>{(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span> */}
                                                        <span className="roop_wishDT">
                                                            {(item?.Gwt || 0).toFixed(3)}
                                                        </span>
                                                    </div>
                                                    {/* <span className="roop_pipes"> | </span> */}
                                                </>
                                            }
                                            {storeInit?.IsMetalWeight == 1 &&
                                                <>
                                                    <div className="roop_prod_wt_wl">
                                                        <span className="roop_wishDT">NWT : </span>
                                                        <span className="roop_wishDT">
                                                            {(item?.Nwt || 0).toFixed(3)}
                                                        </span>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <div className="roop_wish_price">
                                            {storeInit?.IsPriceShow == 1 &&
                                                <>
                                                    <span className="roop_currencyFont">
                                                        {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                    </span>{" "}
                                                    <span>{formatter(item?.FinalCost)}</span>
                                                </>
                                            }
                                        </div>
                                        {/* {storeInit?.IsDiamondWeight == 1 &&
                                            <>
                                                {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                                                    <>
                                                        <span className="roop_pipes"> | </span>
                                                        <span className="roop_wishDT">DWT: </span>
                                                        <span>
                                                            {(item?.Dwt || 0).toFixed(3)} /
                                                            {(item?.Dpcs || 0)}
                                                        </span>
                                                    </>
                                                }
                                            </>
                                        }
                                        {storeInit?.IsStoneWeight == 1 &&
                                            <>
                                                {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                                                    <>
                                                        <span className="roop_pipes"> | </span>
                                                        <span className="roop_wishDT">CWT: </span>
                                                        <span>
                                                            {(item?.CSwt || 0).toFixed(3)} /
                                                            {(item?.CSpcs || 0)}
                                                        </span>
                                                    </>
                                                }
                                            </>
                                        } */}
                                    </Typography>
                                    {/* <Typography variant="body2" className="roop_card-ContentData">
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
                                                {" / "}
                                            </>
                                        } 
                                         {storeInit?.IsPriceShow == 1 &&
                                            <>
                                                <span className="roop_currencyFont">
                                                    {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                </span>{" "}
                                                <span>{formatter(item?.FinalCost)}</span>
                                            </>
                                        }
                                         */}
                                    {/* <span className="roop_currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currency) }} /> */}
                                    {/* </Typography> */}
                                    <div>

                                    </div>
                                </div>
                                {/* <div className='designNoWlList'>
                            <p className='roop_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
                            </CardContent>
                            <div className="roop_Wl-CartbtnDiv">
                                <button
                                    className="roop_Wl-Cartbtn"
                                    onClick={() => handleWishlistToCartFun(item)}
                                >
                                    {item?.IsInCart != 1 ? "Add to cart +" : "in cart"}
                                </button>
                            </div>
                        </div>
                        <div
                            className="closeWlIconDiv"
                            onClick={(e) => handleRemoveItemFun(item)}
                        >
                            <CloseIcon className="closeWlIcon" />
                        </div>
                    </Card>
                </Grid>
            ) : (
                <Grid
                    item
                    xs={itemsLength <= 2 ? 6 : 6}
                    sm={itemsLength <= 2 ? 4 : 3}
                    md={itemsLength <= 2 ? 4 : 2}
                    lg={itemsLength <= 2 ? 3 : 2}
                    className="roop_wlListGrid"
                >
                    <Card className="roop_WlListCard">
                        <div className="cardContent">
                            {/* <CardMedia
                                component="img"
                                image={imageSrc}
                                alt={item?.TitleLine}
                                className="roop_WlListImage2"
                                onClick={() => handleMoveToDetail(item)}
                            /> */}
                            {imageSrc === undefined ? (
                                <CardMedia
                                    style={{ width: "100%" }}
                                    className="roop_WlListImage2"
                                >
                                    <Skeleton
                                        animation="wave"
                                        variant="rect"
                                        width="100%"
                                        height={280}
                                        sx={{
                                            backgroundColor: "#e8e8e86e",
                                            '@media (max-width: 600px)': {
                                                height: 200,
                                            },
                                            '@media (max-width: 960px)': {
                                                height: 240,
                                            }
                                        }}
                                    />
                                </CardMedia>
                            ) : (
                                <CardMedia
                                    component="img"
                                    image={imageSrc}
                                    alt={item?.TitleLine}
                                    className="roop_WlListImage2"
                                    onClick={() => handleMoveToDetail(item)}
                                />
                            )}
                            <div className="roop_Wl-CartbtnDiv">
                                <button
                                    className="roop_Wl-Cartbtn"
                                    onClick={() => handleWishlistToCartFun(item)}
                                >
                                    {item?.IsInCart != 1 ? "Add to cart +" : "in cart"}
                                </button>
                            </div>
                        </div>
                        <div
                            className="closeWlIconDiv"
                            onClick={(e) => handleRemoveItemFun(item)}
                        >
                            <CloseIcon className="closeWlIcon" />
                        </div>
                    </Card>
                </Grid>
            )}
        </>
    );
};

export default WishlistItems;
