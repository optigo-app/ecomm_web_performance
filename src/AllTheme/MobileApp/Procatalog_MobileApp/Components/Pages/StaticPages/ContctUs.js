import React, { useEffect, useState } from 'react'
import { IoMdCall, IoMdMail } from 'react-icons/io';
import { IoArrowBack, IoLocationOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './ContactUs.scss'

function ContctUs() {

    const [socialMediaData, setSocialMediaData] = useState([]);
    const [companyInfoData, setCompanuInfoData] = useState();
    const navigation = useNavigate();
    const [localData, setLocalData] = useState();

    useEffect(() => {
        let localD = JSON.parse(sessionStorage.getItem('storeInit'));
        setLocalData(localD);
    }, [])

    useEffect(() => {
        let storeInit;
        let companyInfoData;
        if (sessionStorage.getItem("CompanyInfoData")) {
            if (companyInfoData?.SocialLinkObj != "" && companyInfoData?.SocialLinkObj != null && companyInfoData?.SocialLinkObj != undefined) {
                companyInfoData = JSON?.parse(sessionStorage.getItem("CompanyInfoData")) ?? "";
                const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
                if (parsedSocilaMediaUrlData) {
                    setSocialMediaData(parsedSocilaMediaUrlData)
                }
            }
        }
    }, [])

    return (
        <div>
            {localData?.Footerno === 1 &&
                <div className='ProCatApp_Footer1_main'>
                    <p className="SmiCartListTitle">
                        <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigation(-1)} />Contact US
                    </p>
                    <div className='footerBottomMain' style={{ marginTop: '0%' }}>
                        <div className='footerMoreOption'>
                            <div className='proCat_AddresMain' style={{ marginLeft: '100px' }}>
                                {/* <p style={{ color: '#7d7f85', fontSize: '17px', fontWeight: 600 }}>Contact Us</p> */}
                                <p className='footerOfficeDesc' style={{ display: 'flex', fontFamily: 'PT Sans, sans-serif' }}>
                                    <IoLocationOutline style={{ width: '22px', height: '22px' }} />
                                    <span style={{ color: '#7d7f85', fontSize: '14px', width: '80%' }}>
                                        D-Block G20, ITC( International Trade Centre),<br />
                                        Majura Gate, Ring Road,<br />
                                        Surat - 395001
                                        {/* {companyInfoData?.FrontEndAddress},<br /> {companyInfoData?.FrontEndCity} - {companyInfoData?.FrontEndZipCode} */}
                                    </span>
                                </p>
                                <p className="footerOfficeDesc" style={{ fontFamily: 'PT Sans, sans-serif', margin: '0px' }}>
                                    <IoMdCall />
                                    <span style={{ marginLeft: '5px', color: '#7d7f85', fontSize: '13px' }}>
                                        {/* <a href="tel:+919099887762"style={{ textDecoration: 'none', color: '#7d7f85' }}> */}
                                            +91 9099887762
                                        {/* </a> */}
                                    </span>
                                </p>
                                <p className='footerOfficeDesc' style={{ fontFamily: 'PT Sans, sans-serif', marginTop: "8px" }}>
                                    <IoMdMail />
                                    <span style={{ marginLeft: '5px', color: '#7d7f85', fontSize: '13px' }}>
                                        {/* <a href="mailto:hello@optigoapps.com" style={{ textDecoration: 'none', color: '#7d7f85' }}> */}
                                            hello@optigoapps.com
                                        {/* </a> */}
                                    </span>
                                </p>
                            </div>
                            <div className='proCat_SoicialMain' style={{ marginLeft: '100px', width: '40%' }}>
                                {socialMediaData?.length != 0 && <p style={{ color: '#7d7f85', fontSize: '17px', fontWeight: 600 }}>Follow Us</p>}
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
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ContctUs