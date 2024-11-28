import React from 'react';
import './TopSkeleten.scss';
import { Skeleton, Card, CardContent, Grid, CardMedia, useMediaQuery } from '@mui/material';

const TopSkeleten = ({ fromPage }) => {
    const cardsArray = Array.from({ length: 16 }, (_, index) => index + 1);
    const isMobile = useMediaQuery('(max-width: 767px)');
    const isDesktop = useMediaQuery('(max-width: 1440px)');

    return (
        <div className='TopSkeleten'>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', width: '100% !important' , paddingTop: '50px'}}>
                <CardMedia style={{ width: '100%', height: '30vh' }} className='cardMainSkeleton'>
                    <Skeleton animation="wave" variant="rect" width={'100%'} height='10vh' style={{ backgroundColor: '#e8e8e86e' }} />
                </CardMedia>
            </Grid>
        </div>
    );
};

export default TopSkeleten;
