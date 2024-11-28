import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./MobileViewComp.scss"
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { FaChevronRight } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import { FaHeadset } from "react-icons/fa6";
import { smrMA_loginState } from '../../../Recoil/atom';
import { useEffect } from 'react';
import MobViewHeader from '../MobViewHeader/MobViewHeader';

const MobileViewComp = () => {

    const naviagation = useNavigate();

    const setIsLoginState = useSetRecoilState(smrMA_loginState)
    const [fName, setFname] = useState('');
    const [lastNamr, setLasnane] = useState('');
    const [userMobile, setUserMobile] = useState('');

    const handleLogout = () => {
        setIsLoginState('false')
        sessionStorage.setItem('LoginUser', 'false');
        sessionStorage.removeItem('storeInit');
        sessionStorage.removeItem('loginUserDetail');
        sessionStorage.removeItem('remarks');
        sessionStorage.removeItem('selectedAddressId');
        sessionStorage.removeItem('orderNumber');
        sessionStorage.removeItem('registerEmail');
        sessionStorage.removeItem('UploadLogicalPath');
        sessionStorage.removeItem('remarks');
        sessionStorage.removeItem('registerMobile');
        naviagation('/')
        window.location.reload();
    }

    useEffect(() => {
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        setFname(loginUserDetail?.firstname);
        setLasnane(loginUserDetail?.lastname);
        setUserMobile(loginUserDetail?.defaddress_shippingmobile)
    },[])

  return (
    <div className='mobComp_Account_SMRM'>
            <div className='sticky-header'>
                <MobViewHeader title="My Account" />
            </div>
        <div style={{marginBottom:'100px'}} className='smr_Smiling_AccountMain'>
            {/* <div className='titleMain'>
                <div style={{ width: '100%' }}>
                    <p style={{ margin: '0px', fontSize: '25px', fontWeight: 600, paddingInline: '10px' }}>{fName + ' ' + lastNamr}</p>
                    <p style={{ margin: '0px', fontSize: '15px', paddingInline: '10px' }}>+91 {userMobile}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px', paddingInline: '10px' }}>
                        <div className='boxMainTopSection' onClick={() => naviagation('/OrderHistory')}>
                            <LuBox style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Orders</p>
                        </div>
                        <div className='boxMainTopSection' style={{ marginRight: '0px' }} onClick={() => naviagation('/myWishList')}>
                            <MdFavoriteBorder style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Wishlist</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px', paddingInline: '10px' }}>
                        <div className='boxMainTopSection'>
                            <IoGiftOutline style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Coupons</p>
                        </div>
                        <div className='boxMainTopSection' style={{ marginRight: '0px' }}>
                            <FaHeadset style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Help Center</p>
                        </div>
                    </div>
                </div>

            </div> */}
            
            <div className='smlingAccountTabMobileView YourAccountPageTabs' style={{ marginTop: '15px' }}>
                <div className='menuMainAccount' onClick={() => naviagation('/QuotationQuote')}>
                    <p className='menuMainAccountTitle'>Quote</p>
                        <FaChevronRight />
                </div>
                <div className='menuMainAccount' onClick={() => naviagation('/QuotationJob')}>
                    <p className='menuMainAccountTitle'>Jobs</p>
                        <FaChevronRight />
                </div>
                <div className='menuMainAccount' onClick={() => naviagation('/Sales')}>
                    <p className='menuMainAccountTitle'>Sales</p>
                        <FaChevronRight />
                </div>
                <div className='menuMainAccount' onClick={() => naviagation('/SalesReport')}>
                    <p className='menuMainAccountTitle' >Sales Report</p>
                        <FaChevronRight />
                </div>
                <div className='menuMainAccount' onClick={() => naviagation('/Memo')}>
                    <p className='menuMainAccountTitle' >Memo</p>
                        <FaChevronRight />
                </div>
                <div className='menuMainAccount' onClick={() => naviagation('/DesignWiseSalesReport')}>
                    <p className='menuMainAccountTitle'>Design Wise Sales Report</p>
                        <FaChevronRight />
                </div>
                <div className='menuMainAccount' onClick={() => naviagation('/AccountLedger')}>
                    <p className='menuMainAccountTitle'>Account Ledger</p>
                        <FaChevronRight />
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '30px' }}>
                        <p className='smilingAccountLogoutMobile' onClick={handleLogout}>LOG OUT</p>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default MobileViewComp