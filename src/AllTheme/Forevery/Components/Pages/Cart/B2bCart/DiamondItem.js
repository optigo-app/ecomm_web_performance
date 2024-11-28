import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, Grid, Radio, RadioGroup, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import RemarkModal from './RemarkModal';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { for_CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { FormControl } from 'react-bootstrap';
import Cookies from "js-cookie";
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import diaImage from "../../../Assets/round.png"

const DiamondItems = ({
    diaData,
    cartData,
    itemlength,
    diamondValue,
    index,
    CartCardImageFunc,
    onSelect,
    CurrencyData,
    decodeEntities,
    isSelected,
    selectedItem,
    selectedItemsLength,
    isActive,
    multiSelect,
    onRemove,
    itemLength,
    showRemark,
    productRemark,
    handleAddRemark,
    handleRemarkChange,
    handleSave,
    handleCancel,
    openHandleUpdateCartModal
}) => {
    const [imageSrc, setImageSrc] = useState();
    const [open, setOpen] = useState(false);
    const [remark, setRemark] = useState(diaData?.Remarks || '');
    const [isSelectedItems, setIsSelectedItems] = useState();
    const setCartCountVal = useSetRecoilState(for_CartCount)
    const [storeInitData, setStoreInitData] = useState();
    const visiterId = Cookies.get('visiterId');

    const isLargeScreen = useMediaQuery('(min-width: 1600px)');
    const isMediumScreen = useMediaQuery('(min-width: 1038px) and (max-width: 1599px)');
    const isMobileScreen = useMediaQuery('(min-width: 320px) and (max-width: 1000px)');

    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

    useEffect(() => {
        const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
        setStoreInitData(storeinitData)
    }, [])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRemarkChangeInternal = (e) => {
        setRemark(e.target.value);
        handleRemarkChange(e);
    };

    const handleSaveInternal = () => {
        handleSave(diaData, remark);
        handleClose();
    };

    useEffect(() => {
        handleIsSelected()
    }, [isSelected])

    const handleIsSelected = () => {
        let isselected = selectedItem?.id == diaData?.id
        
        setIsSelectedItems()
    }


    const handleRemoveItem = async (diaData) => {
        const isdiamond = "isdiamond"
        const returnValue = await onRemove(diaData, isdiamond);
        if (returnValue?.msg == "success") {
            GetCountAPI(visiterId).then((res) => {
                setCartCountVal(res?.cartcount);
            })
        }
    };


    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    useEffect(() => {
        if (diaData?.ImageCount > 0) {
            CartCardImageFunc(diaData).then((src) => {
                setImageSrc(src);
            });
        } else {
            setImageSrc(noImageFound);
        }
    }, [diaData]);

    const diamondData = diaData?.filter(diaItem =>
        !cartData?.some(cartItem => cartItem?.Sol_StockNo === diaItem?.stockno)
    );
    console.log("jksjdksakjd", diamondData)

    const handleError = (event) => {
        event.target.src = noImageFound;
      };


    return (
        <>
            {diamondData?.map((diaData) =>
                <div className="for_cartMain-item"
                    style={{
                        // boxShadow: !multiSelect && !isMobileScreen && selectedItem?.id == item?.id && '0 3px 8px rgba(223, 100, 126, 0.54)'
                        boxShadow: "none",
                        border: !multiSelect && !isMobileScreen && selectedItem?.stockno == diaData?.stockno && '1px solid rgba(223, 100, 126, 1)'
                    }}
                >
                    <div className="for_cart-item"

                        onClick={() => onSelect(diaData)}
                    >
                        <div className="for_cart-item__image">
                            <img 
                            src={diaData?.image_file_url} 
                            alt='Product-image' 
                            onError={handleError}
                            />
                        </div>
                        <div className="for_cart-item__details">
                            <div className="for_weightsContainer">
                                <span>
                                    {diaData?.carat}{" "}
                                    Carat {diaData?.colorname} {diaData?.clarityname}{" "}
                                    {diaData?.cutname} Cut {diaData?.shapename} Diamond
                                </span>
                            </div>
                            <div className='for_diamondSKUNO'>
                                <h3>SKU:{" "}{diaData?.stockno != "" && diaData?.stockno}</h3>
                            </div>
                        </div>
                        {storeInitData?.IsPriceShow == 1 &&
                            <div className="for_cart-item__price">
                                <p>{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(diaData?.price)}</p>
                                <span className="for_price-excl-vat">(Excl. VAT)</span>
                            </div>
                        }
                        {storeInitData?.IsPriceShow == 1 &&
                            <div className="for_cart-item__total-price">
                                <p>{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}&nbsp;{formatter(diaData?.price)}</p>
                                <span className="for_price-excl-vat">(Excl. VAT)</span>
                            </div>
                        }
                        <div className="for_cart-item__remove">
                            <button className="for_remove-button" onClick={() => handleRemoveItem(diaData, index)}>×</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DiamondItems;
