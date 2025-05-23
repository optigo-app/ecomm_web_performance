import React, { useEffect, useState } from 'react';
import './ContinueWithEmail.modul.scss';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../Home/Footer/Footer';
import { ContinueWithEmailAPI } from '../../../../../../utils/API/Auth/ContinueWithEmailAPI';
import OTPContainer from '../../../../../../utils/Glob_Functions/Otpflow/App';

export default function ContinueWithEmail() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [storeInit, setStoreInit] = useState({});
    const navigation = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false)
    const search = location?.search
    const state = location?.state?.SecurityKey ? location?.state : "";
    const redirectEmailUrl = `/LoginWithEmail/${search}`;
    const redirectSignUpUrl = `/register/${search}`;
    const cancelRedireactUrl = `/LoginOption/${search}`;

    useEffect(() => {
        setStoreInit(JSON.parse(sessionStorage.getItem('storeInit')));
    }, [])

    // const validateEmail = (email) => {
    //     const regex = /^[a-zA-Z][\w@$&#]*@[a-zA-Z]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
    //     return regex.test(email);
    // };

    const validateEmail = (email) => {
        // const regex = /^[a-zA-Z][\w@$&#]*@[a-zA-Z]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (event) => {
        const { value } = event.target;
        const trimmedValue = value.trim();
        setEmail(trimmedValue);
        if (!trimmedValue) {
            setEmailError('Email is required.');
        } else if (!validateEmail(trimmedValue)) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async () => {
        const trimmedEmail = email.trim();
        const encodedKeyFromStorage = JSON.parse(sessionStorage.getItem("keylogs"));
        const getSecKey = encodedKeyFromStorage ? decodeURIComponent(atob(encodedKeyFromStorage)) : "";
        const SecurityKey = location?.state?.SecurityKey ?? getSecKey;
        if (!trimmedEmail) {
            setEmailError('Email is required.');
            return;
        }
        if (!validateEmail(trimmedEmail)) {
            setEmailError('Please enter a valid email.');
            return;
        }

        setIsLoading(true);
        ContinueWithEmailAPI(trimmedEmail).then((response) => {
            setIsLoading(false);
            if (response.Data.rd[0].stat == 1 && response.Data.rd[0].islead == 1) {
                toast.error('You are not a customer, contact to admin')
            } else if (response.Data.rd[0].stat == 1 && response.Data.rd[0].islead == 0) {
                navigation(redirectEmailUrl, {
                    state: {
                        email: trimmedEmail,
                        SecurityKey: SecurityKey
                    }
                });
                if (trimmedEmail) {
                    sessionStorage.setItem("registerEmail", trimmedEmail);
                }
            } else {
                if (storeInit?.IsEcomOtpVerification != 0) {
                    if (process.env.NODE_ENV === "development") {
                        alert(response.Data.rd[0].OTP)
                    }
                    setIsOpen(true)
                } else {
                    navigation(redirectSignUpUrl, { state: { email: trimmedEmail, SecurityKey: SecurityKey } });
                }
            }
        }).catch((err) => console.log(err))


        // const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        // const { FrontEnd_RegNo } = storeInit;

        // const combinedValue = JSON.stringify({
        //     userid: `${(trimmedEmail).toLocaleLowerCase()}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`
        // });
        // const encodedCombinedValue = btoa(combinedValue);
        // const body = {
        //     "con": "{\"id\":\"\",\"mode\":\"WEBVALDNEMAIL\"}",
        //     "f": "emilValid (handleEmail)",
        //     p: encodedCombinedValue
        // };
        // const response = await CommonAPI(body);
        // console.log('ressssssss', response);
        // if (response.Data.rd[0].stat == 1 && response.Data.rd[0].islead == 1) {
        //     toast.error('You are not a customer, contact to admin')
        // } else if (response.Data.rd[0].stat == 1 && response.Data.rd[0].islead == 0) {
        //     navigation('/LoginWithEmail', { state: { email: trimmedEmail } });
        //     if (trimmedEmail) {
        //         sessionStorage.setItem("userEmailForPdList", trimmedEmail);
        //     }
        // } else {
        //     navigation('/register', { state: { email: trimmedEmail } });
        // }

        // setIsLoading(false);
    };

    useEffect(() => {
        sessionStorage.removeItem("Countrycodestate")
    }, [])


    return (
        <div className='proCat_continuemail'>
            {isLoading && (
                <div className="loader-overlay" style={{ zIndex: 99999999 }}>
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div>
                {(storeInit?.IsEcomOtpVerification && storeInit?.IsEcomOtpVerification === 1) ? (
                    <OTPContainer emailId={email.trim()} isOpen={isOpen} type='email' setIsOpen={() => setIsOpen(!isOpen)} onClose={() => setIsOpen(false)}
                        navigation={navigation}
                        location={location}
                        onResend={handleSubmit}
                        isLoading={isLoading}
                    />
                ) : null}
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
                    >Continue With Email</p>
                    <p style={{
                        textAlign: 'center',
                        marginTop: '-60px',
                        fontSize: '15px',
                        color: '#7d7f85',
                        fontFamily: 'FreightDispProBook-Regular,Times New Roman,serif'
                    }}

                        className='AuthScreenSubTitle'
                    >We'll check if you have an account, and help create one if you don't.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            autoFocus
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            className='smr_continuEmailBox'
                            style={{ margin: '15px' }}
                            value={email}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                            onChange={handleEmailChange}
                            error={!!emailError}
                            helperText={emailError}
                        />

                        {/* <button
                            className={`submitBtnForgot ${buttonFocused ? 'focused' : ''}`}
                            onClick={handleSubmit}
                            onFocus={() => setButtonFocused(true)}
                            onBlur={() => setButtonFocused(false)}
                            style={{borderColor: 'red'}}
                        >

                        </button> */}

                        <button type='submit' className='submitBtnForgot btnColorProCat' onClick={handleSubmit}>SUBMIT</button>
                        <Button className='pro_cancleForgot' style={{ marginTop: '10px', color: 'gray' }} onClick={() => navigation(cancelRedireactUrl, { state })}>CANCEL</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
