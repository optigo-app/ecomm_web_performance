import React, { useEffect, useState } from 'react';
import './ProductListBanner.scss';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Cookies from 'js-cookie';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { smrMA_homeLoading, smrMA_loginState } from '../../../Recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const ProductListBanner = () => {
  const [storeInit, setStoreInit] = useState({});
  const [imageUrl, setImageUrl] = useState();
  const [designSetList, setDesignSetList] = useState([]);
  const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    const islogin = useRecoilValue(smrMA_loginState);
    const setLoadingHome = useSetRecoilState(smrMA_homeLoading);
    
  const callAPI = () => {
    const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get('visiterId');
    let finalID;
    if (IsB2BWebsite == 0) {
        finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
    } else {
        finalID = loginUserDetail?.id || '0';
    }

    let storeinit = JSON.parse(sessionStorage.getItem('storeInit'));
    setStoreInit(storeinit);
    setImageUrl(storeinit?.DesignSetImageFol);

    Get_Tren_BestS_NewAr_DesigSet_Album('GETDesignSet', finalID)
        .then((response) => {
            setLoadingHome(false);
            if (response?.Data?.rd) {
                setDesignSetList(response?.Data?.rd);
            }
        })
        .catch((err) => console.log(err));
}

useEffect(()=>{
    callAPI()
},[])
const ProdCardImageFunc = (pd) => {
    let finalprodListimg;
    if (pd?.DefaultImageName) {
        finalprodListimg = imageUrl + pd?.designsetuniqueno + '/' + pd?.DefaultImageName;
    } else {
        finalprodListimg = imageNotFound;
    }
    return finalprodListimg;
};


const StaticImageGeneration = (src)=>{
  return storImagePath()+`/mapp/`+ src ;
}

const StaticImage = [
    {"src": "1.webp"},
    {"src": "2.webp"},
    {"src": "3.webp"},
    {"src": "4.webp"},
    {"src": "5.webp"},
    {"src": "6.webp"},
    {"src": "7.webp"},
    {"src": "8.webp"},
    {"src": "9.webp"}
  ]
  

  return (
    <div className='smr_ProductListBanner'>
      {/* Preloading the first few images for better LCP performance */}
      {/* {StaticImage.slice(0, 4).map((val, i) => (
        <link
          key={i}
          rel="preload"
          href={StaticImageGeneration(val.src)}
          as="image"
          type="image/webp"
          imagesrcset={StaticImageGeneration(val.src)}
        />
      ))} */}

      {/* Mapping through the StaticImage array */}
      {StaticImage.map((val, i) => (
        <div key={i} className='pp-dd-card'>
          <img
            className="image"
            loading={"lazy"} // Eager loading first 4 images for LCP
            src={StaticImageGeneration(val.src) || ProdCardImageFunc(val)}
            alt={`Slide ${i}`}
            width="100%" // Make sure the width and height are responsive for layout stability
            height="auto"
            style={{
                minHeight: '200px',  // Set a reasonable minimum height to avoid CLS
                maxHeight: '500px',  // Set a maximum height to prevent images from stretching too far
                objectFit: 'cover',  // Ensures the image fills the container without distorting
                display: 'block',  // Ensures the image doesn't cause inline layout issues
              }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductListBanner;