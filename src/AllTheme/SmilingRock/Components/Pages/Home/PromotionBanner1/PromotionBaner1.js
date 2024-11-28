import React from 'react'
import { useRecoilValue } from 'recoil';
import { loginState, smr_loginState } from '../../../Recoil/atom';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PromotionBaner1.modul.scss'

const PromotionBaner1 = () => {


    const islogin = useRecoilValue(smr_loginState);

    return (
        <div>
            <div className='FestiveMainImage'>
                <img src={`${storImagePath()}/images/HomePage/Banner/PromoBanner1.png`} style={{ width: '100%' , minHeight: '450px' }} className='smr_promotion1' alt={"#promoBanner1"} />
                    {/* Maiora not needed  just for maiora*/}
                {/* {islogin === true && <div className='festiveBox'>
                    <p className='smilingFestiMainTitle1' style={{ color: 'gray' }}>LAB GROWN DIAMONDS</p>
                    <p className='smilingFestiMainTitle2' style={{ color: 'gray', fontSize: '40px', margin: '0px' }}>Festive Finds!</p>
                    <p className='smilingFestiMainTitle3' style={{ color: 'gray', margin: '0px', fontSize: '13px' }}>
                        Explore your jewelry for upcoming holiday!
                    </p>
                </div>} */}
            </div>
        </div>
    )
}

export default PromotionBaner1