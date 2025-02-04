import React from 'react';
import './ContactUs.scss';

const ContactUs2 = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! In a real application, this would send the data to a server.');
  };

  return (
    <div className="smrr_container">
      <h1 className="smr_title">Contact Us</h1>
      <p className="smr_description">
        Have a comment, suggestion, or question? Feel free to reach out to us and we'll get back to you as soon as possible.
      </p>
      <div className="smr_content">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="smr_form">
          <div>
            <label htmlFor="FullName" className="smr_label">FULL NAME</label>
            <input type="text" id="FullName" name="FullName" required className="smr_input" />
          </div>
          <div>
            <label htmlFor="InQuiryCompanyName" className="smr_label">COMPANY NAME</label>
            <input type="text" id="InQuiryCompanyName" name="InQuiryCompanyName" required className="smr_input" />
          </div>
          <div>
            <label htmlFor="EmailId" className="smr_label">EMAIL ADDRESS</label>
            <input type="email" id="EmailId" name="EmailId" required className="smr_input" />
          </div>
          <div>
            <label htmlFor="mobileno" className="smr_label">PHONE NUMBER</label>
            <input type="tel" id="mobileno" name="mobileno" required className="smr_input" />
          </div>
          <div>
            <label htmlFor="InQuirySubject" className="smr_label">SUBJECT</label>
            <input type="text" id="InQuirySubject" name="InQuirySubject" required className="smr_input" />
          </div>
          <div>
            <label htmlFor="Be_In_Message" className="smr_label">MESSAGE</label>
            <textarea id="Be_In_Message" name="Be_In_Message" rows="4" required className="smr_input"></textarea>
          </div>
          <button type="submit" className="smr_button">
            SUBMIT
          </button>
        </form>

        {/* Contact Map */}
        <div className="smr_map">
          <div className="smr_office_info">
            <h2 className="smr_office_title">Main Office Address</h2>
            <p>Kayra Creation Limited</p>
            <p>408, 4th floor, Heng Ngai Jewellery Ctr, 4 Hok Yuen St, Hunghom,</p>
            <p>Kowloon-999077, Hong Kong- China</p>
            <p>+852-52482000</p>
            <p>sales@kayracreation.com</p>
          </div>
          <div className="smr_map_frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1384097684245!2d114.18683082602243!3d22.31060459252037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400df5b194c91%3A0x3301447411e931be!2sHeng%20Ngai%20Jewelry%20Centre!5e0!3m2!1sen!2sin!4v1716036679521!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="smr_iframe"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs2;
