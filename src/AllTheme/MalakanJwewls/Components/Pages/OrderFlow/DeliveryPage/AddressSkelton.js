import React from 'react';
import './AddressSkelton.scss'
import { Box, Skeleton, Card, CardContent } from '@mui/material';

const SkeletonLoader = () => {
  const skeletonArray = new Array(4).fill(0);

  return (
    <Box className="mala_addCardSkeltonMainBox">
      {skeletonArray.map((_, index) => (
        <Card className='mala_addCardSkelton' key={index}>
          <Skeleton className='mala_addCardSkelton' variant="rectangular" height={280} animation="wave" />
        </Card>
      ))}
    </Box>
  );
};

export default SkeletonLoader;
