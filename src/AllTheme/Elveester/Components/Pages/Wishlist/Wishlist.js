import React, { useEffect, useState } from 'react'
import './Wishlist.modul.scss';
import WishlistData from './WishlistData';
import Usewishlist from '../../../../../utils/Glob_Functions/Cart_Wishlist/Wishlist';
import { useSetRecoilState } from 'recoil';
import { el_CartCount, el_WishCount } from '../../Recoil/atom';
import { GetCountAPI } from '../../../../../utils/API/GetCount/GetCountAPI';
import Cookies from 'js-cookie'
import SkeletonLoader from './WishlistSkeleton';
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { storImagePath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import ConfirmationDialog from '../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog';

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
  const setWishCountVal = useSetRecoilState(el_WishCount)
  const setCartCountVal = useSetRecoilState(el_CartCount)
  const visiterId = Cookies.get('visiterId');

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
      toast.success('All wishlist items added in cart', {
        hideProgressBar: true
      })
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      })
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 3,
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [])


  return (
    <>
      {isWLLoading && (
        <div style={{
          width: " 100%",
          height: "100%",
          position: "fixed",
          zIndex: '100',
          background: '#83838333',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
            <CircularProgress sx={{ color: '#2e2d2d' }} />
          </Box>
        </div>
      )}
      {/* <div className="elv_wishlist_main_div">
        <div className="elv_wishlist_div">
          <h2 className='elv_wishlist_header_title'>
            My Wishlist
          </h2>
          {wishlistData.length ? (
             <div className='elv_wishlist_buttons'>
             <button className='elv_wishlist_clearAll_btn' onClick={handleRemoveAllDialog}>Clear all</button>
             <button className='elv_wishlist_atcall_btn' onClick={handleAddtoCartAllfun}>add to cart all</button>
           </div>
          ) : ('')}
         
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
          {dialogOpen && (
            <>
              <Modal
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to remove all Item?
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                    <button style={{ color: 'blue', textDecoration: 'uppercase', border: 'none', background: 'transparent', position: 'relative', right: '2.5rem', fontSize: '18px' }} onClick={handleCloseDialog}>No</button>
                    <button style={{ color: 'blue', textDecoration: 'uppercase', border: 'none', background: 'transparent', position: 'relative', right: '15px', fontSize: '18px' }} onClick={handleConfirmRemoveAll}
                    >Yes</button>
                  </div>
                </Box>
              </Modal>
            </>
          )}

        </div>
      </div> */}
      <div className="elv_MainWlDiv">
        <div className="elv_WlMainPageDiv">
          <div className="elv_Productlists_lists_header_breadcrumb">
            <div className="elv_Productslists_lists_name">
              <div className="elv_Productlists_details">
                <span className="elv_Productlists_details_1" >
                  my wishlist
                </span>
              </div>
            </div>
            <div className="elv_Productlists_lists_header_logo">
              <span>
                <p className="elv_Productlist_ptitle">
                  <img
                    className="elv_Productlist_logo"
                    src={`${storImagePath()}/images/HomePage/MainBanner/featuresImage.png`}
                    alt="Logo"
                  />
                </p>
              </span>
            </div>
          </div>
          <div className="elv_WlBtnGroupMainDiv">
            {/* <div className="elv_Wl-title">My Wishlist</div> */}
            {wishlistData.length ? (
              <div className='elv_wishlist_buttons'>
                <button className='elv_wishlist_clearAll_btn' onClick={handleRemoveAllDialog}>Clear all</button>
                <button className='elv_wishlist_atcall_btn' onClick={handleAddtoCartAllfun}>add to cart all</button>
              </div>
            ) : ('')}

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
          {dialogOpen && (
            <>
              {/* <Modal
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography className="elv_delete_modal_text" sx={{ fontSize: '18px' }} id="modal-modal-title" variant='subtitle2'>
                    Are You Sure to Clear All these items?
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                    <Button className="elv_del_button yes-button" onClick={handleConfirmRemoveAll}>Yes</Button>
                    <Button className="elv_del_button no-button" onClick={handleCloseDialog}>No</Button>
                  </div>
                </Box>
              </Modal> */}
              <ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmRemoveAll}
                title={"Confirm"}
                content={"Are You Sure to Clear All these items?"}
              />
            </>
          )}

        </div>
      </div>
    </>
  )
}

export default Wishlist