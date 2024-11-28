import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CryptoJS from 'crypto-js';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import './LoginWithEmail.modul.scss'
import { LoginWithEmailAPI } from '../../../../../../utils/API/Auth/LoginWithEmailAPI';
import { ForgotPasswordEmailAPI } from '../../../../../../utils/API/Auth/ForgotPasswordEmailAPI';
import { el_loginState } from '../../../Recoil/atom';

export default function LoginWithEmail() {
    const [email, setEmail] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const location = useLocation();
    const [islogin, setIsLoginState] = useRecoilState(el_loginState)
    const search = location?.search
    const updatedSearch = search.replace('?LoginRedirect=', '');
    const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
    const cancelRedireactUrl = `/LoginOption/${search}`;



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
        if (!confirmPassword.trim()) {
            errors.confirmPassword = 'Password is required';
            return;
        }

        const hashedPassword = hashPasswordSHA1(confirmPassword);
        setIsLoading(true);
        LoginWithEmailAPI(email, '', hashedPassword, '', '').then((response) => {
            setIsLoading(false);
            if (response.Data.rd[0].stat === 1) {
                sessionStorage.setItem('registerEmail', email)
                setIsLoginState(true)
                sessionStorage.setItem('LoginUser', true)
                sessionStorage.setItem('loginUserDetail', JSON.stringify(response.Data.rd[0]));

                if (redirectEmailUrl) {
                    window.location.href = `${redirectEmailUrl}`;
                } else {
                    window.location.href = '/'
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
        sessionStorage.setItem('LoginCodeEmail', 'true');
        navigation('/LoginWithEmailCode', { state: { email: location.state?.email } });
    }

    const handleForgotPassword = async () => {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        let Domian = `${window.location.protocol}//${window.location.hostname}`
        // let Domian = `https://${storeInit?.domain}`
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
        <div className='el_LoginMain' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
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
                            marginBlock: '10px',
                            fontSize: '25px',
                            // fontFamily: 'PT Sans, sans-serif'
                        }}
                            className='AuthScreenMainTitle'
                        >Login With Password</p>
                        <p style={{
                            textAlign: 'center',
                            marginTop: '-60px',
                            fontSize: '15px',
                            color: '#7d7f85',
                            // fontFamily: 'PT Sans, sans-serif'
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

                            <button className='submitBtnForgot btn-bg-elvee' onClick={handleSubmit}>Login</button>

                            <button type='submit' className='submitBtnForgot' onClick={handleNavigation}>Login With a Code instead on email</button>
                            <p style={{ textAlign: 'center', marginTop: '1rem' }}>Go passwordless! we'll send you an email.</p>

                            <p style={{ color: 'blue', cursor: 'pointer', marginBottom: '12px' }} onClick={handleForgotPassword}>Forgot Password ?</p>
                            <button className='submitBtnForgot ' onClick={() => navigation('/LoginOption')}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
