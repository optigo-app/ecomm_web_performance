import React from 'react';
import Grid from '@mui/material/Grid';
import WishlistItems from './WishlistItems';


const WishlistData = ({
  isloding,
  items,
  updateCount,
  countDataUpdted,
  itemInCart,
  curr,
  decodeEntities,
  handleRemoveItem,
  handleWishlistToCart,
  WishCardImageFunc,
  handleMoveToDetail,
  handelMenu,
  imageSrc
}) => {

  const handleRedirect = () => {
    handelMenu();
  }

  console.log('itemLength', items?.length);

  return (
    <div className="smrMo_WlListData">
      <>
        <Grid container spacing={2}>
          {items.map(item => (
            <WishlistItems
            imageSrc={imageSrc}
              key={item.id}
              item={item}
              updateCount={updateCount}
              countDataUpdted={countDataUpdted}
              currency={curr}
              itemInCart={itemInCart}
              decodeEntities={decodeEntities}
              WishCardImageFunc={WishCardImageFunc}
              itemsLength={items?.length}
              handleRemoveItem={handleRemoveItem}
              handleWishlistToCart={handleWishlistToCart}
              handleMoveToDetail={handleMoveToDetail}
            />
          ))}
        </Grid>
        {items.length == 0 &&
          <div className='smrMo_noWishlistData'>
            <div>
              <p className='smrMo_title'>No Wishlist Found!</p>
              <p className='smrMo_desc'>Please First Add Product in Wishlist</p>
              <button className='smrMo_browseOurCollectionbtn' onClick={handleRedirect}>Browse our collection</button>
            </div>
          </div>
        }
      </>
    </div>
  );
};

export default WishlistData;
