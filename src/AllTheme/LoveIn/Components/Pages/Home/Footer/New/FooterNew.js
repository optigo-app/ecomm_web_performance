import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import "./FooterNew.scss";

const FooterNew = () => {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  let footerLogo = `${storImagePath()}/logoIcon/webLogo.png`;
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/ExtraFlag.txt`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON.parse(text);
          setHtmlContent(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

  useEffect(() => {
    let localData = JSON?.parse(sessionStorage?.getItem("storeInit"));
    if (localData) {
      setLocalData(localData);
    }

    const companyInfoData =
      JSON?.parse(sessionStorage?.getItem("CompanyInfoData")) ?? "";
    if (companyInfoData?.SocialLinkObj) {
      const parsedSocialMediaUrlData =
        JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
      setSocialMediaData(parsedSocialMediaUrlData);
    }
  }, []);

  return (
    <footer className="smr_footer-container">
      <div className="footer-content">
        {/* Left: Logo Section */}
        <div className="footer-logo">
          <a href="/">
            <img
              src={footerLogo}
              alt="Company Logo"
              className="footer-logo-img"
            />
          </a>
        </div>

        {/* Center: Navigation Links */}
        <div className="footer-nav">
          <span
            onClick={() => {
              navigation("/terms-and-conditions");
              window.scrollTo(0, 0);
            }}
            className="footer-nav-link"
          >
            Terms & Conditions
          </span>
          <span
            onClick={() => {
              navigation("/privacyPolicy");
              window.scrollTo(0, 0);
            }}
            className="footer-nav-link"
          >
            Privacy Policy
          </span>
          <span
            onClick={() => {
              navigation("/aboutUs");
              window.scrollTo(0, 0);
            }}
            className="footer-nav-link"
          >
            About Us
          </span>
          <span
            onClick={() => {
              navigation("/contactUs");
              window.scrollTo(0, 0);
            }}
            className="footer-nav-link"
          >
            Contact Us
          </span>
        </div>

        {/* Right: Social Media Icons */}
        <div className="footer-social-media">
          {socialMediaData?.map((social, index) => (
            <a
              key={index}
              href={social.SLink}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img
                src={social.SImgPath}
                alt={social.SName}
                className="social-icon-img"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copy">
        &#169; {new Date()?.getFullYear()}, {localData?.companyname || "Company Name"}
      </div>
    </footer>
  );
};

export default FooterNew;
