import React, { useEffect, useState } from 'react';
import './for_cartPage.scss';
import Customization from './Customization';
import noImageFound from "../../../Assets/image-not-found.jpg"
import diaImage from "../../../Assets/round.png"

const CartDetails = ({
  ispriceloding,
  selectedItem,
  diamondData,
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
  const [imageSrc, setImageSrc] = useState();
  let getimcColorId = JSON?.parse(sessionStorage.getItem("cartWishImgColor"));

  useEffect(() => {
    if (selectedItem?.ImageCount > 0) {
      CartCardImageFunc(selectedItem).then((src) => {
        setImageSrc(src);
      });
    } else {
      setImageSrc(noImageFound);
    }
  }, [selectedItem]);
  const keyToCheck = "stockno"
  return (
    <div className="for_cart-container">
      <div className="for_Cart-imageDiv">
        {/* <img src={selectedItem?.imageUrl} alt="Cluster Diamond" className='for_cartImage' /> */}
        {!selectedItem?.hasOwnProperty(keyToCheck) ? (
          <img
            src={imageSrc}
            alt="image"
            className='for_cartDetailImage'
            onClick={() => handleMoveToDetail(selectedItem, getimcColorId !== undefined ? getimcColorId : "")}
          />
        ) :
          <img
            src={diaImage}
            alt="image"
            className='for_cartDetailImage'
            onClick={() => handleMoveToDetail(selectedItem)}
          />
        }
      </div>
      <Customization
        ispriceloding={ispriceloding}
        selectedItem={selectedItem}
        diamondData={diamondData}
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

