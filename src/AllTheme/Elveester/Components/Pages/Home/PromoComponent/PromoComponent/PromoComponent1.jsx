import React, { useEffect } from 'react';
import './Styles.scss';
import { useNavigate } from 'react-router-dom';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const PromoComponent1 = ({ banner }) => {

    const navigate = useNavigate();
    
    const imageSrc = banner?.image?.[0] || `${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner1.jpg`;

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = imageSrc; 
        link.as = 'image'; 
        link.type = 'image/png'; 
        document.head.appendChild(link);
        // Clean up the link element when the component unmounts
        return () => {
            document.head.removeChild(link);
        };
    }, [imageSrc]);

    return (
        <div className='promo_first_div'>
            <div className='promo-daimondBoxMain'>
                <div className='promo-daimondBox2'>
                    {/* Adding loading="lazy" for image optimization */}
                    <img
                        src={imageSrc}
                        // loading="lazy" 
                        className='promo-daimondBox2-image'
                        alt={'Promo Banner'} // Dynamic alt text if available
                    />
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
