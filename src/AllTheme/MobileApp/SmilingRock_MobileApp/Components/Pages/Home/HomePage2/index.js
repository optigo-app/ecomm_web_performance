import React, { useEffect, useState, lazy, Suspense, useMemo, useRef } from "react";
import "./Home.modul.scss";
import { smrMA_CartCount, smrMA_homeLoading, smrMA_loginState, smrMA_WishCount } from "../../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { WebLoginWithMobileToken } from "../../../../../../../utils/API/Auth/WebLoginWithMobileToken";
import { GetCountAPI } from "../../../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from 'js-cookie';
import { CurrencyComboAPI } from "../../../../../../../utils/API/Combo/CurrencyComboAPI";
import { MetalColorCombo } from "../../../../../../../utils/API/Combo/MetalColorCombo";
import { MetalTypeComboAPI } from "../../../../../../../utils/API/Combo/MetalTypeComboAPI";
import useHomeBannerImages from './../../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner';

const TopSection = React.memo(lazy(() => import('./Topsection/Topsection')));
const Banner1 = React.memo(lazy(() => import('./BannerComponents/Banner1')));
const VideoBanner1 = React.memo(lazy(() => import('./BannerComponents/VideoBanner1')));
const Banner2 = React.memo(lazy(() => import('./BannerComponents/Banner2')));
const BestSeller = React.memo(lazy(() => import('./Bestseller/BestSeller')));
const Trending = React.memo(lazy(() => import('./Trending/Trending')));

const Home2 = () => {
    const [localData, setLocalData] = useState();
    const [islogin, setislogin] = useRecoilState(smrMA_loginState);
    const navigation = useNavigate();
    const location = useLocation();
    const search = location?.search;
    const updatedSearch = search.replace("?LoginRedirect=", "");
    const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
    const isLoadingHome = useRecoilValue(smrMA_homeLoading);
    const [cartCountNum, setCartCountNum] = useRecoilState(smrMA_CartCount)
    const [wishCountNum, setWishCountNum] = useRecoilState(smrMA_WishCount);
    const banner = useHomeBannerImages();


    useEffect(() => {
        const UserToken = localStorage.getItem('userLoginTokenApp');
        if (UserToken) {
            WebLoginWithMobileToken(UserToken)
                .then((response) => {
                    if (response.Data.rd[0].stat === 1) {
                        const visiterID = Cookies.get('visiterId');
                        setislogin(true);
                        sessionStorage.setItem("LoginUser", true);
                        sessionStorage.setItem(
                            "loginUserDetail",
                            JSON.stringify(response.Data.rd[0])
                        );

                        GetCountAPI(visiterID).then((res) => {
                            if (res) {
                                setCartCountNum(res?.cartcount)
                                setWishCountNum(res?.wishcount)
                            }
                        }).catch((err) => {
                            if (err) {
                                return err;
                            }
                        })

                        CurrencyComboAPI(response?.Data?.rd[0]?.id).then((response) => {
                            if (response?.Data?.rd) {
                                let data = JSON.stringify(response?.Data?.rd)
                                sessionStorage.setItem('CurrencyCombo', data)
                            }
                        }).catch((err) => { return err })


                        MetalColorCombo(response?.Data?.rd[0]?.id).then((response) => {
                            if (response?.Data?.rd) {
                                let data = JSON.stringify(response?.Data?.rd)
                                sessionStorage.setItem('MetalColorCombo', data)
                            }
                        }).catch((err) => { return err })


                        MetalTypeComboAPI(response?.Data?.rd[0]?.id).then((response) => {
                            if (response?.Data?.rd) {
                                let data = JSON.stringify(response?.Data?.rd)
                                sessionStorage.setItem('metalTypeCombo', data)
                            }
                        }).catch((err) => { return err })


                        navigation("/");
                        if (redirectEmailUrl) {
                            navigation(redirectEmailUrl);
                        } else {
                            navigation("/");
                        }
                    }
                })
                .catch((err) => { return err });
        }

        const queryParams = new URLSearchParams(window.location.search);
        const ismobile = queryParams.get("ismobile");
        const authtoken = queryParams.get("Authorization");
        const token = queryParams.get("token");
        if (
            ismobile === "1" &&
            islogin === false &&
            token !== undefined &&
            token !== null &&
            token !== ""
        ) {
            sessionStorage.setItem("AuthToken", JSON.stringify(authtoken));
            // console.log("ismobile")
            // console.log("islogin")
            handleSubmit();
        }
    }, []);

    useEffect(() => {
        const savedPosition = sessionStorage.getItem("scrollPosition");
        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition, 10));
        }
        return () => {
            sessionStorage.setItem("scrollPosition", window.scrollY);
        };
    }, []);

    const handleSubmit = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        WebLoginWithMobileToken(token)
            .then((response) => {
                if (response.Data.rd[0].stat === 1) {
                    const visiterID = Cookies.get('visiterId');
                    setislogin(true);
                    sessionStorage.setItem("LoginUser", true);
                    sessionStorage.setItem(
                        "loginUserDetail",
                        JSON.stringify(response.Data.rd[0])
                    );
                    let redirectLookBook = localStorage?.getItem("redirectLookBook");
                    setTimeout(() => {
                        if (redirectLookBook) {
                            navigation(redirectLookBook);
                        } else {
                            navigation("/");
                        }
                    }, 0);


                    GetCountAPI(visiterID).then((res) => {
                        if (res) {
                            setCartCountNum(res?.cartcount)
                            setWishCountNum(res?.wishcount)
                        }
                    }).catch((err) => {
                        if (err) {
                            { return err }
                        }
                    })

                    CurrencyComboAPI(response?.Data?.rd[0]?.id).then((response) => {
                        if (response?.Data?.rd) {
                            let data = JSON.stringify(response?.Data?.rd)
                            sessionStorage.setItem('CurrencyCombo', data)
                        }
                    }).catch((err) => { return err })


                    MetalColorCombo(response?.Data?.rd[0]?.id).then((response) => {
                        if (response?.Data?.rd) {
                            let data = JSON.stringify(response?.Data?.rd)
                            sessionStorage.setItem('MetalColorCombo', data)
                        }
                    }).catch((err) => { return err })


                    MetalTypeComboAPI(response?.Data?.rd[0]?.id).then((response) => {
                        if (response?.Data?.rd) {
                            let data = JSON.stringify(response?.Data?.rd)
                            sessionStorage.setItem('metalTypeCombo', data)
                        }
                    }).catch((err) => { return err })


                    navigation("/");
                    if (redirectEmailUrl) {
                        navigation(redirectEmailUrl);
                    } else {
                        navigation("/");
                    }
                }
            })
            .catch((err) => { return err });
    };

    const memoizedLocalData = useMemo(() => {
        const data = JSON.parse(sessionStorage.getItem("storeInit"));
        return data;
    }, []);

    useEffect(() => {
        setLocalData(memoizedLocalData);
    }, [memoizedLocalData]);

    return (
        <div className="smrMA_Home_main">
            <Suspense fallback={<div></div>}>
                <TopSection data={banner?.mainBanner} />
                <Banner1 data={banner?.middleBanner} />
                <VideoBanner1 data={banner?.mainBanner} />
                <Banner2 data={banner?.middleBanner} />
                {localData?.IsHomeBestSeller === 1 && <BestSeller data={banner?.bestsellerBanner} />}
                {localData?.IsHomeTrending === 1 && <Trending data={banner?.trendingBanner} />}
            </Suspense>
        </div>
    );
};
export default Home2;
