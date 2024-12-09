import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginWithEmailCode.modul.scss';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../../Home/Footer/Footer';
import { LoginWithEmailCodeAPI } from '../../../../../../utils/API/Auth/LoginWithEmailCodeAPI';
import { LoginWithEmailAPI } from '../../../../../../utils/API/Auth/LoginWithEmailAPI';
import { dt_CartCount, dt_loginState, dt_WishCount } from '../../../Recoil/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { CurrencyComboAPI } from '../../../../../../utils/API/Combo/CurrencyComboAPI';
import { MetalColorCombo } from '../../../../../../utils/API/Combo/MetalColorCombo';
import { MetalTypeComboAPI } from '../../../../../../utils/API/Combo/MetalTypeComboAPI';
import Cookies from 'js-cookie';

export default function LoginWithEmailCode() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const [mobileNo, setMobileNo] = useState('');
    const [resendTimer, setResendTimer] = useState(120);


    const setIsLoginState = useSetRecoilState(dt_loginState)
    const location = useLocation();

    const search = location?.search
    const updatedSearch = search.replace('?LoginRedirect=', '');
    const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
    const cancelRedireactUrl = `/LoginOption/${search}`;

    const [cartCountNum, setCartCountNum] = useRecoilState(dt_CartCount)
    const [wishCountNum, setWishCountNum] = useRecoilState(dt_WishCount)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedEmail = sessionStorage.getItem('registerEmail');
                const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
                if (storedEmail) {
                    setEmail(storedEmail);
                    const value = sessionStorage.getItem('LoginCodeEmail');
                    if (value == 'true') {
                        sessionStorage.setItem('LoginCodeEmail', false);
                        LoginWithEmailCodeAPI(storedEmail).then((response) => {
                            if (response.Data.Table1[0].stat === '1') {
                                toast.success('OTP send Sucssessfully');
                            } else {
                                toast.error('OTP send Error');
                            }
                        }).catch((err) => console.log(err))
                    }
                }
            } catch (error) {
                console.error('Error:', error);
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

    // const handleResendTimer = () => {
    //     const interval = setInterval(() => {
    //         setResendTimer(prevTimer => {
    //             if (prevTimer === 0) {
    //                 clearInterval(interval);
    //                 return 0;
    //             }
    //             return prevTimer - 1;
    //         });
    //     }, 1000);
    // };

    const handleInputChange = (e, setter, fieldName) => {
        const { value } = e.target;
        setter(value);
        if (fieldName === 'mobileNo') {
            if (!value.trim()) {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Code is required' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: '' }));
            }
        }
    };

    const handleSubmit = async () => {
        const visiterId = Cookies.get('visiterId');
        if (!mobileNo.trim()) {
            errors.mobileNo = 'Password is required';
            return;
        }

        setIsLoading(true);
        LoginWithEmailAPI(email, '', mobileNo, 'otp_email_login', '', visiterId).then((response) => {
            setIsLoading(false);
            if (response?.Data?.rd[0]?.stat === 1) {
                const visiterID = Cookies.get('visiterId');
                sessionStorage.setItem('registerEmail', email)
                Cookies.set('userLoginCookie', response?.Data?.rd[0]?.Token);
                setIsLoginState(true)
                sessionStorage.setItem('LoginUser', true)
                sessionStorage.setItem('loginUserDetail', JSON.stringify(response.Data.rd[0]));


                GetCountAPI(visiterID).then((res) => {
                    if (res) {
                        setCartCountNum(res?.cartcount)
                        setWishCountNum(res?.wishcount)
                    }
                }).catch((err) => {
                    if (err) {
                        console.log("getCountApiErr", err);
                    }
                })

                CurrencyComboAPI(response?.Data?.rd[0]?.id).then((response) => {
                    if (response?.Data?.rd) {
                        let data = JSON.stringify(response?.Data?.rd)
                        sessionStorage.setItem('CurrencyCombo', data)
                    }
                }).catch((err) => console.log(err))


                MetalColorCombo(response?.Data?.rd[0]?.id).then((response) => {
                    if (response?.Data?.rd) {
                        let data = JSON.stringify(response?.Data?.rd)
                        sessionStorage.setItem('MetalColorCombo', data)
                    }
                }).catch((err) => console.log(err))


                MetalTypeComboAPI(response?.Data?.rd[0]?.id).then((response) => {
                    if (response?.Data?.rd) {
                        let data = JSON.stringify(response?.Data?.rd)
                        sessionStorage.setItem('metalTypeCombo', data)
                    }
                }).catch((err) => console.log(err))

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
                sessionStorage.setItem('LoginCodeEmail', false);
                toast.success('OTP send Sucssessfully');
            } else {
                toast.error('OTP send Error');
            }
        }).catch((err) => console.log(err))
    };

    return (
        <div className='dt_loginWithEmailCodeMain' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
            <ToastContainer />
            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div>

                <div className='dt_loginEmailMainDiv'>
                    <div className='dt_loginEmailCodeSubDiv'>
                        <p style={{
                            textAlign: 'center',
                            paddingBlock: '60px',
                            fontSize: '25px',
                            fontFamily: 'PT Sans, sans-serif'
                        }}
                            className='AuthScreenMainTitle'
                        >Login With Code</p>
                        <p style={{
                            textAlign: 'center',
                            marginTop: '-80px',
                            fontSize: '15px',
                            color: '#7d7f85',
                            fontFamily: 'FreightDispProBook-Regular,Times New Roman,serif'
                        }}
                            className='AuthScreenSubTitle'
                        >Last step! To secure your account, enter the code we just sent to {email}.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                            <TextField
                                autoFocus
                                id="outlined-basic"
                                label="Enter Code"
                                variant="outlined"
                                className='dt_LoginEmailCode_labgrowRegister'
                                style={{ margin: '15px' }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleSubmit();
                                    }
                                }}
                                value={mobileNo}
                                onChange={(e) => handleInputChange(e, setMobileNo, 'mobileNo')}
                                error={!!errors.mobileNo}
                                helperText={errors.mobileNo}
                            />

                            <button className='submitBtnForgot' onClick={handleSubmit}>Login</button>
                            <p style={{ marginTop: '10px' }}>Didn't get the code ? {resendTimer === 0 ? <span style={{ fontWeight: 500, color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleResendCode}>Resend Code</span> : <span>Resend in {Math.floor(resendTimer / 60).toString().padStart(2, '0')}:{(resendTimer % 60).toString().padStart(2, '0')}</span>}</p>
                            <Button style={{ marginTop: '10px', color: 'gray', marginBottom: '40px' }} onClick={() => navigation('/LoginOption')}>CANCEL</Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
