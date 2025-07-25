import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';
import { useMediaQuery } from '@mui/material';
import { IoMdCall, IoMdMail } from 'react-icons/io';

const Footer = ({ fromPage }) => {

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const maxWidth = useMediaQuery('(max-width:1024px)');
  const navigation = useNavigate();
  useEffect(() => {
    const companyInfoData = JSON?.parse(sessionStorage.getItem("CompanyInfoData")) ?? "";
    setCompanuInfoData(companyInfoData);
    if (companyInfoData) {
      const parsedSocialMediaUrlData = companyInfoData && JSON?.parse(companyInfoData?.SocialLinkObj);
      setSocialMediaData(parsedSocialMediaUrlData);
    }
  }, [])

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <div className='roop_Footer1_main'>
        <div className='footerBottomMain' style={{ marginTop: fromPage === "ProdList" && '8%' }}>
          <div className='footerIconMain'>
            {socialMediaData?.map((social, index) => (
              <div className='footerSocialIcon' key={index} onClick={() => window.open(`${social?.SLink}`, '_blank')}>
                <div key={index} rel="noopener noreferrer" role='link'>
                  <img src={social?.SImgPath} alt={social?.SName} style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              </div>
            ))}
          </div>
          <div className='footerMoreOption'>
            <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
            {/* For vara */}
            {/* <p className='footerMoreOptionData' style={{ textTransform: 'uppercase' }} onClick={() => { navigation('/managementTeam'); window.scrollTo(0, 0); }}>Management Team</p> */}

            {/* For sonasons ,shinjini, Pacific, ojasvi */}
            <p className='footerMoreOptionData' style={{ textTransform: 'uppercase' }} onClick={() => { navigation('/privacyPolicy'); window.scrollTo(0, 0); }}>Privacy Policy</p>

            <p className='footerMoreOptionData' style={{
              textTransform: 'uppercase'
            }} onClick={() => { navigation('/terms-and-conditions'); window.scrollTo(0, 0); }}>Terms & Condition</p>
            <p className='footerMoreOptionData' onClick={() => { navigation('/aboutUs'); window.scrollTo(0, 0); }}>ABOUT US</p>
          </div>
          <div className='footerMoreText'>
            <div
              className='roop_footerCompData'
              style={{ width: maxWidth ? "100% !important" : "" }}
            >
              <p
                style={{
                  color: '#7d7f85',
                  fontSize: '12px',
                  fontWeight: 500,
                  marginInline: '15px',
                  // display: 'flex',
                  // justifyContent: 'center',
                  margin: 0,
                  marginBottom: "2px",
                  alignItems: 'flex-start', // Align icons and text vertically
                }}
              >
                <IoLocationOutline style={{ minWidth: '20px', width: 'auto', height: 'auto', color: "#000", marginTop: "3px" }} />
                <span style={{ marginLeft: '5px', fontSize: "13px" }}>
                  {companyInfoData?.FrontEndAddress}, {companyInfoData?.FrontEndCity}, {companyInfoData?.FrontEndState} - {companyInfoData?.FrontEndZipCode}
                </span>
              </p>

              {companyInfoData?.FrontEndContactno1 && (
                <p
                  className="footerOfficeDesc_rp"
                  style={{ fontFamily: "PT Sans, sans-serif", margin: "0px", display: 'flex', alignItems: 'center', marginBottom: "2px", gap: "5px" }}
                >
                  <IoMdCall style={{ minWidth: '20px', width: 'auto', height: 'auto' }} />
                  <span
                    style={{
                      color: "#7d7f85",
                      fontSize: "13px",
                    }}
                  >
                    {companyInfoData?.FrontEndContactno1}
                  </span>
                </p>
              )}

              {companyInfoData?.FrontEndEmail1 && (
                <p
                  className="footerOfficeDesc_rp"
                  style={{ fontFamily: "PT Sans, sans-serif", display: 'flex', alignItems: 'center', marginBottom: "2px", gap: '8px' }}
                >
                  <IoMdMail style={{ minWidth: '20px', width: 'auto', height: 'auto' }} />
                  <span
                    style={{
                      color: "#7d7f85",
                      fontSize: "13px",
                    }}
                  >
                    {companyInfoData?.FrontEndEmail1}
                  </span>
                </p>
              )}
            </div>

            {/* // }}>© 2024,</p> */}

            {/* <p style={{
              color: '#7d7f85',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer'
            }} onClick={() => navigation('/TermsPolicy')}>Terms & Privacy</p> */}
          </div>
        </div>
        <div>
          <p style={{
            color: '#7d7f85',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
            fontSize: '14px',
            fontWeight: 500,
            marginInline: '0',
            marginBottom: "1%"
          }}>© 2025, Shinjini Jewels</p>

          {/*  pacific diamonds */}
          {/* }}>© 2025, Pacific Diamonds</p> */}

          {/* For Vara */}
          {/* }}>© 2025, Varajewels</p> */}

          {/* For shinjini */}
          {/* }}>© 2025, Shinjini jewels</p> */}

          {/* For ojasvi */}
          {/* }}>© 2025, Ojasvijewels</p> */}

          {/* vara  */}
          {/* }}>© 2025, Varajewels</p> */}

          {/* vara  */}
          {/* }}>© 2025, Sonasons</p> */}
        </div>
        <strong style={{ color: "white" }}>25062025</strong>
      </div>
    </div >
  )
}

export default Footer;