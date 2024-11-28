import React, { useEffect, useState } from 'react'
import './BestSellerSection.modul.scss'
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { useNavigate } from 'react-router-dom';
import Pako from 'pako';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { roop_loginState } from '../../../Recoil/atom';

const BestSellerSection = () => {

    const [imageUrl, setImageUrl] = useState();
    const [bestSellerData , setBestSellerData] = useState('')
    const[storeInit,setStoreInit]=useState({});

    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const islogin = useRecoilValue(roop_loginState);
    const [hoveredItem, setHoveredItem] = useState(null);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // prevArrow: false, 
        // nextArrow: false,
    };

    useEffect(() => {

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

        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        setImageUrl(data?.DesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller" , finalID).then((response) => {
            if (response?.Data?.rd) {
                setBestSellerData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])

  

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = Pako.deflate(uint8Array, { to: 'string' });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error('Error compressing and encoding:', error);
            return null;
        }
    };

    const handleNavigation = (designNo, autoCode, titleLine) => {

      console.log('aaaaaaaaaaa',designNo, autoCode, titleLine);
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
    }

    

    const handleMouseEnterRing1 = (data) => {
      if (data?.ImageCount > 1) {
          setHoveredItem(data.SrNo); 
      }
  }
  const handleMouseLeaveRing1 = () => {
      setHoveredItem(null); 
  }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      }

      const chunkedData = [];
      for (let i = 0; i < bestSellerData?.length; i += 3) {
        chunkedData.push(bestSellerData?.slice(i, i + 3));
      }

  return (
    <div>
        {bestSellerData?.length != 0 &&
          <div className='proCat_bestSallerMain'>
             <div className='linkingLoveMain' >
               <div className='linkingLove'>
            <p className='linkingTitle'>Best Seller</p>

            <Slider {...settings} >
                                {chunkedData.map((chunk, index) => (
                                        <div className='linkRingLove'>
                                              {chunk?.map((data, dataIndex) => (
                                            <div className='roop_bestselerDiv'>
                                                <div className='linkLoveRing1' onClick={() => handleNavigation(data?.designno, data?.autocode, data?.TitleLine)}>
                                                    <img src={hoveredItem === data.SrNo  ?
                                                        `${imageUrl}${data.designno === undefined ? '' : data?.designno}_2.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
                                                        :
                                                        `${imageUrl}${data.designno === undefined ? '' : data?.designno}_1.${data?.ImageExtension === undefined ? '' : data.ImageExtension}`
                                                    } className='likingLoveImages'
                                                        onMouseEnter={() => handleMouseEnterRing1(data)} onMouseLeave={handleMouseLeaveRing1}
                                                    />
                                                </div>
                                                <div className='linkLoveRing1Desc'>
                                                    <p className='ring1Desc'>{data?.TitleLine}</p>
                                                    <p className='ring1Desc'>
                                                        {/* <span
                                                            className="roop_currencyFont"
                                                            dangerouslySetInnerHTML={{
                                                                __html: decodeEntities(
                                                                    storeInit?.Currencysymbol
                                                                ),
                                                            }}
                                                        />  */}
                                                        <span className="roop_currencyFont">
                                                           {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                        </span> &nbsp;
                                                        {formatter(data?.UnitCostWithMarkUp)}</p>
                                                </div>
                                            </div>
                                             ))}
                                        </div>
                                    ))
                                }
                            </Slider>
                    <p className='roop_BestSallerViewAll' onClick={() =>  navigation(`/p/BestSeller/?B=${btoa('BestSeller')}`)}>SHOP COLLECTION</p>
        </div>
        <div className='linkingLoveImage'>
            <img src={`${storImagePath()}/images/HomePage/BestSeller/promoSetMainBanner.jpg`} className='linkingLoveImageDesign' />
        </div>
    </div>
    </div>
}
    </div>

  )
}

export default BestSellerSection;





















// import React, { useEffect, useState } from 'react'
// import './BestSellerSection.modul.scss'
// import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from 'react-slick';
// import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

// const BestSellerSection = () => {

//     const [ring1ImageChange, setRing1ImageChange] = useState(false);
//     const [ring2ImageChange, setRing2ImageChange] = useState(false);
//     const [ring3ImageChange, setRing3ImageChange] = useState(false);
//     const [ring4ImageChange, setRing4ImageChange] = useState(false);

//     const [imageUrl, setImageUrl] = useState();
//     const [bestSellerData , setBestSellerData] = useState('')

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//         // prevArrow: false, 
//         // nextArrow: false,
//     };

//     useEffect(() => {
//         let data = JSON.parse(sessionStorage.getItem('storeInit'))
//         setImageUrl(data?.DesignImageFol);

//         Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller").then((response) => {
//             if (response?.Data?.rd) {
//                 setBestSellerData(response?.Data?.rd);
//             }
//         }).catch((err) => console.log(err))
//     }, [])

//     const handleMouseEnterRing1 = () => {
//         setRing1ImageChange(true)
//     }
//     const handleMouseLeaveRing1 = () => {
//         setRing1ImageChange(false)
//     }

//     const handleMouseEnterRing2 = () => {
//         setRing2ImageChange(true)
//     }
//     const handleMouseLeaveRing2 = () => {
//         setRing2ImageChange(false)
//     }

//     const handleMouseEnterRing3 = () => {
//         setRing3ImageChange(true)
//     }
//     const handleMouseLeaveRing3 = () => {
//         setRing3ImageChange(false)
//     }

//     const handleMouseEnterRing4 = () => {
//         setRing4ImageChange(true)
//     }
//     const handleMouseLeaveRing4 = () => {
//         setRing4ImageChange(false)
//     }

//   return (
//     <div>
//     <div className='linkingLoveMain' style={{marginTop: '120px'}}>
//         <div className='linkingLove'>
//             <p className='linkingTitle'>Best Seller</p>
//             {/* <p className='linkingDesc'>Ready to share link with your loved ones!</p> */}
//             <p className='linkingShopCol'>SHOP COLLECTION</p>
//             <Slider {...settings} >
//                         <div className='linkRingLove'>
//                             <div>
//                                 <div className='linkLoveRing1'>
//                                     <img src={!ring3ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[0]?.designno}_1.${bestSellerData && bestSellerData[0]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[2]?.designno}_1.${bestSellerData && bestSellerData[2]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='roop_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className='linkLoveRing2'>
//                                     <img src={!ring4ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[1]?.designno}_1.${bestSellerData && bestSellerData[0]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[3]?.designno}_1.${bestSellerData && bestSellerData[3]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='roop_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>

//                                 </div>
//                             </div>

//                         </div>

//                         <div className='linkRingLove'>
//                             <div>
//                                 <div className='linkLoveRing1'>
//                                     <img src={!ring3ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[3]?.designno}_1.${bestSellerData && bestSellerData[3]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[0]?.designno}_1.${bestSellerData && bestSellerData[0]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='roop_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>

//                                 </div>
//                             </div>
//                             <div>
//                                 <div className='linkLoveRing2'>
//                                     <img src={!ring4ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[4]?.designno}_1.${bestSellerData && bestSellerData[4]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[1]?.designno}_1.${bestSellerData && bestSellerData[1]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='roop_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>

//                                 </div>
//                             </div>

//                         </div>

//                         <div className='linkRingLove'>
//                             <div>
//                                 <div className='linkLoveRing1'>
//                                     <img src={!ring3ImageChange ? `${imageUrl}${bestSellerData && bestSellerData[9]?.designno}_1.${bestSellerData && bestSellerData[9]?.ImageExtension}` : `${imageUrl}${bestSellerData && bestSellerData[10]?.designno}_1.${bestSellerData && bestSellerData[10]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='roop_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>

//                                 </div>
//                             </div>
//                             <div>
//                                 <div className='linkLoveRing2'>
//                                     <img src={!ring4ImageChange ? `${imageUrl} + ${bestSellerData && bestSellerData[11]?.designno} + "_" + 1 + "." + ${bestSellerData && bestSellerData[11]?.ImageExtension}` : `${imageUrl} + ${bestSellerData && bestSellerData[12]?.designno} + "_" + 1 + "." + ${bestSellerData && bestSellerData[12]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                                 </div>
//                                 <div className='linkLoveRing1Desc'>
//                                     <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                                     <p className='roop_bestSellerPrice'>$ {bestSellerData[0]?.UnitCost}</p>
//                                 </div>
//                             </div>

//                         </div>
//                     </Slider>
                    
//         </div>
//         <div className='linkingLoveImage'>
//             <img src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetMainBanner.jpg`} className='linkingLoveImageDesign' />
//         </div>
//     </div>
    
// </div>
//   )
// }

// export default BestSellerSection;


// import React, { useState } from 'react'
// import './PromoSetSection.modul.scss'
// import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from 'react-slick';

// const PromoSetSection = () => {

//     const [ring1ImageChange, setRing1ImageChange] = useState(false);
//     const [ring2ImageChange, setRing2ImageChange] = useState(false);
//     const [ring3ImageChange, setRing3ImageChange] = useState(false);
//     const [ring4ImageChange, setRing4ImageChange] = useState(false);

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//         // prevArrow: false, 
//         // nextArrow: false,
//     };

    

//     const handleMouseEnterRing1 = () => {
//         setRing1ImageChange(true)
//     }
//     const handleMouseLeaveRing1 = () => {
//         setRing1ImageChange(false)
//     }

//     const handleMouseEnterRing2 = () => {
//         setRing2ImageChange(true)
//     }
//     const handleMouseLeaveRing2 = () => {
//         setRing2ImageChange(false)
//     }

//     const handleMouseEnterRing3 = () => {
//         setRing3ImageChange(true)
//     }
//     const handleMouseLeaveRing3 = () => {
//         setRing3ImageChange(false)
//     }

//     const handleMouseEnterRing4 = () => {
//         setRing4ImageChange(true)
//     }
//     const handleMouseLeaveRing4 = () => {
//         setRing4ImageChange(false)
//     }

//   return (
//     <div>
//     <div className='linkingLoveMain'>
//         <div className='linkingLove'>
//             <p className='linkingTitle'>LINKING LOVE</p>
//             <p className='linkingDesc'>Ready to share link with your loved ones!</p>
//             <p className='linkingShopCol'>SHOP COLLECTION</p>
//             <Slider {...settings} >
//                 <div className='linkRingLove'>
//                     <div className='linkRingLoveSubMain'>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring1ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div className='linkRingLoveSubMain'>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring2ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing2} onMouseLeave={handleMouseLeaveRing2} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='linkRingLove'>

//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring1ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring2ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing2} onMouseLeave={handleMouseLeaveRing2} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='linkRingLove'>
//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring1ImageChange ?  `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing1} onMouseLeave={handleMouseLeaveRing1} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring2ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`:`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing2} onMouseLeave={handleMouseLeaveRing2} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                 </div>
//             </Slider>
//         </div>
//         <div className='linkingLoveImage'>
//             <img src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetMainBanner.jpg`} className='linkingLoveImageDesign' />
//         </div>
//     </div>


//     {/* <div className='linkingLoveMain linkingLoveMain2'>
//         <div className='linkingLoveImage'>
//             <img src={`${storImagePath()}/images/HomePage/Promo/Set/2/promoSetMainBanner2.jpg`} className='linkingLoveImageDesign' />
//         </div>
//         <div className='linkingLove'>
//             <p className='linkingTitle'>FLORA</p>
//             <p className='linkingDesc'>High end affordable luxury with sophisticated designs for your every day.</p>
//             <p className='linkingShopCol'>SHOP COLLECTION</p>
//             <Slider {...settings} >
//                 <div className='linkRingLove'>
//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring3ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring4ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>

//                 </div>

//                 <div className='linkRingLove'>
//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring3ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring4ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>

//                 </div>

//                 <div className='linkRingLove'>
//                     <div>
//                         <div className='linkLoveRing1'>
//                             <img src={!ring3ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>
//                     <div>
//                         <div className='linkLoveRing2'>
//                             <img src={!ring4ImageChange ? `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2.png` : `${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
//                         </div>
//                         <div className='linkLoveRing1Desc'>
//                             <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
//                         </div>
//                     </div>

//                 </div>
//             </Slider>
//         </div>
//     </div> */}

// </div>
//   )
// }

// export default PromoSetSection;


