import React, { useState } from 'react';
import './mala3_cartPage.scss';
import { HiPlus ,HiMinus  } from "react-icons/hi";

const QuantitySelector = ({ selectedItem, qtyCount, handleIncrement, handleDecrement, }) => {

  return (
    <div className="mala3_cart-quantity">
      <button className="bttn bttn-left" onClick={() => handleDecrement(selectedItem)}>
        <span ><HiMinus size={16}/></span> 
      </button>
      <input
        type="number"
        className="input"
        id="input"
        value={selectedItem?.Quantity}
        readOnly
      />
      <button className="bttn bttn-right" onClick={() => handleIncrement(selectedItem)}>
        <span ><HiPlus size={16}/></span>
      </button>
    </div>
  );
};

export default QuantitySelector;
