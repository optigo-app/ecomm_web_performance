import React, { useEffect, useRef, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './TopSection.modul.scss'

const TopSection = () => {
  const localData = JSON.parse(sessionStorage.getItem('storeInit'));
  return (
    <div>
      {/* <img src={`${storImagePath()}/images/HomePage/MainBanner/mainBanner.png`} className='proCatTopBannerImg' /> */}
      <img src={`${localData?.ProCatLogbanner}`} className='proCatTopBannerImg' />
    </div>
  )
}

export default TopSection