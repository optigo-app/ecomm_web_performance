import React, { useEffect, useState } from 'react';
import "./confirmation.scss";
import Footer from '../../Home/Footer/Footer';
import ThankYouImage from "../../../Assets/Thankyou.png";
import { useNavigate } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import { handelOpenMenu } from "../../../../../../utils/Glob_Functions/Cart_Wishlist/handleOpenMenu";

const Confirmation = () => {
    const navigate = useNavigate();
    const [orderNo, setOrderNo] = useState();
    const [storeInit, setStoreInit] = useState();

    const setCSSVariable = () => {
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const backgroundColor = storeInit?.IsPLW === 1 ? "#c4cfdb" : "#c0bbb1";
        document.documentElement.style.setProperty("--background-color", backgroundColor);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCSSVariable();
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeInit);
        const orderNo = sessionStorage.getItem('orderNumber');
        setOrderNo(orderNo);
    }, []);

    const handleNavigate = async () => {
        const url = await handelOpenMenu();
        navigate(url || '/');
        sessionStorage.removeItem("TotalPriceData");
    };

    return (
        <div className='dt_confirMaindiv'>
            <div className='dt_confirSecondMaindiv'>
                <div className="dt_thankYouContainer">
                    <div className="dt_thankYouContent">
                        <div className="dt_thankYouMessage">
                            <img src={ThankYouImage} className='dt_orderCnfThankyouImage' alt="Thank You" />
                        </div>
                        <div className="dt_orderNumber">
                            <p>Your Order number is <span>{orderNo}</span></p>
                        </div>
                        {storeInit?.IsPLW !== 0 &&
                            <div className='dt_plwlPrintDiv'>
                                <button className="icon-button">
                                    <FaPrint className="icon" />
                                    Print
                                </button>
                                <p>Coming soon...</p>
                            </div>
                        }
                        <button className="dt_continueShoppingBtn" onClick={handleNavigate}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Confirmation;
