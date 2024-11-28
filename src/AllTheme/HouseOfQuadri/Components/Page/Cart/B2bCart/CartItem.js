import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import RemarkModal from "./RemarkModal";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import { Hoq_CartCount } from "../../../Recoil/atom";
import { useSetRecoilState } from "recoil";
import noImageFound from "../../../Assets/noImageFound.jpg";
import Cookies from "js-cookie";

const CartItem = ({
  item,
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
  const visiterId = Cookies.get("visiterId");
  const [imageSrc, setImageSrc] = useState(noImageFound);
  const [open, setOpen] = useState(false);
  const [remark, setRemark] = useState(item.Remarks || "");
  const [isSelectedItems, setIsSelectedItems] = useState();
  const [countstatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(Hoq_CartCount);
  const [storeInitData, setStoreInitData] = useState();
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  const isLargeScreen = useMediaQuery("(min-width: 1600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 1038px) and (max-width: 1599px)"
  );
  const isMobileScreen = useMediaQuery(
    "(min-width: 320px) and (max-width: 1037px)"
  );

  useEffect(() => {
    if (item?.ImageCount > 0) {
      CartCardImageFunc(item).then((src) => {
        setImageSrc(src);
      });
    } else {
      setImageSrc(noImageFound);
    }
  }, [item]);

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInitData(storeinitData);
    const isCartUpdateStatus = sessionStorage.getItem("cartUpdation");
    setCountStatus(isCartUpdateStatus);
  }, [onRemove]);

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

  const [pressing, setPressing] = useState(false);
  const pressTimer = useRef(null);

  // const handlePress = (action) => {
  //   return () => {
  //     // if (!multiSelect && selectedItemsLength === 0) return;
  //     // else if (multiSelect && selectedItemsLength === 0) return;
  //     pressTimer.current = setTimeout(() => {
  //       // openHandleUpdateCartModal();
  //       // console.log('selectedItemsssssss', selectedItemsLength);
  //       alert("Long Pressed Detected...");
  //     }, 5000);
  //     setPressing(action === "start");
  //   };
  // };

  const cancelPress = () => {
    clearTimeout(pressTimer.current);
    setPressing(false);
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  }

  const width =
    isLargeScreen && itemLength <= 3
      ? "390px"
      : isMediumScreen && itemLength <= 3
      ? "330px"
      : isMobileScreen && itemLength == 1
      ? "300px"
      : "100%";

  return (
    <Grid
      item
      xs={12}
      sm={itemLength <= 2 ? 6 : 6}
      md={itemLength <= 2 ? 6 : 6}
      lg={itemLength <= 2 ? 6 : 4}
      xxl={itemLength <= 2 ? 6 : 3}
      className="hoq_cartListCardGrid"
    >
      <Card
        className="hoq_cartListCard"
        key={item?.id}
        sx={{
          boxShadow:
            !multiSelect &&
            !isMobileScreen &&
            selectedItem?.id == item?.id &&
            "#c20000 1px 1px 1px 0px, #c20000 0px 0px 0px 1px !important",
          border: selectedItem?.id == item?.id && '1px solid #c20000',
          // maxWidth: 450,
          // width: width,
        }}
        square
        // onDoubleClick={openHandleUpdateCartModal}

        // onMouseDown={handlePress("start")}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        // onTouchStart={handlePress("start")}
        onTouchEnd={cancelPress}
      >
        <Box
          className="hoq_mui_CartBox"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            image={imageSrc}
            alt={item?.TitleLine}
            className="hoq_cartListImage"
            onClick={() => onSelect(item)}
          />
          <div className="hoq_rightContentDataDiv">
            <CardContent
              className="hoq_cartcontentData"
              onClick={() => onSelect(item)}
            >
              <Typography variant="body2" className="hoq_DesignNoTExt">
                {item?.designno}
              </Typography>
              <div
                className="hoq_cartlistdetails"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {Number(item?.Nwt) !== 0 && (
                    <Typography variant="body2" className='hoq_card-ContentsData'>
                      NWT: {(item?.Nwt || 0).toFixed(3)}{' '}
                    </Typography>
                  )}
                 {storeInitData?.IsStoneWeight == 1 &&
                    <>
                      {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                        <>
                          <Typography variant="body2" className='hoq_card-ContentsData'>
                            CWT: {(item?.CSwt || 0).toFixed(3)} / {(item?.CSpcs || 0)}{' '}
                          </Typography>
                        </>
                      }
                    </>
                  }
                {storeInitData?.IsGrossWeight == 1 &&
                    <Typography variant="body2" className='hoq_card-ContentsData'>
                      GWT: {(item?.Gwt || 0).toFixed(3)}
                    </Typography>
                  }
                 {storeInitData?.IsDiamondWeight == 1 &&
                    <>
                      {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                        <>
                          <Typography variant="body2" className='hoq_card-ContentsData'>
                            DWT: {(item?.Dwt || 0).toFixed(3)} / {(item?.Dpcs || 0)}
                          </Typography>
                        </>
                      }
                    </>
                  }
              </div>
              {item?.StockNo != "" && (
                <span className="hoq_DesignNoTExt">{item?.StockNo}</span>
              )}
              { storeInitData?.IsPriceShow == 1 &&  <Box className="hoq_PriceBox">
                <>
                  {storeInitData?.IsPriceShow == 1 && ( 
                    <span className="hoq_currencyFontPrice">
                      <span
                        className="hoq_currencyFont"
                        style={{paddingRight  :"0.2rem"}}
                        dangerouslySetInnerHTML={{
                          __html: decodeEntities(loginUserDetail?.CurrencyCode),
                        }}
                      />
                      {(item?.UnitCostWithMarkUp).toLocaleString('en-IN')}
                    </span>
                  )}
                </>
              </Box>}
              {item?.Remarks !== "" && (
                <Typography variant="body2" className="hoq_remarktext" noWrap>
                  <span>Remark:</span>
                  {truncateText(item?.Remarks || productRemark, 40)}
                </Typography>
              )}
            </CardContent>
            <Box className="hoq_cartbtngroupReRm">
              <Link
                className="hoq_ItemRemarkbtn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
                variant="body2"
              >
                {item?.Remarks ? "Update Remark" : "Add Remark"}
              </Link>
              <Link
                className="hoq_ReomoveCartbtn"
                href="#"
                variant="body2"
                onClick={() => handleRemoveItem(item, index)}
              >
                Remove
              </Link>
            </Box>
          </div>
        </Box>
        <div>
          {multiSelect && (
            <Checkbox
              checked={multiSelect && isSelected}
              onChange={() => onSelect(item)}
              sx={{
                color: "rgba(125, 127, 133, 0.4) !important",
                position: "absolute",
                bottom: 0,
                left: 2,
              }}
            />
          )}
        </div>
        {item?.StockId != 0 && (
          <div className="hoq_inStockbadgeDiv">
            <span className="hoq_inStockbadgeSpan">In Stock</span>
          </div>
        )}
      </Card>
      <RemarkModal
        open={open}
        onClose={handleClose}
        remark={remark}
        onRemarkChange={handleRemarkChangeInternal}
        onSave={handleSaveInternal}
      />
    </Grid>
  );
};

export default CartItem;
