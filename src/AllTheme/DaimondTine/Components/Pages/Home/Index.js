import React, { useEffect, useState } from 'react'
import TopSection from './TopSection/TopSection';
import Footer from './Footer/Footer';
import NewArrival from './NewArrival/NewArrival';
import SocialMedia from './SocialMedia/SocialMedia';
import Album1 from './Album/Album1';
import BestSellerSection1 from './BestSellerSection/BestSellerSection1';
import TrendingView1 from './TrandingView/TrendingView1';
import DesignSet2 from './DesignSet/DesignSet2';
import { storImagePath, storInitDataPath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import './Index.modul.scss'
import { useRecoilValue } from 'recoil';
import { dt_homeLoading } from '../../Recoil/atom';
import { Value } from 'sass';

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



  return (
    <>
      {htmlContent?.rd && htmlContent?.rd.length > 0 &&
        (
          <div>
            <TopSection />
            {htmlContent?.rd[0]?.IsHomeAlbum === 1 && <Album1 />}
            {htmlContent?.rd[0]?.IsHomeBestSeller === 1 && <BestSellerSection1 />}
            {htmlContent?.rd[0]?.IsHomeNewArrival === 1 && <NewArrival />}
            {htmlContent?.rd[0]?.IsHomeTrending === 1 && <TrendingView1 />}
            {htmlContent?.rd[0]?.IsHomeDesignSet === 1 && <DesignSet2 />}
            {isLoadingHome == true ?
              <div className="dat_Home_loader_container">
                <div className="dt_Home_loader"></div>
              </div>
              :
              <>
                <SocialMedia />
                <Footer />
              </>
            }
          </div>
        )}
    </>
  )
}

export default Home;