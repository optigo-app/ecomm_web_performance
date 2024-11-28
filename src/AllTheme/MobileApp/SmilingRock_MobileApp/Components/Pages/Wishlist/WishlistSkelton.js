import React from 'react';
import './smrMo_wishlist.scss';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

const SkeletonLoader = () => {
  const skeletonArray = new Array(6).fill(0);

  return (
    <Grid container spacing={1} className="smrMo_addwishlistSkeltonMainBox">
      {skeletonArray.map((_, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>
          <Card className='smrMo_addwishlistSkelton'>
            <Skeleton
              className='smrMo_addwishlistSkelton'
              variant="rectangular"
              width="100%"
              animation="wave" />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoader;
