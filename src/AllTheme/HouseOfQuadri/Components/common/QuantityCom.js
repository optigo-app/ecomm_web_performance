import React, { useState } from "react";
import "./QuantityCom.scss"; // Import SCSS file for styling

const QuantityCom = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  return (
    <div className="quantity-container">
      <button className="quantity-button" onClick={decrement}>
        -
      </button>
      <span className="quantity-value">{quantity}</span>
      <button className="quantity-button" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default QuantityCom;
