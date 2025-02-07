import React, { useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../Home/Footer/Footer';
import { ContimueWithMobileAPI } from '../../../../../../utils/API/Auth/ContimueWithMobileAPI';
import './ContimueWithMobile.modul.scss'
import OTPContainer from '../../../../../../utils/Glob_Functions/Otpflow/App';
import ContinueMobile from '../../../../../../utils/Glob_Functions/CountryDropDown/ContinueMobile';

export default function ContimueWithMobile() {
    const [mobileNo, setMobileNo] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [buttonFocused, setButtonFocused] = useState(false);
    const navigation = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false)


    const search = location?.search
    const redirectMobileUrl = `/LoginWithMobileCode/${search}`;
    const redirectSignUpUrl = `/register/${search}`;
    const cancelRedireactUrl = `/LoginOption/${search}`;

    const handleInputChange = (e, setter, fieldName) => {
        const { value } = e.target;
        const trimmedValue = value.trim();
        const formattedValue = trimmedValue.replace(/\s/g, '');

        setter(formattedValue);

        // if (fieldName === 'mobileNo') {
        //     if (!formattedValue) {
        //         setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Mobile No. is required' }));
        //     } else if (!/^\d{10}$/.test(formattedValue)) {
        //         setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Enter Valid mobile number' }));
        //     } else {
        //         setErrors(prevErrors => ({ ...prevErrors, mobileNo: '' }));
        //     }
        // }
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
                toast.error('You are not a customer, contact to admin')
        setIsSubmitting(false);
            } else if (response.Data.Table1[0].stat === '1' && response.Data.Table1[0].islead === '0') {
                toast.success('OTP send Sucssessfully');
                navigation(redirectMobileUrl, { state: { mobileNo: mobileNo } });
                sessionStorage.setItem('registerMobile', mobileNo)
        setIsSubmitting(false);
            } else {
                setIsOpen(true)
                // navigation(redirectSignUpUrl, { state: { mobileNo: mobileNo } });
                sessionStorage.setItem('registerMobile', mobileNo)
        setIsSubmitting(false);
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
        <div className='proCat_continuMobile'>
            {isLoading && (
                <div className="loader-overlay" style={{zIndex:99999999}}>
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div>
                <OTPContainer mobileNo={mobileNo.trim()} isOpen={isOpen} type='mobile' setIsOpen={() => setIsOpen(!isOpen)} onClose={() => setIsOpen(false)}
                    navigation={navigation}
                    location={location}
                    onResend={handleSubmit}
                />
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
                    >Continue With Mobile</p>
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
                        {/* <TextField
                            autoFocus
                            id="outlined-basic"
                            label="Enter Mobile No"
                            variant="outlined"
                            className='smr_loginmobileBox'
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
                        /> */}
                        <ContinueMobile
                            Errors={errors}
                            mobileNo={mobileNo}
                            setErrors={setErrors}
                            handleInputChange={handleInputChange}
                            setMobileNo={setMobileNo}
                        />

                        <button className='submitBtnForgot btnColorProCat' onClick={handleSubmit}>
                            SUBMIT
                        </button>
                        <Button className='pro_cancleForgot' style={{ marginTop: '10px', color: 'gray' }} onClick={() => navigation(cancelRedireactUrl)}>CANCEL</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
