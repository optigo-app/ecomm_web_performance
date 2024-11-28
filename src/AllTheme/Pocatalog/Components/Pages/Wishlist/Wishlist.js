import React, { useEffect, useState } from "react";
import Usewishlist from "../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist";
import WishlistItems from "./WishlistItems";
import Button from "@mui/material/Button";
import Footer from "../Home/Footer/Footer";
import "./proCat_wishlist.scss";
import WishlistData from "./WishlistData";
import SkeletonLoader from "./WishlistSkelton";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { proCat_CartCount, proCat_WishCount } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from "js-cookie";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ConfirmationDialog from "../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog";

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
  const setWishCountVal = useSetRecoilState(proCat_WishCount)
  const setCartCountVal = useSetRecoilState(proCat_CartCount)
  const visiterId = Cookies.get('visiterId');
  const isMobileScreen = useMediaQuery('(max-width:768px)');


  const handleRemoveAllDialog = () => {
    setDialogOpen(true);
  };


  const handleConfirmRemoveAll = async () => {
    setDialogOpen(false);
    const returnValue = await handleRemoveAll();
    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setWishCountVal(res?.wishcount);
      })
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  const handleAddtoCartAllfun = async () => {
    const returnValue = await handleAddtoCartAll();
    if (returnValue?.msg == "success") {
      toast.success("All wishlist items added in cart")
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  }

  useEffect(() => {
    setCSSVariable();
  }, [])

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

  console.log("cartdataCount--", wishlistData);

  return (
    <div className="proCat_MainWlDiv">
       <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div className="WlMainPageDiv">
        <div className="WlBtnGroupMainDiv">
          {isMobileScreen &&
            <div className="proCat_Wl-title">My Wishlist</div>
          }
          {wishlistData?.length != 0 &&
            <>
              <div className="proCat_WlButton-group">
                <Link
                  className="proCat_ReomoveAllWLbtn"
                  href="#"
                  variant="body2"
                  onClick={handleRemoveAllDialog}
                >
                  CLEAR ALL
                </Link>
                {!isMobileScreen &&
                  <div className="proCat_Wl-title">My Wishlist</div>
                }
                <button className="proCat_WlAddToCartBtn" onClick={handleAddtoCartAllfun}>ADD TO CART ALL</button>
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
    </div>
  );
};

export default Wishlist;
