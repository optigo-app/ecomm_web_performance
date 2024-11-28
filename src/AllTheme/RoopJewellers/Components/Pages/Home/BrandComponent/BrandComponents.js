import React from 'react';
import Marquee from 'react-fast-marquee';
import './brandComponents.scss';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const BrandsComponent = () => {
    return (
        <div id='brandsComponentID' className='roop_brandsComponentsDiv'>
            <p className='roop_brandsCompoents'>Introducing our exclusive brands</p>
            <Marquee
                className='roop_brandsComponentClass'
                gradient={false}
                speed={40}
                pauseOnHover={true}
            // style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo2.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo3.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo5.svg`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo6.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo5.svg`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo3.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo5.svg`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo3.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                 <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo2.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                 <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo5.svg`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                 <img className='roop_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo6.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
            </Marquee>
        </div>
    );
};

export default BrandsComponent;
