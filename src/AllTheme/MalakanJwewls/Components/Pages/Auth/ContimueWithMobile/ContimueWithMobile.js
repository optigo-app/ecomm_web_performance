import React, { useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../../Home/Footer/Footer';
import { ContimueWithMobileAPI } from '../../../../../../utils/API/Auth/ContimueWithMobileAPI';
import './ContimueWithMobile.modul.scss'
import {MuiInputPlaceholder} from '../style'

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
    const cancelRedireactUrl = `/LoginOption/${search}`;

    const handleInputChange = (e, setter, fieldName) => {
        const { value } = e.target;
        const trimmedValue = value.trim();
        const formattedValue = trimmedValue.replace(/\s/g, '');

        setter(formattedValue);

        if (fieldName === 'mobileNo') {
            if (!formattedValue) {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Mobile No. is required' }));
            } else if (!/^\d{10}$/.test(formattedValue)) {
                setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Enter Valid mobile number' }));
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
            setErrors({ mobileNo: 'Mobile No. is required' });
            return;
        } else if (!/^\d{10}$/.test(mobileNo.trim())) {
            setErrors({ mobileNo: 'Enter Valid mobile number' });
            return;
        }

        // try {
        //     const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        //     const { FrontEnd_RegNo } = storeInit;
        //     const combinedValue = JSON.stringify({
        //         country_code: '91', mobile: `${mobileNo}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`
        //     });
        //     const encodedCombinedValue = btoa(combinedValue);
        //     const body = {
        //         "con": "{\"id\":\"\",\"mode\":\"WEBVALDNMOBILE\"}",
        //         "f": "continueWithMobile (handleSubmit)",
        //         p: encodedCombinedValue
        //     };

        //     const response = await CommonAPI(body);

        setIsSubmitting(true);
        setIsLoading(true);
        ContimueWithMobileAPI(mobileNo).then((response) => {
            setIsLoading(false);
            if (response.Data.Table1[0].stat === '1' && response.Data.Table1[0].islead === '1') {
                // toast.error('You are not a customer, contact to admin')
            } else if (response.Data.Table1[0].stat === '1' && response.Data.Table1[0].islead === '0') {
                // toast.success('OTP send Sucssessfully');
                navigation(redirectMobileUrl, { state: { mobileNo: mobileNo } });
                sessionStorage.setItem('registerMobile', mobileNo)
            } else {
                navigation(redirectSignUpUrl, { state: { mobileNo: mobileNo } });
                sessionStorage.setItem('registerMobile', mobileNo)
            }
        }).catch((err) => console.log(err))



        // } catch (error) {
        //     console.error('Error:', error);
        // } finally {
        //     setIsSubmitting(false);
        //     setIsLoading(false);
        // }
    };

    return (
        <div className='malan_continuMobile'>
            <ToastContainer />
            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
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
                    >Continue With Mobile</p>
                    <p style={{
                        textAlign: 'center',
                        margin: '0px',
                        fontSize: '15px',
                        color: '#fff',
                    }}
                        className='AuthScreenSubTitle'
                    >We'll check if you have an account, and help create one if you don't.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                        sx={MuiInputPlaceholder}
                            autoFocus
                            id="outlined-basic"
                            label="Enter Mobile No"
                            variant="outlined"
                            className='mala_loginmobileBox'
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
                        <Button style={{ marginTop: '10px', color: 'white',fontFamily:'Rowan1' }} onClick={() => navigation(cancelRedireactUrl)}>CANCEL</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
