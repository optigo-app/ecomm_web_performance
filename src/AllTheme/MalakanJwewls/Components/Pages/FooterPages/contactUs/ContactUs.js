import React, { useEffect, useState } from "react";
import "./ContactUs.modul.scss";
import { toast } from "react-toastify";
import Footer from "../../Home/Footer/Footer";
import { CommonAPI } from "../../../../../../utils/API/CommonAPI/CommonAPI";
import "react-toastify/dist/ReactToastify.css";
import { BespokeAPI } from "../../../../../../utils/API/Bespoke/BespokeAPI";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { ContactUsAPI } from "../../../../../../utils/API/ContactUs/ContactUsAPI";
import CircularProgress from '@mui/material/CircularProgress'; // Import MUI CircularProgress
import PageLoader from "../../../../../../utils/Glob_Functions/PageLoaderComponent/PageLoader";

export default function ContactUs() {
  const [activeTab, setActiveTab] = useState("M1");
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // fetch(`${storImagePath()}/html/SonasonsContactPage.html`)
    // fetch(`${storImagePath()}/html/ShreeDiaConatct.html`)
    fetch(`${storImagePath()}/html/KamalikaContactpage.html`)
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
    Themeno: '12'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
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
      await ContactUsAPI(formData).then((res) => {
        if (res?.stat_msg === 'success') {
          toast.success("Got it! We've received your query. We'll be in touch shortly.");
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

  return (
    <div className="stam_contactMain">
      <div className="mal-contactMain">
        <div className="content_malkana">
          <div className="title">
            <h2>Contact Us</h2>
            <p>
              Have a comment, suggestion or question? Feel free to reach out to
              us and we’ll get back to you as soon as possible.
            </p>
          </div>
        </div>
        <div>
          <div className="Fo-contactBoxMain">
            <div className="Fo-contactBox1">
              <form onSubmit={handleSubmit}>
                <div>
                  <p className="Fo-contactBox1Title">FULL NAME</p>
                  <input
                    type="text"
                    className="Fo-contactBox1InputBox"
                    name="FullName"
                    value={formData.FullName}
                    onChange={handleChange}
                  />
                  {errors.FullName && (
                    <p className="error">{errors.FullName}</p>
                  )}
                </div>
                <div style={{ marginTop: "25px" }}>
                  <p className="Fo-contactBox1Title">COMPANY NAME</p>
                  <input
                    type="text"
                    className="Fo-contactBox1InputBox"
                    name="InQuiryCompanyName"
                    value={formData.InQuiryCompanyName}
                    onChange={handleChange}
                  />
                  {errors.InQuiryCompanyName && (
                    <p className="error">{errors.InQuiryCompanyName}</p>
                  )}
                </div>
                <div style={{ marginTop: "25px" }}>
                  <p className="Fo-contactBox1Title">EMAIL ADDRESS</p>
                  <input
                    type="text"
                    className="Fo-contactBox1InputBox"
                    name="EmailId"
                    value={formData.EmailId}
                    onChange={handleChange}
                  />
                  {errors.EmailId && (
                    <p className="error">{errors.EmailId}</p>
                  )}
                </div>
                <div style={{ marginTop: "25px" }}>
                  <p className="Fo-contactBox1Title">PHONE NUMBER</p>
                  <input
                    type="text"
                    className="Fo-contactBox1InputBox"
                    name="mobileno"
                    value={formData.mobileno}
                    onChange={handleChange}
                    maxLength={10}
                    pattern="[0-9]{10}"
                  />
                  {errors.mobileno && (
                    <p className="error">{errors.mobileno}</p>
                  )}
                </div>
                <div style={{ marginTop: "25px" }}>
                  <p className="Fo-contactBox1Title">SUBJECT</p>
                  <input
                    type="text"
                    className="Fo-contactBox1InputBox"
                    name="InQuirySubject"
                    value={formData.InQuirySubject}
                    onChange={handleChange}
                  />
                  {errors.InQuirySubject && <p className="error">{errors.InQuirySubject}</p>}
                </div>
                <div style={{ marginTop: "25px" }}>
                  <p className="Fo-contactBox1Title">MESSAGE</p>
                  <input
                    type="text"
                    className="Fo-contactBox1InputBox"
                    name="Be_In_Message"
                    value={formData.Be_In_Message}
                    onChange={handleChange}
                  />
                  {errors.Be_In_Message && <p className="error">{errors.Be_In_Message}</p>}
                </div>
                <button type="submit" disabled={loading === true} className='Fo-contactBox1BtnSub'>
                  {loading === true ? 'SUBMITTING' : 'SUBMIT'}
                </button>
              </form>
            </div>
            <div className="Fo-contactBox2">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div>
        </div>
      </div>

      {/* Show centralized loader when loading is true */}
      <PageLoader loading={loading} />
    </div>
  );
}
