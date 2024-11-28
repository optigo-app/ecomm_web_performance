import React, { useEffect, useState } from 'react';
import './elv_cartPage.scss';
import { useNavigate } from 'react-router-dom';
import useCart from '../../../../../utils/Glob_Functions/Cart_Wishlist/Cart';
import CartDetails from './CartDetails';
import CartList from './CartList';
import Modal from '@mui/material/Modal';
import SelectedItemsModal from './SelectedModal';
import noImageFound from "../../Assets/image-not-found.jpg"
import SellIcon from '@mui/icons-material/Sell';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import { Box, Breadcrumbs, CircularProgress, FormControl, Typography, useMediaQuery } from '@mui/material';
import { GetCountAPI } from '../../../../../utils/API/GetCount/GetCountAPI';
import { useSetRecoilState } from 'recoil';
import { el_CartCount } from '../../Recoil/atom';
import RemarkDialog from './OrderRemarkDialog';
import { OrderFlowCrumbs } from './OrderFlowCrumbs';
import { formatter, storImagePath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import { handleOrderRemark } from '../../../../../utils/API/OrderRemarkAPI/OrderRemarkAPI';
import MobileCartDetails from './MobileCartDetails';
import ConfirmationDialog from '../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog';

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
  const visiterId = Cookies.get('visiterId');
  const isTabletResponsive = useMediaQuery('(max-width:1000px)');
  const isMobileResp1 = useMediaQuery('(max-width:800px)');
  const isMobileResp2 = useMediaQuery('(max-width:600px)');
  const isMobileResp3 = useMediaQuery('(max-width:425px)');
  const [storeinit, setStoreInit] = useState();

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInit(data)
  }, [])

  const getTotalPrice = [];
  const totalPrice = cartData?.reduce((total, item) => total + item?.FinalCost, 0)
  getTotalPrice?.push({
    total: totalPrice
  })
  useEffect(() => {
    sessionStorage.setItem('totalProdPrice', JSON.stringify(getTotalPrice[0]));
  }, [getTotalPrice])

  const [border, setBorder] = useState(false);
  const [open, setOpen] = useState(false);
  const [showRemark1, setShowRemark1] = useState(false);
  const [countStatus, setCountStatus] = useState();
  const setCartCountVal = useSetRecoilState(el_CartCount);
  const [orderRemark, setOrderRemark] = useState();
  const [randomNumber, setRandomNumber] = useState('');
  const [openPriceModal, setOpenPriceModal] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setShowRemark1(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => {
    setShowRemark1(false)
  }
  const handleOpenPriceModal = () => setOpenPriceModal(true);
  const handleClosePriceModal = () => setOpenPriceModal(false);

  useEffect(() => {
    const iswishUpdateStatus = sessionStorage.getItem('cartUpdation');
    setCountStatus(iswishUpdateStatus)
  }, [handleRemoveItem, handleRemoveAll])

  const handleBorder = () => {
    setBorder(!border);
  }

  const handleRemarkChangeInternal = (e) => {
    setOrderRemark(e.target.value);
  };

  const loginInfo = JSON.parse(sessionStorage.getItem('loginUserDetail'));

  const handleSaveInternal = () => {
    handleOrderRemarkFun(orderRemark);
    setShowRemark1(false)
  };

  const handleConfirmRemoveAll = async () => {
    const returnValue = await handleRemoveAll();
    if (returnValue?.msg == 'success') {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 3,
  };

  const handleCloseRemove = () => {
    handleConfirmRemoveAll();
    handleClose();
  }

  const generateRandomNumber = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };

  useEffect(() => {
    setRandomNumber(generateRandomNumber(10));
  }, []);

  const handleMoveToOrder = () => {
    navigate('/Delivery', { replace: true });
    sessionStorage.setItem('iscartData', randomNumber);
  }

  const handleOrderRemarkFun = async (remark) => {
    setOrderRemark(remark);
    try {
      const response = await handleOrderRemark(remark);
      let resStatus = response?.Data?.rd[0]
      if (resStatus?.stat == 1) {
        // const updatedCartData = cartData.map(cart =>
        //     cart.id == data.id ? { ...cart, Remarks: resStatus?.design_remark } : cart
        // );
        sessionStorage.setItem('orderRemark', orderRemark)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };


  return (
    <>
      {isloding && (
        <div style={{
          width: " 100%",
          height: "100%",
          position: "fixed",
          zIndex: '100',
          background: '#83838333',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
            <CircularProgress sx={{ color: '#2e2d2d' }} />
          </Box>
        </div>
      )}
      <div className="elv_Productlists_Main_div">
        <div className="elv_Productlists_lists_div">
          <div className="elv_Productlists_lists_header">
            <div className="elv_Productlists_lists_header_breadcrumb">
              <div className="elv_Productslists_lists_name">
                <div className="elv_Productlists_details">
                  <span className="elv_Productlists_details_1" >
                    my cart
                    {/* <OrderFlowCrumbs param1={"My cart"} param2={''} param3={''} /> */}
                  </span>
                </div>
              </div>
              <div className="elv_Productlists_lists_header_logo">
                <span>
                  <p className="elv_Productlist_ptitle">
                    <img
                      className="elv_Productlist_logo"
                      src={`${storImagePath()}/images/HomePage/MainBanner/featuresImage.png`}
                      alt="Logo"
                    />
                  </p>
                </span>
              </div>
            </div>
            {cartData.length ? (
              <div className="elv_filteration_block_div">
                <div className="elv_Cartblock_rows">
                  {isMobileResp2 ? (
                    <>
                      <div className="elv_Cartblock_rows_1_combo" >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2rem', fontSize: '13px' }} onClick={handleOpenPriceModal}>
                          <span style={{ textDecoration: 'underline' }}>Price Details</span>
                          <SellIcon className='elv_price_mdoalIcon' />
                        </div>
                        <Modal open={openPriceModal} onClose={handleClosePriceModal}>
                          <Box sx={modalStyle}>
                            <span className="elv_total_price_title">
                              Total Price: &nbsp;
                              {storeinit?.IsPriceShow == 1 && (
                                <span>
                                  <span
                                    style={{ fontWeight: 'bold' }}
                                    className="elv_currencyFont"
                                  >
                                    {loginInfo?.CurrencyCode ?? CurrencyData?.CurrencyCode}
                                  </span>
                                  &nbsp;<span style={{ fontWeight: 'bold' }}>{formatter(getTotalPrice[0]?.total)}</span>
                                </span>
                              )}
                            </span>
                            <div className="elv_Cartblock_rows_2" >
                              <span className="elv_items_title">
                                <span style={{ fontWeight: '600' }}>{cartData?.length}</span>
                                <span>&nbsp;items</span>
                              </span>
                            </div>
                          </Box>
                        </Modal>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="elv_Cartblock_rows_1" >
                        <span className="elv_total_price_title">
                          {isMobileResp1 ? 'Price:' : '' || isMobileResp2 ? '' : 'Total Price:'}&nbsp;
                          {storeinit?.IsPriceShow == 1 && (
                            <span>
                              <span
                                style={{ fontWeight: 'bold' }}
                                className="elv_currencyFont"
                                dangerouslySetInnerHTML={{
                                  __html: decodeEntities(
                                    loginInfo?.CurrencyCode ?? CurrencyData?.CurrencyCode
                                  ),
                                }}
                              />
                              &nbsp;<span style={{ fontWeight: 'bold' }}>{formatter(getTotalPrice[0]?.total)}</span>
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="elv_Cartblock_rows_2" >
                        <span className="elv_items_title">
                          <span>{cartData?.length}</span>
                          <span>&nbsp;items</span>
                        </span>
                      </div>
                    </>
                  )}
                  <div className="elv_Cartblock_rows_3" >
                    {cartData?.length ? (
                      <span onClick={handleOpen} className="elv_clearAll_title">
                        Clear All
                      </span>
                    ) :
                      <span onClick={handleClose} className="elv_clearAll_title">
                        Clear All
                      </span>
                    }
                    <ConfirmationDialog
                      open={open}
                      onClose={handleClose}
                      onConfirm={handleCloseRemove}
                      title={"Confirm"}
                      content={"Are You Sure to Delete All these items?"}
                    />
                    {/* <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography className="elv_delete_modal_text" sx={{ fontSize: '18px' }} id="modal-modal-title" variant='subtitle2'>
                          Are You Sure to Delete All these items?
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                          <Button className="elv_del_button yes-button" onClick={handleCloseRemove}>Yes</Button>
                          <Button className="elv_del_button no-button" onClick={handleClose}>No</Button>
                        </div>
                      </Box>
                    </Modal> */}
                  </div>
                  <div className="elv_Cartblock_rows_4" >
                    {cartData?.length ? (
                      <span onClick={handleOpen1} className="elv_remarks_title">
                        <span>{orderRemark ? "View & Edit Order Remark" : "Add Order Remark"}</span>
                      </span>
                    ) :
                      <span onClick={handleClose1} className="elv_remarks_title">
                        <span>{orderRemark ? "View & Edit Order Remark" : "Add Order Remark"}</span>
                      </span>
                    }
                    <RemarkDialog
                      open1={showRemark1}
                      onClose1={handleClose1}
                      remark1={orderRemark}
                      onRemarkChange1={(e) => { }}
                      onSave1={handleOrderRemarkFun}
                    />
                  </div>
                  {cartData?.length ? (
                    <div className="elv_Cartblock_rows_5" onClick={handleMoveToOrder}>
                      <span className="elv_placeOrder_title">
                        Place Order
                      </span>
                    </div>
                  ) :
                    <div className="elv_Cartblock_rows_5">
                      <span className="elv_placeOrder_title">
                        Place Order
                      </span>
                    </div>
                  }
                </div>
              </div>
            ) : ('')}

            {cartData?.length !== 0 ? (
              <div className='elv_cartDetailsData_div'>
                <div className='elv_CartProducts_div'>
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
                    border={border}
                    handleBorder={handleBorder}
                    onRemove={handleRemoveItem}
                    handleAddReamrk={handleAddReamrk}
                    handleRemarkChange={handleRemarkChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    openHandleUpdateCartModal={handleOpenModal}
                    showRemark1={showRemark1}
                    handleClose1={handleClose1}
                  />
                </div>
                <div className='elv_CartSingleProducts_div'>
                  {!isTabletResponsive ? (
                    selectedItem && (
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
                    )
                  )
                    : (
                      <div className='elv_mobile-cartDetails'>
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
                    )
                  }

                </div>
              </div>
            ) : (
              <div className='elv_noCartlistData'>
                <p className='elv_title'>No Data Found!</p>
                <p className='elv_desc'>Please First Add Product in Cart</p>
                <button className='elv_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;