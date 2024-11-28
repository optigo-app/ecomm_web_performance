import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from './Components/Pages/Home/Header/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Pages/Home/Index'
import HomeTab from './HomeTab'
import CartPage from './Components/Pages/Cart/CartMain'
import Wishlist from "./Components/Pages/Wishlist/Wishlist"
import Delivery from './Components/Pages/OrderFlow/DeliveryPage/Delivery'
import Payment from './Components/Pages/OrderFlow/PaymentPage/Payment'
import Confirmation from './Components/Pages/OrderFlow/ConfirmationPage/Confirmation'
import WithoutLoginCart from './Components/Pages/Cart/WithoutLoginCart'
import ProductList from './Components/Pages/ProductList/ProductList'
import ProductDetail from './Components/Pages/ProductDetail/ProductDetail'
import Menu from './Components/Pages/MenuPage/Menu'
import AccountWothoutLogin from './Components/Pages/AccountWothoutLogin'
import Account from './Components/Pages/Account/Account';
import AccountLedger from './Components/Pages/Account/AccountLeger/AccountLedger';
import YourProfile from './Components/Pages/Account/YourProfile/YourProfile';
import OrderHistory from './Components/Pages/Account/AccountOrderHistory/OrderHisoty';
import ChangePassword from './Components/Pages/Account/changePassword/ChangePassword';
import SearchPage from './Components/Pages/SearchPage/SearchPage'
import { PC_AppcompanyLogo, PC_ApploginState } from './Components/Recoil/atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import PrivateRoutes from './PrivateRoutes'
import MobileViewComp from './Components/Pages/Account/MobileViewComps/MobileViewComp';
import QuotationQuote from './Components/Pages/Account/QuotationQuote/QuotationQuote';
import QuotationJob from './Components/Pages/Account/QuotationJob/QuotationJob';
import Sales from './Components/Pages/Account/Sales/Sales';
import SalesReport from './Components/Pages/Account/SalesReport/SalesReport';
import PendingMemo from './Components/Pages/Account/PendingMemo/PendingMemo';
import DesignWiseSalesReport from './Components/Pages/Account/DesignWiseSalesReport/DesignWiseSalesReport';
import TermsCondition from './Components/Pages/StaticPages/TermsCondition'
import PrivacyPolicy from './Components/Pages/StaticPages/PrivacyPolicy'
import DeliveryShipping from './Components/Pages/StaticPages/DeliveryShipping'
import Coupons from './Components/Pages/StaticPages/Coupons'
import HelpCenter from './Components/Pages/StaticPages/HelpCenter'
import ManageAddressMAPP from './Components/Pages/Account/address/ManageAddressMAPP';
import Lookbook from './Components/Pages/Home/LookBook/Lookbook'
import NewOrderHistoryMapp from './Components/Pages/Account/AccountOrderHistory/NewOrderHistoryMapp';
import ContctUs from './Components/Pages/StaticPages/ContctUs'
import ConnectionManager from '../../../utils/SoketConnection/ConnectionManager'

const Procatalog_MobileApp_App = () => {

  const location = useLocation();
  const islogin = useRecoilValue(PC_ApploginState)
  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(PC_AppcompanyLogo);

  useEffect(() => {
    let data = JSON?.parse(sessionStorage.getItem("storeInit"));
    if (data) {
      setCompanyTitleLogo(data?.companyMlogo);
    }


    // if (Logindata) {
    //   if (Logindata?.IsPLWOn == 1) {
    //     setCompanyTitleLogo(Logindata?.Private_label_logo);
    //   } else {
    //     setCompanyTitleLogo(logo?.companylogo);
    //   }
    // } else {
    //   setCompanyTitleLogo(logo?.companylogo);
    // }
  });

  return (
    <div>
      <ConnectionManager />
      <ToastContainer />
      {(location.pathname === "/accountledgertable" ||
        location.pathname === "/accountledgerexcel" ||
        location.pathname === "/accountledgerdebit" ||
        location.pathname === "/accountledgercredit" ||
        location.pathname === "/AccountWothoutLogin" ||
        location.pathname === "/WithoutLoginCart" ||
        location.pathname === "/account" ||
        location.pathname === "/ChangePassword" ||
        location.pathname === "/Delivery" ||
        location.pathname === "/MobileViewComp" ||
        location.pathname === "/OrderHistory" ||
        location.pathname === "/ManageAddress" ||
        location.pathname === "/YourProfile" ||
        location.pathname === "/QuotationQuote" ||
        location.pathname === "/QuotationJob" ||
        location.pathname === "/AccountLedger" ||
        location.pathname === "/Sales" ||
        location.pathname === "/SalesReport" ||
        location.pathname === "/DesignWiseSalesReport" ||
        location.pathname === "/payment" ||
        location.pathname === "/SearchPage" ||
        location.pathname === "/CartPage" ||
        location.pathname === "/Confirmation" ||
        location.pathname === "/myWishList" ||
        location.pathname === "/PrivacyPolicy" ||
        location.pathname === "/DeliveryShipping" ||
        location.pathname === "/TermsCondition" ||
        location.pathname === "/HelpCenter" ||
        location.pathname === "/Coupons" ||
        location.pathname === "/ContctUs" ||
        location.pathname === "/Lookbook" ||
        location.pathname === "/CurrentVersion") ?
        null : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WithoutLoginCart" element={<WithoutLoginCart />} />
        <Route path="/AccountWothoutLogin" element={<AccountWothoutLogin />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/TermsCondition" element={<TermsCondition />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/Lookbook" element={<Lookbook />} />
        <Route path="/DeliveryShipping" element={<DeliveryShipping />} />
        <Route path="/ContctUs" element={<ContctUs />} />
        {/* <Route path='/' element={<PrivateRoutes isLoginStatus={islogin} />}> */}
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/HelpCenter" element={<HelpCenter />} />
        <Route path="/Coupons" element={<Coupons />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/myWishList" element={<Wishlist />} />
        <Route path="/p/*" element={<ProductList />} />
        <Route path="/d/*" element={<ProductDetail />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/AccountLedger" element={<AccountLedger />} />
        <Route path="/QuotationQuote" element={<QuotationQuote />} />
        <Route path="/QuotationJob" element={<QuotationJob />} />
        <Route path="/Sales" element={<Sales />} />
        <Route path="/SalesReport" element={<SalesReport />} />
        <Route path="/Memo" element={<PendingMemo />} />
        <Route path="/DesignWiseSalesReport" element={<DesignWiseSalesReport />} />
        <Route path="/YourProfile" element={<YourProfile />} />
        {/* <Route path="/OrderHistory" element={<OrderHistory />} /> */}
        <Route path="/OrderHistory" element={<NewOrderHistoryMapp />} />
        <Route path="/ManageAddress" element={<ManageAddressMAPP />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/MobileViewComp" element={<MobileViewComp />} />
        {/* </Route> */}
        <Route path="/p/*" element={<ProductList />} />
        <Route path="/d/*" element={<ProductDetail />} />

      </Routes>
      {(location.pathname.split('/')[1] === "p") || (location.pathname === "myWishList") || (location.pathname.split('/')[1] === "d") ?
        '' : <HomeTab />}

    </div>
  )
}

export default Procatalog_MobileApp_App