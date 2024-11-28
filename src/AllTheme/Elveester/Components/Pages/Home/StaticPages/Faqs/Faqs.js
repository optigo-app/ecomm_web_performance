import React, { useEffect } from 'react'
import './Faqs.scss';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import FaqSecData from '../FaqData/FaqSecData';

const Faqs = () => {
    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        })
    }, [])
    return (
        <div className='elv_FaqSection'>
            <div className="image_bar">
                <img src={`${storImagePath()}/images/HomePage/Faq/FAQ_Banner.jpg`} alt="faq.png" />
            </div>
            <FaqSecData />
        </div>
    )
}

export default Faqs