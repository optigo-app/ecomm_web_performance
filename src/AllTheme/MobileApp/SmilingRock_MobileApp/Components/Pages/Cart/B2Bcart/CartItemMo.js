import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Grid, Skeleton, Snackbar, useMediaQuery } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';
import { smrMA_CartCount } from '../../../Recoil/atom';
import Cookies from "js-cookie";
import { formatter } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import ConfirmationDialog from '../../../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog';

const CartItem = ({
  item,
  CurrencyData,
  decodeEntities,
  CartCardImageFunc,
  onSelect,
  onRemove,
  itemLength,
  handleMoveToDetail
}) => {
  const [imageSrc, setImageSrc] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const setCartCountVal = useSetRecoilState(smrMA_CartCount)
  const [storeInitData, setStoreInitData] = useState();
  const visiterId = Cookies.get('visiterId');
  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
  }, [])

  useEffect(() => {
    if (item?.ImageCount > 0) {
      CartCardImageFunc(item).then((src) => {
        setImageSrc(src);
      });
    } else {
      setImageSrc(noImageFound);
    }
  }, [item]);

  const handleRemoveAllDialog = () => {
    setDialogOpen(true);
  };

  const handleConfirmRemove = async () => {
    setDialogOpen(false);
    const returnValue = await onRemove(item);
    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const isLargeScreen = useMediaQuery('(max-width:890px)');
  const ismediumScreen = useMediaQuery('(min-width:1780px)');

  const handleUpdateModal = (item) => {
    if (item?.StockId != 0) {
      setShowToast(true);
    } else {
      onSelect(item);
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToast(false);
  };

  return (
    <Grid
      item
      xs={12}
      sm={itemLength <= 2 ? 12 : 12}
      md={itemLength <= 2 ? 6 : 6}
      lg={itemLength <= 2 ? 6 : 4}
      xxl={itemLength <= 2 ? 6 : 3}
      className='smrMo_cartListCardGrid'>
      <Card className='smrMo_cartListCard' >
        <Box onClick={() => handleMoveToDetail(item)} className="smrmo_mui_CartBox" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'relative' }}>
          {imageSrc === undefined ? (
            <CardMedia
              sx={{
                width: "100%",
                height: "11rem",
                '@media (max-width: 425px)': {
                  width: "9.5rem",
                },
              }}
            >
              <Skeleton
                animation="wave"
                variant="rect"
                width="11rem"
                height="100%"
                sx={{
                  '@media (max-width: 425px)': {
                    width: "9.5rem",
                  },
                }}
              />
            </CardMedia>
          ) : (
            <CardMedia
              component="img"
              image={imageSrc}
              alt={item?.TitleLine}
              className='smrMo_cartListImage'
            />
          )}

          <div>
            <CardContent className='smrMo_cartcontentData'>
              <Typography variant="body2" className='smrmo_DesignNoTExt'>
                {item?.designno} {item?.StockNo != "" &&
                  <span className='smrMO_DesignNoTExt'>({item?.StockNo})</span>
                }
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ marginRight: '5px' }}>
                  {storeInitData?.IsGrossWeight == 1 &&
                    <Typography variant="body2" className='smrmo_card-ContentData'>
                      GWT: {(item?.Gwt || 0).toFixed(3)}
                    </Typography>
                  }
                  {Number(item?.Nwt) !== 0 && (
                    <Typography variant="body2" className='smrmo_card-ContentData'>
                      NWT: {(item?.Nwt || 0).toFixed(3)}{' '}
                    </Typography>
                  )}
                </div>
                <div style={{ marginRight: '5px' }}>
                  {storeInitData?.IsDiamondWeight == 1 &&
                    <>
                      {(item?.Dwt != "0" || item?.Dpcs != "0") &&
                        <Typography variant="body2" className='smrmo_card-ContentData'>
                          DWT: {(item?.Dwt || 0).toFixed(3)} / {(item?.Dpcs || 0).toFixed(3)}
                        </Typography>
                      }
                    </>
                  }
                  {storeInitData?.IsStoneWeight == 1 &&
                    <>
                      {(item?.CSwt != "0" || item?.CSpcs != "0") &&
                        <Typography variant="body2" className='smrmo_card-ContentData'>
                          CWT: {(item?.CSwt || 0).toFixed(3)} / {(item?.CSpcs || 0).toFixed(3)}{' '}
                        </Typography>
                      }
                    </>
                  }
                </div>
              </div>
              <Box>
                {storeInitData?.IsPriceShow == 1 &&
                  <span className='smrMo_currencyFontPrice'>
                    {/* <span
                      className="smrmo_currencyFont"
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(
                          CurrencyData?.Currencysymbol
                        ),
                      }}
                    /> */}
                    <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                    {formatter(item?.UnitCostWithMarkUp)}
                  </span>
                }
                <p className='smrMo_QuanittyP'>Qty: <span>{item?.Quantity}</span></p>
              </Box>
            </CardContent>
          </div>
          {item?.StockId != 0 &&
            <div className="smrMO_inStockbadgeDiv">
              <span className="smrMO_inStockbadgeSpan">In Stock</span>
            </div>
          }
        </Box>
        <Box className="smrMo_cartbtngroupReRm">

          {(item?.StockId == 0 && item?.IsMrpBase == 0) &&
            <Button
              className='smrMo_ItemUpdatebtn'
              fullWidth
              onClick={() => handleUpdateModal(item)}
            >
              Update
            </Button>
          }
          <Button
            className='smrMO_ReomoveCartbtn'
            onClick={() => handleRemoveAllDialog(item)}
            fullWidth
          >
            Remove
          </Button>
        </Box>
      </Card>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmRemove}
        title="Confirm"
        content="Are you sure you want to clear this Item?"
      />
      <Snackbar
        open={showToast}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Item in Stock"
        className='smr_MoSnakbarTM'
      />
    </Grid>
  );
};

export default CartItem;
