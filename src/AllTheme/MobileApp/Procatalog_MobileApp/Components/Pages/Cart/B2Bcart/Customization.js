import React, { useEffect, useState } from 'react';
import './smrMo_cartPage.scss';
import { Divider, Skeleton } from '@mui/material';
import QuantitySelector from './QuantitySelectorMo';

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

  return (
    <div className="smrMo_Cart_R-details">
      <p className='smrmo_cart-Titleline'>{selectedItem?.TitleLine}</p>
      <Divider />
      {storeInitData?.IsProductWebCustomization == 1 &&
        <div className="smrmo_Cart-options">
          {storeInitData?.IsMetalCustomization == 1 &&
            <div className="option">
              <label htmlFor="metal-type">Metal Type:</label>
              <select id="metal-type" value={selectedItem?.metaltypename} onChange={handleMetalTypeChange}>
                {mrpbasedPriceFlag == 1 ? (
                  <option value={selectedItem?.metaltypename}>{selectedItem?.metaltypename}</option>
                ) :
                  <>
                    {metalTypeCombo.map(option => (
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
              <select id="metal-color" value={selectedItem?.metalcolorname} onChange={handleMetalColorChange}>
                {mrpbasedPriceFlag == 1 ? (
                  <option value={selectedItem?.metalcolorname}>{selectedItem?.metalcolorname}</option>
                ) :
                  <>
                    {
                      metalColorCombo.map(option => (
                        <option key={option.id} value={option.colorname}> {option.colorname}</option>
                      ))
                    }
                  </>
                }
              </select>
            </div>
          }
          {storeInitData?.IsDiamondCustomization == 1 &&
            <div className="option">
              <label htmlFor="diamond">Diamond:</label>
              <select id="diamond" value={selectedItem?.diamondquality + '#' + selectedItem?.diamondcolor} onChange={handleDiamondChange}>
                {mrpbasedPriceFlag == 1 ? (
                  <option value={selectedItem?.diamondquality + '#' + selectedItem?.diamondcolor}>{selectedItem?.diamondquality + '#' + selectedItem?.diamondcolor}</option>
                ) :
                  <>
                    {diamondQualityColorCombo.map(option => (
                      <option key={option?.ColorId + ',' + option?.QualityId} value={option?.Quality + '#' + option?.color}> {option?.Quality + '#' + option?.color}</option>
                    ))}
                  </>
                }
              </select>
            </div>
          }
          {storeInitData?.IsCsCustomization == 1 &&
            <div className="option">
              <label htmlFor="diamond">Color Stone:</label>
              <select id="diamond" value={selectedItem?.colorstonequality + '#' + selectedItem?.colorstonecolor} onChange={handleColorStoneChange}>
                {mrpbasedPriceFlag == 1 ? (
                  <option value={selectedItem?.colorstonequality + '#' + selectedItem?.colorstonecolor}>{selectedItem?.colorstonequality + '#' + selectedItem?.colorstonecolor}</option>
                ) :
                  <>
                    {ColorStoneCombo.map(option => (
                      <option key={option?.ColorId + ',' + option?.QualityId} value={option?.Quality + '#' + option?.color}>{option?.Quality + '#' + option?.color}</option>
                    ))}
                  </>
                }
              </select>
            </div>  
          }
          {sizeCombo?.rd?.length !== 0 &&
            <div className="option">
              <label htmlFor="size">Size:</label>
              <select id="size" defaultValue={selectedItem?.Mastermanagement_CategorySize} value={selectedItem?.size} onChange={handleSizeChange}>
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
      <div className='smrmo_cartQtyPricemainDev'>
        <QuantitySelector selectedItem={selectedItem} handleIncrement={handleIncrement} handleDecrement={handleDecrement} qtyCount={qtyCount} />
        {storeInitData?.IsPriceShow == 1 &&
          <div className="product-price">
            {!ispriceloding ? (
              <span>
                <span
                  className="smrmo_currencyFont"
                  dangerouslySetInnerHTML={{
                    __html: decodeEntities(
                      CurrencyData?.Currencysymbol
                    ),
                  }}
                />
                {(selectedItem?.UnitCostWithmarkup)}
              </span>
            ) :
              <Skeleton className='smrmo_CartSkelton' variant="text" width="80%" animation="wave" />
            }
          </div>
        }
      </div>
      <div className='smrmo_UpdateCartBtn'>
        <button className="smrmo_cartUpdate-button" onClick={() => onUpdateCart(selectedItem)}>Save</button>
      </div>
    </div>
  );
};

export default Customization;
