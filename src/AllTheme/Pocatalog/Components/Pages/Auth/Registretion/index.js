import React from 'react'
import OldRegister from './OldRegister'
import NewRegister from './Register'
import { IsOtpNewUi } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';

const Register = () => {
  const isOtpNewUi = useRecoilValue(IsOtpNewUi);

  return (
    <div>
      {isOtpNewUi ? <NewRegister /> : <OldRegister />}
    </div>
  )
}

export default Register;