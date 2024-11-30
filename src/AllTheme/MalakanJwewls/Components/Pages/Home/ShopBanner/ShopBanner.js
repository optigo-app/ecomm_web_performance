import React, { useState ,useEffect } from 'react'
import './ShopBanner.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { LiaChevronCircleRightSolid } from "react-icons/lia";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { mala_loginState } from '../../../Recoil/atom';
import {  useNavigate } from 'react-router-dom';
import Pako from 'pako';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import noimagefound from './../../../Assets/image-not-found.jpg' ;
import { FiChevronRight } from "react-icons/fi";


const ShopBanner = () => {
    const [storeInit, setStoreInit] = useState();
    const islogin = useRecoilValue(mala_loginState);
    const [imageUrl, setImageUrl] = useState();
    const [albumList, setAlbumList] = useState([]);
    const navigation = useNavigate();
  
    const apiCall = () => {
      const loginUserDetail = JSON?.parse(
        sessionStorage?.getItem("loginUserDetail")
      );
      const storeInit = JSON?.parse(sessionStorage?.getItem("storeInit"));
      setImageUrl(storeInit?.AlbumImageFol);
      setStoreInit(storeInit);
      const visiterID = Cookies.get("visiterId");
      let finalID;
      if (storeInit?.IsB2BWebsite == 0) {
        finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
      } else {
        finalID = loginUserDetail?.id || "0";
      }
      Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          console.log("called album", response?.Data?.rd);
          console.log(response?.Data?.rd);
          setAlbumList(response?.Data?.rd);
        }
      })
      Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum_List", finalID)
        .then((response) => {
          if (response?.Data?.rd) {
            console.log("album", response?.Data?.rd);
            // setAlbumList(response?.Data?.rd);
          }
        })
        .catch((err) => console.log(err));
    };
  
    const compressAndEncode = (inputString) => {
      try {
        const uint8Array = new TextEncoder().encode(inputString);
        const compressed = Pako.deflate(uint8Array, { to: "string" });
        return btoa(String.fromCharCode.apply(null, compressed));
      } catch (error) {
        console.error("Error compressing and encoding:", error);
        return null;
      }
    };

    const GenrateImageV2 = (data)=>{
      let Image ;
      Image =  imageUrl + data?.AlbumImageFol + "/" + data?.AlbumImageName
    //   return 'URL_ADDRESS'
      return Image
    }

    function handleNavigate(name) {
    navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`);
  }
  
    useEffect(() => {
      apiCall();
    }, []);
    // {albumList && albumList?.slice(0,4)?.map((data, i) 

    // img={GenrateImage(data)} title={data?.AlbumName} />;


    return (
      <div className="mala_BottomBannerMain">
      <CategoryGrid data={albumList?.slice(0,4)} imageUrl={imageUrl} title='Album'/>
      </div>
    );
}

export default ShopBanner;


export const CategoryGrid = ({ title = "Find Your Forever Ring", data ,imageUrl }) => {
  const navigation  = useNavigate();

  const GenrateImage = (data)=>{
    let Image ;
    Image =  imageUrl + data?.AlbumImageFol + "/" + data?.AlbumImageName
  //   return 'https://world.forevery.one/WebSiteStaticImage/Forevery/home/labgrownBanner/142.webp'
    return Image ;
  }

  const handleNavigate = (name) => {
    navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`);
  };

  const CountTotalProducts = (alb)=>{
    if(alb){
      const res = alb && JSON?.parse(alb?.Designdetail);
      const totalresults = res?.length ;
      return totalresults ;
    }else{
      return 0 ;
    }
  }

  return (
    <>
      <div className="mala-lab-CategoryGrid">
        <div className="mala-heading">
          <h1>{title}</h1>
        </div>
        <div className="mala_grid_container">
          {data?.map((val, i) => {
            return (
              <div key={i} className="mala_card-grid">
                <div className="details_malakan_overlay" onClick={()=>handleNavigate(val?.AlbumName)}>
                <div className="total_Album_malakan">
                  <h2>{CountTotalProducts(val)} Products</h2>
                </div>
                 
                  <div className="view_colllec_malakan">
                    <span>View The Album  <FiChevronRight/></span>
                  </div>
                </div>
                <div className="title" onClick={()=>handleNavigate(val?.AlbumName)}>
                 <h1> {val?.AlbumName}</h1>
                  </div>
                                 <img  src={GenrateImage(val)}
                   onError={(e) => {
                          e.target.src = noimagefound;
                          e.target.alt = "no-image-found";
                        }}
                  loading="lazy" alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};



const BannerPost = ({text,color , bg})=>{
    return <div className='malkan_BannerPost'
    style={{
        color : color ,
        backgroundColor:bg
    }}
    >
    {text}  <LiaChevronCircleRightSolid size={70} className='icon_malkan'/>
    </div>
}