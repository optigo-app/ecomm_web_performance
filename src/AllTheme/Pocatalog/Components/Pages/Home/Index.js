import React, { useEffect, useState } from 'react'
import './Index.modul.scss'
import TopSection from './TopVideo/TopSection';
import Album from './Album/Album';
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