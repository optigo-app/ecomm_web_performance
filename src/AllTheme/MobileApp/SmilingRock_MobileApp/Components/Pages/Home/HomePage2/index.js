import React, {
    useEffect,
    useState,
    lazy,
    Suspense,
    useMemo,
    useRef
} from "react";
import "./Home.modul.scss";
import {
    smrMA_CartCount,
    smrMA_homeLoading,
    smrMA_loginState,
    smrMA_logoColor,
    smrMA_WishCount
} from "../../../Recoil/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import useHomeBannerImages from "../../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import { GetCountAPI } from "../../../../../../../utils/API/GetCount/GetCountAPI";
import { CurrencyComboAPI } from "../../../../../../../utils/API/Combo/CurrencyComboAPI";
import { MetalColorCombo } from "../../../../../../../utils/API/Combo/MetalColorCombo";
import { MetalTypeComboAPI } from "../../../../../../../utils/API/Combo/MetalTypeComboAPI";
import { WebLoginWithMobileToken } from "../../../../../../../utils/API/Auth/WebLoginWithMobileToken";

const TopSection = lazy(() => import("./Topsection/Topsection"));
const Banner1 = lazy(() => import("./BannerComponents/Banner1"));
const VideoBanner1 = lazy(() => import("./BannerComponents/VideoBanner1"));
const Banner2 = lazy(() => import("./BannerComponents/Banner2"));
const BestSeller = lazy(() => import("./Bestseller/BestSeller"));
const Trending = lazy(() => import("./Trending/Trending"));

const Home2 = () => {
    const [localData, setLocalData] = useState();
    const [isLogin, setIsLogin] = useRecoilState(smrMA_loginState);
    const [cartCountNum, setCartCountNum] = useRecoilState(smrMA_CartCount);
    const [wishCountNum, setWishCountNum] = useRecoilState(smrMA_WishCount);
    const isLoadingHome = useRecoilValue(smrMA_homeLoading);

    const banner = useHomeBannerImages();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectEmailUrl = decodeURIComponent(
        location?.search.replace("?LoginRedirect=", "")
    );

    const logoRef = useRef(null);

    const handleLogin = async (token) => {
        try {
            const response = await WebLoginWithMobileToken(token);
            const user = response?.Data?.rd?.[0];

            if (user?.stat === 1) {
                const visiterID = Cookies.get("visiterId");
                setIsLogin(true);
                sessionStorage.setItem("LoginUser", true);
                sessionStorage.setItem("loginUserDetail", JSON.stringify(user));

                const [countRes, currencyRes, metalColorRes, metalTypeRes] = await Promise.all([
                    GetCountAPI(visiterID),
                    CurrencyComboAPI(user.id),
                    MetalColorCombo(user.id),
                    MetalTypeComboAPI(user.id)
                ]);

                if (countRes) {
                    setCartCountNum(countRes.cartcount);
                    setWishCountNum(countRes.wishcount);
                }

                if (currencyRes?.Data?.rd) {
                    sessionStorage.setItem("CurrencyCombo", JSON.stringify(currencyRes.Data.rd));
                }

                if (metalColorRes?.Data?.rd) {
                    sessionStorage.setItem("MetalColorCombo", JSON.stringify(metalColorRes.Data.rd));
                }

                if (metalTypeRes?.Data?.rd) {
                    sessionStorage.setItem("metalTypeCombo", JSON.stringify(metalTypeRes.Data.rd));
                }

                const redirectLookBook = localStorage.getItem("redirectLookBook");
                navigate(redirectLookBook || redirectEmailUrl || "/");
            }
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("userLoginTokenApp");
        if (token) {
            handleLogin(token);
        } else {
            const queryParams = new URLSearchParams(window.location.search);
            const isMobile = queryParams.get("ismobile") === "1";
            const authToken = queryParams.get("Authorization");
            const urlToken = queryParams.get("token");

            if (isMobile && !isLogin && urlToken) {
                sessionStorage.setItem("AuthToken", JSON.stringify(authToken));
                handleLogin(urlToken);
            }
        }
    }, []);

    useEffect(() => {
        const savedPosition = sessionStorage.getItem("scrollPosition");
        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition, 10));
        }
        return () => sessionStorage.setItem("scrollPosition", window.scrollY);
    }, []);

    const memoizedLocalData = useMemo(() => {
        return JSON.parse(sessionStorage.getItem("storeInit"));
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
