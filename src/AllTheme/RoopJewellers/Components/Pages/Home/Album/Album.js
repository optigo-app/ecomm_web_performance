import React, { useEffect, useState } from "react";
import "./Album.modul.scss";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import { roop_loginState } from "../../../Recoil/atom";

const Album = () => {
  const [albumData, setAlbumData] = useState();
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();
  const islogin = useRecoilValue(roop_loginState);

  useEffect(() => {
    let data = JSON?.parse(sessionStorage.getItem("storeInit"));
    setImageUrl(data?.AlbumImageFol);

    const loginUserDetail = JSON?.parse(sessionStorage?.getItem('loginUserDetail'));
    const storeInit = JSON?.parse(sessionStorage?.getItem('storeInit'));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get('visiterId');
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
    } else {
      finalID = loginUserDetail?.id || '0';
    }

    Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          setAlbumData(response?.Data?.rd);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNavigate = (name) => {
    navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`)
  }

  console.log('albumDataalbumData', albumData);

  return (
    <div className="roop_alubmMainDiv">
      {albumData?.length > 0 && <p className="roop_albumTitle">Infinitely Inspiring</p>}
      <div className="roop_albumALL_div">
        {albumData?.slice(0, 5).map((data, index) => (
          <div
            key={index}
            className="roop_AlbumImageMain"
            onClick={() => handleNavigate(data?.AlbumName)}
          >
            <img
              src={imageUrl + data?.AlbumImageFol + "/" + data?.AlbumImageName}
              className="roop_AlbumImageMain_img"
            />
            <p className="roop_albumName">{data?.AlbumName}</p>
          </div>
        ))}
      </div>
      {albumData?.length > 5 && <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p className="roop_albumViveAll">View All</p>
      </div>}
    </div>
  );
};

export default Album;
