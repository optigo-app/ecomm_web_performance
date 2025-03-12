import React from 'react'
import OldContimueWithEmail from './OldContinuewithEmail'
import NewContimueWithEmail from './ContinueWithEmail'

const EmailLogin = () => {
  const IsUi = false;

  return (
    <div>
        {IsUi ? <OldContimueWithEmail/>  :<NewContimueWithEmail/> }
        
    </div>
  )
}

export default EmailLogin