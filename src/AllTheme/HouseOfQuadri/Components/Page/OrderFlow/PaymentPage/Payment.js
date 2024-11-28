import React, { useEffect, useState } from "react";
import "./Payment.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handlePaymentAPI } from "../../../../../../utils/API/OrderFlow/PlaceOrderAPI";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import { useRecoilValue, useSetRecoilState } from "recoil";
import OrderRemarkModal from "../OrderRemark/OrderRemark";
import { handleOrderRemark } from "../../../../../../utils/API/OrderRemarkAPI/OrderRemarkAPI";
import { Divider, Button, Skeleton } from "@mui/material";
import {
  Hoq_CartCount,
  Hoq_loginState,
  hoqMA_CartCount,
} from "../../../Recoil/atom";
import { fetchEstimateTax } from "../../../../../../utils/API/OrderFlow/GetTax";
import { IoArrowBack } from "react-icons/io5";
import Cookies from "js-cookie";
import { formatter } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { RiSecurePaymentLine } from "react-icons/ri";

const Payment = () => {
  const [isloding, setIsloding] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isPloding, setIsPloding] = useState(false);
  const navigate = useNavigate();
  const [countData, setCountData] = useState();
  const [selectedAddrData, setSelectedAddrData] = useState();
  const [totalprice, setTotalPrice] = useState();
  const [totalpriceText, setTotalPriceText] = useState();
  const [finalTotal, setFinlTotal] = useState();
  const [CurrencyData, setCurrencyData] = useState();
  const [taxAmmount, setTaxAmount] = useState();
  const [storeInit, setStoreInit] = useState();

  const setCartCountVal = useSetRecoilState(Hoq_CartCount);
  const islogin = useRecoilValue(Hoq_loginState);

  const [open, setOpen] = useState(false);
  const [orderRemark, setOrderRemark] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemarkChangeInternal = (e) => {
    setOrderRemark(e.target.value);
  };

  const handleSaveInternal = () => {
    handleOrderRemarkFun(orderRemark);
    handleClose();
  };

  useEffect(() => {
    const orderRemakdata = sessionStorage.getItem("orderRemark");
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const storedData = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    setStoreInit(storeInit)
    setOrderRemark(orderRemakdata);
    if (storeInit?.IsB2BWebsite != 0) {
      setCurrencyData(storedData?.CurrencyCode);
    } else {
      setCurrencyData(storeInit?.CurrencyCode);
    }
  }, []);

  const handleBackNavigate = () => {
    navigate(-1);
  };

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

  useEffect(() => {
    setIsloading(true);
    setIsPloding(true);
    const fetchData = async () => {
      try {
        const texData = await fetchEstimateTax();
        if (texData) {
          setTaxAmount(texData[0]);
          console.log(texData[0]);
          setFinlTotal(texData[0]?.TotalAmount);

        }
      } catch (error) {
        console.error("Error fetching tax data:", error);
      } finally {
        setIsloading(false);
        setIsPloding(false);
      }

      const selectedAddressData = JSON.parse(
        sessionStorage.getItem("selectedAddressId")
      );
      setSelectedAddrData(selectedAddressData);

      const totalPriceData = sessionStorage.getItem("TotalPriceData");
      if (totalPriceData) {
        const totalPriceNum = parseFloat(totalPriceData);
        const finalTotalPrice = totalPriceNum;
      }
    };

    fetchData();
  }, []);

  const handlePay = async () => {
    const visiterId = Cookies.get("visiterId");
    setIsloding(true);
    const paymentResponse = await handlePaymentAPI(visiterId, islogin);

    if (paymentResponse?.Data?.rd[0]?.stat == 1) {
      let num = paymentResponse.Data?.rd[0]?.orderno;
      sessionStorage.setItem("orderNumber", num);
      navigate("/Confirmation", { replace: true });
      setIsloding(false);

      GetCountAPI().then((res) => {
        setCountData(res);
        setCartCountVal(res?.cartcount);
      });
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleOrderRemarkChange = () => { };
  const handleOrderRemarkFun = async () => {
    try {
      const response = await handleOrderRemark(orderRemark);
      let resStatus = response?.Data?.rd[0];
      if (resStatus?.stat == 1) {
        // const updatedCartData = cartData.map(cart =>
        //     cart.id == data.id ? { ...cart, Remarks: resStatus?.design_remark } : cart
        // );
        sessionStorage.setItem("orderRemark", orderRemark);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleRedirectpage = () => {
    navigate("/Delivery", { replace: true });
  };

  console.log(isloding);

  return (
    <>
      {isloading ? (
        <>
          <div className="sl">
            <Skeleton variant="rectangular" className="skeleton1" />
          </div>
        </>
      ) : null}
      <div className="hoqMo_paymentMainDiv">
        <p className="SmiCartListTitle">
          <IoArrowBack
            style={{ height: "25px", width: "25px", marginRight: "10px" }}
            onClick={() => navigate(-1)}
          />
          Order Summary
        </p>
        <div className="hoqMo_paymentSecondMainDiv">
          <div className="hoqMo_PaymentContainer">
            <div className="hoqMo_paymentDetailMainDiv">
              {!isloading ? (
                <div className="hoqMo_paymentDetailLeftSideContent">
                  <h2>Payment Card Method</h2>
                  <div className="hoqMo_billingAddress">
                    <h3>Billing Address</h3>
                    <p>
                      Name : {selectedAddrData?.shippingfirstname}{" "}
                      {selectedAddrData?.shippinglastname}
                    </p>
                    <p>Address : {selectedAddrData?.street}</p>
                    <p>City : {selectedAddrData?.city}</p>
                    <p>State : {selectedAddrData?.state}</p>
                    <p>Mobile : {selectedAddrData?.shippingmobile}</p>
                    <p
                      className="hoq_orderRemakrPtag"
                      style={{ maxWidth: "400px", wordWrap: "break-word" }}
                    >
                      Order Remark : {orderRemark}
                    </p>
                  </div>
                </div>
              ) : (
                <Skeleton variant="rectangular" className="skeleton-payment" />
              )}
              {!isloading ? (
                <div className="hoqMo_paymentDetailRightSideContent">
                  <div className="hoqMo_orderSummary">
                    <h3>Order Summary</h3>
                    <div className="hoq_paymenttotalpricesummary">
                      <p>Subtotal</p>
                      <p>
                        <span
                          className="hoq_currencyFont"
                          dangerouslySetInnerHTML={{
                            __html: decodeEntities(CurrencyData),
                          }}
                        />
                        &nbsp;
                        {formatter(finalTotal)}
                      </p>
                    </div>
                    <div className="hoq_paymenttotalpricesummary">
                      <p className="">Estimated Tax</p>
                      <p>
                        <span
                          className="hoq_currencyFont"
                          dangerouslySetInnerHTML={{
                            __html: decodeEntities(CurrencyData),
                          }}
                        />
                        &nbsp;
                        {formatter(taxAmmount?.TaxAmount)}
                      </p>
                    </div>
                    <Divider className="hoqMo_Divider" />
                    <div className="hoq_paymenttotalpricesummary">
                      <p>Estimated Total</p>
                      <p>
                        <span
                          className="hoq_currencyFont"
                          dangerouslySetInnerHTML={{
                            __html: decodeEntities(CurrencyData),
                          }}
                        />
                        &nbsp;
                        {formatter((taxAmmount?.TotalAmountWithTax)?.toFixed(0))}
                      </p>
                    </div>
                  </div>
                  <div className="shippingAddress">
                    <div className="hoqMo_addrChangesBtn">
                      <h3>Shipping Address</h3>
                      <Button
                        onClick={handleRedirectpage}
                        className="hoqMo_changeAddr"
                      >
                        Change
                      </Button>
                    </div>
                    <p className="hoqMo_paymentUserName">
                      {selectedAddrData?.shippingfirstname}{" "}
                      {selectedAddrData?.shippinglastname}
                    </p>
                    <p>{selectedAddrData?.street}</p>
                    <p>
                      {selectedAddrData?.city}-{selectedAddrData?.zip}
                    </p>
                    <p>{selectedAddrData?.state}</p>
                    <p>{selectedAddrData?.shippingmobile}</p>
                  </div>
                  <div className="hoqMo_paymentButtonDiv">
                    <button
                      className="hoqMo_payOnAccountBtn"
                      onClick={handlePay}
                      disabled={isloding}
                    >
                      <RiSecurePaymentLine size={24} />
                      {isloding ? "Loading..." : `Pay On Account`}
                      {isloding && <span className="loader"></span>}
                    </button>
                  </div>
                </div>
              ) : (
                <Skeleton variant="rectangular" className="skeleton-payment" />
              )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

// {
//   <div className="hoqMo_paymentMainDiv">
//                 <p className="SmiCartListTitle">
//                   <IoArrowBack
//                     style={{ height: "25px", width: "25px", marginRight: "10px" }}
//                     onClick={() => navigate(-1)}
//                   />
//                   Order Summary
//                 </p>
//                 <div className="hoqMo_paymentSecondMainDiv">
//                   <div className="hoqMo_PaymentContainer">
//                     <div className="hoqMo_paymentDetailMainDiv">
//                       <div className="hoqMo_paymentDetailLeftSideContent">
//                         <h2>Payment Card Method</h2>
//                         <div className="hoqMo_billingAddress">
//                           <h3>Billing Address</h3>
//                           <p>
//                             Name : {selectedAddrData?.shippingfirstname}{" "}
//                             {selectedAddrData?.shippinglastname}
//                           </p>
//                           <p>Address : {selectedAddrData?.street}</p>
//                           <p>City : {selectedAddrData?.city}</p>
//                           <p>State : {selectedAddrData?.state}</p>
//                           <p>Mobile : {selectedAddrData?.shippingmobile}</p>
//                           <p
//                             className="hoq_orderRemakrPtag"
//                             style={{ maxWidth: "400px", wordWrap: "break-word" }}
//                           >
//                             Order Remark : {orderRemark}
//                           </p>
//                         </div>
//                       </div>
//                       {/* <div className="hoqMo_paymentDetailRightSideContent">
//                         {storeInit?.IsPriceShow == 1 &&
//                           <div className="hoqMo_orderSummary">
//                             <h3>Order Summary</h3>
//                             <div className="hoq_paymenttotalpricesummary">
//                               <p>Subtotal</p>
//                               <p>
//                                 <span
//                                   className="hoq_currencyFont"
//                                   dangerouslySetInnerHTML={{
//                                     __html: decodeEntities(CurrencyData),
//                                   }}
//                                 />&nbsp;
//                                 {formatter(finalTotal)}
//                               </p>
//                             </div>
//                             <div className="hoq_paymenttotalpricesummary">
//                               <p className="">Estimated Tax</p>
//                               <p>
//                                 <span
//                                   className="hoq_currencyFont"
//                                   dangerouslySetInnerHTML={{
//                                     __html: decodeEntities(CurrencyData),
//                                   }}
//                                 />&nbsp;
//                                 {formatter(taxAmmount)}
//                               </p>
//                             </div>
//                             <Divider className="hoqMo_Divider" />
//                             <div className="hoq_paymenttotalpricesummary">
//                               <p>Estimated Total</p>
//                               <p>
//                                 <span
//                                   className="hoq_currencyFont"
//                                   dangerouslySetInnerHTML={{
//                                     __html: decodeEntities(CurrencyData),
//                                   }}
//                                 />&nbsp;
//                                 {formatter((taxAmmount + finalTotal).toFixed(0))}
//                               </p>
//                             </div>
//                           </div>
//                         }
//                         <div className="shippingAddress">
//                           <div className="hoqMo_addrChangesBtn">
//                             <h3>Shipping Address</h3>
//                             <Button
//                               onClick={handleRedirectpage}
//                               className="hoqMo_changeAddr"
//                             >
//                               Change
//                             </Button>
//                           </div>
//                           <p className="hoqMo_paymentUserName">
//                             {selectedAddrData?.shippingfirstname}{" "}
//                             {selectedAddrData?.shippinglastname}
//                           </p>
//                           <p>{selectedAddrData?.street}</p>
//                           <p>
//                             {selectedAddrData?.city}-{selectedAddrData?.zip}
//                           </p>
//                           <p>{selectedAddrData?.state}</p>
//                           <p>{selectedAddrData?.shippingmobile}</p>
//                         </div>
//                         <div className="hoqMo_paymentButtonDiv">
//                           <button
//                             className="hoqMo_payOnAccountBtn"
//                             onClick={handlePay}
//                             disabled={isloding}
//                           >
//                             {isloding ? "Loading..." : "Pay On Account"}
//                             {isloding && <span className="loader"></span>}
//                           </button>
//                         </div>
//                       </div> */}
//                     </div>
//                     <OrderRemarkModal
//                       open={open}
//                       onClose={handleClose}
//                       remark={orderRemark}
//                       onRemarkChange={handleRemarkChangeInternal}
//                       onSave={handleSaveInternal}
//                     />
//                   </div>
//                 </div>
//               </div>
// }