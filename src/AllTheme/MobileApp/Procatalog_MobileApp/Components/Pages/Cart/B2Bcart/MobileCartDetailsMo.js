import React, { useEffect, useState } from 'react';
import { Modal, Divider, Skeleton, Button } from '@mui/material';
import './smrMo_cartPage.scss';
import QuantitySelector from './QuantitySelectorMo';
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState } from 'recoil';
import { PC_AppShowSnackBar } from '../../../Recoil/atom';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { formatter } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const MobileCartDetails = ({
  ispriceloding,
  selectedItem,
  CartCardImageFunc,
  qtyCount,
  handleIncrement,
  handleDecrement,
  setOpenMobileModal,
  multiSelect,
  handleAddReamrk,
  productRemark,
  sizeCombo,
  showRemark,
  CurrencyData,
  mrpbasedPriceFlag,
  handleRemarkChange,
  handleSave,
  handleCancel,
  handleMetalTypeChange,
  handleMetalColorChange,
  handleDiamondChange,
  handleColorStoneChange,
  handleSizeChange,
  onUpdateCart,
  decodeEntities,
  handleMoveToDetail,
  open,
  handleClose
}) => {
  const [imageSrc, setImageSrc] = useState(noImageFound);
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [ColorStoneCombo, setColorStoneCombo] = useState([]);
  const [diamondQualityColorCombo, setDiamondQualityColorCombo] = useState([]);
  const [storeInitData, setStoreInitData] = useState();
  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [snackbarOpen, setSnackbarOpen] = useRecoilState(PC_AppShowSnackBar);

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
    const metalTypeData = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
    const metalColorData = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
    const diamondQtyColorData = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
    const CSQtyColorData = JSON.parse(sessionStorage.getItem('ColorStoneQualityColorCombo'));
    setMetalTypeCombo(metalTypeData);
    setMetalColorCombo(metalColorData);
    setDiamondQualityColorCombo(diamondQtyColorData);
    setColorStoneCombo(CSQtyColorData);
  }, [])


  const handleUpdateCart = async (selectedItem) => {
    const resUpdate = await onUpdateCart(selectedItem)
    if (resUpdate?.msg === 'success') {
      setSnackbarOpen(true);
    }
  }

  useEffect(() => {
    if (selectedItem?.ImageCount > 0) {
      CartCardImageFunc(selectedItem).then((src) => {
        setImageSrc(src);
      });
    } else {
      setImageSrc(noImageFound);
    }
  }, [selectedItem]);

  return (
    <Modal open={open} onClose={handleClose} className="smrmo_cart-modal" sx={{ height: '100%', overflow: 'auto' }}>
      <div className="smrmo_cart-container" style={{ background: "#fff", padding: '20px', position: "relative" }}>
        <div className="smrmo_Cart-imageDiv">
          <img
            src={imageSrc}
            alt="Cluster Diamond"
            className='smrmo_cartImage'
            onClick={() => handleMoveToDetail(selectedItem)}
            style={{ border: 'none' }}
          />
        </div>
        <div className="smrMo_Cart_R-details">
          <p className='smrMo_cart-Titleline'>{selectedItem?.designno}{selectedItem?.TitleLine ? `-${selectedItem.TitleLine}` : ''}</p>
          <Divider />
          {storeInitData?.IsProductWebCustomization == 1 &&
            <div className="smrmo_Cart-options">
              {storeInitData?.IsMetalCustomization == 1 &&
                <div className="option">
                  <label htmlFor="metal-type">Metal Type:</label>
                  <select id="metal-type" key={selectedItem?.id} name={selectedItem?.id} value={selectedItem?.metaltypename} onChange={handleMetalTypeChange}>
                    {mrpbasedPriceFlag == 1 ? (
                      <option value={selectedItem?.metaltypename}>{selectedItem?.metaltypename}</option>
                    ) :
                      <>
                        {metalTypeCombo?.map(option => (
                          <option key={option.Metalid} value={option.metaltypename}>{option.metaltype}</option>
                        ))}
                      </>
                    }
                  </select>
                </div>
              }
              {storeInitData?.IsMetalCustomization == 1 &&
                <div className="option">
                  <label htmlFor="metal-color">Metal Color:</label>
                  <select id="metal-color" value={selectedItem?.metalcolorname} name={selectedItem?.id} onChange={handleMetalColorChange}>
                    {mrpbasedPriceFlag == 1 ? (
                      <option value={selectedItem?.metalcolorname}>{selectedItem?.metalcolorname}</option>
                    ) :
                      <>
                        {
                          metalColorCombo?.map(option => (
                            <option key={option.id} value={option.colorname}> {option.colorname}</option>
                          ))
                        }
                      </>
                    }
                  </select>
                </div>
              }
              {storeInitData?.IsDiamondCustomization == 1 &&
                <>
                  {(selectedItem?.Dwt != "0" || selectedItem?.Dpcs != "0") &&
                    <div className="option">
                      <label htmlFor="diamond">Diamond:</label>
                      <select id="diamond" name={selectedItem?.id} value={selectedItem?.diamondquality + ',' + selectedItem?.diamondcolor} onChange={handleDiamondChange}>
                        {mrpbasedPriceFlag == 1 ? (
                          <option value={selectedItem?.diamondquality + ',' + selectedItem?.diamondcolor}>{selectedItem?.diamondquality + ',' + selectedItem?.diamondcolor}</option>
                        ) : (
                          <>
                            {diamondQualityColorCombo?.map(option => (
                              <option key={option?.ColorId + ',' + option?.QualityId} value={option?.Quality + ',' + option?.color}>{option?.Quality + ',' + option?.color}</option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  }
                </>
              }
              {storeInitData?.IsCsCustomization == 1 &&
                <>
                  {(selectedItem?.CSwt != "0" || selectedItem?.CSpcs != "0") &&
                    <div className="option">
                      <label htmlFor="diamond">Color Stone:</label>
                      <select id="diamond" name={selectedItem?.id} value={selectedItem?.colorstonequality + ',' + selectedItem?.colorstonecolor} onChange={handleColorStoneChange}>
                        {mrpbasedPriceFlag == 1 ? (
                          <option value={selectedItem?.colorstonequality + ',' + selectedItem?.colorstonecolor}>{selectedItem?.colorstonequality + ',' + selectedItem?.colorstonecolor}</option>
                        ) :
                          <>
                            {ColorStoneCombo?.map(option => (
                              <option key={option?.ColorId + ',' + option?.QualityId} value={option?.Quality + ',' + option?.color}>{option?.Quality + ',' + option?.color}</option>
                            ))}
                          </>
                        }
                      </select>
                    </div>
                  }
                </>
              }
             {sizeCombo?.rd?.length !== 0 &&
                <div className="option">
                  <label htmlFor="size">Size:</label>
                  <select id="size" name={selectedItem?.id} defaultValue={selectedItem?.Mastermanagement_CategorySize} value={selectedItem?.size} onChange={handleSizeChange}>
                    {mrpbasedPriceFlag == 1 ? (
                      <option value={selectedItem?.size}>{selectedItem?.size}</option>
                    ) :
                      <>
                         {sizeCombo?.rd?.map(option => (
                          <option key={option?.id} value={option?.sizename}>{option?.sizename}</option>
                        ))}
                      </>
                    }
                  </select>
                </div>
              }
            </div>
          }
          <div className='smrmo_cartQtyPricemainDev' style={{ display: 'flex', flexDirection: 'column' }}>
            <QuantitySelector selectedItem={selectedItem} handleIncrement={handleIncrement} handleDecrement={handleDecrement} qtyCount={qtyCount} />
            {storeInitData?.IsPriceShow == 1 &&
              <div className="product-price">
                {!ispriceloding ? (
                  <span>
                    {/* <span
                      className="smrmo_currencyFont"
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(
                          CurrencyData?.Currencysymbol
                        ),
                      }}
                    /> */}
                    <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                    {formatter(selectedItem?.FinalCost)}
                  </span>
                ) : (
                  <Skeleton className='smrmo_CartSkelton' variant="text" width="50%" animation="wave" />
                )}
              </div>
            }
          </div>
          <div className='smrmo_UpdateCartBtn'>
            <Button className="smrmo_cartUpdate-button" onClick={() => handleUpdateCart(selectedItem)}>Save</Button>

          </div>
          <div style={{ color: '#7d7f85', position: 'absolute', top: 20, right: 20 }} onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MobileCartDetails;
