import React, { useState } from 'react';
import './ContinueWithEmail.modul.scss';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Footer from '../../Home/Footer/Footer';
import { ContinueWithEmailAPI } from '../../../../../../utils/API/Auth/ContinueWithEmailAPI';

export default function ContinueWithEmail() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const location = useLocation();
    const search = location?.search
    const redirectEmailUrl = `/LoginWithEmail/${search}`;
    const redirectSignUpUrl = `/register/${search}`;

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
            setEmailError('Email Is Required.');
        } else if (!validateEmail(trimmedValue)) {
            setEmailError('Please Enter A Valid Email');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async () => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setEmailError('Email Is Required.');
            return;
        }
        if (!validateEmail(trimmedEmail)) {
            setEmailError('Please Enter A Valid Email.');
            return;
        }
        setIsLoading(true);
        ContinueWithEmailAPI(trimmedEmail).then((response) => {
            setIsLoading(false);
            if (response.Data.rd[0].stat == 1 && response.Data.rd[0].islead == 1) {
                toast.error('You are not a customer, contact to admin')
            } else if (response.Data.rd[0].stat == 1 && response.Data.rd[0].islead == 0) {
                navigation(redirectEmailUrl, { state: { email: trimmedEmail } });
                if (trimmedEmail) {
                    sessionStorage.setItem("registerEmail", trimmedEmail);
                }
            } else {
                navigation(redirectSignUpUrl, { state: { email: trimmedEmail } });
            }
        }).catch((err) => console.log(err))
    };

    return (
        <div className='dt_continueEmail' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
            <ToastContainer style={{zIndex: '11111111111'}}/>

            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
     
            <div className='smling-forgot-main-Color'>
                <div className='smling-forgot-main'>
                    <p style={{
                        textAlign: 'center',
                        paddingBlock: '50px',
                        fontSize: '25px',
                        fontFamily: 'PT Sans, sans-serif'
                    }}
                        className='AuthScreenMainTitle'
                    >Continue With Email</p>
                    <p style={{
                        textAlign: 'center',
                        marginTop: '-70px',
                        fontSize: '15px',
                        // color: '#7d7f85',
                        fontFamily: 'PT Sans, sans-serif'
                    }}

                        className='AuthScreenSubTitle'
                    >We'll check if you have an account, and help create one if you don't.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            autoFocus
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            className='labGrowForgot'
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

                        <button type='submit' className='submitBtnForgot' onClick={handleSubmit}>SUBMIT</button>
                        <Button style={{ marginTop: '10px', color: 'gray', marginBottom: '50px' }} onClick={() => navigation('/LoginOption')}>CANCEL</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
