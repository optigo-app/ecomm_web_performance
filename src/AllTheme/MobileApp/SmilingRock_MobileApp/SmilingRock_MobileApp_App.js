import React, { Suspense, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { smrMA_companyLogo, smrMA_loginState } from './Components/Recoil/atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import PrivateRoutes from './PrivateRoutes'
import { storImagePath } from '../../../utils/Glob_Functions/GlobalFunction'
import { Route, Routes, useLocation } from 'react-router-dom'
import Support from './Components/Pages/StaticPages/Support'


const Header = React.lazy(() => import('./Components/Pages/Home/Header/Header'));
const Home = React.lazy(() => import('./Components/Pages/Home/Index'));
const HomeTab = React.lazy(() => import('./HomeTab'));
const CartPage = React.lazy(() => import('./Components/Pages/Cart/CartMain'));
const Wishlist = React.lazy(() => import("./Components/Pages/Wishlist/Wishlist"));
const Delivery = React.lazy(() => import('./Components/Pages/OrderFlow/DeliveryPage/Delivery'));
const Payment = React.lazy(() => import('./Components/Pages/OrderFlow/PaymentPage/Payment'));
const Confirmation = React.lazy(() => import('./Components/Pages/OrderFlow/ConfirmationPage/Confirmation'));
const WithoutLoginCart = React.lazy(() => import('./Components/Pages/Cart/WithoutLoginCart'));
const ProductList = React.lazy(() => import('./Components/Pages/ProductList/ProductList'));
const ProductDetail = React.lazy(() => import('./Components/Pages/ProductDetail/ProductDetail'));
const Menu = React.lazy(() => import('./Components/Pages/MenuPage/Menu'));
const AccountWothoutLogin = React.lazy(() => import('./Components/Pages/AccountWothoutLogin'));
const Account = React.lazy(() => import('./Components/Pages/Account/Account'));
const AccountLedger = React.lazy(() => import('./Components/Pages/Account/AccountLeger/AccountLedger'));
const YourProfile = React.lazy(() => import('./Components/Pages/Account/YourProfile/YourProfile'));
const OrderHistory = React.lazy(() => import('./Components/Pages/Account/AccountOrderHistory/OrderHisoty'));
const ChangePassword = React.lazy(() => import('./Components/Pages/Account/changePassword/ChangePassword'));
const SearchPage = React.lazy(() => import('./Components/Pages/SearchPage/SearchPage'));
const MobileViewComp = React.lazy(() => import('./Components/Pages/Account/MobileViewComps/MobileViewComp'));
const QuotationQuote = React.lazy(() => import('./Components/Pages/Account/QuotationQuote/QuotationQuote'));
const QuotationJob = React.lazy(() => import('./Components/Pages/Account/QuotationJob/QuotationJob'));
const Sales = React.lazy(() => import('./Components/Pages/Account/Sales/Sales'));
const SalesReport = React.lazy(() => import('./Components/Pages/Account/SalesReport/SalesReport'));
const PendingMemo = React.lazy(() => import('./Components/Pages/Account/PendingMemo/PendingMemo'));
const DesignWiseSalesReport = React.lazy(() => import('./Components/Pages/Account/DesignWiseSalesReport/DesignWiseSalesReport'));
const TermsCondition = React.lazy(() => import('./Components/Pages/StaticPages/TermsCondition'));
const PrivacyPolicy = React.lazy(() => import('./Components/Pages/StaticPages/PrivacyPolicy'));
const DeliveryShipping = React.lazy(() => import('./Components/Pages/StaticPages/DeliveryShipping'));
const Copyright = React.lazy(() => import('./Components/Pages/StaticPages/Coupons'));
const HelpCenter = React.lazy(() => import('./Components/Pages/StaticPages/HelpCenter'));
const ManageAddressMAPP = React.lazy(() => import('./Components/Pages/Account/address/ManageAddressMAPP'));
const Lookbook = React.lazy(() => import('./Components/Pages/Home/LookBook/Lookbook'));
const NewOrderHistoryMapp = React.lazy(() => import('./Components/Pages/Account/AccountOrderHistory/NewOrderHistoryMapp'));


const SmilingRock_MobileApp_App = React.memo(() => {

  const location = useLocation();
  const smrMA_setCompanyTitleLogo = useSetRecoilState(smrMA_companyLogo);
  useEffect(() => {
    const mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;
    smrMA_setCompanyTitleLogo(mobileLogo);
  }, [smrMA_setCompanyTitleLogo]);

  return (
    <div>
      <Suspense fallback={<></>}>
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
        location.pathname === "/privacy-policy" ||
        location.pathname === "/copyright" ||
        location.pathname === "/support" ||
        location.pathname === "/Lookbook" ||
        location.pathname === "/CurrentVersion") ?
        null : <Header />}


        
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WithoutLoginCart" element={<WithoutLoginCart />} />
        <Route path="/AccountWothoutLogin" element={<AccountWothoutLogin />} />
        <Route path="/Menu" element={<Menu />} />
        {/* <Route path="/TermsCondition" element={<TermsCondition />} /> */}
        <Route path="/Lookbook" element={<Lookbook />} />
        <Route path="/DeliveryShipping" element={<DeliveryShipping />} />
        {/* <Route path='/' element={<PrivateRoutes isLoginStatus={islogin} />}> */}
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/HelpCenter" element={<HelpCenter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/copyright" element={<Copyright />} />
        <Route path="/support" element={<Support />} />
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

        </Suspense>
    </div>
  )
});


export default SmilingRock_MobileApp_App