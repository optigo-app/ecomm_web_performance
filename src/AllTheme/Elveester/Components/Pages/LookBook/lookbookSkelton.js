import { Box, Divider, Grid, Skeleton } from '@mui/material';
import React from 'react';

const LookbookSkeleton = ({param}) => {
    return (
        <div>
            {param === 1 &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} >
                            <Skeleton variant="rectangular" width="100%" height={600} animation="wave" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        animation="wave"
                                        width={60}
                                        height={60}
                                        sx={{ mx: 1, borderRadius: '5px', bgcolor: 'var(--skeleton-bg-color)', }}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        {/* Product Details Section */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 2 }}>
                                <Skeleton width={200} height={40} animation="wave" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                <Divider sx={{ my: 2 }} />
                                <Skeleton width="100%" height={80} animation="wave" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                <Skeleton width="100%" height={80} animation="wave" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                <Skeleton width={100} height={40} animation="wave" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                <Skeleton variant="rectangular" width={200} height={50} animation="wave" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            }
            {param === 2 &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                    }}
                >
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                            <Grid item xs={12} sm={6} md={6} key={index}>
                                <Box
                                    sx={{
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        p: 2,
                                    }}
                                >
                                    <Skeleton variant="rectangular" width="100%" height={300} animation="wave" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                    <Skeleton variant="text" width="80%" sx={{ my: 1, bgcolor: 'var(--skeleton-bg-color)' }} />
                                    <Skeleton variant="text" width="60%" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                    <Skeleton variant="text" width="40%" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            }
            {param === 3 &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                    }}
                >
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4].map((_, index) => (
                            <Grid item xs={12} sm={12} md={12} key={index}>
                                <Box
                                    sx={{
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        p: 2,
                                    }}
                                >
                                    <Skeleton variant="rectangular" width="100%" height={300} animation="wave" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                    <Skeleton variant="text" width="80%" sx={{ my: 1, bgcolor: 'var(--skeleton-bg-color)' }} />
                                    <Skeleton variant="text" width="60%" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                    <Skeleton variant="text" width="40%" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            }
            <style jsx>{`
                :root {
                    --skeleton-bg-color: #f6f6f6;
                }
            `}</style>
        </div>
    );
}

export default LookbookSkeleton;
