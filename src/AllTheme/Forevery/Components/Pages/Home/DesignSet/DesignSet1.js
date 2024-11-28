import React, { useEffect, useState } from 'react';
import './DesignSet1.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Pako from 'pako';
import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import { for_loginState } from '../../../Recoil/atom';
import { Link } from '@mui/material';

const DesignSet = () => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState();
    const [designSetList, setDesignSetList] = useState([]);
    const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    const [storeInit, setStoreInit] = useState({});
    const islogin = useRecoilValue(for_loginState);
    const [swiper, setSwiper] = useState(null);

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

        let storeinit = JSON.parse(sessionStorage.getItem('storeInit'));
        setStoreInit(storeinit);

        let data = JSON.parse(sessionStorage.getItem('storeInit'));
        setImageUrl(data?.DesignSetImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album('GETDesignSet', finalID)
            .then((response) => {
                if (response?.Data?.rd) {
                    setDesignSetList(response?.Data?.rd);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const ProdCardImageFunc = (pd) => {
        let finalprodListimg;
        if (pd?.DefaultImageName) {
            finalprodListimg = imageUrl + pd?.designsetuniqueno + '/' + pd?.DefaultImageName;
        } else {
            finalprodListimg = imageNotFound;
        }
        return finalprodListimg;
    };

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
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId ?? storeInit?.MetalId,
            d: loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid,
            f: {},
        };
        let encodeObj = compressAndEncode(JSON.stringify(obj));
        navigate(`/d/${titleLine?.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? '_' : ''}${designNo}?p=${encodeObj}`);
    };

    const decodeEntities = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const onSwiperInit = (swiper) => {
        console.log('Swiper initialized:', swiper);
        setSwiper(swiper);
    };


    const [showAll, setShowAll] = useState(false);

    const handleViewAll = () => {
        setShowAll(true);
    };

    // Determine the items to show
    const itemsToShow = showAll ? designSetList.slice(1) : designSetList.slice(1, 4);
    console.log('jkksdjkjfkdsj', itemsToShow);

    console.log('designSetListdesignSetList', designSetList);

    const handleNavigate = () => {
        navigate("/Lookbook");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }


    return (
        <>
            <div className='for_DesignSetTitleDiv'>
                <p className='for_desognSetTitle'>Complete Your Look
                    <Link href="/Lookbook" className='for_designSetViewmoreBtn' onClick={handleNavigate}>
                        View more
                    </Link>
                </p>
            </div>
            <div className="collection-container">
                {itemsToShow?.map((slide, index) => (
                    <div className="collection-card" key={index}>
                        <img
                            className="image"
                            loading="lazy"
                            src={ProdCardImageFunc(slide)}
                            alt={`Slide ${index}`}
                            onClick={() => handleNavigation(slide?.designno, slide?.autocode, slide?.TitleLine ? slide?.TitleLine : '')}
                        />
                        <div className="collection-info">
                            <h3>{slide?.designsetno}</h3>
                            {/* <button onClick={handleNavigate}>View More</button> */}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DesignSet;