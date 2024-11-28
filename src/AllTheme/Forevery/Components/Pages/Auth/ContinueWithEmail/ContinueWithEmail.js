import React, { useEffect, useState } from "react";
import "./ContinueWithEmail.modul.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Footer from "../../Home/Footer/Footer";
import { ContinueWithEmailAPI } from "../../../../../../utils/API/Auth/ContinueWithEmailAPI";
import btnstyle from '../../../scss/Button.module.scss'

export default function ContinueWithEmail() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();

  const search = location?.search;
  const redirectEmailUrl = `/LoginWithEmail/${search}`;
  const redirectSignUpUrl = `/register/${search}`;
  const cancelRedireactUrl = `/LoginOption/${search}`;

  // const validateEmail = (email) => {
  //     const regex = /^[a-zA-Z][\w@$&#]*@[a-zA-Z]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
  //     return regex.test(email);
  // };

  useEffect(() => {
    setCSSVariable();
  }, []);
  const validateEmail = (email) => {
    // const regex = /^[a-zA-Z][\w@$&#]*@[a-zA-Z]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0
    })
  }, [])

  const handleEmailChange = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim();
    setEmail(trimmedValue);
    if (!trimmedValue) {
      setEmailError("Email is required.");
    } else if (!validateEmail(trimmedValue)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const setCSSVariable = () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const backgroundColor = storeInit?.IsPLW == 1 ? "#c4cfdb" : "#c0bbb1";
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  };

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError("Email is required.");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    setIsLoading(true);
    ContinueWithEmailAPI(trimmedEmail)
      .then((response) => {
        setIsLoading(false);
        if (response.Data.rd[0].stat == 1 && response.Data.rd[0].islead == 1) {
          toast.error("You are not a customer, contact to admin");
        } else if (
          response.Data.rd[0].stat == 1 &&
          response.Data.rd[0].islead == 0
        ) {
          navigation(redirectEmailUrl, { state: { email: trimmedEmail } });
          if (trimmedEmail) {
            sessionStorage.setItem("registerEmail", trimmedEmail);
          }
        } else {
          navigation(redirectSignUpUrl, { state: { email: trimmedEmail } });
        }
      })
      .catch((err) => console.log(err));

    // const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
    // const { FrontEnd_RegNo } = storeInit;

    // const combinedValue = JSON.stringify({
    //     userid: `${(trimmedEmail).toLocaleLowerCase()}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`
    // });
    // const encodedCombinedValue = btoa(combinedValue);
    // const body = {
    //     "con": "{\"id\":\"\",\"mode\":\"WEBVALDNEMAIL\"}",
    //     "f": "emilValid (handleEmail)",
    //     p: encodedCombinedValue
    // };
    // const response = await CommonAPI(body);
    // console.log('ressssssss', response);
    // if (response.Data.rd[0].stat == 1 && response.Data.rd[0].islead == 1) {
    //     toast.error('You are not a customer, contact to admin')
    // } else if (response.Data.rd[0].stat == 1 && response.Data.rd[0].islead == 0) {
    //     navigation('/LoginWithEmail', { state: { email: trimmedEmail } });
    //     if (trimmedEmail) {
    //         sessionStorage.setItem("userEmailForPdList", trimmedEmail);
    //     }
    // } else {
    //     navigation('/register', { state: { email: trimmedEmail } });
    // }

    // setIsLoading(false);
  };

  return (
    <div className="for_continuemail" style={{ backgroundColor: "white" }}>
      <ToastContainer />
      {isLoading && (
        <div className="loader-overlay">
          <CircularProgress className="loadingBarManage" />
        </div>
      )}
      <div>
        <div className="smling-forgot-main">
          <p
            style={{
              textAlign: "center",
              paddingBlock: "60px",
              marginTop: "0px",
              fontSize: "40px",
              color: "black",
            }}
            className="AuthScreenMainTitle"
          >
            Continue With Email
          </p>
          <p
            style={{
              textAlign: "center",
              marginTop: "-60px",
              fontSize: "15px",
              color: "black",
            }}
            className="AuthScreenSubTitle"
          >
            We'll check if you have an account, and help create one if you
            don't.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              autoFocus
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="for_continuEmailBox"
              style={{ margin: "15px" }}
              value={email}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />

            {/* <button
                            className={`submitBtnForgot ${buttonFocused ? 'focused' : ''}`}
                            onClick={handleSubmit}
                            onFocus={() => setButtonFocused(true)}
                            onBlur={() => setButtonFocused(false)}
                            style={{borderColor: 'red'}}
                        >

                        </button> */}

            <button

              type="submit"
              className={`submitBtnForgot `}
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
            <Button
              className="for_cancleForgot"
              disableRipple={true}
              style={{ marginTop: "10px", color: "black" }}
              onClick={() => navigation(cancelRedireactUrl)}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
