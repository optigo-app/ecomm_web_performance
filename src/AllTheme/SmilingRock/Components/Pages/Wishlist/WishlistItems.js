import React, { useEffect, useState } from "react";
import "./smr_wishlist.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useSetRecoilState } from "recoil";
import { CartCount, WishCount } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import noImageFound from "../../Assets/image-not-found.jpg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { formatter, formatTitleLine } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { Skeleton } from "@mui/material";

const WishlistItems = ({
  item,
  index,
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
  const [isLoading, setisLoading] = useState(true);

  const setWishCountVal = useSetRecoilState(WishCount);
  const setCartCountVal = useSetRecoilState(CartCount);
  const visiterId = Cookies.get("visiterId");

  const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
  const CDNDesignImageFolThumb = storeInit?.CDNDesignImageFolThumb;
  const fullImagePath = `${CDNDesignImageFolThumb}${item?.designno}~1.jpg`;

  // const isLoading = item?.loading;

  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  useEffect(() => {
    const delay = (index + 1) * 100;

    const timer = setTimeout(() => {
      setisLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [index]);

  // useEffect(() => {
  //   if (item?.ImageCount > 0) {
  //     WishCardImageFunc(item).then((src) => {
  //       setImageSrc(src);
  //     });
  //   } else {
  //     setImageSrc(noImageFound);
  //   }
  // }, [item]);

  const handleWishlistToCartFun = async (item) => {
    const returnValue = await handleWishlistToCart(item);
    if (returnValue?.msg == "success") {
      toast.success("Wishlist items added in cart");
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
          className="smr_wlListGrid"
        >
          <Card className="smr_WlListCard">
            <div className="cardContent">
              {isLoading === true ? (
                <CardMedia
                  style={{ width: "100%" }}
                  className="smr_WlListImage"
                >
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{
                      width: {
                        xs: '100%',
                        sm: '260px',      // ~599px
                        md: '270px',      // ~880px
                        lg: '300px',      // ~1050px
                        xl: '365px',      // default
                      },
                      height: {
                        xs: '100%',
                        sm: '260px',      // ~599px
                        md: '270px',      // ~880px
                        lg: '300px',      // ~1050px
                        xl: '365px',      // default
                      },
                      aspectRatio: '1 / 1',
                      backgroundColor: '#e8e8e86e',
                    }}
                  />
                </CardMedia>
              ) : (
                <CardMedia
                  component="img"
                  image={item?.images}
                  alt=" "
                  sx={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    '&:focus': { outline: 'none' },
                    '&:active': { outline: 'none' },
                  }}
                  loading="lazy"
                  className="smr_WlListImage"
                  draggable={true}
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={() => handleMoveToDetail(item)}
                  onError={(e) => {
                    if (item?.ImageCount > 0) {
                      e.target.src = fullImagePath ? fullImagePath : noImageFound
                    } else {
                      e.target.src = noImageFound;
                    }
                  }}
                />
              )}
              <CardContent className="smr_cardContent">
                <div className="cardText">
                  <Typography
                    variant="body2"
                    className="smr_card-ContentData smr_WlTitleline"
                  >
                    {item?.designno != "" && item?.designno}
                    {formatTitleLine(item?.TitleLine) && " - " + item?.TitleLine}
                  </Typography>
                  <Typography variant="body2" className="smr_card-ContentData">
                    {storeInit?.IsGrossWeight == 1 && (
                      <>
                        <span className="smr_wishDT">GWT: </span>
                        {/* <span className='smr_wishDT'>{(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span> */}
                        <span className="smr_wishDT">
                          {(item?.Gwt || 0).toFixed(3)}
                        </span>
                      </>
                    )}
                    {storeInit?.IsMetalWeight == 1 && (
                      <>
                        <span className="smr_pipes"> | </span>
                        <span className="smr_wishDT">NWT: </span>
                        <span className="smr_wishDT">
                          {(item?.Nwt || 0).toFixed(3)}
                        </span>
                      </>
                    )}
                    {storeInit?.IsDiamondWeight == 1 && (
                      <>
                        {(item?.Dwt != "0" || item?.Dpcs != "0") && (
                          <>
                            <span className="smr_pipes"> | </span>
                            <span className="smr_wishDT">DWT: </span>
                            <span>
                              {(item?.Dwt || 0).toFixed(3)} /{item?.Dpcs || 0}
                            </span>
                          </>
                        )}
                      </>
                    )}
                    {storeInit?.IsStoneWeight == 1 && (
                      <>
                        {(item?.CSwt != "0" || item?.CSpcs != "0") && (
                          <>
                            <span className="smr_pipes"> | </span>
                            <span className="smr_wishDT">CWT: </span>
                            <span>
                              {(item?.CSwt || 0).toFixed(3)} /{item?.CSpcs || 0}
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </Typography>
                  <Typography variant="body2" className="smr_card-ContentData">
                    {storeInit?.IsMetalTypeWithColor == 1 && (
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
                    )}
                    {/* <span className="smr_currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currency) }} /> */}
                    {storeInit?.IsPriceShow == 1 && (
                      <>
                        <span className="smr_currencyFont">
                          {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                        </span>{" "}
                        <span>{formatter(item?.FinalCost)}</span>
                      </>
                    )}
                  </Typography>
                </div>
                {/* <div className='designNoWlList'>
                            <p className='smr_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
              </CardContent>
              <div className="smr_Wl-CartbtnDiv">
                <button
                  className="smr_Wl-Cartbtn"
                  onClick={() => handleWishlistToCartFun(item)}
                >
                  {item?.IsInCart != 1 ? "Add to cart +" : "In cart"}
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
          className="smr_wlListGrid"
        >
          <Card className="smr_WlListCard">
            <div className="cardContent">
              {isLoading === true ? (
                <CardMedia
                  style={{ width: "100%" }}
                  className="roop_WlListImage"
                >
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{
                      width: {
                        xs: '100%',
                        sm: '260px',      // ~599px
                        md: '270px',      // ~880px
                        lg: '300px',      // ~1050px
                        xl: '365px',      // default
                      },
                      height: {
                        xs: '100%',
                        sm: '260px',      // ~599px
                        md: '270px',      // ~880px
                        lg: '300px',      // ~1050px
                        xl: '365px',      // default
                      },
                      aspectRatio: '1 / 1',
                      backgroundColor: '#e8e8e86e',
                    }}
                  />
                </CardMedia>
              ) : (
                <CardMedia
                  component="img"
                  image={item?.images}
                  alt={item?.TitleLine}
                  className="smr_WlListImage2"
                  loading="lazy"
                  onClick={() => handleMoveToDetail(item)}
                  onError={(e) => {
                    if (item?.ImageCount > 0) {
                      e.target.src = fullImagePath ? fullImagePath : noImageFound
                    } else {
                      e.target.src = noImageFound;
                    }
                  }}
                />
              )}
              <div className="smr_Wl-CartbtnDiv">
                <button
                  className="smr_Wl-Cartbtn"
                  onClick={() => handleWishlistToCartFun(item)}
                >
                  {item?.IsInCart != 1 ? "Add to cart +" : "In cart"}
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
