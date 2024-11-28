import React, { useEffect, useState } from 'react'
import './LoginWithEmail.modul.scss';
import { useNavigate } from 'react-router-dom';

const LoginWithEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginCredsdata = JSON.parse(sessionStorage.getItem('loginCreds'))

  useEffect(() => {
    if (loginCredsdata && loginCredsdata.length > 0) {
      setEmail(loginCredsdata[0]?.email)
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length > 0) {
      navigate(`/`);
    }
  }
  return (
    <>
      <div className='hem_LoginWithEmailMain_div'>
        <div className='hem_LoginWithEmail_div'>
          <div className='hem_LoginWithEmail_layout'>
            <button onClick={() => navigate('/')} className='hem_LoginWithEmail_close_btn'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="m4 4 8 8m-8 0 8-8" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                </path>
              </svg>
            </button>
            <div className='hem_LoginWithEmail_back_btn_div'>
              <button onClick={() => navigate('/signin')} className='hem_LoginWithEmail_back_btn'>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15.45 17.97 9.5 12.01a.25.25 0 0 1 0-.36l5.87-5.87a.75.75 0 0 0-1.06-1.06l-5.87 5.87c-.69.68-.69 1.8 0 2.48l5.96 5.96a.75.75 0 0 0 1.06-1.06z">
                  </path>
                </svg>
              </button>
              <h3 className='hem_LoginWithEmail_title'>Log in to your account</h3>
            </div>
            <div>
              <h4 className='hem_LoginWithEmail_mess'>using
                <span className='hem_LoginWithEmail_email_data'>{email}</span>
              </h4>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="hem_LoginWithEmail_input_div">
                  <label className="hem_LoginWithEmail_inp_label">Password</label>
                  <input type="password" placeholder='Enter password' className="hem_LoginWithEmail_input" value={password} onChange={handlePassword} required />
                </div>
                <div>
                  <button className='hem_LoginWithEmail_submit_btn'>
                    <span>Log in</span>
                  </button>
                </div>
              </form>
            </div>
            <div>
              <div className='hem_LoginWithEmail_division'>
                <hr className='hem_LoginWithEmail_division_lines1' />
                <span className='hem_LoginWithEmail_division_text'>or</span>
                <hr className='hem_LoginWithEmail_division_lines2' />
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <button onClick={() => navigate('/login-with-email-code')} className='hem_LoginWithEmail_login_code_btn'>Log in with a code instead</button>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <span className='hem_LoginWithEmail_login_code_mess'>Go passwordless! we'll send you an email.</span>
              </div>
            </div>
            <div>
              <div>
                <span onClick={() => navigate('/forgot-password')} className='hem_LoginWithEmail_forgot_password'>Forgot Password ?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginWithEmail