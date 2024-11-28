import React, { useEffect } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'
import "./FaqSection.scss";
import FaqSectionCom from '../../Home/FaQSection/FaqSection'
const FaqSection = () => {
  useEffect(()=>{
    window.scrollTo({
      behavior  :"smooth",
      top : 0
    })
  },[])
  return (
    <div className='hoq_FaqSection'>
        <div className="image_bar">
            <img src={`${storImagePath()}/images/HomePage/ImageBannerTab/faq.webp`} alt="img" />
            <h1>FAQ</h1>
        </div>
        <FaqSectionCom/>
    </div>
  )
}

export default FaqSection