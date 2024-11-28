import React, { useEffect, useState } from 'react';
import B2bCart from "./B2bCart/Cart";
import B2cCart from "./CartPageB2c/Cart";
import CartPage3 from "./CartPage3/Cart";

const CartMain = () => {
    const [cartComponent, setCartComponent] = useState(null);

    useEffect(() => {
        const storeInit = JSON?.parse(sessionStorage.getItem('storeInit'));
        const cartNo = storeInit?.CartNo ?? 1;
        // const cartNo = 1;

        switch (cartNo) {
            case 1:
                setCartComponent(<B2bCart />);
                break;
            case 2:
                setCartComponent(<B2cCart />);
                break;
            case 3:
                setCartComponent(<CartPage3 />);
                break;
            default:
                setCartComponent(<B2bCart />);
                break;
        }
    }, []);

    return (
        <div>
            {cartComponent}
        </div>
    );
};

export default CartMain;
