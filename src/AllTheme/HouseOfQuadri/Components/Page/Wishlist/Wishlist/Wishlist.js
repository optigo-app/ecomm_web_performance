import React, { useEffect, useState } from "react";
import Usewishlist from "../../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist";
import WishlistItems from "./WishlistItems";
import Button from "@mui/material/Button";
import "./hoq_wishlist.scss";
import WishlistData from "./WishlistData";
import SkeletonLoader from "./WishlistSkelton";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Hoq_CartCount, Hoq_WishCount } from "../../../Recoil/atom";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog";

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
  const setWishCountVal = useSetRecoilState(Hoq_WishCount)
  const setCartCountVal = useSetRecoilState(Hoq_CartCount)
  const visiterId = Cookies.get('visiterId');
 const [StoreInit,setstoreInit] =useState();

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



  const handleAddtoCartAllfun = async () => {
    const returnValue = await handleAddtoCartAll();
    if (returnValue?.msg == "success") {
      toast.success(<Toast/>,{
        hideProgressBar: true, 
        style: {
          borderRadius: "4px",
          padding : '-2px 45px' , 
          boxShadow : `rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px`,
          border  :"2px solid white"
        },
      });
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  }
  // 

  useEffect(() =>{
    setCSSVariable();
  },[])

  const setCSSVariable = () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    setstoreInit(storeInit)
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
    <div className="hoq_MainWlDiv">
      <div className="WlMainPageDiv">
        <div className="WlBtnGroupMainDiv">
          <div className="hoq_Wl-title">My Wishlist</div>
          {wishlistData?.length != 0 &&
            <>
              <div className="hoq_WlButton-group">
                <Link
                  className="hoq_ReomoveAllWLbtn"
                  href="#"
                  variant="body2"
                  onClick={handleRemoveAllDialog}
                >
                  CLEAR ALL
                </Link>
                {/* <button className='hoq_WlClearAllBtn' onClick={handleRemoveAll}>CLEAR ALL</button> */}
                <button className="hoq_WlAddToCartBtn" onClick={handleAddtoCartAllfun}>ADD TO CART ALL</button>
                {/* <button className='hoq_WlBtn'>SHOW PRODUCT LIST</button> */}
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
            StoreInit={StoreInit}
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
          title="Remove Item"
          content="Are you sure you want to remove all Item?"
        />

      </div>
      {/* <div
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
            color: "white",
            cursor: "pointer",
          }}
          onClick={scrollToTop}
        >
          BACK TO TOP
        </p>
      </div> */}
    </div>
  );
};

export default Wishlist;
const Toast = () => (
  <div className="cust_hoq_toast">
    <div className="right">All wishlist items added in Cart.</div>
  </div>
);