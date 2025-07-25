import React, { useState } from 'react';
import Basket from './Drawer';
import useCart from '../../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartB2CDrawer } from '../../../Recoil/atom';
import { useNavigate } from 'react-router-dom';

function Cart(props) {
  const {
    isloding,
    ispriceloding,
    cartData,
    selectedItem,
    selectedItems,
    multiSelect,
    openModal,
    showRemark,
    productRemark,
    qtyCount,
    sizeCombo,
    CurrencyData,
    countData,
    mrpbasedPriceFlag,
    openMobileModal,
    finalCartData,
    handlecloseMobileModal,
    CartCardImageFunc,
    handleSelectItem,
    handleIncrement,
    handleDecrement,
    handleMultiSelectToggle,
    handleOpenModal,
    handleCloseModal,
    handleRemarkChange,
    handleSave,
    handleCancel,
    handleAddReamrk,
    handleRemoveItem,
    handleRemoveAll,
    handleUpdateCart,
    handleCancelUpdateCart,
    handleMetalTypeChange,
    handleMetalColorChange,
    handleDiamondChange,
    handleColorStoneChange,
    handleSizeChange,
    decodeEntities,
    handleMoveToDetail,
    handelMenu
  } = useCart();

  const navigate = useNavigate();
  const isOpen = useRecoilValue(cartB2CDrawer)
  const setCartOpenState = useSetRecoilState(cartB2CDrawer);

  const handleCloseDrawer = () => {
    setCartOpenState(false)
    // navigate(-1)
  }


  return (
    <div className="smr_CartPageMainB2cDiv">
      <Basket
        isOpen={isOpen}
        closeDrawer={handleCloseDrawer}
        items={finalCartData}
        qtyCount={qtyCount}
        CurrencyData={CurrencyData}
        CartCardImageFunc={CartCardImageFunc}
        showRemark={showRemark}
        productRemark={productRemark}
        onSelect={handleSelectItem}
        selectedItem={selectedItem}
        selectedItems={selectedItems}
        multiSelect={multiSelect}
        onRemove={handleRemoveItem}
        handleAddReamrk={handleAddReamrk}
        handleRemarkChange={handleRemarkChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        decodeEntities={decodeEntities}
        handelMenu={handelMenu}
      />
    </div>
  );
}

export default Cart;
