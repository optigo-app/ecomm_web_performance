import React from 'react'
import { useRecoilValue } from 'recoil';
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

            
            <div className='mala_promo2_main2'>
                <div className='mala_promo2_main2_1'>
                    <img src={`${storImagePath()}/images/HomePage/ring.jpg`} className='mala_promo_secton2_img' />
                </div>
                <div className='mala_promo2_main2_2'>
                <p className='mala_promo2_main2_2_p'>Each piece of  custom jewelry is a testament to exceptional craftsmanship. With a commitment to time-honored traditions has been the trusted partner for jewelers for over 80 years, crafting extraordinary jewelry for discerning clients.</p> <p className='mala_promo2_main2_2_p'>Your clients are bold dreamers, seeking more than just the ordinary. They aspire to greatness, breaking barriers and seizing opportunities. They deserve custom jewelry that reflects their uniqueness. With the support of the team, you can confidently bring their visions to life.</p>  </div>
            </div>

            <div className='mala_promo_bottomMain'>
                <div className='mala_promo_bottomMainSub'>
                    <p className='mala_promo_bottomMainP'>Allow us to be your bespoke jewelry studio, crafting timeless pieces for your clients that they will cherish for a lifetime.</p>
                    {/* <button className='mala_promo_bottomMainBtn'>GET STARTED</button> */}
                </div>
            </div>
        </div>
    )
}

export default PromotionBaner1