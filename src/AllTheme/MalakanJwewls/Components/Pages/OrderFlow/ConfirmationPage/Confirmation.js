import React, { useEffect, useState } from 'react'
import "./confirmation.scss"
import Footer from '../../Home/Footer/Footer';
import ThankYouImage from "../../../Assets/thankyou.svg"
import { useNavigate } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import { handelOpenMenu } from '../../../../../../utils/Glob_Functions/Cart_Wishlist/handleOpenMenu';

const Confirmation = () => {
    const navigate = useNavigate();
    const [orderNo, setOrderNo] = useState();
    const [storeInit, setStoreInit] = useState();

    const setCSSVariable = () => {
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
        document.documentElement.style.setProperty(
          "--background-color",
          backgroundColor
        );
      };
    
    //   useEffect(()=>{
    //     const timer = setTimeout(() => {
    //         navigate("/",{replace  :true})
    //     }, 15000000);
    //     return  ()=>{
    //         clearTimeout(timer)
    //     }
    // },[])

    useEffect(() => {

        setCSSVariable();
        
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeInit);
        let orderNo = sessionStorage.getItem('orderNumber')
        setOrderNo(orderNo)
    }, [])

    const handleNavigate = async () => {
        const url = await handelOpenMenu()
        if (url) {
            navigate(url)
        } else {
            navigate('/')
        }
        sessionStorage.removeItem("TotalPriceData");
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='mala_confirMaindiv'>
            <div className='mala_confirSecondMaindiv'>
                <div className="thankYouContainer">
                    <div className="thankYouContent">
                        <div className="thankYouMessage">
                            <img src={ThankYouImage} className='mala_orderCnfThankyouImage' />
                        </div>
                        <div className="orderNumber">
                            <p>Your Order number is <span>{orderNo}</span></p>
                        </div>
                        {storeInit?.IsPLW != 0 &&
                            <div className='mala_plwlPrintDiv'>
                                <button className="icon-button">
                                    <FaPrint className="icon" />
                                    Print
                                </button>
                                <p>Comming soon...</p>
                            </div>
                        }
                        <button className="mala_continueShoppingBtns" onClick={handleNavigate}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;