import React, { useEffect, useRef, useState } from "react";
import "./Album.modul.scss";
import { useNavigate } from "react-router-dom";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import Cookies from "js-cookie";
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { smrMA_homeLoading, smrMA_loginState } from "../../../Recoil/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Album = () => {

  const albumRef = useRef(null);
  const [albumData, setAlbumData] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();
  const islogin = useRecoilValue(smrMA_loginState);
  const setLoadingHome = useSetRecoilState(smrMA_homeLoading);

  useEffect(() => {
    setLoadingHome(true);
    let data = JSON?.parse(sessionStorage.getItem("storeInit"));
    setImageUrl(data?.AlbumImageFol);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            apiCall();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    if (albumRef.current) {
      observer.observe(albumRef.current);
    }
    return () => {
      if (albumRef.current) {
        observer.unobserve(albumRef.current);
      }
    };
  }, []);

  const apiCall = () => {
    const loginUserDetail = JSON?.parse(sessionStorage?.getItem('loginUserDetail'));
    const storeInit = JSON?.parse(sessionStorage?.getItem('storeInit'));
    const visiterID = Cookies.get('visiterId');
    let finalID;
    if (storeInit?.IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
    } else {
      finalID = loginUserDetail?.id || '0';
    }
    setLoadingHome(false);
    Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum_List", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          setAlbumData(response?.Data?.rd);
        }
      })
      .catch((err) => console.log(err));
  }


  const handleNavigate = (name) => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    if (storeinit?.IsB2BWebsite == 1) {
      if (islogin) {
        navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`)
      } else {
        navigation('/signin')

      }
    } else {
      navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`)
    }
  }

  const [validatedData, setValidatedData] = useState([]);

  const checkImageAvailability = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(imageNotFound);
      img.src = url;
    });
  };

  const validatedImageURLs = async () => {
    if (!albumData?.length) return;
    const validatedData = await Promise.all(
      albumData?.slice(0, 4)?.map(async (album) => {
        const designDetails = imageUrl + album?.AlbumImageFol + "/" + album?.AlbumImageName || "";
        const validImage = await checkImageAvailability(designDetails);
        return { ...album, src: validImage };
      })
    );
    setValidatedData(validatedData);
  }

  useEffect(() => {
    validatedImageURLs();
  }, [albumData]);


  return (
    <div ref={albumRef}>
      {albumData?.length != 0 &&
        <div className="smrMA_alubmMainDiv">
          <p className="smr_albumTitle">Album</p>
          <div className="smr_albumALL_div">
            {validatedData?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="smr_AlbumImageMain"
                  onClick={() => handleNavigate(data?.AlbumName)}
                >
                  <img
                    src={data?.src}
                    className="smr_AlbumImageMain_img"
                  />
                </div>
              )
            })}
          </div>
        </div>
      }
    </div>
  );
};

export default Album;
