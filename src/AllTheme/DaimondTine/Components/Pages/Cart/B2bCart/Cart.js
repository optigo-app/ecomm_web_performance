import React, { useEffect, useState } from 'react';
import useCart from '../../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import CartDetails from './CartDetails';
import CartList from './CartList';
import SelectedItemsModal from './SelectedModal';
import Button from '@mui/material/Button';
import './dt_cartPage.scss';
import Footer from '../../Home/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, InputLabel, Link, useMediaQuery } from '@mui/material';
import CartPageSkeleton from './CartSkelton';
import ConfirmationDialog from '../../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog';
import { dt_CartCount, dt_loginState } from '../../../Recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import MobileCartDetails from "./MobileCartDetails"
import { green } from '@mui/material/colors';
import { handlePaymentAPI } from '../../../../../../utils/API/OrderFlow/PlaceOrderAPI';
import { toast } from 'react-toastify';
import { useAddress } from '../../../../../../utils/Glob_Functions/OrderFlow/useAddress';
import Cookies from "js-cookie";


const CartPage = () => {
  const addressData = useAddress();

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
  const setCartCountVal = useSetRecoilState(dt_CartCount)
  const islogin = useRecoilValue(dt_loginState);
  const visiterId = Cookies.get('visiterId');
  const isLargeScreen = useMediaQuery('(min-width:1000px)');
  const isMobileScreen = useMediaQuery('(max-width:768px)');

  const redirectUrl = `/loginOption/?LoginRedirect=/Delivery`;
  const handlePlaceOrder = () => {
    if (storeInit?.IsPLW == 0) {
      let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
      let priceData = cartData?.reduce(
        (total, item) => total + item?.FinalCost,
        0
      );
      sessionStorage.setItem("TotalPriceData", priceData);
      if (storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null) {
        navigate(redirectUrl);
      } else {
        navigate("/Delivery", { replace: true });
      }
    } else {
      handlePay();
    }
    window.scrollTo(0, 0);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


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
      navigate('/Confirmation');
      GetCountAPI().then((res) => {
        setCartCountVal(res?.cartcount)
      })
    } else {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className='dt_MainBGDiv'>
      <div className='cartMainPageDiv'>
        <div className="cartBtnGroupMainDiv">
          {isMobileScreen &&
            <div className="dt_cart-title">My Cart</div>
          }
          <div className='dt_cartmainRowDiv'>
            {!isloding && cartData?.length != 0 &&
              <div className='dt_cartButton-groups'>
                <Link
                  className='dt_ReomoveAllCartbtn'
                  variant="body2"
                  onClick={handleRemoveAllDialog}
                >
                  Clear All
                </Link>
              </div>
            }
            {!isMobileScreen &&
              <div className="dt_cart-title">My Cart</div>
            }
            {!isloding && cartData?.length != 0 &&
              <div className='dt_placeOrderMainbtnDivs'>
                <button className="dt_place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
              </div>
            }
          </div>

          {/* {!isloding && cartData.length != 0 &&
            <>
              <div className="dt_cartButton-group">
                <button className="dt_cartBtn dt_cartActivebtn">List View</button>
                <button className='dt_cartBtn'>Image View</button>
                <button className='dt_cartBtn' onClick={handleRemoveAll}>Clear All</button>
                <div>
                  <Link
                    className='dt_ReomoveAllCartbtn'
                    variant="body2"
                    onClick={handleRemoveAllDialog}
                  >
                    Clear All
                  </Link>
                  <Link
                    className='dt_ReomoveAllCartbtn dt_SelectAllCartbtn'
                    variant="body2"
                    onClick={handleMultiSelectToggle}
                  >
                    {multiSelect ? 'Disable MultiSelect' : 'Enable MultiSelect'}
                  </Link>
                </div>

                <button className='dt_cartBtn'>Show ProductList</button>

                <button className='dt_cartBtn' onClick={handleMultiSelectToggle}>{multiSelect ? 'Disable MultiSelect' : 'Select All'}</button>
                {multiSelect && selectedItems.length != 0 &&
                  <button className='dt_cartBtn' onClick={handleOpenModal} >Show Selected Items</button>
                }
                <div className='dt_placeOrderMobileMainbtnDiv'>
                  <button className="dt_place-order-btnMobile" onClick={handlePlaceOrder}>Place Order</button>
                </div>
              </div>
              <div className='dt_placeOrderMainbtnDiv'>
                <button className="dt_place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
              </div>
            </>
          } */}
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
            {cartData.length !== 0 ? (
              <div className="dt_cartMainPage">
                <div className="dt_cart-left-sides">
                  <CartList
                    items={cartData}
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
                <div className="dt_cart-right-side">
                  {isLargeScreen ? (
                    <div className='dt_pc-cartDetail'>
                      {selectedItem && (
                        <CartDetails
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
                      )}
                    </div>
                  ) :
                    <div className='dt_mobile-cartDetails'>
                      <MobileCartDetails
                        open={openMobileModal}
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
              <div className='dt_noCartlistData'>
                <p className='dt_title'>No Data Found!</p>
                <p className='dt_desc'>Please First Add Product in Cart</p>
                <button className='dt_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
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
      <Footer />
    </div>
  );
};

export default CartPage;
