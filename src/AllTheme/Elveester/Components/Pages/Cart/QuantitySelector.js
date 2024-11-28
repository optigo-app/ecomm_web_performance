import React, { useState } from 'react';
import './elv_cartPage.scss';

const QuantitySelector = ({ selectedItem, qtyCount, handleIncrement, handleDecrement, }) => {

  return (
    <div className="elv_cart-quantity">
      <button className="elv_bttn elv_bttn-left" onClick={() => handleDecrement(selectedItem)}>
        <span>-</span> 
      </button>
      <input
        type="number"
        className="elv_input"
        id="input"
        defaultValue={selectedItem?.Quantity}
        value={selectedItem?.Quantity}
        readOnly
      />
      <button className="elv_bttn elv_bttn-right" onClick={() => handleIncrement(selectedItem)}>
        <span>+</span>
      </button>
    </div>
  );
};

export default QuantitySelector;
