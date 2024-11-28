import React, { useState } from "react";
import "./NewsletterSignup.scss";
import btnStyle  from "../../../scss/Button.module.scss"

const NewsletterSignup = () => {
    const [email, setEmail] = useState("");

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = () => {
        if (email) {
            alert(`Email: ${email}`);
        } else {
            alert("Please enter your email.");
        }
    };

    return (
        <div className="newsletter-signup">
            <div className="icon">
                <img src="https://forevery.one/images_new/foreveryimg/subscribe.png" alt="email-icon" />
            </div>
            <h2>Deals are delivered to your Inbox.</h2>
            <p className="sub-text">Be the first one to get the details of the 'Forevery' Brand New Collection.</p>
            <div className="email-input">
                <input
                    type="email"
                    placeholder="Type Your Email"
                    value={email}
                    onChange={handleInputChange}
                    required
                />
                <button onClick={handleSubmit} className={`${btnStyle?.btn_for_new} ${btnStyle?.btn_15}`}>I'm Ready for Jewelry Updates</button>
            </div>
            <p className="disclaimer">
                By signing up with Forevery, you are agreeing to the terms outlined in
                our privacy policy. Any information provided will be collected and used
                for the purpose of sending news, promotions, and updates through email
                communication. You can withdraw your consent at any time by
                unsubscribing or reaching out to the customer service team at&nbsp;<a href="mailto:service@forevery.com">service@forevery.com.</a>
            </p>
            <span className="newslatterEmail">
            </span>
        </div>
    );
};

export default NewsletterSignup;
