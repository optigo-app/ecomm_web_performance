import React from 'react'
import OldContimueWithMobile from './OldContinuewithMobile'
import NewContimueWithMobile from './ContimueWithMobile'
import { IsOtpNewUi } from '../../../Recoil/atom';
import { useRecoilValue  } from 'recoil';

const MobileLogin = () => {
  const isOtpNewUi = useRecoilValue(IsOtpNewUi);
  return (
    <div>
        {isOtpNewUi ?  <NewContimueWithMobile/> : <OldContimueWithMobile/> }
        
    </div>
  )
}

export default MobileLogin