import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { IoLocationOutline } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from 'react-router';

const Footer = ({ fromPage }) => {

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const navigation = useNavigate();
  useEffect(() => {
    const companyInfoData = JSON.parse(sessionStorage.getItem("CompanyInfoData")) ?? "";
    setCompanuInfoData(companyInfoData);
    if (companyInfoData) {
      const parsedSocialMediaUrlData = JSON.parse(companyInfoData?.SocialLinkObj) ?? [];
      setSocialMediaData(parsedSocialMediaUrlData);
    }
  }, [])

  return (
    <div>
      <div className='roop_Footer1_main'>
        <div className='footerBottomMain' style={{ marginTop: fromPage === "ProdList" && '8%' }}>
          <div className='footerIconMain'>
            {socialMediaData?.map((social, index) => (
              <div className='footerSocialIcon'>
                <a key={index} href={`${social?.SLink}`} target="_blank" rel="noopener noreferrer">
                  <img src={social?.SImgPath} alt={social?.SName} style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }} />
                </a>
              </div>
            ))}
          </div>
          <div className='footerMoreOption'>
            <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
            <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p>
            <p className='footerMoreOptionData' onClick={() => { navigation('/ExpertAdvice'); window.scrollTo(0, 0); }}>EXPERT ADVICE</p>
            <p className='footerMoreOptionData' onClick={() => { navigation('/aboutUs'); window.scrollTo(0, 0); }}>ABOUT US</p>
          </div>
          <div className='footerMoreText'>
            <p style={{
              color: '#7d7f85',
              fontSize: '12px',
              fontWeight: 500,
              marginInline: '0'
            }}>© 2024, optigoapps</p>
            <div>
              <p style={{
                color: '#7d7f85',
                fontSize: '12px',
                fontWeight: 500,
                marginInline: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <IoLocationOutline style={{ minWidth: '18px', width: 'fit-content', height: 'fit-content' }} />
                <span>
                  {companyInfoData?.FrontEndAddress}, {companyInfoData?.FrontEndCity} - {companyInfoData?.FrontEndZipCode}
                </span>
              </p>
            </div>
            {/* // }}>© 2024,</p> */}

            <p style={{
              color: '#7d7f85',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer'
            }} onClick={() => navigation('/TermsPolicy')}>Terms & Privacy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;