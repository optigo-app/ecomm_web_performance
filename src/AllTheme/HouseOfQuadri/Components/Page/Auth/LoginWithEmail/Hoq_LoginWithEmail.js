import React, { useState } from "react";
import "./Hoq_LoginWithEmail.modul.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { ContinueWithEmailAPI } from "../../../../../../utils/API/Auth/ContinueWithEmailAPI";

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

  const validateEmail = (email) => {
    // const regex = /^[a-zA-Z][\w@$&#]*@[a-zA-Z]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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
        console.log(response)
        setIsLoading(false);
        if (response?.Data?.rd[0]?.stat == 1 && response?.Data?.rd[0]?.islead == 1) {
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
    <div className="Hoq_continuemail">
      <ToastContainer style={{
        zIndex: 999999
      }} />
      {isLoading && (
        <div className="loader-overlay">
          <CircularProgress className="loadingBarManage" />
        </div>
      )}
      <div >
        <form onSubmit={(e) => { handleSubmit(); e.preventDefault() }} className="smling-forgot-main">
          <p
            style={{
              textAlign: "center",
              paddingBlock: "60px",
              marginTop: "0px",
              fontSize: "40px",
              color: "#7d7f85",
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
              color: "#7d7f85",
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
              className="smr_continuEmailBox"
              style={{ margin: "15px" }}
              value={email}
              // onKeyDown={(event) => {
              //   if (event.key === "Enter") {
              //     handleSubmit();
              //   }
              // }}
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
              className="hoq_submitBtnForgot"
            // onClick={handleSubmit}
            >
              SUBMIT
            </button>
            <Button
              // type="submit"
              className="hoq_cancleForgot"
              style={{ marginTop: "10px", color: "gray" }}
              onClick={() => navigation(cancelRedireactUrl)}
            >
              CANCEL
            </Button>
          </div>
        </form>
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
