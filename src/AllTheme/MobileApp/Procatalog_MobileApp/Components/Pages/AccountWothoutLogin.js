import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import './AccountWothoutLogin.modul.scss'
import { FaBook } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
export default function AccountWothoutLogin() {

    const navigation = useNavigate();


    return (
        <div className='smrMA_WithoutloginAccountMain'>
            <div className='SmiCartListTitleAccount'>
                <p className="SmiCartListTitleN" style={{}}>
                    <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigation('/')} />Account
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginInline: '10px' , alignItems: 'center'}}>
                    <p className='fontFamiliy' style={{ margin: '0px', fontSize: '16px' }}>Log in to get exclusive offers</p>
                    {/* <button className='loginBtnAccount' onClick={() => navigation('/LoginOption')} >Log In</button> */}
                    <button className='loginBtnAccount' onClick={() => navigation('/signin')} >Log In</button>
                </div>
            </div>

            <div className='mainTerms'>
                <p className='titleContion' style={{margin: '10px 0px 5px 0px', }}>Feeadback & Information</p>
                <div style={{ display: 'flex', alignItems: 'center' ,height:'50px', justifyContent: 'space-between', paddingInline: '15px'}} onClick={() => navigation('/TermsCondition')}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <FaBook />
                        <p className='titleTerms'>Terms & Condition</p>
                    </div>
                    <div>
                        <MdOutlineNavigateNext style={{height: '25px', width: '25px'}}/>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' ,height:'50px', justifyContent: 'space-between', paddingInline: '15px'}} onClick={() => navigation('/PrivacyPolicy')}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <MdOutlinePrivacyTip />
                        <p className='titleTerms'>Privacy Policy</p>
                    </div>
                    <div>
                        <MdOutlineNavigateNext style={{height: '25px', width: '25px'}}/>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' ,height:'50px', justifyContent: 'space-between', paddingInline: '15px'}} onClick={() => navigation('/DeliveryShipping')}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <FaShoppingBag />
                        <p className='titleTerms'>Delivery Shipping</p>
                    </div>
                    <div>
                        <MdOutlineNavigateNext style={{height: '25px', width: '25px'}}/>
                    </div>
                </div>
            </div>

        </div>
    )
}
