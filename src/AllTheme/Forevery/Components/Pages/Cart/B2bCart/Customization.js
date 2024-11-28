import React, { useEffect, useState } from 'react';
import './for_cartPage.scss';
import { Divider, Skeleton } from '@mui/material';
import QuantitySelector from './QuantitySelector';
import { toast } from 'react-toastify';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import btnStyle from "../../../scss/Button.module.scss"

const Customization = ({
  ispriceloding,
  selectedItem,
  diamondData,
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

  console.log('selectedItem: ', selectedItem);
  const [metalTypeCombo, setMetalTypeCombo] = useState([]);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const [ColorStoneCombo, setColorStoneCombo] = useState([]);
  const [diamondQualityColorCombo, setDiamondQualityColorCombo] = useState([]);
  const [storeInitData, setStoreInitData] = useState();
  const [diadata, setDiaData] = useState({});
  const [loading, setLoading] = useState(false);


  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));


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
    if (resUpdate?.msg == "success") {
      toast.success('Cart Updated Successfully');
    }
  }

  function combineDiamondInfo(quality, color) {
    if (!quality || !color) return '';

    const qualityParts = quality?.split(',');
    const colorParts = color?.split(',');

    const combinedParts = qualityParts?.map((q, index) => {
      const c = colorParts[index] || '';
      return `${q?.toUpperCase()}-${c?.toUpperCase()}`;
    });

    return combinedParts.join(', ');
  }

  console.log("kjhsjhkakjhd", selectedItem);


  useEffect(() => {
    if (diamondData) {
      setLoading(true);
      try {
        const diamondValue = diamondData.find((dia) => dia?.stockno === selectedItem?.Sol_StockNo);
        setDiaData(diamondValue);
      } catch (err) {
        // setError(err);
      } finally {
        setLoading(false);
      }
    }
  }, [selectedItem, diamondData]);


  const keyToCheck = "stockno"
  return (
    <>
      {(!selectedItem?.hasOwnProperty(keyToCheck)) ? (
        <>
          {(selectedItem?.StockId == 0 && selectedItem?.IsMrpBase == 0 && selectedItem?.Sol_StockNo == "") ? (
            <div className="for_CartCusto_R-details">
              <p className='for_cart-Titleline'>{selectedItem?.designno != "" && selectedItem?.designno}{selectedItem?.TitleLine != "" && " - " + selectedItem?.TitleLine}</p>
              <Divider className='for_dividerline' />
              {storeInitData?.IsProductWebCustomization == 1 &&
                <div className="for_Cart-options">
                  {storeInitData?.IsMetalCustomization == 1 &&
                    <div className="option">
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
                    <div className="option">
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
                        <div className="option">
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
                        <div className="option">
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
                    <div className="option">
                      <label htmlFor="size">Size:</label>
                      <select id="size" name={selectedItem?.id} value={selectedItem?.Size} onChange={handleSizeChange}>
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
              <div className='for_cartQtyPricemainDev'>
                <QuantitySelector selectedItem={selectedItem} handleIncrement={handleIncrement} handleDecrement={handleDecrement} qtyCount={qtyCount} />
                {storeInitData?.IsPriceShow == 1 &&
                  <div className="product-price">
                    {!ispriceloding ? (
                      <span>
                        {/* <span
                      className="for_currencyFont"
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(
                          CurrencyData?.Currencysymbol
                        ),
                      }}
                    /> */}
                        <span className="for_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                        {formatter(selectedItem?.FinalCost)}
                      </span>
                    ) :
                      <Skeleton className='for_CartSkelton' variant="text" width="80%" animation="wave" />
                    }
                  </div>
                }
              </div>
              <div className='for_UpdateCartBtn'>
                <button className={`${btnStyle?.btn_for_new2} ${btnStyle?.btn_16}`} onClick={() => handleUpdateCart(selectedItem)}>Save</button>
              </div>
            </div>
          ) :
            <div className="for_CartCusto_R-details">
              <p className='for_cart-Titleline'>{selectedItem?.TitleLine}</p>
              <Divider className='for_dividerline' />
              {selectedItem?.Sol_StockNo != "" &&
                <div className='for_diaTitleLine'>
                  <span>
                    {diadata?.carat}{" "}
                    Carat {diadata?.colorname} {diadata?.clarityname}{" "}
                    {diadata?.cutname} Cut {diadata?.shapename} Diamond
                  </span>
                </div>
              }
              <div className="for_StockCart-options">
                {selectedItem?.metaltypename != "" &&
                  <div className="option">
                    <label htmlFor="metal-type">Metal Type:</label>
                    <span>{selectedItem?.metaltypename}</span>
                  </div>
                }
                {selectedItem?.metaltypename != "" &&
                  <div className="option">
                    <label htmlFor="metal-color">Metal Color:</label>
                    <span>{selectedItem?.metalcolorname}</span>
                  </div>
                }
                {(selectedItem?.Dwt !== "0" || selectedItem?.Dpcs !== "0") && (
                  <div className="option">
                    <label htmlFor="diamond">Diamond:</label>
                    <span>
                      {combineDiamondInfo(selectedItem?.diamondquality, selectedItem?.diamondcolor)}
                    </span>
                  </div>
                )}
                {((selectedItem?.CSwt != "0" || selectedItem?.CSpcs != "0") && (selectedItem?.colorstonequality && selectedItem?.colorstonecolor)) &&
                  <div className="option">
                    <label htmlFor="diamond">Color Stone:</label>
                    <span>{combineDiamondInfo(selectedItem?.colorstonequality, selectedItem?.colorstonecolor)}</span>
                  </div>
                }
                {selectedItem?.Size != "" &&
                  <div className="option">
                    <label htmlFor="size">Size:</label>
                    <span>{selectedItem?.Size}</span>
                  </div>
                }
              </div>
              <div className="for_stockPriceQtyDiv">
                <div className="option">
                  <label htmlFor="qty">Qty:</label>
                  <span>{selectedItem?.Quantity}</span>
                </div>
                <div>
                  {storeInitData?.IsPriceShow == 1 &&
                    <div className="for_Stockproduct-price">
                      {!ispriceloding ? (
                        <span>
                          {loading == false &&
                            <>
                              <span className="for_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                              {selectedItem?.Sol_StockNo != "" ? formatter(((selectedItem?.FinalCost + diadata?.price) ?? selectedItem?.FinalCost)) : formatter(((selectedItem?.FinalCost)))}
                            </>
                          }
                        </span>
                      ) :
                        <Skeleton className='for_CartSkelton' variant="text" width="80%" animation="wave" />
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </>
      ) :
        <div className="for_CartCusto_R-details">
          <p className='for_cart-Titleline'>
            <span>
              {selectedItem?.carat}{" "}
              Carat {selectedItem?.colorname} {selectedItem?.clarityname}{" "}
              {selectedItem?.cutname} Cut {selectedItem?.shapename} Diamond
            </span>
          </p>
          <Divider className='for_dividerline' />
          <div className="for_stockPriceQtyDiv">
            <div className="option">
              <label htmlFor="qty">SKU:</label>
              <span>{selectedItem?.stockno}</span>
            </div>
            <div>
              {storeInitData?.IsPriceShow == 1 &&
                <div className="for_Stockproduct-price">
                  {!ispriceloding ? (
                    <span>
                      <span className="for_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                      {formatter(selectedItem?.price)}
                    </span>
                  ) :
                    <Skeleton className='for_CartSkelton' variant="text" width="80%" animation="wave" />
                  }
                </div>
              }
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Customization;
