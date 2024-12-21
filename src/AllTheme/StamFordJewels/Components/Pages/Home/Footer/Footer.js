// import React, { useEffect, useState } from 'react'
// import './Footer.modul.scss'
// import { useNavigate } from 'react-router';
// import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

// const Footer = ({ fromPage }) => {

//   const [socialMediaData, setSocialMediaData] = useState([]);
//   const [companyInfoData, setCompanuInfoData] = useState();
//   const navigation = useNavigate();
//   const [localData, setLocalData] = useState();
//   let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
//   const [htmlContent, setHtmlContent] = useState("");

//   useEffect(() => {
//     const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
//     setHtmlContent(storeInit);
//   }, []);

//   useEffect(() => {
//     if (htmlContent) {
//       setLocalData((prevData) => ({
//         ...prevData,
//         Footerno: htmlContent?.Footerno,
//       }));
//     }
//   }, [htmlContent]);

//   useEffect(() => {
//     let localD = JSON.parse(sessionStorage.getItem('storeInit'));
//     setLocalData(localD);
//   }, [])


//   useEffect(() => {
//     const storeInit = JSON?.parse(sessionStorage?.getItem("storeInit")) ?? ""
//     const companyInfoData = JSON?.parse(sessionStorage?.getItem("CompanyInfoData")) ?? ""
//     if (sessionStorage.getItem("CompanyInfoData")) {
//       if (companyInfoData?.SocialLinkObj != "" && companyInfoData?.SocialLinkObj != null && companyInfoData?.SocialLinkObj != undefined) {
//         // companyInfoData = JSON?.parse(sessionStorage.getItem("CompanyInfoData")) ?? "";
//         const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
//         if (parsedSocilaMediaUrlData) {
//           setSocialMediaData(parsedSocilaMediaUrlData)
//         }
//       }
//     }
//   }, [])

//   return (
//     <div>
//       <div className='stam_Footer1_main'>
//         <div className='stam_footerBottomMain'>
//           <div className='Stm_footerIconMain'>
//             {socialMediaData?.map((social, index) => (
//               <div className='footerSocialIcon'>
//                 <a key={index} href={`${social.SLink}`} target="_blank" rel="noopener noreferrer">
//                   <img src={social.SImgPath} alt={social.SName} style={{ width: '24px', height: '24px', objectFit: 'cover' }}
//                     onError={(e) => { e.target.style.display = 'none'; }} />
//                 </a>
//               </div>
//             ))}
//           </div>
//           <div className='footerMoreOption'>
//             <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
//             <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p>
//             <p className='footerMoreOptionData' onClick={() => { navigation('/aboutUs'); window.scrollTo(0, 0); }}>ABOUT US</p>
//           </div>
//           <div className='footerMoreText'>
//             <p style={{
//               color: '#7d7f85',
//               fontSize: '12px',
//               fontWeight: 500,
//               marginInline: '15px'
//             }}>© {new Date()?.getFullYear()}, {localData?.companyname}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Footer;


import React, { useEffect, useState } from "react";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import "./Footer.modul.scss";
import { useNavigate } from "react-router";
import { stam_companyLogo } from "../../../Recoil/atom";
import { useRecoilValue } from "recoil";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const Footer = ({ fromPage }) => {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  const compnyLogo = useRecoilValue(stam_companyLogo);
  const [companyInfoData, setcompanyInfoData] = useState(null);
  // let footerLogo = `${storImagePath()}/images/HomePage/sdj.png`;
  let footerLogo = `${storImagePath()}/images/HomePage/Footer/CompanyLogo.png`;

  useEffect(() => {
    const localD = JSON.parse(sessionStorage?.getItem("storeInit"));
    setLocalData(localD);
  }, []);

  useEffect(() => {
    const companyInfoData =
      JSON?.parse(sessionStorage?.getItem("CompanyInfoData")) || {};
    const socialLinkObj = companyInfoData?.SocialLinkObj || "";
    setcompanyInfoData(companyInfoData);
    console.log("smmd", companyInfoData);

    if (socialLinkObj) {
      const parsedSocialMediaUrlData = JSON?.parse(socialLinkObj) || [];
      setSocialMediaData(parsedSocialMediaUrlData);
    }
  }, []);

  return (
    <footer className="stam_Footer1_main">
      <div className="footerBottomMain">
        <div className="stam_FooterLogo_div">
          <a href="/">
            <img
              src={footerLogo}
              loading="lazy"
              className="stam_logo_header"
              alt="Company Logo"
              style={{
                mixBlendMode: 'multiply',
                filter: 'invert(100%)',
                mixBlendMode: 'difference'
              }}
            />
          </a>
        </div>
        <div className="stam_footerOptions">
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
                navigation("/TermsPolicy");
                window.scrollTo(0, 0);
              }}
            >
              TERMS & CONDITION
            </p>
          </div>
        </div>
        <div className="stam_footerIconMain">
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
          <div className="stamkan-main_foo">
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
      <p className="stam_footer_bottom_line">©2024 Sonsons</p>
    </footer>
  );
};

export default Footer;

