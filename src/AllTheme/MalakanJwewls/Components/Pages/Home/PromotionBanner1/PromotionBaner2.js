import React from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PromotionBaner1.modul.scss'

const PromotionBaner1 = ({ data }) => {

    const backgroundImageUrl = data?.image?.[0];

    const style = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',       // cover whole div
        backgroundPosition: 'center',  // center the image
        width: '100%',                 // adjust as needed
        height: '450px',               // or any height you want
    };

    return (
        <div className='mala_Banner_main' style={style}>
            {/* <div className='mala_promo_section2'>
                <div className='mala_promo_section2_div1'>
                    <p className='mala_promo_section2_div1_p1'>Bespoke jewelry crafted without limitations..</p>
                    <p className='mala_promo_section2_div1_p2'>Your vision, expertly handcrafted.</p> */}
            {/* <button className='mala_promo_section2_div1_btn'>CREATE</button> */}
            {/* </div>
                <div className='mala_promo_section2_div2'>
                    {/* <img src={`${storImagePath()}/images/HomePage/Banner/ring.jpg`} className='mala_promo_secton2_img' /> */}
            {/* <img src={data?.image?.[0]} className='mala_promo_secton2_img' />
                </div> */}
            {/* </div> */}


            {/* <img src={`${storImagePath()}/images/HomePage/BespokeBanner/bespokemiddlebanner.png`} className='mala_promo_secton2_img' /> */}
            {/* <img src={data?.image?.[0]} className='mala_promo_secton2_img' alt='bespokemiddlebanner' /> */}
        </div>
    )
}

export default PromotionBaner1