import React from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PromotionBaner1.modul.scss'

const PromotionBaner1 = () => {

    return (
        <div>
            <div className='FestiveMainImage'>
                <img src={`${storImagePath()}/images/HomePage/Banner/PromoBanner2.png`} style={{ width: '100%', minHeight: '450px' }} className='smr_promotion1' alt={"#promoBanner1"} />
                    {/* <p className='smilingFestiMainTitle1' style={{ color: 'gray' }}>LAB GROWN DIAMONDS</p> */}
                    {/* Maiora not needed  just for maiora*/}
                {/* <div className='smr_festiveBox'>
                    <p className='smilingFestiMainTitle2' style={{ color: 'white', fontSize: '40px', margin: '0px' }}>Festive Finds!</p>
                    <p className='smilingFestiMainTitle3' style={{ color: 'white', margin: '0px', fontSize: '13px' }}>
                        Explore your jewelry for upcoming holiday!
                    </p>
                </div> */}
            </div>
        </div>
    )
}

export default PromotionBaner1