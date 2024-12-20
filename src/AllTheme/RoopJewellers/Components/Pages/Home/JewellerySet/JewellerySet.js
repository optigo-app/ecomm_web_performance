import React, { useCallback, useEffect, useRef, useState } from 'react'
import './JewellerySet.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'
import { roop_loginState } from '../../../Recoil/atom';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { useRecoilValue } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

function JewellerySet() {

  const [albumData, setAlbumData] = useState();
  const navigation = useNavigate();
  const islogin = useRecoilValue(roop_loginState);
  const [isLoading, setIsLoading] = useState(false);
  const [storeInit, setStoreInit] = useState({});
  const [validImages, setValidImages] = useState([]);
  const [slideHeight, setSlideHeight] = useState(null);
  const swiperSlideRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const storeInitData = JSON.parse(sessionStorage.getItem("storeInit"));
    const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));

    setStoreInit(storeInitData);

    const { IsB2BWebsite } = storeInitData;
    const visiterID = Cookies.get('visiterId');

    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
    } else {
      finalID = loginUserDetail?.id || '0';
    }

    // Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum_List", finalID)
    Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          setAlbumData(response.Data.rd);
        } else {
          console.log("No album data found", response);
        }
      })
      .catch((err) => {
        console.error("Error fetching album data:", err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [islogin]);

  const checkImageAvailability = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(imageNotFound);
      img.src = url;
    });
  };

  // const findValidImage = async (designDetails) => {
  //   const imageChecks = designDetails.map((design) => {
  //     const imageUrl = `${storeInit?.CDNDesignImageFol}${design?.designno}~1.${design?.ImageExtension}`;
  //     return checkImageAvailability(imageUrl).then((isAvailable) =>
  //       isAvailable ? imageUrl : null
  //     );
  //   });

  //   const images = await Promise.all(imageChecks);
  //   return images.find((url) => url !== null) || imageNotFound;
  // };

  useEffect(() => {
    const getValidImages = async () => {
      if (!albumData?.length) return;

      const imagePromises = albumData.map(async (album) => {
        if (album.AlbumImageName && album.AlbumImageFol) {
          const imgSrc = `${storeInit?.AlbumImageFol}${album?.AlbumImageFol}/${album?.AlbumImageName}`
          const validImage = await checkImageAvailability(imgSrc);
          return { ...album, src: imgSrc, name: album?.AlbumName };
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
  // useEffect(() => {
  //   const getValidImages = async () => {
  //     if (!albumData?.length) return;

  //     const imagePromises = albumData.map(async (album) => {
  //       if (album?.Designdetail) {
  //         const designDetails = JSON?.parse(album?.Designdetail) || [];
  //         const validImage = await findValidImage(designDetails);
  //         return { ...album, src: validImage, name: album?.AlbumName };
  //       }
  //       return { ...album, src: imageNotFound, name: album?.AlbumName };
  //     });

  //     const images = await Promise.all(imagePromises);
  //     setValidImages(images);
  //   };

  //   getValidImages();
  // }, [albumData, storeInit, imageNotFound]);

  const handleNavigate = (data) => {
    const url = `/p/${encodeURIComponent(data?.AlbumName)}/?A=${btoa(`AlbumName=${data?.AlbumName}`)}`;
    const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;
    sessionStorage.setItem('redirectURL', url)
    navigation(islogin || data?.AlbumSecurityId === 0 ? url : redirectUrl);
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  const GenerateWidthBaseOnContent = useCallback(() => {
    const length = albumData && validImages?.length;
    let w;
    if (length === 1) {
      w = '100%';
    } else if (length === 2) {
      w = '100%';
    } else if (length === 3) {
      w = '100%';
    } else if (length > 3) {
      w = '100%';
    }
    return { width: w, length: length }
  }, [albumData])

  useEffect(() => {

    if (swiperSlideRef.current) {
      setSlideHeight(swiperSlideRef.current.offsetHeight);
    }
  }, [albumData]);

  if (albumData?.length === 0) {
    return;
  }
  return (
    <div className={`roop_jewlSet_Main rls-inducing-div ${isVisible ? 'show' : ''}`} role="region" aria-labelledby="album-gallery" >
      {/* <p className="roop_jewl_title">Discover our carefully curated Jewellery Album</p> */}
      <p className="roop_jewl_title" id="album-gallery">Album</p>

      <div className="roop_jewls_main_sub"
        style={{
          width: GenerateWidthBaseOnContent()?.width,
        }}
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          navigation={albumData?.length > 2}
          style={{
            width: "100%"
          }}
          // loop={true}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
            500: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
          className='roop_album_main_swiper'
        >

          {validImages?.map((item, index) => (
            <SwiperSlide key={index} role="listitem">
              <div className="roop_jewls__image_div">
                <img
                  className="roop_jewelImg"
                  loading="lazy"
                  src={item?.src}
                  alt={item?.name ?? 'Jewellery Item'}  // Ensure alt text is descriptive
                  onClick={() => handleNavigate(item)}
                  aria-label={`Navigate to details of ${item?.name}`}  // Accessibility for clicking
                />
                <p className="roop_jewls_Div_name">{item?.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div >
  )
}

export default JewellerySet;





{/* <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/1.jpg`} /> */ }
{/* <p className='roop_jewls_Div_name'>Gold Ring</p> */ }
{/* <div className='roop_jewls__image_div1'>
                    <p className='roop_jewls_Div_name'>Gold Bar</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/2.jpg`} />
                </div>
                <div className='roop_jewls__image_div'>
                    <p className='roop_jewls_Div_name'>Gold Necklace</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/3.jpg`} />
                </div>
                <div className='roop_jewls__image_div1'>
                    <p className='roop_jewls_Div_name'>Diamond Necklace</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/4.jpg`} />
                </div> */}

{/* <div className='roop_jewels_bannerImg_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/5.png`} />
                    <p className='roop_jewls_Div_name'>Silver Coin & Bars</p>
                </div> */}

{/* <div className='roop_jewls__image_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/3.jpg`} />
                    <p className='roop_jewls_Div_name'>Gold Necklace</p>
                </div> */}
{/* <div className='roop_jewls__image_div1'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/4.jpg`} />
                    <p className='roop_jewls_Div_name'>Diamond Necklace</p>
                </div> */}
{/* <div className='roop_jewls__image_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/1.jpg`} />
                    <p className='roop_jewls_Div_name'>Gold Ring</p>
                </div> */}
{/* <div className='roop_jewls__image_div' style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                        className='roop_jewelImg'
                        loading="lazy"
                        src={`${storImagePath()}/images/HomePage/DesignSet/1.jpg`}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                    <p
                        className='roop_jewls_Div_name'
                        style={{
                            position: 'absolute',
                            // bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            padding: '8px 15px',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent background
                            color: 'white',
                            fontSize: '23px',
                            // fontWeight: 'bold',
                            borderRadius: '5px',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // text shadow for better readability
                            margin: 0
                        }}
                    >
                        Gold Ring
                    </p>
                </div> */}

{/* <div className='roop_jewls__image_div1'>
                    <p className='roop_jewls_Div_name'>Gold Bar</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/2.jpg`} />
                </div> */}
