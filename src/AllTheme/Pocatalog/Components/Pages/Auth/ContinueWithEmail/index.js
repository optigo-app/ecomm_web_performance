import React from 'react'
import OldContimueWithEmail from './OldContinuewithEmail'
import NewContimueWithEmail from './ContinueWithEmail'
import { useRecoilValue } from 'recoil';
import { IsOtpNewUi } from '../../../Recoil/atom';

const EmailLogin = () => {
  const isOtpNewUi = useRecoilValue(IsOtpNewUi);

  return (
    <div>
        {isOtpNewUi ?  <NewContimueWithEmail/> : <OldContimueWithEmail/> }
        
    </div>
  )
}

export default EmailLogin