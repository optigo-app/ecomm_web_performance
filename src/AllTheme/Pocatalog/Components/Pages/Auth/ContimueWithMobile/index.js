import React from 'react'
import OldContimueWithMobile from './OldContinuewithMobile'
import NewContimueWithMobile from './ContimueWithMobile'

const MobileLogin = () => {
    const IsUi = false;
  return (
    <div>
        {IsUi ? <OldContimueWithMobile/>  :<NewContimueWithMobile/> }
        
    </div>
  )
}

export default MobileLogin