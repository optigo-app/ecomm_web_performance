import React, { useState } from 'react';
import './ContinueWithEmail.modul.scss';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
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
    const cancelRedireactUrl = `/LoginOption/${search}`;

    // const validateEmail = (email) => {
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
            console.log('response: ', response);
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
        <div className='el_ContinueEmailMain' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
            <ToastContainer style={{ zIndex: '11111111111' }} />

            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div className='el_continu_div'>
                <div className='el_continu_subDiv'>
                    <p style={{
                        textAlign: 'center',
                        paddingBlock: '50px',
                        fontSize: '25px',
                        // fontFamily: 'PT Sans, sans-serif'
                    }}
                        className='AuthScreenMainTitle'
                    >Continue With Email</p>
                    <p style={{
                        textAlign: 'center',
                        marginTop: '-70px',
                        fontSize: '15px',
                        // color: '#7d7f85',
                        // fontFamily: 'PT Sans, sans-serif'
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

                        <button type='submit' className='submitBtnForgot btn-bg-elvee' onClick={handleSubmit}>SUBMIT</button>
                        <button className='submitBtnForgot ' onClick={() => navigation(cancelRedireactUrl)}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
