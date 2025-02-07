import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';
import { useMediaQuery } from '@mui/material';

const Footer = ({ fromPage }) => {

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const maxWidth = useMediaQuery('(max-width:1024px)');
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
            {/* <p className='footerMoreOptionData' style={{textTransform:'uppercase'}} onClick={() => { navigation('/managementTeam'); window.scrollTo(0, 0); }}>Management Team</p> */}

            {/* For sonasons ,shinjini, Pacific, ojasvi */}
            <p className='footerMoreOptionData' style={{ textTransform: 'uppercase' }} onClick={() => { navigation('/privacyPolicy'); window.scrollTo(0, 0); }}>Privacy Policy</p>

            <p className='footerMoreOptionData' style={{
              textTransform: 'uppercase'
            }} onClick={() => { navigation('/terms-and-conditions'); window.scrollTo(0, 0); }}>Terms & Condition</p>
            <p className='footerMoreOptionData' onClick={() => { navigation('/aboutUs'); window.scrollTo(0, 0); }}>ABOUT US</p>
          </div>
          <div className='footerMoreText'>
            <p style={{
              color: '#7d7f85',
              fontSize: '12px',
              fontWeight: 500,
              marginInline: '0'
            }}>© 2024, Ojasvijewels</p>

            {/*  pacific diamonds */}
            {/* }}>© 2024, Pacific Diamonds</p> */}

            {/* For Vara */}
            {/* }}>© 2024, Varajewels</p> */}

            {/* For shinjini */}
            {/* }}>© 2024, Shinjini</p> */}

            {/* For ojasvi */}
            {/* }}>© 2024, Ojasvijewels</p> */}

            {/* vara  */}
            {/* }}>© 2024, Varajewels</p> */}
            <div
              className='roop_footerCompData'
              style={{ width: maxWidth ? "100%" : "" }}>
              <p style={{
                color: '#7d7f85',
                fontSize: '12px',
                fontWeight: 500,
                marginInline: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
                <IoLocationOutline style={{ minWidth: '18px', width: 'fit-content', height: 'fit-content'}} />
                <span>
                  {companyInfoData?.FrontEndAddress}, {companyInfoData?.FrontEndCity} - {companyInfoData?.FrontEndZipCode}
                </span>
              </p>
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
      </div>
    </div>
  )
}

export default Footer;