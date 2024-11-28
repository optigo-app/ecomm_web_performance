import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginWithMobileCode.modul.scss';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Footer from '../../Home/Footer/Footer';
import { proCat_CartCount, proCat_loginState, proCat_WishCount } from '../../../Recoil/atom';
import { ContimueWithMobileAPI } from '../../../../../../utils/API/Auth/ContimueWithMobileAPI';
import { ToastContainer, toast } from 'react-toastify';
import { LoginWithEmailAPI } from '../../../../../../utils/API/Auth/LoginWithEmailAPI';
import Cookies from 'js-cookie';
import { MetalTypeComboAPI } from '../../../../../../utils/API/Combo/MetalTypeComboAPI';
import { MetalColorCombo } from '../../../../../../utils/API/Combo/MetalColorCombo';
import { CurrencyComboAPI } from '../../../../../../utils/API/Combo/CurrencyComboAPI';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';


export default function LoginWithMobileCode() {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const [mobileNo, setMobileNo] = useState('');
    const [enterOTP, setEnterOTP] = useState('');
    const [resendTimer, setResendTimer] = useState(120);
    const setIsLoginState = useSetRecoilState(proCat_loginState)
    const location = useLocation();

    const [cartCountNum, setCartCountNum] = useRecoilState(proCat_CartCount)
    const [wishCountNum, setWishCountNum] = useRecoilState(proCat_WishCount)
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
                const visiterID = Cookies.get('visiterId');
                sessionStorage.setItem('registerMobile', mobileNo);
                console.log('responseresponse', response?.Data?.rd[0]?.Token);
                Cookies.set('userLoginCookie', response?.Data?.rd[0]?.Token, { path: "/", expires: 30 });
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

                if (redirectMobileUrl) {
                    navigation(redirectMobileUrl);
                } else {
                    navigation('/')
                    window.location.reload();
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
        <div className='proCat_loginmobileCodeMain'>
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
                        paddingBlock: '60px',
                        marginTop: '0px',
                        fontSize: '40px',
                        color: '#7d7f85',
                        fontFamily: 'FreightDispProBook-Regular,Times New Roman,serif'
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

                        <button className='submitBtnForgot btnColorProCat' onClick={handleSubmit}>Login</button>
                        <p style={{ marginTop: '10px' }}>Didn't get the code ? {resendTimer === 0 ? <span style={{ fontWeight: 500, color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleResendCode}>Resend Code</span> : <span>Resend in {Math.floor(resendTimer / 60).toString().padStart(2, '0')}:{(resendTimer % 60).toString().padStart(2, '0')}</span>}</p>
                        <Button className='pro_cancleForgot' style={{ marginTop: '10px', color: 'gray' }} onClick={() => navigation(cancelRedireactUrl)}>CANCEL</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
