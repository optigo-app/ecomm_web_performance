import React, { useEffect, useState } from 'react'
import './PromotionBanner2.modul.scss'
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Pako from 'pako';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { proCat_loginState } from '../../../Recoil/atom';
import Cookies from 'js-cookie';

const NewArrival = () => {

    const [newArrivalData, setNewArrivalData] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [storeInit, setStoreInit] = useState({});
    const [ring1ImageChange, setRing1ImageChange] = useState(false);
    const [ring2ImageChange, setRing2ImageChange] = useState(false);
    const islogin = useRecoilValue(proCat_loginState);

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
    return (
        <div className='proCat_NewArrivalMain'>
            <div className='smilingBridesMain'>
                <div className='smlingBridesImages'>
                    <div className='smr_newArrivaldivMain'>
                        <div className='smr_newArrialDiv1' onClick={() => handleNavigation(newArrivalData[0]?.designno, newArrivalData[0]?.autocode, newArrivalData[0]?.TitleLine)}>
                            <img src={ring1ImageChange ?
                                `${imageUrl}${newArrivalData && newArrivalData[0]?.designno}_2.${newArrivalData && newArrivalData[0]?.ImageExtension}`
                                :
                                `${imageUrl}${newArrivalData && newArrivalData[0]?.designno}_1.${newArrivalData && newArrivalData[0]?.ImageExtension}`} className='smilingMainImages' alt={''} onMouseEnter={() => handleMouseEnterRing1(newArrivalData[0])} onMouseLeave={handleMouseLeaveRing1} />
                            <p className='smr_nwArrivalTitle'>{newArrivalData[0]?.TitleLine}</p>
                            <p className='smr_nwArrivalTitle'><span
                                className="smr_currencyFont"
                                dangerouslySetInnerHTML={{
                                    __html: decodeEntities(
                                        storeInit?.Currencysymbol
                                    ),
                                }}
                            /> {newArrivalData[0]?.UnitCost}</p>
                        </div>
                        <div className='smr_newArrialDiv1' onClick={() => handleNavigation(newArrivalData[1]?.designno, newArrivalData[1]?.autocode, newArrivalData[1]?.TitleLine)}>
                            <img src={ring2ImageChange ?
                                `${imageUrl}${newArrivalData && newArrivalData[1]?.designno}_2.${newArrivalData && newArrivalData[1]?.ImageExtension}`
                                :
                                `${imageUrl}${newArrivalData && newArrivalData[1]?.designno}_1.${newArrivalData && newArrivalData[1]?.ImageExtension}`} className='smilingMainImages' alt={''} onMouseEnter={() => handleMouseEnterRing2(newArrivalData[1])} onMouseLeave={handleMouseLeaveRing2} />
                            <p className='smr_nwArrivalTitle'>{newArrivalData[1]?.TitleLine}</p>
                            <p className='smr_nwArrivalTitle'><span
                                className="smr_currencyFont"
                                dangerouslySetInnerHTML={{
                                    __html: decodeEntities(
                                        storeInit?.Currencysymbol
                                    ),
                                }}
                            /> {newArrivalData[1]?.UnitCost}</p>
                        </div>
                    </div>
                </div>
                <div className='smilingBrides'>
                    <p className='smilingBridesMainTitle'>NEW ARRIVAL </p>
                    <button className='enagementBtn' onClick={() => navigation(`/p/NewArrival/?N=${btoa('NewArrival')}`)}>NEW ARRIVAL COLLECTION</button>
                </div>
            </div>
        </div>
    )
}

export default NewArrival;