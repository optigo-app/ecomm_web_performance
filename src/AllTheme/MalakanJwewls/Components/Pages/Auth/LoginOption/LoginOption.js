import React from 'react'
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

    return (
        <div className='mala_Loginoption'>
            <div className='loginDailog'>
                <div>
                    <p className='loginDiTile'>Log in or sign up in seconds</p>
                    <p style={{
                        textAlign: 'center',
                        color: '#fff',
                    }}>Use your email or mobile number to continue with the organization.</p>
                    <div className='smilingLoginOptionMain'>
                        <div className='loginMail' onClick={() => navigation(redirectEmailUrl)}>
                            <IoMdMail style={{ height: '25px', width: '25px' }} />
                            <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500, paddingLeft: '25px' }}>Continue with email</p>
                        </div>
                        <div className='loginMobile' onClick={() => navigation(redirectMobileUrl)}>
                            <FaMobileAlt style={{ height: '25px', width: '25px', marginRight: '10px' }} />
                            <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500, paddingLeft: '25px' }}>Log in with mobile</p>
                        </div>
                    </div>
                    <p style={{
                        marginTop: '40px', fontSize: '14px',
                        color: '#fff',
                        textAlign: 'center'
                    }}>By continuing, you agree to our Terms of Use. Read our Privacy Policy.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginOption