import React from 'react'
import './Exhibition.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const Exhibition = () => {
    return (
        <div id='elv_exhib_banner_div' >
            <Title />
            <div className='elv_exhib_banner'>
                <img className='elv_exh_banner' loading="lazy" src={`${storImagePath()}/images/HomePage/Exhibition/Banner/Banner.jpg`} />
            </div>
        </div>
    )
}

export default Exhibition;

const Title = () => {
    return (
        <div className='elv_exhib_banner_title_div'>
            <h3 className='elv_exhib_banner_title_h3'>Your Exclusive Invitation Awaits!</h3>
            <p className='elv_exhib_banner_p'>Explore Our Latest Collections at Exhibition</p>
        </div>
    )
}


