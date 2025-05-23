import React, { useEffect, useState } from 'react'
import "./confirmation.scss"
import Footer from '../../Home/Footer/Footer';
import ThankYouImage from "../../../Assets/thankyou.svg"
import { useNavigate } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import btnStyle from "../../../scss/Button.module.scss"
import { for_CartCount } from '../../../Recoil/atom';
import { useSetRecoilState } from 'recoil';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';

const Confirmation = () => {
    const navigate = useNavigate();
    const [orderNo, setOrderNo] = useState();
    const [storeInit, setStoreInit] = useState();
    const setCartCountVal = useSetRecoilState(for_CartCount); 

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

       sessionStorage.removeItem("customizeSteps");
       sessionStorage.removeItem("custStepData");
       sessionStorage.removeItem("customizeSteps2Ring");
       sessionStorage.removeItem("customizeSteps2Pendant");
       sessionStorage.removeItem("custStepData2Ring");
       sessionStorage.removeItem("setImage");
       sessionStorage.removeItem("custStepData2Pendant");
   
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
    
      useEffect(()=>{
        const timer = setTimeout(() => {
            navigate("/",{replace  :true})
        }, 2000);
        return  ()=>{
            clearTimeout(timer)
        }
    },[])
    useEffect(() => {

        setCSSVariable();
        
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeInit);
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
        <div className='for_confirMaindiv'>
            <div className='for_confirSecondMaindiv'>
                <div className="for_thankYouContainer">
                    <div className="for_thankYouContent">
                        <div className="for_thankYouMessage">
                            <img src={ThankYouImage} className='for_orderCnfThankyouImage' />
                        </div>
                        <div className="for_orderNumber">
                            <p>Your Order number is <span>{orderNo}</span></p>
                        </div>
                        {storeInit?.IsPLW != 0 &&
                            <div className='for_plwlPrintDiv'>
                                <button className="icon-button">
                                    <FaPrint className="icon" />
                                    Print
                                </button>
                                <p>Comming soon...</p>
                            </div>
                        }
                        <button className={`${btnStyle?.btn_for_new2} ${btnStyle?.btn_16}`} onClick={handleNavigate}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;