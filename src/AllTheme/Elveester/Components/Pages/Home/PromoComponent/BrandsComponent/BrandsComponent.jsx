import React from 'react'
import './Styles.scss'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction'

const BrandsComponent = () => {
    return (
        <div id='brandsComponentID'  name={'brandsComponentID'} >
            <Title />
            <div className='brandsComponentClass'>
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo06.png`}/>
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo05.png`} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo04.png`} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo02.png`} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo03.png`} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo01.png`} />
                {/* <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo05.png`} style={{ width: '10%', objectFit: 'cover', marginRight:'90px' }} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo06.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo04.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo02.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo03.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandsLogoImg/BrandsLogo01.png`} style={{ width: '10%', objectFit: 'cover'}} /> */}
            </div>
        </div>
    )
}

export default BrandsComponent

const Title = () => {
    return (
        <div className='brandsCompoents_div'>
            <h3 className='elv_brand_title_h3'>introducing our exclusive brands</h3>
            <p className='elv_brand_subtitle_p'>Unveiling the Finest in Exclusive Brands</p>
        </div>
    )
}