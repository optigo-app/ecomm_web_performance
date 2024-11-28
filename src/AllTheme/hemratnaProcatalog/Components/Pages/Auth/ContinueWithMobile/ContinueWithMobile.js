import React, { useEffect, useState } from 'react'
import './ContinueWithMobile.modul.scss';
import { useNavigate } from 'react-router-dom';

const ContinueWithMobile = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');

  const handleChange = (event) => {
    let value = event.target.value;
    value = value.slice(0, 10);
    setMobileNumber(value);
  }

  const loginCredsdata = JSON.parse(sessionStorage.getItem('loginCreds'))

  useEffect(() => {
    if (loginCredsdata && loginCredsdata.length > 0) {
      setMobileNumber(loginCredsdata[0]?.mobile)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10 && (!loginCredsdata || loginCredsdata === 0)) {
      navigate(`/register?mobile=${mobileNumber}`);
    }
    else {
      navigate(`/login-with-mobile-code`);
    }
  }
  return (
    <>
      <div className='hem_ContinueWithMobileMain_div'>
        <div className='hem_ContinueWithMobile_div'>
          <div className='hem_ContinueWithMobile_layout'>
            <button onClick={() => navigate('/')} className='hem_ContinueWithMobile_close_btn'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="m4 4 8 8m-8 0 8-8" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                </path>
              </svg>
            </button>
            <div className='hem_ContinueWithMobile_back_btn_div'>
              <button onClick={() => navigate('/signin')} className='hem_ContinueWithMobile_back_btn'>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15.45 17.97 9.5 12.01a.25.25 0 0 1 0-.36l5.87-5.87a.75.75 0 0 0-1.06-1.06l-5.87 5.87c-.69.68-.69 1.8 0 2.48l5.96 5.96a.75.75 0 0 0 1.06-1.06z">
                  </path>
                </svg>
              </button>
              <h3 className='hem_ContinueWithMobile_title'>Log in with mobile</h3>
            </div>
            <div>
              <h4 className='hem_ContinueWithMobile_mess'>We'll check if you already have an account. You can't sign up with a mobile number in your current location.</h4>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="hem_ContinueWithMobile_input_div">
                  <label className="hem_ContinueWithMobile_inp_label">Mobile (personal or work)</label>
                  <div className='hem_ContinueWithMobile_number_inp'>
                    <input type="number" placeholder="Mobile number" className="hem_ContinueWithMobile_input" value={mobileNumber} onChange={handleChange} maxLength={10} minLength={10} required />
                    <select className='hem_ContinueWithMobile_country_dropdown'>
                      <option value="1">IN</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button className='hem_ContinueWithMobile_submit_btn'>
                    <span>Continue</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContinueWithMobile