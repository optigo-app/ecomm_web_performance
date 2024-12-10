import { atom } from "recoil";

export const smrMA_companyLogo = atom({
    key:'smr_App_companyLogo',
    default:[]
})

export const  smrMA_loginState = atom({
  key: 'smr_App_loginState',
  default: false,
})

export const  smrMA_CartCount = atom({
  key: 'smr_App_CartCount',
  default: 0
})

export const  smrMA_WishCount = atom({
  key: 'smr_App_WishCount',
  default: 0
})

export const smrMA_defaultAddressState = atom({
  key: 'smr_App_defaultAddressState',
  default: null,
});

export const smrMA_ShowSnackBar = atom({
  key: 'smr_App_smrMA_ShowSnackBar',
  default: false,
});

export const smrMA_homeLoading = atom({
  key: 'smr_App_smrMA_homeLoading',
  default: true
})
