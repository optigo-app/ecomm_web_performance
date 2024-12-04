import React, { useEffect, useState } from 'react'
import "./confirmation.scss"
import ThankYouImage from "../../../Assets/thankyou.jpg"
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const navigate = useNavigate();
    const [orderNo, setOrderNo] = useState();
    useEffect(() => {
        let orderNo = sessionStorage.getItem('orderNumber')
        setOrderNo(orderNo)
    }, [])

    const handleNavigate = () => {
        navigate('/')
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='smr_confirMaindiv'>
            <div className='smrMo_confirSecondMaindivd'>
                <div className="smrMo_thankYouContainer">
                    <div className="smrMo_thankYouContent">
                        <div className="smrMo_thankYouMessage">
                            <img src={ThankYouImage} className='smr_orderCnfThankyouImage' />
                        </div>
                        <div className="orderNumber">
                            <p>Your Order number is <span>{orderNo}</span></p>
                        </div>
                        <button className="smrMo_continueShoppingBtn" onClick={handleNavigate}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;