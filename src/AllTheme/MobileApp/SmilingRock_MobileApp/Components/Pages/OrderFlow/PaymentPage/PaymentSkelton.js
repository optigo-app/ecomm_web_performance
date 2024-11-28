import React from 'react';
import { Skeleton, Box, Typography, Button } from '@mui/material';

const OrderSummarySkeleton = () => {
  return (
    <Box padding={2} width={300}>
      <Typography variant="h6">
        <Skeleton width="60%" />
      </Typography>
      <Box marginTop={2}>
        <Typography variant="body1">
          <Skeleton width="40%" />
        </Typography>
        <Skeleton width="80%" />
        <Skeleton width="60%" />
        <Skeleton width="50%" />
        <Skeleton width="70%" />
        <Skeleton width="40%" />
      </Box>
      <Box marginTop={2}>
        <Typography variant="h6">
          <Skeleton width="50%" />
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Skeleton width="30%" />
          <Skeleton width="30%" />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Skeleton width="30%" />
          <Skeleton width="30%" />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Skeleton width="30%" />
          <Skeleton width="30%" />
        </Box>
      </Box>
      <Box marginTop={2}>
        <Typography variant="body1">
          <Skeleton width="40%" />
        </Typography>
        <Skeleton width="80%" />
        <Skeleton width="60%" />
        <Skeleton width="50%" />
        <Skeleton width="70%" />
        <Skeleton width="40%" />
      </Box>
      <Box marginTop={2}>
        <Skeleton variant="rectangular" height={40} width={100} />
      </Box>
    </Box>
  );
};

export default OrderSummarySkeleton;
