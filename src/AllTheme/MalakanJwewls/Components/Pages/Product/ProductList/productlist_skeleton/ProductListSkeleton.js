import React from 'react';
import './ProductSkelton.scss';
import { Skeleton, Card, CardContent, Grid, CardMedia, useMediaQuery } from '@mui/material';

const ProductListSkeleton = ({ fromPage }) => {
    // Create an array for the skeleton cards
    const cardsArray = Array.from({ length: 10 }, (_, index) => index + 1); // Show 5 cards

    // Media queries to handle responsive design
    const isMobile = useMediaQuery('(max-width: 767px)');
    const isTablet = useMediaQuery('(max-width: 1024px)'); // Optional: for tablet size

    return (
        <div className={fromPage === "Prodlist" ? "skeltonMainDiv_prodlistPage" : 'skeltonMainDiv'}>
            <Grid container spacing={2}>
                {fromPage !== "Prodlist" && (
                    <Grid item xs={12}>
                        <Card className='skeltoncards' style={{ width: '100%' }}>
                            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: 1 }} className='topSkeletonMain'>
                                    <Skeleton className="pSkelton" animation="wave" variant="text" width={'80%'} height={20} style={{ marginBottom: '10px' }} />
                                    <Skeleton className="pSkelton" animation="wave" variant="text" width={'60%'} height={20} />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                <Grid item xs={12} container spacing={2}>
                    {cardsArray.map((item) => (
                        <Grid item xs={isMobile ? 6 : isTablet ? 4 : 2.4} key={item}> {/* Responsive Grid */}
                            <Card className={fromPage === "Prodlist" ? "skeltoncards_listpage" : 'skeltoncards'}>
                                <CardMedia style={{ width: '100%', height: '40vh' }} className='cardMainSkeleton'>
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
