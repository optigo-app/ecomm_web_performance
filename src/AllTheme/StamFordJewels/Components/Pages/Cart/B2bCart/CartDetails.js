import React, { useEffect, useState } from 'react';
import './stam_cartPage.scss';
import Customization from './Customization';
import noImageFound from "../../../Assets/image-not-found.jpg"

const CartDetails = ({
  ispriceloding,
  selectedItem,
  CartCardImageFunc,
  qtyCount,
  handleIncrement,
  handleDecrement,
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
  handleMoveToDetail
}) => {

  const [storeInitData, setStoreInitData] = useState();
  const [imageSrc, setImageSrc] = useState(noImageFound);

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
    <div className="stam_cart-container">
      <div className="stam_Cart-imageDiv">
        {/* <img src={selectedItem?.imageUrl} alt="Cluster Diamond" className='stam_cartImage' /> */}
        <img 
        src={imageSrc} 
        alt="image" 
        className='stam_cartDetailImage'  
        onClick={() => handleMoveToDetail(selectedItem)}
        />
      </div>
      <Customization
        ispriceloding={ispriceloding}
        selectedItem={selectedItem}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        qtyCount={qtyCount}
        showRemark={showRemark}
        productRemark={productRemark}
        sizeCombo={sizeCombo}
        CurrencyData={CurrencyData}
        mrpbasedPriceFlag={mrpbasedPriceFlag}
        handleAddReamrk={handleAddReamrk}
        handleRemarkChange={handleRemarkChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleMetalTypeChange={handleMetalTypeChange}
        handleMetalColorChange={handleMetalColorChange}
        handleDiamondChange={handleDiamondChange}
        handleColorStoneChange={handleColorStoneChange}
        handleSizeChange={handleSizeChange}
        decodeEntities={decodeEntities}
        onUpdateCart={onUpdateCart}
      />
    </div>
  );
};

export default CartDetails;

