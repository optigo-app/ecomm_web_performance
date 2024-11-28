import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginOption.modul.scss';

const LoginOption = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="hem_LoginOptionMain_div">
                <div className='hem_LoginOption_div'>
                    <div className='hem_LoginOption_layout'>
                        <button onClick={() => navigate('/')} className='hem_LoginOption_close_btn'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="m4 4 8 8m-8 0 8-8" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path>
                            </svg>
                        </button>
                        <div>
                            <h3 className='hem_LoginOption_login'>Log in or sign up in seconds</h3>
                        </div>
                        <div>
                            <h4 className='hem_LoginOption_login_mess'>Use your email or mobile number to continue with the organization.</h4>
                        </div>
                        <div>
                            <button onClick={() => navigate('/continue-with-email')} className='hem_LoginOption_Continue_with_email'>
                                <svg className="hem_LoginOption_Email_svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M20.37 5.03A2 2 0 0 1 22 7v10a2 2 0 0 1-1.96 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16.1H4zm.13 2.07-4.53 5.31 4.53 4.63a.5.5 0 0 0 0-.04V7.1zm-17-.14a.5.5 0 0 0 0 .04v10a.5.5 0 0 0 0 .04l4.59-4.7L3.5 6.97zm5.57 6.53-3.92 4 13.7.01L15 13.56a4 4 0 0 1-5.93-.07zm9.88-6.99H5l5.07 5.96a2.5 2.5 0 0 0 3.81 0l5.07-5.96z"></path>
                                </svg>
                                <div className='hem_LoginOption_Email_desc'>
                                    <span>Continue with email</span>
                                </div>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => navigate('/continue-with-mobile')} className='hem_LoginOption_Continue_with_phone'>
                                <svg className="hem_LoginOption_phone_svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4.5h8a.5.5 0 0 1 .5.5v1h-9V5a.5.5 0 0 1 .5-.5Zm-2 3V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7.5Zm10.5 0V15h-9V7.5h9ZM7.5 19v-2.5h9V19a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5Zm3.5-1.5a.5.5 0 1 0 0 1h2a.5.5 0 0 0 0-1h-2Z" fill="currentColor"></path>
                                </svg>
                                <div className='hem_LoginOption_phone_desc'>
                                    <span>Continue with mobile</span>
                                </div>
                            </button>
                        </div>
                        <div>
                            <span className='hem_LoginOption_terms'>By continuing, you agree to our Terms of Use. Read our <span className='hem_LoginOption_terms_link' onClick={() => navigate('/')}>Privacy Policy.</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginOption;
