import React from 'react';
import './hoq_wishlist.scss';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

const SkeletonLoader = () => {
  const skeletonArray = new Array(4).fill(0);

  return (
    <Grid container spacing={1} className="hoq_addwishlistSkeltonMainBox" marginBottom={"2rem"}>
      {skeletonArray.map((_, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card className='hoq_addwishlistSkelton'>
            <Skeleton
              className='hoq_addwishlistSkelton'
              variant="rectangular"
              animation="wave" />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoader;
