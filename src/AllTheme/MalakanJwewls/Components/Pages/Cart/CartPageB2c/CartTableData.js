import React, { useEffect, useState } from 'react';
import QuantitySelector from './QuantitySelector';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { useSetRecoilState } from 'recoil';
import Cookies from "js-cookie";
import moment from 'moment';
import { mala_CartCount } from '../../../Recoil/atom';
import { CardMedia, Skeleton } from '@mui/material';

const ExampleComponent = ({
    cartData,
    CurrencyData,
    qtyCount,
    CartCardImageFunc,
    noImageFound,
    decodeEntities,
    handleDecrement,
    handleIncrement,
    onRemove

}) => {
    const [imageSrc, setImageSrc] = useState(noImageFound);
    const setCartCountVal = useSetRecoilState(mala_CartCount)
    const [storeInitData, setStoreInitData] = useState();
    const visiterId = Cookies.get('visiterId');

    const shipsDate = cartData?.shipsdate;
    const dayOfMonth = moment(shipsDate).format('D');

    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    useEffect(() => {
        const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
        setStoreInitData(storeinitData)
    }, [])

    useEffect(() => {
        if (cartData?.ImageCount > 0) {
            CartCardImageFunc(cartData).then((src) => {
                setImageSrc(src);
            });
        } else {
            setImageSrc(noImageFound);
        }
    }, [cartData]);

    // const handleRemovecartData = (cartData) => {
    //     onRemove(cartData)
    //     setTimeout(() => {
    //         if (countstatus) {
    //             GetCountAPI(visiterId).then((res) => {
    //                 
    //                 setCartCountVal(res?.cartcount);
    //             })
    //         }
    //     }, 500)
    // }

    const handleRemovecartData = async (item) => {
        const returnValue = await onRemove(item);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            })
        }
    };

    return (
        <table className="mala_B2C-table mala_B2C-table-xs">
            <tbody>
                <tr key={cartData.id} className="mala_B2C-cartData-row">
                    <td className='mala_b2cCartImagetd'>
                        {imageSrc === undefined ? (
                            <CardMedia
                                sx={{
                                    width: "10rem",
                                    height: "9rem",
                                    '@media (max-width: 1350px)': {
                                        width: "9rem",
                                    },
                                    '@media (max-width: 840px)': {
                                        width: "10rem",
                                    },
                                    '@media (max-width: 650px)': {
                                        width: "9rem",
                                    },
                                }}
                            >
                                <Skeleton
                                    animation="wave"
                                    variant="rect"
                                    width="100%"
                                    height="100%"
                                />
                            </CardMedia>
                        ) : (
                            <img
                                className='mala_b2ccartImage'
                                src={imageSrc}
                                alt={`cartData images`}
                            />
                        )}
                    </td>
                    <td className='mala_b2ccartContentTd'>
                        <p className='mala_b2ccartContentTitle' title="Titleline">{cartData?.TitleLine}</p>
                        {/* <p className='mala_b2ccartContentMtDT'>{cartData?.metalcolorname} | {cartData?.MetalWeight} | {cartData?.totalGrossweight} | {cartData?.totalDiaWt} / {cartData?.totaldiamondpcs} | {cartData?.totalCSWt}  / {cartData?.totalcolorstonepcs}</p> */}
                        <p className='mala_b2ccartContentMtDT'>
                            <span className='mala_b2ccartContentcartData'>{cartData?.metalcolorname}</span>
                            <span> | </span>
                            {storeInitData?.IsGrossWeight == 1 &&
                                <>
                                    <span className='mala_b2ccartContentcartData'>{(cartData?.Nwt || 0)?.toFixed(3)}</span>
                                </>
                            }
                            <span> | </span>
                            {Number(cartData?.Nwt) !== 0 && (
                                <>
                                    <span className='mala_b2ccartContentcartData'>{(cartData?.Gwt || 0)?.toFixed(3)}</span>
                                </>
                            )}
                            <span> | </span>
                            {storeInitData?.IsDiamondWeight == 1 &&
                                <>
                                    {(cartData?.Dwt != "0" || cartData?.Dpcs != "0") &&

                                        <span className='mala_b2ccartContentcartData'>{(cartData?.Dwt || 0)?.toFixed(3)} / {(cartData?.Dpcs || 0)}</span>
                                    }
                                </>
                            }
                            <span> | </span>
                            {storeInitData?.IsStoneWeight == 1 &&
                                <>
                                    {(cartData?.CSwt != "0" || cartData?.CSpcs != "0") &&
                                        <span className='mala_b2ccartContentcartData'>{(cartData?.CSwt || 0)?.toFixed(3)} / {(cartData?.CSpcs || 0)}</span>
                                    }
                                </>
                            }
                        </p>

                        <div className='mala_b2cCartQTRm'>

                            <QuantitySelector
                                cartData={cartData}
                                qtyCount={qtyCount}
                                handleIncrement={handleIncrement}
                                handleDecrement={handleDecrement}
                            />
                            <p className='mala_b2cCartRmBtn' onClick={() => handleRemovecartData(cartData)}>Remove</p>
                        </div>
                        <td className="mala_B2cCartshippingDayMobile" title="Shipping Info">Ships in {dayOfMonth} days</td>
                        <td className="mala_B2cCartPriceDayMobile" title="Price">
                            {storeInitData?.IsPriceShow == 1 &&
                                <span>
                                    <span
                                        className="mala_currencyFont"
                                    >
                                        {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
                                    </span>
                                    {/* <span
                                    className="mala_currencyFont"
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(
                                            CurrencyData?.Currencysymbol
                                        ),
                                    }}
                                /> */}
                                    {" "}{(cartData?.UnitCostWithMarkUp)}
                                </span>
                            }
                        </td>
                    </td>
                    <td className="mala_B2C-text-right mala_B2cCartshippingDay" title="Shipping Info">Ships in {dayOfMonth} days</td>
                    <td className="mala_B2C-text-right mala_B2cCartPrice" title="Total">
                        {storeInitData?.IsPriceShow == 1 &&
                            <span>
                                {/* <span
                                    className="mala_currencyFont"
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(
                                            CurrencyData?.Currencysymbol
                                        ),
                                    }}
                                /> */}
                                <span
                                    className="mala_currencyFont"
                                >
                                    {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
                                </span>
                                {" "}{(cartData?.UnitCostWithMarkUp)}
                            </span>
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ExampleComponent;
