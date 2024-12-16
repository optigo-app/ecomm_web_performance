import React from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PromotionBaner1.modul.scss'

const PromotionBaner1 = () => {



    return (
        <div className='mala_Banner_main'>
            <div className='mala_promo_section2'>
                <div className='mala_promo_section2_div1'>
                    <p className='mala_promo_section2_div1_p1'>Bespoke jewelry crafted without limitations..</p>
                    <p className='mala_promo_section2_div1_p2'>Your vision, expertly handcrafted.</p>
                    {/* <button className='mala_promo_section2_div1_btn'>CREATE</button> */}
                </div>
                <div className='mala_promo_section2_div2'>
                    <img src={`${storImagePath()}/images/HomePage/Banner/ring.jpg`} className='mala_promo_secton2_img' />
                </div>
            </div>

            
          
        </div>
    )
}

export default PromotionBaner1