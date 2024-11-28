import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.modul.scss'

const Header = () => {
  const navigate = useNavigate();
  const [isSignin, setIsSignIn] = useState(false);
  const loginCredsdata = JSON.parse(sessionStorage.getItem('loginCreds'))

  useEffect(() => {
    if (loginCredsdata && loginCredsdata.length > 0) {
      setIsSignIn(true)
    }
  }, []);
  return (
    <>
      <div className='hem_headerMain_div'>

          <div className='hem_Top_header'>
              <div onClick={() => navigate('/')}>
                <img
                   className='hem_Top_header_logo'
                   src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L//companylogo/hemratnajewelsxv/headerlogo2.png'
                   alt='hemratnalogo'
                   />
              </div>
              <div>
                {isSignin ? (
                  <>
                    <button onClick={() => { sessionStorage.removeItem("loginCreds"); window.location.href = '/' }} className='hem_Top_header_loginBtn'>Logout</button>
                  </>
                ) : (
                  <>
                     <button onClick={() => navigate('/signin')} className='hem_Top_header_loginBtn'>login</button>
                  </>
                )}
                 
              </div>
          </div>

      </div>
    </>
  )
}

export default Header