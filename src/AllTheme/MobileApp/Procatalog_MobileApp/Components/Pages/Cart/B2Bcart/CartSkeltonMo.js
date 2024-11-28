import React from 'react';
import "./smrMo_cartSkelton.scss"
import { Grid, Skeleton, useMediaQuery } from '@mui/material';

const CartPageSkeleton = () => {
  const isWideScreen = useMediaQuery('(min-width:1025px)');

  return (
    <Grid container spacing={1} sx={{ padding: '5px 5px' }}>
      <Grid item xs={12} md={9} className='smrmo_cartSkeltonListCardGrid'>
        <Grid container spacing={3}>
          {[...Array(9)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton className='smrmo_CartSkelton' variant="rectangular" width="100%" height={200} animation="wave" />
            </Grid>
          ))}
        </Grid>
      </Grid>

      {isWideScreen &&
        <Grid item xs={12} md={3}>
          <div className='smrmo_cartskeltonRightSide'>
            <Skeleton className='smrmo_CartSkelton' variant="rectangular" width="90%" height={500} animation="wave" />
            <Skeleton className='smrmo_CartSkelton' variant="text" width="80%" animation="wave" />
            <Skeleton className='smrmo_CartSkelton' variant="text" width="80%" animation="wave" />
            <Skeleton className='smrmo_CartSkelton' variant="text" width="60%" animation="wave" />
          </div>
        </Grid>
      }
    </Grid>
  );
};

export default CartPageSkeleton;
