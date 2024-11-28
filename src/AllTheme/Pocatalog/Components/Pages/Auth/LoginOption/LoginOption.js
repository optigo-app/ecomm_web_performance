import React, { useEffect } from 'react'
import './LoginOption.modul.scss'
import { useNavigate, useLocation } from 'react-router';

import { FaMobileAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import Footer from '../../Home/Footer/Footer';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';


const LoginOption = () => {

    const navigation = useNavigate();
    const location = useLocation();

    const search = location?.search

    console.log('locationlocationlocation', location);
    const redirectEmailUrl = `/ContinueWithEmail/${search}`;
    const redirectMobileUrl = `/ContimueWithMobile/${search}`;

    useEffect(() => {
        fetch(`${storImagePath()}/ColorTheme.txt`)
            .then((response) => response.text())
            .then((text) => {
                try {
                    const styleTag = document.createElement("style");
                    styleTag.type = "text/css";
                    styleTag.innerHTML = text;
                    document.head.appendChild(styleTag);
                } catch (error) {
                    console.error("Error processing the text file:", error);
                }
            })
            .catch((error) => {
                console.error("Error fetching the file:", error);
            });
    }, []);

    return (
        <div className='proCat_Loginoption'>
            <div className='loginDailog'>
                <div>
                    <p className='loginDiTile'>Log in or sign up in seconds</p>
                    <p style={{
                        textAlign: 'center',
                        color: '#7d7f85',
                    }}>Use your email or mobile no to continue with the organization.</p>
                    <div className='smilingLoginOptionMain'>
                        <div className='loginMail btnColorProCat' onClick={() => navigation(redirectEmailUrl)}>
                            <IoMdMail style={{ height: '25px', width: '25px' }} />
                            <p className='pro_loginText'>Continue with email</p>
                        </div>
                        <div className='loginMobile btnColorProCat' onClick={() => navigation(redirectMobileUrl)}>
                            <FaMobileAlt style={{ height: '25px', width: '25px', marginRight: '10px' }} />
                            <p className='pro_loginText_mobile'>Log in with mobile</p>
                        </div>
                    </div>
                    <p style={{
                        marginTop: '40px', fontSize: '14px',
                        color: '#7d7f85',
                        textAlign: 'center'
                    }}>By continuing, you agree to our Terms of Use. Read our Privacy Policy.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginOption