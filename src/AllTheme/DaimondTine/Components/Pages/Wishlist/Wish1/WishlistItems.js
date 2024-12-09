import React, { useEffect, useState } from 'react';
import "./dt_wishlist.scss"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { useSetRecoilState } from 'recoil';
import { dt_CartCount, dt_WishCount } from '../../../Recoil/atom';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import noImageFound from "../../../Assets/image-not-found.jpg"
import Cookies from "js-cookie";
import { Skeleton } from '@mui/material';

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

    const setWishCountVal = useSetRecoilState(dt_WishCount)
    const setCartCountVal = useSetRecoilState(dt_CartCount);
    const [imageSrc, setImageSrc] = useState(noImageFound);
    const visiterId = Cookies.get('visiterId');

    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));



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
        <Grid item xs={itemsLength <= 2 ? 6 : 6} sm={itemsLength <= 2 ? 4 : 4} md={itemsLength <= 2 ? 4 : 4} lg={itemsLength <= 2 ? 3 : 3}>
            <Card className='dt_WlListCard'>
                <div className='cardContent'>
                    {imageSrc === undefined ? (
                        <CardMedia
                            style={{ width: "100%" }}
                            className="roop_WlListImage"
                        >
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                width="100%"
                                height={300}
                            />
                        </CardMedia>
                    ) : (
                        <CardMedia
                            component="img"
                            image={imageSrc}
                            alt={item?.TitleLine}
                            className='dt_WlListImage'
                            onClick={() => handleMoveToDetail(item)}
                        />
                    )}
                    <CardContent className='dt_cardContent'>
                        <div className='cardText'>
                            <Typography variant="body2" className='dt_card-ContentData dt_WlTitleline'>
                                {item?.designno != "" && item?.designno}{item?.TitleLine != "" && " - " + item?.TitleLine}
                            </Typography>
                            <Typography variant="body2" className='dt_card-ContentData'>
                                <span className='dt_wishDT'>GWT: </span>
                                {/* <span className='dt_wishDT'>{(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span> */}
                                <span className='dt_wishDT'>{(item?.Gwt || 0).toFixed(3)}</span>

                                <span className='dt_pipes'> | </span>
                                <span className='dt_wishDT'>NWT : </span>
                                <span className='dt_wishDT'>{(item?.Nwt || 0).toFixed(3)}{' '}</span>
                                <span className='dt_pipes'> | </span>
                                <span className='dt_wishDT'>DWT: </span>
                                <span>{(item?.Dwt || 0).toFixed(3)} / {(item?.Dpcs || 0).toFixed(3)}</span>
                                <span className='dt_pipes'> | </span>
                                <span className='dt_wishDT'>CWT: </span>
                                <span>{(item?.CSwt || 0).toFixed(3)} / {(item?.CSpcs || 0).toFixed(3)}{' '}</span>
                            </Typography>
                            <Typography variant="body2" className='dt_card-ContentData'>
                                {item?.metalcolorname !== "" && (
                                    <span>{item.metalcolorname}</span>
                                )}
                                {item?.metalcolorname !== "" && item?.metaltypename !== "" && (
                                    <span> - </span>
                                )}
                                {item?.metaltypename !== "" && (
                                    <span>{item?.metaltypename}</span>
                                )}
                                {' / '}
                                {/* <span className="dt_currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currency) }} /> */}
                                <span className="dt_currencyFont" >{loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}</span>
                                {' '}
                                {item?.UnitCost !== "" && (
                                    <span>{(item?.FinalCost)}</span>
                                )}
                            </Typography>

                        </div>
                        {/* <div className='designNoWlList'>
                            <p className='dt_DesignNoTExt'>{item?.designno}</p>
                        </div> */}
                    </CardContent>
                    <div className='dt_Wl-CartbtnDiv'>
                        <button className='dt_Wl-Cartbtn' onClick={() => handleWishlistToCartFun(item)}>
                            {(item?.IsInCart != 1 ? "Add to cart +" : "In cart")}
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
