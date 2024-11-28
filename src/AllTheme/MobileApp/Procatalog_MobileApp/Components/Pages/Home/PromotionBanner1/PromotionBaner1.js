import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { PC_ApploginState } from '../../../Recoil/atom';
import './PromotionBaner1.modul.scss'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

const PromotionBaner1 = () => {


    const islogin = useRecoilValue(PC_ApploginState);
    const navigation = useNavigate();
    const [newArrivalData, setNewArrivalData] = useState([]);


    useEffect(() => {
        const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const visiterID = Cookies.get("visiterId");
        let finalID;
        if (storeInit?.IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
        } else {
            finalID = loginUserDetail?.id || "0";
        }
        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID)
            .then(async (response) => {
                if (response?.Data?.rd) {
                    setNewArrivalData(response?.Data?.rd);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleNavigate = () => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        if (storeinit?.IsB2BWebsite == 1) {
            if (islogin) {
                navigation(`/p/NewArrival/?N=${btoa('NewArrival')}`)
            } else {
                navigation('/signin')
            }
        } else {
            navigation(`/p/NewArrival/?N=${btoa('NewArrival')}`)
        }
    }

    return (
        <>
            {newArrivalData?.length != 0 &&
                <div className='PC_AppPromoMain'>

                    <div className='FestiveMainImage'>
                        <img src={`${storImagePath()}/images/HomePage/NewArrival/banner2.webp`} style={{ width: '100%', minHeight: '450px' }} className='smr_promotion1' alt={"#promoBanner1"} />
                        {/* {islogin === true && <div className='festiveBox'>
                    <p className='smilingFestiMainTitle1' style={{ color: 'gray' }}>LAB GROWN DIAMONDS</p>
                    <p className='smilingFestiMainTitle2' style={{ color: 'gray', fontSize: '40px', margin: '0px' }}>Festive Finds!</p>
                    <p className='smilingFestiMainTitle3' style={{ color: 'gray', margin: '0px', fontSize: '13px' }}>
                        Explore your jewelry for upcoming holiday!
                    </p>
                </div>} */}
                    </div>
                    <button className='ma_newArrival_btn' onClick={handleNavigate}>NEW ARRIVAL</button>
                </div>
            }
        </>
    )
}

export default PromotionBaner1