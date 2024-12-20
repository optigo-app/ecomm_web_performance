/*
import React from 'react';
import './ProductSkelton.scss';
import { Skeleton, Card, CardContent, Grid, CardMedia, useMediaQuery } from '@mui/material';

const ProductListSkeleton = ({fromPage}) => {
    const cardsArray = Array.from({ length: 6 }, (_, index) => index + 1);
    const isMobile = useMediaQuery('(max-width: 767px)');
    const isDesktop = useMediaQuery('(max-width: 1440px)');

    return (
        <div className={fromPage === "Prodlist" ? "skeltonMainDiv_prodlistPage":'skeltonMainDiv'}>
            <Grid container spacing={2}>
                { fromPage !== "Prodlist" && <Grid item xs={12}>
                    <Card className='skeltoncards' style={{ width: '100%' }}>
                        <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1 }} className='topSkeletonMain'>
                                <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '10px' }} />
                                <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>}
                { fromPage !== "Prodlist" && <Grid sx={{display: isDesktop ? 'none' : 'block'}}  item xs={3}>
                    <Card className='skeltoncards'>
                        <CardContent>
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '20px' }} />
                            <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                            
                        </CardContent>
                    </Card>
                </Grid>}
                <Grid item xs={isDesktop ? 12 :(fromPage === "Prodlist"? 12 : 9)} container spacing={2}>
                    {cardsArray.map((item) => (
                        <Grid item xs={isMobile ? 6 : 4} key={item}>
                            <Card className={fromPage === "Prodlist" ? "skeltoncards_listpage":'skeltoncards'}>
                                <CardMedia style={{width:'100%', height:'40vh'}} className='cardMainSkeleton'>
                                    <Skeleton className="pSkelton" animation="wave" variant="rect" width={'100%'} height='40vh' />
                                </CardMedia>
                                <CardContent>
                                    <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '10px' }} />
                                    <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
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
*/


import React from 'react';
import './ProductSkelton.scss';
import { Skeleton, Card, CardContent, Grid, CardMedia, useMediaQuery } from '@mui/material';

const ProductListSkeleton = ({ fromPage }) => {
    const cardsArray = Array.from({ length: 10 }, (_, index) => index + 1);
    const isMobile = useMediaQuery('(max-width: 767px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
    const isDesktop = useMediaQuery('(min-width: 1025px)');
    const isMAxWIdth600px = useMediaQuery('(max-width: 600px)');

    return (
        <div className={fromPage === "Prodlist" ? "skeltonMainDiv_prodlistPage" : 'skeltonMainDiv'}>
            <Grid container spacing={2}>
                {fromPage !== "Prodlist" && (
                    <Grid item xs={12}>
                        <Card className={fromPage === "Prodlist" ? "skeltoncards_listpage" : 'skeltoncards'} style={{ width: '100%' }}>
                            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: 1 }} className='topSkeletonMain'>
                                    <Skeleton className="pSkelton" animation="wave" variant="text" width={'100%'} height={20} style={{ marginBottom: '10px' }} />
                                    <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                <Grid item xs={12} container spacing={2}>
                    {cardsArray.map((item) => (
                        <Grid item xs={6} sm={6} md={4} lg={3} xl={2.4} key={item}> {/* Responsive column sizes */}
                            <Card className={fromPage === "Prodlist" ? "skeltoncards_listpage" : 'skeltoncards'}>
                                <CardMedia
                                    className='cardMainSkeleton'
                                    sx={{
                                        width: '100%',
                                        height: '40vh',
                                    }}
                                >
                                    <Skeleton className="pSkelton" animation="wave" variant="rect" width={'100%'} height='40vh' />
                                </CardMedia>
                                {isMAxWIdth600px && fromPage === "Prodlist" ? "" :
                                    <CardContent>
                                        <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '10px' }} />
                                        <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                                    </CardContent>
                                }

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductListSkeleton;
