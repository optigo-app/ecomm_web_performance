import React, { useEffect, useState } from "react";
import "./Footer.modul.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { dt_companyLogo, dt_loginState } from "../../../Recoil/atom";
import Cookies from "js-cookie";

export default function Footer() {
  const titleImg = useRecoilValue(dt_companyLogo);
  const [storeInitData, setStoreInitData] = useState();
  const [companyInfoData, setCompanuInfoData] = useState();
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [islogin, setIsLogin] = useRecoilState(dt_loginState);
  const [selectedFooteVal, setSelectedVal] = useState(0);
  const [result, setResult] = useState();
  const navigation = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitNewlater = () => {
    setLoading(true);
    const storeInit = JSON?.parse(sessionStorage.getItem('storeInit'));
    const newslater = storeInit?.newslatter;
    if (newslater && email) {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      const newsletterUrl = `${newslater}${email}`;
      fetch(newsletterUrl)
        .then((response) => response.text())
        .then((result) => { setResult(result); setLoading(false) })
        .catch((error) => setResult(error));
    }

  };

  const alreadySubs = 'Already Subscribed.';

  const handleNavigte = (navigateUrl) => {
    navigation(navigateUrl);
  };

  useEffect(() => {
    const storeInit = JSON.parse(sessionStorage?.getItem("storeInit")) ?? "";
    setStoreInitData(storeInit);
    const companyInfoData =
      JSON.parse(sessionStorage?.getItem("CompanyInfoData")) ?? "";
    if (companyInfoData) {
      setCompanuInfoData(companyInfoData);
      const parsedSocilaMediaUrlData = companyInfoData?.SocialLinkObj;
      setSocialMediaData(parsedSocilaMediaUrlData);
    }
  }, []);

  const openPdf = () => {
    window.open(`${storImagePath()}/html/size_guide_diamondtine.pdf`, "_blank");
    // window.open(`${storImagePath()}/html/size_guide_sonasons.pdf`, '_blank');
  };

  const handleLogout = () => {
    navigation("/");
    setIsLogin(false);
    Cookies.remove("userLoginCookie");
    window.location.reload();
    sessionStorage.setItem("LoginUser", false);
    sessionStorage.removeItem("storeInit");
    sessionStorage.removeItem("loginUserDetail");
    sessionStorage.removeItem("remarks");
    sessionStorage.removeItem("selectedAddressId");
    sessionStorage.removeItem("orderNumber");
    sessionStorage.removeItem("registerEmail");
    sessionStorage.removeItem("UploadLogicalPath");
    sessionStorage.removeItem("remarks");
    sessionStorage.removeItem("registerMobile");
    sessionStorage.removeItem("allproductlist");
    sessionStorage.clear();
  };

  return (
    <div className="dt_footer_main">
      <div className="daimondFooterMain">
        <div
          className="footerNewslater"
          style={{
            paddingTop: "30px",
            paddingInline: "20%",
            marginTop: "50px",
          }}
        >
          <div className="subScriMain">
            {/* <p className='subScriMainTitle'>STAY CONNECTED FOR LATEST COLLECTIONS OFFERS</p> */}
            <p className="subScriMainTitle">LATEST COLLECTIONS & OFFERS</p>
            <div
              style={{
                width: "100%",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <input
                type="text"
                className="footerInputBox"
                placeholder="Your email here"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {
                loading ? <span style={{ color: "white" }} className="elv_error_message">Loading...</span> : (
                  <>
                    {result && (
                      <span
                        className="elv_error_message"
                        style={{
                          color: result === alreadySubs ? "#FF0000" : "#04AF70",
                          marginTop: "0px",
                          display: "block",
                        }}
                      >
                        {result}
                      </span>
                    )}
                  </>
                )}
              <button className="FooterSubBtn" onClick={handleSubmitNewlater}>
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="FooterLinkMain">
            <div className="FooterLinkMainBox">
              {/* <p className='footerMoteText'>ABOUT SONASONS</p> */}
              <p className="footerMoteText">ABOUT DIAMONDTIME</p>
              <p className="FoooterText">
                We are a contemporary diamond and gold jewellery brand selling
                exquisite pieces for the woman of today.
                <br />
                <span
                  onClick={() => navigation("/aboutUs")}
                  className="dt_footerLermore"
                >
                  {" "}
                  Learn More
                </span>
              </p>
            </div>
            <div className="FooterLinkMainBox">
              <p className="footerMoteText">QUICK LINKS</p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/faq");
                  window.scroll(0, 0);
                }}
              >
                FAQs
              </p>
              <p className="FoooterTextLink" onClick={openPdf}>
                Size Guide
              </p>
              {/* <p className='FoooterTextLink'>Gift Cards</p> */}
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/MaterialCore");
                  window.scroll(0, 0);
                }}
              >
                Material & Care
              </p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/term&condition");
                  window.scroll(0, 0);
                }}
              >
                Terms & Conditions
              </p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/PrivacyPolicy");
                  window.scroll(0, 0);
                }}
              >
                Privacy Policy
              </p>
            </div>
            <div className="FooterLinkMainBox">
              <p className="footerMoteText">CUSTOMER SERVICE</p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/ShipingReturn");
                  window.scroll(0, 0);
                }}
              >
                Shipping & Returns
              </p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/Exchange");
                  window.scroll(0, 0);
                }}
              >
                Exchange & Buyback
              </p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/Location");
                  window.scroll(0, 0);
                }}
              >
                Location
              </p>
              {/* <p className='FoooterTextLink'>Loyalty Program</p> */}
              {/* <p className='FoooterTextLink'>Material & Care</p> */}
              {/* <p className='FoooterTextLink'>Try at Home</p> */}
              <p
                className="FoooterTextLink"
                onClick={() => handleNavigte("/contactUs")}
              >
                Contact us
              </p>
            </div>
            {islogin == true ? (
              <div className="FooterLinkMainBox">
                <p className="footerMoteText">MY ACCOUNT</p>
                <p
                  className="FoooterTextLink"
                  onClick={() => {
                    navigation("/account");
                    window.scroll(0, 0);
                  }}
                >
                  Account
                </p>
                <p className="FoooterTextLink" onClick={handleLogout}>
                  Sign Out
                </p>
                {/* <p className='FoooterTextLink' onClick={() => navigation('/faq')}>Help</p> */}
              </div>
            ) : (
              <div className="FooterLinkMainBox">
                <p className="footerMoteText">MY ACCOUNT</p>
                <p
                  className="FoooterTextLink"
                  onClick={() => navigation("/LoginOption")}
                >
                  Sign In
                </p>
                {/* <p className='FoooterTextLink' onClick={() => navigation('/faq')}>Help</p> */}
              </div>
            )}
          </div>
        </div>
        <div className="footerBottom">
          {/* <img src='https://d-themes.com/wordpress/molla/dummy/wp-content/uploads/sites/38/2020/09/payments.png' className='newImgFooter'/> */}
          {/* <img src={titleImg} className='logoImgFooter' /> */}
          {/* <p className='FooterBottomText'>Copyright © 2024 Sonasons. All Rights Reserved.</p> */}
          <p className="FooterBottomText">
            Copyright © 2024 Diamondtine. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
