import React, { useEffect, useState } from 'react';
import './elv_cartPage.scss';
import { Divider, Skeleton } from '@mui/material';
import QuantitySelector from './QuantitySelector';
import { formatter } from '../../../../../utils/Glob_Functions/GlobalFunction';
import { toast } from 'react-toastify';

const Customization = ({
  ispriceloding,
  selectedItem,
  qtyCount,
  handleIncrement,
  handleDecrement,
  sizeCombo,
  CurrencyData,
  mrpbasedPriceFlag,
  handleMetalTypeChange,
  handleMetalColorChange,
  handleDiamondChange,
  handleColorStoneChange,
  handleSizeChange,
  decodeEntities,
  onUpdateCart
}) => {

  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [ColorStoneCombo, setColorStoneCombo] = useState([]);
  const [diamondQualityColorCombo, setDiamondQualityColorCombo] = useState([]);
  const [storeInitData, setStoreInitData] = useState();


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

  const SizeSorting = (SizeArr) => {

    let SizeSorted = SizeArr?.sort((a, b) => {
      const nameA = parseInt(a?.sizename?.toUpperCase()?.slice(0, -2), 10);
      const nameB = parseInt(b?.sizename?.toUpperCase()?.slice(0, -2), 10);

      return nameA - nameB;
    })

    return SizeSorted

  }

  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  const handleUpdateCart = async (selectedItem) => {
    const resUpdate = await onUpdateCart(selectedItem)
    if (resUpdate?.msg == "success") {
      toast.success('Cart Updated Successfully', {
        hideProgressBar: true
      });
    }
  }

  return (
    <>
      {(selectedItem?.StockId == 0 && selectedItem?.IsMrpBase == 0) ? (
        <div className="elv_Cart_R-details">
          {/* <p className='elv_cart-Titleline'>{selectedItem?.TitleLine}</p> */}
          {storeInitData?.IsProductWebCustomization == 1 &&
            <div className="elv_Cart-options">
              {storeInitData?.IsMetalCustomization == 1 &&
                <div className="elv_option">
                  <label htmlFor="metal-type">Metal Type:</label>
                  <select id="metal-type" name={selectedItem?.id} value={selectedItem?.metaltypename} onChange={handleMetalTypeChange}>
                    {selectedItem?.StockId != 0 ? (
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
                <div className="elv_option">
                  <label htmlFor="metal-color">Metal Color:</label>
                  <select id="metal-color" name={selectedItem?.id} value={selectedItem?.metalcolorname} onChange={handleMetalColorChange}>
                    {selectedItem?.StockId != 0 ? (
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
                    <div className="elv_option">
                      <label htmlFor="diamond">Diamond:</label>
                      <select id="diamond" name={selectedItem?.id} value={selectedItem?.diamondquality + ',' + selectedItem?.diamondcolor} onChange={handleDiamondChange}>
                        {selectedItem?.StockId != 0 ? (
                          <option value={selectedItem?.diamondquality + ',' + selectedItem?.diamondcolor}>{(selectedItem?.diamondquality)?.replace(/,/g, ' - ') + ',' + selectedItem?.diamondcolor}</option>
                        ) :
                          <>
                            {diamondQualityColorCombo?.map(option => (
                              <option key={option?.ColorId + ',' + option?.QualityId} value={option?.Quality + ',' + option?.color}> {option?.Quality + ',' + option?.color}</option>
                            ))}
                          </>
                        }
                      </select>
                    </div>
                  }
                </>
              }

              {storeInitData?.IsCsCustomization == 1 &&
                <>
                  {(selectedItem?.CSwt != "0" || selectedItem?.CSpcs != "0") &&
                    <div className="elv_option">
                      <label htmlFor="diamond">Color Stone:</label>
                      <select id="diamond" name={selectedItem?.id} value={selectedItem?.colorstonequality + ',' + selectedItem?.colorstonecolor} onChange={handleColorStoneChange}>
                        {selectedItem?.StockId != 0 ? (
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
                <div className="elv_option">
                  <label htmlFor="size">Size:</label>
                  <select id="size" name={selectedItem?.id} defaultValue={selectedItem?.Size} value={selectedItem?.Size} onChange={handleSizeChange}>
                    {selectedItem?.StockId != 0 ? (
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
          <div className='elv_cartQtyPricemainDev'>
            <QuantitySelector selectedItem={selectedItem} handleIncrement={handleIncrement} handleDecrement={handleDecrement} qtyCount={qtyCount} />
            {storeInitData?.IsPriceShow == 1 &&
              <div className="elv_product-price">
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    className="elv_currencyFont"
                    dangerouslySetInnerHTML={{
                      __html: decodeEntities(
                        loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode
                      ),
                    }}
                  />
                  {ispriceloding ? (
                    <Skeleton className='elv_CartSkelton' variant="text" width="80%" animation="wave" />
                  ) : (
                    formatter(selectedItem?.FinalCost)
                  )}
                </span>

              </div>
            }
          </div>
          <div className='elv_UpdateCartBtn'>
            <button className="elv_cartUpdate-button" onClick={() => handleUpdateCart(selectedItem)}>Apply</button>
          </div>
        </div>
      ) : (
        <>
          <div className="elv_Cart_R-details_1">
            {/* <p className='elv_cart-Titleline'>{selectedItem?.TitleLine}</p>
            <Divider /> */}
            <div className="elv_StockCart-options">
              <div className='elv_stock_1'>
                {selectedItem?.metaltypename != "" &&
                  <div className="elv_option_mrp">
                    <label htmlFor="metal-type">Metal Type:&nbsp;</label>
                    <span>{selectedItem?.metaltypename}</span>
                  </div>
                }
                {selectedItem?.metaltypename != "" &&
                  <div className="elv_option_mrp">
                    <label htmlFor="metal-color">Metal Color:&nbsp;</label>
                    <span>{selectedItem?.metalcolorname}</span>
                  </div>
                }
                {(selectedItem?.Dwt != "0" || selectedItem?.Dpcs != "0") &&
                  <div className="elv_option_mrp">
                    <label htmlFor="diamond">Diamond:&nbsp;</label>
                    <span>{(selectedItem?.diamondqualityname)?.replace(/,/g, ' - ') + ',' + selectedItem?.diamondcolorname}</span>
                  </div>
                }
                {(selectedItem?.CSwt != "0" || selectedItem?.CSpcs != "0") &&
                  <div className="elv_option_mrp">
                    <label htmlFor="diamond">Color Stone:&nbsp;</label>
                    <span>{selectedItem?.colorstonequality + ',' + selectedItem?.colorstonecolor}</span>
                  </div>
                }
                {selectedItem?.Size != "" &&
                  <div className="elv_option_mrp">
                    <label htmlFor="size">Size:&nbsp;</label>
                    <span>{selectedItem?.Size}</span>
                  </div>
                }
                <div className='elv_stock_2'>
                </div>
              </div>
              <div className='elv_stock_3'>
                {selectedItem?.IsMrpBase == 0 ? (
                  <div className="elv_qty">
                    <label htmlFor="qty">Qty:</label>
                    <span>{selectedItem?.Quantity}</span>
                  </div>
                ) :
                  <div>
                    <QuantitySelector selectedItem={selectedItem} handleIncrement={handleIncrement} handleDecrement={handleDecrement} qtyCount={qtyCount} />
                  </div>
                }
                <div className="elv_cartQtyPricemainDev_1">
                  {storeInitData?.IsPriceShow == 1 &&
                    <div className="elv_product-price_1">
                      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <span
                          className="elv_currencyFont"
                          dangerouslySetInnerHTML={{
                            __html: decodeEntities(
                              loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode
                            ),
                          }}
                        />
                        {ispriceloding ? (
                          <Skeleton variant="rounded" width={140} height={30} style={{ marginInline: "0.3rem" }} />
                        ) : (
                          formatter(selectedItem?.FinalCost)
                        )}
                      </span>
                    </div>
                  }
                </div>
              </div>
              {/* {selectedItem?.IsMrpBase == 1 && (
                <div className='elv_UpdateCartBtn'>
                  <button className="elv_cartUpdate-button" onClick={() => handleUpdateCart(selectedItem)}>Apply</button>
                </div>
              )} */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Customization;
