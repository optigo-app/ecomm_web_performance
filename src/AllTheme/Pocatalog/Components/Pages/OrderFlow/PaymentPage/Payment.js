import React, { useEffect, useState } from 'react';
import "./Payment.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from '../../Home/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handlePaymentAPI } from '../../../../../../utils/API/OrderFlow/PlaceOrderAPI';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { proCat_CartCount, proCat_loginState } from '../../../Recoil/atom';
import OrderRemarkModal from '../OrderRemark/OrderRemark';
import { handleOrderRemark } from '../../../../../../utils/API/OrderRemarkAPI/OrderRemarkAPI';
import Cookies from "js-cookie";
import { fetchEstimateTax } from '../../../../../../utils/API/OrderFlow/GetTax';
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Backdrop, Box, CircularProgress, Skeleton, useMediaQuery } from '@mui/material';
import GoogleAnalytics from 'react-ga4'
import { fetchRazorPayData } from '../../../../../../utils/API/OrderFlow/RazorPayAPI';
import { handleVerifySignature } from '../../../../../../utils/API/OrderFlow/RazorPayVerificationAPI';
import { cod, onlinepay } from '../../../../../../utils/assets/image';


const Payment = () => {
    const [isloding, setIsloding] = useState(false);
    const [isloder, setIsloder] = useState(false);
    const [isPloding, setIsPloding] = useState(false);
    const navigate = useNavigate();
    const [selectedAddrData, setSelectedAddrData] = useState();
    const [totalprice, setTotalPrice] = useState();
    const [totalpriceText, setTotalPriceText] = useState();
    const [finalTotal, setFinlTotal] = useState();
    const [CurrencyData, setCurrencyData] = useState();
    const [taxAmmountData, setTaxAmountData] = useState();

    const setCartCountVal = useSetRecoilState(proCat_CartCount);

    const [open, setOpen] = useState(false);
    const [orderRemark, setOrderRemark] = useState();
    const [orderRemakdata, setOrderRemarkData] = useState();
    const islogin = useRecoilValue(proCat_loginState)

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


    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;
    const isMobile = useMediaQuery('(max-width:600px)');
    const [selectedOption, setSelectedOption] = useState(1);
    const options = [
        { id: 1, label: 'Pay Online', description: 'Save & pay via razor-pay', icon: onlinepay },
        { id: 2, label: 'Pay Offline', description: 'Save & pay via Cash on delivery ', icon: cod },
    ]


    useEffect(() => {
        const orderRemakdata = sessionStorage.getItem("orderRemark") ?? "";
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
        setIsloder(true);
        setIsPloding(true);
        const fetchData = async () => {
            try {
                const taxData = await fetchEstimateTax();

                if (taxData) {
                    const data = taxData[0];
                    setTaxAmountData(data);
                }
            } catch (error) {
                console.error('Error fetching tax data:', error);
            } finally {
                setIsPloding(false);
                setIsloder(false);
            }

            const selectedAddressData = JSON.parse(sessionStorage.getItem('selectedAddressId')) ?? "";
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
        const razorPayData = {
            description: orderRemakdata,
            price: Math.round(parseFloat(taxAmmountData?.TotalAmountWithTax) * 100),
            addressData: selectedAddrData
        };

        const visiterId = Cookies.get('visiterId');
        setIsloding(true);

        try {
            let paymentResponse;
            let orderResponse;
            let orderId;
            let paymentId;
            let vstatus;

            if (selectedOption != 1) {
                paymentResponse = await handlePaymentAPI(visiterId, islogin);
            } else {
                orderResponse = await fetchRazorPayData(razorPayData);

                orderId = orderResponse?.Attributes?.id;
                console.log("orderId", orderId,)

                if (orderId) {
                    const options = {
                        key: loginInfo?.razorpay_key ?? "",
                        amount: Math.round(parseFloat(taxAmmountData?.TotalAmountWithTax) * 100),
                        currency: loginInfo?.CurrencyCode ?? "",
                        name: storeInit?.companyname ?? "Company",
                        image:storeInit?.favicon,
                        order_id: orderId ?? "",
                        prefill: {
                            name: `${razorPayData?.addressData?.shippingfirstname} ${razorPayData?.addressData?.shippinglastname}`,
                            email: loginInfo?.userId ?? "",
                            contact: loginInfo?.mobileno ?? "",
                        },
                        handler: async function (paymentResponse) {
                            try {
                                setIsloder(true);
                                let razorpayData = {
                                    razorpay_payment_id: paymentResponse?.razorpay_payment_id,
                                    razorpay_order_id: paymentResponse?.razorpay_order_id,
                                    razorpay_signature: paymentResponse?.razorpay_signature,
                                }
                                const verificationResponse = await handleVerifySignature(razorpayData);
                                vstatus = verificationResponse?.Data?.signature[0]?.state
                                if (vstatus == 1) {
                                    GoogleAnalytics.event({
                                        action: `Online Payment Started by User ${loginInfo?.firstname || 'Guest'}`,
                                        category: 'Payment Interaction on Payment Page',
                                        label: `Total Payment ${(taxAmmountData?.TotalAmountWithTax)?.toFixed(3)}`,
                                        value: loginInfo?.firstname || "Guest User"
                                    });
                                    paymentResponse = await handlePaymentAPI(visiterId, islogin);

                                    if (paymentResponse?.Data?.rd?.[0]?.stat === 1) {
                                        const orderNumber = paymentResponse.Data?.rd[0]?.orderno;
                                        sessionStorage.setItem('orderNumber', orderNumber);
                                    }
                                    
                                    const cartCount = await GetCountAPI();
                                    setCartCountVal(cartCount?.cartcount);
                                    paymentId = paymentResponse?.razorpay_payment_id;
                                    navigate('/Confirmation', { replace: true });
                                    setIsloder(false);
                                } else {
                                    alert('Payment verification failed.');
                                }
                            } catch (verificationError) {
                                console.error('Verification Error:', verificationError);
                                // alert('Error verifying payment.');
                            }
                        },
                        modal: {
                            ondismiss: function () {
                                console.log("Pause the payment; you exit the Razorpay app.");               
                            },
                        },
                        theme: {
                            color: '#98b8d94a',
                        },
                    };

                    const pay = new window.Razorpay(options);
                    pay.open();
                }
            }
            if (selectedOption != 1) {
                if (paymentResponse?.Data?.rd?.[0]?.stat === 1) {
                    GoogleAnalytics.event({
                        action: `Online Payment Started by User ${loginInfo?.firstname || 'Guest'}`,
                        category: 'Payment Interaction on Payment Page',
                        label: `Total Payment ${(taxAmmountData?.TotalAmountWithTax)?.toFixed(3)}`,
                        value: loginInfo?.firstname || "Guest User"
                    });
                    const orderNumber = paymentResponse.Data?.rd[0]?.orderno;
                    sessionStorage.setItem('orderNumber', orderNumber);

                    navigate('/Confirmation', { replace: true });
                    sessionStorage.removeItem("orderRemark");

                    const cartCount = await GetCountAPI();
                    setCartCountVal(cartCount?.cartcount);

                } else {
                    toast.error('Something went wrong!');
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('An error occurred during payment!');
        } finally {
            setIsloding(false);
        }
    };


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

    return (
        <div className='proCat_paymentMainDiv'>
            {!isloder ? (
                <div className='proCat_paymentSecondMainDiv'>
                    <div className='proCat_PaymentContainer'>
                        <div className='proCat_paymentBackbtnDiv'>
                            <IoMdArrowRoundBack className='proCat_paymentBackbtn' onClick={handleBackNavigate} />
                            <Link
                                className="proCat_addorderRemarkbtn"
                                variant="body2"
                                onClick={handleOpen}
                            >
                                {orderRemakdata == "" ? "Add order Remark" : "Update order Remark"}
                            </Link>
                        </div>
                        <div className='proCat_paymentDetailMainDiv'>
                            <div className='proCat_paymentDetailLeftSideContent'>
                                <h2>Payment Card Method</h2>
                                <div className='proCat_billingAddress'>
                                    <h3>Billing Address</h3>
                                    <p>Name : {selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                    <p>Address : {selectedAddrData?.street}</p>
                                    <p>City : {selectedAddrData?.city}</p>
                                    <p>State : {selectedAddrData?.state}</p>
                                    <p>Mobile : {selectedAddrData?.shippingmobile}</p>
                                    <p className='proCat_orderRemakrPtag' style={{ maxWidth: '400px', wordWrap: 'break-word' }}>
                                        Order Remark : {orderRemakdata}
                                    </p>
                                    {!isMobile &&
                                        <div className="payment-options-container">
                                            <h4>Preferred Payment Options</h4>
                                            {options.map((option) => (
                                                <div
                                                    key={option.id}
                                                    className={`payment-option ${selectedOption === option.id ? 'selected' : ''}`}
                                                    onClick={() => setSelectedOption(option.id)}
                                                >
                                                    <div className="icon">
                                                        <img src={option.icon} alt={`${option.label} icon`} />
                                                    </div>
                                                    <div className="details">
                                                        <h5>{option.label}</h5>
                                                        <p>{option.description}</p>
                                                    </div>
                                                    <div className="radio">
                                                        <div className="radio-border">
                                                            <input type="radio" checked={selectedOption === option.id} readOnly />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='proCat_paymentDetailRightSideContent'>
                                {storeInit?.IsPriceShow == 1 &&
                                    <>
                                        <h3>Order Summary</h3>
                                        {!isPloding ? (
                                            <>
                                                <div className='proCat_paymenttotalpricesummary'>
                                                    <p>Subtotal</p>
                                                    <p>
                                                        <span className="proCat_currencyFont">
                                                            {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                        </span>&nbsp;

                                                        <span>{formatter(taxAmmountData?.TotalAmount)}</span>
                                                    </p>
                                                </div>
                                                <div className='proCat_paymenttotalpricesummary'>
                                                    <p>Estimated Tax</p>
                                                    <p>
                                                        <span className="proCat_currencyFont">
                                                            {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                        </span>&nbsp;
                                                        <span>{formatter(Number((taxAmmountData?.TaxAmount)?.toFixed(3)))}</span>
                                                    </p>
                                                </div>
                                                <div className='proCat_paymenttotalpricesummary'>
                                                    <p>Estimated Total</p>
                                                    <p>
                                                        <span className="proCat_currencyFont">
                                                            {loginInfo?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                        </span>&nbsp;
                                                        <span>{formatter(Number((taxAmmountData?.TotalAmountWithTax)?.toFixed(3)))}</span>
                                                    </p>
                                                </div>
                                            </>
                                        ) :
                                            <Skeleton className='proCat_CartSkelton' variant="rectangular" width="100%" height={90} animation="wave" />
                                        }
                                    </>
                                }
                                <div className='proCat_shippingAddress'>
                                    <h3>Shipping Address</h3>
                                    <p className='proCat_paymentUserName'>{selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                    <p>{selectedAddrData?.street}</p>
                                    <p>{selectedAddrData?.city}-{selectedAddrData?.zip}</p>
                                    <p>{selectedAddrData?.state}</p>
                                    <p>{selectedAddrData?.shippingmobile}</p>
                                </div>
                                {isMobile &&
                                    <div className="payment-options-container">
                                        <h4>Preferred Payment Options</h4>
                                        {options.map((option) => (
                                            <div
                                                key={option.id}
                                                className={`payment-option ${selectedOption === option.id ? 'selected' : ''}`}
                                                onClick={() => setSelectedOption(option.id)}
                                            >
                                                <div className="icon">
                                                    <img src={option.icon} alt={`${option.label} icon`} />
                                                </div>
                                                <div className="details">
                                                    <h5>{option.label}</h5>
                                                    <p>{option.description}</p>
                                                </div>
                                                <div className="radio">
                                                    <div className="radio-border">
                                                        <input type="radio" checked={selectedOption === option.id} readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='proCat_paymentButtonDiv'>
                            <button className='proCat_payOnAccountBtn' onClick={handlePay} disabled={isloding}>
                                {/* {isloding ? 'LOADING...' : 'PAY ON ACCOUNT'} */}
                                {isloding ? 'LOADING...' : 'Order Now'}
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
                    {/* <Footer /> */}
                </div>
            ) :
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="80vh"
                >
                    <Backdrop
                        sx={{
                            color: "#fff",
                            backgroundColor: "rgba(211, 211, 211, 0.4)",
                            zIndex: (theme) => theme.zIndex.drawer + 8,
                            opacity:"1 !important",
                            visibility:"visible !important"
                        }}
                        open={isloder}
                    >
                        <CircularProgress sx={{ color: "#a8807c" }} />
                    </Backdrop>
                </Box>
            }
        </div>
    )
}

export default Payment;
