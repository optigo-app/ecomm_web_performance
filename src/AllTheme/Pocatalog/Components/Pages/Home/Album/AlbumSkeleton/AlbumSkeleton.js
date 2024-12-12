import React from 'react';
import './AlbumSkeleton.scss';
import { Skeleton, Card, CardContent, Grid, CardMedia, useMediaQuery } from '@mui/material';

const AlbumSkeleton = ({ fromPage }) => {
    const cardsArray = Array.from({ length: 20 }, (_, index) => index + 1);
    const isMobile = useMediaQuery('(max-width: 767px)');
    const isDesktop = useMediaQuery('(max-width: 1440px)');

    return (
        <div className='album_SkeltenShow'>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', width: '100% !important', marginTop: '40px' }}>
                {/* <CardMedia style={{ width: '100%', height: '30vh' }} className='cardMainSkeleton'>
                    <Skeleton animation="wave" variant="rect" width={'100%'} height='10vh' style={{ backgroundColor: '#e8e8e86e' }} />
                </CardMedia> */}
                {cardsArray.map((item) => (
                    <Grid
                        item
                        xs={6}        
                        sm={4}        
                        md={3}        
                        lg={2.4}      
                        key={item}
                        className='proCat_album_skle_Main'
                    >
                        <Card className="proCat_lookbookcards_listpage">
                            <CardMedia style={{ width: '100%', height: '30vh' }} className='cardMainSkeleton'>
                                <Skeleton animation="wave" variant="rect" width={'100%'} height='40vh' style={{ backgroundColor: '#e8e8e86e' }} />
                            </CardMedia>
                            {/* <CardContent>
                                    <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '10px', backgroundColor: '#e8e8e86e' }} />
                                    <Skeleton animation="wave" variant="text" width={'60%'} height={20} style={{ backgroundColor: '#e8e8e86e' }} />
                                </CardContent> */}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default AlbumSkeleton;
