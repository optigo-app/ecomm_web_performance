import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { useNavigate } from 'react-router';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const Footer = ({ fromPage }) => {

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/Store_Init.txt`)
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
    if (htmlContent) {
      setLocalData((prevData) => ({
        ...prevData,
        Footerno: htmlContent?.rd[0]?.Footerno,
      }));
    }
  }, [htmlContent]);

  useEffect(() => {
    let localD = JSON.parse(sessionStorage.getItem('storeInit'));
    setLocalData(localD);
  }, [])


  useEffect(() => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? ""
    const companyInfoData = JSON.parse(sessionStorage.getItem("CompanyInfoData")) ?? ""
    if (sessionStorage.getItem("CompanyInfoData")) {
      if (companyInfoData?.SocialLinkObj != "" && companyInfoData?.SocialLinkObj != null && companyInfoData?.SocialLinkObj != undefined) {
        // companyInfoData = JSON?.parse(sessionStorage.getItem("CompanyInfoData")) ?? "";
        const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
        if (parsedSocilaMediaUrlData) {
          setSocialMediaData(parsedSocilaMediaUrlData)
        }
      }
    }
  }, [])

  return (
    <div>
      <div className='stam_Footer1_main'>
        <div className='stam_footerBottomMain'>
          <div className='Stm_footerIconMain'>
            {socialMediaData?.map((social, index) => (
              <div className='footerSocialIcon'>
                <a key={index} href={`${social.SLink}`} target="_blank" rel="noopener noreferrer">
                  <img src={social.SImgPath} alt={social.SName} style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }} />
                </a>
              </div>
            ))}
          </div>
          <div className='footerMoreOption'>
            <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
            <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p>
            <p className='footerMoreOptionData' onClick={() => { navigation('/aboutUs'); window.scrollTo(0, 0); }}>ABOUT US</p>
          </div>
          <div className='footerMoreText'>
            <p style={{
              color: '#7d7f85',
              fontSize: '12px',
              fontWeight: 500,
              marginInline: '15px'
            }}>© {new Date()?.getFullYear()}, {localData?.companyname}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;