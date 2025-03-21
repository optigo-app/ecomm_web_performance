import React, { useEffect, useState } from 'react'
import "./confirmation.scss"
import Footer from '../../Home/Footer/Footer';
import ThankYouImage from "../../../Assets/thankyou.svg"
import { useNavigate } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import { handelOpenMenu } from '../../../../../../utils/Glob_Functions/Cart_Wishlist/handleOpenMenu';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { useSetRecoilState } from 'recoil';
import { CartCount } from '../../../Recoil/atom'

const Confirmation = ({ data }) => {
    const navigate = useNavigate();
    const [orderNo, setOrderNo] = useState();
    const [storeInit, setStoreInit] = useState();
    const setCartCountVal = useSetRecoilState(CartCount);

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


    const setCSSVariable = () => {
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
        document.documentElement.style.setProperty(
            "--background-color",
            backgroundColor
        );
    };

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

    // useEffect(()=>{
    //     const timer = setTimeout(() => {
    //         navigate("/",{replace  :true})
    //     }, 2000);
    //     return  ()=>{
    //         clearTimeout(timer)
    //     }
    // },[])

    return (
        <div className='smr_confirMaindiv'>
            <div className='smr_confirSecondMaindiv'>
                <div className="thankYouContainer">
                    <div className="thankYouContent">
                        <div className="thankYouMessage">
                            <img src={ThankYouImage} className='smr_orderCnfThankyouImage' />
                        </div>
                        <div className="orderNumber">
                            <p>Your Order number is <span>{orderNo}</span></p>
                        </div>
                        {storeInit?.IsPLW != 0 &&
                            <div className='smr_plwlPrintDiv'>
                                <button className="icon-button">
                                    <FaPrint className="icon" />
                                    Print
                                </button>
                                <p>Comming soon...</p>
                            </div>
                        }
                        <button className="smr_continueShoppingBtns" onClick={handleNavigate}>Continue Shopping</button>
                    </div>
                </div>
                <Footer data={data} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
                <p
                    className="backtotop_lov"

                    style={{
                        margin: '0px', width: '100px', cursor: 'pointer', color: "#5F497A", fontSize: "14px",
                        fontWeight: 600,
                    }} onClick={scrollToTop}>BACK TO TOP</p>
            </div>
        </div>
    );
}

export default Confirmation;