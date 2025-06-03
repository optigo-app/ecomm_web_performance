import React, { useEffect, useState } from "react";
import "./hoq_cartPage.scss";
import Customization from "./Customization";
import noImageFound from "../../../Assets/noImageFound.jpg";
import { CardMedia, Skeleton } from "@mui/material";

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
  handleMoveToDetail,
}) => {

  const [imageSrc, setImageSrc] = useState();

  const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
  const CDNDesignImageFolThumb = storeinitData?.CDNDesignImageFolThumb;
  // const fullImagePath = `${CDNDesignImageFolThumb}${selectedItem?.designno}~1.${selectedItem?.ImageExtension}`;
  const fullImagePath = `${CDNDesignImageFolThumb}${selectedItem?.designno}~1.jpg`;

  const isLoading = selectedItem?.loading;

  // useEffect(() => {
  //   if (selectedItem?.ImageCount > 0) {
  //     CartCardImageFunc(selectedItem).then((src) => {
  //       setImageSrc(src);
  //     });
  //   } else {
  //     setImageSrc(noImageFound);
  //   }
  // }, [selectedItem]);

  return (
    <div className="hoq_cart-container">
      <div className="hoq_Cart-imageDiv">
        {/* <img src={selectedItem?.imageUrl} alt="Cluster Diamond" className='hoq_cartImage' /> */}
        {isLoading === true ? (
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
              selectedItem?.ImageCount > 1 ? `${storeinitData?.CDNDesignImageFolThumb}${selectedItem?.designno}~1~${selectedItem?.metalcolorname}.jpg` :
                `${storeinitData?.CDNDesignImageFolThumb}${selectedItem?.designno}~1.jpg`
            }
            alt=" "
            sx={{
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              '&:focus': { outline: 'none' },
              '&:active': { outline: 'none' },
            }}
            className="hoq_cartDetailImage"
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
