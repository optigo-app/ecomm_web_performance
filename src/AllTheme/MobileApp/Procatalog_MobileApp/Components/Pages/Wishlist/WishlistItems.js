import React, { useEffect, useState } from 'react';
import "./smrMo_wishlist.scss"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../Assets/image-not-found.jpg"
import { PC_AppCartCount, PC_AppWishCount } from '../../Recoil/atom';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';

const WishlistItems = (
    {
        item,
        itemInCart,
        updateCount,
        countDataUpdted,
        itemsLength,
        currency,
        decodeEntities,
        WishCardImageFunc,
        handleRemoveItem,
        handleWishlistToCart,
        handleMoveToDetail
    }) => {
    const [imageSrc, setImageSrc] = useState(noImageFound);
    const setWishCountVal = useSetRecoilState(PC_AppWishCount)
    const setCartCountVal = useSetRecoilState(PC_AppCartCount)
    const visiterId = "";

    const handleWishlistToCartFun = async (item) => {
        const returnValue = await handleWishlistToCart(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            })
        }
    };

    const handleRemoveItemFun = async (item) => {
        const returnValue = await handleRemoveItem(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setWishCountVal(res?.wishcount);
            })
        }
    };

    useEffect(() => {
        if (item?.ImageCount > 0) {
            WishCardImageFunc(item).then((src) => {
                setImageSrc(src);
            });
        } else {
            setImageSrc(noImageFound);
        }
    }, [item]);

    return (
        <Grid sx={{ paddingLeft: '12px !important', paddingTop: '10px !important' }} item xs={itemsLength !== 1 ? 6 : 12} sm={itemsLength !== 1 ? 6 : 12} md={itemsLength <= 2 ? 6 : 4} lg={itemsLength <= 2 ? 6 : 3}>
            <Card className='smrMo_WlListCard'>
                <div className='cardContent'>
                    <CardMedia
                        component="img"
                        image={imageSrc}
                        alt={item?.TitleLine}
                        className='smrMo_WlListImage'
                        onClick={() => handleMoveToDetail(item)}
                    />
                    <CardContent className='smrMo_cardContent'>
                        <div className='cardText'>
                            <Typography variant="body2" className='smrMo_card-ContentData smrMo_WlTitleline'>
                                {item?.designno != "" && item?.designno}{item?.TitleLine != "" && " - " + item?.TitleLine}
                            </Typography>
                            <Typography variant="body2" className='smrMo_card-ContentData'>
                                <span className='smrMo_wishDT'>NWT : </span>
                                <span className='smrMo_wishDT'>{(item?.Nwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}</span>
                                <span className='smrMo_pipe'> | </span>
                                <span className='smrMo_wishDT'>GWT: </span>
                                <span className='smrMo_wishDT'>{(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                                <span className='smrMo_pipe'> | </span>
                                <span className='smrMo_wishDT'>DWT: </span>
                                <span>{(item?.Dwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.Dpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                                <span className='smrMo_pipe'> | </span>
                                <span className='smrMo_wishDT'>CWT: </span>
                                <span>{(item?.CSwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.CSpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}</span>
                            </Typography>
                            <Typography variant="body2" className='smrMo_card-ContentData'>
                                {item?.metalcolorname !== "" && (
                                    <span>{item.metalcolorname}</span>
                                )}
                                {item?.metalcolorname !== "" && item?.metaltypename !== "" && (
                                    <span> - </span>
                                )}
                                {item?.metaltypeName !== "" && (
                                    <span>{item?.metaltypename}</span>
                                )}
                                {' / '}
                                <span className="smrMo_currencyFont" dangerouslySetInnerHTML={{
                                    __html: decodeEntities(currency),
                                }} />
                                {' '}
                                {item?.UnitCost !== "" && (
                                    <span>{(item?.UnitCost).toFixed(3)}</span>
                                )}
                            </Typography>

                        </div>
                        {/* <div className='designNoWlList'>
                            <p className='smrMo_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
                    </CardContent>
                    <div className='smrMo_Wl-CartbtnDiv'>
                        <button className='smrMo_Wl-Cartbtn' onClick={() => handleWishlistToCartFun(item)}>
                            {item?.IsInCart !== 1 ? "Add to cart +" : "in cart"}
                        </button>
                    </div>
                </div>
                <div className='closeWlIconDiv' onClick={(e) => handleRemoveItemFun(item)}>
                    <CloseIcon className='closeWlIcon' />
                </div>
            </Card>
        </Grid>
    );
};

export default WishlistItems;
