import React, { useEffect, useState } from 'react'
import "./confirmation.scss"
import ThankYouImage from "../../../Assets/thankyou.jpg"
import { useNavigate } from 'react-router-dom';
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';
import { PC_AppCartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';

const Confirmation = () => {
    const navigate = useNavigate();
    const [orderNo, setOrderNo] = useState();
    const setCartCountVal = useSetRecoilState(PC_AppCartCount); 
    
    // for cart count
    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const cartCount = await GetCountAPI();
                setCartCountVal(cartCount?.cartcount);
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };
    
        fetchCartCount();
    }, []);

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
            <div className='smrMo_confirSecondMaindiv'>
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