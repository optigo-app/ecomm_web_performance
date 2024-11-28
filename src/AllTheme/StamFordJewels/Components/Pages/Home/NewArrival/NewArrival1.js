import React, { useEffect, useState } from 'react';
import './NewArrival1.scss';
import { Grid, Typography, Card, CardContent, CardMedia, Link } from '@mui/material';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Pako from 'pako';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import noImageFound from "../../../Assets/image-not-found.jpg"
import { stam_loginState } from '../../../Recoil/atom';

const NewArrival = () => {
    const [newArrivalData, setNewArrivalData] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [storeInit, setStoreInit] = useState({});
    const [ring1ImageChange, setRing1ImageChange] = useState(false);
    const [ring2ImageChange, setRing2ImageChange] = useState(false);
    const islogin = useRecoilValue(stam_loginState);

    useEffect(() => {
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        setImageUrl(data?.DesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID).then((response) => {
            if (response?.Data?.rd) {
                setNewArrivalData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])


    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = Pako.deflate(uint8Array, { to: 'string' });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error('Error compressing and encoding:', error);
            return null;
        }
    };

    const handleNavigation = (designNo, autoCode, titleLine) => {
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const handleMouseEnterRing1 = (data) => {
        if (data?.ImageCount > 1) {
            setRing1ImageChange(true)
        }
    }
    const handleMouseLeaveRing1 = () => {
        setRing1ImageChange(false)
    }


    const handleMouseEnterRing2 = (data) => {
        if (data?.ImageCount > 1) {
            setRing2ImageChange(true)
        }
    }
    const handleMouseLeaveRing2 = () => {
        setRing2ImageChange(false)
    }

    console.log('newArrivalData', newArrivalData);

    return (
        <div className='stam_newwArr1MainDiv'>
            <Typography variant='h4' className='stam_NewArr1Title'>NEW ARRIVAL
                <Link className='stam_designSetViewmoreBtn' onClick={() => navigation(`/p/NewArrival/?N=${btoa('NewArrival')}`)}>
                    View more
                </Link>
            </Typography>
            {newArrivalData &&
                <Grid container spacing={1} className='stam_NewArrival1product-list'>
                    {newArrivalData?.slice(0, 4)?.map((product, index) => (
                        <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
                            <Card className='stam_NewArrproduct-card' onClick={() => handleNavigation(product?.designno, product?.autocode, product?.TitleLine)}>
                                <div className='stam_newArr1Image'>
                                    <CardMedia
                                        component="img"
                                        className='stam_newArrImage'
                                        // image="https://www.bringitonline.in/uploads/2/2/4/5/22456530/female-diamond-necklace-jewellery-photoshoot-jewellery-photography-jewellery-photographers-jewellery-model-shoot-jewellery-product-shoot-bringitonline_orig.jpeg"
                                        image={product?.ImageCount >= 1 ?
                                            `${imageUrl}${newArrivalData && product?.designno}_1.${newArrivalData && product?.ImageExtension}`
                                            : noImageFound}
                                        alt={product?.TitleLine}
                                    />
                                </div>
                                <CardContent className='stam_newarrproduct-info'>
                                    <Typography variant='h6' className='stam_newArrTitle'>{product?.TitleLine != "" && product?.TitleLine + " - "}{product?.designno}</Typography>
                                    <Typography variant='body2'>
                                        {storeInit?.IsGrossWeight == 1 &&
                                            <>
                                                <span className='stam_lb3detailDT'>GWT: </span>
                                                <span className='stam_lb3detailDT'>{(product?.Gwt || 0)?.toFixed(3)}</span>
                                            </>
                                        }
                                        {storeInit?.IsGrossWeight == 1 &&
                                            <>
                                                <span className='stam_lb3pipe'> | </span>
                                                <span className='stam_lb3detailDT'>NWT : </span>
                                                <span className='stam_lb3detailDT'>{(product?.Nwt || 0)?.toFixed(3)}</span>
                                            </>
                                        }
                                        {storeInit?.IsGrossWeight == 1 &&
                                            <>
                                                {(product?.Dwt != "0" || product?.Dpcs != "0") &&
                                                    <>
                                                        <span className='stam_lb3pipe'> | </span>
                                                        <span className='stam_lb3detailDT'>DWT: </span>
                                                        <span className='stam_lb3detailDT'>{(product?.Dwt || 0)?.toFixed(3)} / {(product?.Dpcs || 0)}</span>
                                                    </>
                                                }
                                            </>
                                        }
                                        {storeInit?.IsGrossWeight == 1 &&
                                            <>
                                                {(product?.CSwt != "0" || product?.CSpcs != "0") &&
                                                    <>
                                                        <span className='stam_lb3pipe'> | </span>
                                                        <span className='stam_lb3detailDT'>CWT: </span>
                                                        <span className='stam_lb3detailDT'>{(product?.CSwt || 0)?.toFixed(3)} / {(product?.CSpcs || 0)}</span>
                                                    </>
                                                }
                                            </>
                                        }
                                    </Typography>
                                    <p className='stam_newArrPrice'>
                                        <span
                                            className="stam_currencyFont"
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(
                                                    islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                                ),
                                            }}
                                        /> {formatter(product?.UnitCostWithMarkUp)}</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            }
        </div>
    );
}

export default NewArrival;
