import React, { useEffect, useState } from 'react';
import "./Payment.scss";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handlePaymentAPI } from '../../../../../../../utils/API/OrderFlow/PlaceOrderAPI';
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import OrderRemarkModal from '../OrderRemark/OrderRemark';
import { handleOrderRemark } from '../../../../../../../utils/API/OrderRemarkAPI/OrderRemarkAPI';
import { Divider, Button } from '@mui/material';
import { PC_AppCartCount, PC_ApploginState } from '../../../Recoil/atom';
import { IoArrowBack } from 'react-icons/io5';
import { fetchEstimateTax } from '../../../../../../../utils/API/OrderFlow/GetTax';
import Cookies from "js-cookie";
import { useAddress } from '../../../../../../../utils/Glob_Functions/OrderFlow/useAddress';
import OrderSummarySkeleton from './PaymentSkelton';
import { formatter } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const Payment = () => {
    const {
        addressData,
    } = useAddress();

    const [isloding, setIsloding] = useState(false);
    const [isOrderloding, setIsOrderloding] = useState(false);
    const navigate = useNavigate();
    const [countData, setCountData] = useState();
    const [selectedAddrData, setSelectedAddrData] = useState();
    const [totalprice, setTotalPrice] = useState();
    const [totalpriceText, setTotalPriceText] = useState();
    const [finalTotal, setFinlTotal] = useState();
    const [CurrencyData, setCurrencyData] = useState();
    const [storeInitData, setStoreInitData] = useState();
    const loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [taxAmmountData, setTaxAmountData] = useState();

    const setCartCountVal = useSetRecoilState(PC_AppCartCount);
    const islogin = useRecoilValue(PC_ApploginState);

    const [taxAmmount, setTaxAmount] = useState();

    const [open, setOpen] = useState(false);
    const [orderRemark, setOrderRemark] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        localStorage.removeItem('navigateUrl');
        const storeinitData = JSON.parse(sessionStorage.getItem('storeInit'));
        setStoreInitData(storeinitData)
    }, [])

    const handleRemarkChangeInternal = (e) => {
        setOrderRemark(e.target.value);
    };

    const handleSaveInternal = () => {
        const trimmedRemark = orderRemark?.trim();
        handleOrderRemarkFun(trimmedRemark);
        handleClose();
    };

    useEffect(() => {
        const orderRemakdata = sessionStorage.getItem("orderRemark");
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const storedData = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        setOrderRemark(orderRemakdata);
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
        setIsOrderloding(true);
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
                setIsOrderloding(false);
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


    // useEffect(() => {
    //     const selectedAddressData = JSON.parse(sessionStorage.getItem('selectedAddressId'));
    //    
    //     setSelectedAddrData(selectedAddressData)

    //     const totalPriceData = sessionStorage.getItem('TotalPriceData');
    //     if (totalPriceData) {
    //         const totalPriceNum = parseFloat(totalPriceData);
    //         const newPrice = totalPriceNum * 0.03;
    //         setTotalPriceText(newPrice.toFixed(2));
    //         setTotalPrice(totalPriceNum);
    //         const finalTotalPrice = totalPriceNum + newPrice;
    //         setFinlTotal(finalTotalPrice.toFixed(2));
    //     }
    // }, [])

    const handlePay = async () => {
        const visiterId = Cookies.get('visiterId');
        setIsloding(true);
        if (selectedAddrData?.id != undefined || selectedAddrData?.id != null) {
            const paymentResponse = await handlePaymentAPI(visiterId, islogin);

            if (paymentResponse?.Data?.rd[0]?.stat == 1) {
                let num = paymentResponse.Data?.rd[0]?.orderno
                sessionStorage.setItem('orderNumber', num);
                navigate('/Confirmation');
                setIsloding(false);

                GetCountAPI().then((res) => {

                    setCountData(res)
                    setCartCountVal(res?.cartcount)
                })

            } else {
                toast.error('Something went wrong!');
                setIsloding(false);
            }
        } else {
            // toast.error("Please First Add Shipping Address")
            setIsloding(false);
            navigate("/Delivery")
        }
    }


    const handleOrderRemarkFun = async (trimmedRemark) => {
        try {
            const response = await handleOrderRemark(trimmedRemark);
            let resStatus = response?.Data?.rd[0]
            if (resStatus?.stat == 1) {
                setOrderRemark(resStatus?.orderremarks)
                sessionStorage.setItem('orderRemark', trimmedRemark)
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

    const handleRedirectpage = () => {
        navigate('/Delivery')
    }

    return (
        <div className='smrMo_paymentMainDiv'>
            {/* <p className="SmiCartListTitle">
                <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigate(-1)} />Order Summary
            </p> */}
            {/* <div className='smrMo_paymentSecondMainDiv'>
                <div className='smrMo_PaymentContainer'>
                    <div className='smrMo_paymentDetailMainDiv'>
                        <div className='smrMo_paymentDetailLeftSideContent'>
                            <h2>Payment Card Method</h2>
                            <div className='smrMo_billingAddress'>
                                <h3>Billing Address</h3>
                                <p>Name : {selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                <p>Address : {selectedAddrData?.street}</p>
                                <p>City : {selectedAddrData?.city}</p>
                                <p>State : {selectedAddrData?.state}</p>
                                <p>Mobile : {selectedAddrData?.shippingmobile}</p>
                                <p className='smr_orderRemakrPtag' style={{ maxWidth: '400px', wordWrap: 'break-word' }}>
                                    Order Remark : {orderRemark}
                                </p>

                            </div>
                        </div>
                        <div className='smrMo_paymentDetailRightSideContent'>
                            <div className='smrMo_orderSummary'>
                                <h3>Order Summary</h3>
                                <div className='smr_paymenttotalpricesummary'>
                                    <p className='PC_AppTotlaText'>Subtotal</p>
                                    <p className='smrNA_PriceShow'>
                                        <span
                                            className="smr_currencyFont"
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(
                                                    CurrencyData
                                                ),
                                            }}
                                        />
                                        {totalprice}
                                    </p>
                                </div>
                                <div className='smr_paymenttotalpricesummary'>
                                    <p className='PC_AppTotlaText'>Estimated Tax</p>
                                    <p className='smrNA_PriceShow'>
                                        <span
                                            className="smr_currencyFont"
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(
                                                    CurrencyData
                                                ),
                                            }}
                                        />
                                        {totalpriceText}
                                    </p>
                                </div>
                                <Divider className='smrMo_Divider' />
                                <div className='smr_paymenttotalpricesummary'>
                                    <p className='PC_AppTotlaText'>Estimated Total</p>
                                    <p className='smrNA_PriceShow'>
                                        <span
                                            className="smr_currencyFont"
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(
                                                    CurrencyData
                                                ),
                                            }}
                                        />
                                        {finalTotal}
                                    </p>
                                </div>
                            </div>
                            <div className='shippingAddress'>
                                <div className='smrMo_addrChangesBtn'>
                                    <h3>Shipping Address</h3>
                                    <Button onClick={handleRedirectpage} className='smrMo_changeAddr'>Change</Button>
                                </div>
                                <p className='smrMo_paymentUserName'>{selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                <p>{selectedAddrData?.street}</p>
                                <p>{selectedAddrData?.city}-{selectedAddrData?.zip}</p>
                                <p>{selectedAddrData?.state}</p>
                                <p>{selectedAddrData?.shippingmobile}</p>
                            </div>
                            <div className='smrMo_paymentButtonDiv'>
                                <button className='smrMo_payOnAccountBtn' onClick={handlePay} disabled={isloding}>
                                    {isloding ? 'Loding...' : 'Pay On Account'}
                                    {isloding && <span className="loader"></span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <OrderRemarkModal
                    open={open}
                    onClose={handleClose}
                    remark={orderRemark}
                    onRemarkChange={handleRemarkChangeInternal}
                    onSave={handleSaveInternal}
                />
            </div> */}

            <div className='paddingTopMobileSet'>
                <div className='smilingPaymentMain'>
                    <p className="SmiCartListTitle">
                        <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigate(-1)} />Order Summary
                    </p>
                    {!isOrderloding ? (
                        <div className='smilingPaymentMainWeb'>
                            <div className='smilingPaySub1Main'>
                                <div className='smilingPaySub1'>
                                    <div className='smilingPaySub1Box1'>
                                        <p className='PaymentMainTitleMain' style={{ fontSize: '22px', fontWeight: 500, color: '#5e5e5e' }}>Payment Card Method</p>

                                        <div className='BilingMainApyment' style={{ marginTop: '40px' }}>
                                            <p className='PaymentMainTitle' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e' }}>Billing Address :</p>
                                            <p className='AddressTitle'>Name : <span className='AdressData'>{selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</span></p>
                                            <p className='AddressTitle'>Address : <span className='AdressData'>{selectedAddrData?.street}</span></p>
                                            <p className='AddressTitle'>City : <span className='AdressData'>{selectedAddrData?.city}-{selectedAddrData?.zip}</span></p>
                                            <p className='AddressTitle'>State : <span className='AdressData'>{selectedAddrData?.state},{selectedAddrData?.country}</span></p>
                                            <p className='AddressTitle'>Mobile : <span className='AdressData'>{selectedAddrData?.shippingmobile}</span></p>
                                        </div>
                                    </div>
                                    <div className='smilingPaySub1Box2'>
                                        {storeInitData?.IsPriceShow == 1 &&
                                            <div className='orderSubmmuryMain'>
                                                <p className='PaymentMainTitle' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e' }}>Order Summary</p>
                                                {!isOrderloding &&
                                                    <>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                                            <p className='orderSubTitle'>Subtotal</p>
                                                            <p style={{ fontWeight: 500, display: 'flex', margin: '0px' }}>
                                                                <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                                                                {formatter(taxAmmountData?.TotalAmount)}
                                                            </p>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgb(233, 233, 233)', paddingBottom: "5px" }}>
                                                            <p className='orderSubTitle'>Estimated Tax</p>
                                                            <p style={{ fontWeight: 500, display: 'flex', margin: '0px' }}> <div className="currencyFont" />
                                                                <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                                                                {formatter(Number((taxAmmountData?.TaxAmount)?.toFixed(3)))}
                                                            </p>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                            <p className='orderSubTitle'>Estimated Total</p>
                                                            <p style={{ fontWeight: 500, display: 'flex', margin: '0px' }}> <div className="currencyFont" />
                                                                <span className="smr_currencyFont">{loginInfo?.CurrencyCode ?? storeInitData?.CurrencyCode}</span>&nbsp;
                                                                {formatter(Number((taxAmmountData?.TotalAmountWithTax)?.toFixed(3)))}
                                                            </p>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }
                                        <div className='deliveryShiipingMain'>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p className='PaymentMainTitle' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e' }}>Shipping Address :</p>
                                                <button className='changeAddressBtnPayment' onClick={() => navigate('/Delivery')}>Change</button>
                                            </div>
                                            <div style={{ marginTop: '0px' }}>
                                                <p className='OrderNamMAinTitle' style={{ fontSize: '25px', margin: '0px', fontWeight: 500, color: '#5e5e5e' }}>{selectedAddrData?.shippingfirstname} {selectedAddrData?.shippinglastname}</p>
                                                <p className='AddressTitle'><span className='AdressData'>{selectedAddrData?.street}</span></p>
                                                <p className='AddressTitle'><span className='AdressData'>{selectedAddrData?.city}-{selectedAddrData?.zip}</span></p>
                                                <p className='AddressTitle'><span className='AdressData'>{selectedAddrData?.state},{selectedAddrData?.country}</span></p>
                                                <p className='AddressTitle'><span className='AdressData'>{selectedAddrData?.shippingmobile}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='smrMo_paymentButtonDiv'>
                                <button className='smrMo_payOnAccountBtn' onClick={handlePay} disabled={isloding}>
                                    {isloding ? 'Loding...' : 'Pay On Account'}
                                    {isloding && <span className="loader"></span>}
                                </button>
                            </div>
                        </div>
                    ) :
                        <OrderSummarySkeleton />
                    }
                </div>
            </div>
        </div>

    )
}

export default Payment;
