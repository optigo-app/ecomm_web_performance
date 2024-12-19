import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import RemarkModal from "./RemarkModal";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import { stam_CartCount } from "../../../Recoil/atom";
import { useSetRecoilState } from "recoil";
import noImageFound from "../../../Assets/image-not-found.jpg";
import { FormControl } from "react-bootstrap";
import Cookies from "js-cookie";
import {
  formatter,
  storImagePath,
} from "../../../../../../utils/Glob_Functions/GlobalFunction";

const CartItem = ({
  item,
  diamondValue,
  itemlength,
  index,
  CartCardImageFunc,
  onSelect,
  CurrencyData,
  decodeEntities,
  isSelected,
  selectedItem,
  selectedItemsLength,
  isActive,
  multiSelect,
  onRemove,
  itemLength,
  showRemark,
  productRemark,
  handleAddRemark,
  handleRemarkChange,
  handleSave,
  handleCancel,
  openHandleUpdateCartModal,
}) => {
  const [imageSrc, setImageSrc] = useState();
  const [open, setOpen] = useState(false);
  const [remark, setRemark] = useState(item?.Remarks || "");
  const [isSelectedItems, setIsSelectedItems] = useState();
  const setCartCountVal = useSetRecoilState(stam_CartCount);
  const [storeInitData, setStoreInitData] = useState();
  const visiterId = Cookies.get('visiterId');
  const maxwidth650px = useMediaQuery('(max-width: 650px)');

  const isLargeScreen = useMediaQuery("(min-width: 1600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 1038px) and (max-width: 1599px)"
  );
  const isMobileScreen = useMediaQuery(
    "(min-width: 320px) and (max-width: 1000px)"
  );

  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInitData(storeinitData);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemarkChangeInternal = (e) => {
    setRemark(e.target.value);
    handleRemarkChange(e);
  };

  const handleSaveInternal = () => {
    handleSave(item, remark);
    handleClose();
  };

  useEffect(() => {
    handleIsSelected();
  }, [isSelected]);

  const handleIsSelected = () => {
    let isselected = selectedItem?.id == item?.id;
    setIsSelectedItems();
  };

  const handleRemoveItem = async (item) => {
    const returnValue = await onRemove(item);
    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      });
    }
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  }

  useEffect(() => {
    if (item?.ImageCount > 0) {
      CartCardImageFunc(item).then((src) => {
        setImageSrc(src);
      });
    } else {
      setImageSrc(noImageFound);
    }
  }, [item]);

  const diamondData = diamondValue?.find(
    (dia) => dia?.stockno == item?.Sol_StockNo
  );

  return (
    <>
      <div
        className="stam3_cartMain-item"
        onClick={() => onSelect(item)}
        style={{
          // boxShadow: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && '0 3px 8px rgba(223, 100, 126, 0.54)'
          boxShadow: "none",
          border:
            !multiSelect &&
            !isMobileScreen &&
            selectedItem?.id == item?.id &&
            "1px solid #7d7f85",
        }}
      >
        <div className="stam3_cart-item">
          <div className="stam3_cart-item__image">
            {imageSrc === undefined ? (
              <CardMedia
                width="85%"
                height={150}
                sx={{
                  width: "85%",
                  height: "150px !important",
                  '@media (max-width: 1000px)': {
                    width: "100%",
                    height: "100px !important",
                  },
                  '@media (max-width: 650px)': {
                    width: "15rem",
                    height: "200px !important",
                  },
                  '@media (max-width: 525px)': {
                    width: "12rem",
                    height: "200px !important",
                  },
                  '@media (max-width: 425px)': {
                    width: "20rem",
                    height: "200px !important",
                  },
                  '@media (max-width: 345px)': {
                    width: "18rem",
                    height: "200px !important",
                  },
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="100%"
                  height="100%"
                />
              </CardMedia>
            ) : (
              <img src={imageSrc} alt='Product-image' />
            )}
          </div>
          <div className="stam3_cart-item__details">
            <h3>
              {item?.designno != "" && item?.designno}
              {(item?.TitleLine != "" && item?.TitleLine != null) && " - " + item?.TitleLine}
            </h3>
            <p>{item?.productDescription}</p>
            {/* {item?.sku != "" &&
            <p>SKU: {item?.sku}</p>
          } */}
            <div className="stam3_weightsContainer">
              {storeInitData?.IsGrossWeight == 1 && (
                <div className="stam3_weightPair">
                  <span className="stam3_weightLabel">Gwt:</span>
                  <span className="stam3_weightValue">
                    {(item?.Gwt || 0)?.toFixed(3)}
                  </span>
                </div>
              )}
              {storeInitData?.IsMetalWeight == 1 && (
                <>
                  {Number(item?.Nwt) !== 0 && (
                    <div className="stam3_weightPair">
                      <span className="stam3_pipe">|</span>
                      <span className="stam3_weightLabel">Nwt:</span>
                      <span className="stam3_weightValue">
                        {(item?.Nwt || 0)?.toFixed(3)}{" "}
                      </span>
                    </div>
                  )}
                </>
              )}
              {storeInitData?.IsDiamondWeight == 1 && (
                <>
                  {(item?.Dwt != "0" || item?.Dpcs != "0") && (
                    <div className="stam3_weightPair">
                      <span className="stam3_pipe">|</span>
                      <span className="stam3_weightLabel">Dwt:</span>
                      <span className="stam3_weightValue">
                        {(item?.Dwt || 0)?.toFixed(3)} / {item?.Dpcs || 0}
                      </span>
                    </div>
                  )}
                </>
              )}
              {storeInitData?.IsGrossWeight == 1 && (
                <>
                  {(item?.CSwt != "0" || item?.CSpcs != "0") && (
                    <div className="stam3_weightPair">
                      <span className="stam3_pipe">|</span>
                      <span className="stam3_weightLabel">Cwt:</span>
                      <span className="stam3_weightValue">
                        {(item?.CSwt || 0)?.toFixed(3)} / {item?.CSpcs || 0}{" "}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
            <div
              style={{ display: "flex" }}
              className="stam3_qtyDiv stam3_qtyDiv_qty"
            >
              <p className="stam3_ringSize">
                Quantity: <span className="stam3_sizeNo">{item?.Quantity}</span>
              </p>
              &nbsp;
              {item?.Size != "" &&
                item?.Size != undefined &&
                item?.Size != null && (
                  <p className="stam3_ringSize">
                    Size: <span className="stam3_sizeNo">{item?.Size}</span>
                  </p>
                )}
            </div>
            {/* <span className="stam3_change-size">CHANGE SIZE</span> */}
          </div>
          {storeInitData?.IsPriceShow == 1 && (
            <div className="stam3_cart-item__price">
              <p> {maxwidth650px && "Price"} {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(item?.UnitCostWithMarkUp)}</p>
              <span className="stam3_price-excl-vat">(Excl. VAT)</span>
            </div>
          )}
          <>
            {storeInitData?.IsPriceShow == 1 && (
              <div className="stam3_cart-item__total-price">
                <p> {maxwidth650px && "Total Price"} {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(item?.FinalCost)}</p>
                <span className="stam3_price-excl-vat">(Excl. VAT)</span>
              </div>
            )}
          </>
          <div className="stam3_cart-item__remove">
            <button
              className="stam3_remove-button"
              onClick={() => handleRemoveItem(item)}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;

