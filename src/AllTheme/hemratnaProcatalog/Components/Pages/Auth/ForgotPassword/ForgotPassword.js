import React, { useState } from 'react'
import './ForgotPassword.modul.scss'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPass, setForgotPass] = useState('');

  const handleForgotPass = (e) => {
    setForgotPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forgotPass.length > 0) {
      navigate(`/`);
    }
  }
  return (
    <>
      <div className='hem_ForgotPasswordMain_div'>
        <div className='hem_ForgotPassword_div'>
          <div className='hem_ForgotPassword_layout'>
            <h3 className='hem_ForgotPassword_title'>Forgot Password</h3>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="hem_ForgotPassword_input_div">
                  <input type="text" placeholder='Please Enter Registered Email Address' className="hem_ForgotPassword_input" value={forgotPass} onChange={handleForgotPass} required />
                </div>
                <div>
                  <button className='hem_ForgotPassword_submit_btn'>
                    <span>Continue</span>
                  </button>
                </div>
              </form>
              <div>
                <span onClick={() => navigate('/signin')} className='hem_ForgotPassword_signin'>Back to Sign in ?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword