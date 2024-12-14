import { atom } from "recoil";

export const proCat_companyLogo = atom({
  key:'poca_companyLogo',
  default:[]
})


export const proCat_companyLogoM = atom({
  key:'poca_companyLogoM',
  default:[]
})

export const proCat_loginState = atom({
  key: 'poca_loginState',
  default: false,
})

export const proCat_CartCount = atom({
  key: 'poca_CartCount',
  default: 0
})

export const proCat_WishCount = atom({
  key: 'poca_WishCount',
  default: 0
})

export const proCat_cartB2CDrawer = atom({
  key: 'poca_cartB2CDrawer',
  default: false
})

export const proCat_DiamondRangeArr = atom({
  key: 'poca_DiamondRangeArr',
  default: []
})
export const defaultAddressState = atom({
  key: 'poca_defaultAddressState',
  default: []
})

export const soketProductData = atom({
  key: 'poca_soketProductData',
  default: []
})

export const AlmacarinoFlag = atom({
  key: 'AlmacarinoFlag',
  default: 1
})