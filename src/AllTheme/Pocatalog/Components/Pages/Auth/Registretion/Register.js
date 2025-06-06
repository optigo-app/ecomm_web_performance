import React, { useEffect, useRef, useState } from "react";
import "./Register.modul.scss";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CryptoJS from "crypto-js";
import { useSetRecoilState } from "recoil";
import Footer from "../../Home/Footer/Footer";
import { RegisterAPI } from "../../../../../../utils/API/Auth/RegisterAPI";
import { CommonAPI } from "../../../../../../utils/API/CommonAPI/CommonAPI";
import { proCat_loginState } from "../../../Recoil/atom";
import { CountryCodeListApi } from "../../../../../../utils/API/Auth/CountryCodeListApi";
import Cookies from 'js-cookie';
import CountryDropDown from "../../../../../../utils/Glob_Functions/CountryDropDown/CountryDropDown";

export default function Register() {
  const navigation = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [Errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState("");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const mobileNoRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const visiterID = Cookies.get("visiterId");
  const [Countrycodestate, setCountrycodestate] = useState();
  const [open, setOpen] = useState(false);
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const cancelRedireactUrl = `/LoginOption/${search}`;
  const singupRedirectUrl = `/LoginOption/${search}`;

  const setIsLoginState = useSetRecoilState(proCat_loginState);
  const [IsMobileThrough, setIsMobileThrough] = useState(false)
  const AllCode = JSON?.parse(sessionStorage?.getItem('CountryCodeListApi')) ?? [];

  const handleKeyDown = (event, nextRef) => {
    if (event.key === "Enter") {
      // event.preventDefault();
      nextRef.current.focus();
    }
  };

  useEffect(() => {
    const storedEmail = location.state?.email;
    const routeMobileNo = location.state?.mobileNo;
    const routeMobileCountry = location.state?.code;

    if (routeMobileNo && routeMobileCountry) {
      setMobileNo(routeMobileNo);
      setCountrycodestate(routeMobileCountry);
      mobileNoRef.current.disabled = true;
      setIsMobileThrough(true);
    }

    if (storedEmail) {
      setEmail(storedEmail);
      emailRef.current.disabled = true;
      setIsMobileThrough(false);
    }
  }, [location.state]);

  const handleInputChange = (e, setter, fieldName) => {
    const { value } = e.target;
    setter(value);
    if (fieldName === "firstName") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "First Name is required",
        }));
      } else if (
        !/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "Invalid First Name",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
      }
    } else if (fieldName === "lastName") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: "Last Name is required",
        }));
      } else if (
        !/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: "Invalid Last Name",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, lastName: "" }));
      }
    }
    // else if (fieldName === "mobileNo") {
    //   if (!value.trim()) {
    //     setErrors((prevErrors) => ({
    //       ...prevErrors,
    //       mobileNo: "Mobile No. is required",
    //     }));
    //   } else if (!/^\d{10}$/.test(value.trim())) {
    //     setErrors((prevErrors) => ({
    //       ...prevErrors,
    //       mobileNo: "Enter Valid mobile number",
    //     }));
    //   } else {
    //     setErrors((prevErrors) => ({ ...prevErrors, mobileNo: "" }));
    //   }
    // }
    else if (fieldName === "email") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    } else if (fieldName === "confirmPassword") {
      // Handle confirm password validation
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Confirm Password is required",
        }));
      } else if (value !== password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
      }
    }
  };

  const handleTogglePasswordVisibility = (fieldName) => {
    if (fieldName === "password") {
      setShowPassword(!showPassword);
    } else if (fieldName === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  function hashPasswordSHA1(password) {
    const hashedPassword = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\w\d\s]).{8,}$/;
    return passwordRegex.test(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    if (!value.trim()) {
      setPasswordError("Password is required");
    } else if (!validatePassword(value)) {
      setPasswordError(
        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character!"
      );
    } else if (value === confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
      setPasswordError("");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encodedKeyFromStorage = JSON.parse(sessionStorage.getItem("keylogs"));
    const getSecKey = encodedKeyFromStorage ? decodeURIComponent(atob(encodedKeyFromStorage)) : "";
    const SecurityKey = location?.state?.SecurityKey ?? getSecKey;
    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = "First Name is required";
    } else if (
      !/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(
        firstName
      )
    ) {
      errors.firstName =
        "First Name should not start with a numeric, special character, or space";
    }
    if (!lastName.trim()) {
      errors.lastName = "Last Name is required";
    } else if (
      !/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(
        lastName
      )
    ) {
      errors.lastName =
        "Last Name should not start with a numeric, special character, or space";
    }
    if (!mobileNo.trim()) {
      errors.mobileNo = "Mobile No. is required";

    }
    const phonecode = AllCode?.find((val) => val?.mobileprefix == Countrycodestate);
    const requiredLength = phonecode?.PhoneLength;
    const isValid = new RegExp(`^\\d{${requiredLength}}$`).test(mobileNo.trim());
    if (!isValid) {
      errors.mobileNo = `Mobile number must be  ${requiredLength} digits.`;
      return { mobileNo: `Enter a valid ${requiredLength}-digit mobile number` };
    }


    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      errors.password = "Password is required";
    } else if (!validatePassword(password)) {
      errors.password = "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character!";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length === 0 && passwordError.length === 0) {
      const hashedPassword = hashPasswordSHA1(password);

      setIsLoading(true);
      // try {
      //   const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
      //   const { FrontEnd_RegNo, IsB2BWebsite } = storeInit;
      //   const combinedValue = JSON.stringify({
      //     firstname: `${firstName}`, lastname: `${lastName}`, userid: `${(email).toLocaleLowerCase()}`, country_code: '91', mobile: `${mobileNo}`, pass: `${hashedPassword}`, IsB2BWebsite: `${IsB2BWebsite}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: '0'
      //   });
      //   const encodedCombinedValue = btoa(combinedValue);
      //   const body = {
      //     "con": "{\"id\":\"\",\"mode\":\"WEBSIGNUP\"}",
      //     "f": "Register (handleSubmit)",
      //     "p": encodedCombinedValue
      //   }
      //   const response = await CommonAPI(body);
      const shortcode = AllCode?.find((val) => val?.mobileprefix == Countrycodestate)?.CountryShortName;

      RegisterAPI(firstName, lastName, email, mobileNo, hashedPassword, Countrycodestate, shortcode)
        .then((response) => {
          setIsLoading(false);
          if (response.Data.rd[0].stat === 1) {
            navigation(singupRedirectUrl, { state: { SecurityKey: SecurityKey } });
            sessionStorage.removeItem("Countrycodestate")

            // sessionStorage.setItem('LoginUser', true)
            // sessionStorage.setItem('loginUserDetail', JSON.stringify(response.Data?.rd[0]));
            // setIsLoginState(true)
            // sessionStorage.setItem('registerEmail', email)

            // if (redirectEmailUrl) {
            //   navigation(redirectEmailUrl);
            // } else {
            //   navigation('/')
            // }
          } else {
            if (response.Data?.rd[0].ismobileexists === 1) {
              errors.mobileNo = response.Data.rd[0].stat_msg;
            }
            if (response.Data?.rd[0].isemailexists === 1) {
              errors.email = response.Data.rd[0].stat_msg;
            }
            setErrors(errors);
          }
        })
        .catch((err) => console.log(err));

      // } catch (error) {
      //   console.error('Error:', error);
      // } finally {
      //   setIsLoading(false);
      // }
    } else {
      setErrors(errors);
    }
  };


  // useEffect(()=>{
  //   const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
  //   const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
  //   const LoginUser = JSON?.parse(sessionStorage.getItem("LoginUser"));
  //   const finalID = storeInit?.IsB2BWebsite === 0 ? (LoginUser === false ? visiterID : loginUserDetail?.id || "0") : loginUserDetail?.id || "0";
  //   CountryCodeListApi(finalID)
  //     .then((res) => {
  //       console.log(res)
  //       const phonecode = res?.Data?.rd?.filter((val,i)=>{
  //          return val?.IsDefault == 1 ;
  //       })
  //       setCountrycodestate(phonecode[0]?.mobileprefix)
  //     })
  //     .catch((err) => console.log(err));
  // },[])

  // const handleCountryChange = (event, value) => {
  //   if (value) {
  //     setCountrycodestate(value.phone); 
  //     setOpen(false); 
  //   }
  // };

  const HandleSpecialCase = () => {
    const newErrors = {}; // Temporary errors object

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (
      !/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(firstName)
    ) {
      newErrors.firstName = "First Name should not start with a numeric, special character, or space";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (
      !/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(lastName)
    ) {
      newErrors.lastName = "Last Name should not start with a numeric, special character, or space";
    }

    if (!mobileNo.trim()) {
      newErrors.mobileNo = "Mobile No. is required";
    } else {
      const AllCode = JSON.parse(sessionStorage?.getItem("CountryCodeListApi")) ?? [];
      const phonecode = AllCode.find((val) => val?.mobileprefix === Countrycodestate);
      const requiredLength = phonecode?.PhoneLength;
      const isValid = new RegExp(`^\\d{${requiredLength}}$`).test(mobileNo.trim());
      if (!isValid) {
        newErrors.mobileNo = `Mobile number must be ${requiredLength} digits.`;
      }
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character!";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return
    }
  };


  return (
    <div className="proCat_registerMain">
      {isLoading && (
        <div className="loader-overlay">
          <CircularProgress className="loadingBarManage" />
        </div>
      )}
      <div>
        <div className="smling-register-main">
          <p
            style={{
              textAlign: "center",
              marginTop: "0px",
              paddingTop: "5%",
              fontSize: "40px",
              color: "#7d7f85",
              fontFamily: "FreightDispProBook-Regular,Times New Roman,serif",
            }}
            className="AuthScreenRegisterMainTitle"
          >
            Register
          </p>

          <form
            noValidate
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              autoFocus
              id="outlined-basic"
              label="First Name"
              name="First Name"
              variant="outlined"
              className="labgrowRegister"
              style={{ margin: "15px" }}
              autoComplete="new-FirstName"
              value={firstName}
              inputRef={firstNameRef}
              onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
              onChange={(e) => handleInputChange(e, setFirstName, "firstName")}
              error={!!Errors.firstName}
              helperText={Errors.firstName}
            />

            <TextField
              id="outlined-basic"
              label="Last Name"
              name="Last Name"
              variant="outlined"
              className="labgrowRegister"
              style={{ margin: "15px" }}
              autoComplete="new-LastName"
              value={lastName}
              inputRef={lastNameRef}
              onKeyDown={(e) => handleKeyDown(e, mobileNoRef)}
              onChange={(e) => handleInputChange(e, setLastName, "lastName")}
              error={!!Errors.lastName}
              helperText={Errors.lastName}
            />
            <CountryDropDown
              // CountryCode={CountryCode}
              Errors={Errors}
              // handleCountryChange={handleCountryChange}
              handleInputChange={handleInputChange}
              handleKeyDown={handleKeyDown}
              // open={open}
              emailRef={emailRef}
              mobileNo={mobileNo}
              mobileNoRef={mobileNoRef}
              setMobileNo={setMobileNo}
              setErrors={setErrors}
              IsMobileThrough={IsMobileThrough}
              Countrycodestate={Countrycodestate}
              setCountrycodestate={setCountrycodestate}
            // setOpen={setOpen}
            />
            {/* <TextField
              id="outlined-basic"
              label="Mobile No."
              name="Mobile No."
              autoComplete="Mobile No."
              variant="outlined"
              className="labgrowRegister"
              style={{ margin: "15px" }}
              value={mobileNo}
              inputRef={mobileNoRef}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              onChange={(e) => handleInputChange(e, setMobileNo, "mobileNo")}
              error={!!Errors.mobileNo}
              helperText={Errors.mobileNo}
            /> */}

            <TextField
              id="outlined-basic"
              label="Email"
              name="Email"
              autoComplete="ne-Email"
              variant="outlined"
              className="labgrowRegister"
              style={{ margin: "15px" }}
              value={email}
              inputRef={emailRef}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              onChange={(e) => handleInputChange(e, setEmail, "email")}
              error={!!Errors.email}
              helperText={Errors.email}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              name="Password"
              autoComplete="enter-NewPass-Word"
              type={showPassword ? "text" : "password"}
              className="labgrowRegister"
              style={{ margin: "15px" }}
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              inputRef={passwordRef}
              onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleTogglePasswordVisibility("password")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id="outlined-confirm-password-input"
              label="Confirm Password"
              name="Confirm Password"
              autoComplete="Enetr-NewConfirm-Pass"
              type={showConfirmPassword ? "text" : "password"}
              className="labgrowRegister"
              style={{ margin: "15px" }}
              value={confirmPassword}
              inputRef={confirmPasswordRef}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit(event);
                }
              }}
              onChange={(e) =>
                handleInputChange(e, setConfirmPassword, "confirmPassword")
              }
              error={!!Errors.confirmPassword}
              helperText={Errors.confirmPassword}
              InputProps={{
                // Set InputProps for icon
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        handleTogglePasswordVisibility("confirmPassword")
                      }
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <button
              className="pro_createBtnRegister btnColorProCat"
              type="submit"
              onClick={HandleSpecialCase}
            >
              CREATE ACCOUNT
            </button>

            {/* <div style={{ display: 'flex', marginTop: '10px' }}>
              <input type='checkbox' />
              <p style={{ margin: '5px' }}>Subscribe to our newsletter</p>
            </div> */}
            <Button
              className="pro_cancleForgot"
              style={{ marginTop: "10px", color: "gray" }}
              onClick={() => navigation(cancelRedireactUrl)}
            >
              BACK
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
