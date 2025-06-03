import React, { Suspense, useEffect } from 'react'
import { smrMA_companyLogo, smrMA_companyLogo1, smrMA_loginState } from './Components/Recoil/atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import PrivateRoutes from './PrivateRoutes'
import { storImagePath } from '../../../utils/Glob_Functions/GlobalFunction'
import { Route, Routes, useLocation } from 'react-router-dom'
import Support from './Components/Pages/StaticPages/Support'
import Loader from './Components/Pages/Loading/Loader'
import AccountDelete from './Components/Pages/StaticPages/AccountDelete'


// const Header = React.lazy(() => import('./Components/Pages/Home/Header/Header'));
// const Home = React.lazy(() => import('./Components/Pages/Home/Index'));
// const HomeTab = React.lazy(() => import('./HomeTab'));
// const CartPage = React.lazy(() => import('./Components/Pages/Cart/CartMain'));
// const Wishlist = React.lazy(() => import("./Components/Pages/Wishlist/Wishlist"));
// const Delivery = React.lazy(() => import('./Components/Pages/OrderFlow/DeliveryPage/Delivery'));
// const Payment = React.lazy(() => import('./Components/Pages/OrderFlow/PaymentPage/Payment'));
// const Confirmation = React.lazy(() => import('./Components/Pages/OrderFlow/ConfirmationPage/Confirmation'));
// const WithoutLoginCart = React.lazy(() => import('./Components/Pages/Cart/WithoutLoginCart'));
// const ProductList = React.lazy(() => import('./Components/Pages/ProductList/ProductList'));
// const ProductDetail = React.lazy(() => import('./Components/Pages/ProductDetail/ProductDetail'));
// const Menu = React.lazy(() => import('./Components/Pages/MenuPage/Menu'));
// const AccountWothoutLogin = React.lazy(() => import('./Components/Pages/AccountWothoutLogin'));
// const Account = React.lazy(() => import('./Components/Pages/Account/Account'));
// const AccountLedger = React.lazy(() => import('./Components/Pages/Account/AccountLeger/AccountLedger'));
// const YourProfile = React.lazy(() => import('./Components/Pages/Account/YourProfile/YourProfile'));
// const OrderHistory = React.lazy(() => import('./Components/Pages/Account/AccountOrderHistory/OrderHisoty'));
// const ChangePassword = React.lazy(() => import('./Components/Pages/Account/changePassword/ChangePassword'));
// const SearchPage = React.lazy(() => import('./Components/Pages/SearchPage/SearchPage'));
// const MobileViewComp = React.lazy(() => import('./Components/Pages/Account/MobileViewComps/MobileViewComp'));
// const QuotationQuote = React.lazy(() => import('./Components/Pages/Account/QuotationQuote/QuotationQuote'));
// const QuotationJob = React.lazy(() => import('./Components/Pages/Account/QuotationJob/QuotationJob'));
// const Sales = React.lazy(() => import('./Components/Pages/Account/Sales/Sales'));
// const SalesReport = React.lazy(() => import('./Components/Pages/Account/SalesReport/SalesReport'));
// const PendingMemo = React.lazy(() => import('./Components/Pages/Account/PendingMemo/PendingMemo'));
// const DesignWiseSalesReport = React.lazy(() => import('./Components/Pages/Account/DesignWiseSalesReport/DesignWiseSalesReport'));
// const TermsCondition = React.lazy(() => import('./Components/Pages/StaticPages/TermsCondition'));
// const PrivacyPolicy = React.lazy(() => import('./Components/Pages/StaticPages/PrivacyPolicy'));
// const DeliveryShipping = React.lazy(() => import('./Components/Pages/StaticPages/DeliveryShipping'));
// const Copyright = React.lazy(() => import('./Components/Pages/StaticPages/Coupons'));
// const HelpCenter = React.lazy(() => import('./Components/Pages/StaticPages/HelpCenter'));
// const ManageAddressMAPP = React.lazy(() => import('./Components/Pages/Account/address/ManageAddressMAPP'));
// const Lookbook = React.lazy(() => import('./Components/Pages/Home/LookBook/Lookbook'));
// const NewOrderHistoryMapp = React.lazy(() => import('./Components/Pages/Account/AccountOrderHistory/NewOrderHistoryMapp'));


import Header from './Components/Pages/Home/Header/Header';
import Home from './Components/Pages/Home/Index';
import HomeTab from './HomeTab';
import CartPage from './Components/Pages/Cart/CartMain';
import Wishlist from "./Components/Pages/Wishlist/Wishlist";
import Delivery from './Components/Pages/OrderFlow/DeliveryPage/Delivery';
import Payment from './Components/Pages/OrderFlow/PaymentPage/Payment';
import Confirmation from './Components/Pages/OrderFlow/ConfirmationPage/Confirmation';
import WithoutLoginCart from './Components/Pages/Cart/WithoutLoginCart';
import ProductList from './Components/Pages/ProductList/ProductList';
import ProductDetail from './Components/Pages/ProductDetail/ProductDetail';
import Menu from './Components/Pages/MenuPage/Menu';
import AccountWothoutLogin from './Components/Pages/AccountWothoutLogin';
import Account from './Components/Pages/Account/Account';
import AccountLedger from './Components/Pages/Account/AccountLeger/AccountLedger';
import YourProfile from './Components/Pages/Account/YourProfile/YourProfile';
import OrderHistory from './Components/Pages/Account/AccountOrderHistory/OrderHisoty';
import ChangePassword from './Components/Pages/Account/changePassword/ChangePassword';
import SearchPage from './Components/Pages/SearchPage/SearchPage';
import MobileViewComp from './Components/Pages/Account/MobileViewComps/MobileViewComp';
import QuotationQuote from './Components/Pages/Account/QuotationQuote/QuotationQuote';
import QuotationJob from './Components/Pages/Account/QuotationJob/QuotationJob';
import Sales from './Components/Pages/Account/Sales/Sales';
import SalesReport from './Components/Pages/Account/SalesReport/SalesReport';
import PendingMemo from './Components/Pages/Account/PendingMemo/PendingMemo';
import DesignWiseSalesReport from './Components/Pages/Account/DesignWiseSalesReport/DesignWiseSalesReport';
import TermsCondition from './Components/Pages/StaticPages/TermsCondition';
import PrivacyPolicy from './Components/Pages/StaticPages/PrivacyPolicy';
import DeliveryShipping from './Components/Pages/StaticPages/DeliveryShipping';
import Copyright from './Components/Pages/StaticPages/Coupons';
import HelpCenter from './Components/Pages/StaticPages/HelpCenter';
import ManageAddressMAPP from './Components/Pages/Account/address/ManageAddressMAPP';
import Lookbook from './Components/Pages/Home/LookBook/Lookbook';
import NewOrderHistoryMapp from './Components/Pages/Account/AccountOrderHistory/NewOrderHistoryMapp';
import { Box, CircularProgress } from '@mui/material'
import Home1 from './Components/Pages/Home/HomePage1'
import HomeTab1 from './Components/Pages/Home/HomePage1/HomeTab1'
import Header1 from './Components/Pages/Home/HomePage1/Header/Header1'
import Menu1 from './Components/Pages/MenuPage/Menu1'
import Home2 from './Components/Pages/Home/HomePage2'
import Header2 from './Components/Pages/Home/HomePage2/Header/Header2'
import HomeTab2 from './Components/Pages/Home/HomePage2/HomeTab2'

const SmilingRock_MobileApp_App = React.memo(() => {

  const location = useLocation();
  const smrMA_setCompanyTitleLogo = useSetRecoilState(smrMA_companyLogo);
  const smrMA_setCompanyTitleLogo1 = useSetRecoilState(smrMA_companyLogo1);
  useEffect(() => {
    const mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;
    const mobileLogo1 = `${storImagePath()}/logoIcon/mobileLogo1.png`;
    smrMA_setCompanyTitleLogo(mobileLogo);
    smrMA_setCompanyTitleLogo1(mobileLogo1);
  }, [smrMA_setCompanyTitleLogo, smrMA_setCompanyTitleLogo1]);

  const LoadingFallback = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <CircularProgress sx={{ color: 'rgba(255, 87, 34, 0.8)' }} />
    </Box>
  );

  const homePage1 = 2;

  return (
    <div>
      <Suspense fallback={<LoadingFallback />} >
        {(location.pathname === "/accountledgertable" ||
          location.pathname === "/accountledgerexcel" ||
          location.pathname === "/accountledgerdebit" ||
          location.pathname === "/accountledgercredit" ||
          location.pathname === "/AccountWithoutLogin" ||
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
          location.pathname === "/Coupons" ||
          location.pathname === "/Memo" ||
          location.pathname === "/account-delete" ||
          location.pathname === "/CurrentVersion") ?
          // null : <Header />}
          // null : homePage1 === 1 ? <Header1 /> : <Header />}
          null : homePage1 === 2 ? <Header2 /> : <Header />}

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/" element={<Home1 />} />
          <Route path="/home1" element={<Home1 />} /> */}
          <Route path="/" element={<Home2 />} />
          {/* <Route path="/home2" element={<Home2 />} /> */}
          <Route path="/WithoutLoginCart" element={<WithoutLoginCart />} />
          <Route path="/AccountWithoutLogin" element={<AccountWothoutLogin />} />
          {/* <Route path="/Menu" element={<Menu />} /> */}
          <Route path="/Menu" element={<Menu1 />} />
          {/* <Route path="/TermsCondition" element={<TermsCondition />} /> */}
          <Route path="/Lookbook" element={<Lookbook />} />
          <Route path="/DeliveryShipping" element={<DeliveryShipping />} />
          {/* <Route path='/' element={<PrivateRoutes isLoginStatus={islogin} />}> */}
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/HelpCenter" element={<HelpCenter />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/account-delete" element={<AccountDelete />} />
          <Route path="/copyright" element={<Copyright />} />
          <Route path="/support" element={<Support />} />
          <Route path="/Delivery" element={<Delivery />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/Confirmation" element={<Confirmation />} />
          <Route path="/Coupons" element={<Confirmation />} />
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
          <Route path="/logout" element={<div></div>} />
          {/* </Route> */}
          <Route path="/p/*" element={<ProductList />} />
          <Route path="/d/*" element={<ProductDetail />} />
        </Routes>
        {/* {!["p", "d"].includes(location.pathname.split('/')[1]) &&
          location.pathname !== "myWishList" &&
          <HomeTab />} */}
        {/* {homePage1 === 1 ? (
          !["p", "d"].includes(location.pathname.split('/')[1]) &&
          location.pathname !== "myWishList" &&
          <HomeTab1 />
        ) : (
          !["p", "d"].includes(location.pathname.split('/')[1]) &&
          location.pathname !== "myWishList" &&
          <HomeTab1 />
        )} */}
        {homePage1 === 1 ? (
          !["p", "d"].includes(location.pathname.split('/')[1]) &&
          location.pathname !== "myWishList" &&
          <HomeTab2 />
        ) : (
          !["p", "d"].includes(location.pathname.split('/')[1]) &&
          location.pathname !== "myWishList" &&
          <HomeTab2 />
        )}
      </Suspense>
    </div>
  )
});


export default SmilingRock_MobileApp_App