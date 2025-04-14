import React, { useEffect, useState } from 'react';
import './elv_cartPage.scss';
import Customization from './Customization';
import noImageFound from "../../Assets/image-not-found.jpg"
import { CardMedia, Skeleton } from '@mui/material';

const CartDetails = ({
  ispriceloding,
  selectedItem,
  CartCardImageFunc,
  qtyCount,
  handleIncrement,
  handleDecrement,
  multiSelect,
  handleAddReamrk,
  productRemark,
  sizeCombo,
  showRemark,
  CurrencyData,
  mrpbasedPriceFlag,
  handleRemarkChange,
  handleSave,
  handleCancel,
  handleMetalTypeChange,
  handleMetalColorChange,
  handleDiamondChange,
  handleColorStoneChange,
  handleSizeChange,
  onUpdateCart,
  decodeEntities,
  handleMoveToDetail }) => {

  // useEffect(() => {
  //   console.log("TCL: selectedItem", selectedItem)
  // }, [selectedItem])

  const [storeInitData, setStoreInitData] = useState();

  useEffect(() => {
    const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInitData(storeinitData)
  }, [])

  const CDNDesignImageFolThumb = storeInitData?.CDNDesignImageFolThumb;
  // const fullImagePath = `${CDNDesignImageFolThumb}${selectedItem?.designno}~1.${selectedItem?.ImageExtension}`;
  const fullImagePath = `${CDNDesignImageFolThumb}${selectedItem?.designno}~1.jpg`;

  const isLoading = selectedItem?.loading;

  const [imageSrc, setImageSrc] = useState();

  // useEffect(() => {
  //   if (storeInitData?.Themeno !== 3) {
  //     if (selectedItem?.ImageCount > 0) {
  //       CartCardImageFunc(selectedItem).then((src) => {
  //         setImageSrc(src);
  //       });
  //     } else {
  //       setImageSrc(noImageFound);
  //     }
  //   }
  // }, [selectedItem, storeInitData]);

  return (
    <div className="elv_cart-container">
      <div className="elv_Cart-imageDiv">
        <div>
          <span style={{ fontSize: '14px', padding: '5px', fontWeight: '500' }}>{selectedItem?.designno}</span>
        </div>
        {/* {imageSrc !== undefined && (
          <img src={imageSrc} alt="Cluster Diamond" className='elv_cartImage' onClick={() => handleMoveToDetail(selectedItem)} />
        )} */}
        {(storeInitData?.Themeno !== 3 ? imageSrc === undefined : isLoading === true) ? (
          <CardMedia
            width="100%"
            height={400}
            sx={{
              width: "100%",
              height: "400px !important",
              '@media (max-width: 1750px)': {
                width: "100%",
                height: "350px !important",
              },
              '@media (max-width: 1500px)': {
                width: "100%",
                height: "300px !important",
              },
              '@media (max-width: 1100px)': {
                width: "100%",
                height: "250px !important",
              },
            }}
          >
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="100%"
            />
          </CardMedia>
        ) : (
          <img
            src={selectedItem?.images ? selectedItem?.images :
              selectedItem?.ImageCount > 1 ? `${storeInitData?.CDNDesignImageFolThumb}${selectedItem?.designno}~1~${selectedItem?.metalcolorname}.jpg` :
                `${storeInitData?.CDNDesignImageFolThumb}${selectedItem?.designno}~1.jpg`
            }
            alt=""
            className='elv_cartImage'
            onClick={() => handleMoveToDetail(selectedItem)}
            onError={((e) => {
              if (selectedItem?.ImageCount > 0) {
                e.target.src = fullImagePath ? fullImagePath : noImageFound;
              } else {
                e.target.src = noImageFound;
              }
            })}
            loading='lazy'
          />
        )}
      </div>
      <Customization
        ispriceloding={ispriceloding}
        selectedItem={selectedItem}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        qtyCount={qtyCount}
        showRemark={showRemark}
        productRemark={productRemark}
        sizeCombo={sizeCombo}
        CurrencyData={CurrencyData}
        mrpbasedPriceFlag={mrpbasedPriceFlag}
        handleAddReamrk={handleAddReamrk}
        handleRemarkChange={handleRemarkChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleMetalTypeChange={handleMetalTypeChange}
        handleMetalColorChange={handleMetalColorChange}
        handleDiamondChange={handleDiamondChange}
        handleColorStoneChange={handleColorStoneChange}
        handleSizeChange={handleSizeChange}
        decodeEntities={decodeEntities}
        onUpdateCart={onUpdateCart}
      />
    </div>
  );
};

export default CartDetails;

