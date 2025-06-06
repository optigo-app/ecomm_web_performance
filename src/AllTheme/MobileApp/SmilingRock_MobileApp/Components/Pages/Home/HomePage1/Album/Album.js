import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import imageNotFound from '../../../../Assets/image-not-found.jpg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { smrMA_homeLoading, smrMA_loginState } from '../../../../Recoil/atom';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import SliderComponent from '../SliderComponent/SliderComponent';

const Album = () => {

    const albumRef = useRef(null);
    const [albumData, setAlbumData] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const islogin = useRecoilValue(smrMA_loginState);
    const [isLoading, setLoading] = useState(false);
    const setLoadingHome = useSetRecoilState(smrMA_homeLoading)
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));;
    const [storeInit, setStoreInit] = useState({});
    const [validImages, setValidImages] = useState([]);

    const apiCall = () => {
        setLoading(true);
        const loginUserDetail = JSON?.parse(sessionStorage?.getItem('loginUserDetail'));
        const storeInit = JSON?.parse(sessionStorage?.getItem('storeInit'));
        setStoreInit(storeInit);
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
                return err;
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        apiCall();
    }, [])

    useEffect(() => {
        const getValidImages = async () => {
            if (!albumData?.length) return;

            const imagePromises = albumData.map(async (album) => {
                if (album.AlbumImageName && album.AlbumImageFol) {
                    const imgSrc = `${storeInit?.AlbumImageFol}${album?.AlbumImageFol}/${album?.AlbumImageName}`
                    // console.log(imgSrc ,"img src")
                    // const validImage = await checkImageAvailability(imgSrc);
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

    const handleNavigate = (name) => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        const link = `/p/${name}/?A=${btoa(`AlbumName=${name}`)}`;
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

    return (
        <SliderComponent
            title={"Trending Album"}
            description={""}
            products={validImages}
            loginInfo={loginInfo}
            storeInit={storeInit}
            handleNavigate={handleNavigate}
        />
    )
}

export default Album
