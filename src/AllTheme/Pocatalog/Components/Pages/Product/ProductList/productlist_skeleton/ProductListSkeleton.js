import React from 'react';
import './ProductSkelton.scss';
import { Skeleton, Card, CardContent, Grid, CardMedia, useMediaQuery } from '@mui/material';

const ProductListSkeleton = ({ fromPage }) => {
    const cardsArray = Array.from({ length: 10 }, (_, index) => index + 1);
    const isMobile = useMediaQuery('(max-width: 767px)');
    const isMaxWidth900px = useMediaQuery('(max-width: 900px)');
    const isDesktop = useMediaQuery('(max-width: 1440px)');

    return (
        <div className={fromPage === "Prodlist" ? "skeltonMainDiv_prodlistPage" : 'skeltonMainDiv'}>
            <Grid container spacing={2}>
                {fromPage !== "Prodlist" && <Grid item xs={12}>
                    <Card className='skeltoncards' style={{ width: '100%' }}>
                        <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1 }} className='topSkeletonMain'>
                                <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '10px' }} />
                                <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            </div>
                            {/* <Skeleton variant="rect" width={100} height={100} style={{ marginRight: '10px' }} /> */}
                        </CardContent>
                    </Card>
                </Grid>}
                {/* { fromPage !== "Prodlist" && <Grid sx={{display: isDesktop ? 'none' : 'block'}}  item xs={3}> */}
                {fromPage !== "Prodlist" && <Grid sx={{ display: 'none' }} item xs={3}>
                    <Card className='skeltoncards'>
                        <CardContent>
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton animation="wave" variant="text" width={'60%'} height={20} />

                        </CardContent>
                    </Card>
                </Grid>}
                <Grid item xs={isDesktop ? 12 : (fromPage === "Prodlist" ? 12 : 12)} container spacing={2}>
                    {cardsArray.map((item) => (
                        <Grid item xs={6} sm={4} md={3} lg={fromPage === "Prodlist" ? '' : 2.4} key={item} style={{ width: fromPage === 'Prodlist' ? "100%" : "", marginInline: fromPage === 'Prodlist' ? "auto" : "", padding: fromPage === 'Prodlist' && isMaxWidth900px && "0" }}>
                            <Card className={fromPage === "Prodlist" ? "skeltoncards_listpage" : 'skeltoncards'}>
                                <CardMedia style={{ width: '100%', height: '40vh' }} className='cardMainSkeleton'>
                                    <Skeleton animation="wave" variant="rect" width={'100%'} height='40vh' />
                                </CardMedia>
                                <CardContent>
                                    <Skeleton animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '10px' }} />
                                    <Skeleton animation="wave" variant="text" width={'60%'} height={20} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Grid>
        </div>
    );
};

export default ProductListSkeleton;
