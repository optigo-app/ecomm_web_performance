import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StockListings from './ProductList/StockListings';
import ProductList from './ProductList/ProductList';

const ProdMain = () => {
    const getUrl = useLocation();

    return (
        <div style={{
            marginBottom: "3rem"
        }}>
            {getUrl?.pathname === "/p/searchbystock" ? <StockListings /> : <ProductList />}
        </div>
    );
};

export default ProdMain;
