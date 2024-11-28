import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TermsAndCondition.scss";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";

const TermsAndCondition = () => {
  const [htmlContent, setHtmlContent] = useState("");
  useEffect(() => {
    fetch(`${storImagePath()}/html/test.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
        console.log(html);
      })
      .catch((error) => {
        console.error("Error fetching the HTML file:", error);
      });
  }, []);
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  return (
    <div className="for_TermsAndCondition">
      <div>
        <div
          className="terms_sec"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      <div className="wrapper">
        <NewsletterSignup />
      </div>
    </div>
  );
};

export default TermsAndCondition;
