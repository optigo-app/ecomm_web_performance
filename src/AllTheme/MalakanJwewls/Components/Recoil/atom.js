import { atom } from "recoil";

export const mala_companyLogo = atom({
  key:'malakan_companyLogo',
  default:[]
})

export const mala_companyLogoM = atom({
  key:'malakan_mala_companyLogoM',
  default:[]
})

export const mala_loginState = atom({
  key: 'malakan_loginState',
  default: false,
})

export const mala_CartCount = atom({
  key: 'malakan_CartCount',
  default: 0
})

export const mala_WishCount = atom({
  key: 'malakan_WishCount',
  default: 0
})

export const mala_cartB2CDrawer = atom({
  key: 'malakan_cartB2CDrawer',
  default: false
})

export const mala_DiamondRangeArr = atom({
  key: 'malakan_DiamondRangeArr',
  default: []
})

export const mala_defaultAddressState = atom({
  key: 'malakan_defaultAddressState',
  default: null,
});
