import React from 'react';
import './Wishlist.modul.scss';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

const SkeletonLoader = () => {
  const skeletonArray = new Array(4).fill(0);

  return (
    <Grid container spacing={1} className="elv_addwishlistSkeltonMainBox">
      {skeletonArray.map((_, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card className='elv_addwishlistSkelton'>
            <Skeleton
              className='elv_addwishlistSkelton'
              variant="rectangular"
              animation="wave" />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoader;
