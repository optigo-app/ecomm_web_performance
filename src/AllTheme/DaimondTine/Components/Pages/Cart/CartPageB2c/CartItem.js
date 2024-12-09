import React, { useEffect, useState } from "react";
import "./dt_cartPageB2c.scss";
import QuantitySelector from "./QuantitySelector";
import noImageFound from "../../../Assets/image-not-found.jpg";
import { dt_CartCount } from "../../../Recoil/atom";
import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { formatter } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { Box, CardMedia, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RemarkModal from "../B2bCart/RemarkModal";

const CartItem = ({
  cartData,
  CurrencyData,
  qtyCount,
  CartCardImageFunc,
  decodeEntities,
  handleDecrement,
  handleIncrement,
  onRemoveItem,
  handleMoveToDetail,
  showRemark,
  productRemark,
  handleAddReamrk,
  handleRemarkChange,
  handleSave,
}) => {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(noImageFound);
  const [storeInitData, setStoreInitData] = useState();
  const setCartCountVal = useSetRecoilState(dt_CartCount);
  const [remark, setRemark] = useState(cartData?.Remarks || "");
  const visiterId = Cookies.get("visiterId");
  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInitData(storeinitData);
  }, []);

  const handleRemovecartData = async (cartData) => {
    const returnValue = await onRemoveItem(cartData);
    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      });
    }
  };

  useEffect(() => {
    if (cartData?.ImageCount > 0) {
      CartCardImageFunc(cartData).then((src) => {
        setImageSrc(src);
      });
    } else {
      setImageSrc(noImageFound);
    }
  }, [cartData]);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  }
  const handleRemarkChangeInternal = (e) => {
    setRemark(e.target.value);
    handleRemarkChange(e);
  };

  const handleSaveInternal = () => {
    handleSave(cartData, remark);
    handleClose();
  };

  return (
    <>
      <tr className="modal_main_cart_ietms" >
        <td className="product"
          style={{
            padding: "25px 0"
          }}>
          {imageSrc === undefined ? (
            <CardMedia
              style={{ width: "60%", height: 150 }}
            >
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="100%"
              />
            </CardMedia>
          ) : (
            <img
              src={imageSrc}
              alt={cartData?.name}
              onClick={() => handleMoveToDetail(cartData)}
            />
          )}
          <div className="product-details">
            <p>{cartData?.TitleLine}</p>
          </div>
        </td>
        <td className="Dt_Cartprice">
          {storeInitData?.IsPriceShow == 1 && (
            <span>
              {/* <span
                                    className="smr_currencyFont"
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(
                                            CurrencyData?.Currencysymbol
                                        ),
                                    }}
                                /> */}
              <span className="smr_currencyFont">
                {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
              </span>{" "}
              {formatter(cartData?.UnitCostWithMarkUp)}
            </span>
          )}
        </td>
        <td className="dt_quantity">
          {cartData?.StockId != 0 ? (
            <span>{cartData?.Quantity}</span>
          ) : (
            <QuantitySelector
              cartData={cartData}
              qtyCount={qtyCount}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          )}
        </td>
        <td className="total">
          {storeInitData?.IsPriceShow == 1 && (
            <span>
              {/* <span
                                    className="smr_currencyFont"
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(
                                            CurrencyData?.Currencysymbol
                                        ),
                                    }}
                                /> */}
              <span className="smr_currencyFont">
                {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
              </span>{" "}
              {formatter(cartData?.FinalCost)}
            </span>
          )}
        </td>
        <td className="remove">
          <IconButton onClick={() => handleRemovecartData(cartData)}>
            <CloseIcon />
          </IconButton>
        </td>
        <div className="remark_dt_modal">
          {cartData?.Remarks !== "" && (
            <Typography variant="body2" className="dt_remarktext">
              <span style={{
                fontWeight: "600"
              }}>Remark:</span>{" "}
              {truncateText(cartData?.Remarks || productRemark, 40)}
            </Typography>
          )}
          <Box className="dt_cartbtngroupReRm">
            <Link
              className="dt_ItemRemarkbtn"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              variant="body2"
            >
              {cartData?.Remarks ? "Update Remark" : "Add Remark"}
            </Link>
          </Box>
          <RemarkModal
            open={open}
            onClose={handleClose}
            remark={remark}
            onRemarkChange={handleRemarkChangeInternal}
            onSave={handleSaveInternal}
          />
        </div>
      </tr>

    </>
  );
};

export default CartItem;
