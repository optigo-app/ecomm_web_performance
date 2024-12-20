import React, { useEffect, useState } from "react";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import "./Footer.modul.scss";
import { useNavigate } from "react-router";
import { mala_companyLogo } from "../../../Recoil/atom";
import { useRecoilValue } from "recoil";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const Footer = ({ fromPage }) => {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  const compnyLogo = useRecoilValue(mala_companyLogo);
  const [companyInfoData, setcompanyInfoData] = useState(null);
  // let footerLogo = `${storImagePath()}/images/HomePage/sdj.png`;
  let footerLogo = `${storImagePath()}/images/HomePage/sonasons1.png`;

  useEffect(() => {
    const localD = JSON.parse(sessionStorage?.getItem("storeInit"));
    setLocalData(localD);
  }, []);

  useEffect(() => {
    const companyInfoData =
      JSON?.parse(sessionStorage?.getItem("CompanyInfoData")) || {};
    const socialLinkObj = companyInfoData?.SocialLinkObj || "";
    setcompanyInfoData(companyInfoData);
    console.log("smmd",companyInfoData) ;

    if (socialLinkObj) {
      const parsedSocialMediaUrlData = JSON?.parse(socialLinkObj) || [];
      setSocialMediaData(parsedSocialMediaUrlData);
    }
  }, []);

  return (
    <footer className="mala_Footer1_main">
      <div className="footerBottomMain">
        <div className="mala_FooterLogo_div">
          <a href="/">
            <img
              src={footerLogo}
              loading="lazy"
              className="mala_logo_header"
              alt="Company Logo"
              style={{
                mixBlendMode:'multiply',
                filter:'invert(100%)',
                mixBlendMode:'difference'
              }}
            />
          </a>
        </div>
        <div className="mala_footerOptions">
          <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/");
                window.scrollTo(0, 0);
              }}
            >
              HOME
            </p>
          </div>
          <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/aboutUs");
                window.scrollTo(0, 0);
              }}
            >
              ABOUT US
            </p>
          </div>
          <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/contactUs");
                window.scrollTo(0, 0);
              }}
            >
              CONTACT US
            </p>
          </div>

          {/* <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/servicePolicy");
                window.scrollTo(0, 0);
              }}
            >
              SERVICE POLICY
            </p>
          </div> */}
          <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/privacyPolicy");
                window.scrollTo(0, 0);
              }}
            >
              PRIVACY POLICY
            </p>
          </div>
          <div className="footer_menu_malkan">
            <p
              onClick={() => {
                navigation("/TermsPolicy");
                window.scrollTo(0, 0);
              }}
            >
              TERMS & CONDITION
            </p>
          </div>
        </div>
        <div className="mala_footerIconMain">
          <div className="icons_sm">
            {socialMediaData.map((social, index) => (
              <div className="footerSocialIcon" key={index}>
                <a
                  href={social.SLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={social.SImgPath}
                    alt={social.SName}
                    className="social-icon"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
         <div className="malakan-main_foo">
  <p className="malkan-footerOfficeDesc">
    <IoLocationOutline size={20} />
    <span className="fooetr_address_malkan">
      {companyInfoData?.FrontEndAddress}, {" "}
      {companyInfoData?.FrontEndCity} -{" "}
      {companyInfoData?.FrontEndZipCode}  
    </span>
  </p>
  <p className="malkan-footerOfficeDesc">
    <IoMdCall size={20} />
    <span>
      <a href={`tel:${companyInfoData?.FrontEndContactno1}`}>
        {companyInfoData?.FrontEndContactno1}
      </a>
    </span>
  </p>
  <p className="malkan-footerOfficeDesc">
    <IoMdMail size={20} />
    <span>
      <a href={`mailto:${companyInfoData?.FrontEndEmail1}`}>
        {companyInfoData?.FrontEndEmail1}
      </a>
    </span>
  </p>
</div>
        </div>
      </div>
      <p className="mala_footer_bottom_line">©2024 Sonsons</p>
      {/* <p className="mala_footer_bottom_line">©2024 Shree Diamond</p> */}
    </footer>
  );
};

export default Footer;
