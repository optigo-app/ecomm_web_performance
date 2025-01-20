import React, { useEffect } from "react";
import "./InquiryModal.scss";
import { VscClose } from "react-icons/vsc";

const InquiryModal = ({ open, setOpen, handleSubmit, formData,
  handleChange, handleFileChange, error, loading }) => {

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
              <label htmlFor="FullName">Full Name*</label>
              <input
                id="FullName"
                name="FullName"
                value={formData?.FullName}
                onChange={handleChange}
              />
              {error?.FullName && <p className="for-error-message">{error.FullName}</p>}
            </div>
            <div className="for-form-group for-grid">
              <div>
                <label htmlFor="EmailId">EmailId*</label>
                <input
                  id="email"
                  name="EmailId"
                  type="email"
                  value={formData.EmailId}
                  onChange={handleChange}
                />
                {error?.EmailId && <p className="for-error-message">{error.EmailId}</p>}
              </div>
              <div>
                <label htmlFor="mobileno">Phone*</label>
                <input
                  id="mobileno"
                  name="mobileno"
                  type="number"
                  placeholder="+91 xxxx xxxx"
                  value={formData.mobileno}
                  onChange={handleChange}
                />
                {error?.mobileno && <p className="for-error-message">{error.mobileno}</p>}
              </div>
            </div>
            <div className="for-form-group">
              <label htmlFor="WebSite">Website URL (Optional)</label>
              <input
                id="WebSite"
                name="WebSite"
                placeholder="www.world.forevery.one"
                value={formData.WebSite}
                onChange={handleChange}
              />
              {/* {error?.WebSite && <p className="for-error-message">{error.WebSite}</p>} */}
            </div>
            <div className="for-form-group">
              <label htmlFor="Be_In_Message">Additional Information*</label>
              <textarea
                id="Be_In_Message"
                name="Be_In_Message"
                value={formData.Be_In_Message}
                onChange={handleChange}
              />
              {error?.Be_In_Message && <p className="for-error-message">{error.Be_In_Message}</p>}
            </div>
            <div className="for-form-group">
              <label htmlFor="file">Attach File</label>
              <input
                id="file"
                type="file"
                accept=".jpg, .png, .pdf"
                onChange={handleFileChange}
              />
              {error?.file && <p className="for-error-message">{error.file}</p>}
              <p>Max File Size: 10MB. Accepted Formats: PNG, JPG, PDF</p>
            </div>
            <button type="submit" className="for-submit-button">
              {loading ? 'SUBMITING...' : 'SUBMIT'}
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
