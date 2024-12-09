import React, { useEffect, useState } from 'react';
import B2bCart from "./B2Bcart/CartMo";
import B2cCart from "./CartPageB2c/Cart";
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CartMain = () => {
    const [storeInitData, setStoreInitData] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        setStoreInitData(storeInit);
    }, []);

    return (
        <div>
            <p className="SmiCartListTitle" style={{
                marginTop:'1rem',
                display:'flex',
                alignItems: 'center',
                fontSize: '1rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333',
            }}>
                <IoArrowBack size={22} style={{ marginRight: '10px' }} onClick={() => navigation(-1)} />My Cart
            </p>
            {storeInitData && storeInitData.IsB2BWebsite == 1 ? (
                <B2bCart />
            ) : (
                // <B2cCart />
                <B2bCart />
            )}
        </div>
    );
};

export default CartMain;
