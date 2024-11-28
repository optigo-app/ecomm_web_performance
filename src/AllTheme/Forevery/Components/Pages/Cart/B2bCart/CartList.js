import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CartItem from './CartItem';
import DiamondItems from './DiamondItem';

const CartList = ({
  items,
  diamondData,
  setOpenMobileModal,
  openHandleUpdateCartModal,
  CartCardImageFunc,
  onSelect,
  CurrencyData,
  decodeEntities,
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
}) => {

  return (
    <div className="for_RightCartList">
      <div className='for_tablelable'>
        <p>Image</p>
        <p>Product Details</p>
        <p>Price</p>
        <p>Total Price</p>
      </div>

      <>
        <div className='for_cartListMapDiv'>
          {items.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              diamondValue={diamondData}
              index={index}
              CartCardImageFunc={CartCardImageFunc}
              CurrencyData={CurrencyData}
              decodeEntities={decodeEntities}
              onSelect={onSelect}
              selectedItem={selectedItem}
              selectedItemsLength={selectedItems?.length}
              isActive={selectedItems?.includes(item)}
              isSelected={multiSelect ? selectedItems?.includes(item) : selectedItem === item}
              multiSelect={multiSelect}
              onRemove={onRemove}
              itemLength={items?.length}
              showRemark={showRemark}
              productRemark={productRemark}
              handleAddReamrk={handleAddReamrk}
              handleRemarkChange={handleRemarkChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
              openHandleUpdateCartModal={openHandleUpdateCartModal}
            />
          ))}

          {diamondData?.length != 0 &&
            <DiamondItems
              // key={item.id}
              diaData={diamondData}
              // index={index}
              cartData={items}
              CartCardImageFunc={CartCardImageFunc}
              CurrencyData={CurrencyData}
              decodeEntities={decodeEntities}
              onSelect={onSelect}
              selectedItem={selectedItem}
              selectedItemsLength={selectedItems?.length}
              // isActive={selectedItems?.includes(item)}
              // isSelected={multiSelect ? selectedItems?.includes(item) : selectedItem === item}
              multiSelect={multiSelect}
              onRemove={onRemove}
              itemLength={items?.length}
              showRemark={showRemark}
              productRemark={productRemark}
              handleAddReamrk={handleAddReamrk}
              handleRemarkChange={handleRemarkChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
              openHandleUpdateCartModal={openHandleUpdateCartModal}
            />
          }
        </div>
      </>
    </div>
  );
};

export default CartList;
