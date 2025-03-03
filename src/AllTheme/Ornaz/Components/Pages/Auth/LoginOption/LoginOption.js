import React, { useEffect } from 'react'
import './LoginOption.modul.scss'
import { useNavigate, useLocation } from 'react-router';

import { FaMobileAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import Footer from '../../Home/Footer/Footer';


const LoginOption = () => {

    const navigation = useNavigate();
    const location = useLocation();

    const search = location?.search
    const redirectEmailUrl = `/ContinueWithEmail/${search}`;

    const redirectMobileUrl = `/ContimueWithMobile/${search}`;

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        })
    }, [])

    return (
        <div className='roop_Loginoption'>
            <div className='loginDailog'>
                <div>
                    <p className='loginDiTile'>Log in or sign up in seconds</p>
                    <p style={{
                        textAlign: 'center',
                        color: '#7d7f85',
                        fontSize: '17px'
                    }}>Use your email or mobile number to continue with the organization.</p>
                    <div className='smilingLoginOptionMain'>
                        <div className='loginMail' onClick={() => navigation(redirectEmailUrl)}>
                            <IoMdMail style={{ height: '25px', width: '25px' }} />
                            <p className="roop_loginOption_text">Continue with email</p>
                        </div>
                        <div className='loginMobile' onClick={() => navigation(redirectMobileUrl)}>
                            <FaMobileAlt style={{ height: '25px', width: '25px', marginRight: '10px' }} />
                            <p className="roop_loginOption_text">Log in with mobile</p>
                        </div>
                    </div>
                    <p style={{
                        marginTop: '40px', fontSize: '15px',
                        color: '#7d7f85',
                        textAlign: 'center'
                    }}>By continuing, you agree to our Terms of Use. Read our Privacy Policy.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginOption