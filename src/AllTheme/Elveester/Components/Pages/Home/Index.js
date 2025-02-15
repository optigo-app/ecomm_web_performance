import React from 'react'
import { useRecoilValue } from 'recoil';
import { el_loginState } from '../../Recoil/atom';
import useHomeBannerImages from '../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner';
const TopSection = React.lazy(() => import('./TopSection/TopSection'));
const PromoComponent1 = React.lazy(() => import('./PromoComponent/PromoComponent/PromoComponent1'));
const BrandsComponent = React.lazy(() => import('./PromoComponent/BrandsComponent/BrandsComponent'));
const PromoComponent2 = React.lazy(() => import('./PromoComponent/PromoComponent/PromoComponent2'));
const Collection = React.lazy(() => import('./Collection/Collection'));
const Craftmenship = React.lazy(() => import('./Craftmenship/Craftmenship'));
const GaleryView = React.lazy(() => import('./GaleryView/GaleryView'));
const CompanyData = React.lazy(() => import('./ComapnayData/CompanyData'));
const AffiliationData = React.lazy(() => import('./PromoComponent/BrandsComponent/AffiliationData'));
const SocialMediaSection = React.lazy(() => import('./SocialMediaSection/SocialMediaSection'));
const Exhibition = React.lazy(() => import('./ExhibitionBanner/Exhibition'));

function Home() {
  const banner = useHomeBannerImages();

  const isLogin = useRecoilValue(el_loginState);

  return (
    <div>
      {isLogin ?
        <TopSection banner={banner?.mainBanner} />
        :
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
      }
    </div>
  )
}

export default Home;