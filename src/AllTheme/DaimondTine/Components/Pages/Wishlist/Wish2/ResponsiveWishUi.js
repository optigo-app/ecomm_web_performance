import React, { useEffect, useState } from 'react'
import "./dt_wishPageB2c.scss"
import noImageFound from "../../../Assets/image-not-found.jpg"
import { CardMedia, IconButton, Skeleton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { dt_CartCount, dt_WishCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import Cookies from "js-cookie";
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { toast } from 'react-toastify';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const ResponsiveWishUi = (
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
    }
) => {

    const [loding, setloding] = useState(false);
    const [imageSrc, setImageSrc] = useState(noImageFound);
    const [storeInitData, setStoreInitData] = useState();
    const setCartCountVal = useSetRecoilState(dt_CartCount);
    const setWishCount = useSetRecoilState(dt_WishCount);
    const visiterId = Cookies.get('visiterId');
    const loginInfo = JSON.parse(sessionStorage?.getItem("loginUserDetail"));

    useEffect(() => {
        const storeinitData = JSON.parse(sessionStorage?.getItem('storeInit'));
        setStoreInitData(storeinitData)
    }, [])

    const handleWishlistToCartFun = async (item) => {
        setloding(true);
        const returnValue = await handleWishlistToCart(item);
        if (returnValue?.msg == "success") {
            toast.success("Wishlist item added in cart")
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
                setloding(false);
            });
        }
    };


    const handleRemovecartData = async (item) => {
        const returnValue = await handleRemoveItem(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setWishCount(res?.wishcount)
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
        <div className="dt_res-card-container">
            <div className="dt_res-card">

                {imageSrc === undefined ? (
                    <CardMedia
                        style={{ width: "100%" }}
                        className="roop_WlListImage"
                    >
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            width="100%"
                            height={400}
                            sx={{
                                backgroundColor: "#e8e8e86e",
                                '@media (max-width: 500px)': {
                                    height: '300px !important',
                                },
                                '@media (max-width: 400px)': {
                                    height: '200px !important',
                                }
                            }}
                        />
                    </CardMedia>
                ) : (
                    <img
                        src={imageSrc}
                        alt="Product Image"
                        className="dt_res-card-image"
                    />
                )}
                <h3 className="dt_res-card-title">{item?.designno}{item?.TitleLine != "" && " - " + item?.TitleLine}</h3>
                <p className="dt_res-card-price">
                    {storeInitData?.IsPriceShow == 1 &&
                        <span>
                            <span
                                className="smr_currencyFont"
                            >
                                {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
                            </span>
                            {" "}{formatter(item?.FinalCost)}
                        </span>
                    }
                </p>

                <div className="dt_Wl-CartbtnDiv">
                    <button
                        className="dt_Wl-Cartbtn"
                        onClick={() => handleWishlistToCartFun(item)}
                        disabled={loding == true}
                    >
                        {item?.IsInCart != 1 ? "Add to cart +" : "in cart"}
                    </button>
                </div>

                <div className='dt_closeIconBtnDiv'>
                    <IconButton onClick={() => handleRemovecartData(item)} className='dt_closeIconBtn'>
                        <CloseIcon className='dt_closeIcon' />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveWishUi