import React from 'react';
import Grid from '@mui/material/Grid';
import WishlistItems from './WishlistItems';
import DiamondLitsItems from './DiamondLitsItems';

const WishlistData = ({
  items,
  diamondData,
  updateCount,
  sol_stockArr,
  matchingDiamonds,
  filteredSolStockArr,
  nonMatchingDiamonds,
  countDataUpdted,
  itemInCart,
  curr,
  decodeEntities,
  handleRemoveItem,
  handleWishlistToCart,
  WishCardImageFunc,
  handleMoveToDetail,
  handelMenu
}) => {

  const matchingStockNos = matchingDiamonds.map(d => d.stockno);

  // Filter diamondData to exclude matching diamonds
  const filteredDiamondData = diamondData.filter(d => !matchingStockNos.includes(d.stockno));

  return (
    <div className="for_WlListData">
      <Grid container spacing={2} className='for_wlListGrid'>
        {items.length > 0 && (
          items.map(item => (
            <WishlistItems
              key={item.id}
              item={item}
              matchingDiamonds={matchingDiamonds}
              diamondValue={diamondData}
              updateCount={updateCount}
              countDataUpdted={countDataUpdted}
              currency={curr}
              itemInCart={itemInCart}
              decodeEntities={decodeEntities}
              WishCardImageFunc={WishCardImageFunc}
              itemsLength={items.length}
              handleRemoveItem={handleRemoveItem}
              handleWishlistToCart={handleWishlistToCart}
              handleMoveToDetail={handleMoveToDetail}
            />
          ))
        )}

        {nonMatchingDiamonds.length > 0 && (
          nonMatchingDiamonds.map(diamond => (
            <DiamondLitsItems
              key={diamond.id}
              item={diamond}
              diamondValue={filteredDiamondData}
              matchingDiamonds={matchingDiamonds}
              updateCount={updateCount}
              countDataUpdted={countDataUpdted}
              currency={curr}
              itemInCart={itemInCart}
              decodeEntities={decodeEntities}
              WishCardImageFunc={WishCardImageFunc}
              itemsLength={items.length}
              handleRemoveItem={handleRemoveItem}
              handleWishlistToCart={handleWishlistToCart}
              handleMoveToDetail={handleMoveToDetail}
            />
          ))
        )}
      </Grid>

      {(items.length === 0 && diamondData.length === 0) && (
        <div className='for_noWishlistData'>
          <p className='for_title'>No Wishlist Found!</p>
          <p className='for_desc'>Please First Add Product in Wishlist</p>
          <button className='for_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
        </div>
      )}
    </div>
  );
};

export default WishlistData;
