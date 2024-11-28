import React from "react";
import B2bCart from "./ProCatB2bCart/Cart";
import { Helmet } from "react-helmet";

const CartMain = () => {

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <B2bCart />
    </div>
  );
};

export default CartMain;
