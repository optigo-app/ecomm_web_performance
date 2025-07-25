import React, { useEffect, useRef, useState } from 'react';
import './Register.modul.scss';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CryptoJS from 'crypto-js';
import { useSetRecoilState } from 'recoil';
import { el_loginState } from '../../../Recoil/atom';
import { RegisterAPI } from '../../../../../../utils/API/Auth/RegisterAPI';

export default function Register() {
  const navigation = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [Errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState('');
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const mobileNoRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const search = location?.search
  const updatedSearch = search.replace('?LoginRedirect=', '');
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const cancelRedireactUrl = `/LoginOption${search}`;
  const singupRedirectUrl = `/LoginOption${search}`;

  const setIsLoginState = useSetRecoilState(el_loginState)

  const handleKeyDown = (event, nextRef) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nextRef.current.focus();
    }
  };

  useEffect(() => {
    const storedEmail = location.state?.email;
    const routeMobileNo = location.state?.mobileNo;

    if (routeMobileNo) {
      setMobileNo(routeMobileNo);
      mobileNoRef.current.disabled = true;
    }

    if (storedEmail) {
      setEmail(storedEmail);
      emailRef.current.disabled = true;
    }
  }, [location.state]);

  const handleInputChange = (e, setter, fieldName) => {
    const { value } = e.target;
    setter(value);

    if (fieldName === 'firstName') {
      if (!value.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, firstName: 'First Name is required' }));
      } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value)) {
        setErrors(prevErrors => ({ ...prevErrors, firstName: 'Invalid First Name' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, firstName: '' }));
      }
    } else if (fieldName === 'lastName') {
      if (!value.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, lastName: 'Last Name is required' }));
      } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value)) {
        setErrors(prevErrors => ({ ...prevErrors, lastName: 'Invalid Last Name' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, lastName: '' }));
      }
    } else if (fieldName === 'mobileNo') {
      if (!value.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Mobile No. is required' }));
      } else if (!/^\d{10}$/.test(value.trim())) {
        setErrors(prevErrors => ({ ...prevErrors, mobileNo: 'Enter Valid mobile number' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, mobileNo: '' }));
      }
    } else if (fieldName === 'email') {
      if (!value.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors(prevErrors => ({ ...prevErrors, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, email: '' }));
      }
    } else if (fieldName === 'confirmPassword') { // Handle confirm password validation
      if (!value.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Confirm Password is required' }));
      } else if (value !== password) {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Passwords does not match' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
      }
    }
  };

  const handleTogglePasswordVisibility = (fieldName) => {
    if (fieldName === 'password') {
      setShowPassword(!showPassword);
    } else if (fieldName === 'confirmPassword') {
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
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\w\d\s]).{8,}$/;
    return passwordRegex.test(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    if (!value.trim()) {
      setPasswordError('Password is required')
    } else if (!validatePassword(value)) {
      setPasswordError('Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character!');
    } else if (value === confirmPassword) {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
      setPasswordError('');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = 'First Name is required';
    } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(firstName)) {
      errors.firstName = 'First Name should not start with a numeric, special character, or space';
    }
    if (!lastName.trim()) {
      errors.lastName = 'Last Name is required';
    } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(lastName)) {
      errors.lastName = 'Last Name should not start with a numeric, special character, or space';
    }
    if (!mobileNo.trim()) {
      errors.mobileNo = 'Mobile No. is required';
    } else if (!/^\d{10}$/.test(mobileNo.trim())) {
      errors.mobileNo = 'Enter Valid mobile number';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      errors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      errors.password = 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character!';
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords does not match';
    }

    if (Object.keys(errors).length === 0 && passwordError.length === 0) {
      const hashedPassword = hashPasswordSHA1(password);
      setIsLoading(true);
      // RegisterAPI(firstName, lastName, email, mobileNo, hashedPassword).then((response) => {
      //   setIsLoading(false);
      //   if (response.Data.rd[0].stat === 1) {
      //     sessionStorage.setItem('LoginUser', true)
      //     sessionStorage.setItem('loginUserDetail', JSON.stringify(response.Data?.rd[0]));
      //     setIsLoginState(true)
      //     sessionStorage.setItem('registerEmail', email)

      //     if (redirectEmailUrl) {
      //       navigation(redirectEmailUrl);
      //     } else {
      //       navigation('/')
      //     }
      RegisterAPI(firstName, lastName, email, mobileNo, hashedPassword).then((response) => {
        setIsLoading(false);
        if (response.Data.rd[0].stat === 1) {
          navigation(singupRedirectUrl);

        } else {
          if (response.Data?.rd[0].ismobileexists === 1) {
            errors.mobileNo = response.Data.rd[0].stat_msg;
          }
          if (response.Data?.rd[0].isemailexists === 1) {
            errors.email = response.Data.rd[0].stat_msg;
          }
          setErrors(errors);
        }

      }).catch((err) => console.log(err))
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className='el_RegisterMain' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
      {isLoading && (
        <div className="loader-overlay">
          <CircularProgress className='loadingBarManage' />
        </div>
      )}
      <div>
        <div className='el_LoginEmailMainDiv'>
          <div className='el_LoginSubDivMain'>
            <p style={{
              textAlign: 'center',
              marginTop: '32px',
              fontSize: '25px',
              fontFamily: 'PT Sans, sans-serif'
            }}
              className='AuthScreenMainTitle'
            >Register</p>

            <form noValidate
              onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField
                name="user-firstName"
                autoFocus
                id="outlined-basic firstName"
                label="First Name"
                variant="outlined"
                className='labgrowRegister'
                style={{ margin: '15px' }}
                autoComplete="new-FirstName"
                value={firstName}
                inputRef={firstNameRef}
                onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
                onChange={(e) => handleInputChange(e, setFirstName, 'firstName')}
                error={!!Errors.firstName}
                helperText={Errors.firstName}
              />

              <TextField
                name="user-lastName"
                id="outlined-basic lastName"
                label="Last Name"
                variant="outlined"
                className='labgrowRegister'
                style={{ margin: '15px' }}
                autoComplete="new-LastName"
                value={lastName}
                inputRef={lastNameRef}
                onKeyDown={(e) => handleKeyDown(e, mobileNoRef)}
                onChange={(e) => handleInputChange(e, setLastName, 'lastName')}
                error={!!Errors.lastName}
                helperText={Errors.lastName}
              />

              <TextField
                name="user-mobileNo"
                id="outlined-basic mobileNo"
                label="Mobile No."
                variant="outlined"
                className='labgrowRegister'
                autoComplete="new-mobileNo" // Explicitly telling the browser not to autocomplete this field
                style={{ margin: '15px' }}
                value={mobileNo}
                inputRef={mobileNoRef}
                onKeyDown={(e) => handleKeyDown(e, emailRef)}
                onChange={(e) => handleInputChange(e, setMobileNo, 'mobileNo')}
                error={!!Errors.mobileNo}
                helperText={Errors.mobileNo}
              />

              <TextField
                name="user-email"
                id="outlined-basic email"
                label="Email"
                autoComplete="ne-Email"
                variant="outlined"
                className='labgrowRegister'
                style={{ margin: '15px' }}
                value={email}
                inputRef={emailRef}
                onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                onChange={(e) => handleInputChange(e, setEmail, 'email')}
                error={!!Errors.email}
                helperText={Errors.email}
              />

              <TextField
                id="outlined-password-input" name="user-password"

                label="Password"
                autoComplete="enter-NewPass-Word-12"
                type={showPassword ? 'text' : 'password'}
                className='labgrowRegister'
                style={{ margin: '15px' }}
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
                        onClick={() => handleTogglePasswordVisibility('password')}
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
                name="user-confirmPassword"

                id="outlined-confirm-password-input Pass12"
                label="Confirm Password"
                autoComplete="Enetr-NewConfirm-Pass"
                type={showConfirmPassword ? 'text' : 'password'}
                className='labgrowRegister'
                style={{ margin: '15px' }}
                value={confirmPassword}
                inputRef={confirmPasswordRef}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                onChange={(e) => handleInputChange(e, setConfirmPassword, 'confirmPassword')}
                error={!!Errors.confirmPassword}
                helperText={Errors.confirmPassword}
                InputProps={{ // Set InputProps for icon
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleTogglePasswordVisibility('confirmPassword')}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <button type='submit' className='submitBtnForgot1 btn-bg-elvee' >CREATE ACCOUNT</button>

              {/* <div style={{ display: 'flex', marginTop: '10px' }}>
              <input type='checkbox' />
              <p style={{ margin: '5px' }}>Subscribe to our newsletter</p>
            </div> */}
              <button className='submitBtnForgot1 ' onClick={() => navigation('/LoginOption')}>BACK TO LOGIN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
