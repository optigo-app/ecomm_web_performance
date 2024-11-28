import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginWithEmailCode.modul.scss';
import { ToastContainer, toast } from 'react-toastify';
import { LoginWithEmailCodeAPI } from '../../../../../../utils/API/Auth/LoginWithEmailCodeAPI';
import { LoginWithEmailAPI } from '../../../../../../utils/API/Auth/LoginWithEmailAPI';
import { el_loginState } from '../../../Recoil/atom';
import { useRecoilState } from 'recoil';

export default function LoginWithEmailCode() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(120);

    const location = useLocation();
    const [islogin, setIsLoginState] = useRecoilState(el_loginState)
    const search = location?.search
    const updatedSearch = search.replace('?LoginRedirect=', '');
    const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
    const cancelRedireactUrl = `/LoginOption/${search}`;

    useEffect(() => {
        const fetchData = async () => {
            const storedEmail = sessionStorage.getItem('registerEmail');
            if (storedEmail) {
                setEmail(storedEmail);
                const value = sessionStorage.getItem('LoginCodeEmail');
                if (value === 'true') {
                    sessionStorage.setItem('LoginCodeEmail', 'false');
                    LoginWithEmailCodeAPI(storedEmail).then((response) => {
                        if (response.Data.Table1[0].stat === '1') {
                            toast.success('OTP sent successfully');
                        } else {
                            toast.error('OTP send error');
                        }
                    }).catch((err) => console.log(err));
                }
            }
            else {
                toast.error('OTP send error');
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (resendTimer > 0) {
            const interval = setInterval(() => {
                setResendTimer(prevTimer => {
                    if (prevTimer === 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [resendTimer]);

    const handleInputChange = (e, setter, fieldName) => {
        const { value } = e.target;
        setter(value);
        if (fieldName === 'otp') {
            if (!value.trim()) {
                setErrors(prevErrors => ({ ...prevErrors, otp: 'Code is required' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, otp: '' }));
            }
        }
    };

    const handleSubmit = async () => {
        if (!otp.trim()) {
            errors.mobileNo = 'Password is required';
            return;
        }


        setIsLoading(true);
        LoginWithEmailAPI(email, '', otp, 'otp_email_login').then((response) => {
            setIsLoading(false);
            if (response?.Data?.rd[0]?.stat === 1) {
                setIsLoginState(true)
                sessionStorage.setItem('LoginUser', true)
                sessionStorage.setItem('loginUserDetail', JSON.stringify(response.Data.rd[0]));

                if (redirectEmailUrl) {
                    navigation(redirectEmailUrl);
                } else {
                    navigation('/')
                }
            } else {
                errors.mobileNo = 'Code is Invalid'
            }
        }).catch((err) => console.log(err))
    };


    const handleResendCode = async () => {
        setResendTimer(120);
        LoginWithEmailCodeAPI(email).then((response) => {
            if (response.Data.Table1[0].stat === '1') {
                sessionStorage.setItem('LoginCodeEmail', 'false');
                toast.success('OTP send Sucssessfully');
            } else {
                toast.error('OTP send Error');
            }
        }).catch((err) => console.log(err))
    };

    return (
        <div className='el_LoginWithCodeEmailMain' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
            <ToastContainer />
            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div>
                <div className='el_LoginEmailMainDiv'>
                    <div className='el_LoginSubDivMain'>
                        <p style={{
                            textAlign: 'center',
                            paddingBlock: '60px',
                            fontSize: '25px',
                            // fontFamily: 'PT Sans, sans-serif'
                        }}
                            className='AuthScreenMainTitle'
                        >Login With Code</p>
                        <p style={{
                            textAlign: 'center',
                            marginTop: '-60px',
                            fontSize: '15px',
                            color: '#7d7f85',
                            // fontFamily: 'PT Sans, sans-serif'
                        }}
                            className='AuthScreenSubTitle'
                        >Last step! To secure your account, enter the code we just sent to {email}.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                            <TextField
                                autoFocus
                                id="outlined-basic"
                                label="Enter Code"
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleSubmit();
                                    }
                                }}
                                value={otp}
                                onChange={(e) => handleInputChange(e, setOtp, 'opt')}
                                error={!!errors.mobileNo}
                                helperText={errors.mobileNo}
                            />

                            <button className='submitBtnForgot btn-bg-elvee' onClick={handleSubmit}>Login</button>
                            <p style={{ marginTop: '10px' }}>Didn't get the code ? {resendTimer === 0 ? <span style={{ fontWeight: 500, color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleResendCode}>Resend Code</span> : <span>Resend in {Math.floor(resendTimer / 60).toString().padStart(2, '0')}:{(resendTimer % 60).toString().padStart(2, '0')}</span>}</p>
                            <button className='submitBtnForgot ' style={{ marginTop: '10px', color: 'gray', marginBottom: '40px' }} onClick={() => navigation('/LoginOption')}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
