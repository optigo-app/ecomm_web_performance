import React from 'react';
import { Skeleton, Grid } from '@mui/material';

const AlbumSkeletonCards = () => {
    return (
        <Grid container spacing={2}>
            <Skeleton
                variant="text"
                animation="wave"
                width="40%"
                height={100}
                sx={{
                    bgcolor: '#f9f9f9',
                    marginBottom: 1,
                    marginTop: "20px",
                    display: 'flex',
                    justifyContent: 'center',
                    margin: 'auto'
                }}
            />
            <Skeleton
                variant="text"
                animation="wave"
                width="80%"
                height={100}
                sx={{
                    bgcolor: '#f9f9f9',
                    marginBottom: 1,
                    marginTop: "20px",
                    display: 'flex',
                    justifyContent: 'center',
                    margin: 'auto'
                }}
            />
            {Array.from(new Array(4)).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={400}
                        sx={{
                            bgcolor: '#f9f9f9',
                            minHeight: 400,
                        }}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default AlbumSkeletonCards;
