import React, { useEffect, useState } from 'react'
import './ContactUs.modul.scss'
import { toast } from 'react-toastify'
import { CommonAPI } from '../../../../../../utils/API/CommonAPI/CommonAPI';
import Footer from '../../Home/Footer/Footer';
import { BespokeAPI } from '../../../../../../utils/API/Bespoke/BespokeAPI';

export default function ContactUs() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        FullName: '',
        EmailId: '',
        mobileno: '',
        InQuirySubject: '',
        Be_In_Message: '',
        Themeno: '2'
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
        if (!formData.FullName) {
            errors.FullName = 'Please enter your full name';
        }
        // if (!formData.InQuiryCompanyName) {
        //     errors.InQuiryCompanyName = 'Please enter your company name';
        // }
        if (!formData.EmailId) {
            errors.EmailId = 'Please enter your email address';
        } else if (!/\S+@\S+\.\S+/.test(formData.EmailId)) {
            errors.EmailId = 'Please enter a valid email address';
        }
        if (!formData.mobileno) {
            errors.mobileno = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.mobileno)) {
            errors.mobileno = 'Phone must be a 10-digit number';
        }
        if (!formData.InQuirySubject) {
            errors.InQuirySubject = 'Please enter the subject';
        }
        if (!formData.Be_In_Message) {
            errors.Be_In_Message = 'Please enter your message';
        }

        if (Object.keys(errors).length === 0) {
            console.log('formData: ', formData);
            setLoading(true);
            await BespokeAPI(formData).then((res) => {
                if (res?.stat_msg === 'success') {
                    toast.success("Got it! We've received your query. We'll be in touch shortly.")
                    setLoading(false);
                    window.scroll({
                        top: 0,
                        behavior: "smooth",
                    });
                } else {
                    toast.error("Something went wrong");
                    setLoading(false);
                    window.scroll({
                        top: 0,
                        behavior: "smooth",
                    });
                }
            })
            setFormData({
                FullName: '',
                InQuiryCompanyName: '',
                EmailId: '',
                mobileno: '',
                InQuirySubject: '',
                Be_In_Message: '',
                Themeno: '2'
            });
        } else {
            setErrors(errors);
        }
    };
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
        scrollToTop();
    }, []);

    return (
        <div style={{
            // paddingTop: '110px'
        }} className='dt_contacus_main'>
            <div>
                <div className='dt_MainTitle_contactUs' style={{ marginBlock: '20px' }}>
                    <p style={{ fontSize: '40px', textAlign: 'center', fontFamily: 'FreightDispProBook-Regular,Times New Roman,serif' }}>Contact Us</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p style={{ width: '300px', textAlign: 'center', fontSize: '15px' }}>Have a comment, suggestion or queestion? Feel free to reach out to us and we’ll getback to you as soon as possible.</p>
                    </div>
                </div>

                <div className='dt_Sub_contactMain'>
                    <div className='dt_contactBoxMain'>
                        {/* <div className='Fo-contactBox1'>
                            <div>
                                <p className='Fo-contactBox1Title'>FULL NAME</p>
                                <input type='text' className='dt_contactBox1InputBox' />
                            </div>
                            <div style={{ marginTop: '25px' }}>
                                <p className='Fo-contactBox1Title'>COMPANY NAME</p>
                                <input type='text' className='dt_contactBox1InputBox' />
                            </div>
                            <div style={{ marginTop: '25px' }}>
                                <p className='Fo-contactBox1Title'>EMAIL ADDRESS</p>
                                <input type='text' className='dt_contactBox1InputBox' />
                            </div>
                            <div style={{ marginTop: '25px' }}>
                                <p className='Fo-contactBox1Title'>PHONE NUMBER</p>
                                <input type='text' className='dt_contactBox1InputBox' />
                            </div>
                            <div style={{ marginTop: '25px' }}>
                                <p className='Fo-contactBox1Title'>SUBJECT</p>
                                <input type='text' className='dt_contactBox1InputBox' />
                            </div>
                            <div style={{ marginTop: '25px' }}>
                                <p className='Fo-contactBox1Title'>MESSAGE</p>
                                <input type='text' className='dt_contactBox1InputBox' />
                            </div>
                            <button className='Fo-contactBox1BtnSub'>SUBMIT</button>
                        </div> */}
                        <div className='dt_Fo_contactBox1'>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <div className='dt_ContactMobile_ShowDiv'>
                                    <p className='Fo-contactBox1Title'>FULL NAME</p>
                                    <input
                                        type='text'
                                        className='dt_contactBox1InputBox'
                                        name='FullName'
                                        value={formData.FullName}
                                        onChange={handleChange}
                                    />
                                    {errors.FullName && <p className='error'>{errors.FullName}</p>}
                                </div>
                                {/* <div className='dt_ContactMobile_ShowDiv' style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>COMPANY NAME</p>
                                    <input
                                        type='text'
                                        className='dt_contactBox1InputBox'
                                        name='companyName'
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                    {errors.companyName && <p className='error'>{errors.companyName}</p>}
                                </div> */}
                                <div className='dt_ContactMobile_ShowDiv' style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>EMAIL ADDRESS</p>
                                    <input
                                        type='text'
                                        className='dt_contactBox1InputBox'
                                        name='EmailId'
                                        value={formData.EmailId}
                                        onChange={handleChange}
                                    />
                                    {errors.EmailId && <p className='error'>{errors.EmailId}</p>}
                                </div>
                                <div className='dt_ContactMobile_ShowDiv' style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>PHONE NUMBER</p>
                                    <input
                                        type='text'
                                        className='dt_contactBox1InputBox'
                                        name='mobileno'
                                        value={formData.mobileno}
                                        onChange={handleChange}
                                    />
                                    {errors.mobileno && <p className='error'>{errors.mobileno}</p>}
                                </div>
                                <div className='dt_ContactMobile_ShowDiv' style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>SUBJECT</p>
                                    <input
                                        type='text'
                                        className='dt_contactBox1InputBox'
                                        name='InQuirySubject'
                                        value={formData.InQuirySubject}
                                        onChange={handleChange}
                                    />
                                    {errors.InQuirySubject && <p className='error'>{errors.InQuirySubject}</p>}
                                </div>
                                <div className='dt_ContactMobile_ShowDiv' style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>MESSAGE</p>
                                    <textarea
                                        type='text'
                                        className='dt_contactBox1InputBox_Mes'
                                        name='Be_In_Message'
                                        value={formData.Be_In_Message}
                                        onChange={handleChange}
                                    />
                                    {errors.Be_In_Message && <p className='error'>{errors.Be_In_Message}</p>}
                                </div>
                                <button type="submit" disabled={loading === true} className='dt_contactBox1BtnSub'>{loading === true ? 'SUBMITTING' : 'SUBMIT'}</button>
                            </form>
                        </div>
                        <div className='Fo-contactBox2'>
                            <p className='dt_contactBox2TitleHave'>Have questions?</p>

                            <p style={{
                                fontSize: '15px',
                                fontWeight: 600,
                                color: '#7d7f85',
                                margin: '0px',
                            }}>General inquiries<span style={{
                                fontWeight: 400,
                                margin: '0px',
                                fontSize: '13px'
                            }}></span></p>

                            <p style={{
                                fontSize: '15px',
                                color: '#7d7f85',
                                margin: '0px',
                                fontWeight: 600
                            }}>Customer inquiries<span tyle={{
                                fontWeight: 400,
                                fontSize: '13px'
                            }}></span></p>

                            <p style={{
                                color: '#7d7f85',
                                fontSize: '15px',
                                fontWeight: 600
                            }}>Orders & Returns<spna tyle={{
                                fontWeight: 400,
                                fontSize: '13px'
                            }}></spna></p>

                            <p className='dt_contactBox2Desc'>If you are looking for instant answers, check out our FAQ page for more information!</p>

                            <p className='dt_contactBox2Title'>Orders & Returns</p>
                            <p className='dt_contactBox2Desc'>Check out our FAQ page or our Orders & Retuns page</p>
                            <p className='dt_contactBox2Desc'>Call us at 98108 76359</p>
                            {/* <p className='dt_contactBox2Desc'>Call us at 0000000000000</p> */}
                            <p className='dt_contactBox2Desc'>Email: contact@diamondtine.com</p>
                            {/* <p className='dt_contactBox2Desc'>Email: contact@sonasons.com</p> */}
                            <p className='dt_contactBox2Title'>Studio Address</p>
                            <p className='dt_contactBox2Desc'>E-4, South EX-|| New Delhi 110049</p>
                            {/* <p className='dt_contactBox2Desc'>E-4, South EX-|| New Mars 0000000</p> */}

                            <p className='dt_contactBox2Title'>Opening Hours</p>
                            <p className='dt_contactBox2Desc'>Monday - Friday 11am - 6pm <br /> Saturday 12am - 6pm</p>

                            <p className='dt_contactBox2Desc'>Our customer service team is available by phone from Monday-Friday 9.30am-6:30pm EST and Saturday 10am-5pm EST.</p>
                            <p className='dt_contactBox2Desc'>Our office is located at 33W 46th Str, STE#9W, New York, NY 10036</p>
                            <div className='mt-4'>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.05115060303!2d77.21861737616264!3d28.568047587004962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce25b4d73ffff%3A0x5244a585d7ba2ce3!2sDiamondtine!5e0!3m2!1sen!2sin!4v1717044522982!5m2!1sen!2sin"
                                    style={{ border: "1px solid #f2f2f2" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className='dt_contactus_map'
                                />

                            </div>
                        </div>
                    </div>

                    {/* <SmilingRock /> */}
                </div>
            </div>
            <Footer />
            {/* <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
                <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
            </div> */}
        </div>
    )
}
