import React, { useEffect, useState } from 'react';
import useCart from '../../../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import CartList from './CartListMo';
import SelectedItemsModal from './SelectedModalMo';
import Button from '@mui/material/Button';
import './smrMo_cartPage.scss';
import { useNavigate } from 'react-router-dom';
import { Link, Snackbar, useMediaQuery } from '@mui/material';
import CartPageSkeleton from './CartSkeltonMo';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';
import MobileCartDetails from "./MobileCartDetailsMo"
import { smrMA_ShowSnackBar } from '../../../Recoil/atom';

const CartPage = () => {
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
    setOpenMobileModal,
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

  const handleRedirect = () => {
    handelMenu();
  }
  const snackbarOpenValue = useRecoilValue(smrMA_ShowSnackBar);
  const [snackbarOpen, setSnackbarOpen] = useRecoilState(smrMA_ShowSnackBar);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div className='smrMo_MainBGDiv'>
      <div className='smrMo_cartMainPageDiv'>
        {!isloding ? (
          <>
            {cartData.length !== 0 ? (
              <div className="smrMo_cartMainPage">
                <div className="smrMo_cartList">
                  <CartList
                    items={cartData}
                    CartCardImageFunc={CartCardImageFunc}
                    showRemark={showRemark}
                    productRemark={productRemark}
                    CurrencyData={CurrencyData}
                    onSelect={handleSelectItem}
                    selectedItem={selectedItem}
                    selectedItems={selectedItems}
                    multiSelect={multiSelect}
                    onRemove={handleRemoveItem}
                    handleAddReamrk={handleAddReamrk}
                    handleRemarkChange={handleRemarkChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    decodeEntities={decodeEntities}
                    handleMoveToDetail={handleMoveToDetail}
                  />
                </div>
                <div className="smrmo_cart-right-side">
                  <div className='smrmo_mobile-cartDetails'>
                    <MobileCartDetails
                      open={openMobileModal}
                      setOpenMobileModal={setOpenMobileModal}
                      handleClose={handlecloseMobileModal}
                      ispriceloding={ispriceloding}
                      selectedItem={selectedItem}
                      CartCardImageFunc={CartCardImageFunc}
                      handleIncrement={handleIncrement}
                      handleDecrement={handleDecrement}
                      qtyCount={qtyCount}
                      multiSelect={multiSelect}
                      sizeCombo={sizeCombo}
                      CurrencyData={CurrencyData}
                      mrpbasedPriceFlag={mrpbasedPriceFlag}
                      handleMetalTypeChange={handleMetalTypeChange}
                      handleMetalColorChange={handleMetalColorChange}
                      handleDiamondChange={handleDiamondChange}
                      handleColorStoneChange={handleColorStoneChange}
                      handleSizeChange={handleSizeChange}
                      decodeEntities={decodeEntities}
                      onUpdateCart={handleUpdateCart}
                      handleMoveToDetail={handleMoveToDetail}
                    />
                  </div>
                </div>
                <SelectedItemsModal
                  open={openModal}
                  onClose={handleCloseModal}
                  selectedItems={selectedItems}
                  onRemove={handleRemoveItem}
                  onUpdateCart={handleUpdateCart}
                  onCancelCart={handleCancelUpdateCart}
                />
              </div>
            ) :
              <div className='smrMo_noCartlistData'>
                <p className='smrmo_title'>No Product Found!</p>
                <p className='smrmo_desc'>Please First Add Product in cart</p>
                <button className='smrmo_browseOurCollectionbtn' onClick={handleRedirect}>Browse our collection</button>
              </div>
            }
          </>
        ) :
          <CartPageSkeleton />
        }
      </div>
      <Snackbar
        open={snackbarOpenValue}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Cart Updated Successfully"
        className='smr_MoSnakbarTM'
      />
    </div>
  );
};

export default CartPage;
