import React, { useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './ContimueWithMobile.modul.scss'
import Footer from '../../Home/Footer/Footer';
import { ContimueWithMobileAPI } from '../../../../../../utils/API/Auth/ContimueWithMobileAPI';

export default function ContimueWithMobile() {
    const [mobileNo, setMobileNo] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [buttonFocused, setButtonFocused] = useState(false);
    const navigation = useNavigate();
    const location = useLocation();


    const search = location?.search
    const redirectMobileUrl = `/LoginWithMobileCode/${search}`;
    const redirectSignUpUrl = `/register/${search}`;
    const handleInputChange = (e, setter, fieldName) => {
        const { value } = e.target;
        const trimmedValue = value.trim();
        const formattedValue = trimmedValue.replace(/\s/g, '');

        setter(formattedValue);

        if (fieldName === 'mobileNo') {
            if (!value.trim()) {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Mobile Number is required' }));
            } else if (!/^\d+$/.test(value.trim())) {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Mobile Number must contain only numeric value' }));
            } else if (value?.trim()?.length !== 10) {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Mobile Number must be exactly 10 digits' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: '' }));
            }
        }
    };
    const handleSubmit = async () => {
        if (isSubmitting) {
            return;
        }

        if (!mobileNo.trim()) {
            setErrors({ mobileNo: 'Mobile No. is Required' });
            return;
        } else if (!/^\d{10}$/.test(mobileNo.trim())) {
            setErrors({ mobileNo: 'Enter Valid Mobile Number' });
            return;
        }

        setIsSubmitting(true);
        setIsLoading(true);
        ContimueWithMobileAPI(mobileNo).then((response) => {
            setIsLoading(false);
            if (response.Data.Table1[0].stat === '1' && response.Data.Table1[0].islead === '1') {
                toast.error('You are not a customer, contact to admin')
            } else if (response.Data.Table1[0].stat === '1' && response.Data.Table1[0].islead === '0') {
                toast.success('OTP send Sucssessfully');
                navigation(redirectMobileUrl, { state: { mobileNo: mobileNo } });
                sessionStorage.setItem('registerMobile', mobileNo)
            } else {
                navigation(redirectSignUpUrl, { state: { mobileNo: mobileNo } });
                sessionStorage.setItem('registerMobile', mobileNo)
            }
        }).catch((err) => console.log(err))

    };

    return (
        <div className='dt_continueMobile' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
            <ToastContainer />
            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div>
                <div className='smling-forgot-main-Color'>
                    <div className='smling-forgot-main'>
                        <p style={{
                            textAlign: 'center',
                            paddingBlock: '50px',
                            fontSize: '25px',
                            fontFamily: 'PT Sans, sans-serif'
                        }}
                            className='AuthScreenMainTitle'
                        >Continue With Mobile</p>
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
                                label="Enter Mobile No"
                                variant="outlined"
                                className='labgrowRegister'
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleSubmit();
                                    }
                                }}
                                style={{ margin: '15px' }}
                                value={mobileNo}
                                onChange={(e) => handleInputChange(e, setMobileNo, 'mobileNo')}
                                error={!!errors.mobileNo}
                                helperText={errors.mobileNo}
                            />

                            <button className='submitBtnForgot' onClick={handleSubmit}>
                                SUBMIT
                            </button>
                            <Button style={{ marginTop: '10px', color: 'gray', marginBottom: '50px' }} onClick={() => navigation('/LoginOption')}>CANCEL</Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}