import React, { useEffect, useState, useRef } from 'react';
import './elv_cartPage.scss';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { Box, Checkbox, useMediaQuery } from '@mui/material';
import noImageFound from "../../Assets/image-not-found.jpg"
import { el_CartCount } from '../../Recoil/atom';
import { GetCountAPI } from '../../../../../utils/API/GetCount/GetCountAPI';
import { Link, useFormAction } from 'react-router-dom';
import RemarkDialog from './OrderRemarkDialog';
import ItemRemarkDialog from './ItemRemarkDialog';
import ConfirmationDialog from '../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog';

const CartItem = ({
  item,
  index,
  CartCardImageFunc,
  onSelect,
  CurrencyData,
  showRemark1,
  decodeEntities,
  isSelected,
  selectedItem,
  selectedItemsLength,
  isActive,
  border,
  handleBorder,
  multiSelect,
  onRemove,
  itemLength,
  showRemark,
  productRemark,
  handleAddRemark,
  handleRemarkChange,
  handleSave,
  handleCancel,
  openHandleUpdateCartModal }) => {

  const [remark, setRemark] = useState(item.Remarks || '');
  const [isSelectedItems, setIsSelectedItems] = useState();
  const [countstatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(el_CartCount)
  const [storeInitData, setStoreInitData] = useState();
  const [open1, setOpen1] = useState(false);
  const visiterId = Cookies.get('visiterId');
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState();

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isLargeScreen = useMediaQuery('(min-width: 1600px)');
  const isMediumScreen = useMediaQuery('(min-width: 1038px) and (max-width: 1599px)');
  const isMobileScreen = useMediaQuery('(min-width: 320px) and (max-width: 1037px)');
  const mobileScreen = useMediaQuery('(max-width: 710px)');

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
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
    const isCartUpdateStatus = sessionStorage.getItem('cartUpdation');
    setCountStatus(isCartUpdateStatus)
  }, [onRemove])

  const handleRemarkChangeInternal = (e) => {
    setRemark(e.target.value);
    handleRemarkChange(e);
  };

  const handleSaveInternal = () => {
    handleSave(item);
    handleClose1();
  };

  useEffect(() => {
    handleIsSelected()
  }, [isSelected])

  const handleIsSelected = () => {
    let isselected = selectedItem?.id == item?.id
    setIsSelectedItems(isselected)
  }

  const handleRemoveItem = async (item) => {
    const returnValue = await onRemove(item);
    if (returnValue?.msg == 'success') {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  }

  const handleConfirm = () => {
    handleRemoveItem(item, index);
    handleClose();
  }

  const [pressing, setPressing] = useState(false);
  const pressTimer = useRef(null);

  const handlePress = (action) => {
    return () => {
      // if (!multiSelect && selectedItemsLength === 0) return;
      // else if (multiSelect && selectedItemsLength === 0) return;
      pressTimer.current = setTimeout(() => {
        // openHandleUpdateCartModal();
        // console.log('selectedItemsssssss', selectedItemsLength);
        alert('Long Pressed Detected...')
      }, 5000);
      setPressing(action === 'start');
    };
  }

  const cancelPress = () => {
    clearTimeout(pressTimer.current);
    setPressing(false);
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  const width = isLargeScreen && itemLength <= 3 ? '390px' :
    isMediumScreen && itemLength <= 3 ? '330px' : isMobileScreen && itemLength == 1 ? '300px' :
      '100%';

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])


  return (
    // <Grid item
    //   xs={12}
    //   sm={itemLength <= 2 ? 6 : 6}
    //   md={itemLength <= 2 ? 6 : 6}
    //   lg={itemLength <= 2 ? 6 : 4}
    //   xxl={itemLength <= 2 ? 6 : 3}
    // >
    <>
      <div className='elv_ProductCards'
        // onClick={() => onSelect(item)}
        onMouseDown={handlePress('start')}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={handlePress('start')}
        onTouchEnd={cancelPress}
        style={{
          boxShadow:
          !multiSelect &&
          !isMobileScreen &&
          selectedItem?.id == item?.id &&
          "#c20000 1px 1px 1px 0px, #c20000 0px 0px 0px 1px !important",
        border: selectedItem?.id == item?.id && '1px solid #c20000',
          // border: isSelectedItems ? '1px solid brown' : '1px solid #e1e1e1'
        }}
      > 
        {item?.StockId != 0 &&
          <div className="elv_inStockbadgeDiv">
            <span className="elv_inStockbadgeSpan">In Stock</span>
          </div>
        }
        <div className='elv_cardImage_div' >
          {imageSrc !== undefined && (
            <img className='elv_cardImage_img' src={imageSrc} alt=""
              onClick={() => {
                // handleIsSelected();
                onSelect(item)
              }}
            />
          )}
        </div>
        <div className='elv_ProductCard_details'>
          <div className={`elv_Product_details ${mobileScreen && item?.Remarks !== '' ? 'with-remarks' : ''}`}>
            <div>
              <span className='elv_ProdDesignno'>{item?.designno}&nbsp;{item?.StockNo != "" &&
                <span className='smr_DesignNoTExt'>({item?.StockNo})</span>
              }</span>
              <div className='elv_ProdWeights_div'>
                <div className='elv_ProdWt1_div'>
                  <div>
                    {(Number(item?.Nwt)) !== 0 && (<><span className='elv_prodWeights_label'>NWT&nbsp;: </span> <span className='elv_prodWeights_data'>&nbsp;{(item?.Nwt || 0).toFixed(3)}{' '}</span></>)}
                  </div>
                  <div>
                    {storeInitData?.IsDiamondWeight == 1 &&
                      <>
                        {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                          <>
                            <span className='elv_prodWeights_label'>DWT&nbsp;:</span> <span className='elv_prodWeights_data'>{(item?.Dwt || 0).toFixed(3)} / {(item?.Dpcs || 0)}</span>
                          </>
                        }
                      </>
                    }
                  </div>
                </div>
                <div className='elv_ProdWt1_div'>
                  <div >
                    {storeInitData?.IsStoneWeight == 1 &&
                      <>
                        {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                          <>
                            <span className='elv_prodWeights_label'>CWT: </span> <span className='elv_prodWeights_data'>{(item?.CSwt || 0).toFixed(3)} / {(item?.CSpcs || 0)}{' '}</span>
                          </>
                        }
                      </>
                    }
                  </div>
                  <div >
                    {storeInitData?.IsGrossWeight == 1 &&
                      <>
                        {(item?.Gwt != 0) &&
                          <>
                            <span className='elv_prodWeights_label'>GWT: </span> <span className='elv_prodWeights_data'>{(item?.Gwt || 0).toFixed(3)}</span>
                          </>
                        }
                      </>
                    }
                  </div>
                </div>
              </div>
              <div className='elv_itemsRemark_div'>

                {item?.Remarks !== "" && (
                  <div className='elv_remarktext'>
                    <div style={{ fontWeight: 'bold' }}>Remark:</div> <span className='elv_remmark_div'>{truncateText(item?.Remarks || productRemark, 40)}</span>
                  </div>
                )}
                <div className='elv_remarks_remove_div'>
                  <span className='elv_remark_modal_title' onClick={handleOpen1}>{item?.Remarks ? 'Edit Remark' : 'Add Remark'}</span>
                  <span className='elv_remove_items' onClick={handleOpen}>Remove</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ItemRemarkDialog
          handleClose1={handleClose1}
          open1={open1}
          remark={remark}
          onRemarkChange={handleRemarkChangeInternal}
          onSave={handleSaveInternal}
        />
        <ConfirmationDialog
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title={"Confirm"}
          content={"Are You Sure to Delete this items?"}
        />
      </div>
    </>
    // </Grid>
  );
};

export default CartItem;