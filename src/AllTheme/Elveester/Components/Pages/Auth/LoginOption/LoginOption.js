import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5';
import { FaMobileAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LoginOption.modul.scss';
import { Helmet } from 'react-helmet';


export default function LoginOption() {

    const navigation = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    const search = location?.search
    console.log("TCL: LoginOption -> search", search)
    const updatedSearch = search.replace('?LoginRedirect=', '');
    const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
    const cancelRedireactUrl = `/LoginOption${search}`;

    return (
        <>
            <Helmet>
                <link rel="canonical" href="https://www.elvee.in/LoginOption" />
            </Helmet>
            <div className='el_loginoptionMain' style={{ backgroundColor: 'rgba(66, 66, 66, 0.05)' }}>
                <div>
                    <div className='el_loginDailog'>
                        <div className='optionLoginMain'>
                            <p className='loginDiTile'>Log in or sign up in seconds</p>
                            <p style={{ textAlign: 'center', marginTop: '0px', fontSize: '14px' }}>Use your email or mobile no. to continue with the organization.</p>
                            <div className='smilingLoginOptionMain'>
                                <div className='loginMail' onClick={() => navigation(`/ContinueWithEmail?${redirectEmailUrl?.startsWith('?') ? redirectEmailUrl.replace('?', '') : redirectEmailUrl}`)}>
                                    <IoMdMail style={{ height: '25px', width: '25px' }} />
                                    <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500, paddingLeft: '25px' }}>Continue with email</p>
                                </div>
                                <div className='loginMobile' onClick={() => navigation(`/ContimueWithMobile?${redirectEmailUrl?.startsWith('?') ? redirectEmailUrl.replace('?', '') : redirectEmailUrl}`)}>
                                    <FaMobileAlt style={{ height: '25px', width: '25px', marginRight: '10px' }} />
                                    <p style={{ margin: '0px', fontSize: '20px', fontWeight: 500, paddingLeft: '25px' }}>Log in with mobile</p>
                                </div>
                                <div
                                    style={{
                                        marginTop: "20px",
                                        fontSize: "16px",
                                        textAlign: "center",
                                    }}
                                >
                                    <Link to={`/register?${redirectEmailUrl?.startsWith('?') ? redirectEmailUrl.replace('?', '') : redirectEmailUrl}`} style={{ textDecoration: "none", color: '#212529' }}>
                                        <span>Don’t have an account?</span> <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Register</span>
                                    </Link>
                                </div>
                            </div>
                            <p style={{ marginTop: '20px', fontSize: '14px', textAlign: 'center', marginBottom: '30px' }}>By continuing, you agree to our <span onClick={() => navigation('/term&condition')} style={{ fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>Terms of Use</span>. Read our <span onClick={() => navigation('/privacy')} style={{ fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
