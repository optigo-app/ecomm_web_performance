import { atom } from "recoil";

export const PC_AppcompanyLogo = atom({
    key:'companyLogo',
    default:[]
})

export const  PC_ApploginState = atom({
  key: 'loginState',
  default: false,
})

export const  PC_AppCartCount = atom({
  key: 'CartCount',
  default: 0
})

export const  PC_AppWishCount = atom({
  key: 'WishCount',
  default: 0
})

export const PC_AppdefaultAddressState = atom({
  key: 'defaultAddressState',
  default: null,
});

export const PC_AppShowSnackBar = atom({
  key: 'PC_AppShowSnackBar',
  default: false,
});

export const soketProductData_ProCatApp = atom({
  key: 'soketProductData',
  default: []
})