import React from 'react'
import OldRegister from './OldRegister'
import NewRegister from './Register'

const Register = () => {
    const IsUi = true;
  return (
    <div>
        {IsUi ? <OldRegister/>  :<NewRegister/> }
        
    </div>
  )
}

export default Register ;