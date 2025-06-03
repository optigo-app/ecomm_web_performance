import React, { lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { el_companyLogo, el_loginState } from '../../Recoil/atom';
import { Helmet } from 'react-helmet';
import useHomeBannerImages from '../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner';

const TopSection = lazy(() => import('./TopSection/TopSection'));
const PromoComponent1 = lazy(() => import('./PromoComponent/PromoComponent/PromoComponent1'));
const BrandsComponent = lazy(() => import('./PromoComponent/BrandsComponent/BrandsComponent'));
const PromoComponent2 = lazy(() => import('./PromoComponent/PromoComponent/PromoComponent2'));
const Collection = lazy(() => import('./Collection/Collection'));
const Craftmenship = lazy(() => import('./Craftmenship/Craftmenship'));
const GaleryView = lazy(() => import('./GaleryView/GaleryView'));
const CompanyData = lazy(() => import('./ComapnayData/CompanyData'));
const AffiliationData = lazy(() => import('./PromoComponent/BrandsComponent/AffiliationData'));
const SocialMediaSection = lazy(() => import('./SocialMediaSection/SocialMediaSection'));

function Home() {
  const banner = useHomeBannerImages();
  const compnyLogo = useRecoilValue(el_companyLogo);
  const isLogin = useRecoilValue(el_loginState);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Elvee Jewels Private Limited",
    "url": `${window.location.origin}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "about": {
      "@type": "Organization",
      "name": "Elvee Jewels Private Limited",
      "url": `${window.location.origin}`,
      "logo": `${compnyLogo}`,
      "sameAs": [
        "https://www.instagram.com/elvee.jewels",
        "https://in.pinterest.com/elvee_jewels",
        "https://www.facebook.com/elveejewels",
        "https://www.linkedin.com/company/elvee-jewels"
      ]
    },
    "author": {
      "@type": "Organization",
      "name": "Elvee Jewels Team"
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://www.elvee.in/" />
        <script type="application/ld+json">
          {JSON.stringify(productSchema, null, 2)}
        </script>
      </Helmet>
      <div>
        {isLogin ? (
          <TopSection banner={banner?.mainBanner} />
        ) : (
          <>
            <TopSection banner={banner?.mainBanner} />
            <PromoComponent1 banner={banner?.middleBanner} />
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
    </>
  );
}

export default Home;
