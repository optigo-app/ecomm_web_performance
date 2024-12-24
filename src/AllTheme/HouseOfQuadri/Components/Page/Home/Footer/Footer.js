import React, { useEffect, useState } from "react";
import "./Footer.modul.scss";
import Payment from "./Payment";
import MobileFooter from "./MobileFooter";
import { Link, useNavigate } from "react-router-dom";

const Footer = ({ StoreData }) => {
  const [email, setemail] = useState("");
  const [companyInfoData, setCompanuInfoData] = useState(StoreData);
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [selectedFooteVal, setSelectedVal] = useState(0);
  const [loading1, setLoading1] = useState(false);
  console.log('loading1: ', loading1);
  const [result, setResult] = useState();
  const navigation = useNavigate();
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


  return (
    <div className="hoq_main_footer">
      <footer className="footer">
        <div className="footer-content">
          <ContactInformation socialLinkStr={socialMediaData} companyInfoData={companyInfoData} />
          <NewsLetter
            onsubmit={HandleFormSubmit}
            email={email}
            setemail={setemail}
            loading1={loading1}
            result={result}
          />
          <Policy />
          <About />
        </div>
        <Copyright />
      </footer>
      <MobileFooter socialLinkStr={socialMediaData} companyInfoData={companyInfoData} />
    </div>
  );
};

const About = () => {
  return (
    <div className="footer-section about-hoq">
      <h4>ABOUT</h4>
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
        {/* <li>
          <Link to="/size-guide">Size Guide</Link>
        </li> */}
        {/* <li>
          <Link to="/lab-grown-diamond">Lab Grown Diamond</Link>
        </li> */}
        {/* <li>
          <Link to="/diamond-education">Diamond Education</Link>
        </li> */}
        {/* <li>
          <Link to="/quality-certification">Quality & Certification</Link>  
        </li> */}
      </ul>
    </div>
  );
};
const Policy = () => {
  return (
    <div className="footer-section">
      <h4>POLICIES</h4>
      <ul>
        <li>
          <Link to="/Privacy-Policy">Privacy Policy</Link>
        </li>
        {/* <li>
          <Link to="/Shipping-Policy">Shipping Policy</Link>
        </li> */}
        {/* <li>
          <Link to="/Return-Exchange-Policy">Return & Exchange Policy</Link>
        </li> */}
        <li>
          <Link to="/Terms-Conditions">Terms & Conditions</Link>
        </li>
        {/* <li>
          <Link to="/faq">FAQs</Link>
        </li> */}
        <li>
          <Link to="/contacts">Contact</Link>
        </li>
      </ul>
    </div>
  );
};
const NewsLetter = ({ onsubmit, email, setemail, loading1, result }) => {
  const alreadySubs = 'Already Subscribed.';
  return (
    <div className="footer-section">
      <h4>NEWSLETTER</h4>
      <p className="address_hoq">
        Subscribe to get special offers, new collection launches, and
        once-in-a-while deals.
      </p>
      <form className="subscribe-form" onSubmit={onsubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          name="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
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
  );
};
const Copyright = () => {
  return (
    <div className="footer-bottom">
      <Payment />
      <p>© 2024 Lorem ipsum dolor sit amet.</p>
    </div>
  );
};
const ContactInformation = ({ socialLinkStr, companyInfoData }) => {
  return (
    <div className="footer-section">
      <h4>CONTACT US</h4>
      <p className="add_hoq_new_kl">
        {companyInfoData?.FrontEndAddress},
        <br />
        {companyInfoData?.FrontEndCity}
        <br />
        {companyInfoData?.FrontEndZipCode}
      </p>
      <p>
        Mob. {companyInfoData?.FrontEndContactno1}
        <br />
        Email:     {companyInfoData?.FrontEndEmail1}
      </p>
      <div className="social-links">
        {
          socialLinkStr?.map((val, i) => {
            return <React.Fragment key={i}>
              <Link
                key={i}
                to={val?.SLink}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                target="_blank"
              >
                <img src={val?.SImgPath} alt="" width={15} height={15} style={{
                  mixBlendMode: "darken"
                }} />
                {val?.SName}
              </Link>
            </React.Fragment>
          })
        }
      </div>
    </div>
  );
};

export default Footer;
{/* <Link
          to="https://www.facebook.com/"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          target="_blank"
        >
          <FaFacebook size={17} color="blue" />
          Facebook
        </Link> */}