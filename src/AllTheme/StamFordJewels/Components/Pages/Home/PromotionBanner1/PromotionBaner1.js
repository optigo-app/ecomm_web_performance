import React from 'react'
import { useRecoilValue } from 'recoil';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PromotionBaner1.modul.scss'
import { stam_loginState } from '../../../Recoil/atom';

const PromotionBaner1 = () => {


    const islogin = useRecoilValue(stam_loginState);

    return (
        <div className='stam_Banner_main'>
            <img src={`${storImagePath()}/images/HomePage/sectionBanner/Banner1.jpg`} style={{ width: '100%', objectFit: 'contain' }} className='stam_promotion1' alt={"#promoBanner1"} />
            {/* <img src={`${storImagePath()}/images/BannerImage/PromoBanner2.webp`} style={{ width: '100%', minHeight: '450px' }} className='stam_promotion1' alt={"#promoBanner1"} /> */}
            {/* {islogin === true && <div className='festiveBox'>
                <p className='smilingFestiMainTitle1' style={{ color: 'gray' }}>LAB GROWN DIAMONDS</p>
                <p className='smilingFestiMainTitle2' style={{ color: 'gray', fontSize: '40px', margin: '0px' }}>Festive Finds!</p>
                <p className='smilingFestiMainTitle3' style={{ color: 'gray', margin: '0px', fontSize: '13px' }}>
                    Explore your jewelry for upcoming holiday!
                </p>
            </div>} */}
        </div>
    )
}

export default PromotionBaner1