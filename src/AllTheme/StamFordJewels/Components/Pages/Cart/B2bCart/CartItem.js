import React, { useEffect, useRef, useState } from 'react';
import './stam_cartPage.scss';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, Grid, Radio, RadioGroup, Skeleton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import RemarkModal from './RemarkModal';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { FormControl } from 'react-bootstrap';
import Cookies from "js-cookie";
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { stam_CartCount } from '../../../Recoil/atom';

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
  openHandleUpdateCartModal
}) => {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [remark, setRemark] = useState(item.Remarks || '');
  const [isSelectedItems, setIsSelectedItems] = useState();
  const setCartCountVal = useSetRecoilState(stam_CartCount)
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
    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  };

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

  useEffect(() => {
    if (item?.ImageCount > 0) {
      CartCardImageFunc(item).then((src) => {
        setImageSrc(src);
      });
    } else {
      setImageSrc(noImageFound);
    }
  }, [item]);

  return (
    <Grid
      item
      xs={6}
      sm={itemLength <= 2 ? 6 : 6}
      md={itemLength <= 2 ? 6 : 6}
      lg={itemLength <= 2 ? 6 : 4}
      xxl={itemLength <= 2 ? 6 : 3}
      className='stam_cartListCardGrid'>
      <Card className={itemLength <= 3 ? 'stam_cartListCard' : 'stam_cartListCard'}
        key={item?.id}
        sx={{
          boxShadow: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && 'rgb(175 130 56 / 68%) 1px 1px 1px 0px, rgb(175 130 56 / 68%) 0px 0px 0px 1px !important',
          // border: selectedItem?.id == item?.id && '1px solid #af8238',
        }}
      // onDoubleClick={openHandleUpdateCartModal}

      // onMouseDown={handlePress('start')}
      // onMouseUp={cancelPress}
      // onMouseLeave={cancelPress}
      // onTouchStart={handlePress('start')}
      // onTouchEnd={cancelPress}
      >
        <Box className="stam_mui_CartBox" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'relative' }}>
          {imageSrc === undefined ? (
            <CardMedia
              sx={{
                width: "13rem",
                height: "11rem",
                '@media (max-width: 570px)': {
                  width: "100%",
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
            <CardMedia
              component="img"
              image={imageSrc}
              alt={item?.TitleLine}
              className='stam_cartListImage'
              onClick={() => onSelect(item)}
            />
          )}
          <div className='stam_rightContentDataDiv'>
            <CardContent className='stam_cartcontentData' onClick={() => onSelect(item)}>
              <Typography variant="body2" className='stam_DesignNoTExt'>
                {item?.designno} {item?.StockNo != "" &&
                  <span className='stam_DesignNoTExt'>({item?.StockNo})</span>
                }
              </Typography>
              <div className='stam_cartlistdetails' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div>
                  {storeInitData?.IsGrossWeight == 1 &&
                    <Typography variant="body2" className='stam_card-ContentsData'>
                      GWT: {(item?.Gwt || 0)?.toFixed(3)}
                    </Typography>
                  }
                  {storeInitData?.IsMetalWeight == 1 &&
                    <>
                      {Number(item?.Nwt) !== 0 && (
                        <Typography variant="body2" className='stam_card-ContentsData'>
                          NWT: {(item?.Nwt || 0)?.toFixed(3)}{' '}
                        </Typography>
                      )}
                    </>
                  }
                </div>
                <div>
                  {storeInitData?.IsDiamondWeight == 1 &&
                    <>
                      {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                        <>
                          <Typography variant="body2" className='stam_card-ContentsData'>
                            DWT: {(item?.Dwt || 0)?.toFixed(3)} / {(item?.Dpcs || 0)}
                          </Typography>
                        </>
                      }
                    </>
                  }
                  {storeInitData?.IsStoneWeight == 1 &&
                    <>
                      {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                        <>
                          <Typography variant="body2" className='stam_card-ContentsData'>
                            CWT: {(item?.CSwt || 0)?.toFixed(3)} / {(item?.CSpcs || 0)}{' '}
                          </Typography>
                        </>
                      }
                    </>
                  }
                </div>
              </div>
              <Box className="stam_PriceBox">
                <>
                  {storeInitData?.IsPriceShow == 1 &&
                    <span className='stam_currencyFontPrice'>
                      <span className="stam_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                      {/* <span
                        className="stam_currencyFont"
                        dangerouslySetInnerHTML={{
                          __html: decodeEntities(
                            CurrencyData?.Currencysymbol
                          ),
                        }}
                      /> */}
                      {formatter(item?.UnitCostWithMarkUp)}
                    </span>
                  }
                </>
              </Box>
              {item?.Remarks !== "" && (
                <Typography variant="body2" className='stam_remarktext'>
                  <span>Remark:</span> {truncateText(item?.Remarks || productRemark, 40)}
                </Typography>
              )}
            </CardContent>
            <Box className="stam_cartbtngroupReRm">
              <Link className='stam_ItemRemarkbtn' onClick={(e) => { e.stopPropagation(); handleOpen(); }} variant="body2">
                {item?.Remarks ? "Update Remark" : "Add Remark"}
              </Link>
              <Link className='stam_ReomoveCartbtn' href="#" variant="body2" onClick={() => handleRemoveItem(item, index)} >
                Remove
              </Link>
            </Box>
          </div>
        </Box>
        <div>
          {multiSelect &&
            <Checkbox
              checked={multiSelect && isSelected}
              onChange={() => onSelect(item)}
              sx={{
                color: "rgba(125, 127, 133, 0.4) !important",
                position: 'absolute',
                bottom: 0,
                left: 2
              }}
            />
          }
        </div>
        {item?.StockId != 0 &&
          <div className="stam_inStockbadgeDiv">
            <span className="stam_inStockbadgeSpan">In Stock</span>
          </div>
        }
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
