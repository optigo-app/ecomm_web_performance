import React, { useEffect, useState } from 'react';
import useCart from '../../../../../../utils/Glob_Functions/Cart_Wishlist/for_Cart';
import CartDetails from './CartDetails';
import CartList from './CartList';
import SelectedItemsModal from './SelectedModal';
import Button from '@mui/material/Button';
import './for_cartPage.scss';
import Footer from '../../Home/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, InputLabel, Link, useMediaQuery } from '@mui/material';
import CartPageSkeleton from './CartSkelton';
import { for_CartCount, for_loginState } from '../../../Recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import MobileCartDetails from "./MobileCartDetails"
import { green } from '@mui/material/colors';
import { handlePaymentAPI } from '../../../../../../utils/API/OrderFlow/PlaceOrderAPI';
import { toast } from 'react-toastify';
import { useAddress } from '../../../../../../utils/Glob_Functions/OrderFlow/useAddress';
import Cookies from "js-cookie";
import NewsletterSignup from '../../ReusableComponent/SubscribeNewsLater/NewsletterSignup';
import btnStyle from "../../../scss/Button.module.scss"
import ConfirmationDialog from '../../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog';

const CartPage = () => {
  const addressData = useAddress();

  const {
    isloding,
    ispriceloding,
    cartData,
    diamondCartData,
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
    isSelectedAll,
    handleSelectAll,
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
  const [storeInit, setStoreInit] = useState();
  const [defaultAddr, setDefaultAddr] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [countstatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(for_CartCount)
  const islogin = useRecoilValue(for_loginState);
  const visiterId = Cookies.get('visiterId');
  const isLargeScreen = useMediaQuery('(min-width:1000px)');
  const isMobileScreen = useMediaQuery('(max-width:768px)');
  const [selectedDia, setSelectedDia] = useState();

  const redirectUrl = `/loginOption/?LoginRedirect=/Delivery`;
  const handlePlaceOrder = () => {
    let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    let priceData = cartData?.reduce(
      (total, item) => total + item?.FinalCost,
      0
    );
    sessionStorage.setItem("TotalPriceData", priceData);
    if (storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null) {
      navigate(redirectUrl);
      // navigate('/loginOption')
    } else {
      navigate("/Delivery", { replace: true });
    }
    window.scrollTo(0, 0);
  };


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [])


  useEffect(() => {
    const iswishUpdateStatus = sessionStorage.getItem('cartUpdation');
    setCountStatus(iswishUpdateStatus)
  }, [handleRemoveItem, handleRemoveAll])

  const handleRemoveAllDialog = () => {
    setDialogOpen(true);
  };


  const handleConfirmRemoveAll = async () => {
    setDialogOpen(false);
    const returnValue = await handleRemoveAll();
    
    const existingData = JSON.parse(sessionStorage.getItem('custStepData')) || [];
    const existingData1 = JSON.parse(sessionStorage.getItem('custStepData2')) || [];

    if (existingData1?.[0]?.step1Data != undefined) {
      const newIsInCartValue = 0;

      const updatedData = existingData1.map(step => {
        if (step.step1Data != undefined) {
          return {
            ...step,
            step1Data: {
              ...step.step1Data,
              IsInCart: newIsInCartValue
            }
          };
        }
        return step;
      });

      sessionStorage.setItem('custStepData2', JSON.stringify(updatedData));
    }

    if (existingData?.[1]?.step2Data != undefined) {
      const newIsInCartValue = 0;

      const updatedData = existingData.map(step => {
        if (step.step2Data != undefined) {
          return {
            ...step,
            step2Data: {
              ...step.step2Data,
              IsInCart: newIsInCartValue
            }
          };
        }
        return step;
      });

      sessionStorage.setItem('custStepData', JSON.stringify(updatedData));
    }

    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeInit);
    if (storeInit?.IsPLW == 1) {
      if (addressData && addressData.addressData) {
        const defaultAddress = addressData.addressData.find(addr => addr?.isdefault === 1);

        if (defaultAddress) {
          setDefaultAddr(defaultAddress)
        } else {
          console.log('No default address found.');
        }
      }
    }
  }, []);



  const handlePay = async () => {
    const visiterId = Cookies.get('visiterId');
    const paymentResponse = await handlePaymentAPI(visiterId, islogin);

    if (paymentResponse?.Data?.rd[0]?.stat == 1) {
      let num = paymentResponse.Data?.rd[0]?.orderno
      sessionStorage.setItem('orderNumber', num);
      navigate('/Confirmation', { replace: true });
      GetCountAPI().then((res) => {

        setCartCountVal(res?.cartcount)
      })

    } else {
      toast.error('Something went wrong!')
    }
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     const diamondValue = diamondCartData?.find((dia) => dia?.stockno == selectedItem?.Sol_StockNo);
  //     setSelectedDia(diamondValue)
  //   }, 500);
  // }, [selectedItem])

  return (
    <div className='for_MainBGDiv'>
      <div className="for_cart-title">Cart</div>
      <div className='cartMainPageDiv'>
        <div className="cartBtnGroupMainDiv">
          {!isloding && (cartData.length !== 0 || diamondCartData?.length !== 0) &&
            <div className='for_cartButton-groups'>
              <Link
                className='for_ReomoveAllCartbtn'
                variant="body2"
                onClick={handleRemoveAllDialog}
              >
                Clear All
              </Link>
            </div>
          }
          {!isloding && (cartData.length !== 0 || diamondCartData?.length !== 0) &&
            <div className='for_placeOrderMainbtnDivs'>
              <button className={`${btnStyle?.btn_for_new2} ${btnStyle?.btn_16}`} onClick={handlePlaceOrder}>Place Order</button>
            </div>
          }
        </div>
        {!isloding ? (
          <>
            <div style={{ marginLeft: '35px' }}>
              {multiSelect &&
                <FormControlLabel
                  control={<Checkbox
                    sx={{
                      color: "rgba(125, 127, 133, 0.4) !important",
                    }}
                  />}
                  label="Select All"
                  checked={isSelectedAll()}
                  onChange={handleSelectAll}
                  sx={{
                    color: "rgba(125, 127, 133, 0.4)",
                  }}
                />
              }
            </div>
            {!isloding && (cartData.length != 0 || diamondCartData?.length != 0) ? (
              <div className="for_cartMainPage">
                <div className="for_cart-left-sides">
                  <CartList
                    items={cartData}
                    diamondData={diamondCartData}
                    CartCardImageFunc={CartCardImageFunc}
                    showRemark={showRemark}
                    productRemark={productRemark}
                    CurrencyData={CurrencyData}
                    decodeEntities={decodeEntities}
                    onSelect={handleSelectItem}
                    selectedItem={selectedItem}
                    selectedItems={selectedItems}
                    multiSelect={multiSelect}
                    onRemove={handleRemoveItem}
                    handleAddReamrk={handleAddReamrk}
                    handleRemarkChange={handleRemarkChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    openHandleUpdateCartModal={handleOpenModal}
                  />
                </div>
                <div className="for_cart-right-side">
                  {isLargeScreen ? (
                    <div className='for_pc-cartDetail'>
                      {selectedItem && (
                        <CartDetails
                          ispriceloding={ispriceloding}
                          selectedItem={selectedItem}
                          diamondData={diamondCartData}
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
                      )}
                    </div>
                  ) :
                    <div className='for_mobile-cartDetails'>
                      <MobileCartDetails
                        open={openMobileModal}
                        handleClose={handlecloseMobileModal}
                        ispriceloding={ispriceloding}
                        selectedItem={selectedItem}
                        diamondData={diamondCartData}
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
                  }
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
              <div className='for_noCartlistData'>
                <p className='for_title'>No Data Found!</p>
                <p className='for_desc'>Please First Add Product in Cart</p>
                <button className='for_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
              </div>
            }
          </>
        ) :
          <CartPageSkeleton />
        }
        <ConfirmationDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRemoveAll}
          title="Confirm"
          content="Are you sure you want to remove all Items?"
        />

      </div>
      <NewsletterSignup />
    </div>
  );
};

export default CartPage;
