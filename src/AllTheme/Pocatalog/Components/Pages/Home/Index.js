import React, { useEffect, useState } from 'react'
import './Index.modul.scss'
import TopSection from './TopVideo/TopSection';
import TheDifference from './TheDifference/TheDifference';
import PromotionBaner1 from './PromotionBanner1/PromotionBaner1';
import ShopByCategory from './ShopByCategory/ShopByCategory';
import PromoSetSection from './BestSellerSection/BestSellerSection';
import SustainAbility from './SustainAbility/SustainAbility';
import BottomBanner from './BottomBanner/BottomBanner';
import Footer from './Footer/Footer';
import TrendingView from './TrandingView/TrendingView';
import DesignSet from './DesignSet/DesignSet';
import Album from './Album/Album';
import NewArrival from './NewArrival/NewArrival';
import BestSellerSection from './BestSellerSection/BestSellerSection';
import { Helmet } from 'react-helmet';

function Home() {

  const [title, setTitle] = useState();

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem('storeInit'));
    setTitle(data?.BrowserTitle);
  }, [])

  return (
    <div className='ProCat_home_index_main'>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className='smiling_home_index_Submain'>
        <TopSection />
        {/* <TheDifference />
          <PromotionBaner1 /> */}
        {/* {localData?.IsHomeAlbum === 1 &&  */}
        <Album />
        {/* } */}
        {/* {localData?.IsHomeTrending === 1 && <TrendingView />}
          {localData?.IsHomeNewArrival === 1 && <NewArrival />}
          {localData?.IsHomeBestSeller === 1 && <BestSellerSection />}
          {localData?.IsHomeDesignSet === 1 && <DesignSet />} */}
        {/* <BottomBanner /> */}
      </div>

    </div>
  )
}

export default Home;