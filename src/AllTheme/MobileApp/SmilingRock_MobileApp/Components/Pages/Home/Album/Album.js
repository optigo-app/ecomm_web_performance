import React, { useEffect, useRef, useState } from "react";
import "./Album.modul.scss";
import { useNavigate } from "react-router-dom";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import Cookies from "js-cookie";
import { smrMA_homeLoading, smrMA_loginState } from "../../../Recoil/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import imageNotFound from '../../../Assets/image-not-found.jpg'

const Album = () => {

  const albumRef = useRef(null);
  const [albumData, setAlbumData] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();
  const islogin = useRecoilValue(smrMA_loginState);
  const setLoadingHome = useSetRecoilState(smrMA_homeLoading);
  const [storeInit, setStoreInit] = useState({});
  const [validImages, setValidImages] = useState([]);

  useEffect(() => {
    setLoadingHome(true);
    let data = JSON?.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(data);
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
    Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          setAlbumData(response?.Data?.rd);
        }
      })
      .catch((err) => {
        return err ;
      });
  }

  const checkImageAvailability = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(imageNotFound);
      img.src = url;
    });
  };

  const findValidImage = async (designDetails) => {
    const imageChecks = designDetails.map((design) => {
      const imageUrl = `${storeInit?.CDNDesignImageFol}${design?.designno}~1.${design?.ImageExtension}`;
      return checkImageAvailability(imageUrl).then((isAvailable) =>
        isAvailable ? imageUrl : null
      );
    });

    const images = await Promise.all(imageChecks);
    return images.find((url) => url !== null) || imageNotFound;
  };

  useEffect(() => {
    const getValidImages = async () => {
      if (!albumData?.length) return;

      const imagePromises = albumData.map(async (album) => {
        if (album.AlbumImageName && album.AlbumImageFol) {
          const imgSrc = `${storeInit?.AlbumImageFol}${album?.AlbumImageFol}/${album?.AlbumImageName}`
          // console.log(imgSrc ,"img src")
          const validImage = await checkImageAvailability(imgSrc);
          return { ...album, src: validImage, name: album?.AlbumName };
        }
        else {
          return { ...album, src: imageNotFound, name: album?.AlbumName };
        }
      });

      const images = await Promise.all(imagePromises);
      setValidImages(images);
    };

    getValidImages();
  }, [albumData, storeInit, imageNotFound]);
  
    const handleNavigate = (name) => {
      let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
      const link = `/p/${name}/?A=${btoa(`AlbumName=${name}`)}` ;
      if (storeinit?.IsB2BWebsite == 1) {
        if (islogin) {
          navigation(link)
        } else {
          localStorage.setItem('redirectLookBook',link);
          navigation('/signin')
        }
      } else {
        navigation(link)
      }
    }
    const scrollRef = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
  
    const updateButtonState = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const scrollWidth = scrollRef.current.scrollWidth;
        const clientWidth = scrollRef.current.clientWidth;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
      }
    };
  
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -204, behavior: "smooth" });
        updateButtonState();
      }
    };
  
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 204, behavior: "smooth" });
        updateButtonState();
      }
    };
  
    useEffect(() => {
      updateButtonState();
      window?.addEventListener("resize", updateButtonState);
      scrollRef.current?.addEventListener("scroll", updateButtonState);  
      return () => {
        window?.removeEventListener("resize", updateButtonState);
        scrollRef.current?.removeEventListener("scroll", updateButtonState);
      };
    }, []);

  return (
    <div ref={albumRef}>
      {validImages?.length != 0 &&
        <div className="smrMA_alubmMainDiv">
          <p className="smr_albumTitle">Album</p>  
          {/* <button
               className="album-menu-btn-left"
            onClick={scrollLeft}
            disabled={isAtStart}
          >
            <HiMiniArrowLeftCircle size={35} color="gray"/>
          </button>
        {validImages?.length > 2 &&  <button
          className="album-menu-btn-right"
            onClick={scrollRight}
            disabled={isAtEnd}
          >
            <HiMiniArrowRightCircle size={35} color="gray"/>
            </button>} */}
          <div className="smr_mapp_albumALL_div"  ref={scrollRef}>
         
            {validImages?.slice(0, 4)?.map((data, index) => {
               return <div
                key={index}
                className="smr_AlbumImageMain"
                onClick={() => handleNavigate(data?.name)}
              >
                <img
                  className="smr_AlbumImageMain_img"
                  src={data?.src}
                  alt="image"
                  onError={(e) => {
                         e.target.src = imageNotFound;
                         e.target.alt = "no-image-found";
                       }}
                 loading="lazy"
                />
              </div>
            })}
          </div>
        </div>
      }
    </div>
  );
};

export default Album;
