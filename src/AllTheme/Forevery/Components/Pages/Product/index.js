import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DiamondDetails from './DiamondDetails/DiamondDetails';
import ProductDetail from './ProductDetail/ProductDetail';

const DetailsRoute = () => {
  const location = useLocation();
  console.log('location: ', location);
  const [DiamondData, setDiamondData] = useState(false);

  const checkIfDiamondPage = (pathname) => {
    return pathname.split('/').some(part => part.toLowerCase().includes('det345'));
  };

  useEffect(() => {
    setDiamondData(checkIfDiamondPage(location.pathname));
  }, [location.pathname]);
  return (
    <>
      {DiamondData === true ? (
        <DiamondDetails />
      ) : (
        <ProductDetail />
      )}
    </>
  )
}

export default DetailsRoute