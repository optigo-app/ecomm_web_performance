import React, { useEffect, useState } from "react";
import "./Footer.modul.scss";
import { useLocation, useNavigate } from "react-router";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { fetchAPIUrlFromStoreInit } from "../../../../../../utils/Glob_Functions/GlobalFunction";

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
    const fetchCompanyInfo = async () => {
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
      } else {
        try {
          const fetchedData = await fetchAPIUrlFromStoreInit();
          if (fetchedData) {
            sessionStorage.setItem("CompanyInfoData", JSON.stringify(fetchedData));
            setCompanyInfoData(fetchedData.rd[0]);
            const parsedSocialMediaUrlData = fetchedData.rd[0]?.SocialLinkObj
              ? JSON.parse(fetchedData.rd[0].SocialLinkObj)
              : [];
            setSocialMediaData(parsedSocialMediaUrlData);
          }
        } catch (error) {
          console.error("Failed to fetch company info after retries:", error);
        }
      }
    };

    fetchCompanyInfo();

  }, []);
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
                    <span>{companyInfoData?.FrontEndContactno1}</span>
                    {companyInfoData?.FrontEndContactno2 && (<>
                      <span>
                        &#x2c;&nbsp;
                      </span>
                      <span>{companyInfoData?.FrontEndContactno2}</span>
                    </>)}
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
                <NavLink to={"terms-and-conditions"}>Terms and Condition</NavLink>
                <NavLink to={"privacy-policy"}>Privacy Policy</NavLink>
                <NavLink to={"aboutUs"}>About Us</NavLink>
                <NavLink to={"refund-policy"}>Refund  Policy</NavLink>
                <NavLink to={"shipping-policy"}>Shipping Policy</NavLink>
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p
                    style={{
                      color: "#7d7f85",
                      fontSize: "17px",
                      fontWeight: 600,
                    }}
                  >
                    Follow Us
                  </p>
                  <p style={{ color: "white" }}>020625</p>
                </div>
              )}
              <div className="footerIconMain">
                {socialMediaData && socialMediaData?.map((social, index) => (
                  <div className="footerSocialIcon">
                    <a
                      key={index}
                      href={`https://${social?.SLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={social?.SImgPath}
                        alt={social?.SName}
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
