import React from 'react';
import { useRecoilValue } from 'recoil';
import { el_loginState } from '../../Recoil/atom';
import useHomeBannerImages from '../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner';
import TopSection from './TopSection/TopSection';
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
  const banner = useHomeBannerImages();

  const isLogin = useRecoilValue(el_loginState);

  return (
    <div>
      {isLogin ? (
        <TopSection banner={banner?.mainBanner} />
      ) : (
        <>
          <TopSection banner={banner?.mainBanner} />
          <PromoComponent1 banner={banner?.middleBanner} />
          {/* <Exhibition banner={banner?.middleBanner} /> */}
          <BrandsComponent banner={banner?.brandlogo} />
          <PromoComponent2 banner={banner?.collectionBanner} />
          <Collection banner={banner?.categoryBanner} />
          <Craftmenship banner={banner?.promotionalBanner} />
          <GaleryView banner={banner?.photoGallery} />
          <CompanyData />
          <AffiliationData banner={banner?.affiliation} />
          <SocialMediaSection banner={banner?.socialMediaBanner2} />
        </>
      )}
    </div>
  );
}

export default Home;
