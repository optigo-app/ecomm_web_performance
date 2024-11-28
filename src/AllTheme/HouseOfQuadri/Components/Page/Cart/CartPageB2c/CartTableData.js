import React, { useEffect, useState } from 'react';
import QuantitySelector from './QuantitySelector';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { Hoq_CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import Cookies from "js-cookie";
import moment from 'moment';

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
    const [imageSrc, setImageSrc] = useState();
    const setCartCountVal = useSetRecoilState(Hoq_CartCount)
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
        <table className="Hoq_B2C-table Hoq_B2C-table-xs">
            <tbody>
                <tr key={cartData.id} className="Hoq_B2C-cartData-row">
                    <td className='Hoq_b2cCartImagetd'>
                        {imageSrc != undefined &&
                            <img
                                className='Hoq_b2ccartImage'
                                src={imageSrc}
                                alt={`cartData images`}
                            />
                        }
                    </td>
                    <td className='Hoq_b2ccartContentTd'>
                        <p className='Hoq_b2ccartContentTitle' title="Titleline">{cartData?.TitleLine}</p>
                        {/* <p className='Hoq_b2ccartContentMtDT'>{cartData?.metalcolorname} | {cartData?.MetalWeight} | {cartData?.totalGrossweight} | {cartData?.totalDiaWt} / {cartData?.totaldiamondpcs} | {cartData?.totalCSWt}  / {cartData?.totalcolorstonepcs}</p> */}
                        <p className='Hoq_b2ccartContentMtDT'>
                            {storeInitData?.IsMetalTypeWithColor == 1 &&
                                <>
                                    <span className='Hoq_b2ccartContentcartData'>{cartData?.metalcolorname}</span>
                                    <span> | </span>
                                </>
                            }
                            {storeInitData?.IsGrossWeight == 1 &&
                                <>
                                    <span className='Hoq_b2ccartContentcartData'>{(cartData?.Nwt || 0)?.toFixed(3)}</span>
                                </>
                            }
                            {storeInitData?.IsMetalWeight == 1 &&
                                <>
                                    <span> | </span>
                                    {Number(cartData?.Nwt) !== 0 && (
                                        <>
                                            <span className='Hoq_b2ccartContentcartData'>{(cartData?.Gwt || 0)?.toFixed(3)}</span>
                                        </>
                                    )}
                                </>
                            }
                            <span> | </span>
                            {storeInitData?.IsDiamondWeight == 1 &&
                                <>
                                    {(cartData?.Dwt != "0" || cartData?.Dpcs != "0") &&

                                        <span className='Hoq_b2ccartContentcartData'>{(cartData?.Dwt || 0)?.toFixed(3)} / {(cartData?.Dpcs || 0)}</span>
                                    }
                                </>
                            }
                            <span> | </span>
                            {storeInitData?.IsStoneWeight == 1 &&
                                <>
                                    {(cartData?.CSwt != "0" || cartData?.CSpcs != "0") &&
                                        <span className='Hoq_b2ccartContentcartData'>{(cartData?.CSwt || 0)?.toFixed(3)} / {(cartData?.CSpcs || 0)}</span>
                                    }
                                </>
                            }
                        </p>

                        <div className='Hoq_b2cCartQTRm'>

                            <QuantitySelector
                                cartData={cartData}
                                qtyCount={qtyCount}
                                handleIncrement={handleIncrement}
                                handleDecrement={handleDecrement}
                            />
                            <p className='Hoq_b2cCartRmBtn' onClick={() => handleRemovecartData(cartData)}>Remove</p>
                        </div>
                        <td className="Hoq_B2cCartshippingDayMobile" title="Shipping Info">Ships in {dayOfMonth} days</td>
                        <td className="Hoq_B2cCartPriceDayMobile" title="Price">
                            {storeInitData?.IsPriceShow == 1 &&
                                <span>
                                    <span
                                        className="Hoq_currencyFont"
                                    >
                                        {loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}
                                    </span>
                                    {/* <span
                                    className="Hoq_currencyFont"
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
                    <td className="Hoq_B2C-text-right Hoq_B2cCartshippingDay" title="Shipping Info">Ships in {dayOfMonth} days</td>
                    <td className="Hoq_B2C-text-right Hoq_B2cCartPrice" title="Total">
                        {storeInitData?.IsPriceShow == 1 &&
                            <span>
                                {/* <span
                                    className="Hoq_currencyFont"
                                    dangerouslySetInnerHTML={{
                                        __html: decodeEntities(
                                            CurrencyData?.Currencysymbol
                                        ),
                                    }}
                                /> */}
                                <span
                                    className="Hoq_currencyFont"
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
