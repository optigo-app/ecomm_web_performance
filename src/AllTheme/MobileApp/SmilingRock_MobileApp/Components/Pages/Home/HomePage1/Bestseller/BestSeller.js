import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { smrMA_homeLoading, smrMA_loginState } from '../../../../Recoil/atom';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Pako from 'pako';
import Cookies from 'js-cookie';
import { formatRedirectTitleLine } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';
import SliderComponent from '../SliderComponent/SliderComponent';

const BestSeller = () => {
    const bestSallerRef = useRef(null);
    const [imageUrl, setImageUrl] = useState();
    const [bestSellerData, setBestSellerData] = useState('')
    const [storeInit, setStoreInit] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const islogin = useRecoilValue(smrMA_loginState);
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const setLoadingHome = useSetRecoilState(smrMA_homeLoading);

    const callAllApi = () => {
        setIsLoading(true);
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { IsB2BWebsite } = storeInit;
        // console.log("IsB2BWebsite", IsB2BWebsite);
        // console.log("loginUserDetail", loginUserDetail)
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }
        // console.log("finalID", finalID);
        // console.log("loginUserDetail", loginUserDetail);
        // console.log("visiterID", visiterID);


        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        // setImageUrl(data?.CDNDesignImageFol);
        setImageUrl(data?.CDNDesignImageFolThumb);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller", finalID).then((response) => {
            setLoadingHome(false);
            if (response?.Data?.rd) {
                setBestSellerData(response?.Data?.rd);
            }
        }).catch((err) => { return err }).finally(() => setIsLoading(false));

    }

    useEffect(() => {
        callAllApi();
    }, [])

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = Pako.deflate(uint8Array, { to: 'string' });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            // console.error('Error compressing and encoding:', error);
            return null;
        }
    };

    const handleNavigation = (designNo, autoCode, titleLine) => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        // const link = `/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}` ;
        const link = `/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`;
        if (storeinit?.IsB2BWebsite == 1) {
            if (islogin) {
                navigation(link)
            } else {
                localStorage.setItem('redirectLookBook', link);
                navigation('/signin')
            }
        } else {
            //   navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
            navigation(`/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`)
        }
    }

    const handleNavigate = () => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        const link = `/p/BestSeller/?B=${btoa('BestSeller')}`;
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

    const [validatedData, setValidatedData] = useState([]);

    const validateImageURLs = async () => {
        if (!bestSellerData?.length) return;
        const validatedData = await Promise.all(
            bestSellerData.map(async (item) => {
                const imageURL = `${imageUrl}${item?.designno}~1.jpg`;
                return { ...item, src: imageURL };
            })
        );
        setValidatedData(validatedData);
    };

    useEffect(() => {
        validateImageURLs();
    }, [bestSellerData]);

    if(bestSellerData?.length === 0){
        return;
    }

    return (
        <SliderComponent
            title={"Hot Sellers"}
            description={""}
            products={validatedData}
            loginInfo={loginInfo}
            storeInit={storeInit}
            handleNavigation={handleNavigation}
            handleNavigate={handleNavigate}
        />
    )
}

export default BestSeller
