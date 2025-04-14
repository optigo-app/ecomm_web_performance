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

  // const handleSubmit = () => {
  //   setLoading(true);
  //   if (email) {
  //     fetch(
  //       `http://www.orail.co.in/demo/icontact/standard/Ajax/SendMailToSubscriber.aspx?officeid=1&groupid=1468&emailid=${email}`
  //     )
  //       .then((response) => response.text())
  //       .then((result) => {
  //         setResult(result);
  //       })
  //       .catch((error) => {
  //         setResult(error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   } else {
  //     setResult("Please enter your email.");
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    setLoading(true);

    const isValidEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    e.preventDefault();
    if (email.trim() === "") {
      setLoading(false);
      setResult("Email is required.");
      return;
    } else if (!isValidEmail(email)) {
      setLoading(false);
      setResult("Please enter a valid email address.");
      return;
    } else {
      setResult("");
    }

    const storeInit = JSON?.parse(sessionStorage?.getItem("storeInit"));
    const newslater = storeInit?.newslatter;
    if (newslater && email) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const newsletterUrl = `${newslater}${email}`;
      fetch(newsletterUrl)
        .then((response) => response.text())
        .then((result) => {
          setResult(result); setLoading(false); setTimeout(() => {
            setResult(""); // Clear the result after 3000 ms
            setEmail('')

          }, 3000);
        })
        .catch((error) => setResult(error));
    }
  };

  const alreadySubs = 'Already Subscribed.';

  return (
    <div className="smr_newsletter-signup">
      <div className="icon">
        <TbMailFast size={65} />
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
                {result && <span className="for-error-message-news" style={{ color: result.startsWith("Thank You!") ? '#04AF70' : '#FF0000' }}>{result}</span>}
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