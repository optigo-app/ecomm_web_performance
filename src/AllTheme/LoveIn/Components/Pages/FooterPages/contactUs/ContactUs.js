import React, { useEffect, useState } from 'react'
import './ContactUs.modul.scss'
import { toast } from 'react-toastify'
import Footer from '../../Home/Footer/Footer';
import { CommonAPI } from '../../../../../../utils/API/CommonAPI/CommonAPI';
import 'react-toastify/dist/ReactToastify.css';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { BespokeAPI } from '../../../../../../utils/API/Bespoke/BespokeAPI';
import ContactUs2 from './new/Contact';
import useHomeBannerImages from '../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner';

export default function ContactUs() {
    const [activeTab, setActiveTab] = useState('M1');
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(false);
    const banner = useHomeBannerImages();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        // fetch(`${storImagePath()}/html/contactPage.html`)  /*  for kayra only */
        // fetch(`${storImagePath()}/html/SonasonsContactPage.html`)  /* for sonsons only  */
        fetch(`${storImagePath()}/html/loveinContactPage.html`)  /* for lovein only  */
            // fetch(`${storImagePath()}/html/MairocontactPage.html`)  /* for mairo only */
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html);
            })
            .catch((error) => {
                console.error('Error fetching the HTML file:', error);
            });
    }, []);

    const [formData, setFormData] = useState({
        FullName: '',
        InQuiryCompanyName: '',
        EmailId: '',
        mobileno: '',
        InQuirySubject: '',
        Be_In_Message: '',
        Themeno: '11'
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
        if (!formData.InQuiryCompanyName) {
            errors.InQuiryCompanyName = 'Please enter your company name';
        }
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
                Themeno: '11'
            });
        } else {
            setErrors(errors);
        }
    };
    // return (<><ContactUs2/></>)

    return (
        <div className='smr_contactMain_div' >
            <div className='Fo-contactMain'>
                <div>
                    <p style={{ fontSize: '40px', margin: '0px', paddingTop: '30px', textAlign: 'center', fontFamily: 'FreightDispProBook-Regular,Times New Roman,serif' }}>Contact Us</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p style={{ width: '300px', textAlign: 'center', fontSize: '15px' }}>Have a comment, suggestion or question? Feel free to reach out to us and we’ll getback to you as soon as possible.</p>
                    </div>
                    <div className='smr_contactPage_BoxMain'>
                        <div className='smr_Fo_contactBox1'>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <p className='Fo-contactBox1Title'>FULL NAME</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='FullName'
                                        value={formData.FullName}
                                        onChange={handleChange}
                                    />
                                    {errors.FullName && <p className='error'>{errors.FullName}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>COMPANY NAME</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='InQuiryCompanyName'
                                        value={formData.InQuiryCompanyName}
                                        onChange={handleChange}
                                    />
                                    {errors.InQuiryCompanyName && <p className='error'>{errors.InQuiryCompanyName}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>EMAIL ADDRESS</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='EmailId'
                                        value={formData.EmailId}
                                        onChange={handleChange}
                                    />
                                    {errors.EmailId && <p className='error'>{errors.EmailId}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>PHONE NUMBER</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='mobileno'
                                        value={formData.mobileno}
                                        onChange={handleChange}
                                    />
                                    {errors.mobileno && <p className='error'>{errors.mobileno}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>SUBJECT</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='InQuirySubject'
                                        value={formData.InQuirySubject}
                                        onChange={handleChange}
                                    />
                                    {errors.InQuirySubject && <p className='error'>{errors.InQuirySubject}</p>}
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <p className='Fo-contactBox1Title'>MESSAGE</p>
                                    <input
                                        type='text'
                                        className='Fo-contactBox1InputBox'
                                        name='Be_In_Message'
                                        value={formData.Be_In_Message}
                                        onChange={handleChange}
                                    />
                                    {errors.Be_In_Message && <p className='error'>{errors.Be_In_Message}</p>}
                                </div>
                                <button type="submit" disabled={loading === true} className='Fo-contactBox1BtnSub'>{loading === true ? 'SUBMITTING' : 'SUBMIT'}</button>
                            </form>
                        </div>
                        <div className='smr_Fo_contactBox2_main'>
                            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        </div>
                    </div>
                </div>
                <Footer data={banner?.affiliation} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
                <p
                    className="lov_backtotop"

                    style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer', color: "#5F497A" }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
            </div>
        </div>
    )
}



