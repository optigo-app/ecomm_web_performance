import React, { useEffect } from "react";
import "./InquiryModal.scss";
import { VscClose } from "react-icons/vsc";

const InquiryModal = ({ open, setOpen,handleSubmit ,formData ,
  handleChange ,handleFileChange}) => {


  return (
    <div className="for-inquiry-modal-container">
      <div className="for-modal-overlay">
        <div className="for-modal-content">
          <div className="for-modal-header">
            <h2>
              Please fill the details below and we will respond within 48 hours
            </h2>
            <button className="for-close-button" onClick={() => setOpen(false)}>
              <VscClose size={17} />
            </button>
          </div>
          {/* <form onSubmit={handleSubmit} className="for-modal-form">
            <div className="for-form-group">
              <label htmlFor="fullName">Full Name*</label>
              <input id="fullName" required />
            </div>
            <div className="for-form-group for-grid">
              <div>
                <label htmlFor="email">Email*</label>
                <input id="email" type="email" required />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" placeholder="+91 xxxx xxxx" />
              </div>
            </div>
            <div className="for-form-group">
              <label htmlFor="website">Website URL (Optional)</label>
              <input id="website" placeholder="www.world.forevery.one" />
            </div>
            <div className="for-form-group">
              <label htmlFor="additionalInfo">Additional Information*</label>
              <textarea id="additionalInfo" required />
            </div>
            <div className="for-form-group">
              <label htmlFor="file">Attach File</label>
              <input id="file" type="file" />
              <p>Max File Size: 10MB. Accepted Formats: PNG, JPG, PDF</p>
            </div>
            <button type="submit" className="for-submit-button">
              SUBMIT
            </button>
          </form> */}
           <form onSubmit={handleSubmit} className="for-modal-form">
              <div className="for-form-group">
                <label htmlFor="fullName">Full Name*</label>
                <input 
                  id="fullName" 
                  name="fullName"
                  value={formData?.fullName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="for-form-group for-grid">
                <div>
                  <label htmlFor="email">Email*</label>
                  <input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    placeholder="+91 xxxx xxxx"
                    value={formData.phone}
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="for-form-group">
                <label htmlFor="website">Website URL (Optional)</label>
                <input 
                  id="website" 
                  name="website"
                  placeholder="www.world.forevery.one"
                  value={formData.website}
                  onChange={handleChange} 
                />
              </div>
              <div className="for-form-group">
                <label htmlFor="additionalInfo">Additional Information*</label>
                <textarea 
                  id="additionalInfo" 
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="for-form-group">
                <label htmlFor="file">Attach File</label>
                <input 
                  id="file" 
                  type="file" 
                  onChange={handleFileChange} 
                />
                <p>Max File Size: 10MB. Accepted Formats: PNG, JPG, PDF</p>
              </div>
              <button type="submit" className="for-submit-button">
                SUBMIT
              </button>
            </form>

          <p className="for-privacy-policy">
            By submmiting this form you agree to aur Terms & Conditions and the
            terms of your Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
