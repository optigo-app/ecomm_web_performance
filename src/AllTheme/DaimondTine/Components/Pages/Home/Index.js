import React, { useEffect, useState, Suspense, lazy } from 'react'
import { storImagePath, storInitDataPath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import './Index.modul.scss'
import { useRecoilValue } from 'recoil';
import { dt_homeLoading } from '../../Recoil/atom';

// Lazy load components
const TopSection = lazy(() => import('./TopSection/TopSection'));
const Footer = lazy(() => import('./Footer/Footer'));
const NewArrival = lazy(() => import('./NewArrival/NewArrival'));
const SocialMedia = lazy(() => import('./SocialMedia/SocialMedia'));
const Album1 = lazy(() => import('./Album/Album1'));
const BestSellerSection1 = lazy(() => import('./BestSellerSection/BestSellerSection1'));
const TrendingView1 = lazy(() => import('./TrandingView/TrendingView1'));
const DesignSet2 = lazy(() => import('./DesignSet/DesignSet2'));
const Demo = lazy(() => import('./Demo'));
function Home() {
  const [localData, setLocalData] = useState();
  const [htmlContent, setHtmlContent] = useState("");
  const isLoadingHome = useRecoilValue(dt_homeLoading);


  useEffect(() => {
    fetch(`${storInitDataPath()}/StoreInit.json`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON?.parse(text);
          setHtmlContent(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

  useEffect(() => {
    let localData = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localData);
  }, []);



  return (<Demo/>
    // <>
    //   {htmlContent?.rd && htmlContent?.rd.length > 0 && (
    //     <div>
    //       <Suspense fallback={<div></div>}>
    //         <TopSection />
    //         {htmlContent?.rd[0]?.IsHomeAlbum === 1 && <Album1 />}
    //         {htmlContent?.rd[0]?.IsHomeBestSeller === 1 && <BestSellerSection1 />}
    //         {htmlContent?.rd[0]?.IsHomeNewArrival === 1 && <NewArrival />}
    //         {htmlContent?.rd[0]?.IsHomeTrending === 1 && <TrendingView1 />}
    //         {htmlContent?.rd[0]?.IsHomeDesignSet === 1 && <DesignSet2 />}
    //         {isLoadingHome ? (
    //           <div className="dat_Home_loader_container">
    //             <div className="dt_Home_loader"></div>
    //           </div>
    //         ) : (
    //           <>
    //             <SocialMedia />
    //             <Footer />
    //           </>
    //         )}
    //       </Suspense>
    //     </div>
    //   )}
    // </>
  )
}

export default Home;
