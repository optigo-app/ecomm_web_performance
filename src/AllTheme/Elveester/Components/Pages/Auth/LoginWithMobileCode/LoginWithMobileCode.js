import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginWithMobileCode.modul.scss';
import { useSetRecoilState } from 'recoil';
import { el_loginState } from '../../../Recoil/atom';
import { LoginWithEmailAPI } from '../../../../../../utils/API/Auth/LoginWithEmailAPI';
import { ContimueWithMobileAPI } from '../../../../../../utils/API/Auth/ContimueWithMobileAPI';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginWithMobileCode() {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const [mobileNo, setMobileNo] = useState('');
    const [enterOTP, setEnterOTP] = useState('');
    const [resendTimer, setResendTimer] = useState(120);
    const setIsLoginState = useSetRecoilState(el_loginState)
    const location = useLocation();
    const search = location?.search
    const updatedSearch = search.replace('?LoginRedirect=', '');
    const redirectMobileUrl = `${decodeURIComponent(updatedSearch)}`;


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
        if (!enterOTP.trim()) {
            errors.otp = 'Code is required';
            return;
        }

        LoginWithEmailAPI('', mobileNo, enterOTP, 'otp_mobile_login').then((response) => {
            if (response.Data.rd[0].stat === 1) {
                sessionStorage.setItem('LoginUser', true)
                setIsLoginState(true)
                sessionStorage.setItem('loginUserDetail', JSON.stringify(response.Data.rd[0]));
                sessionStorage.setItem('registerMobile', mobileNo);
                if(redirectMobileUrl){
                    navigation(redirectMobileUrl);
                }else{
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
                toast.success('OTP send Sucssessfully');
            } else {
                alert('Error..')
            }
        }).catch((err) => console.log(err))
    };

    return (
        <div className='el_LoginWithMobileCodeMain' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
            <ToastContainer />
            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div>
                <div className='el_LoginWithCodeMobielMain'>
                    <div className='el_LoginWithCodeMobielMainSubDiv'>
                        <p style={{
                            textAlign: 'center',
                            paddingBlock: '50px',
                            fontSize: '25px',
                            // fontFamily: 'PT Sans, sans-serif'
                        }}
                            className='AuthScreenMainTitle'
                        >Login With Code</p>
                        <p style={{
                            textAlign: 'center',
                            marginTop: '-70px',
                            fontSize: '15px',
                            color: '#7d7f85',
                            // fontFamily: 'FreightDispProBook-Regular,Times New Roman,serif'
                        }}
                            className='AuthScreenSubTitle'
                        >Last step! To secure your account, enter the code we just sent to {mobileNo}.</p>

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
                                onChange={(e) => handleInputChange(e, setEnterOTP, 'mobileNo')}
                                error={!!errors.otp}
                                helperText={errors.otp}
                            />

                            <button className='submitBtnForgot btn-bg-elvee' onClick={handleSubmit}>Login</button>
                            <p style={{ marginTop: '10px' }}>Didn't get the code ? {resendTimer === 0 ? <span style={{ fontWeight: 500, color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleResendCode}>Resend Code</span> : <span>Resend in {Math.floor(resendTimer / 60).toString().padStart(2, '0')}:{(resendTimer % 60).toString().padStart(2, '0')}</span>}</p>
                            <button className='submitBtnForgot '  style={{ marginTop: '10px', color: 'gray' ,marginBottom: '40px' }} onClick={() => navigation('/LoginOption')}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
