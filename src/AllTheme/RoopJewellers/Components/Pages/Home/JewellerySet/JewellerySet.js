import React, { useEffect, useState } from 'react'
import './JewellerySet.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'
import { roop_loginState } from '../../../Recoil/atom';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { useRecoilValue } from 'recoil';
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

    Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum_List", finalID)
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

  const checkImageAvailability = (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  };

  const findValidImage = async (designDetails) => {
    const imageChecks = designDetails.map((design) => {
      const imageUrl = `${storeInit?.CDNDesignImageFolCDNDesignImageFol}${design?.designno}~1.${design?.ImageExtension}`;
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
        if (album?.Designdetail) {
          const designDetails = JSON?.parse(album?.Designdetail) || [];
          const validImage = await findValidImage(designDetails);
          return { ...album, src: validImage, name: album?.AlbumName };
        }
        return { ...album, src: imageNotFound, name: album?.AlbumName };
      });

      const images = await Promise.all(imagePromises);
      setValidImages(images);
    };

    getValidImages();
  }, [albumData, storeInit, imageNotFound]);

  const handleNavigate = (data) => {
    const url = `/p/${encodeURIComponent(data?.AlbumName)}/?A=${btoa(`AlbumName=${data?.AlbumName}`)}`;
    const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;
    sessionStorage.setItem('redirectURL', url)
    navigation(islogin || data?.AlbumSecurityId === 0 ? url : redirectUrl);
  };

  return (
    <div className='roop_jewlSet_Main'>

      <p className='roop_jewl_title'>Discover our carefully curated Jewellery Album</p>
      {/* <p className='roop_jewl_title'>Discover our carefully curated Jewellery Sets</p> */}
      <div className='roop_jewls_main_sub'>
        {validImages?.slice(0, 4)?.map((item, index) => (
          <div className='roop_jewls__image_div' key={index}>
            <img className='roop_jewelImg' loading="lazy" src={item?.src} alt={item?.name} onClick={() => handleNavigate(item)} />
            <p className='roop_jewls_Div_name'>{item?.name}</p>
          </div>
        ))}


        {/* <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/1.jpg`} /> */}
        {/* <p className='roop_jewls_Div_name'>Gold Ring</p> */}
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
      </div>
    </div>
  )
}

export default JewellerySet