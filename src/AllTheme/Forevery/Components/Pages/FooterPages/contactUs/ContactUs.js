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

const Bgimage = `${storImagePath()}/Forevery/contact-us.png`;

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.fullName) {
      errors.fullName = "Please enter your full name";
    }
    if (!formData.emailAddress) {
      errors.emailAddress = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = "Please enter a valid email address";
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Please enter your phone number";
    }
    if (!formData.message) {
      errors.message = "Please enter your message";
    }
    console.log(formData);
    setFormData({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      message: "",
    });

    // if (Object.keys(errors).length === 0) {
    //   console.log("Form submitted:", formData);
    //   const combinedValue = JSON.stringify({
    //     fullname: `${formData?.fullName}`,
    //     emailid: `${(formData?.emailAddress).toLocaleLowerCase()}`,
    //     mobileno: `${formData?.phoneNumber}`,
    //     message: `${formData?.message}`,
    //   });
    //   const encodedCombinedValue = btoa(combinedValue);
    //   console.log(encodedCombinedValue);
    //   const body = {
    //     con: '{"id":"","mode":"CONTACTUS"}',
    //     f: "CONTACTUS (handlesubmit)",
    //     p: encodedCombinedValue,
    //     dp: combinedValue,
    //   };
    //   const response = await CommonAPI(body);
    //   if (response) {
    //     console.log("res", response);
    //     toast.success(
    //       "Got it! We've received your query. We'll be in touch shortly."
    //     );
    //   }
    //   setFormData({
    //     fullName: "",
    //     companyName: "",
    //     emailAddress: "",
    //     phoneNumber: "",
    //     subject: "",
    //     message: "",
    //   });
    // } else {
    //   setErrors(errors);
    // }
  };

  return (
    <div className="forevery_ContactMain">
      <Heading />
      <FormBox
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <OurServices />
      <NewsletterSignup />
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
const FormBox = ({ setFormData, handleSubmit, formData }) => {
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
                  name="fullName"
                  required
                  value={formData?.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="box_input">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="emailAddress"
                  required
                  value={formData?.emailAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emailAddress: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="box_input">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Eg. +32 XX XXX XXXX"
                  name="phoneNumber"
                  required
                  value={formData?.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="textarea">
              <label htmlFor="msg">Message</label>
              <textarea
                id="msg"
                name="message"
                rows={4}
                cols={50}
                value={formData?.message}
                maxLength={600}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
              ></textarea>
            </div>
            <div className="btn_form">
              <button
                type="submit"
                className={`${btnstyle?.btn_for_new} ${btnstyle?.btn_15}`}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
