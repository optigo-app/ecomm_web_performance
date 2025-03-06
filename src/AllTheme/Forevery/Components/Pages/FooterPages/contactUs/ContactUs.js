import React, { useState } from "react";
import "./ContactUs.modul.scss";
import { toast } from "react-toastify";
import { CommonAPI } from "../../../../../../utils/API/CommonAPI/CommonAPI";
import "react-toastify/dist/ReactToastify.css";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { PiPhoneIncomingThin } from "react-icons/pi";
import btnstyle from "../../../scss/Button.module.scss";
import OurServices from "../../Home/Common/OurServices/OurServices";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import { ContactUsAPI } from "../../../../../../utils/API/ContactUs/ContactUsAPI";
import { CircularProgress } from "@mui/material";
import PageLoader from "../../../../../../utils/Glob_Functions/PageLoaderComponent/PageLoader";

const Bgimage = `${storImagePath()}/Forevery/contact-us.png`;

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    FullName: '',
    EmailId: '',
    mobileno: '',
    Be_In_Message: '',
    Themeno: '8'
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
    console.log("coming here")
    e.preventDefault();
    const errors = {};
    if (!formData.FullName) {
      errors.FullName = 'Please enter your full name';
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
    if (!formData.Be_In_Message) {
      errors.Be_In_Message = 'Please enter your message';
    }

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await ContactUsAPI(formData).then((res) => {
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
        EmailId: '',
        mobileno: '',
        Be_In_Message: '',
        Themeno: '8'
      });
    } else {
      setErrors(errors);
    }
  };


  return (
    <div className="forevery_ContactMain">
      <Heading />
      <FormBox
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        loading={loading}
        errors={errors}
      />
      {/* <OurServices /> */}
      {/* <NewsletterSignup /> */}
      <PageLoader loading={loading} />
    </div>
  );
}

const Heading = () => {
  return (
    <>
      <div
        className="heading"
        style={{
          background: `url(${Bgimage})`,
        }}
      >
        <h1>Contact us</h1>
      </div>
    </>
  );
};
const FormBox = ({ setFormData, handleSubmit, formData, handleChange, loading, errors }) => {
  return (
    <>
      <div className="form_box_forvery">
        <div className="title">
          <span>Send a message</span>
        </div>
        <div className="for_grid_col">
          <div className="box1">
            <div className="title-box">Address</div>
            <div className="desc-box">
              <a
                href="https://maps.app.goo.gl/8kxW51d2tLW4edAC9"
                target="_blank"
                className="href-box"
              >
                <span>
                  <CiLocationOn size={19} />
                </span>
                <span>Hoveniersstraat 30, 2018 Antwerpen, Belgium</span>
              </a>
            </div>
          </div>
          <div className="box1">
            <div className="title-box">Mail</div>
            <div className="desc-box">
              <a href="mailto: info@fake.fake" className="href-box">
                <span>
                  <CiMail size={19} />
                </span>
                <span>info@fake.fake</span>
              </a>
            </div>
          </div>
          <div className="box1">
            <div className="title-box">Phone</div>
            <div className="desc-box">
              <a href="tel:+32489791511" className="href-box">
                <span>
                  <PiPhoneIncomingThin size={19} />
                </span>
                <span>+00 1212121221</span>
              </a>
            </div>
          </div>
          <div className="box1">
            <div className="title-box">Hours</div>
            <div className="desc-box">
              <ul>
                <li>Sunday 10:30am–6pm</li>
                <li>Monday 10am–6pm</li>
                <li>Tuesday 10am–6pm</li>
                <li>Wednesday 10am–6pm</li>
                <li>Thursday 10am–6pm</li>
                <li>Friday 10am–6pm</li>
                <li>Saturday Closed</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="forevery_form">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <div className="box_input">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="FullName"
                  value={formData?.FullName}
                  onChange={handleChange}
                />
                {errors.FullName && <p className='error'>{errors.FullName}</p>}
              </div>
              <div className="box_input">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="EmailId"
                  value={formData?.EmailId}
                  onChange={handleChange}
                />
                {errors.EmailId && <p className='error'>{errors.EmailId}</p>}
              </div>
              <div className="box_input">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Eg. +32 XX XXX XXXX"
                  name="mobileno"
                  maxLength={10}
                  pattern="{0-9}[10]"
                  value={formData?.mobileno}
                  onChange={handleChange}
                />
                {errors.mobileno && <p className='error'>{errors.mobileno}</p>}
              </div>
            </div>
            <div className="textarea">
              <label htmlFor="msg">Message</label>
              <textarea
                id="msg"
                name="Be_In_Message"
                rows={4}
                cols={50}
                value={formData?.Be_In_Message}
                maxLength={600}
                onChange={handleChange}
              ></textarea>
              {errors.Be_In_Message && <p className='error'>{errors.Be_In_Message}</p>}
            </div>
            <div className="btn_form">
              <button
                type="submit"
                disabled={loading === true}
                className={`${btnstyle?.btn_for_new} ${btnstyle?.btn_15}`}
              >
                {loading === true ? 'SENDING' : 'SEND'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
