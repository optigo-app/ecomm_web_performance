import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './rJ_cartPageB2c.scss';
import QuantitySelector from './QuantitySelector';
import CloseIcon from '@mui/icons-material/Close';
import noImageFound from "../../../Assets/image-not-found.jpg";
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import CartTableData from "./CartTableData"
import { orz_loginState, roop_loginState } from '../../../Recoil/atom';

const Cart = ({
  isOpen,
  closeDrawer,
  items,
  qtyCount,
  CartCardImageFunc,
  CurrencyData,
  onSelect,
  selectedItem,
  selectedItems,
  multiSelect,
  showRemark,
  productRemark,
  onRemove,
  handleAddReamrk,
  handleRemarkChange,
  handleSave,
  handleCancel,
  decodeEntities,
  handleDecrement,
  handleIncrement,
  handelMenu
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const islogin = useRecoilValue(orz_loginState);
  const [totalPrice, setTotalPrice] = useState();
  const [storeInitData, setStoreInitData] = useState();
  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (items) {
        let priceData = items?.reduce((total, item) => total + item?.FinalCost, 0);
        setTotalPrice(priceData)
      }
    }, 300);
  }, [items])

  const redirectUrl = `/loginOption/?LoginRedirect=/Delivery`;
  const handlePlaceOrder = () => {
    let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    if (storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null) {
      // navigate('/LoginOption')
      navigate(redirectUrl);
      closeDrawer();
    } else {
      navigate("/Delivery")
      let priceData = items?.reduce((total, item) => total + item?.FinalCost, 0);
      sessionStorage.setItem('TotalPriceData', priceData)
      closeDrawer();
    }
    window.scrollTo(0, 0);
  }

  const handleBrowse = () => {
    closeDrawer();
    handelMenu();
  }

  return (
    <div className="rJ_B2cCart">
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={closeDrawer}
        PaperProps={{
          className: "rJ_B2ccartPaperDrawer",
          style: {
            width: '40%',
          },
        }}
        className='rJ_B2ccartDrawer'
      >
        <div className="rJ_B2C-container">
          <div className='rJ_b2cCartPageButonGp'>
            <div className='rJ_b2ccartCloseIcon' onClick={closeDrawer}>
              <CloseIcon />
            </div>
            <div className='rJ_cartB2cMainTitleBtn' >
              <p>Your Cart</p>
            </div>
          </div>
          <div className='rJ_b2cCartTb'>
            {items?.length !== 0 ? (
              items?.map((item, index) => (
                <CartTableData
                  key={index}
                  cartData={item}
                  qtyCount={qtyCount}
                  CurrencyData={CurrencyData}
                  CartCardImageFunc={CartCardImageFunc}
                  noImageFound={noImageFound}
                  decodeEntities={decodeEntities}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  onRemove={onRemove}
                />
              ))
            ) : (
              <div className='rJ_noB2CcartData'>
                <p className='rJ_title'>No Product Found!</p>
                <p className='rJ_desc'>Please First Add Product in cart</p>
                <button className='rJ_browseOurCollectionbtn' onClick={handleBrowse}>Browse our collection</button>
              </div>
            )}

          </div>
          <div>

          </div>
          {items?.length != 0 &&
            <div className='rJ_B2cCheckoutBtnDiv'>
              <button className='rJ_B2cCheckoutBtn' onClick={handlePlaceOrder}>
                {storeInitData?.IsPriceShow == 1 &&
                  <span>
                    {/* <span
                      className="rJ_currencyFont"
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(
                          CurrencyData?.Currencysymbol
                        ),
                      }}
                    /> */}
                    {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
                    {" "}{totalPrice}
                  </span>
                }{' - '}CHECKOUT</button>
            </div>
          }
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
