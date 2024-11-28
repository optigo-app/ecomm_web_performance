import { Navigate, useNavigate } from "react-router-dom";
import { CollectionArray } from "../../../../data/NavbarMenu";
import "./ShoptheCollections.scss";
import React, { useEffect, useState } from "react";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import Pako from "pako";
import Cookies from "js-cookie";
import { for_loginState } from "../../../../Recoil/atom";
import { useRecoilValue } from "recoil";
import {NoImage} from './../../../../Assets/Noimage'

const ShoptheCollections = () => {
  const [storeInit, setStoreInit] = useState();
  const islogin = useRecoilValue(for_loginState);
  const [imageUrl, setImageUrl] = useState();
  const [albumList, setAlbumList] = useState([]);
  const navigation  = useNavigate();

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

  const GenrateImage = (data)=>{
    let Image ;
    Image =  imageUrl + data?.AlbumImageFol + "/" + data?.AlbumImageName
    console.log(Image,"album imge")
    return Image ;
  }
  const handleNavigate = (name) => {
    navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`);
  };

  useEffect(() => {
    apiCall();
  }, []);
  

  return (
    <div className="forevery_ShoptheCollections">
      <div className="heading">
        <h1 className="title_for">
          Lab Grown Diamond Jewelry - Shop the Collection
        </h1>
        <p className="para_for">
          Jewelry from our popular collection is designed for Everyone to
          celebrate life's extraordinary moments
        </p>
      </div>
      <div className="for_collections">
        {albumList && albumList?.slice(0,4)?.map((data, i) => {
          return <Card 
          onClick={() => handleNavigate(data?.AlbumName)}
          img={GenrateImage(data)} title={data?.AlbumName} />;
        })}
      </div>
    </div>
  );
};

export default ShoptheCollections;

const Card = ({ title, img, onClick}) => {
  return (
    <div
      className="for_card"
      onClick={onClick}
      style={{
        cursor: "pointer",
      }}
    >
      <img src={img} onError={(e)=>e.target.src = NoImage} alt="" />
      <div className="for_square"></div>
      <button className="for_btn">{title}</button>
    </div>
  );
};
