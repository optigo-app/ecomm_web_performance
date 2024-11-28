import { atom } from "recoil";

export const mala_companyLogo = atom({
  key:'companyLogo',
  default:[]
})

export const mala_companyLogoM = atom({
  key:'mala_companyLogoM',
  default:[]
})

export const mala_loginState = atom({
  key: 'loginState',
  default: false,
})

export const mala_CartCount = atom({
  key: 'CartCount',
  default: 0
})

export const mala_WishCount = atom({
  key: 'WishCount',
  default: 0
})

export const mala_cartB2CDrawer = atom({
  key: 'cartB2CDrawer',
  default: false
})

export const mala_DiamondRangeArr = atom({
  key: 'DiamondRangeArr',
  default: []
})

export const mala_defaultAddressState = atom({
  key: 'defaultAddressState',
  default: null,
});
