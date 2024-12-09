import React, { useEffect } from 'react'
import './LoginOption.modul.scss'
import { IoClose } from 'react-icons/io5';
import { FaMobileAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../Home/Footer/Footer';

export default function LoginOption() {

    const navigation = useNavigate(); 
    const location = useLocation();

    const search = location?.search
    const redirectEmailUrl = `/ContinueWithEmail/${search}`;

    const redirectMobileUrl = `/ContimueWithMobile/${search}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='dt_loginOptionMain' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
            <div>
                <div className='dt_authBoxMain'>
                    <div className='optionLoginMain'>
                        <p className='loginDiTile'>Log in or sign up in seconds</p>
                        <p style={{ textAlign: 'center', fontFamily: 'PT Sans, sans-serif', marginTop: '0px', fontSize: '14px' }}>Use your email or mobile no to continue with the organization.</p>
                        <div className='smilingLoginOptionMain'>
                            <div className='dt_box_loginMail' onClick={() => navigation(redirectEmailUrl)}>
                                <IoMdMail style={{ height: '25px', width: '25px' }} />
                                <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500, paddingLeft: '25px', fontFamily: 'PT Sans, sans-serif' }}>Continue with email</p>
                            </div>
                            <div className='dt_box_loginMobile' onClick={() => navigation(redirectMobileUrl)}>
                                <FaMobileAlt style={{ height: '25px', width: '25px', marginRight: '10px' }} />
                                <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500, paddingLeft: '25px', fontFamily: 'PT Sans, sans-serif' }}>Log in with mobile</p>
                            </div>
                        </div>
                        <p style={{ marginTop: '40px', fontSize: '14px', textAlign: 'center', marginBottom: '30px', fontFamily: 'PT Sans, sans-serif' }}>By continuing, you agree to our <span style={{cursor : 'pointer' , textDecoration: 'underline'}} onClick={() => navigation('/term&condition')}>Terms of Use.</span> Read our <span style={{cursor : 'pointer' , textDecoration: 'underline'}} onClick={() => navigation('/PrivacyPolicy')}>Privacy Policy.</span></p>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
