import React, { useState } from 'react'
import './ContactUs.modul.scss'
import { toast } from 'react-toastify'
import Footer from '../../Home/Footer/Footer';
import { CommonAPI } from '../../../../../../utils/API/CommonAPI/CommonAPI';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactUs() {
    const [activeTab, setActiveTab] = useState('M1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        emailAddress: '',
        phoneNumber: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.fullName) {
            errors.fullName = 'Please enter your full name';
        }
        if (!formData.companyName) {
            errors.companyName = 'Please enter your company name';
        }
        if (!formData.emailAddress) {
            errors.emailAddress = 'Please enter your email address';
        } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
            errors.emailAddress = 'Please enter a valid email address';
        }
        if (!formData.phoneNumber) {
            errors.phoneNumber = 'Please enter your phone number';
        }
        if (!formData.subject) {
            errors.subject = 'Please enter the subject';
        }
        if (!formData.message) {
            errors.message = 'Please enter your message';
        }

        if (Object.keys(errors).length === 0) {
            const combinedValue = JSON.stringify({
                companyname: `${formData?.companyName}`, subject: `${formData?.subject}`, fullname: `${formData?.fullName}`, emailid: `${(formData?.emailAddress).toLocaleLowerCase()}`, mobileno: `${formData?.phoneNumber}`, message: `${formData?.message}`
            });
            const encodedCombinedValue = btoa(combinedValue);
            const body = {
                "con": "{\"id\":\"\",\"mode\":\"CONTACTUS\"}",
                "f": "CONTACTUS (handlesubmit)",
                p: encodedCombinedValue
            };
            const response = await CommonAPI(body);
            if (response) {
                toast.success("Got it! We've received your query. We'll be in touch shortly.")
            }
            setFormData({
                fullName: '',
                companyName: '',
                emailAddress: '',
                phoneNumber: '',
                subject: '',
                message: ''
            });
        } else {
            setErrors(errors);
        }
    };


    return (
        <div className='proCat_contactMain' >
            <div className='Fo-contactMain'>
                <div>
                    <p style={{ fontSize: '40px', margin: '0px', paddingTop: '30px', textAlign: 'center', fontFamily: 'FreightDispProBook-Regular,Times New Roman,serif' }}>Contact Us</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p style={{ width: '300px', textAlign: 'center', fontSize: '15px' }}>Have a comment, suggestion or queestion? Feel free to reach out to us and we’ll getback to you as soon as possible.</p>
                    </div>
                    <div className='Fo-contactBoxMain'>
                        <div className='Fo-contactBox1'>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <p className='Fo-contactBox1Title'>FULL NAME</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='fullName'
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                    {errors.fullName && <p className='error'>{errors.fullName}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>COMPANY NAME</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='companyName'
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                    {errors.companyName && <p className='error'>{errors.companyName}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>EMAIL ADDRESS</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='emailAddress'
                                        value={formData.emailAddress}
                                        onChange={handleChange}
                                    />
                                    {errors.emailAddress && <p className='error'>{errors.emailAddress}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>PHONE NUMBER</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='phoneNumber'
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                    {errors.phoneNumber && <p className='error'>{errors.phoneNumber}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>SUBJECT</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='subject'
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                    {errors.subject && <p className='error'>{errors.subject}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>MESSAGE</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='message'
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                    {errors.message && <p className='error'>{errors.message}</p>}
                                </div>
                                <button type="submit" className='Fo-contactBox1BtnSub'>SUBMIT</button>
                            </form>
                        </div>
                        <div className='Fo-contactBox2'>
                            {/* <p className='Fo-contactBox2Title'>Have questions?</p>

                            <p style={{
                                fontSize: '15px',
                                fontWeight: 600
                            }}>General inquiries<span style={{
                                fontWeight: 400,
                                fontSize: '13px'
                            }}></span></p>

                            <p style={{
                                fontSize: '15px',
                                fontWeight: 600
                            }}>Customer inquiries<span tyle={{
                                fontWeight: 400,
                                fontSize: '13px'
                            }}></span></p>

                            <p style={{
                                fontSize: '15px',
                                fontWeight: 600
                            }}>Orders & Returns<spna tyle={{
                                fontWeight: 400,
                                fontSize: '13px'
                            }}></spna></p>

                            <p className='Fo-contactBox2Desc'>If you are looking for instant answers, check out our FAQ page for more information!</p>
                            <p className='Fo-contactBox2Title'>Orders & Returns</p>
                            <p className='Fo-contactBox2Desc'>Check out our FAQ page or our Orders & Retuns page</p>
                            <p className='Fo-contactBox2Title'>Call us at xxx-xxx-xxxx</p> */}
                            {/* <p className='Fo-contactBox2Desc'>Our customer service team is available by phone from Monday-Friday 9.30am-6:30pm EST and Saturday 10am-5pm EST.</p>
                            <p className='Fo-contactBox2Desc'>Our office is located at 33W 46th Str, STE#9W, New York, NY 10036</p> */}

                            <div>
                                <div className="tab-buttons">
                                    <button className={activeTab === 'M1' ? 'active' : ''} onClick={() => handleTabClick('M1')}>Main Office Address</button>
                                    {/* <button className={activeTab === 'M3' ? 'active' : ''} onClick={() => handleTabClick('M3')}>Head Office Address</button> */}
                                </div>
                                <div className="address">
                                    {/* {activeTab === 'M1' && (
                                        <div>
                                            <p>Kayra Creation Limited</p>
                                            <p>408, 4th floor, Heng Ngai Jewellery Ctr, 4 Hok Yuen St, Hunghom,</p>
                                            <p>Kowloon-999077, Hong Kong- China</p>
                                            <p>+852-52482000</p>
                                            <p>sales@kayracreation.com</p>
                                        </div>
                                    )} */}
                                    {/* {activeTab === 'M3' && (
                                        <div>
                                            <p>Find Us - Locate us on Map</p>
                                            <p>Kayra Creation Limited</p>
                                            <p>408, 4th floor, Heng Ngai Jewellery Ctr, 4 Hok Yuen St, Hunghom,</p>
                                            <p>Kowloon-999077, Hong Kong- China</p>
                                            <p>+852-52482000</p>
                                            <p>sales@kayracreation.com</p>
                                        </div>
                                    )} */}
                                    <div className="map-container">

                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1384097684245!2d114.18683082602243!3d22.31060459252037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400df5b194c91%3A0x3301447411e931be!2sHeng%20Ngai%20Jewelry%20Centre!5e0!3m2!1sen!2sin!4v1716036679521!5m2!1sen!2sin"
                                            width="600"
                                            height="450"
                                            allowfullscreen=""
                                            loading="lazy"
                                            referrerpolicy="no-referrer-when-downgrade"
                                            className='mapContact'
                                        >

                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
