import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, Grid, Radio, RadioGroup, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import RemarkModal from './RemarkModal';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { for_CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { FormControl } from 'react-bootstrap';
import Cookies from "js-cookie";
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import diaImage from "../../../Assets/round.png"

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
  openHandleUpdateCartModal
}) => {
  const [imageSrc, setImageSrc] = useState();
  const [open, setOpen] = useState(false);
  const [remark, setRemark] = useState(item?.Remarks || '');
  const [isSelectedItems, setIsSelectedItems] = useState();
  const setCartCountVal = useSetRecoilState(for_CartCount)
  const [storeInitData, setStoreInitData] = useState();
  const visiterId = Cookies.get('visiterId');

  const isLargeScreen = useMediaQuery('(min-width: 1600px)');
  const isMediumScreen = useMediaQuery('(min-width: 1038px) and (max-width: 1599px)');
  const isMobileScreen = useMediaQuery('(min-width: 320px) and (max-width: 1000px)');

  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
  }, [])

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
    handleIsSelected()
  }, [isSelected])

  const handleIsSelected = () => {
    let isselected = selectedItem?.id == item?.id

    setIsSelectedItems()
  }


  const handleRemoveItem = async (item) => {
    const returnValue = await onRemove(item);

    const existingData = JSON.parse(sessionStorage.getItem('custStepData')) || [];
    const existingData1 = JSON.parse(sessionStorage.getItem('custStepData2')) || [];

    if (existingData1?.[0]?.step1Data != undefined) {
      const newIsInCartValue = 0;

      const updatedData = existingData1.map(step => {
        if (step.step1Data != undefined) {
          return {
            ...step,
            step1Data: {
              ...step.step1Data,
              IsInCart: newIsInCartValue
            }
          };
        }
        return step;
      });

      sessionStorage.setItem('custStepData2', JSON.stringify(updatedData));
    }

    if (existingData?.[1]?.step2Data != undefined) {
      const newIsInCartValue = 0;

      const updatedData = existingData.map(step => {
        if (step.step2Data != undefined) {
          return {
            ...step,
            step2Data: {
              ...step.step2Data,
              IsInCart: newIsInCartValue
            }
          };
        }
        return step;
      });

      sessionStorage.setItem('custStepData', JSON.stringify(updatedData));
    }

    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  };


  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
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
  const diamondData = diamondValue?.find((dia) => dia?.stockno == item?.Sol_StockNo);
  const handleError = (event) => {
    event.target.src = noImageFound;
  };


  return (
    <>
      <div className="for_cartMain-item" onClick={() => onSelect(item)}
        style={{
          // boxShadow: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && '0 3px 8px rgba(223, 100, 126, 0.54)'
          boxShadow: "none",
          border: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && '1px solid rgba(223, 100, 126, 1)'
        }}
      >
        <div className="for_cart-item">
          <div className="for_cart-item__image">
            {imageSrc !== undefined && (
              <img src={imageSrc} alt='Product-image' />
            )}
          </div>
          <div className="for_cart-item__details">
            <h3>{item?.designno != "" && item?.designno}
              {(item?.TitleLine != "" && item?.TitleLine != null) && " - " + item?.TitleLine}
            </h3>
            <p>{item?.productDescription}</p>
            {/* {item?.sku != "" &&
            <p>SKU: {item?.sku}</p>
          } */}
            <div className="for_weightsContainer">
              {storeInitData?.IsGrossWeight == 1 &&
                <div className="for_weightPair">
                  <span className="for_weightLabel">Gwt:</span>
                  <span className="for_weightValue">{(item?.Gwt || 0)?.toFixed(3)}</span>
                </div>
              }
              {storeInitData?.IsMetalWeight == 1 &&
                <>
                  {Number(item?.Nwt) !== 0 && (
                    <div className="for_weightPair">
                      <span className="for_pipe">|</span>
                      <span className="for_weightLabel">Nwt:</span>
                      <span className="for_weightValue">{(item?.Nwt || 0)?.toFixed(3)}{' '}</span>
                    </div>
                  )}
                </>
              }
              {storeInitData?.IsDiamondWeight == 1 &&
                <>
                  {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                    <div className="for_weightPair">
                      <span className="for_pipe">|</span>
                      <span className="for_weightLabel">Dwt:</span>
                      <span className="for_weightValue">{(item?.Dwt || 0)?.toFixed(3)} / {(item?.Dpcs || 0)}</span>
                    </div>
                  }
                </>
              }
              {storeInitData?.IsGrossWeight == 1 &&
                <>
                  {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                    <div className="for_weightPair">
                      <span className="for_pipe">|</span>
                      <span className="for_weightLabel">Cwt:</span>
                      <span className="for_weightValue">{(item?.CSwt || 0)?.toFixed(3)} / {(item?.CSpcs || 0)}{' '}</span>
                    </div>
                  }
                </>
              }
            </div>
            <div className="for_sizeDiv" style={{ display: 'flex' }}>
              <p className='for_ringSize'>Quantity: {item?.Quantity}</p>&nbsp;
              {(item?.Size != "" && item?.Size != undefined && item?.Size != null) &&
                <p className='for_ringSize'>Size: {item?.Size}</p>
              }
            </div>
            {/* <span className="for_change-size">CHANGE SIZE</span> */}
          </div>
          {storeInitData?.IsPriceShow == 1 &&
            <div className="for_cart-item__price">
              <p>{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(item?.UnitCostWithMarkUp)}</p>
              <span className="for_price-excl-vat">(Excl. VAT)</span>
            </div>
          }
          <>
            {storeInitData?.IsPriceShow == 1 &&
              <div className="for_cart-item__total-price">
                {!diamondData &&
                  <>
                    <p>{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(item?.FinalCost)}</p>
                    <span className="for_price-excl-vat">(Excl. VAT)</span>
                  </>
                }
              </div>
            }
          </>
          <div className="for_cart-item__remove">
            {!diamondData &&
              <button className="for_remove-button" onClick={() => handleRemoveItem(item, index)}>×</button>
            }
          </div>
        </div>
        {diamondData &&
          <>
            {/* {diamondData?.map((item) => ( */}
            <div className="for_Diacart-item"
            // style={{
            //   // boxShadow: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && '0 3px 8px rgba(223, 100, 126, 0.54)'
            //   boxShadow: "none",
            //   border: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && '1px solid rgba(223, 100, 126, 1)'
            // }}
            >
              <div className="for_cart-item__image">
                <img src={diamondData?.image_file_url}
                  alt='Product-image'
                  onError={handleError}
                />
              </div>
              <div className="for_cart-item__details">
                <div className="for_weightsContainer">
                  <span>
                    {diamondData?.carat}{" "}
                    Carat {diamondData?.colorname} {diamondData?.clarityname}{" "}
                    {diamondData?.cutname} Cut {diamondData?.shapename} Diamond
                  </span>
                </div>
                <div className='for_diamondSKUNO'>
                  <h3>SKU:{" "}{diamondData?.stockno != "" && diamondData?.stockno}</h3>
                </div>
              </div>
              {storeInitData?.IsPriceShow == 1 &&
                <div className="for_cart-item__price">
                  <p>{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(diamondData?.price)}</p>
                  <span className="for_price-excl-vat">(Excl. VAT)</span>
                </div>
              }
              <>
                {storeInitData?.IsPriceShow == 1 &&
                  <div className="for_cart-item__total-price">
                    {!diamondData &&
                      <>
                        <p>{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(diamondData?.FinalCost)}</p>
                        <span className="for_price-excl-vat">(Excl. VAT)</span>
                      </>
                    }
                  </div>
                }
              </>
              <div className="for_cart-item__remove">
                {!diamondData &&
                  <button className="for_remove-button" onClick={() => handleRemoveItem(diamondData, index)}>×</button>
                }
              </div>
            </div>
            {/* ))} */}
          </>
        }
        {diamondData &&
          <>
            <div className='for_cartDiaTPrice'>
              {storeInitData?.IsPriceShow == 1 &&
                <div className="for_cart-item__total-price">
                  <p>{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(item?.FinalCost + diamondData?.price)}</p>
                  <span className="for_price-excl-vat">(Excl. VAT)</span>
                </div>
              }
            </div>
            <div className="for_Diacart-item__remove">
              <button className="for_remove-button" onClick={() => handleRemoveItem(item, index)}>×</button>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default CartItem;
