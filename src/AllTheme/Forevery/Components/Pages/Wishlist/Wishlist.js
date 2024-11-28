import React, { useEffect, useState } from "react";
import Usewishlist from "../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist";
import WishlistItems from "./WishlistItems";
import Button from "@mui/material/Button";
import Footer from "../Home/Footer/Footer";
import "./for_wishlist.scss";
import WishlistData from "./WishlistData";
import SkeletonLoader from "./WishlistSkelton";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { for_CartCount, for_WishCount, for_loginState } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from "js-cookie";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa6";
import NewsletterSignup from "../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import ConfirmationDialog from "../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog";

const Wishlist = () => {
  const {
    isWLLoading,
    wishlistData,
    diamondWishData,
    CurrencyData,
    updateCount,
    countDataUpdted,
    itemInCart,
    decodeEntities,
    WishCardImageFunc,
    handleRemoveItem,
    handleRemoveAll,
    handleWishlistToCart,
    handleAddtoCartAll,
    handleMoveToDetail,
    handelMenu,
  } = Usewishlist();

  const [dialogOpen, setDialogOpen] = useState(false);
  const setWishCountVal = useSetRecoilState(for_WishCount);
  const setCartCountVal = useSetRecoilState(for_CartCount);
  const islogin = useRecoilValue(for_loginState);
  const visiterId = Cookies.get("visiterId");
  const isMobileScreen = useMediaQuery("(max-width:768px)");

  const sol_stockArr = wishlistData?.map(i => i?.Sol_StockNo) || [];

  // Find the stock numbers from diamonds that match items
  const matchingDiamonds = diamondWishData.filter(diamond =>
    sol_stockArr.includes(diamond?.stockno)
  );

  // Remove matching stock numbers from sol_stockArr
  const filteredSolStockArr = sol_stockArr.filter(stockNo =>
    matchingDiamonds.some(diamond => diamond.stockno === stockNo)
  );

  // Filter diamonds that do not match any item Sol_StockNo
  const nonMatchingDiamonds = diamondWishData.filter(diamond =>
    !filteredSolStockArr.includes(diamond?.stockno)
  );

  const handleRemoveAllDialog = () => {
    setDialogOpen(true);
  };

  const handleConfirmRemoveAll = async () => {
    setDialogOpen(false);
    const returnValue = await handleRemoveAll();

    const existingData = JSON.parse(sessionStorage.getItem('custStepData')) || [];
    const existingData1 = JSON.parse(sessionStorage.getItem('custStepData2')) || [];

    if (existingData1?.[0]?.step1Data != undefined) {
      const newIsInWishValue = 0;

      const updatedData = existingData1.map(step => {
        if (step.step1Data != undefined) {
          return {
            ...step,
            step1Data: {
              ...step.step1Data,
              IsInWish: newIsInWishValue
            }
          };
        }
        return step;
      });

      sessionStorage.setItem('custStepData2', JSON.stringify(updatedData));
    }

    if (existingData?.[1]?.step2Data != undefined) {
      const newIsInWishValue = 0;

      const updatedData = existingData.map(step => {
        if (step.step2Data != undefined) {
          return {
            ...step,
            step2Data: {
              ...step.step2Data,
              IsInWish: newIsInWishValue
            }
          };
        }
        return step;
      });

      sessionStorage.setItem('custStepData', JSON.stringify(updatedData));
    }


    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setWishCountVal(res?.wishcount);
      });
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddtoCartAllfun = async () => {
    const returnValue = await handleAddtoCartAll();
    if (returnValue?.msg == "success") {
      toast.success("All wishlist items added in cart");
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      });
    }
  };

  useEffect(() => {
    setCSSVariable();
  }, []);



  const setCSSVariable = () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  };

  return (
    <div className="for_MainWlDiv">
      <div className="for_blacklineDiv"></div>
      <div className="for_WishlistDiv">
        <div className="for_wishtitleDiv">
          <FaHeart className="for_wishHeartIcon" />
          <span>My Wishlist</span>
        </div>
      </div>
      <div className="for_WishlistSubDiv">
        <div className="for_wishtitlesubDiv">
          <div className="for_wishtitleDiv">
            <img
              src="https://forevery.one/icons_images/accountwishlist2.png"
              className="for_wishHeartIcon"
            />
            <span>My Wishlist</span>
          </div>
        </div>
        {(wishlistData?.length != 0 || diamondWishData?.length != 0) &&
          <div className="for_wishlistRemoveBtndiv">
            <button onClick={handleRemoveAllDialog}>Remove All</button>
            <button onClick={handleAddtoCartAllfun}>Add to Cart All</button>
          </div>
        }
        {/* {!isWLLoading && (
          <>
            {(wishlistData?.length == 0 ||  diamondWishData?.length == 0) && (
              <div className='for_noWishlistData'>
                <p className='for_title'>No Wishlist Found!</p>
                <p className='for_desc'>Please First Add Product in Wishlist</p>
                <button className='for_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
              </div>
            )}
          </>
        )} */}
        {!isWLLoading ? (
          <div className="for_wishlistCardDiv">
            <WishlistData
              isloding={isWLLoading}
              items={wishlistData}
              diamondData={diamondWishData}
              sol_stockArr={sol_stockArr}
              matchingDiamonds={matchingDiamonds}
              filteredSolStockArr={filteredSolStockArr}
              nonMatchingDiamonds={nonMatchingDiamonds}
              updateCount={updateCount}
              countDataUpdted={countDataUpdted}
              curr={CurrencyData}
              itemInCart={itemInCart}
              decodeEntities={decodeEntities}
              WishCardImageFunc={WishCardImageFunc}
              handleRemoveItem={handleRemoveItem}
              handleWishlistToCart={handleWishlistToCart}
              handleMoveToDetail={handleMoveToDetail}
              handelMenu={handelMenu}
            />
          </div>
        ) :
          <div style={{ marginTop: '90px' }}>
            <SkeletonLoader />
          </div>
        }
        <ConfirmationDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRemoveAll}
          title="Confirm"
          content="Are you sure you want to remove all Items?"
        />
      </div>
      <NewsletterSignup />
    </div>
  );
};

export default Wishlist;
