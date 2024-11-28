import React, { useEffect, useState } from 'react';
import B2bCart from "./B2bCart/Cart";

const CartMain = () => {
    const [storeInitData, setStoreInitData] = useState(null);
    useEffect(() => {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        setStoreInitData(storeInit);
    }, []);

    return (
        <div>
                <B2bCart />
        </div>
    );
};

export default CartMain;
