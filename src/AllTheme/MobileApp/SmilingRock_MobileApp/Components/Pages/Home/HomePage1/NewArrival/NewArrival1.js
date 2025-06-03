import React, { useEffect, useRef, useState } from 'react'
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { smrMA_homeLoading, smrMA_loginState } from '../../../../Recoil/atom';
import Pako from 'pako';
import Cookies from "js-cookie";
import { formatRedirectTitleLine } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';
import SliderComponent from '../SliderComponent/SliderComponent';

const NewArrival1 = () => {


    const newArrivalRef = useRef(null);
    const [newArrivalData, setNewArrivalData] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [storeInit, setStoreInit] = useState({});
    const islogin = useRecoilValue(smrMA_loginState);
    const [isLoading, setIsLoading] = useState(false);
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const setLoadingHome = useSetRecoilState(smrMA_homeLoading);
    const [isAPICalled, setIsAPICalled] = useState(false);

    const callAPI = () => {
        setIsLoading(true);
        const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get("visiterId");
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
        } else {
            finalID = loginUserDetail?.id || "0";
        }
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit);

        let data = JSON.parse(sessionStorage.getItem("storeInit"));
        setImageUrl(data?.CDNDesignImageFol);
        // setImageUrl(data?.DesignImageFol);

        setLoadingHome(false);
        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID)
            .then(async (response) => {
                if (response?.Data?.rd) {
                    const itemsWithImageCheck = await Promise.all(
                        response.Data.rd.map(async (item) => {
                            // const imgURL = `${storeinit?.CDNDesignImageFol}${item.designno}~1.${item.ImageExtension}`;
                            const imgURL = `${storeinit?.CDNDesignImageFolThumb}${item.designno}~1.jpg`;
                            // const imageAvailable = await checkImageAvailability(imgURL);
                            return { ...item, src: imgURL };
                        })
                    );
                    setNewArrivalData(itemsWithImageCheck);
                }
            })
            .catch((err) => console.log(err))
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
            const compressed = Pako.deflate(uint8Array, { to: "string" });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error("Error compressing and encoding:", error);
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
            f: {},
        };
        let encodeObj = compressAndEncode(JSON.stringify(obj));
        // const link =  `/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""
        //       }${designNo}?p=${encodeObj}`;
        const link = `/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`;
        if (storeinit?.IsB2BWebsite == 1) {
            if (islogin) {
                navigation(link);
            } else {
                localStorage.setItem('redirectLookBook', link);
                navigation("/signin");
            }
        } else {
            navigation(link);
        }
    };

    const handleNavigate = () => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        const link = `/p/NewArrival/?B=${btoa('NewArrival')}`;
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

    if (newArrivalData?.length === 0) {
        return;
    }


    return (
        <SliderComponent
            title={"New In"}
            description={"Handpicked daily from the world's best brands and boutiques"}
            products={newArrivalData}
            loginInfo={loginInfo}
            storeInit={storeInit}
            handleNavigation={handleNavigation}
            handleNavigate={handleNavigate}
        />
    )
}

export default NewArrival1
