import React, { useState } from "react";
import "./NewsletterSignup.scss";
import { TbMailFast } from "react-icons/tb";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true)
    if (email) {
      fetch(
        `http://www.orail.co.in/demo/icontact/standard/Ajax/SendMailToSubscriber.aspx?officeid=1&groupid=1468&emailid=${email}`
      )
        .then((response) => response.text())
        .then((result) => { setResult(result); setLoading(false) })
        .catch((error) => setResult(error));
    } else {
      alert("Please enter your email.");
    }
  };

  const alreadySubs = 'Already Subscribed.';

  return (
    <div className="smr_newsletter-signup">
      <div className="icon">
       <TbMailFast size={65}/>
      </div>
      <h2>Deals are delivered to your Inbox.</h2>
      <p className="sub-text">
        Be the first one to get the details of the 'Sonasons' Brand New
        Collection.
      </p>
      <div className="email-input">
        <div className="email-input-with-error">
          <input
            type="email"
            placeholder="Type Your Email"
            value={email}
            onChange={handleInputChange}
            required
          />{
            loading ? <span className="for-error-message-news">Loading...</span> : (
              <>
                {result && <span className="for-error-message-news" style={{ color: result === alreadySubs ? '#FF0000' : '#04AF70 ' }}>{result}</span>}
              </>
            )}
        </div>
        <button
          onClick={handleSubmit}
          // className={`${btnStyle?.btn_for_new} ${btnStyle?.btn_15}`}
          className={`btn_for_new `}
        >
          I'm Ready for Jewelry Updates
        </button>
      </div>
      <p className="disclaimer">
        By signing up with Sonasons, you are agreeing to the terms outlined in
        our privacy policy. Any information provided will be collected and used
        for the purpose of sending news, promotions, and updates through email
        communication. You can withdraw your consent at any time by
        unsubscribing or reaching out to the customer service team at&nbsp;
        <a href="mailto:service@Sonasons.com">service@Sonasons.com.</a>
      </p>
      <span className="newslatterEmail"></span>
    </div>
  );
};

export default NewsletterSignup;