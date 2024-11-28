import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CartItem from './CartItemMo';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartList = ({
  items,
  CartCardImageFunc,
  onSelect,
  selectedItem,
  selectedItems,
  multiSelect,
  showRemark,
  CurrencyData,
  decodeEntities,
  productRemark,
  onRemove,
  handleAddReamrk,
  handleRemarkChange,
  handleSave,
  handleCancel,
  handleMoveToDetail
}) => {

  const [storeInitData, setStoreInitData] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const navigate = useNavigate();
  const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
    let priceData = items.reduce((total, item) => total + item.FinalCost, 0)
    setTotalPrice(priceData)
  },[onRemove,handleSave])

  const handlePlaceOrder = () => {
    let priceData = items.reduce((total, item) => total + item.FinalCost, 0)
    sessionStorage.setItem('TotalPriceData', priceData)
    navigate("/payment")
    window.scrollTo(0, 0);
  }

  return (
    <div className="smrMo_RightCartList">
      <Grid container spacing={2} className='smrMo_GridCardComponent'>
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            CurrencyData={CurrencyData}
            decodeEntities={decodeEntities}
            CartCardImageFunc={CartCardImageFunc}
            onSelect={onSelect}
            selectedItem={selectedItem}
            isActive={selectedItems.includes(item)}
            isSelected={multiSelect ? selectedItems.includes(item) : selectedItem === item}
            multiSelect={multiSelect}
            onRemove={onRemove}
            itemLength={items?.length}
            showRemark={showRemark}
            productRemark={productRemark}
            handleAddReamrk={handleAddReamrk}
            handleRemarkChange={handleRemarkChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleMoveToDetail={handleMoveToDetail}
          />
        ))}
      </Grid>
      <div className="smrMo_product-containerMain">
        {items?.length != 0 && (
          <Box className="smrMo_product-containerBox">
            {storeInitData?.IsPriceShow == 1 &&
              <div className="smrMo_product-price">
                  <span style={{fontWeight: 600 , fontSize: '20px', color:'#7d7f85'}}>
                    {/* <span
                      className="smrMO_currencyFont"
                      dangerouslySetInnerHTML={{
                        __html: decodeEntities(
                          CurrencyData?.Currencysymbol
                        ),
                      }}
                    /> */}
                      <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                    {totalPrice}
                  </span>
              </div>
            }
            <Button
              className='smrMO_Placeorderbtn'
              fullWidth
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
};

export default CartList;
