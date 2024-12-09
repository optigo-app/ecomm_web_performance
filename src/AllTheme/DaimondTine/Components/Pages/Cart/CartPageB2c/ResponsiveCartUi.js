import React, { useEffect, useState } from "react";
import "./dt_cartPageB2c.scss";
import noImageFound from "../../../Assets/image-not-found.jpg";
import QuantitySelector from "./QuantitySelector";
import { Box, IconButton, Typography, Link, CardMedia, Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { dt_CartCount, dt_WishCount } from "../../../Recoil/atom";
import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Usewishlist from "../../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist";
import { toast } from "react-toastify";
import { formatter } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import RemarkModal from "../B2bCart/RemarkModal";

const ResponsiveCartUi = ({
  stat,
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
  handleAddReamrk,
  handleRemarkChange,
  handleSave,
  productRemark
}) => {
  const { handleWishlistToCart } = Usewishlist();

  const [loding, setloding] = useState(false);
  const [imageSrc, setImageSrc] = useState(noImageFound);
  const [storeInitData, setStoreInitData] = useState();
  const setCartCountVal = useSetRecoilState(dt_CartCount);
  const visiterId = Cookies.get("visiterId");
  const loginInfo = JSON.parse(sessionStorage?.getItem("loginUserDetail"));
  const [remark, setRemark] = useState(cartData?.Remarks || "");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage?.getItem("storeInit"));
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
    <div className="dt_res-card-container">
      <div className="dt_res-card">
        {imageSrc === undefined ? (
          <CardMedia
            className="dt_res-card-image"
            style={{ width: "100%" }}
          >
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height={400}
              sx={{
                '@media (max-width: 500px)': {
                  height: "300px !important"
                },
                '@media (max-width: 400px)': {
                  height: "200px !important"
                },
              }}
            />
          </CardMedia>
        ) : (
          <img src={imageSrc} alt="Product Image" className="dt_res-card-image" />
        )}
        <h3 className="dt_res-card-title">
          {cartData?.designno}
          {cartData?.TitleLine != "" && " - " + cartData?.TitleLine}
        </h3>
        <p className="dt_res-card-price">
          {storeInitData?.IsPriceShow == 1 && (
            <span>
              <span className="smr_currencyFont">
                {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
              </span>{" "}
              {formatter(cartData?.FinalCost)}
            </span>
          )}
        </p>
        <QuantitySelector
          cartData={cartData}
          qtyCount={qtyCount}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />

        <div className="dt_closeIconBtnDiv">
          <IconButton
            onClick={() => handleRemovecartData(cartData)}
            className="dt_closeIconBtn"
          >
            <CloseIcon className="dt_closeIcon" />
          </IconButton>
        </div>
        <div className="remark_dt" style={{
          padding: "5px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          {cartData?.Remarks !== "" && (
            <Typography variant="body2" className="dt_remarktext"
              sx={{
                flex: 1
              }}
            >
              <span style={{
                fontWeight: "600"
              }}>Remark:</span>{" "}
              {truncateText(cartData?.Remarks || productRemark, 12)}
            </Typography>
          )}
          <Box className="dt_cartbtngroupReRm"
            sx={{
              flex: 1
            }}>
            <Link
              className="dt_ItemRemarkbtn"
              sx={{
                textDecoration: "none",
                color: "#A8807C",
                fontWeight: "600",
                cursor: "pointer",
              }}
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
      </div>

    </div>
  );
};

export default ResponsiveCartUi;
