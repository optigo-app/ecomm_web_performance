import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { smrMA_homeLoading, smrMA_loginState } from '../../../../Recoil/atom';
import { formatRedirectTitleLine } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';
import Pako from 'pako';
import Cookies from 'js-cookie';
import SliderComponent from '../SliderComponent/SliderComponent';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

const Trending = () => {

    const trendingRef = useRef(null);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [trandingViewData, setTrandingViewData] = useState([]);
    const navigation = useNavigate();
    const [storeInit, setStoreInit] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const islogin = useRecoilValue(smrMA_loginState);
    const [imageUrls, setImageUrls] = useState([]);
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const setLoadingHome = useSetRecoilState(smrMA_homeLoading);

    const callAPI = () => {
        setIsLoading(true)
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)
        let storeInitData = JSON.parse(sessionStorage.getItem('storeInit'))
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

        setLoadingHome(false);
        Get_Tren_BestS_NewAr_DesigSet_Album("GETTrending", finalID).then(async (response) => {
            if (response?.Data?.rd) {
                const data = response.Data.rd;
                const urls = await Promise.all(data?.map(async (item) => {
                    // const url = `${storeInitData?.CDNDesignImageFol}${item.designno}~1.${item.ImageExtension}`;
                    const url = `${storeInitData?.CDNDesignImageFolThumb}${item.designno}~1.jpg`;
                    // const available = await checkImageAvailability(url);
                    return { ...item, src: url }
                }));
                // setTrandingViewData(data);
                setTrandingViewData(urls);
                // setImageUrls(urls);
            }
        }).catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        callAPI();
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
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit')) ?? "";
        const { IsB2BWebsite } = storeInit;

        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        //   const link = `/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`;
        const link = `/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`;
        if (IsB2BWebsite == 1) {
            if (islogin) {
                navigation(link)
            } else {
                localStorage.setItem('redirectLookBook', link);
                navigation('/signin')
            }
        } else {
            navigation(link)
        }
    }

    const handleNavigate = () => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        const link = `/p/Trending/?T=${btoa('Trending')}`;
        if (storeinit?.IsB2BWebsite == 1) {
            if (islogin) {
                navigation(link)
            } else {
                localStorage.setItem('redirectLookBook', link);
                navigation('/signin')
            }
        } else {
            navigation(link)
        }
    }

    if (trandingViewData?.length === 0) {
        return;
    }

    return (
        <SliderComponent
            title={"Trending now"}
            description={"Discover new styles just for you"}
            products={trandingViewData}
            loginInfo={loginInfo}
            storeInit={storeInit}
            handleNavigation={handleNavigation}
            handleNavigate={handleNavigate}
        />
    )
}

export default Trending
