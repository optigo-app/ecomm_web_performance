import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import WishlistItems from './WishlistItems';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';


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
  handelMenu
}) => {

  console.log('itemLength', items?.length);
  const [alignment, setAlignment] = React.useState('1');

  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  //   const element = document.querySelector('.roop_wlListGrid');
  //   element.classList.add('fade-out');

  //   setTimeout(() => {
  //     element.classList.remove('fade-out');
  //     element.classList.remove('roop_wlListGrid');
  //     void element.offsetWidth;
  //     element.classList.add('roop_wlListGrid');
  //   }, 800);
  // };

  const handleChange = (event, newAlignment) => {
    const element = document.querySelector('.roop_wlListGrid');
    element.classList.add('fade-out');

    setTimeout(() => {
      element.classList.remove('fade-out');
      // element.classList.add('fade-in');
      setAlignment(newAlignment);
    }, 400);
  };




  return (
    <div className="roop_WlListData">
      <>
        {items?.length != 0 &&
          <div className='roop_wlToggleButtonDiv'>
            <ToggleButtonGroup
              size="medium"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              className='roop_toggleWishButtonDiv'
              sx={{
                height: "35px",
                borderRadius: '0px',
                '.Mui-selected': {
                  backgroundColor: '#7d7f856e',
                  color: '#fff',
                },
                '.MuiToggleButton-root': {
                  borderRadius: '0px',
                  '&:not(.Mui-selected)': {
                    backgroundColor: 'transparent',
                    color: '#000',
                  }
                }
              }}
            >
              <ToggleButton value="1"><span style={{ padding: '0px 10px' }}>|</span></ToggleButton>
              <ToggleButton value="2"><span style={{ padding: '0px 10px' }}>||</span></ToggleButton>
            </ToggleButtonGroup>
          </div>
        }
        <Grid container spacing={2} className='roop_wlListGrid'>
          {items.map(item => (
            <WishlistItems
              key={item.id}
              selectedValue={alignment}
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
          <div className='roop_noWishlistData'>
            <p className='roop_title'>No Wishlist Found!</p>
            <p className='roop_desc'>Please First Add Product in Wishlist</p>
            <button className='roop_browseOurCollectionbtn' onClick={handelMenu}>Browse our collection</button>
          </div>
        }
      </>
    </div>
  );
};

export default WishlistData;
