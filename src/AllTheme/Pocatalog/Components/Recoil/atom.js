import { atom } from "recoil";

export const proCat_companyLogo = atom({
  key:'companyLogo',
  default:[]
})


export const proCat_companyLogoM = atom({
  key:'companyLogoM',
  default:[]
})

export const proCat_loginState = atom({
  key: 'loginState',
  default: false,
})

export const proCat_CartCount = atom({
  key: 'CartCount',
  default: 0
})

export const proCat_WishCount = atom({
  key: 'WishCount',
  default: 0
})

export const proCat_cartB2CDrawer = atom({
  key: 'cartB2CDrawer',
  default: false
})

export const proCat_DiamondRangeArr = atom({
  key: 'DiamondRangeArr',
  default: []
})
export const defaultAddressState = atom({
  key: 'defaultAddressState',
  default: []
})

export const soketProductData = atom({
  key: 'soketProductData',
  default: []
})