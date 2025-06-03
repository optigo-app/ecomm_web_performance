import React from 'react';
import './Styles.scss';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const PromoComponent1 = ({ banner }) => {

    const basePath = `${storImagePath()}/Banner`;

    const imageSrc = banner?.image?.[0] || `${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner1.jpg`;

    return (
        <div className='promo_first_div'>
            <div className='promo-daimondBoxMain'>
                <div className='promo-daimondBox2'>
                    <picture>
                        <source
                            srcSet={`
                                ${basePath}/middle-image-400.webp 480w,
                                ${basePath}/middle-image-800.webp 800w,
                                ${basePath}/middle-image-1200.webp 1200w,
                                ${basePath}/middlebanner1.webp 1500w
                            `}
                            sizes="(max-width: 480px) 480px,
                                   (max-width: 1024px) 800px,
                                   (max-width: 1500px) 1200px,
                                   1500px"
                            type="image/webp"
                        />
                        <img
                            src={`${basePath}/middlebanner1.webp`}
                            alt="Promo Banner"
                            className='promo-daimondBox2-image'
                        />
                    </picture>
                </div>
                <div className='promo-daimondBox_1'>
                    <p className='promo_dia_desc'>
                        From the first sketch to the final polish, every step of the journey takes place within the walls of our atelier, where master artisans breathe life into raw materials, transforming them into timeless works of art. Each piece is meticulously crafted with a blend of traditional techniques and contemporary innovation, reflecting a harmonious balance between heritage and modernity.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PromoComponent1;
