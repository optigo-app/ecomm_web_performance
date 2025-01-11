import React, { useEffect, useState } from 'react';
import "./Payment.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from '../../Home/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handlePaymentAPI } from '../../../../../../utils/API/OrderFlow/PlaceOrderAPI';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { for_CartCount, for_loginState } from '../../../Recoil/atom';
import OrderRemarkModal from '../OrderRemark/OrderRemark';
import { handleOrderRemark } from '../../../../../../utils/API/OrderRemarkAPI/OrderRemarkAPI';
import Cookies from "js-cookie";
import { fetchEstimateTax } from '../../../../../../utils/API/OrderFlow/GetTax';
import { formatter } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import btnStyle from "../../../scss/Button.module.scss"
import WebLoder from '../../WebLoder/WebLoder';
import { Skeleton } from '@mui/material';

const Payment = () => {
    const [isloding, setIsloding] = useState(false);
    const [isploding, setIsPloding] = useState(false);
    const navigate = useNavigate();
    const [selectedAddrData, setSelectedAddrData] = useState();
    const [totalprice, setTotalPrice] = useState();
    const [totalpriceText, setTotalPriceText] = useState();
    const [finalTotal, setFinlTotal] = useState();
    const [CurrencyData, setCurrencyData] = useState();
    const [taxAmmountData, setTaxAmountData] = useState();

    const setCartCountVal = useSetRecoilState(for_CartCount);

    const [open, setOpen] = useState(false);
    const [orderRemark, setOrderRemark] = useState();
    const [orderRemakdata, setOrderRemarkData] = useState("");
    const islogin = useRecoilValue(for_loginState)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRemarkChangeInternal = (e) => {
        setOrderRemark(e.target.value);
    };

    const handleSaveInternal = () => {
        const trimmedRemark = orderRemark?.trim();
        handleOrderRemarkFun(trimmedRemark);
        handleClose();
    };



    console.log('orderreamrk', orderRemakdata);

    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));

    useEffect(() => {
        const orderRemakdata = sessionStorage.getItem("orderRemark");
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const storedData = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        setOrderRemarkData(orderRemakdata);
        if (storeInit?.IsB2BWebsite != 0) {
            setCurrencyData(storedData?.Currencysymbol)
        } else {
            setCurrencyData(storeInit?.Currencysymbol)
        }
    }, [])

    const handleBackNavigate = () => {
        navigate(-1);
    }

    useEffect(() => {
        setIsPloding(true);
        const fetchData = async () => {
            try {
                const taxData = await fetchEstimateTax();

                console.log("taxData", taxData[0]?.TaxAmount)
                if (taxData) {
                    const data = taxData[0];
                    setTaxAmountData(data);
                }
            } catch (error) {
                console.error('Error fetching tax data:', error);
            } finally{
                setIsPloding(false);
            }

            const selectedAddressData = JSON.parse(sessionStorage.getItem('selectedAddressId'));
           
            setSelectedAddrData(selectedAddressData);

            const totalPriceData = sessionStorage.getItem('TotalPriceData');
            if (totalPriceData) {
                const totalPriceNum = parseFloat(totalPriceData);
                const finalTotalPrice = totalPriceNum;
                setFinlTotal(finalTotalPrice);
            }
        };

        fetchData();
    }, []);


    const handlePay = async () => {
        const visiterId = Cookies.get('visiterId');
        setIsloding(true);
        const paymentResponse = await handlePaymentAPI(visiterId, islogin);
        
        if (paymentResponse?.Data?.rd[0]?.stat == 1) {
            let num = paymentResponse.Data?.rd[0]?.orderno
            sessionStorage.setItem('orderNumber', num);
            navigate('/Confirmation',{replace  :true});
            setIsloding(false);
            sessionStorage.removeItem("orderRemark")

            GetCountAPI().then((res) => {
                
                setCartCountVal(res?.cartcount)
            })
            sessionStorage.removeItem("customizeSteps");
            sessionStorage.removeItem("custStepData");
            sessionStorage.removeItem("customizeSteps2");
            sessionStorage.removeItem("custStepData2");
        } else {
            toast.error('Something went wrong!')
        }
    }

    const handleOrderRemarkChange = () => {

    }
    const handleOrderRemarkFun = async (trimmedRemark) => {
        try {
            const response = await handleOrderRemark(trimmedRemark);
            let resStatus = response?.Data?.rd[0]
            if (resStatus?.stat == 1) {
                // const updatedCartData = cartData.map(cart =>
                //     cart.id == data.id ? { ...cart, Remarks: resStatus?.design_remark } : cart
                // );
                setOrderRemarkData(resStatus?.orderremarks)
                sessionStorage.setItem('orderRemark', trimmedRemark ?? "")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }


    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='for_paymentMainDiv'>
            <div className='for_paymentSecondMainDiv'>
                <div className='for_PaymentContainer'>
                    <div className='for_paymentBackbtnDiv'>
                        <IoMdArrowRoundBack className='for_paymentBackbtn' onClick={handleBackNavigate} />
                        <Link
                            className="for_addorderRemarkbtn"
                            variant="body2"
                            onClick={handleOpen}
                        >
                            {orderRemakdata == "" || orderRemakdata == undefined ? "Add order Remark" : "Update order Remark"}
                        </Link>
                    </div>
                    <div className='for_paymentDetailMainDiv'>
                        <div className='for_paymentDetailLeftSideContent'>
                            <h2>Payment Card Method</h2>
                            <div className='for_billingAddress'>
                                <h3>Billing Address</h3>
                                <p>Name : {selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                <p>Address : {selectedAddrData?.street}</p>
                                <p>City : {selectedAddrData?.city}</p>
                                <p>State : {selectedAddrData?.state}</p>
                                <p>Mobile : {selectedAddrData?.shippingmobile}</p>
                                {orderRemakdata != "" &&
                                    <p className='for_orderRemakrPtag' style={{ maxWidth: '400px', wordWrap: 'break-word' }}>
                                        Order Remark : {orderRemakdata}
                                    </p>
                                }

                            </div>
                        </div>
                        <div className='for_paymentDetailRightSideContent'>
                            <h3>Order Summary</h3>
                            {!isploding ? (
                                <>
                                    <div className='for_paymenttotalpricesummary'>
                                        <p>Subtotal</p>
                                        <p>
                                            <span className="for_currencyFont">
                                                {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>&nbsp;

                                            <span>{formatter(Number(taxAmmountData?.TotalAmount))}</span>
                                        </p>
                                    </div>
                                    <div className='for_paymenttotalpricesummary'>
                                        <p>Estimated Tax</p>
                                        <p>
                                            <span className="for_currencyFont">
                                                {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>&nbsp;
                                            <span>{formatter(Number((taxAmmountData?.TaxAmount)?.toFixed(3)))}</span>
                                        </p>
                                    </div>
                                    <div className='for_paymenttotalpricesummary'>
                                        <p>Estimated Total</p>
                                        <p>
                                            <span className="for_currencyFont">
                                                {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                            </span>&nbsp;
                                            <span>{formatter(Number((taxAmmountData?.TotalAmountWithTax)?.toFixed(3)))}</span>
                                        </p>
                                    </div>
                                </>
                            ) :
                                <Skeleton className='for_CartSkelton' variant="rectangular" width="100%" height={90} animation="wave" />
                            }
                            <div className='for_shippingAddress'>
                                <h3>Shipping Address</h3>
                                <p className='for_paymentUserName'>{selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                <p>{selectedAddrData?.street}</p>
                                <p>{selectedAddrData?.city}-{selectedAddrData?.zip}</p>
                                <p>{selectedAddrData?.state}</p>
                                <p>{selectedAddrData?.shippingmobile}</p>
                            </div>
                        </div>
                    </div>
                    <div className='for_paymentButtonDiv'>
                        <button className={`${btnStyle?.btn_for_new2} ${btnStyle?.btn_16}`} onClick={handlePay} disabled={isloding}>
                            {isloding ? 'LOADING...' : 'PAY ON ACCOUNT'}
                            {isloding && <span className="loader"></span>}
                        </button>
                    </div>
                </div>
                <OrderRemarkModal
                    open={open}
                    onClose={handleClose}
                    remark={orderRemark}
                    onRemarkChange={handleRemarkChangeInternal}
                    onSave={handleSaveInternal}
                />
            </div>
        </div>
    )
}

export default Payment;
