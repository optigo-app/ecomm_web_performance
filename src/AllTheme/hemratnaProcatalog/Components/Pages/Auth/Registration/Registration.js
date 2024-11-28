import React, { useState, useEffect } from 'react'
import './Registration.modul.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleMobileChange = (event) => {
        let value = event.target.value;
        value = value.slice(0, 10);
        setMobile(value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }


    useEffect(() => {
        // Check if the email state is already set (handling autofill)
        if (document.activeElement.tagName === 'INPUT' && document.activeElement.type === 'email') {
            setEmail(document.activeElement.value);
        }
        if (document.activeElement.tagName === 'INPUT' && document.activeElement.type === 'text') {
            setFirstName(document.activeElement.value);
            setLastName(document.activeElement.value);
        }
        if (location?.search.startsWith('?mobile')) {
            setMobile(location?.search.split('=')[1])
        }
        if (location?.search.startsWith('?email')) {
            setEmail(location?.search.split('=')[1])
        }
    }, []);

    const loginCreds = [{
        email: email,
        mobile: mobile
    }];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            sessionStorage.setItem("loginCreds", JSON.stringify(loginCreds));
            console.log(firstName, lastName, email, mobile, password, confirmPassword)
            if (location?.search.startsWith('?mobile')) {
                navigate("/continue-with-mobile")
            }
            if (location?.search.startsWith('?email')) {
                navigate("/continue-with-email")
            }
        } else {
            alert("Password and Confirm Password doesn't match")
        }
    }
    return (
        <>
            <div className='hem_RegisterUserMain_div'>
                <div className='hem_RegisterUser_div'>
                    <div className='hem_RegisterUser_layout'>
                        <button onClick={() => navigate('/')} className='hem_RegisterUser_close_btn'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="m4 4 8 8m-8 0 8-8" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                                </path>
                            </svg>
                        </button>
                        <div className='hem_RegisterUser_back_btn_div'>
                            <button onClick={() => navigate('/signin')} className='hem_RegisterUser_back_btn'>
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M15.45 17.97 9.5 12.01a.25.25 0 0 1 0-.36l5.87-5.87a.75.75 0 0 0-1.06-1.06l-5.87 5.87c-.69.68-.69 1.8 0 2.48l5.96 5.96a.75.75 0 0 0 1.06-1.06z">
                                    </path>
                                </svg>
                            </button>
                            <h3 className='hem_RegisterUser_title'>Sign Up</h3>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="hem_RegisterUser_input_div">
                                    <label className="hem_RegisterUser_inp_label">First Name</label>
                                    <input type="text" placeholder='First Name' className="hem_RegisterUser_input" value={firstName} onChange={handleFirstName} required />
                                </div>
                                <div className="hem_RegisterUser_input_div">
                                    <label className="hem_RegisterUser_inp_label">Last Name</label>
                                    <input type="text" placeholder='Last Name' className="hem_RegisterUser_input" value={lastName} onChange={handleLastName} required />
                                </div>
                                {location?.search.startsWith('?email') ? (
                                    <>
                                        <div className="hem_RegisterUser_input_div">
                                            <label className="hem_RegisterUser_inp_label">Email Id</label>
                                            <input type="email" placeholder='Email Id' style={{ background: '#D3D3D3' }} className="hem_RegisterUser_input" value={email} onChange={handleEmailChange} disabled required />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="hem_RegisterUser_input_div">
                                            <label className="hem_RegisterUser_inp_label">Email Id</label>
                                            <input type="email" placeholder='Email Id' className="hem_RegisterUser_input" value={email} onChange={handleEmailChange} required />
                                        </div>
                                    </>
                                )}

                                {location?.search.startsWith('?mobile') ? (
                                    <>
                                        <div className="hem_RegisterUser_input_div">
                                            <label className="hem_RegisterUser_inp_label">Mobile#</label>
                                            <input type="number" placeholder='Mobile Number' style={{ background: '#D3D3D3' }} className="hem_RegisterUser_input" value={mobile} onChange={handleMobileChange} maxLength={10} minLength={10} disabled required />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="hem_RegisterUser_input_div">
                                            <label className="hem_RegisterUser_inp_label">Mobile#</label>
                                            <input type="number" placeholder='Mobile No' className="hem_RegisterUser_input" value={mobile} onChange={handleMobileChange} maxLength={10} minLength={10} required />
                                        </div>
                                    </>
                                )}

                                <div className="hem_RegisterUser_input_div">
                                    <label className="hem_RegisterUser_inp_label">Password</label>
                                    <input type="password" placeholder='Password' className="hem_RegisterUser_input" value={password} onChange={handlePassword} required />
                                </div>
                                <div className="hem_RegisterUser_input_div">
                                    <label className="hem_RegisterUser_inp_label">Confirm Password</label>
                                    <input type="password" placeholder='Confirm Password' className="hem_RegisterUser_input" value={confirmPassword} onChange={handleConfirmPassword} required />
                                </div>
                                <div>
                                    <button type='submit' className='hem_RegisterUser_submit_btn'>
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

export default Registration