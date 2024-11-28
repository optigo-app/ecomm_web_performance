import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { el_loginState, redirectModal } from '../../../Recoil/atom';
import RedirectModal from './RedirectModal';
import { LoginWithEmailAPI } from '../../../../../../utils/API/Auth/LoginWithEmailAPI';

const CountdownTimerFnc = () => {
    const isloginStatus = sessionStorage?.getItem('LoginUser');
    const location = useLocation();
    const [countDownStatus, setCountDownStatus] = useState(false);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
    const navigation = useNavigate();
    const setRedModal = useSetRecoilState(redirectModal);
    const setIsLoginState = useSetRecoilState(el_loginState);
    const [showTimer, setShowTimer] = useState(true);
    const storedData = JSON.parse(sessionStorage.getItem('loginUserDetail')) || {};
    const timerStatus = storedData?.IsTimeShow;
    const entryDate = storedData.adhoc_startdate1;
    const expiryDate = storedData.adhoc_enddate1;
    const updatedSearch = location?.search.replace("?LoginRedirect=", "");
    const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;

    // const entryDate = "2024-09-19T10:27:01.95";
    // const expiryDate = "2024-09-19T18:05:02.95";

    useEffect(() => {
        let timerID;

        if (timerStatus != 0 && isloginStatus === 'true') {
            timerID = setInterval(() => tick(entryDate, expiryDate), 1000);
            setCountDownStatus(true);
            setShowTimer(true)
        }

        return () => clearInterval(timerID);
    }, [entryDate, expiryDate, timerStatus, isloginStatus]);

    function calculateCountdown(startDate, endDate) {
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = new Date(endDate).getTime();
        const now = new Date().getTime();
        let timeDifference;

        if (now < startTimestamp) {
            timeDifference = startTimestamp - now;
        } else if (now > endTimestamp) {
            return { days: 0, hours: 0, minutes: 0 };
        } else {
            timeDifference = endTimestamp - now;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return {
            days,
            hours,
            minutes
        };
    }

    function tick(startDate, endDate) {
        const newCountdown = calculateCountdown(startDate, endDate);
        setCountdown(newCountdown);
        setRedModal(false);

        if (newCountdown.days === 0 && newCountdown.hours === 0 && newCountdown.minutes === 0) {
            // handleLogout();
            setRedModal(true)
            setShowTimer(false);
            handleLogin();
        }
    }

    // console.log("timer", countdown)

    const handleLogin = () => {
        const cookieValue = Cookies.get("userLoginCookie");
        if (cookieValue) {
            LoginWithEmailAPI("", "", "", "", cookieValue)
                .then((response) => {
                    if (response?.Data?.rd[0]?.stat === 1) {
                        Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token);
                        setIsLoginState(true);
                        sessionStorage.setItem("LoginUser", true);
                        sessionStorage.setItem(
                            "loginUserDetail",
                            JSON.stringify(response.Data.rd[0])
                        );
                        if (redirectEmailUrl) {
                            navigation(redirectEmailUrl);
                        } else {
                            navigation("/");
                        }
                    }
                })
                .catch((err) => console.log(err));
        }
        // let localD = JSON.parse(sessionStorage.getItem("storeInit"));
        // setLocalData(localD);
    }

    // const handleLogout = () => {
    //     navigation("/");
    //     setIsLoginState(false);
    //     sessionStorage.setItem("LoginUser", false);
    //     window.location.reload();
    //     Cookies.remove("userLoginCookie");
    //     sessionStorage.removeItem("storeInit");
    //     sessionStorage.removeItem("loginUserDetail");
    //     sessionStorage.removeItem("remarks");
    //     sessionStorage.removeItem("selectedAddressId");
    //     sessionStorage.removeItem("orderNumber");
    //     sessionStorage.removeItem("registerEmail");
    //     sessionStorage.removeItem("UploadLogicalPath");
    //     sessionStorage.removeItem("remarks");
    //     sessionStorage.removeItem("registerMobile");
    //     sessionStorage.removeItem("allproductlist");
    //     sessionStorage.removeItem("AllFilter");
    //     sessionStorage.removeItem("ColorStoneQualityColorCombo");
    //     sessionStorage.removeItem("CompanyInfoData");
    //     sessionStorage.removeItem("MetalColorCombo");
    //     sessionStorage.removeItem("metalTypeCombo");
    //     sessionStorage.removeItem("myAccountFlags");
    //     sessionStorage.removeItem("registerEmail");
    //     sessionStorage.removeItem("selectedAddressId");
    // };
    return {
        countdown,
        showTimer,
    }
};

export default CountdownTimerFnc;