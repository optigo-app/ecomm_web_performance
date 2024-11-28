import { Box, Divider, Grid, Skeleton } from '@mui/material';
import React from 'react';

const LookbookSkeleton = () => {
    return (
        <div>
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
                            <Grid item xs={12} sm={12} md={6} key={index}>
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
                                    <Skeleton variant="rectangular" width="100%" height={400} animation="wave" sx={{ bgcolor: 'var(--skeleton-bg-color)' }} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            <style jsx>{`
                :root {
                    --skeleton-bg-color: #f6f6f6;
                }
            `}</style>
        </div>
    );
}

export default LookbookSkeleton;
