import React, { useEffect, useState } from "react";
import "./hoq_wishlist.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useSetRecoilState } from "recoil";
import { Hoq_CartCount, Hoq_WishCount } from "../../../Recoil/atom";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import noImageFound from "../../../Assets/noImageFound.jpg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const WishlistItems = ({
  item,
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
  StoreInit,
}) => {
  const setWishCountVal = useSetRecoilState(Hoq_WishCount);
  const setCartCountVal = useSetRecoilState(Hoq_CartCount);
  const visiterId = Cookies.get("visiterId");
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [imageSrc, setImageSrc] = useState(noImageFound);

  const handleWishlistToCartFun = async (item) => {
    const returnValue = await handleWishlistToCart(item);
    if (returnValue?.msg == "success") {
      toast.success(<Toast/>,{
        hideProgressBar: true, 
        style: {
          borderRadius: "4px",
          padding : '-2px 45px' , 
          boxShadow : `rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px`,
          border  :"2px solid white"
        },
      })
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
    <Grid
      sx={{
        borderRadius: "none",
      }}
      item
      xs={itemsLength <= 2 ? 6 : 6}
      sm={itemsLength <= 2 ? 4 : 4}
      md={itemsLength <= 2 ? 4 : 4}
      lg={itemsLength <= 2 ? 3 : 3}
    >
      <Card className="hoq_WlListCard" square sx={{ border: "none" }}>
        <div className="cardContent">
          <CardMedia
            component="img"
            image={imageSrc}
            alt={item?.TitleLine}
            className="hoq_WlListImage"
            onClick={() => handleMoveToDetail(item)}
          />
          <CardContent
            className="hoq_cardContent"
            sx={{
              padding: "0 0px",
            }}
          >
            <div className="cardText">
              <Typography variant="body2" className="hoq_card-ContentData">
                {item?.TitleLine != "" && item?.TitleLine} {(item?.TitleLine && item?.designno ) && '-'}
                {item?.designno != "" && item?.designno}
              </Typography>
              <Typography variant="body2" className="hoq_card-ContentData-1">
                {StoreInit?.IsGrossWeight == 1 && (
                  <>
                    {" "}
                    <span className="hoq_wishDT">GWT: </span>
                    <span className="hoq_wishDT">
                      {(item?.Gwt || 0).toFixed(3)}
                    </span>
                    <span className="hoq_pipe"> | </span>{" "}
                  </>
                )}
                <span className="hoq_wishDT">NWT : </span>
                <span className="hoq_wishDT">
                  {(item?.Nwt || 0).toFixed(3)}{" "}
                </span>

                { StoreInit?.IsDiamondWeight == 1 && (item?.Dwt != "0" || item?.Dpcs != "0") && (
                  <>
                    {" "}
                    <span className="hoq_pipe"> | </span>
                    <span className="hoq_wishDT">DWT: </span>
                    <span>
                      {(item?.Dwt || 0).toFixed(3)} /{" "}
                      {(item?.Dpcs || 0).toFixed(0)}
                    </span>
                  </>
                )}
                {(item?.CSwt != "0" || item?.CSpcs != "0") && (
                  <>
                    {" "}
                    <span className="hoq_pipe"> | </span>
                    <span className="hoq_wishDT">CWT: </span>
                    <span>
                      {(item?.CSwt || 0).toFixed(3)} /{" "}
                      {(item?.CSpcs || 0).toFixed(0)}{" "}
                    </span>
                  </>
                )}
              </Typography>
              <Typography variant="body2" className="hoq_card-ContentData">
                {item?.metalcolorname !== "" && (
                  <span>{item.metalcolorname}</span>
                )}
                {item?.metalcolorname !== "" && item?.metaltypename !== "" && (
                  <span> - </span>
                )}
                {item?.metaltypename !== "" && (
                  <span>{item?.metaltypename}</span>
                )}
                {StoreInit?.IsPriceShow && <>
                  {" / "}
                <span
                  className="hoq_currencyFont"
                  dangerouslySetInnerHTML={{
                    __html: decodeEntities(
                      loginUserDetail?.CurrencyCode ?? StoreInit?.CurrencyCode
                    ),
                  }}
                />
                {item?.UnitCost !== "" && (
                  <span>{(item?.FinalCost).toLocaleString("en-IN")}</span>
                )}
                </>}
              </Typography>
            </div>
            {/* <div className='designNoWlList'>
                            <p className='hoq_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
          </CardContent>
          <div className="hoq_Wl-CartbtnDiv">
            <button
              className="hoq_Wl-Cartbtn"
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
  );
};

export default WishlistItems;

const Toast = () => (
  <div className="cust_hoq_toast">
    <div className="right">Wishlist items added in Cart.</div>
  </div>
);