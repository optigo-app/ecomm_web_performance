import React from 'react'
import TopSection from './TopSection/TopSection';
import { useRecoilValue } from 'recoil';
import { el_loginState } from '../../Recoil/atom';
import PromoComponent1 from './PromoComponent/PromoComponent/PromoComponent1';
import BrandsComponent from './PromoComponent/BrandsComponent/BrandsComponent';
import PromoComponent2 from './PromoComponent/PromoComponent/PromoComponent2';
import Collection from './Collection/Collection';
import Craftmenship from './Craftmenship/Craftmenship';
import GaleryView from './GaleryView/GaleryView';
import CompanyData from './ComapnayData/CompanyData';
import AffiliationData from './PromoComponent/BrandsComponent/AffiliationData';
import SocialMediaSection from './SocialMediaSection/SocialMediaSection';
import Exhibition from './ExhibitionBanner/Exhibition';

function Home() {

  const isLogin = useRecoilValue(el_loginState);

  return (
    <div>
      {isLogin ?
        <TopSection />
        :
        <>
          <TopSection />
          <PromoComponent1 />
          <Exhibition />
          <BrandsComponent />
          <PromoComponent2 />
          <Collection />
          <Craftmenship />
          <GaleryView />
          <CompanyData />
          <AffiliationData />
          <SocialMediaSection />
        </>
      }
    </div>
  )
}

export default Home;