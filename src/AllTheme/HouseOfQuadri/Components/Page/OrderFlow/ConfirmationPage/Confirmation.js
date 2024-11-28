import React, { useEffect, useState } from "react";
import "./confirmation.scss";
// import ThankYouImage from "../../../Assets/thankyou.jpg"
// import confirmImg from '../../../Assets/confirm.svg'
import { useLocation, useNavigate } from "react-router-dom";
import odrerconfirmed from "../../../Assets/thankyou.svg";
// import  OrderIMG  from '../../../Assets/order.svg'
const Confirmation = () => {
  const navigate = useNavigate();
  const [orderNo, setOrderNo] = useState();
  const location = useLocation();
  useEffect(() => {
    let orderNo = sessionStorage.getItem("orderNumber");
    setOrderNo(orderNo);
  }, []);

  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/",{replace  :true  }); // Replaces the current history entry
      }, 3000); // 5000 milliseconds = 5 seconds
      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
  }, []);

  

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="hoq_confirMaindiv">
      <div className="hoqMo_confirSecondMaindiv">
        <div className="hoqMo_thankYouContainer">
          <div className="hoqMo_thankYouContent">
            <div className="hoqMo_thankYouMessage">
              <img src={odrerconfirmed} className="hoq_orderCnfThankyouImage" />
            </div>
            <div className="orderNumber">
              <p>
                Your Order number is <span>{orderNo}</span>
              </p>
            </div>
            <button
              className="hoqMo_continueShoppingBtn"
              onClick={handleNavigate}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;



// useEffect(() => {
  //   window.addEventListener("popstate", (event) => {
  //     console.log(event)
  //     const orderNumber = sessionStorage.getItem("orderNumber");
  //     const newUrl = `/Confirmation?orderId=${orderNumber}`;
  //     // window.history.replaceState(null, '', newUrl);
  //     navigate("/", { replace: true });
  //   });

  //   return ()=>{
  //     window.removeEventListener("popstate",()=>{})
  //   }
  // }, []); 

  // useEffect(() => {
  //   const orderNumber = sessionStorage.getItem("orderNumber");
  //   if (!orderNumber) {
  //     navigate("/", { replace: true });
  //     return;
  //   }
  //   setOrderNo(orderNumber);
  //   if (location.pathname.includes("Confirmation")) {
  //     window.addEventListener("popstate", ()=>{
  //     navigate("/", { replace: true });
  //     });
  //   }

  //   return () => {
  //     window.removeEventListener("popstate", ()=>{
  //       navigate("/", { replace: true });
  //       });
  //   };
  // }, [location.pathname, navigate]);


//  useEffect(() => {
//     // Handler for popstate event
//     const handlePopState = (event) => {
//       console.log("Popstate event detected:", event);

//       // Check if the current location is the payment confirmation page
//       if (location.pathname === "/Confirmation") {
//         const orderNumber = sessionStorage.getItem("orderNumber");
//         if (orderNumber) {
//           // Perform navigation if necessary
//           navigate("/", { replace: true });
//         }
//       }
//     };

//     console.log("Adding popstate event listener");
//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       console.log("Removing popstate event listener");
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [location.pathname, navigate]); // Include location.pathname in dependencies
