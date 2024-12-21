import React, { useEffect, useState } from "react";
import "./Footer.modul.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { GrMailOption } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const MobileFooter = ({ socialLinkStr, companyInfoData  : StoreData }) => {
  const [email, setemail] = useState("");
  const navigation = useNavigate();
  const ismobile = useMediaQuery('(max-width:502px)')
  const [companyInfoData, setCompanuInfoData] = useState(StoreData);
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [selectedFooteVal, setSelectedVal] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    let interval;
    const fetchData = () => {
      try {
        const storeInitData = sessionStorage.getItem("storeInit");
        if (storeInitData) {
          const parsedStoreInit = JSON?.parse(storeInitData);
          const companyInfoDataStr = sessionStorage.getItem("CompanyInfoData");
          if (companyInfoDataStr) {
            const parsedCompanyInfo = JSON?.parse(companyInfoDataStr);
            setCompanuInfoData(parsedCompanyInfo);

            const socialLinkStr = parsedCompanyInfo?.SocialLinkObj;
            if (socialLinkStr) {
              try {
                const parsedSocialMediaData = JSON?.parse(socialLinkStr);
                setSocialMediaData(parsedSocialMediaData);
              } catch (error) {
                console.error("Error parsing social media data:", error);
              }
            }
          }

          setLoading(false);
          clearInterval(interval); // Clear the interval once data is found
        }
      } catch (error) {
        console.error("Error parsing data from sessionStorage:", error);
        setLoading(false);
        clearInterval(interval); // Clear the interval in case of error
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for continuous checking
    interval = setInterval(fetchData, 1000);

    // Cleanup function to clear interval on unmount
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);


  const HandleFormSubmit = async (e) => {
    setLoading1(true);
    e.preventDefault();
    const storeInit = JSON?.parse(sessionStorage?.getItem("storeInit"));
    const newslater = storeInit?.newslatter;
    if (newslater && email) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const newsletterUrl = `${newslater}${email}`;
      fetch(newsletterUrl)
        .then((response) => response.text())
        .then((result) => { setResult(result); setLoading1(false) ; setTimeout(() => {
          setResult(""); // Clear the result after 3000 ms
          setemail('')
        }, 3000); })
        .catch((error) => setResult(error));
    }
  };

 
  const alreadySubs = 'Already Subscribed.';

  return (
    <>
      <div className="mobile_footer">
        {/* Contact us */}
        <div className="accordian_Wrapper">
          <Accordion className="accordian">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="summary"
            >
              <span className="title">Contact Us</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="details">
                <p className="address" style={{
                  fontSize  :!ismobile ? "14.2px"  :"13px"
                }}>
                {companyInfoData?.FrontEndAddress},
        <br />
        {companyInfoData?.FrontEndCity} 
        <br />
        {companyInfoData?.FrontEndZipCode}
                </p>
                <p className="phoneno">Mobile : {companyInfoData?.FrontEndContactno1}</p>
                <p className="email">
                  Email : <span> {companyInfoData?.FrontEndEmail1}</span>
                </p>
                <div
                  className="social-links"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: !ismobile ? "row-reverse"  :"column",
                    gap: "1rem",
                  }}
                >
                  {socialLinkStr?.map((val, i) => {
                    return (
                      <React.Fragment key={i}>
                        <Link
                        key={i}
                          to={val?.SLink}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            textDecoration  :"none",
                            color  :"black"
                          }}
                          target="_blank"
                        >
                          <img
                            src={val?.SImgPath}
                            alt=""
                            width={15}
                            height={15}
                            style={{
                              mixBlendMode: "darken",
                            }}
                          />
                          {val?.SName}
                        </Link>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* signup menu */}
        <div className="accordian_Wrapper">
          <Accordion className="accordian">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="summary"
            >
              <span className="title">NEWSLETTER</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="details">
                <p className="subscribe-text">
                  Subscribe to get special offers, new collection launches, and
                  once-in-a-while deals.
                </p>
                <form onSubmit={HandleFormSubmit} className="subscribe-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    name="email"
                    onChange={(e) => setemail(e.target.value)}

                  />
                  <button type="submit" className="mail">
                    <GrMailOption size={24} color="grey" />
                  </button>
                </form>
                {
        loading1 ? <span className="hoq_error_message" style={{ color: 'black' }}>Loading...</span> : (
          <>
            {result && (
              <span
                className="hoq_error_message"
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
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* policies menu */}
        <div className="accordian_Wrapper">
          <Accordion className="accordian">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="summary"
            >
              <span className="title">Policies</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="details">
                <ul>
                  <li>
                    <Link to="/Privacy-Policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/Shipping-Policy">Shipping Policy</Link>
                  </li>
                  {/* <li>
                    <Link to="/Return-Exchange-Policy">
                      Return & Exchange Policy
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/Terms-Conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/contacts">Contact</Link>
                  </li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* About menu */}
        <div className="accordian_Wrapper">
          <Accordion className="accordian">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="summary"
            >
              <span className="title">About</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="details">
                <ul>
                  {/* <li>
                    <Link to="/blogs">Blogs</Link>
                  </li> */}
                  <li>
                    <Link to="/our-story">Our Story</Link>
                  </li>
                  <li>
          <Link to="/bespoke-jewelry">Bespoke Jewellery</Link>
        </li>  
           <li>
          <Link to="/appointment">Appointment</Link>
        </li>
                  <li>
                    <Link to="/size-guide">Size Guide</Link>
                  </li>
                  <li>
                    <Link to="/lab-grown-diamond">Lab Grown Diamond</Link>
                  </li>
                  {/* <li>
                    <Link to="/diamond-education">Diamond Education</Link>
                  </li> */}
                  <li>
                    <Link to="/quality-certification">
                      Quality & Certification
                    </Link>
                  </li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="brand_logo">
          <div className="pay">
            <img
              src={storImagePath()+`/images/footer/mastercard.webp`}
              alt=""
            />
          </div>
          <div className="pay">
            <img
              src={storImagePath()+`/images/footer/gpay.webp`}
              alt=""
            />
          </div>
          <div className="pay">
            <img
              src={storImagePath()+`/images/footer/visa.webp`}
              alt=""
            />
          </div>
          <div className="pay">
            <img
              src={storImagePath()+`/images/footer/paytm.webp`}
              alt=""
            />
          </div>
        </div>
        <div className="copyright">
          <p>© 2024 Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
