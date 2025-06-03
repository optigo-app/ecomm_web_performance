import React, { useEffect, useState, lazy, Suspense, useMemo } from "react";
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
const NewArrival1 = React.memo(lazy(() => import('./NewArrival/NewArrival1')));
const BestSeller = React.memo(lazy(() => import('./Bestseller/BestSeller')));
const Album = React.memo(lazy(() => import('./Album/Album')));
const Trending = React.memo(lazy(() => import('./Trending/Trending')));
const DesignSet = React.memo(lazy(() => import('./DesignSet/DesignSet')));
const LoginComponent = React.memo(lazy(() => import('./LoginComponent')));

const Home1 = () => {
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
                            navigation("/home1");
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
                            navigation("/home1");
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
                        navigation("/home1");
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
                {!islogin && <LoginComponent />}
                <TopSection data={banner?.mainBanner} />
                {localData?.IsHomeNewArrival === 1 && <NewArrival1 />}
                {localData?.IsHomeBestSeller === 1 && <BestSeller data={banner?.bestsellerBanner} />}
                {localData?.IsHomeAlbum === 1 && <Album />}
                {localData?.IsHomeTrending === 1 && <Trending data={banner?.trendingBanner} />}
                {localData?.IsHomeDesignSet === 1 && <DesignSet />}
            </Suspense>
        </div>
    );
};
export default Home1;
