import React from 'react'
import './Styles.scss'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction'

const BrandsComponent = ({ banner }) => {
    console.log('banner: ', banner);
    return (
        <div id='brandsComponentID' name={'brandsComponentID'} >
            <Title />
            <div className='brandsComponentClass'>
                {banner?.image?.map((image, index) => (
                    <img key={index} className='affilitionImg' loading="lazy" src={image} alt={`brand-${index + 1}`} />
                ))}
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
            <h1 className='elv_brand_title_h3'>introducing our exclusive brands</h1>
            <p className='elv_brand_subtitle_p'>Unveiling the Finest in Exclusive Brands</p>
        </div>
    )
}