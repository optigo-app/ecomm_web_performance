import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CryptoJS from 'crypto-js';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import './LoginWithEmail.modull.scss'
import { LoginWithEmailAPI } from '../../../../../../utils/API/Auth/LoginWithEmailAPI';
import { dt_CartCount, dt_loginState, dt_WishCount } from '../../../Recoil/atom';
import { ForgotPasswordEmailAPI } from '../../../../../../utils/API/Auth/ForgotPasswordEmailAPI';
import Footer from '../../Home/Footer/Footer';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { CurrencyComboAPI } from '../../../../../../utils/API/Combo/CurrencyComboAPI';
import { MetalColorCombo } from '../../../../../../utils/API/Combo/MetalColorCombo';
import { MetalTypeComboAPI } from '../../../../../../utils/API/Combo/MetalTypeComboAPI';
import Cookies from 'js-cookie';


export default function LoginWithEmail() {
    const [islogin, setIsLoginState] = useRecoilState(dt_loginState)
    const [email, setEmail] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const location = useLocation();
    const search = location?.search
    const updatedSearch = search.replace('?LoginRedirect=', '');
    const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
    const cancelRedireactUrl = `/LoginOption/${search}`;


    const [cartCountNum, setCartCountNum] = useRecoilState(dt_CartCount)
    const [wishCountNum, setWishCountNum] = useRecoilState(dt_WishCount)


    useEffect(() => {
        const storedEmail = location.state?.email;;
        if (storedEmail) setEmail(storedEmail);
    }, []);


    const handleInputChange = (e, setter, fieldName) => {
        const { value } = e.target;
        setter(value);
        if (fieldName === 'confirmPassword') {
            if (!value.trim()) {
                setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Password is required' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
            }
        }
    };
    const handleMouseDownConfirmPassword = (event) => {
        event?.preventDefault();
    };

    function hashPasswordSHA1(password) {
        const hashedPassword = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex);
        return hashedPassword;
    }

    const handleSubmit = async () => {
        const visiterId = Cookies.get('visiterId');
        if (!confirmPassword.trim()) {
            errors.confirmPassword = 'Password is required';
            return;
        }

        const hashedPassword = hashPasswordSHA1(confirmPassword);
        setIsLoading(true);
        LoginWithEmailAPI(email, '', hashedPassword, '', '', visiterId).then((response) => {
            setIsLoading(false);
            if (response.Data.rd[0].stat === 1) {
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

                // pdDataCalling()
                // designDataCall()
                // getCountFunc()
                // getDesignPriceList()

                // handelCurrencyData()
                // getAllProdData()
                // window.location.reload(); 
            } else {
                errors.confirmPassword = 'Password is Invalid'
            }
        }).catch((err) => console.log(err))
    };


    const handleTogglePasswordVisibility = (fieldName) => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleNavigation = () => {
        sessionStorage.setItem('LoginCodeEmail', true);
        navigation('/LoginWithEmailCode', { state: { email: location.state?.email } });
    }

    const handleForgotPassword = async () => {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        let Domian = `${window?.location?.protocol}//${storeInit?.domain}`
        setIsLoading(true);
        ForgotPasswordEmailAPI(Domian, email).then((response) => {
            setIsLoading(false);
            if (response.Data.rd[0].stat === 1) {
                toast.success('Reset Link Send On Your Email');
            } else {
                alert('Error')
            }
        }).catch((err) => console.log(err))

    }
    return (
        <div className='dt_loginWithEmail' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
            <ToastContainer />
            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div>
                <div className='dt_loginMaindv'>
                    <div className='dt_loginSubDiv'>
                        <p style={{
                            textAlign: 'center',
                            paddingTop: '50px',
                            margin: "0px",
                            fontSize: '25px',
                            fontFamily: 'PT Sans, sans-serif'
                        }}
                            className='AuthScreenMainTitle'
                        >Login With Password</p>
                        <p style={{
                            textAlign: 'center',
                            fontSize: '15px',
                            color: '#7d7f85',
                            fontFamily: 'PT Sans, sans-serif'
                        }}
                            className='AuthScreenSubTitle'
                        >using {email}</p>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TextField
                                autoFocus
                                id="outlined-confirm-password-input"
                                label="Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                value={confirmPassword}
                                onChange={(e) => handleInputChange(e, setConfirmPassword, 'confirmPassword')}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleSubmit();
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleTogglePasswordVisibility('confirmPassword')}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <button className='submitBtnForgot' onClick={handleSubmit}>Login</button>
                            <Button style={{ marginTop: '10px', color: 'gray' }} onClick={() => navigation('/LoginOption')}>CANCEL</Button>

                            <button type='submit' className='submitBtnForgot' onClick={handleNavigation}>Login With a Code instead on email</button>
                            <p style={{ textAlign: 'center' }}>Go passwordless! we'll send you an email.</p>

                            <p style={{ color: 'blue', cursor: 'pointer', marginBottom: '40px' }} onClick={handleForgotPassword}>Forgot Password ?</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
