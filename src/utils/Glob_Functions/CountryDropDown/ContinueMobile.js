import './CountryDropDown.scss';
import { Alert, Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { CountryCodeListApi } from '../../API/Auth/CountryCodeListApi';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const CountryDropDown = ({
  setMobileNo,
  mobileNo,
  handleInputChange,
  Errors,
  setErrors, 
}) => {
  const visiterID = Cookies.get('visiterId');
  const [Countrycodestate, setCountrycodestate] = useState();
  const [CountryDefault, setCountryDefault] = useState();
  const [Countrycode, setCountrycode] = useState([]);
  const [open, setOpen] = useState(false);
  const [isIndiaSelected, setIsIndiaSelected] = useState(true);  // State to track if India is selected


  useEffect(() => {
    const storeInit = JSON?.parse(sessionStorage.getItem('storeInit'));
    const loginUserDetail = JSON?.parse(sessionStorage.getItem('loginUserDetail'));
    const LoginUser = JSON?.parse(sessionStorage.getItem('LoginUser'));
    const finalID =
      storeInit?.IsB2BWebsite === 0
        ? LoginUser === false
          ? visiterID
          : loginUserDetail?.id || '0'
        : loginUserDetail?.id || '0';
    CountryCodeListApi(finalID)
      .then((res) => {
        const phonecode = res?.Data?.rd?.filter((val) => val?.IsDefault == 1);
        setCountrycodestate(phonecode[0]?.mobileprefix);
        setCountrycode(res?.Data?.rd);
        setCountryDefault(phonecode[0]?.PhoneLength);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCountryChange = (event, value) => {
    if (value) {
      setCountrycodestate(value?.mobileprefix);
      setCountryDefault(value?.PhoneLength);

      if (value?.mobileprefix === '91') {
        setIsIndiaSelected(true);  // Set to true if India is selected
      } else {
        setIsIndiaSelected(false); // Set to false for other countries
      } 

      setOpen(false);
      setMobileNo('')
      setErrors({
        ...Errors,
        mobileNo: `Mobile number must be ${value?.PhoneLength} digits.`,
      });
    }
  };

  const handleMobileInputChange = (e) => {
    const value = e.target.value;
   
    if (value.length > CountryDefault) {
      e.preventDefault();
      return;
    }

    const numericValue = value.replace(/[^0-9]/g, '');
    e.target.value = numericValue;

    if (numericValue.length === CountryDefault) {
      setErrors({
        ...Errors,
        mobileNo: '',
      });
    } else if (numericValue.length > 0 && numericValue.length < CountryDefault) {
      setErrors({
        ...Errors,
        mobileNo: `Mobile number must be ${CountryDefault} digits.`,
      });
    } else {
      setErrors({
        ...Errors,
        mobileNo: '',
      });
    }

    handleInputChange(e, setMobileNo, 'mobileNo');
  };

  return (
    <>
    <div className="mobile-smr">
      <div className="MOBILE_CODE">
        <input
          type="text"
          placeholder="91"
          value={Countrycodestate}
          onFocus={() => setOpen(true)} 
          // Open the dropdown when focused
          readOnly
        />
      </div>
      {open && (
        <div className="county_Dropdown_list">
          <Autocomplete
            disablePortal
            options={Countrycode}
            getOptionLabel={(option) => `${option?.mobileprefix} - ${option?.countryname}`}
            sx={{ width: '100%' }}
            open={open}
            onChange={handleCountryChange}
            renderInput={(params) => <TextField {...params} placeholder="Search Your Country" />}
          />
        </div>
      )}
     
      <TextField
        name="user-mobileNo"
        id="outlined-basic mobileNo"
        label="Mobile No."
        variant="outlined"
        autoComplete="new-mobileNo"
        className="labgrowRegister"
        style={{ margin: '15px' }}
        type="text"
        inputMode="numeric" // Ensures mobile number input on mobile devices
        inputProps={{
          maxLength: CountryDefault, // Dynamically set maxLength based on country
          pattern: '[0-9]*', // Ensure only numbers can be typed
        }}
        value={mobileNo}
        onChange={handleMobileInputChange} // Using local handler to check length
        error={!!Errors.mobileNo} // Show error if it exists
        helperText={Errors.mobileNo}
      />
    </div>
    {!isIndiaSelected && (
      <div className="mobile-smr">
        <Alert  sx={{
          fontSize: '12px',
        }} severity="warning" className="labgrowRegister">
          OTP verification is restricted to Indian mobile numbers (+91) only.
          <Link to={'/ContinueWithEmail'} style={{marginLeft:'5px'}}>Login with Email.</Link>
        </Alert>
          </div>
      )}
                        
    <div className='mobile-smr'>
    <span className='m-txt-msg'>&#9741; Verify via <div style={{color:'green'}}>WhatsApp</div> only! Check your messages for OTP.</span>
    </div>

    </>

  );
};

export default CountryDropDown;
