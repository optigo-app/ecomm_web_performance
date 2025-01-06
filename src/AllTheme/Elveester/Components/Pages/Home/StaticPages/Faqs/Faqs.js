import React, { useEffect } from 'react'
import './Faqs.scss';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import FaqSecData from '../FaqData/FaqSecData';
import useHomeBannerImages from '../../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner';

const Faqs = () => {
    const { faqBanner } = useHomeBannerImages();
    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        })
    }, [])
    return (
        <div className='elv_FaqSection'>
            <div className="image_bar">
                <img src={faqBanner?.image?.[0]} alt="faq.png" />
                {/* <img src={`${storImagePath()}/images/HomePage/Faq/FAQ_Banner.jpg`} alt="faq.png" /> */}
            </div>
            <FaqSecData />
        </div>
    )
}

export default Faqs