import React, { useEffect, useState } from 'react'
import './ContinueWithEmail.modul.scss';
import { useNavigate } from 'react-router-dom';

const ContinueWithEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const loginCredsdata = JSON.parse(sessionStorage.getItem('loginCreds'))

  useEffect(() => {
    // Check if the email state is already set (handling autofill)
    if (document.activeElement.tagName === 'INPUT' && document.activeElement.type === 'email') {
      setEmail(document.activeElement.value);
    }
    if (loginCredsdata && loginCredsdata.length > 0) {
      setEmail(loginCredsdata[0]?.email)
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginCredsdata || loginCredsdata === 0) {
      navigate(`/register?email=${email}`);
    }
    else {
      navigate(`/login-with-email`);
    }
  }
  return (
    <>
      <div className='hem_ContinueWithEmailMain_div'>
        <div className='hem_ContinueWithEmail_div'>
          <div className='hem_ContinueWithEmail_layout'>
            <button onClick={() => navigate('/')} className='hem_ContinueWithEmail_close_btn'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="m4 4 8 8m-8 0 8-8" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                </path>
              </svg>
            </button>
            <div className='hem_ContinueWithEmail_back_btn_div'>
              <button onClick={() => navigate('/signin')} className='hem_ContinueWithEmail_back_btn'>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15.45 17.97 9.5 12.01a.25.25 0 0 1 0-.36l5.87-5.87a.75.75 0 0 0-1.06-1.06l-5.87 5.87c-.69.68-.69 1.8 0 2.48l5.96 5.96a.75.75 0 0 0 1.06-1.06z">
                  </path>
                </svg>
              </button>
              <h3 className='hem_ContinueWithEmail_title'>Continue with email</h3>
            </div>
            <div>
              <h4 className='hem_ContinueWithEmail_mess'>We'll check if you have an account, and help create one if you don't.</h4>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="hem_ContinueWithEmail_input_div">
                  <label for="cont-with-email" className="hem_ContinueWithEmail_inp_label">Email (personal or work)</label>
                  <input type="email" id="cont-with-email" placeholder='abc@example.com' className="hem_ContinueWithEmail_input" value={email} onChange={handleEmailChange} required />
                </div>
                <div>
                  <button className='hem_ContinueWithEmail_submit_btn'>
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

export default ContinueWithEmail