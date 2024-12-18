import React, { useEffect, useState } from 'react';
import './ProductListBanner.scss';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Cookies from 'js-cookie';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { smrMA_homeLoading, smrMA_loginState } from '../../../Recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

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

  return (
    <div className='smr_ProductListBanner'>
        {designSetList?.map((val,i)=>{
            return <div className='pp-dd-card'>
                 <img
                                className="image"
                                loading="lazy"
                                src={ProdCardImageFunc(val)}
                                alt={`Slide ${i}`}
                            />
            </div>
        })}
    </div>
  );
};

export default ProductListBanner;