import { atom } from "recoil";

export const PC_AppcompanyLogo = atom({
    key:'pma_companyLogo',
    default:[]
})

export const  PC_ApploginState = atom({
  key: 'pma_loginState',
  default: false,
})

export const  PC_AppCartCount = atom({
  key: 'pma_CartCount',
  default: 0
})

export const  PC_AppWishCount = atom({
  key: 'pma_WishCount',
  default: 0
})

export const PC_AppdefaultAddressState = atom({
  key: 'pma_defaultAddressState',
  default: null,
});

export const PC_AppShowSnackBar = atom({
  key: 'pma_PC_AppShowSnackBar',
  default: false,
});

export const soketProductData_ProCatApp = atom({
  key: 'pma_soketProductData',
  default: []
})