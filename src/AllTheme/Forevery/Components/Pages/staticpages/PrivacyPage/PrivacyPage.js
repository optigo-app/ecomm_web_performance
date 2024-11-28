import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./PrivacyPolicy.scss";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";

const PrivacyPage = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const MediaQuery768 = useMediaQuery("(max-width: 1000px)");
  useEffect(() => {
    fetch(`${storImagePath()}/html/privacy.html`)
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
    <div className="for_privacyPolicy">
      <div>
        <div
          style={{
            padding: "0 15px",
            width: MediaQuery768 ? "95%" : "70%",
            margin: "0 auto",
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      <div
        className="wrapper"
        style={{
          marginTop: " 3rem",
        }}
      >
        <NewsletterSignup />
      </div>
    </div>
  );
};

export default PrivacyPage;
