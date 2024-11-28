import React, { useEffect, useState } from 'react'
import './Footer.modul.scss'
import { useNavigate } from 'react-router';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const Footer = ({ fromPage }) => {

  const [socialMediaData, setSocialMediaData] = useState([]);
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  let storeinit = JSON.parse(sessionStorage?.getItem("storeInit"));
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

    const companyInfoData = JSON?.parse(sessionStorage?.getItem("CompanyInfoData")) ?? "";
    if (companyInfoData?.SocialLinkObj) {
      const parsedSocialMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
      setSocialMediaData(parsedSocialMediaUrlData);
    }
  }, []);


  useEffect(() => {
    let localD = JSON?.parse(sessionStorage?.getItem('storeInit'));
    setLocalData(localD);
  }, [])

  return (
    <div>
      {storeinit?.IsPLW == 0 &&
        <div>
          {localData?.Footerno === 1 &&
            <div className='smr_Footer1_main'>
              <div className='footerBottomMain' style={{ marginTop: fromPage === "ProdList" && '8%' }}>
                <div className='footerIconMain'>
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
                  {/* <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p> */}
                  {htmlContent?.rd && htmlContent?.rd.length > 0 &&
                    (
                      htmlContent?.rd[0]?.ExtraMenu == 1 &&
                      <>
                        <p className='footerMoreOptionData' onClick={() => { navigation('/ExpertAdvice'); window.scrollTo(0, 0); }}>EXPERT ADVICE</p>
                        {/* Maiora not needed */}
                        {/* Kayra needed */}
                        <p className='footerMoreOptionData' onClick={() => { navigation('/FunFact'); window.scrollTo(0, 0); }}>FUN FACT</p>
                      </>
                    )}
                </div>
                <div className='footerMoreText'>
                  {/* Maiora not needed */}
                  {/* Kayra needed */}
                  <Copyright localData={localData}/>
                  <p style={{
                    color: '#7d7f85',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }} onClick={() => navigation('/TermsPolicy')}>Terms & Privacy</p>
                </div>
              </div>
              {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src='https://smilingrocks.com/cdn/shop/t/157/assets/passport.svg?v=152807140915720846441675380017' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
              </div> */}
            </div>
          }

          {localData?.Footerno === 2 &&
            <div className='smr_Footer2_main'>
              <div className='footerBottomMain' style={{ marginTop: fromPage === "ProdList" && '8%' }}>

                <div className='footerMoreOption'>
                  <p className='footerMoreOptionData' onClick={() => { navigation('/contactUs'); window.scrollTo(0, 0); }}>CONTACT US</p>
                  {/* <p className='footerMoreOptionData' onClick={() => {navigation('/faq'); window.scrollTo(0, 0); }}>FAQ</p> */}
                  {/* <p className='footerMoreOptionData' onClick={() => { navigation('/servicePolicy'); window.scrollTo(0, 0); }}>SERVICE POLICY</p> */}
                  {htmlContent?.rd && htmlContent?.rd.length > 0 &&
                    (
                      htmlContent?.rd[0]?.ExtraMenu == 1 &&
                      <>
                        <p className='footerMoreOptionData' onClick={() => { navigation('/ExpertAdvice'); window.scrollTo(0, 0); }}>EXPERT ADVICE</p>
                        {/* Maiora not needed */}
                        {/* Kayra needed */}
                        <p className='footerMoreOptionData' onClick={() => { navigation('/FunFact'); window.scrollTo(0, 0); }}>FUN FACT</p>
                      </>
                    )}
                  <p className='footerMoreOptionData' onClick={() => navigation('/TermsPolicy')}>TERMS & PRIVACY</p>
                  {/* <p className='footerMoreOptionData' onClick={() => navigation('/press')}>PRESS</p> */}
                </div>
                <div className='footerIconMain'>
                  {socialMediaData?.map((social, index) => (
                    <div className='footerSocialIcon'>
                      <a key={index} href={`https://${social.SLink}`} target="_blank" rel="noopener noreferrer">
                        <img src={social.SImgPath} alt={social.SName} style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }} />
                      </a>
                    </div>
                  ))}
                </div>

              </div>
              {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src='https://smilingrocks.com/cdn/shop/t/157/assets/passport.svg?v=152807140915720846441675380017' style={{ height: '80px', cursor: 'pointer', paddingBlock: '10px' }} />
              </div> */}
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Footer;


const Copyright = ({ localData, title }) => {
  return <p style={{
    color: '#7d7f85',
    fontSize: '12px',
    fontWeight: 500,
    marginInline: '15px'
  }}>© {new Date()?.getFullYear()}, {title || localData?.companyname}</p>
  {/* // }}>© 2024, optigoapps</p> */ }
}