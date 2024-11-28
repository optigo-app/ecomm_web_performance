import React, { useEffect, useState } from "react";
import TopSection from "./TopSection/TopSection";
import PromotionBaner1 from "./PromotionBanner1/PromotionBaner1";
import TrendingView from "./TrandingView/TrendingView";
import Album from "./Album/Album";
import NewArrival from "./NewArrival/NewArrival";
import BestSellerSection from "./BestSellerSection/BestSellerSection";
import DesignSet from "./DesignSet/DesignSet";
import BottomBanner from "./BottomBanner/BottomBanner";
import "./Home.modul.scss";
import { smrMA_CartCount, smrMA_homeLoading, smrMA_loginState, smrMA_WishCount } from "../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { WebLoginWithMobileToken } from "../../../../../../utils/API/Auth/WebLoginWithMobileToken";
import { Helmet } from "react-helmet";
import SustainAbility from "./sustainAbility/SustainAbility";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from 'js-cookie';
import { CurrencyComboAPI } from "../../../../../../utils/API/Combo/CurrencyComboAPI";
import { MetalColorCombo } from "../../../../../../utils/API/Combo/MetalColorCombo";
import { MetalTypeComboAPI } from "../../../../../../utils/API/Combo/MetalTypeComboAPI";

const Home = () => {
  const [localData, setLocalData] = useState();
  const [islogin, setislogin] = useRecoilState(smrMA_loginState);
  const navigation = useNavigate();
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const isLoadingHome = useRecoilValue(smrMA_homeLoading);
  const [cartCountNum, setCartCountNum] = useRecoilState(smrMA_CartCount)
  const [wishCountNum, setWishCountNum] = useRecoilState(smrMA_WishCount)

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
                console.log("getCountApiErr", err);
              }
            })

            CurrencyComboAPI(response?.Data?.rd[0]?.id).then((response) => {
              if (response?.Data?.rd) {
                let data = JSON.stringify(response?.Data?.rd)
                sessionStorage.setItem('CurrencyCombo', data)
              }
            }).catch((err) => console.log(err))


            MetalColorCombo(response?.Data?.rd[0]?.id).then((response) => {
              if (response?.Data?.rd) {
                let data = JSON.stringify(response?.Data?.rd)
                sessionStorage.setItem('MetalColorCombo', data)
              }
            }).catch((err) => console.log(err))


            MetalTypeComboAPI(response?.Data?.rd[0]?.id).then((response) => {
              if (response?.Data?.rd) {
                let data = JSON.stringify(response?.Data?.rd)
                sessionStorage.setItem('metalTypeCombo', data)
              }
            }).catch((err) => console.log(err))


            navigation("/");
            if (redirectEmailUrl) {
              navigation(redirectEmailUrl);
            } else {
              navigation("/");
            }
          }
        })
        .catch((err) => console.log(err));
    }

    const queryParams = new URLSearchParams(window.location.search);
    const ismobile = queryParams.get("ismobile");
    const token = queryParams.get("token");
    if (
      ismobile === "1" &&
      islogin === false &&
      token !== undefined &&
      token !== null &&
      token !== ""
    ) {
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

          GetCountAPI(visiterID).then((res) => {
            if (res) {
              setCartCountNum(res?.cartcount)
              setWishCountNum(res?.wishcount)
            }
          }).catch((err) => {
            if (err) {
              console.log("getCountApiErr", err);
            }
          })

          CurrencyComboAPI(response?.Data?.rd[0]?.id).then((response) => {
            if (response?.Data?.rd) {
              let data = JSON.stringify(response?.Data?.rd)
              sessionStorage.setItem('CurrencyCombo', data)
            }
          }).catch((err) => console.log(err))


          MetalColorCombo(response?.Data?.rd[0]?.id).then((response) => {
            if (response?.Data?.rd) {
              let data = JSON.stringify(response?.Data?.rd)
              sessionStorage.setItem('MetalColorCombo', data)
            }
          }).catch((err) => console.log(err))


          MetalTypeComboAPI(response?.Data?.rd[0]?.id).then((response) => {
            if (response?.Data?.rd) {
              let data = JSON.stringify(response?.Data?.rd)
              sessionStorage.setItem('metalTypeCombo', data)
            }
          }).catch((err) => console.log(err))


          navigation("/");
          if (redirectEmailUrl) {
            navigation(redirectEmailUrl);
          } else {
            navigation("/");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let localData = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localData);
  }, []);

  return (
    <div className="smrMA_Home_main">
      <TopSection />
      {localData?.IsHomeBestSeller === 1 && <BestSellerSection />}
      {localData?.IsHomeAlbum === 1 && <Album />}
      <PromotionBaner1 />
      {localData?.IsHomeNewArrival === 1 && <NewArrival />}
      {localData?.IsHomeTrending === 1 && <TrendingView />}
      {localData?.IsHomeDesignSet === 1 && <DesignSet />}
      {isLoadingHome == true ?
        <div className="smrMA_Home_loader">
          <div className="smrMA_Home_loader_container"></div>
        </div>
        :
        <>
          <SustainAbility />
        </>
      }
    </div>
  );
};

export default Home;
