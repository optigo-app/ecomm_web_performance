import React, { useEffect } from "react";
import "./LoginOption.modul.scss";
import { useNavigate, useLocation } from "react-router";

import { FaMobileAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Footer from "../../Home/Footer/Footer";
import useHomeBannerImages from "../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";

const LoginOption = ({ data }) => {
  const navigation = useNavigate();
  const location = useLocation();

  const search = location?.search;
  const redirectEmailUrl = `/ContinueWithEmail/${search}`;

  const redirectMobileUrl = `/ContimueWithMobile/${search}`;

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
  }, [])

  return (
    <div className="smr_Loginoption">
      <div className="loginDailog" >
        <div style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}>
          <p className="loginDiTile">Log in or sign up in seconds</p>
          <p
            style={{
              textAlign: "center",
              color: "#5F497A",
            }}
          >
            Use your email or mobile number to continue with the organization.
          </p>
          <div className="smilingLoginOptionMain">
            <div
              className="loginMail"
              onClick={() => navigation(redirectEmailUrl)}
            >
              <IoMdMail
                className="IoMdMail_fg"
                style={{ height: "25px", width: "25px" }}
              />
              <p
                style={{
                  margin: "0px",
                  fontSize: "20px",
                  fontWeight: 500,
                  paddingLeft: "25px",
                }}
              >
                Continue with email
              </p>
            </div>
            {/* Maiora not needed */}
            {/*                           
                        <div className='loginMobile' onClick={() => navigation(redirectMobileUrl)}>
                            <FaMobileAlt className='FaMobileAlt_fg' style={{ height: '25px', width: '25px', marginRight: '10px' }} />
                            <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500, paddingLeft: '25px' }}>Log in with mobile</p>
                        </div> */}
            {/* for kAYRA CRAETEION NEEDED */}
            <div className='loginMobile' onClick={() => navigation(redirectMobileUrl)}>
              <FaMobileAlt className='FaMobileAlt_fg' style={{ height: '25px', width: '25px', marginRight: '10px' }} />
              <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500, paddingLeft: '25px' }}>Log in with mobile</p>
            </div>
          </div>
          <p
            style={{
              marginTop: "40px",
              fontSize: "14px",
              color: "#5F497A",
              textAlign: "center",
            }}
          >
            By continuing, you agree to our Terms of Use. Read our Privacy
            Policy.
          </p>
        </div>
        <Footer data={data} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBlock: "30px",
        }}
      >
        <p
          className="backtotop_lov"

          style={{
            margin: "0px",
            textAlign: "center",
            color: "#5F497A",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "1px",
            whiteSpace: "nowrap"
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          BACK TO TOP
        </p>
      </div>
    </div>
  );
};

export default LoginOption;
