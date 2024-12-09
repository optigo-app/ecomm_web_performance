import React, { useEffect, useState } from "react";
import Usewishlist from "../../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist";
import WishlistItems from "./WishlistItems";
import Button from "@mui/material/Button";
import Footer from "../../Home/Footer/Footer";
import "./dt_wishlist.scss";
import WishlistData from "./WishlistData";
import SkeletonLoader from "./WishlistSkelton";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { dt_CartCount, dt_WishCount } from '../../../Recoil/atom';
import ConfirmationDialog from "../../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog";
import Cookies from "js-cookie";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";

const Wishlist = () => {
  const {
    isWLLoading,
    wishlistData,
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
    handelMenu
  } = Usewishlist();

  const [dialogOpen, setDialogOpen] = useState(false);
  const setWishCountVal = useSetRecoilState(dt_WishCount)
  const setCartCountVal = useSetRecoilState(dt_CartCount)
  const visiterId = Cookies.get('visiterId');


  const handleRemoveAllDialog = () => {
    setDialogOpen(true);
  };


  const handleConfirmRemoveAll = async () => {
    setDialogOpen(false);
    const returnValue = await handleRemoveAll();
    if(returnValue?.msg == "success"){
      GetCountAPI(visiterId).then((res) => {
        setWishCountVal(res?.wishcount);
      })
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  const handleAddtoCartAllfun = async() => {
    const returnValue = await handleAddtoCartAll();
      if(returnValue?.msg == "success"){
        GetCountAPI(visiterId).then((res) => {
          setCartCountVal(res?.cartcount);
        })
      }
  }

  useEffect(() =>{
    setCSSVariable();
  },[])

  const setCSSVariable = () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="dt_MainWlDiv">
      <div className="dt_WlMainPageDiv">
        <div className="WlBtnGroupMainDiv">
          <div className="dt_Wl-title">My Wishlist</div>
          {wishlistData?.length != 0 &&
            <>
              <div className="dt_WlButton-group">
                <Link
                  className="dt_ReomoveAllWLbtn"
                  href="#"
                  variant="body2"
                  onClick={handleRemoveAllDialog}
                >
                  CLEAR ALL
                </Link>
                {/* <button className='dt_WlClearAllBtn' onClick={handleRemoveAll}>CLEAR ALL</button> */}
                <button className="dt_WlAddToCartBtn" onClick={handleAddtoCartAllfun}>ADD TO CART ALL</button>
                {/* <button className='dt_WlBtn'>SHOW PRODUCT LIST</button> */}
              </div>
            </>
          }

        </div>
        {!isWLLoading ? (
          <WishlistData
            isloding={isWLLoading}
            items={wishlistData}
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
        ) : (
          <div style={{ marginTop: '90px' }}>
            <SkeletonLoader />
          </div>
        )}
        <ConfirmationDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRemoveAll}
          title="Confirm"
          content="Are you sure you want to remove all Items?"
        />

      </div>
        <Footer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBlock: "30px",
        }}
      >
        <p
          style={{
            margin: "0px",
            fontWeight: 500,
            color: "#a8807c",
            cursor: "pointer",
          }}
          onClick={scrollToTop}
        >
          BACK TO TOP
        </p>
      </div>
    </div>
  );
};

export default Wishlist;
