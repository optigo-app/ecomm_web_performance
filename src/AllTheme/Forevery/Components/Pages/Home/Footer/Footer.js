import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { useNavigate } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { useRecoilValue } from "recoil";
import { for_isRingFlowOn } from "../../../Recoil/atom";

const Footer = () => {
  const navigate = useNavigate();
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const [localData, setLocalData] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeSection, setActiveSection] = useState(null);
  const isRingFlowOn = useRecoilValue(for_isRingFlowOn);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  useEffect(() => {
    let localD = JSON?.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localD);
  }, []);

  useEffect(() => {
    let storeInit;
    let companyInfoData;
    setTimeout(() => {
      if (sessionStorage.getItem("storeInit")) {
        storeInit = JSON?.parse(sessionStorage.getItem("storeInit")) ?? {};
      }
      if (sessionStorage.getItem("CompanyInfoData")) {
        companyInfoData =
          JSON?.parse(sessionStorage.getItem("CompanyInfoData")) ?? {};
        setCompanuInfoData(companyInfoData);
        if (
          companyInfoData?.SocialLinkObj !== "" &&
          companyInfoData?.SocialLinkObj !== null &&
          companyInfoData?.SocialLinkObj !== undefined
        ) {
          const parsedSocilaMediaUrlData =
            JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
          if (parsedSocilaMediaUrlData) {
            setSocialMediaData(parsedSocilaMediaUrlData);
          }
        }
      }
    }, 500);
  }, []);

  const handleNavigate = (event, path) => {
    if (
      event?.ctrlKey ||
      event?.shiftKey ||
      event?.metaKey ||
      (event?.button && event?.button === 1)
    ) {
      return;
    } else {
      event?.preventDefault();
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
  const steps2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));

  const checkStepsOf0 =
    (steps?.[0] !== undefined && steps?.[0] !== null) ||
    (steps1?.[0] !== undefined && steps1?.[0] !== null) ||
    (steps2?.[0] !== undefined && steps2?.[0] !== null);

  const sections = [
    {
      title: "About Us",
      items: [
        { name: "About Us", path: "/about-us" },
        // { name: 'Packaging', path: '/packaging' },
        // { name: 'Affiliate Login', path: '/affiliate-login' },
        // { name: 'Partner Login', path: '/partner-login' }
      ],
    },
    {
      title: "Our Services",
      items: [
        { name: "Bespoke Jewelry", path: "/bespoke-jewelry" },
        // { name: 'Bespoke Diamonds', path: '/bespoke-diamonds' },
        // { name: 'Lifetime Warranty', path: '/lifetime-warranty' },
        // { name: 'Free Shipping Worldwide', path: '/free-shipping' },
        // { name: '60-Day Free Resizing', path: '/free-resizing' },
        // { name: 'Free Engraving', path: '/free-engraving' }
      ],
    },
    {
      title: "Need Help",
      items: [
        { name: "Contact Us", path: "/contact-us" },
        { name: "Education", path: "/education" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Condition", path: "/terms-conditions" },
        // { name: 'Blog', path: '/blog' },
        // { name: 'Forevery Reviews', path: '/reviews' }
      ],
    },
    {
      title: "Quick Links",
      items: [
        { name: "Engagement Rings", path: "/lab-created-engagement-rings", disabled: false },
        { name: "Wedding Rings", path: "/lab-grown-wedding-rings", disabled: false },
        { name: "Fine Jewelry", path: "/lab-grown-fine-jewelry", disabled: false },
        { name: 'Certified Loose Diamonds', path: isRingFlowOn === 1 ? '/certified-loose-lab-grown-diamonds/diamond/' : "/", disabled: false },
        // { name: 'Letter Diamonds Jewelry', path: '/letter-diamonds' ,disabled: false }
      ],
    },
    {
      title: "Social Media",
      items: [],
    },
  ];

  const OnlyMobile = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  };

  return (
    <footer className="footer">
      <div className="footerContainer">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`footer-section ${isMobile && activeSection === index ? "active" : ""
              }`}
          >
            <h4
              className={
                section.title === "Social Media" ? "socialMediaTitle" : ""
              }
              style={isMobile ? OnlyMobile : {}}
              onClick={() => isMobile && toggleSection(index)}
            >
              <span>{section.title}</span>
              {isMobile && (
                <span>
                  {activeSection === index ? (
                    <HiOutlineMinusSmall size={22} />
                  ) : (
                    <BsPlus size={22} />
                  )}
                </span>
              )}
            </h4>
            <ul>
              {section.title === "Social Media" ? (
                <div className="socialMediaMainDiv">
                  <div className="socialMediaIconDiv">
                    {socialMediaData?.map((social, index) => (
                      <div className="footerSocialIcon" key={index}>
                        <a
                          href={`${social.SLink}`}
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
                  <a
                    href="/payment-methods"
                    className="paymentLink"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(e, "/payment-methods");
                    }}
                  >
                    <h4>Secure Payment Method</h4>
                  </a>
                  <div className="paymentDiv">
                    <img
                      src="https://forevery.one/icons_images/card.webp"
                      alt="paymant-merchant image"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        mixBlendMode: "multiply",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {section.items.map((item, idx) => {
                    return (
                      <li key={idx}>
                        <a
                          style={
                            item.disabled
                              ? { color: "gray", cursor: "not-allowed" }
                              : {}
                          }
                          href={item?.path}
                          onClick={(e) => {
                            if (item.disabled) {
                              e.preventDefault();
                              return;
                            }
                            if (item?.path === '/certified-loose-lab-grown-diamonds/diamond/') {
                              if (checkStepsOf0) {
                                sessionStorage.removeItem('customizeSteps2Ring');
                                sessionStorage.removeItem('custStepData2Ring');
                                sessionStorage.removeItem('isRing');
                                sessionStorage.removeItem("setImage");
                                sessionStorage.removeItem('ringFlowUrl')
                                sessionStorage.removeItem('ShapeRingFlowUrl');
                                sessionStorage.removeItem("customizeStepsPendant");
                                sessionStorage.removeItem("custStepData2Pendant");
                                sessionStorage.removeItem("setPenImage");
                                sessionStorage.removeItem("isPendant");
                                sessionStorage.removeItem('PendantFlowUrl')
                                sessionStorage.removeItem('ShapePendantFlowUrl')
                                sessionStorage.removeItem("customizeStepsEarring");
                                sessionStorage.removeItem("custStepData2Earring");
                                sessionStorage.removeItem("setEarImage");
                                sessionStorage.removeItem("isPair");
                                sessionStorage.removeItem('EarringFlowUrl')
                                sessionStorage.removeItem('ShapeEarringFlowUrl')
                              }
                            }
                            e.preventDefault();
                            handleNavigate(e, item.path);
                          }}
                        >
                          {item.name}
                        </a>
                      </li>
                    )
                  })}
                </>
              )}
            </ul>
          </div>
        ))}
      </div>
      <ul className="companyCopyRight">
        <li style={{
          fontWeight: "420"
        }}>© 2025 FOREVERY</li>
        <li>
          <a
            href="/terms-conditions"
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleNavigate(e, "/terms-conditions");
          // }}
          >
            TERMS OF CONDITIONS</a>
        </li>
        <li>
          <a
            href="/privacy-policy"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate(e, "/privacy-policy");
            }}
          >
            PRIVACY POLICY
          </a>
        </li>
        <li>
          <a
            href="/#"
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleNavigate(e, "/cookies-policy");
          // }}
          >
            COOKIES POLICY
          </a>
        </li>
        <li>
          <a
            href="/#"
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleNavigate(e, "/return-refund-policy");
          // }}
          >
            RETURN AND REFUND POLICY
          </a>
        </li>
        <li>
          <a
            href="/#"
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleNavigate(e, "/change-cookie-preferences");
          // }}
          >
            CHANGE COOKIE PREFERENCES
          </a>
        </li>
        <li>
          <a
            style={{ color: '#F9F9F9' }}
            href="/#"
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleNavigate(e, "/change-cookie-preferences");
          // }}
          >
            Ver: 1.0.110320251027
            {/* { 110120251850 : date and time } */}
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
