import React, { useEffect, useState } from "react";
import "./Footer.modul.scss";
import { useLocation, useNavigate } from "react-router";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Footer = ({ fromPage }) => {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanyInfoData] = useState(null);
  const navigation = useNavigate();
  const [localData, setLocalData] = useState();
  const location = useLocation();

  useEffect(() => {
    let localD = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localD);
  }, []);

  useEffect(() => {
    const fetchCompanyInfo = () => {
      const storedData = sessionStorage.getItem("CompanyInfoData");
      if (storedData) {
        const parsedData = JSON?.parse(storedData);
        if (!companyInfoData) {
          setCompanyInfoData(parsedData);
          const parsedSocialMediaUrlData = parsedData?.SocialLinkObj
            ? JSON.parse(parsedData.SocialLinkObj)
            : [];
          setSocialMediaData(parsedSocialMediaUrlData);
        }
      }
    };

    if (!companyInfoData) {
      const intervalId = setInterval(fetchCompanyInfo, 2000);
      return () => clearInterval(intervalId);
    }
  }, [companyInfoData]);

  // useEffect(() => {
  //   let companyInfoData;
  //   const storedData = JSON.parse(sessionStorage.getItem("CompanyInfoData"));
  //   setCompanuInfoData(storedData);
  //   if (sessionStorage.getItem("CompanyInfoData")) {
  //     if (companyInfoData?.SocialLinkObj != "" || companyInfoData?.SocialLinkObj != null || companyInfoData?.SocialLinkObj != undefined) {
  //       // companyInfoData = JSON?.parse(sessionStorage.getItem("CompanyInfoData")) ?? "";
  //       const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
  //       if (parsedSocilaMediaUrlData) {
  //         setSocialMediaData(parsedSocilaMediaUrlData)
  //       }
  //     }
  //   }
  // }, [])

  useEffect(() => {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  }, [location.pathname, location.key]);

  return (
    <div>
      <div className="ProCat_Footer1_main">
        <div
          className="footerBottomMain"
          style={{ marginTop: fromPage === "ProdList" && "8%" }}
        >
          <div className="footerMoreOption">
            <div className="proCat_AddresMain" style={{ marginLeft: "100px" }}>
              {(companyInfoData?.FrontEndAddress !== "" ||
                companyInfoData?.FrontEndCity !== "" ||
                companyInfoData?.FrontEndZipCode !== "" ||
                companyInfoData?.FrontEndContactno1 !== "" ||
                companyInfoData?.FrontEndEmail1 !== "") && (
                <p
                  style={{
                    color: "#7d7f85",
                    fontSize: "17px",
                    fontWeight: 600,
                  }}
                >
                  Contact Us
                </p>
              )}
              {companyInfoData?.FrontEndAddress !== "" && (
                <p
                  className="footerOfficeDesc"
                  style={{ display: "flex", fontFamily: "PT Sans, sans-serif" }}
                >
                  <IoLocationOutline
                    style={{ width: "22px", height: "22px" }}
                  />
                  <span style={{ color: "#7d7f85", width: "80%" }}>
                    {companyInfoData?.FrontEndAddress},<br />{" "}
                    {companyInfoData?.FrontEndCity} -{" "}
                    {companyInfoData?.FrontEndZipCode}
                  </span>
                </p>
              )}
              {companyInfoData?.FrontEndContactno1 !== "" && (
                <p
                  className="footerOfficeDesc"
                  style={{ fontFamily: "PT Sans, sans-serif", margin: "0px" }}
                >
                  <IoMdCall />
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "#7d7f85",
                      fontSize: "13px",
                    }}
                  >
                    {/* <a href={`tel:${companyInfoData?.FrontEndContactno1}`}>
                      {companyInfoData?.FrontEndContactno1}
                    </a> */}
                    {companyInfoData?.FrontEndContactno1}
                  </span>
                </p>
              )}
              {companyInfoData?.FrontEndEmail1 !== "" && (
                <p
                  className="footerOfficeDesc"
                  style={{ fontFamily: "PT Sans, sans-serif" }}
                >
                  <IoMdMail />
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "#7d7f85",
                      fontSize: "13px",
                    }}
                  >
                    {/* <a href={`mailto:${companyInfoData?.FrontEndEmail1}`}>
                      {companyInfoData?.FrontEndEmail1}
                    </a> */}
                    {companyInfoData?.FrontEndEmail1}
                  </span>
                </p>
              )}
            </div>
            <div
              className="proCat_SoicialMain"
              style={{ marginLeft: "100px", width: "40%" }}
            >
              {socialMediaData?.length != 0 && (
                <p
                className='pro-title'
                  style={{
                    color: "#7d7f85",
                    fontSize: "17px",
                    fontWeight: 600,
                  }}
                >
                  Links
                </p>
              )}
              <div className="footerIconMain new-link-proc">
                <NavLink to={"terms-and-conditions"}>Terms and Policy</NavLink>
                <NavLink to={"privacy-policy"}>Privacy and Policy</NavLink>
                <NavLink to={"aboutUs"}>About Us</NavLink>
                {/* {socialMediaData?.map((social, index) => (
                  <div className='footerSocialIcon'>
                    <a key={index} href={`https://${social.SLink}`} target="_blank" rel="noopener noreferrer">
                      <img src={social.SImgPath} alt={social.SName} style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }} />
                    </a>
                  </div>
                ))} */}
              </div>
            </div>
            <div
              className="proCat_SoicialMain"
              style={{ marginLeft: "100px", width: "30%" }}
            >
              {socialMediaData?.length != 0 && (
                <p
                  style={{
                    color: "#7d7f85",
                    fontSize: "17px",
                    fontWeight: 600,
                  }}
                >
                  Follow Us
                </p>
              )}
              <div className="footerIconMain">
                {socialMediaData?.map((social, index) => (
                  <div className="footerSocialIcon">
                    <a
                      key={index}
                      href={`https://${social.SLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={social.SImgPath}
                        alt={social.SName}
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
