import React, { useEffect, useState } from "react";
import "./ContactForm.scss";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { BespokeAPI } from "../../../../../../utils/API/Bespoke/BespokeAPI";
const ContactForm = () => {
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0
    })
  }, [])

  return (
    <div className="hoq_contactfrom">
      <div className="details">
        <h1>We’re here to Help</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          aperiam exercitationem hic modi quasi similique laboriosam odio! Omnis
          pariatur corporis. Lorem ipsum dolor sit amet.
        </p>
        <span>Email:demo@example.com</span>
        <p>Phone: +91 1234567890</p>
        <address>
          Address: 4th planet mars , Olympus Mons Building ,near volcano , mars
          , 00458712.
        </address>
      </div>
      <div className="contact_from">
        <h1>Contact us</h1>
        <div className="layout">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <div className="box_input">
                <label htmlFor="name">Name</label>
                <input
                  type='text'
                  name='FullName'
                  value={formData.FullName}
                  onChange={handleChange}
                />
                {errors.FullName && <p className='error'>{errors.FullName}</p>}
              </div>
              <div className="box_input">
                <label htmlFor="name">Company Name</label>
                <input
                  type='text'
                  name='InQuiryCompanyName'
                  value={formData.InQuiryCompanyName}
                  onChange={handleChange}
                />
                {errors.InQuiryCompanyName && <p className='error'>{errors.InQuiryCompanyName}</p>}
              </div>
            </div>
            <div className="input">
              <div className="box_input">
                <label htmlFor="email">Email</label>
                <input
                  type='email'
                  name='EmailId'
                  value={formData.EmailId}
                  onChange={handleChange}
                />
                {errors.EmailId && <p className='error'>{errors.EmailId}</p>}
              </div>
              <div className="box_input">
                <label htmlFor="mobile">Phone Number</label>
                <input
                  type='number'
                  name='mobileno'
                  value={formData.mobileno}
                  onChange={handleChange}
                />
                {errors.mobileno && <p className='error'>{errors.mobileno}</p>}
              </div>
            </div>
            <div className="input-last">
              <div className="box_input">
                <label htmlFor="subject">Subject</label>
                <input
                  type='text'
                  name='InQuirySubject'
                  value={formData.InQuirySubject}
                  onChange={handleChange}
                />
                {errors.InQuirySubject && <p className='error'>{errors.InQuirySubject}</p>}
              </div>
            </div>
            <div className="textarea">
              <label htmlFor="msg">Message</label>
              <textarea
                type='text'
                name='Be_In_Message'
                value={formData.Be_In_Message}
                onChange={handleChange}
              />
              {errors.Be_In_Message && <p className='error'>{errors.Be_In_Message}</p>}
            </div>

            <div className="btn_form">
              <button type="submit" disabled={loading === true}>{loading === true ? 'Sending' : 'Send'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
