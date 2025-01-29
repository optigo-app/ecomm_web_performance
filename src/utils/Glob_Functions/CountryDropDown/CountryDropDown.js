import './CountryDropDown.scss'
import { Autocomplete, TextField } from '@mui/material';
import { CountryCode } from '../../assets/Countrylist';

const CountryDropDown = ({
    Countrycodestate,
    setOpen,
    emailRef,
    setMobileNo,
    mobileNo,
    mobileNoRef,
    handleKeyDown,
    handleInputChange,
    handleCountryChange,
    Errors,
    open
}) => {
    return (
        <>

            <div className="mobile-smr">
                <div className="MOBILE_CODE">
                    <input type="text" placeholder='+91' value={Countrycodestate}
                        onFocus={() => setOpen(true)} // Open the dropdown when focused
                    />
                </div>
                {open && <div className="county_Dropdown_list">
                    <Autocomplete
                        disablePortal
                        options={CountryCode}
                        // ${option.code} -
                        getOptionLabel={(option) => `${option.phone} - ${option.label}`}
                        sx={{ width: "100%" }}
                        open={open}
                        // onClose={() => setOpen(false)} // Close when the dropdown is closed
                        onChange={handleCountryChange}
                        renderInput={(params) => <TextField {...params} placeholder="Search Your Country" />}
                    />
                </div>}
                <TextField
                    name="user-mobileNo"
                    id="outlined-basic mobileNo"
                    label="Mobile No."
                    variant="outlined"
                    autoComplete="new-mobileNo"
                    className='labgrowRegister'
                    style={{ margin: '15px' }}
                    type="tel"
                    inputMode='numeric'
                    inputProps={{
                        maxLength: 10,
                        pattern: '[0-9]{10}',
                    }}
                    value={mobileNo}
                    inputRef={mobileNoRef}
                    onKeyDown={(e) => handleKeyDown(e, emailRef)}
                    onChange={(e) => handleInputChange(e, setMobileNo, 'mobileNo')}
                    error={!!Errors.mobileNo}
                    helperText={Errors.mobileNo}

                />
            </div>
        </>
    )
}

export default CountryDropDown