import React, { useEffect, useRef, useState } from 'react'
import './NewArrival.modul.scss'
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { Grid } from '@mui/material';
import { dt_homeLoading, dt_loginState } from '../../../Recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Pako from 'pako';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import GoogleAnalytics from 'react-ga4';
import noimageFound from '../../../Assets/image-not-found.jpg'
   
const NewArrival = () => {
    const newArrivalRef = useRef(null);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [newArrivalData, setNewArrivalData] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const islogin = useRecoilValue(dt_loginState);
    const [storeInit, setStoreInit] = useState({});
    const navigation = useNavigate();
    const setLoadingHome =  useSetRecoilState(dt_homeLoading);

    useEffect(() => {
        setLoadingHome(true);
        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        setStoreInit(data)
        setImageUrl(data?.DesignImageFol);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callAPI();
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.5,
            }
        );

        if (newArrivalRef.current) {
            observer.observe(newArrivalRef.current);
        }
        return () => {
            if (newArrivalRef.current) {
                observer.unobserve(newArrivalRef.current);
            }
        };
    }, [])

    const callAPI = () => {
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (storeInit?.IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        // setImageUrl(data?.DesignImageFol);
        setImageUrl(data?.CDNDesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID).then((response) => {
            if (response?.Data?.rd) {
                setNewArrivalData(response?.Data?.rd);
                setLoadingHome(false);
            }
        }).catch((err) => console.log(err))
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }


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
        GoogleAnalytics.event({
            action: "Navigate to Product Detail",
            category: `Product Interaction Through New Arrival Section`,
            label: designNo || titleLine ,
            value: loginUserDetail?.firstname ?? 'User Not Login',
          });
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

    return (
        <>
            {newArrivalData?.length != 0 &&
                <div className='dt_newArrivalMain'>
                    {/* <h1 className='dt_titleNewArrival' style={{ textAlign: 'center', padding: '20px 0px 20px 0px' }}>NEW ARRIVAL</h1> */}
                    {newArrivalData?.length != 0 &&
                        <p className='smr_bestseler1Title'>
                            New Arrival
                            {newArrivalData?.length > 5 && <span className='dt_ViewAllBtn_new' onClick={() => navigation(`/p/NewArrival/?N=${btoa('NewArrival')}`)}>
                                View more
                            </span>}
                        </p>
                    }

                    <div className='dt_newArrivalGridMain' style={{ paddingInline: '10px', display: 'flex', justifyContent: 'start' }}>
                        {newArrivalData?.slice(0, 4).map((product, index) => (
                            <div key={index} className='dt_NewArrivalProductMain' onClick={() => handleNavigation(product?.designno, product?.autocode, product?.TitleLine)}>
                                <div className='dt_newArrivalMian'>
                                    <img
                                        style={{ height: "100%", width: "100%" }}
                                        src={`${imageUrl}/${product?.designno}~1.${product.ImageExtension}`}
                                        // src={product.image}
                                        alt={product.title}
                                        loading='lazy'
                                        onError={(e)=>{
                                            e.target.src = noimageFound ;
                                          }}
                                    />
                                </div>
                                <div className='dt_newArrivalMainDeatil'>
                                    <h3 className='dt_newArrival_DesignNumber_web'>{product?.TitleLine != "" && product?.TitleLine}</h3>
                                    <h3 className='dt_newArrival_DesignNumber_Mobile'>{product?.designno}</h3>
                                    {/* <div className='dt_newArrivalSetData'>
                                        {storeInit?.IsGrossWeight == 1 &&
                                            <>
                                                <span className='smr_btdetailDT'>GWT: </span>
                                                <span className='smr_btdetailDT'>{(product?.Gwt || 0)?.toFixed(3)}</span>
                                            </>
                                        }
                                        {Number(product?.Nwt) !== 0 && (
                                            <>
                                                <span className='smr_btpipe'>|</span>
                                                <span className='smr_btdetailDT'>NWT : </span>
                                                <span className='smr_btdetailDT'>{(product?.Nwt || 0)?.toFixed(3)}</span>
                                            </>
                                        )}
                                        {storeInit?.IsDiamondWeight == 1 &&
                                            <>
                                                {(product?.Dwt != "0" || product?.Dpcs != "0") &&
                                                    <>
                                                        <span className='smr_btpipe'>|</span>
                                                        <span className='smr_btdetailDT'>DWT: </span>
                                                        <span className='smr_btdetailDT'>{(product?.Dwt || 0)?.toFixed(3)}/{(product?.Dpcs || 0)}</span>
                                                    </>
                                                }
                                            </>
                                        }
                                        {storeInit?.IsStoneWeight == 1 &&
                                            <>
                                                {(product?.CSwt != "0" || product?.CSpcs != "0") &&
                                                    <>
                                                        <span className='smr_btpipe'>|</span>
                                                        <span className='smr_btdetailDT'>CWT: </span>
                                                        <span className='smr_btdetailDT'>{(product?.CSwt || 0)?.toFixed(3)}/{(product?.CSpcs || 0)}</span>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div> */}
                                    <p className='dt_newArrivalPdPrice'>
                                        <span
                                            className="smr_currencyFont"
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(
                                                    islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                                ),
                                            }}
                                        /> {formatter(product?.UnitCostWithMarkUp)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default NewArrival