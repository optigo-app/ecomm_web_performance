import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginWithMobileCode.modul.scss';
import { useSetRecoilState } from 'recoil';
import Footer from '../../Home/Footer/Footer';
import { ContimueWithMobileAPI } from '../../../../../../utils/API/Auth/ContimueWithMobileAPI';
import { ToastContainer, toast } from 'react-toastify';
import { LoginWithEmailAPI } from '../../../../../../utils/API/Auth/LoginWithEmailAPI';
import Cookies from 'js-cookie';
import { mala_loginState } from '../../../Recoil/atom';
import {MuiInputPlaceholder} from '../style'

export default function LoginWithMobileCode() {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const [mobileNo, setMobileNo] = useState('');
    const [enterOTP, setEnterOTP] = useState('');
    const [resendTimer, setResendTimer] = useState(120);
    const setIsLoginState = useSetRecoilState(mala_loginState)
    const location = useLocation();

    const search = location?.search
    const updatedSearch = search.replace('?LoginRedirect=', '');
    const redirectMobileUrl = `${decodeURIComponent(updatedSearch)}`;
    const cancelRedireactUrl = `/LoginOption/${search}`;


    useEffect(() => {
        const storedMobile = sessionStorage.getItem('registerMobile');
        if (storedMobile) setMobileNo(storedMobile);
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
        if (fieldName === 'mobileNo') {
            if (!value.trim()) {
                setErrors(prevErrors => ({ ...prevErrors, otp: 'Code is required' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, otp: '' }));
            }
        }
    };

    const handleSubmit = async () => {
        const visiterId = Cookies.get('visiterId');
        if (!enterOTP.trim()) {
            errors.otp = 'Code is required';
            return;
        }
        LoginWithEmailAPI('', mobileNo, enterOTP, 'otp_mobile_login', '', visiterId).then((response) => {
            if (response.Data.rd[0].stat === 1) {
                sessionStorage.setItem('LoginUser', true)
                setIsLoginState(true)
                sessionStorage.setItem('loginUserDetail', JSON.stringify(response.Data.rd[0]));
                sessionStorage.setItem('registerMobile', mobileNo);

                if (redirectMobileUrl) {
                    navigation(redirectMobileUrl);
                } else {
                    navigation('/')
                }

            } else {
                setErrors(prevErrors => ({ ...prevErrors, otp: 'Invalid Code' }));
            }
        }).catch((err) => console.log(err))
    };


    const handleResendCode = async () => {
        setResendTimer(120);
        setIsLoading(true);
        ContimueWithMobileAPI(mobileNo).then((response) => {
            setIsLoading(false);
            if (response.Data.Table1[0].stat === '1') {
                // toast.success('OTP send Sucssessfully');
            } else {
                alert('Error..')
            }
        }).catch((err) => console.log(err))
    };

    return (
        <div className='mala_loginmobileCodeMain'>
            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <ToastContainer />
            <div>
                <div className='smling-forgot-main'>
                    <p style={{
                        textAlign: 'center',
                        padding: '0px',
                        margin: '0px',
                        fontSize: '40px',
                        color: '#fff',
                    }}
                        className='AuthScreenMainTitle'
                    >Login With Code</p>
                    <p style={{
                        textAlign: 'center',
                        margin: '0px',
                        fontSize: '15px',
                        color: '#fff',
                    }}
                        className='AuthScreenSubTitle'
                    >Last step! To secure your account, enter the code we just sent to {mobileNo}.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                        <TextField
                        sx={MuiInputPlaceholder}
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
                            onChange={(e) => handleInputChange(e, setEnterOTP, 'mobileNo')}
                            error={!!errors.otp}
                            helperText={errors.otp}
                        />

                        <button className='submitBtnForgot' onClick={handleSubmit}>Login</button>
                        <p style={{ marginTop: '10px' }}>Didn't get the code ? {resendTimer === 0 ? <span style={{ fontWeight: 500, color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleResendCode}>Resend Code</span> : <span>Resend in {Math.floor(resendTimer / 60).toString().padStart(2, '0')}:{(resendTimer % 60).toString().padStart(2, '0')}</span>}</p>
                        <Button style={{ marginTop: '10px', color: '#fff',fontFamily:"Rowan1" }} onClick={() => navigation(cancelRedireactUrl)}>CANCEL</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
