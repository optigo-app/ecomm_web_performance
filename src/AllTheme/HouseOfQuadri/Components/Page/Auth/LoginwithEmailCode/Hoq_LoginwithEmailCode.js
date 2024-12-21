import "./Hoq_LoginwithEmailCode.modul.scss";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import { LoginWithEmailCodeAPI } from "../../../../../../utils/API/Auth/LoginWithEmailCodeAPI";
import { LoginWithEmailAPI } from "../../../../../../utils/API/Auth/LoginWithEmailAPI";
import { useSetRecoilState } from "recoil";
import { Hoq_loginState } from "../../../Recoil/atom";

export default function LoginWithEmailCode() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const [mobileNo, setMobileNo] = useState("");
  const [resendTimer, setResendTimer] = useState(120);
  const setIsLoginState = useSetRecoilState(Hoq_loginState);
  const location = useLocation();

  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const cancelRedireactUrl = `/LoginOption/${search}`;

  useEffect(() => {
    const fetchData = async () => {
      const storedEmail = sessionStorage.getItem("registerEmail");
      if (storedEmail) {
        setEmail(storedEmail);
        const value = sessionStorage.getItem("LoginCodeEmail");
        if (value === "true") {
          sessionStorage.setItem("LoginCodeEmail", "false");
          LoginWithEmailCodeAPI(storedEmail)
            .then((response) => {
              if (response.Data.Table1[0].stat === "1") {
                toast.success("OTP send Sucssessfully");
              } else {
                toast.error("OTP send Error");
              }
            })
            .catch((err) => console.log(err));
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // const handleResendTimer = () => {
  //     const interval = setInterval(() => {
  //         setResendTimer(prevTimer => {
  //             if (prevTimer === 0) {
  //                 clearInterval(interval);
  //                 return 0;
  //             }
  //             return prevTimer - 1;
  //         });
  //     }, 1000);
  // };

  const handleInputChange = (e, setter, fieldName) => {
    const { value } = e.target;
    setter(value);
    if (fieldName === "mobileNo") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobileNo: "Code is required",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, mobileNo: "" }));
      }
    }
  };

  const handleSubmit = async () => {
    if (!mobileNo.trim()) {
      errors.mobileNo = "Code is required";
      return;
    }

    // try {
    setIsLoading(true);
    // const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
    // const { FrontEnd_RegNo } = storeInit;

    // const combinedValue = JSON.stringify({
    //     userid: `${email}`, mobileno: '', pass: `${mobileNo}`, mobiletoken: 'otp_email_login', FrontEnd_RegNo: `${FrontEnd_RegNo}`
    // });
    // const encodedCombinedValue = btoa(combinedValue);
    // const body = {
    //     "con": "{\"id\":\"\",\"mode\":\"WEBLOGIN\"}",
    //     "f": "LoginWithEmail (handleSubmit)",
    //     p: encodedCombinedValue
    // };
    // const response = await CommonAPI(body);

    LoginWithEmailAPI(email, "", mobileNo, "otp_email_login", "")
      .then((response) => {
        setIsLoading(false);
        if (response?.Data?.rd[0]?.stat === 1) {
          setIsLoginState(true);
          sessionStorage.setItem("LoginUser", true);
          sessionStorage.setItem(
            "loginUserDetail",
            JSON.stringify(response.Data.rd[0])
          );

          if (redirectEmailUrl) {
            navigation(redirectEmailUrl);
          } else {
            navigation("/");
          }
        } else {
          errors.mobileNo = "Code is Invalid";
        }
      })
      .catch((err) => console.log(err));

    // } catch (error) {
    //     console.error('Error:', error);
    // } finally {
    //     setIsLoading(false);
    // }
  };

  const handleResendCode = async () => {
    setResendTimer(120);
    // try {
    //     const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
    //     const { FrontEnd_RegNo } = storeInit;
    //     const combinedValue = JSON.stringify({
    //         userid: `${email}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`
    //     });
    //     const encodedCombinedValue = btoa(combinedValue);
    //     const body = {
    //         "con": "{\"id\":\"\",\"mode\":\"WEBSCEMAIL\"}",
    //         "f": "LoginWithEmailCode (firstTimeOTP)",
    //         p: encodedCombinedValue
    //     };
    //     const response = await CommonAPI(body);

    LoginWithEmailCodeAPI(email)
      .then((response) => {
        if (response.Data.Table1[0].stat === "1") {
          sessionStorage.setItem("LoginCodeEmail", "false");
          toast.success("OTP send Sucssessfully");
        } else {
          toast.error("OTP send Error");
        }
      })
      .catch((err) => console.log(err));

    // } catch (error) {
    //     console.error('Error:', error);
    // }
  };

  return (
    <div className="Hoq_loginwithemailCode" style={{ paddingTop: "10px" }}>
      <ToastContainer  style={{
                zIndex : 999999
            }}/>
      {isLoading && (
        <div className="loader-overlay">
          <CircularProgress className="loadingBarManage" />
        </div>
      )}
      <div >
        <div className="smling-forgot-main">
          <p
            style={{
              textAlign: "center",
              paddingBlock: "60px",
              marginTop: "15px",
              fontSize: "40px",
              color: "#7d7f85",
            }}
            className="AuthScreenMainTitle"
          >
            Login With Code
          </p>
          <p
            style={{
              textAlign: "center",
              marginTop: "-80px",
              fontSize: "15px",
              color: "#7d7f85",
            }}
            className="AuthScreenSubTitle"
          >
            Last step! To secure your account, enter the code we just sent to{" "}
            {email}.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <TextField
              autoFocus
              id="outlined-basic"
              label="Enter Code"
              variant="outlined"
              className="labgrowRegister"
              style={{ margin: "15px" }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
              value={mobileNo}
              onChange={(e) => handleInputChange(e, setMobileNo, "mobileNo")}
              error={!!errors.mobileNo}
              helperText={errors.mobileNo}
            />

            <button className="hoq_submitBtnForgot" onClick={handleSubmit}>
              Login
            </button>
            <p style={{ marginTop: "10px" }}>
              Didn't get the code ?{" "}
              {resendTimer === 0 ? (
                <span
                  style={{
                    fontWeight: 500,
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleResendCode}
                >
                  Resend Code
                </span>
              ) : (
                <span>
                  Resend in{" "}
                  {Math.floor(resendTimer / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(resendTimer % 60).toString().padStart(2, "0")}
                </span>
              )}
            </p>
            <Button
              style={{ marginTop: "10px", color: "gray" }}
              onClick={() => navigation(cancelRedireactUrl)}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBlock: "30px",
        }}
      >
        <p
          style={{
            margin: "0px",
            fontWeight: 500,
            width: "100px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          BACK TO TOP
        </p>
      </div>
    </div>
  );
}
