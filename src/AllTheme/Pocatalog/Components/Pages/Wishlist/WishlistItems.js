import React, { useEffect, useState } from "react";
import "./proCat_wishlist.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useSetRecoilState } from "recoil";
import { proCat_CartCount, proCat_WishCount } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import noImageFound from "../../Assets/image-not-found.jpg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { formatter } from "../../../../../utils/Glob_Functions/GlobalFunction";

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
    const [imageSrc, setImageSrc] = useState(noImageFound);
    const setWishCountVal = useSetRecoilState(proCat_WishCount);
    const setCartCountVal = useSetRecoilState(proCat_CartCount);
    const visiterId = Cookies.get("visiterId");

    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    const handleWishlistToCartFun = async (item) => {
        const returnValue = await handleWishlistToCart(item);
        if (returnValue?.msg == "success") {
            toast.success("Wishlist items added in cart")
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

    useEffect(() => {
        if (item?.ImageCount > 0) {
          WishCardImageFunc(item).then((src) => {
            setImageSrc(src);
          });
        } else {
          setImageSrc(noImageFound);
        }
      }, [item]);

    return (
        <>
            {selectedValue == 1 ? (
                <Grid
                    item
                    xs={itemsLength <= 2 ? 6 : 6}
                    sm={itemsLength <= 2 ? 4 : 4}
                    md={itemsLength <= 2 ? 4 : 4}
                    lg={itemsLength <= 2 ? 3 : 3}
                    className="proCat_wlListGrid"
                >
                    <Card className="proCat_WlListCard">
                        <div className="cardContent">
                            <CardMedia
                                component="img"
                                image={imageSrc}
                                alt={item?.TitleLine}
                                className="proCat_WlListImage"
                                onClick={() => handleMoveToDetail(item)}
                            />
                            <CardContent className="proCat_cardContent">
                                <div className="cardText">
                                    <Typography
                                        variant="body2"
                                        className="proCat_card-ContentData proCat_WlTitleline"
                                    >
                                        {item?.designno != "" && item?.designno}
                                        {item?.TitleLine != "" && " - " + item?.TitleLine}
                                    </Typography>
                                    <Typography variant="body2" className="proCat_card-ContentData">
                                        <span className="proCat_wishDT">GWT: </span>
                                        {/* <span className='proCat_wishDT'>{(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span> */}
                                        <span className="proCat_wishDT">
                                            {(item?.Gwt || 0).toFixed(3)}
                                        </span>

                                        <span className="proCat_pipes"> | </span>
                                        <span className="proCat_wishDT">NWT : </span>
                                        <span className="proCat_wishDT">
                                            {(item?.Nwt || 0).toFixed(3)}
                                        </span>
                                        <span className="proCat_pipes"> | </span>
                                        {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                                            <>
                                                <span className="proCat_wishDT">DWT: </span>
                                                <span>
                                                    {(item?.Dwt || 0).toFixed(3)} /
                                                    {(item?.Dpcs || 0)}
                                                </span>
                                            </>
                                        }
                                        <span className="proCat_pipes"> | </span>
                                        {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                                            <>
                                                <span className="proCat_wishDT">CWT: </span>
                                                <span>
                                                    {(item?.CSwt || 0).toFixed(3)} /
                                                    {(item?.CSpcs || 0)}
                                                </span>
                                            </>
                                        }
                                    </Typography>
                                    <Typography variant="body2" className="proCat_card-ContentData">
                                        {item?.metalcolorname !== "" && (
                                            <span>{item.metalcolorname}</span>
                                        )}
                                        {item?.metalcolorname !== "" &&
                                            item?.metaltypename !== "" && <span> - </span>}
                                        {item?.metaltypename !== "" && (
                                            <span>{item?.metaltypename}</span>
                                        )}
                                        {" / "}
                                        {/* <span className="proCat_currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currency) }} /> */}
                                        <span className="proCat_currencyFont">
                                            {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                        </span>{" "}
                                        <span>{formatter(item?.FinalCost)}</span>
                                    </Typography>
                                </div>
                                {/* <div className='designNoWlList'>
                            <p className='proCat_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
                            </CardContent>
                            <div className="proCat_Wl-CartbtnDiv">
                                <button
                                    className="proCat_Wl-Cartbtn"
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
                    className="proCat_wlListGrid"
                >
                    <Card className="proCat_WlListCard">
                        <div className="cardContent">
                            <CardMedia
                                component="img"
                                image={imageSrc}
                                alt={item?.TitleLine}
                                className="proCat_WlListImage2"
                                onClick={() => handleMoveToDetail(item)}
                            />
                            <div className="proCat_Wl-CartbtnDiv">
                                <button
                                    className="proCat_Wl-Cartbtn"
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
